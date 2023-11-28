import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import settingsImage from "../img/settings.png"
import historyImage from "../img/history.png"
import InputSlider from "./InputSlider"
import CodeExclusionUpload from "./CodeExclusionUpload"
import PopUpHistory from './PopUpHistory'


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

function PopUp({ imageType, onValueChange }) {
  const [open, setOpen] = React.useState(false)
  const [sliderValue, setSliderValue] = useState(30)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleButtonClick = () => {
    onValueChange(sliderValue)
  }

  let dialogTitle = ''
  let dialogContent = null
  let additionalDialogContent = null

  switch (imageType) {
    case 'settings':
      dialogTitle = "Settings"
      dialogContent = (
        <DialogContent dividers>
          <Typography component="div" style={{ margin: "10px" }}>
            <b>Plagiarism Threshold</b><br />
            Similarity percentage below threshold will not be considered as plagiarism.
            <br />
            <br />
            <InputSlider onValueChange={setSliderValue} />
            <br />
            <b>Code exclusion</b><br />
            Upload code(s) to be exempted from plagiarism.<br /><br />

            <CodeExclusionUpload />
          </Typography>
        </DialogContent>
      )
      additionalDialogContent = (
        <DialogActions>
          <Button autoFocus onClick={() => { handleClose(); handleButtonClick(); }}>
            Save changes
          </Button>
        </DialogActions>
      )
      break;

    case 'history':
      dialogTitle = "History"
      dialogContent = (
        <PopUpHistory />
      )
      additionalDialogContent = null
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