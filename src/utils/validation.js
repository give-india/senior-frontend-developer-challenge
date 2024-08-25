import * as jsonpatch from "fast-json-patch";

export const isValidJsObject = (input) => {
  try {
    const parsed = convertStringToOriginalState(input);
    return (
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    );
  } catch (error) {
    return false;
  }
};

export const convertStringToOriginalState = (str) => {
  try {
    // eslint-disable-next-line
    const parsed = new Function(`return ${str};`)();
    return parsed;
  } catch (error) {
    return null;
  }
};

export const validatePatch = (patches, baseObject) => {
  try {
    if (!Array.isArray(patches))
      return { isValid: false, errorDetails: "Patches must be an array." };

    if (patches.length === 0) return { isValid: true, errorDetails: "" };
    const validationErrors = jsonpatch.validate(patches, baseObject);

    if (validationErrors === undefined) {
      return { isValid: true, errorDetails: "" };
    } else {
      const splitErrorDetails = validationErrors?.message?.split("name") || [];

      const errorMessage = splitErrorDetails[0]
        ? `${
            splitErrorDetails[0]
          }. Please review the following operation details: ${JSON.stringify(
            validationErrors?.operation
          )} for your input object`
        : validationErrors?.message || "An unknown error occurred";

      return { isValid: false, errorDetails: errorMessage };
    }
  } catch (error) {
    return { isValid: false, errorDetails: "An unexpected error occurred." };
  }
};
