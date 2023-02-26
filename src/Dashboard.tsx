import { Box, Grid, Paper } from "@mui/material"
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import JSONInputForm from "./app/components/InputForm";
import JSONInput from "./app/components/JSONInput";
import JsonPatchList from "./app/components/JSONPatchList";
import PatchInputForm from "./app/components/PatchForm";
import { RootState } from "./app/store";



const Dashboard = () => {

  const input: string | null = useSelector((state:RootState) => state.input.json);
  return (
    <Grid container spacing={0} marginTop={5}>
            <Grid xs={4} >
                <Container>
                  <Box sx={{ borderRight:1, borderColor: 'divider' }}>
                    { input ?  <JSONInput /> : <JSONInputForm />}
                  </Box>
                </Container>
            </Grid>
          
          <Grid xs={5}>
            <Box sx={{ borderRight:1, borderColor: 'divider' }}>
              <h4>Something</h4>
            </Box>
          </Grid>

          <Grid xs={3}>
            <Box sx={{ borderLeft: 1, borderColor: 'divider'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <JsonPatchList /> 
            </Box>
            <PatchInputForm />
            </Box>
          </Grid>

        </Grid>
  )
}

export default Dashboard;

