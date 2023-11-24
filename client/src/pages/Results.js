import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
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

    const filePairs = []
    const percentages = []

    let fileNames = []
    let codes = []

    try {
        const { pythonOutput, corpus } = location.state
        const pythonOutputArray = pythonOutput.trim().split('\r\n')

        console.log(corpus)

        // handle pythonOutput
        pythonOutputArray.forEach(output => {
            const parts = output.split(':')

            const filePair = parts[0].trim()
            const percentage = parts[1].trim()

            filePairs.push(filePair)
            percentages.push(percentage)
        })

        // handle corpus
        fileNames = corpus.match(/'([^']+)':/g).map(match => match.slice(1, -2))
        codes = corpus.match(/'([^']+)': '([^']+)'/g).map(match => match.split("': '")[1].replace(/\\'/g, "'"))




    } catch (error) {
        if (error instanceof TypeError && error.message.includes('parts[1] is undefined')) {
            console.error('Specific error: parts[1] is undefined');
        } else {
            console.error('An error occurred:', error.message);
        }
    }

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>

            <div style={{ textAlign: "center" }}>
                {filePairs.map((filePair, index) => (
                    <div key={index} style={{ margin: 'auto', marginBottom: '20px', width: '650px' }}>
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
                                <CardContent>
                                    <Typography paragraph>{codes[index]}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Results