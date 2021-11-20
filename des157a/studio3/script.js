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
    let st = document.querySelector("#special-text");
    let sw = document.querySelector("#sliding-window");
    let stPlayer = document.querySelector("#sliding-window span:first-child");

    var gameData = {
        dice: ['./images/1die.jpg', './images/2die.jpg', './images/3die.jpg', './images/4die.jpg', './images/5die.jpg', './images/6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [30, 30],
        rollA1: 0,
        rollA2: 0,
        rollB1: 0,
        rollB2: 0,
        rollSumA: 0,
        rollSumB: 0,
        bonusRollA: 0,
        bonusRollB: 0,
        actionA: "",
        actionB: "",
        specialA: "",
        specialB: "",
        currentTurn: 0,
        turnPhase: 0,
        turnCount: 1,
        gameEnd: 0
    }


    // testing
    /*
    let testButton = document.getElementById("testing");
    testButton.addEventListener("click", function() {

    })
    */

    startGame.addEventListener("click", function() {
        //gameData.index = Math.round(Math.random());
        //playAudio("alvinSinging");

        gameControl.innerHTML = '<h2>Meoooowwwww!!!!</h2>';
        gameControl.innerHTML += '<button id="quit">Quit?</button>';
        playerInfo.style.display = "flex";
        catImages.forEach(function(img) {
            img.style.display = "block";
            let down = false;
            setInterval(function() {
                if (down) {
                    img.style.transform = "scaleY(1)";
                    down = !down;
                    img.style.top = "0px";
                } else {
                    img.style.transform = "scaleY(0.9)";
                    down = !down;
                    img.style.top = "12.5px";
                }
            }, 400);
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
        gameData.bonusRollA == 0 ? rollText1.textContent = `${gameData.rollA1} + ${gameData.rollA2}` : rollText1.textContent = `${gameData.rollA1} + ${gameData.rollA2} + ${gameData.bonusRollA}`;
        gameData.bonusRollB == 0 ? rollText2.textContent = `${gameData.rollB1} + ${gameData.rollB2}` : rollText2.textContent = `${gameData.rollB1} + ${gameData.rollB2} + ${gameData.bonusRollB}`;
        rollText1.style.transform = "scaleY(100%) rotate(-5deg)";
        rollText1.style.transition = "transform 0.5s";
        setTimeout(function() {
            rollText2.style.transform = "scaleY(100%) rotate(-5deg)";
            rollText2.style.transition = "transform 0.5s";
        }, 1000);
    }

    function executeTurn() {
        rollDice();
        showRollText();

        let scoreA = gameData.rollSumA;
        let scoreB = gameData.rollSumB;

        let winner = getDiceWinner();
        game.textContent = "ACTION!";
        if (gameData.actionA == 'defend' && gameData.actionB == 'defend') {
            //game.textContent = `Turn ${gameData.turnCount}: Both defended! Nothing happened!`;
        } else {
            if (winner != 'TIE') {
                setTimeout(function() {
                    performAction(winner)
                }, 1750);
                //game.textContent = `Turn ${gameData.turnCount}: Player 1 rolled a ${gameData.rollSumA} and Player 2 rolled a ${gameData.rollSumB}. Player ${winner} wins the turn.`;
            } else {
                //game.textContent = `Turn ${gameData.turnCount}: It was a TIE!`;
            }
        }

        // Turn count increment.
        gameData.turnCount += 1;

        // Check winning condition
        setTimeout(function() {
            rollText1.style.transform = "scale(0)";
            rollText2.style.transform = "scale(0)";
            actionText1.style.transform = "scale(0)";
            actionText2.style.transform = "scale(0)";
            sw.style.animation = "none";
            gameData.bonusRollA = 0;
            gameData.bonusRollB = 0;
            game.textContent = `${gameData.players[gameData.currentTurn]}, what is your move?`;
            checkWinningCondition();
        }, 2000);
    }

    function rollDice() {
        gameData.rollA1 = Math.floor(Math.random() * 6) + 1;
        gameData.rollA2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSumA = gameData.rollA1 + gameData.rollA2;
        checkSpecial(1);

        gameData.rollB1 = Math.floor(Math.random() * 6) + 1;
        gameData.rollB2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSumB = gameData.rollB1 + gameData.rollB2;
        checkSpecial(2);
    }

    function checkSpecial(player) {
        let roll1;
        let roll2;
        
        if (player == 1) {
            roll1 = gameData.rollA1;
            roll2 = gameData.rollA2;
        } else {
            roll1 = gameData.rollB1;
            roll2 = gameData.rollB2;
        }

        player == 1 ? stPlayer.textContent = `Player 1:` : stPlayer.textContent = `Player 2:`;
       
        if (roll1 == roll2 && roll1 != 1) {
            st.textContent = "DOUBLES";
            sw.style.animation = "slide 2s";
            let rand = Math.floor(Math.random() * 6) + 1;
            player == 1 ? gameData.bonusRollA = rand : gameData.bonusRollB = rand;
            player == 1 ? gameData.rollSumA += gameData.bonusRollA : gameData.rollSumB += gameData.bonusRollB;
        } else if (roll1 == 1 && roll2 == 1) {
            st.textContent = "MOUSE!!";
            sw.style.animation = "slide 2s";
            player == 1 ? gameData.rollA1 = 0 : gameData.rollB1 = 0;
            player == 1 ? gameData.rollA2 = 0 : gameData.rollB2 = 0;
            player == 1 ? gameData.rollSumA = 0 : gameData.rollSumB = 0;
        } else if (roll1 + roll2 == 9) {
            st.textContent = "9 LIVES";
            sw.style.animation = "slide 2s";
            player == 1 ? gameData.bonusRollA = 1 : gameData.bonusRollB = 1;
            player == 1 ? gameData.rollSumA += gameData.bonusRollA : gameData.rollSumB += gameData.bonusRollB;
        }
    }

    function updateHealthBar(player) {
        if (player == 'A') {
            health1.style.width = `${100 * (Math.max(gameData.score[0], 0)/30)}%`;
            let healthSpan = document.querySelector('#player-info .health-bar-flex span:first-child');
            healthSpan.textContent = `HP (${Math.max(0, gameData.score[0])}/30) HP`;
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
            gameData.actionB == "scratch" ? gameData.score[0] -= gameData.rollSumB : gameData.score[1] = Math.min(gameData.rollSumB + gameData.score[1], 30);
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
        if (gameData.score[0] <= 0 || gameData.score[1] <= 0) {
            if (gameData.score[1] <= gameData.score[0]) {
                game.textContent = `Player 1 wins!`;
            } else {
                game.textContent = `Player 2 wins!`;
            }
            //game.textContent = `Game over!`;
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
    }
})();