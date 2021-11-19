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
    let rollText1 = document.getElementById('roll-1');
    let rollText2 = document.getElementById('roll-2');

    var gameData = {
        dice: ['./images/1die.jpg', './images/2die.jpg', './images/3die.jpg', './images/4die.jpg', './images/5die.jpg', './images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [30, 30],
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

        gameControl.innerHTML = '<h2>Meoooowwwww!!!!</h2>';
        gameControl.innerHTML += '<button id="quit">Quit?</button>';
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
        game.textContent = `${gameData.players[gameData.currentTurn]}, what is your move?`;
        
        actionArea.innerHTML = '<button id="scratch">Scratch</button><button id="defend">Defend</button>';

        // Clicked scratch
        document.getElementById('scratch').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "scratch" : gameData.actionA = "scratch";
            showActionText();
            playAudio("meow");
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })

        document.getElementById('defend').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "defend" : gameData.actionA = "defend";
            showActionText();
            playAudio("defend");
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })
    }

    function playAudio(audio) {
        let meow = new Audio(`./audio/${audio}.m4a`);
        meow.volume = 0.05;
        meow.play();
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
            setTimeout(executeTurn, 1000);
            gameData.turnPhase = 0;
        }
    }

    function showRollText() {
        rollText1.textContent = gameData.rollSumA;
        rollText2.textContent = gameData.rollSumB;
        rollText1.style.transform = "scaleY(100%) rotate(-5deg)";
        rollText1.style.transition = "transform 0.5s";
        rollText2.style.transform = "scaleY(100%) rotate(-5deg)";
        rollText2.style.transition = "transform 0.5s";
    }

    function executeTurn() {
        // Rolling
        //setTimeout(function() {
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.rollSumA = gameData.roll1 + gameData.roll2;
        //}, 500);
        //setTimeout(function() {
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;
            gameData.rollSumB = gameData.roll1 + gameData.roll2;
            showRollText();
        //}, 500);

        let scoreA = gameData.rollSumA;
        let scoreB = gameData.rollSumB;

        let winner = getDiceWinner();
        game.textContent = "ACTION!";
        if (gameData.actionA == 'defend' && gameData.actionB == 'defend') {
            //game.textContent = `Turn ${gameData.turnCount}: Both defended! Nothing happened!`;
        } else {
            if (winner != 'TIE') {
                performAction(winner);
                //game.textContent = `Turn ${gameData.turnCount}: Player 1 rolled a ${gameData.rollSumA} and Player 2 rolled a ${gameData.rollSumB}. Player ${winner} wins the turn.`;
            } else {
                //game.textContent = `Turn ${gameData.turnCount}: It was a TIE!`;
            }
        }

        // Turn count increment.
        gameData.turnCount += 1;

        // Check winning condition
        checkWinningCondition();
        setTimeout(function() {
            rollText1.style.transform = "scale(0)";
            rollText2.style.transform = "scale(0)";
            actionText1.style.transform = "scale(0)";
            actionText2.style.transform = "scale(0)";
            game.textContent = `${gameData.players[gameData.currentTurn]}, what is your move?`;
        }, 2000);
    }

    function updateHealthBar(player) {
        if (player == 'A') {
            health1.style.width = `${100 * (Math.max(gameData.score[0], 0)/30)}%`;
            let healthSpan = document.querySelector('#player-info .health-bar-flex span:first-child');
            healthSpan.textContent = `HP (${Math.max(0, gameData.score[0])}/30)`;
        } else {
            health2.style.width = `${100 * (Math.max(gameData.score[1], 0)/30)}%`;
            let healthSpan = document.querySelector('#player-info .health-bar-flex span:last-child');
            healthSpan.textContent = `(${Math.max(0, gameData.score[1])}/30) HP`;
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
            gameData.actionA == "scratch" ? gameData.score[1] -= gameData.rollSumA : gameData.score[0] = Math.min(gameData.rollSumA + gameData.score[0], 30);
        } else if (winner == 'B') {
            gameData.actionB == "scratch" ? gameData.score[0] -= gameData.rollSumB : gameData.score[1] += Math.min(gameData.rollSumB + gameData.score[0], 30);
        }

        updateHealthBar('A');
        updateHealthBar('B');
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
                game.textContent = `Player 1 wins!`;
            } else {
                game.textContent = `Player 2 wins!`;
            }
            game.textContent = `Game over!`;
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
    }
})();