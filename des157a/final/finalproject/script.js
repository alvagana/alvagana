(function() {
    'use strict';
    console.log("reading js...");

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const actionArea = document.getElementById('actions');
    const playerInfo = document.getElementById('player-info');
    const catImages = document.querySelectorAll('main div img');
    const cat1 = document.getElementById("cat1");
    const cat2 = document.getElementById("cat2");
    const playerNames = document.querySelectorAll(".names");

    let health1 = document.getElementById('bar1');
    let health2 = document.getElementById('bar2');
    let actionText1 = document.getElementById('action-text-1');
    let actionText2 = document.getElementById('action-text-2');
    let rollText1 = document.getElementById('roll-1');
    let rollText2 = document.getElementById('roll-2');
    let st = document.querySelector("#special-text");
    let sw = document.querySelector("#sliding-window");
    let stPlayer = document.querySelector("#sliding-window span:first-child");
    let mute = document.querySelector("header nav ul li:first-child");
    let howTo = document.querySelector("header nav ul li:last-child");
    let howToPlay = document.querySelector("#how-to-play");
    let readyButton = document.querySelector("#how-to-play button");
    let quitButton = document.querySelector("header button");
    let form = document.querySelector("form");
    let muted = false;
    let meow;
    let bg;
    let def;

    cat1.style.right = "0px";
    cat1.style.transition = "right 0.7s";
    cat2.style.left = "0px";
    cat2.style.transition = "left 0.7s";

    // Game data
    var gameData = {
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

    mute.addEventListener("click", function() {
        mute.textContent == "Music ON" ? mute.textContent = "Music OFF" : mute.textContent = "Music ON";
        muted = !muted;
        playBackground("Background");
    })

    howTo.addEventListener("click", function() {
        howToPlay.style.display = "block";
    })

    readyButton.addEventListener("click", function() {
        howToPlay.style.display = "none";
    })

    form.addEventListener("submit", function(e) {
        e.preventDefault();
    })

    quitButton.addEventListener("click", function() {
        location.reload();
    })

    startGame.addEventListener("click", function(event) {
        quitButton.disabled = false;


        playerNames[0].textContent = form.name1.value;
        playerNames[1].textContent = form.name2.value;
        gameData.players[0] = form.name1.value;
        gameData.players[1] = form.name2.value;
        
        gameControl.style.display = "none";
        playerInfo.style.display = "flex";
        
        // Setting each image to loop
        // Creating the up and down character effect
        catImages.forEach(function(img) {
            if (img.getAttribute("src") != "./images/Bush.png") {
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
            }
        });

        // Initializing click listener for quit button
        /*
        document.getElementById('quit').addEventListener("click", function() {
            location.reload();
        })
        */

        playBackground("Background");
        setUpTurn();
    })

    // function that sets up turn
    function setUpTurn() {
        // Initializing text for who's turn it is + action buttons
        gameData.currentTurn ? game.textContent = `${gameData.players[1]}, what is your move?` : `${gameData.players[0]}, what is your move?`;
        actionArea.innerHTML = '<button id="scratch">Scratch</button><button id="defend">Defend</button>';
        console.log(actionArea);
        setUpKeyboardMoves();
        // Clicked scratch
        document.getElementById('scratch').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "scratch" : gameData.actionA = "scratch";
            showActionText();
            playMeow("meow");
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })

        // Clicked defend
        document.getElementById('defend').addEventListener('click', function() {
            gameData.currentTurn ? gameData.actionB = "defend" : gameData.actionA = "defend";
            gameData.currentTurn ? cat2.style.left = "130px" : cat1.style.right = "130px";
            showActionText();
            playDefend("defend");
            gameData.currentTurn = gameData.currentTurn ? 0 : 1;
            checkTurnPhase();
            setUpTurn();
        })
    }

    function setUpKeyboardMoves() {
        // Clicked scratch
        document.addEventListener('keydown', function(event) {
            if (gameData.currentTurn == 0 && event.key == 'a' || gameData.currentTurn == 1 && event.key == 'k') {
                gameData.currentTurn ? gameData.actionB = "scratch" : gameData.actionA = "scratch";
                showActionText();
                playMeow("meow");
                gameData.currentTurn = gameData.currentTurn ? 0 : 1;
                checkTurnPhase();
                setUpTurn();
            } else if (gameData.currentTurn == 0 && event.key == 's' || gameData.currentTurn == 1 && event.key == 'l') {
                gameData.currentTurn ? gameData.actionB = "defend" : gameData.actionA = "defend";
                gameData.currentTurn ? cat2.style.left = "130px" : cat1.style.right = "130px";
                showActionText();
                playDefend("defend");
                gameData.currentTurn = gameData.currentTurn ? 0 : 1;
                checkTurnPhase();
                setUpTurn();
            }
        })
    }

    // Function for playing bg
    function playBackground(audio) {
        if (!muted) {
            bg = new Audio(`./media/${audio}.m4a`);
            bg.volume = 0.05;
            bg.loop = true;
            bg.play();
        } else {
            bg.pause();
        }
    }

    // Function for playing bg
    function playMeow(audio) {
        if (!muted) {
            meow = new Audio(`./media/${audio}.m4a`);
            meow.volume = 0.05;
            meow.play();
        }
    }

    function playDefend(audio) {
        if (!muted) {
            def = new Audio(`./media/${audio}.m4a`);
            def.volume = 0.05;
            if (audio == "Background") {
                def.loop = true;
            }
            def.play();
        }
    }
    

    // Showing the action text
    function showActionText() {
        actionText1.textContent = gameData.actionA.toUpperCase();
        actionText2.textContent = gameData.actionB.toUpperCase();
        gameData.currentTurn ? actionText2.style.transform = "scaleY(100%) rotate(-5deg)" : actionText1.style.transform = "scaleY(100%) rotate(-5deg)";
        gameData.currentTurn ? actionText2.style.transition = "transform 0.5s" : actionText1.style.transition = "transform 0.5s";
    }

    // Checking who's turn it is
    function checkTurnPhase() {
        if (gameData.turnPhase == 0) {
            gameData.turnPhase += 1;
        } else {
            setTimeout(executeTurn, 1000);
            gameData.turnPhase = 0;
        }
    }

    // Showing the roll numbers text
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

    // Executing the turn. Where the action happens!
    function executeTurn() {
        // rolling the dice first
        rollDice();
        showRollText();

        // getting the sums for both
        let scoreA = gameData.rollSumA;
        let scoreB = gameData.rollSumB;

        // determing dice winner
        let winner = getDiceWinner();
        game.textContent = "ACTION!";
        if (gameData.actionA == 'defend' && gameData.actionB == 'defend') {
            //game.textContent = `Turn ${gameData.turnCount}: Both defended! Nothing happened!`;
        } else {
            if (winner != 'TIE') {
                setTimeout(function() {
                    performAction(winner)
                }, 1750);
            }
        }

        // Turn count increment.
        gameData.turnCount += 1;

        // Check winning condition, reset to beginning of a turn phase
        setTimeout(function() {
            rollText1.style.transform = "scale(0)";
            rollText2.style.transform = "scale(0)";
            actionText1.style.transform = "scale(0)";
            actionText2.style.transform = "scale(0)";
            cat1.style.right = "0px";
            cat2.style.left = "0px";
            sw.style.animation = "none";
            gameData.bonusRollA = 0;
            gameData.bonusRollB = 0;
            game.textContent = `${gameData.players[gameData.currentTurn]}, what is your move?`;
            checkWinningCondition();
        }, 2000);
    }

    // rolling dice functionality
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

    // Checking for any special dice rolls (snake eyes, doubles, 9 lives)
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
       
        if (roll1 == roll2 && roll1 != 1) {
            stPlayer.textContent = `EXTRA ROLL!`;
            st.textContent = "DOUBLES";
            sw.style.animation = "slide 2s";
            let rand = Math.floor(Math.random() * 6) + 1;
            player == 1 ? gameData.bonusRollA = rand : gameData.bonusRollB = rand;
            player == 1 ? gameData.rollSumA += gameData.bonusRollA : gameData.rollSumB += gameData.bonusRollB;
        } else if (roll1 == 1 && roll2 == 1) {
            stPlayer.textContent = `ZEROED OUT!`;
            st.textContent = "MOUSE!!";
            sw.style.animation = "slide 2s";
            player == 1 ? gameData.rollA1 = 0 : gameData.rollB1 = 0;
            player == 1 ? gameData.rollA2 = 0 : gameData.rollB2 = 0;
            player == 1 ? gameData.rollSumA = 0 : gameData.rollSumB = 0;
        } else if (roll1 + roll2 == 9) {
            stPlayer.textContent = `PLUS ONE!`;
            st.textContent = "9 LIVES";
            sw.style.animation = "slide 2s";
            player == 1 ? gameData.bonusRollA = 1 : gameData.bonusRollB = 1;
            player == 1 ? gameData.rollSumA += gameData.bonusRollA : gameData.rollSumB += gameData.bonusRollB;
        }
    }

    // Health bar animation 
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

    // Determing which cat has the higher roll
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

    // Determining how the health bars change (defend = heal self, scrctach = attack other)
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

    // Checking winning condition after each turn
    function checkWinningCondition() {
        if (gameData.score[0] <= 0 || gameData.score[1] <= 0) {
            sw.style.animation = "finish 0.5s forwards";
            if (gameData.score[1] <= gameData.score[0]) {
                sw.textContent = `${gameData.players[0].toUpperCase()} WINS!`;
            } else {
                sw.textContent = `${gameData.players[1].toUpperCase()} WINS!`;
            }
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
    }
})();