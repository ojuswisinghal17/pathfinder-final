
// Some explanations of this Maze Generation algorithm
//http://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm

var outborder = false;

export async function randomMaze(updateGrid, maingrid, row, col, width, height) {
    var newArray = [...maingrid]; //clone maingrid 
    if(outborder == false){ // create out border only when not exist
        CreateExtBorder(newArray,width,height);
        outborder = true;
        updateGrid([...newArray]);
    }
    updateGrid([...newArray]);

    // CAN MODIFY THIS LATER FOR SETTINGS
    var spacing = 5;  // opposite of densite : spacing 

    for (var row = 1; row < height-1; row++) {
        for (var col = 1; col < width-1; col++) {
            var rand = randomNumber(0,spacing);
            if(rand == 0){
                newArray[row][col][0] = 1; 
            }
            else{
                newArray[row][col][0] = 0; 
            }
        }
    }

    updateGrid([...newArray]);
}

function CreateExtBorder(grid, width, height){
    for(var i = 0; i < width; i++){
        grid[0][i][0] = 1;
    }
    for(var i = 0; i < height; i++){
        grid[i][width-1][0] = 1;
    }
    for(var i = width-1; i > 0; i--){
        grid[height-1][i][0] = 1;
    }
    for(var i = height-1; i > 0; i--){
        grid[i][0][0] = 1;
    }
    return grid;
}

// Generate a random number between lowNum and highNum
function randomNumber(lowNum, highNum) {
    return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}