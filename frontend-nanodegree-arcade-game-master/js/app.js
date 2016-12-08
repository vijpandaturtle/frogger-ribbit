//var game = false;

//This is the character superclass.
var Character = function(x,y) {
  this.x = x;
  this.y = y;
};

//This is the enemy subclass and all its methods.
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    Character.call(this,x,y);
    this.speed = Math.random()*(230-50) + 50;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
//loop for setting limits to the enemy bugs.
    if (this.x > 505) {
      this.x = 0;
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This is the player subclass and all its methods.
var Player = function(sprite,x,y) {
this.sprite = sprite;
Character.call(this,x,y);
this.score = 0;
this.lives = 1;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if(this.y < 50) {
    this.renderWin();
  }
};

Player.prototype.update = function() {
if(this.x > 400 && this.x < 10) {
  this.reset();
}
if(this.y > 400 && this.y < 20) {
  this.reset();
}
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
  this.score = 0;
  this.lives = 1;
};

Player.prototype.handleInput = function(direction) {
if(direction=='left' && this.x > 20) {
this.x -= 101;
}
if(direction =='up' && this.y > 50) {
this.y -= 83;
}
if(direction =='right' && this.x < 400) {
this.x += 101;
}
if(direction =='down' && this.y < 390) {
this.y += 83;
}
};

Player.prototype.checkCollisions = function() {
  for(i=0; i<allEnemies.length; i++) {
    if(this.x < allEnemies[i].x + 60 && this.x + 60 > allEnemies[i].y
      && this.y < allEnemies[i].y + 60 && this.y + 60 > allEnemies[i].y ) {
        this.reset();
        };
      };
};

Player.prototype.renderScore = function() {
  ctx.font = "italic 20px Sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText("Score : "+ player.score ,1,30);
};

Player.prototype.renderWin = function() {
  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText("CONGRATULATIONS!!YOU DID GREAT!!",20,100);
};

Player.prototype.renderLives = function() {
  ctx.font = "italic 20px Sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText("Lives : "+ player.lives,300,30);
};

//This is the gem class and all its methods.
var Gem = function(x,y) {
  this.sprite = "images/Gem Green.png";
  Character.call(this,x,y);
};

Gem.prototype.render = function () {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
  this.x = Math.floor(Math.random()*20);
  this.y = Math.floor(Math.random()*100);
  player.score += 1;
};

Gem.prototype.checkCollisions = function() {
    if(this.x < player.x + 50 && this.x + 50 > player.x
      && this.y < player.y + 30 && this.y + 30 > player.y ) {
        gem.update();
        player.renderScore();
        };
};

//This is the heart class and all its methods.
var Heart = function(x,y) {
  this.sprite = "images/Heart.png";
  Character.call(this,x,y);
};

Heart.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Heart.prototype.update = function() {
  this.x = Math.floor(Math.random()*20);
  this.y = Math.floor(Math.random()*100);
  player.lives += 1;
};

Heart.prototype.checkCollisions = function() {
    if(this.x < player.x + 50 && this.x + 50 > player.x
      && this.y < player.y + 30 && this.y + 30 > player.y ) {
        heart.update();
        player.renderLives();
        };
};

//Instantiation of objects.
var player = new Player("images/char-boy.png",200,400);

var allEnemies = [
  new Enemy(50,150),
  new Enemy(50,225),
  new Enemy(200,50)
]

var gem = new Gem(50,150);

var heart = new Heart(200,225);

//Event listener for moving player.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Event listener for resetting player when enter button is pressed.
document.addEventListener('keypress',function(e) {
 if(13 == e.keyCode) {
   player.reset();
 }
});
