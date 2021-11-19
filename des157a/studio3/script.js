(function() {
    'use strict';
    console.log("reading js...");
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');

    var gameData = {
        dice: ['./images/1die.jpg', './images/2die.jpg', './images/3die.jpg', './images/4die.jpg', './images/5die.jpg', './images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [50, 50],
        roll1: 0,
        roll2: 0,
        rollSumA: 0,
        rollSumB: 0,
        actionA: "",
        actionB: "",
        currentTurn: 0,
        turnPhase: 0,
        turnCount: 1,
        gameEnd: 0
    }

    startGame.addEventListener("click", function() {
        //gameData.index = Math.round(Math.random());

        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

        document.getElementById('quit').addEventListener("click", function() {
            location.reload();
        })

        score.innerHTML = `<p>The score is currently <br/><strong>${gameData.players[0]}: ${gameData.score[0]}</strong>
                 <br/><strong>${gameData.players[1]}:${gameData.score[1]}</strong></p>`;

        // setting up turn
        setUpTurn();
    })

    function setUpTurn() {
        game.textContent = `Player 1 has ${gameData.score[0]} health, Player 2 has ${gameData.score[1]} health.`;
        game.textContent += ` It is currently ${gameData.players[gameData.currentTurn]}'s turn.`;

        actionArea.innerHTML = '<button id="scratch">Scratch</button><button id="defend">Defend</button>';

        // Clicked scratch
        document.getElementById('scratch').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "scratch" : gameData.actionA = "scratch";

            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })

        document.getElementById('defend').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "defend" : gameData.actionA = "defend";
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })
    }

    function checkTurnPhase() {
        if (gameData.turnPhase == 0) {
            gameData.turnPhase += 1;
        } else {
            console.log("end of turn");
            executeTurn();
            gameData.turnPhase = 0;
        }
    }

    function executeTurn() {
        // Rolling
        roll(0);
        roll(1);
        let scoreA = gameData.rollSumA;
        let scoreB = gameData.rollSumB;

        console.log(`${gameData.actionA} ${gameData.actionB}`);
        let winner = getDiceWinner();
        if (winner != 'TIE') {
            performAction(winner);
            score.innerHTML = `<p>The score is currently <br/><strong>${gameData.players[0]}: ${gameData.score[0]}</strong>
            <br/><strong>${gameData.players[1]}: ${gameData.score[1]}</strong></p>`;
            gameData.actionA == gameData.actionB && gameData.actionA == "defend" ? 
            score.innerHTML += `<p>Turn ${gameData.turnCount}: Both defended! Nothing happened!</p>` : 
            score.innerHTML += `<p>Turn ${gameData.turnCount}: Player ${winner} wins the turn. </p>`;
        } else {
            score.innerHTML = `<p>The score is currently <br/><strong>${gameData.players[0]}: ${gameData.score[0]}</strong>
            <br/><strong>${gameData.players[1]}: ${gameData.score[1]}</strong></p>`;
            gameData.actionA == gameData.actionB && gameData.actionA == "defend" ? 
            score.innerHTML += `<p>Turn ${gameData.turnCount}: Both defended! Nothing happened!</p>` : 
            score.innerHTML += `<p>Turn ${gameData.turnCount}: It was a TIE! </p>`;
        }

        // Turn count increment.
        gameData.turnCount += 1;

        // Check winning condition
        checkWinningCondition();
    }

    function getDiceWinner() {
        let rollA = gameData.rollSumA;
        let rollB = gameData.rollSumB;
       // Determining who wins the turn
        if (rollA == rollB) {
            return 'TIE';
            //winnerMsg = "It's a draw!!"
        } else if (rollA > rollB) {
            return 'A';
            //winnerMsg = `Player 1 beats Player 2 this turn with a scratch of ${scoreA}!`;
            //gameData.score[1] -= scoreA;
        } else {
            return 'B';
            //winnerMsg = `Player 2 beats Player 1 this turn with a scratch of ${scoreB}!`;
            //gameData.score[0] -= scoreB;
        }
    }

    function performAction(winner) {
        if (winner == 'A') {
            gameData.actionA == "scratch" ? gameData.score[1] -= gameData.rollSumA : gameData.score[0] += (gameData.rollSumA - gameData.rollSumB);
        } else if (winner == 'B') {
            gameData.actionB == "scratch" ? gameData.score[0] -= gameData.rollSumB : gameData.score[1] += (gameData.rollSumB - gameData.rollSumA);
        }
    }


    function roll(num) {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        if (num == 0) {
            gameData.rollSumA = gameData.roll1 + gameData.roll2;
        } else {
            gameData.rollSumB = gameData.roll1 + gameData.roll2;
        }
    }

    /*
    function changeDiceImages() {
        //game.innerHTML = `<p>${gameData.players[gameData.index]}, what's your move?</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}">`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}">`;
    }
    */

    function checkWinningCondition() {
        if (gameData.score[0] <= gameData.gameEnd || gameData.score[1] <= gameData.gameEnd) {
            if (gameData.score[1] <= gameData.score[0]) {
                score.innerHTML = `<h2>Player 1 wins!</h2>`;
            } else {
                score.innerHTML = `<h2>Player 2 wins!</h2>`;
            }
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
    }
})();