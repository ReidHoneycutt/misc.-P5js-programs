let W = window.innerWidth;
let H = window.innerHeight;
var numJoints = 20;

//script.forwardShift, class
var theta = [Math.PI / 4, 0, - Math.PI / 4, - Math.PI / 2, - Math.PI / 4, 0, Math.PI / 4, Math.PI / 2];
let n = theta.length;

//script
let k = 0;
let arr = [];

let vshift = 50;
let hshift = 50; 

function setup() {
    createCanvas(W, H);
    background(255);
    S = new Border(W / 2, H / 2);
}
function draw() {
    S.show();
    t++;
}

function forwardShift() {
    let t = theta[0];
    for (let i = 1; i < n; i++) {
        theta[i-1] = theta[i];
    }
    theta[n-1] = t;
}


let t = 0;
class Border {
    constructor(x, y) {
        this.x = 0;
        this.y = 8;
        this.r = 10;
        this.x_c = x;
        this.y_c = y;
    }
    show() {
        for (let i = 0; i < n; i++) {
            //vertical left
            curve(this.y, this.x, this.y + this.r * cos(theta[i]), this.x + this.r * sin(theta[i]), this.y + this.r * cos(theta[i+2]), this.x + this.r * sin(theta[i+2]), this.y + this.r * cos(theta[i+3]), this.x + this.r * sin(theta[i+3]));
            //vertical right
            curve(this.y + t, this.x, t + this.y + this.r * cos(theta[i]), this.x + this.r * sin(theta[i]), t + this.y + this.r * cos(theta[i+2]), this.x + this.r * sin(theta[i+2]), t + this.y + this.r * cos(theta[i+3]), this.x + this.r * sin(theta[i+3]));
            //horizontal
            curve(this.x , this.y, this.x + this.r * cos(theta[i]), this.y + this.r * sin(theta[i]), this.x + this.r * cos(theta[i+2]), this.y + this.r * sin(theta[i+2]), this.x + this.r * cos(theta[i+3]), this.y + this.r * sin(theta[i+3]));

            this.x = (this.x + this.r * cos(theta[i])) % W;
            this.y = (this.y + this.r * sin(theta[i])) % H;
        }
        forwardShift();
    }

}
