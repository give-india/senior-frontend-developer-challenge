import cloneDeep from "lodash.clonedeep";
import { FC, useCallback, useState } from "react";
import { applyPatch } from "fast-json-patch";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { baseObj, baseObj2, patch2, patch } from "../data";
import "./App.css";
import { SingleIndent } from "./components/styled";
import DisplayDifference from "./components/DisplayDifference";
import AdditionalEntries from "./components/AdditionalEntries";

type IOperationType = "add" | "replace";
interface IOperation {
  value: string;
  op: IOperationType;
}

interface IPatch {
  op: IOperationType;
  path: string;
  value: Record<string, unknown> | string;
}

const OpenBracket: FC<{ isArray?: boolean }> = ({ isArray }) => {
  return isArray ? <span>{"["}</span> : <span>{"{"}</span>;
};

const CloseBracket: FC<{ isArray?: boolean }> = ({ isArray }) => {
  return isArray ? <span>{"]"}</span> : <span>{"}"}</span>;
};

const applyFullIndentation: (
  indentation: number,
  keyPrefix: string
) => JSX.Element[] = (indentation, keyPrefix) => {
  return Array(indentation)
    .fill(null)
    .map((_, index) => <SingleIndent key={keyPrefix + index} />);
};

const editBaseJson = (
  obj: Record<string, unknown>,
  path: string[],
  operation: IOperation
) => {
  if (path.length == 1) {
    let [key] = path;
    obj[key] = operation.value;
    return false;
  } else if (path.length == 0) {
    return false;
  }
  let key = path.shift();
  return editBaseJson(obj[key], path, operation);
};

const App: FC<{}> = () => {
  const [baseJson, setJson] = useState<Record<string, unknown>>(() => {
    // return baseObj;
    return baseObj2;
  });
  const [patchJson, setPatchJson] = useState<IPatch[]>(() => {
    // return patch
    return patch2 as IPatch[];
  });

  // const [inpBaseJson, setInpBaseJson] = useState("");
  // const [inpPatchJson, setInpPatchJson] = useState("");

  const acceptClickHandler = useCallback(
    (path: string[], operation: IOperation) => {
      const baseClone = cloneDeep(baseJson);
      if (operation.op == "replace") {
        editBaseJson(baseClone, [...path], operation);
        setJson(baseClone);
      } else if (operation.op == "add") {
        const allAddOps: IPatch[] = patchJson.filter(({ op }) => op == "add");
        const newDoc = applyPatch(baseClone, allAddOps).newDocument;
        setJson(newDoc);
      }
      patchJson.splice(
        patchJson.findIndex((p) => p.path === "/" + path?.join("/")),
        1
      );
      setPatchJson([...patchJson]);
    },
    []
  );

  const rejectClickHandler = useCallback((path: string[]) => {
    patchJson.splice(
      patchJson.findIndex((p) => p.path === "/" + path?.join("/")),
      1
    );
    setPatchJson([...patchJson]);
  }, []);

  const acceptRejectHandlers = (path: string[], operation: IOperation) => {
    return (
      <>
        <Button
          size="sm"
          variant="link"
          onClick={() => acceptClickHandler(path, operation)}
        >
          Accept
        </Button>

        <Button
          size="sm"
          variant="link"
          onClick={() => rejectClickHandler(path)}
        >
          Reject
        </Button>
      </>
    );
  };

  const renderRow = ({
    key,
    value,
    indentation,
    path,
  }: {
    key: string;
    value: React.ReactNode;
    indentation: number;
    path?: string[];
  }): JSX.Element => {
    const { op, value: newValue } =
      patchJson.find((p) => {
        return p.path === "/" + path?.join("/");
      }) || {};

    if (op && newValue && op == "add") {
      return (
        <Stack
          key={key + value}
          direction="horizontal"
          gap={1}
          className="align-items-start"
        >
          {applyFullIndentation(indentation, key + value)}
          <AdditionalEntries
            newKey={key}
            newValue={newValue}
            acceptRejectHandlers={() =>
              acceptRejectHandlers(path!, { op, value: newValue })
            }
          />
        </Stack>
      );
    }

    if (op && newValue && op == "replace") {
      return (
        <Stack
          key={key + value}
          direction="horizontal"
          gap={1}
          className="align-items-start"
        >
          {applyFullIndentation(indentation, key + value)}
          <div key={key + value + (indentation + 1)}>{key} :</div>
          <div key={key + value + (indentation + 2)}>
            <DisplayDifference
              newValue={newValue}
              oldValue={value as string}
              acceptRejectHandlers={() =>
                acceptRejectHandlers(path!, { op, value: newValue })
              }
            />
          </div>
        </Stack>
      );
    }

    return (
      <Stack
        key={key + value}
        direction="horizontal"
        gap={1}
        className="align-items-start"
      >
        {applyFullIndentation(indentation, key + value)}
        <div key={key + value + (indentation + 1)}>{key} :</div>
        <div key={key + value + (indentation + 2)}>{value}</div>
      </Stack>
    );
  };

  const render = ({
    obj,
    indentation = 0,
    path = [],
  }: {
    obj: Record<string, unknown>;
    indentation?: number;
    path?: string[];
  }): JSX.Element[] => {
    let rez: JSX.Element[] = [];
    for (let key in obj) {
      if (typeof obj[key] == "object") {
        rez.push(
          renderRow({
            key,
            value: <OpenBracket isArray={Array.isArray(obj[key])} />,
            indentation,
          })
        );
        rez = [
          ...rez,
          ...render({
            obj: obj[key] as Record<string, unknown>,
            indentation: indentation + 1,
            path: [...path, key],
          }),
        ];
        rez.push(
          <Stack key={key + indentation} direction="horizontal" gap={1}>
            {applyFullIndentation(indentation, key)}
            <div>
              <CloseBracket isArray={Array.isArray(obj[key])} />
            </div>
          </Stack>
        );
      } else {
        rez.push(
          renderRow({
            key,
            value: obj[key] as string,
            indentation,
            path: [...path, key],
          })
        );
      }
    }
    return rez;
  };

  //Temporarily applying Add Patch
  const allAddOps: IPatch[] = patchJson.filter(({ op }) => op == "add");
  const withAddPatches = applyPatch(cloneDeep(baseJson), allAddOps).newDocument;

  return (
    <div className="container-lg mt-4">
      {/* BUG in form */}
      {/* <Form
        onSubmit={(e) => {
          e.preventDefault();
          setJson(cloneDeep(JSON.parse(inpBaseJson)));
          setPatchJson(cloneDeep(JSON.parse(inpPatchJson)));
        }}
      >
        <Stack direction="horizontal" className="justify-content-between">
          <Form.Group>
            <Form.Label>Base Json</Form.Label>
            <Form.Control
              as="textarea"
              rows={20}
              cols={50}
              value={inpBaseJson}
              onChange={(e) => {
                setInpBaseJson(e.target?.value.replace(/\s/g, ""));
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>JSON Patch</Form.Label>
            <Form.Control
              as="textarea"
              rows={20}
              cols={50}
              value={inpPatchJson}
              onChange={(e) => {
                setInpPatchJson(e.target?.value.replace(/\s/g, ""));
              }}
            />
          </Form.Group>
        </Stack>
        <Button className="mt-2" variant="primary" type="submit">
          Primary
        </Button>
      </Form> */}
      <Stack direction="horizontal" className="justify-content-around align-items-start">
        <div>
          <h2>Base Object</h2>
          <pre>{JSON.stringify(baseJson, null, 2)}</pre>
        </div>
        <div>
          <h2>JSON Patch</h2>
          <pre>{JSON.stringify(patchJson, null, 2)}</pre>
        </div>
      </Stack>

      <div className="diff-viewer bg-dark text-light my-3 p-3">
        <OpenBracket />
        <div className="ps-3">{render({ obj: withAddPatches })}</div>
        <CloseBracket />
      </div>
    </div>
  );
};

export default App;
