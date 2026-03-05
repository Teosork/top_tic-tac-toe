const GameBoard = {

    board: ["", "", "", "", "", "", "", "", ""],

    marker: function(index, symbol) {
        
        if (this.board[index] === "") {
            this.board[index] = symbol;
            return true;
        }
        return false;
    },

    checkWin: function(symbol) {

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => this.board[index] === symbol);
        });
    },

    checkDraw: function() {
   
        return !this.board.includes("");
    }
};

const createPlayer = (name, symbol) => {
    return { name, symbol };
};


const gameController = (function() {

    const players = [
    createPlayer('Player 1', 'X'),
    createPlayer('Player 2', 'O')
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        if (!GameBoard.marker(index, activePlayer.symbol)){
            console.log("Can't insert your symbol in this cell, It's already occupied.");
            return;
        }
        if (GameBoard.checkWin(activePlayer.symbol)){
            console.log(`${activePlayer.name} won the game!`);
            return;
        }
        if (GameBoard.checkDraw()){
            console.log("It's a tie game!");
            return;
        }
        switchPlayer();
        console.log(`Next turn: ${activePlayer.name}`);
    };

    return{ playRound, getActivePlayer };
})();