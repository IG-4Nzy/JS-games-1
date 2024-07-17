const array = ['stone','paper','scissors'];

let i = 3;
let playerpoints = 0;
let computerPoints = 0;
let draw = 0;
let computerChoosed;
let option;
let flag = 'play';
let clicked = false;

const timer = document.getElementsByClassName('timer');
const buttons = document.getElementsByClassName('buttons');
const points = document.getElementsByClassName('score');
const modal = document.getElementsByClassName('modal');
const modalText = document.getElementsByClassName('modal-text');
const btn = document.getElementsByClassName('btn');

let computerImage = document.getElementsByClassName('computer-img');
let playerImage = document.getElementsByClassName('player-img');


function validate(playerChoosed){
    
    if(playerChoosed && i === 0){
        playerImage[0].classList.remove('hidden');
        computerImage[0].classList.remove('hidden');
        switch(playerChoosed){
            case 'stone':
                playerImage[0].src = "assets/stone.png";
                if (computerChoosed === 'paper'){
                    computerPoints ++;
                    computerImage[0].src = "assets/paper.png";
                }else if(computerChoosed === 'scissors'){
                    computerImage[0].src = "assets/scissor.png";
                    playerpoints ++;
                }else{
                    computerImage[0].src = "assets/stone.png";
                    draw ++;
                }
                break;
            case 'paper':
                playerImage[0].src = "assets/paper.png";
                if (computerChoosed === 'scissors'){
                    computerImage[0].src = "assets/scissor.png";
                    computerPoints ++;
                }else if(computerChoosed === 'stone'){
                    computerImage[0].src = "assets/stone.png";
                    playerpoints ++;
                }else{
                    computerImage[0].src = "assets/paper.png";
                    draw ++;
                }
                break;
            case 'scissors':
                playerImage[0].src = "assets/scissor.png";
                if (computerChoosed === 'stone'){
                    computerPoints ++;
                    computerImage[0].src = "assets/stone.png";
                }else if(computerChoosed === 'paper'){
                    playerpoints ++;
                    computerImage[0].src = "assets/paper.png";
                }else{
                    computerImage[0].src = "assets/scissor.png";
                    draw ++;
                }
                break;
        }
        points[0].innerHTML = `<span class="red">YOU</span> : ${playerpoints} / 5 &nbsp; <span class="blue">COMPUTER</span>  : ${computerPoints} / 5 <br>DRAW : ${draw}`; 
        if(playerpoints >= 5){
            console.log('player win');
            modal[0].classList.remove('hidden');
            modalText[0].innerHTML = "YOU WIN"
        }else if(computerPoints >= 5){
            console.log('computer win');
            modal[0].classList.remove('hidden');
            modalText[0].textContent = "YOU LOSE"
        } else{
            setTimeout(function(){
                startTimer();
            },2000)
            i = 4;
        } 
    }else{
        computerPoints ++;
        points[0].innerHTML = `<span class="red">YOU</span>  : ${playerpoints} / 5 &nbsp; <span class="blue">COMPUTER</span>  : ${computerPoints} / 5 <br>DRAW : ${draw}`;
        if(playerpoints >= 5){
            console.log('player win');
            modal[0].classList.remove('hidden');
            modalText[0].innerHTML = "YOU WIN"
        }else if(computerPoints >= 5){
            console.log('computer win');
            modal[0].classList.remove('hidden');
            modalText[0].textContent = "YOU LOSE"
        } else{
            setTimeout(function(){
                startTimer();
            },2000)
            i = 4;
        } 
        
    }
    console.log("player points : ",playerpoints);
    console.log("computer points : ",computerPoints);


}


function startTimer(){
    playerImage[0].src = "";
    playerImage[0].classList.add('hidden');
    computerImage[0].src = "";
    computerImage[0].classList.add('hidden');

    Array.from(btn).forEach(element => {
        element.style.backgroundColor = "";
    });


    if(computerPoints <= 5 && playerpoints <= 5){
        computerChoosed = array[Math.floor(Math.random()*array.length)];
        let countDown = setInterval(function(){
            if(i > 0){
                timer[0].classList.remove('hidden');
                buttons[0].classList.remove('hidden');
                document.getElementById('count-down').textContent = i;
            }else{
                clearInterval(countDown);
                timer[0].classList.add('hidden');
                buttons[0].classList.add('hidden');
                validate(option);
            }
            i--;
        },1000)
    }
    clicked = false;
    option = "";
    playerChoosed = "";
}

function btnClicked(value,i){
    
    if(i){
        option = value;
    }else{
        option = "";
    }
    btn[i].style.backgroundColor = "orangered";
}

function newGame(){
    if(clicked === false){
        modal[0].classList.add('hidden');
        i = 3;
        playerpoints = 0;
        computerPoints = 0;
        draw = 0;
        points[0].innerHTML = `YOU : ${playerpoints} COMPUTER : ${computerPoints}<br>DRAW : ${draw}`;
        clicked = true;
        startTimer();
    }
    
}