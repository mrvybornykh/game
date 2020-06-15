let chest_1;
let chest_2;
let chest_3;
let chestClose;
let chestOpen;

let clock;
let crClock = 0;
let clockImg;
let clockPositionX;
let clockCount;

let score = 0;

let update = 0;
let randomBorder = 1.7;

let beer;
let crBeer = 0;
let beerImg;
let beerPositionX;
let noIsPressed = 0;

let ifBeerAvoid = 0;
let ifTimeAccept = 0;

let lucky;
let state;
let stateChanged = false;

function preload() {
  mainFont = loadFont('IndieFlower-Regular.ttf');
  
  chestClose = loadImage('chest_1.png');
  chestOpen = loadImage('chest_2.png');
  clockImg = loadImage('clock.png');
  beerImg = loadImage('beer.png');
}

function setup() {
  createCanvas(600, 600);
  background(255);
  
  chestCreate();
  state = 'start';
}

function draw() {
  drawSprites();
  
  if (state === 'start') {
    stateChanged = true;
    score = 0;
    ifBeerAvoid = 0;
    ifTimeAccept = 0;
    start();
  }
  else if(state === 'game') {
    game();
  }
  else if(state === 'over') {
    setTimeout(over, 1000);
  }
  
  if (state === 'start' && keyIsPressed && key === 's') {
    background(255);
    push()
    textFont(mainFont,20);
    text('Choose the chest to find beer', 80, 80);
    text('Press N to avoid working time (you will have only 1 sec)', 80, 100);
    text('DO NOT AVOID BEER!', 80, 120);
    text('Press 1', 80, 500);
    text('Press 2', 280, 500);
    text('Press 3', 480, 500);
    pop()
    chest_1.changeAnimation('close');
    chest_2.changeAnimation('close');
    chest_3.changeAnimation('close');
    state = 'game';
  }
  if (state === 'over' && keyIsPressed && key === 'r') {
    document.location.reload(true);
  }
}

function chestCreate() {
  chest_1 = createSprite(100, 400);
  chest_1.addAnimation('none', '');
  chest_1.addAnimation('close', chestClose);
  chest_1.addAnimation('open', chestOpen);
  chest_1.changeAnimation('none');
  chest_1.scale = 0.1;
  
  chest_2 = createSprite(300, 400);
  chest_2.addAnimation('none', '');
  chest_2.addAnimation('close', chestClose);
  chest_2.addAnimation('open', chestOpen);
  chest_2.changeAnimation('none');
  chest_2.scale = 0.1;

  chest_3 = createSprite(500, 400);
  chest_3.addAnimation('none', '');
  chest_3.addAnimation('close', chestClose);
  chest_3.addAnimation('open', chestOpen);
  chest_3.changeAnimation('none');
  chest_3.scale = 0.1;
}

function drawClock(clockPositionX){
  clock = createSprite(clockPositionX, 200);
  clock.addAnimation('clock', clockImg);
  clock.addAnimation('noclock', '');
  clock.changeAnimation('clock');
  clock.scale = 0.5;
}

function drawBeer(beerPositionX){
  beer = createSprite(beerPositionX, 200);
  beer.addAnimation('beer', beerImg);
  beer.addAnimation('nobeer', '');
  beer.changeAnimation('beer');
  beer.scale = 0.5;
}

function updateChests() {
  update = 0;
  background(255);
  push()
  textFont(mainFont,20);
  text('Choose the chest to find beer', 80, 80);
  text('Press N to avoid working time (you will have only 1 sec)', 80, 100);
  text('DO NOT AVOID BEER!', 80, 120);
  text('Press 1', 80, 500);
  text('Press 2', 280, 500);
  text('Press 3', 480, 500);
  pop()
  chest_1.changeAnimation('close');
  chest_2.changeAnimation('close');
  chest_3.changeAnimation('close');
  if (crBeer == 1) {
    beer.remove();
    crBeer = 0;
  }
  else if (crClock == 1) {
    clock.remove();
    crClock = 0;
  }
}

function start() {
  textFont(mainFont,50);
  text('Procrastination', 130, 300);
  push();
  textFont(mainFont,30);
  text('Press S to start', 170, 400);
  pop();
}

function game() {
  if (keyWentDown(78)) {
    noIsPressed = 1;
  }
  if (keyWentDown(49) && update == 0) {
    chest_1.changeAnimation('open');
    clockPositionX = chest_1.position.x;
    beerPositionX = chest_1.position.x;
    lucky = random(randomBorder, 3);
    if (lucky >= 2) {
      drawBeer(beerPositionX);
      crBeer = 1;
      score = score + 1;
      update = 1;
      setTimeout(beerAvoid, 1000);
    }
    else if (lucky < 2) {
      drawClock(clockPositionX);
      crClock = 1;
      update = 1;
      setTimeout(makeOver, 1000);
    }
  }
  if (keyWentDown(50) && update == 0) {
    chest_2.changeAnimation('open');
    clockPositionX = chest_2.position.x;
    beerPositionX = chest_2.position.x;
    lucky = random(randomBorder, 3);
    if (lucky >= 2) {
      drawBeer(beerPositionX);
      crBeer = 1;
      score = score + 1;
      update = 1;
      setTimeout(beerAvoid, 1000);
    }
    else if (lucky < 2) {
      drawClock(clockPositionX);
      crClock = 1;
      update = 1;
      setTimeout(makeOver, 1000);
    }
  }
  if (keyWentDown(51) && update == 0) {
    chest_3.changeAnimation('open');
    clockPositionX = chest_3.position.x;
    beerPositionX = chest_3.position.x;
    lucky = random(randomBorder, 3);
    if (lucky >= 2) {
      drawBeer(beerPositionX);
      crBeer = 1;
      score = score + 1;
      update = 1;
      setTimeout(beerAvoid, 1000);
    }
    else if (lucky < 2) {
      drawClock(clockPositionX);
      crClock = 1;
      update = 1;
      setTimeout(makeOver, 1000);
    }
    update = 1;
    setTimeout(updateChests, 1000);
  }
}

function over() {
  background(255);
  chest_1.remove();
  chest_2.remove();
  chest_3.remove();
  if (crBeer == 1) {
    beer.remove();
    crBeer = 0;
  }
  else if (crClock == 1) {
    clock.remove();
    crClock = 0;
  }
  fill(0);
  textFont(mainFont,30);
  if (ifBeerAvoid == 1) {
    text("Oh no! You've given up that pint of beer!", 50, 200);
  }
  else if (ifTimeAccept == 1) {
    text("Oh no! You've worked!!!", 125, 200);
  }
  text("Procrastination score: " + score, 120, 300);
  text("Press R to restart", 160, 400);

  if (stateChanged) {
    stateChanged = false;
    let body  = document.querySelector('body');

    let form = document.createElement('form');
    form.style.position = "absolute";
    form.style.top = "23%"; // отступ сверху
    form.style.left = "18%"; 
    form.style.transform = "translateX(-50%)";
    form.setAttribute('class', 'form');

    let newBtn = document.createElement('button');
    newBtn.textContent = "Save";

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter name to save score');
    newInput.setAttribute('maxlength', 20);
    newInput.required = true;

    let allBtn = document.createElement('button');
    allBtn.style.position = "absolute";
    allBtn.style.top = "30%"; // отступ сверху
    allBtn.style.left = "15%"; 
    allBtn.textContent = "Top 3";

    body.appendChild(allBtn);
    body.appendChild(form);
    form.appendChild(newInput);
    form.appendChild(newBtn);

    allBtn.addEventListener('click', (e) => {
        fetch('/top')
        .then(resp => resp.json())
        .then(data => console.log(data));
    });

    form.addEventListener('submit', (e) => {
        console.log("Button pressed");

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset = utf-8'
            },
            body: JSON.stringify({name: newInput.value, score:score})
        })
        .then(resp => resp.json())
        .then(data => console.log(data));

        form.remove();
        e.preventDefault();
    });
  }
}

function makeOver() {
  if (noIsPressed == 1) {
    state = "game";
    updateChests();
    noIsPressed = 0;
  }
  else if (noIsPressed == 0) {
    ifTimeAccept = 1;
    state = "over";
  }
}

function beerAvoid(){
  if (noIsPressed == 0) {
    state = "game";
    updateChests();
  }
  else if (noIsPressed == 1) {
    score = score - 1;
    ifBeerAvoid = 1;
    state = "over";
    noIsPressed = 0;
  }
}