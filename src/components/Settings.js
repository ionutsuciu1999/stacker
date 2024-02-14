import React from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'
import {useEffect} from 'react';


let Settings = (props) =>{
    const navigate = useNavigate()

     let [difficulty,setDifficulty] = useState('medium');

    //todo  getting triggered on load
    useEffect(() => {
        console.log("switch dif");
        console.log(difficulty);
        switch (difficulty) {
            case 'easy':
                props.setGridWidth(10); props.setGridHeight(15); props.setGridTiles(6); navigate('/play')
              break;
            case 'medium':
                props.setGridWidth(17); props.setGridHeight(22); props.setGridTiles(6); navigate('/play')
                break;
            case 'hard':
                props.setGridWidth(21); props.setGridHeight(28); props.setGridTiles(5);navigate('/play')
              break;
            case 'impossible':
                props.setGridWidth(17); props.setGridHeight(20); props.setGridTiles(1);navigate('/play')
              break;
            default:
                
          }
         
      }, [difficulty]);

    return (
        <div className="menuContainer">  
            <a onClick={()=>{setDifficulty("impossible");  }}>IMPOSSIBLE</a>
            <a onClick={()=>{setDifficulty("hard"); }}>HARD</a>
            <a onClick={()=>{setDifficulty("medium");  }}>MEDIUM</a>
            <a onClick={()=>{setDifficulty("easy");  }}>EASY</a>
            <Link to='/' id="backHomeSettings">Menu</Link>
        </div>
    )
}
export default Settings;