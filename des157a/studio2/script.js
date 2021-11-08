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

    let overlayImage = document.querySelector(`#overlay-img`);
    let title = document.querySelector("#overlay .content section span");
    let paragraph = document.querySelector("#overlay .content section p");
    let titles = [
        "hello", 
        "snickerdoodles", 
        "tea top", 
        "korean food", 
        "suju's", 
        "explorations", 
        "finals", 
        "singing"];

    let paragraphs = [
        `i always liked doing cheesy things for you. maybe you got tired of them, but every now and then,
        i would leave a post it note on your desk in physics or your car to tell you things to make your day
        brighter. on the day we had our second physics midterm, you got to class earlier than i did and slid a note
        onto my chair. the professor must've thought i was weird or something, no one looks at their test and 
        smiles when working on physics derivations... `,

        `i've never been into polaroids, let alone pictures, but it's different when i'm with you. 
        on one of our friday nights, we made these yummy snickerdoodle cookies. well, more like YOU made
        these snickerdoodle cookies..i kind of just posed for the picture and "helped" make the batter. 
        you were so excited to wear your new glasses for the first time, so we used up a 
        film pack of my old polaroid and snapped away to our heart's content. yeah, snickerdoodles are 
        pretty awesome.`,

        `on your second day of working, i visited
        you and got some milk tea with my friend.
        i remember you were still learning the ropes
        of handling orders and how to make all the
        drinks on the menu.the drink was good. it was a sun moon 
        lake milk tea with no boba. i’m not sure
        what was more invigorating--the caffeine
        of my drink that wired me up the entire day,
        or the big smile you had the entire time you
        were taking my order. `,

        `the cool thing was that our school was right next to a really good
        korean restaurant--koja kitchen--so it was perfect for a dinner after our night classes.
        on this night, i learned one thing about you: you hate getting your hands dirty. 
        you would eat your chips and fruit with chopsticks just so your hands would stay clean. 
        little did i know that this also applied to korean rice burgers..`,

        "",

        "",

        "",

        ""
    ];
    

    /*
    Trying something out here..
    overlayImage.addEventListener("mouseover", function(event) {
        let x = event.pageX - overlayImage.offsetLeft;
        let y = event.pageY - overlayImage.offsetTop;
        //temp.textContent = `x: ${x}, y: ${y}`;
    })
    */

    // Setting overlay content
    function setOverlay(i) {
        overlayImage.src = `./images/img${i+1}.jpg`;
        title.textContent = `(${i+1}) ${titles[i]}`;
        paragraph.textContent = paragraphs[i];
    }
    

    // Event listeners
    // Scrlling
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

    backBtn.addEventListener("mouseout", function() {
        cursor.style.width = "30px";
        cursor.style.height = "30px";
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

            setOverlay(index);
        })
    })
})();

/* https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/ */
