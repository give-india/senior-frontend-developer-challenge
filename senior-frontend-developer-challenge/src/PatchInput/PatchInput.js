import React, { useState } from 'react';
import './PatchInput.css'; // Import the external CSS file

const PatchInput = ({ patches, setPatches, setIsPatchAdded }) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [value, setValue] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.name);
  };

  const handlePathChange = (e) => {
    setPath(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddPatch = () => {
    setPatches([...patches, { op: name, path: path, value: value }]);
    setName('');
    setPath('');
    setValue('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedJson = JSON.parse(event.target.result);
          setPatches(parsedJson);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    setIsPatchAdded(true);
  };

  const checkDisable = () => {
    return name.length === 0 || path.length === 0 ;
  };

  return (
    <div className="patch-input-container">
      <h3>Enter JSON Patch Operations</h3>
      <div className="manual-input-section">
        <h4>Manual Input</h4>
        <div className="input-container">
          <div className="operation-group">
            <label>
              Operation:
              {['add', 'replace', 'remove'].map((op) => (
                <label key={op} className="radio-label">
                  <input
                    type="radio"
                    name={op}
                    value={name}
                    checked={name === op}
                    onChange={handleNameChange}
                  />
                  {op}
                </label>
              ))}
            </label>
          </div>
          <div className="input-field">
            <label>
              Path:
              <input
                type="text"
                name="path"
                value={path}
                onChange={handlePathChange}
                placeholder="path"
                required
              />
            </label>
          </div>
          <div className="input-field">
            <label>
              Value:
              <input
                type="text"
                name="value"
                value={value}
                onChange={handleValueChange}
                placeholder="value"
                required
              />
            </label>
          </div>
        </div>
        <button
          className="button"
          onClick={handleAddPatch}
          disabled={checkDisable()}
        >
          Save and add another operation
        </button>
      </div>
      <div className="or-divider">or</div>
      <div className="upload-section">
        <h4>Upload JSON Patch File</h4>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
        />
      </div>
      <button onClick={handleSubmit}>
        Submit Patches
      </button>
    </div>
  );
};

export default PatchInput;
