(function() {

    'use strict';
    console.log("reading js");

    // Query Selectors
    let form = document.querySelector('#form');
    let form2 = document.querySelector('#form2');
    let tryAgain = document.querySelector('#try-again');

    // Form data
    let name, genre, favoritePlace, lateToClass, bestFriend, favoriteActivity, snack, freeTicketPerson, millionDollarBuy, pizzaTopping;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        form.classList.add("hidden");
        form2.style.display = "flex";
        
        name = document.querySelector("#name").value;
        genre = document.querySelector("#genre").value;
        favoritePlace = document.querySelector("#favorite-place").value;
        lateToClass = document.querySelector("#late-to-class").value;
        bestFriend = document.querySelector("#best-friend").value;
    })

    form2.addEventListener('submit', function(event){
        event.preventDefault();

        // Getting form values
        favoriteActivity = document.querySelector("#favorite-activity").value;
        snack = document.querySelector("#snack").value;
        freeTicketPerson = document.querySelector("#free-ticket-person").value;
        millionDollarBuy = document.querySelector("#million-dollar-buy").value;
        pizzaTopping = document.querySelector("#pizza-topping").value;

        // Setting form values
        setValues(favoriteActivity, snack, freeTicketPerson, millionDollarBuy, pizzaTopping, name, genre, favoritePlace, lateToClass, bestFriend);

        // Controlling which screen is being shown
        let body = document.querySelector("body");
        let showingElements = document.querySelectorAll(".showing");
        let musicPage = document.querySelector("#music-page");
        let firstSection = document.querySelector("body section:first-of-type");
        body.style.width = "1466px";
        for (let i = 0; i < showingElements.length; i++) {
            showingElements[i].classList.replace('showing', 'hidden');
        }
        firstSection.style.display = "none";
        musicPage.classList.replace('hidden', 'showing');
    })

    // If user clicks try again, refresh the page to go back to the beginning
    tryAgain.addEventListener('click', function() {
        window.location.reload();
    })

    function setValues(activity, snack, ticketPerson, mdBuy, topping, name, genre, favePlace, lateToClass, friend) {
        let activityToLower = activity.toLowerCase();
        let desc = document.getElementById("description");
        desc.textContent = `A ${genre} album perfect for ${activityToLower}.`;
    }
})();