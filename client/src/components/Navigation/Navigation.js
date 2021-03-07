import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Navigation.scss'
import {Link} from 'react-router-dom'


const Navigation = () => {
    return (  
        <>
        <ul className="nav nav-pills flex-column links">
            <li className="nav-item ">
                <Link className="nav-link" to="/">Overview and Edit</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/map">Map</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/statistics">Statistics Graph</Link>
            </li>
        </ul>   
        </>
    )
}

export default Navigation