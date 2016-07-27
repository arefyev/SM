$.Staff = $.Staff || {};

$.Staff.Page = function (options) {
    if (options != undefined)
        $.extend(this.options, options);
};

$.Staff.Data = function () { };

$.extend($.Staff.Data.prototype, {
    loadTreeData: function (spinner) {
        return $.postJSON("/api/Staff/LoadTreeData", null, spinner);
    },

    loadStaffInfo: function (id, spinner) {
        return $.postJSON("/api/Staff/LoadViewStaffData", { "id": id }, spinner);
    }
});

$.extend($.Staff.Page.prototype, $.Resources.Page.prototype, {
    options: {
        service: new $.Staff.Data(),
        title: "Staff"
    },

    init: function () {
        this.staffTree = $(".staff-content", this.element).tree({ service: new $.Staff.Data() });
        this.staffInfo = $(".staff-info", this.element).staffInfo({ service: new $.Staff.Data() });

        this.initEvents();
    },

    initEvents: function () {
        var self = this;

        /* EXTERNAL EVENTS */
        this.staffTree.on("clickItem", function (args, params) {
            self.staffInfo.trigger("loadInfo", params.id);
            PageManager.RewriteUrl("/#/Staff/SelectedPerson/" + params.id);
        });

        this.staffInfo.on("noStaff", function (/*args, params*/) {
            $(".staff-info", this.element).hide();
            $(".no-info", this.element).show();
        });

        this.staffInfo.on('staffLoaded', function (/*args, params*/) {
            $(".staff-info", this.element).show();
            $(".no-info", this.element).hide();
        });
        /* END OF EXTERNAL EVENTS */
    },

    onShow: function () {
        this.setTitle(this.options.title);
    },

    onHide: function () { },

    callback: function (params) {
        if (!params || !params.action)
            return;

        switch (params.action.toLowerCase()) {
            case "selectedperson":
                this.staffTree.trigger("findItem", params.data);
                break;

            default:
        }
    },

    destroy: function () {
        this.staffTree.off("clickItem");
    }
});