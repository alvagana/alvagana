(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const bannerTopImg = document.querySelector('#banner img:nth-child(1)');
    const bannerBottomImg = document.querySelector('#banner img:nth-child(2)');
    const overflowBG = document.querySelector("#overflow");
    const sun = document.querySelector("#sun");
    const stars = document.querySelector("#stars-container");
    const switchContainer = document.querySelector("#switch-container");
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            switchContainer.className = 'switch';
            overflowBG.style.animation = "slide-down 1.5s forwards";
            sun.style.animation = "slide-down-sun 1.5s forwards";
            stars.style.animation = "slide-down-stars 1.5s forwards";

            bannerTopImg.style.animation = "show-top 1.5s forwards";
            bannerBottomImg.style.animation = "hide-bottom 1.5s forwards";

            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
            button.textContent = "☾ switch ☾";
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            switchContainer.removeAttribute('class');
            overflowBG.style.animation = "slide-up 1.5s forwards";
            sun.style.animation = "slide-up-sun 1.5s forwards";
            stars.style.animation = "slide-up-stars 1.5s forwards";

            bannerTopImg.style.animation = "hide-top 1.5s forwards";
            bannerBottomImg.style.animation = "show-bottom 1.5s forwards";


            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
            button.textContent = "☼ switch ☼";
        }
    })
})()