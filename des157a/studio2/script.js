(function() {

    'use strict';
    console.log("reading js");


    let cursor = document.querySelector('#cursor');
    let imageSlider = document.querySelector(".image-slider");
    let images = document.querySelector(".images");
    let imagesArr = document.querySelectorAll(".image");

    let pArr = document.querySelectorAll(".image p");
    let circleArr = document.querySelectorAll(".image div");
    let backBtn = document.querySelector("#back-btn");
    let innerHTML = `
    <div class="image">
        <img src="./images/img1.jpg"/>
        <p>(1) <br/> hello</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img2.jpg"/>
        <p>(2) <br/>snickerdoodles</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img3.jpg"/>
        <p>(3) <br/>tea top</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img4.jpg"/>
        <p>(4) <br/>korean food</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img5.jpg"/>
        <p>(5) <br/>suju's</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img6.jpg"/>
        <p>(6) <br/>explorations</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img7.jpg"/>
        <p>(7) <br/>finals</p>
        <div class="circle">click</div>
    </div>
    <div class="image">
        <img src="./images/img8.jpg"/>
        <p>(8) <br/>singing</p>
        <div class="circle">click</div>
    </div>`

    let overlayImage = document.querySelector(`#overlay-img`);
    let title = document.querySelector("#overlay .content section span");
    let paragraph = document.querySelector("#overlay .content section p");
    let titles = [
        "shibas", 
        "snickerdoodles", 
        "tea top", 
        "korean food", 
        "suju's", 
        "explorations", 
        "finals", 
        "singing"];

    let paragraphs = [
        `i always liked doing cheesy things for you. maybe you got tired of them, but every now and then,
        i would leave a post it note on your desk in physics or your car to tell you things to make your day
        brighter. on the day we had our second physics midterm, you got to class earlier than i did and slid a note
        onto my chair. the professor must've thought i was weird or something, no one looks at their test and 
        smiles when working on physics derivations. `,

        `i've never been into polaroids, let alone pictures, but it's different when i'm with you. 
        on one of our friday nights, we made these yummy snickerdoodle cookies. well, more like YOU made
        these snickerdoodle cookies..i kind of just posed for the picture and "helped" make the batter. 
        you were so excited to wear your new glasses for the first time, so we used up a 
        film pack of my old polaroid and snapped away to our heart's content. yeah, snickerdoodles are 
        pretty awesome.`,

        `on your second day of working, i visited
        you and got some milk tea with my friend.
        i remember you were still learning the ropes
        of handling orders and how to make all the
        drinks on the menu. the drink was good. it was a sun moon 
        lake milk tea with no boba. i’m not sure
        what was more invigorating--the caffeine
        of my drink that wired me up the entire day,
        or the big smile you had the entire time you
        were taking my order. `,

        `the cool thing was that our school was right next to a really good
        korean restaurant--koja kitchen--so it was perfect for a dinner after our night classes.
        on this night, i learned one thing about you: you hate getting your hands dirty. 
        you would eat your chips and fruit with chopsticks just so your hands would stay clean. 
        little did i know that this also applied to korean rice burgers.`,

        `we wanted to watch a movie together at my house, so i had to devise a plan to have
        the house alone to ourselves since my parents didn't know i liked a girl. luckily, my
        cool older brother helped me out and took my little brother out for sushi to give me some
        time. unfortunately my dad forgot his cellphone after leaving work and saw us together on the couch..
        well, that was embarrassing, but later that night, we went to suju's and you expressed your feelings for 
        me. i wonder who felt more embarrassed that day. `,

        `san jose has some cool spots. you showed me around the mitsuwa japanese market, and we looked through some
        cool ghibli collectibles and manga. oh, and they have our favorite snack too, the honey butter chips! the best
        part was the japanese curry house that was next door. i know that you and i usually like to sit next to each other
        instead of across from each other. if that happened, i would've never realized how much i liked your hair that way.`,

        `we had those back to back finals together. one was the 7am computer science one, and the other was the 12pm physics.
        it was definitely a pain in the butt to study for both but we both managed. so, we treated ourselves to a nice lunch :)
        it was a busy, demanding quarter of part-time jobs, 3 STEM classes, and falling in love with you`,

        `i sat down at the ohlone library 2 hours before the midterm. i was practicing the long derivation that the professor
        told us to memorize. you suddenly sent me a snapchat that you were at campus, also practicing your derivations in the classroom.
        so i got up, ran in the rain without an umbrella, and went to practice with you. in the middle of it, we sang together to 
        "spend a little time" by steven fiore and took some pictures. i'm glad you were my partner for that class, and i'm glad you're
        my partner for everything that life throws at us.`
    ];
    

    /*
    Trying something out here..
    overlayImage.addEventListener("mouseover", function(event) {
        let x = event.pageX - overlayImage.offsetLeft;
        let y = event.pageY - overlayImage.offsetTop;
        //temp.textContent = `x: ${x}, y: ${y}`;
    })
    */

    // Setting overlay content
    function setOverlay(i) {
        if (i + 1 > 3) {
            overlayImage.src = `./images/img${i+1}.JPG`;
        } else {
            overlayImage.src = `./images/img${i+1}.jpg`;       
        }
        title.textContent = `(${i+1}) ${titles[i]}`;
        paragraph.textContent = paragraphs[i];
    }
    
    let boundary = 1100;
    let multiplier = 1;
    let lastNode = imagesArr[imagesArr.length - 1];
    let cloneArr = [];

    function cloneNodes() {
        imagesArr.forEach(function(img, index) {
            let clone = img.cloneNode(true);
            let tempIndex = images.children.length - 1

            images.appendChild(clone);
            let lastImg = images.children[tempIndex];
            pArr = document.querySelectorAll(".image p");
            circleArr = document.querySelectorAll(".image div");

            lastImg.addEventListener("mouseover", function() {
                cursor.style.width = "10px";
                cursor.style.height = "10px";

                pArr[tempIndex].style.transform = "rotateX(0deg) translate(-50%, -50%)";
                pArr[tempIndex].style.transition = "transform 0.5s";
                circleArr[tempIndex].style.transform = "scale(1)";
                circleArr[tempIndex].style.transition = "transform 0.5s";
            });
            lastImg.addEventListener("mouseout", function() {
                cursor.style.width = "30px";
                cursor.style.height = "30px";
                pArr[tempIndex].style.transform = "rotateX(90deg) translate(-50%, -50%)";
                pArr[tempIndex].style.transition = "transform 0.5s";
                circleArr[tempIndex].style.transform = "scale(0)";
            });
            lastImg.addEventListener("click", function () {
                let main = document.querySelector("main");
                let overlay = document.querySelector("#overlay");
        
                main.style.filter = "blur(5px)";
                main.style.transition = "filter 0.5s";
                overlay.style.transform = "rotateX(0deg)";
                overlay.style.transition = "transform 0.5s";
        
                cursor.style.backgroundColor = "black";
        
                setOverlay(index % 8 - 1);
            });
        })
    }

    //cloneNodes();


    // Event listeners
    // Scrolling
    window.addEventListener("wheel", function(event) {
        //event.preventDefault();
        let y = imageSlider.scrollLeft;
        imageSlider.scrollLeft += event.deltaY * 1.5;
        lastNode = imagesArr[imagesArr.length - 1];

        console.log(lastNode.getBoundingClientRect().left);
        if (lastNode.getBoundingClientRect().left <= boundary) {
            cloneNodes();
            imagesArr = document.querySelectorAll(".image");
            multiplier += 1;
            images.style.width = `${5000 * multiplier}px`;
            //boundary += 2400;
        }
    });

    document.addEventListener('mousemove', function(evt) {
        cursor.style.left = evt.clientX + "px";
        cursor.style.top = evt.clientY + "px";
    })

    backBtn.addEventListener("click", function() {
        let main = document.querySelector("main");
        let overlay = document.querySelector("#overlay");

        main.style.filter = "blur(0px)";
        main.style.transition = "filter 0.5s";
        overlay.style.transform = "rotateX(90deg)";
        overlay.style.transition = "transform 0.5s";
        cursor.style.backgroundColor = "#caffbf";
    })

    backBtn.addEventListener("mouseover", function() {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
    })

    backBtn.addEventListener("mouseout", function() {
        cursor.style.width = "30px";
        cursor.style.height = "30px";
    })

    imagesArr.forEach(function(image, index) {
        image.addEventListener("mouseover", function() {
            cursor.style.width = "10px";
            cursor.style.height = "10px";
    
            pArr[index].style.transform = "rotateX(0deg) translate(-50%, -50%)";
            pArr[index].style.transition = "transform 0.5s";
            circleArr[index].style.transform = "scale(1)";
            circleArr[index].style.transition = "transform 0.5s";
        });
        image.addEventListener("mouseout", function() {
            cursor.style.width = "30px";
            cursor.style.height = "30px";
            pArr[index].style.transform = "rotateX(90deg) translate(-50%, -50%)";
            pArr[index].style.transition = "transform 0.5s";
            circleArr[index].style.transform = "scale(0)";
        });
        image.addEventListener("click", function() {
            let main = document.querySelector("main");
            let overlay = document.querySelector("#overlay");
    
            main.style.filter = "blur(5px)";
            main.style.transition = "filter 0.5s";
            overlay.style.transform = "rotateX(0deg)";
            overlay.style.transition = "transform 0.5s";
    
            cursor.style.backgroundColor = "black";
    
            setOverlay(index);
        });
    })
})();

/* https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/ */
