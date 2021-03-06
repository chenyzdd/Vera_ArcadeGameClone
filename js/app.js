
var CELL_WIDTH = 101;
var CELL_HEIGHT = 83;
var TOP_BORDER = 55;
// 这是我们的玩家要躲避的敌人
var Enemy = function(y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 游戏开始时，甲壳虫随机出现的位置，以及以不同的速度移动
    this.x = CELL_HEIGHT *(Math.floor(Math.random() * 10) % 3) + 60;
    this.y = y;
    this.speed = Math.floor(Math.random()*100)+50;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以随机的速度运行的
    this.x += dt * this.speed;

    if(this.x >= CELL_WIDTH * 5) {
        this.x = - CELL_WIDTH;  //超出最右边，甲壳虫重新从左边进入
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {
    this.x = CELL_WIDTH * 2;
    this.y = CELL_HEIGHT * 4 + TOP_BORDER;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'left' : this.x -= CELL_WIDTH; break;
        case 'right' : this.x += CELL_WIDTH; break;
        case 'up' : this.y -= CELL_HEIGHT; break;
        case 'down' : this.y += CELL_HEIGHT; break;
    }
    if(this.x > CELL_WIDTH * 4) {
        this.x = CELL_WIDTH * 4;
    }else if(this.x < 0){
        this.x = 0;
    }
    if(this.y < TOP_BORDER) {
        alert("Congratulations,you win!")
       player.update();
    } else if(this.y >= 470){
        this.y = CELL_HEIGHT * 4 + TOP_BORDER;
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [
    new Enemy(CELL_HEIGHT * 0 + TOP_BORDER),
    new Enemy(CELL_HEIGHT * 1 + TOP_BORDER),
    new Enemy(CELL_HEIGHT * 2 + TOP_BORDER)
]

var player = new Player(CELL_WIDTH * 2, CELL_HEIGHT * 4 + TOP_BORDER)

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

