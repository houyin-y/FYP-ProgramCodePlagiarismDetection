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
    

    try {
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


    } catch (e) {
        if (e instanceof TypeError && e.message.includes('parts[1] is undefined')) {
            console.error('Error: Type error! Please include more than ONE(1) .py file in your .zip file.')
            alert('Please submit more than ONE(1) .py file in your .zip file.')
        } else {
            console.error('An error occurred:', e.message);
        }
    }

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>

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
                                <Typography sx={{ marginLeft: "auto" }}>{percentages[index]}</Typography>

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

    );
}

export default Results