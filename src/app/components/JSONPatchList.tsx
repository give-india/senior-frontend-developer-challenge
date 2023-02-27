import { Container, Grid, Button, Typography, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Patch, PatchStatus, setStatus, setSelectedIndex, deletePatch } from "../store/patch-slice";
import { useState } from "react";
import { applyPatch } from "../store/json-input.slice";
import { Operation } from "fast-json-patch";

//@ts-ignore
const JsonPatchList = ({openModal}) => {
  const patches:Patch[] = useSelector((state:RootState) => state.patch.patches);
  const jsonObj  = useSelector((state:RootState) => state.input.currentJson);
  const dispatch = useDispatch();

  const validatePatch = (patch:Patch) => {

  }

  const acceptPatch = (patch:Patch, index:number) => {
    console.log(patch.data);
    dispatch(applyPatch([patch.data] as Operation[]));
    dispatch(setStatus({index, status:PatchStatus.ACCEPTED}));
  }
  
  const rejectPatch = (index:number) => {
    dispatch(setStatus({index, status:PatchStatus.REJECTED}));
  }

  const handlePatchEdit = (index:number) => {
    dispatch(setSelectedIndex(index));
    openModal();
  }

  const handleDelete = (index:number) => {
    dispatch(deletePatch(index));
  }

  return (
    <Container>
    { patches.length > 0 && patches.map((patch:Patch, index:number) => {
      return (
        <Box sx={{display:"flex",justifyContent:"flex-start",borderTop:1, borderColor:"divider"}}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
              {patch.status === PatchStatus.NOTAPPLICABLE ? 
              <Box sx={{ display:"block"}}>
                <Button 
                variant="outlined" 
                color="success"
                size="small" 
                onClick={() => acceptPatch(patch, index)}>
                  <CheckOutlinedIcon fontSize="small" />
                </Button> 
                <Button 
                variant="outlined" 
                color="warning"
                size="small" 
                onClick={() => rejectPatch(index)}>
                  <ClearOutlinedIcon fontSize="small" />
                </Button>
                <Button 
                variant="outlined" 
                color="secondary"
                size="small" 
                onClick={() => handlePatchEdit(index)}>
                  <EditOutlinedIcon fontSize="small"/>
                </Button>
                <Button 
                variant="outlined" 
                color="error"
                size="small" 
                onClick={() => handleDelete(index)}>
                  <DeleteForeverOutlinedIcon />
                </Button>
              </Box > : (
                patch.status === PatchStatus.ACCEPTED ? 
                <CheckOutlinedIcon  fontSize="small" color="success" /> :
                <ClearOutlinedIcon  fontSize="small" color="error"/>
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