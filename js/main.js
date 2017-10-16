/**
    Express Me | A personal portfolio HTML Template 
    Author: Ayush Agarwal (Friendsocial Developer Network) (contact@thisisayush.com)
    License: MIT
    Features:
    1. Particles Background (Customisable)
    2. Social Links
    3. 4 Sections - Home, About, Portfolio, Contact
    4. Smooth Scrolling
    5. JSON Data Implementation
    6. Typed.js Animated Section
    7. Scroll Reveal Effects
    8. 4 Personal FEatures in About Section
    9. 4 Portfolio Boxes in Portfolio Section
    10. Section Headings
    11. Preloader (CSS Powered)
    12. Page Progress Indicator
 **/
$(document).ready(function (e) {
    var portfolioGrid = null;
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var nav = $("#primaryNav");
    /** Load Particles Background **/
    $(".bg-particles").each(function () {
        // Loop through each background layer to check enabled flag
        var ele = $(this);
        if (ele.data("enabled") == 1 || ele.data("enabled") == "1") {
            particlesJS.load(ele.attr("id"), 'js/particles-config.json');
            $(window).resize(function () {
                // Fix Particles on window resize
                particlesJS.load(ele.attr("id"), 'js/particles-config.json');
            });
        }
    });
    // Add typing Animation to Home Subtitle 
    var typedStrings = [];
    $.each($("#aboutSubTitleStrings p"), function(i,v){
        typedStrings.push($(this).html());
    });
    $("#aboutSubTitle .animated-type").typed({
        strings: typedStrings,
        loop: true,
        loopCount: null,
        typeSpeed: 60
    });
    // Add inview animation trigger to Skills
    $(".skill").each(function () {
        var done = false; // Flag to check if effect is already done
        $(this).on("inview", function () {
            // Trigger on view
            if (done) {
                // If done
                $(this).off("inview"); // Detach this event
                return false; // End
            }
            done = true; // Set Done flag
            var $this = $(this);
            var progress = $(this).find(".progress-bar"); // Select Progress Bar
            var value = parseInt(progress.attr("aria-valuenow")); // Get Final Value
            progress.attr("aria-valuenow", "0");
            progress.css("width", "0%");
            var time = 3000; // Progress Bar Animation time
            var interval = time / value;
            var last = 0; // Stores last value
            var timer = setInterval(function () {
                var curr = parseInt(progress.attr("aria-valuenow")); // Get Current Value
                if (curr == value) {
                    // End if current value == value
                    clearInterval(timer);
                    return false;
                }
                last = curr + 1;
                requestAnimationFrame(function () {
                    // Request Animation Frame for smoother animations
                    progress.attr("aria-valuenow", last);
                    progress.css("width", last + "%");
                    progress.html(last + "%");
                });
            }, interval);
        });
    });
    // Add inview animation trigger to CounterBox
    $('.counter-box').each(function () {
        var done = false; // Done flag
        $(this).on("inview", function () {
            if (done) {
                $(this).off("inview");
                return true;
            }
            done = true;
            var $this = $(this);
            var counter = $(this).find(".counter");
            var end = parseInt(counter.data('end'));
            var step = counter.data("step");
            if (step == undefined || step == "undefined" || step <= 0)
                step = 1;
            var time = 5000;
            var interval = time * step / end;
            var last = 0;
            counter.html("0");
            var timer = setInterval(function () {
                var now = parseInt(counter.html());
                curr = now + step;
                if (now == end)
                    clearInterval(timer);
                else {
                    if (curr > end) {
                        curr = end;
                    }
                    last = curr;
                    requestAnimationFrame(function () {
                        counter.html(last);
                    });
                }
            }, interval);
        });
    });
    // Generate Portfolio Isotope Grid
    var portfolioContainer = $(".portfolio-container");
    var portfolioOptions = {
        itemSelector: '.portfolio-box',
        layoutMode: '',
        percentPosition: true,
    };
    if(portfolioContainer.attr("data-layout-mode") == "masonry"){
        portfolioOptions.layoutMode = "masonry";
        portfolioOptions.masonry = {
            horizontalOrder: true
        };
    }else{
        portfolioOptions.layoutMode = "fitRows";
    }
    portfolioGrid = $(".portfolio-container").isotope(portfolioOptions);
    // Add Filter Functionality to Portfolio
    $(".portfolio-categories>ul>li>a").click(function (e) {
        e.preventDefault();
        var filter = $(this).data("category"); //Get the category to filter
        // Filter the data
        portfolioGrid.isotope({
            filter: filter
        });
        $(".portfolio-categories>ul>li>a.active").removeClass("active"); //Detach active class from current category
        $(this).addClass("active"); //Attach active class to new category
        fixAbsCenter(); //Fix Positioning
    });
    // Bind Window Size dependent operations 
    $(window).resize(function () {
        portfolioGrid.isotope('layout'); // Fix Isotope Layout
        fixAbsCenter(); // Fix Overall Layouts
    });

    function checkNavBar() {
        requestAnimationFrame(function () {
            var scrollTop = $(document).scrollTop();
            var childOffset = $("section.slide:nth-child(2)").offset().top;
            if (scrollTop > childOffset) {
                if(nav.attr("data-status") == "off"){
                    nav.show();
                    nav.attr("data-status", "on");
                    nav.animateCss("slideInDown");
                    nav.one(animationEnd, function(){
                        nav.show();
                    });
                }
            } else {
                if (scrollTop < childOffset - nav.height() - 20) {
                    if(nav.attr("data-status") == "on"){
                        nav.attr("data-status", "off");
                        nav.animateCss("slideOutUp").hide();
                    }
                    nav.one(animationEnd, function(){
                        nav.hide();
                    }); 
                }
            }
        });
    }
    
    $(window).on("load", function (e) {
        if(portfolioGrid != null)
            portfolioGrid.isotope('layout');
        fixAbsCenter();
        checkNavBar();
    });

    $(window).on("scroll", function (e) {
        checkNavBar();
        if($(this).scrollTop() > 0)
            $("#pageTop").fadeIn();
        else
            $("#pageTop").fadeOut();
    });


    function fixAbsCenter() {
        // This Fuction calculates the height of div or any other elements
        // And sets the css height property to the element and min-height property to it's parent section
        var mHeight = 0;
        $(".absolute-center").each(function () {
            mHeight = 0;
            $(this).children("div").each(function () {
                mHeight += $(this).height();
            });
            var parent = $(this).parents("section.slide");
            var p = 0;
            if (parent.hasClass('full-screen'))
                p = ($(window).height() > mHeight) ? $(window).height() : mHeight;
            else
                p = mHeight;
            $(this).height(mHeight);
            $(this).parents("section.slide").css("min-height", p + 60);
        });
    }
    /** Extension for animate.css */
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                console.log("D");
                $(this).removeClass('animated ' + animationName);
                return $(this);
            });
        }
    });
    fixAbsCenter();
    setTimeout(function () {
        $("#preloader").fadeOut(100);
    }, 2000);
    if(nav.attr("data-status") == "off")
        nav.hide();
});