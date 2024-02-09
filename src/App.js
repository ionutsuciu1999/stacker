import React from "react";
import Stacker from "./components/Stacker.js";
import {useState} from 'react'
import './index.css';

function App() {
  let [gridWidth, setGridWidth] = useState(17);
  let [gridHeight, setGridHeight] = useState(22);
  let [timer,setTimer] = useState(30);
  let [gridTiles,setGridTiles] = useState(5);

  return (
    <div>
      <div>
        <header>header todo?</header>
        <Stacker gridWidth={gridWidth} gridHeight={gridHeight} timer={timer} gridTiles={gridTiles} setGridTiles={setGridTiles}/>
      </div>
    </div>
  );
}

export default App;
