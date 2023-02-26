import { Container, Grid, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Patch } from "../store/patch-slice";

const JsonPatchList = () => {
  const patches:Patch[] = useSelector((state:RootState) => state.patch.patches);
  return (
    <Container>
    { patches.length > 0 && patches.map((patch:Patch, index:number) => {
      return (
        
        <Box key={index} sx={{ borderBottom: 1, borderColor: 'divider' }} >
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Typography noWrap>
              <Grid xs={12}>
                  <Button variant="outlined" color="success">Accept</Button>
                  <Button variant="outlined" color="error">Reject</Button>
              </Grid>
              <Grid xs={12}>
                  <pre>{JSON.stringify(patch)}</pre>
              </Grid>
            </Typography>
          </Grid>
        </Box>
      );
    })
    }
    </Container>
  );
}

export default JsonPatchList;