// //  alert('checkers game')


document.addEventListener("DOMContentLoaded", function() {
    
    const board = document.getElementById("board");
   

    initializeBoard();

    function initializeBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("div");
                
                if ((row + col) % 2 === 0) {
                    cell.classList.add("light-space");
                } else {
                    cell.classList.add("dark-space");
                }
                cell.dataset.row = row;
                cell.dataset.col = col;
                board.appendChild(cell);
            }
        }
    }
    
});



