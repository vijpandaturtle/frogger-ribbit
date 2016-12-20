var game = false;
//var currentSprite;

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
this.sprite = currentSprite;
Character.call(this,x,y);
this.score = 0;
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

//This is the gem class and all its methods.
var Gem = function(x,y) {
  this.sprite = "images/Gem Orange.png";
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
var Star = function(x,y) {
  this.sprite = "images/Star.png";
  Character.call(this,x,y);
};

Star.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.update = function() {
  this.x = Math.floor(Math.random()*20);
  this.y = Math.floor(Math.random()*100);
  player.score += 10;
};

Star.prototype.checkCollisions = function() {
    if(this.x < player.x + 50 && this.x + 50 > player.x
      && this.y < player.y + 30 && this.y + 30 > player.y ) {
        star.update();
        player.renderScore();
        };
};

//Instantiation of objects.
var player = new Player("images/char-boy.png",200,400);

var allEnemies = [
  new Enemy(50,150),
  new Enemy(50,225),
  new Enemy(200,50)
]

var gem = new Gem(100,150);

var star = new Star(200,225);

/*This function separates the functionality of the start screen from its render function.It is also easier to put all classes
and objects required for the game in one file.This function is called inside the renderStartScreen() function in engine.js*/
function funcStart() {
var Selector = function(x,y) {
this.sprite = "images/Selector.png";
this.x = x;
this.y = y;
}

Selector.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Selector.prototype.handleInput = function() {
if(pressedKey =='left' && this.x > 20) {
this.x -= 101;
}
if(pressedKey =='right' && this.x < 400) {
this.x += 101;
}
}

document.addEventListener('keyup', function(e) {
var pressedKey = window.pressedKey;
var allowedKey = {
    37: 'left',
    39: 'right',
    16: 'shift',
    13: 'enter'
};
window.pressedKey = allowedKey[e.keyCode];
console.log(pressedKey);
selector.handleInput(window.pressedKey);
});

var selector = new Selector(1,255);
selector.render();
}

/*var playerChoices = [
      'boy',
      'cat',
      'horn',
      'pink',
      'princess'
];*/

//var index = 0;

//Event listener for moving player.
document.addEventListener('keyup', function(e) {
  //console.log(e.keyCode);
  //var pressedKey;
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'return'
    };
    //pressedKey = allowedKeys[e.keyCode];
    //if(game) {
     player.handleInput(/*pressedKey*/);
   //} else {
    // console.log('Screen');
    //if(pressedKey === 'return') {
    //  console.log('Start Game');
      //game = !game;
    //}
    //if(pressedKey === 'right') {
      //console.log('Moving Right');
     //if(index + 1 > playerChoices.length) {
       //index = 0;
     //} else {
       //index++;
     //}
      //console.log(index);
      //currentSprite = 'images/char-' + playerChoices[index] + '-girl' + '.png';
      //player.sprite = currentSprite;
      //console.log(currentSprite);
//    }
//   }
});

//Event listener for resetting player when enter button is pressed.
document.addEventListener('keypress',function(e) {
 if(13 == e.keyCode) {
   player.reset();
 }
});
