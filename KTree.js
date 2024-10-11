let W = window.innerWidth;
let H = window.innerHeight;

let K;

function setup() {
    createCanvas(W, H);
    background(0);

    K = new Node(W/2, H/2, 0);
}

function mousePressed() {
    K.branch();
}

function draw() {
    background(0);
    K.show();
}

class Node {
    constructor(x, y, depth) {
        this.x = x;
        this.y = y;
        this.depth = depth;

        this.children = [];
        this.branched = 0;
    }
    show() {
        fill(255);
        ellipse(this.x, this.y, 10);
        stroke(255);
        if (this.branched === 1) {
            for (let i = 0; i < this.children.length; i++) {
                line(this.x, this.y, this.children[i].x, this.children[i].y);
            }
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].show();
            }

        }
    }
    branch() {
        if (this.branched === 0) {
            let num_of_kids = Math.floor(random(1, 5));
            for (let i = 0; i < num_of_kids; i++) {
                let R = random(60, 100);
                let THETA = random(0, 2 * Math.PI);
                let v = createVector(R * Math.cos(THETA), R * Math.sin(THETA));
                this.children[i] = new Node(v.x+this.x, v.y+this.y, this.depth+1);
            }
            this.branched = 1;
        } else {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].branch();
            }
        }
    }
}
