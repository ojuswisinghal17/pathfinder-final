import logo from './logo.svg';
import './App.css';
import GridSquare from './Components/GridSquare'
import Dashboard from './Components/Dashboard';
import { useState , useMemo} from 'react';
import { DragDropContext , Droppable } from 'react-beautiful-dnd';
import { VscRunAll } from 'react-icons/vsc';

import {Dijkstra} from './Algorithms/Dijkstra'
import {Astar} from './Algorithms/Astar'

import {recursivedivision} from './Maze Algorithms/RecursiveDivision'
import {randomMaze} from './Maze Algorithms/RandomMaze'

function App() {

  //Creating The Grid Matrix
  const rownumbers = 20;
  const colnumbers = 40;

  // Grid Nodes has Two Values : [0] is Value, [1] is CurrentWeight
  var startgrid = []; //Matrix to start
  for (var row = 0; row < rownumbers; row++) {
    startgrid[row] = [];
    for (var col = 0; col < colnumbers; col++) {
      startgrid[row][col] = [0,0,0]; // first is Type, second: X of previous node; third : Y of previous node
    }
  }

  //The Grid State
  const [maingrid, updateGrid] = useState(useMemo(() => startgrid));

  // Default Start Position with State [startX, startY, endX, endY]
  const [startendpos, updateStartEndPos] = useState(useMemo(() => [5,10,7,12]));

  // Toggle Start/End/Bomb Buttons
  const [StartBtnclicked, updateStartBtn] = useState(false);
  const [EndBtnclicked, updateEndBtn] = useState(false);

  // change algorithm (from Dashboard)
  const [algorithm, updateAlgorithm] = useState("Dijkstra's Algorithm");

  // change speed (from Dashboard)
  const [speed, updateSpeed] = useState("Speed");


  const [maze, updateMaze] = useState("Generate Maze");

  // for display after algo animation
  const [finaldistance, updateFinalDistance] = useState(0);

  // number of nodes visited
  const [nodesVisited, updateNodesVisited] = useState(0);

  // Function to update Grid (called from GridSquare click)
  const updatethegrid = (row, col, value) =>  {
    maingrid[row][col][0] = value;
  }

  //Function to CLEAR Grid : 
  const clearGrid = () => {
    const newArr = [];
    for (var row = 0; row < rownumbers; row++) {
      newArr[row] = [];
      for (var col = 0; col < colnumbers; col++) {
        newArr[row][col] = [0,0,0];
      }
    }
    updateGrid([...newArr])
    updateFinalDistance(0);
    updateNodesVisited(0);
  }
  

  //Function to REFRESH GRID WITH NEW START/END Locations...
  const updateStartEnd = (newrow, newcol, updatewhat) => {
    var newArray = [...maingrid]; //clone maingrid 

    //According to updatewhat: 2 is Start and 3 is End
    //
    if(updatewhat === 2){
      // Erase previous Start with 0
      for (var row = 0; row < rownumbers; row++) {
        for (var col = 0; col < colnumbers; col++) {
          //newArr[row][col] = '0';
          if(newArray[row][col][0] === updatewhat){ //if Start Node then empty it
            newArray[row][col][0] = 0
          }
        }
      }
      var newStartEnd = [...startendpos];
      newStartEnd[0] = newrow;
      newStartEnd[1] = newcol;
      updateStartEndPos([...newStartEnd])
      updateStartBtn(false)
    }
    
    if(updatewhat === 3){
      // Erase previous Start with 0
      for (var row = 0; row < rownumbers; row++) {
        for (var col = 0; col < colnumbers; col++) {
          //newArr[row][col] = '0';
          if(newArray[row][col][0] === updatewhat){
            newArray[row][col][0] = 0
          }
        }
      }
      var newStartEnd = [...startendpos];
      newStartEnd[2] = newrow;
      newStartEnd[3] = newcol;
      updateStartEndPos([...newStartEnd])
      updateEndBtn(false)
    }

    updateGrid([...newArray]);
  }

  function VisualizeAlgorithm(){
    updateFinalDistance(0);
    updateNodesVisited(0);
    if(algorithm === "Dijkstra's Algorithm"){
      Dijkstra(maingrid, updateGrid, isWall, updateFinalDistance, updateNodesVisited, startendpos, rownumbers, colnumbers, speed);
    }
    if(algorithm === "A* Algorithm"){
      Astar(maingrid, updateGrid, isWall, updateFinalDistance, updateNodesVisited, startendpos, rownumbers, colnumbers, speed);
    }
  }

  function isWall(row,col) {
    if(maingrid[row][col][0] == 1){
        return true;
    }
    else{
      return false;
    }
  }

  function GenerateMaze(){
    if(maze == "Recursive Division"){
      recursivedivision(updateGrid, maingrid, colnumbers, rownumbers);
    }
    else{
      if(maze == "Random Maze"){
        randomMaze(updateGrid, maingrid, 0, 0, colnumbers, rownumbers);
      }
      else{
        //recursivedivision(updateGrid, maingrid, colnumbers, rownumbers);
        //alert(maze)
       }
    }
  }



  // Create Grid Display with TABLE :
  var grid = [<></>];
  for (var row = 0; row < rownumbers; row++) {
        //grid[row] = [];
    grid.push(<tr></tr>)
    for (var col = 0; col < colnumbers; col++) {
          grid.push(<td>
            <GridSquare 
              row={row} 
              col={col} 
              maingrid={maingrid}
              updatethegrid={updatethegrid} 
              updateGrid={updateGrid}
              StartBtnclicked={StartBtnclicked} 
              updateStartEnd={updateStartEnd} 
              startendpos={startendpos}
              EndBtnclicked={EndBtnclicked}/>
            </td>)
      }
    }

 
  return (
    <div className="row" >
      <Dashboard 
        Grid={maingrid} 
        algorithm={algorithm}
        updateAlgorithm={updateAlgorithm}
        speed={speed}
        finaldistance={finaldistance}
        nodesVisited={nodesVisited}
        updateSpeed={updateSpeed}
        clearGrid={clearGrid} 
        maze = {maze}
        updateMaze = {updateMaze}
        updateStartBtn={updateStartBtn} 
        updateEndBtn={updateEndBtn} 
        VisualizeAlgorithm={VisualizeAlgorithm} 
        GenerateMaze={GenerateMaze}
        updatethegrid={updatethegrid}
        />

      <DragDropContext>
        <table className='grid-board '>
            {grid}
        </table>
      </DragDropContext>
      
    </div>
  );
}

export default App;
