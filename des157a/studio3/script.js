(function() {
    'use strict';
    console.log("reading js...");
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');
    const playerInfo = document.getElementById('player-info');
    const catImages = document.querySelectorAll('main div img');
    let health1 = document.getElementById('bar1');
    let health2 = document.getElementById('bar2');
    let actionText1 = document.getElementById('action-text-1');
    let actionText2 = document.getElementById('action-text-2');

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
        playerInfo.style.display = "flex";
        catImages.forEach(function(img) {
            img.style.display = "block";
        });

        document.getElementById('quit').addEventListener("click", function() {
            location.reload();
        })

        // setting up turn
        setUpTurn();
    })

    function setUpTurn() {
        game.textContent = ` It is currently ${gameData.players[gameData.currentTurn]}'s turn.`;

        actionArea.innerHTML = '<button id="scratch">Scratch</button><button id="defend">Defend</button>';

        // Clicked scratch
        document.getElementById('scratch').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "scratch" : gameData.actionA = "scratch";
            setTimeout(showActionText(), 2000);
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })

        document.getElementById('defend').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "defend" : gameData.actionA = "defend";
            setTimeout(showActionText(), 2000);
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })
    }

    function showActionText() {
        actionText1.textContent = gameData.actionA.toUpperCase();
        actionText2.textContent = gameData.actionB.toUpperCase();
        gameData.currentTurn ? actionText2.style.transform = "scaleY(100%) rotate(-5deg)" : actionText1.style.transform = "scaleY(100%) rotate(-5deg)";
        gameData.currentTurn ? actionText2.style.transition = "transform 0.5s" : actionText1.style.transition = "transform 0.5s";
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

        let winner = getDiceWinner();
        if (gameData.actionA == 'defend' && gameData.actionB == 'defend') {
            score.innerHTML = `<p>Turn ${gameData.turnCount}: Both defended! Nothing happened!</p>`
        } else {
            if (winner != 'TIE') {
                performAction(winner);
                score.innerHTML = `<p>Turn ${gameData.turnCount}: Player 1 rolled a ${gameData.rollSumA} and Player 2 rolled a ${gameData.rollSumB}. Player ${winner} wins the turn. </p>`;
            } else {
                score.innerHTML = `<p>Turn ${gameData.turnCount}: It was a TIE! </p>`;
            }
        }

        // Turn count increment.
        gameData.turnCount += 1;

        // Check winning condition
        checkWinningCondition();
    }

    function updateHealthBar(player) {
        if (player == 'A') {
            health1.style.width = `${100 * (Math.max(gameData.score[0], 0)/50)}%`;
            let healthSpan = document.querySelector('#player-info .health-bar-flex span:first-child');
            healthSpan.textContent = `HP (${Math.max(0, gameData.score[0])}/50)`;
        } else {
            health2.style.width = `${100 * (Math.max(gameData.score[1], 0)/50)}%`;
            let healthSpan = document.querySelector('#player-info .health-bar-flex span:last-child');
            healthSpan.textContent = `(${Math.max(0, gameData.score[1])}/50) HP`;
        }
    }

    function getDiceWinner() {
        let rollA = gameData.rollSumA;
        let rollB = gameData.rollSumB;
       // Determining who wins the turn
        if (rollA == rollB) {
            return 'TIE';
        } else if (rollA > rollB) {
            return 'A';
        } else {
            return 'B';
        }
    }

    function performAction(winner) {
        let score1 = gameData.score[0];
        let score2 = gameData.score[1];
        let roll1 = gameData.rollSumA;
        let roll2 = gameData.rollSumA;
        let act1 = gameData.actionA;
        let act2 = gameData.actionA;

        if (winner == 'A') {
            gameData.actionA == "scratch" ? gameData.score[1] -= gameData.rollSumA : gameData.score[0] += (gameData.rollSumA - gameData.rollSumB);
        } else if (winner == 'B') {
            gameData.actionB == "scratch" ? gameData.score[0] -= gameData.rollSumB : gameData.score[1] += (gameData.rollSumB - gameData.rollSumA);
        }

        updateHealthBar('A');
        updateHealthBar('B');
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