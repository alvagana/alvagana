var grid=document.querySelector(".grid"),msnry=new Masonry(grid,{itemSelector:".grid-item",columnWidth:300});async function displayNotes(){const e=Parse.Object.extend("notes"),n=new Parse.Query(e),t=await n.ascending("name").find();console.log("Results: ",t),maxLength=Math.min(t.length,20);for(let e=0;e<maxLength;e++)createNote(t[e].attributes)}function createNoteElement(e,n,t,a){let i=document.createElement("div");return i.innerHTML=`\n    <div class="grid-item note-tape-container">\n      <div id="tape" class=${a}></div>\n      <div id="note" class="${t}">\n          <span id="note-content">${n}</span>\n          <br/> -\n          <span id="name">${e}</span>\n      </div>\n    </div>`,i}function createNote(e){let n=createNoteElement(e.name,e.content,e.noteColor,e.tapeColor);grid.appendChild(n),msnry.prepended([n]),msnry.layout()}displayNotes();
/*
var grid = document.querySelector('.grid');
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
    maxLength = Math.min(results.length, 20);
    for (let i = 0; i <  maxLength; i++) {
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

displayNotes();
*/