import React from 'react';
import {useState} from 'react'
import {createContext} from 'react'
import {useEffect} from 'react';
import '../index.css';


const Stacker = (props) => {
    let [lights,setLight] = useState();
    let [gameRunning,setGameRunning] = useState(1);
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
        gameRunning = 0;
        console.log("reset");
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
        //starts the first x tiles
        for(let i = 0; i < gridTiles; i++){
            lightsGrid[currentRow][props.gridWidth-i-2] = 1;
        }
    }

    
    //when grid is finished loading start logic
    useEffect(() => {
        console.log('start lights');
        document.addEventListener('keydown', (e) => {
            if(e.key == " "){
                e.preventDefault();
                gameNextRow();
            }
        });

        //starts the first x tiles
        for(let i = 0; i < gridTiles; i++){
            lightsGrid[currentRow][props.gridWidth-i-2] = 1;
        }

        setLight(lightsGrid);
        console.log(lightsGrid);
        renderGame();
    }, []);

    //sets the array of 0 and 1 to grid class on and off
    const arrayToLights = () => {
        for(let i = props.gridHeight-1; i>=0; i--){
            for(let j = 0; j<props.gridWidth; j++){
                const div = document.querySelector('[data-width="'+j+'"][data-height="'+i+'"]');
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
            moveLights();
            arrayToLights();
            if(gameRunning==1){
                renderGame();
                console.log("render");
            }
        }, props.timer);
    }

    return (
    <>
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
