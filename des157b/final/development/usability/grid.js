var grid = document.querySelector('.grid');
var msnry = new Masonry(grid, {
    // options...
    itemSelector: '.grid-item',
    columnWidth: 300
});

/* b4a */
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

/* TODO: make sure colors passed in = class names */
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