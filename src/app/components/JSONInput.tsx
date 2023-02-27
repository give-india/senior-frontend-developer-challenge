import { Container } from "@mui/material";
import { stat } from "fs";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//@ts-ignore
const JSONInput = () => {
  const input:string | null = useSelector((state:RootState) => state.input.currentJson);

  return (
    <Container sx={{
      maxWidth: "100%",
      maxHeight: "100%",
      width: "100%",
      wordWrap: "break-word",
      textAlign: "left",}}>

      <pre>{JSON.stringify(input, null, 3)}</pre>
      
    </Container>
  );
}

export default JSONInput;


