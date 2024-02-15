import React from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useState, useRef} from 'react'
import {useEffect} from 'react';


let Settings = (props) =>{
    const navigate = useNavigate()
    const count = useRef(0);

    let [difficulty,setDifficulty] = useState('');


    useEffect(() => {
      count.current = count.current+1;
      console.log(count);
      //skip initial render useEffect
      if (count.current>1) {
        console.log("switch dif");
        switch (difficulty) {
            case 'easy':
                props.setGridWidth(13); props.setGridHeight(15); props.setGridTiles(6); props.setTimer(80);
              break;
            case 'medium':
                props.setGridWidth(17); props.setGridHeight(21); props.setGridTiles(6); props.setTimer(50);
                break;
            case 'hard':
                props.setGridWidth(21); props.setGridHeight(26); props.setGridTiles(5); props.setTimer(40);
              break;
            case 'impossible':
                props.setGridWidth(17); props.setGridHeight(20); props.setGridTiles(1); props.setTimer(40);
              break;
            default:
              props.setGridWidth(17); props.setGridHeight(21); props.setGridTiles(6); props.setTimer(50);
          }
          navigate('/play');
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