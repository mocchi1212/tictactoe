const socket = io();
let myMarker = ''; // 自分のマーカー（'X' または 'O'）

socket.on('matchFound', (data) => {
    myMarker = data.marker;
    // マッチング完了の処理、例えばUIの更新など
    console.log(`あなたは ${myMarker} です。`);
});

socket.on('waitingForOpponent', () => {
    console.log('対戦相手を待っています...');
});

socket.on('moveMade', (data) => {
    // 相手が動かした後の処理
    const cell = document.querySelector(`[data-cell-index="${data.index}"]`);
    cell.textContent = data.player;
    cell.removeEventListener('click', handleCellClick);
});

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const cellIndex = this.getAttribute('data-cell-index');

    if (this.textContent === '' && myMarker !== '') {
        this.textContent = myMarker;
        socket.emit('makeMove', {
            index: cellIndex,
            player: myMarker
        });
    }
}
