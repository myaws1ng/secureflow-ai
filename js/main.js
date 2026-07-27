/*
=====================================================
 SecureFlow AI Website JavaScript
 main.js

 Part 1

 Features:
 - Mobile navigation
 - FAQ accordion
 - Smooth scrolling
 - Header behaviour
=====================================================
*/


// =====================================================
// WAIT FOR PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "SecureFlow AI website loaded"
        );


        initializeMobileMenu();

        initializeFAQ();

        initializeSmoothScroll();

        initializeHeader();


    }
);




// =====================================================
// MOBILE MENU
// =====================================================


function initializeMobileMenu() {


    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const navMenu =
        document.getElementById(
            "navMenu"
        );



    if (
        !menuToggle ||
        !navMenu
    ) {

        return;

    }



    menuToggle.addEventListener(
        "click",
        function () {


            navMenu.classList.toggle(
                "active"
            );


            menuToggle.classList.toggle(
                "open"
            );


        }
    );



    /*
    Close menu when clicking a link
    */


    const navLinks =
        navMenu.querySelectorAll(
            "a"
        );



    navLinks.forEach(
        function (link) {


            link.addEventListener(
                "click",
                function () {


                    navMenu.classList.remove(
                        "active"
                    );


                    menuToggle.classList.remove(
                        "open"
                    );


                }
            );


        }
    );



}





// =====================================================
// FAQ ACCORDION
// =====================================================


function initializeFAQ() {


    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );



    if (
        faqItems.length === 0
    ) {

        return;

    }




    faqItems.forEach(
        function (item) {


            const question =
                item.querySelector(
                    ".faq-question"
                );


            const answer =
                item.querySelector(
                    ".faq-answer"
                );



            if (
                !question ||
                !answer
            ) {

                return;

            }




            question.addEventListener(
                "click",
                function () {



                    const currentlyOpen =
                        item.classList.contains(
                            "active"
                        );



                    /*
                    Close all FAQ items
                    */


                    faqItems.forEach(
                        function (faq) {


                            faq.classList.remove(
                                "active"
                            );


                        }
                    );




                    /*
                    Open selected item
                    */


                    if (
                        !currentlyOpen
                    ) {


                        item.classList.add(
                            "active"
                        );


                    }



                }
            );



        }
    );


}






// =====================================================
// SMOOTH SCROLL
// =====================================================


function initializeSmoothScroll() {


    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );



    links.forEach(
        function (link) {


            link.addEventListener(
                "click",
                function (event) {



                    const targetID =
                        this.getAttribute(
                            "href"
                        );



                    if (
                        targetID === "#"
                    ) {

                        return;

                    }




                    const target =
                        document.querySelector(
                            targetID
                        );



                    if (
                        target
                    ) {


                        event.preventDefault();



                        target.scrollIntoView(
                            {

                                behavior:
                                    "smooth",

                                block:
                                    "start"

                            }
                        );


                    }



                }
            );


        }
    );


}






// =====================================================
// HEADER SCROLL EFFECT
// =====================================================


function initializeHeader() {


    const header =
        document.querySelector(
            "header"
        );



    if (
        !header
    ) {

        return;

    }




    window.addEventListener(
        "scroll",
        function () {



            if (
                window.scrollY > 50
            ) {


                header.classList.add(
                    "scrolled"
                );


            } else {


                header.classList.remove(
                    "scrolled"
                );


            }



        }
    );


}

/*
=====================================================
 SecureFlow AI Website JavaScript
 main.js

 Part 2

 Features:
 - Contact form handling
 - Form validation
 - Loading states
 - Back to top button
 - Dynamic year update
 - External links
 - Analytics placeholder
=====================================================
*/



// =====================================================
// CONTACT FORM VALIDATION
// =====================================================


function initializeContactForm() {


    const forms =
        document.querySelectorAll(
            "form"
        );



    if (
        forms.length === 0
    ) {

        return;

    }




    forms.forEach(
        function(form) {



            form.addEventListener(
                "submit",
                function(event) {



                    event.preventDefault();



                    const submitButton =
                        form.querySelector(
                            "button[type='submit']"
                        );



                    const name =
                        form.querySelector(
                            "input[name='name']"
                        );



                    const email =
                        form.querySelector(
                            "input[name='email']"
                        );



                    if (
                        name &&
                        name.value.trim() === ""
                    ) {


                        showFormMessage(
                            form,
                            "Please enter your name.",
                            "error"
                        );


                        return;


                    }




                    if (
                        email &&
                        !validateEmail(
                            email.value
                        )
                    ) {


                        showFormMessage(
                            form,
                            "Please enter a valid email address.",
                            "error"
                        );


                        return;


                    }




                    setButtonLoading(
                        submitButton,
                        true
                    );



                    /*
                    Replace this section with:
                    - Formspree
                    - Netlify Forms
                    - EmailJS
                    - Backend API

                    Example currently simulates
                    successful submission.
                    */



                    setTimeout(
                        function() {


                            setButtonLoading(
                                submitButton,
                                false
                            );


                            showFormMessage(
                                form,
                                "Thank you. Your enquiry has been submitted.",
                                "success"
                            );


                            form.reset();



                        },
                        1500
                    );



                }
            );


        }
    );


}






// =====================================================
// EMAIL VALIDATION
// =====================================================


function validateEmail(
    email
) {


    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return pattern.test(
        email
    );


}





// =====================================================
// FORM MESSAGE DISPLAY
// =====================================================


function showFormMessage(
    form,
    message,
    type
) {


    let messageBox =
        form.querySelector(
            ".form-message"
        );



    if (
        !messageBox
    ) {


        messageBox =
            document.createElement(
                "div"
            );


        messageBox.className =
            "form-message";


        form.appendChild(
            messageBox
        );


    }



    messageBox.textContent =
        message;



    messageBox.className =
        "form-message " + type;



}






// =====================================================
// BUTTON LOADING STATE
// =====================================================


function setButtonLoading(
    button,
    loading
) {


    if (
        !button
    ) {

        return;

    }



    if (
        loading
    ) {


        button.dataset.originalText =
            button.textContent;


        button.textContent =
            "Sending...";


        button.disabled =
            true;



    } else {



        button.textContent =
            button.dataset.originalText
            ||
            "Submit";



        button.disabled =
            false;



    }


}






// =====================================================
// BACK TO TOP BUTTON
// =====================================================


function initializeBackToTop() {


    const button =
        document.createElement(
            "button"
        );



    button.innerHTML =
        "↑";



    button.className =
        "back-to-top";



    button.setAttribute(
        "aria-label",
        "Back to top"
    );



    document.body.appendChild(
        button
    );




    window.addEventListener(
        "scroll",
        function() {



            if (
                window.scrollY > 500
            ) {


                button.classList.add(
                    "visible"
                );


            } else {


                button.classList.remove(
                    "visible"
                );


            }


        }
    );





    button.addEventListener(
        "click",
        function() {


            window.scrollTo(
                {

                    top:0,

                    behavior:"smooth"

                }
            );


        }
    );


}






// =====================================================
// AUTO UPDATE COPYRIGHT YEAR
// =====================================================


function updateCopyrightYear() {


    const year =
        new Date()
        .getFullYear();



    const elements =
        document.querySelectorAll(
            ".copyright"
        );



    elements.forEach(
        function(element) {


            element.innerHTML =
                element.innerHTML.replace(
                    /\d{4}/,
                    year
                );


        }
    );


}






// =====================================================
// EXTERNAL LINKS
// =====================================================


function initializeExternalLinks() {


    const links =
        document.querySelectorAll(
            "a[href^='http']"
        );



    links.forEach(
        function(link) {


            if (
                !link.hostname.includes(
                    window.location.hostname
                )
            ) {


                link.setAttribute(
                    "target",
                    "_blank"
                );


                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );


            }


        }
    );


}






// =====================================================
// ANALYTICS PLACEHOLDER
// =====================================================


function trackEvent(
    eventName,
    eventData = {}
) {


    /*
    Connect your analytics platform here.

    Example:

    Google Analytics:
    gtag('event', eventName, eventData);

    Matomo:
    _paq.push(...);

    */



    console.log(
        "Analytics Event:",
        eventName,
        eventData
    );


}






// =====================================================
// INITIALISE PART 2 FEATURES
// =====================================================


document.addEventListener(
    "DOMContentLoaded",
    function() {


        initializeContactForm();

        initializeBackToTop();

        updateCopyrightYear();

        initializeExternalLinks();



    }
);






// =====================================================
// END OF PART 2
// =====================================================




// =====================================================
// END OF PART 1
// =====================================================
/*
=====================================================
 SecureFlow AI Website JavaScript
 main.js

 Part 3 (Final)

 Features:
 - Cookie consent
 - Accessibility improvements
 - Lazy loading
 - Security enhancements
 - Error handling
 - Performance optimisation
=====================================================
*/



// =====================================================
// COOKIE CONSENT BANNER
// =====================================================


function initializeCookieConsent() {


    const consentKey =
        "secureflow_cookie_consent";



    const existingConsent =
        localStorage.getItem(
            consentKey
        );



    if (
        existingConsent
    ) {

        return;

    }





    const banner =
        document.createElement(
            "div"
        );


    banner.className =
        "cookie-banner";



    banner.innerHTML = `

        <div class="cookie-content">

            <p>

            We use cookies to improve website
            experience, analyse traffic and
            maintain security.

            </p>


            <div class="cookie-actions">

                <button
                class="btn btn-primary"
                id="acceptCookies">

                    Accept

                </button>


                <a
                href="privacy.html"
                class="btn btn-outline">

                    Privacy Policy

                </a>

            </div>

        </div>

    `;



    document.body.appendChild(
        banner
    );




    const acceptButton =
        document.getElementById(
            "acceptCookies"
        );



    acceptButton.addEventListener(
        "click",
        function() {


            localStorage.setItem(
                consentKey,
                "accepted"
            );


            banner.remove();


        }
    );


}






// =====================================================
// ACCESSIBILITY IMPROVEMENTS
// =====================================================


function initializeAccessibility() {



    /*
    Add keyboard accessibility
    to clickable cards
    */


    const cards =
        document.querySelectorAll(
            ".card"
        );



    cards.forEach(
        function(card) {


            if (
                card.querySelector(
                    "a"
                )
            ) {

                return;

            }



            card.setAttribute(
                "tabindex",
                "0"
            );



            card.addEventListener(
                "keypress",
                function(event) {


                    if (
                        event.key ===
                        "Enter"
                    ) {


                        card.click();


                    }


                }
            );



        }
    );





    /*
    Improve external image accessibility
    */


    const images =
        document.querySelectorAll(
            "img"
        );



    images.forEach(
        function(image) {


            if (
                !image.alt
            ) {


                image.alt =
                    "SecureFlow AI service image";


            }


        }
    );



}






// =====================================================
// LAZY LOAD IMAGES
// =====================================================


function initializeLazyLoading() {



    const images =
        document.querySelectorAll(
            "img[data-src]"
        );



    if (
        images.length === 0
    ) {

        return;

    }




    if (
        "IntersectionObserver"
        in window
    ) {



        const observer =
            new IntersectionObserver(
                function(entries, observer) {



                    entries.forEach(
                        function(entry) {



                            if (
                                entry.isIntersecting
                            ) {


                                const image =
                                    entry.target;



                                image.src =
                                    image.dataset.src;



                                image.removeAttribute(
                                    "data-src"
                                );



                                observer.unobserve(
                                    image
                                );


                            }



                        }
                    );



                }
            );





        images.forEach(
            function(image) {


                observer.observe(
                    image
                );


            }
        );



    } else {



        /*
        Browser fallback
        */


        images.forEach(
            function(image) {


                image.src =
                    image.dataset.src;



            }
        );


    }



}






// =====================================================
// SECURITY HARDENING
// =====================================================


function initializeSecurity() {


    /*
    Prevent accidental
    empty javascript links
    */


    const links =
        document.querySelectorAll(
            "a"
        );



    links.forEach(
        function(link) {


            if (
                link.href ===
                "javascript:;"
            ) {


                link.removeAttribute(
                    "href"
                );


            }


        }
    );





    /*
    Prevent clickjacking-related
    unsafe embedding behaviour
    */


    if (
        window.top !== window.self
    ) {


        console.warn(
            "Website loaded inside iframe"
        );


    }



}






// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================


function initializeErrorHandling() {



    window.addEventListener(
        "error",
        function(event) {


            console.error(
                "Website Error:",
                event.message
            );


            /*
            Future integration:
            Send errors to monitoring
            platform such as Sentry.
            */


        }
    );



    window.addEventListener(
        "unhandledrejection",
        function(event) {


            console.error(
                "Unhandled Promise Error:",
                event.reason
            );


        }
    );


}






// =====================================================
// PERFORMANCE OPTIMISATION
// =====================================================


function initializePerformance() {


    /*
    Add page load timing capture
    */


    window.addEventListener(
        "load",
        function() {



            const loadTime =
                performance.now();



            trackEvent(
                "page_loaded",
                {

                    load_time:
                        Math.round(
                            loadTime
                        )

                }
            );



        }
    );



}






// =====================================================
// FINAL INITIALISATION
// =====================================================


document.addEventListener(
    "DOMContentLoaded",
    function() {


        initializeCookieConsent();


        initializeAccessibility();


        initializeLazyLoading();


        initializeSecurity();


        initializeErrorHandling();


        initializePerformance();



    }
);






// =====================================================
// SECUREFLOW AI main.js COMPLETE
// =====================================================
