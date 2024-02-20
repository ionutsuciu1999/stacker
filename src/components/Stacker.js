import React from 'react';
import {useState, useRef} from 'react'
import {createContext} from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import '../index.css';



const Stacker = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    let [lights,setLight] = useState();
    let gameRunning = 0;
    let currentRow = 0;
    let lightsGrid = [];
    let gridTiles = props.gridTiles;
    let [time,setTime] = useState(0);


    //todo use lights not lightsGrid

    //render initial grid and fill initial state array with 0 and 1
    const gridRender = () => {
    let divs = [];
    let ligthsRow = [];
    console.log("render grid divs");
        for(let i = props.gridHeight-1; i>=0; i--){
            for(let j = 0; j<props.gridWidth; j++){
                ligthsRow.push(0);
                divs.push(<div className='stackerGridTile ' data-width={j} data-height={i}></div>);
            }
            lightsGrid.push(ligthsRow);
            ligthsRow = [];
        }
        return divs;
    };

    //stops the game
    const resetGame =() =>{
        clearTimeout(props.timer);
        gameRunning = -1;
        console.log("reset");
    }


    const gameNextRow = () => {
        console.log("next row");

        //remove the extra lights if i didn't land correctly
        //if i'm at the first row there is no point in checking
        if(currentRow>0){
            for(let i = 0; i < props.gridWidth; i++){
                if(lightsGrid[currentRow][i]==1 && lightsGrid[currentRow-1][i]==0){
                    //decrease the lights on the next row if i didnt land correctly
                    lightsGrid[currentRow][i] = 0;
                    gridTiles--;
                    //if i dont have any tiles left, i lost
                    if(gridTiles<=0){
                    //LOST
                    resetGame();
                    }
                }
            }
        }
        
        currentRow++;
        
        //check if win, otherwise starts the first x tiles on the new row
        if(currentRow == props.gridHeight){
            //WIN
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
    
    //handler of spacebar / touch event
    const spacebarHandler = (e) =>{
        if(e.key == " " || e.type == 'touchstart'){
            //start game not running and press spacebar on first render to start
            if(gameRunning==0){
                gameRunning = 1;
                timer();
                renderGame();
                //normal gameRow increase
            }else if(gameRunning==1){
                e.preventDefault();
                gameNextRow();
            //game lost reset
            }else if(gameRunning==-1){
                setTime(0);
                timer();
                console.log("resetttttt");
                initiateValues();
                gameRunning = 1;
                renderGame();
            }
        }
    }


    function checkImagesLoaded() {
        console.log("chec");
        // Get all the images on the page
        var images = document.querySelectorAll('img');
        var imagesLoaded = 0;
        console.log(images.length);
        for (var i = 0; i < images.length; i++) {
          var img = new window.Image();
          img.src = images[i].src;
          img.onload = function() {
            console.log("loadeddddddddddd");
            imagesLoaded++;
            if (imagesLoaded == images.length) {
                // If all the images have finished loading
                console.log('All images have finished loading');
                props.setIsLoading(0);
            }
          }
        }
    }
    
    //when grid is finished loading start game logic
    useEffect(() => {
        props.setIsLoading(1);
        checkImagesLoaded();
        console.log('start lights');
        document.addEventListener('keydown', spacebarHandler,true);
        document.addEventListener('touchstart', spacebarHandler,true);

        //starts the first x tiles
        initiateValues();

        //runs when component stacker gets unrendered (go back to menu / change screen)
        return () => {
            console.log('cleanup');
            resetGame();
            document.removeEventListener('keydown',spacebarHandler,true);
            document.removeEventListener('touchstart',spacebarHandler,true);
        };
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
            for(let i = 0; i < props.gridWidth; i++){
                //scroll until you find the first red, and color the previous one red.
                if(lightsGrid[currentRow][i+1]==1 && lightsGrid[currentRow][i]==0){
                    lightsGrid[currentRow][i] = 1;
                }
                //scroll until you find the first white, and color the previous one red.
                if((lightsGrid[currentRow][i+1]==0 || i==props.gridWidth-1) && lightsGrid[currentRow][i]==1){
                    lightsGrid[currentRow][i] = 0;
                }
                
            }
        }
        

        if(direction=="right"){
            for(let i = props.gridWidth-1; i >= 0; i--){
                //scroll until you find the first red, and color the previous one red.
                if(lightsGrid[currentRow][i-1]==1 && lightsGrid[currentRow][i]==0){
                    lightsGrid[currentRow][i] = 1;
                }
                //scroll until you find the first white, and color the previous one red.
                if((lightsGrid[currentRow][i-1]==0 || i==0) && lightsGrid[currentRow][i]==1){
                    lightsGrid[currentRow][i] = 0;
                }
                
            }
        }

        arrayToLights();
        
        //if i reach the end of the field, change direction
        if(lightsGrid[currentRow][0]==1){
            direction = "right";
        }
        
        if(lightsGrid[currentRow][props.gridWidth-1]==1){
            direction = "left";
        }
    }
  
    //game render loop
    const renderGame = () => {
        let t = setTimeout(() => {
            if(gameRunning==1 && location.pathname=="/play"){
                moveLights();
                arrayToLights();
                renderGame();
                //console.log("render");
            }
        }, props.timer);
    }

      //game score timer
      const timer = () => {
        let b = setTimeout(() => {
            if(gameRunning==1 && location.pathname=="/play"){
                setTime((time)=>Number((time+100)));
                timer();
            }
        }, 100);
    }
    


    return (
    <>
        <div id="stackerContainer" className="flex justify-center flex-col items-center ">
            <div id="stackerTitle">STACKER</div>
            <div id="stackerBody">
                <div id="stacker">
                    <div id="stackerBodyContainer" className=''>
                        <div id="stackerBodyVideo" className=''><img src="../noise.gif"/></div>
                        <div id="stackerGridBody" className='grid relative' style={{gridTemplateColumns: "repeat("+`${props.gridWidth}`+", 1fr)"}}>
                        {gridRender()}
                        </div>
                    </div>
                </div>
                <div id="timerContainer">
                    <div id="timer">{Number(time/1000).toFixed(1)}</div>
                    <span id="backHome" onClick={()=>{navigate('/')}}>Menu</span>
                </div>
            </div>
        </div>
    </>
    );
};

export default Stacker;
