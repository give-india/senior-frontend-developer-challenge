import React from "react";
import { base_obj, patch_array } from "../constants/sampleData";
import ReactJson from "react-json-view";

const JSONInputView = ({ processPatch }) => {
  return (
    <div className="json-input-taker-wrapper">
      <div className="json-input-taker">
        <div className="json-input-base-object">
          <ReactJson src={base_obj} />
        </div>
        <div className="json-input-patch-array">
          <ReactJson src={patch_array} />
        </div>
      </div>
      <div className="json-input-taker-actions">
        <button
          className="action-btn-primary"
          onClick={() => processPatch(base_obj, patch_array)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default JSONInputView;
