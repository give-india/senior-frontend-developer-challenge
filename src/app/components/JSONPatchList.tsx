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

  const dispatch = useDispatch();

  const acceptPatch = (patch:Patch, index:number) => {
    console.log(patch.data);
    dispatch(applyPatch([patch.data] as Operation[]));
    dispatch(setStatus({index, status:PatchStatus.ACCEPTED}));
  }
  
  const rejectPatch = (index:number) => {
    dispatch(setStatus({index, status:PatchStatus.REJECTED}));
  }

  return (
    <Container>
    { patches.length > 0 && patches.map((patch:Patch, index:number) => {
      return (
        <Box sx={{display:"flex",justifyContent:"flex-start",borderTop:1, borderColor:"divider"}}>
          <Grid container sx={{ margin:1 }}>
            <Grid item xs={12}>
              <Box>
              {patch.status === PatchStatus.NOTAPPLICABLE ? 
              <Box sx={{ display:"block" }}>
                <Button variant="outlined" 
                  color="success" 
                  onClick={() => acceptPatch(patch, index)}>
                    <CheckOutlinedIcon />
                  </Button> 
                <Button variant="outlined" 
                  color="error"
                  onClick={() => rejectPatch(index)}>
                  <ClearOutlinedIcon />
                </Button>
              </Box > : (
                patch.status === PatchStatus.ACCEPTED ? 
                <CheckOutlinedIcon color="success" /> :
                <ClearOutlinedIcon color="error"/>
              )}  
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{display:"block"}}>
                <pre>{JSON.stringify(patch, null, 1)}</pre>
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    })
    }
    </Container>
  );
}

export default JsonPatchList;


/*
    <Box key={index}>
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Typography noWrap sx={{marginTop:2}}>
              <Grid xs={12} item>
                {patch.status === PatchStatus.NOTAPPLICABLE ? 
                <Box sx={{alignItems:"space-between"}}>
                  <Button variant="outlined" 
                    color="success" 
                    onClick={() => acceptPatch(patch, index)}>
                      <CheckOutlinedIcon />
                    </Button> 
                  <Button variant="outlined" 
                    color="error"
                    onClick={() => rejectPatch(index)}>
                    <ClearOutlinedIcon />
                  </Button>
                </Box > : (
                  patch.status === PatchStatus.ACCEPTED ? 
                  <CheckOutlinedIcon color="success" /> :
                  <ClearOutlinedIcon color="error"/>
                )}
              </Grid>
              <Grid xs={12}>
                  <pre>{JSON.stringify(patch, null, 1)}</pre>
              </Grid>
            </Typography>
          </Grid>
        </Box>
*/