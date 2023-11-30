let gameSquare = document.querySelector('.game-square')
let player = 'x';
const isWinner = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9],
]
for (let i = 1; i <= 9; i++) {
    gameSquare.innerHTML += `<div class='cell' pos=` + i + `></div>`;
}

let cells = document.querySelectorAll('.cell')

cells.forEach(cell => {
    cell.addEventListener('click', clickCell);
});
function clickCell() {
    let data = []
    if(!this.innerHTML) {
        this.innerHTML = player;
    } else {
        alert('Не туда!');
    }
    cells.forEach(cell => {
        if(cell.innerHTML == player){
            data.push(parseInt(cell.getAttribute('pos')));
        }
    })
    if (isWinner.includes(data)) {
        alert('Ура победа')
        console.log(data)
    }
}

player = player == 'x' ? 'o' : 'x';
