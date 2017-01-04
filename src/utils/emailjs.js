/* eslint-disable */
(function () {
  "use strict";

  function t(t) {
    return "function" == typeof t || "object" == typeof t && null !== t
  }

  function e(t) {
    return "function" == typeof t
  }

  function n(t) {
    return "object" == typeof t && null !== t
  }

  function r(t) {
    k = t
  }

  function o(t) {
    K = t
  }

  function s() {
    return function () {
      process.nextTick(f)
    }
  }

  function i() {
    return function () {
      L(f)
    }
  }

  function u() {
    var t = 0,
      e = new z(f),
      n = document.createTextNode("");
    return e.observe(n, {
        characterData: !0
      }),
      function () {
        n.data = t = ++t % 2
      }
  }

  function a() {
    var t = new MessageChannel;
    return t.port1.onmessage = f,
      function () {
        t.port2.postMessage(0)
      }
  }

  function c() {
    return function () {
      setTimeout(f, 1)
    }
  }

  function f() {
    for (var t = 0; Y > t; t += 2) {
      var e = V[t],
        n = V[t + 1];
      e(n), V[t] = void 0, V[t + 1] = void 0
    }
    Y = 0
  }

  function l() {
    try {
      var t = require,
        e = t("vertx");
      return L = e.runOnLoop || e.runOnContext, i()
    } catch (n) {
      return c()
    }
  }

  function p() {}

  function d() {
    return new TypeError("You cannot resolve a promise with itself")
  }

  function h() {
    return new TypeError("A promises callback cannot return that same promise.")
  }

  function v(t) {
    try {
      return t.then
    } catch (e) {
      return et.error = e, et
    }
  }

  function _(t, e, n, r) {
    try {
      t.call(e, n, r)
    } catch (o) {
      return o
    }
  }

  function m(t, e, n) {
    K(function (t) {
      var r = !1,
        o = _(n, e, function (n) {
          r || (r = !0, e !== n ? w(t, n) : j(t, n))
        }, function (e) {
          r || (r = !0, x(t, e))
        }, "Settle: " + (t._label || " unknown promise"));
      !r && o && (r = !0, x(t, o))
    }, t)
  }

  function y(t, e) {
    e._state === $ ? j(t, e._result) : e._state === tt ? x(t, e._result) : T(e, void 0, function (e) {
      w(t, e)
    }, function (e) {
      x(t, e)
    })
  }

  function g(t, n) {
    if (n.constructor === t.constructor) y(t, n);
    else {
      var r = v(n);
      r === et ? x(t, et.error) : void 0 === r ? j(t, n) : e(r) ? m(t, n, r) : j(t, n)
    }
  }

  function w(e, n) {
    e === n ? x(e, d()) : t(n) ? g(e, n) : j(e, n)
  }

  function b(t) {
    t._onerror && t._onerror(t._result), A(t)
  }

  function j(t, e) {
    t._state === Z && (t._result = e, t._state = $, 0 !== t._subscribers.length && K(A, t))
  }

  function x(t, e) {
    t._state === Z && (t._state = tt, t._result = e, K(b, t))
  }

  function T(t, e, n, r) {
    var o = t._subscribers,
      s = o.length;
    t._onerror = null, o[s] = e, o[s + $] = n, o[s + tt] = r, 0 === s && t._state && K(A, t)
  }

  function A(t) {
    var e = t._subscribers,
      n = t._state;
    if (0 !== e.length) {
      for (var r, o, s = t._result, i = 0; i < e.length; i += 3) r = e[i], o = e[i + n], r ? P(n, r, o, s) : o(s);
      t._subscribers.length = 0
    }
  }

  function E() {
    this.error = null
  }

  function S(t, e) {
    try {
      return t(e)
    } catch (n) {
      return nt.error = n, nt
    }
  }

  function P(t, n, r, o) {
    var s, i, u, a, c = e(r);
    if (c) {
      if (s = S(r, o), s === nt ? (a = !0, i = s.error, s = null) : u = !0, n === s) return void x(n, h())
    } else s = o, u = !0;
    n._state !== Z || (c && u ? w(n, s) : a ? x(n, i) : t === $ ? j(n, s) : t === tt && x(n, s))
  }

  function M(t, e) {
    try {
      e(function (e) {
        w(t, e)
      }, function (e) {
        x(t, e)
      })
    } catch (n) {
      x(t, n)
    }
  }

  function O(t, e) {
    var n = this;
    n._instanceConstructor = t, n.promise = new t(p), n._validateInput(e) ? (n._input = e, n.length = e.length, n._remaining = e.length, n._init(), 0 === n.length ? j(n.promise, n._result) : (n.length = n.length || 0, n._enumerate(), 0 === n._remaining && j(n.promise, n._result))) : x(n.promise, n._validationError())
  }

  function N(t) {
    return new rt(this, t).promise
  }

  function q(t) {
    function e(t) {
      w(o, t)
    }

    function n(t) {
      x(o, t)
    }
    var r = this,
      o = new r(p);
    if (!U(t)) return x(o, new TypeError("You must pass an array to race.")), o;
    for (var s = t.length, i = 0; o._state === Z && s > i; i++) T(r.resolve(t[i]), void 0, e, n);
    return o
  }

  function C(t) {
    var e = this;
    if (t && "object" == typeof t && t.constructor === e) return t;
    var n = new e(p);
    return w(n, t), n
  }

  function X(t) {
    var e = this,
      n = new e(p);
    return x(n, t), n
  }

  function F() {
    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
  }

  function I() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
  }

  function R(t) {
    this._id = at++, this._state = void 0, this._result = void 0, this._subscribers = [], p !== t && (e(t) || F(), this instanceof R || I(), M(this, t))
  }

  function D() {
    var t;
    if ("undefined" != typeof global) t = global;
    else if ("undefined" != typeof self) t = self;
    else try {
      t = Function("return this")()
    } catch (e) {
      throw new Error("polyfill failed because global object is unavailable in this environment")
    }
    var n = t.Promise;
    (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (t.Promise = ct)
  }
  var H;
  H = Array.isArray ? Array.isArray : function (t) {
    return "[object Array]" === Object.prototype.toString.call(t)
  };
  var L, k, B, U = H,
    Y = 0,
    K = ({}.toString, function (t, e) {
      V[Y] = t, V[Y + 1] = e, Y += 2, 2 === Y && (k ? k(f) : B())
    }),
    J = "undefined" != typeof window ? window : void 0,
    W = J || {},
    z = W.MutationObserver || W.WebKitMutationObserver,
    G = "undefined" != typeof process && "[object process]" === {}.toString.call(process),
    Q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
    V = new Array(1e3);
  B = G ? s() : z ? u() : Q ? a() : void 0 === J && "function" == typeof require ? l() : c();
  var Z = void 0,
    $ = 1,
    tt = 2,
    et = new E,
    nt = new E;
  O.prototype._validateInput = function (t) {
    return U(t)
  }, O.prototype._validationError = function () {
    return new Error("Array Methods must be provided an Array")
  }, O.prototype._init = function () {
    this._result = new Array(this.length)
  };
  var rt = O;
  O.prototype._enumerate = function () {
    for (var t = this, e = t.length, n = t.promise, r = t._input, o = 0; n._state === Z && e > o; o++) t._eachEntry(r[o], o)
  }, O.prototype._eachEntry = function (t, e) {
    var r = this,
      o = r._instanceConstructor;
    n(t) ? t.constructor === o && t._state !== Z ? (t._onerror = null, r._settledAt(t._state, e, t._result)) : r._willSettleAt(o.resolve(t), e) : (r._remaining--, r._result[e] = t)
  }, O.prototype._settledAt = function (t, e, n) {
    var r = this,
      o = r.promise;
    o._state === Z && (r._remaining--, t === tt ? x(o, n) : r._result[e] = n), 0 === r._remaining && j(o, r._result)
  }, O.prototype._willSettleAt = function (t, e) {
    var n = this;
    T(t, void 0, function (t) {
      n._settledAt($, e, t)
    }, function (t) {
      n._settledAt(tt, e, t)
    })
  };
  var ot = N,
    st = q,
    it = C,
    ut = X,
    at = 0,
    ct = R;
  R.all = ot, R.race = st, R.resolve = it, R.reject = ut, R._setScheduler = r, R._setAsap = o, R._asap = K, R.prototype = {
    constructor: R,
    then: function (t, e) {
      var n = this,
        r = n._state;
      if (r === $ && !t || r === tt && !e) return this;
      var o = new this.constructor(p),
        s = n._result;
      if (r) {
        var i = arguments[r - 1];
        K(function () {
          P(r, o, i, s)
        })
      } else T(n, o, t, e);
      return o
    },
    "catch": function (t) {
      return this.then(null, t)
    }
  };
  var ft = D,
    lt = {
      Promise: ct,
      polyfill: ft
    };
  "function" == typeof define && define.amd ? define(function () {
    return lt
  }) : "undefined" != typeof module && module.exports ? module.exports = lt : "undefined" != typeof this && (this.ES6Promise = lt), ft()
}).call(this);
var emailjs = new function () {
  var t = this;
  this.version = "1.4", this.secure = !0, this.server = "api.emailjs.com", this.init = function (e, n, r) {
    t.user_id = e, "undefined" != typeof n && (t.server = n), "undefined" != typeof r && (t.secure = r)
  }, this.send = function (e, n, r, o) {
    var s = t.secure ? "https:" : "http:",
      i = [s, "", t.server, "api/v1.0/email/send"].join("/");
    if (document.getElementById("g-recaptcha-response")) var u = document.getElementById("g-recaptcha-response").value || null;
    return new Promise(function (s, a) {
      var c;
      c = window.XDomainRequest ? new XDomainRequest : window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), c.onreadystatechange = function () {
        4 == c.readyState && 200 == c.status && s({
          status: c.status,
          text: c.responseText
        }), 4 == c.readyState && 200 != c.status && a({
          status: c.status,
          text: c.responseText
        })
      }, c.open("POST", i, !0);
      try {
        c.setRequestHeader("Content-type", "application/json;charset=UTF-8")
      } catch (f) {}
      c.onload = function () {
        200 == c.status || "undefined" == typeof c.status && "OK" == c.responseText ? s({
          status: c.status,
          text: c.responseText
        }) : a({
          status: c.status,
          text: c.responseText
        })
      }, c.onerror = function () {
        a({
          status: c.status,
          text: c.responseText
        })
      }, u && (r["g-recaptcha-response"] = u);
      var l = {
        lib_version: t.version,
        user_id: o || t.user_id,
        service_id: e,
        template_id: n,
        template_params: r
      };
      c.send(JSON.stringify(l))
    })
  }, this.sendForm = function (e, n, r, o) {
    function s(t, e) {
      var n = t.className.split(" ");
      t.className = "";
      for (var r = 0; r < n.length; r++) n[r] != e && (t.className += (t.className ? " " : "") + n[r])
    }

    function i(t, e) {
      for (var n = t.className.split(" "), r = !0, o = 0; o < n.length; o++) n[o] == e && (r = !1);
      r && (t.className += (t.className ? " " : "") + e)
    }
    var u = null,
      a = null,
      c = t.version;
    if ("undefined" != typeof o && o) a = o;
    else {
      if ("undefined" == typeof t.user_id || !t.user_id) throw "Error. User ID not found.";
      a = t.user_id
    }
    if ("undefined" == typeof r || !r) throw "Error. Form id/object not found.";
    if ("string" == typeof r) u = document.getElementById(r);
    else {
      if ("object" != typeof r) throw "Error. invalid form type";
      u = r
    }
    s(u, "emailjs-sending"), s(u, "emailjs-success"), s(u, "emailjs-error");
    var f = t.secure ? "https:" : "http:",
      l = [f, "", t.server, "api/v1.0/email/send-form"].join("/");
    return new Promise(function (t, r) {
      i(u, "emailjs-sending");
      var o = new XMLHttpRequest;
      o.open("POST", l, !0), o.onload = function () {
        s(u, "emailjs-sending"), 200 == this.status ? (i(u, "emailjs-success"), t({
          status: o.status,
          text: o.responseText
        })) : (i(u, "emailjs-error"), r({
          status: o.status,
          text: o.responseText
        }))
      }, o.onerror = function () {
        i(u, "emailjs-error"), r({
          status: o.status,
          text: o.responseText
        })
      };
      var f = new FormData(u);
      f.append("lib_version", c), f.append("user_id", a), f.append("service_id", e), f.append("template_id", n), o.send(f)
    })
  }
};

export default emailjs;
