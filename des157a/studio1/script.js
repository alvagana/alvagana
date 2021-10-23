(function() {

    'use strict';
    console.log("reading js");

    // Query Selectors
    let form = document.querySelector('#form');
    let form2 = document.querySelector('#form2');
    let tryAgain = document.querySelector('#try-again');

    // Form data
    let name, genre, favoritePlace, describeYourself, bestFriend, favoriteActivity, snack, freeTicketPerson, millionDollarBuy, pizzaTopping;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        form.classList.add("hidden");
        form2.style.display = "flex";
        
        name = document.querySelector("#name").value;
        genre = document.querySelector("#genre").value;
        favoritePlace = document.querySelector("#favorite-place").value;
        describeYourself = document.querySelector("#describe-yourself").value;
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
        setValues(favoriteActivity, snack, freeTicketPerson, millionDollarBuy, pizzaTopping, name, genre, favoritePlace, describeYourself, bestFriend);

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

    function setValues(activity, snack, ticketPerson, mdBuy, topping, name, genre, favePlace, describe, friend) {
        let activityToLower = activity.toLowerCase();
        let mdBuyToLower = mdBuy.toLowerCase();
        let desc = document.getElementById("description");
        let song1 = document.getElementById("song1");

        desc.textContent = `A ${genre} playlist perfect for ${activityToLower} made by your best friend, ${friend}.`;
        setAlbumCover(genre);
        setAlbumName(genre, favePlace);
        setArtist(name);
        setSongs(genre, describe);
    }

    function setAlbumCover(g) {
        let album = document.getElementById("album-cover");
        if (g == 'rock') {
            album.src = "rockalbumcover.png";
        } else if (g == 'pop') {
            album.src = "popalbumcover.png";
        } else {
            album.src = "hiphopcover.png";
        }
    }

    function setAlbumName(g, fp) {
        let albumName = document.getElementById("album-name");
        if (g == 'rock') {
            albumName.textContent = "rock album";
        } else if (g == 'pop') {
            albumName.textContent = "pop album";
        } else {
            albumName.textContent = `Gangsters in ${fp}`;
        }
    }

    function setArtist(n) {
        let artistName = document.getElementById("artist");
        artistName.textContent = n;
    }

    function setSongs(g,d) {
        let rockSongs = [];
        let hiphopSongs = ['hi', 'hi', 'hi', `Young, Wild, & ${d}`, 'hi', 'In Da Club', '2 KOOL 4 SKOOL', 'Dogz-N-The-Hood'];
        let popSongs = [];
        for (let i = 1; i <= 8; i++) {
            let currentSong = document.getElementById(`song${i}`);
            currentSong.textContent = hiphopSongs[i-1];
        }

        if (g == 'rock') {
            
        } else if (g == 'pop') {
            
        } else {
            
        }
    }
})();