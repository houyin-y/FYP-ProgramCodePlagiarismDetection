import React from 'react'
import { Link } from 'react-router-dom'
import historyImage from "../img/icons8-browser-history-100.png"


function BlankPage() {
    
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Blank Page</h1>
            <ul>
                <li>
                    <Link to="/"><img src={historyImage} alt="historyIcon" width="60" /></Link>
                </li>
                <li>
                    <Link to="/NotFound">NotFound</Link>
                </li>
            </ul>
        </div>
    )
}

export default BlankPage