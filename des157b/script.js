(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const bannerImg = document.querySelector('#banner img');
    const overflowBG = document.querySelector("#overflow");
    const sun = document.querySelector("#sun");
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            bannerImg.src = "./images/UpperHalf.JPG";
            overflowBG.style.animation = "slide-down 1s forwards";
            sun.style.animation = "slide-down-sun 1.5s forwards";
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            overflowBG.style.animation = "slide-up 1s forwards";
            sun.style.animation = "slide-up-sun 1.5s forwards";
            for (const section of sections) {
                section.removeAttribute('class');
            }
            bannerImg.src = "./images/BottomHalf.JPG";
            mode = 'dark'
        }
    })
})()