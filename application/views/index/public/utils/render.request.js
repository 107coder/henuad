function Request() {
    this.isFile = "pathDev", this.host = window.location.host;
    var r = {
        path: "../public/mock/",
        pathDev: "http://47.103.35.255:510/",
        pathUat: "http://www.uat.com/",
        pathProd: "http://www.prod.com/"
    };
    this._load = function (t) {
        var e = sessionStorage.getItem("UserInfo");
        if (!e) {
            var a = localStorage.getItem("UserInfo");
            a && (e = a)
        }
        var o = JSON.parse(e);
        token = o ? o.token : "", t.isProd = !0, t.type = "local" != this.isFile || t.isProd ? t.type || "POST" : "GET", t.beforeSend = function (t) {
            t.setRequestHeader("Authorization", token)
        };
        var n = t.key ? function (t, e, a, o) {
            var n = "dev" == t || e ? "pathDev" : "uat" == t ? "pathUat" : "pathProd";
            return "local" != t || e ? r[n] + a + (o ? "?" + function (t) {
                var e = [];
                if (!t) return "";
                for (var a in t)
                    if (t.hasOwnProperty(a)) {
                        var o = t[a];
                        e.push(a + "=" + encodeURIComponent(null === o ? "" : String(o)))
                    } return e.join("&")
            }(o) : "") : this.localhost.path + a + ".json"
        }(this.isFile, t.isProd, t.key, t.urlData) : "";
        return t.url = t.url || "local" != this.isFile && "GET" == t.type.toUpperCase() ? function (t, e, a) {
            return a
        }(t.type, t.data, n) : n, delete t.key, t
    }, this._getData = function (t) {
        return "GET" === t.type ? t.data : t.data ? JSON.stringify(t.data) : null
    }
}
Request.prototype.ajax = function (t) {
    var e = this._load(t),
        a = e.success;
    return delete e.success, e.success = function (t) {
        t.Url = e.url, 10201 === t.Stata || 10102 === t.Stata ? navTo("login") : 10202 === t.Stata || 10101 === t.Stata ? layer.alert("登录过期，请重新登录", function () {
            navTo("login")
        }) : a(t)
    }, $.ajax(e)
};
var Request_ = new Request;