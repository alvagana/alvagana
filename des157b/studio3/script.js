
const body = document.querySelector("body");
const footer = document.querySelector("footer");
var slideCount = 0;

document.addEventListener('keydown', handleKey);

let secOneTextBaffle = baffle('#sec-one-text', {
    characters: '</>░▐░	█'
})

let noReveal = baffle('.text-no-reveal', {
    characters: '</>░▐░	█'
})

let buttonText = baffle('.button-no-reveal', {
    characters: '░▐░█'
})

let faceCover = baffle('.polaroid.p-three span', {
    characters: '▐█▙▜▟▓'
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
        location.reload();
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

    if (slideCount == 2) {
        buttonText.start();
    }

    if (slideCount == 3) {
        buttonText.stop();
        faceCover.start();
    }

    if (slideCount == 6) {
        noReveal.stop();
    }

    if (slideCount == 8) {
        footer.textContent = "thank you for reading :)"
    }
}

function checkBackground() {
    if (slideCount == 6) {
        body.style.backgroundColor = "#FFFDD0";
        body.style.transition = "5s background-color"
        body.style.transition = "0.5s right, 4s background-color"
    }
}



// text animation
var textWrapper = document.querySelector('.ml13');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml13 .letter',
        translateY: [-100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
      }).add({
        targets: '.ml13 .letter',
        translateY: [0,300],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 2200,
        delay: (el, i) => 100 + 30 * i
      });

