import React from "react";
import { Link } from 'react-router-dom';

let Settings = (props) =>{
    return (
        <>  
            <p>SETTINGS</p>
            <button onClick={()=>{props.setGridWidth(17); props.setGridHeight(20); props.setGridTiles(1)}}>IMPOSSIBLE</button>
            <button onClick={()=>{props.setGridWidth(21); props.setGridHeight(28); props.setGridTiles(5)}}>HARD</button>
            <button onClick={()=>{props.setGridWidth(17); props.setGridHeight(22); props.setGridTiles(6)}}>MEDIUM</button>
            <button onClick={()=>{props.setGridWidth(10); props.setGridHeight(15); props.setGridTiles(6)}}>EASY</button>
            <li>
                <Link to='/'>Back home</Link>
            </li>
        </>
    )
}
export default Settings;