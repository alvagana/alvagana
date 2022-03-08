const body=document.querySelector("body");let aboutSpan=document.getElementById("about-span"),readStorySpan=document.getElementById("read-story-span"),writeANoteSpan=document.getElementById("write-a-note-span"),viewNotesSpan=document.getElementById("view-notes-span"),about=document.querySelector("#about"),viewNotes=document.querySelector("#view-notes"),writeNote=document.querySelector("#write-a-note"),readStory=document.querySelector("#read-story"),aboutCircle=new CircleType(aboutSpan).radius(80),readStoryCircle=new CircleType(readStorySpan).radius(300);about.addEventListener("click",function(){window.location.replace("./learn.html")}),about.addEventListener("mouseover",function(){aboutSpan.style.fontSize="29px"}),about.addEventListener("mouseout",function(){aboutSpan.style.fontSize="24px"}),viewNotes.addEventListener("click",function(){window.location.replace("./grid.html")}),viewNotes.addEventListener("mouseover",function(){viewNotesSpan.style.fontSize="29px"}),viewNotes.addEventListener("mouseout",function(){viewNotesSpan.style.fontSize="24px"}),readStory.addEventListener("click",function(){window.location.replace("./story.html")}),readStory.addEventListener("mouseover",function(){readStorySpan.style.fontSize="29px"}),readStory.addEventListener("mouseout",function(){readStorySpan.style.fontSize="24px"}),writeNote.addEventListener("click",function(){window.location.replace("./questionnaire.html")}),writeNote.addEventListener("mouseover",function(){writeANoteSpan.style.fontSize="29px"}),writeNote.addEventListener("mouseout",function(){writeANoteSpan.style.fontSize="24px"});
/*
const body = document.querySelector("body");
let aboutSpan = document.getElementById('about-span');
let readStorySpan = document.getElementById('read-story-span');
let writeANoteSpan = document.getElementById('write-a-note-span');
let viewNotesSpan = document.getElementById('view-notes-span');

let about = document.querySelector("#about");
let viewNotes = document.querySelector("#view-notes");
let writeNote = document.querySelector("#write-a-note");
let readStory = document.querySelector("#read-story");
let aboutCircle = new CircleType(aboutSpan)
  .radius(80);

let readStoryCircle = new CircleType(readStorySpan)
  .radius(300);

// about
about.addEventListener("click", function() {
    window.location.replace("./learn.html")
}) 

about.addEventListener("mouseover", function() {
    aboutSpan.style.fontSize = "29px";
})

about.addEventListener("mouseout", function() {
    aboutSpan.style.fontSize = "24px";
})

// view notes
viewNotes.addEventListener("click", function() {
    window.location.replace("./grid.html")
}) 

viewNotes.addEventListener("mouseover", function() {
    viewNotesSpan.style.fontSize = "29px";
})

viewNotes.addEventListener("mouseout", function() {
    viewNotesSpan.style.fontSize = "24px";
})

// read story
readStory.addEventListener("click", function() {
    window.location.replace("./story.html")
}) 

readStory.addEventListener("mouseover", function() {
    readStorySpan.style.fontSize = "29px";
})

readStory.addEventListener("mouseout", function() {
    readStorySpan.style.fontSize = "24px";
})

// read story
writeNote.addEventListener("click", function() {
    window.location.replace("./questionnaire.html")
}) 

writeNote.addEventListener("mouseover", function() {
    writeANoteSpan.style.fontSize = "29px";
})

writeNote.addEventListener("mouseout", function() {
    writeANoteSpan.style.fontSize = "24px";
})
*/
/*
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
*/
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
