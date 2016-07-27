///
// Object manages all project pages to wark as SPA
//
var PageManager = (new function () {

    var options = { container: "", highlight: null, pages: [] };
    var viewCache = [];
    var activeModules = {};
    var currentRoute = {};

    function parseAction(url) {
        url = url.split("/");
        //mask {controller}/{action}/{data}
        if (url.length < 3) {
            throw "Unsupported";
        }
        return { "controller": url[0], "action": url[1], "data": url[2] };
    }

    function prepareParams(url) {
        var result = parseAction(url.startsWith('/') ? url.substring(1) : url);
        return { "action": result.action, "data": result.data };
    }

    function invokeMethod(f, context, params) {
        if (f) f.call(context, params);
    }

    function loadView(url, controller, callback) {
        var wrapperId = controller + "-wrapper-elem";
        var wrapper = $("#" + wrapperId).length !== 0 ? $("#" + wrapperId) : $("<div id='" + wrapperId + "' />");
        $(options.container).append(wrapper);
        var d;

        var serviceCall = function () {
            var deferred = $.Deferred();
            $.get(url).done(function (data) { deferred.resolve(data); });
            d = deferred;
            return deferred;
        };
        serviceCall.cancellable("loadView");

        $.waitIndicator(d, [new CommonResources.Spinner($(options.container))]);

        d.done(function (data) {
            wrapper.html(data);
            wrapper.show();

            if (activeModules[currentRoute.Group]) {
                invokeMethod(activeModules[currentRoute.Group].init, activeModules[currentRoute.Group]);
                invokeMethod(activeModules[currentRoute.Group].onShow, activeModules[currentRoute.Group]);
            }

            if (options.highlight)
                options.highlight(currentRoute.Group);

            if (callback != undefined) {
                setTimeout(callback.call(), 100);
            }
        });
    };

    this.ignoreHashChange = false;

    this.init = function (settings) {
        options = settings;
    }

    this.navigate = function (url) {

        if (!options.pages || options.pages.length === 0)
            return;

        var previousGroup;

        //find a path
        $.each(options.pages, function (index, route) {
            var regExp = new RegExp(route.Mask);
            if (regExp.test(url)) {
                if (typeof currentRoute !== "undefined") {
                    previousGroup = currentRoute.Group;
                }
                currentRoute = route;
                return false;
            }
            return true;
        });
        // hide previous view
        if (typeof previousGroup !== "undefined") {
            if (activeModules[previousGroup]) {
                if (options.highlight)
                    options.highlight(currentRoute.Group);

                invokeMethod(activeModules[previousGroup].onHide, activeModules[previousGroup], currentRoute);
            }
            viewCache[previousGroup] = $("#" + previousGroup + "-wrapper-elem").detach();
        }
        // that means that no pages in memory exist
        if (typeof activeModules[currentRoute.Group] === "undefined") {
            loadView(currentRoute.RootUrl, currentRoute.Group, function () {
                if (url !== currentRoute.Mask) {
                    invokeMethod(activeModules[currentRoute.Group].callback, activeModules[currentRoute.Group], prepareParams(url));
                }
            });
        } else {// page in cache
            //load from cache
            if (url === currentRoute.Mask) {
                var showCall = function () {
                    $(options.container).append(viewCache[currentRoute.Group]);
                    invokeMethod(activeModules[currentRoute.Group].onShow, activeModules[currentRoute.Group]);
                };
                showCall.cancellable("loadView");
            } else {
                this.invokeMethod(activeModules[currentRoute.Group].destroy, this.activeModules[currentRoute.Group]);
                $("#" + currentRoute.Group + "-wrapper-elem").remove();
                delete activeModules[currentRoute.Group];
                delete viewCache[currentRoute.Group];
                this.loadView(this.currentRoute.RootUrl, currentRoute.Group);
            }
        }
    };

    this.register = function (vObj) {
        activeModules[currentRoute.Group] = $.extend({}, vObj);
        activeModules[currentRoute.Group].element = $("#" + currentRoute.Group + "-wrapper-elem");
    };


    this.rewriteUrl = function (url) {
        var oldHref = location.href;
        location.href = url;
        if (oldHref !== location.href) {
            PageManager.IgnoreHashChange = true;
        }
    };

    return {
        ConfigureManager: this.init,
        RegisterPage: this.register,
        Navigate: this.navigate,
        RewriteUrl: this.rewriteUrl,
        IgnoreHashChange: this.ignoreHashChange
    }
});

$(function () {
    // manage hash change
    $(window).on("hashchange", function () {
        if (!PageManager.IgnoreHashChange) {
            var hash = window.location.href.split('#')[1];
            if (hash)
                PageManager.Navigate(hash);
        }
        PageManager.IgnoreHashChange = false;
        return false;
    });
});