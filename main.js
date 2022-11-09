song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
rightWristX = 0
leftWristX = 0
rightWristY = 0
rightWristX = 0
scoreleftWrist = 0;
scorerightWrist = 0;



function preload() {
    song1 = loadSound("Humpty_Dumpty.mp3");
    song2 = loadSound("Wheels_on_the_bus.mp3");
}
function setup() {
    canvas = createCanvas(600,600);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);


}
function modelLoaded() {
    console.log("Project is Intialized");

}
function gotPoses(results) {

    
if(results.length >0) {
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftWrist = " + scoreleftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    scorerightWrist = results[0].pose.keypoints[10].score;
    console.log("scorerightWrist = " + scorerightWrist);
}



}

function draw() {
    image(video,0,0,600,600);

    fill("red");
    stroke("green");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreleftWrist > 0.1) {
        circle(leftWristX, leftWristY,40);
        song1.stop();
        if(song2_status == false) {
        song2.play();
        document.getElementById("song_name").innerHTML = "Playing song now";

        }
    }
    if(scorerightWrist > 0.1) {
        circle(rightWristX, rightWristY,40);
        song2.stop();
        if(song1_status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing song 2 now";
        }
    }

}





