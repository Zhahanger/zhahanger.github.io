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
    for (let i = 0; i < cellsInRows; i++) {
        for (let j = 0; j < cellsInColumns; j++) {
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
let neighbor = 0;
colorArray();
button.addEventListener('click',start)
function start() { 
    const interval = setInterval(checkBornAndLife,100)
 }
let arrayBorn = [],
    arrayDie = [],
    arrayLife = [];
const checkBornAndLife = () =>{
    arrayBorn = [],
    arrayDie = [],
    arrayLife = [];
    for (let i = 0; i < cellsInRows; i++) {
        for (let j = 0; j < cellsInColumns; j++) {
            neighbor = 0;
            neighbor = countNeighbor(i , j);
            console.log(i + ' ' + j + ' :' + neighbor )
            if(activeArray[i][j] === 1){
                if(neighbor < 2 || neighbor > 3){
                    arrayDie.push({"x" : i,"y" : j})
                } else if(neighbor == 2 || neighbor == 3){
                    arrayLife.push({"x" : i,"y" : j})
                }
            } else {
                if(neighbor === 3){
                    arrayBorn.push({"x" : i,"y" : j})
                }
            }
            // if((neighbor === 3) && (activeArray[i][j] === 0)){
            //     activeArray[i][j] = 1
            // }
            // if(neighbor > 0){
            //     console.log(`${i}  ${j} : ${neighbor}`)
            // }
        }
    }
        
     colorArray();
     doBornAndLife();
}
const doBornAndLife =() =>{
    arrayDie.forEach(item => {
        inActiveArray[item["x"]][item["y"]] = 0;
    })
    arrayBorn.forEach(item => {
        inActiveArray[item["x"]][item["y"]] = 1;
    })
    arrayLife.forEach(item =>{
        inActiveArray[item["x"]][item["y"]] = 1;
    })
    activeArray = inActiveArray;
    colorArray();
}
// function checkBornAndLife (){
//     for (let i = 0; i < cellsInRows; i++) {
//         for (let j = 0; j < cellsInColumns; j++) {
//             neighbor = 0;
//             neighbor = countNeighbor(i , j);
            
//             console.log(i + " " + j);
//             console.log(neighbor);
//             // if(neighbor == 3){
//             //     alert("yes" + i + " " + j)
//             // }
//             if(activeArray[i][j] === 0 && neighbor === 3){
//                 inActiveArray[i][j] = 1;
//                 console.log(inActiveArray)
//             }
//             else if(activeArray[i][j] === 1 && neighbor < 2 || neighbor >= 4){
//                 inActiveArray[i][j] = 0;
//             }
//             else if(activeArray[i][j] === 1 && neighbor === 3 || neighbor === 2){
//                 inActiveArray[i][j] = 1;
//             }
//         }
//     }
//     activeArray = inActiveArray;    
//     colorArray();
//     console.log("Result: " + countNeighbor(26,23));
// }
// function checkBornAndLife(){
//     activeArray.forEach((item)=>{
//         item.forEach((inItem)=>{
//             if(inItem =)
//         })
//     })
// }
function countNeighbor (y,x) {
    let counter = 0;
    if(activeArray[fix(y)][fix(x + 1)] == 1){
        counter++;
    }
    if(activeArray[fix(y)][fix(x - 1)] == 1){
        counter++;
    }
    if(activeArray[fix(y + 1)][fix(x)] == 1){
        counter++;
    }
    if(activeArray[fix(y - 1)][fix(x)] == 1){
        counter++;
    }
    if(activeArray[fix(y - 1)][fix(x + 1)] == 1){
        counter++;
    }
    if(activeArray[fix(y - 1)][fix(x - 1)] == 1){
        counter++;
    }
    if(activeArray[fix(y + 1)][fix(x + 1)] == 1){
        counter++;
    }
    if(activeArray[fix(y + 1)][fix(x - 1)] == 1){
        counter++;
    }

    return counter;

}
function fix (a){
    if(a < 0){
        a = a + 60;
    }
    if(a > 59){
        a = a - 60;
    }
    return a;
}