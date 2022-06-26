import React from 'react'
import { Modal, Typography, Box } from '@mui/material'

const SimpleModal = ({ modalTitle, modalBody, visible, setVisible }) => {
  const handleOpen = () => setVisible(true)
  const handleClose = () => setVisible(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
    >
      <Box
        sx={style}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
        >
          {modalTitle}
        </Typography>

        <Typography
          id="model-body"
          variant="body1"
          sx={{mt: 2}}
        >
          {modalBody}
        </Typography>

      </Box>
    </Modal>
  )
}

export default SimpleModal
