import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as jsonpatch from 'fast-json-patch';
import ReactDiffViewer from 'react-diff-viewer-continued';

const JsonDiff = () => {
  const {currentJson, oldJson} = useSelector((state:RootState) => state.input);
  const diff = jsonpatch.compare(oldJson, currentJson)

  const handleLineClick = (lineId:any) => {
    const lineNumber = Number(lineId.slice(2));
    const textArea = document.getElementsByClassName("jsoneditor-text")[0];
    textArea.scrollTop = lineNumber * 14;
  }
  return(
    <ReactDiffViewer
    oldValue={JSON.stringify(oldJson, null, 2)}
    newValue={JSON.stringify(currentJson, null, 2)}
    splitView={true}
    onLineNumberClick={handleLineClick}
    
  />
  );
}

export default JsonDiff;