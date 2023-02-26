import { Container } from "@mui/material";
import { stat } from "fs";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//@ts-ignore
const JSONInput = () => {
  const input:string | null = useSelector((state:RootState) => state.input.json);

  return (
    <Container fixed>
      <pre>{input}</pre>
    </Container>
  );
}

export default JSONInput;


