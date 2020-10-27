var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
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
             
        pipe[i].x -=3;
        // pipe[i].x--;   
        // pipe[i].x--;    
  
              
        if( pipe[i].x == 125 ){   
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });     
        }
        if(pipe[i].x == 5){    
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
    
    requestAnimationFrame(draw);
    
}

draw();
























