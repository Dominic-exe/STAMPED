/* =====================================================
   STAMPED
   Main Site JavaScript
   ===================================================== */


/* =====================================================
   MOBILE NAVIGATION
   ===================================================== */

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");


if (navToggle && mainNav) {

    navToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("open");

        navToggle.classList.toggle("open");

        navToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");
            navToggle.classList.remove("open");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =====================================================
   HEADER SCROLL STATE
   ===================================================== */

const header =
    document.querySelector(".site-header");


function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =====================================================
   SCROLL REVEALS
   ===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   HERO VIDEO
   ===================================================== */

const heroVideo =
    document.querySelector(".hero-video");


const heroImage =
    document.querySelector(".hero-image");


if (heroVideo) {

    heroVideo.addEventListener(
        "canplay",
        () => {

            heroVideo.classList.add("loaded");

            if (heroImage) {

                heroImage.style.opacity = "0";

            }

        }
    );


    heroVideo.addEventListener(
        "error",
        () => {

            /*
                If the video doesn't exist yet,
                the poster/image remains visible.
            */

            heroVideo.style.display = "none";

        }
    );

}


/* =====================================================
   SMOOTH INTERNAL LINKS
   ===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


/* =====================================================
   ADELAIDE MAP
   ===================================================== */

const mapElement =
    document.getElementById("stamped-map");


if (mapElement && typeof L !== "undefined") {

    const adelaide =
        [-34.9285, 138.6007];


    const map =
        L.map(
            "stamped-map",
            {
                scrollWheelZoom: false
            }
        ).setView(
            adelaide,
            14
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(map);


    /*
        PLACEHOLDER LOCATIONS

        Replace these with actual STAMPED locations
        once the project mapping begins.
    */

    const locations = [

         {
            name: "North Terrace",
            coords: [-34.9215, 138.6035],
            status: "Location to investigate"
        },

        {
            name: "Victoria Square",
            coords: [-34.9289, 138.5985],
            status: "Location to investigate"
        },


        {
            name: "Hutt Street",
            coords: [-34.9308, 138.6122],
            status: "Location to investigate"
        },

        {
            name: "Adelaide Central Market",
            coords: [-34.9296, 138.5974],
            status: "Location to investigate"
        },
        
        {
            name: "Hindley Street",
            coords: [-34.9232, 138.5957],
            status: "Location to investigate"
        },

          {
            name: "Rundle Street",
            coords: [-34.9224, 138.6092],
            status: "Location to investigate"
        }

       

    ];


    locations.forEach(location => {

        L.marker(location.coords)
            .addTo(map)
            .bindPopup(
                `<strong>${location.name}</strong><br>${location.status}`
            );

    });

}
/* =====================================================
   NEWSLETTER
   Google Forms integration
   ===================================================== */

const newsletterForm =
    document.getElementById("newsletter-form");

const newsletterMessage =
    document.getElementById("newsletter-message");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        () => {

            const submitButton =
                newsletterForm.querySelector(
                    "button[type='submit']"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Joining...";


            /*
             * Google Forms receives the submission
             * through the hidden iframe.
             *
             * The visitor never leaves STAMPED.
             */

            setTimeout(() => {

                newsletterMessage.textContent =
                    "You're in. We'll see you underground.";

                newsletterMessage.style.color =
                    "#FBC560";


                newsletterForm.reset();


                submitButton.disabled = false;

                submitButton.textContent =
                    "Join";

            }, 1000);

        }
    );

}


/* =====================================================
   CONSOLE
   ===================================================== */

console.log(
    "%cSTAMPED",
    "font-size:24px;font-weight:bold;"
);

console.log(
    "The Adelaide Manhole Project."
);