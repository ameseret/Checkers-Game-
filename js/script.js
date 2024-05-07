// //  alert('checkers game')


document.addEventListener("DOMContentLoaded", function() {
    const darkSpaces = document.querySelectorAll(".dark-space");

    darkSpaces.forEach(space => {
        space.addEventListener("click", function() {
            if (!space.querySelector(".black-piece") && !space.querySelector(".red-piece")) {
                const selectedPiece = document.querySelector(".selected");
                if (selectedPiece) {
                    space.appendChild(selectedPiece);
                    selectedPiece.classList.remove("selected");
                }
            }
        });
    });

    const pieces = document.querySelectorAll(".black-piece, .red-piece");
    pieces.forEach(piece => {
        piece.addEventListener("click", function() {
            piece.classList.toggle("selected");
        });
    });
});

//console logs deleted after debugging event listeners 
//event listeners reconstructed 
//pieces can now move on the checkers board
//the next step would be to figure out how to add checkers game logic to the movement of the pieces
