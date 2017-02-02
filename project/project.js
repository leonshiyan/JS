let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let centerX = canvas.width/2;
let centerY = canvas.height/2;
let colorWheel = ["red","blue"];
let xBarOffset = 0;
let yBarOffset = 0;
let movementX = "right";
let movementY = "up";
let randomXStep = 0;
let randomYStep = 0;
ctx.translate(centerX,centerY);
ctx.save();
let isXPause = false;
let isYPause = false;
ctx.fillStyle = "red";
drawBoard();
let action1 = setInterval(xBarMovement,30);
let action2 = setInterval(yBarMovement,30);

let playerN = 1;
document.getElementById("button1").disabled = true;
let level = 1;

let scoreBoard1 = [];
let scoreBoard2 = [];

function changeLevel1(){
    level = 1;
    reset();
}
function changeLevel2(){
    level = 2;
    reset();
}
function changeLevel3(){
    level = 3;
    reset();
    
}
function reset(){
    scoreBoard1 = [];
    scoreBoard2 = [];
    document.getElementById("scoreBoard").innerHTML = "Your shots : <br> Player 1 : <br> Player 2:";
    isXPause = false;
    isYPause = false;
    clearInterval(action1);
    clearInterval(action2);
    action1 = setInterval(xBarMovement,30);
    action2 = setInterval(yBarMovement,30);
    
}
function changePlayer1(){
    playerN = 1;
    let button1 = document.getElementById("button1");
    button1.disabled = true;
    let button2 = document.getElementById("button2");
    button2.disabled = false;
    document.getElementById("Players").innerHTML = "Player : 1";
    
}
function changePlayer2(){
    playerN = 2;
    let button1 = document.getElementById("button1");
    button1.disabled = false;
    let button2 = document.getElementById("button2");
    button2.disabled = true;
    document.getElementById("Players").innerHTML = "Player : 2";
    
}
function drawBoard(){
    ctx.clearRect(-500,-500,1000,1000);
    for(let i = 6 ; i >0; i--){
        ctx.beginPath();
        ctx.arc(0,0,20*i,0,2*Math.PI);
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = colorWheel[i%2];
        ctx.fill();
    }
    
    let xBarCoord = xBarOffset+randomXStep;
    let yBarCoord = yBarOffset+randomYStep;
    
    ctx.beginPath();
    ctx.moveTo(xBarCoord,180);
    ctx.lineTo(xBarCoord,200);
    ctx.stroke();
    
   
    ctx.beginPath();
    ctx.moveTo(180,yBarCoord);
    ctx.lineTo(200,yBarCoord);
    ctx.stroke();
    
}
function xBarMovement (){
    switch(level){
        case 1:
            randomXStep = 0;
            break;
        case 2:
            randomXStep = Math.floor((Math.random() * 60) + 10);
            break;
        case 3:
            randomXStep = Math.floor((Math.random() * 99) - 49);
            break;
    }     

    
    if(isXPause == false){
        if( movementX == "right"){
            xBarOffset+=20;
        }else if( movementX == "left") {
            xBarOffset-=20;
        }
        if(xBarOffset >= 160){
            movementX = "left";
        }else if(xBarOffset <= -160){
            movementX = "right";
        }
        drawBoard();
        
}
    else{
        clearInterval(action1);
        drawBoard();
    }
}

function yBarMovement (){
     switch(level){
        case 1:
            randomYStep = 0;
            break;
        case 2:
            randomYStep = Math.floor((Math.random() * 60) + 10);
            break;
        case 3:
            randomYStep = Math.floor((Math.random() * 99) - 49);
            break;
    }     
    if(isYPause == false){
        if( movementY == "up"){
            yBarOffset-=20;
        }else if( movementY == "down") {
            yBarOffset+=20;
        }
        if(yBarOffset <= -160){
            movementY = "down";
        }else if(yBarOffset >= 160){
            movementY = "up";
        }
        drawBoard();
}
    else{
        clearInterval(action2);
        drawBoard();
        
    }
}


function xHandler(){ 
    if(isXPause==false){
        isXPause = true;
    } else {
        isXPause = false;
        action1 = setInterval(xBarMovement,30);
    }
}

function yHandler(){ 
    if(isYPause==false){
        isYPause = true;
    } else {
        isYPause = false;
        action2 = setInterval(yBarMovement,30);
    }
}
function shootHandler(){
    ctx.beginPath();
    ctx.arc(xBarOffset,yBarOffset,5,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    let player1Total = 0;
    let player2Total = 0;
    let score = -1;
    let distanceXY = Math.sqrt(xBarOffset*xBarOffset + yBarOffset*yBarOffset);
    if (distanceXY >=0 && distanceXY <20){
        score = 100;
    }else if(distanceXY >= 20 && distanceXY < 40){
        score = 90;
    }else if(distanceXY >= 40 && distanceXY < 60){
        score = 80;
    }else if(distanceXY >= 60 && distanceXY < 80){
        score = 70;
    }else if(distanceXY >= 40 && distanceXY < 60){
        score = 60;
    }else if(distanceXY >= 60 && distanceXY < 80){
        score = 50;
    }else if(distanceXY >= 80 && distanceXY < 100){
        score = 40;
    }else if(distanceXY >= 100  && distanceXY < 120){
        score = 30;
    }else if(distanceXY >= 120  && distanceXY < 140){
        score = 20;
    }else if(distanceXY >= 140  && distanceXY < 160){
        score = 10;
    }else{
        score = 0 ;
    }
    if(playerN == 1 && scoreBoard1.length < 5){
        scoreBoard1.push(score);
    } else if (playerN == 2 && scoreBoard2.length < 5){
        scoreBoard2.push(score);
    }
    let text = "Your shots:";
    text += "<ol>Player 1:";
    for (let i = 0; i < scoreBoard1.length;i++){
        text += "<li>" + scoreBoard1[i] + "</li>";
    }
    text += "</ol>";
    text += "<ol>Player 2:";
    for (let i = 0; i < scoreBoard2.length;i++){
        text += "<li>" + scoreBoard2[i] + "</li>";
    }
    text += "</ol>";
    
    if(scoreBoard1.length ==5 && scoreBoard2.length==5){
       
        for (let i = 0; i < scoreBoard1.length;i++){
        player1Total += scoreBoard1[i];
        }
        for (let i = 0; i < scoreBoard2.length;i++){
        player2Total += scoreBoard2[i];
        }
        if( player1Total > player2Total){
            text += "Player 1 wins!";
        }else if(player1Total < player2Total){
            text += "Player 2 wins!";
        }
    }
    document.getElementById("scoreBoard").innerHTML = text;
    
    
}