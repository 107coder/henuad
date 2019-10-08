Function.prototype.method = function (e, n) {
    this.prototype[e] || (this.prototype[e] = n)
}, Function.method("getUrlParam", function () {
    var e = new Object;
    if (0 == window.location.search.indexOf("?") && 1 < window.location.search.indexOf("="))
        for (var n = unescape(window.location.search).substring(1, window.location.search.length).split("&"), t = 0; t < n.length; t++) e[n[t].split("=")[0]] = unescape(n[t].split("=")[1]);
    return e
}), Function.method("toFixed", function (e, n) {
    return !n && (n = 2), Number(e).toFixed(n)
}), Function.method("redirect", function () {
    !target && (target = "_self");
    var e = n(options);
    e && (e = "?" + e), window.open("/" + key + e, target);
    var n = function (e) {
        var n = [];
        if (!e) return "";
        for (var t in e)
            if (e.hasOwnProperty(t)) {
                var r = e[t];
                n.push(t + "=" + encodeURIComponent(null === r ? "" : String(r)))
            } return n.join("&")
    }
}), Function.method("isEmail", function (e) {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e)
}), Function.method("objToArray", function (e) {
    var n = [];
    for (var t in e) {
        var r = [];
        for (var i in e[t]) r.push({
            key: i,
            val: e[t][i]
        });
        n.push({
            key: t,
            val: r
        })
    }
    return n
}), Function.method("getIndex", function (e, n, t) {
    if (!n) return 0;
    for (var r = 0, i = 0; i < e.length; i++)
        if (e[i][t] == n) return r = i;
    return r
}), Array.prototype.remove = function (e) {
    for (var n = 0; n < this.length; n++)
        if (this[n] == e) {
            this.splice(n, 1);
            break
        }
}, Array.prototype.distinct = function () {
    var e, n = this,
        t = {},
        r = [];
    n.length;
    for (e = 0; e < n.length; e++) t[n[e]] || (t[n[e]] = 1, r.push(n[e]));
    return r
}, Function.method("getNowFormatDate", function (e) {
    var n, t = new Date,
        r = "-",
        i = t.getMonth() + 1,
        a = t.getDate();
    return 1 <= i && i <= 9 && (i = "0" + i), 0 <= a && a <= 9 && (a = "0" + a), "day" == e ? n = t.getFullYear() + r + i + r + a : "min" == e && (n = t.getFullYear() + r + i + r + a + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()), n
}), Number.method("isTelephone", function () {
    return /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this)
}), Number.method("telephoneDesensitization", function (e) {
    return e ? e.replace(/(\d{3})\d*(\d{4})/, "$1****$2") : e
}), String.method("trim", function () {
    return this.replace(/^\s+|\s+$/g, "")
});
var updataView = function (e, n, t) {
        var r = baidu.template;
        (new Date).getTime(), r(e);
        (new Date).getTime();
        var i = r(e, t);
        $("#" + n).html(i)
    },
    navHeder = function (n) {
        $("#bs-navbar .navbar-left li").hover(function () {
            console.log(1111);
            var e = $(this).attr("name");
            $(this).addClass("active").siblings().removeClass("active"), $('.headerBase .child[name="' + e + '"]').show().siblings().hide()
        }), $(".headerBase .child").on("mouseleave", function (e) {
            $(".headerBase .child").hide(), $('#bs-navbar .navbar-left li[name="' + n + '"]').addClass("active").siblings().removeClass("active")
        })
    },
    getUserCenterList = function (e) {
        $("#user-navbar").hasClass("hideList") && $("#user-navbar").removeClass("hideList")
    },
    hideUserImgList = function (e) {
        $("#user-navbar").addClass("hideList")
    },
    userExit = function () {
        localStorage.removeItem("UserInfo"), sessionStorage.removeItem("UserInfo"), navTo("login")
    },
    navTo = function (e, n) {
        var t = e.split("/"),
            r = t[t.length - 1],
            i = location.pathname.split("/");
        if (i[i.length - 1].split(".")[0] !== r) {
            var a = (isMobile() ? "build/" : "") + "pages/" + e + ".html",
                o = "?";
            if (n) {
                var s = [];
                for (var l in n) s.push(l);
                for (var l in n) s[s.length - 1] === l ? o += l + "=" + n[l] : o += l + "=" + n[l] + "&"
            } else o = "";
            location.href = location.origin + "/" + a + o
        }
    },
    isMobile = function () {
        return null != navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    },
    formatQuery = function (e) {
        if (e) {
            var n = e.split("?")[1];
            console.log("paramStr", n);
            for (var t = n.split("&"), r = {}, i = 0; i < t.length; i++) r[t[i].split("=")[0]] = t[i].split("=")[1];
            return r
        }
    },
    getUrlParam = function (e) {
        var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
            t = window.location.search.substr(1).match(n);
        return null != t ? unescape(t[2]) : null
    },
    isNotEmpty = function (e, n) {
        var t = !0;
        return e || 0 === e || (t = !1, layer.msg(n)), t
    },
    getUserTokenFn = function () {
        var e = sessionStorage.getItem("UserInfo");
        if (null == e) {
            var n = localStorage.getItem("UserInfo");
            null != n && (e = n, sessionStorage.setItem("UserInfo", n))
        }
        return e
    },
    loginBtnAndUserImg = function () {
        getUserTokenFn() ? ($("#unLogin").hide(), $("#userPic").show()) : ($("#unLogin").show(), $("#userPic").hide())
    },
    selectHeaderActiveClass = function (e) {
        $("#bs-navbar .navbar-left li").removeClass("active"), $("#bs-navbar .navbar-left li[name=" + e + "]").addClass("active"), $("#user-navbar .navbar-item").removeClass("active"), $("#user-navbar .navbar-item[name=" + e + "]").addClass("active")
    },
    userCenterSiderActiveClass = function (e) {
        $(".UserCenterMenu .nav li").removeClass("active"), $(".UserCenterMenu .nav li[name=" + e + "]").addClass("active")
    },
    setMobilePageTitle = function (e) {
        $("#commonNav .nav-title").html(e)
    };