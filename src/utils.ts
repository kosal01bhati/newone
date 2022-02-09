import { Connection, Elements } from "react-flow-renderer";
import {
  IPortData,
  INodeCustom,
  NodeType,
  IOffset,
  ICustomLink,
  RecipeCreaterPort,
  CreateDataFieldPort,
  EdgeType,
  IcreateDynamicPort,
  PipeType
} from "./model";

const getStage = (stages: any, from: string, to: string) => {
  return {
    stageFrom: stages.find((x) => x.id === from),
    stageTo: stages.find((x) => x.id === to)
  };
};
interface IMetaField {
  search: RegExp;
  change: string;
  keyLabel: CreateDataFieldPort;
}
export const getMetaField = (field: CreateDataFieldPort): IMetaField => {
  return field === CreateDataFieldPort.outputs
    ? {
        search: /input/gi,
        change: "output",
        keyLabel: CreateDataFieldPort.inputs
      }
    : {
        search: /output/gi,
        change: "input",
        keyLabel: CreateDataFieldPort.outputs
      };
};

export const createDynamicPort = ({
  nodeList,
  sourceIDS,
  field,
  targetIDS,
  isPortOut,
  dataLink
}: IcreateDynamicPort) => {
  const meta = getMetaField(field);
  let portCreateId =
    targetIDS[1].replace(meta.search, meta.change) + "--" + targetIDS[0];
  const recipeIndex = nodeList.findIndex((node) => node.id === sourceIDS[0]);
  const stage = nodeList.find((x) => x.id === targetIDS[0]);
  const item = stage?.data[meta.keyLabel].find(
    (f: IPortData) => f.id === targetIDS[1]
  );

  const updateNodes = [...nodeList];
  let isDublicatePort = false;

  if (recipeIndex !== -1) {
    isDublicatePort =
      !!nodeList[recipeIndex].data[field].find((x) => x.id === portCreateId) ||
      false;
    if (!isDublicatePort) {
      updateNodes[recipeIndex] = {
        ...updateNodes[recipeIndex],
        data: {
          ...updateNodes[recipeIndex].data,
          [field]: [
            ...updateNodes[recipeIndex].data[field],
            {
              id: portCreateId,
              label: item.label || "Label not found",
              typePort:
                field === CreateDataFieldPort.inputs ? "input" : "output",
              type: item.type,
              node_id: sourceIDS[0]
            }
          ]
        }
      };
    }
  }
  if (dataLink && !isDublicatePort) {
    const source = isPortOut
      ? sourceIDS[0] + "__" + portCreateId
      : targetIDS.join("__");
    const target = isPortOut
      ? targetIDS.join("__")
      : sourceIDS[0] + "__" + portCreateId;
    updateNodes.push({
      source,
      target,
      id: source + "__" + target,
      data: dataLink,
      type: EdgeType.buttonedge
    });
  }

  return {
    nodes: updateNodes,
    createPortID: portCreateId,
    nodeID: sourceIDS[0],
    isDublicatePort: isDublicatePort
  };
};
export const removeRecipePipe = (recipe: any, id: string) => {
  const ids = id.split("__");
  const from = [ids[0], ids[1]];
  const to = [ids[2], ids[3]];
  console.log("remove pipe recipe", from, to);
  if (
    from[1] !== RecipeCreaterPort.recipeIn &&
    to[1] !== RecipeCreaterPort.recipeOut
  ) {
    for (let i = 0; i < recipe.pipes.length; i++) {
      const item = recipe.pipes[i];

      if (
        item?.from?.stage?.id === from[0] &&
        item?.from?.output?.id === from[1] &&
        item?.to?.stage?.id === to[0] &&
        item?.to?.input?.id === to[1]
      ) {
        return {
          ...recipe,
          pipes: recipe.pipes.filter((pipe) => pipe.id !== item.id)
        };
      }

      if (
        item?.from === undefined &&
        item?.to?.stage.id === to[0] &&
        item?.to?.input.id === to[1]
      ) {
        return {
          ...recipe,
          pipes: recipe.pipes.filter((pipe) => pipe.id !== item.id)
        };
      }

      if (
        item?.to === undefined &&
        item?.from?.stage.id === from[0] &&
        item?.from?.output.id === from[1]
      ) {
        return {
          ...recipe,
          pipes: recipe.pipes.filter((pipe) => pipe.id !== item.id)
        };
      }
    }
  }

  return recipe;
};

export const addRecipePipe = (
  recipe: any,
  portIn: string[],
  portOut: string[]
) => {
  const sourceCheck = portIn[0].match(/-in/i) || [];
  const targetCheck = portOut[0].match(/-out/i) || [];
  console.log("sourceCheck-targetCheck", portIn[0], portOut[0]);
  //stage from - stage to
  if (
    portOut[1] !== RecipeCreaterPort.recipeIn &&
    portIn[1] !== RecipeCreaterPort.recipeOut &&
    portIn[1] !== RecipeCreaterPort.recipeIn &&
    portOut[1] !== RecipeCreaterPort.recipeOut &&
    targetCheck.length === 0 &&
    sourceCheck.length === 0
  ) {
    const { stageFrom, stageTo } = getStage(
      recipe.stages,
      portIn[0],
      portOut[0]
    );

    const pipe = {
      id: "pipe-id-" + Date.now().toString(),
      type: PipeType.pipe,
      from: {
        stage: stageFrom,
        output: stageFrom.job.outputs.find((item) => item.id === portIn[1])
      },
      to: {
        stage: stageTo,
        input: stageTo.job.inputs.find((item) => item.id === portOut[1])
      }
    };
    return { ...recipe, pipes: [...recipe.pipes, pipe] };
  }

  if (portIn[1] === RecipeCreaterPort.recipeIn || sourceCheck.length > 0) {
    const { stageTo } = getStage(recipe.stages, portIn[0], portOut[0]);

    const pipe = {
      id: "pipe-id-" + Date.now().toString(),
      type: PipeType.input,
      to: {
        stage: stageTo,
        input: stageTo.job.inputs.find((item) => item.id === portOut[1])
      }
    };
    return { ...recipe, pipes: [...recipe.pipes, pipe] };
  }

  if (portOut[1] === RecipeCreaterPort.recipeOut || targetCheck.length > 0) {
    const { stageFrom } = getStage(recipe.stages, portIn[0], portOut[0]);

    const pipe = {
      id: "pipe-id-" + Date.now().toString(),
      type: PipeType.output,
      from: {
        stage: stageFrom,
        output: stageFrom.job.outputs.find((item) => item.id === portIn[1])
      }
    };
    return { ...recipe, pipes: [...recipe.pipes, pipe] };
  }

  return recipe;
};

export const createStage = (recipe: any, data?: { [key: string]: any }) => {
  const stages: INodeCustom[] = [];
  if (recipe.stages) {
    recipe.stages.forEach((item: any, index: number) => {
      const { inputs, outputs } = createPorts(item, item.id);
      const offestY =
        index > 0 ? inputs.length * 100 + outputs.length * 100 : 20;
      const position: IOffset = recipe.meta.position[item.id] || {
        x: 326,
        y: offestY
      };
      stages.push({
        id: item.id,
        type: NodeType.nodeCustom,
        position: position,
        data: {
          name: item.job.name,
          inputs: inputs,
          outputs: outputs
        }
      });
    });
  }

  return stages;
};

const createPorts = (list: any, parrentNodeId: string) => {
  const outputs: IPortData[] = [];
  const inputs: IPortData[] = [];

  list.job?.outputs.forEach((item) => {
    outputs.push({
      id: item.id,
      label: item.name,
      typePort: "output",
      type: item.type,
      node_id: parrentNodeId
    });
  });

  list.job?.inputs.forEach((item) => {
    inputs.push({
      id: item.id,
      label: item.name,
      typePort: "input",
      type: item.type,
      node_id: parrentNodeId
    });
  });

  return {
    outputs,
    inputs
  };
};

export const createRecipeInOut = (
  recipe: any,
  offsetIn?: IOffset,
  offsetOut?: IOffset,
  data?: { [key: string]: any }
) => {
  let nodeIn: INodeCustom;
  let nodeOut: INodeCustom;
  const positionIn: IOffset = recipe.meta.position[recipe.id + "-in"] ||
    offsetIn || {
      x: 10,
      y: 300
    };
  nodeIn = {
    id: recipe.id + "-in",
    position: positionIn,
    type: NodeType.nodeRecipe,
    data: {
      name: "Recipe input", //"IN: " + recipe.name,
      inputs: [],
      outputs: [
        {
          id: RecipeCreaterPort.recipeIn,
          label: "",
          typePort: "create",
          node_id: recipe.id + "-in"
        }
      ],
      ...data
    }
  };

  const positionOut: IOffset = recipe.meta.position[recipe.id + "-out"] ||
    offsetOut || {
      x: 600,
      y: 300
    };
  nodeOut = {
    id: recipe.id + "-out",
    position: positionOut,
    type: NodeType.nodeRecipe,
    data: {
      name: "Recipe output", //"OUT: " + recipe.name,
      inputs: [
        {
          id: RecipeCreaterPort.recipeOut,
          label: "",
          typePort: "create",
          node_id: recipe.id + "-out"
        }
      ],
      outputs: [],
      ...data
    }
  };

  return {
    in: nodeIn,
    out: nodeOut
  };
};

export const createLink = (
  recipe: any,
  recipes: {
    in: INodeCustom;
    out: INodeCustom;
  },
  stages: INodeCustom[]
) => {
  const links: ICustomLink[] = [];
  const recipeUpdate = { ...recipes };

  recipe.pipes.forEach((item: any, index: number) => {
    const stageFrom = item.from
      ? stages.find((x) => x.id === item.from.stage.id)
      : undefined;
    const stageTo = item.to
      ? stages.find((x) => x.id === item.to.stage.id)
      : undefined;
    if (stageFrom && stageTo && item.type === PipeType.pipe) {
      const sourceID = stageFrom.id + "__" + item.from.output.id;
      const targetID = stageTo.id + "__" + item.to.input.id;
      links.push({
        id: sourceID + "__" + targetID,
        source: sourceID,
        target: targetID,
        type: "buttonedge"
      });
    }
    // соединение существ. in\out c stage

    if (stageFrom && item.type === PipeType.output) {
      const meta = getMetaField(CreateDataFieldPort.inputs);
      const inputID =
        item.from.output.id.replace(meta.search, meta.change) +
        "--" +
        stageFrom.id;
      const sourceID = stageFrom.id + "__" + item.from.output.id;
      const targetID = recipe.id + "-out__" + inputID;

      recipeUpdate.out.data.inputs.push({
        id: inputID,
        label: item.from.output.name,
        typePort: "input",
        type: item.from.output.type,
        node_id: recipe.id + "-out"
      });
      links.push({
        id: sourceID + "__" + targetID,
        source: sourceID,
        target: targetID,
        type: "buttonedge"
      });
    }

    if (stageTo && item.type === PipeType.input) {
      const meta = getMetaField(CreateDataFieldPort.outputs);
      const outputID =
        item.to.input.id.replace(meta.search, meta.change) + "--" + stageTo.id;
      const sourceID = recipe.id + "-in__" + outputID;
      const targetID = stageTo.id + "__" + item.to.input.id;

      recipeUpdate.in.data.outputs.push({
        id: outputID,
        label: item.to.input.name,
        typePort: "output",
        type: item.to.input.type,
        node_id: recipe.id + "-in"
      });
      links.push({
        id: sourceID + "__" + targetID,
        source: sourceID,
        target: targetID,
        type: "buttonedge"
      });
    }
  });

  return { links, recipes: recipeUpdate };
};

export const addStage = (stage: any, onRemove: (id: string) => void) => {
  const id = Date.now().toString();
  const stageNode = {
    id: id,
    type: NodeType.nodeCustom,
    position: { x: 50, y: 50 },
    data: {
      onRemove,
      isCreateNode: true,
      name: stage.job.name + " " + id,
      inputs: stage.job.inputs.map((item) => ({
        id: item.id,
        label: item.name,
        typePort: "input",
        type: item.type,
        node_id: id
      })),
      outputs: stage.job.outputs.map((item) => ({
        id: item.id,
        label: item.name,
        typePort: "output",
        type: item.type,
        node_id: id
      }))
    }
  };

  return { stage: { ...stage, id: id }, node: stageNode };
};

export const getConnectedTypePort = (
  source: string[],
  target: string[],
  params: Connection
) => {
  let values = {
    recipe: false,
    port: false,
    identicalTypes: false
  };

  if (
    (target[1] === RecipeCreaterPort.recipeOut ||
      source[1] === RecipeCreaterPort.recipeIn) &&
    params.source !== params.target
  ) {
    return { ...values, recipe: true };
  }

  if (
    params.source !== params.target &&
    target[1] !== RecipeCreaterPort.recipeIn &&
    source[1] !== RecipeCreaterPort.recipeOut
  ) {
    return { ...values, port: true };
  }

  return values;
};

export const getPortsInfo = (
  nodes: Elements,
  connection: Connection,
  {
    data_source,
    data_target
  }: {
    data_source: string;
    data_target: string;
  }
) => {
  const sId = connection.source?.split("__") || ["", ""];
  const tId = connection.target?.split("__") || ["", ""];
  const source = nodes.find((node) => node.id === sId[0]);
  const target = nodes.find((node) => node.id === tId[0]);
  const output: IPortData | undefined = source
    ? source.data[data_source].find((output: IPortData) => output.id === sId[1])
    : undefined;
  const input: IPortData | undefined = target
    ? target.data[data_target].find((input: IPortData) => input.id === tId[1])
    : undefined;
  return {
    source,
    target,
    output,
    input,
    sId,
    tId
  };
};
