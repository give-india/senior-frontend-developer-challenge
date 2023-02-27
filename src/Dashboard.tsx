import { Box, Button, Drawer, Grid, Paper, Tab, Tabs, Typography } from "@mui/material"
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormManager from "./app/components/FormManager";
import InputModal from "./app/components/InputModal";
import JsonDiff from "./app/components/JsonDiff";
import JSONInput from "./app/components/JSONInput";
import JsonPatchList from "./app/components/JSONPatchList";
import PatchInputForm from "./app/components/PatchForm";
import { RootState } from "./app/store";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { modalStyle } from "./app/components/FormStepper";

const DRAWER_WIDTH = 280;

//@ts-ignore
const PatchModalBox = ({patchFormClose}) => {
  return (
    <Box sx={{ ...modalStyle, width: 700 }} >
      <PatchInputForm  prevFormStep={null} modalClose={patchFormClose}/>
    </Box>
  )
}


const Dashboard = () => {  
  const [openForms, setOpenForms] = useState(true);
  const handleClose = () => {
    setOpenForms(false);
  }

  const [openPatchForm, setOpenPatchForm] = useState(false);
  const handlePatchFormClose = () => {
    setOpenPatchForm(false);
  }

  

  return(
    <Box sx={{ display: 'flex' }}>
      <InputModal open={openForms} handleClose={handleClose}><FormManager modalClose={handleClose}/></InputModal>
      <InputModal open={openPatchForm} handleClose={handlePatchFormClose}>
        <PatchModalBox patchFormClose={handlePatchFormClose} />
      </InputModal>
      <Box sx={{ width:'75%' }}><JsonDiff /></Box>
      <Box sx={{ width:'25%' }}>
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
            
          }}
          variant="permanent"
          anchor="right">
            <Button onClick={() => setOpenForms(true)}>Manage Inputs</Button>
            <Box sx={{ borderTop: 1, borderColor: 'divider'}}>
              <Box sx={{display:"flex",justifyContent:"flex-end", margin:1}}>
                <Box sx={{flexGrow:1 }}/>
                <Button variant="outlined" onClick={() => setOpenPatchForm(true)}><AddOutlinedIcon /></Button>
              </Box>
              <JsonPatchList />
            </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
export default Dashboard;

