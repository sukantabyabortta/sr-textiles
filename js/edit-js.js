jQuery(function($) {
    $(window).on("load", function() {
        $("div.loadScreen").fadeOut();
    });

    // Submenu
    $.fn.submenu = function() {
        var $self = $(this);
        $self.each(function(index, elem) {
            var hasChild = $(elem).children('ul');
            var childrenLength = $(elem).children('ul').length;
            if (childrenLength) {
                $(this).prepend('<i class="nav-drp-arw"></i>');

                //[ .nav-drp-arw css:-
                //.nav-drp-arw {  position: absolute; right: 0; top: 14px; cursor: pointer; }
                // .nav-drp-arw:after { font-size: 20px; font-weight: bold; color: #fff; content: '+'; }
                // .nav-drp-arw.current:after { background: #fff; width: 15px; height: 3px; content: ''; position: absolute; right: 0; top: 8px; } ]

            }

            $(elem).on('click', '.nav-drp-arw', function(e) {
                $(this).toggleClass('current');
                $(this).parent('li').find('> ul').stop(true, true).slideToggle('fast');
                $(this).parent('li').siblings().find('ul').stop(true, true).slideUp('fast');
                $(this).parent('li').siblings().find('.nav-drp-arw').removeClass('current');
                e.stopPropagation();
            });

            if ($('.header_nav li:has(> ul)')) {
                $(this).find('ul').prev('a').removeAttr('href');
            }

            // If "a" link need to toggle then use this bottom code
            $(elem).on('click', ' > a', function(e) {
                // $(this).parent('li').addClass('active');
                $(this).parent('li').find('> ul').stop(true, true).slideToggle('fast');
                $(this).parent('li').siblings().find('ul').stop(true, true).slideUp('fast');
                $(this).parent('li').siblings().find('.nav-drp-arw').removeClass('active');
                e.stopPropagation();
            });
            //=========================================================
        });
    }
    $('.header_nav ul li').submenu();
    $('.header_nav ul li.current').children('ul').show();
    $('.header_nav li.current').children('.nav-drp-arw').addClass('current');

    // Document click div hide 
    $(document).mouseup(function(e) {
        if ($(e.target).closest(".header_nav").length === 0) {
            $(".header_nav ul ul").slideUp('fast');
        }
    });

    // Font resize js:
    var $affectedElements = $("*");
    $affectedElements.each(function() {
        var $this = $(this);
        $this.data("orig-size", $this.css("font-size"));
    });
    var increaseCount = 0;
    var decreaseCount = 0;
    $("#increasetext").click(function(e) {
        e.preventDefault();
        if (increaseCount < 2) {
            changeFontSize(1);
            increaseCount++;
        }
        if (increaseCount === 2) {
            $(this).prop('disabled', true);
        }
    });
    $("#decreasetext").click(function(e) {
        e.preventDefault();
        if (decreaseCount < 2) {
            changeFontSize(-1);
            decreaseCount++;
        }
        if (decreaseCount === 2) {
            $(this).prop('disabled', true);
        }
    });
    $("#resettext").click(function(e) {
        e.preventDefault();
        $affectedElements.each(function() {
            var $this = $(this);
            $this.css("font-size", $this.data("orig-size"));
        });
        increaseCount = 0;
        decreaseCount = 0;
        $("#increasetext, #decreasetext").prop('disabled', false);
    });

    function changeFontSize(direction) {
        $affectedElements.each(function() {
            var $this = $(this);
            var currentSize = parseInt($this.css("font-size")) || 16; // Default font size
            var newSize = currentSize + direction;
            $this.css("font-size", newSize + "px");
        });
    };

    // Theme js:
    $("#theme_white").on("click", function(e) {
        e.preventDefault();
        $("body").removeClass("darkTheme");
        $("body").removeClass("greenTheme");
    });

    $("#theme_black").on("click", function(e) {
        e.preventDefault();
        $("body").addClass("darkTheme");
        $("body").removeClass("greenTheme");
    });

    // mobile header button add js:
    $(".header_middle .container").prepend("<a href='#' class='page_down'>page_down</a>");
    $(".header_bottom .container").append("<a href='#' class='menu_btn'></a>");

    $('a.page_down').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('change');
        $('.header_top').toggleClass('change');
    });

    $('a.menu_btn').click(function(e) {
        e.preventDefault();
        $('.header_nav').addClass('change');
        $('.header_top').removeClass('change');
        $('a.page_down').removeClass('change');
    });

    $('a.cls_btn').click(function(e) {
        e.preventDefault();
        $('.header_nav').removeClass('change');
    });

    // banner js slider
    $('#homeBanner').slick({
        slidesToShow: 1,
        arrows: true,
        focusOnSelect: true,
        infinite: true,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 1500,
        speed: 1500,
    });

    let isPlaying = true; // autoplay starts ON
    $('a#homeplayPause').text('⏸'); // show pause icon at load

    $('a#homeplayPause').on('click', function(e) {
        e.preventDefault();
        if (isPlaying) {
            $('#homeBanner').slick('slickPause');
            $(this).text('▶'); // play icon
        } else {
            $('#homeBanner').slick('slickPlay');
            $(this).text('⏸'); // pause icon
        }
        isPlaying = !isPlaying;
    });

    // Sponsor slider js:
    $('.tenderSponsoredSlider').slick({
        slidesToShow: 1,
        arrows: false,
        focusOnSelect: true,
        infinite: true,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 1500, // speed control
        speed: 700,
    });

    let isPlayingTender = true; // autoplay starts ON
    $('a.sponsorPlayPause').text('⏸'); // show pause icon at load

    $('a.sponsorPlayPause').on('click', function(e) {
        e.preventDefault();
        if (isPlayingTender) {
            $('.tenderSponsoredSlider').slick('slickPause');
            $(this).text('▶').addClass('change'); // play icon
        } else {
            $('.tenderSponsoredSlider').slick('slickPlay');
            $(this).text('⏸').removeClass('change'); // pause icon
        }
        isPlayingTender = !isPlayingTender;
    });

    // Newsticker js:
    $(document).ready(function() {
        const $ticker = $('#newsTicker');
        const $toggleBtn = $('#toggleBtn');
        let isPaused = false;

        $toggleBtn.html('<span class="bn-pause"></span>');

        $toggleBtn.on('click', function() {
            isPaused = !isPaused;
            $ticker.toggleClass('paused', isPaused);

            if (isPaused) {
                $toggleBtn.html('<span class="bn-play"></span>');
            } else {
                $toggleBtn.html('<span class="bn-pause"></span>');
            }
        });

        // Pause on hover
        $ticker.on('mouseenter', function() {
            if (!isPaused) {
                $ticker.addClass('paused');
            }
        });

        // Resume on mouse leave (only if not manually paused)
        $ticker.on('mouseleave', function() {
            if (!isPaused) {
                $ticker.removeClass('paused');
            }
        });
    });

    // Publication Slider js:
    $('.publicationSlider').slick({
        slidesToShow: 4,
        arrows: true,
        focusOnSelect: true,
        infinite: true,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 2000,
        speed: 700,
        responsive: [{
                breakpoint: 1099,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 570,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    });


    // Video Slider js:
    $('#videoSlider').slick({
        slidesToShow: 1,
        arrows: false,
        focusOnSelect: true,
        infinite: true,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 1500,
        speed: 700,
    });

    // Image Slider js:
    $('#imageSlider').slick({
        slidesToShow: 1,
        arrows: false,
        focusOnSelect: true,
        infinite: true,
        autoplay: true,
        initialSlide: 0,
        autoplaySpeed: 2000,
        speed: 700,
    });

    // window.addEventListener('load', () => {
    //     AOS.init({
    //         easing: 'ease-in-out-sine',
    //         duration: 300,
    //         once: true,
    //         disable: window.innerWidth < 768,
    //     });
    // });


}); //End jQuery