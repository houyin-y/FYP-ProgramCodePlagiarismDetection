import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"


const ProcessingMessages = ({ messages }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {

            // update the index to the next message
            setCurrentMessageIndex((prevIndex) =>
                prevIndex === messages.length - 1 ? 0 : prevIndex + 1
            );
        }, 800); // interval time in milliseconds

        // cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [messages]);

    return (
        <div>
            <Typography variant="body1">{messages[currentMessageIndex]}</Typography>
        </div>
    );
};

function Processing() {
    const messages = ['Processing', 'Processing.', 'Processing..', 'Processing...']

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "30px", marginBottom: "50px", fontSize: "50px" }}>Program Code Plagiarism Detector</h1>
            <ProcessingMessages messages={messages} />
        </div>
    )
}

export default Processing