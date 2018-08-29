function Block() {
    this.initialize.apply(this, arguments);
}
Block.prototype = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    flag: true,
    initialize: function (option) {
        this.x = option.x;
        this.y = option.y;
        this.w = option.w;
        this.h = option.h;
    },
    draw: function () {
        if (this.flag) {
            game.ctx.fillStyle = game.block.color;
            game.ctx.fillRect(this.x, this.y, this.w, this.h);
            game.ctx.strokeStyle = game.block.strokeColor;
            game.ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
};

window.addEventListener('mousedown', function (e) {}, false);
window.addEventListener('mousemove', function (e) {
    var rect = e.target.getBoundingClientRect();
    game.pos.x = e.clientX - rect.left;
    game.pos.y = e.clientY - rect.top;
}, false);

function initBlocks() {
    var blocks = [];
    var col = game.block.col;
    var row = game.block.row;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            blocks[i * col + j] = new Block({
                x: 40 + j * 40,
                y: 40 + i * 20,
                w: 40,
                h: 20
            });
        }
    }
    return blocks;
}
