import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Patch, PatchData, PatchStatus, savePatches } from "../store/patch-slice";
import { JSONInput } from "./InputForm";


const PatchInputForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const patches:Patch[] = useSelector((state:RootState) => state.patch.patches);
  const dispatch = useDispatch();
  //@ts-ignore
  const onSubmit = (data) => {
    let jsonData = JSON.parse(data.patch);
    let allPatches:Patch[] = [...patches];
    //{data: patchData, status: PatchStatus.NOTAPPLICABLE} as Patch);
    if(Array.isArray(jsonData)){
      const newPatches:Patch[] = jsonData.map((data) => {
          return {
            data:{...data},
            status:PatchStatus.NOTAPPLICABLE
          } as Patch;
      });
      allPatches  = allPatches.concat(newPatches);
    }else{
      const newPatch:Patch= {data:{...jsonData}, status:PatchStatus.NOTAPPLICABLE};
      allPatches.push(newPatch);
    }

    dispatch(savePatches(allPatches));
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField key="patch-text-field" 
      variant="standard"
      {...register("patch", { required: true })}
      fullWidth={true}
      multiline={true}
      rows={10}>
      </TextField>
      <input type="submit" />
  </form>
  );
}

export default PatchInputForm;