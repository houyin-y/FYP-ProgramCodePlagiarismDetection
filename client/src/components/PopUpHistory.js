import React, { useState } from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'


function getColor(percentage, threshold) {
    const range = 100 - threshold
    const adjustedPercentage = percentage - threshold
    const colorValue = Math.floor((adjustedPercentage / range) * 255)

    // color will range from black to red
    return `rgb(${colorValue}, 0, 0)`
}

// find all the keys (for local storage) and store it in an array, keys
function getKeys() {
    let keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }

    let filePairs = []
    let percentages = []
    let codePair1 = []
    let codePair2 = []
    let currentDate = []
    let threshValue = []

    // loop through each key to get the passed props
    keys.forEach(key => {
        const retrievedData = JSON.parse(localStorage.getItem(key))
        filePairs.push(retrievedData.filePairs)
        percentages.push(retrievedData.percentages)
        codePair1.push(retrievedData.codePair1)
        codePair2.push(retrievedData.codePair2)
        currentDate.push(retrievedData.currentDate.substring(0, 15))
        threshValue.push(retrievedData.value)
    })

    return { keys, filePairs, percentages, codePair1, codePair2, currentDate, threshValue }
}

function PopUpHistory() {
    const [refresh, setRefresh] = useState(false)
    const { keys, filePairs, percentages, codePair1, codePair2, currentDate, threshValue } = getKeys()

    const navigate = useNavigate()

    return (
        filePairs.length === 0 ? (
            <DialogContent dividers>
                <div key={'div'} style={{ width: "558.717px" }}>
                    <Card>
                        <CardContent style={{ textAlign: "center" }}>
                            Please save a result after submitting your file to view History. 
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>

        ) : (

            <DialogContent dividers>
                {filePairs.map((pair, index) => (
                    <div key={`div-${index}`} style={{ width: "558.717px" }}>
                        <Button
                            onClick={() => {
                                navigate('/history', {
                                    state: {
                                        filePairs: filePairs[index],
                                        percentages: percentages[index],
                                        codePair1: codePair1[index],
                                        codePair2: codePair2[index],
                                        threshValue: threshValue[index]
                                    }
                                })
                            }}
                            key={`button-${index}`}
                            variant="outlined"
                            sx={{
                                marginBottom: "5px",
                                marginTop: "5px",
                                width: "90%",
                                height: "60px",
                                color: "black",
                                borderColor: "black",
                                fontSize: "1rem",
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <b>{currentDate[index]}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            {pair[0]}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style={{ color: getColor(parseFloat(percentages[index][0]), threshValue[index]) }}>
                                {percentages[index][0]}
                            </span>

                            <br></br>
                        </Button>

                        <IconButton
                            onClick={() => {
                                localStorage.removeItem(keys[index])
                                console.log(`Removed ${keys[index]}`)
                                setRefresh(!refresh)
                            }}
                            aria-label="delete" size="large"
                            key={`iconbutton-${index}`}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                ))}
            </DialogContent >
        )

    )
}

export default PopUpHistory