import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { JSONInput } from "./InputForm";


const JSONPatchInputForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<JSONInput>();
  
  return (
    <form>
      <div>
        <label>JSON Patch/Patches</label>
        <TextField error 
          variant="standard" 
          {...register("json", { required: true })} 
          placeholder="Enter Valid JSON Patch"
          helperText="Please enter proper JSON"
          fullWidth
          multiline={true}
          rows={10}>  
          </TextField>
      </div>
      <div>
        <Button type="submit" variant="contained">Save</Button>
      </div>
    </form>
  )
}

export default JSONPatchInputForm;