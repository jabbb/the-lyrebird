(function(e, t) {
    function y(e) {
        for (var t = 1, n; n = arguments[t]; t++)
            for (var r in n) e[r] = n[r];
        return e
    }

    function b(e) {
        return Array.prototype.slice.call(e)
    }

    function E(e, t) {
        for (var n = 0, r; r = e[n]; n++)
            if (t == r) return n;
        return -1
    }

    function S() {
        var e = b(arguments),
            t = [];
        for (var n = 0, r = e.length; n < r; n++) e[n].length > 0 && t.push(e[n].replace(/\/$/, ""));
        return t.join("/")
    }

    function x(e, t, n) {
        var r = t.split("/"),
            i = e;
        while (r.length > 1) {
            var s = r.shift();
            i = i[s] = i[s] || {}
        }
        i[r[0]] = n
    }

    function T() {}

    function N(e, t) {
        this.id = this.path = e, this.force = !!t
    }

    function C(e, t) {
        this.id = e, this.body = t, typeof t == "undefined" && (this.path = this.resolvePath(e))
    }

    function k(e, t) {
        this.deps = e, this.collectResults = t, this.deps.length == 0 && this.complete()
    }

    function L(e, t) {
        this.deps = e, this.collectResults = t
    }

    function A() {
        for (var e in r)
            if (r[e].readyState == "interactive") return c[r[e].id]
    }

    function O(e, t) {
        var r;
        return !e && n && (r = l || A()), r ? (delete c[r.scriptId], r.body = t, r.execute()) : (f = r = new C(e, t), a[r.id] = r), r
    }

    function M() {
        var e = b(arguments),
            t, n;
        return typeof e[0] == "string" && (t = e.shift()), n = e.shift(), O(t, n)
    }

    function _(e, t) {
        var n = t.id || "",
            r = n.split("/");
        r.pop();
        var i = r.join("/");
        return e.replace(/^\./, i)
    }

    function D(e, t) {
        function r(e) {
            return C.exports[_(e, t)]
        }
        var n = [];
        for (var i = 0, s = e.length; i < s; i++) {
            if (e[i] == "require") {
                n.push(r);
                continue
            }
            if (e[i] == "exports") {
                t.exports = t.exports || {}, n.push(t.exports);
                continue
            }
            n.push(r(e[i]))
        }
        return n
    }

    function P() {
        var e = b(arguments),
            t = [],
            n, r;
        return typeof e[0] == "string" && (n = e.shift()), w(e[0]) && (t = e.shift()), r = e.shift(), O(n, function(e) {
            function s() {
                var i = D(b(t), n),
                    s;
                typeof r == "function" ? s = r.apply(n, i) : s = r, typeof s == "undefined" && (s = n.exports), e(s)
            }
            var n = this,
                i = [];
            for (var o = 0, u = t.length; o < u; o++) {
                var a = t[o];
                E(["require", "exports"], a) == -1 && i.push(_(a, n))
            }
            i.length > 0 ? H.apply(this, i.concat(s)) : s()
        })
    }

    function H() {
        var e = b(arguments),
            t, n;
        typeof e[e.length - 1] == "function" && (t = e.pop()), typeof e[e.length - 1] == "boolean" && (n = e.pop());
        var r = new k(B(e, n), n);
        return t && r.then(t), r
    }

    function B(e, t) {
        var n = [];
        for (var r = 0, i; i = e[r]; r++) typeof i == "string" && (i = j(i)), w(i) && (i = new L(B(i, t), t)), n.push(i);
        return n
    }

    function j(e) {
        var t, n;
        for (var r = 0, i; i = H.matchers[r]; r++) {
            var s = i[0],
                o = i[1];
            if (t = e.match(s)) return o(e)
        }
        throw new Error(e + " was not recognised by loader")
    }

    function I() {
        return e.using = h, e.provide = p, e.define = d, e.loadrunner = v, F
    }

    function q(e) {
        for (var t = 0; t < H.bundles.length; t++)
            for (var n in H.bundles[t])
                if (n != e && E(H.bundles[t][n], e) > -1) return n
    }
    var n = e.attachEvent && !e.opera,
        r = t.getElementsByTagName("script"),
        i = 0,
        s, o = t.createElement("script"),
        u = {},
        a = {},
        f, l, c = {},
        h = e.using,
        p = e.provide,
        d = e.define,
        v = e.loadrunner;
    for (var m = 0, g; g = r[m]; m++)
        if (g.src.match(/loadrunner\.js(\?|#|$)/)) {
            s = g;
            break
        }
    var w = Array.isArray || function(e) {
        return e.constructor == Array
    };
    T.prototype.then = function(t) {
        var n = this;
        return this.started || (this.started = !0, this.start()), this.completed ? t.apply(e, this.results) : (this.callbacks = this.callbacks || [], this.callbacks.push(t)), this
    }, T.prototype.start = function() {}, T.prototype.complete = function() {
        if (!this.completed) {
            this.results = b(arguments), this.completed = !0;
            if (this.callbacks)
                for (var t = 0, n; n = this.callbacks[t]; t++) n.apply(e, this.results)
        }
    }, N.loaded = [], N.prototype = new T, N.prototype.start = function() {
        var e = this,
            t, n, r;
        return (r = a[this.id]) ? (r.then(function() {
            e.complete()
        }), this) : ((t = u[this.id]) ? t.then(function() {
            e.loaded()
        }) : !this.force && E(N.loaded, this.id) > -1 ? this.loaded() : (n = q(this.id)) ? H(n, function() {
            e.loaded()
        }) : this.load(), this)
    }, N.prototype.load = function() {
        var t = this;
        u[this.id] = t;
        var n = o.cloneNode(!1);
        this.scriptId = n.id = "LR" + ++i, n.type = "text/javascript", n.async = !0, n.onerror = function() {
            throw new Error(t.path + " not loaded")
        }, n.onreadystatechange = n.onload = function(n) {
            n = e.event || n;
            if (n.type == "load" || E(["loaded", "complete"], this.readyState) > -1) this.onreadystatechange = null, t.loaded()
        }, n.src = this.path, l = this, r[0].parentNode.insertBefore(n, r[0]), l = null, c[n.id] = this
    }, N.prototype.loaded = function() {
        this.complete()
    }, N.prototype.complete = function() {
        E(N.loaded, this.id) == -1 && N.loaded.push(this.id), delete u[this.id], T.prototype.complete.apply(this, arguments)
    }, C.exports = {}, C.prototype = new N, C.prototype.resolvePath = function(e) {
        return S(H.path, e + ".js")
    }, C.prototype.start = function() {
        var e, t, n = this,
            r;
        this.body ? this.execute() : (e = C.exports[this.id]) ? this.exp(e) : (t = a[this.id]) ? t.then(function(e) {
            n.exp(e)
        }) : (bundle = q(this.id)) ? H(bundle, function() {
            n.start()
        }) : (a[this.id] = this, this.load())
    }, C.prototype.loaded = function() {
        var e, t, r = this;
        n ? (t = C.exports[this.id]) ? this.exp(t) : (e = a[this.id]) && e.then(function(e) {
            r.exp(e)
        }) : (e = f, f = null, e.id = e.id || this.id, e.then(function(e) {
            r.exp(e)
        }))
    }, C.prototype.complete = function() {
        delete a[this.id], N.prototype.complete.apply(this, arguments)
    }, C.prototype.execute = function() {
        var e = this;
        typeof this.body == "object" ? this.exp(this.body) : typeof this.body == "function" && this.body.apply(window, [function(t) {
            e.exp(t)
        }])
    }, C.prototype.exp = function(e) {
        this.complete(this.exports = C.exports[this.id] = e || {})
    }, k.prototype = new T, k.prototype.start = function() {
        function t() {
            var t = [];
            e.collectResults && (t[0] = {});
            for (var n = 0, r; r = e.deps[n]; n++) {
                if (!r.completed) return;
                r.results.length > 0 && (e.collectResults ? r instanceof L ? y(t[0], r.results[0]) : x(t[0], r.id, r.results[0]) : t = t.concat(r.results))
            }
            e.complete.apply(e, t)
        }
        var e = this;
        for (var n = 0, r; r = this.deps[n]; n++) r.then(t);
        return this
    }, L.prototype = new T, L.prototype.start = function() {
        var e = this,
            t = 0,
            n = [];
        return e.collectResults && (n[0] = {}),
            function r() {
                var i = e.deps[t++];
                i ? i.then(function(t) {
                    i.results.length > 0 && (e.collectResults ? i instanceof L ? y(n[0], i.results[0]) : x(n[0], i.id, i.results[0]) : n.push(i.results[0])), r()
                }) : e.complete.apply(e, n)
            }(), this
    }, P.amd = {};
    var F = function(e) {
        return e(H, M, F, define)
    };
    F.Script = N, F.Module = C, F.Collection = k, F.Sequence = L, F.Dependency = T, F.noConflict = I, e.loadrunner = F, e.using = H, e.provide = M, e.define = P, H.path = "", H.matchers = [], H.matchers.add = function(e, t) {
        this.unshift([e, t])
    }, H.matchers.add(/(^script!|\.js$)/, function(e) {
        var t = new N(e.replace(/^\$/, H.path.replace(/\/$/, "") + "/").replace(/^script!/, ""), !1);
        return t.id = e, t
    }), H.matchers.add(/^[a-zA-Z0-9_\-\/]+$/, function(e) {
        return new C(e)
    }), H.bundles = [], s && (H.path = window.__twttrLoadRunnerPath || s.getAttribute("data-path") || s.src.split(/loadrunner\.js/)[0] || "", (main = s.getAttribute("data-main")) && H.apply(e, main.split(/\s*,\s*/)).then(function() {}))
})(this, document);
window.__twttrlr = loadrunner.noConflict();
__twttrlr(function(using, provide, loadrunner, define) {
    provide("util/util", function(e) {
        function t(e) {
            return e && String(e).toLowerCase().indexOf("[native code]") > -1
        }

        function n(e) {
            return o(arguments, function(t) {
                s(t, function(t, n) {
                    e[t] = n
                })
            }), e
        }

        function r(e) {
            return s(e, function(t, n) {
                v(n) && (r(n), m(n) && delete e[t]), (n === undefined || n === null || n === "") && delete e[t]
            }), e
        }

        function s(e, t) {
            for (var n in e)(!e.hasOwnProperty || e.hasOwnProperty(n)) && t(n, e[n]);
            return e
        }

        function c(e) {
            return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function h(e, t) {
            return e == c(t)
        }

        function p(e, t, n) {
            return n = n || [],
                function() {
                    var r = a(arguments, function(e) {
                        return e
                    });
                    return e.apply(t, n.concat(r))
                }
        }

        function v(e) {
            return e === Object(e)
        }

        function m(e) {
            if (!v(e)) return !1;
            if (Object.keys) return !Object.keys(e).length;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function g(e, t) {
            window.setTimeout(function() {
                e.call(t || null)
            }, 0)
        }

        function y(e) {
            return Array.prototype.slice.call(e)
        }
        var i = function() {
                var e = Array.prototype.indexOf;
                return t(e) ? function(t, n) {
                    return t ? e.apply(t, [n]) : -1
                } : function(e, t) {
                    if (!e) return -1;
                    for (var n = 0, r = e.length; n < r; n++)
                        if (t == e[n]) return n;
                    return -1
                }
            }(),
            o = function() {
                var e = Array.prototype.forEach;
                return t(e) ? function(t, n) {
                    if (!t) return;
                    if (!n) return;
                    e.apply(t, [n])
                } : function(e, t) {
                    if (!e) return;
                    if (!t) return;
                    for (var n = 0, r = e.length; n < r; n++) t(e[n], n)
                }
            }(),
            u = function() {
                var e = Array.prototype.filter;
                return t(e) ? function(t, n) {
                    return t ? n ? e.apply(t, [n]) : t : null
                } : function(e, t) {
                    if (!e) return null;
                    if (!t) return e;
                    var n = [],
                        r = 0,
                        i = e.length;
                    for (; r < i; r++) t(e[r]) && n.push(e[r]);
                    return n
                }
            }(),
            a = function() {
                var e = Array.prototype.map;
                return t(e) ? function(t, n) {
                    return t ? n ? e.apply(t, [n]) : t : null
                } : function(e, t) {
                    if (!e) return null;
                    if (!t) return e;
                    var n = [],
                        r = 0,
                        i = e.length;
                    for (; r < i; r++) n.push(t(e[r]));
                    return n
                }
            }(),
            f = function() {
                var e = Array.prototype.reduce;
                return t(e) ? function(t, n, r) {
                    return t ? n ? e.apply(t, [n, r]) : r : null
                } : function(e, t, n) {
                    if (!e) return null;
                    if (!t) return n;
                    var r = n,
                        i = 0,
                        s = e.length;
                    for (; i < s; i++) r = t(r, e[i], i, e);
                    return r
                }
            }(),
            l = function() {
                var e = String.prototype.trim;
                return t(e) ? function(t) {
                    return t && e.apply(t)
                } : function(e) {
                    return e && e.replace(/(^\s+|\s+$)/g, "")
                }
            }(),
            d = t(Object.create) ? Object.create : function(e) {
                function t() {}
                return t.prototype = e, new t
            };
        e({
            aug: n,
            async: g,
            compact: r,
            forIn: s,
            forEach: o,
            filter: u,
            map: a,
            reduce: f,
            trim: l,
            indexOf: i,
            isNative: t,
            isObject: v,
            isEmptyObject: m,
            createObject: d,
            bind: p,
            toType: c,
            isType: h,
            toRealArray: y
        })
    });
    provide("util/events", function(e) {
        using("util/util", function(t) {
            var n = {
                bind: function(e, t) {
                    return this._handlers = this._handlers || {}, this._handlers[e] = this._handlers[e] || [], this._handlers[e].push(t)
                },
                unbind: function(e, n) {
                    if (!this._handlers[e]) return;
                    if (n) {
                        var r = t.indexOf(this._handlers[e], n);
                        r >= 0 && this._handlers[e].splice(r, 1)
                    } else this._handlers[e] = []
                },
                trigger: function(e, n) {
                    var r = this._handlers && this._handlers[e];
                    n.type = e, t.forEach(r, function(e) {
                        t.async(t.bind(e, this, [n]))
                    })
                }
            };
            e({
                Emitter: n
            })
        })
    });
    provide("$xd/json2.js", function(exports) {
        window.JSON || (window.JSON = {}),
            function() {
                function f(e) {
                    return e < 10 ? "0" + e : e
                }

                function quote(e) {
                    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                        var t = meta[e];
                        return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + e + '"'
                }

                function str(e, t) {
                    var n, r, i, s, o = gap,
                        u, a = t[e];
                    a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
                    switch (typeof a) {
                        case "string":
                            return quote(a);
                        case "number":
                            return isFinite(a) ? String(a) : "null";
                        case "boolean":
                        case "null":
                            return String(a);
                        case "object":
                            if (!a) return "null";
                            gap += indent, u = [];
                            if (Object.prototype.toString.apply(a) === "[object Array]") {
                                s = a.length;
                                for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                                return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                            }
                            if (rep && typeof rep == "object") {
                                s = rep.length;
                                for (n = 0; n < s; n += 1) r = rep[n], typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                            } else
                                for (r in a) Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                            return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
                    }
                }
                typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                    return this.valueOf()
                });
                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta = {
                        "\b": "\\b",
                        "	": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    rep;
                typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
                    var r;
                    gap = "", indent = "";
                    if (typeof n == "number")
                        for (r = 0; r < n; r += 1) indent += " ";
                    else typeof n == "string" && (indent = n);
                    rep = t;
                    if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                        "": e
                    });
                    throw new Error("JSON.stringify")
                }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
                    function walk(e, t) {
                        var n, r, i = e[t];
                        if (i && typeof i == "object")
                            for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                        return reviver.call(e, t, i)
                    }
                    var j;
                    cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }));
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                        "": j
                    }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
            }();
        exports();
        loadrunner.Script.loaded.push("$xd/json2.js")
    });
    provide("util/querystring", function(e) {
        function t(e) {
            return encodeURIComponent(e).replace(/\+/g, "%2B").replace(/'/g, "%27")
        }

        function n(e) {
            return decodeURIComponent(e)
        }

        function r(e) {
            var n = [],
                r;
            for (r in e) e[r] !== null && typeof e[r] != "undefined" && n.push(t(r) + "=" + t(e[r]));
            return n.sort().join("&")
        }

        function i(e) {
            var t = {},
                r, i, s, o;
            if (e) {
                r = e.split("&");
                for (o = 0; s = r[o]; o++) i = s.split("="), i.length == 2 && (t[n(i[0])] = n(i[1]))
            }
            return t
        }

        function s(e, t) {
            var n = r(t);
            return n.length > 0 ? e.indexOf("?") >= 0 ? e + "&" + r(t) : e + "?" + r(t) : e
        }

        function o(e) {
            var t = e && e.split("?");
            return t.length == 2 ? i(t[1]) : {}
        }
        e({
            url: s,
            decodeURL: o,
            decode: i,
            encode: r,
            encodePart: t,
            decodePart: n
        })
    });
    provide("util/twitter", function(e) {
        using("util/querystring", function(t) {
            function u(e) {
                return typeof e == "string" && n.test(e) && RegExp.$1.length <= 20
            }

            function a(e) {
                if (u(e)) return RegExp.$1
            }

            function f(e, n) {
                var r = t.decodeURL(e);
                n = n || !1, r.screen_name = a(e);
                if (r.screen_name) return t.url("https://twitter.com/intent/" + (n ? "follow" : "user"), r)
            }

            function l(e) {
                return f(e, !0)
            }

            function c(e) {
                return typeof e == "string" && o.test(e)
            }

            function h(e, t) {
                t = t === undefined ? !0 : t;
                if (c(e)) return (t ? "#" : "") + RegExp.$1
            }

            function p(e) {
                return typeof e == "string" && r.test(e)
            }

            function d(e) {
                return p(e) && RegExp.$1
            }

            function v(e) {
                return i.test(e)
            }

            function m(e) {
                return s.test(e)
            }
            var n = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,
                r = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,
                i = /^http(s?):\/\/(\w+\.)*twitter\.com([\:\/]|$)/i,
                s = /^http(s?):\/\/pbs\.twimg\.com\//,
                o = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/;
            e({
                isHashTag: c,
                hashTag: h,
                isScreenName: u,
                screenName: a,
                isStatus: p,
                status: d,
                intentForProfileURL: f,
                intentForFollowURL: l,
                isTwitterURL: v,
                isTwimgURL: m,
                regexen: {
                    profile: n
                }
            })
        })
    });
    provide("util/uri", function(e) {
        using("util/querystring", "util/util", "util/twitter", function(t, n, r) {
            function i(e, t) {
                var n, r;
                return t = t || location, /^https?:\/\//.test(e) ? e : /^\/\//.test(e) ? t.protocol + e : (n = t.host + (t.port.length ? ":" + t.port : ""), e.indexOf("/") !== 0 && (r = t.pathname.split("/"), r.pop(), r.push(e), e = "/" + r.join("/")), [t.protocol, "//", n, e].join(""))
            }

            function s() {
                var e = document.getElementsByTagName("link"),
                    t = 0,
                    n;
                for (; n = e[t]; t++)
                    if (n.rel == "canonical") return i(n.href)
            }

            function o() {
                var e = document.getElementsByTagName("a"),
                    t = document.getElementsByTagName("link"),
                    n = [e, t],
                    i, s, o = 0,
                    u = 0,
                    a = /\bme\b/,
                    f;
                for (; i = n[o]; o++)
                    for (u = 0; s = i[u]; u++)
                        if (a.test(s.rel) && (f = r.screenName(s.href))) return f
            }
            e({
                absolutize: i,
                getCanonicalURL: s,
                getScreenNameFromPage: o
            })
        })
    });
    provide("util/typevalidator", function(e) {
        using("util/util", function(t) {
            function n(e) {
                return e !== undefined && e !== null && e !== ""
            }

            function r(e) {
                return s(e) && e % 1 === 0
            }

            function i(e) {
                return s(e) && !r(e)
            }

            function s(e) {
                return n(e) && !isNaN(e)
            }

            function o(e) {
                return n(e) && t.toType(e) == "array"
            }

            function u(e) {
                if (!n(e)) return !1;
                switch (e) {
                    case "on":
                    case "ON":
                    case "true":
                    case "TRUE":
                        return !0;
                    case "off":
                    case "OFF":
                    case "false":
                    case "FALSE":
                        return !1;
                    default:
                        return !!e
                }
            }

            function a(e) {
                if (s(e)) return e
            }

            function f(e) {
                if (i(e)) return e
            }

            function l(e) {
                if (r(e)) return e
            }
            e({
                hasValue: n,
                isInt: r,
                isFloat: i,
                isNumber: s,
                isArray: o,
                asInt: l,
                asFloat: f,
                asNumber: a,
                asBoolean: u
            })
        })
    });
    provide("tfw/util/globals", function(e) {
        using("util/typevalidator", function(t) {
            function r() {
                var e = document.getElementsByTagName("meta"),
                    t, r, i = 0;
                n = {};
                for (; t = e[i]; i++) {
                    if (!/^twitter:/.test(t.name)) continue;
                    r = t.name.replace(/^twitter:/, ""), n[r] = t.content
                }
            }

            function i(e) {
                return n[e]
            }

            function s(e) {
                return t.asBoolean(e) && (n.dnt = !0), t.asBoolean(n.dnt)
            }
            var n;
            r(), e({
                init: r,
                val: i,
                dnt: s
            })
        })
    });
    provide("dom/delegate", function(e) {
        function r(e) {
            var t = e.getAttribute("data-twitter-event-id");
            return t ? t : (e.setAttribute("data-twitter-event-id", ++n), n)
        }

        function i(e, t, n) {
            var r = 0,
                i = e && e.length || 0;
            for (r = 0; r < i; r++) e[r].call(t, n)
        }

        function s(e, t, n) {
            var r = n || e.target || e.srcElement,
                o = r.className.split(" "),
                u = 0,
                a = o.length;
            for (; u < a; u++) i(t["." + o[u]], r, e);
            i(t[r.tagName], r, e);
            if (e.cease) return;
            r !== this && s.call(this, e, t, r.parentElement || r.parentNode)
        }

        function o(e, t, n) {
            if (e.addEventListener) {
                e.addEventListener(t, function(r) {
                    s.call(e, r, n[t])
                }, !1);
                return
            }
            e.attachEvent && e.attachEvent("on" + t, function() {
                s.call(e, e.ownerDocument.parentWindow.event, n[t])
            })
        }

        function u(e, n, i, s) {
            var u = r(e);
            t[u] = t[u] || {}, t[u][n] || (t[u][n] = {}, o(e, n, t[u])), t[u][n][i] = t[u][n][i] || [], t[u][n][i].push(s)
        }

        function a(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, function() {
                n(window.event)
            })
        }

        function f(e, n, i) {
            var o = r(n),
                u = t[o] && t[o];
            s.call(n, {
                target: i
            }, u[e])
        }

        function l(e) {
            return h(e), c(e), !1
        }

        function c(e) {
            e && e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }

        function h(e) {
            e && (e.cease = !0) && e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        }
        var t = {},
            n = -1;
        e({
            stop: l,
            stopPropagation: h,
            preventDefault: c,
            delegate: u,
            on: a,
            simulate: f
        })
    });
    provide("tfw/util/article", function(e) {
        using("dom/delegate", "tfw/util/globals", "util/uri", "$xd/json2.js", function(t, n, r) {
            function o() {
                i = r.getCanonicalURL() || "" + document.location;
                if (!window.top.postMessage) return;
                if (window == window.top) {
                    t.on(window, "message", function(e) {
                        var t;
                        if (e.data && e.data[0] != "{") return;
                        try {
                            t = JSON.parse(e.data)
                        } catch (r) {}
                        t && t.name == "twttr:private:requestArticleUrl" && e.source.postMessage(JSON.stringify({
                            name: "twttr:private:provideArticleUrl",
                            data: {
                                url: i,
                                dnt: n.dnt()
                            }
                        }), "*")
                    });
                    return
                }
                t.on(window, "message", function(e) {
                    var t;
                    if (e.data && e.data[0] != "{") return;
                    try {
                        t = JSON.parse(e.data)
                    } catch (r) {}
                    t && t.name == "twttr:private:provideArticleUrl" && (i = t.data && t.data.url, n.dnt(t.data.dnt), s = document.location.href)
                }), window.top.postMessage(JSON.stringify({
                    name: "twttr:private:requestArticleUrl"
                }), "*")
            }
            var i, s = "";
            o(), e({
                url: function() {
                    return i
                },
                frameUrl: function() {
                    return s
                }
            })
        })
    });
    provide("dom/get", function(e) {
        using("util/util", function(t) {
            function r(e, t, r) {
                return n(e, t, r, 1)[0]
            }

            function i(e, n, r) {
                var s = n && n.parentNode,
                    o;
                if (!s || s === r) return;
                return s.tagName == e ? s : (o = s.className.split(" "), 0 === e.indexOf(".") && ~t.indexOf(o, e.slice(1)) ? s : i(e, s, r))
            }
            var n = function() {
                var e = document.getElementsByClassName;
                return t.isNative(e) ? function(n, r, i, s) {
                    var o = r ? r.getElementsByClassName(n) : e.call(document, n),
                        u = t.filter(o, function(e) {
                            return !i || e.tagName.toLowerCase() == i.toLowerCase()
                        });
                    return [].slice.call(u, 0, s || u.length)
                } : function(e, n, r, i) {
                    var s, o, u = [],
                        a, f, l, c, h, p;
                    n = n || document, a = e.split(" "), c = a.length, s = n.getElementsByTagName(r || "*"), p = s.length;
                    for (l = 0; l < c && p > 0; l++) {
                        u = [], f = a[l];
                        for (h = 0; h < p; h++) {
                            o = s[h], ~t.indexOf(o.className.split(" "), f) && u.push(o);
                            if (l + 1 == c && u.length === i) break
                        }
                        s = u, p = s.length
                    }
                    return u
                }
            }();
            e({
                all: n,
                one: r,
                ancestor: i
            })
        })
    });
    provide("dom/classname", function(e) {
        function t(e) {
            return new RegExp("\\b" + e + "\\b", "g")
        }

        function n(e, n) {
            if (e.classList) {
                e.classList.add(n);
                return
            }
            t(n).test(e.className) || (e.className += " " + n)
        }

        function r(e, n) {
            if (e.classList) {
                e.classList.remove(n);
                return
            }
            e.className = e.className.replace(t(n), " ")
        }

        function i(e, t, i) {
            return i === undefined && e.classList && e.classList.toggle ? e.classList.toggle(t, i) : (i ? n(e, t) : r(e, t), i)
        }

        function s(e, i, s) {
            if (e.classList && o(e, i)) {
                r(e, i), n(e, s);
                return
            }
            e.className = e.className.replace(t(i), s)
        }

        function o(e, n) {
            return e.classList ? e.classList.contains(n) : t(n).test(e.className)
        }
        e({
            add: n,
            remove: r,
            replace: s,
            toggle: i,
            present: o
        })
    });
    provide("util/throttle", function(e) {
        function t(e, t, n) {
            function o() {
                var n = +(new Date);
                window.clearTimeout(s);
                if (n - i > t) {
                    i = n, e.call(r);
                    return
                }
                s = window.setTimeout(o, t)
            }
            var r = n || this,
                i = 0,
                s;
            return o
        }
        e(t)
    });
    provide("util/logger", function(e) {
        using("util/util", function(t) {
            function s() {
                c("info", t.toRealArray(arguments))
            }

            function o() {
                c("warn", t.toRealArray(arguments))
            }

            function u() {
                c("error", t.toRealArray(arguments))
            }

            function a(e) {
                if (!i) return;
                r[e] = l()
            }

            function f(e) {
                var t;
                if (!i) return;
                r[e] ? (t = l(), s("_twitter", e, t - r[e])) : u("timeEnd() called before time() for id: ", e)
            }

            function l() {
                return window.performance && +window.performance.now() || +(new Date)
            }

            function c(e, t) {
                if (!window[n] || !window[n][e]) return;
                switch (t.length) {
                    case 1:
                        window[n][e](t[0]);
                        break;
                    case 2:
                        window[n][e](t[0], t[1]);
                        break;
                    case 3:
                        window[n][e](t[0], t[1], t[2]);
                        break;
                    case 4:
                        window[n][e](t[0], t[1], t[2], t[3]);
                        break;
                    case 5:
                        window[n][e](t[0], t[1], t[2], t[3], t[4]);
                        break;
                    default:
                        t.length !== 0 && window[n].warn && window[n].warn("too many params passed to logger." + e)
                }
            }
            var n = ["con", "sole"].join(""),
                r = {},
                i = !!~location.href.indexOf("tw_debug=true");
            e({
                info: s,
                warn: o,
                error: u,
                time: a,
                timeEnd: f
            })
        })
    });
    provide("util/domready", function(e) {
        function c() {
            t = 1;
            for (var e = 0, r = n.length; e < r; e++) n[e]()
        }
        var t = 0,
            n = [],
            r, i, s = !1,
            o = document.createElement("a"),
            u = "DOMContentLoaded",
            a = "addEventListener",
            f = "onreadystatechange",
            l;
        /^loade|c/.test(document.readyState) && (t = 1), document[a] && document[a](u, i = function() {
            document.removeEventListener(u, i, s), c()
        }, s), o.doScroll && document.attachEvent(f, r = function() {
            /^c/.test(document.readyState) && (document.detachEvent(f, r), c())
        }), l = o.doScroll ? function(e) {
            window.self != window.top ? t ? e() : n.push(e) : ! function() {
                try {
                    o.doScroll("left")
                } catch (t) {
                    return setTimeout(function() {
                        l(e)
                    }, 50)
                }
                e()
            }()
        } : function(e) {
            t ? e() : n.push(e)
        }, e(l)
    });
    provide("util/env", function(e) {
        using("util/domready", "util/typevalidator", "util/logger", "tfw/util/globals", function(t, n, r, i) {
            function f(e) {
                return e = e || window, e.devicePixelRatio ? e.devicePixelRatio >= 1.5 : e.matchMedia ? e.matchMedia("only screen and (min-resolution: 144dpi)").matches : !1
            }

            function l(e) {
                return e = e || s, /(Trident|MSIE \d)/.test(e)
            }

            function c(e) {
                return e = e || s, /MSIE 6/.test(e)
            }

            function h(e) {
                return e = e || s, /MSIE 7/.test(e)
            }

            function p(e) {
                return e = e || s, /MSIE 9/.test(e)
            }

            function d(e) {
                return e = e || s, /(iPad|iPhone|iPod)/.test(e)
            }

            function v(e) {
                return e = e || s, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(e)
            }

            function m() {
                return o
            }

            function g(e, t) {
                return e = e || window, t = t || s, e.postMessage && (!l(t) || !e.opener)
            }

            function y(e) {
                e = e || navigator;
                try {
                    return !!e.plugins["Shockwave Flash"] || !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
                } catch (t) {
                    return !1
                }
            }

            function b(e, t, n) {
                return e = e || window, t = t || navigator, n = n || s, "ontouchstart" in e || /Opera Mini/.test(n) || t.msMaxTouchPoints > 0
            }

            function w() {
                var e = document.body.style;
                return e.transition !== undefined || e.webkitTransition !== undefined || e.mozTransition !== undefined || e.oTransition !== undefined || e.msTransition !== undefined
            }
            var s = window.navigator.userAgent,
                o = !1,
                u = !1,
                a = "twitter-csp-test";
            window.twttr = window.twttr || {}, twttr.verifyCSP = function(e) {
                var t = document.getElementById(a);
                u = !0, o = !!e, t && t.parentNode.removeChild(t)
            }, t(function() {
                var e;
                if (c() || h()) return o = !1;
                if (n.asBoolean(i.val("widgets:csp"))) return o = !0;
                e = document.createElement("script"), e.id = a, e.text = "twttr.verifyCSP(false);", document.body.appendChild(e), window.setTimeout(function() {
                    if (u) return;
                    r.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'), r.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied.")
                }, 5e3)
            }), e({
                retina: f,
                anyIE: l,
                ie6: c,
                ie7: h,
                ie9: p,
                ios: d,
                android: v,
                cspEnabled: m,
                flashEnabled: y,
                canPostMessage: g,
                touch: b,
                cssTransitions: w
            })
        })
    });
    provide("util/css", function(e) {
        using("util/util", function(t) {
            e({
                sanitize: function(e, n, r) {
                    var i = /^[\w ,%\/"'\-_#]+$/,
                        s = e && t.map(e.split(";"), function(e) {
                            return t.map(e.split(":").slice(0, 2), function(e) {
                                return t.trim(e)
                            })
                        }),
                        o = 0,
                        u, a = [],
                        f = r ? "!important" : "";
                    n = n || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/;
                    for (; s && (u = s[o]); o++) u[0].match(n) && u[1].match(i) && a.push(u.join(":") + f);
                    return a.join(";")
                }
            })
        })
    });
    provide("tfw/util/params", function(e) {
        using("util/querystring", "util/twitter", function(t, n) {
            e(function(e, r) {
                return function(i) {
                    var s, o = "data-tw-params",
                        u;
                    if (!i) return;
                    if (!n.isTwitterURL(i.href)) return;
                    if (i.getAttribute(o)) return;
                    i.setAttribute(o, !0);
                    if (typeof r == "function") {
                        s = r.call(this, i);
                        for (u in s) s.hasOwnProperty(u) && (e[u] = s[u])
                    }
                    i.href = t.url(i.href, e)
                }
            })
        })
    });
    provide("util/iframe", function(e) {
        using("util/util", function(t) {
            e(function(e, n, r) {
                var i;
                r = r || document, e = e || {}, n = n || {};
                if (e.name) {
                    try {
                        i = r.createElement('<iframe name="' + e.name + '"></iframe>')
                    } catch (s) {
                        i = r.createElement("iframe"), i.name = e.name
                    }
                    delete e.name
                } else i = r.createElement("iframe");
                return e.id && (i.id = e.id, delete e.id), i.allowtransparency = "true", i.scrolling = "no", i.setAttribute("frameBorder", 0), i.setAttribute("allowTransparency", !0), t.forIn(e, function(e, t) {
                    i.setAttribute(e, t)
                }), t.forIn(n, function(e, t) {
                    i.style[e] = t
                }), i
            })
        })
    });
    provide("util/params", function(e) {
        using("util/querystring", function(t) {
            var n, r, i;
            n = function(e) {
                var n = e.search.substr(1);
                return t.decode(n)
            }, r = function(e) {
                var n = e.href,
                    r = n.indexOf("#"),
                    i = r < 0 ? "" : n.substring(r + 1);
                return t.decode(i)
            }, i = function(e) {
                var t = {},
                    i = n(e),
                    s = r(e),
                    o;
                for (o in i) i.hasOwnProperty(o) && (t[o] = i[o]);
                for (o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
                return t
            }, e({
                combined: i,
                fromQuery: n,
                fromFragment: r
            })
        })
    });
    provide("tfw/util/env", function(e) {
        using("util/params", function(t) {
            function r() {
                var e = 36e5,
                    r = t.combined(document.location)._;
                return n !== undefined ? n : (n = !1, r && /^\d+$/.test(r) && (n = +(new Date) - parseInt(r) < e), n)
            }
            var n;
            e({
                isDynamicWidget: r
            })
        })
    });
    provide("util/promise", function(e) {
        using("util/util", function(t) {
            var n = function(e) {
                    try {
                        var t = e.then;
                        if (typeof t == "function") return !0
                    } catch (n) {}
                    return !1
                },
                r = function(e) {
                    Error.call(this, e)
                };
            r.prototype = t.createObject(Error.prototype);
            var i = function() {
                    var e = [];
                    return e.pump = function(n) {
                        t.async(function() {
                            var t = e.length,
                                r = 0;
                            while (r < t) r++, e.shift()(n)
                        })
                    }, e
                },
                s = function(e, r, i, s, o, u) {
                    var a = !1,
                        f = this,
                        l = function(e) {
                            t.async(function() {
                                u("fulfilled"), s(e), r.pump(e)
                            })
                        },
                        c = function(e) {
                            t.async(function() {
                                u("rejected"), o(e), i.pump(e)
                            })
                        },
                        h = function(e) {
                            if (n(e)) {
                                e.then(h, c);
                                return
                            }
                            l(e)
                        },
                        p = function(e) {
                            return function(t) {
                                a || (a = !0, e(t))
                            }
                        };
                    this.resolve = p(h, "resolve"), this.fulfill = p(l, "fulfill"), this.reject = p(c, "reject"), this.cancel = function() {
                        f.reject(new Error("Cancel"))
                    }, this.timeout = function() {
                        f.reject(new Error("Timeout"))
                    }, u("pending")
                },
                o = function(e) {
                    var t = new i,
                        n = new i,
                        r, o, u = "pending";
                    this._addAcceptCallback = function(e) {
                        t.push(e), u == "fulfilled" && t.pump(r)
                    }, this._addRejectCallback = function(e) {
                        n.push(e), u == "rejected" && n.pump(o)
                    };
                    var a = new s(this, t, n, function(e) {
                        r = e
                    }, function(e) {
                        o = e
                    }, function(e) {
                        u = e
                    });
                    try {
                        e && e(a)
                    } catch (f) {
                        a.reject(f)
                    }
                },
                u = function(e) {
                    return typeof e == "function"
                },
                a = function(e, n, r) {
                    return u(e) ? function() {
                        try {
                            var t = e.apply(null, arguments);
                            n.resolve(t)
                        } catch (r) {
                            n.reject(r)
                        }
                    } : t.bind(n[r], n)
                },
                f = function(e, t, n) {
                    return u(e) && n._addAcceptCallback(e), u(t) && n._addRejectCallback(t), n
                };
            t.aug(o.prototype, {
                then: function(e, t) {
                    var n = this;
                    return new o(function(r) {
                        f(a(e, r, "resolve"), a(t, r, "reject"), n)
                    })
                },
                "catch": function(e) {
                    var t = this;
                    return new o(function(n) {
                        f(null, a(e, n, "reject"), t)
                    })
                }
            }), o.isThenable = n;
            var l = function(e) {
                return t.map(e, o.resolve)
            };
            o.any = function() {
                var e = l(arguments);
                return new o(function(n) {
                    if (!e.length) n.reject("No futures passed to Promise.any()");
                    else {
                        var r = !1,
                            i = function(e) {
                                if (r) return;
                                r = !0, n.resolve(e)
                            },
                            s = function(e) {
                                if (r) return;
                                r = !0, n.reject(e)
                            };
                        t.forEach(e, function(e) {
                            e.then(i, s)
                        })
                    }
                })
            }, o.every = function() {
                var e = l(arguments);
                return new o(function(n) {
                    if (!e.length) n.reject("No futures passed to Promise.every()");
                    else {
                        var r = new Array(e.length),
                            i = 0,
                            s = function(t, s) {
                                i++, r[t] = s, i == e.length && n.resolve(r)
                            };
                        t.forEach(e, function(e, r) {
                            e.then(t.bind(s, null, [r]), n.reject)
                        })
                    }
                })
            }, o.some = function() {
                var e = l(arguments);
                return new o(function(n) {
                    if (!e.length) n.reject("No futures passed to Promise.some()");
                    else {
                        var r = 0,
                            i = function() {
                                r++, r == e.length && n.reject()
                            };
                        t.forEach(e, function(e) {
                            e.then(n.resolve, i)
                        })
                    }
                })
            }, o.fulfill = function(e) {
                return new o(function(t) {
                    t.fulfill(e)
                })
            }, o.resolve = function(e) {
                return new o(function(t) {
                    t.resolve(e)
                })
            }, o.reject = function(e) {
                return new o(function(t) {
                    t.reject(e)
                })
            }, e(o)
        })
    });
    provide("util/donottrack", function(e) {
        using("tfw/util/globals", function(t) {
            e(function(e, n) {
                var r = /\.(gov|mil)(:\d+)?$/i,
                    i = /https?:\/\/([^\/]+).*/i;
                return e = e || document.referrer, e = i.test(e) && RegExp.$1, n = n || document.location.host, t.dnt() ? !0 : r.test(n) ? !0 : e && r.test(e) ? !0 : document.navigator ? document.navigator["doNotTrack"] == 1 : navigator ? navigator["doNotTrack"] == 1 || navigator["msDoNotTrack"] == 1 : !1
            })
        })
    });
    provide("sandbox/baseframe", function(e) {
        using("util/domready", "util/env", "util/iframe", "util/promise", "util/util", function(t, n, r, i, s) {
            function u(e, t, n, o) {
                var u;
                this.readyPromise = new i(s.bind(function(e) {
                    this.resolver = e
                }, this)), this.attrs = e || {}, this.styles = t || {}, this.appender = n || function(e) {
                    document.body.appendChild(e)
                }, this.layout = o || function(e) {
                    return new i(function(t) {
                        return t.fulfill(e())
                    })
                }, this.frame = u = r(this.attrs, this.styles), u.onreadystatechange = u.onload = this.getCallback(this.onLoad), this.layout(s.bind(function() {
                    this.appender(u)
                }, this))
            }
            var o = 0;
            window.twttr = window.twttr || {}, window.twttr.sandbox = window.twttr.sandbox || {}, u.prototype.getCallback = function(e) {
                var t = this,
                    n = !1;
                return function() {
                    n || (n = !0, e.call(t))
                }
            }, u.prototype.registerCallback = function(e) {
                var t = "cb" + o++;
                return window.twttr.sandbox[t] = e, t
            }, u.prototype.onLoad = function() {
                try {
                    this.document = this.frame.contentWindow.document
                } catch (e) {
                    this.setDocDomain();
                    return
                }
                this.writeStandardsDoc(), this.resolver.fulfill(this)
            }, u.prototype.ready = function() {
                return this.readyPromise
            }, u.prototype.setDocDomain = function() {
                var e = r(this.attrs, this.styles),
                    t = this.registerCallback(this.getCallback(this.onLoad));
                e.src = ["javascript:", 'document.write("");', "try { window.parent.document; }", "catch (e) {", 'document.domain="' + document.domain + '";', "}", 'window.parent.twttr.sandbox["' + t + '"]();'].join(""), this.layout(s.bind(function() {
                    this.frame.parentNode.removeChild(this.frame), this.frame = null, this.appender ? this.appender(e) : document.body.appendChild(e), this.frame = e
                }, this))
            }, u.prototype.writeStandardsDoc = function() {
                if (!n.anyIE() || n.cspEnabled()) return;
                var e = ["<!DOCTYPE html>", "<html>", "<head>", "<scr", "ipt>", "try { window.parent.document; }", 'catch (e) {document.domain="' + document.domain + '";}', "</scr", "ipt>", "</head>", "<body></body>", "</html>"].join("");
                this.document.write(e), this.document.close()
            }, e(u)
        })
    });
    provide("sandbox/minimal", function(e) {
        using("sandbox/baseframe", "util/env", "util/promise", "util/util", function(t, n, r, i) {
            function s(e, t) {
                if (!e) return;
                this._frame = e, this._win = e.contentWindow, this._doc = this._win.document, this._body = this._doc.body, this._head = this._body.parentNode.children[0], this.layout = t
            }
            i.aug(s.prototype, {
                createElement: function(e) {
                    return this._doc.createElement(e)
                },
                createDocumentFragment: function() {
                    return this._doc.createDocumentFragment()
                },
                appendChild: function(e) {
                    return this.layout(i.bind(function() {
                        return this._body.appendChild(e)
                    }, this))
                },
                setBaseTarget: function(e) {
                    var t = this._doc.createElement("base");
                    return t.target = e, this.layout(i.bind(function() {
                        return this._head.appendChild(t)
                    }, this))
                },
                setTitle: function(e) {
                    if (!e) return;
                    this._frame.title = e
                },
                element: function() {
                    return this._frame
                },
                document: function() {
                    return this._doc
                }
            }), s.createSandbox = function(e, n, r, i) {
                var o = new t(e, n, r, i);
                return o.ready().then(function(e) {
                    return new s(e.frame, e.layout)
                })
            }, e(s)
        })
    });
    provide("dom/cookie", function(e) {
        using("util/util", function(t) {
            e(function(e, n, r) {
                var i = t.aug({}, r),
                    s, o, u, a;
                if (arguments.length > 1 && String(n) !== "[object Object]") {
                    if (n === null || n === undefined) i.expires = -1;
                    return typeof i.expires == "number" && (s = i.expires, o = new Date((new Date).getTime() + s * 60 * 1e3), i.expires = o), n = String(n), document.cookie = [encodeURIComponent(e), "=", i.raw ? n : encodeURIComponent(n), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
                }
                return i = n || {}, a = i.raw ? function(e) {
                    return e
                } : decodeURIComponent, (u = (new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)")).exec(document.cookie)) ? a(u[1]) : null
            })
        })
    });
    provide("tfw/util/tracking", function(e) {
        using("dom/cookie", "dom/delegate", "sandbox/minimal", "util/donottrack", "util/promise", "util/querystring", "tfw/util/env", "util/iframe", "util/util", "$xd/json2.js", function(t, n, r, i, s, o, u, a, f) {
            function E() {
                return y ? y : y = r.createSandbox({
                    id: "rufous-sandbox"
                }, {
                    display: "none"
                }).then(f.bind(function(e) {
                    g = e, p = _(), d = D();
                    while (v[0]) k.apply(this, v.shift());
                    return m ? L() : [p, d]
                }, this))
            }

            function S(e, t, n, r) {
                var i = !f.isObject(e),
                    s = t ? !f.isObject(t) : !1,
                    o, u;
                if (i || s) return;
                o = O(e), u = M(t, !!n, !!r), C(o, u, !0)
            }

            function x(e, t, n, r, i) {
                var s = T(e.target || e.srcElement);
                s.action = i || "click", S(s, t, n, r)
            }

            function T(e, t) {
                var n;
                return t = t || {}, !e || e.nodeType !== 1 ? t : ((n = e.getAttribute("data-scribe")) && f.forEach(n.split(" "), function(e) {
                    var n = f.trim(e).split(":"),
                        r = n[0],
                        i = n[1];
                    r && i && !t[r] && (t[r] = i)
                }), T(e.parentNode, t))
            }

            function N(e, t, n) {
                var r = l + t;
                if (!e) return;
                return e[r] = n, e
            }

            function C(e, t, n) {
                var r, i, s, u, a;
                if (!f.isObject(e) || !f.isObject(t)) return;
                s = f.aug({}, t, {
                    event_namespace: e
                }), n ? (u = {
                    l: B(s)
                }, s.dnt && (u.dnt = 1), P(o.url(b, u))) : (r = p.firstChild, r.value = +(+r.value || s.dnt || 0), a = B(s), i = g.createElement("input"), i.type = "hidden", i.name = "l", i.value = a, p.appendChild(i))
            }

            function k(e, t, n, r) {
                var i = !f.isObject(e),
                    s = t ? !f.isObject(t) : !1,
                    o, u;
                if (i || s) return;
                if (!g || !p) {
                    v.push([e, t, n, r]);
                    return
                }
                o = O(e), u = M(t, !!n, !!r), C(o, u)
            }

            function L() {
                if (!p) return m = !0, y || s.reject();
                if (p.children.length <= 2) return s.reject();
                var e = s.every(g.appendChild(p), g.appendChild(d)).then(function(e) {
                    var t = e[0],
                        r = e[1];
                    return n.on(r, "load", function() {
                        window.setTimeout(A(t, r), 0)
                    }), t.submit(), e
                });
                return p = _(), d = D(), e
            }

            function A(e, t) {
                return function() {
                    var n = e.parentNode;
                    if (!n) return;
                    n.removeChild(e), n.removeChild(t)
                }
            }

            function O(e) {
                return f.aug({
                    client: "tfw"
                }, e || {})
            }

            function M(e, t, n) {
                var r = {
                        _category_: "tfw_client_event"
                    },
                    s, o;
                t = !!t, n = !!n, s = f.aug(r, e || {}), o = s.widget_origin || document.referrer, s.format_version = 1, s.triggered_on = s.triggered_on || +(new Date), t || (s.widget_origin = o);
                if (n || i(o)) s.dnt = !0, H(s);
                return s
            }

            function _() {
                var e = g.createElement("form"),
                    t = g.createElement("input"),
                    n = g.createElement("input");
                return h++, e.action = b, e.method = "POST", e.target = "rufous-frame-" + h, e.id = "rufous-form-" + h, t.type = "hidden", t.name = "dnt", t.value = 0, n.type = "hidden", n.name = "tfw_redirect", n.value = w, e.appendChild(t), e.appendChild(n), e
            }

            function D() {
                var e = "rufous-frame-" + h;
                return a({
                    id: e,
                    name: e,
                    width: 0,
                    height: 0,
                    border: 0
                }, {
                    display: "none"
                }, g.document())
            }

            function P(e) {
                var t = new Image;
                t.src = e
            }

            function H(e) {
                f.forIn(e, function(t) {
                    ~f.indexOf(c, t) && delete e[t]
                })
            }

            function B(e) {
                var t = Array.prototype.toJSON,
                    n;
                return delete Array.prototype.toJSON, n = JSON.stringify(e), t && (Array.prototype.toJSON = t), n
            }
            var l = "twttr_",
                c = ["hask", "li", "logged_in", "pid", "user_id", "guest_id", l + "hask", l + "li", l + "pid"],
                h = 0,
                p, d, v = [],
                m, g, y, b = "https://syndication.twitter.com/i/jot/syndication",
                w = "https://platform.twitter.com/jot.html";
            twttr.widgets && twttr.widgets.endpoints && twttr.widgets.endpoints.rufous && (b = twttr.widgets.endpoints.rufous), e({
                enqueue: k,
                flush: L,
                initPostLogging: E,
                scribeInteraction: x,
                extractTermsFromDOM: T,
                addPixel: S,
                addVar: N
            })
        })
    });
    provide("tfw/util/media", function(e) {
        using("dom/delegate", "dom/get", "util/util", "util/env", "util/twitter", function(t, n, r, i, s) {
            function f(e, t) {
                return e == 2 || e == 3 && +t === 0
            }

            function l(e) {
                var t = e.split(" ");
                this.url = decodeURIComponent(r.trim(t[0])), this.width = +r.trim(t[1].replace(/w$/, ""))
            }

            function c(e, t, n) {
                var i, s, o, u;
                e = window.devicePixelRatio ? e * window.devicePixelRatio : e, s = r.map(t.split(","), function(e) {
                    return new l(e)
                });
                if (n)
                    for (u = 0; u < s.length; u++) s[u].url === n && (i = s[u]);
                return o = r.reduce(s, function(t, n) {
                    return n.width < t.width && n.width >= e ? n : t
                }, s[0]), i && i.width > o.width ? i : o
            }

            function h(e, t) {
                var n = e.getAttribute("data-srcset"),
                    r = e.src,
                    i;
                n && (i = c(t, n, r), e.src = i.url)
            }

            function p(e, t) {
                t = t || i.retina();
                if (!t) return;
                r.forEach(e.getElementsByTagName("IMG"), function(e) {
                    var t = e.getAttribute("data-src-2x");
                    t && (e.src = t)
                })
            }

            function d(e, t, i, s) {
                var l = 0,
                    c = i ? 600 : 375,
                    p = n.one("multi-photo", e, "DIV"),
                    d = p && +p.getAttribute("data-photo-count");
                if (!e) return;
                return r.forEach(n.all("autosized-media", e), function(e) {
                    var n = v(e.getAttribute("data-width"), e.getAttribute("data-height"), t, c);
                    s(function() {
                        h(e, t), e.width = n.width, e.height = n.height, m(e, n)
                    }), l = n.height > l ? n.height : l
                }), r.forEach(n.all("cropped-media", e, "IMG"), function(e) {
                    var n = t - 12,
                        r = e.parentNode,
                        i = e.getAttribute("data-crop-x") || 0,
                        p = e.getAttribute("data-crop-y") || 0,
                        m, g, y = f(d, e.getAttribute("data-image-index")),
                        b = Math.floor(n / 2 - o),
                        w = Math.floor(b / (y ? u : a)),
                        E;
                    y || (w -= o / 2), E = v(e.getAttribute("data-width"), e.getAttribute("data-height"), b, c, b, w), m = E.width - b - i, g = E.height - w - p, m < 0 && Math.max(0, i += m), g < 0 && Math.max(0, p += g), s(function() {
                        h(e, b), e.width = E.width, e.height = E.height, r.style.width = b - 1 + "px", r.style.height = w + "px", i && (e.style.marginLeft = "-" + Math.floor(E.width * i / 100) + "px"), p && (e.style.marginTop = "-" + Math.floor(E.height * p / 100) + "px")
                    }), l = E.height * (y ? 2 : 1) > l ? E.height : l
                }), l
            }

            function v(e, t, n, r, i, s) {
                return n = n || e, r = r || t, i = i || 0, s = s || 0, e > n && (t *= n / e, e = n), t > r && (e *= r / t, t = r), e < i && (t *= i / e, e = i), t < s && (e *= s / t, t = s), {
                    width: Math.floor(e),
                    height: Math.floor(t)
                }
            }

            function m(e, n) {
                function l() {
                    var e = {
                        name: "tfw:resize",
                        dimensions: n
                    };
                    o.postMessage(e, "*")
                }
                var r, o, u, a, f;
                if (!e) return;
                o = e.contentWindow, r = e.ownerDocument && e.ownerDocument.defaultView, u = i.ios() || i.android(), a = s.isTwitterURL(e.src), f = o && i.canPostMessage(o), u && a && f && (l(), r && t.on(r, "message", function(e) {
                    e.data === "tfw:requestsize" && l()
                }))
            }
            var o = 6,
                u = 8 / 9,
                a = 16 / 9;
            e({
                scaleDimensions: v,
                retinize: p,
                constrainMedia: d,
                __setSrcFromSet: h
            })
        })
    });
    provide("tfw/util/data", function(e) {
        using("util/logger", "util/util", "util/querystring", function(t, n, r) {
            function c(e) {
                return function(n) {
                    n.error ? e.error && e.error(n) : n.headers && n.headers.status != 200 ? (e.error && e.error(n), t.warn(n.headers.message)) : e.success && e.success(n), e.complete && e.complete(n), h(e)
                }
            }

            function h(e) {
                var t = e.script;
                t && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), e.script = undefined, t = undefined), e.callbackName && twttr.tfw.callbacks[e.callbackName] && delete twttr.tfw.callbacks[e.callbackName]
            }

            function p(e) {
                var t = {};
                return e.success && n.isType("function", e.success) && (t.success = e.success), e.error && n.isType("function", e.error) && (t.error = e.error), e.complete && n.isType("function", e.complete) && (t.complete = e.complete), t
            }
            window.twttr = window.twttr || {}, twttr.tfw = twttr.tfw || {}, twttr.tfw.callbacks = twttr.tfw.callbacks || {};
            var i = "twttr.tfw.callbacks",
                s = twttr.tfw.callbacks,
                o = "cb",
                u = 0,
                a = !1,
                f = {},
                l = {
                    tweets: "https://syndication.twitter.com/tweets.json",
                    timeline: "https://cdn.syndication.twimg.com/widgets/timelines/",
                    timelinePoll: "https://syndication.twitter.com/widgets/timelines/paged/",
                    timelinePreview: "https://syndication.twitter.com/widgets/timelines/preview/"
                };
            twttr.widgets && twttr.widgets.endpoints && n.aug(l, twttr.widgets.endpoints), f.jsonp = function(e, t, n) {
                var f = n || o + u,
                    l = i + "." + f,
                    h = document.createElement("script"),
                    p = {
                        callback: l,
                        suppress_response_codes: !0
                    };
                s[f] = c(t);
                if (a || !/^https?\:$/.test(window.location.protocol)) e = e.replace(/^\/\//, "https://");
                h.src = r.url(e, p), h.async = "async", document.body.appendChild(h), t.script = h, t.callbackName = f, n || u++
            }, f.config = function(e) {
                if (e.forceSSL === !0 || e.forceSSL === !1) a = e.forceSSL
            }, f.tweets = function(e) {
                var t = arguments[0],
                    n = p(t),
                    i = {
                        ids: e.ids.join(","),
                        lang: e.lang
                    },
                    s = r.url(l.tweets, i);
                this.jsonp(s, n)
            }, f.timeline = function(e) {
                var t = arguments[0],
                    i = p(t),
                    s, o = 9e5,
                    u = Math.floor(+(new Date) / o),
                    a = {
                        lang: e.lang,
                        t: u,
                        domain: window.location.host,
                        dnt: e.dnt,
                        override_type: e.overrideType,
                        override_id: e.overrideId,
                        override_name: e.overrideName,
                        override_owner_id: e.overrideOwnerId,
                        override_owner_name: e.overrideOwnerName,
                        with_replies: e.withReplies
                    };
                n.compact(a), s = r.url(l.timeline + e.id, a), this.jsonp(s, i, "tl_" + e.id + "_" + e.instanceId)
            }, f.timelinePoll = function(e) {
                var t = arguments[0],
                    i = p(t),
                    s = {
                        lang: e.lang,
                        since_id: e.sinceId,
                        max_id: e.maxId,
                        min_position: e.minPosition,
                        max_position: e.maxPosition,
                        domain: window.location.host,
                        dnt: e.dnt,
                        override_type: e.overrideType,
                        override_id: e.overrideId,
                        override_name: e.overrideName,
                        override_owner_id: e.overrideOwnerId,
                        override_owner_name: e.overrideOwnerName,
                        with_replies: e.withReplies
                    },
                    o;
                n.compact(s), o = r.url(l.timelinePoll + e.id, s), this.jsonp(o, i, "tlPoll_" + e.id + "_" + e.instanceId + "_" + (e.sinceId || e.maxId || e.maxPosition || e.minPosition))
            }, f.timelinePreview = function(e) {
                var t = arguments[0],
                    n = p(t),
                    i = e.params,
                    s = r.url(l.timelinePreview, i);
                this.jsonp(s, n)
            }, e(f)
        })
    });
    provide("anim/transition", function(e) {
        function t(e, t) {
            var n;
            return t = t || window, n = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || t.oRequestAnimationFrame || function() {
                t.setTimeout(function() {
                    e(+(new Date))
                }, 1e3 / 60)
            }, n(e)
        }

        function n(e, t) {
            return Math.sin(Math.PI / 2 * t) * e
        }

        function r(e, n, r, i, s) {
            function u() {
                var a = +(new Date),
                    f = a - o,
                    l = Math.min(f / r, 1),
                    c = i ? i(n, l) : n * l;
                e(c);
                if (l == 1) return;
                t(u, s)
            }
            var o = +(new Date);
            t(u)
        }
        e({
            animate: r,
            requestAnimationFrame: t,
            easeOut: n
        })
    });
    provide("util/datetime", function(e) {
        using("util/util", function(t) {
            function h(e) {
                return e < 10 ? "0" + e : e
            }

            function p(e) {
                function i(e, n) {
                    return t && t[e] && (e = t[e]), e.replace(/%\{([\w_]+)\}/g, function(e, t) {
                        return n[t] !== undefined ? n[t] : e
                    })
                }
                var t = e && e.phrases,
                    n = e && e.months || s,
                    r = e && e.formats || o;
                this.timeAgo = function(e) {
                    var t = p.parseDate(e),
                        s = +(new Date),
                        o = s - t,
                        h;
                    return t ? isNaN(o) || o < u * 2 ? i("now") : o < a ? (h = Math.floor(o / u), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("s"),
                            expanded: h > 1 ? i("seconds") : i("second")
                        })
                    })) : o < f ? (h = Math.floor(o / a), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("m"),
                            expanded: h > 1 ? i("minutes") : i("minute")
                        })
                    })) : o < l ? (h = Math.floor(o / f), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("h"),
                            expanded: h > 1 ? i("hours") : i("hour")
                        })
                    })) : o < l * 365 ? i(r.shortdate, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()])
                    }) : i(r.longdate, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()]),
                        year: t.getFullYear().toString().slice(2)
                    }) : ""
                }, this.localTimeStamp = function(e) {
                    var t = p.parseDate(e),
                        s = t && t.getHours();
                    return t ? i(r.full, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()]),
                        year: t.getFullYear(),
                        hours24: h(s),
                        hours12: s < 13 ? s ? s : "12" : s - 12,
                        minutes: h(t.getMinutes()),
                        seconds: h(t.getSeconds()),
                        amPm: s < 12 ? i("AM") : i("PM")
                    }) : ""
                }
            }
            var n = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,
                r = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,
                i = /^\d+$/,
                s = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                o = {
                    abbr: "%{number}%{symbol}",
                    shortdate: "%{day} %{month}",
                    longdate: "%{day} %{month} %{year}",
                    full: "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
                },
                u = 1e3,
                a = u * 60,
                f = a * 60,
                l = f * 24,
                c = '<abbr title="%{expanded}">%{abbr}</abbr>';
            p.parseDate = function(e) {
                var o = e || "",
                    u = o.toString(),
                    a, f;
                return a = function() {
                    var e;
                    if (i.test(u)) return parseInt(u, 10);
                    if (e = u.match(r)) return Date.UTC(e[7], t.indexOf(s, e[1]), e[2], e[3], e[4], e[5]);
                    if (e = u.match(n)) return Date.UTC(e[1], e[2] - 1, e[3], e[4], e[5], e[6])
                }(), a ? (f = new Date(a), !isNaN(f.getTime()) && f) : !1
            }, e(p)
        })
    });
    provide("sandbox/frame", function(e) {
        using("sandbox/baseframe", "sandbox/minimal", "util/env", "util/promise", "util/util", function(t, n, r, i, s) {
            function h() {
                var e, t;
                a = {};
                if (f) return;
                e = document.body.offsetHeight, t = document.body.offsetWidth;
                if (e == c && t == l) return;
                s.forEach(u, function(e) {
                    e.dispatchFrameResize(l, c)
                }), c = e, l = t
            }

            function p(e) {
                var t;
                return e.id ? e.id : (t = e.getAttribute("data-twttr-id")) ? t : (t = "twttr-sandbox-" + o++, e.setAttribute("data-twttr-id", t), t)
            }

            function d(e, t) {
                n.apply(this, [e, t]), this._resizeHandlers = [], u.push(this), this._win.addEventListener ? this._win.addEventListener("resize", s.bind(function() {
                    this.dispatchFrameResize()
                }, this), !0) : this._win.attachEvent("onresize", s.bind(function() {
                    this.dispatchFrameResize(this._win.event)
                }, this))
            }
            var o = 0,
                u = [],
                a = {},
                f, l = 0,
                c = 0;
            window.addEventListener ? window.addEventListener("resize", h, !0) : document.body.attachEvent("onresize", function() {
                h(window.event)
            }), d.prototype = new n, s.aug(d.prototype, {
                dispatchFrameResize: function() {
                    var e = this._frame.parentNode,
                        t = p(e),
                        n = a[t];
                    f = !0;
                    if (!this._resizeHandlers.length) return;
                    n || (n = a[t] = {
                        w: this._frame.offsetWidth,
                        h: this._frame.offsetHeight
                    });
                    if (this._frameWidth == n.w && this._frameHeight == n.h) return;
                    this._frameWidth = n.w, this._frameHeight = n.h, s.forEach(this._resizeHandlers, function(e) {
                        e(n.w, n.h)
                    }), window.setTimeout(function() {
                        a = {}
                    }, 50)
                },
                appendStyleSheet: function(e) {
                    var t = this._doc.createElement("link");
                    return t.type = "text/css", t.rel = "stylesheet", t.href = e, this.layout(s.bind(function() {
                        return this._head.appendChild(t)
                    }, this))
                },
                appendCss: function(e) {
                    var t;
                    return r.cspEnabled() ? i.reject("CSP enabled; cannot embed inline styles.") : (t = this._doc.createElement("style"), t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(this._doc.createTextNode(e)), this.layout(s.bind(function() {
                        return this._head.appendChild(t)
                    }, this)))
                },
                style: function(e) {
                    return this.layout(s.bind(function() {
                        s.forIn(e, s.bind(function(e, t) {
                            this._frame.style[e] = t
                        }, this))
                    }, this))
                },
                onresize: function(e) {
                    this._resizeHandlers.push(e)
                },
                width: function(e) {
                    return e !== undefined && (this._frame.style.width = e + "px"), r.ios() ? Math.min(this._frame.parentNode.offsetWidth, this._frame.offsetWidth) : this._frame.offsetWidth
                },
                height: function(e) {
                    return e !== undefined && (this._frame.height = e), this._frame.offsetHeight
                }
            }), d.createSandbox = function(e, n, r, i) {
                var s = new t(e, n, r, i);
                return s.ready().then(function(e) {
                    return new d(e.frame, e.layout)
                })
            }, e(d)
        })
    });
    provide("dom/size", function(e) {
        function t(e) {
            return !e || e.nodeType !== 1 ? 0 : e.offsetWidth || t(e.parentNode)
        }
        e({
            effectiveWidth: t
        })
    });
    provide("tfw/util/assets", function(e) {
        using("util/env", function(t) {
            function r(e, r) {
                var i = n[e],
                    s;
                return t.retina() ? s = "2x" : t.ie6() || t.ie7() ? s = "gif" : s = "default", r && (s += ".rtl"), i[s]
            }
            var n = {
                "embed/timeline.css": {
                    "default": "embed/timeline.05c8958bdec762021aa856f423864890.default.css",
                    "2x": "embed/timeline.05c8958bdec762021aa856f423864890.2x.css",
                    gif: "embed/timeline.05c8958bdec762021aa856f423864890.gif.css",
                    "default.rtl": "embed/timeline.05c8958bdec762021aa856f423864890.default.rtl.css",
                    "2x.rtl": "embed/timeline.05c8958bdec762021aa856f423864890.2x.rtl.css",
                    "gif.rtl": "embed/timeline.05c8958bdec762021aa856f423864890.gif.rtl.css"
                }
            };
            e(r)
        })
    });
    provide("util/layout", function(e) {
        using("util/promise", function(t) {
            function i() {}
            var n = [],
                r;
            i.prototype.enqueue = function(e, r) {
                return new t(function(t) {
                    n.push({
                        action: e,
                        resolver: t,
                        note: r
                    })
                })
            }, i.prototype.exec = function() {
                var e = n,
                    t;
                if (!e.length) return;
                n = [];
                while (e.length) t = e.shift(), t && t.action ? t.resolver.fulfill(t.action()) : t.resolver.reject()
            }, i.prototype.delayedExec = function() {
                r && window.clearTimeout(r), r = window.setTimeout(this.exec, 100)
            }, e(i)
        })
    });
    provide("tfw/widget/base", function(e) {
        using("dom/get", "util/domready", "util/iframe", "util/layout", "util/promise", "util/querystring", "util/typevalidator", "util/util", "tfw/util/globals", "util/logger", function(t, n, r, i, s, o, u, a, f, l) {
            function y(e) {
                var t;
                if (!e) return;
                e.ownerDocument ? (this.srcEl = e, this.classAttr = e.className.split(" ")) : (this.srcOb = e, this.classAttr = []), t = this.params(), this.id = this.generateId(), this.setLanguage(), this.related = t.related || this.dataAttr("related"), this.partner = t.partner || this.dataAttr("partner") || f.val("partner"), this.dnt = t.dnt || this.dataAttr("dnt") || f.dnt() || "", this.styleAttr = [], this.targetEl = e.targetEl, this.completePromise = new s(a.bind(function(e) {
                    this.completeResolver = e
                }, this)), this.completed().then(function(e) {
                    if (!e || e == document.body) return;
                    twttr.events.trigger("rendered", {
                        target: e
                    })
                })
            }

            function b() {
                a.forEach(d, function(e) {
                    e()
                }), y.doLayout()
            }

            function w(e) {
                if (!e) return;
                return e.lang ? e.lang : w(e.parentNode)
            }
            var c = 0,
                h, p = {
                    list: [],
                    byId: {}
                },
                d = [],
                v = new i,
                m = "data-twttr-rendered",
                g = {
                    ar: {
                        "%{followers_count} followers": "عدد المتابعين %{followers_count}",
                        "100K+": "+100 ألف",
                        "10k unit": "10 آلاف وحدة",
                        Follow: "تابِع",
                        "Follow %{screen_name}": "تابِع %{screen_name}",
                        K: "ألف",
                        M: "م",
                        Tweet: "غرِّد",
                        "Tweet %{hashtag}": "غرِّد %{hashtag}",
                        "Tweet to %{name}": "غرِّد لـ %{name}"
                    },
                    bn: {
                        "Follow %{screen_name}": "%{screen_name}-কে অনুসরণ করুন"
                    },
                    cs: {
                        "Follow %{screen_name}": "Sledovat uživatele %{screen_name}"
                    },
                    da: {
                        "%{followers_count} followers": "%{followers_count} følgere",
                        "10k unit": "10k enhed",
                        Follow: "Følg",
                        "Follow %{screen_name}": "Følg %{screen_name}",
                        "Tweet to %{name}": "Tweet til %{name}"
                    },
                    de: {
                        "%{followers_count} followers": "%{followers_count} Follower",
                        "100K+": "100Tsd+",
                        "10k unit": "10tsd-Einheit",
                        Follow: "Folgen",
                        "Follow %{screen_name}": "%{screen_name} folgen",
                        K: "Tsd",
                        Tweet: "Twittern",
                        "Tweet to %{name}": "Tweet an %{name}"
                    },
                    es: {
                        "%{followers_count} followers": "%{followers_count} seguidores",
                        "10k unit": "unidad de 10 mil",
                        Follow: "Seguir",
                        "Follow %{screen_name}": "Seguir a %{screen_name}",
                        Tweet: "Twittear",
                        "Tweet %{hashtag}": "Twittear %{hashtag}",
                        "Tweet to %{name}": "Twittear a %{name}"
                    },
                    fa: {
                        "%{followers_count} followers": "%{followers_count} دنبال‌کننده",
                        "100K+": ">۱۰۰هزار",
                        "10k unit": "۱۰هزار واحد",
                        Follow: "دنبال کردن",
                        "Follow %{screen_name}": "دنبال کردن %{screen_name}",
                        K: "هزار",
                        M: "میلیون",
                        Tweet: "توییت",
                        "Tweet %{hashtag}": "توییت کردن %{hashtag}",
                        "Tweet to %{name}": "به %{name} توییت کنید"
                    },
                    fi: {
                        "%{followers_count} followers": "%{followers_count} seuraajaa",
                        "100K+": "100 000+",
                        "10k unit": "10 000 yksikköä",
                        Follow: "Seuraa",
                        "Follow %{screen_name}": "Seuraa käyttäjää %{screen_name}",
                        K: "tuhatta",
                        M: "milj.",
                        Tweet: "Twiittaa",
                        "Tweet %{hashtag}": "Twiittaa %{hashtag}",
                        "Tweet to %{name}": "Twiittaa käyttäjälle %{name}"
                    },
                    fil: {
                        "%{followers_count} followers": "%{followers_count} mga tagasunod",
                        "10k unit": "10k yunit",
                        Follow: "Sundan",
                        "Follow %{screen_name}": "Sundan si %{screen_name}",
                        Tweet: "I-tweet",
                        "Tweet %{hashtag}": "I-tweet ang %{hashtag}",
                        "Tweet to %{name}": "Mag-Tweet kay %{name}"
                    },
                    fr: {
                        "%{followers_count} followers": "%{followers_count} abonnés",
                        "10k unit": "unité de 10k",
                        Follow: "Suivre",
                        "Follow %{screen_name}": "Suivre %{screen_name}",
                        Tweet: "Tweeter",
                        "Tweet %{hashtag}": "Tweeter %{hashtag}",
                        "Tweet to %{name}": "Tweeter à %{name}"
                    },
                    he: {
                        "%{followers_count} followers": "%{followers_count} עוקבים",
                        "100K+": "מאות אלפים",
                        "10k unit": "עשרות אלפים",
                        Follow: "מעקב",
                        "Follow %{screen_name}": "לעקוב אחר %{screen_name}",
                        K: "אלף",
                        M: "מיליון",
                        Tweet: "ציוץ",
                        "Tweet %{hashtag}": "צייצו %{hashtag}",
                        "Tweet to %{name}": "ציוץ אל %{name}"
                    },
                    hi: {
                        "%{followers_count} followers": "%{followers_count} फ़ॉलोअर्स",
                        "100K+": "1 लाख से अधिक",
                        "10k unit": "10 हजार इकाईयां",
                        Follow: "फ़ॉलो",
                        "Follow %{screen_name}": "%{screen_name} को फ़ॉलो करें",
                        K: "हजार",
                        M: "मिलियन",
                        Tweet: "ट्वीट",
                        "Tweet %{hashtag}": "ट्वीट %{hashtag}",
                        "Tweet to %{name}": "%{name} के प्रति ट्वीट करें"
                    },
                    hu: {
                        "%{followers_count} followers": "%{followers_count} követő",
                        "100K+": "100E+",
                        "10k unit": "10E+",
                        Follow: "Követés",
                        "Follow %{screen_name}": "%{screen_name} követése",
                        K: "E",
                        "Tweet %{hashtag}": "%{hashtag} tweetelése",
                        "Tweet to %{name}": "Tweet küldése neki: %{name}"
                    },
                    id: {
                        "%{followers_count} followers": "%{followers_count} pengikut",
                        "100K+": "100 ribu+",
                        "10k unit": "10 ribu unit",
                        Follow: "Ikuti",
                        "Follow %{screen_name}": "Ikuti %{screen_name}",
                        K: "&nbsp;ribu",
                        M: "&nbsp;juta",
                        "Tweet to %{name}": "Tweet ke %{name}"
                    },
                    it: {
                        "%{followers_count} followers": "%{followers_count} follower",
                        "10k unit": "10k unità",
                        Follow: "Segui",
                        "Follow %{screen_name}": "Segui %{screen_name}",
                        "Tweet %{hashtag}": "Twitta %{hashtag}",
                        "Tweet to %{name}": "Twitta a %{name}"
                    },
                    ja: {
                        "%{followers_count} followers": "%{followers_count}人のフォロワー",
                        "100K+": "100K以上",
                        "10k unit": "万",
                        Follow: "フォローする",
                        "Follow %{screen_name}": "%{screen_name}さんをフォロー",
                        Tweet: "ツイート",
                        "Tweet %{hashtag}": "%{hashtag} をツイートする",
                        "Tweet to %{name}": "%{name}さんへツイートする"
                    },
                    ko: {
                        "%{followers_count} followers": "%{followers_count}명의 팔로워",
                        "100K+": "100만 이상",
                        "10k unit": "만 단위",
                        Follow: "팔로우",
                        "Follow %{screen_name}": "%{screen_name} 님 팔로우하기",
                        K: "천",
                        M: "백만",
                        Tweet: "트윗",
                        "Tweet %{hashtag}": "%{hashtag} 관련 트윗하기",
                        "Tweet to %{name}": "%{name} 님에게 트윗하기"
                    },
                    msa: {
                        "%{followers_count} followers": "%{followers_count} pengikut",
                        "100K+": "100 ribu+",
                        "10k unit": "10 ribu unit",
                        Follow: "Ikut",
                        "Follow %{screen_name}": "Ikut %{screen_name}",
                        K: "ribu",
                        M: "juta",
                        "Tweet to %{name}": "Tweet kepada %{name}"
                    },
                    nl: {
                        "%{followers_count} followers": "%{followers_count} volgers",
                        "100K+": "100k+",
                        "10k unit": "10k-eenheid",
                        Follow: "Volgen",
                        "Follow %{screen_name}": "%{screen_name} volgen",
                        K: "k",
                        M: " mln.",
                        Tweet: "Tweeten",
                        "Tweet %{hashtag}": "%{hashtag} tweeten",
                        "Tweet to %{name}": "Tweeten naar %{name}"
                    },
                    no: {
                        "%{followers_count} followers": "%{followers_count} følgere",
                        "100K+": "100 K+",
                        "10k unit": "10-K-enhet",
                        Follow: "Følg",
                        "Follow %{screen_name}": "Følg %{screen_name}",
                        "Tweet to %{name}": "Send en tweet til %{name}"
                    },
                    pl: {
                        "%{followers_count} followers": "%{followers_count} obserwujących",
                        "100K+": "100 tys.+",
                        "10k unit": "10 tys.",
                        Follow: "Obserwuj",
                        "Follow %{screen_name}": "Obserwuj %{screen_name}",
                        K: "tys.",
                        M: "mln",
                        Tweet: "Tweetnij",
                        "Tweet %{hashtag}": "Tweetnij %{hashtag}",
                        "Tweet to %{name}": "Tweetnij do %{name}"
                    },
                    pt: {
                        "%{followers_count} followers": "%{followers_count} seguidores",
                        "100K+": "+100 mil",
                        "10k unit": "10 mil unidades",
                        Follow: "Seguir",
                        "Follow %{screen_name}": "Seguir %{screen_name}",
                        K: "Mil",
                        Tweet: "Tweetar",
                        "Tweet %{hashtag}": "Tweetar %{hashtag}",
                        "Tweet to %{name}": "Tweetar para %{name}"
                    },
                    ro: {
                        "Follow %{screen_name}": "Urmăreşte pe %{screen_name}"
                    },
                    ru: {
                        "%{followers_count} followers": "Читатели: %{followers_count} ",
                        "100K+": "100 тыс.+",
                        "10k unit": "блок 10k",
                        Follow: "Читать",
                        "Follow %{screen_name}": "Читать %{screen_name}",
                        K: "тыс.",
                        M: "млн.",
                        Tweet: "Твитнуть",
                        "Tweet %{hashtag}": "Твитнуть %{hashtag}",
                        "Tweet to %{name}": "Твитнуть %{name}"
                    },
                    sv: {
                        "%{followers_count} followers": "%{followers_count} följare",
                        "10k unit": "10k",
                        Follow: "Följ",
                        "Follow %{screen_name}": "Följ %{screen_name}",
                        Tweet: "Tweeta",
                        "Tweet %{hashtag}": "Tweeta %{hashtag}",
                        "Tweet to %{name}": "Tweeta till %{name}"
                    },
                    th: {
                        "%{followers_count} followers": "%{followers_count} ผู้ติดตาม",
                        "100K+": "100พัน+",
                        "10k unit": "หน่วย 10พัน",
                        Follow: "ติดตาม",
                        "Follow %{screen_name}": "ติดตาม %{screen_name}",
                        M: "ล้าน",
                        Tweet: "ทวีต",
                        "Tweet %{hashtag}": "ทวีต %{hashtag}",
                        "Tweet to %{name}": "ทวีตถึง %{name}"
                    },
                    tr: {
                        "%{followers_count} followers": "%{followers_count} takipçi",
                        "100K+": "+100 bin",
                        "10k unit": "10 bin birim",
                        Follow: "Takip et",
                        "Follow %{screen_name}": "Takip et: %{screen_name}",
                        K: "bin",
                        M: "milyon",
                        Tweet: "Tweetle",
                        "Tweet %{hashtag}": "Tweetle: %{hashtag}",
                        "Tweet to %{name}": "Tweetle: %{name}"
                    },
                    uk: {
                        "Follow %{screen_name}": "Читати %{screen_name}"
                    },
                    ur: {
                        "%{followers_count} followers": "%{followers_count} فالورز",
                        "100K+": "ایک لاکھ سے زیادہ",
                        "10k unit": "دس ہزار یونٹ",
                        Follow: "فالو کریں",
                        "Follow %{screen_name}": "%{screen_name} کو فالو کریں",
                        K: "ہزار",
                        M: "ملین",
                        Tweet: "ٹویٹ کریں",
                        "Tweet %{hashtag}": "%{hashtag} ٹویٹ کریں",
                        "Tweet to %{name}": "%{name} کو ٹویٹ کریں"
                    },
                    vi: {
                        "Follow %{screen_name}": "Theo dõi %{screen_name}"
                    },
                    "zh-cn": {
                        "%{followers_count} followers": "%{followers_count} 关注者",
                        "100K+": "10万+",
                        "10k unit": "1万单元",
                        Follow: "关注",
                        "Follow %{screen_name}": "关注 %{screen_name}",
                        K: "千",
                        M: "百万",
                        Tweet: "发推",
                        "Tweet %{hashtag}": "以 %{hashtag} 发推",
                        "Tweet to %{name}": "发推给 %{name}"
                    },
                    "zh-tw": {
                        "%{followers_count} followers": "%{followers_count} 位跟隨者",
                        "100K+": "超過十萬",
                        "10k unit": "1萬 單位",
                        Follow: "跟隨",
                        "Follow %{screen_name}": "跟隨 %{screen_name}",
                        K: "千",
                        M: "百萬",
                        Tweet: "推文",
                        "Tweet %{hashtag}": "推文%{hashtag}",
                        "Tweet to %{name}": "推文給%{name}"
                    }
                };
            a.aug(y.prototype, {
                setLanguage: function(e) {
                    var t;
                    e || (e = this.params().lang || this.dataAttr("lang") || w(this.srcEl)), e = e && e.toLowerCase();
                    if (!e) return this.lang = "en";
                    if (g[e]) return this.lang = e;
                    t = e.replace(/[\-_].*/, "");
                    if (g[t]) return this.lang = t;
                    this.lang = "en"
                },
                _: function(e, t) {
                    var n = this.lang;
                    t = t || {};
                    if (!n || !g.hasOwnProperty(n)) n = this.lang = "en";
                    return e = g[n] && g[n][e] || e, this.ringo(e, t, /%\{([\w_]+)\}/g)
                },
                ringo: function(e, t, n) {
                    return n = n || /\{\{([\w_]+)\}\}/g, e.replace(n, function(e, n) {
                        return t[n] !== undefined ? t[n] : e
                    })
                },
                add: function(e) {
                    p.list.push(this), p.byId[this.id] = e
                },
                create: function(e, t, n) {
                    var i = this,
                        o;
                    return n[m] = !0, o = r(a.aug({
                        id: this.id,
                        src: e,
                        "class": this.classAttr.join(" ")
                    }, n), t, this.targetEl && this.targetEl.ownerDocument), this.srcEl ? this.layout(function() {
                        return i.srcEl.parentNode.replaceChild(o, i.srcEl), i.completeResolver.fulfill(o), o
                    }) : this.targetEl ? this.layout(function() {
                        return i.targetEl.appendChild(o), i.completeResolver.fulfill(o), o
                    }) : s.reject("Did not append widget")
                },
                params: function() {
                    var e, t;
                    return this.srcOb ? t = this.srcOb : (e = this.srcEl && this.srcEl.href && this.srcEl.href.split("?")[1], t = e ? o.decode(e) : {}), this.params = function() {
                        return t
                    }, t
                },
                dataAttr: function(e) {
                    return this.srcEl && this.srcEl.getAttribute("data-" + e)
                },
                attr: function(e) {
                    return this.srcEl && this.srcEl.getAttribute(e)
                },
                layout: function(e) {
                    return v.enqueue(e)
                },
                styles: {
                    base: [
                        ["font", "normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"],
                        ["margin", "0"],
                        ["padding", "0"],
                        ["whiteSpace", "nowrap"]
                    ],
                    button: [
                        ["fontWeight", "bold"],
                        ["textShadow", "0 1px 0 rgba(255,255,255,.5)"]
                    ],
                    large: [
                        ["fontSize", "13px"],
                        ["lineHeight", "26px"]
                    ],
                    vbubble: [
                        ["fontSize", "16px"]
                    ]
                },
                width: function() {
                    throw new Error(name + " not implemented")
                },
                height: function() {
                    return this.size == "m" ? 20 : 28
                },
                minWidth: function() {},
                maxWidth: function() {},
                minHeight: function() {},
                maxHeight: function() {},
                dimensions: function() {
                    function e(e) {
                        switch (typeof e) {
                            case "string":
                                return e;
                            case "undefined":
                                return;
                            default:
                                return e + "px"
                        }
                    }
                    var t = {
                        width: this.width(),
                        height: this.height()
                    };
                    return this.minWidth() && (t["min-width"] = this.minWidth()), this.maxWidth() && (t["max-width"] = this.maxWidth()), this.minHeight() && (t["min-height"] = this.minHeight()), this.maxHeight() && (t["max-height"] = this.maxHeight()), a.forIn(t, function(n, r) {
                        t[n] = e(r)
                    }), t
                },
                generateId: function() {
                    return this.srcEl && this.srcEl.id || "twitter-widget-" + c++
                },
                completed: function() {
                    return this.completePromise
                }
            }), y.afterLoad = function(e) {
                d.push(e)
            }, y.doLayout = function() {
                v.exec()
            }, y.doLayoutAsync = function() {
                v.delayedExec()
            }, y.init = function(e) {
                h = e
            }, y.find = function(e) {
                return e && p.byId[e] ? p.byId[e].element : null
            }, y.embed = function(e) {
                var n = h.widgets,
                    r = [],
                    i = [],
                    o = [];
                u.isArray(e) || (e = [e || document]), l.time("sandboxes"), a.forEach(e, function(e) {
                    a.forIn(n, function(n, i) {
                        var s, u;
                        n.match(/\./) ? (s = n.split("."), u = t.all(s[1], e, s[0])) : u = e.getElementsByTagName(n), a.forEach(u, function(e) {
                            var t;
                            if (e.getAttribute(m)) return;
                            e.setAttribute(m, "true"), t = new i(e), r.push(t), o.push(t.sandboxCreated)
                        })
                    })
                }), s.every.apply(null, o).then(function() {
                    l.timeEnd("sandboxes")
                }), y.doLayout(), a.forEach(r, function(e) {
                    p.byId[e.id] = e, p.list.push(e), i.push(e.completed()), e.render(h)
                }), s.every.apply(null, i).then(function(e) {
                    e = a.filter(e, function(t) {
                        return t
                    });
                    if (!e.length) return;
                    twttr.events.trigger("loaded", {
                        widgets: e
                    }), l.timeEnd("load")
                }), y.doLayoutAsync(), b()
            }, window.setInterval(function() {
                y.doLayout()
            }, 500), e(y)
        })
    });
    provide("tfw/widget/intent", function(e) {
        using("tfw/widget/base", "util/util", "util/querystring", "util/uri", "util/promise", function(t, n, r, i, s) {
            function p(e) {
                var t = Math.round(c / 2 - a / 2),
                    n = 0;
                l > f && (n = Math.round(l / 2 - f / 2)), window.open(e, undefined, [u, "width=" + a, "height=" + f, "left=" + t, "top=" + n].join(","))
            }

            function d(e, t) {
                using("tfw/hub/client", function(n) {
                    n.openIntent(e, t)
                })
            }

            function v(e) {
                var t = ~location.host.indexOf("poptip.com") ? "https://poptip.com" : location.href,
                    n = "original_referer=" + t;
                return [e, n].join(e.indexOf("?") == -1 ? "?" : "&")
            }

            function m(e) {
                var t, r, i;
                e = e || window.event, t = e.target || e.srcElement;
                if (e.altKey || e.metaKey || e.shiftKey) return;
                while (t) {
                    if (~n.indexOf(["A", "AREA"], t.nodeName)) break;
                    t = t.parentNode
                }
                t && t.href && (r = t.href.match(o), r && (i = v(t.href), i = i.replace(/^http[:]/, "https:"), i = i.replace(/^\/\//, "https://"), g(i, t), e.returnValue = !1, e.preventDefault && e.preventDefault()))
            }

            function g(e, t) {
                if (twttr.events.hub && t) {
                    var n = new y(h.generateId(), t);
                    h.add(n), d(e, t), twttr.events.trigger("click", {
                        target: t,
                        region: "intent",
                        type: "click",
                        data: {}
                    })
                } else p(e)
            }

            function y(e, t) {
                this.id = e, this.element = this.srcEl = t
            }

            function b(e) {
                this.srcEl = [], this.element = e
            }
            var o = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
                u = "scrollbars=yes,resizable=yes,toolbar=no,location=yes",
                a = 550,
                f = 590,
                l = screen.height,
                c = screen.width,
                h;
            b.prototype = new t, n.aug(b.prototype, {
                render: function() {
                    return h = this, window.__twitterIntentHandler || (document.addEventListener ? document.addEventListener("click", m, !1) : document.attachEvent && document.attachEvent("onclick", m), window.__twitterIntentHandler = !0), s.fulfill(document.body)
                }
            }), b.open = g, e(b)
        })
    });
    provide("tfw/widget/syndicatedbase", function(e) {
        using("tfw/widget/base", "tfw/widget/intent", "tfw/util/assets", "tfw/util/globals", "tfw/util/media", "tfw/util/tracking", "dom/classname", "dom/get", "dom/delegate", "dom/size", "sandbox/frame", "util/env", "util/promise", "util/twitter", "util/typevalidator", "util/util", function(t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m) {
            function N() {
                E = C.VALID_COLOR.test(i.val("widgets:link-color")) && RegExp.$1, x = C.VALID_COLOR.test(i.val("widgets:border-color")) && RegExp.$1, S = i.val("widgets:theme")
            }

            function C(e) {
                if (!e) return;
                var n;
                this.readyPromise = new p(m.bind(function(e) {
                    this.readyResolver = e
                }, this)), this.renderedPromise = new p(m.bind(function(e) {
                    this.renderResolver = e
                }, this)), t.apply(this, [e]), n = this.params(), this.targetEl = this.srcEl && this.srcEl.parentNode || n.targetEl || document.body, this.predefinedWidth = C.VALID_UNIT.test(n.width || this.attr("width")) && RegExp.$1, this.layout(m.bind(function() {
                    return this.containerWidth = l.effectiveWidth(this.targetEl)
                }, this)).then(m.bind(function(e) {
                    var t = this.predefinedWidth || e || this.dimensions.DEFAULT_WIDTH;
                    this.height = C.VALID_UNIT.test(n.height || this.attr("height")) && RegExp.$1, this.width = Math.max(this.dimensions.MIN_WIDTH, Math.min(t, this.dimensions.DEFAULT_WIDTH))
                }, this)), C.VALID_COLOR.test(n.linkColor || this.dataAttr("link-color")) ? this.linkColor = RegExp.$1 : this.linkColor = E, C.VALID_COLOR.test(n.borderColor || this.dataAttr("border-color")) ? this.borderColor = RegExp.$1 : this.borderColor = x, this.theme = n.theme || this.attr("data-theme") || S, this.theme = /(dark|light)/.test(this.theme) ? this.theme : "", this.classAttr.push(h.touch() ? "is-touch" : "not-touch"), h.ie9() && this.classAttr.push("ie9"), this.sandboxCreated = c.createSandbox({
                    "class": this.renderedClassNames,
                    id: this.id
                }, {
                    width: "1px",
                    height: "0px",
                    border: "none",
                    position: "absolute",
                    visibility: "hidden"
                }, m.bind(function(e) {
                    this.srcEl ? this.targetEl.insertBefore(e, this.srcEl) : this.targetEl.appendChild(e)
                }, this), this.layout).then(m.bind(function(e) {
                    this.setupSandbox(e)
                }, this))
            }

            function k(e, t) {
                return e + t
            }
            var g = [".customisable", ".customisable:link", ".customisable:visited", ".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"],
                y = ["a:hover .ic-mask", "a:focus .ic-mask"],
                b = [".customisable-border"],
                w = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"],
                E, S, x, T = {
                    TWEET: 0,
                    RETWEET: 10
                };
            C.prototype = new t, m.aug(C.prototype, {
                setupSandbox: function(e) {
                    this.sandbox = e, p.some(e.appendCss("body{display:none}"), e.setBaseTarget("_blank"), e.appendStyleSheet(twttr.widgets.config.assetUrl() + "/" + r("embed/timeline.css"))).then(m.bind(function() {
                        this.readyResolver.fulfill(e)
                    }, this))
                },
                ready: function() {
                    return this.readyPromise
                },
                rendered: function() {
                    return this.renderedPromise
                },
                contentWidth: function(e) {
                    var t = this.dimensions,
                        n = this.fullBleedPhoto ? 0 : this.chromeless && this.narrow ? t.NARROW_MEDIA_PADDING_CL : this.chromeless ? t.WIDE_MEDIA_PADDING_CL : this.narrow ? t.NARROW_MEDIA_PADDING : t.WIDE_MEDIA_PADDING;
                    return (e || this.width) - n
                },
                addSiteStyles: function() {
                    var e = m.bind(function(e) {
                            return (this.theme == "dark" ? ".thm-dark " : "") + e
                        }, this),
                        t = [];
                    this.headingStyle && t.push(m.map(w, e).join(",") + "{" + this.headingStyle + "}"), this.linkColor && (t.push(m.map(g, e).join(",") + "{color:" + this.linkColor + "}"), t.push(m.map(y, e).join(",") + "{background-color:" + this.linkColor + "}")), this.borderColor && t.push(m.map(b, e).concat(this.theme == "dark" ? [".thm-dark.customisable-border"] : []).join(",") + "{border-color:" + this.borderColor + "}");
                    if (!t.length) return;
                    return this.sandbox.appendCss(t.join(""))
                },
                setNarrow: function() {
                    var e = this.narrow;
                    return this.narrow = this.width < this.dimensions.NARROW_WIDTH, e != this.narrow ? this.layout(m.bind(function() {
                        return u.toggle(this.element, "var-narrow", this.narrow)
                    }, this)) : p.fulfill(this.narrow)
                },
                bindIntentHandlers: function() {
                    function r(n) {
                        var r = a.ancestor(".tweet", this, t),
                            i = m.aug({}, e.baseScribeData(), {
                                item_ids: [],
                                item_details: e.extractTweetScribeDetails(r)
                            });
                        m.forIn(i.item_details, function(e) {
                            i.item_ids.push(e)
                        }), o.scribeInteraction(n, i, !0, e.dnt)
                    }
                    var e = this,
                        t = this.element;
                    f.delegate(t, "click", "A", r), f.delegate(t, "click", "BUTTON", r), f.delegate(t, "click", ".profile", function() {
                        e.addUrlParams(this)
                    }), f.delegate(t, "click", ".follow-button", function(t) {
                        var r;
                        if (t.altKey || t.metaKey || t.shiftKey) return;
                        if (h.ios() || h.android()) return;
                        if (v.asBoolean(this.getAttribute("data-age-gate"))) return;
                        r = d.intentForFollowURL(this.href, !0), r && (n.open(r, e.sandbox.element()), f.preventDefault(t))
                    }), f.delegate(t, "click", ".web-intent", function(t) {
                        e.addUrlParams(this);
                        if (t.altKey || t.metaKey || t.shiftKey) return;
                        n.open(this.href, e.sandbox.element()), f.preventDefault(t)
                    })
                },
                baseScribeData: function() {
                    return {}
                },
                extractTweetScribeDetails: function(e) {
                    var t, n, r = {};
                    return e ? (t = e.getAttribute("data-tweet-id"), n = e.getAttribute("data-rendered-tweet-id") || t, n == t ? r[n] = {
                        item_type: T.TWEET
                    } : t && (r[n] = {
                        item_type: T.RETWEET,
                        target_type: T.TWEET,
                        target_id: t
                    }), r) : r
                },
                constrainMedia: function(e, t) {
                    return s.constrainMedia(e || this.element, t || this.contentWidth(), this.fullBleedPhoto, this.layout)
                },
                collapseRegions: function() {
                    m.forEach(a.all("collapsible-container", this.element), m.bind(function(e) {
                        var t = e.children,
                            n = t.length && e.offsetWidth,
                            r = t.length && m.map(t, function(e) {
                                return e.offsetWidth
                            }),
                            i = t.length,
                            s, o;
                        if (!t.length) return;
                        while (i > 0) {
                            i--, s = m.reduce(r, k, 0);
                            if (!n || !s) return;
                            if (s < n) return;
                            o = t[i].getAttribute("data-collapsed-class");
                            if (!o) continue;
                            u.add(this.element, o), r[i] = t[i].offsetWidth
                        }
                    }, this))
                }
            }), C.VALID_UNIT = /^([0-9]+)( ?px)?$/, C.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i, N(), e(C)
        })
    });
    provide("tfw/widget/timeline", function(e) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "util/promise", "anim/transition", "tfw/util/article", "tfw/util/data", "tfw/util/media", "tfw/util/tracking", "tfw/util/params", "util/css", "util/env", "util/throttle", "util/twitter", "util/querystring", "util/typevalidator", "util/util", "dom/delegate", "dom/classname", "dom/get", function(t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w) {
            function q(e) {
                if (!e) return;
                var t, r, i, s, o, u, a, f;
                n.apply(this, [e]), t = this.params(), r = (t.chrome || this.dataAttr("chrome") || "").split(" "), this.preview = t.previewParams, this.widgetId = t.widgetId || this.dataAttr("widget-id"), this.instanceId = ++I, this.cursors = {
                    maxPosition: 0,
                    minPosition: 0
                }, (s = t.screenName || this.dataAttr("screen-name")) || (o = t.userId || this.dataAttr("user-id")) ? this.override = {
                    overrideType: "user",
                    overrideId: o,
                    overrideName: s,
                    withReplies: m.asBoolean(t.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
                } : (s = t.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (o = t.favoritesUserId || this.dataAttr("favorites-user-id")) ? this.override = {
                    overrideType: "favorites",
                    overrideId: o,
                    overrideName: s
                } : ((s = t.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (o = t.listOwnerId || this.dataAttr("list-owner-id"))) && ((u = t.listId || this.dataAttr("list-id")) || (a = t.listSlug || this.dataAttr("list-slug"))) ? this.override = {
                    overrideType: "list",
                    overrideOwnerId: o,
                    overrideOwnerName: s,
                    overrideId: u,
                    overrideName: a
                } : (f = t.customTimelineId || this.dataAttr("custom-timeline-id")) ? this.override = {
                    overrideType: "custom",
                    overrideId: f
                } : this.override = {}, this.tweetLimit = m.asInt(t.tweetLimit || this.dataAttr("tweet-limit")), this.staticTimeline = this.tweetLimit > 0, r.length && (i = ~g.indexOf(r, "none"), this.chromeless = i || ~g.indexOf(r, "transparent"), this.headerless = i || ~g.indexOf(r, "noheader"), this.footerless = i || ~g.indexOf(r, "nofooter"), this.borderless = i || ~g.indexOf(r, "noborders"), this.noscrollbar = ~g.indexOf(r, "noscrollbar")), this.headingStyle = c.sanitize(t.headingStyle || this.dataAttr("heading-style"), undefined, !0), this.classAttr.push("twitter-timeline-rendered"), this.ariaPolite = t.ariaPolite || this.dataAttr("aria-polite")
            }
            var E = "1.0",
                S = {
                    CLIENT_SIDE_USER: 0,
                    CLIENT_SIDE_APP: 2
                },
                x = "timeline",
                T = "new-tweets-bar",
                N = "timeline-header",
                C = "timeline-footer",
                k = "stream",
                L = "h-feed",
                A = "tweet",
                O = "expanded",
                M = "detail-expander",
                _ = "expand",
                D = "permalink",
                P = "twitter-follow-button",
                H = "no-more-pane",
                B = "pending-scroll-in",
                j = "pending-new-tweet",
                F = "pending-new-tweet-display",
                I = 0;
            q.prototype = new n, g.aug(q.prototype, {
                renderedClassNames: "twitter-timeline twitter-timeline-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "600",
                    DEFAULT_WIDTH: "590",
                    NARROW_WIDTH: "320",
                    MIN_WIDTH: "180",
                    MIN_HEIGHT: "200",
                    WIDE_MEDIA_PADDING: 81,
                    NARROW_MEDIA_PADDING: 16,
                    WIDE_MEDIA_PADDING_CL: 60,
                    NARROW_MEDIA_PADDING_CL: 12
                },
                create: function(e) {
                    var n = this.sandbox.createElement("div"),
                        r, s, o, u = [],
                        l;
                    n.innerHTML = e.body, r = n.children[0] || !1;
                    if (!r) return;
                    return this.reconfigure(e.config), this.discardStaticOverflow(r), this.sandbox.setTitle(r.getAttribute("data-iframe-title") || "Timeline"), a.retinize(r), this.constrainMedia(r), this.searchQuery = r.getAttribute("data-search-query"), this.profileId = r.getAttribute("data-profile-id"), this.timelineType = r.getAttribute("data-timeline-type"), l = this.getTweetDetails(w.one(L, n)), g.forIn(l, function(e) {
                        u.push(e)
                    }), o = this.baseScribeData(), o.item_ids = u, o.item_details = l, this.timelineType && f.enqueue({
                        page: this.timelineType + "_timeline",
                        component: "timeline",
                        element: "initial",
                        action: u.length ? "results" : "no_results"
                    }, o, !0, this.dnt), f.enqueue({
                        page: "timeline",
                        component: "timeline",
                        element: "initial",
                        action: u.length ? "results" : "no_results"
                    }, o, !0, this.dnt), f.flush(), this.ariaPolite == "assertive" && (s = w.one(T, r, "DIV"), s.setAttribute("aria-polite", "assertive")), r.id = this.id, r.className += " " + this.classAttr.join(" "), r.lang = this.lang, this.augmentWidgets(r), this.ready().then(g.bind(function(e) {
                        e.appendChild(r).then(g.bind(function() {
                            this.renderResolver.fulfill(this.sandbox)
                        }, this)), e.style({
                            cssText: "",
                            border: "none",
                            maxWidth: "100%",
                            minWidth: this.dimensions.MIN_WIDTH + "px"
                        }), this.layout(g.bind(function() {
                            this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl), this.predefinedWidth = this.width, this.predefinedHeight = this.height, this.width = e.width(this.width), this.height = e.height(this.height)
                        }, this)).then(g.bind(function() {
                            var n = [];
                            this.width < this.predefinedWidth && n.push(this.layout(g.bind(function() {
                                this.width = e.width(this.predefinedWidth)
                            }, this))), this.height < this.predefinedHeight && n.push(this.layout(g.bind(function() {
                                this.height = e.height(this.predefinedHeight), this.recalculateStreamHeight()
                            }, this))), n.length && t.doLayoutAsync(), n.push(i.fulfill()), i.every.apply(null, n).then(g.bind(function() {
                                this.setNarrow(), this.sandbox.onresize(g.bind(this.handleResize, this)), this.completeResolver.fulfill(this.sandbox.element())
                            }, this))
                        }, this))
                    }, this)), r
                },
                render: function(e, n) {
                    return !this.preview && !this.widgetId ? (this.completeResolver.reject(400), this.completed()) : (this.staticTimeline ? this.rendered().then(g.bind(function(e) {
                        this.layout(g.bind(function() {
                            e.height(this.height = this.element.offsetHeight)
                        }, this)), t.doLayoutAsync()
                    }, this)) : this.rendered().then(g.bind(function() {
                        this.recalculateStreamHeight(), t.doLayoutAsync()
                    }, this)), this.preview ? this.getPreviewTimeline() : this.getTimeline(), n && this.completed().then(n), this.completed())
                },
                getPreviewTimeline: function() {
                    u.timelinePreview({
                        success: g.bind(function(e) {
                            this.ready().then(g.bind(function() {
                                this.element = this.create(e), this.readTranslations(), this.bindInteractions(), this.updateCursors(e.headers, {
                                    initial: !0
                                }), t.doLayoutAsync()
                            }, this))
                        }, this),
                        error: g.bind(function(e) {
                            if (!e || !e.headers) {
                                this.completeResolver.fulfill(this.srcEl);
                                return
                            }
                            this.completeResolver.reject(e.headers.status)
                        }, this),
                        params: this.preview
                    })
                },
                getTimeline: function() {
                    f.initPostLogging(), u.timeline(g.aug({
                        id: this.widgetId,
                        instanceId: this.instanceId,
                        dnt: this.dnt,
                        lang: this.lang,
                        success: g.bind(function(e) {
                            this.ready().then(g.bind(function() {
                                this.element = this.create(e), this.readTranslations(), this.bindInteractions(), this.updateTimeStamps(), this.updateCursors(e.headers, {
                                    initial: !0
                                }), e.headers.xPolling && /\d/.test(e.headers.xPolling) && (this.pollInterval = e.headers.xPolling * 1e3), this.staticTimeline || this.schedulePolling(), t.doLayoutAsync()
                            }, this))
                        }, this),
                        error: g.bind(function(e) {
                            if (!e || !e.headers) {
                                this.completeResolver.fulfill(this.srcEl);
                                return
                            }
                            this.completeResolver.reject(e.headers.status)
                        }, this)
                    }, this.override))
                },
                reconfigure: function(e) {
                    this.lang = e.lang, this.theme || (this.theme = e.theme), this.theme == "dark" && this.classAttr.push("thm-dark"), this.chromeless && this.classAttr.push("var-chromeless"), this.borderless && this.classAttr.push("var-borderless"), this.headerless && this.classAttr.push("var-headerless"), this.footerless && this.classAttr.push("var-footerless"), this.staticTimeline && this.classAttr.push("var-static"), !this.linkColor && e.linkColor && n.VALID_COLOR.test(e.linkColor) && (this.linkColor = RegExp.$1), !this.height && n.VALID_UNIT.test(e.height) && (this.height = RegExp.$1), this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT), this.preview && this.classAttr.push("var-preview"), this.narrow = this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.addSiteStyles()
                },
                getTweetDetails: function(e) {
                    var t, n = {};
                    return t = e && e.children || [], g.forEach(t, g.bind(function(e) {
                        g.aug(n, this.extractTweetScribeDetails(e))
                    }, this)), n
                },
                baseScribeData: function() {
                    return {
                        widget_id: this.widgetId,
                        widget_origin: o.url(),
                        client_version: E,
                        message: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId
                    }
                },
                bindInteractions: function() {
                    var e = this,
                        t = this.element,
                        n = !0;
                    this.bindIntentHandlers(), y.delegate(t, "click", ".load-tweets", function(t) {
                        n && (n = !1, e.forceLoad(), y.stop(t))
                    }), y.delegate(t, "click", ".display-sensitive-image", function(n) {
                        e.showNSFW(w.ancestor("." + A, this, t)), y.stop(n)
                    }), y.delegate(t, "mouseover", "." + x, function() {
                        e.mouseOver = !0
                    }), y.delegate(t, "mouseout", "." + x, function() {
                        e.mouseOver = !1
                    }), y.delegate(t, "mouseover", "." + T, function() {
                        e.mouseOverNotifier = !0
                    }), y.delegate(t, "mouseout", "." + T, function() {
                        e.mouseOverNotifier = !1, window.setTimeout(function() {
                            e.hideNewTweetNotifier()
                        }, 3e3)
                    });
                    if (this.staticTimeline) return;
                    y.delegate(t, "click", "." + _, function(n) {
                        if (n.altKey || n.metaKey || n.shiftKey) return;
                        e.toggleExpando(w.ancestor("." + A, this, t)), y.stop(n)
                    }), y.delegate(t, "click", "A", function(e) {
                        y.stopPropagation(e)
                    }), y.delegate(t, "click", ".with-expansion", function(t) {
                        e.toggleExpando(this), y.stop(t)
                    }), y.delegate(t, "click", ".load-more", function() {
                        e.loadMore()
                    }), y.delegate(t, "click", "." + T, function() {
                        e.scrollToTop(), e.hideNewTweetNotifier(!0)
                    })
                },
                scrollToTop: function() {
                    var e = w.one(k, this.element, "DIV");
                    e.scrollTop = 0, e.focus()
                },
                update: function() {
                    var e = this,
                        t = w.one(L, this.element),
                        n = t && t.children[0],
                        r = n && n.getAttribute("data-tweet-id");
                    this.updateTimeStamps(), this.requestTweets(r, !0, function(t) {
                        t.childNodes.length > 0 && e.insertNewTweets(t)
                    })
                },
                loadMore: function() {
                    var e = this,
                        t = w.all(A, this.element, "LI").pop(),
                        n = t && t.getAttribute("data-tweet-id");
                    this.requestTweets(n, !1, function(t) {
                        var r = w.one(H, e.element, "P"),
                            i = t.childNodes[0];
                        r.style.cssText = "", i && i.getAttribute("data-tweet-id") == n && t.removeChild(i);
                        if (t.childNodes.length > 0) {
                            e.appendTweets(t);
                            return
                        }
                        b.add(e.element, "no-more"), r.focus()
                    })
                },
                forceLoad: function() {
                    var e = this,
                        t = !!w.all(L, this.element, "OL").length;
                    this.requestTweets(1, !0, function(n) {
                        n.childNodes.length && (e[t ? "insertNewTweets" : "appendTweets"](n), b.add(e.element, "has-tweets"))
                    })
                },
                schedulePolling: function(e) {
                    var t = this;
                    if (this.pollInterval === null) return;
                    e = twttr.widgets.poll || e || this.pollInterval || 1e4, e > -1 && window.setTimeout(function() {
                        this.isUpdating || t.update(), t.schedulePolling()
                    }, e)
                },
                updateCursors: function(e, t) {
                    (t || {}).initial ? (this.cursors.maxPosition = e.maxPosition, this.cursors.minPosition = e.minPosition) : (t || {}).newer ? this.cursors.maxPosition = e.maxPosition || this.cursors.maxPosition : this.cursors.minPosition = e.minPosition || this.cursors.minPosition
                },
                requestTweets: function(e, t, n) {
                    var r = this,
                        i = {
                            id: this.widgetId,
                            instanceId: this.instanceId,
                            screenName: this.widgetScreenName,
                            userId: this.widgetUserId,
                            withReplies: this.widgetShowReplies,
                            dnt: this.dnt,
                            lang: this.lang
                        };
                    t && this.cursors.maxPosition ? i.minPosition = this.cursors.maxPosition : !t && this.cursors.minPosition ? i.maxPosition = this.cursors.minPosition : t ? i.sinceId = e : i.maxId = e, i.complete = function() {
                        this.isUpdating = !1
                    }, i.error = function(e) {
                        if (e && e.headers) {
                            if (e.headers.status == "404") {
                                r.pollInterval = null;
                                return
                            }
                            if (e.headers.status == "503") {
                                r.pollInterval *= 1.5;
                                return
                            }
                        }
                    }, i.success = function(e) {
                        var i = r.sandbox.createDocumentFragment(),
                            s = r.sandbox.createElement("ol"),
                            o, u = [],
                            l;
                        r.updateCursors(e.headers, {
                            newer: t
                        }), e && e.headers && e.headers.xPolling && /\d+/.test(e.headers.xPolling) && (r.pollInterval = e.headers.xPolling * 1e3);
                        if (e && e.body !== undefined) {
                            s.innerHTML = e.body;
                            if (s.children[0] && s.children[0].tagName != "LI") return;
                            l = r.getTweetDetails(s), g.forIn(l, function(e) {
                                u.push(e)
                            }), u.length && (o = r.baseScribeData(), o.item_ids = u, o.item_details = l, o.event_initiator = t ? S.CLIENT_SIDE_APP : S.CLIENT_SIDE_USER, this.timelineType && f.enqueue({
                                page: this.timelineType + "_timeline",
                                component: "timeline",
                                element: "initial",
                                action: u.length ? "results" : "no_results"
                            }, o, !0, this.dnt), f.enqueue({
                                page: "timeline",
                                component: "timeline",
                                element: t ? "newer" : "older",
                                action: "results"
                            }, o, !0, r.dnt), f.flush()), a.retinize(s), r.constrainMedia(s);
                            while (s.children[0]) i.appendChild(s.children[0]);
                            n(i)
                        }
                    }, u.timelinePoll(g.aug(i, this.override))
                },
                insertNewTweets: function(e) {
                    var t = this,
                        n = w.one(k, this.element, "DIV"),
                        r = w.one(L, n, "OL"),
                        i = r.offsetHeight,
                        o;
                    r.insertBefore(e, r.firstChild), o = r.offsetHeight - i, twttr.events.trigger("timelineUpdated", {
                        target: this.sandbox.element(),
                        region: "newer"
                    });
                    if (n.scrollTop > 40 || this.mouseIsOver()) {
                        n.scrollTop = n.scrollTop + o, this.updateTimeStamps(), this.showNewTweetNotifier();
                        return
                    }
                    b.remove(this.element, B), r.style.cssText = "margin-top: -" + o + "px", window.setTimeout(function() {
                        n.scrollTop = 0, b.add(t.element, B), h.cssTransitions() ? r.style.cssText = "" : s.animate(function(e) {
                            e < o ? r.style.cssText = "margin-top: -" + (o - e) + "px" : r.style.cssText = ""
                        }, o, 500, s.easeOut)
                    }, 500), this.updateTimeStamps(), this.timelineType != "custom" && this.gcTweets(50)
                },
                appendTweets: function(e) {
                    var t = w.one(k, this.element, "DIV"),
                        n = w.one(L, t, "OL");
                    n.appendChild(e), this.updateTimeStamps(), twttr.events.trigger("timelineUpdated", {
                        target: this.sandbox.element(),
                        region: "older"
                    })
                },
                gcTweets: function(e) {
                    var t = w.one(L, this.element, "OL"),
                        n = t.children.length,
                        r;
                    e = e || 50;
                    for (; n > e && (r = t.children[n - 1]); n--) t.removeChild(r)
                },
                showNewTweetNotifier: function() {
                    var e = this,
                        t = w.one(T, this.element, "DIV"),
                        n = t.children[0];
                    t.style.cssText = "", t.removeChild(n), t.appendChild(n), b.add(this.element, F), window.setTimeout(function() {
                        b.add(e.element, j)
                    }, 10), this.newNoticeDisplayTime = +(new Date), window.setTimeout(function() {
                        e.hideNewTweetNotifier()
                    }, 5e3)
                },
                hideNewTweetNotifier: function(e) {
                    var t = this;
                    if (!e && this.mouseOverNotifier) return;
                    b.remove(this.element, j), window.setTimeout(function() {
                        b.remove(t.element, F)
                    }, 500)
                },
                augmentWidgets: function(e) {
                    var t = w.one(P, e, "A");
                    if (!t) return;
                    t.setAttribute("data-related", this.related), t.setAttribute("data-partner", this.partner), t.setAttribute("data-dnt", this.dnt), t.setAttribute("data-search-query", this.searchQuery), t.setAttribute("data-profile-id", this.profileId), this.width < 250 && t.setAttribute("data-show-screen-name", "false"), twttr.widgets.load(t.parentNode)
                },
                discardStaticOverflow: function(e) {
                    var t = w.one(L, e, "OL"),
                        n;
                    if (this.staticTimeline) {
                        this.height = 0;
                        while (n = t.children[this.tweetLimit]) t.removeChild(n)
                    }
                },
                hideStreamScrollBar: function() {
                    var e = w.one(k, this.element, "DIV"),
                        t = w.one(L, this.element, "OL"),
                        n;
                    e.style.width = "", n = this.element.offsetWidth - t.offsetWidth, n > 0 && (e.style.width = this.element.offsetWidth + n + "px")
                },
                readTranslations: function() {
                    var e = this.element,
                        t = "data-dt-";
                    this.datetime = new r(g.compact({
                        phrases: {
                            now: e.getAttribute(t + "now"),
                            s: e.getAttribute(t + "s"),
                            m: e.getAttribute(t + "m"),
                            h: e.getAttribute(t + "h"),
                            second: e.getAttribute(t + "second"),
                            seconds: e.getAttribute(t + "seconds"),
                            minute: e.getAttribute(t + "minute"),
                            minutes: e.getAttribute(t + "minutes"),
                            hour: e.getAttribute(t + "hour"),
                            hours: e.getAttribute(t + "hours")
                        },
                        months: e.getAttribute(t + "months").split("|"),
                        formats: {
                            abbr: e.getAttribute(t + "abbr"),
                            shortdate: e.getAttribute(t + "short"),
                            longdate: e.getAttribute(t + "long")
                        }
                    }))
                },
                updateTimeStamps: function() {
                    var e = w.all(D, this.element, "A"),
                        t, n, r = 0,
                        i, s;
                    for (; t = e[r]; r++) {
                        i = t.getAttribute("data-datetime"), s = i && this.datetime.timeAgo(i, this.i18n), n = t.getElementsByTagName("TIME")[0];
                        if (!s) continue;
                        if (n && n.innerHTML) {
                            n.innerHTML = s;
                            continue
                        }
                        t.innerHTML = s
                    }
                },
                mouseIsOver: function() {
                    return this.mouseOver
                },
                addUrlParams: function(e) {
                    var t = this,
                        n = {
                            tw_w: this.widgetId,
                            related: this.related,
                            partner: this.partner,
                            query: this.searchQuery,
                            profile_id: this.profileId,
                            original_referer: o.url(),
                            tw_p: "embeddedtimeline"
                        };
                    return this.addUrlParams = l(n, function(e) {
                        var n = w.ancestor("." + A, e, t.element);
                        return n && {
                            tw_i: n.getAttribute("data-tweet-id")
                        }
                    }), this.addUrlParams(e)
                },
                showNSFW: function(e) {
                    var t = w.one("nsfw", e, "DIV"),
                        n, r, i = 0,
                        s, o, u, f;
                    if (!t) return;
                    r = a.scaleDimensions(t.getAttribute("data-width"), t.getAttribute("data-height"), this.contentWidth(), t.getAttribute("data-height")), n = !!(o = t.getAttribute("data-player")), n ? u = this.sandbox.createElement("iframe") : (u = this.sandbox.createElement("img"), o = t.getAttribute(h.retina() ? "data-image-2x" : "data-image"), u.alt = t.getAttribute("data-alt"), f = this.sandbox.createElement("a"), f.href = t.getAttribute("data-href"), f.appendChild(u)), u.title = t.getAttribute("data-title"), u.src = o, u.width = r.width, u.height = r.height, s = w.ancestor("." + M, t, e), i = r.height - t.offsetHeight, t.parentNode.replaceChild(n ? u : f, t), s.style.cssText = "height:" + (s.offsetHeight + i) + "px"
                },
                toggleExpando: function(e) {
                    var n = w.one(M, e, "DIV"),
                        r = n && n.children[0],
                        i = r && r.getAttribute("data-expanded-media"),
                        s, o = 0,
                        u = w.one(_, e, "A"),
                        f = u && u.getElementsByTagName("B")[0],
                        l = f && (f.innerText || f.textContent),
                        c;
                    if (!f) return;
                    this.layout(function() {
                        f.innerHTML = u.getAttribute("data-toggled-text"), u.setAttribute("data-toggled-text", l)
                    });
                    if (b.present(e, O)) {
                        this.layout(function() {
                            b.remove(e, O)
                        });
                        if (!n) {
                            t.doLayout();
                            return
                        }
                        this.layout(function() {
                            n.style.cssText = "", r.innerHTML = ""
                        }), t.doLayout();
                        return
                    }
                    i && (s = this.sandbox.createElement("DIV"), s.innerHTML = i, a.retinize(s), o = this.constrainMedia(s), this.layout(function() {
                        r.appendChild(s)
                    })), n && this.layout(function() {
                        c = Math.max(r.offsetHeight, o), n.style.cssText = "height:" + c + "px"
                    }), this.layout(function() {
                        b.add(e, O)
                    }), t.doLayout()
                },
                recalculateStreamHeight: function(e) {
                    var t = w.one(N, this.element, "DIV"),
                        n = w.one(C, this.element, "DIV"),
                        r = w.one(k, this.element, "DIV");
                    this.layout(g.bind(function() {
                        var i = t.offsetHeight + (n ? n.offsetHeight : 0),
                            s = e || this.sandbox.height();
                        r.style.cssText = "height:" + (s - i - 2) + "px", this.noscrollbar && this.hideStreamScrollBar()
                    }, this))
                },
                handleResize: function(e, n) {
                    var r = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, e)));
                    if (r == this.width && n == this.height) return;
                    this.width = r, this.height = n, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(r)), this.staticTimeline ? this.layout(g.bind(function() {
                        this.height = this.element.offsetHeight, this.sandbox.height(this.height), twttr.events.trigger("resize", {
                            target: this.sandbox.element()
                        })
                    }, this)) : (this.recalculateStreamHeight(n), twttr.events.trigger("resize", {
                        target: this.sandbox.element()
                    })), t.doLayoutAsync()
                }
            }), e(q)
        })
    });
    provide("tfw/widget/embed", function(e) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "tfw/util/params", "dom/classname", "dom/get", "util/env", "util/promise", "util/util", "util/throttle", "util/twitter", "tfw/util/article", "tfw/util/data", "tfw/util/tracking", "tfw/util/media", function(t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
            function E(e, t, n, r) {
                var i = o.one("subject", e, "BLOCKQUOTE"),
                    s = o.one("reply", e, "BLOCKQUOTE"),
                    u = i && i.getAttribute("data-tweet-id"),
                    a = s && s.getAttribute("data-tweet-id"),
                    l = {},
                    c = {};
                if (!u) return;
                l[u] = {
                    item_type: 0
                }, d.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "tweet",
                    action: "results"
                }, f.aug({}, t, {
                    item_ids: [u],
                    item_details: l
                }), !0, r);
                if (!a) return;
                c[a] = {
                    item_type: 0
                }, d.enqueue({
                    page: "tweet",
                    section: "conversation",
                    component: "tweet",
                    action: "results"
                }, f.aug({}, t, {
                    item_ids: [a],
                    item_details: c,
                    associations: {
                        4: {
                            association_id: u,
                            association_type: 4
                        }
                    }
                }), !0, r)
            }

            function S(e, t, n) {
                var r = {};
                if (!e) return;
                r[e] = {
                    item_type: 0
                }, d.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "rawembedcode",
                    action: "no_results"
                }, {
                    client_version: m,
                    widget_origin: h.url(),
                    widget_frame: h.frameUrl(),
                    message: t,
                    item_ids: [e],
                    item_details: r
                }, !0, n)
            }

            function x(e, t, n, r) {
                y[e] = y[e] || [], y[e].push({
                    s: n,
                    f: r,
                    lang: t
                })
            }

            function T() {
                w.length && twttr.widgets.load(w)
            }

            function N(e) {
                if (!e) return;
                var t, r, i;
                n.apply(this, [e]), t = this.params(), r = this.srcEl && this.srcEl.getElementsByTagName("A"), i = r && r[r.length - 1], this.hideThread = (t.conversation || this.dataAttr("conversation")) == "none" || ~f.indexOf(this.classAttr, "tw-hide-thread"), this.hideCard = (t.cards || this.dataAttr("cards")) == "hidden" || ~f.indexOf(this.classAttr, "tw-hide-media");
                if ((t.align || this.attr("align")) == "left" || ~f.indexOf(this.classAttr, "tw-align-left")) this.align = "left";
                else if ((t.align || this.attr("align")) == "right" || ~f.indexOf(this.classAttr, "tw-align-right")) this.align = "right";
                else if ((t.align || this.attr("align")) == "center" || ~f.indexOf(this.classAttr, "tw-align-center")) this.align = "center", this.containerWidth > this.dimensions.MIN_WIDTH * (1 / .7) && this.width > this.containerWidth * .7 && (this.width = this.containerWidth * .7);
                this.narrow = t.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.tweetId = t.tweetId || i && c.status(i.href)
            }
            var m = "2.0",
                g = "tweetembed",
                y = {},
                b = [],
                w = [];
            N.prototype = new n, f.aug(N.prototype, {
                renderedClassNames: "twitter-tweet twitter-tweet-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "0",
                    DEFAULT_WIDTH: "500",
                    NARROW_WIDTH: "350",
                    MIN_WIDTH: "220",
                    MIN_HEIGHT: "0",
                    WIDE_MEDIA_PADDING: 32,
                    NARROW_MEDIA_PADDING: 32
                },
                create: function(e) {
                    var t = this.sandbox.createElement("div"),
                        n, r;
                    t.innerHTML = e, n = t.children[0] || !1;
                    if (!n) return;
                    return this.theme == "dark" && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), s.present(n, "media-forward") && (this.fullBleedPhoto = !0), this.augmentWidgets(n), v.retinize(n), n.id = this.id, n.className += " " + this.classAttr.join(" "), n.lang = this.lang, this.sandbox.setTitle(n.getAttribute("data-iframe-title") || "Tweet"), this.sandbox.appendChild(n).then(f.bind(function() {
                        this.renderResolver.fulfill(this.sandbox)
                    }, this)), this.sandbox.style({
                        cssText: "",
                        display: "block",
                        maxWidth: "99%",
                        minWidth: this.dimensions.MIN_WIDTH + "px",
                        padding: "0",
                        borderRadius: "5px",
                        margin: "10px 0",
                        border: "#ddd 1px solid",
                        borderTopColor: "#eee",
                        borderBottomColor: "#bbb",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        position: "absolute",
                        visibility: "hidden"
                    }), r = this.layout(f.bind(function() {
                        this.predefinedWidth = this.width, this.width = this.sandbox.width(this.width), this.collapseRegions()
                    }, this), "Insert Sandbox"), r.then(f.bind(function() {
                        this.constrainMedia(n, this.contentWidth(this.width)), this.setNarrow().then(f.bind(function() {
                            this.layout(f.bind(function() {
                                this.completeResolver.fulfill(this.sandbox.element())
                            }, this))
                        }, this))
                    }, this)), E(n, this.baseScribeData(), this.partner, this.dnt), n
                },
                render: function(e, n) {
                    var r = "",
                        i = this.tweetId;
                    return i ? (this.hideCard && (r += "c"), this.hideThread && (r += "t"), r && (i += "-" + r), this.rendered().then(f.bind(function(e) {
                        this.srcEl && this.srcEl.parentNode && this.layout(f.bind(function() {
                            this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl)
                        }, this), "Remove Embed Code"), this.align == "center" ? e.style({
                            margin: "7px auto",
                            cssFloat: "none"
                        }) : this.align && (this.width == this.dimensions.DEFAULT_WIDTH && (this.predefinedWidth = this.width = this.dimensions.NARROW_WIDTH), e.style({
                            cssFloat: this.align
                        })), this.layout(f.bind(function() {
                            this.height = this.sandbox.height(this.element.offsetHeight)
                        }, this)).then(f.bind(function() {
                            return t.doLayoutAsync(), this.layout(f.bind(function() {
                                this.height = this.sandbox.height(this.element.offsetHeight)
                            }, this))
                        }, this)).then(f.bind(function() {
                            e.onresize(f.bind(this.handleResize, this))
                        }, this)), e.style({
                            position: "static",
                            visibility: "visible"
                        }), t.doLayoutAsync()
                    }, this)), x(i, this.lang, f.bind(function(n) {
                        this.ready().then(f.bind(function() {
                            this.element = this.create(n), this.readTimestampTranslations(), this.updateTimeStamps(), this.bindIntentHandlers(), t.doLayoutAsync()
                        }, this))
                    }, this), f.bind(function() {
                        S(this.tweetId, this.partner, this.dnt), this.completeResolver.fulfill(this.srcEl)
                    }, this)), b.push(this.rendered()), n && this.completed().then(n), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed())
                },
                augmentWidgets: function(e) {
                    var t = o.one("twitter-follow-button", e, "A");
                    if (!t) return;
                    t.setAttribute("data-related", this.related), t.setAttribute("data-partner", this.partner), t.setAttribute("data-dnt", this.dnt), t.setAttribute("data-show-screen-name", "false"), w.push(t.parentNode)
                },
                addUrlParams: function(e) {
                    var t = this,
                        n = {
                            related: this.related,
                            partner: this.partner,
                            original_referer: h.url(),
                            tw_p: g
                        };
                    return this.addUrlParams = i(n, function(e) {
                        var n = o.ancestor(".tweet", e, t.element);
                        return {
                            tw_i: n.getAttribute("data-tweet-id")
                        }
                    }), this.addUrlParams(e)
                },
                baseScribeData: function() {
                    return {
                        client_version: m,
                        widget_origin: h.url(),
                        widget_frame: h.frameUrl(),
                        message: this.partner
                    }
                },
                handleResize: function(e) {
                    if (e == this.width) return;
                    this.width = e, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(e)), this.collapseRegions(), this.layout(f.bind(function() {
                        this.height = this.sandbox.height(this.element.offsetHeight), twttr.events.trigger("resize", {
                            target: this.sandbox.element()
                        })
                    }, this)), t.doLayoutAsync()
                },
                readTimestampTranslations: function() {
                    var e = this.element,
                        t = "data-dt-",
                        n = e.getAttribute(t + "months") || "";
                    this.datetime = new r(f.compact({
                        phrases: {
                            AM: e.getAttribute(t + "am"),
                            PM: e.getAttribute(t + "pm")
                        },
                        months: n.split("|"),
                        formats: {
                            full: e.getAttribute(t + "full")
                        }
                    }))
                },
                updateTimeStamps: function() {
                    var e = o.one("long-permalink", this.element, "A"),
                        n = e.getAttribute("data-datetime"),
                        r = n && this.datetime.localTimeStamp(n),
                        i = e.getElementsByTagName("TIME")[0];
                    if (!r) return;
                    this.layout(function() {
                        if (i && i.innerHTML) {
                            i.innerHTML = r;
                            return
                        }
                        e.innerHTML = r
                    }, "Update Timestamp"), t.doLayoutAsync()
                }
            }), N.fetchAndRender = function() {
                var e = y,
                    n = [],
                    r, i;
                y = {};
                if (e.keys) n = e.keys();
                else
                    for (r in e) e.hasOwnProperty(r) && n.push(r);
                if (!n.length) return;
                d.initPostLogging(), i = e[n[0]][0].lang, p.tweets({
                    ids: n.sort(),
                    lang: i,
                    complete: function(n) {
                        f.forIn(n, function(t, n) {
                            var r = e[t];
                            f.forEach(r, function(e) {
                                e.s && e.s.call(this, n)
                            }), delete e[t]
                        }), t.doLayout(), f.forIn(e, function(e, t) {
                            f.forEach(t, function(t) {
                                t.f && t.f.call(this, e)
                            })
                        }), t.doLayout()
                    }
                }), a.every.apply(null, b).then(function() {
                    T(), d.flush()
                })
            }, t.afterLoad(N.fetchAndRender), e(N)
        })
    });
    provide("dom/textsize", function(e) {
        function n(e, t, n) {
            var r = [],
                i = 0,
                s;
            for (; s = n[i]; i++) r.push(s[0]), r.push(s[1]);
            return e + t + r.join(":")
        }

        function r(e) {
            var t = e || "";
            return t.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }
        var t = {};
        e(function(e, i, s) {
            var o = document.createElement("span"),
                u = {},
                a = "",
                f, l = 0,
                c = 0,
                h = [];
            s = s || [], i = i || "", a = n(e, i, s);
            if (t[a]) return t[a];
            o.className = i + " twitter-measurement";
            try {
                for (; f = s[l]; l++) o.style[f[0]] = f[1]
            } catch (p) {
                for (; f = s[c]; c++) h.push(r(f[0]) + ":" + f[1]);
                o.setAttribute("style", h.join(";") + ";")
            }
            return o.innerHTML = e, document.body.appendChild(o), u.width = o.clientWidth || o.offsetWidth, u.height = o.clientHeight || o.offsetHeight, document.body.removeChild(o), o = null, t[a] = u
        })
    });
    provide("tfw/widget/follow", function(e) {
        using("util/util", "tfw/widget/base", "util/querystring", "util/uri", "util/twitter", "util/promise", "dom/textsize", function(t, n, r, i, s, o, u) {
            function a(e) {
                if (!e) return;
                var t, r, i, o;
                n.apply(this, [e]), t = this.params(), r = t.size || this.dataAttr("size"), i = t.showScreenName || this.dataAttr("show-screen-name"), o = t.count || this.dataAttr("count"), this.classAttr.push("twitter-follow-button"), this.showScreenName = i != "false", this.showCount = t.showCount !== !1 && this.dataAttr("show-count") != "false", o == "none" && (this.showCount = !1), this.explicitWidth = t.width || this.dataAttr("width") || "", this.screenName = t.screen_name || t.screenName || s.screenName(this.attr("href")), this.preview = t.preview || this.dataAttr("preview") || "", this.align = t.align || this.dataAttr("align") || "", this.size = r == "large" ? "l" : "m"
            }
            a.prototype = new n, t.aug(a.prototype, {
                parameters: function() {
                    var e = {
                        screen_name: this.screenName,
                        lang: this.lang,
                        show_count: this.showCount,
                        show_screen_name: this.showScreenName,
                        align: this.align,
                        id: this.id,
                        preview: this.preview,
                        size: this.size,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    };
                    return t.compact(e), r.encode(e)
                },
                width: function() {
                    if (this.calculatedWidth) return this.calculatedWidth;
                    if (this.explicitWidth) return this.explicitWidth;
                    var e = {
                            cnt: 13,
                            btn: 24,
                            xlcnt: 22,
                            xlbtn: 38
                        },
                        n = this.showScreenName ? "Follow %{screen_name}" : "Follow",
                        r = this._(n, {
                            screen_name: "@" + this.screenName
                        }),
                        i = ~t.indexOf(["ja", "ko"], this.lang) ? this._("10k unit") : this._("M"),
                        s = this._("%{followers_count} followers", {
                            followers_count: "88888" + i
                        }),
                        o = 0,
                        a = 0,
                        f, l, c = this.styles.base;
                    return this.size == "l" ? (c = c.concat(this.styles.large), f = e.xlbtn, l = e.xlcnt) : (f = e.btn, l = e.cnt), this.showCount && (a = u(s, "", c).width + l), o = u(r, "", c.concat(this.styles.button)).width + f, this.calculatedWidth = o + a
                },
                render: function(e, n) {
                    if (!this.screenName) return o.reject("Missing Screen Name").then(n);
                    var r = twttr.widgets.config.assetUrl() + "/widgets/follow_button.1410542722.html#" + this.parameters(),
                        i = this.create(r, this.dimensions(), {
                            title: this._("Twitter Follow Button")
                        }).then(t.bind(function(e) {
                            return this.element = e
                        }, this));
                    return n && i.then(n), i
                }
            }), e(a)
        })
    });
    provide("tfw/widget/tweetbutton", function(e) {
        using("tfw/widget/base", "tfw/util/globals", "util/util", "util/querystring", "util/uri", "util/twitter", "util/typevalidator", "dom/textsize", function(t, n, r, i, s, o, u, a) {
            function p(e) {
                t.apply(this, [e]);
                var i = this.params(),
                    u = i.count || this.dataAttr("count"),
                    a = i.size || this.dataAttr("size"),
                    p = s.getScreenNameFromPage(),
                    d = "" + (i.shareWithRetweet || this.dataAttr("share-with-retweet") || n.val("share-with-retweet"));
                this.classAttr.push("twitter-tweet-button"), i.type == "hashtag" || ~r.indexOf(this.classAttr, "twitter-hashtag-button") ? (this.type = "hashtag", this.classAttr.push("twitter-hashtag-button")) : i.type == "mention" || ~r.indexOf(this.classAttr, "twitter-mention-button") ? (this.type = "mention", this.classAttr.push("twitter-mention-button")) : this.classAttr.push("twitter-share-button"), this.text = i.text || this.dataAttr("text"), this.text && /\+/.test(this.text) && !/ /.test(this.text) && (this.text = this.text.replace(/\+/g, " ")), this.counturl = i.counturl || this.dataAttr("counturl"), this.searchlink = i.searchlink || this.dataAttr("searchlink"), this.button_hashtag = o.hashTag(i.button_hashtag || i.hashtag || this.dataAttr("button-hashtag"), !1), this.size = a == "large" ? "l" : "m", this.align = i.align || this.dataAttr("align") || "", this.via = i.via || this.dataAttr("via"), this.hashtags = i.hashtags || this.dataAttr("hashtags"), this.screen_name = o.screenName(i.screen_name || i.screenName || this.dataAttr("button-screen-name")), this.url = i.url || this.dataAttr("url"), this.type ? (this.count = "none", this.shareWithRetweet = "never", p && (this.related = this.related ? p + "," + this.related : p)) : (this.text = this.text || f, this.url = this.url || s.getCanonicalURL() || l, this.count = ~r.indexOf(c, u) ? u : "horizontal", this.count = this.count == "vertical" && this.size == "l" ? "none" : this.count, this.via = this.via || p, d && ~r.indexOf(h, d) && (this.shareWithRetweet = d.replace("-", "_")))
            }
            var f = document.title,
                l = encodeURI(location.href),
                c = ["vertical", "horizontal", "none"],
                h = [, "never", "publisher-first", "publisher-only", "author-first", "author-only"];
            p.prototype = new t, r.aug(p.prototype, {
                widgetUrlParams: function() {
                    return r.compact({
                        text: this.text,
                        url: this.url,
                        via: this.via,
                        related: this.related,
                        count: this.count,
                        lang: this.lang,
                        counturl: this.counturl,
                        searchlink: this.searchlink,
                        placeid: this.placeid,
                        original_referer: location.href,
                        id: this.id,
                        size: this.size,
                        type: this.type,
                        screen_name: this.screen_name,
                        share_with_retweet: this.shareWithRetweet,
                        button_hashtag: this.button_hashtag,
                        hashtags: this.hashtags,
                        align: this.align,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    })
                },
                parameters: function() {
                    return i.encode(this.widgetUrlParams())
                },
                height: function() {
                    return this.count == "vertical" ? 62 : this.size == "m" ? 20 : 28
                },
                width: function() {
                    var e = {
                            ver: 8,
                            cnt: 14,
                            btn: 24,
                            xlcnt: 18,
                            xlbtn: 38
                        },
                        t = this.count == "vertical",
                        n = this.type == "hashtag" && this.button_hashtag ? "Tweet %{hashtag}" : this.type == "mention" && this.screen_name ? "Tweet to %{name}" : "Tweet",
                        i = this._(n, {
                            name: "@" + this.screen_name,
                            hashtag: "#" + this.button_hashtag
                        }),
                        s = this._("K"),
                        o = this._("100K+"),
                        u = (t ? "8888" : "88888") + s,
                        f = 0,
                        l = 0,
                        c = 0,
                        h = 0,
                        p = this.styles.base,
                        d = p;
                    return ~r.indexOf(["ja", "ko"], this.lang) ? u += this._("10k unit") : u = u.length > o.length ? u : o, t ? (d = p.concat(this.styles.vbubble), h = e.ver, c = e.btn) : this.size == "l" ? (p = d = p.concat(this.styles.large), c = e.xlbtn, h = e.xlcnt) : (c = e.btn, h = e.cnt), this.count != "none" && (l = a(u, "", d).width + h), f = a(i, "", p.concat(this.styles.button)).width + c, t ? f > l ? f : l : this.calculatedWidth = f + l
                },
                render: function(e, t) {
                    var n = twttr.widgets.config.assetUrl() + "/widgets/tweet_button.1410542722.html#" + this.parameters(),
                        i;
                    return this.count && this.classAttr.push("twitter-count-" + this.count), i = this.create(n, this.dimensions(), {
                        title: this._("Twitter Tweet Button")
                    }).then(r.bind(function(e) {
                        return this.element = e
                    }, this)), t && i.then(t), i
                }
            }), e(p)
        })
    });
    provide("tfw/factories", function(e) {
        using("util/util", "util/promise", "util/twitter", "tfw/widget/base", "tfw/widget/tweetbutton", "tfw/widget/follow", "tfw/widget/embed", "tfw/widget/timeline", function(t, n, r, i, s, o, u, a) {
            function f(e, r, s, o) {
                return e = e || [], s = s || {},
                    function() {
                        var u, a, f, l = Array.prototype.slice.apply(arguments, [0, e.length]),
                            c = Array.prototype.slice.apply(arguments, [e.length]),
                            h;
                        return t.forEach(c, function(e) {
                            if (!e) return;
                            if (e.nodeType === 1) {
                                f = e;
                                return
                            }
                            if (t.isType("function", e)) {
                                u = e;
                                return
                            }
                            t.isType("object", e) && (a = e)
                        }), l.length != e.length || c.length === 0 ? (u && t.async(function() {
                            u(!1)
                        }), n.reject("Not enough parameters")) : f ? (a = t.aug(a || {}, s), a.targetEl = f, t.forEach(e, function(e) {
                            a[e] = l.shift()
                        }), h = new r(a), i.doLayout(), h.render(twttr.widgets.config), o && o(), u && h.completed().then(u, function() {
                            u(!1)
                        }), h.completed()) : (u && t.async(function() {
                            u(!1)
                        }), n.reject("No target specified"))
                    }
            }

            function l(e) {
                var n;
                e.linkColor = e.linkColor || e.previewParams.link_color, e.theme = e.theme || e.previewParams.theme, e.height = e.height || e.previewParams.height, n = new a(e), this.render = t.bind(n.render, n), this.completed = t.bind(n.completed, n)
            }
            var c = f(["url"], s, {
                    type: "share"
                }),
                h = f(["hashtag"], s, {
                    type: "hashtag"
                }),
                p = f(["screenName"], s, {
                    type: "mention"
                }),
                d = f(["screenName"], o),
                v = f(["tweetId"], u, {}, u.fetchAndRender),
                m = f(["widgetId"], a),
                g = f(["previewParams"], l),
                y = {
                    createShareButton: c,
                    createMentionButton: p,
                    createHashtagButton: h,
                    createFollowButton: d,
                    createTweet: v,
                    createTweetEmbed: v,
                    createTimeline: m
                };
            r.isTwitterURL(window.location.href) && (y.createTimelinePreview = g), e(y)
        })
    });
    ! function() {
        window.twttr = window.twttr || {}, twttr.host = twttr.host || "platform.twitter.com", using("util/domready", "util/env", "util/logger", function(e, t, n) {
            function r(e) {
                return (e || !/^http\:$/.test(window.location.protocol)) && !twttr.ignoreSSL ? "https" : "http"
            }
            if (t.ie6()) return;
            if (twttr.widgets && twttr.widgets.loaded) return twttr.widgets.load(), !1;
            if (twttr.init) return !1;
            twttr.init = !0, twttr._e = twttr._e || [], twttr.ready = twttr.ready || function(e) {
                twttr.widgets && twttr.widgets.loaded ? e(twttr) : twttr._e.push(e)
            }, using.path.length || (using.path = r() + "://" + twttr.host + "/js"), twttr.ignoreSSL = twttr.ignoreSSL || !1;
            var i = [];
            twttr.events = {
                bind: function(e, t) {
                    return i.push([e, t])
                }
            }, e(function() {
                using("tfw/widget/base", "tfw/widget/follow", "tfw/widget/tweetbutton", "tfw/widget/embed", "tfw/widget/timeline", "tfw/widget/intent", "tfw/factories", "tfw/util/article", "util/events", "util/util", function(e, t, s, o, u, a, f, l, c, h) {
                    function m(e) {
                        var t = twttr.host;
                        return r(e) == "https" && twttr.secureHost && (t = twttr.secureHost), r(e) + "://" + t
                    }

                    function g() {
                        using("tfw/hub/client", function(e) {
                            twttr.events.hub = e.init(p), e.init(p, !0)
                        })
                    }
                    var p = {
                            widgets: {
                                "a.twitter-share-button": s,
                                "a.twitter-mention-button": s,
                                "a.twitter-hashtag-button": s,
                                "a.twitter-follow-button": t,
                                "blockquote.twitter-tweet": o,
                                "a.twitter-timeline": u,
                                "div.twitter-timeline": u,
                                body: a
                            }
                        },
                        d = twttr.events && twttr.events.hub ? twttr.events : {},
                        v;
                    p.assetUrl = m, twttr.widgets = twttr.widgets || {}, h.aug(twttr.widgets, f, {
                        config: {
                            assetUrl: m
                        },
                        load: function(t) {
                            n.time("load"), e.init(p), e.embed(t), twttr.widgets.loaded = !0
                        }
                    }), h.aug(twttr.events, d, c.Emitter), v = twttr.events.bind, twttr.events.bind = function(e, t) {
                        g(), this.bind = v, this.bind(e, t)
                    }, h.forEach(i, function(e) {
                        twttr.events.bind(e[0], e[1])
                    }), h.forEach(twttr._e, function(e) {
                        h.async(function() {
                            e(twttr)
                        })
                    }), twttr.ready = function(e) {
                        h.async(function() {
                            e(twttr)
                        })
                    }, twttr.widgets.load()
                })
            })
        })
    }()
});
