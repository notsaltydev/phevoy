
//Init pageloader
function initPageLoader() {
    $('.pageloader').toggleClass('is-active');
    $(window).on('load', function () {
        var pageloaderTimeout = setTimeout(function () {
            $('.pageloader').toggleClass('is-active');
            $('.infraloader').toggleClass('is-active')
            clearTimeout(pageloaderTimeout);
            setTimeout(function () {
                $('.rounded-hero').addClass('is-active');
            }, 350)
        }, 700);
    })
}

//Disable sidebar links in development
function disableSidebarLinks() {
    $('.navigation-menu .is-submenu').each(function () {
        $(this).attr('href', 'javascript:void(0);');
    })
}

//Change demo images
function changeDemoImages() {
    $('*[data-demo-src]').each(function () {
        var newSrc = $(this).attr('data-demo-src');
        if (newSrc !== undefined) {
            $(this).attr('src', newSrc);
        }
    });

    $('*[data-demo-background]').each(function () {
        var newBg = $(this).attr('data-demo-background');
        if (newBg !== undefined) {
            $(this).attr('data-background', newBg);
        }
    });
}

//Init navbar
function initNavbar() {
    //Navbar fade
    if ($('.navbar-wrapper.navbar-fade.navbar-light').length) {
        $(".navbar-wrapper.navbar-fade").wrap('<div class="navbar-placeholder"></div>');
        $(".navbar-placeholder").height(jQuery(".navbar-wrapper.navbar-fade").outerHeight());
        $(window).on('scroll', function () {
            var height = $(window).scrollTop();
            if (height > 65) {
                $(".navbar-wrapper.navbar-fade.is-transparent").removeClass('is-transparent navbar-light').addClass('navbar-faded');
            } else {
                $(".navbar-wrapper").removeClass('navbar-faded').addClass('is-transparent navbar-light');
            }
        });
    }

    //Navbar fade
    if ($('.navbar-wrapper.navbar-fade.navbar-default').length) {
        $(".navbar-wrapper.navbar-fade").wrap('<div class="navbar-placeholder"></div>');
        $(".navbar-placeholder").height(jQuery(".navbar-wrapper.navbar-fade").outerHeight());
        $(window).on('scroll', function () {
            var height = $(window).scrollTop();
            if (height > 65) {
                $(".navbar-wrapper.navbar-fade.is-transparent").removeClass('is-transparent').addClass('navbar-faded');
            } else {
                $(".navbar-wrapper").removeClass('navbar-faded').addClass('is-transparent');
            }
        });
    }

    //Navbar Clone
    if ($('.is-cloned').length) {
        $(window).scroll(function () {
            var height = $(window).scrollTop();  //getting the scrolling height of window
            if (height > 50) {
                $(".is-cloned").addClass('is-active');
            } else {
                $(".is-cloned").removeClass('is-active');
            }
        });
    }

    //Mobile navbar dropdown
    $('.mobile-drop').on('click', function () {
        $(this).toggleClass('is-active');
        $(this).find('.child-menu').slideToggle();
    })
}

//Mobile menu toggle
function initMobileMenu() {
    $('.custom-burger').on("click", function () {

        var menu_id = $(this).attr('data-target');
        $(this).toggleClass('is-active');
        $("#" + menu_id).toggleClass('is-active');
        $('.navbar.navbar-light').toggleClass('is-dark-mobile')
    });

    $('.custom-burger').on('click', function () {
        $(this).find('.icon-box-toggle').toggleClass('active');
    })
}

//Init Sidebar
function initSidebar() {
    $(".navigation-menu > li.has-children a.parent-link").on("click", function (i) {
        i.preventDefault();
        if (!$(this).parent().hasClass("active")) {
            $(".navigation-menu li ul").slideUp();
            $(this).next().slideToggle();
            $(".navigation-menu li").removeClass("active");
            $(this).parent().addClass("active");
        }
        else {
            $(this).next().slideToggle();
            $(".navigation-menu li").removeClass("active");
        }
    });
    //sidebar category toggle
    $('.category-link').on("click", function () {
        $('.category-link.is-active').removeClass('is-active');
        $(this).addClass('is-active');
    })
    //Sidebar close button
    $('.hamburger-btn').on("click", function () {
        $('#navigation-trigger .menu-toggle .icon-box-toggle, .navigation-close .menu-toggle .icon-box-toggle, .navigation-trigger .menu-toggle .icon-box-toggle, .navigation-close .menu-toggle .icon-box-toggle').toggleClass('active');
    })
    //Menu buttons sync
    $('#navigation-trigger, .navigation-trigger, .navigation-close').on("click", function () {
        $('.side-navigation-menu').toggleClass('is-active');
    })
    //Data navigation menu setup
    $('.category-link').on("click", function () {
        var category_id = $(this).attr('data-navigation-menu');
        $('.navigation-menu-wrapper').addClass('is-hidden');
        $("#" + category_id).removeClass('is-hidden');
    })
    //Manage close links visibility to display only one at a time
    $('.side-navigation-menu').on("mouseenter", function () {
        $('#navigation-trigger').css('opacity', '0');
        $('.navigation-close').css('opacity', '1');
    })
    $('.side-navigation-menu').on("mouseleave", function () {
        $('#navigation-trigger').css('opacity', '1');
        $('.navigation-close').css('opacity', '0');
    })
}