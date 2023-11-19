import React, { useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

function InputSlider() {
    const [value, setValue] = useState(30)
  
    const handleSliderChange = (event, newValue) => {
      setValue(newValue)
    }
  
    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? 0 : Number(event.target.value))
    }
  
    const handleBlur = () => {
      if (value < 0) {
        setValue(0)
      } else if (value > 100) {
        setValue(100)
      }
    }
  
    return (
      <Box sx={{ width: 533 }}>
        <Grid container spacing={2} alignItems="center">
  
          <Grid item sx={{ width: 70 }}>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 5,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
                style: { textAlign: "center" },
              }}
            />
          </Grid>
  
          <Grid item xs>
            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              style={{ color: "black" }}
            />
          </Grid>
  
        </Grid>
      </Box>
    )
  }

export default InputSlider