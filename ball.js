class Ball{
	constructor(){
		this.location2=createVector(random(width),random(height));
		this.velocity2 = createVector(0,0);
		this.ang = createVector(0,0);
		this.forca;
		this.forcas;
		this.newForce;
		this.madeIt=false;
		this.ang2 = createVector(0,0);
		this.size = 25;
	}

	make(){
		if (this.madeIt==true){
			return true;
		} else {
			return false;
		}
	}

	break(){
		if (cueBall.location.dist(this.location2)<26){
			return true;
		} else {
			return false;
		}
	}

	rackBalls(i){
		let centerX = width/2;
		if(i==0){
			this.location2 = createVector(centerX-14,200);
		}
		if (i>0 && i<3){
			this.location2.set(createVector((centerX-this.size*1.5)+(27*i)-16,200-this.size-2));
		}
		if (i>2 && i<6){
			this.location2.set(createVector((centerX-this.size*4)+(27*i)-20,200-this.size*2-4));
		}
		if (i>5 && i<10){
			this.location2.set(createVector((centerX-this.size*7.5)+(27*i)-22,200-this.size*3-6));
		}
		if (i>9 && i<15){
			this.location2.set(createVector((centerX-this.size*12)+(27*i)-30,200-this.size*4-8));
		}
	}

	cueCollisions(){
			this.ang.x = cueBall.location.x-this.location2.x;
			this.ang.y = cueBall.location.y-this.location2.y;
			this.ang.normalize()
			this.forca = p5.Vector.sub(cueBall.velocity,this.ang);
			this.velocity2.add(this.forca);
			cueBall.velocity.sub(this.forca);
	}

	selfCollisions(loc1,loc2,vel1,vel2,factor){
		let factored = p5.Vector.mult(this.velocity2,createVector(-1,-1));
		this.ang2.x = (loc1.x-loc2.x);
		this.ang2.y = (loc1.y-loc2.y);
		this.ang2.normalize();
		this.forcas = p5.Vector.sub(factored,this.ang2);
		this.forcas.normalize();
		vel1.sub(this.forcas.mult(.9));
		this.forcas.mult(0);
	}

	update(){
		this.velocity2.div(1.03);
		this.location2.add(this.velocity2);
	}

	bounds(){
		if (this.location2.x>width-25){
			this.velocity2.x*=-1;
			this.location2.x = width-25;
		} else if (this.location2.x<0){
			this.velocity2.x*=-1;
			this.location2.x = 0;
		}

		if (this.location2.y>height-25){
			this.velocity2.y*=-1;
			this.location2.y=height-25;
		} else if (this.location2.y<0){
			this.velocity2.y*=-1;
			this.location2.y =-0;
		}

		if (this.location2.dist(createVector(0,0))<30 || this.location2.dist(createVector(0,height/2))<30 || 
		 	 this.location2.dist(createVector(width,0))<30|| this.location2.dist(createVector(width,height))<40||
		 	 this.location2.dist(createVector(width,height/2))<30 || this.location2.dist(createVector(0,height))<30){
 			this.madeIt=true;

 	}
	}

	display(img){
		push();
		fill(0);
		stroke(255);
		if (this.madeIt==true){
			this.velocity2.mult(0);
			noFill();
			noStroke();
			}
		//line(this.location2.x,this.location2.y,this.location2.x-this.velocity2.x,this.location2.y-this.velocity2.y);
		image(img,this.location2.x,this.location2.y,25,25);
		pop();
	}

	returnLoc(){
	 	return this.location2;
	}

	returnVel(){
		return this.velocity2;
	}
}