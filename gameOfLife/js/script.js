const canvas = document.getElementById("canvas"),
  button = document.getElementsByClassName("buttons");
const cellSize = 10,
  inColumns = Math.floor(canvas.width / cellSize),
  inRows = Math.floor(canvas.height / cellSize);
let presentArray = [],
  futureArray = [],
  neighbor = 0;
if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
}
let arrayBorn = [],
  arrayDie = [],
  arrayLife = [];
let interval = 0;
button[0].onclick = () => checkLife();
button[1].onclick = () => start();
button[2].onclick = () => createTable(inRows, inColumns);
button[3].onclick = () => (interval ? clearInterval(interval) : (interval = 0));

const start = () => {
  interval = setInterval(checkLife, 100);
};

function createTable(inRow, inColumn) {
  for (let i = 0; i < inRow; i++) {
    presentArray[i] = [];
    for (let j = 0; j < inColumn; j++) {
      presentArray[i][j] = 0;
    }
  }
  futureArray = presentArray;
  colorArray();
}
createTable(inRows, inColumns);

canvas.addEventListener("click", (event) => {
  let x = event.offsetX;
  let y = event.offsetY;
  x = Math.floor(x / cellSize);
  y = Math.floor(y / cellSize);
  if (presentArray[y][x] === 1) {
    presentArray[y][x] = 0;
  } else {
    presentArray[y][x] = 1;
  }
  colorArray();
});

function colorArray() {
  for (let i = 0; i < inRows; i++) {
    for (let j = 0; j < inColumns; j++) {
      let color;
      if (presentArray[i][j] == 1) color = "green";
      else color = "black";
      ctx.fillStyle = color;
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

function checkLife() {
  (arrayBorn = []), (arrayDie = []), (arrayLife = []);
  for (let i = 0; i < inRows; i++) {
    for (let j = 0; j < inColumns; j++) {
      neighbor = 0;
      neighbor = countNeighbor(i, j);
      if (presentArray[i][j] === 1) {
        if (neighbor < 2 || neighbor > 3) {
          arrayDie.push({ x: i, y: j });
        } else if (neighbor == 2 || neighbor == 3) {
          arrayLife.push({ x: i, y: j });
        }
      } else {
        if (neighbor === 3) {
          arrayBorn.push({ x: i, y: j });
        }
      }
    }
  }

  colorArray();
  doLife();
}
function doLife() {
  arrayDie.forEach((item) => (futureArray[item["x"]][item["y"]] = 0));
  arrayBorn.forEach((item) => (futureArray[item["x"]][item["y"]] = 1));
  arrayLife.forEach((item) => (futureArray[item["x"]][item["y"]] = 1));
  presentArray = futureArray;
  colorArray();
}
function countNeighbor(y, x) {
  let counter = 0;
  if (presentArray[fix(y)][fix(x + 1)] == 1) counter++;
  if (presentArray[fix(y)][fix(x - 1)] == 1) counter++;
  if (presentArray[fix(y + 1)][fix(x)] == 1) counter++;
  if (presentArray[fix(y - 1)][fix(x)] == 1) counter++;
  if (presentArray[fix(y - 1)][fix(x + 1)] == 1) counter++;
  if (presentArray[fix(y - 1)][fix(x - 1)] == 1) counter++;
  if (presentArray[fix(y + 1)][fix(x + 1)] == 1) counter++;
  if (presentArray[fix(y + 1)][fix(x - 1)] == 1) counter++;
  return counter;
  function fix(a) {
    if (a < 0) a = a + 60;
    if (a > 59) a = a - 60;
    return a;
  }
}
