//  alert('checkers game')

document.addEventListener("DOMContentLoaded", function() {
    // constant variable that selects all the dark spaces
    const darkSpaces = document.querySelectorAll('.dark-space');

    // event listener added to each dark space
    darkSpaces.forEach(space => {
        space.addEventListener('click', function() {
            // the string shows in the console when the dark space is clicked on, so the event listener works
            console.log('dark space clicked');
        });
    });

    // constant variable that selects all the red pieces
    const redPieces = document.querySelectorAll('.red-piece');

    // event listener added to each red piece
    redPieces.forEach(piece => {
        piece.addEventListener('click', function() {
            // the string shows in the console when the red piece is clicked on along with the string attached with the .darkspace class
            console.log('red piece clicked');
        });
    });

    // constant variable that selects all black pieces
    const blackPieces = document.querySelectorAll('.black-piece');

    // event listener added to each black piece
    blackPieces.forEach(piece => {
        piece.addEventListener('click', function() {
            // the string shows in the console when the black piece is clicked on along with the string attached with the .darkspace class
            console.log('black piece clicked');
        });
    });
});

//All of the pieces and spaces that need to be active on the board for a checkers game are active when clicked on.
// The next step would be to get the peices moving properly on the board with actual checkers logic
