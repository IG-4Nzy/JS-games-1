let turn = 'player';
let diceValues = [1,2,3,4,5,6];
let isPlayerMadeFirstMove = false;
let isComputerMadeFirstMove = false;
let playerX;
let playerY;
let computerX;
let computerY;
let playerIndex;
let computerIndex;
let toggleTurn;

const route = ['00','01','02','03','04','05','06','07','08',
                '18','17','16','15','14','13','12','11','10',
                '20','21','22','23','24','25','26','27','28',
                '38','37','36','35','34','33','32','31','30',
                '40','41','42','43','44','45','46','47','48',
                '58','57','56','55','54','53','52','51','50',
                '60','61','62','63','64','65','66','67','68'
                ]
const indexImages = [
    'assets/bg-55.png',
    'assets/bg-56.png',
    'assets/bg-57.png',
    'assets/bg-58.png',
    'assets/bg-59.png',
    'assets/bg-60.png',
    'assets/bg-61.png',
    'assets/bg-62.png',
    'assets/bg-63.png',
    'assets/bg-54.png',
    'assets/bg-53.png',
    'assets/bg-52.png',
    'assets/bg-51.png',
    'assets/bg-50.png',
    'assets/bg-49.png',
    'assets/bg-48.png',
    'assets/bg-47.png',
    'assets/bg-46.png',
    'assets/bg-37.png',
    'assets/bg-38.png',
    'assets/bg-39.png',
    'assets/bg-40.png',
    'assets/bg-41.png',
    'assets/bg-42.png',
    'assets/bg-43.png',
    'assets/bg-44.png',
    'assets/bg-45.png',
    'assets/bg-36.png',
    'assets/bg-35.png',
    'assets/bg-34.png',
    'assets/bg-33.png',
    'assets/bg-32.png',
    'assets/bg-31.png',
    'assets/bg-30.png',
    'assets/bg-29.png',
    'assets/bg-28.png',
    'assets/bg-19.png',
    'assets/bg-20.png',
    'assets/bg-21.png',
    'assets/bg-22.png',
    'assets/bg-23.png',
    'assets/bg-24.png',
    'assets/bg-25.png',
    'assets/bg-26.png',
    'assets/bg-27.png',
    'assets/bg-18.png',
    'assets/bg-17.png',
    'assets/bg-16.png',
    'assets/bg-15.png',
    'assets/bg-14.png',
    'assets/bg-13.png',
    'assets/bg-12.png',
    'assets/bg-11.png',
    'assets/bg-10.png',
    'assets/bg-1.png',
    'assets/bg-2.png',
    'assets/bg-3.png',
    'assets/bg-4.png',
    'assets/bg-5.png',
    'assets/bg-6.png',
    'assets/bg-7.png',
    'assets/bg-8.png',
    'assets/bg-9.png',
];


document.addEventListener('DOMContentLoaded',function(){
    const board = document.getElementById('board');
    const row = 7;
    const col = 9;
    toggleTurn = document.getElementById('turn-toggle');
    toggleTurn.innerText = `${turn.toUpperCase()}\'S TURN`;
    for(let i = row-1 ; i >= 0 ; i--){
        for(let j = 0 ; j < col ; j++){
            const box = document.createElement('div');
            box.setAttribute('class','box');
            // box.innerHTML = `${i}${j}`;
            box.id = `${i}${j}`;
            board.appendChild(box);
        }
    }

    const squares = document.getElementsByClassName('box');
    [...squares].forEach((element,index) => {
        element.style.backgroundImage = `url('${indexImages[index]}')`;
    })
})

function playGame(){
    const rollBtn = document.getElementById('rollBtn');
    rollBtn.classList.add('hidden');
    rollDice();
    turn = turn === 'player' ? 'computer' : 'player';
    setTimeout(() => {
        if (turn === 'computer'){
            rollDice();
            turn = turn === 'player' ? 'computer' : 'player';
        }
    },3000);
}

function rollDice(){
    const dice = document.getElementById('dice');
    const img = document.createElement('img');

    dice.innerHTML = '';

    const rollingDice = 'assets/dice-game.gif';
    const diceOne = 'assets/dice-1.png';
    const diceTwo = 'assets/dice-2.png';
    const diceThree = 'assets/dice-3.png';
    const diceFour = 'assets/dice-4.png';
    const diceFive = 'assets/dice-5.png';
    const diceSix = 'assets/dice-6.png';

    const diceImages = [diceOne,diceTwo,diceThree,diceFour,diceFive,diceSix];

    let random = Math.floor(Math.random() * diceValues.length);
    let diceValue = diceValues[random];
    let randomDice = diceImages[diceValue-1];

    img.setAttribute('src',rollingDice);
    dice.appendChild(img);

    setTimeout(()=>{
        img.src = randomDice;
        if(turn === 'player'){
            const rollBtn = document.getElementById('rollBtn');
            rollBtn.classList.remove('hidden');
        }
        setTimeout(() => {
            toggleTurn.innerText = `${turn.toUpperCase()}\'S TURN`;
        },1000);
    },300);

    makeMove(diceValue);
}

function makeMove(diceValue){
    // check for player first move 
        if (turn === 'player' && isPlayerMadeFirstMove === false){
            if(diceValue === 1){
                let movable = route[0];
                playerX = movable[0];
                playerY = movable[1];
                playerIndex = 0;
                markMove();
                isPlayerMadeFirstMove = true;
            }
            
        }else
        // check for computer first move 
        if(turn === 'computer' && isComputerMadeFirstMove === false){
            if(diceValue === 1){
                let movable = route[0];
                computerX = movable[0];
                computerY = movable[1];
                computerIndex = 0;
                markMove();
                isComputerMadeFirstMove = true;
            }
        }else
    // check for player moves 
    if(isPlayerMadeFirstMove === true || isComputerMadeFirstMove === true){
        if(turn === 'player' && isPlayerMadeFirstMove === true){
            if (playerIndex < 57){
                playerIndex += diceValue;
                let movable = route[playerIndex];
                playerX = movable[0];
                playerY = movable[1];
                markMove();
            }else if(playerIndex === 57){
                switch(diceValue){
                    case 1:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 3:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 4:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 5:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(playerIndex == 58){
                switch(diceValue){
                    case 1:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 3:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 4:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(playerIndex == 59){
                switch(diceValue){
                    case 1:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 3:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(playerIndex == 60){
                switch(diceValue){
                    case 1:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(playerIndex == 61){
                switch(diceValue){
                    case 1:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(playerIndex == 62){
                switch(diceValue){
                    case 1:{
                        playerIndex += diceValue;
                        let movable = route[playerIndex];
                        playerX = movable[0];
                        playerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }
            
            
        }else
        if(turn === 'computer' && isComputerMadeFirstMove === true){
            if (computerIndex < 57){
                computerIndex += diceValue;
                let movable = route[computerIndex];
                computerX = movable[0];
                computerY = movable[1];
                markMove();
            }else if(computerIndex === 57){
                switch(diceValue){
                    case 1:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 3:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 4:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 5:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(computerIndex == 58){
                switch(diceValue){
                    case 1:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 3:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 4:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(computerIndex == 59){
                switch(diceValue){
                    case 1:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 3:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(computerIndex == 60){
                switch(diceValue){
                    case 1:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }else if(computerIndex == 61){
                switch(diceValue){
                    case 1:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    case 2:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }
                    default:{
                        updateIndex();
                    }
                }
            }else if(computerIndex == 62){
                switch(diceValue){
                    case 1:{
                        computerIndex += diceValue;
                        let movable = route[computerIndex];
                        computerX = movable[0];
                        computerY = movable[1];
                        markMove();
                    }default:{
                        updateIndex();
                    }
                }
            }
        }
    }
    
}


function markMove(){
    setTimeout(() => {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((element) => {
            element.innerHTML = '';
        });
        let PlayerBox = document.getElementById(`${playerX}${playerY}`);
        let PlayerComputer = document.getElementById(`${computerX}${computerY}`);

        if(PlayerBox){
            PlayerBox.textContent === '🖥️' ? PlayerBox.textContent += '🧔‍♂️' : PlayerBox.textContent = '🧔‍♂️';
            if(route[playerIndex] === '12'){
                setTimeout(() => {
                    playerX = '0';
                    playerY = '3';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '36'){
                setTimeout(() => {
                    playerX = '2';
                    playerY = '7';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '51'){
                setTimeout(() => {
                    playerX = '3';
                    playerY = '2';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '66'){
                setTimeout(() => {
                    playerX = '5';
                    playerY = '6';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '04'){
                setTimeout(() => {
                    playerX = '1';
                    playerY = '5';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '21'){
                setTimeout(() => {
                    playerX = '3';
                    playerY = '0';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '43'){
                setTimeout(() => {
                    playerX = '5';
                    playerY = '4';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '38'){
                setTimeout(() => {
                    playerX = '4';
                    playerY = '7';
                    playerIndex = route.indexOf(`${playerX}${playerY}`);
                    markMove();
                },10);
            }else if(route[playerIndex] === '68'){
                swal({
                    title: "YOU WIN",
                    text: "PLAY NEW GAME",
                    buttons: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      window.location.reload();
                    } 
                  });
            }
        }
        if(PlayerComputer){
            PlayerComputer.textContent === '🧔‍♂️' ? PlayerComputer.textContent += '🖥️' : PlayerComputer.textContent = '🖥️';
            if(route[computerIndex] === '12'){
                setTimeout(() => {
                    computerX = '0';
                    computerY = '3';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '36'){
                setTimeout(() => {
                    computerX = '2';
                    computerY = '7';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '51'){
                setTimeout(() => {
                    computerX = '3';
                    computerY = '2';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '66'){
                setTimeout(() => {
                    computerX = '5';
                    computerY = '6';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '04'){
                setTimeout(() => {
                    computerX = '1';
                    computerY = '5';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '21'){
                setTimeout(() => {
                    computerX = '3';
                    computerY = '0';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '43'){
                setTimeout(() => {
                    computerX = '5';
                    computerY = '4';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '38'){
                setTimeout(() => {
                    computerX = '4';
                    computerY = '7';
                    markMove();
                    computerIndex = route.indexOf(`${computerX}${computerY}`);
                },10);
            }else if(route[computerIndex] === '68'){
                swal({
                    title: "YOU LOSE",
                    text: "PLAY NEW GAME",
                    buttons: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      window.location.reload();
                    } 
                  });
            }
        }
        updateIndex();
    },1000)
}

function updateIndex(){
    playerIndex = route.indexOf(`${playerX}${playerY}`);
    computerIndex = route.indexOf(`${computerX}${computerY}`);
}
