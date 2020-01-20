function clear(ctx) {
  ctx.clearRect(0, 0, 600, 600);
}

let gameLoop = undefined;
let width = 39;
let height = 39;
let alive = true;
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

function moveSnakeWrap() {
  snake.pop();
  switch (direction) {
    case 'right':
      if (snake[0].x == width) {
        snake.unshift({x: 0, y: snake[0].y});
      } else {
        snake.unshift({x: snake[0].x + 1, y: snake[0].y});
      }
      break;
    case 'left':
      if (snake[0].x == 0) {
        snake.unshift({x: width, y: snake[0].y});
      } else {
        snake.unshift({x: snake[0].x - 1, y: snake[0].y});
      }
      break;
    case 'up':
      if (snake[0].y == 0) {
        snake.unshift({x: snake[0].x, y: height});
      } else {
        snake.unshift({x: snake[0].x, y: snake[0].y - 1});
      }
      break;
    case 'down':
      if (snake[0].y == height) {
        snake.unshift({x: snake[0].x, y: 0});
      } else {
        snake.unshift({x: snake[0].x, y: snake[0].y + 1});
      }
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

function checkCollisionSnake() {
  for (let i = 1 ; i < snake.length ; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      return true;
    }
  }

  return false;
}

function gameOver(ctx) {
  // TODO: Better game over function
  ctx.fillStyle = 'black';
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", 300, 300);
}

function draw2() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  clear(ctx);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600);
  checkInput();
  drawSnake(ctx);
  moveSnakeWrap();
  drawApple(ctx);
  if (checkCollisionApple()) {
    getRandomApple();
    growSnake();
  }
  if (checkCollisionSnake()) {
    clearInterval(gameLoop);
    gameOver(ctx);
    alive = false;
  }
}


function init() {
  // TODO: a menu before playing
  if (alive) {
    gameLoop = setInterval(draw2, 100);
  } else {
    console.log("game over");
  }
}
