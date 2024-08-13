import { useState } from 'react';
import './App.css';
import JsonPatchReview from './JsonPatchReview';
import ObjectInput from './ObjectInput/ObjectInput';

function App() {
  const [isObjectSubmitted, setIsObjectSubmitted] = useState(false)
  const [jsonObject, setJsonObject] = useState(null);
  return (
    <div className="App">
     {isObjectSubmitted ?
      <JsonPatchReview jsonObject={jsonObject} setJsonObject={setJsonObject} /> : <ObjectInput setIsObjectSubmitted={setIsObjectSubmitted} jsonObject={jsonObject}  setJsonObject={setJsonObject}/> 
     }
    </div>
  );
}

export default App;
