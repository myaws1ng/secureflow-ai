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






// =====================================================
// END OF PART 1
// =====================================================
