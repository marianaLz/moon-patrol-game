// Context
const context = canvas.getContext("2d");

// Sounds
const backgroundSound = new Audio("./sounds/background.mp3");
backgroundSound.loop = true;

const sounds = {
  jump: new Audio("./sounds/jump.mp3"),
  impact: new Audio("./sounds/impact.mp3"),
  shot: new Audio("./sounds/shot.mp3"),
  dead: new Audio("./sounds/dead.mp3"),
  lost: new Audio("./sounds/game-over.mp3"),
  won: new Audio("./sounds/game-complete.mp3"),
};

// Initial values
let interval;
let frames = 0;
let score = 0;
let impacts = 0;
let shots = 0;

// Classes
class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/background.png";
  }
  gameOver(variant) {
    clearInterval(interval);
    backgroundSound.pause();
    variant === "WON" ? sounds.won.play() : sounds.lost.play();
    variant === "WON"
      ? (endModalTitle.innerText = "¡VICTORY!")
      : (endModalTitle.innerText = "GAME OVER");
    endModalSubtitle.innerText = `YOUR SCORE ${score}`;
    UIkit.modal("#end-modal").show();
  }
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
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
  }
  draw() {
    this.image.src =
      impacts > 19
        ? "./images/health11.png"
        : impacts > 17
        ? "./images/health10.png"
        : impacts > 15
        ? "./images/health9.png"
        : impacts > 13
        ? "./images/health8.png"
        : impacts > 11
        ? "./images/health7.png"
        : impacts > 9
        ? "./images/health6.png"
        : impacts > 7
        ? "./images/health5.png"
        : impacts > 5
        ? "./images/health4.png"
        : impacts > 3
        ? "./images/health3.png"
        : impacts > 1
        ? "./images/health2.png"
        : "./images/health1.png";
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Ship {
  constructor() {
    this.image1 = new Image();
    this.image1.src = "./images/ship1.png";
    this.image2 = new Image();
    this.image2.src = "./images/ship2.png";
    this.image = this.image1;
    this.speed = 2;
    this.friction = 0.99;
    this.velxl = 0;
    this.velxr = 0;
    this.x = 440;
    this.y = 80;
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
    if (this.y < 434) this.y += 2;
    if (frames % 15 === 0) {
      this.image = this.image === this.image1 ? this.image2 : this.image1;
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Crater {
  constructor() {
    this.x = canvas.width;
    this.y = 500;
    this.width = 70;
    this.height = 20;
    this.image = new Image();
    this.image.src = "./images/crater.png";
  }
  draw() {
    if (frames % 10) this.x -= 5;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Enemy {
  constructor(x = canvas.width) {
    this.x = x;
    this.y = 460;
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    this.image2.src = "./images/finalEnemy2.png";
    this.image = this.image1;
    this.visible = false;
  }
  draw() {
    if (frames % 20 === 0) {
      this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
      this.image.src = "./images/skyEnemy1Bullet.png";
      this.width = 20;
      this.height = 8;
    }
    if (this.direction === "sky2") {
      this.image.src = "./images/skyEnemy2Bullet.png";
      this.width = 20;
      this.height = 8;
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const background = new Background();
const healthBar = new HealthBar();
const ship = new Ship();
const finalEnemy = new FinalEnemy();
const rightBullet = new RightBullet();
const upBullet = new UpBullet();
const enemybullet = new EnemyBullet();

let craters = [];
let enemies = [];
let skyEnemies1 = [];
let skyEnemies2 = [];
let shipRightBullets = [];
let shipUpBullets = [];
let skyEnemy1Bullets = [];
let skyEnemy2Bullets = [];
let finalEnemyBullets = [];

// Generate random number between min and max
const randomNum = (max, min) => Math.round(Math.random() * (max - min) + min);

// Generate and draw craters
const generateCraters = () => {
  if (frames <= 6000 && (frames % 80 === 0 || frames % 200 === 0)) {
    if (randomNum(0, 1) === 1) craters.push(new Crater());
  }
};
const drawCraters = () => {
  craters.forEach((crater, index) => {
    crater.draw();
    if (crater.x < -crater.width) {
      score += 20;
      return craters.splice(index, 1);
    }
    if (ship.collision(crater)) {
      sounds.impact.play();
      impacts++;
      return craters.splice(index, 1);
    }
  });
};

// Generate and draw enemies
const generateEnemies = () => {
  if (
    frames >= 800 &&
    frames <= 4000 &&
    (frames % 280 == 0 || frames % 1000 == 0)
  )
    enemies.push(new Enemy());
};
const drawEnemies = () => {
  enemies.forEach((enemy, index) => {
    if (enemy.x < -canvas.width) {
      return enemies.splice(index, 1);
    }
    enemy.draw();
    if (ship.collision(enemy)) {
      // const shock = new Shock(ship.x, ship.y);
      // shock.draw();
      sounds.impact.play();
      enemies.splice(index, 1);
      impacts++;
    }
  });
};

// Generate and draw sky enemies
const generateSkyEnemies = () => {
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
};
const drawSkyEnemies = () => {
  skyEnemies1.forEach((skyEnemy1, index) => {
    skyEnemy1.x += 1;
    if (skyEnemy1.x > canvas.width) {
      return skyEnemies1.splice(index, 1);
    }
    skyEnemy1.draw();
    if (ship.collision(skyEnemy1)) {
      let shock = new Shock(ship.x, ship.y);
      shock.draw();
      sounds.impact.play();
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
        sounds.impact.play();
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
      sounds.impact.play();
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
        sounds.impact.play();
        skyEnemy2Bullets.splice(i, 1);
        impacts++;
      }
    });
  });
};

// Generate and draw final enemy
const generateFinalEnemy = () => {
  if (frames >= 4000) {
    ship.x = 200;
    finalEnemy.draw();
    finalEnemy.visible = true;
  }
};

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
        sounds.dead.play();
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
        sounds.dead.play();
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
        sounds.dead.play();
        score += 50;
      }
    });
    if (finalEnemy.visible == true && rightBullet.collision(finalEnemy)) {
      shipRightBullets.splice(i, 1);
      sounds.dead.play();
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
        sounds.dead.play();
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
        sounds.dead.play();
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
      sounds.impact.play();
      finalEnemyBullets.splice(i, 1);
      impacts++;
    }
  });
}

const gameOver = () => {
  if (impacts > 20) background.gameOver("LOST");
  else if (shots > 30) {
    new Explosion(
      finalEnemy.x - 10,
      finalEnemy.y - 10,
      finalEnemy.width + 20,
      finalEnemy.height + 20
    ).draw();
    background.gameOver("WON");
  }
};

const update = () => {
  frames++;
  background.draw();
  ship.draw();
  healthBar.draw();
  context.fillStyle = "white";
  context.font = "13px pixelart";
  context.fillText("SCORE " + score, 40, 45);
  context.fillText("IMPACTS " + impacts, 270, 45);
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
  gameOver();
};

const startGame = () => {
  interval = setInterval(update, 1000 / 100);
  backgroundSound.play();
  mainScreen.setAttribute("class", "hidden");
  soundOn.setAttribute("class", "uk-icon-button");
};

const restartGame = () => {
  UIkit.modal("#end-modal").hide();
  soundOn.setAttribute("class", "uk-icon-button");
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
  backgroundSound.load();
  startGame();
};

// Event listeners

buttonStart.onclick = () => startGame();
buttonRestart.onclick = () => restartGame();
buttonMainMenu.onclick = () => location.reload(true);

soundOn.onclick = () => {
  soundOn.setAttribute("class", "hidden");
  soundOff.setAttribute("class", "uk-icon-button");
  backgroundSound.pause();
  Object.values(sounds).map((sound) => (sound.muted = true));
};

soundOff.onclick = () => {
  soundOff.setAttribute("class", "hidden");
  soundOn.setAttribute("class", "uk-icon-button");
  backgroundSound.play();
  Object.values(sounds).map((sound) => (sound.muted = false));
};

addEventListener("keydown", ({key}) => {
  if (key === "ArrowUp") {
    shipUpBullets.push(new UpBullet(ship.x, ship.y));
    sounds.shot.play();
  }
  if (key === "ArrowDown") {
    shipRightBullets.push(new RightBullet(ship.x, ship.y));
    sounds.shot.play();
  }

  if (key === "ArrowLeft") if (ship.velxr < ship.speed) ship.velxr--;
  if (key === "ArrowRight") if (ship.velxl < ship.speed) ship.velxl++;

  if (key === " " && ship.y >= 120) {
    ship.y -= 120;
    sounds.jump.play();
  }
});
