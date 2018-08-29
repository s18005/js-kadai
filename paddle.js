function Paddle() {
    this.initialize.apply(this, arguments);
}
Paddle.prototype = {
    size: 0,
    x: 0,
    y: 0,
    initialize: function (option) {
        this.size = option.size;
    },
    move: function (x, y) {
        this.x = x;
        this.y = y;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > game.cvs.width) {
            this.x = game.cvs.width;
        }
    },
    draw: function () {
        game.ctx.fillStyle = game.paddle.color;
        game.ctx.fillRect(this.x - (this.size / 2), this.y, this.size, 10);
    }
};
