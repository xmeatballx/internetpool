let cueBall;
let mouseRelease=0;
let Balls = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let ballImages = ['data/1.png',"data/9.png","data/2.png",
"data/10.png","data/8.png","data/3.png",
"data/4.png","data/12.png","data/6.png",
"data/13.png","data/5.png","data/14.png",
"data/15.png","data/7.png","data/11.png"];
let img = [];
let broke = false;
let myFont;

function setup(){
	createCanvas(400,500,WEBGL);
	initWords();
	ortho();
	background(0,100,0);
	cueBall = new cue;
	for (var i = 0; i < 15; i++) {
		Balls[i] = new Ball;
		img[i] = loadImage(ballImages[i]); 
	}
	myFont = loadFont("data/georgiab.ttf");
	textFont(myFont);

}

function draw(){
	push();
	translate(-width/2,-height/2);
	background(0,100,0);
	cueBall.mouse();
	cueBall.update();
	cueBall.display();
	cueBall.bounds();
	drawPockets();
	cueBall.applyForce();
	runBalls();
	pop();
}

function mouseDragged(){
	background(0,100,0);
}

function mouseReleased(){
	broke = true;
mouseRelease = 1;
}

function drawPockets(){
	push();
	fill(0);
	ellipse(0,0,40);
	ellipse(0,height/2,30);
	ellipse(width,0,40);
	ellipse(width,height,40);
	ellipse(width,height/2,30);
	ellipse(0,height,40);
	pop();
}

function runBalls(){
	
	for (var i = 0; i < Balls.length; i++) {
		if (cueBall.location.dist(Balls[i].returnLoc())<26){
					Balls[i].cueCollisions();
				}
		if (Balls[i].make()!=true){
			for (var j = 0; j < Balls.length; j++) {
				let d = Balls[i].returnLoc().dist(Balls[j].returnLoc());
	  			if (d<26){
	  				let loc1 = Balls[i].returnLoc();
	  				let loc2 = Balls[j].returnLoc();
	  				let vel1 = Balls[i].returnVel();
	  				let vel2 = Balls[j].returnVel();
	  				if (broke==true && i!=j){
	  					Balls[i].selfCollisions(loc1,loc2,vel1,vel2,-1);
	  					Balls[j].selfCollisions(loc1,loc2,vel1,vel2,1);
	  				}
	  			}	
	    	}
			if (frameCount<10){
				Balls[i].rackBalls(i);
			}
			Balls[i].update();
			Balls[i].display(img[i]);
			Balls[i].bounds();
		} else if (Balls.length>1){
				displayWords(1);
			if (frameCount%200==100){
			Balls.splice(i,1);
			img.splice(i,1);
			}
		} else {
			displayWords(3);
			for (var l = 0; l < 15; l++) {
				Balls[l] = new Ball;
				img[l] = loadImage(ballImages[l]); 
				Balls[l].rackBalls(l);
			}
			cueBall.location.set(200,400);
		}
	}
}

function initWords(){
	scratch = createWord3D(
  "SCRATCH!",       // The actual character that you want to draw (anything that can be passed into "text()")
  20,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  1,         // The size of a unit "box()" making up part of the letter  
  50,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
	niceshot = createWord3D(
  "NICE SHOT!",       // The actual character that you want to draw (anything that can be passed into "text()")
  20,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  1,         // The size of a unit "box()" making up part of the letter  
  50,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
	youlose = createWord3D(
  "YOU LOSE!",       // The actual character that you want to draw (anything that can be passed into "text()")
  20,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  1,         // The size of a unit "box()" making up part of the letter  
  50,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
	youwin = createWord3D(
  "YOU WIN!",       // The actual character that you want to draw (anything that can be passed into "text()")
  20,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  1,         // The size of a unit "box()" making up part of the letter  
  50,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
}

function displayWords(c){
		if (c==0){
			push();
			translate(width/2,height/2);
			rotateX(.1);
			rotateY(.06);
			scratch.show();
			pop();
		}
		if (c==1){
			push();
			translate(width/2,height/2);
			rotateX(.1);
			rotateY(.06);
			niceshot.show();
			pop();
		}
		if (c==2){
			push();
			translate(width/2,height/2);
			rotateX(.1);
			rotateY(.06);
			youlose.show();
			pop();
		}
		if (c==3){
			push();
			translate(width/2,height/2);
			rotateX(.1);
			rotateY(.06);
			youwin.show();
			pop();
		}
}