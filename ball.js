function Ball() {
    this.initialize.apply(this, arguments);
}
Ball.prototype = {
    size: 0,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    initialize: function (option) {
        this.size = option.size;
        this.x = option.x;
        this.y = option.y;
        this.dx = option.speed;
        this.dy = option.speed;
    },
    moveTest: function () {
        return {
            x: this.x + this.dx,
            y: this.y + this.dy
        };
    },
    move: function () {
        var pos = this.moveTest();
        if (pos.x < this.size || pos.x > game.cvs.width - this.size) {
            this.dx *= -1;
        }
        if (pos.y < this.size || pos.y > game.cvs.height - this.size) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
    },
    draw: function () {
        game.ctx.fillStyle = game.ball.color;
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        game.ctx.fill();
        game.ctx.closePath();
    }
};
