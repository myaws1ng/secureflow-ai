/*
=====================================================
 SecureFlow AI Website JavaScript
 main.js

 Part 1 (Final)

 Features:
 - Mobile navigation
 - FAQ accordion
 - Smooth scrolling
 - Header scroll behaviour
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





    const navLinks =
        navMenu.querySelectorAll(
            "a"
        );



    navLinks.forEach(
        function(link) {


            link.addEventListener(
                "click",
                function() {


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
        function(item) {


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
                function() {


                    const isOpen =
                        item.classList.contains(
                            "active"
                        );



                    faqItems.forEach(
                        function(faq) {


                            faq.classList.remove(
                                "active"
                            );


                        }
                    );



                    if (
                        !isOpen
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
        function(link) {


            link.addEventListener(
                "click",
                function(event) {


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
        function() {


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






// =====================================================
// END OF MAIN.JS PART 1
// =====================================================

/*
=====================================================
 SecureFlow AI Website JavaScript
 main.js

 Part 2 (Final)

 Features:
 - Formspree contact submission
 - Form validation
 - Button loading states
 - Back-to-top button
 - Dynamic copyright year
 - External link handling
=====================================================
*/





// =====================================================
// CONTACT FORM - FORMSPREE SUBMISSION
// =====================================================


function initializeContactForm() {


    const form =
        document.getElementById(
            "contactForm"
        );



    if (
        !form
    ) {

        return;

    }





    form.addEventListener(
        "submit",
        async function(event) {


            /*
            Prevent normal browser submission.
            JavaScript will send data to Formspree.
            */

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





            const formData =
                new FormData(
                    form
                );





            try {


                const response =
                    await fetch(
                        form.action,
                        {

                            method:
                                "POST",

                            body:
                                formData,

                            headers:
                            {

                                "Accept":
                                "application/json"

                            }

                        }
                    );





                if (
                    response.ok
                ) {



                    showFormMessage(
                        form,
                        "Thank you. Your enquiry has been received.",
                        "success"
                    );



                    form.reset();



                    trackEvent(
                        "lead_submission",
                        {
                            source:
                            "website_contact_form"
                        }
                    );



                } else {


                    throw new Error(
                        "Form submission failed"
                    );


                }



            }
            catch(error)
            {


                console.error(
                    error
                );



                showFormMessage(
                    form,
                    "Unable to send enquiry. Please try again.",
                    "error"
                );


            }





            setButtonLoading(
                submitButton,
                false
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



    }
    else
    {



        button.textContent =
            button.dataset.originalText
            ||
            "Send Enquiry";



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


            }
            else
            {


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

                    top:
                        0,

                    behavior:
                        "smooth"

                }
            );


        }
    );


}







// =====================================================
// UPDATE COPYRIGHT YEAR
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
// EXTERNAL LINK SECURITY
// =====================================================


function initializeExternalLinks() {


    const links =
        document.querySelectorAll(
            "a[href^='http']"
        );



    links.forEach(
        function(link) {



            if (
                link.hostname !==
                window.location.hostname
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
// SIMPLE ANALYTICS EVENT TRACKING
// =====================================================


function trackEvent(
    eventName,
    eventData = {}
) {


    console.log(
        "Analytics:",
        eventName,
        eventData
    );


}





// =====================================================
// INITIALISE PART 2
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
// END OF MAIN.JS PART 2
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
 - Performance monitoring
=====================================================
*/





// =====================================================
// COOKIE CONSENT
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
            We use cookies to improve your
            website experience and analyse
            website traffic.
            </p>


            <div class="cookie-actions">

                <button 
                id="acceptCookies"
                class="btn btn-primary">

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



    if (
        acceptButton
    ) {


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


}








// =====================================================
// ACCESSIBILITY IMPROVEMENTS
// =====================================================


function initializeAccessibility() {



    /*
    Ensure images have alt text
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
                    "SecureFlow AI automation service";


            }


        }
    );






    /*
    Add keyboard accessibility
    to interactive cards
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



}







// =====================================================
// IMAGE LAZY LOADING
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
                function(entries) {



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



    }
    else
    {


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
// SECURITY ENHANCEMENTS
// =====================================================


function initializeSecurity() {


    /*
    Add noopener protection
    for external links
    */


    const externalLinks =
        document.querySelectorAll(
            "a[target='_blank']"
        );



    externalLinks.forEach(
        function(link) {


            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );


        }
    );






    /*
    Detect iframe embedding
    */


    if (
        window.top !== window.self
    ) {


        console.warn(
            "SecureFlow AI loaded inside iframe"
        );


    }



}







// =====================================================
// GLOBAL ERROR HANDLING
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
            Send errors to Sentry
            or monitoring platform.
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
// PERFORMANCE MONITORING
// =====================================================


function initializePerformanceMonitoring() {


    window.addEventListener(
        "load",
        function() {



            if (
                performance
            ) {


                const loadTime =
                    performance.now();



                trackEvent(
                    "page_load",
                    {

                        load_time:
                            Math.round(
                                loadTime
                            )

                    }
                );


            }



        }
    );


}







// =====================================================
// INITIALISE PART 3
// =====================================================


document.addEventListener(
    "DOMContentLoaded",
    function() {


        initializeCookieConsent();


        initializeAccessibility();


        initializeLazyLoading();


        initializeSecurity();


        initializeErrorHandling();


        initializePerformanceMonitoring();



    }
);







// =====================================================
// SECUREFLOW AI main.js COMPLETE
// =====================================================
