import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Stacker from "./components/Stacker.js";
import Menu from "./components/Menu.js";
import Settings from "./components/Settings.js";
import {useState} from 'react'
import './index.css';


function App() {
  let [gridWidth, setGridWidth] = useState(17);
  let [gridHeight, setGridHeight] = useState(22);
  let [timer,setTimer] = useState(30);
  let [gridTiles,setGridTiles] = useState(6);

  return (
    <>
    <div id="screenEffect"></div>
    <div id="screenLayer">
    
    <Router>
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/settings' element={<Settings setGridWidth={setGridWidth} setGridHeight={setGridHeight} setTimer={setTimer} setGridTiles={setGridTiles}/>}/>
          <Route path='/play' element={<Stacker gridWidth={gridWidth} gridHeight={gridHeight} timer={timer} gridTiles={gridTiles} setGridTiles={setGridTiles}/> } />
        </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;
