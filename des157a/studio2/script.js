(function() {

    'use strict';
    console.log("reading js");

    // on load: display hello message
    // on scroll: start img container 1
    // keep going and change images
    // display final message
    // handwriting theme?

    const img1 = document.querySelector("#img1");
    let body = document.querySelector("body");
    let windowHeight = window.innerHeight;

    console.log(img1.getBoundingClientRect().top);
    document.addEventListener('scroll', function() {
        let windowHeight = window.pageYOffset;
        let imgContainer1 = document.querySelector("main div:nth-child(1)");
        let imgContainer2 = document.querySelector("main div:nth-child(2)");
        let progressBar = document.querySelector("#progress");
        let progressWidth = (windowHeight / 4000) * 1000;

        if (windowHeight > 3000) {
            imgContainer2.classList.remove("slide-right-begin");
            imgContainer2.classList.add("slide-right-end");
        } else if (windowHeight > 2000) {
            imgContainer2.classList.add("slide-right-begin");
            imgContainer2.classList.remove("slide-right-end");
        } else if (windowHeight > 900) {
            imgContainer1.classList.add("slide-right-end");
            imgContainer1.classList.remove("slide-right-begin");
        } else {
            imgContainer1.classList.add("slide-right-begin");
            imgContainer1.classList.remove("slide-right-end");
        }

        progressBar.style.width = `${progressWidth}px`;
    })
})();