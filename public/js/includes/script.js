(function ($){
    'use strict';

    var btnOpenMenu = $('.js-menu-open');
    var btnCloseMenu = $('.js-menu-close');
    var $navigation = $('.js-nav_list');
    var $navigationLinks = $navigation.find('.js-nav_link');
    var $body = $('body');
    var $searchEl = $('.js-search_el');

    $(document).on('click', function () {
        $searchEl.removeClass('is-open')
    });

    btnOpenMenu.on('click', function () {
        $('.site_navigation_wrap').addClass('is-open');
        $body.addClass('menu-open');
    });

    btnCloseMenu.on('click', function () {
        $('.site_navigation_wrap').removeClass('is-open');
        $body.removeClass('menu-open');
        closeSubLists()
    });

    $searchEl.on('click', function (event) {
        var $el = $(event.target).closest('.js-search_el');
        event.stopPropagation();

        $el.addClass('is-open');
    });

    function closeSubLists() {
        var $list = $('.js-nav_item.is-open');
        var $subList = $list.find('.js-nav_subitem');

        if (!$list) return;

        function slideItUp() {
            $subList.slideUp(150, 'linear')
        }

        $list.removeClass('is-open');
        setTimeout(slideItUp, 300)
    }

    function toggleSubMenu(event) {
        var $el = $(event.target);
        var $list = $el.closest('.js-nav_item');
        var $subList = $list.find('.js-nav_subitem');

        if ( $list.hasClass('is-open') ) {
            closeSubLists();
        } else {
            $subList.slideDown(100, 'linear', function () {
                closeSubLists();
                $list.addClass('is-open');
            })
        }
    }

    function createProgress() {
        var $circles = document.getElementsByClassName('js-progress-circle');
        var count = $circles.length;

        function getProgressValue(item) {
            return (item.querySelectorAll('span').length / 100 * item.dataset.progress).toFixed();
        }

        function setActive(item, index) {
            setTimeout(function(){
                item.querySelectorAll('span')[index].classList.add('active');
            }, 200);
        }

        function markActiveDashes(item, count) {
            for(var i = 0; i < count; i++) {
                setActive(item, i);
            }
        }

        for(var i = 0; i < count; i++) {
            markActiveDashes($circles[i], getProgressValue($circles[i]));
        }
    }

    $navigationLinks.on('click', toggleSubMenu);

    $('#slider').slick({
        slide: 'li',
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '460px',
        prevArrow: '<button type="button" class="slick-prev"><span></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span></span></button>',
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    centerPadding: '300px'
                }
            },
            {
                breakpoint: 960,
                settings: {
                    adaptiveHeight: true,
                    centerPadding: '200px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    adaptiveHeight: true,
                    centerPadding: '100px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    adaptiveHeight: true,
                    centerPadding: '0'
                }
            }
        ],
        dots: true,
        dotsClass: 'slider-paging-number',
        customPaging: function (slick) {
            return (slick.currentSlide + 1) + '/' + slick.slideCount;
        }
    }).on('afterChange', function (event, slick, currentSlide) {
        $(this).find('*[role="tablist"]')
            .find('li')
            .eq(0)
            .text(slick.options.customPaging.call(this, slick, currentSlide));
    });

    $('#weatherSlider').slick({
        slide: 'li',
        slidesToShow: 4,
        prevArrow: '<button type="button" class="slick-prev"><span></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span></span></button>',
        responsive: [
            {
                breakpoint: 1200,
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
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ],
        dots: true,
        dotsClass: 'slider-paging-number',
        customPaging: function (slick) {
            return (slick.currentSlide + 1) + '/' + slick.slideCount;
        }
    }).on('afterChange', function (event, slick, currentSlide) {
        $(this).find('*[role="tablist"]')
            .find('li')
            .eq(0)
            .text(slick.options.customPaging.call(this, slick, currentSlide));
    });

    $('.eventSlider').slick({
        slide: 'li',
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><span></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span></span></button>',
        dots: true,
        dotsClass: 'slider-paging-number',
        customPaging: function (slick) {
            return (slick.currentSlide + 1) + '/' + slick.slideCount;
        }
    }).on('afterChange', function (event, slick, currentSlide) {
        $(this).find('*[role="tablist"]')
            .find('li')
            .eq(0)
            .text(slick.options.customPaging.call(this, slick, currentSlide));
    });

    createProgress();
})(jQuery);

$(document).ready(function () {
    if (!$.browser.webkit) {
        $('.cam_view-wrap').html('<p>Sorry! Non webkit users. :(</p>');
    }
});
