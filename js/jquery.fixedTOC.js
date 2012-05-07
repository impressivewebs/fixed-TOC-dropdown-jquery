(function ($) {
    $.fixedTOC = function (el, settings) {

        var base = this,
               s = null;

        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("fixedTOC", base);
        base.settings = $.extend({}, $.fixedTOC.defaultSettings, settings);
        s = base.settings;

        if (!s.useSubMenus) {
            s.tocLinks = '.toc-h1 > a';
        }

        base.methods = {

            init : function () {

                // Put your initialization code here

                s.tocSub.slideUp();
                s.tocHeight = base.$el.height() + 20;

                base.$el.css({
                    top: '-' + s.tocHeight + 'px'
                });

                base.$el.addClass(s.tocUpClass);

            },

            doOpenMenu : function () {

                s.tocLink.on(s.menuOpens, function () {

                    if (base.$el.hasClass(s.tocUpClass)) {

                        s.tocLink.find('span').addClass('rotate');

                        base.$el.stop().animate({
                            top: '0'
                        }, s.menuSpeed, function () {
                            base.$el.removeClass(s.tocUpClass);
                        });

                    } else {

                        s.tocHeight = base.$el.height() + 20;

                        s.tocLink.find('span').removeClass('rotate');

                        base.$el.stop().animate({
                            top: '-' + s.tocHeight + 'px'
                        }, s.menuSpeed, function () {
                            base.$el.addClass(s.tocUpClass);
                            $('.toc-sub').slideUp(0);
                        });

                    }

                    return false;
                });

            },

            doOpenItem : function () {

                $('.toc-h1>a').on('click', function () {

                    s.tocSub.each(function () {

                        if (!$(this).hasClass('closed')) {
                            $(this).stop().slideUp().addClass('closed');
                        }

                    });

                    $(this).parent().find('.toc-sub').stop().slideToggle().removeClass('closed');

                    return false;

                });

            },

            doScroll : function () {

                $(s.tocLinks).on('click', function () {

                    s.currHash = $(this)[0].hash;

                    $('html, body').animate({
                        scrollTop: $(s.currHash).offset().top - 80
                    }, s.scrollSpeed, function () {
                        location.hash = s.currHash;
                    });

                    return false;

                });

            },

            doCloseMenu : function () {

                $('#toc-holder').on('mouseleave', function () {

                    s.tocHeight = base.$el.height() + 20;
                    s.tocLink.find('span').removeClass('rotate');

                    base.$el.animate({
                        top: '-' + s.tocHeight + 'px'
                    }, s.menuSpeed, function () {
                        base.$el.addClass(s.tocUpClass);
                        if (s.resetSubMenus) {
                            $('.toc-sub').slideUp(0);
                        }
                    });

                });

            },

            doTopLink : function () {

                $(s.topLink).on('click', function () {

                    s.currHash = $(this)[0].hash;

                    $('html, body').animate({
                        scrollTop: 0
                    }, s.scrollSpeed, function () {
                        location.hash = s.currHash;
                    });

                    return false;

                });

            }

        };

        // Run methods
        base.methods.init();
        base.methods.doOpenMenu();
        if (s.useSubMenus) {
            base.methods.doOpenItem();
        }
        base.methods.doScroll();
        base.methods.doCloseMenu();
        if (s.topLinkWorks) {
            base.methods.doTopLink();
        }
    };

    $.fixedTOC.defaultSettings = {
        // non-customizable settings
        tocHeight        : null,
        tocSub           : $('.toc-sub'),
        tocUpClass       : 'toc-up',
        tocLink          : $('#toc-link'),
        tocLinks         : '.toc-h1 ul a',
        topLink          : $('#top-link'),
        currHash         : null,
        // customizable settings
        scrollSpeed      : 1000,
        menuSpeed        : 300,
        useSubMenus      : true,
        resetSubMenus    : true,
        topLinkWorks     : true
    };

    $.fn.fixedTOC = function (settings) {
        return this.each(function () {
            (new $.fixedTOC(this, settings));
        });
    };

})(jQuery);