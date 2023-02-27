import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormStepper from "./FormStepper";

//@ts-ignore
const FormManager = ({modalClose}) =>  {
  const methods = useForm({ mode: "onBlur" });
  const { watch, formState: {errors} } = methods;

  useEffect(() => {
    console.log("FORM CONTEXT WITHIN", watch(), errors);
  }, [watch, errors]);

  return (
    <FormProvider {...methods}>
      <FormStepper modalClose={modalClose}/>
    </FormProvider>
  );
}

export default FormManager; 