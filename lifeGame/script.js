const canvas = document.getElementById('canvas'),
      button = document.getElementsByTagName('button')[0];
const cellSize = 10,
      cellsInColumns = Math.floor(canvas.width / cellSize),
      cellsInRows = Math.floor(canvas.height / cellSize);
let activeArray = [],
    inActiveArray = [];
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  }
function createTable(inRow,inColumn){
    for (let i = 0; i < inRow; i++) {
        activeArray[i] = [];
        for (let j = 0; j < inColumn; j++) {
           activeArray[i][j] = 0;
        }
     }
     inActiveArray = activeArray;
}
createTable(cellsInRows,cellsInColumns);
canvas.addEventListener('click',(event)=>{
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x / cellSize);
    y = Math.floor(y / cellSize);
    console.log("y:",y)
    console.log("x:",x)
    if(activeArray[y][x] === 1){
        activeArray[y][x] = 0;
        
    } else {
        activeArray[y][x] = 1
    }
    colorArray();
})
console.log(activeArray);
function colorArray() {
    for (let i = 0; i < cellsInColumns; i++) {
        for (let j = 0; j < cellsInRows; j++) {
             let color;
             if (activeArray[i][j] == 1)
                 color = 'green';
             else
                 color = 'black';
             ctx.fillStyle = color;
             ctx.fillRect(j * cellSize, i * cellSize,    cellSize, cellSize);
        }
    }
}
colorArray();
button.addEventListener('click',checkBornAndLife)
function checkBornAndLife (){
    for (let i = 0; i < cellsInRows; i++) {
        for (let j = 0; j < cellsInColumns; j++) {
            let neighbor = countNeighbor(i,j);
            console.log(i + " " + j);
            console.log(neighbor);
            if(neighbor === 3){
                alert(i,j);
            }
            
            if((activeArray[i][j] === 1) && (neighbor < 2 || neighbor >= 4)){
                inActiveArray[i][j] = 0;
            }
            
            if((activeArray[i][j] === 1) && (neighbor === 3 || neighbor === 2)){
                inActiveArray[i][j] = 1;
            }
        }
    }
    activeArray = inActiveArray;    
    colorArray();
}

function countNeighbor (y,x) {
    let counter = 0;
    if(activeArray[fix(y)][fix(x + 1)] === 1){
        counter++;
    }
    if(activeArray[fix(y)][fix(x - 1)] === 1){
        counter++;
    }
    if(activeArray[fix(y + 1)][fix(x)] === 1){
        counter++;
    }
    if(activeArray[fix(y - 1)][fix(x)] === 1){
        counter++;
    }
    if(activeArray[fix(y - 1)][fix(x + 1)]){
        counter++;
    }
    if(activeArray[fix(y - 1)][fix(x - 1)]){
        counter++;
    }
    if(activeArray[fix(y + 1)][fix(x + 1)]){
        counter++;
    }
    if(activeArray[fix(y + 1)][fix(x - 1)]){
        counter++;
    }
    return counter;
}
function fix (a){
    if(a <= -1){
        a = a + 60;
    }
    if(a > 59){
        a = a - 59;
    }
    return a;
}