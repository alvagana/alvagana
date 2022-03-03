let textArea = document.querySelector("textarea");
let noteContent = document.querySelector("#note-content");
let nameField = document.querySelector("#name");
let nameInput = document.querySelector("#name-input")
let noteOptions = document.querySelectorAll(".note-option")
let tapeOptions = document.querySelectorAll(".tape-option")
let submitBtn = document.querySelector("#submit");
let thankYou = document.querySelector("#thank-you")
let note = document.querySelector("#note");
let tape = document.querySelector("#tape")
let form = document.querySelector("form")
let formValues = {
    "name": "",
    "content": "",
    "noteColor": "note-color-1",
    "tapeColor": "tape-color-1"
}
let charCount = document.querySelector("#char-count")
let noteColors = ["Blue", "Green", "Pink", "Red", "Orange"];
let tapeColors = ["Mauve", "Light Pink", "Yellow", "Green", "Sky Blue"];

textArea.addEventListener("input", function() {
    noteContent.textContent = textArea.value;
    charCount.textContent = textArea.value.length;

})

nameInput.addEventListener("input", function() {
    nameField.textContent = nameInput.value;
})

noteOptions.forEach((noteOption, index) => {
    noteOption.addEventListener("click", function() {
        note.removeAttribute("class");
        note.classList.add(`note-color-${index+1}`)
        formValues.noteColor = `note-color-${index+1}`;
    })

    noteOption.addEventListener("mouseover", function() {
        noteOption.textContent = noteColors[index]
    })

    noteOption.addEventListener("mouseout", function() {
        noteOption.textContent = "";
    })
})

//TODO
tapeOptions.forEach((tapeOption, index) => {
    tapeOption.addEventListener("click", function() {
        tape.removeAttribute("class");
        tape.classList.add(`tape-color-${index+1}`)
        formValues.tapeColor = `tape-color-${index+1}`;

    })

    tapeOption.addEventListener("mouseover", function() {
        tapeOption.textContent = tapeColors[index]
    })

    tapeOption.addEventListener("mouseout", function() {
        tapeOption.textContent = "";
    })
})

async function addNote(n, c, nc, tc) {
    const newNoteData = new Parse.Object('notes');
    newNoteData.set('name', n);
    newNoteData.set('content', c);
    newNoteData.set('noteColor', nc);
    newNoteData.set('tapeColor', tc);
    try {
        const result = await newNoteData.save();
        submitBtn.style.opacity = 1;
        submitBtn.style.color = "black";
        submitBtn.textContent = "Submitted!"
        submitBtn.style.cursor = "default"
        submitBtn.disabled = true;
        thankYou.style.display = "block";
    } catch(error) {
        console.log(error);
        submitBtn.style.opacity = 1;
        submitBtn.style.color = "black";
        submitBtn.textContent = "Error, please refresh :("
        submitBtn.style.cursor = "default"
        submitBtn.disabled = true;
    }
}

// Form submit
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (textArea.value != "") {
        let f = formValues;
        f.name = nameInput.value;
        f.content = textArea.value;
        console.log(f.name, f.content, f.noteColor, f.tapeColor);
        console.log("submitted form")
        addNote(f.name, f.content, f.noteColor, f.tapeColor);
    }
})
