import React, { memo } from "react";
import {
  Connection,
  Elements,
  Handle,
  Node,
  NodeComponentProps,
  useStoreState
} from "react-flow-renderer";
import { IPortData } from "../model";

import {
  isValidConnectionCreatePortsRecipe,
  isValidConnectionPort,
  isValidRecipeIputCallbak,
  isValidRecipeOutputCallbak
} from "../validator-port";

const RecipeNode = ({ data }: NodeComponentProps) => {
  const portCreateOut: IPortData | undefined = data.outputs.find(
    (x: IPortData) => x.typePort === "create"
  );
  const portCreateIn: IPortData | undefined = data.inputs.find(
    (x: IPortData) => x.typePort === "create"
  );
  const { nodes, edges } = useStoreState((store) => store);
  return (
    <div className="custom-node">
      <div className="custom-node-header">{data.name}</div>

      {data.inputs.length > 0 && (
        <div className="custom-node-subheader custom-node-subheader__inputs">
          <div className="custom-node-port-in">{"Inputs"}</div>
          {data.inputs.map((input: IPortData) =>
            input.typePort !== "create" ? (
              <div
                className="custom-node-port custom-node-port-in"
                key={"i-" + input.id}
              >
                {input.label}
                <Handle
                  type="target"
                  target="10"
                  id={input.id}
                  position="left"
                  className="circle-port circle-port-left"
                  isValidConnection={(connection) =>
                    isValidConnectionPort(
                      "in",
                      connection.target,
                      connection.source,
                      nodes,
                      {
                        edges,
                        callbackValidation: isValidRecipeOutputCallbak
                      }
                    )
                  }
                />
              </div>
            ) : null
          )}
        </div>
      )}

      {data.outputs.length > 0 && (
        <div className="custom-node-subheader custom-node-subheader__output">
          <div className="custom-node-port-out">{"Outputs"}</div>
          {data.outputs.map((output: IPortData) =>
            output.typePort !== "create" ? (
              <div
                className="custom-node-port custom-node-port-out"
                key={"o-" + output.id}
              >
                {output.label}

                <Handle
                  type="source"
                  position="right"
                  id={output.id}
                  className="circle-port circle-port-right"
                  isValidConnection={(connection) =>
                    isValidConnectionPort(
                      "out",
                      connection.source,
                      connection.target,
                      nodes,
                      {
                        edges,
                        callbackValidation: isValidRecipeIputCallbak
                      }
                    )
                  }
                />
              </div>
            ) : null
          )}
        </div>
      )}
      {/* RECIPE INPUT */}
      {portCreateOut && (
        <div className="custom-node-creater">
          <Handle
            type="source"
            position="right"
            id={portCreateOut.id}
            className="port-add"
            isValidConnection={(connection) =>
              isValidConnectionCreatePortsRecipe(
                "out",
                connection.target,
                connection.source,
                nodes
              )
            }
          />
          <span className="custom-node-creater-label">+</span>
        </div>
      )}
      {/* RECIPE output */}
      {portCreateIn && (
        <div className="custom-node-creater">
          <Handle
            type="target"
            position="left"
            id={portCreateIn.id}
            className="port-add"
            isValidConnection={(connection) =>
              isValidConnectionCreatePortsRecipe(
                "in",
                connection.source,
                connection.target,
                nodes
              )
            }
          />
          <span className="custom-node-creater-label">+</span>
        </div>
      )}
    </div>
  );
};

export const RecipeNodeComponent = memo(RecipeNode);
