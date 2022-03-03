const body = document.querySelector("body");

alert(`
Hi! Thank you so much for participating in my user test.
Here are a few simple tasks for you to do:

1. First, click on "about this site" to learn more, then click "go back home" once finished.
2. Click on "leave a note", and then create a note :)
3. Once it's finished, click on "Read the story"
4. Go through the story using the spacebar
5. Once you've finished, click "Go back home" on the top left corner of the screen
6. Click on "notes" to view all the notes, and you're done!

You can view these instructions anytime by navigating back to the home page by clicking "go back home" on the top left corner.
`
)
/* 
SLIDING WINDOW METHOD

let slideCount = 0;
document.addEventListener('keydown', handleKey);
function handleKey(event) {
    if (event.keyCode == 32) {
        let right = getRight();
        body.style.right = right;
    }
}
function getRight() {
    let ret = slideCount * window.innerWidth;
    ret = ret.toString();
    ret += "px";
    slideCount += 1;
    return ret
}
*/