$.Home = $.Home || {};

$.Home.Page = function (options) {
    if (options != undefined)
        $.extend(this.options, options);
};

$.extend($.Home.Page.prototype, $.Resources.Page.prototype, {
    options: {
        service: null,
        title: 'Main page'
    },

    init: function () {
        /* Nothing to do */
    },

    onShow: function () {
        this.setTitle(this.options.title);
    },

    onHide: function () { },

    destroy: function () { }
});