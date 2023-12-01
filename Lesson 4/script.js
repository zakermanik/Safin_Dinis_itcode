let gameMenu = document.querySelector('.menu__btns');
let playerXButton = document.querySelector('#playerX');
let playerOButton = document.querySelector('#playerЩ');
let PvEButton = document.querySelector('#PvE');
let PvPButton = document.querySelector('#PvP');
let infoPlayer = document.querySelector('#choosenPlayer')
let winPlayer = document.querySelector('#winPlayer')

let gameDiv = document.querySelector('.game')
let gameSquare = document.querySelector('.game-square')
let gameStop = document.querySelector('.game-stop')
gameStop.hidden = false;
PvPButton.style.boxShadow = '0 0 10px 10px #252cff79';
isComputerPlayer = false;

let reset = document.querySelector('#reset')

let player = 'X';
infoPlayer.innerHTML = player;
let winPos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
]
for (let i = 1; i <= 9; i++) {
    gameSquare.innerHTML += `<div class='cell' pos=` + i + `></div>`;
}

let cells = document.querySelectorAll('.cell')

gameSquare.addEventListener('click', item => {
    let cell = item.target;
    clickCell(cell)
})
gameMenu.addEventListener('click', item => {
    let choosenPlayer = item.target;
    gameStop.hidden = true;
    if (choosenPlayer.id === 'PvE') {
        isComputerPlayer = true;
        gameDiv.style.background = 'linear-gradient(rgb(255, 255, 255), #252cff79)';
        PvPButton.style.boxShadow = '0 0 0 0';
        PvEButton.style.boxShadow = '0 0 10px 10px #252cff79';
    } else if (choosenPlayer.id === 'PvP') {
        isComputerPlayer = false;
        gameDiv.style.background = 'white';
        PvEButton.style.boxShadow = '0 0 0 0';
        PvPButton.style.boxShadow = '0 0 10px 10px #252cff79';
    } else {
        choosePlayer(choosenPlayer.innerHTML);
        infoPlayer.innerHTML = choosenPlayer.innerHTML;
    }
    resetGame();
});

function choosePlayer(choosenPlayer) {
    // кто первый ходит
    player = choosenPlayer;
    resetGame();
}

function clickCell(cell) {
    // ход
    let data = []

    if (!cell.innerHTML) {
        cell.innerHTML = player;

        cells.forEach(cell => {
            if (cell.innerHTML == player) {
                data.push(parseInt(cell.getAttribute('pos')));
            }
        })

        if (isWinnig(data)) {
            winPlayer.innerHTML = 'Победу одержал игрок - ' + player;
            gameStop.hidden = false;
        } else if (isBoardFull()) {
            // Проверка на ничью
            winPlayer.innerHTML = 'Ничья!';
            gameStop.hidden = false;
        } else if (isComputerPlayer) {
            computerMove();
        }
        player = player == 'X' ? 'O' : 'X';

    } else {
        alert('Не туда!');
        return;
    }

}
function computerMove() {
    // логика хода компьютера(рандом)
    if (isComputerPlayer) {
        let emptyCells = Array.from(cells).filter(cell => !cell.innerHTML);
        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.innerHTML = player == 'X' ? 'O' : 'X';
            data.push(parseInt(randomCell.getAttribute('pos')));

            player = player == 'X' ? 'O' : 'X';
            if (isWinnig(data)) {
                winPlayer.innerHTML = 'Победу одержал компьютер!';
                gameStop.hidden = false;
            } else if (isBoardFull()) {
                winPlayer.innerHTML = 'Ничья!';
                gameStop.hidden = false;
            }
        }
    }
}
function isWinnig(data) {
    // проверка на выгрыщную комбинацию
    for (let i = 0; i < winPos.length; i++) {
        const winpos = winPos[i];
        if (winpos.every(pos => data.includes(pos))) {
            return true;
        }
    }
}
function isBoardFull() {
    // запонилось ли поле полностью
    return Array.from(cells).every(cell => cell.innerHTML);
}
function resetGame() {
    // начать заново
    data = [];
    cells.forEach(cell => {
        cell.innerHTML = ''
    })
    player = infoPlayer.innerHTML;
    infoPlayer.innerHTML = player;
    winPlayer.innerHTML = '';
    gameStop.hidden = true;
}

