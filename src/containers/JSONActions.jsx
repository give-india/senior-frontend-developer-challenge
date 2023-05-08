import React, { useState } from "react";
import ReactJson from "react-json-view";
import RenderModifiedObject from "../components/RenderModifiedObject";

const JSONActions = ({ baseObj, patchArray, removePatch, approvePatch }) => {
  return (
    <div className="json-actions-wrapper">
      <div className="json-actions-header"></div>
      <div className="json-actions-body">
        <div className="json-actions-modified-obj">
          <RenderModifiedObject
            baseObj={baseObj}
            patchArray={patchArray}
            removePatch={removePatch}
            approvePatch={approvePatch}
          />
        </div>
        <div className="json-actions-patches">
          <ReactJson src={patchArray} />
        </div>
      </div>
    </div>
  );
};

export default JSONActions;
