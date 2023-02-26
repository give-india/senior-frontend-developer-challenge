import { Container, Grid, Button, Typography, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Patch, PatchStatus, setStatus } from "../store/patch-slice";
import { useState } from "react";
import { applyPatch } from "../store/json-input.slice";
import { Operation } from "fast-json-patch";

const JsonPatchList = () => {
  const patches:Patch[] = useSelector((state:RootState) => state.patch.patches);

  const [acceptPatches, setAcceptedPatches] = useState([]);
  const [rejectedPatches, setRejectedPatches] = useState([]);

  const dispatch = useDispatch();

  const acceptPatch = (patch:Patch, index:number) => {
    console.log(patch.data);
    dispatch(applyPatch([patch.data] as Operation[]));
    dispatch(setStatus({index, status:PatchStatus.ACCEPTED}));
  }
  return (
    <Container>
     
    { patches.length > 0 && patches.map((patch:Patch, index:number) => {
      return (
        <Box key={index} sx={{ borderTop: 1, borderColor: 'divider', marginTop:2}} >
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Typography noWrap sx={{marginTop:2}}>
              {/* <Grid xs={12}>
                <Checkbox icon={<CheckOutlinedIcon />} color="success" />
                <Checkbox icon={<ClearOutlinedIcon /> } color="error" />
              </Grid> */}
              <Grid xs={12} item justifyContent="flex-end">
                <Button variant="outlined" 
                  color="success" 
                  onClick={() => acceptPatch(patch, index)}>
                    Accept
                  </Button> 
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