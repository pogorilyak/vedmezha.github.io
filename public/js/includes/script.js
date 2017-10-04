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

    $navigationLinks.on('click', toggleSubMenu);

})(jQuery);
