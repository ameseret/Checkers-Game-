// //  alert('checkers game')


document.addEventListener("DOMContentLoaded", function() {
    
    const board = document.getElementById("board");
    let currentPlayer = 'red';
    let selectedPiece = null;
    let availableMoves = [];
    

    initializeBoard();

    function initializeBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("div");
                
                cell.classList.add("cell");
                if ((row + col) % 2 === 0) {
                    cell.classList.add("light-space");
                } else {
                    cell.classList.add("dark-space");
                    if (row < 3) {
                        
                        cell.classList.add("occupied");
                        cell.dataset.color = 'black';
                        cell.appendChild(createPiece('black'));
                    } else if (row > 4) {
                        
                        cell.classList.add("occupied");
                        cell.dataset.color = 'red';
                        cell.appendChild(createPiece('red'));
                    }
                }
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", cellClicked);
                board.appendChild(cell);
            }
        }
    }

  
    function createPiece(color) {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.classList.add(color + "-piece");
        return piece;
    }

    function cellClicked() {
        console.log('Cell clicked!');
        const clickedCell = this;
        console.log('Clicked cell:', clickedCell);

        const isOccupied = clickedCell.classList.contains("occupied");
        console.log('Is occupied:', isOccupied);

        const isAvailableMove = clickedCell.classList.contains("available-move");
        console.log('Is available move:', isAvailableMove);

        if (isOccupied && clickedCell.dataset.color === currentPlayer) {
            console.log('Selecting piece...');

            selectPiece(clickedCell);
        } else if (isAvailableMove) {
            console.log('Moving piece...');
            movePiece(clickedCell);
        } else {
            console.log('Clearing selection...');
            clearSelection();
        }
    }

     // Function to clear piece selection and available moves
     function clearSelection() {
        console.log('Clearing selection...')
        if (selectedPiece) {
            console.log("Removing 'selected' class from selected piece...");
            selectedPiece.classList.remove("selected");
            selectedPiece = null;
        }
        availableMoves.forEach(move => {
            console.log(`Removing 'available-move' class from cell at row ${move.row} and column ${move.col}...`);
            const cell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`);
            cell.classList.remove("available-move");
        });
        console.log("Resetting available moves...");
        availableMoves = [];
    }


});


