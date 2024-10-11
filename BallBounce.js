let W = window.innerWidth;
let H = window.innerHeight;

let g = 9.8/10;
let mu = -0.9;
let hardness = 1;
let cor = 0.91;
let num_of_balls = 3;
let ID = 0;

let B = [];


function setup() {
  createCanvas(W, H);
}

function mousePressed() {
  B.push(new Ball(mouseX, mouseY, 120, ID, B));
  ID += 1;
}
function draw() {
  background(0);
  for (let i = 0; i < B.length; i++) {
    B[i].collision();
    B[i].move(frameCount/1000);
    B[i].display();
    if (B[i].diam < 0.001) {
      B.slice(i, 1);
    }
  }
}

class Ball {
  constructor(x, y, diam, ID, balls) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.ID = ID;
    this.balls = balls;
    this.v_x = 0;
    this.v_y = 0;
  }
  collision() {
    for (let i = this.ID + 1; i < this.balls.length; i++) {
      let dx = this.balls[i].x - this.x;
      let dy = this.balls[i].y - this.y;
      let center_dist = dist(dx, dy, 0, 0);
      let touching_dist = this.balls[i].diam / 2 + this.diam / 2;
      if (center_dist < touching_dist) {
        //determining the strength of the restitution and calculating resultant vector
        let theta = atan2(dy, dx);
        let new_x = this.x + cos(theta) * touching_dist;
        let new_y = this.y + sin(theta) * touching_dist;

        let a_x = (new_x - this.balls[i].x) * cor;
        let a_y = (new_y - this.balls[i].y) * cor;
        this.v_x -= a_x*hardness;
        this.v_y -= a_y*hardness;
        this.balls[i].v_x += a_x * hardness;
        this.balls[i].v_y += a_y * hardness;
      }
    }
  }
  move(frame_count) {
    let temp = Math.tan(frame_count/(frameCount+1));
    if (temp > this.diam) {
      temp > this.diam;
    }
    this.diam -= temp;
    this.v_y += g;
    this.x += this.v_x;
    this.y += this.v_y;
    if (this.x + this.diam/2 > W) {
      this.x = W - this.diam/2;
      this.v_x = this.v_x*cor*mu;
    } else if (this.x - this.diam/2 < 0) {
      this.x = this.diam/2;
      this.v_x = this.v_x*cor*mu;
    }
    if (this.y + this.diam/2 >= H) {
      this.y = H - this.diam/2;
      this.v_y = this.v_y*cor*mu;
    } else if (this.y - this.diam/2 < 0) {
      this.y = this.diam/2;
      this.v_y = this.v_y*cor*mu;
    }
  }
  display() {
    let R = map(this.x, 0, W, 0, 255);
    let G = map(this.y, 0, H, 0, 255);
    let B = map(this.y/this.x, 0, H/W, 0, 255);
    stroke(255-R, 255-G, 255-B);
    strokeWeight(0);
    fill(R, G, B);
    ellipse(this.x, this.y, this.diam, this.diam);
  }
}
