import React from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { useNavigate } from 'react-router-dom'


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

    return { filePairs, percentages, codePair1, codePair2, currentDate, threshValue }
}

function PopUpHistory() {
    const { filePairs, percentages, codePair1, codePair2, currentDate, threshValue } = getKeys()

    const navigate = useNavigate()

    return (
        <DialogContent dividers>
            {filePairs.map((pair, index) => (
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
                    key={index}
                    variant="outlined"
                    sx={{
                        marginBottom: "10px",
                        width: "100%",
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
            ))}
        </DialogContent>
    )
}

export default PopUpHistory