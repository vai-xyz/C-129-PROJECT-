music_1="";
music_2= "";
LeftWristX="";
LeftWristY="";
RightWristX="";
RightWristY="";
scoreleftWrist=0;
scoreRightWrist=0;
Status_song1="";

function preload(){
   music_1= loadSound("music.mp3");
    music_2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.position(500,300);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is intialized");
}
function draw(){
    image(video,0,0,500,400);
    Status_song1=music_1.isPlaying();
    fill("#FF0000");
        stroke("#FF0000");
    if(scoreleftWrist>0.2){
        circle(LeftWristX,LeftWristY,20);
        music_2.stop();
        if(Status_song1==false){
            music_1.play();
            document.getElementById("song_name").innerHTML="Harry Potter Theme Song";
        }
    }
    
}

function gotPoses(results){
    if(results.length >0){
        console.log(results);
        RightWristX=results[0].pose.rightWrist.x;
        RightWristY=results[0].pose.rightWrist.y;
        console.log("RightWristX="+RightWristX+"RightWirstY="+RightWristY);
         scoreleftWrist=results[0].pose.keypoints[9].score;
         console.log("scoreleftwrist= "+scoreleftWrist);
        LeftWristX=results[0].pose.leftWrist.x;
        LeftWristY=results[0].pose.leftWrist.y;
        console.log("LeftWristX="+LeftWristX+"LeftWristY= "+LeftWristY);
        }
}