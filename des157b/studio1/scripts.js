(function (){
    'use strict'
    const video = document.querySelector("#video");
    const text = document.querySelector("span");
    const main = document.querySelector("main");
    const button = document.querySelector("button");
    const loading = document.querySelector('.fa-sun');

    video.addEventListener("canplay", function() {
        loading.style.display = 'none';
        main.style.display = "flex";
    })

    button.addEventListener("click", function() {
        video.play();
        main.style.display = "none";
    })


    video.addEventListener('playing', function() {
        main.style.display = "none";
        text.style.display = "block";
        video.style.display = "block";
        const intervalID = setInterval(checkTime, 1000);
    });

    function checkTime() {
        if (0 < video.currentTime && video.currentTime < 2) {
            text.textContent = "☀️";
        } else if (video.currentTime < 7.5) {
            text.textContent = "If you make your bed in the morning,";
        } else if (video.currentTime < 10) {
            text.textContent = "you will have accomplished the first task of the day.";
        } else if (video.currentTime < 13) {
            text.textContent = "It will encourage you to do another task,";
        } else if (video.currentTime < 15) {
            text.textContent = "and another,";
        } else if (video.currentTime < 17) {
            text.textContent = "and another.";
        } else if (video.currentTime < 20) {
            text.textContent = "By the end of the day, you'll have many tasks completed!";
        } else if (video.currentTime < 22) {
            text.textContent = "But life can be unpredictable.";
        } else if (video.currentTime < 24) {
            text.textContent = "If you end up having a miserable day,";
        } else if (video.currentTime < 28.5) {
            text.textContent = "you can come home to a bed that YOU made,";
        } else if (video.currentTime < 31.8) {
            text.textContent = "and it'll give you encouragement that tomorrow will be a better day.";
        } else if (video.currentTime < 32) {
            text.textContent = "☀️";
        } 
        else {
            text.textContent = "";
        }
    }
})();