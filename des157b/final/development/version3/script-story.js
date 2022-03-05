//const storyText=document.querySelector("#story-text span"),storyGIF=document.querySelector("#gif img");var grid=document.querySelector(".grid");const storyTextList=["","In 2019, there were ovr 19 million Asian-Americans living in the U.S.\n    Within that population, roughly 15% reported that they have experienced\n    mental illness.","Unfortunately, that’s only what’s reported. \n    In fact, Asian-Americans are 3x less likely to seek treatment \n    or help than other racial groups in the U.S.","I want you to meet Angela.\n    Angela is a highschool student w/ good grades and many friends.\n    Everyone sees her as a happy, hand-working individual.","But actually, Angela struggles everyday to fit this image that everyone sees of her.\n    Instead, she’s tired, stressed, and she doesn’t know who to talk to.","At home, when Angela tries to talk to them about her feelings. They tell her to\n    “be grateful” of her life and not to “think about it too much” because their\n    generation has gone through “worse”.","Secretly, Angela’s parents also hide their feelings. They do not what to be\n    labeled as “weak” to others. They do not want to bring shame to the family and think\n    that they have failed.","This situation is more common than you think. Regardless of your race\n    and where you come from, maybe you’re like Angela. Maybe you know someone who is\n    facing a similar struggle. And so, I want you to know a few things. ","First, I want you to know..that mental illness is bigger than you think. Like way bigger!\n    We can’t erase the stigma over night..but we can take a step forward today.","I encouraghe you to push for schools to teach about mental health.  Maybe you need to have that difficult \n    conversation wth your parents. Check up on your friends, and most importantly,\n    check in with yourself. Because slowly and together, we can erase the stigma.","Lastly, I want you to know that you are never alone. Apparently, there are \n    some people that want you to share something with you..","Thank you for listening <3"],storyGifList=["","./images/map.gif","./images/stats.gif","./images/angela.gif","","","","./images/people.gif","./images/together.gif","./images/texting.gif","",""];let slideCount=0;function handleKey(e){32==e.keyCode&&slideCount<11&&getNextSlide(slideCount+=1)}function getNextSlide(e){storyGIF.setAttribute("src",storyGifList[e]),storyText.textContent=storyTextList[e],setGIFStyles(e)}function setGIFStyles(e){storyText.classList.contains("fadeUp")?(storyText.classList.remove("fadeUp"),storyText.classList.add("fadeUp-dummy")):(storyText.classList.remove("fadeUp-dummy"),storyText.classList.add("fadeUp")),3==e||7==e?(storyGIF.style.top="100px",storyGIF.style.right="0px"):8==e?(storyGIF.style.top="100px",storyGIF.style.right="20px"):10==e?(storyGIF.style.display="none",grid.style.display="block",displayNotes()):11==e?(storyGIF.style.display="block",grid.style.display="none"):(storyGIF.style.top="0px",storyGIF.style.right="0px")}document.addEventListener("keydown",handleKey);var msnry=new Masonry(grid,{itemSelector:".grid-item",columnWidth:300});async function displayNotes(){const e=Parse.Object.extend("notes"),t=new Parse.Query(e),n=await t.ascending("name").find();console.log("Results: ",n),maxLength=Math.min(n.length,10);for(let e=0;e<maxLength;e++)createNote(n[e].attributes)}function createNoteElement(e,t,n,o){let s=document.createElement("div");return s.innerHTML=`\n    <div class="grid-item note-tape-container">\n      <div id="tape" class=${o}></div>\n      <div id="note" class="${n}">\n          <span id="note-content">${t}</span>\n          <br/> -\n          <span id="name">${e}</span>\n      </div>\n    </div>`,s}function createNote(e){let t=createNoteElement(e.name,e.content,e.noteColor,e.tapeColor);grid.appendChild(t),msnry.prepended([t]),msnry.layout()}

const storyTextContainer = document.querySelector("#story-text")
const storyText = document.querySelector("#story-text span")
const storyGIF = document.querySelector("#gif img")
var grid = document.querySelector('.grid');
let tip = document.querySelector('#tip')
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
    `Lastly, I want you to know that you are never alone. There are 
    some people that want you to share something with you..`,
    `Thank you for listening <3`
]

const storyGifList = [
    "./imaegs/me.gif",
    "./images/map.gif",
    "./images/stats.gif",
    "./images/angela.gif",
    "./images/reality.gif",
    "./images/parent1.gif",
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


    if (i == 3 || i == 7 || i == 4 || i == 5) {
        storyGIF.style.top = "100px";
        storyGIF.style.right = "0px";
    } else if (i == 8) {
        storyGIF.style.top = "100px";
        storyGIF.style.right = "20px";
    } else if (i == 10) {
        storyGIF.style.display = "none"
        grid.style.display = "block";
        displayNotes();
    } else if (i == 11) {
        storyGIF.style.display = "none";
        grid.style.display = "none";
        tip.textContent = "";
        storyTextContainer.style.height = "100%";
        storyText.innerHTML += 
        `<ul id="thank-you-list">
            <li><a href="./index.html">go back home</a></li>
            <li><a href="./grid.html">view notes</a></li>
            <li><a href="./questionnaire.html">leave a note</a></li>
        </ul>`
    } else {
        storyGIF.style.top = "0px";
        storyGIF.style.right = "0px";
    }


}

// grid
var msnry = new Masonry(grid, {
    // options...
    itemSelector: '.grid-item',
    columnWidth: 300
});

// b4a
async function displayNotes() {
    const notes = Parse.Object.extend('notes');
    const query = new Parse.Query(notes);
    const results = await query.ascending('name').find();
    console.log("Results: ", results);
    maxLength = Math.min(results.length, 10);
    for (let i = 0; i < maxLength; i++) {
        createNote(results[i].attributes);
    }
}

function createNoteElement(n, c, nc, tc) {
    let note = document.createElement("div")
    note.innerHTML = `
    <div class="grid-item note-tape-container">
      <div id="tape" class=${tc}></div>
      <div id="note" class="${nc}">
          <span id="note-content">${c}</span>
          <br/> -
          <span id="name">${n}</span>
      </div>
    </div>`
    return note

}

function createNote(o) {
    let name = o.name;
    let content = o.content;
    let noteColor = o.noteColor;
    let tapeColor = o.tapeColor;
    let temp = createNoteElement(name, content, noteColor, tapeColor)

    // In order to add a note, we have to append the child to grid and then append to masonry
    grid.appendChild(temp)
    msnry.prepended([temp])
    msnry.layout()
}