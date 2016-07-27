var count = 0;

$.postJSON = function (url, data, spinInfo) {

    var completed = false;

    var onSuccess = function (result) {
        completed = true;
        count = 0;

        if (result === undefined || result === null || result.state === undefined || result.state === null) {
            d.resolve(result);
        } else if (result.state === CommonResources.RequestState.SUCCESS) {
            d.resolve(result.data);
        } else {
            var str;
            if (result.state === CommonResources.RequestState.FAIL && typeof result.data === "string" && result.data.length > 0) {
                str = result.data;
            } else {
                str = "Произошла внутренняя ошибка. Повторите операцию позднее";
            }
            d.reject();
            //Helper.MessengerView(str, Helper.MessengerTypes.error);
        }
    };

    var onError = function (jqXHR, textStatus, errorThrown) {

        //Запрос заабортил сам пользователь
        if (!jqXHR.getAllResponseHeaders() && errorThrown) {
            return;
        }
        // jqXHR.readyState === 0 - запрос не был инициализирован
        // jqXHR.status === 12030 - eсли сервер сбросил соединение
        if ((jqXHR.readyState === 0 || jqXHR.status === 12030) && count < 4) {
            // пробуем послать запрос еще несколько раз            
            ++count;
            performRequest();
        } else {

            completed = true;
            d.reject();

            //Helper.MessengerView("Произошла внутренняя ошибка. Повторите операцию позднее.", Helper.MessengerTypes.error);
            count = 0;
        }
    };

    var req;
    var performRequest = function () {
        req = jQuery.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json',
            'data': JSON.stringify(data),
            'success': onSuccess,
            'error': onError
        }
        );
    };

    var d = $.Deferred();

    $.waitIndicator(d, spinInfo);

    d.fail(function () {
        if (!completed) {
            req.abort();
        }
    });

    performRequest();

    return d;
};

