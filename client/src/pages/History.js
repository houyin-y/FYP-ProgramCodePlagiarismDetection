import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function getColor(percentage, threshold) {
    const range = 100 - threshold
    const adjustedPercentage = percentage - threshold
    const colorValue = Math.floor((adjustedPercentage / range) * 255)

    // color will range from black to red
    return `rgb(${colorValue}, 0, 0)`
}

function getKeys() {
    // find all the keys (for local storage) and store it in an array, keys
    let keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }

    let filePairs = ''
    let percentages = ''
    let codePair1 = ''
    let codePair2 = ''

    // loop through each key to get...
    keys.forEach(key => {
        const retrievedData = JSON.parse(localStorage.getItem(key))
        filePairs = retrievedData.filePairs
        percentages = retrievedData.percentages
        codePair1 = retrievedData.codePair1
        codePair2 = retrievedData.codePair2
    })

    return {filePairs, percentages, codePair1, codePair2}
}

function History() {
    const [expanded, setExpanded] = useState({})

    const handleExpandClick = (index) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index],
        }));
    }

    const {filePairs, percentages, codePair1, codePair2} = getKeys()

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>

            <div style={{ textAlign: "center" }}>
                {filePairs.map((filePair, index) => {
                    // skip rendering if plagiarism thrsehold below threshold
                    if (parseFloat(percentages[index]) < 0) {
                        return null
                    }

                    return (
                        <div key={index} style={{ margin: 'auto', marginBottom: '20px', width: '40%' }}>
                            <Card>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>{filePair}</Typography>
                                    <Typography sx={{ marginLeft: "auto", color: getColor(parseFloat(percentages[index]), 0) }}>{percentages[index]}</Typography>

                                    <ExpandMore
                                        expand={expanded[index]}
                                        onClick={() => handleExpandClick(index)}
                                        aria-expanded={expanded[index]}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardContent>
                                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                    <Divider variant="middle" />
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                        <Typography component="div" style={{ width: '50%', overflow: 'auto' }}>
                                            <pre>
                                                {codePair1[index]}
                                            </pre>
                                        </Typography>
                                        <Typography component="div" style={{ width: '50%', overflow: 'auto' }}>
                                            <pre>{codePair2[index]}</pre>
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default History