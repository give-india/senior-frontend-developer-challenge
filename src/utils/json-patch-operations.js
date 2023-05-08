export const perform_add = (obj, patch) => {
  let { path, value } = patch;
  let pathArray = path.substring(1).split("/");

  if (pathArray.length <= 1) {
    obj[pathArray[0]] = value;
  } else {
    let parentOfUpdatingValue = obj[pathArray[0]];

    for (let i = 1; i < pathArray.length - 1; i++) {
      parentOfUpdatingValue = parentOfUpdatingValue[pathArray[i]];
    }

    if (!parentOfUpdatingValue[pathArray[pathArray.length - 1]]) {
      parentOfUpdatingValue[pathArray[pathArray.length - 1]] = value;
    }
  }
  return obj;
};

export const perform_replace = (obj, patch) => {
  let { path, value } = patch;
  let pathArray = path.substring(1).split("/");

  if (pathArray.length <= 1) {
    obj[pathArray[0]] = value;
  } else {
    let parentOfUpdatingValue = obj[pathArray[0]];

    for (let i = 1; i < pathArray.length - 1; i++) {
      parentOfUpdatingValue = parentOfUpdatingValue[pathArray[i]];
    }

    parentOfUpdatingValue[pathArray[pathArray.length - 1]] = value;
  }
  return obj;
};

export const perform_remove = (obj, patch) => {
  let { path } = patch;
  let pathArray = path.substring(1).split("/");

  if (pathArray.length <= 1) {
    delete obj[pathArray[0]];
  } else {
    let parentOfUpdatingValue = obj[pathArray[0]];

    for (let i = 1; i < pathArray.length - 1; i++) {
      parentOfUpdatingValue = parentOfUpdatingValue[pathArray[i]];
    }

    delete parentOfUpdatingValue[pathArray[pathArray.length - 1]];
  }
  return obj;
};

export const detectChange = (path, patchArray) => {
  let operationOnPath = patchArray
    .map((item, i) => ({ ...item, _i: i }))
    .find((item) => item.path === path);

  if (operationOnPath?.op === "add") {
    return {
      op: "add",
      value: operationOnPath.value,
      index: operationOnPath._i,
      path: operationOnPath.path,
    };
  } else if (operationOnPath?.op === "replace") {
    return {
      op: "replace",
      value: operationOnPath.value,
      index: operationOnPath._i,
      path: operationOnPath.path,
    };
  } else {
    return {
      op: "unknown",
      value: null,
      index: null,
      path: null,
    };
  }
};
