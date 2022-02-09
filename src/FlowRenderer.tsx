import React, { useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import ReactFlow, {
  removeElements,
  addEdge,
  isEdge,
  Background,
  Controls,
  Edge,
  Node,
  Elements,
  OnLoadParams,
  FlowElement,
  Connection,
  ReactFlowProvider
} from "react-flow-renderer";
import { recipeMock, stageTest } from "./data.mock";
import { CustomNodeComponent } from "./CustomFlowNodes/CustomNodeComponent";
import { RecipeNodeComponent } from "./CustomFlowNodes/RecipeNodeComponent";
import {
  createStage,
  createRecipeInOut,
  createLink,
  createDynamicPort,
  addStage,
  addRecipePipe,
  removeRecipePipe,
  getConnectedTypePort
} from "./utils";
import {
  NodeType,
  EdgeType,
  RecipeCreaterPort,
  CreateDataFieldPort
} from "./model";
import { CustomEdgeButton } from "./CustomEdge/CustomEdgeButtom";
const storeValue = localStorage.getItem("fake_store");
const recipeData = storeValue !== null ? JSON.parse(storeValue) : recipeMock;
const nodeTypes = {
  [NodeType.nodeCustom]: CustomNodeComponent,
  [NodeType.nodeRecipe]: RecipeNodeComponent
};

const edgeTypes = {
  [EdgeType.buttonedge]: CustomEdgeButton
};

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();
const onNodeContextMenu = (event: any, node: Node) => {
  event.preventDefault();
  console.log("context menu:", node);
};

const stages = createStage(recipeData);
const { links, recipes } = createLink(
  recipeData,
  createRecipeInOut(recipeData),
  stages
);

const newElements = [...stages, recipes.in, recipes.out, ...links];

const HorizontalFlow = () => {
  const [elements, setElements] = useState<Elements>(newElements);
  const [revertElements, setRevertElements] = useState<Elements>(newElements);
  const [recipe, setRecipe] = useState<any>(recipeData);
  const [isConnectionStart, setConnectionStart] = useState(false);

  const onElementsRemove = (elementsToRemove: Elements) => {
    setElements((els: Elements) => removeElements(elementsToRemove, els));
  };

  const onRemove = (id: string, isNode?: boolean) => {
    setElements((els: Elements) => {
      const node = els.find((x) => x.id === id);
      const edges = isNode ? els.filter((x) => x.id.indexOf(id) > -1) : [];
      return removeElements([(node as FlowElement) || [], ...edges], els);
    });

    if (isNode) {
      setRecipe({
        ...recipe,
        stages: recipe.stages.filter((x) => x.id !== id),
        pipes: recipe.pipes.filter(
          (pipe) => pipe?.to?.stage.id !== id || pipe?.from?.stage.id !== id
        )
      });
    } else {
      setRecipe((items: any) => removeRecipePipe(items, id));
    }
  };

  const createNewEdge = (source: string, target: string) => {
    setElements((els: Elements) =>
      addEdge(
        {
          source,
          target,
          id: source + "__" + target,
          data: {
            onRemove: onRemove
          },
          type: EdgeType.buttonedge
        },
        els
      )
    );
  };

  const onConnect = (params: Connection) => {
    const sourcePordId = params.source!.split("__");
    const targetPortId = params.target!.split("__");
    const isConnect = getConnectedTypePort(sourcePordId, targetPortId, params);
    let isDublicate = false;
    const updateElements = (
      sourceIDS: string[],
      targetIDS: string[],
      fieldPort: CreateDataFieldPort,
      paramsfield: "source" | "target"
    ) => {
      const allEdges = R.filter(isEdge, elements);
      const matchingEdges = R.filter(
        (edge: Edge) => edge[paramsfield] === params[paramsfield],
        allEdges
      );
      setElements((els) => {
        const nodes = [...removeElements(matchingEdges, els)];
        const values = createDynamicPort({
          nodeList: nodes,
          sourceIDS,
          field: fieldPort,
          targetIDS,
          isPortOut: fieldPort === CreateDataFieldPort.outputs ? true : false,
          dataLink: {
            onRemove: onRemove
          }
        });
        isDublicate = values.isDublicatePort;
        return values.nodes;
      });
    };

    if (isConnect.recipe) {
      if (sourcePordId[1] === RecipeCreaterPort.recipeIn) {
        updateElements(
          sourcePordId,
          targetPortId,
          CreateDataFieldPort.outputs,
          "source"
        );
      }

      if (targetPortId[1] === RecipeCreaterPort.recipeOut) {
        updateElements(
          targetPortId,
          sourcePordId,
          CreateDataFieldPort.inputs,
          "target"
        );
      }
      if (!isDublicate) {
        setRecipe((items) =>
          targetPortId[1] === RecipeCreaterPort.recipeOut
            ? addRecipePipe(items, sourcePordId, [
                RecipeCreaterPort.recipeOut,
                RecipeCreaterPort.recipeOut
              ])
            : addRecipePipe(
                items,
                [RecipeCreaterPort.recipeIn, RecipeCreaterPort.recipeIn],
                targetPortId
              )
        );
      }
    } else if (isConnect.port) {
      createNewEdge(params.source!, params.target!);
      setRecipe((items) => addRecipePipe(items, sourcePordId, targetPortId));
    }
  };

  const onNodeDragStop = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    setRecipe((item) => ({
      ...item,
      meta: {
        ...item.meta,
        position: {
          ...item.meta.position,
          [node.id]: { x: node.position.x, y: node.position.y }
        }
      }
    }));
  };

  useEffect(() => {
    const items = [...elements].map((item) => {
      if (item.type === EdgeType.buttonedge) {
        return {
          ...item,
          data: {
            onRemove: onRemove
          }
        };
      } else {
        return item;
      }
    });
    setElements(items);
    setRevertElements(items);
  }, []);

  const onAdd = useCallback(
    (stage: any) => {
      const value = addStage(stage, onRemove);
      setElements((els) => els.concat(value.node));
      setRecipe({ ...recipe, stages: [...recipe.stages, value.stage] });
    },
    [setElements]
  );

  const onSave = useCallback(() => {
    //fake save
    localStorage.setItem("fake_store", JSON.stringify(recipe));
    console.log("recipe save", recipe);
    alert("refresh the page");
  }, [recipe]);

  const onClearStore = useCallback(() => {
    localStorage.removeItem("fake_store");
    alert("Store clear. Refresh the page");
  }, [recipe]);

  const onCancel = useCallback(() => {
    setElements(revertElements);
    setRecipe(recipeData);
  }, [elements, recipe]);

  const onConnectStart = () => {
    setConnectionStart(true);
  };
  const onConnectStop = () => {
    setConnectionStart(false);
  };
  const onConnectEnd = () => {
    setConnectionStart(false);
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        className={`${
          isConnectionStart ? "connection__start" : "connection__none"
        }`}
        elements={elements}
        elementsSelectable={true}
        selectNodesOnDrag={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        onNodeContextMenu={onNodeContextMenu}
        onNodeDragStop={onNodeDragStop}
        onConnectEnd={onConnectEnd}
        onConnectStop={onConnectStop}
        onConnectStart={onConnectStart}
      >
        <div className="controls-node">
          <button onClick={() => onAdd(stageTest)}>add node</button>
          <button onClick={() => onSave()}>Save</button>
          {JSON.stringify(revertElements) !== JSON.stringify(elements) && (
            <button onClick={() => onCancel()}>Cancel</button>
          )}
          <button onClick={() => onClearStore()}>Clear Store</button>
        </div>
        <Background variant="lines" gap={24} size={1} />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default HorizontalFlow;
