


document.addEventListener("DOMContentLoaded", function() {
    
    const board = document.getElementById("board");

    let currentPlayer = 'red';

    let selectedPiece = null;

    let availableMoves = [];

    let redScore = 0;

    let blackScore = 0;

    let timer; 

    const timerDisplay = document.getElementById("timer"); 

    const gameClock = 120000; 

    let gameStarted = false;

    

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
       
        const clickedCell = this;
        
        const isOccupied = clickedCell.classList.contains("occupied");
        
        const isAvailableMove = clickedCell.classList.contains("available-move");
        

        if (isOccupied && clickedCell.dataset.color === currentPlayer) {
            
                 selectPiece(clickedCell);

        } else if (isAvailableMove) {

            movePiece(clickedCell);

        } else {
            
            clearSelection();

            switchPlayer();
        }

           
    }

   
     function clearSelection() {
       
        if (selectedPiece) {
            
            selectedPiece.classList.remove("selected");

            selectedPiece = null;
        }

        availableMoves.forEach(move => {
           
            const cell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`);

            cell.classList.remove("available-move");

        });
        
        availableMoves = [];

     }

    
     function selectPiece(cell) {

        clearSelection();

        cell.classList.add("selected");

        selectedPiece = cell;

        calculateAvailableMoves(cell)

     }
     
    
    function movePiece(targetCell) {
       
        targetCell.appendChild(selectedPiece.querySelector(".piece"));
        
        selectedPiece.classList.remove("occupied");
        
        targetCell.classList.add("occupied");
        
        selectedPiece.removeAttribute("data-color");

        targetCell.dataset.color = currentPlayer;

       
        checkJumpedPieces(targetCell);

       
        if (targetCell !== selectedPiece && Math.abs(parseInt(targetCell.dataset.row) - parseInt(selectedPiece.dataset.row)) > 1) {

            if (currentPlayer === 'red') {
                blackScore++; 
            } else {
                redScore++; 
            }
            changeScore(); 
        }

        clearSelection();
       
    }

    
    function isValidMove(move) {
        
        const isValid = move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8 && !document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`).classList.contains("occupied");
        
        return isValid;

    }

    
    function calculateAvailableMoves(piece) {

        const row = parseInt(piece.dataset.row);

        const col = parseInt(piece.dataset.col);

        const direction = piece.dataset.color === 'red' ? -1 : 1;

        const opponentColor = piece.dataset.color === 'red' ? 'black' : 'red';

        availableMoves = [];

       
        const left = { row: row + direction, col: col - 1 };
       

        const right = { row: row + direction, col: col + 1 };
        

                       if (isValidMove(left)) {
            
                                availableMoves.push(left);
            
                                }

                        if (isValidMove(right)) {

                                availableMoves.push(right);
            
                                }

         
         const leftCapture = { row: row + (2 * direction), col: col - 2 }; 
       

         const rightCapture = { row: row + (2 * direction), col: col + 2 }; 
         

                         if (isValidCapture(leftCapture, opponentColor)) {
            
                            availableMoves.push(leftCapture);
            
                              } 
 
                        if (isValidCapture(rightCapture, opponentColor)) {
            
                            availableMoves.push(rightCapture);
            
                               } 

        
             highlightAvailableMoves();

    }
   

    
    function isValidCapture(move, opponentColor) {

        const currentRow = parseInt(selectedPiece.dataset.row);

        const currentCol = parseInt(selectedPiece.dataset.col);

        const jumpedRow = currentRow + (move.row - currentRow) / 2; 

        const jumpedCol = currentCol + (move.col - currentCol) / 2; 
        
      
        if (jumpedRow < 0 || jumpedRow >= 8 || jumpedCol < 0 || jumpedCol >= 8) {
            
            return false;
        }
    
        
        const jumpedCell = document.querySelector(`.cell[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`);

        if (!jumpedCell || !jumpedCell.classList.contains("occupied") || jumpedCell.dataset.color !== opponentColor) { 

            return false; 
        }
    
        
        const nextCell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`); 

        if (!nextCell || nextCell.classList.contains("occupied")) {
            return false; 
        } 
        return true;
    }


    function highlightAvailableMoves() {

        availableMoves.forEach(move => {

            const cell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`);
            cell.classList.add("available-move");
        });
    }

    function switchPlayer() {

        currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
        }
    

     function checkJumpedPieces(targetCell) {

        const currentRow = parseInt(selectedPiece.dataset.row);

        const currentCol = parseInt(selectedPiece.dataset.col);

        const targetRow = parseInt(targetCell.dataset.row);

        const targetCol = parseInt(targetCell.dataset.col);

        const jumpedRow = currentRow + (targetRow - currentRow) / 2;

        const jumpedCol = currentCol + (targetCol - currentCol) / 2;

        const jumpedCell = document.querySelector(`.cell[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`);

        if (jumpedCell && jumpedCell.classList.contains("occupied")) {

            jumpedCell.removeChild(jumpedCell.querySelector(".piece"));

            jumpedCell.classList.remove("occupied");

            jumpedCell.removeAttribute("data-color");
           } else {}
    }

   
    function changeScore() {

        document.getElementById('red-score').textContent = redScore;
        document.getElementById('black-score').textContent = blackScore;
    }


    function startTimer() {

        gameStarted = true;
        const startTime = Date.now();
        timer = setInterval(() => {

            const elapsedTime = Date.now() - startTime;
            const remainingTime = gameClock - elapsedTime;

            if (remainingTime <= 0) {
                clearInterval(timer);
                endGame();
            } else {
                updateTimerDisplay(remainingTime);
            }
        }, 1000);
    }

    
    
    function updateTimerDisplay(remainingTime) {

        const minutes = Math.floor(remainingTime / 60000);

        const seconds = Math.floor((remainingTime % 60000) / 1000);

        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

   
    board.addEventListener("click", function() {

        if (!gameStarted) {
            
            startTimer();
        }
        
    });


    function endGame() {

        clearInterval(timer);

        let winner;

             if (redScore > blackScore) {

                       winner = "Player 2 (Black)";

             } else if (blackScore > redScore) {

                      winner = "Player 1 (Red)";

                  }

        document.getElementById("winner").textContent = `Winner: ${winner}`;

    }


});


