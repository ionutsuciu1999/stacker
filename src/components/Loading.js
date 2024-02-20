import React from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useState, useRef} from 'react'
import {useEffect} from 'react';

const Loading = (props) =>{

    

    return(
        <div id="loadingContainer"  className={props.isLoading ? "fadeIn" : "fadeOut" }>
            <img id="loadingImg1" src="../loading.gif"/>
            <img id="loadingImg2" src="../loadingText.gif"/>
        </div>
    )
}

export default Loading;