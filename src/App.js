import "./App.css";
import { useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";

function App() {
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
  let data = {
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
  const [transformedObj, setTransformedObj] = useState({});

  useEffect(() => {
    try {
      const elem = document.getElementById("og-object");
      elem.innerHTML = prettyPrintJson.toHtml(data);
      const jsonPatchItem = document.getElementById("json-patch");
      jsonPatchItem.innerHTML = prettyPrintJson.toHtml(jsonPatch);
      if (Object.keys(transformedObj).length) {
        const transformedHtml = jsonToHtml(transformedObj);
        const transformedPatchEle =
          document.getElementById("transformed-patch");
        transformedPatchEle.innerHTML = transformedHtml;
      }
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line
  }, [transformedObj]);

  function jsonToHtml(obj, indent = 0) {
    var html = "";
    var indentSize = 2; // Number of spaces to indent each level
    var indentStr = "&nbsp;".repeat(indent * indentSize); // String of spaces for indentation

    if (typeof obj === "object" && !Array.isArray(obj)) {
      html += indentStr + "{<br>";
    } else if (Array.isArray(obj)) {
      html += "[<br>";
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!Array.isArray(obj))
          html += indentStr + '<span class="json-key">' + prop + ": </span>";
        if (obj[prop] !== "object" && obj[prop]["type"] === "render-html") {
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
          // html += "<br>";
        } else if (
          typeof obj[prop] === "object" ||
          obj[prop]?.["valueType"] === "object"
        ) {
          // console.log(obj[prop]);
          html += jsonToHtml(obj[prop], indent + 1);
        } else {
          html += '<span class="json-string">' + obj[prop] + "</span>";
          if (!Array.isArray(obj) || isNaN(parseInt(prop))) {
            // Check if prop is not an integer (in case of arrays)
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
  }

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
      });
    }
    return transformObj(path.slice(1), obj[path[0]], item);
  };

  const applyPatch = () => {
    let updatedPatch = jsonPatch.reduce((acc, item) => {
      let splitPaths = item.path.split("/").filter((item) => item !== "");
      transformObj(splitPaths, acc, item);
      return acc;
    }, data);
    setTransformedObj(updatedPatch);
  };

  function prettify() {
    // var jsonInput = document.getElementById('json-input').value;
    // var jsonObject = JSON.parse(transformObj);
    debugger;
    var jsonOutput = JSON.stringify(transformedObj, null, 4);
    var html = "<pre>" + jsonOutput + "</pre>";

    html = html.replace(
      /"([^"]+)"\s*:/g,
      '<span class=`json-key`>"$1":</span>'
    );
    html = html.replace(/"([^"]+)"/g, '<span class="string-value">"$1"</span>');
    html = html.replace(/(\d+)/g, '<span class="number-value">$1</span>');
    html = html.replace(
      /(true|false)/g,
      '<span class="boolean-value">$1</span>'
    );

    // jsonOutput.innerHTML = html;
    document.getElementById("transformed-patch").innerHTML = html;
    // document.getElementById('json-output').innerHTML = jsonOutput;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div>
            <h3>Orignal Object</h3>
            <pre id="og-object"></pre>
          </div>
        </div>
        <div className="column">
          <div className="flex justify-space-between">
            <h3 style={{ display: "inline-block", margin: "unset" }}>
              JSON Patch
            </h3>
            <button className="apply-button" onClick={() => applyPatch()}>
              Apply Patch
            </button>
          </div>
          <div>
            <pre id="json-patch"></pre>
          </div>
        </div>
        <div className="column">
          <h3>Resultant Object</h3>
          <pre id="transformed-patch"></pre>
        </div>
      </div>
    </div>
  );
}

export default App;
