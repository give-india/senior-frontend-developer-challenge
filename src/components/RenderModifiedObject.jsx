import React, { useEffect, useState } from "react";
import * as jsonPatchOperations from "../utils/json-patch-operations";
import { FiCheck, FiX } from "react-icons/fi";

const indentSpace = 16;

const RenderModifiedObject = ({
  baseObj,
  patchArray,
  removePatch,
  approvePatch,
}) => {
  const _baseObj = { ...baseObj };
  const [copyBaseObj, setCopyBaseObj] = useState(_baseObj);

  const insertAddOpAndSort = (copyBaseObj, patchArray) => {
    let modifiedObj = patchArray
      .filter((item) => item.op === "add")
      .reduce(
        (mObj, item) => {
          return jsonPatchOperations.perform_add(mObj, item);
        },
        { ...copyBaseObj }
      );

    setCopyBaseObj(
      Object.fromEntries(Object.entries({ ...modifiedObj }).sort())
    );
  };

  useEffect(() => {
    insertAddOpAndSort(copyBaseObj, patchArray);
  }, [patchArray]);

  const renderActionButtons = (patch) => {
    if (patch.op === "unknown") return <></>;

    return (
      <div className="patch-action-btns">
        <button
          className="patch-action-approve"
          onClick={() => approvePatch(patch)}
        >
          <FiCheck />
        </button>
        <button
          className="patch-action-reject"
          onClick={() => {
            removePatch(patch.index);
            if (patch.op === "add") {
              let _newObj = jsonPatchOperations.perform_remove(
                copyBaseObj,
                patch
              );
              setCopyBaseObj(
                Object.fromEntries(Object.entries(_newObj).sort())
              );
            }
          }}
        >
          <FiX />
        </button>
      </div>
    );
  };

  const renderJson = (key, value, indentLevel, isAtLastIndex, path = "") => {
    let changeApplied = jsonPatchOperations.detectChange(path, patchArray);
    //compare the value

    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      //value is pure object
      indentLevel++;
      return (
        <div
          className="position-relative render-change-wrapper"
          style={{
            marginLeft: `${indentSpace * indentLevel}px`,
            whiteSpace: "nowrap",
          }}
        >
          {renderActionButtons(changeApplied)}
          <div
            className={`${
              changeApplied.op === "add"
                ? "mod-add"
                : changeApplied.op === "replace"
                ? "mod-replace"
                : ""
            }`}
          >
            <pre>
              {`${!!key || key === 0 ? key + ": " : ""}`}
              {"{"}
            </pre>
            {Object.keys(value)?.map((item, i) => {
              return renderJson(
                item,
                value[item],
                indentLevel,
                i === Object.keys(value).length - 1,
                `${path}/${item}`
              );
            })}
            <pre>{`${!isAtLastIndex ? "}," : "}"}`}</pre>
          </div>
          {changeApplied.op === "replace" && (
            <div className={`mod-add`}>
              <pre>
                {`${!!key || key === 0 ? key + ": " : ""}`}
                {"{"}
              </pre>

              {Object.keys(changeApplied.value)?.map((item, i) => {
                return renderJson(
                  item,
                  value[item],
                  indentLevel,
                  i === Object.keys(value).length - 1,
                  `${path}/${item}`
                );
              })}
            </div>
          )}
          {changeApplied.op === "replace" && (
            <pre>{`${!isAtLastIndex ? "}," : "}"}`}</pre>
          )}
        </div>
      );
    } else if (typeof value === "object" && Array.isArray(value)) {
      //value is array
      indentLevel++;
      return (
        <div
          className="position-relative render-change-wrapper"
          style={{
            marginLeft: `${indentSpace * indentLevel}px`,
            whiteSpace: "nowrap",
          }}
        >
          {renderActionButtons(changeApplied)}
          <div
            className={`${
              changeApplied.op === "add"
                ? "mod-add"
                : changeApplied.op === "replace"
                ? "mod-replace"
                : ""
            }`}
          >
            <pre>
              {`${!!key || key === 0 ? key + ": " : ""}`}
              {"["}
            </pre>
            {value?.map((item, i) => {
              return renderJson(
                i,
                item,
                indentLevel,
                i === value.length - 1,
                `${path}/${i}`
              );
            })}
            <pre>{`${!isAtLastIndex ? "]," : "]"}`}</pre>
          </div>
          {changeApplied.op === "replace" && (
            <div className={`mod-add`}>
              <pre>
                {`${!!key || key === 0 ? key + ": " : ""}`}
                {"["}
              </pre>
              {changeApplied.value?.map((item, i) => {
                return renderJson(
                  i,
                  item,
                  indentLevel,
                  i === value.length - 1,
                  `${path}/${i}`
                );
              })}
            </div>
          )}
          {changeApplied.op === "replace" && (
            <pre>{`${!isAtLastIndex ? "]," : "]"}`}</pre>
          )}
        </div>
      );
    } else {
      //value is other that object and array
      indentLevel++;
      return (
        <div
          className="position-relative render-change-wrapper"
          style={{
            marginLeft: `${indentSpace * indentLevel}px`,
            whiteSpace: "nowrap",
          }}
        >
          {renderActionButtons(changeApplied)}
          <div
            className={`${
              changeApplied.op === "add"
                ? "mod-add"
                : changeApplied.op === "replace"
                ? "mod-replace"
                : ""
            }`}
          >
            <pre>
              {`${!!key || key === 0 ? key + ": " : ""}`}"{value}"
              {changeApplied.op !== "replace" && `${!isAtLastIndex ? "," : ""}`}
            </pre>
          </div>
          {changeApplied.op === "replace" && (
            <div className={`mod-add`}>
              <pre>
                {`${!!key || key === 0 ? key + ": " : ""}`}"
                {changeApplied.value}"
              </pre>
            </div>
          )}
          {changeApplied.op === "replace" && (
            <pre>{`${!isAtLastIndex ? "," : ""}`}</pre>
          )}
        </div>
      );
    }
  };

  return (
    <div className="json-with-modifications" style={{ paddingLeft: "18px" }}>
      {renderJson("", copyBaseObj, 0, true, "")}
    </div>
  );
};

export default RenderModifiedObject;
