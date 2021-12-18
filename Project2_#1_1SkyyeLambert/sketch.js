/*Song Reference: 
"A Narnia Lullaby" - The Chronicles of Narnia: The Lion, The Witch and The Wadrobe, composed by Harry Gregson-Williams */

/* 
Code Reference: 
Load song: https://www.youtube.com/watch?v=Pn1g1wjxl_0
Colour fade: https://discourse.processing.org/t/fade-between-random-colours-for-a-background/1433/4
*/

/* Image Source: https://www.subpng.com/png-im4f9y/ 

Image Source: https://www.subpng.com/png-0svsjs/download.html */

var song;
var button;
var col;
var img;


function preload(){
  song = loadSound("Narnia.mp3");

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  song.play();
  
  let col = color(0,0,0);

  button = createButton("P l a y");
  button.mousePressed(togglePlaying);
  button.style('background-color', col);
  button.style('font-size', '50px');
  button.style('color', '#fffdd0');
  button.style('font', 'Gerogia');
  button.position(600,400);
  
  
 beginColor = color(255,255,255);
  newColor = color(random(255),random(255),random(255));
  amt = 0;

  background(beginColor);
  
  img = loadImage('lion.png');
}

function draw() {
 background(lerpColor(beginColor, newColor, amt));
image(img, 300, 100)
  amt += 0.01;
  if(amt >= 1){
    amt = 0.0;
    beginColor = newColor;
    newColor = color(random(255),random(255),random(255));
}
  
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html("P a u s e");
  } else {
    song.pause();
    button.html("P l a y");
  }

}