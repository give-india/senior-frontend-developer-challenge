import React from "react";

const PatchResult = (props: { value: any }) => (
  <div>
    <h3>Result</h3>
    <textarea
      className="input-box"
      value={JSON.stringify(props.value, undefined, 2)}
      readOnly={true}
    />
  </div>
);

export default PatchResult;
