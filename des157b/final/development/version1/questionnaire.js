let textArea = document.querySelector("textarea");
let noteContent = document.querySelector("#note-content");
let name = document.querySelector("#name");

textArea.addEventListener("input", function() {
    noteContent.textContent = textArea.value;
})