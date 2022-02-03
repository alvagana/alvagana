
const body = document.querySelector("body");
var slideCount = 0;

document.addEventListener('keydown', handleKey);

let secOneTextBaffle = baffle('#sec-one-text', {
    characters: '</>░▐░	█'
})

let noReveal = baffle('.text-no-reveal', {
    characters: '</>░▐░	█'
})

secOneTextBaffle.start();
noReveal.start();
secOneTextBaffle.reveal(1000, 5000);

function handleKey(event) {
    if (event.keyCode == 32) {
        console.log("pressed");
        let right = getRight();
        checkBaffle();
        checkBackground();
        body.style.right = right;
    }
}

function getRight() {
    if (slideCount == 9) {
        slideCount = 0;
    } else {
        slideCount += 1;
    }
    let ret = slideCount * 1440;
    ret = ret.toString();
    ret += "px";
    return ret
}

function checkBaffle() {
    if (slideCount != 0) {
        secOneTextBaffle.stop();
    }
}
/*
function checkBackground() {
    if (slideCount >)
}
*/
