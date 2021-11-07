(function() {

    'use strict';
    console.log("reading js");


    let cursor = document.querySelector('#cursor');
    let imageSlider = document.querySelector(".image-slider");
    let images = document.querySelector(".images");
    let imagesArr = document.querySelectorAll(".image");

    let pArr = document.querySelectorAll(".image p");
    let circleArr = document.querySelectorAll(".image div");
    let backBtn = document.querySelector("#back-btn");

    window.addEventListener("wheel", function(event) {
        //event.preventDefault();
        let y = imageSlider.scrollLeft;
        imageSlider.scrollLeft += event.deltaY * 2.25;
    });

    document.addEventListener('mousemove', function(evt) {
        cursor.style.left = evt.clientX + "px";
        cursor.style.top = evt.clientY + "px";
    })


    backBtn.addEventListener("click", function() {
        let main = document.querySelector("main");
        let overlay = document.querySelector("#overlay");

        main.style.filter = "blur(0px)";
        main.style.transition = "filter 0.5s";
        overlay.style.transform = "rotateX(90deg)";
        overlay.style.transition = "transform 0.5s";
        cursor.style.backgroundColor = "#caffbf";
    })

    backBtn.addEventListener("mouseover", function() {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
    })

    imagesArr.forEach(function(image, index) {
        image.addEventListener("mouseover", function() {
            cursor.style.width = "10px";
            cursor.style.height = "10px";

            pArr[index].style.transform = "rotateX(0deg) translate(-50%, -50%)";
            pArr[index].style.transition = "transform 0.5s";
            circleArr[index].style.transform = "scale(1)";
            circleArr[index].style.transition = "transform 0.5s";
        });

        image.addEventListener("mouseout", function() {
            cursor.style.width = "30px";
            cursor.style.height = "30px";
            pArr[index].style.transform = "rotateX(90deg) translate(-50%, -50%)";
            pArr[index].style.transition = "transform 0.5s";
            circleArr[index].style.transform = "scale(0)";
        });

        image.addEventListener("click", function() {
            let main = document.querySelector("main");
            let body = document.querySelector("body");
            let header = document.querySelector("header");
            let footer = document.querySelector("footer");
            let overlay = document.querySelector("#overlay");

            main.style.filter = "blur(5px)";
            main.style.transition = "filter 0.5s";
            overlay.style.transform = "rotateX(0deg)";
            overlay.style.transition = "transform 0.5s";

            cursor.style.backgroundColor = "black";
        })
    })

    /*
    function getImageArrWidth() {
        let width = 0;
        imagesArrCopy.forEach(function(img) {
            width += img.offsetWidth;
        })
        return width;
    }

    function updateScroll() {


    }
    */
    
    /*
    console.log("screen width: ", screen.width);
    let dimensions = document.querySelector("body div");
    let body = document.querySelector("body");
    document.addEventListener("mousemove", function(event) {
        const xPos = event.clientX;
        const yPos = event.clientY;

        window.scroll({
            top: 2100 * (yPos/window.outerWidth) - 100, 
            left: 2000 * (xPos/window.outerHeight) - 100
        });
    })
    */
})();

/* https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/ */
