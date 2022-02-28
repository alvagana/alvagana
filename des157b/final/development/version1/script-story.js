const storyText = document.querySelector("#story-text span")
const storyGIF = document.querySelector("#gif img")
const storyTextList = [
    "",
    `In 2019, there were ovr 19 million Asian-Americans living in the U.S.
    Within that population, roughly 15% reported that they have experienced
    mental illness.`,
    `Unfortunately, that’s only what’s reported. 
    In fact, Asian-Americans are 3x less likely to seek treatment 
    or help than other racial groups in the U.S.`,
    `I want you to meet Angela.
    Angela is a highschool student w/ good grades and many friends.
    Everyone sees her as a happy, hand-working individual.`,
    `But actually, Angela struggles everyday to fit this image that everyone sees of her.
    Instead, she’s tired, stressed, and she doesn’t know who to talk to.`,
    `At home, when Angela tries to talk to them about her feelings. They tell her to
    “be grateful” of her life and not to “think about it too much” because their
    generation has gone through “worse”.`,
    `Secretly, Angela’s parents also hide their feelings. They do not what to be
    labeled as “weak” to others. They do not want to bring shame to the family and think
    that they have failed.`,
    `This situation is more common than you think. Regardless of your race
    and where you come from, maybe you’re like Angela. Maybe you know someone who is
    facing a similar struggle. And so, I want you to know a few things. `,
    `First, I want you to know..that mental illness is bigger than you think. Like way bigger!
    We can’t erase the stigma over night..but we can take a step forward today.`,
    `I encouraghe you to push for schools to teach about mental health.  Maybe you need to have that difficult 
    conversation wth your parents. Check up on your friends, and most importantly,
    check in with yourself. Because slowly and together, we can erase the stigma.`,
    `Lastly, I want you to know that you are never alone. Apparently, there are 
    some people that want you to share something with you..`,
    `Thank you for listening <3`
]

const storyGifList = [
    "",
    "./images/map.gif",
    "./images/stats.gif", 
    "./images/angela.gif",
    "",
    "",
    "",
    "./images/people.gif",
    "./images/together.gif",
    "./images/texting.gif",
    "",
    "",
]
let slideCount = 0;



// Event listener that will keep track of keyboard presses
document.addEventListener('keydown', handleKey);
function handleKey(event) {
    if (event.keyCode == 32 && slideCount < 11) {
        slideCount += 1;
        getNextSlide(slideCount);
    }
}

// Function that will change the story slide based on slideCount
function getNextSlide(i) {
    storyGIF.setAttribute("src", storyGifList[i])
    storyText.textContent = storyTextList[i];
    setGIFStyles(i);
}

// Changing some position of GIFs if necessary
function setGIFStyles(i) {
    // Trigger text animation
    if (storyText.classList.contains("fadeUp")) {
        storyText.classList.remove("fadeUp")
        storyText.classList.add("fadeUp-dummy")
    } else {
        storyText.classList.remove("fadeUp-dummy")
        storyText.classList.add("fadeUp")
    }


    if (i == 3 || i == 7) {
        storyGIF.style.top = "100px";
        storyGIF.style.right = "0px";  
    } else if (i == 8) {
        storyGIF.style.top = "100px";
        storyGIF.style.right = "20px";   
    } else {
        storyGIF.style.top = "0px";
        storyGIF.style.right = "0px";   
    }


}