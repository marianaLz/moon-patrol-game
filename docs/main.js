var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var startedGame = false;
var interval;
var frames = 0;
var score = 0;
var impacts = 0;
var shots = 0;
var audio = new Audio();
audio.src = "./sounds/Moon Patrol - Atari 2600.mp3";
audio.loop = true;
var jump = new Audio();
jump.src = "./sounds/jump.mp3";
var impact = new Audio();
impact.src = "./sounds/impact.mp3";
var shooting = new Audio();
shooting.src = "./sounds/shot.mp3";
var dead = new Audio();
dead.src = "./sounds/dead-enemy.mp3";
var gOver = new Audio();
gOver.src = "./sounds/game-over.mp3";
var gComplete = new Audio();
gComplete.src = "./sounds/winner.mp3";
var player1 = localStorage.getItem("player1") || 0;
var player2 = localStorage.getItem("player2") || 0;

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/background.png";
  }
  gameOver() {
    clearInterval(interval);
    ctx.fillStyle = "mediumorchid";
    ctx.fillRect(297, 147, 406, 206);
    ctx.fillStyle = "black";
    ctx.fillRect(300, 150, 400, 200);
    ctx.fillStyle = "white";
    ctx.font = "25px pixelart";
    ctx.fillText("GAME OVER", 390, 210);
    ctx.font = "20px pixelart";
    ctx.fillText("YOUR SCORE " + score, 350, 250);
    audio.pause();
    gOver.play();
    interval = null;
    restartButton.removeAttribute("class", "disp");
    main.removeAttribute("class", "disp");
  }
  gameComplete() {
    clearInterval(interval);
    ctx.fillStyle = "mediumorchid";
    ctx.fillRect(297, 147, 406, 206);
    ctx.fillStyle = "black";
    ctx.fillRect(300, 150, 400, 200);
    ctx.fillStyle = "white";
    ctx.font = "25px pixelart";
    ctx.fillText("GAME COMPLETE", 335, 210);
    ctx.font = "20px pixelart";
    ctx.fillText("YOUR SCORE " + score, 350, 250);
    audio.pause();
    gComplete.play();
    interval = null;
    restartButton.removeAttribute("class", "disp");
    main.removeAttribute("class", "disp");
  }
  gameOver2() {
    clearInterval(interval);
    ctx.fillStyle = "mediumorchid";
    ctx.fillRect(297, 147, 406, 206);
    ctx.fillStyle = "black";
    ctx.fillRect(300, 150, 400, 200);
    ctx.fillStyle = "white";
    ctx.font = "25px pixelart";
    ctx.fillText("GAME OVER", 390, 210);
    ctx.font = "20px pixelart";
    ctx.fillText("YOUR SCORE " + score, 350, 250);
    localStorage.setItem("player1", score);
    audio.pause();
    gOver.play();
    interval = null;
    restart2Button.removeAttribute("class", "disp");
    main.removeAttribute("class", "disp");
  }
  gameComplete2() {
    clearInterval(interval);
    ctx.fillStyle = "mediumorchid";
    ctx.fillRect(297, 147, 406, 206);
    ctx.fillStyle = "black";
    ctx.fillRect(300, 150, 400, 200);
    ctx.fillStyle = "white";
    ctx.font = "25px pixelart";
    ctx.fillText("GAME COMPLETE", 335, 210);
    ctx.font = "20px pixelart";
    ctx.fillText("YOUR SCORE " + score, 350, 250);
    localStorage.setItem("player1", score);
    audio.pause();
    gComplete.play();
    interval = null;
    restart2Button.removeAttribute("class", "disp");
    main.removeAttribute("class", "disp");
  }
  gameOver3() {
    clearInterval(interval);
    ctx.fillStyle = "mediumorchid";
    ctx.fillRect(297, 47, 406, 306);
    ctx.fillStyle = "black";
    ctx.fillRect(300, 50, 400, 300);
    ctx.fillStyle = "white";
    ctx.font = "25px pixelart";
    ctx.fillText("GAME OVER", 390, 105);
    ctx.font = "20px pixelart";
    ctx.fillText("YOUR SCORE " + score, 350, 145);
    localStorage.setItem("player2", score);
    player1 = localStorage.getItem("player1");
    player2 = localStorage.getItem("player2");
    ctx.font = "15px pixelart";
    ctx.fillText("PLAYER 1: " + player1, 390, 185);
    ctx.fillText("PLAYER 2: " + player2, 390, 215);
    ctx.font = "25px pixelart";
    ctx.fillText(
      player1 > player2 ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!",
      340,
      260
    );
    audio.pause();
    gOver.play();
    interval = null;
    main.removeAttribute("class", "disp");
  }
  gameComplete3() {
    clearInterval(interval);
    ctx.fillStyle = "mediumorchid";
    ctx.fillRect(297, 47, 406, 306);
    ctx.fillStyle = "black";
    ctx.fillRect(300, 50, 400, 300);
    ctx.fillStyle = "white";
    ctx.font = "25px pixelart";
    ctx.fillText("GAME COMPLETE", 335, 105);
    ctx.font = "20px pixelart";
    ctx.fillText("YOUR SCORE " + score, 350, 145);
    localStorage.setItem("player2", score);
    player1 = localStorage.getItem("player1");
    player2 = localStorage.getItem("player2");
    ctx.font = "15px pixelart";
    ctx.fillText("PLAYER 1: " + player1, 390, 185);
    ctx.fillText("PLAYER 2: " + player2, 390, 215);
    ctx.font = "25px pixelart";
    ctx.fillText(
      player1 > player2 ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!",
      340,
      260
    );
    audio.pause();
    gComplete.play();
    interval = null;
    main.removeAttribute("class", "disp");
  }
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class HealthBar {
  constructor() {
    this.x = 470;
    this.y = 0;
    this.width = 110;
    this.height = 75;
    this.image = new Image();
    this.image.src = "./images/h1.png";
  }
  draw() {
    if (impacts < 2) this.image.src = "./images/h1.png";
    if (impacts > 1) this.image.src = "./images/h2.png";
    if (impacts > 3) this.image.src = "./images/h3.png";
    if (impacts > 5) this.image.src = "./images/h4.png";
    if (impacts > 7) this.image.src = "./images/h5.png";
    if (impacts > 9) this.image.src = "./images/h6.png";
    if (impacts > 11) this.image.src = "./images/h7.png";
    if (impacts > 13) this.image.src = "./images/h8.png";
    if (impacts > 15) this.image.src = "./images/h9.png";
    if (impacts > 17) this.image.src = "./images/h10.png";
    if (impacts > 19) this.image.src = "./images/h11.png";
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Ship {
  constructor() {
    this.image1 = new Image();
    this.image1.src = "./images/nave1.png";
    this.image2 = new Image();
    this.image2.src = "./images/nave2.png";
    this.image = this.image1;
    this.speed = 2;
    this.friction = 0.99;
    this.velxl = 0;
    this.velxr = 0;
    this.x = 440;
    this.y = 70;
    this.width = 120;
    this.height = 70;
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    if (this.y < 350) this.y += 2;
    if (frames % 15 === 0) {
      this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Crater {
  constructor() {
    this.x = canvas.width;
    this.y = 417;
    this.width = 70;
    this.height = 20;
    this.image = new Image();
    this.image.src = "./images/crater.png";
  }
  draw() {
    if (frames % 10) this.x -= 5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Enemy {
  constructor(x = canvas.width) {
    this.x = x;
    this.y = 375;
    this.width = 50;
    this.height = 30;
    this.image1 = new Image();
    this.image1.src = "./images/enemy1.png";
    this.image2 = new Image();
    this.image2.src = "./images/enemy2.png";
    this.image = this.image1;
  }
  draw() {
    if (frames % 10) this.x -= 5;
    if (frames % 10 === 0) {
      this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class SkyEnemy1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 20;
    this.image1 = new Image();
    this.image1.src = "./images/skyEnemy1.png";
    this.image2 = new Image();
    this.image2.src = "./images/skyEnemy11.png";
    this.image = this.image1;
  }
  draw() {
    if (frames % 10 === 0) {
      this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class SkyEnemy2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 20;
    this.image1 = new Image();
    this.image1.src = "./images/skyEnemy2.png";
    this.image2 = new Image();
    this.image2.src = "./images/skyEnemy22.png";
    this.image = this.image1;
  }
  draw() {
    if (frames % 10 === 0) {
      this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class FinalEnemy {
  constructor() {
    this.x = 700;
    this.y = 360;
    this.width = 120;
    this.height = 70;
    this.image = new Image();
    this.image1 = new Image();
    this.image1.src = "./images/finalEnemy.png";
    this.image2 = new Image();
    this.image2.src = "./images/finalEnemyy.png";
    this.image = this.image1;
    this.visible = false;
  }
  draw() {
    if (frames % 20 === 0) {
      this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Explosion {
  constructor(x, y, width, height) {
    this.x = x - 10;
    this.y = y - 10;
    this.width = width + 20;
    this.height = height + 20;
    this.image = new Image();
    this.image.src = "./images/explosion.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Shock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./images/impact.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class RightBullet {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y + 45;
    this.width = 20;
    this.height = 3;
    this.image = new Image();
    this.image.src = "./images/rightBullet.png";
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class UpBullet {
  constructor(x, y) {
    this.x = x + 58;
    this.y = y;
    this.width = 3;
    this.height = 20;
    this.image = new Image();
    this.image.src = "./images/upBullet.png";
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class EnemyBullet {
  constructor(direction, x, y) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 20;
    this.image = new Image();
    this.image.src = "./images/enemyBullet.png";
    this.direction = direction;
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    if (this.direction === "enemy") {
      this.image.src = "./images/enemyBullet.png";
      this.width = 20;
      this.height = 3;
    }
    if (this.direction === "sky1") {
      this.image.src = "./images/sky1Bullet.png";
      this.width = 20;
      this.height = 8;
    }
    if (this.direction === "sky2") {
      this.image.src = "./images/sky2Bullet.png";
      this.width = 20;
      this.height = 8;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var background = new Background();
var healthBar = new HealthBar();
var ship = new Ship();
var finalEnemy = new FinalEnemy();
var rightBullet = new RightBullet();
var upBullet = new UpBullet();
var enemybullet = new EnemyBullet();
var craters = [];
var enemies = [];
var skyEnemies1 = [];
var skyEnemies2 = [];
var shipRightBullets = [];
var shipUpBullets = [];
var skyEnemy1Bullets = [];
var skyEnemy2Bullets = [];
var finalEnemyBullets = [];

function generateCraters() {
  if (frames <= 4000 && (frames % 220 == 0 || frames % 550 == 0)) {
    let crater = new Crater();
    craters.push(crater);
  }
}

function drawCraters() {
  craters.forEach((crater, index) => {
    if (crater.x < -canvas.width) {
      score += 20;
      return craters.splice(index, 1);
    }
    crater.draw();
    if (ship.collision(crater)) {
      let shock = new Shock(ship.x, ship.y);
      shock.draw();
      impact.play();
      craters.splice(index, 1);
      impacts++;
    }
  });
}

function generateEnemies() {
  if (
    frames >= 800 &&
    frames <= 4000 &&
    (frames % 280 == 0 || frames % 1000 == 0)
  ) {
    let enemy = new Enemy();
    enemies.push(enemy);
  }
}

function drawEnemies() {
  enemies.forEach((enemy, index) => {
    if (enemy.x < -canvas.width) {
      return enemies.splice(index, 1);
    }
    enemy.draw();
    if (ship.collision(enemy)) {
      let shock = new Shock(ship.x, ship.y);
      shock.draw();
      impact.play();
      enemies.splice(index, 1);
      impacts++;
    }
  });
}

function randomNum(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateSkyEnemies() {
  if (
    frames >= 2000 &&
    frames <= 4000 &&
    (frames % 300 == 0 || (frames && 1000 == 0))
  ) {
    let posy1 = randomNum(40, 200);
    let posy2 = randomNum(40, 200);
    let skyEnemy1 = new SkyEnemy1(0, posy1);
    let skyEnemy2 = new SkyEnemy2(canvas.width, posy2);
    let skyEnemy1Bullet = new EnemyBullet("sky1", skyEnemy1.x, skyEnemy1.y);
    let skyEnemy2Bullet = new EnemyBullet("sky2", skyEnemy2.x, skyEnemy2.y);
    skyEnemies1.push(skyEnemy1);
    skyEnemies2.push(skyEnemy2);
    skyEnemy1Bullets.push(skyEnemy1Bullet);
    skyEnemy2Bullets.push(skyEnemy2Bullet);
  }
}

function drawSkyEnemies() {
  skyEnemies1.forEach((skyEnemy1, index) => {
    skyEnemy1.x += 1;
    if (skyEnemy1.x > canvas.width) {
      return skyEnemies1.splice(index, 1);
    }
    skyEnemy1.draw();
    if (ship.collision(skyEnemy1)) {
      let shock = new Shock(ship.x, ship.y);
      shock.draw();
      impact.play();
      skyEnemies1.splice(index, 1);
      impacts++;
    }
    skyEnemy1Bullets.forEach((skyEnemy1Bullet, i) => {
      skyEnemy1Bullet.y += 1;
      skyEnemy1Bullet.x += 3;
      if (
        skyEnemy1Bullet.y > canvas.height ||
        skyEnemy1Bullet.x > canvas.width
      ) {
        return skyEnemy1Bullets.splice(i, 1);
      }
      skyEnemy1Bullet.draw();
      if (skyEnemy1Bullet.collision(ship)) {
        let shock = new Shock(ship.x, ship.y);
        shock.draw();
        impact.play();
        skyEnemy1Bullets.splice(i, 1);
        impacts++;
      }
    });
  });
  skyEnemies2.forEach((skyEnemy2, index) => {
    skyEnemy2.x -= 3;
    if (skyEnemy2.x < -canvas.width) {
      return skyEnemies2.splice(index, 1);
    }
    skyEnemy2.draw();
    if (ship.collision(skyEnemy2)) {
      let shock = new Shock(ship.x, ship.y);
      shock.draw();
      impact.play();
      skyEnemies2.splice(index, 1);
      impacts++;
    }
    skyEnemy2Bullets.forEach((skyEnemy2Bullet, i) => {
      skyEnemy2Bullet.y += 1;
      skyEnemy2Bullet.x -= 3;
      if (
        skyEnemy2Bullet.y > canvas.height ||
        skyEnemy2Bullet.y > canvas.height
      ) {
        return skyEnemy2Bullets.splice(i, 1);
      }
      skyEnemy2Bullet.draw();
      if (skyEnemy2Bullet.collision(ship)) {
        let shock = new Shock(ship.x, ship.y);
        shock.draw();
        impact.play();
        skyEnemy2Bullets.splice(i, 1);
        impacts++;
      }
    });
  });
}

function generateFinalEnemy() {
  if (frames >= 4000) {
    ship.x = 200;
    finalEnemy.draw();
    finalEnemy.visible = true;
  }
}

function drawRightBullets() {
  shipRightBullets.forEach((rightBullet, i) => {
    rightBullet.x += 10;
    if (rightBullet.x > canvas.width) {
      return shipRightBullets.splice(i, 1);
    }
    rightBullet.draw();
    enemies.forEach((enemy, index) => {
      if (rightBullet.collision(enemy)) {
        let explosion = new Explosion(
          enemy.x,
          enemy.y,
          enemy.width,
          enemy.height
        );
        explosion.draw();
        shipRightBullets.splice(i, 1);
        enemies.splice(index, 1);
        dead.play();
        score += 50;
      }
    });
    skyEnemies1.forEach((skyEnemy1, index) => {
      if (rightBullet.collision(skyEnemy1)) {
        let explosion = new Explosion(
          skyEnemy1.x,
          skyEnemy1.y,
          skyEnemy1.width,
          skyEnemy1.height
        );
        explosion.draw();
        shipRightBullets.splice(i, 1);
        skyEnemies1.splice(index, 1);
        dead.play();
        score += 50;
      }
    });
    skyEnemies2.forEach((skyEnemy2, index) => {
      if (rightBullet.collision(skyEnemy2)) {
        let explosion = new Explosion(
          skyEnemy2.x,
          skyEnemy2.y,
          skyEnemy2.width,
          skyEnemy2.height
        );
        explosion.draw();
        shipRightBullets.splice(i, 1);
        skyEnemies2.splice(index, 1);
        dead.play();
        score += 50;
      }
    });
    if (finalEnemy.visible == true && rightBullet.collision(finalEnemy)) {
      shipRightBullets.splice(i, 1);
      dead.play();
      score += 100;
      shots++;
    }
  });
}

function drawUpBullets() {
  shipUpBullets.forEach((upBullet, i) => {
    upBullet.y -= 10;
    if (upBullet.y < -canvas.height) {
      return shipUpBullets.splice(i, 1);
    }
    upBullet.draw();
    skyEnemies1.forEach((skyEnemy1, index) => {
      if (upBullet.collision(skyEnemy1)) {
        let explosion = new Explosion(
          skyEnemy1.x,
          skyEnemy1.y,
          skyEnemy1.width,
          skyEnemy1.height
        );
        explosion.draw();
        shipUpBullets.splice(i, 1);
        skyEnemies1.splice(index, 1);
        dead.play();
        score += 50;
      }
    });
    skyEnemies2.forEach((skyEnemy2, index) => {
      if (upBullet.collision(skyEnemy2)) {
        let explosion = new Explosion(
          skyEnemy2.x,
          skyEnemy2.y,
          skyEnemy2.width,
          skyEnemy2.height
        );
        explosion.draw();
        shipUpBullets.splice(i, 1);
        skyEnemies2.splice(index, 1);
        dead.play();
        score += 50;
      }
    });
  });
}

function generateFinalEnemyBullet() {
  if (frames >= 4000 && frames % 120 == 0) {
    let posY = randomNum(finalEnemy.y, finalEnemy.y + 50);
    let finalEnemyBullet = new EnemyBullet("enemy", finalEnemy.x, posY);
    finalEnemyBullets.push(finalEnemyBullet);
  }
}

function drawFinalEnemyBullet() {
  finalEnemyBullets.forEach((finalEnemyBullet, i) => {
    finalEnemyBullet.x -= 10;
    if (finalEnemyBullet.x < -canvas.height) {
      return finalEnemyBullets.splice(i, 1);
    }
    finalEnemyBullet.draw();
    if (finalEnemyBullet.collision(ship)) {
      let shock = new Shock(ship.x, ship.y);
      shock.draw();
      impact.play();
      finalEnemyBullets.splice(i, 1);
      impacts++;
    }
  });
}

function game_Over(num) {
  if (impacts > 1) {
    if (num === 1) background.gameOver();
    if (num === 2) background.gameOver2();
    if (num === 3) background.gameOver3();
  } else if (shots > 30) {
    let explosion = new Explosion(
      finalEnemy.x - 10,
      finalEnemy.y - 10,
      finalEnemy.width + 20,
      finalEnemy.height + 20
    );
    explosion.draw();
    if (num === 1) background.gameComplete();
    if (num === 2) background.gameComplete2();
    if (num === 3) background.gameComplete3();
  }
}

window.onload = function() {
  function update() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    ship.draw();
    healthBar.draw();
    ctx.fillStyle = "white";
    ctx.font = "13px pixelart";
    ctx.fillText("SCORE " + score, 40, 45);
    ctx.fillText("IMPACTS " + impacts, 270, 45);
    generateCraters();
    drawCraters();
    generateEnemies();
    drawEnemies();
    generateSkyEnemies();
    drawSkyEnemies();
    generateFinalEnemy();
    drawRightBullets();
    drawUpBullets();
    generateFinalEnemyBullet();
    drawFinalEnemyBullet();
    ship.velxl *= ship.friction;
    ship.velxr *= ship.friction;
    if (ship.x + ship.velxl < 880) ship.x += ship.velxl;
    if (ship.x - ship.velxr > 15) ship.x += ship.velxr;
    game_Over(1);
  }

  function startGame() {
    startedGame = true;
    interval = setInterval(update, 1000 / 100);
    audio.play();
  }

  function restart() {
    frames = 0;
    score = 0;
    impacts = 0;
    shots = 0;
    craters = [];
    enemies = [];
    skyEnemies1 = [];
    skyEnemies2 = [];
    shipRightBullets = [];
    shipUpBullets = [];
    skyEnemy1Bullets = [];
    skyEnemy2Bullets = [];
    finalEnemyBullets = [];
    ship.x = 440;
    ship.y = 300;
    audio.currentTime = 0;
    jump.src = "./sounds/jump.mp3";
    impact.src = "./sounds/impact.mp3";
    shooting.src = "./sounds/shot.mp3";
    dead.src = "./sounds/dead enemy.mp3";
    gOver.src = "./sounds/game over.mp3";
    gComplete.src = "./sounds/winner.mp3";
    startGame();
  }

  function update2() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    ship.draw();
    healthBar.draw();
    ctx.fillStyle = "white";
    ctx.font = "13px pixelart";
    ctx.fillText("SCORE " + score, 40, 45);
    ctx.fillText("IMPACTS " + impacts, 270, 45);
    generateCraters();
    drawCraters();
    generateEnemies();
    drawEnemies();
    generateSkyEnemies();
    drawSkyEnemies();
    generateFinalEnemy();
    drawRightBullets();
    drawUpBullets();
    generateFinalEnemyBullet();
    drawFinalEnemyBullet();
    ship.velxl *= ship.friction;
    ship.velxr *= ship.friction;
    if (ship.x + ship.velxl < 880) ship.x += ship.velxl;
    if (ship.x - ship.velxr > 15) ship.x += ship.velxr;
    game_Over(2);
  }

  function startGame2() {
    startedGame = true;
    interval = setInterval(update2, 1000 / 100);
    audio.play();
  }

  function restart2() {
    frames = 0;
    score = 0;
    impacts = 0;
    shots = 0;
    craters = [];
    enemies = [];
    skyEnemies1 = [];
    skyEnemies2 = [];
    shipRightBullets = [];
    shipUpBullets = [];
    skyEnemy1Bullets = [];
    skyEnemy2Bullets = [];
    finalEnemyBullets = [];
    ship.x = 440;
    ship.y = 300;
    audio.currentTime = 0;
    jump.src = "./sounds/jump.mp3";
    impact.src = "./sounds/impact.mp3";
    shooting.src = "./sounds/shot.mp3";
    dead.src = "./sounds/dead enemy.mp3";
    gOver.src = "./sounds/game over.mp3";
    gComplete.src = "./sounds/winner.mp3";
    startGame3();
  }

  function update3() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    ship.draw();
    healthBar.draw();
    ctx.fillStyle = "white";
    ctx.font = "13px pixelart";
    ctx.fillText("SCORE " + score, 40, 45);
    ctx.fillText("IMPACTS " + impacts, 270, 45);
    generateCraters();
    drawCraters();
    generateEnemies();
    drawEnemies();
    generateSkyEnemies();
    drawSkyEnemies();
    generateFinalEnemy();
    drawRightBullets();
    drawUpBullets();
    generateFinalEnemyBullet();
    drawFinalEnemyBullet();
    ship.velxl *= ship.friction;
    ship.velxr *= ship.friction;
    if (ship.x + ship.velxl < 880) ship.x += ship.velxl;
    if (ship.x - ship.velxr > 15) ship.x += ship.velxr;
    game_Over(3);
  }

  function startGame3() {
    startedGame = true;
    interval = setInterval(update3, 1000 / 100);
    audio.play();
    console.log(score);
  }

  document.getElementById("startButton").onclick = function() {
    startButton.setAttribute("class", "disp");
    start2Button.setAttribute("class", "disp");
    shipp.setAttribute("class", "disp");
    soundOn.removeAttribute("class", "disp");
    soundOn.setAttribute("class", "uk-icon-button");
    soundOff.removeAttribute("class", "disp");
    soundOff.setAttribute("class", "uk-icon-button");
    instructions.setAttribute("class", "disp");
    if (!interval) {
      startGame();
    }
  };

  document.getElementById("start2Button").onclick = function() {
    startButton.setAttribute("class", "disp");
    start2Button.setAttribute("class", "disp");
    shipp.setAttribute("class", "disp");
    soundOn.removeAttribute("class", "disp");
    soundOn.setAttribute("class", "uk-icon-button");
    soundOff.removeAttribute("class", "disp");
    soundOff.setAttribute("class", "uk-icon-button");
    instructions.setAttribute("class", "disp");
    if (!interval) {
      startGame2();
    }
  };

  document.getElementById("restartButton").onclick = function() {
    finalEnemy.visible = false;
    restartButton.setAttribute("class", "disp");
    main.setAttribute("class", "disp");
    soundOn.removeAttribute("class", "disp");
    soundOn.setAttribute("class", "uk-icon-button");
    soundOff.removeAttribute("class", "disp");
    soundOff.setAttribute("class", "uk-icon-button");
    if (!interval) {
      restart();
    }
  };

  document.getElementById("restart2Button").onclick = function() {
    finalEnemy.visible = false;
    restart2Button.setAttribute("class", "disp");
    main.setAttribute("class", "disp");
    soundOn.removeAttribute("class", "disp");
    soundOn.setAttribute("class", "uk-icon-button");
    soundOff.removeAttribute("class", "disp");
    soundOff.setAttribute("class", "uk-icon-button");
    if (!interval) {
      restart2();
    }
  };

  document.getElementById("main").onclick = function() {
    location.reload(true);
    localStorage.clear();
  };

  document.getElementById("soundOn").onclick = function() {
    soundOn.setAttribute("class", "disp");
    soundOff.removeAttribute("class", "disp");
    soundOff.setAttribute("class", "uk-icon-button");
    audio.pause();
    jump.src = undefined;
    impact.src = undefined;
    shooting.src = undefined;
    dead.src = undefined;
    gOver.src = undefined;
    gComplete.src = undefined;
  };

  document.getElementById("soundOff").onclick = function() {
    soundOff.setAttribute("class", "disp");
    soundOn.removeAttribute("class", "disp");
    soundOn.setAttribute("class", "uk-icon-button");
    audio.play();
    jump.src = "./sounds/jump.mp3";
    impact.src = "./sounds/impact.mp3";
    shooting.src = "./sounds/shot.mp3";
    dead.src = "./sounds/dead-enemy.mp3";
    gOver.src = "./sounds/game-over.mp3";
    gComplete.src = "./sounds/winner.mp3";
  };
};

addEventListener("keydown", function(event) {
  if (event.keyCode === 37) {
    if (ship.velxr < ship.speed) {
      ship.velxr--;
    }
  }
  if (event.keyCode === 39) {
    if (ship.velxl < ship.speed) {
      ship.velxl++;
    }
  }
  if (event.keyCode === 32 && ship.y >= 120) {
    ship.y -= 120;
    jump.play();
  }
  if (event.keyCode === 40) {
    shooting.play();
    shipRightBullets.push(new RightBullet(ship.x, ship.y));
  }
  if (event.keyCode === 38) {
    shooting.play();
    shipUpBullets.push(new UpBullet(ship.x, ship.y));
  }
});
