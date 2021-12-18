/* https://openprocessing.org/sketch/1385289 */

let sound;
let fft;
let bandWidth;
let amp;
let levels = [];
//palette #1
let palette = ['#f5624D', '#cc231E', '#34A65F',' #0f8A5F', '#235E6F'];

function preload(){
	sound = loadSound('Narnia.mp3');
	
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	amp = new p5.Amplitude();
	amp.setInput(sound);
	fft = new p5.FFT();
	bandWidth = width/256;

}

function draw() {
	angleMode(DEGREES);
	background(0);

	let wave = fft.waveform();
	var s = fft.analyze();
	level = amp.getLevel();
	let xScale = width/wave.length;



	for(let r=0; r < s.length; r++){
		let col = color(palette[r%palette.length]);
		stroke(col);
		fill(r,100,255);
      
		//rectangle waveforms
		let amplitude = s[r];
		let xx = map(amplitude, 0,s.length,height,0);
		
		//point waveforms
		strokeWeight(2);
		 let a =map(r,0,wave.length,0,width);
		 let b = wave[r]*100 + height-150;
		let b2 = wave[r]*100 + height-250;
		 let b3 = wave[r]*100 + height-350;
		 let b4 = wave[r]*100 + height-450;
		let b5 = wave[r]*100 + height-550;
	
		point(a,b);
		point(a,b2);
		point(a,b3);
		point(a,b4);
		point(a,b5);
		
		//rect on top of waveforms
      
      
	
//		stroke(col);
//		fill(r,100,255);
//      
//		strokeWeight(1);
//		rect(r*bandWidth,xx,bandWidth,xx);
//		
		
	}
	
    }
}

	

//user function, when mouse is click sound will start
function mouseClicked(){
	if(sound.isPlaying()){
		sound.pause();
	}
	else {
		sound.play();
	}
}