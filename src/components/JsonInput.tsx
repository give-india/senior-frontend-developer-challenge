import React, { ChangeEvent } from "react";

interface JsonInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  error?: boolean;
}

const JsonInput: React.FC<JsonInputProps> = ({
  value,
  onChange,
  label,
  error,
}) => {
  return (
    <div>
      <h3>{label}</h3>
      <textarea className="input-box" value={value} onChange={onChange} />
      {error && <p className="error-message">Invalid JSON</p>}
    </div>
  );
};

export default JsonInput;
