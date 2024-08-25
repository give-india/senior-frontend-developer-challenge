import React from "react";
import { Textarea } from "@chakra-ui/react";

const CommonInput = ({ placeholder, value, onChange, rows = 5, ...props }) => {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      {...props}
    />
  );
};

export default CommonInput;
