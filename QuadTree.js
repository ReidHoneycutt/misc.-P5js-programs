let W = window.innerWidth;
let H = window.innerHeight;
let max_depth = 9;

function setup() {
  createCanvas(W, H);
  background(0);
  T = new Tree(0, 0, W, H, 0);
}

function draw() {
  T.split();
}

class Tree {
  constructor(x, y, w, h, max_depth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.contained = false;
    this.q1 = null;
    this.q2 = null;
    this.q3 = null;
    this.q4 = null;
    this.max_depth = max_depth;
  }
  split() {
    this.is_contained();
    if (this.contained) {
      if (!this.q1) {
        this.q1 = new Tree(this.x, this.y, this.w/2, this.h/2);
        this.q2 = new Tree(this.x+this.w/2, this.y, this.w/2, this.h/2);
        this.q3 = new Tree(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2);
        this.q4 = new Tree(this.x, this.y+this.h/2, this.w/2, this.h/2);

        this.q1.show();
        this.q2.show();
        this.q3.show();
        this.q4.show();
      } else {
        this.q1.split();
        this.q2.split();
        this.q3.split();
        this.q4.split();
      }
    } else {
      this.q1 = null;
      this.q2 = null;
      this.q3 = null;
      this.q4 = null;
    }
  }
  is_contained() {
    if ((mouseX > this.x) && (mouseX < this.x+this.w)) {
      if ((mouseY > this.y) && (mouseY < this.y+this.h)) {
        this.contained = true;
      } else {
        this.contained = false;
      }
    } else {
      this.contained = false;
    }
  }
  show() {
    stroke(255);
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }
}
