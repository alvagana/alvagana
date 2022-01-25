(function (){
    'use strict'
    let data;
    let averageTimes = [];
    let averageTime;
    let timeCount = 0;
    let cells = document.querySelectorAll('.empty-cell');
    let stats = document.querySelector('#stats');
        stats.innerHTML = "Start off by clicking an empty cell to generate statistics :)";
    let statsAreShowing = false;

    for (let i = 0; i < 8; i++) {
        cells[i].addEventListener("click", function() {
            if (!cells[i].classList.contains("clicked")) {
                let gameNum = getGameNum(i);
                cells[i].textContent = gameNum;
                changeStats(cells[i].id);
                cells[i].classList.add("clicked");
            }
        });
    }

    getData();

    async function getData(){
        const times = await fetch('data/data.json');
        data = await times.json();
        console.log(data);
    }

    function changeStats(i) {
        if (!statsAreShowing) {
            stats.innerHTML = `
            <p>Alvin completed this puzzle in:
                <br/><span id="game-time">5:30</span>
            </p>.
            <p>Average time to solve a sudoku puzzle: 
                <br/><span id="average-time">5:30</span>
            </p>
            <p>Fun fact: During this puzzle, a golden retriever can run about <span id="miles"></span> miles <span id="dogs"></span>
            `
            statsAreShowing = true;
        }
        let gameTime = document.getElementById('game-time');
        let averageTimeSpan = document.getElementById('average-time');
        let miles = document.getElementById('miles');
        let dogs = document.getElementById('dogs');
        dogs.textContent = "";
        let mileCount = 0;
        

        timeCount += 1;
        averageTimes.push(data.games[i.toString()]);
        averageTime = Math.floor(getSum(averageTimes)/timeCount);

        let time = calculateTime(data.games[i.toString()]);
        let avgTime = calculateTime(averageTime);
        mileCount = Math.floor(time[0] / 2);
        miles.textContent = mileCount;

        for (let i = 0; i < mileCount; i++) {
            dogs.textContent += "🐶";
        }



        gameTime.textContent = `${time[0]}:${time[1]}`;
        averageTimeSpan.textContent = `${avgTime[0]}:${avgTime[1]}`;

    }

    function getSum(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    function calculateTime(s) {
        let min = Math.floor(s/60);
        let sec = s%60;
        if (sec < 10) {
            sec = "0" + sec.toString();
        }
        return [min, sec];
    }

    function getGameNum(i) {
        switch(i) {
            case 0:
                return 2;
            case 1:
                return 3;
            case 2:
                return 1;
            case 3:
                return 4;
            case 4:
                return 5;
            case 5:
                return 8;
            case 6:
                return 7;
            case 7:
                return 6;
            default:
                return 0;
        }
    }
})();