import React from "react";
import { Link, useNavigate} from 'react-router-dom';


let Settings = (props) =>{
    const navigate = useNavigate()
    return (
        <div className="menuContainer">  
            <a onClick={()=>{props.setGridWidth(17); props.setGridHeight(20); props.setGridTiles(1); navigate('/play')}}>IMPOSSIBLE</a>
            <a onClick={()=>{props.setGridWidth(21); props.setGridHeight(28); props.setGridTiles(5); navigate('/play')}}>HARD</a>
            <a onClick={()=>{props.setGridWidth(17); props.setGridHeight(22); props.setGridTiles(6); navigate('/play')}}>MEDIUM</a>
            <a onClick={()=>{props.setGridWidth(10); props.setGridHeight(15); props.setGridTiles(6); navigate('/play')}}>EASY</a>
            <Link to='/'>Back home</Link>
        </div>
    )
}
export default Settings;