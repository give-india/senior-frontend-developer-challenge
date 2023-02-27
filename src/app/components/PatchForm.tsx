import { ErrorMessage } from "@hookform/error-message";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Patch, PatchData, PatchStatus, savePatches } from "../store/patch-slice";

//@ts-ignore
const PatchInputForm = ({prevFormStep, modalClose}) => {
  const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm();
  const patches:Patch[] = useSelector((state:RootState) => state.patch.patches);
  const patchStr = patches ? JSON.stringify(patches, null, 2) : '';
  const dispatch = useDispatch();
 

  //@ts-ignore
  const onSubmit = (data) => {
    try {
      let jsonData = JSON.parse(data.patch);
      let allPatches:Patch[] = [...patches];
      if(Array.isArray(jsonData)){
        const newPatches:Patch[] = jsonData.map((data) => {
          return {
            data:{...data},
            status:PatchStatus.NOTAPPLICABLE
          } as Patch;
        });
        allPatches  = allPatches.concat(newPatches);
      } else {
        const newPatch:Patch= {data:{...jsonData}, status:PatchStatus.NOTAPPLICABLE};
        allPatches.push(newPatch);
      }
      dispatch(savePatches(allPatches));
      modalClose();
    }catch(e) {
      setError("patch", {type:"custom", "message":"Please enter valid patch"});
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField key="patch-text-field" 
      variant="standard"
      {...register("patch", { required: true })}
      fullWidth={true}
      multiline={true}
      rows={10}
      placeholder={"Enter Single patch or array."}
      defaultValue={patchStr} >
      </TextField>
      {errors.patch ? 
              (errors.patch.type === 'required' && 
                <p style={{color: "#800000" }}>JSON Patch is required.</p>
              ): null
            }
            {errors.patch ? 
              (errors.patch.type === 'custom' && 
                <p style={{color: "#800000" }}>Please enter a proper patch json</p>
              ): null
            }
      <div>
        <Button type="submit" variant="outlined" onClick={prevFormStep}>Back</Button>
        <Button type="submit" variant="contained" >Finish</Button>
      </div>
  </form>
  );
}

export default PatchInputForm;