(function ($) {
    var pendingMap = {};

    var compare = function (x, y) {
        if (x === y) return true;
        // if both x and y are null or undefined and exactly the same

        if (!(x instanceof Object) || !(y instanceof Object)) return false;
        // if they are not strictly equal, they both need to be Objects

        if (x.constructor !== y.constructor) return false;
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

        for (var p in x) {
            if (!x.hasOwnProperty(p)) continue;
            // other properties were tested using x.constructor === y.constructor

            if (!y.hasOwnProperty(p)) return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined

            if (x[p] === y[p]) continue;
            // if they have the same strict value or identity then they are equal

            if (typeof (x[p]) !== "object") return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal

            if (compare(x[p], y[p])) return false;
            // Objects and Arrays must be tested recursively
        }

        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    };

    Function.prototype.cancellable = function (commandName, opts) {

        var func = this;
        var exists = false;
        opts = opts || {};

        if (pendingMap[commandName]) {
            $.each(pendingMap[commandName], function (index, value) {
                if (compare(value.cancellationToken, opts.cancellationToken)) {
                    exists = true;
                    if (!opts.reject) {
                        value.deferred.reject.call();
                    }
                    return false;
                }
                return true;
            });
        }

        if ((opts.reject && !exists) || !opts.reject) {

            var deferred = func.call();

            if (deferred && deferred.always && deferred.reject) {

                var item =
                {
                    func: func,
                    deferred: deferred,
                    cancellationToken: opts.cancellationToken
                };

                if (!pendingMap[commandName]) {
                    pendingMap[commandName] = new Array();
                }
                pendingMap[commandName].push(item);

                deferred.always(function () {
                    $.each(pendingMap[commandName], function (index, value) {
                        if (value.func === func) {
                            pendingMap[commandName].splice(index, 1);
                            return false;
                        }
                        return true;
                    });
                    if (pendingMap[commandName].length === 0) {
                        delete pendingMap[commandName];
                    }
                });
            }
        }
        return this;
    };

    var addClass = $.fn.addClass;
    $.fn.addClass = function (value) {
        var orig = addClass.apply(this, arguments);

        var elem,
            i = 0,
            len = this.length;

        for (; i < len; i++) {
            elem = this[i];
            if (elem instanceof SVGElement) {
                var classes = $(elem).attr('class');
                if (classes) {
                    var index = classes.indexOf(value);
                    if (index === -1) {
                        classes = classes + " " + value;
                        $(elem).attr('class', classes.trim());
                    }
                } else {
                    $(elem).attr('class', value);
                }
            }
        }
        return orig;
    };


    var removeClass = $.fn.removeClass;
    $.fn.removeClass = function (value) {
        var orig = removeClass.apply(this, arguments);

        var elem,
            i = 0,
            len = this.length;

        for (; i < len; i++) {
            elem = this[i];
            if (elem instanceof SVGElement) {
                var classes = $(elem).attr('class');
                if (classes) {
                    var index = classes.indexOf(value);
                    if (index !== -1) {
                        classes = classes.substring(0, index) + classes.substring((index + value.length), classes.length);
                        $(elem).attr('class', classes.trim());
                    }
                }
            }
        }
        return orig;
    };


    var hasClass = $.fn.hasClass;
    $.fn.hasClass = function (value) {
        var orig = hasClass.apply(this, arguments);

        var elem,
            i = 0,
            len = this.length;

        for (; i < len; i++) {
            elem = this[i];
            if (elem instanceof SVGElement) {
                var classes = $(elem).attr('class');

                if (classes) {
                    if (classes.indexOf(value) === -1) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        }
        return orig;
    };

    String.prototype.hashCode = function () {
        var hash = 0, i, chr, len;
        if (this.length == 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    if (!String.prototype.endsWith) {
        Object.defineProperty(String.prototype, 'endsWith', {
            value: function (searchString, position) {
                var subjectString = this.toString();
                if (position === undefined || position > subjectString.length) {
                    position = subjectString.length;
                }
                position -= searchString.length;
                var lastIndex = subjectString.indexOf(searchString, position);
                return lastIndex !== -1 && lastIndex === position;
            }
        });
    }

    $.waitIndicator = function (deferred, spinInfo) {

        if (spinInfo) {
            spinInfo = !$.isArray(spinInfo) ? [spinInfo] : spinInfo;
            var timeout = setTimeout(function () {

                if (timeout && deferred.state() === "pending") { //Если deferred еще не разрезолвлен

                    for (var i = 0; i < spinInfo.length; ++i) {

                        var element = spinInfo[i].element;
                        var markup = "";
                        markup += "<div class=\"overlay-wrapper overlay-layer\">";
                        markup += "<\/div>";
                        markup += "<div class=\"overlay-wrapper\">";
                        markup += "   <div class=\"overlay\">";
                        markup += "         <div class=\"overlay-content\">";
                        markup += "         <\/div>";
                        markup += "   <\/div>";
                        markup += " <\/div>";

                        var overlay = $(markup);

                        if (element) {

                            var spinner = new Spinner({
                                lines: 14, // The number of lines to draw
                                length: 0, // The length of each line
                                width: 4, // The line thickness
                                radius: spinInfo[i].radius, // The radius of the inner circle
                                corners: 1, // Corner roundness (0..1)
                                rotate: 0, // The rotation offset
                                direction: 1, // 1: clockwise, -1: counterclockwise
                                color: '#000', // #rgb or #rrggbb or array of colors
                                speed: 1.0, // Rounds per second
                                trail: 60, // Afterglow percentage
                                shadow: false, // Whether to render a shadow
                                hwaccel: false, // Whether to use hardware acceleration
                                className: 'spinner', // The CSS class to assign to the spinner
                                zIndex: 2e9, // The z-index (defaults to 2000000000)
                                top: '0px', // Top position relative to parent in px
                                left: '0px' // Left position relative to parent in px
                            });


                            spinInfo[i].overlay = overlay;
                            spinInfo[i].oldPosition = $(element).css("position");
                            spinInfo[i].spinner = spinner;
                            $(element).css({ "position": "relative" })
                                .append(overlay);
                            spinner.spin(overlay.find(".overlay-content")[0]);
                        }
                    }
                }
            }, 500);
        }

        deferred.always(function () {
            if (timeout) {
                clearTimeout(timeout);
                delete timeout;
            }
            if (spinInfo) {
                for (var i = 0; i < spinInfo.length; ++i) {
                    if (spinInfo[i].overlay) {
                        spinInfo[i].overlay.remove();
                    }
                    if (spinInfo[i].element) {
                        $(spinInfo[i].element).css({ "position": spinInfo[i].oldPosition });
                    }
                    if (spinInfo[i].spinner) {
                        spinInfo[i].spinner.stop();
                    }
                }
            }
        });
    };

})(jQuery);