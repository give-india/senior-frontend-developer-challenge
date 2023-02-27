import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import InputForm from "./InputForm";
import PatchInputForm from "./PatchForm";

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function getSteps() {
  return ["Input", "Patch"];
}

//@ts-ignore
const FormStepper = ({modalClose}) => {
  const [formStep, setFormStep] = useState(0);
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  const steps = getSteps();
  
  return (
    <Box sx={{ ...modalStyle, width: 700 }} >    
      <Stepper activeStep={formStep}>
         {steps.map((label, index) => {
           const stepProps = {};
           const labelProps = {};
           return (
             <Step key={label} {...stepProps}>
               <StepLabel {...labelProps}>{label}</StepLabel>
             </Step>
           );
         })}
      </Stepper>   
      <div>
        {formStep == 0 && (
          <InputForm  formStep={formStep} nextFormStep={nextFormStep}/>
        )}
        {formStep == 1 && (
          <PatchInputForm  prevFormStep={prevFormStep} modalClose={modalClose}/>
        )}
       </div>
    </Box>
  );

  
}

export default FormStepper;