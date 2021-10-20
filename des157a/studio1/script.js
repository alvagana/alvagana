(function() {

    'use strict';
    console.log("reading js");

    let nextBtn = document.getElementById("btn-next");
    nextBtn.addEventListener('click', function() {
        let showingElements = document.querySelectorAll(".showing");
        let hidden = document.querySelector(".hidden");
        let firstSection = document.querySelector("body section:first-of-type");

        for (let i = 0; i < showingElements.length; i++) {
            showingElements[i].classList.replace('showing', 'hidden');
        }

        // Won't change in the for loop for some reason? :O
        firstSection.style.display = "none";
        hidden.classList.replace('hidden', 'showing');

    })
})();