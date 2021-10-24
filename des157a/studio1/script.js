(function() {

    'use strict';
    console.log("reading js");

    // Query Selectors
    let form = document.querySelector('#form');
    let form2 = document.querySelector('#form2');
    let goBack = document.querySelector('#btn-back');
    let tryAgain = document.querySelector('#try-again');

    // Form data
    let name, genre, favoritePlace, describeYourself, talkAbout, favoriteActivity, snack, freeTicketPerson, millionDollarBuy, amazing;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        form.classList.add("hidden");
        form2.style.display = "flex";
        
        name = document.querySelector("#name").value;
        genre = document.querySelector("#genre").value;
        favoritePlace = document.querySelector("#favorite-place").value;
        describeYourself = document.querySelector("#describe-yourself").value;
        talkAbout = document.querySelector("#talk-about").value;
    });

    form2.addEventListener('submit', function(event){
        event.preventDefault();

        // Getting form values
        favoriteActivity = document.querySelector("#favorite-activity").value;
        snack = document.querySelector("#snack").value;
        freeTicketPerson = document.querySelector("#free-ticket-person").value;
        millionDollarBuy = document.querySelector("#million-dollar-buy").value;
        amazing = document.querySelector("#amazing").value;

        // Setting form values
        setValues(favoriteActivity, snack, freeTicketPerson, millionDollarBuy, amazing, name, genre, favoritePlace, describeYourself, talkAbout);

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

    function setValues(activity, snack, ticketPerson, mdBuy, amazing, name, genre, favePlace, describe, talkAbout) {
        let activityToLower = activity.toLowerCase();
        let amazingAllCaps = amazing.toUpperCase();

        setDescription(genre, activityToLower);
        setAlbumCover(genre);
        setAlbumName(genre, favePlace, mdBuy);
        setUser(name);
        setArtists(genre)
        setSongs(genre, describe, mdBuy, amazingAllCaps, talkAbout, snack, ticketPerson, activity, name, favoritePlace);
        setGradient(genre);
    }



    function setAlbumCover(g) {
        let album = document.getElementById("album-cover");
        if (g == 'rock') {
            album.src = "./images/rockalbumcover.png";
        } else if (g == 'pop') {
            album.src = "./images/popalbumcover.png";
        } else {
            album.src = "./images/hiphopcover.png";
        }
    }

    function setAlbumName(g, fp, md) {
        let albumName = document.getElementById("album-name");
        if (g == 'rock') {
            albumName.textContent = `Smashin' ${md}s`;
        } else if (g == 'pop') {
            albumName.textContent = `Party Up In ${fp}`;
        } else {
            albumName.textContent = `Cash Money ${md}`;
        }
    }

    function setUser(n) {
        let userName = document.getElementById("user");
        userName.textContent = n;
    }

    function setSongs(g,d,md,a,ta,s,tp, act, name, fp) {
        let rockSongs = [`Hey ${name}`, `Paint My ${md} Black`, `Highway to ${fp}`, `Where The Streets Are ${a}`, `Another One Bites the ${s}`, `The Ballad of ${tp}`, `${d} Head Banging`, 'Davis California'];
        let hiphopSongs = [`${fp} Beatz`, `${ta} Freestyle`, `Beatz n' ${s} (feat. ${tp})`, `Young, Wild & ${d}`, `${a}O MODE`, 'In Da Club', "Fo' Shizzle", '2 KOOL 4 SKOOL'];
        let popSongs = [`I Love U, ${ta}`,`Where is the ${s}?`,`Locked Out Of My House`,`pretty & ${d.toLowerCase()}`, `Friday Night and Life is ${a}`,`We Are Never Ever ${act} Together`,"Save Your Tears, It's only Monday",`${md} in Hawaii`];
        let currentSongs;

        if (g == 'rock') {
            currentSongs = rockSongs;
        } else if (g == 'pop') {
            currentSongs = popSongs;
        } else {
            currentSongs = hiphopSongs;
        }

        for (let i = 1; i <= 8; i++) {
            let currentSong = document.getElementById(`song${i}`);
            currentSong.textContent = currentSongs[i-1];
        }
    }

    function setArtists(g) {
        let rockArtists = ['The Dungbeetles','The Rolling Pebbles','AB/CD','ME2','King','Panic! At San Francisco','Vampire Weekday','Red Hot Chili Flakes'];
        let hiphopArtists = ['Kanye East','J. Cold', 'Big Wayne', 'Snooze Dogg','Travis Scotch', 'Yung Old',"21 Lil' A$AP Young Money Dawg",'Eazy-F']
        let popArtists = ['Rustin Bieber', 'Black Eyed Fleas', 'Bruno Stars', 'Ariana Venti', 'Burgundy 5', 'Taylor Fast', 'The Weekdy', 'Katy Fairy'];
        let currentArtists;

        if (g == 'rock') {
            currentArtists = rockArtists;
        } else if (g == 'pop') {
            currentArtists = popArtists;
        } else {
            currentArtists = hiphopArtists;
        }

        for (let i = 1; i <= 8; i++) {
            let currentArtist = document.getElementById(`artist${i}`);
            currentArtist.textContent = currentArtists[i-1];
        }
    }

    function setDescription(genre, activity) {
        let desc = document.getElementById("description");
        if (genre == 'rock') {
            desc.textContent = `Rock out to heavy drums and electric guitars while you go ${activity} with this ${genre} playlist made just for you.`;
        } else if (genre == 'pop') {
            desc.textContent = `Whether you're with friends or you're ${activity}, this ${genre} playlist is all about you having a good time.`;
        } else {
            desc.textContent = `A rappin', snazzy ${genre} playlist perfect for ${activity} made just for you.`;
        }
    }

    function setGradient(genre){
        let header = document.querySelector('.music-info-header');
        let main = document.querySelector('.music-info-main');

        if (genre == 'rock') {
            header.style.background = "linear-gradient(180deg, #5A82D0 0%, #303030 100%)";
            main.style.background = "linear-gradient(180deg, #121824 0%, #000000 100%)";
        } else if (genre == 'pop') {
            header.style.background = "linear-gradient(180deg, #FF8C8C 0%, #7B5317 100%)";
            main.style.background = "linear-gradient(180deg, #603A02 0%, #191414 100%)";
        } else {
            
        }
    }
})();