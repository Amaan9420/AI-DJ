song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_right = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", got_poses);
}

function draw() {
    image(video, 0, 0, 600, 600);
    fill("red");
    stroke("blue");
    if (score_left > 0.2) {


        if (leftWristY > 0 && leftWristY <= 120) {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
            console.log(" Speed 0.5");
        }
        if (leftWristY > 120 && leftWristY <= 240) {
            document.getElementById("speed").innerHTML = "speed = 1.0x";
            song.rate(1.0);
            console.log(" Speed 1.0");
        }
        if (leftWristY > 240 && leftWristY <= 360) {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
            console.log(" Speed 1.5");
        }
        if (leftWristY > 360 && leftWristY <= 480) {
            document.getElementById("speed").innerHTML = "speed = 2.0x";
            song.rate(2.0);
            console.log(" Speed 2.0");
        }
        if (leftWristY > 480 && leftWristY <= 600) {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
            console.log(" Speed 2.5");
        }
    }
    if (score_right > 0.2) {
        circle(rightWristX, rightWristY, 40);
        inNumber = Number(rightWristY);
        removeDecimals = Math.floor(inNumber);
        volume = removeDecimals / 600;
        document.getElementById("volume").innerHTML = "Volume =" + volume.toFixed("3");
        song.setVolume(volume);
    }
}

function start() {
    song.play();
    song.setVolume(0.6);
    song.rate(1.0);
}

function pause() {
    song.pause();
}

function stop() {
    song.stop();
}

function modelLoaded() {
    console.log("Model is Loaded");
}

function got_poses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_right = results[0].pose.keypoints[10].score;
        score_left = results[0].pose.keypoints[9].score;
        console.log(score_right);
    }
}