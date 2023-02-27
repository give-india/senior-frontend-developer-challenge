import { Box, Modal } from "@mui/material";
import React from "react";


const InputModal = ({children, open, handleClose}:{children: React.ReactElement, open:boolean, handleClose:any}) => {

  return (
    <Box>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description">
         {children}
      </Modal>
    </Box>
  )
}

export default InputModal;