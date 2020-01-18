function clear(ctx) {
  ctx.clearRect(0, 0, 600, 600);
}

let direction = 'right';
let cell = 15;
let snake = [{x: 20, y: 20}, {x: 19, y: 20}, {x: 18, y: 20}];
let apple = {x: Math.floor((Math.random() * 39)),
             y: Math.floor((Math.random() * 39))};

function drawApple(ctx) {
  ctx.fillStyle = 'rgb(0, 255, 0)';
  ctx.fillRect(apple.x * cell, apple.y * cell, cell - 2, cell - 2);
}

function getRandomApple() {
  apple = {x: Math.floor((Math.random() * 39)),
           y: Math.floor((Math.random() * 39))};
}


function checkCollisionApple() {
  if (snake[0].x == apple.x &&
      snake[0].y == apple.y) {
    return true;
  }
}

function checkInput() {
  document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight' && direction != 'left') {
      direction = 'right';
    } else if (event.key == 'ArrowLeft' && direction != 'right') {
      direction = 'left';
    } else if (event.key == 'ArrowUp' && direction != 'down') {
      direction = 'up';
    } else if (event.key == 'ArrowDown' && direction != 'up') {
      direction = 'down';
    }
  });
}

function drawSnake(ctx) {
  ctx.fillStyle = 'green';
  for (let i = 0 ; i < snake.length ; i++) {
    ctx.fillRect(snake[i].x * cell, snake[i].y * cell, cell - 1, cell - 1);
  }
}

function moveSnake() {
  snake.pop();
  switch (direction) {
    case 'right':
      snake.unshift({x: snake[0].x + 1, y: snake[0].y});
      break;
    case 'left':
      snake.unshift({x: snake[0].x - 1, y: snake[0].y});
      break;
    case 'up':
      snake.unshift({x: snake[0].x, y: snake[0].y - 1});
      break;
    case 'down':
      snake.unshift({x: snake[0].x, y: snake[0].y + 1});
      break;
  }
}

function growSnake() {
  switch (direction) {
    case 'right':
      snake.push({x: snake[snake.length - 1].x - 1, y: snake[snake.length - 1].y});
      break;
    case 'left':
      snake.push({x: snake[snake.length - 1].x + 1, y: snake[snake.length - 1].y});
      break;
    case 'up':
      snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - 1});
      break;
    case 'down':
      snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + 1});
      break;
  }
}

function draw2() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  clear(ctx);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600);
  checkInput();
  drawSnake(ctx);
  moveSnake();
  drawApple(ctx);
  if (checkCollisionApple()) {
    getRandomApple();
    growSnake();
  }
  // TODO: check collision with snake
  // TODO: wrap map behind walls
}


function init() {
  // TODO: a menu before playing
  setInterval(draw2, 100);
}
