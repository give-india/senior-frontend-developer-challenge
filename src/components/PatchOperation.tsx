import * as jsonpatch from "fast-json-patch";
import React from "react";

interface PatchOperationProps {
  operation: jsonpatch.Operation;
  onMouseOut: () => void;
  onMouseOver: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const PatchOperation: React.FC<PatchOperationProps> = ({
  operation,
  onMouseOut,
  onMouseOver,
  onAccept,
  onReject,
}) => {
  return (
    <div
      className="container patch-operation-row"
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      <p className="patch-operation-row-item">{`${operation.op} - ${operation.path}`}</p>
      <button className="patch-operation-row-item" onClick={onAccept}>
        Accept
      </button>
      <button className="patch-operation-row-item" onClick={onReject}>
        Reject
      </button>
    </div>
  );
};

export default PatchOperation;
