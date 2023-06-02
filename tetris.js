const canvas = document.getElementById("tetris");
const canvas1 = document.getElementById("tetris1");
const context = canvas.getContext("2d");
const context1 = canvas1.getContext("2d");

const colors = [
    null,
    "#00BFFF",
    "#00FF00",
    "#FF1493",
    "#FFFF00",
    "#EE82EE",
    "#0000FF",
    "#FAFAD2",
];

const colors1 = [
    null,
    "#FF007F",
    "#00FFFF",
    "#00FF7F",
    "#FF00FF",
    "#FFA500",
    "#FFFF00",
    "#0000FF",
];

const espaco = criarMatriz(12, 20);
const jogador = {
    pos: { x: 0, y: 0 },
    matriz: null,
    score: 0,
};

const espaco1 = criarMatriz1(12, 20);
const jogador1 = {
    pos1: { x: 0, y: 0 },
    matriz1: null,
    score1: 0,
};

context.scale(20, 20);
context1.scale(20, 20);


function limpaEspaco() {
    let contaLinhas = 1;
    outer: for (let y = espaco.length - 1; y > 0; --y) {
        for (let x = 0; x < espaco[y].length; ++x) {
            if (espaco[y][x] === 0) {
                continue outer;
            }
        }
        const linha = espaco.splice(y, 1)[0].fill(0);
        espaco.unshift(linha);
        ++y;
        jogador.score += contaLinhas * 10;
        contaLinhas *= 2;
    }
}

function limpaEspaco1() {
    let contaLinhas1 = 1;
    outer: for (let y = espaco1.length - 1; y > 0; --y) {
        for (let x = 0; x < espaco1[y].length; ++x) {
            if (espaco1[y][x] === 0) {
                continue outer;
            }
        }
        const linha1 = espaco1.splice(y, 1)[0].fill(0);
        espaco1.unshift(linha1);
        ++y;
        jogador1.score1 += contaLinhas1 * 10;
        contaLinhas1 *= 2;
    }
}

function colisao(espaco, jogador) {
    const m = jogador.matriz;
    const o = jogador.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (espaco[y + o.y] && espaco[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function colisao1(espaco1, jogador1) {
    const m1 = jogador1.matriz1;
    const o1 = jogador1.pos1;
    for (let y = 0; y < m1.length; ++y) {
        for (let x = 0; x < m1[y].length; ++x) {
            if (m1[y][x] !== 0 && (espaco1[y + o1.y] && espaco1[y + o1.y][x + o1.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function criarMatriz(w, h) {
    const matriz = [];
    while (h--) {
        matriz.push(new Array(w).fill(0));
    }
    return matriz;
}

function criarMatriz1(w1, h1) {
    const matriz1 = [];
    while (h1--) {
        matriz1.push(new Array(w1).fill(0));
    }
    return matriz1;
}

function criarPeca(tipo) {
    if (tipo === "I") {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (tipo === "L") {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (tipo === "J") {
        return [
            [0, 3, 3],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (tipo === "O") {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (tipo === "Z") {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (tipo === "S") {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (tipo === "T") {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

function desenhaMatriz(matriz, desvio) {
    matriz.forEach((linha, y) => {
        linha.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + desvio.x, y + desvio.y, 1, 1);
            }
        });
    });
}

function desenhaMatriz1(matriz1, desvio1) {
    matriz1.forEach((linha1, y) => {
        linha1.forEach((value1, x) => {
            if (value1 !== 0) {
                context1.fillStyle = colors1[value1];
                context1.fillRect(x + desvio1.x, y + desvio1.y, 1, 1);
            }
        });
    });
}


function desenha() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    desenhaMatriz(espaco, { x: 0, y: 0 });
    desenhaMatriz(jogador.matriz, jogador.pos);
}

function desenha1() {
    context1.fillStyle = "#000";
    context1.fillRect(0, 0, canvas1.width, canvas1.height);
    desenhaMatriz1(espaco1, { x: 0, y: 0 });
    desenhaMatriz1(jogador1.matriz1, jogador1.pos1);
}


function juntar(espaco, jogador) {
    jogador.matriz.forEach((linha, y) => {
        linha.forEach((value, x) => {
            if (value !== 0) {
                espaco[y + jogador.pos.y][x + jogador.pos.x] = value;
            }
        });
    });
}

function juntar1(espaco1, jogador1) {
    jogador1.matriz1.forEach((linha1, y) => {
        linha1.forEach((value1, x) => {
            if (value1 !== 0) {
                espaco1[y + jogador1.pos1.y][x + jogador1.pos1.x] = value1;
            }
        });
    });
}

function rotacao(matriz, dir) {
    for (let y = 0; y < matriz.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matriz[x][y], matriz[y][x]] = [matriz[y][x], matriz[x][y]];
        }
    }
    if (dir > 0) {
        matriz.forEach((linha) => linha.reverse());
    } else {
        matriz.reverse();
    }
}

function rotacao1(matriz1, dir1) {
    for (let y = 0; y < matriz1.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matriz1[x][y], matriz1[y][x]] = [matriz1[y][x], matriz1[x][y]];
        }
    }
    if (dir1 > 0) {
        matriz1.forEach((linha1) => linha1.reverse());
    } else {
        matriz1.reverse();
    }
}

function dropJogador() {
    jogador.pos.y++;
    if (colisao(espaco, jogador)) {
        jogador.pos.y--;
        juntar(espaco, jogador);
        resetaJogador();
        limpaEspaco();
        updateScore();
    }
    dropCounter = 0;
}

function dropJogador1() {
    jogador1.pos1.y++;
    if (colisao1(espaco1, jogador1)) {
        jogador1.pos1.y--;
        juntar1(espaco1, jogador1);
        resetaJogador1();
        limpaEspaco1();
        updateScore1();
    }
    dropCounter1 = 0;
}

function moverJogador(desvio) {
    jogador.pos.x += desvio;
    if (colisao(espaco, jogador)) {
        jogador.pos.x -= desvio;
    }
}

function moverJogador1(desvio1) {
    jogador1.pos1.x += desvio1;
    if (colisao1(espaco1, jogador1)) {
        jogador1.pos1.x -= desvio1;
    }
}

function resetaJogador() {
    const pecas = "TJLOSZI";
    jogador.matriz = criarPeca(pecas[(pecas.length * Math.random()) | 0]);
    jogador.pos.y = 0;
    jogador.pos.x = ((espaco[0].length / 2) | 0) - ((jogador.matriz[0].length / 2) | 0);
    if (colisao(espaco, jogador)) {
        espaco.forEach((linha) => linha.fill(0));
        jogador.score = 0;
        updateScore();
    }
}

function resetaJogador1() {
    const pecas1 = "TJLOSZI";
    jogador1.matriz1 = criarPeca(pecas1[(pecas1.length * Math.random()) | 0]);
    jogador1.pos1.y = 0;
    jogador1.pos1.x = ((espaco1[0].length / 2) | 0) - ((jogador1.matriz1[0].length / 2) | 0);
    if (colisao1(espaco1, jogador1)) {
        espaco1.forEach((linha1) => linha1.fill(0));
        jogador1.score1 = 0;
        updateScore1();
    }
}

function rotacaoJogador(dir) {
    const pos = jogador.pos.x;
    let desvio = 1;
    rotacao(jogador.matriz, dir);
    while (colisao(espaco, jogador)) {
        jogador.pos.x += desvio;
        desvio = -(desvio + (desvio > 0 ? 1 : -1));
        if (desvio > jogador.matriz[0].length) {
            rotacao(jogador.matriz, -dir);
            jogador.pos.x = pos;
            return;
        }
    }
}

function rotacaoJogador1(dir1) {
    const pos1 = jogador1.pos1.x;
    let desvio1 = 1;
    rotacao1(jogador1.matriz1, dir1);
    while (colisao1(espaco1, jogador1)) {
        jogador1.pos1.x += desvio1;
        desvio1 = -(desvio1 + (desvio1 > 0 ? 1 : -1));
        if (desvio1 > jogador1.matriz1[0].length) {
            rotacao1(jogador1.matriz1, -dir1);
            jogador1.pos1.x = pos1;
            return;
        }
    }
}
let dropCounter = 0;
let dropInterval = 1000;
let ultTempo = 0;

let dropCounter1 = 0;
let dropInterval1 = 1000;
let ultTempo1 = 0;

function update(tempo = 0) {
    const deltaTempo = tempo - ultTempo;
    dropCounter += deltaTempo;
    if (dropCounter > dropInterval) {
        dropJogador();
    }  
    ultTempo = tempo;
    desenha();
    requestAnimationFrame(update);
}

function update1(tempo1 = 0) {
    const deltaTempo1 = tempo1 - ultTempo1;
    dropCounter1 += deltaTempo1;
    if (dropCounter1 > dropInterval1) {
        dropJogador1();
    }  
    ultTempo1 = tempo1;
    desenha1();
    requestAnimationFrame(update1);
}

function updateScore() {
    document.getElementById("score").innerText = "Score - Player 1: " + jogador.score;
}

function updateScore1() {
    document.getElementById("score1").innerText = "Score - Player 2: " + jogador1.score1;
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 65) {
        moverJogador(-1);
    } else if (event.keyCode === 68) {
        moverJogador(1);
    } else if (event.keyCode === 83) {
        dropJogador();
    } else if (event.keyCode === 87) {
        rotacaoJogador(-1);
    } else if (event.keyCode === 69) {
        rotacaoJogador(1);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) {
        moverJogador1(-1);
    } else if (event.keyCode === 39) {
        moverJogador1(1);
    } else if (event.keyCode === 40) {
        dropJogador1();
    } else if (event.keyCode === 75) {
        rotacaoJogador1(-1);
    } else if (event.keyCode === 76) {
        rotacaoJogador1(1);
    }
});

function gameOver() {
    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.style.display = "block";
  
    const playAgainButton = document.getElementById("play-again-button");
    playAgainButton.addEventListener("click", () => {
      gameOverMessage.style.display = "none";
      resetaJogador();
      updateScore();
    });
  }

resetaJogador();
updateScore();
update();  

resetaJogador1();
updateScore1();
update1();  