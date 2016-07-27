(function ($) {
    "use strict";

    $.Resources = $.Resources || {};

    var self;

    $.Resources.Page = function () {
        self = this;
    };

    $.extend($.Resources.Page.prototype, {
        init: function () { },

        setTitle: function (title) {
            document.title = title;
        },

        onShow: function () { },

        callback: function (params) { }
    });
})(jQuery);



