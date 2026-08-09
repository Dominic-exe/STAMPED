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
            name: "STAMPED — Adelaide CBD",
            coords: [-34.9285, 138.6007],
            status: "Project area"
        },

        {
            name: "North Terrace",
            coords: [-34.9215, 138.6035],
            status: "Location to investigate"
        },

        {
            name: "Victoria Square",
            coords: [-34.9289, 138.5985],
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
        async (event) => {

            event.preventDefault();


            const firstName =
                document.getElementById(
                    "newsletter-first-name"
                ).value.trim();


            const lastName =
                document.getElementById(
                    "newsletter-last-name"
                ).value.trim();


            const email =
                document.getElementById(
                    "newsletter-email"
                ).value.trim();


            if (!firstName || !lastName || !email) {

                newsletterMessage.textContent =
                    "Please fill in all three fields.";

                return;

            }


            const submitButton =
                newsletterForm.querySelector(
                    "button[type='submit']"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Joining...";


            newsletterMessage.textContent = "";


            /*
             * Google Form submission endpoint.
             *
             * This is the same Google Form you created:
             *
             * 1FAIpQLSeolFJO3v1ZVUdg0h4k0N3tH2guKlpBXLo8qSgYmDSqImi86g
             */

            const googleFormURL =
                "https://docs.google.com/forms/d/e/1FAIpQLSeolFJO3v1ZVUdg0h4k0N3tH2guKlpBXLo8qSgYmDSqImi86g/formResponse";


            const formData =
                new FormData();


            formData.append(
                "entry.1353931657",
                firstName
            );


            formData.append(
                "entry.224314355",
                lastName
            );


            formData.append(
                "entry.172986692",
                email
            );


            try {

                await fetch(
                    googleFormURL,
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: formData
                    }
                );


                /*
                 * Google Forms doesn't return a readable
                 * response when using no-cors.
                 *
                 * If the request was sent, we treat it
                 * as successful.
                 */

                newsletterMessage.textContent =
                    "You're in. We'll see you underground.";

                newsletterMessage.style.color =
                    "#FBC560";


                newsletterForm.reset();


            } catch (error) {

                console.error(
                    "Newsletter signup failed:",
                    error
                );


                newsletterMessage.textContent =
                    "Something went wrong. Please try again.";


                newsletterMessage.style.color =
                    "#D53302";

            }


            submitButton.disabled = false;

            submitButton.textContent =
                "Join";

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