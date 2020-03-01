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

function setup(){
	createCanvas(400,500);
	background(0,100,0);
	cueBall = new cue;
	for (var i = 0; i < 15; i++) {
	 Balls[i] = new Ball;
	 img[i] = loadImage(ballImages[i]); 
	}

}

function draw(){
	background(0,100,0);
	cueBall.mouse();
	cueBall.update();
	cueBall.display();
	cueBall.bounds();
	drawPockets();
	cueBall.applyForce();
	runBalls();
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
	ellipse(0,0,30);
	ellipse(0,height/2,30);
	ellipse(width,0,30);
	ellipse(width-5,height-5,30);
	ellipse(width,height/2,30);
	ellipse(0,height,40);
	pop();
}

function runBalls(){
	
	for (var i = 0; i < Balls.length; i++) {
		if (Balls[i].make()!=true){
			Balls[i].cueCollisions();
			for (var j = 0; j < Balls.length; j++) {
				let d = Balls[i].returnLoc().dist(Balls[j].returnLoc());
	  			if (d<26 && i != j){
	  				let loc1 = Balls[i].returnLoc();
	  				let loc2 = Balls[j].returnLoc();
	  				let vel1 = Balls[i].returnVel();
	  				let vel2 = Balls[j].returnVel();
	  				if (broke==true){
	  					Balls[j].selfCollisions(loc1,loc2,vel1,vel2,1);
	  					Balls[i].selfCollisions(loc1,loc2,vel1,vel2,-.5);
	  				}
	  			}	
	    	}
			Balls[i].update();
			if (frameCount<10){
				Balls[i].rackBalls(i);
			}
			Balls[i].display(img[i]);
			Balls[i].bounds();
		} else {
			Balls.splice(i,1);
			img.splice(i,1);

		}
	}
}


