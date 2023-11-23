import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import settingsImage from "../img/settings.png"
import historyImage from "../img/history.png"
import InputSlider from "./InputSlider"
import CodeExclusionUpload from "./CodeExclusionUpload"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const buttonStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  border: "None",
  marginRight: "25px"
}


function PopUp({ imageType }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let dialogTitle = ''
  let dialogContent = null
  let additionalDialogContent = null

  switch (imageType) {
    case 'settings':
      dialogTitle = "Settings"
      dialogContent = (
        <DialogContent dividers>
          <Typography gutterBottom style={{ margin: "10px" }}>
            <b>Plagiarism Threshold</b><br />
            Similarity percentage below threshold will not be considered as plagiarism.
            <br />
            <br />
            <InputSlider />
            <br />
            <b>Code exclusion</b><br />
            Upload code(s) to be exempted from plagiarism.<br /><br />

            <CodeExclusionUpload />
          </Typography>
        </DialogContent>
      )
      additionalDialogContent = (
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      )
      break;

    case 'history':
      dialogTitle = "History"
      dialogContent = (
        <DialogContent dividers>
          <Typography gutterBottom style={{ margin: "10px" }}>
            *will include a clickable link-ish? that will send users to stored results page... :D
          </Typography>
        </DialogContent>
      )
      additionalDialogContent = (
        <div>
          {/* whatever I want to add within the dialog */}
        </div>
      )
      break;
    default:
  }


  const getImage = () => {
    if (imageType === 'settings') {
      return settingsImage;
    } else if (imageType === 'history') {
      return historyImage;
    }
  }

  const getAltText = () => {
    if (imageType === 'settings') {
      return 'settings icon';
    } else if (imageType === 'history') {
      return 'history icon';
    }
  }

  return (
    <React.Fragment>

      <Button onClick={handleClickOpen}>
        <img src={getImage()} alt={getAltText()} style={buttonStyle} />
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >

        <DialogTitle sx={{ m: 0, p: 2, textAlign: "center", }} id="customized-dialog-title">
          {dialogTitle}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {dialogContent}
        {additionalDialogContent}

      </BootstrapDialog>
    </React.Fragment>
  )
}

export default PopUp;