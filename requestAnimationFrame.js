/**
 * date: 2017/12/14
 * author:
 * desc: 封装版本的 requestAnimationFrame
 */

!(function () {
    var lastTime = 0;
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
    // https://caniuse.com/#search=requestAnimationFrame
    var vendors = ['webkit', 'moz', 'o'];

    //
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currentTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currentTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currentTime + timeToCall);
            }, timeToCall);
            lastTime = currentTime + timeToCall;
            return id;
        }
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();
