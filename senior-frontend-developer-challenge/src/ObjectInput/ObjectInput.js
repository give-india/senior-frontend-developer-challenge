import React, { useState } from 'react';
import './ObjectInput.css'; // Import the external CSS file

const JsonInput = ({ onJsonChange }) => {
  const [jsonInput, setJsonInput] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    try {
      const parsedJson = JSON.parse(e.target.value);
      onJsonChange(parsedJson);
    } catch (error) {
      // Handle parse error
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedJson = JSON.parse(event.target.result);
          setJsonInput(event.target.result);
          onJsonChange(parsedJson);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="json-input-container">
      <h3>Insert Your JSON Object</h3>
      <textarea 
        placeholder="Enter JSON object" 
        value={jsonInput} 
        onChange={handleInputChange} 
        rows={10}
        className="json-textarea"
      />
      <div>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileUpload} 
          className="json-file-input"
        />
      </div>
    </div>
  );
};

const ObjectInput = ({ setIsObjectSubmitted, jsonObject, setJsonObject }) => {

  const handleJsonChange = (newJsonObject) => {
    setJsonObject(newJsonObject);
  };

  const handleSubmit = () => {
    if (jsonObject) {
      setIsObjectSubmitted(true);
    }
  };

  return (
    <div className="object-input-container">
      <JsonInput onJsonChange={handleJsonChange} />
      <button 
        onClick={handleSubmit} 
        disabled={!jsonObject} 
      >
        Submit
      </button>
    </div>
  );
};

export default ObjectInput;
