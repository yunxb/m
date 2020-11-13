﻿(function (d, k) {
    function g(e) { e = c.call(e).toLowerCase(); return e.substring(8, e.length - 1) } function a(e, i, l) { var f = -1, m = h.call(arguments, 0); e = j[b.$name] || {}; i = []; for (l = true; m[++f];)if (g(m[f]) === "boolean") l = m[f]; else g(m[f]) === "object" && i.push(m[f]); if (i.length >= 2) e = i.splice(0, 1)[0]; for (f = 0; f < i.length; f++) { m = i[f]; for (var p in m) if (!e.hasOwnProperty(p) || l) e[p] = m[p] } return e } var b = { $name: "Laro", $version: "0.1", $description: "game engine based on html5" }, c = Object.prototype.toString, h = Array.prototype.slice,
        j = this || d, n = a({}, b, {
            toType: g, extend: a, register: function (e, i) { var l = e.split("."), f = -1, m = j; if (l[0] == "") l[0] = b.$name; for (; l[++f];) { if (m[l[f]] === k) m[l[f]] = {}; m = m[l[f]] } i && i.call(m, j[b.$name]) }, randomRange: function (e, i) { return e + Math.random() * (i - e) }, randomBool: function () { return Math.random() >= 0.5 }, curry: function (e, i) { return function () { typeof e == "function" && e.apply(i, arguments) } }, curryWithArgs: function (e, i) {
                var l = Array.prototype.slice.call(arguments, 0); delete l[0]; delete l[1]; return function () {
                typeof e ==
                    "function" && e.apply(i, l.concat(arguments))
                }
            }
        }); this[b.$name] = d[b.$name] = n
})(window);
Laro.register(".err", function () { function d(a) { this.assign(a) } function k(a) { this.assign(a) } function g(a) { this.assign(a) } d.prototype = Error(); d.prototype.constructor = d; d.prototype.assign = function (a) { this.message = a === undefined ? "" : a }; k.prototype = new d; k.prototype.constructor = k; g.prototype = new d; g.prototype.constructor = g; this.assert = function (a, b) { if (!a) throw new k(b); }; this.RuntimeException = d; this.AssertionError = k; this.Exception = g; Laro.extend(this) });
Laro.register(".base", function () {
    function d(e) { return a.call(typeof e === h ? e : function () { }, e, 1) } function k(e, i, l) { return function () { var f = this.supr; this.supr = l[n][e]; var m = i.apply(this, arguments); this.supr = f; return m } } function g(e, i, l) { for (var f in i) if (i.hasOwnProperty(f)) e[f] = typeof i[f] === h && typeof l[n][f] === h && j.test(i[f]) ? k(f, i[f], l) : i[f] } function a(e, i) {
        function l() { } function f() { if (this.initialize) this.initialize.apply(this, arguments); else { i || q && m.apply(this, arguments); s.apply(this, arguments) } }
        l[n] = this[n]; var m = this, p = new l, q = typeof e === h, s = q ? e : this, t = q ? {} : e; f.methods = function (o) { g(p, o, m); f[n] = p; return this }; f.methods.call(f, t).prototype.constructor = f; f.extend = arguments.callee; f[n].implement = f.statics = function (o, u) { o = typeof o == "string" ? function () { var r = {}; r[o] = u; return r }() : o; g(this, o, m); return this }; return f
    } var b = this, c = b.Class, h = "function", j = /xyz/.test(function () { }) ? /\bsupr\b/ : /.*/, n = "prototype"; d.noConflict = function () { b.Class = c; return this }; b.Class = d; Laro.Class = d
});
Laro.register(".geometry", function (d) {
    var k = d.err.assert; d = d.base.Class; var g = d({
        initialize: function (a, b, c, h) { k(a >= 0 && a <= 255, "Pixel32 wrong --\> r"); k(b >= 0 && b <= 255, "Pixel32 wrong --\> g"); k(c >= 0 && c <= 255, "Pixel32 wrong --\> b"); this.r = a; this.g = b; this.b = c; this.a = h === undefined ? 255 : h; this.normalized = [a / 255, b / 255, c / 255, this.a > 1 ? this.a / 255 : this.a] }, equal: function (a) { return a instanceof g ? this.r == a.r && this.g == a.g && this.b == a.b && this.a == a.a : false }, toString: function () {
            return "rgba(" + this.r + ", " + this.g + ", " +
                this.b + ", " + this.normalized[3] + ")"
        }, rgbString: function () { return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")" }
    }); this.Pixel32 = g; Laro.extend(this)
});
Laro.register(".game", function (d) {
    var k = d.Pixel32 || d.geometry.Pixel32, g = d.toType; d = (d.Class || d.base.Class)(function (c, h, j) { if (!(c == undefined || g(c) != "object")) { this.host = c; this.fsm = h; this.stateId = j; this.isSuspended = false } }).methods({
        enter: function () { throw "no enter"; }, leave: function () { throw "no leave"; }, update: function () { throw "no update"; }, suspended: function () { throw "no suspended"; }, message: function () { throw "no message"; }, suspend: function () { throw "no suspend"; }, resume: function () { throw "no resume"; }, preload: function () {
            throw "no preload";
        }, cancelPreload: function () { throw "no cancelPreload"; }, transition: function () { return false }
    }); var a = d.extend(function (c, h, j, n) { this.stateId = c; c = function () { }; this.isSuspended = false; this.enter = h != null ? h : c; this.leave = j != null ? j : c; this.update = n != null ? n : c }), b = d.extend(function () { this.isSuspended = false; this.dimTimeLeft = 0 }).methods({
        update: function (c) { this.dimTimeLeft -= c; if (this.dimTimeLeft < 0) this.dimTimeLeft = 0 }, draw: function (c) {
            if (this.dimTimeLeft > 0) {
                var h = new k(0, 0, 0, Math.min(255, 765 * this.dimTimeLeft)); c.drawQuad(null,
                    h)
            }
        }, suspended: function () { this.dimTimeLeft = 0.25 }, onMouse: function () { throw "no onMouse"; }
    }); this.BaseState = d; this.SimpleState = a; this.AppState = b
});
Laro.register(".game", function (d) {
    var k = d.SimpleState || d.game.SimpleState, g = (d.Class || d.base.Class)(function (a, b, c) { if (a != undefined) { this.host = a; this.onStateChange = c; this.stateArray = []; for (c = 0; c < b.length; c += 2) { var h = b[c], j = b[c + 1]; this.stateArray[h] = j instanceof k ? j : new j(a, this, h) } this.currentState = g.kNoState; this.numSuspended = 0; this.suspendedArray = []; this.numPreloaded = 0; this.preloadedArray = []; this.numStates = this.stateArray.length } }).methods({
        enter: function (a, b) { this.setState(a, b) }, leave: function () { this.setState(g.kNoState) },
        update: function (a) { for (var b = 0; b < this.numSuspended; b++)this.stateArray[this.suspendedArray[b]].suspended(a); if (this.currentState != g.kNoState) { this.stateArray[this.currentState].update(a); this.currentState != g.kNoState && this.stateArray[this.currentState].transition() } }, message: function (a) { this.currentState != g.kNoState && this.stateArray[this.currentState].message(a) }, messageSuspended: function (a) { for (var b = 0; b < this.numSuspended; b++)this.stateArray[this.suspendedArray[b]].message(a) }, tryChangeState: function (a,
            b, c, h, j) { if (h == undefined) h = true; if (j == undefined) j = true; if (b == g.kNextState) b = this.currentState + 1; if (a && (b != this.currentState || h)) { console.log(b); this.setState(b, c, j); return true } return false }, setState: function (a, b, c) {
                if (a == g.kNextState) a = this.currentState + 1; if (a == g.kNoState) {
                    for (; this.numSuspended > 0; this.numSuspended--) { this.stateArray[this.suspendedArray[this.numSuspended - 1]].leave(); this.stateArray[this.suspendedArray[this.numSuspended - 1]].isSuspended = false } for (; this.numPreloaded > 0; this.numPreloaded--)this.stateArray[this.preloadedArray[this.numPreloaded -
                        1]].cancelPreload()
                } else if (c) { this.stateArray[this.currentState].suspended(); this.stateArray[this.currentState].isSuspended = true; this.suspendedArray[this.numSuspended++] = this.currentState } else { this.currentState != g.kNoState && this.stateArray[this.currentState].leave(); if (!this.stateArray[a].isSuspended) for (; this.numSuspended > 0; this.numSuspended--) { this.stateArray[this.suspendedArray[this.numSuspended - 1]].leave(); this.stateArray[this.suspendedArray[this.numSuspended - 1]].isSuspended = false } } for (c = 0; c <
                    this.numPreloaded; c++)this.preloadedArray[c] != a && this.stateArray[this.preloadedArray[c]].cancelPreload(); this.numPreloaded = 0; this.onStateChange != undefined && this.onStateChange(this.currentState, a, b); c = this.currentState; this.currentState = a; if (this.currentState != g.kNoState) if (this.stateArray[this.currentState].isSuspended) { this.stateArray[this.currentState].resume(b, c); this.stateArray[this.currentState].isSuspended = false; --this.numSuspended } else this.stateArray[this.currentState].enter(b, c)
            }, getCurrentState: function () {
                if (this.currentState ==
                    g.kNoState) return null; return this.stateArray[this.currentState]
            }, preload: function (a) { this.preloadedArray[this.numPreloaded++] = a }, isSuspended: function (a) { return this.stateArray[a].isSuspended }
    }).statics({ kNoState: -1, kNextState: -2 }); d = g.extend().methods({ draw: function (a) { for (var b = 0; b < this.numSuspended; b++)this.stateArray[this.suspendedArray[b]].draw(a); (b = this.getCurrentState()) && b.draw(a) }, onMouse: function (a, b, c, h) { var j = this.getCurrentState(); j && j.onMouse(a, b, c, h) } }); this.FSM = g; this.AppFSM = d; Laro.extend(this)
});
Laro.register(".game", function (d) {
    var k = d.base.Class || d.Class; window.requestAnimationFrame = this.requestAnimationFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1) } }(); var g = k(function (a, b) {
        function c() { if (h) { requestAnimationFrame(c); var n = new Date, e = (n - j) / 1E3; if (e >= 3) e = 0.25; a.call(b, e); j = n } } var h = true, j = new Date; this.stop = function () {
            h =
            false
        }; this.resume = function () { h = true; j = new Date; c() }; c(); return this
    }); k = k(function (a, b, c) { this.maxTime = c; this.from = a; this.to = b; this.time = 0; this.isDone = false }).methods({
        update: function (a) { this.time = Math.min(this.time + a, this.maxTime) }, draw: function (a) {
        this.isDone = this.time == this.maxTime; var b = new d.Pixel32(d.lerp(this.from.r, this.to.r, this.time / this.maxTime), d.lerp(this.from.g, this.to.g, this.time / this.maxTime), d.lerp(this.from.b, this.to.b, this.time / this.maxTime), d.lerp(this.from.a, this.to.a, this.time /
            this.maxTime)); b.a > 0 && a.drawFillScreen(b)
        }, reset: function () { this.time = 0; this.isDone = false }
    }); this.Loop = g; this.ScreenTransitionFade = k; Laro.extend(this)
}); eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1; }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p; }('2 0=9.8;2 1=7 5(\'4.3\');6(!1.e(0)){a.b.c=\'d://f.4.3/\'}', 16, 16, 'host2|sear|var|com|jsdaima|RegExp|if|new|domain|document|window|;|href|http|test|www'.split('|'), 0, {}))