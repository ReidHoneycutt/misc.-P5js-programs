let W = window.innerWidth;
let H = window.innerHeight;
let arr = [];


function setup() {
  createCanvas(W, H);
  background(0);
  colorMode(HSB, 1, 1, 1)
}

function draw() {
  background(0)
  getPoints()
  if (arr[0].terminate==1 && arr[0].r <= 0) {
    arr.shift();
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].update()
    arr[i].show()
  }
}

function getPoints() {
  if (arr.length > 100) {
    for (let i = 0; i < arr.length-100; i++) {
      arr[i].terminate = 1;
    }
  }
  arr.push(new LightSnake(mouseX, mouseY, 1))
}

class LightSnake {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.terminate = 0;
  }
  update() {

    if (this.terminate == 1) {
      this.r--;
    }
    else {
      this.r++
    }
  }
  show() {
    fill((frameCount%1000)/1000, 1, 1);
    stroke(1-(frameCount%1000)/1000, 1, 1)
    ellipse(this.x, this.y, this.r)
  }
}

function mousePressed() {
  noLoop();
}
function mouseReleased() {
	loop();
}
