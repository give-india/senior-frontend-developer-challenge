import React, { useState } from 'react';
import './Styles.css';
import PatchInput from './PatchInput/PatchInput';
import ErrorPopup from './ErrorPopup/ErrorPopUp';


function JsonPatchReview({jsonObject, setJsonObject}) {
  const [showError, setShowError] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [patches, setPatches] = useState([]);
  const [isPatchAdded, setIsPatchAdded] = useState(false)

  const handleApprove = (index) => {
    const patch = patches[index];
    applyPatch(jsonObject, patch);
    setJsonObject({ ...jsonObject });
    createNwwPatch(index)
  };


const applyPatch = (object, patch) => {
  if(patch.path[0] !== '/'){
    setShowError('Path name must start with "/"');
  }
  const pathArray = patch.path.slice(1).split('/');
  let obj = object;
  console.log(obj[pathArray[0]],'kkkkk')
  for (let i = 0; i < pathArray.length - 1; i++) {
    obj = obj[pathArray[i]];
    console.log(obj[pathArray[i]],'kkkkk')

  }
  switch (patch.op) {
    case 'replace':
      if(!obj[pathArray[pathArray.length-1]]){
        setShowError('This operation cannnot be done as there is no such path')
      }
      obj[pathArray[pathArray.length - 1]] =  patch.value;
      break;
    case 'add':
      obj[pathArray[pathArray.length - 1]] = patch.value;
      break;
    case 'remove':
      if(!obj[pathArray[pathArray.length-1]]){
        setShowError('This operation cannnot be done as there is no such path')
      }
      delete obj[pathArray[pathArray.length - 1]];
      break;
  }
};

  const createNwwPatch = (index) => {
    const newPatches = patches.filter((_, i) => i !== index);
    setPatches(newPatches);
  };
  const handleClose = () =>{
    setShowError('')
  }
  return (
    <div className='parent-class'>
     <div className='child-class'>
     <div className='heading'>Current Object State:</div>
     <div className='current-object'>
     {JSON.stringify(jsonObject).split(',').map((line, index) => (
        <div key={index} className="json-line">
          {line}
        </div>
      ))}
     </div>

     </div>
<div className=''>
{
  isPatchAdded ? <button onClick={() => setIsPatchAdded(false)} > Add More Patches...  </button> : <PatchInput setIsPatchAdded={setIsPatchAdded} patches={patches} setPatches={setPatches}/>
}
     <div className='child-class'>
      <div className='heading'>Pending Patch Operations:</div>
      <ErrorPopup showError={showError} onClose={handleClose} />
      {patches.length > 0 ? (
        <div>
          {patches.map((patch, index) => (
            <div
              key={index}
              className="patch-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span>{JSON.stringify(patch)}</span>
              {hoveredIndex === index && (
                <div >
                  <button className="accept-button" onClick={() => handleApprove(index)}>Approve</button>
                  <button className="reject-button" onClick={() => createNwwPatch(index)}>Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No more patches to apply.</p>
      )}
      </div>
</div>
    </div>
  );
}

export default JsonPatchReview;
