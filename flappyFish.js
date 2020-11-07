var cvs = document.getElementById("canvas");


var ctx = cvs.getContext("2d"); 

var ups = document.getElementById("button-up");
var downs = document.getElementById("button-down");
var lefts = document.getElementById("button-left");
var rights = document.getElementById("button-right");
var gradient = ctx.createRadialGradient(105, 105, 20, 120, 120, 50);
//
// const webcamElement = document.getElementById('webcam');
// const canvasElement = document.getElementById('canvas');
// const snapSoundElement = document.getElementById('snapSound');
// const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
  
// webcam.start()   
//   .then(result =>{ 
//     console.log("webcam started");
//   })  
//   .catch(err => {
//     console.log(err);     
// });     
 // load images      
  
var bird = new Image();  
var bg = new Image();  
var fg = new Image();    
var pipeNorth = new Image();
var pipeSouth = new Image();  
          // just to test!
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// variables

var gap = 155;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0.1;
     
var score = 0; 
    
// audio files 
      
var fly = new Audio();    
var scor = new Audio();  

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";    

document.onkeydown = function(e) {
    switch (e.keyCode) {
//left
        case 37:
            bX -= 25;
            fly.play();
            break;
        case 65:
            bX -= 25;
            fly.play();
            break;

//upsss
        case 38:
            bY -= 25;
            fly.play();
            break;
        case 87:
            bY -= 25;
            fly.play();
            break;
//right
        case 39:
            bX += 25;   
            fly.play();
            break;
        case 68:
            bX += 25;
            fly.play();
            break;
//down
        case 83:
            bY += 25;
            fly.play();
            break;
        case 40:
            bY += 25;
            fly.play();
            break;
    }
};
ups.addEventListener("click", function(){  bY -= 25;
    fly.play(); });
downs.addEventListener("click", function(){  bY += 25;
    fly.play(); });
lefts.addEventListener("click", function(){  bX -= 25;
    fly.play(); });
rights.addEventListener("click", function(){  bX += 25;
    fly.play(); });
// pipe coordinates
 
var pipe = [];   

pipe[0] = {    
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
      
     
    for(var i = 0; i < pipe.length; i++){
          
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             let position = pipe[i].x
        if (score < 3){
            pipe[i].x -=3;
        }
       
        if (score >= 3){
           
            pipe[i].x -=5;
        }
        // if (score >= 10){
        //     pipe[i].x -=6;
        // }
        // pipe[i].x--;   
        // pipe[i].x--;    
  
              
        if( pipe[i].x > 150&& pipe[i].x <156){   
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });     
        }
        if(pipe[i].x < 8 && pipe[i].x >3){    
            score++;      
            scor.play();
        }
        // detect collision
   
        if( bX + bird.width >= pipe[i].x && 
            bX <= pipe[i].x + pipeNorth.width && 
            (bY <= pipe[i].y + pipeNorth.height || 
                bY+bird.height >= pipe[i].y+constant) )
                 {
              
           // location.reload(); // reload the page
           bX = 10;
           bY = 150;
           pipe = [];

            pipe[0] = {
                x : cvs.width,
                y : 0
            };
            score = 0;
        }
        
        // if(pipe[i].x == 5){
        //     score++;
        //     scor.play();
        // }
        
        
    }
    

    ctx.drawImage(fg,0,cvs.height - fg.height+60,0,0);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-10);
    
    
    gradient.addColorStop(0, 'rgba(250,250,255,0)');
    gradient.addColorStop(0.75, 'rgba(230,250,255,1.0)');
    gradient.addColorStop(1, 'rgba(0,0,255,0)');

// draw the gradient (note that we dont bother drawing a circle, this is more efficient and less work!)
// but make sure it covers the entire gradient
    ctx.fillStyle = gradient;
    // ctx.fillRect(0, 0, 300, 300);​



    requestAnimationFrame(draw);
    
}

draw();
























