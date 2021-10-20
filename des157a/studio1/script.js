(function() {

    'use strict';
    console.log("reading js");

    let nextBtn = document.getElementById("btn-next");
    nextBtn.addEventListener('click', function() {
        console.log('clicked');
        let showingElements = document.querySelectorAll(".showing");
        console.log(showingElements);
        for (let i = 0; i < showingElements.length; i++) {
            console.log(showingElements[i]);
            showingElements[i].classList.replace('showing', 'hidden');
        }
    })
})();