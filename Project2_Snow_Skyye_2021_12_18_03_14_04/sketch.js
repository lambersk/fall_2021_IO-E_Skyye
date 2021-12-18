// Original Code Adapted from:
// Daniel Shiffman
// http://codingtra.in

var snow = [];
var poses = [];
var flakes;
var gravity;
var posenet;


function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.3);
  
  flake = loadImage('snow.png');

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    snow.push(new Snowflake(x, y));
  }
  
   video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function draw() {
  background(0);

  for (flake of snow) {
    flake.applyForce(gravity);
    flake.update();
    flake.render();
  }
  
   snowFall();
  
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function snowFall() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {

      //Left Wrist
      let leftWrist = poses[i].pose.keypoints[9];
      if (leftWrist.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
        flakes.size(50, 50);
        flakes.position(leftWrist.position.x, leftWrist.position.y, 10, 10, 10, 10);
        pop();
      }
    }
  }
}
function getRandomSize() {

  let r = pow(random(0, 1), 3);
  return constrain(r * 32, 2, 32);

}


class Snowflake {

  constructor(sx, sy) {
    let x = sx;
    let y = sy;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.angle = random(TWO_PI);
    this.dir = (random(1) > 0.5) ? 1 : -1;
    this.xOff = 0;
    this.r = getRandomSize();
  }

  applyForce(force) {
    // Parallax Effect hack
    let f = force.copy();
    f.mult(this.r);

    this.acc.add(f);
  }

  randomize() {
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }

  update() {

    this.xOff = sin(this.angle * 2) * 2 * this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y > height + this.r) {
      this.randomize();
    }

    // Wrapping Left and Right
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }

    this.angle += this.dir * this.vel.mag() / 200;
  }

  render() {
    push();
    translate(this.pos.x + this.xOff, this.pos.y);
		ellipse(this.pos.x, this.pos.y, this.r, this.r)
    pop();
  }

}

