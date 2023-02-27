import { ErrorMessage } from "@hookform/error-message";
import { Box, Button, TextField } from "@mui/material";
import { useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { saveInput } from "../store/json-input.slice";



enum  MessageType {
  SUCCESS,
  ERROR,
}

type Message = {
  text:string,
  type:MessageType
}

//@ts-ignore
const InputForm = ({ formStep, nextFormStep}) => {

  const { register, handleSubmit, reset, watch, formState: { errors }, setError } = useForm({mode:"all"});
  const currentJson:any = useSelector((state:RootState) => state.input.currentJson);
  const currentJsonString = currentJson ? JSON.stringify(currentJson, null, 2) : '';
  const dispatch = useDispatch();

  const onSubmit = (values:any) => {
    try{
      const jsonData = JSON.parse(values.json);
      dispatch(saveInput(jsonData));
      nextFormStep();
    }catch(e){
      setError("json", { type: 'custom'})
    }
  }
  
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <TextField error 
            variant="standard" 
            {...register("json", { required: true})} 
            placeholder="Enter Valid JSON Object"
            fullWidth
            multiline={true}
            rows={10}
            defaultValue={currentJsonString}>  
            </TextField>
            {errors.json ? 
              (errors.json.type === 'required' && 
                <p style={{color: "#800000" }}>JSON input is required.</p>
              ): null
            }
            {errors.json ? 
              (errors.json.type === 'custom' && 
                <p style={{color: "#800000" }}>Please enter a proper json</p>
              ): null
            }
        </div>
        <div>
          <Button type="submit" variant="contained">Next</Button>
        </div>
      </form>
    </Box>
  )
}

export default InputForm;