'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YOURAPPNAME = function () {
    function YOURAPPNAME(doc) {
        _classCallCheck(this, YOURAPPNAME);

        this.doc = doc;
        this.window = window;
        this.html = this.doc.querySelector('html');
        this.body = this.doc.body;
        this.hash = location.hash;
    }

    // Window load types (loading, dom, full)


    _createClass(YOURAPPNAME, [{
        key: 'appLoad',
        value: function appLoad(type, callback) {
            var _self = this;

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
        }
    }, {
        key: 'popups',
        value: function popups(options) {
            var _self = this;

            var defaults = {
                reachElementClass: '.js-popup',
                closePopupClass: '.js-close-popup',
                currentElementClass: '.js-open-popup',
                changePopupClass: '.js-change-popup'
            };

            options = $.extend({}, options, defaults);

            var plugin = {
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

                if (callback) callback();
            };

            plugin.closePopup = function (popupName, callback) {
                plugin.reachPopups.filter('[data-popup="' + popupName + '"]').removeClass('opened');
                setTimeout(function () {
                    plugin.bodyEl.removeAttr('style');
                    plugin.htmlEl.removeClass('popup-opened');
                    plugin.topPanelEl.removeAttr('style');
                }, 300);
                // $('#burger-container').removeClass("open");


                if (callback) callback();
            };

            plugin.changePopup = function (closingPopup, openingPopup, callback) {
                plugin.reachPopups.filter('[data-popup="' + closingPopup + '"]').removeClass('opened');
                plugin.reachPopups.filter('[data-popup="' + openingPopup + '"]').addClass('opened');

                if (callback) callback();
            };

            plugin.init = function () {
                plugin.bindings();
            };

            plugin.bindings = function () {
                plugin.openPopupEl.on('click', function (e) {
                    e.preventDefault();
                    var pop = $(this).attr('data-popup-target');
                    plugin.openPopup(pop);
                });

                plugin.closePopupEl.on('click', function (e) {
                    e.preventDefault();
                    var pop = void 0;
                    if (this.hasAttribute('data-popup-target')) {
                        pop = $(this).attr('data-popup-target');
                    } else {
                        pop = $(this).closest(options.reachElementClass).attr('data-popup');
                    }

                    plugin.closePopup(pop);
                });

                plugin.changePopupEl.on('click', function (e) {
                    e.preventDefault();
                    var closingPop = $(this).attr('data-closing-popup');
                    var openingPop = $(this).attr('data-opening-popup');

                    plugin.changePopup(closingPop, openingPop);
                });

                plugin.reachPopups.on('click', function (e) {
                    var target = $(e.target);
                    var className = options.reachElementClass.replace('.', '');
                    if (target.hasClass(className)) {
                        plugin.closePopup($(e.target).attr('data-popup'));
                    }
                });
            };

            if (options) plugin.init();

            return plugin;
        }
    }, {
        key: 'toggletrigger',
        value: function toggletrigger() {
            $("#toggleMenu").on('click', function () {
                $('#burger-container').toggleClass("open");
            });

            $('.toggle__trigger').on("click", function (e) {
                e.preventDefault();
                var t = $(this),
                    n = t.closest(".toggle"),
                    a = n.find(".toggle__content");
                if (n.hasClass("toggle--active")) {
                    n.removeClass("toggle--active");
                    a.slideUp(300);
                } else {
                    n.addClass("toggle--active");
                    a.slideDown(300);
                }
            });
        }
    }, {
        key: 'check_trigger',
        value: function check_trigger() {
            $('.checkbox__trigger').on("click", function (e) {
                e.preventDefault();
                var t = $(this),
                    n = t.closest(".checkbox"),
                    a = n.find(".checkbox__trigger");
                if (a.hasClass("icon-uncheck")) {
                    a.removeClass("icon-uncheck");
                    a.addClass("icon-check");
                } else {
                    a.removeClass("icon-check");
                    a.addClass("icon-uncheck");
                }
            });
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            $('.js-scroll-to').on('click', function (e) {
                e.preventDefault();

                $('body, html').animate({ scrollTop: $($(this).attr('href')).offset().top }, 2000);
            });
        }
    }, {
        key: 'owlsoc',
        value: function owlsoc() {
            $('#owl-soc').owlCarousel({
                navigation: false,
                dots: false,
                autoWidth: false,
                margin: 0,
                autoHeight: true,
                items: 6
            });
        }
    }]);

    return YOURAPPNAME;
}();

(function () {

    var app = new YOURAPPNAME(document);
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