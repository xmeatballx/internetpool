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
		this.break=false;
	}

	mouse(){
		if (mouseIsPressed){
			this.lineEnd = createVector(mouseX,mouseY);
			push();
			line (this.location.x,this.location.y, this.lineEnd.x,this.lineEnd.y);
			pop();
		} else if (mouseRelease>0) {
			background(0,100,0);
			this.break = true;
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
			displayWords(0);
			if (frameCount%200==100){
				this.location.set(200,400);
				this.scratch=false;
			}
		}
		ellipse(this.location.x,this.location.y,25);
		pop();
	}
}