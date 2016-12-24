var game = false;//Global variable to hold the game state.
var currentSprite = window.currentSprite;//Global variable to hold the char selection.

/*This is the character superclass.In this particular contect this superclass is defined as having x and y properties so that these can
 *be shared by all the other subclasses.It proves to be quite useful when there are several properties to be shared across multiple *subclasses.*/
var Character = function(x,y) {
  this.x = x;
  this.y = y;
};

//This is the enemy subclass and all its methods.
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
  /*This method is used to share properties of the superclass and subclass.In this case we are sharing the x and y
  * properties of the superclass character with the subclasses.Character.call() method is also used in the player,gem and start classes.*/
    Character.call(this,x,y);
    this.speed = Math.random()*(230-50) + 50;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
//loop for setting limits to the enemy bugs.
    if (this.x > 505) {
      this.x = 0;
    }
};

/*This function is used to render the image of the enemy object(bug) on the screen.This function is saved as a method
*of the prototype object of the enemy class so that every instance of this class can share these methods and also save memory.
*The same technique of defining methods in the prototypal class/object can be observed in all of the classes that are defined in this file.*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This is the player subclass and all its methods.
var Player = function(x,y) {
this.sprite = window.currentSprite;
Character.call(this,x,y);
this.score = 0;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if(this.y < 50) {
    this.renderWin();
  }
};

//Prevents the player from moving out of the game canvas.
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

/*This method is used to define the movement of the player according to the keys pressed by the user which are defined in the event listener
 *right before the funcStart() function.This function is also called inside of the same event listener.*/
Player.prototype.handleInput = function(direction) {
if(direction=='left' && this.x > 20) {
this.x -= 101;
console.log(this.x,this.y);
}
if(direction =='up' && this.y > 50) {
this.y -= 83;
console.log(this.y);

}
if(direction =='right' && this.x < 400) {
this.x += 101;
console.log(this.x);
}
if(direction =='down' && this.y < 390) {
this.y += 83;
console.log(this.y);
}
};

/*This method logically detects collisions that happens between the player object and any other object on the screen (in this case it is  th *the enemy object) and resets the player once the condition is satisfied.*/
Player.prototype.checkCollisions = function() {
  for(i=0; i<allEnemies.length; i++) {
    if(this.x < allEnemies[i].x + 60 && this.x + 60 > allEnemies[i].y && this.y < allEnemies[i].y + 60 && this.y + 60 > allEnemies[i].y ) {
        this.reset();
        this.renderScore();
        }
      }
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
  window.setTimeout(player.reset(),1000);
};

//This is the gem class and all its methods.This class is used to create the gem object on the game screen.
var Gem = function(x,y) {
  this.sprite = "images/Gem Orange.png";
  Character.call(this,x,y);
};

Gem.prototype.render = function () {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*This function method changes the x and y coordinates of the game object randomly after each successive collision.It also updates the score *of the player.A similar method is used in the Star class.*/
Gem.prototype.update = function() {
  this.x = Math.floor(Math.random()*101); //The math random function generates aand arbitrary value between 0 and 1.
  this.y = Math.floor(Math.random()*83);
  player.score += 1;
};

Gem.prototype.checkCollisions = function() {
    if(this.x < player.x + 50 && this.x + 50 > player.x && this.y < player.y + 30 && this.y + 30 > player.y ) {
        gem.update();
        player.renderScore();
    }
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
  this.x = Math.floor(Math.random()*101);
  this.y = Math.floor(Math.random()*83);
  player.score += 10;
};

Star.prototype.checkCollisions = function() {
 if(this.x < player.x + 50 && this.x + 50 > player.x && this.y < player.y + 30 && this.y + 30 > player.y ) {
        star.update();
        player.renderScore();
        }
};

//Instantiation of objects.
var player = new Player(200,400);

var allEnemies = [
  new Enemy(50,150),
  new Enemy(50,225),
  new Enemy(200,50)
];

var gem = new Gem(100,150);

var star = new Star(200,225);

var allowedKeys = {};//Global object to hold the allowed keys.Being in the global scope makes it easier for other functions to access this object.
//Event listener for moving player.
document.addEventListener('keyup',function(e) {
allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
        32: 'return',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4'
      };
    var pressedKey = window.pressedKey; //Global variable to hold the keycode of the key that is pressed.
    window.pressedKey = allowedKeys[e.keyCode];
    player.handleInput(allowedKeys[e.keyCode]);
});

/*This function separates the functionality of the start screen from its render function.It is also easier to put all classes
and objects required for the game in one file.This function is called inside the renderStartScreen() function in engine.js*/
function funcStart() {

  var playerChoices = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ];

  player.sprite = currentSprite;

  switch(window.pressedKey) {
    case '0':
    currentSprite = playerChoices[0];
     break;
    case '1':
    currentSprite = playerChoices[1];
     break;
    case '2':
    currentSprite = playerChoices[2];
     break;
    case '3':
    currentSprite = playerChoices[3];
   break;
    case '4':
    currentSprite = playerChoices[4];
     break;
    case 'return':
    game = true;
     break;
  }
}
//Event listener for resetting player when enter button is pressed.
document.addEventListener('keypress',function(e) {
 if(13 == e.keyCode) {
   player.reset();
 }
});
