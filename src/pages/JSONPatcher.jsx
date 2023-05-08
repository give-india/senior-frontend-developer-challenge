import React, { useEffect, useState } from "react";
import JSONInputView from "../containers/JSONInputView";
import JSONActions from "../containers/JSONActions";
import * as jsonPatchOperations from "../utils/json-patch-operations";

const JSONPatcher = () => {
  const [baseObj, setBaseObj] = useState({});
  const [patchArray, setPatchArray] = useState([]);

  const processPatch = (baseObj, patchArray) => {
    setBaseObj(baseObj);
    setPatchArray(patchArray);
  };

  const removePatch = (index) => {
    let updatedPatchArray = patchArray.filter((item, i) => index !== i);
    setPatchArray([...updatedPatchArray]);
  };

  const approvePatch = (patch) => {
    let obj = {};
    if (patch.op === "add") {
      obj = jsonPatchOperations.perform_add(baseObj, patch);
      setBaseObj({ ...obj });
    } else if (patch.op === "replace") {
      obj = jsonPatchOperations.perform_replace(baseObj, patch);
      setBaseObj({ ...obj });
    }
    removePatch(patch.index);
  };

  return !Object.keys(baseObj)?.length ? (
    <JSONInputView processPatch={processPatch} />
  ) : (
    <JSONActions
      baseObj={baseObj}
      patchArray={patchArray}
      removePatch={removePatch}
      approvePatch={approvePatch}
    />
  );
};

export default JSONPatcher;
