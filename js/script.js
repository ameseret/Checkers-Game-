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
            
            if (currentPlayer === 'red') {
                calculateAvailableMoves(clickedCell);
            }

        } else if (isAvailableMove) {
            console.log('Moving piece...');
            movePiece(clickedCell);

        } 
        
        else {
            switchPlayer()
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

     // Function to select a piece
     function selectPiece(cell) {
        clearSelection();
        cell.classList.add("selected");
        selectedPiece = cell;
     }
     
     // Function to move the selected piece
    function movePiece(targetCell) {
        console.log('Moving piece...');
        console.log("Selected piece: ", selectedPiece);
        console.log("Target cell: ", targetCell);

        targetCell.appendChild(selectedPiece.querySelector(".piece"));
        console.log("Piece moved to target cell.");

        selectedPiece.classList.remove("occupied");
        console.log("Removing occupied class from selected piece.");

        targetCell.classList.add("occupied");
        console.log("Adding occupied class to target cell.");

        clearSelection();
       
    }

    // Function to check if a move is valid
    function isValidMove(move) {
        console.log("Checking validity of move:", move);
        const isValid = move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8
            && !document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`).classList.contains("occupied");
        
        console.log("Is move valid?", isValid);
        return isValid;
    }

    // Function to calculate available moves for the selected piece
    function calculateAvailableMoves(piece) {
        const row = parseInt(piece.dataset.row);
        const col = parseInt(piece.dataset.col);
        const direction = piece.dataset.color === 'red' ? -1 : 1;

        availableMoves = [];

        console.log("Calculating available moves for piece at row:", row, "and column:", col);

        const left = { row: row + direction, col: col - 1 };
        console.log("Checking left move:", left);

        const right = { row: row + direction, col: col + 1 };
        console.log("Checking right move:", right);

        if (isValidMove(left)) {
            availableMoves.push(left);
            console.log("Left move is valid and added to available moves.");

        }

        if (isValidMove(right)) {
            availableMoves.push(right);
            console.log("Right move is valid and added to available moves.");
        }

         
         const leftCapture = { row: row + (2 * direction), col: col - 2 }; 
         console.log("checking left capture:", leftCapture);

         const rightCapture = { row: row + (2 * direction), col: col + 2 }; 
         console.log("checking right capture:", rightCapture);

         if (isValidCapture(leftCapture, opponentColor)) {
             availableMoves.push(leftCapture);
             console.log("left capture is valid and added to available moves.");
         } 
 
         if (isValidCapture(rightCapture, opponentColor)) {
             availableMoves.push(rightCapture);
             console.log("right capture is valid and added to available moves.");
         } 

        



        highlightAvailableMoves();

    }
   

    // Function to check if a capture is valid
    function isValidCapture(move, opponentColor) {
        const currentRow = parseInt(selectedPiece.dataset.row);
        const currentCol = parseInt(selectedPiece.dataset.col);
        const jumpedRow = currentRow + (move.row - currentRow) / 2; 
        const jumpedCol = currentCol + (move.col - currentCol) / 2; 
        
        console.log("Current Row:", currentRow);
        console.log("Current Col:", currentCol);
        console.log("Jumped Row:", jumpedRow);
        console.log("Jumped Col:", jumpedCol);
    
        if (jumpedRow < 0 || jumpedRow >= 8 || jumpedCol < 0 || jumpedCol >= 8) {
            console.log("invalid jump");
            return false;
        }
    
        
        const jumpedCell = document.querySelector(`.cell[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`);
        if (!jumpedCell || !jumpedCell.classList.contains("occupied") || jumpedCell.dataset.color !== opponentColor) { 
            console.log("No opponent piece to jump over")
            return false; 
        }
    
        
        const nextCell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`); 
        if (!nextCell || nextCell.classList.contains("occupied")) {
            console.log("cell is occupied");
            return false; 
        } 
        console.log("valid capture");
        return true;
    }


    // Function to highlight available moves
    function highlightAvailableMoves() {
        availableMoves.forEach(move => {
            const cell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`);
            cell.classList.add("available-move");
        });
    }

    // Function to switch player turns
    function switchPlayer() {
        currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
        }
   

     
});


