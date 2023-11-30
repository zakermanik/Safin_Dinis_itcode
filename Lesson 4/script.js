let gameSquare = document.querySelector('.game-square')
let reset = document.querySelector('#reset')

let player = 'X';

const winPos = [
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

// cells.forEach(cell => {
//     cell.addEventListener('click', clickCell);
// });

function clickCell(cell) {
    let data = []

    if (!cell.innerHTML) {
        cell.innerHTML = player;
    } else {
        alert('Не туда!');
        return;
    }
    // debugger
    cells.forEach(cell => {
        if (cell.innerHTML == player) {
            data.push(parseInt(cell.getAttribute('pos')));
        }
    })
    
    console.log(data, 'клик')
    
    // if (winPos.includes(data)) {
    //     // alert('Ура победа')
    // }
    player = player == 'X' ? 'O' : 'X';
}
function isWinnig() {
    winPos.forEach(winpos => {
        console.log(winpos)
        if (winpos == data) {
            console.log(data, 'ура победа')

        }
    })
}
function resetGame() {
    data = [];
    cells.forEach(cell => {
        cell.innerHTML = ''
    })
    player = player == 'X' ? 'O' : 'X';
}

