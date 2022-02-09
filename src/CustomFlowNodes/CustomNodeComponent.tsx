import React, { memo } from "react";
import { Handle, NodeComponentProps, useStoreState } from "react-flow-renderer";
import { IPortData } from "../model";
import {
  isValidConnectionNodePort,
  isValidConnectionNodePortCallbakInput,
  isValidConnectionNodePortCallbakOutput
} from "../validator-port";

const CustomNode = (props: NodeComponentProps) => {
  const { data, id } = props;
  const { nodes, edges } = useStoreState((store) => store);

  return (
    <div className="custom-node">
      {data.isCreateNode && (
        <button
          className="custom-node-remove"
          onClick={() => {
            data?.onRemove(id, true);
          }}
        >
          X
        </button>
      )}
      <div className="custom-node-header">{data.name}</div>
      <div className="custom-node-subheader custom-node-subheader__inputs">
        <div className="custom-node-port-in">{"Inputs"}</div>
        {data.inputs.map((input: IPortData) => (
          <div
            className="custom-node-port custom-node-port-in"
            key={"i-" + input.id}
          >
            {input.label}
            <div className={``}>
              <Handle
                type="target"
                target="10"
                id={input.id}
                position="left"
                className="circle-port circle-port-left"
                isValidConnection={(connection) =>
                  isValidConnectionNodePort(
                    "in",
                    connection.target,
                    connection.source,
                    nodes,
                    {
                      edges,
                      callbackValidation: isValidConnectionNodePortCallbakInput
                    }
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="custom-node-subheader custom-node-subheader__output">
        <div className="custom-node-port-out">{"Outputs"}</div>
        {data.outputs.map((output: IPortData) => (
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
                isValidConnectionNodePort(
                  "out",
                  connection.source,
                  connection.target,
                  nodes,
                  {
                    edges,
                    callbackValidation: isValidConnectionNodePortCallbakOutput
                  }
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomNodeComponent = memo(CustomNode);
