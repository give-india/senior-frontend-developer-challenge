import { Box, Button, Drawer } from "@mui/material"
import { useState } from "react";
import FormManager from "./app/components/FormManager";
import InputModal from "./app/components/InputModal";
import JsonDiff from "./app/components/JsonDiff";
import JsonPatchList from "./app/components/JSONPatchList";
import PatchInputForm from "./app/components/PatchForm";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { modalStyle } from "./app/components/FormStepper";

const DRAWER_WIDTH = 320;

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

  const handlePatchFormOpen = () => {
    setOpenPatchForm(true);
  }

  return(
    <Box sx={{ display: 'flex' }}>
      <InputModal open={openForms} handleClose={handleClose}><FormManager modalClose={handleClose}/></InputModal>
      <InputModal open={openPatchForm} handleClose={handlePatchFormClose}>
        <PatchModalBox patchFormClose={handlePatchFormClose} />
      </InputModal>
      <Box sx={{ width:'70%' }}><JsonDiff /></Box>
      <Box sx={{ width:'30%' }}>
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
              <JsonPatchList openModal={handlePatchFormOpen}/>
            </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
export default Dashboard;

