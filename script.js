// =====================================================
// MOBILE MENU
// =====================================================

const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

menuButton.addEventListener("click", function () {

    navbar.classList.toggle("active");

});


// Close menu when a navigation link is clicked

const navigationLinks =
    document.querySelectorAll(".navbar a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

    });

});


// =====================================================
// CURRENT YEAR
// =====================================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =====================================================
// IMAGE SLIDER
// =====================================================

const slidesContainer =
    document.getElementById("slides");

const dotsContainer =
    document.getElementById("sliderDots");

const imageUpload =
    document.getElementById("imageUpload");

const previousButton =
    document.getElementById("previousSlide");

const nextButton =
    document.getElementById("nextSlide");

let currentSlide = 0;


// =====================================================
// CREATE SLIDE
// =====================================================

function createSlide(imageURL, imageName) {

    const slide =
        document.createElement("div");

    slide.className = "slide";


    const image =
        document.createElement("img");

    image.src = imageURL;

    image.alt =
        imageName || "3K Group image";


    slide.appendChild(image);

    slidesContainer.appendChild(slide);

}


// =====================================================
// GET ALL SLIDES
// =====================================================

function getSlides() {

    return document.querySelectorAll(".slide");

}


// =====================================================
// SHOW SLIDE
// =====================================================

function showSlide(index) {

    const slides = getSlides();

    if (slides.length === 0) {
        return;
    }


    if (index >= slides.length) {
        currentSlide = 0;
    }


    if (index < 0) {
        currentSlide =
            slides.length - 1;
    }


    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    slides[currentSlide].classList.add("active");


    createDots();

}


// =====================================================
// NEXT SLIDE
// =====================================================

function nextSlide() {

    currentSlide++;

    showSlide(currentSlide);

}


// =====================================================
// PREVIOUS SLIDE
// =====================================================

function previousSlide() {

    currentSlide--;

    showSlide(currentSlide);

}


nextButton.addEventListener(
    "click",
    nextSlide
);


previousButton.addEventListener(
    "click",
    previousSlide
);


// =====================================================
// CREATE DOTS
// =====================================================

function createDots() {

    const slides = getSlides();

    dotsContainer.innerHTML = "";


    slides.forEach(function (slide, index) {

        const dot =
            document.createElement("span");

        dot.className = "dot";


        if (index === currentSlide) {

            dot.classList.add("active");

        }


        dot.addEventListener(
            "click",
            function () {

                currentSlide = index;

                showSlide(currentSlide);

            }
        );


        dotsContainer.appendChild(dot);

    });

}


// =====================================================
// ADD IMAGES
// =====================================================

imageUpload.addEventListener(
    "change",
    function (event) {

        const files =
            event.target.files;


        if (!files || files.length === 0) {
            return;
        }


        /*
         * Remove the default placeholder.
         */

        const placeholder =
            document.querySelector(".slide-placeholder");

        if (placeholder) {

            placeholder.parentElement.remove();

        }


        /*
         * Add every selected image
         * to the slideshow.
         */

        Array.from(files).forEach(
            function (file) {

                if (!file.type.startsWith("image/")) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        createSlide(
                            e.target.result,
                            file.name
                        );


                        currentSlide =
                            getSlides().length - 1;


                        showSlide(currentSlide);

                    };


                reader.readAsDataURL(file);

            }
        );


        /*
         * Allow the same image to
         * be selected again later.
         */

        imageUpload.value = "";

    }
);


// =====================================================
// INITIAL SLIDER
// =====================================================

showSlide(0);


// =====================================================
// AUTOMATIC SLIDESHOW
// =====================================================

setInterval(function () {

    const slides = getSlides();

    if (slides.length > 1) {

        nextSlide();

    }

}, 6000);


// =====================================================
// CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
            .value.trim();


        const email =
            document.getElementById("email")
            .value.trim();


        const service =
            document.getElementById("service")
            .value;


        const message =
            document.getElementById("message")
            .value.trim();


        if (
            name === "" ||
            email === "" ||
            service === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Please complete all required fields.";

            return;

        }


        formMessage.textContent =
            "Thank you. Your enquiry has been received.";


        contactForm.reset();

    }
);