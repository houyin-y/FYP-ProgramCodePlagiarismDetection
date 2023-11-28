import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
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

function CounterButton() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        console.log(count)
        setCount(count + 1)
    }

    return (
        <button onClick={handleClick}>
            {count}
        </button>
    )
}

function Results() {
    const location = useLocation()
    const [expanded, setExpanded] = useState({})

    const handleExpandClick = (index) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index],
        }));
    }

    // handling of dynamic display of results starts here
    const { pythonOutput, corpus, value } = location.state

    const filePairs = []
    const percentages = []

    const fileNames = []
    const codes = []

    const codePair1 = []
    const codePair2 = []

    //
    // handle pythonOutput
    const pythonOutputArray = pythonOutput.trim().split('\r\n')

    pythonOutputArray.forEach(output => {
        const parts = output.split(':')

        const filePair = parts[0].trim()
        const percentage = parts[1].trim()

        filePairs.push(filePair)
        percentages.push(percentage)
    })

    //
    // handle corpus
    const corpusArray = corpus.trim().split('<<@')

    const corpusArray2 = corpusArray.filter(element => element !== "")

    corpusArray2.forEach(output => {
        const parts = output.split('>>@')

        const fileName = parts[0].trim()
        const code = parts[1].trim()

        fileNames.push(fileName)
        codes.push(code)
    })

    // splits filePair into 2 files names, then matches it with fileNames 
    filePairs.forEach(output => {
        const parts = output.split('vs')

        const filePairName1 = parts[0].trim()
        const filePairName2 = parts[1].trim()

        fileNames.forEach((output2, i) => {
            if (filePairName1 === output2) {
                codePair1.push(codes[i])
            } else if (filePairName2 === output2) {
                codePair2.push(codes[i])
            }
        })
    })

    //
    // handle storing of results
    let currentDate = ''
    const [dataToStore, setDataToStore] = useState({ filePairs, percentages, codePair1, codePair2, currentDate, value })

    const storeData = () => {
        let key = 'myData';
        let i = 1;

        // check if key exists, if so, increment the key
        while (localStorage.getItem(`${key}${i !== 0 ? i : ''}`) !== null) {
            i++;
        }
 
        // get current date
        currentDate = new Date()
        currentDate = currentDate.toString()

        // store the data with the new key
        const newKey = `${key}${i !== 0 ? i : ''}`
        localStorage.setItem(newKey, JSON.stringify({ ...dataToStore, currentDate }));

        console.log(newKey, value)
    }

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>

            <CounterButton />
            <button onClick={storeData}>Store Data</button>

            <div style={{ textAlign: "center" }}>
                {filePairs.map((filePair, index) => {
                    // skip rendering if plagiarism thrsehold below threshold
                    if (parseFloat(percentages[index]) < value) {
                        return null
                    }

                    return (
                        <div key={index} style={{ margin: 'auto', marginBottom: '20px', width: '40%' }}>
                            <Card>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>{filePair}</Typography>
                                    <Typography sx={{ marginLeft: "auto", color: getColor(parseFloat(percentages[index]), value) }}>{percentages[index]}</Typography>

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

export default Results