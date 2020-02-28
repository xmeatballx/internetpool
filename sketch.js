let cueBall;
let mouseRelease=0;
let Balls = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function setup(){
	createCanvas(400,500);
	background(0,100,0);
	cueBall = new cue;
	for (var i = 0; i < 15; i++) {
	 Balls[i] = new Ball;
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

	for (var i = 0; i < Balls.length; i++) {
		for (var j = 0; j < Balls.length; j++) {
			// 		if (frameCount<10){
		 // 	Balls[i].rackBalls(i);
		 // }
			let d = Balls[i].returnLoc().dist(Balls[j].returnLoc());
	  		if (d<26 && i != j){
	  			let loc1 = Balls[i].returnLoc();
	  			let loc2 = Balls[j].returnLoc();
	  			let vel1 = Balls[i].returnVel();
	  			let vel2 = Balls[j].returnVel();
	  			Balls[j].selfCollisions(loc1,loc2,vel1,vel2,-.92);
	  			Balls[i].selfCollisions(loc1,loc2,vel1,vel2,-.92);
	  		}	
	    }
		Balls[i].cueCollisions();
		Balls[i].update();
		Balls[i].display();
		Balls[i].bounds();
		if (Balls[i].make()){
			Balls.splice(i,1);
		}
	}
}

function mouseDragged(){
	background(0,100,0);
}

function mouseReleased(){
mouseRelease = 1;
}

function drawPockets(){
	push();
	fill(0);
	ellipse(0,0,30);
	ellipse(0,height/2,30);
	ellipse(width,0,30);
	ellipse(width,height,30);
	ellipse(width,height/2,30);
	ellipse(0,height,40);
	pop();
}



