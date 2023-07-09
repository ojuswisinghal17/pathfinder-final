import React from "react";
import { useState} from 'react';
import { css } from "styled-components";
import styled, {keyframes } from "styled-components";

const GridSquare = ({row, col, maingrid, updatethegrid, updateGrid, StartBtnclicked, EndBtnclicked, startendpos, updateStartEnd }) => {
    
    //Weight of Current Node
    var weight = maingrid[row][col][1]

    
    //Values : 0:Empty; 1:Wall; 2:Start; 3:Target;  4:SearchPath; 5:FinalPath;
    if(row == startendpos[0] && col == startendpos[1]){ //Check if current cell is the startnode
        updatethegrid(row, col, 2)
        var value = 2
    } 
    else if(row == startendpos[2] && col == startendpos[3]) {
        updatethegrid(row, col, 3)
        var value = 3
    }
    else{
        var value = maingrid[row][col][0]
    }
    
    
    //nodevalue = '1' ? maingrid[row][col] = '1' : maingrid[row][col] = '0';


    //MOST AWESOME METHOD EVER
    //Change Parent State array element without rerendering whole array again
    // so no more slow anymore !
    const [item, setItem] = useState(value);
    
    function onchange() {
        let newValue = 0;
        if(value === 1){
            newValue = 0
        }
        if(value === 0){
            newValue = 1
        }
        if(StartBtnclicked === true){ // If start button was toggled on !
            updateStartEnd(row, col, 2)
            newValue = 2
        }
        
        if(EndBtnclicked === true){ // If start button was toggled on !
            updateStartEnd(row, col, 3)
            newValue = 3
        }



        setItem(prevState => {
            
          let newItem = newValue;
            
          // sync with [arent array]
          updatethegrid(row, col, newItem, 0);
          return newItem;
        });

        // If wall, remove it forcefully so we'll use updateGrid instead of updatethegrid which is faster
        if(value === 1){
            var newArray = [...maingrid]; //clone maingrid 
            newArray[row][col][0] = 0;
            updateGrid([...newArray]);
        }
    }

    

    const startblock = <div className='btn btn-primary'></div>;

    
   let bGColor = {
        //backgroundColor: "white",
      };

    if(value == 2){ // Start CSS
        bGColor = { backgroundColor: "#19ff38", borderWidth : "20px" }; 
    }

    if(value == 3){ // Target End CSS
        bGColor = { backgroundColor: "#f74848", borderWidth : "20px"}; 
    }

    var mover = false;

    function mouseDown() {
        if(mover == true){
            //onchange();
            console.log("clicked")
        }
    }

    function mouseStatus(check) {
        if(check == true){
            mover = true;
        }
    }


    return (
        <div className={"gridsquare " + (value === 1 ? "wallAnimation " : '') + (value === 4 ? "loadingAnimation " : '') + (value === 5 ? "pathfoundAnimation " : '')} onClick={onchange} onMouseOver={function(e){
            if(e.buttons == 1 || e.buttons == 3){
                if(value !== 1){
                    onchange();
                }
            }
        }} style={bGColor}>
           
        </div>
    )

    // INTERESTING CSS Styling with If and Else
    //<div className='gridsquare'   onClick={onchange} style={{ backgroundColor : value === 1 ? '#007BFF' : value === 2 ?  '#19ff38' : value === 3 ?  '#f74848' : value === 4 ?  '#f4ff59' : value === 5 ?  '#33daff' : '' }}>
      
}

export default GridSquare
