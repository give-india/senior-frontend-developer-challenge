import "./App.css";
import { useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";

let jsonPatch = [
  {
    op: "replace",
    path: "/tags/5",
    value: "spbm18",
  },
  {
    op: "replace",
    path: "/tags/4",
    value: "bengaluru10k-18",
  },
  {
    op: "replace",
    path: "/tags/3",
    value: "lfc18-wow2",
  },
  {
    op: "replace",
    path: "/tags/2",
    value: "tcs10k-18",
  },
  {
    op: "replace",
    path: "/tags/1",
    value: "lfc18-cbp",
  },
  {
    op: "replace",
    path: "/tags/0",
    value: "lfc18",
  },
  {
    op: "add",
    path: "/tags/6",
    value: "housie18",
  },
  {
    op: "add",
    path: "/tags/7",
    value: "hoh18",
  },
  {
    op: "add",
    path: "/tags/8",
    value: "lfc19",
  },
  {
    op: "add",
    path: "/tags/9",
    value: "tbpp",
  },
  {
    op: "add",
    path: "/tags/10",
    value: "housie19",
  },
  {
    op: "add",
    path: "/tags/11",
    value: "gfc2020",
  },
  {
    op: "replace",
    path: "/external_profiles/1/uri",
    value: "https://www.facebook.com/pages/DIYA-Foundation/",
  },
  {
    op: "replace",
    path: "/external_profiles/1/label",
    value: "Facebook",
  },
  {
    op: "add",
    path: "/external_profiles/2",
    value: {
      label: "Youtube",
      uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
    },
  },
  {
    op: "add",
    path: "/official_name",
    value: "Diya Foundation",
  },
];
let ogJsonData = {
  slug: "diya-foundation",
  name: "Diya Foundation",
  registration_number: "386/98-99",
  auditor_name: "Das Kumar And Company",
  created_at: "2013-02-08T09:28:51.000Z",
  updated_at: "2020-02-25T06:11:35.814Z",
  external_profiles: [
    {
      label: "Website",
      uri: "http://www.diyafoundation-india.org/Site/index.html",
    },
    {
      label: "Youtube",
      uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
    },
  ],
  tags: ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"],
};

const App = () => {
  const [transformedObj, setTransformedObj] = useState({}); // complex object holds the info of patch edits
  const [patch, setPatch] = useState(jsonPatch);
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    try {
      const elem = document.getElementById("og-object");
      elem.innerHTML = prettyPrintJson.toHtml(ogJsonData);
      if (Object.keys(transformedObj).length) {
        const transformedHtml = jsonToHtml(transformedObj);
        const transformedPatchEle =
          document.getElementById("transformed-patch");
        transformedPatchEle.innerHTML = null;
        transformedPatchEle.innerHTML = transformedHtml;
        attachRejectPatch();
      }
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line
  }, [transformedObj]);

  useEffect(() => {
    setShowDot(true);
    const jsonPatchItem = document.getElementById("json-patch");
    if (!jsonPatchItem) return;
    jsonPatchItem.innerHTML = null;
    jsonPatchItem.innerHTML = prettyPrintJson.toHtml(patch);
    setTimeout(() => {
      setShowDot(false);
    }, 3000);
  }, [patch]);

  const attachRejectPatch = () => {
    let elements = document.getElementsByClassName("reject-patch");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", () => {
        let ogJsonDataInfo = elements[i].getAttribute("data-info");
        let filteredPatch = patch.filter(
          (_, index) => index !== parseInt(ogJsonDataInfo)
        );
        setPatch(filteredPatch);
      });
    }
  };

  const jsonToHtml = (obj, indent = 0) => {
    let html = "";
    let indentSize = 2; // Number of spaces to indent each level
    let indentStr = "&nbsp;".repeat(indent * indentSize); // String of spaces for indentation

    if (typeof obj === "object" && !Array.isArray(obj)) {
      html += indentStr + "{<br>";
    } else if (Array.isArray(obj)) {
      html += "[<br>";
    }
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!Array.isArray(obj))
          html += indentStr + '<span class="json-key">' + prop + ": </span>";
        if (obj[prop] !== "object" && obj[prop]["type"] === "render-html") {
          html += `<span class="html-render-span">`;
          if (obj[prop]["prevValue"]) {
            html +=
              '<span class="json-string red-bg strike-through">' +
              obj[prop]["prevValue"] +
              "</span>";
          }
          if (typeof obj[prop]["currentValue"] === "object") {
            html +=
              '<div class="json-string green-bg">' +
              jsonToHtml(obj[prop]["currentValue"], indent + 1) +
              "</div>";
          } else {
            html +=
              '<span class="json-string green-bg">' +
              obj[prop]["currentValue"] +
              "</span>";
          }
          // Add ability to hover and accept and reject the patch
          html += `<span class="tooltiptext">
          <button class='approve-patch' data-info='${obj[prop]["hashValue"]}'>Approve</button>
          <button class='reject-patch' data-info='${obj[prop]["hashValue"]}'>Reject</button>
        </span>`;
          html += `</span>`;
        } else if (
          typeof obj[prop] === "object" ||
          obj[prop]?.["valueType"] === "object"
        ) {
          html += jsonToHtml(obj[prop], indent + 1);
        } else {
          html += '<span class="json-string">' + obj[prop] + "</span>";
          if (!Array.isArray(obj) || isNaN(parseInt(prop))) {
            html += ",";
          }
        }
        html += "<br>";
      }
    }
    if (typeof obj === "object" && !Array.isArray(obj)) {
      html += indentStr + "}";
    } else if (Array.isArray(obj)) {
      html += indentStr + "]";
    }
    return html;
  };

  // converts each patch item into complex object
  // which holds the previous value
  // which can be represented very well with html
  const transformObj = (path, obj, item) => {
    const { value, op } = item;
    if (path.length === 1) {
      let prevValue = obj[path[0]];
      return (obj[path[0]] = {
        currentValue: value,
        prevValue: prevValue,
        type: "render-html",
        valueType: typeof value,
        operation: op,
        hashValue: item.index, // can be complex value for retreiving patch
      });
    }
    return transformObj(path.slice(1), obj[path[0]], item);
  };

  const applyPatch = () => {
    let updatedPatch = patch.reduce((acc, item, index) => {
      let splitPaths = item.path.split("/").filter((item) => item !== "");
      transformObj(splitPaths, acc, { ...item, index });
      return acc;
    }, ogJsonData);
    setTransformedObj(updatedPatch);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div>
            <h3 className="header">Orignal Object</h3>
            <pre id="og-object"></pre>
          </div>
        </div>
        <div className="column">
          <div className="flex justify-space-between align-center">
            <div>
              <h3 style={{ display: "inline-block", margin: "unset" }}>
                JSON Patch
              </h3>
              {/* to notify user that patch has been updated */}
              <div className="red-dot-container">
                {showDot && <div className="red-dot"></div>}
              </div>
            </div>
            <button className="apply-button" onClick={() => applyPatch()}>
              Apply Patch
            </button>
          </div>
          <div>
            <pre id="json-patch"></pre>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginBottom: 20 }}>
        <h3 className="header">Resultant Object</h3>
        <div>
          <pre id="transformed-patch"></pre>
        </div>
      </div>
    </div>
  );
};

export default App;
