// import ReactDiffViewer from "react-diff-viewer";
import { useCallback, useState, FC } from "react";
import cloneDeep from "lodash.clonedeep";
import { baseObj2, patch2 } from "../data";
import "./App.css";

type IOperationType = "add" | "replace";
interface IOperation {
  value: string;
  op: IOperationType;
}

interface IPatch {
  op: IOperationType;
  path: string;
  value: string;
}

const replaceEntity = (oldValue: string, newValue: string): JSX.Element => {
  return (
    <>
      <span style={{ backgroundColor: "red" }}>{oldValue}</span>
      <span style={{ backgroundColor: "green" }}>{newValue}</span>
    </>
  );
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
    return baseObj2;
  });
  const [patchJson, setPatchJson] = useState<IPatch[]>(() => {
    return patch2 as IPatch[];
  });

  const acceptReject = (path: string[], operation: IOperation) => {
    return (
      <>
        <button
          onClick={() => {
            const baseClone = cloneDeep(baseJson);
            editBaseJson(baseClone, [...path], operation);
            setJson(baseClone);
            patchJson.splice(
              patchJson.findIndex((p) => p.path === '/'+path?.join("/")),
              1
            );
            setPatchJson([...patchJson])
          }}
        >
          yes
        </button>

        <button
          onClick={(e) => {
            patchJson.splice(
              patchJson.findIndex((p) => p.path === '/'+path?.join("/")),
              1
            );
            setPatchJson([...patchJson]);
            // setPatchJson([]);
          }}
        >
          *
        </button>
      </>
    );
  };

  const renderRow = ({
    key,
    value,
    tabs,
    path,
  }: {
    key: string;
    value: string;
    tabs: number;
    path?: string[];
  }): JSX.Element => {
    const { op, value: newValue } =
      patchJson.find((p) => {
        return p.path === '/'+path?.join("/");
      }) || {};
    return (
      <tr key={`${key}-${value}`}>
        {Array(tabs)
          .fill(null)
          .map((_, index) => (
            <td key={key + value + index}></td>
          ))}
        <td key={key + value + (tabs + 1)}>{`${key}`}</td>
        <td key={key + value + (tabs + 2)}>
          :
          {op && newValue ? (
            <>
              {replaceEntity(value, newValue)}{" "}
              {acceptReject(path!, { op, value: newValue })}
            </>
          ) : (
            value
          )}
        </td>
        {/* <td key={key + value + (tabs + 2)}>{`: "${value}"`}</td> */}
      </tr>
    );
  };

  const render = ({
    obj,
    tabs = 0,
    path = [],
  }: {
    obj: Record<string, unknown>;
    tabs?: number;
    path?: string[];
  }): JSX.Element[] => {
    let rez: JSX.Element[] = [];
    for (let key in obj) {
      if (typeof obj[key] == "object") {
        rez.push(renderRow({ key, value: "{", tabs }));
        rez = [
          ...rez,
          ...render({
            obj: obj[key] as Record<string, unknown>,
            tabs: tabs + 1,
            path: [...path, key],
          }),
        ];
        rez.push(
          <tr key={"end-" + tabs}>
            {Array(tabs)
              .fill(null)
              .map((_, index) => (
                <td key={key + index}></td>
              ))}
            <td>{`}`}</td>
          </tr>
        );
      } else {
        rez.push(
          renderRow({
            key,
            value: obj[key] as string,
            tabs,
            path: [...path, key],
          })
        );
      }
    }
    return rez;
  };

  return (
    <>
      <div className="container-input">
        <textarea
          value={JSON.stringify(baseJson, null, 2)}
          name="base"
          id=""
          cols={50}
          rows={20}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setJson(JSON.parse(e.target?.value));
          }}
        ></textarea>
        <textarea
          value={JSON.stringify(patchJson, null, 2)}
          name="patch"
          id=""
          cols={50}
          rows={20}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPatchJson(JSON.parse(e.target?.value));
          }}
        ></textarea>
      </div>
      <div className="diff-viewer">{render({ obj: baseJson })}</div>
    </>
  );
};

export default App;
