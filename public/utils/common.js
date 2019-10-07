! function (e, t) {
    function n() {
        var e = r.clientWidth;
        992 < e && e < 1200 ? e = 1200 : e < 992 && (e = 992), e && (r.style.fontSize = e / 19.2 + "px")
    }
    var r = e.documentElement;

    function o(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
    }
    o(t, "orientationchange" in window ? "orientationchange" : "resize", n), o(e, "DOMContentLoaded", n)
}(document, window);
var REGEXP = {
        tel: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    },
    REGEXPText = {
        tel: "格式错误",
        email: "邮箱格式错误"
    };

function initRegexp() {
    $("input").on("blur", function () {
        var e = $(this),
            t = e.attr("data-regexp");
        !t || e.val().length <= 0 ? removeRegexpError(e) : REGEXP[t].test(e.val()) ? removeRegexpError(e) : addRegexpError(e, REGEXPText[t])
    }), $("input").on("focus", function () {
        removeRegexpError($(this))
    })
}

function removeRegexpError(e, t) {
    t = null == t || t;
    var n = e.parents(".form-input");
    n.removeClass("error"), t && n.find(".error-tips").text("")
}

function addRegexpError(e, t) {
    t = t || "";
    var n = e.parents(".form-input"),
        r = e.attr("data-regexp");
    n.addClass("error"), !t && r && (t = REGEXPText[r]), n.find(".error-tips").text(t)
}

function setTime(e, t) {
    0 == (t = t || 120) ? (e.attr("disabled", !1), e.val("获取验证码"), t = null) : (e.attr("disabled", !0), e.val(t + "s后重新获取"), t--, setTimeout(function () {
        setTime(e, t)
    }, 1e3))
}