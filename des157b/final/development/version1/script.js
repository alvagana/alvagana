const body = document.querySelector("body");



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