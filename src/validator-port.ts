import { Connection, Edge, Elements, Node } from "react-flow-renderer";
import { CreateDataFieldPort, RecipeCreaterPort } from "./model";
import { getMetaField, getPortsInfo } from "./utils";

type PortPropsType = "in" | "out";

const checkTypePort = (
  type: PortPropsType,
  nodes: Node[],
  connection: Connection
) => {
  if (connection.source === null || connection.target === null) {
    return false;
  }
  const keys =
    type === "out"
      ? {
          data_source: "outputs",
          data_target: "inputs"
        }
      : {
          data_source: "inputs",
          data_target: "outputs"
        };
  const stages = getPortsInfo(
    nodes as Elements,
    {
      source: connection.source,
      target: connection.target
    },
    keys
  );
  //const stageField = type === "in" ? "output" : "input";
  //const stageFieldCheck = type === "in" ? "input" : "output";
  const inpType =
    stages["input"]?.typePort === "create"
      ? stages["output"]?.type
      : stages["input"]?.type;

  if (stages.sId[0] === stages.tId[0] || inpType !== stages["output"]?.type) {
    return false;
  }
  return true;
};

export const isValidConnectionCreatePortsRecipe = (
  type: PortPropsType,
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  callbackValidation?: (
    connectionSource: string | null, // меняется местами для in - out
    connectionTarget: string | null, // меняется местами для in - out
    nodes: Node[]
  ) => boolean
) => {
  const source = connectionSource?.split("__") || ["", ""];
  const target = connectionTarget?.split("__") || ["", ""];
  const fieldData =
    type === "in" ? CreateDataFieldPort.inputs : CreateDataFieldPort.outputs;
  const reField = type === "in" ? /input/i : /output/i;
  const reTag = type === "in" ? /-in/i : /-out/i;
  const recipeNode =
    target[0] !== "" ? nodes.find((x) => x.id === target[0]) : undefined;
  //if the port is already in the links, then prohibit the connection
  if (recipeNode) {
    const meta = getMetaField(fieldData);
    const fieldID =
      source[1].replace(meta.search, meta.change) + "--" + source[0];

    if (recipeNode?.data[fieldData].find((input) => input.id === fieldID)) {
      return false;
    }
  }

  if (
    source[1] === RecipeCreaterPort.recipeIn &&
    target[1] === RecipeCreaterPort.recipeOut
  ) {
    return false;
  }
  // do not connect ports to ports in the same node area
  if (source[0] === target[0]) {
    return false;
  }

  const outputSource = connectionSource?.match(reField) || [];
  const outputTarget = connectionTarget?.match(reField) || [];

  //prohibiting the connection of the port if the id has "input"
  if (outputSource.length > 0 || outputTarget.length > 0) {
    return false;
  }

  const recipeOut = connectionSource?.match(reTag) || [];
  //complete ban on connection to recipe input
  if (recipeOut.length > 0) {
    return false;
  }

  if (callbackValidation) {
    return callbackValidation(connectionSource, connectionTarget, nodes);
  }

  return true;
};
interface IValidConnectionOptions {
  edges?: Edge[];
  callbackValidation?: (
    connectionSource: string | null, // меняется местами для in - out
    connectionTarget: string | null, // меняется местами для in - out
    nodes: Node[],
    edges?: Edge[]
  ) => boolean;
}
//TODO: Заменить название
export const isValidConnectionPort = (
  type: "in" | "out",
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  options: IValidConnectionOptions
) => {
  const reField = type === "in" ? /input/i : /output/i;
  const reTag = type === "in" ? /-in/i : /-out/i;
  const portCreate = connectionTarget?.match(reTag) || [];
  const connectPort = connectionTarget?.match(reField) || [];

  if (connectPort.length > 0 || portCreate.length > 0) {
    return false;
  }

  if (
    !checkTypePort(type, nodes, {
      source: connectionSource,
      target: connectionTarget
    })
  ) {
    return false;
  }

  if (options && options?.callbackValidation) {
    return options.callbackValidation(
      connectionSource,
      connectionTarget,
      nodes,
      options.edges
    );
  }

  return true;
};

export const isValidRecipeIputCallbak = (
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  edges?: Edge[]
) => {
  if (
    edges?.find(
      (x) => x.source === connectionSource || x.target === connectionTarget
    )
  ) {
    return false;
  }
  return true;
};

export const isValidRecipeOutputCallbak = (
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  edges?: Edge[]
) => {
  if (
    edges?.find(
      (x) => x.target === connectionSource && x.source === connectionTarget
    )
  ) {
    return false;
  }
  return true;
};

export const isValidConnectionNodePort = (
  type: "in" | "out",
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  options: IValidConnectionOptions
) => {
  const reInput = type === "in" ? /input/i : /output/i;
  const reOutput = type === "in" ? /-out/i : /-in/i;
  const portCreate = connectionSource?.match(reOutput) || [];
  const inputSource = connectionTarget?.match(reInput) || [];
  const inputTarget = connectionSource?.match(reInput) || [];

  if (
    (inputSource.length > 0 && inputTarget.length > 0) ||
    portCreate.length > 0
  ) {
    return false;
  }

  if (
    !checkTypePort(type, nodes, {
      source: connectionSource,
      target: connectionTarget
    })
  ) {
    return false;
  }

  if (options && options?.callbackValidation) {
    return options.callbackValidation(
      connectionSource,
      connectionTarget,
      nodes,
      options.edges
    );
  }

  return true;
};

export const isValidConnectionNodePortCallbakInput = (
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  edges?: Edge[]
) => {
  if (
    edges?.find(
      (x) => x.target === connectionSource || x.source === connectionTarget
    )
  ) {
    return false;
  }
  return true;
};

export const isValidConnectionNodePortCallbakOutput = (
  connectionSource: string | null, // меняется местами для in - out
  connectionTarget: string | null, // меняется местами для in - out
  nodes: Node[],
  edges?: Edge[]
) => {
  if (edges?.find((x) => x.target === connectionTarget)) {
    return false;
  }
  return true;
};

//========= OLD VERSION ========
/*
export const isValidConnectionCreatePortOut = (
  nodes: Node[],
  connection: Connection
) => {
  const source = connection.source?.split("__") || ["", ""];
  const target = connection.target?.split("__") || ["", ""];
  console.log("dadad");
  const recipeNode =
    source[0] !== "" ? nodes.find((x) => x.id === source[0]) : undefined;
  //if the port is already in the links, then prohibit the connection
  if (recipeNode) {
    const meta = getMetaField(CreateDataFieldPort.outputs);
    const fieldID =
      target[1].replace(meta.search, meta.change) + "--" + target[0];

    if (recipeNode?.data.outputs.find((output) => output.id === fieldID)) {
      return false;
    }
  }
  // prohibiting connection of creation ports
  if (
    source[1] === RecipeCreaterPort.recipeIn &&
    target[1] === RecipeCreaterPort.recipeOut
  ) {
    console.log("1");
    return false;
  }
  // do not connect ports to ports in the same node area
  if (source[0] === target[0]) {
    console.log("2");
    return false;
  }
  const reOutput = /output/i;
  const outputSource = connection.source?.match(reOutput) || [];
  const outputTarget = connection.target?.match(reOutput) || [];

  //prohibiting the connection of the port if the id has "output"
  if (outputSource.length > 0 || outputTarget.length > 0) {
    console.log("3");
    return false;
  }
  const recipeOut = connection.target?.match(/-out/i) || [];

  //complete ban on connection to recipe output
  if (recipeOut.length > 0) {
    console.log("4");
    return false;
  }
  console.log("con out", connection);
  return true;
};
export const isValidConnectionCreatePortIn = (
  nodes: Node[],
  connection: Connection
) => {
  const source = connection.source?.split("__") || ["", ""];
  const target = connection.target?.split("__") || ["", ""];
  const recipeNode =
    target[0] !== "" ? nodes.find((x) => x.id === target[0]) : undefined;
  //if the port is already in the links, then prohibit the connection
  if (recipeNode) {
    const meta = getMetaField(CreateDataFieldPort.inputs);
    const fieldID =
      source[1].replace(meta.search, meta.change) + "--" + source[0];

    if (recipeNode?.data.inputs.find((input) => input.id === fieldID)) {
      return false;
    }
  }
  if (
    source[1] === RecipeCreaterPort.recipeIn &&
    target[1] === RecipeCreaterPort.recipeOut
  ) {
    return false;
  }
  // do not connect ports to ports in the same node area
  if (source[0] === target[0]) {
    return false;
  }
  const reOutput = /input/i;
  const outputSource = connection.source?.match(reOutput) || [];
  const outputTarget = connection.target?.match(reOutput) || [];

  //prohibiting the connection of the port if the id has "input"
  if (outputSource.length > 0 || outputTarget.length > 0) {
    return false;
  }
  const recipeOut = connection.source?.match(/-in/i) || [];

  //complete ban on connection to recipe input
  if (recipeOut.length > 0) {
    return false;
  }

  return true;
};

/*

const isValidConnectionInput = (nodes: Node[], connection: Connection) => {
  const reInput = /input/i;
  const reOutput = /-out/i;
  const portCreate = connection.source?.match(reOutput) || [];
  const inputSource = connection.source?.match(reInput) || [];

  if (inputSource.length > 0 || portCreate.length > 0) {
    return false;
  }

  const stages = getPortsInfo(nodes as Elements, connection);
  const inpType =
    stages.output?.typePort === "create"
      ? stages.input?.type
      : stages.output?.type;
  if (stages.sId[0] === stages.tId[0] || inpType !== stages.input?.type) {
    return false;
  }
  return true;
};

const isValidConnectionOutput = (nodes: Node[], connection: Connection) => {
  const stages = getPortsInfo(nodes as Elements, connection);
  console.log(stages, connection);
  const inpType =
    stages.output?.typePort === "create"
      ? stages.input?.type
      : stages.output?.type;
  if (stages.sId[0] === stages.tId[0] || stages.output?.type !== inpType) {
    return false;
  }
  const reOutput = /output/i;
  const outputTarget = connection.target?.match(reOutput) || [];
  const reInput = /-in/i;
  const portCreate = connection.target?.match(reInput) || [];

  if (outputTarget.length > 0 || portCreate.length > 0) {
    return false;
  }
  return true;
};
/// port node
const isValidConnectionInput = (nodes: Node[], connection: Connection) => {
  const reInput = /input/i;
  const reOutput = /-out/i;
  const portCreate = connection.target?.match(reOutput) || [];
  const inputSource = connection.source?.match(reInput) || [];
  const inputTarget = connection.target?.match(reInput) || [];

  if (
    (inputSource.length > 0 && inputTarget.length > 0) ||
    portCreate.length > 0
  ) {
    console.log("inp", 1);
    return false;
  }

  const stages = getPortsInfo(nodes as Elements, connection, {
    data_source: "outputs",
    data_target: "inputs"
  });
  const inpType =
    stages.output?.typePort === "create"
      ? stages.input?.type
      : stages.output?.type;
  if (stages.sId[0] === stages.tId[0] || inpType !== stages.input?.type) {
    return false;
  }
  return true;
};

const isValidConnectionOutput = (nodes: Node[], connection: Connection) => {
  const reOutput = /output/i;
  const stages = getPortsInfo(nodes as Elements, connection, {
    data_source: "outputs",
    data_target: "inputs"
  });
  const inpType =
    stages.input?.typePort === "create"
      ? stages.output?.type
      : stages.input?.type;
  if (stages.sId[0] === stages.tId[0] || stages.output?.type !== inpType) {
    return false;
  }
  const outputSource = connection.source?.match(reOutput) || [];
  const outputTarget = connection.target?.match(reOutput) || [];
  const reInput = /-in/i;
  const portCreate = connection.source?.match(reInput) || [];

  if (
    (outputSource?.length > 0 && outputTarget?.length > 0) ||
    portCreate.length > 0
  ) {
    console.log("inp2 cus out", connection);
    return false;
  }
  return true;
};
*/
