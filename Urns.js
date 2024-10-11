let W = window.innerWidth;
let H = window.innerHeight;

let urns = [];
let urns_altered = [];
let num_of_urns = 20;
let num_of_colors = 20;
let max_balls_per_urn = 20;
let true_max = 1000;
let averages = [];
let ratios = [];
let pad_percentage = 0.00125;
let x_pad = pad_percentage*W;
let y_pad = pad_percentage*H;


function setup() {
    createCanvas(W, H);
    background(0);
    rectMode(CORNER);
    colorMode(HSB, 1, 1, 1);
    initialize_urns();
}

function draw() { 
    background(0);

    take_place_reset();
    //take_place();
    //diffuse();

    display_averages();
    if (urns_altered[0].length > true_max) {
        averages = [];
        ratios = [];
        initialize_urns();
    }
}

// Orginal problem: take ball from urn I, place into urn II, take 
// ball from urn II place into urn III, once at last urn, reset. 
function take_place_reset() {
    for (let i = 0; i < num_of_urns-1; i++) {
        let index = Math.floor(random(0, urns_altered[i].length));
        let ball = urns_altered[i][index];
        averages[i][ball] += 1;
        urns_altered[i+1].push(ball);
    }
    let index = Math.floor(random(0, urns_altered[num_of_urns-1].length));
    let ball = urns_altered[num_of_urns-1][index];
    averages[num_of_urns-1][ball] += 1;
    reset_ratios();
    arrayCopy(urns, 0, urns_altered, 0, num_of_urns);
} 

// In this one, the urns are not reset and the ball taken from last urn
// is placed into first urn. All urns grow in size indefinetly. 
function take_place() {
    for (let i = 0; i < num_of_urns-1; i++) {
        let index = Math.floor(random(0, urns_altered[i].length));
        let ball = urns_altered[i][index]; 
        averages[i][ball] += 1;
        urns_altered[i+1].push(ball);
    }
    let index = Math.floor(random(0, urns_altered[num_of_urns-1].length));
    let ball = urns_altered[num_of_urns-1][index];
    urns_altered[0].push(ball);
    averages[num_of_urns-1][ball] += 1;
    reset_ratios();
}

// The ball that is taken is removed from urn from which it was taken
// after the ball is placed into next urn. 
function diffuse() {
    for (let i = 0; i < num_of_urns-1; i++) {
        let index = Math.floor(random(0, urns_altered[i].length));
        let ball = urns_altered[i][index];
        urns_altered[i].splice(index, 1);
        averages[i][ball] += 1;
        urns_altered[i+1].push(ball);
    }
    let index = Math.floor(random(0, urns_altered[num_of_urns-1].length));
    let ball = urns_altered[num_of_urns-1][index];
    urns_altered[num_of_urns-1].splice(index, 1);
    urns_altered[0].push(ball);
    averages[num_of_urns-1][ball] += 1;
    reset_ratios();
}

function display_averages() {
    let w = (W-(num_of_colors+1)*x_pad)/num_of_colors;
    let h = (H-(num_of_urns+1)*y_pad)/num_of_urns;
    let text_size = 3*min([w, h])/4;
    let color_count = [];
    colorMode(HSB, num_of_colors, 1, 1);

    for (let i = 0; i < num_of_urns; i++) {
        for (let j = 0; j < num_of_colors; j++) {
            let avg_color = averages[i][j]/(frameCount+1);
            let ratio_color = ratios[i][j];
            let x = (j+1)*x_pad+j*w;
            let y = (i+1)*y_pad+i*h;
            ratio_color = map(ratio_color, 0, 1, 0.1, 1);
            fill(avg_color, 1, ratio_color);
            rect(x, y, w, h);

            noStroke();
            fill(1-avg_color, 1, 1);
            textSize(text_size);
            //text(round(avg_color, 4), x+w/10, y+3*h/4);
        }
    }
}

function reset_ratios() {
    for (let i = 0; i < num_of_urns; i++) {
        for (let j = 0; j < num_of_colors; j++) {
            ratios[i][j] = 0;
        }
    }

    for (let i = 0; i < num_of_urns; i++) {
        for (let j = 0; j < urns_altered[i].length; j++) {
            let color = urns_altered[i][j];
            ratios[i][color] += 1;
        }
        for (let j = 0; j < num_of_colors; j++) {
            ratios[i][j] = ratios[i][j] / urns_altered[i].length;
        }
    }
}

function initialize_urns() {
    for (let i = 0; i < num_of_urns; i++) {
        urns[i] = [];
        urns_altered[i] = [];
        averages[i] = [];
        ratios[i] = [];
        num_of_balls = Math.floor(random(2, max_balls_per_urn));
        for (let j = 0; j < num_of_balls; j++) {
            urns[i][j] = Math.floor(random(0, num_of_colors));
            urns_altered[i][j] = urns[i][j];
        }
        for (let j = 0; j < num_of_colors; j++) {
            averages[i][j] = 0;
            ratios[i][j] = 0;
        }
        for (let j = 0; j < urns[i].length; j++) {
            let color = urns[i][j];
            ratios[i][color] += 1;
        }
        for (let j = 0; j < num_of_colors; j++) {
            ratios[i][j] = ratios[i][j] / urns[i].length;
        }
    }
}

function mouseClicked() {
    noLoop();
}
