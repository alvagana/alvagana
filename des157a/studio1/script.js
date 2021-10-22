(function() {

    'use strict';
    console.log("reading js");

    let form = document.querySelector('#form');
    let form2 = document.querySelector('#form2');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        form.classList.add("hidden");
        
        form2.style.display = "flex";
    })

    form2.addEventListener('submit', function(event){
        event.preventDefault();

        let body = document.querySelector("body");
        body.style.width = "1466px";

        let showingElements = document.querySelectorAll(".showing");
        let musicPage = document.querySelector("#music-page");
        let firstSection = document.querySelector("body section:first-of-type");

        for (let i = 0; i < showingElements.length; i++) {
            showingElements[i].classList.replace('showing', 'hidden');
        }

        // Won't change in the for loop for some reason? :O
        firstSection.style.display = "none";
        musicPage.classList.replace('hidden', 'showing');
    })
})();