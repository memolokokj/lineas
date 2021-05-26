let p1 = {};
let p2 = {};
let p3 = {};
let p4 = {};
let p5 = {};
let p6 = {};
let p7 = {};
let p8 = {};

function setup(){
	createCanvas(windowWidth, windowHeight);
	
	
	p1 = {x:0, y:0};
	p2 = {x:300, y:300};
	p3 = {x:0, y:300/2};
	p4 = {x:300, y:300/2};
	p5 = {x:0, y:300};
	p6 = {x:300, y:0};
	p7 = {x:300/2, y:0};
	p8 = {x:300/2, y:300};
}

function draw(){
	stroke("black");

	//ecuPP
	rect(0, 0, 300, 300);
	ecuPP(p1,p2);
	ecuPP(p3,p4);
	ecuPP(p5,p6);
	ecuPP(p8,p7);

	//dda
	rect(500, 0, 300, 300)
	dda(500, 0, 500+300, 300);
	dda(500, 150, 500+300, 150);
	dda(500+300, 0,500, 300);
	dda(500+150, 0, 500+150, 300);

	//bresenham
	rect(1000, 0, 300, 300)
	bresenham(1000, 0, 1000+300, 300);
	bresenham(1000, 150, 1000+300, 150);
	bresenham(1000, 300,1000+300, 0);
	bresenham(1000+150, 0, 1000+150, 300);

	rect(0, 400, 300, 300);
	circle(150, 400+150, 300);

	rect(500, 400, 300, 300);
	ovalo(500+150, 400+150, 150, 50);
}

function ecuPP(p1, p2){
	let dx = p2.x - p1.x;
	let dy = p2.y - p1.y;
	let stepX = 1;
	let stepY = 1;

	if(dx == 0){
		if(dy < 0){
			stepY = -stepY;
		}
		let x = p1.x;
		let y = p1.y;

		while(y != p2.y){
			point(x, y);
			y += stepY;
		}	
	}
	else{
		let m = dy / dx;
		let b = p1.y - (m * p1.x);
		if(dx < 0) stepX = -stepX;
		let x = p1.x;
		let y = p1.y;

		while(x != p2.x){
			point(x ,y);
			x += stepX;
			y = m * x + b;
		}
	}
}

function dda(x1, y1, x2, y2){
	let x = x1;
	let y = y1;
	let dx = x2 - x1;
	let dy = y2 - y1;
	let m = dy / dx;

	if(m >= 0){
		if(m <= 1){
			while(x <= x2){
				point(x, y);
				x++;
				y = y + m;
			}
		}
	}
	if(m>=1){
		while(y <= y2){
				point(x, y);
				y++;
				x = x + 1/m;
			}	
	}
	if(m <= 0){
		if(m >= -1){
			while(x2 <= x){
				point(x, y);
				x--;
				y = y - m;
			}
		}
	}
}

function bresenham(x1,y1,x2,y2) {
 	let x = x1
	let y = y1
	let dx = x2 - x1
	let dy = y2 - y1
  	let m = dy / dx

	let ddx = 2*dx
	let ddy = 2*dy
	let dy2dx2 = ddy-ddx
	let dx2dy2 = ddx-ddy


  	if( m < 1){
    	let p = ddy - dx

	    for (k=0; k < dx; k++) {
		    if(p < 0) {
		        x++
		        if(m != 0) {
		          y--
		        }
		        p+=ddy
		        point(x,y)
		    } 
		    else{
		        x++
		        y++
		        p+=dy2dx2
		        point(x,y)
		    }
	    }
	} 
	else if( m >= 1){
	    let p = ddx -dy
	    for (k=0; k < dy; k++){
	      	if(p < 0){
		        y++
		        p+=ddx
		        point(x,y)
	      	}
	      	else{
		        x++
		        y++
		        p+=dx2dy2
		        point(x,y)
	      	}
	    }
	}
}

function circle(xc, yc, r){
	let p = Math.round(5 / 4 - r);
	let x = 0;
	let y = r;

	printP(xc, x, yc, y);

	while(x < y){
		x++;
		if(p < 0){
			p = p + 2 * x + 1;
		}
		else{
			y--;
			p = p + 2 * (x - y) + 1;
		}
		printP(xc, x, yc, y);
	}

}

function printP(xc, x, yc, y){
	point(xc + x, yc + y);
	point(xc + x, yc - y);
	point(xc - x, yc + y);
	point(xc - x, yc - y);
	point(yc + y, xc + x);
	point(yc + y, xc - x);
	point(yc - y, xc + x);
	point(yc - y, xc - x);
}

function printP2(xc, x, yc, y){
	point(xc + x, yc + y);
	point(xc + x, yc - y);
	point(xc - x, yc + y);
	point(xc - x, yc - y);
}


function ovalo(xc, yc, rx, ry){
	let x, y, p, px, py;
	let rx2, ry2, tworx2, twory2;
	ry2 = ry*ry;
	rx2 = rx*rx;
	twory2 = 2 * ry2;
	tworx2 = 2 * rx2;


	x = 0;
	y = ry;
	printP2(xc, x, yc, y);

	p = Math.round(ry2 - rx2*ry + 0.25*rx2);
	px = 0;
	py = tworx2*y;
	while (px < py){
		x++;
		px = px + twory2;
		if(p < 0){
			p = p + ry2 + px;
		}
		else{
			y--;
			py = py - tworx2;
			p = p + ry2 + px - py;
		}
		printP2(xc, x, yc, y);
	}

	p = Math.round(ry2*(x+0.5)*(x+0.5) + rx2*(y-1)*(y-1) - rx2*ry2);
	px = 0;
	py = tworx2*y;
	while (y > 0){
		y--;
		py = py - tworx2;
		if(p > 0){
			p = p + rx2 - py;
		}
		else{
			x++;
			px = px + twory2;
			p = p + rx2 + py + px;
		}
		printP2(xc, x, yc, y);
	}
}