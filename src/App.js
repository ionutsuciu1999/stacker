import React from "react";
import Stacker from "./components/Stacker.js";
import {useState} from 'react'
import './index.css';

function App() {
  let [gridWidth, setGridWidth] = useState(15);
  let [gridHeight, setGridHeight] = useState(20);
  let [timer,setTimer] = useState(100);

  return (
    <div>
      <div>
        <header>header todo?</header>
        <Stacker gridWidth={gridWidth} gridHeight={gridHeight} timer={timer}/>
      </div>
    </div>
  );
}

export default App;
