var totalWidth = 5*101;
var totalHeight = 6*83;
var blockWidth = 101;
var blockHeight = 83;
var WidthblockMaxNum = 5;
var HeightblockMaxNum = 6;

// Enemies our player must avoid
var Enemy = function(AxisX, AxisY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = AxisX*101;
    this.y = AxisY*83;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if((this.x + dt*blockWidth) < 0)
        this.x = (this.x + dt*blockWidth)%totalWidth+totalWidth;
    else
        this.x = (this.x + dt*blockWidth)%totalWidth;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(character) {
    this.sprite = "images/char-"+character+".png";
    console.log(this.sprite);
    this.x = 2*blockWidth;
    this.y = 5*blockHeight;
};
Player.prototype.update = function() {
    if(this.y <= 0*blockHeight)
    {
        console.log('player wins!! Start a new game.');
        this.x = 2*blockWidth;
        this.y = 5*blockHeight;
        return;
    }
    for(i=0;i<allEnemies.length;i++)
    {
        //console.log('allEnemies['+ i +'].x='+allEnemies[i].x+', allEnemies['+ i +'].y='+allEnemies[i].y);
        if(this.y == allEnemies[i].y && 
           ((this.x > allEnemies[i].x && this.x < allEnemies[i].x + blockWidth) || (this.x + blockWidth > allEnemies[i].x && this.x + blockWidth < allEnemies[i].x + blockWidth)))
        {   
            console.log('player dies!! Restart the game.');
            this.x = 2*blockWidth;
            this.y = 5*blockHeight;
            break;
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0*blockWidth)
        this.x = this.x - blockWidth;
    else if(key === 'right' && this.x < (WidthblockMaxNum-1)*blockWidth)
        this.x = this.x + blockWidth;
    else if(key === 'up' && this.y > 0*blockHeight)
        this.y = this.y - blockHeight;
    else if(key === 'down' && this.y < (HeightblockMaxNum-1)*blockHeight)
        this.y = this.y + blockHeight;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0,1), new Enemy(0,2)];
var player = new Player("cat-girl");


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
