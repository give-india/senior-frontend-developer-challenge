import React from "react";
// @ts-ignore
import JsonDiffReact from "jsondiffpatch-react";

function PatchPreview(props: { left: any; right: any }) {
  return (
    <div>
      <h3>Preview</h3>
      <div className="input-box">
        <JsonDiffReact
          left={props.left}
          right={props.right}
          show={true}
          annotated={false}
        />
      </div>
    </div>
  );
}

export default PatchPreview;
