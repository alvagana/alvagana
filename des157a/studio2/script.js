(function() {

    'use strict';
    console.log("reading js");


    let cursor = document.querySelector('#cursor');
    let imageSlider = document.querySelector(".image-slider");
    let imagesArr = document.querySelectorAll(".image");
    let pArr = document.querySelectorAll(".image p");

    document.addEventListener("wheel", function(event) {
        event.preventDefault();
        imageSlider.scrollLeft += event.deltaY * 2.25;
    });

    document.addEventListener('mousemove', function(evt) {
        cursor.style.left = evt.clientX + "px";
        cursor.style.top = evt.clientY + "px";
    })

    imagesArr.forEach(function(image, index) {
        image.addEventListener("mouseover", function() {
            cursor.style.width = "10px";
            cursor.style.height = "10px";
            console.log(index);
            pArr[index].style.transform = "rotateX(0deg) translate(-50%, -50%)";
            pArr[index].style.transition = "transform 0.5s";
        });

        image.addEventListener("mouseout", function() {
            cursor.style.width = "30px";
            cursor.style.height = "30px";
            pArr[index].style.transform = "rotateX(90deg) translate(-50%, -50%)";
            pArr[index].style.transition = "transform 0.5s";
        });
    })
    
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
