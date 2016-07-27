(function ($) {
    "use strict";

    $.widget("da.staffInfo",
    {
        options: {
            service: null
        },

        _create: function () {
            this.initEvents();
        },

        initEvents: function () {
            var self = this;

            /* WIDGET EXTERNAL EVENTS */
            this.element.on("loadInfo", function (evt, param) { self.loadInfo(param); });
            /* END OF EXTERNAL EVENTS */
        },

        _fillStaff: function (data) {
            this._fillCommon(data);
            this._fillStaffDetails(data.details);
        },

        _fillCommon: function (data) {
            $(".staff-name", this.element).html(data.name);
            $(".staff-position", this.element).html(data.position);
        },

        _fillStaffDetails: function (details) {
            $(".staff-details", this.element).empty();
            for (var i = 0; i < details.length; ++i) {
                this._fillStaffEntityDetail(details[i].type, details[i].values);
            }
        },
        _fillStaffEntityDetail: function (valueType, valueData) {
            var source = $("#template-staff-view-details").html();
            var template = Handlebars.compile(source);
            var info = CommonResources.GetStaffDetailEntityDescription(valueType);

            var data = {
                "title": info.title,
                "values": valueData,
                "icon": info.icon
            };
            var html = $($.parseHTML(template(data)));
            $(".staff-details", this.element).append(html);
        },

        loadInfo: function (staffId) {
            var self = this;
            if (staffId !== '') {
                //this.staffId = staffId;
                $(this.element).show();
                var spinner = new CommonResources.Spinner($(this.element), 10);

                (function () {
                    return self.options.service.loadStaffInfo(staffId, [spinner]).done(function (data) {
                        if (data == null) {
                            //no user found
                            self.element.trigger("noStaff");
                            return;
                        }
                        self._fillStaff(data);
                        self.element.trigger("staffLoaded");
                    });
                }).cancellable("loadInfo");
            }
        },

        _destroy: function () { }
    });
})(jQuery);

