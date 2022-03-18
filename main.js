song1="";
song2="";
songstatus="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    
    video=createCapture(VIDEO)
    video.hide()
    
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}
    function draw(){
        if(scoreRightWrist>0.2){
            circle(rightWristX, rightWristY, 20);
    
            if(rightWristY>0 && rightWristY<=100){
                document.getElementById("speed").innerHTML="Speed=0.5x";
                song.rate(0.5);
            }
         else if(rightWristY>100 && rightWristY<=200){
                document.getElementById("speed").innerHTML="Speed=1x";
                song.rate(1);
            }
            else if(rightWristY>200 && rightWristY<=300){
                document.getElementById("speed").innerHTML="Speed=1.5x";
                song.rate(1.5);
            }
            else if(rightWristY>300 && rightWristY<=400){
                document.getElementById("speed").innerHTML="Speed=2x";
                song.rate(2);
            }
            else if(rightWristY>400 && rightWristY<=500){
                document.getElementById("speed").innerHTML="Speed=2.5x";
                song.rate(2.5);
            }
        }
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        leftWristY_divide_1000=remove_decimals/1000;
        volume=leftWristY_divide_1000*2;
        document.getElementById("volume").innerHTML= "Volume="+volume;
        song.setVolume(volume);
    }
    }

    function modelLoaded(){
        console.log('PoseNet Is Initialized');
    }
    function gotPoses(results){
        if(results.length>0){
            console.log(results);
            scoreLeftWrist=results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist="+scoreLeftWrist);
            
            leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
        }
    }
    function play(){
        song1.play();
        song2.play();
    }