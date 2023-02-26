import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveInput } from "../store/json-input.slice";
import Layout from "./Layout";

export type JSONInput = {
  json: string,
}

enum  MessageType {
  SUCCESS,
  ERROR,
}

type Message = {
  text:string,
  type:MessageType
}

const JSONInputForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<JSONInput>();
  const [submitMessage, setSubmitMessage] = useState<Message | null>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<JSONInput> =  (data) => {
    try {
      dispatch(saveInput(data));
      setSubmitMessage({text:"Input saved successfully", type:MessageType.SUCCESS});
      
    } catch (e) {
      setSubmitMessage({text:"Could not save Input.Try again.", type:MessageType.ERROR});
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
          <div>
            <label>Json Input</label>
            <TextField error 
              variant="standard" 
              {...register("json", { required: true })} 
              placeholder="Enter Valid JSON"
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

export default JSONInputForm;