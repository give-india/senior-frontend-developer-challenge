import React, { ChangeEvent, useEffect, useState } from "react";
import "./styles/App.css";
import * as jsonpatch from "fast-json-patch";
import JsonInput from "./components/JsonInput";
import PatchOperation from "./components/PatchOperation";
import PatchResult from "./components/PatchResult";
import PatchPreview from "./components/PatchPreview";

const App: React.FC = () => {
  const [jsonText, setJsonText] = useState<any>();
  const [isJsonValid, setIsJsonValid] = useState<boolean>(true);
  const [isPatchValid, setIsValidPatch] = useState<boolean>(true);
  const [patchOperationsText, setPatchOperationsText] = useState<any>();
  const [patchedPreview, setPatchedPreview] = useState<any>();
  const [patchedResult, setPatchedResult] = useState<any>();

  useEffect(() => {
    if (patchOperationsText !== undefined) {
      previewAllPatchOperations();
    }
  }, [patchOperationsText]);

  const handleJsonChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setJsonText(inputText);
    try {
      const parsed = JSON.parse(inputText);
      setIsJsonValid(true);
      setPatchedResult(parsed);
    } catch (e) {
      setIsJsonValid(false);
      console.log(e);
    }
  };

  const handlePatchChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setPatchOperationsText(inputText);
    try {
      JSON.parse(inputText);
      setIsValidPatch(true);
    } catch (e) {
      setIsValidPatch(false);
      console.log(e);
    }
  };

  const handleAcceptClicked = (idx: number) => {
    const operations = parsePatchOperations();
    applyPatchOperation(operations[idx]);
    operations.splice(idx, 1);
    setPatchOperationsText(JSON.stringify(operations, undefined, 2));
  };

  const handleRejectClicked = (idx: number) => {
    const operations = parsePatchOperations();
    patchOperationsText.splice(idx, 1);
    setPatchOperationsText(JSON.stringify(operations, undefined, 2));
  };

  const previewPatchOperation = (operation: jsonpatch.Operation) => {
    if (isInputValid()) {
      const result = jsonpatch.applyOperation(
        parseJsonText(),
        operation,
        false,
        false,
      ).newDocument;
      setPatchedPreview(result);
    }
  };

  const applyPatchOperation = (operation: jsonpatch.Operation) => {
    if (isInputValid()) {
      const result = jsonpatch.applyOperation(
        patchedResult,
        operation,
        false,
        false,
      ).newDocument;
      setPatchedResult(result);
    }
  };

  const previewAllPatchOperations = () => {
    if (isInputValid() && parsePatchOperations().length > 0) {
      const result = jsonpatch.applyPatch(
        patchedResult,
        parsePatchOperations(),
        false,
        false,
      ).newDocument;
      setPatchedPreview(result);
    }
  };

  const onPatchOperationMouseOver = (opIdx: number) => {
    previewPatchOperation(parsePatchOperations()[opIdx]);
  };

  const onPatchOperationMouseLeave = () => {
    previewAllPatchOperations();
  };

  const applyAllPatchOperations = () => {
    if (isInputValid()) {
      const result = jsonpatch.applyPatch(
        patchedResult,
        parsePatchOperations(),
        false,
        false,
      ).newDocument;
      setPatchedResult(result);
      setPatchOperationsText("[]");
    }
  };

  const parseJsonText = () => {
    try {
      return JSON.parse(jsonText);
    } catch (err) {}
  };

  const isInputValid = () => isPatchValid && isJsonValid;

  const parsePatchOperations = () => {
    try {
      const operations = JSON.parse(patchOperationsText);
      if (!Array.isArray(operations)) {
        return [operations];
      }
      return operations;
    } catch (err) {
      return [];
    }
  };

  return (
    <div className="App">
      <h1>JSON Patch</h1>
      <div className="container">
        <JsonInput
          value={jsonText}
          onChange={handleJsonChange}
          label="JSON"
          error={!isJsonValid}
        />
        <JsonInput
          value={patchOperationsText}
          onChange={handlePatchChange}
          label="Patch Operations"
          error={!isPatchValid}
        />
      </div>
      <>
        <h3>Patch Operations (Hover to preview)</h3>
        <div className="patch-operation-table">
          {parsePatchOperations().map((operation: any, idx: any) => (
            <PatchOperation
              key={idx}
              operation={operation}
              onMouseOver={() => onPatchOperationMouseOver(idx)}
              onMouseOut={onPatchOperationMouseLeave}
              onAccept={() => handleAcceptClicked(idx)}
              onReject={() => handleRejectClicked(idx)}
            />
          ))}
        </div>
      </>
      {parsePatchOperations().length > 0 && (
        <button onClick={applyAllPatchOperations}>Accept All</button>
      )}
      <div className="container">
        <PatchResult value={patchedResult} />
        {patchedPreview && parsePatchOperations().length > 0 && (
          <PatchPreview left={parseJsonText()} right={patchedPreview} />
        )}
      </div>
    </div>
  );
};

export default App;
