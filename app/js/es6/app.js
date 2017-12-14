class YOURAPPNAME {

    constructor(doc) {
        this.doc = doc;
        this.window = window;
        this.html = this.doc.querySelector('html');
        this.body = this.doc.body;
        this.hash = location.hash;
    }

    // Window load types (loading, dom, full)
    appLoad(type, callback) {
        const _self = this;

        switch (type) {
            case 'loading':
                if (_self.doc.readyState === 'loading') callback();

                break;
            case 'dom':
                _self.doc.onreadystatechange = function () {
                    if (_self.doc.readyState === 'complete') callback();
                };

                break;
            case 'full':
                _self.window.onload = function (e) {
                    callback(e);
                };

                break;
            default:
                callback();
        }
    };

    popups(options) {
        const _self = this;

        const defaults = {
            reachElementClass: '.js-popup',
            closePopupClass: '.js-close-popup',
            currentElementClass: '.js-open-popup',
            changePopupClass: '.js-change-popup'
        };

        options = $.extend({}, options, defaults);

        const plugin = {
            reachPopups: $(options.reachElementClass),
            bodyEl: $('body'),
            topPanelEl: $('.top-panel-wrapper'),
            htmlEl: $('html'),
            closePopupEl: $(options.closePopupClass),
            openPopupEl: $(options.currentElementClass),
            changePopupEl: $(options.changePopupClass),
            bodyPos: 0
        };

        plugin.openPopup = function (popupName, callback) {
            plugin.reachPopups.filter('[data-popup="' + popupName + '"]').addClass('opened');
            // plugin.bodyEl.css('overflow-y', 'scroll');
            // plugin.topPanelEl.css('padding-right', scrollSettings.width);
            plugin.htmlEl.addClass('popup-opened');

            if(callback)
                callback();
        };

        plugin.closePopup = function (popupName, callback) {
            plugin.reachPopups.filter('[data-popup="' + popupName + '"]').removeClass('opened');
            setTimeout(function () {
                plugin.bodyEl.removeAttr('style');
                plugin.htmlEl.removeClass('popup-opened');
                plugin.topPanelEl.removeAttr('style');
            }, 300);
            // $('#burger-container').removeClass("open");


            if(callback)
                callback();
        };

        plugin.changePopup = function (closingPopup, openingPopup, callback) {
            plugin.reachPopups.filter('[data-popup="' + closingPopup + '"]').removeClass('opened');
            plugin.reachPopups.filter('[data-popup="' + openingPopup + '"]').addClass('opened');

            if(callback)
                callback();
        };

        plugin.init = function () {
            plugin.bindings();
        };

        plugin.bindings = function () {
            plugin.openPopupEl.on('click', function (e) {
                e.preventDefault();
                const pop = $(this).attr('data-popup-target');
                plugin.openPopup(pop);
            });

            plugin.closePopupEl.on('click', function (e) {
                e.preventDefault();
                let pop;
                if (this.hasAttribute('data-popup-target')) {
                    pop = $(this).attr('data-popup-target');
                } else {
                    pop = $(this).closest(options.reachElementClass).attr('data-popup');
                }

                plugin.closePopup(pop);
            });

            plugin.changePopupEl.on('click', function (e) {
                e.preventDefault();
                const closingPop = $(this).attr('data-closing-popup');
                const openingPop = $(this).attr('data-opening-popup');

                plugin.changePopup(closingPop, openingPop);
            });

            plugin.reachPopups.on('click', function (e) {
                const target = $(e.target);
                const className = options.reachElementClass.replace('.', '');
                if (target.hasClass(className)) {
                    plugin.closePopup($(e.target).attr('data-popup'));
                }
            });
        };

        if (options)
            plugin.init();

        return plugin;
    };

    toggletrigger() {
        $("#toggleMenu").on('click', function(){
            $('#burger-container').toggleClass("open");
        });

        $('.toggle__trigger').on("click", function (e) {
                e.preventDefault();
                let t = $(this),
                    n = t.closest(".toggle"),
                    a = n.find(".toggle__content");
                if (n.hasClass("toggle--active")) {
                    n.removeClass("toggle--active");
                    a.slideUp(300);
                } else {
                    n.addClass("toggle--active");
                    a.slideDown(300);
                }
            }
        )
    }

    check_trigger() {
        $('.checkbox__trigger').on("click", function (e) {
                e.preventDefault();
                let t = $(this),
                    n = t.closest(".checkbox"),
                    a = n.find(".checkbox__trigger");
                if (a.hasClass("icon-uncheck")) {
                    a.removeClass("icon-uncheck");
                    a.addClass("icon-check");
                } else {
                    a.removeClass("icon-check");
                    a.addClass("icon-uncheck");
                } 
            }
        )
    }

    scrollTo() {
        $('.js-scroll-to').on('click', function (e) {
            e.preventDefault();

            $('body, html').animate({scrollTop: $($(this).attr('href')).offset().top}, 2000);
        });
    };

    owlsoc() {
        $('#owl-soc').owlCarousel({
            navigation: false,
            dots: false,
            autoWidth: false,
            margin: 0,
            autoHeight: true,
            items: 6
        });

    };

}

(function () {

    const app = new YOURAPPNAME(document);
    // const Animation = new AnimationComponent();

    app.appLoad('loading', function () {
        // App is loading... Paste your app code here. 4example u can run preloader event here and stop it in action appLoad dom or full
    });

    app.appLoad('dom', function () {
        // DOM is loaded! Paste your app code here (Pure JS code).
        // Do not use jQuery here cause external libs do not loads here...

    });

    app.appLoad('full', function (e) {
        app.popups();
        app.check_trigger();
        app.toggletrigger();
    });
})();
