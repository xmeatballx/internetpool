let cueBall;
let mouseRelease=0;
let Balls = [15];

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


	for (var i = 0; i < 15; i++) {
		Balls[i].cueCollisions();
		Balls[i].update();
		Balls[i].display();
		Balls[i].bounds();
		//collision();
		//let val = [];
		//val = storeVals();
		//Balls[i].selfCollisions(val[1],val[2],val[3],val[4]);	
	}
}

function collision(){
	for (var i = 0; i <15; i++) {
		for (var j = 0; j < 15; j++) {
			let loc1 = Balls[i].returnLoc();
	  		let loc2 = Balls[j].returnLoc();
	  		let vel1 = Balls[i].returnVel();
	  		let vel2 = Balls[j].returnVel();
	  		storeVals(loc1,loc2,vel1,vel2);	
		}
	}
}

function storeVals(loc1,loc2,vel1,vel2){
	let vals = [loc1,loc2,vel1,vel2];
	return vals;
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

class cue {
	constructor(){
		this.location = createVector(200,400);
		this.velocity = createVector(0,0);
		this.acceleration = createVector(0,0);
		this.force = createVector(0,0);
		this.lineEnd = createVector(0,0);
		this.mass=.5;
		this.forceCreated = false;
		this.friction=1.01;
		this.scratch=false;
	}

	mouse(){
		if (mouseIsPressed){
			this.lineEnd = createVector(mouseX,mouseY);
			push();
			line (this.location.x,this.location.y, this.lineEnd.x,this.lineEnd.y);
			pop();
		} else if (mouseRelease>0) {
			background(0,100,0);
			this.force = p5.Vector.sub(this.location,this.lineEnd);
			//this.force.normalize();
			this.force.mult(.03);
			this.forceCreated=true;
			mouseRelease = 0;
		}
	}

	applyForce(){
		if (this.forceCreated==true){
		this.f = p5.Vector.div(this.force,this.mass);
		this.acceleration.add(this.f);
		this.forceCreated=false;
	}
	}

	bounds(){
		if (this.location.x>width){
			this.velocity.x*=-1;
			this.location.x = width;
		} else if (this.location.x<0){
			this.velocity.x*=-1;
			this.location.x = 0;
		}

		if (this.location.y>height){
			this.velocity.y*=-1;
			this.location.y=height;
		} else if (this.location.y<0){
			this.velocity.y*=-1;
			this.location.y = 0;
		}

		 if (this.location.dist(createVector(0,0))<10 || this.location.dist(createVector(0,height/2))<10  || this.location.dist(createVector(width,0))<10 || this.location.dist(createVector(width,height))<10 ||this.location.dist(createVector(width,height/2))<10 || this.location.dist(createVector(0,height))<10 ){
 		this.scratch=true;
 	}
	}

	update(){
		this.velocity.add(this.acceleration);
		this.velocity.div(this.friction);
		this.location.add(this.velocity);
		this.acceleration.mult(0);	
	}

	display(){
		push();
		fill(255);
		stroke(0);
		if (this.scratch==true){
			this.velocity.mult(0);
			noFill();
			noStroke();
			push();
			fill(255);
			text("scratch",200,400);
			pop();
			if (frameCount%200==100){
				this.location.set(200,400);
				this.scratch=false;
			}
		}
		ellipse(this.location.x,this.location.y,25);
		pop();
	}
}

class Ball{
	constructor(){
		this.location2 = createVector(random(width),random(height));
		this.location3 = createVector(0,0);
		this.velocity2 = createVector(0,0);
		this.acceleration2 = createVector(0,0);
		this.ang = createVector(0,0);
		this.forca;
		this.forcas;
		this.madeIt;
		this.ang2;
	}

	cueCollisions(){
		if (cueBall.location.dist(this.location2)<26){
			//this.location2.add(25);
			this.ang.x = cueBall.location.angleBetween(this.location2);
			this.ang.y = cueBall.location.angleBetween(this.location2);
			this.ang.normalize()
			this.forca = p5.Vector.sub(cueBall.velocity,this.ang);
			this.velocity2.add(this.forca);
			cueBall.velocity.sub(this.forca.mult(.8));
		}	
	}

	selfCollisions(loc1,loc2,vel1,vel2){
		if (loc1.dist(loc2)<25){
			this.ang2 = loc1.angleBetween(loc2);
			this.ang.normalize();
			this.forcas = p5.Vector.sub(vel1,this.ang);
			vel2.add(this.forcas);
			vel1.sub(this.forcas.mult(.08));
		}	
	}

	update(){
		this.velocity2.div(1.01);
		this.location2.add(this.velocity2);
	}

	bounds(){
		if (this.location2.x>width){
			this.velocity2.x*=-1;
			this.location2.x = width;
		} else if (this.location2.x<0){
			this.velocity2.x*=-1;
			this.location2.x = 0;
		}

		if (this.location2.y>height){
			this.velocity2.y*=-1;
			this.location2.y=height;
		} else if (this.location2.y<0){
			this.velocity2.y*=-1;
			this.location2.y = 0;
		}

		 if (this.location2.dist(createVector(0,0))<10 || this.location2.dist(createVector(0,height/2))<10  || 
		 	 this.location2.dist(createVector(width,0))<10 || this.location2.dist(createVector(width,height))<10 ||
		 	 this.location2.dist(createVector(width,height/2))<10 || this.location2.dist(createVector(0,height))<10 ){
 			this.madeIt=true;
 	}
	}

	display(){
		push();
		fill(0);
		stroke(255);
		if (this.madeIt==true){
			this.velocity2.mult(0);
			noFill();
			noStroke();
			}
		ellipse(this.location2.x,this.location2.y,25);
		pop();
	}

	returnLoc(){
	 	return this.location2;
	}

	returnVel(){
		return this.velocity2;
	}

}