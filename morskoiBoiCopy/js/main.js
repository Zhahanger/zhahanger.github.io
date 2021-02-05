// give elements from DOM
let excel = document.getElementsByClassName('excel');
let excelUser = document.getElementsByClassName('excelUser');
console.log(excel);
console.log(excelUser);
let gameZone = document.getElementById('gameZone');
let N = 101;
//Table computer create
function tableComp(){
    let table = document.createElement('div');
    table.classList.add('table');
    gameZone.appendChild(table);
    for(let i = 1;i < N;i++){
        let a = document.createElement('div');
        a.classList.add('excel');
        a.style.background = 'url(img/waves.png) center center no-repeat';
        table.appendChild(a)
    }
    gameZone.appendChild(table);
}
tableComp();
let table = document.getElementsByClassName('table')[0];
table.style.display = "none";
//Table user create
function tableUser(){
    alert('Вставьте корабли');
    let btn = document.createElement('button'); 
    let tableUser = document.createElement('div');
    tableUser.classList.add('tableUser');
    gameZone.appendChild(tableUser);

    for(let i = 1;i < N;i++){
        let a = document.createElement('div');
        a.classList.add('excelUser');
        a.style.background = 'url(img/waves.png) center center no-repeat';
        tableUser.appendChild(a)
    }
    gameZone.appendChild(tableUser);
    let excel = document.getElementsByClassName('excel');
    let excelUser = document.getElementsByClassName('excelUser');
}
tableUser();
//create ships 
let countShip = 0;
let j = 0;
function userShips(){
    let check = false;
    let tableUser = document.getElementsByClassName('tableUser')[0];
    tableUser.addEventListener('click',function (event) {
        countShip = 0;
        if(event.target.classList.contains('excelUser') && !check) {
        event.target.classList.add('ship');
        event.target.style = '';
        event.target.style.background = 'url(img/ship.png) center center no-repeat';
        j++;
        }
        if(j > 1){
            check = true;
            checkStart();
        }
        // checkStartGame();
    })
    
}
userShips();
//create computer ships
function compShips() { 
    let position = Math.floor(Math.random() * (N - 1));
    let position2 = Math.floor(Math.random() * (N - 1));
    while(position == position2){
    position2 = Math.floor(Math.random() * (N - 1));
    }
    console.log(position);
    console.log(position2);
    excel[position].style.backgroundColor = 'blue';
    excel[position].classList.add('ship');
    excel[position2].style.backgroundColor = "blue";
    excel[position2].classList.add('ship');
 }
//check start game
let checkStartFlag = true;
function checkStart(){
    while(checkStartFlag){
        alert('Игра началась');
        table.style.display = "block";
        table.style.display = "grid";
        compShips();
        alert('Стреляйте');
        checkStartFlag = false;
        // shootUser();
    }
}
//shoot User
// function shootUser(){
    table.addEventListener('click',function(event){
        if(event.target.classList.contains('ship') && event.target.classList.contains('excel')){
            event.target.style.background = '';
            event.target.style.backgroundColor = 'black';
            event.target.classList.remove('ship');
            event.target.classList.add('shooted');
            checkWin();
            shoot();
            console.log('popal');
        }else if(event.target.classList.contains('shooted') && event.target.classList.contains('excel')){
            console.log('Это уже было!');
        }
        else if(event.target.classList.contains('excel') && !event.target.classList.contains('shooted') && !event.target.classList.contains('ship')){
            event.target.style.backgroundColor = 'grey';
            event.target.innerHTML = '';
            event.target.style.background = 'url(img/shooted.png) center center no-repeat';
            event.target.classList.add('shooted');
            shoot();
            checkWin();
        }
    })
// }
 //shoot computer
 function shoot() {
     let check = true;
     do{  
    let shootNum = Math.floor(Math.random() * (N - 1));
    console.log(shootNum)
    if(!excelUser[shootNum].classList.contains('shooted')){
        check = false;
        console.log(check);
    }
    if(excelUser[shootNum].classList.contains('ship')){
        excelUser[shootNum].classList.remove('ship');
        excelUser[shootNum].style = '';
        excelUser[shootNum].style.backgroundColor = 'black';
        excelUser[shootNum].classList.add('shooted');
        checkWin();
    }else{
        excelUser[shootNum].style = '';
        excelUser[shootNum].style.background = 'url(img/shooted.png) center center no-repeat';
        excelUser[shootNum].classList.add('shooted');
        console.log('shoot num:' + shootNum);
        checkWin();
    }
     
} while(check);
        
    if(event.target.classList.contains('ship')){
        event.target.style.backgroundColor = 'black';
        event.target.classList.remove('ship');
    }
    
}

function checkWin(){
    let counterUser = 0,
        counterComp = 0;
    for(let i = 0;i < excelUser.length;i++){
        if(excelUser[i].classList.contains('ship')){
            counterUser++;
        }
        if(excel[i].classList.contains('ship')){
            counterComp++;
        }
    }
    if(counterUser == 0){
        alert('Выиграл компьютер');
        window.location.reload();
    } else if(counterComp == 0){
        alert('Ты выиграл');
        window.location.reload();
    }
}