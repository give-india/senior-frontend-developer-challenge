import React, { useState } from 'react';

import { JSONPatch } from 'jsonpatch';
import ReactJson from 'react-json-view';

import './App.css';

function App() {
  const [start, setStart] = useState(false);
  const [baseObjectString, setBaseObjectString] = useState('');
  const [patchString, setPatchString] = useState('');
  const [baseObject, setBaseObject] = useState(null);
  const [patch, setPatch] = useState([]);
  const [operations, setOperations] = useState([]);
  const [compiledObject, setCompiledObject] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(-1);

  const toggleFields = (flag) => {
    setStart(flag);
    if (flag) {
      try {
        setBaseObject(JSON.parse(baseObjectString));
        setCompiledObject(JSON.parse(baseObjectString));
        const opsArray = JSON.parse(patchString.replace(/ /g, ''));
        setPatch(opsArray);
        setOperations(opsArray);
        setSelectedOperation(-1);
        setTimeout(() => {
          document.getElementById('operations').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        }, 0);
      } catch(err) {
        console.error(err);
        alert('Invalid base object/patch');
        setStart(false);
      }
    } else {
      setBaseObjectString('');
      setPatchString('');
      setTimeout(() => {
        document.getElementById('editor').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }, 0);
    }
  }

  const applyOperation = (index) => {
    setCompiledObject((new JSONPatch([operations[index]])).apply(compiledObject));
    const newOperations = JSON.parse(JSON.stringify(operations));
    newOperations.splice(index, 1);
    setOperations(newOperations);
    setSelectedOperation(-1);
  }

  const rejectOperation = () => {
    const newOperations = JSON.parse(JSON.stringify(operations));
    newOperations.splice(selectedOperation, 1);
    setOperations(newOperations);
    setSelectedOperation(-1);
  }

  return (
    <React.Fragment>
      <main id='editor' className='field-container'>
        <textarea disabled={start} className='object-field' value={baseObjectString}
          onChange={(event) => setBaseObjectString(event.target.value)}
        >
        </textarea>
        <div className='buttons-container'>
          <button onClick={() => toggleFields(true)}>Start</button>
          <button onClick={() => toggleFields(false)}>Reset</button>
        </div>
        <textarea disabled={start} className='patch-field' value={patchString}
          onChange={(event) => setPatchString(event.target.value)}
        >
        </textarea>
      </main>
      {
        start && (
          <main id='operations' className='field-container'>
            <section className='object-field'>
              <ReactJson src={compiledObject} displayDataTypes={false} 
                displayObjectSize={false} enableClipboard={false}
              >
              </ReactJson>
            </section>
            <div className='buttons-container'>
              <button onClick={() => toggleFields(false)}>Reset</button>
              {
                operations.length !== 0 && (
                  <button onClick={() => applyOperation(0)}>Apply Next &gt;&gt;</button>
                )
              }
              {
                selectedOperation !== -1 && (
                  <React.Fragment>
                    <button onClick={() => applyOperation(selectedOperation)}>Apply</button>
                    <button onClick={() => rejectOperation()}>Reject</button>
                    <button onClick={() => setSelectedOperation(-1)}>Deselect</button>
                  </React.Fragment>
                )
              }
            </div>
            <section className='patch-field'>
            {
              operations.map((operation, index) => (
                <div className={`operation ${selectedOperation === index ? 'selected' : ''}`} onClick={() => {setSelectedOperation(index)}} key={index} >
                  <ReactJson src={operation} displayDataTypes={false} 
                    displayObjectSize={false} enableClipboard={false}
                  >
                  </ReactJson>
                </div>
              ))
            }
            </section>
          </main>
        )
      }
    </React.Fragment>
  );
}

export default App;
