var player;
var obstacle;
var score = 0;

function startGame() {  
    player = new component(20, 20, "blue", 20, 120);
    obstacle = new component(30,270,"red",480,80);
    obstacle.speedX = 5;
    myGameArea.start();
}  
  
var  myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }    
}

function moveObstacle(){
    obstacle.x -= obstacle.speedX;
    if(obstacle.x < -30){
        obstacle.x = 480;
        obstacle.y = -obstacle.y;
        score +=1;
        updateObstacleSpeed()
    }
}

function updateObstacleSpeed(){
    if(score == 5){
        obstacle.speedX +=1;
    }
    if(score == 10){
        obstacle.speedX +=1;
    }
    if(score == 15){
        obstacle.speedX +=1;
    }
    if(score > 20){
        obstacle.speedX +=1;
    }
}

function updateScore(){
    document.getElementById('score').innerHTML = 'Score :'+ score;
}

function updateGameArea() {
    myGameArea.clear();
    stopGame();
    moveObstacle();
    updateScore();
    obstacle.update();
    player.newPos();  
    player.update();  
}  

function stopGame(){
    if(player.y > 250){
        clearInterval(myGameArea.interval);
    }
    if(player.y < 0){
        clearInterval(myGameArea.interval);
    }
    if((player.y + player.height) < obstacle.y || player.y > (obstacle.y+obstacle.height) || (player.x +player.width) < obstacle.x || player.x > (obstacle.x + obstacle.width)){

    }else{
        clearInterval(myGameArea.interval);
    }
}

function moveup() {  
    player.speedY -= 1;   
}  
  
function movedown() {  
    player.speedY += 1;   
}  

function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 38: //Up arrow key
            moveup();
            break;
        case 40: //down arrow key
            movedown();
            break;
    }
}