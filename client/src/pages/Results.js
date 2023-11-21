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

const cardsData = [
    {
        id: 1,
        content: 'Content for Program A.py Program B.py',
    },
    {
        id: 2,
        content: 'Content for Program A.py Program C.py',
    },
    {
        id: 3,
        content: 'Content for Program B.py Program C.py',
    },
]

function Results() {
    const [expanded, setExpanded] = useState({})
    const location = useLocation()

    // split the output into an array
    const pythonOutput = location.state
    const pythonOutputArray = pythonOutput.pythonOutput.trim().split('\r\n')

    const filePairs = []
    const percentages = []

    pythonOutputArray.forEach(output => {
        const parts = output.split(':')

        const filePair = parts[0].trim()
        const percentage = parts[1].trim()

        filePairs.push(filePair)
        percentages.push(percentage)
    })

    console.log(filePairs)
    console.log(percentages)


    const handleExpandClick = (cardId) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [cardId]: !prevExpanded[cardId],
        }));
    };

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>

            <div style={{ textAlign: "center" }}>
                {cardsData.map((card) => (
                    <div key={card.id} style={{ margin: 'auto', marginBottom: '20px', width: '650px' }}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography>{filePairs[card.id - 1]}</Typography>
                                <Typography sx={{ marginLeft: "auto" }}>{percentages[card.id - 1]}</Typography>
                                <ExpandMore
                                    expand={expanded[card.id]}
                                    onClick={() => handleExpandClick(card.id)}
                                    aria-expanded={expanded[card.id]}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardContent>
                            <Collapse in={expanded[card.id]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>{card.content}</Typography>
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