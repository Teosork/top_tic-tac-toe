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
    },

    reset: function() {
    this.board = ["", "", "", "", "", "", "", "", ""];
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

    const setNames = (name1, name2) => {
    players[0].name = name1 || "Player 1";
    players[1].name = name2 || "Player 2";
    };

    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        if (gameOver) return;
        if (!GameBoard.marker(index, activePlayer.symbol)){
            return "Can't insert your symbol in this cell, It's already occupied.";
        }
        if (GameBoard.checkWin(activePlayer.symbol)){
            gameOver = true;
            return `${activePlayer.name} won the game!`;
        }
        if (GameBoard.checkDraw()){
            gameOver = true;
            return "It's a tie game!";
        }
        switchPlayer();
        return null;
    };

    const resetGame = () => {
    GameBoard.reset();
    activePlayer = players[0];
    gameOver = false;
    };

    return{ playRound, getActivePlayer, resetGame, setNames };
})();

const displayController = (function(){
    const squares = document.querySelectorAll('.square');
    const statusDiv = document.querySelector('#status');
    const resetBtn = document.querySelector('#reset-btn');
    const startBtn = document.querySelector('#start-btn');
    const winnerDisplay = document.querySelector('#winner-display');

    startBtn.addEventListener('click', () => {
    const n1 = document.querySelector('#p1-name').value;
    const n2 = document.querySelector('#p2-name').value;
    
    gameController.setNames(n1, n2);
    document.querySelector('#setup-container').style.display = 'none';
    updateScreen();
    });

    const updateScreen = (message) => {
        const board = GameBoard.board;
        squares.forEach((square, index) => {
            square.textContent = board[index];
        });
        statusDiv.textContent = message ? "" : `The turn of: ${gameController.getActivePlayer().name}`;
    };

    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const result = gameController.playRound(index);

            if (result) {
            winnerDisplay.textContent = result;
        }
            updateScreen(result);
        });
    });
    resetBtn.addEventListener('click', () => {
        gameController.resetGame();
        winnerDisplay.textContent = "";
        updateScreen();
    });

    return {updateScreen};
})();