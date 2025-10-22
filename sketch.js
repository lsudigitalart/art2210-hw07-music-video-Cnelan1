let song, amp, fft, slider;
let volHistory = [];
let playButton;



function preload() {
  song = loadSound("JSSR.mp3");
}

function setup() {
  createCanvas(400, 400); 
  angleMode(DEGREES);
  colorMode(HSB);
 


  slider = createSlider(0, 1, 0.5, 0.01);
  

  playButton = createButton('Play');
  playButton.mousePressed(togglePlay);

  amp = new p5.Amplitude();
  fft = new p5.FFT();
 
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
    playButton.html('Play');
  } else {
    song.loop();
    playButton.html('Pause');
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  song.setVolume(slider.value());

  let vol = amp.getLevel();
  volHistory.push(vol);
  if (volHistory.length > 360) volHistory.shift();

  fft.analyze();

  let mid = fft.getEnergy("mid");
  let bass= fft.getEnergy("bass");
  let treble = fft.getEnergy("treble")

  
  let midColor = map(mid, 0, 255, 0, 360);
  let bassColor = map(bass,0,255,0,360);
  let trebleColor = map(treble,0,225,0,360);
 


//bass color radial graph
stroke(bassColor,255,255)
strokeCap(ROUND);
fill(bassColor,255,255);
beginShape();
  for (let i = 0; i < volHistory.length; i++) {
    let r = map(volHistory[i], 0, 1, 100, 300);
    let x = r * cos(i);
    let y = -r * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);
    

  //mid color radial graph
  stroke(midColor, 255, 255);
  strokeCap(SQUARE)
  fill(midColor, 255, 255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < volHistory.length; i++) {
    let r = map(volHistory[i], 0, 1, 50, 300);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);
  
  //treble color radial graph
  stroke(trebleColor,255,255);
  strokeCap(PROJECT)
  fill(trebleColor,255,255);
  beginShape();
  for (let i = 0; i < volHistory.length; i++) {
    let r = map(volHistory[i], 0, 1, 2, 300);
    let x = -r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);
  
  stroke('black')
  fill('black')
  ellipse(0,0,30);

  
}




