var game = {
    ctx: null,
    time: 0,
    status: 'play',
    pos: {
        x: 0,
        y: 0
    },
    fps: 30,
    cvs: {
        width: 640,
        height: 480
    },
    block: {
        size: 5,
        speed: 5,
        x: 0,
        y: 0,
        row: 10,
        col: 14,
        color: '#00aa00',
        strokeColor: '#003300'
    },
    ball: {
        size: 5,
        speed: 5,
        x: 320,
        y: 240,
        color: '#dd0000'
    },
    paddle: {
        size: 50,
        color: '#00dd00'
    },
    background: {
        color: '#001100'
    },
    score: {
        point: 0,
        color: '#00aa00'
    }
};

function main() {
    var cvs = document.getElementById('sample');
    game.ctx = cvs.getContext('2d');
    var ball = new Ball({
        size: game.ball.size,
        x: 0,
        y: 0,
        speed: game.ball.speed
    });
    ball.x = game.ball.x;
    ball.y = game.ball.y;
    ball.dx = game.ball.speed;
    ball.dy = game.ball.speed * -1;
    var paddle = new Paddle({
        size: game.paddle.size
    });
    blocks = initBlocks();
    setInterval(function () {
        var col = game.block.col;
        var row = game.block.row;
        if (game.status != 'play') {
            game.ctx.fillStyle = game.background.color;
            game.ctx.fillRect(0, 0, game.cvs.width, game.cvs.height);
            game.ctx.fillStyle = '#aa0000';
            game.ctx.font = '60px "Arial Black"';
            if (game.status == 'gameover') {
                game.ctx.fillText('game over', 160, 230);
                game.ctx.fillText('score : ' + game.score.point, 160, 320);
            } else if (game.status == 'clear') {
                game.ctx.fillText('gameclear', 160, 230);
                game.ctx.fillText('score : ' + game.score.point, 160, 320);
            }
            return;
        }
        game.time++;
        game.ctx.clearRect(0, 0, game.cvs.width, game.cvs.height);
        game.ctx.fillStyle = '#001100';
        game.ctx.fillRect(0, 0, game.cvs.width, game.cvs.height);
        paddle.move(game.pos.x, game.cvs.height - 40);
        if (ball.y >= paddle.y - ball.size && ball.y <= paddle.y + ball.size && ball.x >= paddle.x - (paddle.size / 2) && ball.x <= paddle.x + (paddle.size / 2)) {
            ball.dy *= -1;
        }
        var pos = ball.moveTest();
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (blocks[i * col + j].flag) {
                    if (ball.x <= blocks[i * col + j].x && blocks[i * col + j].x <= pos.x && pos.y >= blocks[i * col + j].y && pos.y <= blocks[i * col + j].y + blocks[i * col + j].h) {
                        ball.dx *= -1;
                        blocks[i * col + j].flag = false;
                        game.score.point += 5;
                    }
                    if (pos.x <= blocks[i * col + j].x + blocks[i * col + j].w && blocks[i * col + j].x + blocks[i * col + j].w <= ball.x && pos.y >= blocks[i * col + j].y && pos.y <= blocks[i * col + j].y + blocks[i * col + j].h) {
                        ball.dx *= -1;
                        blocks[i * col + j].flag = false;
                        game.score.point += 5;
                    }
                    if (ball.y <= blocks[i * col + j].y && blocks[i * col + j].y <= pos.y && pos.x >= blocks[i * col + j].x && pos.x <= blocks[i * col + j].x + blocks[i * col + j].w) {
                        ball.dy *= -1;
                        blocks[i * col + j].flag = false;
                        game.score.point += 10;
                    }
                    if (pos.y <= blocks[i * col + j].y + blocks[i * col + j].h && blocks[i * col + j].y + blocks[i * col + j].h <= ball.y && pos.x >= blocks[i * col + j].x && pos.x <= blocks[i * col + j].x + blocks[i * col + j].w) {
                        ball.dy *= -1;
                        blocks[i * col + j].flag = false;
                        game.score.point += 1;
                    }
                }
            }
        }
        ball.move();
        if (ball.y >= game.cvs.height - ball.size) {
            game.status = 'gameover';
        }
        var flag = true;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (blocks[i * col + j].flag) {
                    flag = false;
                }
            }
        }
        if (flag) {
            game.status = 'clear';
        }
        paddle.draw();
        ball.draw();
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                blocks[i * col + j].draw();
            }
        }
        game.ctx.fillStyle = game.score.color;
        game.ctx.font = '30px "Arial Black"';
        game.ctx.fillText('score : ' + game.score.point, 10, game.cvs.height - 10);
    }, parseInt(1000 / game.fps));
}