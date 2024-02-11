import React from 'react';
import {useState} from 'react'
import {createContext} from 'react'
import { Link, useLocation } from 'react-router-dom';
import {useEffect} from 'react';
import '../index.css';


const Stacker = (props) => {
    console.log("STARTTTTT");
    const location = useLocation();
    let [lights,setLight] = useState();
    let gameRunning = 0;
    let currentRow = 0;
    let lightsGrid = [];
    let gridTiles = props.gridTiles;

    //todo use lights not lightsGrid

    //render initial grid and fill initial state array
    const gridRender = () => {
    let divs = [];
    let ligthsRow = [];
    console.log("render grid divs");
        for(let i = props.gridHeight-1; i>=0; i--){
            for(let j = 0; j<props.gridWidth; j++){
                ligthsRow.push(0);
                divs.push(<div className='stackerGridTile' data-width={j} data-height={i}></div>);
            }
            lightsGrid.push(ligthsRow);
            ligthsRow = [];
        }
        return divs;
    };


    const resetGame =() =>{
        clearTimeout(props.timer);
        gameRunning = -1;
        console.log("reset");
        //reset variables and restart
        
    }

    //todo problem because you could press psacebar while onlt 4/5 squares are rendered
    const gameNextRow = () => {
        console.log("next row");

        //cancello le tiles che sforano
        //se sono alla prima riga non ha senso controllare
        if(currentRow>0){
            for(let i = 0; i < props.gridWidth; i++){
                if(lightsGrid[currentRow][i]==1 && lightsGrid[currentRow-1][i]==0){
                    //diminuisco il nr di luci alla prossima riga, e cancello quello che sforano
                    lightsGrid[currentRow][i] = 0;
                    gridTiles--;
                    //se sono a 0 tiles, ho perso
                    if(gridTiles<=0){
                    console.log("LOST");
                    resetGame();
                    }
                }
            }
        }
        
        currentRow++;
        
        //starts the first x tiles if didnt win yet
        if(currentRow == props.gridHeight){
            console.log("WIN");
            resetGame();
        }else{
            for(let i = 0; i < gridTiles; i++){
                lightsGrid[currentRow][props.gridWidth-i-2] = 1;
            }
        }
    }

    //default values and start
    const initiateValues = () =>{
        gameRunning = 0;
        currentRow = 0;
        gridTiles = props.gridTiles;
        for(let i = props.gridHeight-1; i>=0; i--){
            for(let j = 0; j<props.gridWidth; j++){
                lightsGrid[i][j] = 0;
            }
        }
        for(let i = 0; i < gridTiles; i++){
            lightsGrid[currentRow][props.gridWidth-i-2] = 1;
        }
        console.log("reset grid");
        setLight(lightsGrid);
        moveLights();
        arrayToLights();
    }
    
    const spacebarHandler = (e) =>{
        if(e.key == " "){
            console.log("CLICKCKCKCKC");
            //start game not running and press spacebar on first render to start
            if(gameRunning==0){
                gameRunning = 1;
                renderGame();
                //normal gameRow increase
            }else if(gameRunning==1){
                e.preventDefault();
                gameNextRow();
            //game lost reset
            }else if(gameRunning==-1){
                console.log("resetttttt");
                initiateValues();
                gameRunning = 1;
                renderGame();
            }
        }
    }

    //when grid is finished loading start logic
    useEffect(() => {
        console.log('start lights');
        document.addEventListener('keydown', spacebarHandler);

        //starts the first x tiles
        
        initiateValues();
        
        
    }, []);

    //sets the array of 0 and 1 to grid class on and off
    const arrayToLights = () => {
        for(let i = props.gridHeight-1; i>=0; i--){
            for(let j = 0; j<props.gridWidth; j++){
                const div = document.querySelector('[data-width="'+j+'"][data-height="'+i+'"]');
                if(div){
                    if(lightsGrid[i][j]==1){
                        div.classList.remove('off');
                        div.classList.add('on');
                    }else{
                        div.classList.remove('on');
                        div.classList.add('off');
                    }
                }
            }
        }
    }

    //moves lights left and right
    let direction = "left";
    const moveLights = () => {
        if(direction=="left"){
            //console.log("LEFT");
            for(let i = 0; i < props.gridWidth; i++){
                //scorro finche non trovo il primo rosso e coloro quella precedente di rosso
                if(lightsGrid[currentRow][i+1]==1 && lightsGrid[currentRow][i]==0){
                    lightsGrid[currentRow][i] = 1;
                }
                //scorro finche non trovo il primo bianco e coloro quella precedente di rosso
                if((lightsGrid[currentRow][i+1]==0 || i==props.gridWidth-1) && lightsGrid[currentRow][i]==1){
                    lightsGrid[currentRow][i] = 0;
                }
                
            }
        }
        

        if(direction=="right"){
            //console.log("RIGHT");
            for(let i = props.gridWidth-1; i >= 0; i--){
                //scorro finche non trovo il primo rosso e coloro quella precedente di rosso
                if(lightsGrid[currentRow][i-1]==1 && lightsGrid[currentRow][i]==0){
                    lightsGrid[currentRow][i] = 1;
                }
                //scorro finche non trovo il primo bianco e coloro quella precedente di rosso
                if((lightsGrid[currentRow][i-1]==0 || i==0) && lightsGrid[currentRow][i]==1){
                    lightsGrid[currentRow][i] = 0;
                }
                
            }
        }

        arrayToLights();
        
        if(lightsGrid[currentRow][0]==1){
            direction = "right";
        }
        
        if(lightsGrid[currentRow][props.gridWidth-1]==1){
            direction = "left";
        }
    }

    //game loop
    const renderGame = () => {
        let t = setTimeout(() => {
            if(gameRunning==1 && location.pathname=="/play"){
                moveLights();
                arrayToLights();
                renderGame();
                console.log("render");
            }
        }, props.timer);
    }

    return (
    <>
        <li>
            <Link to='/' onClick={()=>{resetGame(); document.removeEventListener('keydown', spacebarHandler, true); document.getElementById("stackerGridBody").innerHTML=""; }}>Back home</Link>
        </li>
        <div id="stackerContainer">
            <div id="stackerTitle">stackerTitle</div>
            <div id="stackerBodyContainer">
                <div id="stackerBodyVideo"><img src="../noise.gif"/></div>
                <div id="stackerGridBody" style={{gridTemplateColumns: "repeat("+`${props.gridWidth}`+", 1fr)"}}>
                {gridRender()}
                </div>
            </div>
        </div>
    </>
    );
};

export default Stacker;
