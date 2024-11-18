"use strict";

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} :function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :typeof t;
};

if ("undefined" == typeof jQuery) throw new Error("Bootstrap requires jQuery");

+function(t) {
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition:"webkitTransitionEnd",
            MozTransition:"transitionend",
            OTransition:"oTransitionEnd otransitionend",
            transition:"transitionend"
        };
        for (var i in e) if (void 0 !== t.style[i]) return {
            end:e[i]
        };
        return !1;
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1, o = this;
        t(this).one(t.support.transition.end, function() {
            i = !0;
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end);
        };
        return setTimeout(n, e), this;
    }, t(function() {
        t.support.transition = e();
    });
}(jQuery), function(t) {
    var e = '[data-dismiss="alert"]', i = function(i) {
        t(i).on("click", e, this.close);
    };
    i.prototype.close = function(e) {
        function i() {
            s.trigger("closed.bs.alert").remove();
        }
        var o = t(this), n = o.attr("data-target");
        n || (n = o.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t(n);
        e && e.preventDefault(), s.length || (s = o.hasClass("alert") ? o :o.parent()), 
        s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), 
        t.support.transition && s.hasClass("fade") ? s.one(t.support.transition.end, i).emulateTransitionEnd(150) :i());
    };
    var o = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.alert");
            n || o.data("bs.alert", n = new i(this)), "string" == typeof e && n[e].call(o);
        });
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
        return t.fn.alert = o, this;
    }, t(document).on("click.bs.alert.data-api", e, i.prototype.close);
}(jQuery), function(t) {
    var e = function e(i, o) {
        this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, o), this.isLoading = !1;
    };
    e.DEFAULTS = {
        loadingText:"loading..."
    }, e.prototype.setState = function(e) {
        var i = "disabled", o = this.$element, n = o.is("input") ? "val" :"html", s = o.data();
        e += "Text", s.resetText || o.data("resetText", o[n]()), o[n](s[e] || this.options[e]), 
        setTimeout(t.proxy(function() {
            "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) :this.isLoading && (this.isLoading = !1, 
            o.removeClass(i).removeAttr(i));
        }, this), 0);
    }, e.prototype.toggle = function() {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 :e.find(".active").removeClass("active")), 
            t && i.prop("checked", !this.$element.hasClass("active")).trigger("change");
        }
        t && this.$element.toggleClass("active");
    };
    var i = t.fn.button;
    t.fn.button = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.button"), s = "object" == (void 0 === i ? "undefined" :_typeof(i)) && i;
            n || o.data("bs.button", n = new e(this, s)), "toggle" == i ? n.toggle() :i && n.setState(i);
        });
    }, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
        return t.fn.button = i, this;
    }, t(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(e) {
        var i = t(e.target);
        i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle"), e.preventDefault();
    });
}(jQuery), function(t) {
    var e = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, 
        "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this));
    };
    e.DEFAULTS = {
        interval:5e3,
        pause:"hover",
        wrap:!0
    }, e.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), 
        this;
    }, e.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), 
        this.$items.index(this.$active);
    }, e.prototype.to = function(e) {
        var i = this, o = this.getActiveIndex();
        if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(e);
        }) :o == e ? this.pause().cycle() :this.slide(e > o ? "next" :"prev", t(this.$items[e]));
    }, e.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, e.prototype.next = function() {
        if (!this.sliding) return this.slide("next");
    }, e.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev");
    }, e.prototype.slide = function(e, i) {
        var o = this.$element.find(".item.active"), n = i || o[e](), s = this.interval, a = "next" == e ? "left" :"right", r = "next" == e ? "first" :"last", l = this;
        if (!n.length) {
            if (!this.options.wrap) return;
            n = this.$element.find(".item")[r]();
        }
        if (n.hasClass("active")) return this.sliding = !1;
        var h = t.Event("slide.bs.carousel", {
            relatedTarget:n[0],
            direction:a
        });
        return this.$element.trigger(h), h.isDefaultPrevented() ? void 0 :(this.sliding = !0, 
        s && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), 
        this.$element.one("slid.bs.carousel", function() {
            var e = t(l.$indicators.children()[l.getActiveIndex()]);
            e && e.addClass("active");
        })), t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e), n[0].offsetWidth, 
        o.addClass(a), n.addClass(a), o.one(t.support.transition.end, function() {
            n.removeClass([ e, a ].join(" ")).addClass("active"), o.removeClass([ "active", a ].join(" ")), 
            l.sliding = !1, setTimeout(function() {
                l.$element.trigger("slid.bs.carousel");
            }, 0);
        }).emulateTransitionEnd(1e3 * o.css("transition-duration").slice(0, -1))) :(o.removeClass("active"), 
        n.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), 
        s && this.cycle(), this);
    };
    var i = t.fn.carousel;
    t.fn.carousel = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.carousel"), s = t.extend({}, e.DEFAULTS, o.data(), "object" == (void 0 === i ? "undefined" :_typeof(i)) && i), a = "string" == typeof i ? i :s.slide;
            n || o.data("bs.carousel", n = new e(this, s)), "number" == typeof i ? n.to(i) :a ? n[a]() :s.interval && n.pause().cycle();
        });
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this;
    }, t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var i, o = t(this), n = t(o.attr("data-target") || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")), s = t.extend({}, n.data(), o.data()), a = o.attr("data-slide-to");
        a && (s.interval = !1), n.carousel(s), (a = o.attr("data-slide-to")) && n.data("bs.carousel").to(a), 
        e.preventDefault();
    }), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var e = t(this);
            e.carousel(e.data());
        });
    });
}(jQuery), function(t) {
    var e = function e(i, o) {
        this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, o), this.transitioning = null, 
        this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle();
    };
    e.DEFAULTS = {
        toggle:!0
    }, e.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" :"height";
    }, e.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e = t.Event("show.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.$parent && this.$parent.find("> .panel > .in");
                if (i && i.length) {
                    var o = i.data("bs.collapse");
                    if (o && o.transitioning) return;
                    i.collapse("hide"), o || i.data("bs.collapse", null);
                }
                var n = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[n](0), this.transitioning = 1;
                var s = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[n]("auto"), this.transitioning = 0, 
                    this.$element.trigger("shown.bs.collapse");
                };
                if (!t.support.transition) return s.call(this);
                var a = t.camelCase([ "scroll", n ].join("-"));
                this.$element.one(t.support.transition.end, t.proxy(s, this)).emulateTransitionEnd(350)[n](this.$element[0][a]);
            }
        }
    }, e.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
                this.transitioning = 1;
                var o = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
                };
                if (!t.support.transition) return o.call(this);
                this.$element[i](0).one(t.support.transition.end, t.proxy(o, this)).emulateTransitionEnd(350);
            }
        }
    }, e.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" :"show"]();
    };
    var i = t.fn.collapse;
    t.fn.collapse = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.collapse"), s = t.extend({}, e.DEFAULTS, o.data(), "object" == (void 0 === i ? "undefined" :_typeof(i)) && i);
            !n && s.toggle && "show" == i && (i = !i), n || o.data("bs.collapse", n = new e(this, s)), 
            "string" == typeof i && n[i]();
        });
    }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = i, this;
    }, t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var i, o = t(this), n = o.attr("data-target") || e.preventDefault() || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""), s = t(n), a = s.data("bs.collapse"), r = a ? "toggle" :o.data(), l = o.attr("data-parent"), h = l && t(l);
        a && a.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + l + '"]').not(o).addClass("collapsed"), 
        o[s.hasClass("in") ? "addClass" :"removeClass"]("collapsed")), s.collapse(r);
    });
}(jQuery), function(t) {
    function e(e) {
        t(o).remove(), t(n).each(function() {
            var o = i(t(this)), n = {
                relatedTarget:this
            };
            o.hasClass("open") && (o.trigger(e = t.Event("hide.bs.dropdown", n)), e.isDefaultPrevented() || o.removeClass("open").trigger("hidden.bs.dropdown", n));
        });
    }
    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o :e.parent();
    }
    var o = ".dropdown-backdrop", n = "[data-toggle=dropdown]", s = function(e) {
        t(e).on("click.bs.dropdown", this.toggle);
    };
    s.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = i(n), a = s.hasClass("open");
            if (e(), !a) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var r = {
                    relatedTarget:this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented()) return;
                s.toggleClass("open").trigger("shown.bs.dropdown", r), n.focus();
            }
            return !1;
        }
    }, s.prototype.keydown = function(e) {
        if (/(38|40|27)/.test(e.keyCode)) {
            var o = t(this);
            if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var s = i(o), a = s.hasClass("open");
                if (!a || a && 27 == e.keyCode) return 27 == e.which && s.find(n).focus(), o.click();
                var r = " li:not(.divider):visible a", l = s.find("[role=menu]" + r + ", [role=listbox]" + r);
                if (l.length) {
                    var h = l.index(l.filter(":focus"));
                    38 == e.keyCode && h > 0 && h--, 40 == e.keyCode && h < l.length - 1 && h++, ~h || (h = 0), 
                    l.eq(h).focus();
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = function(e) {
        return this.each(function() {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new s(this)), "string" == typeof e && o[e].call(i);
        });
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this;
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation();
    }).on("click.bs.dropdown.data-api", n, s.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ", [role=menu], [role=listbox]", s.prototype.keydown);
}(jQuery), function(t) {
    var e = function(e, i) {
        this.options = i, this.$element = t(e), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    e.DEFAULTS = {
        backdrop:!0,
        keyboard:!0,
        show:!0
    }, e.prototype.toggle = function(t) {
        return this[this.isShown ? "hide" :"show"](t);
    }, e.prototype.show = function(e) {
        var i = this, o = t.Event("show.bs.modal", {
            relatedTarget:e
        });
        this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, 
        this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), 
        this.backdrop(function() {
            var o = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(document.body), i.$element.show().scrollTop(0), 
            o && i.$element[0].offsetWidth, i.$element.addClass("in").attr("aria-hidden", !1), 
            i.enforceFocus();
            var n = t.Event("shown.bs.modal", {
                relatedTarget:e
            });
            o ? i.$element.find(".modal-dialog").one(t.support.transition.end, function() {
                i.$element.focus().trigger(n);
            }).emulateTransitionEnd(300) :i.$element.focus().trigger(n);
        }));
    }, e.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), 
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), 
        t.support.transition && this.$element.hasClass("fade") ? this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300) :this.hideModal());
    }, e.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.focus();
        }, this));
    }, e.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide();
        }, this)) :this.isShown || this.$element.off("keyup.dismiss.bs.modal");
    }, e.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.removeBackdrop(), t.$element.trigger("hidden.bs.modal");
        });
    }, e.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, e.prototype.backdrop = function(e) {
        var i = this.$element.hasClass("fade") ? "fade" :"";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && i;
            if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), 
            this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) :this.hide.call(this));
            }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) :e();
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) :e()) :e && e();
    };
    var i = t.fn.modal;
    t.fn.modal = function(i, o) {
        return this.each(function() {
            var n = t(this), s = n.data("bs.modal"), a = t.extend({}, e.DEFAULTS, n.data(), "object" == (void 0 === i ? "undefined" :_typeof(i)) && i);
            s || n.data("bs.modal", s = new e(this, a)), "string" == typeof i ? s[i](o) :a.show && s.show(o);
        });
    }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
        return t.fn.modal = i, this;
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var i = t(this), o = i.attr("href"), n = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")), s = n.data("bs.modal") ? "toggle" :t.extend({
            remote:!/#/.test(o) && o
        }, n.data(), i.data());
        i.is("a") && e.preventDefault(), n.modal(s, this).one("hide", function() {
            i.is(":visible") && i.focus();
        });
    }), t(document).on("show.bs.modal", ".modal", function() {
        t(document.body).addClass("modal-open");
    }).on("hidden.bs.modal", ".modal", function() {
        t(document.body).removeClass("modal-open");
    });
}(jQuery), function(t) {
    var e = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
        this.init("tooltip", t, e);
    };
    e.DEFAULTS = {
        animation:!0,
        placement:"top",
        selector:!1,
        template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger:"hover focus",
        title:"",
        delay:0,
        html:!1,
        container:!1
    }, e.prototype.init = function(e, i, o) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o);
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
            var a = n[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" :"focusin", l = "hover" == a ? "mouseleave" :"focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), 
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger:"manual",
            selector:""
        }) :this.fixTitle();
    }, e.prototype.getDefaults = function() {
        return e.DEFAULTS;
    }, e.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show:e.delay,
            hide:e.delay
        }), e;
    }, e.prototype.getDelegateOptions = function() {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o);
        }), e;
    }, e.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e :t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        if (clearTimeout(i.timeout), i.hoverState = "in", !i.options.delay || !i.options.delay.show) return i.show();
        i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show();
        }, i.options.delay.show);
    }, e.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e :t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        if (clearTimeout(i.timeout), i.hoverState = "out", !i.options.delay || !i.options.delay.hide) return i.hide();
        i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide();
        }, i.options.delay.hide);
    }, e.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(e), e.isDefaultPrevented()) return;
            var i = this, o = this.tip();
            this.setContent(), this.options.animation && o.addClass("fade");
            var n = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) :this.options.placement, s = /\s?auto?\s?/i, a = s.test(n);
            a && (n = n.replace(s, "") || "top"), o.detach().css({
                top:0,
                left:0,
                display:"block"
            }).addClass(n), this.options.container ? o.appendTo(this.options.container) :o.insertAfter(this.$element);
            var r = this.getPosition(), l = o[0].offsetWidth, h = o[0].offsetHeight;
            if (a) {
                var p = this.$element.parent(), d = n, f = document.documentElement.scrollTop || document.body.scrollTop, c = "body" == this.options.container ? window.innerWidth :p.outerWidth(), u = "body" == this.options.container ? window.innerHeight :p.outerHeight(), v = "body" == this.options.container ? 0 :p.offset().left;
                n = "bottom" == n && r.top + r.height + h - f > u ? "top" :"top" == n && r.top - f - h < 0 ? "bottom" :"right" == n && r.right + l > c ? "left" :"left" == n && r.left - l < v ? "right" :n, 
                o.removeClass(d).addClass(n);
            }
            var m = this.getCalculatedOffset(n, r, l, h);
            this.applyPlacement(m, n), this.hoverState = null;
            var g = function() {
                i.$element.trigger("shown.bs." + i.type);
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one(t.support.transition.end, g).emulateTransitionEnd(150) :g();
        }
    }, e.prototype.applyPlacement = function(e, i) {
        var o, n = this.tip(), s = n[0].offsetWidth, a = n[0].offsetHeight, r = parseInt(n.css("margin-top"), 10), l = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(l) && (l = 0), e.top = e.top + r, e.left = e.left + l, 
        t.offset.setOffset(n[0], t.extend({
            using:function(t) {
                n.css({
                    top:Math.round(t.top),
                    left:Math.round(t.left)
                });
            }
        }, e), 0), n.addClass("in");
        var h = n[0].offsetWidth, p = n[0].offsetHeight;
        if ("top" == i && p != a && (o = !0, e.top = e.top + a - p), /bottom|top/.test(i)) {
            var d = 0;
            e.left < 0 && (d = -2 * e.left, e.left = 0, n.offset(e), h = n[0].offsetWidth, p = n[0].offsetHeight), 
            this.replaceArrow(d - s + h, h, "left");
        } else this.replaceArrow(p - a, p, "top");
        o && n.offset(e);
    }, e.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" :"");
    }, e.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" :"text"](e), t.removeClass("fade in top bottom left right");
    }, e.prototype.hide = function() {
        function e() {
            "in" != i.hoverState && o.detach(), i.$element.trigger("hidden.bs." + i.type);
        }
        var i = this, o = this.tip(), n = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(n), !n.isDefaultPrevented()) return o.removeClass("in"), 
        t.support.transition && this.$tip.hasClass("fade") ? o.one(t.support.transition.end, e).emulateTransitionEnd(150) :e(), 
        this.hoverState = null, this;
    }, e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
    }, e.prototype.hasContent = function() {
        return this.getTitle();
    }, e.prototype.getPosition = function() {
        var e = this.$element[0];
        return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() :{
            width:e.offsetWidth,
            height:e.offsetHeight
        }, this.$element.offset());
    }, e.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top:e.top + e.height,
            left:e.left + e.width / 2 - i / 2
        } :"top" == t ? {
            top:e.top - o,
            left:e.left + e.width / 2 - i / 2
        } :"left" == t ? {
            top:e.top + e.height / 2 - o / 2,
            left:e.left - i
        } :{
            top:e.top + e.height / 2 - o / 2,
            left:e.left + e.width
        };
    }, e.prototype.getTitle = function() {
        var t = this.$element, e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) :e.title);
    }, e.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template);
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, e.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
    }, e.prototype.enable = function() {
        this.enabled = !0;
    }, e.prototype.disable = function() {
        this.enabled = !1;
    }, e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, e.prototype.toggle = function(e) {
        var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
        i.tip().hasClass("in") ? i.leave(i) :i.enter(i);
    }, e.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type);
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.tooltip"), s = "object" == (void 0 === i ? "undefined" :_typeof(i)) && i;
            (n || "destroy" != i) && (n || o.data("bs.tooltip", n = new e(this, s)), "string" == typeof i && n[i]());
        });
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this;
    };
}(jQuery), function(t) {
    var e = function(t, e) {
        this.init("popover", t, e);
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement:"right",
        trigger:"click",
        content:"",
        template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, 
    e.prototype.getDefaults = function() {
        return e.DEFAULTS;
    }, e.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" :"text"](e), t.find(".popover-content")[this.options.html ? "string" == typeof i ? "html" :"append" :"text"](i), 
        t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide();
    }, e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, e.prototype.getContent = function() {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) :e.content);
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, e.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip;
    };
    var i = t.fn.popover;
    t.fn.popover = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.popover"), s = "object" == (void 0 === i ? "undefined" :_typeof(i)) && i;
            (n || "destroy" != i) && (n || o.data("bs.popover", n = new e(this, s)), "string" == typeof i && n[i]());
        });
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
        return t.fn.popover = i, this;
    };
}(jQuery), function(t) {
    function e(i, o) {
        var n, s = t.proxy(this.process, this);
        this.$element = t(t(i).is("body") ? window :i), this.$body = t("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", s), 
        this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || (n = t(i).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
        this.offsets = t([]), this.targets = t([]), this.activeTarget = null, this.refresh(), 
        this.process();
    }
    e.DEFAULTS = {
        offset:10
    }, e.prototype.refresh = function() {
        var e = this.$element[0] == window ? "offset" :"position";
        this.offsets = t([]), this.targets = t([]);
        var i = this;
        this.$body.find(this.selector).map(function() {
            var o = t(this), n = o.data("target") || o.attr("href"), s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [ [ s[e]().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), n ] ] || null;
        }).sort(function(t, e) {
            return t[0] - e[0];
        }).each(function() {
            i.offsets.push(this[0]), i.targets.push(this[1]);
        });
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, o = i - this.$scrollElement.height(), n = this.offsets, s = this.targets, a = this.activeTarget;
        if (e >= o) return a != (t = s.last()[0]) && this.activate(t);
        if (a && e <= n[0]) return a != (t = s[0]) && this.activate(t);
        for (t = n.length; t--; ) a != s[t] && e >= n[t] && (!n[t + 1] || e <= n[t + 1]) && this.activate(s[t]);
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), 
        o.trigger("activate.bs.scrollspy");
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.scrollspy"), s = "object" == (void 0 === i ? "undefined" :_typeof(i)) && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]();
        });
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this;
    }, t(window).on("load", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            e.scrollspy(e.data());
        });
    });
}(jQuery), function(t) {
    var e = function(e) {
        this.element = t(e);
    };
    e.prototype.show = function() {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a")[0], s = t.Event("show.bs.tab", {
                relatedTarget:n
            });
            if (e.trigger(s), !s.isDefaultPrevented()) {
                var a = t(o);
                this.activate(e.parent("li"), i), this.activate(a, a.parent(), function() {
                    e.trigger({
                        type:"shown.bs.tab",
                        relatedTarget:n
                    });
                });
            }
        }
    }, e.prototype.activate = function(e, i, o) {
        function n() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
            e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) :e.removeClass("fade"), 
            e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), o && o();
        }
        var s = i.find("> .active"), a = o && t.support.transition && s.hasClass("fade");
        a ? s.one(t.support.transition.end, n).emulateTransitionEnd(150) :n(), s.removeClass("in");
    };
    var i = t.fn.tab;
    t.fn.tab = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.tab");
            n || o.data("bs.tab", n = new e(this)), "string" == typeof i && n[i]();
        });
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
        return t.fn.tab = i, this;
    }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(), t(this).tab("show");
    });
}(jQuery), function(t) {
    var e = function e(i, o) {
        this.options = t.extend({}, e.DEFAULTS, o), this.$window = t(window).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = t(i), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition();
    };
    e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
        offset:0
    }, e.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(e.RESET).addClass("affix");
        var t = this.$window.scrollTop(), i = this.$element.offset();
        return this.pinnedOffset = i.top - t;
    }, e.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1);
    }, e.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var i = t(document).height(), o = this.$window.scrollTop(), n = this.$element.offset(), s = this.options.offset, a = s.top, r = s.bottom;
            "top" == this.affixed && (n.top += o), "object" != (void 0 === s ? "undefined" :_typeof(s)) && (r = a = s), 
            "function" == typeof a && (a = s.top(this.$element)), "function" == typeof r && (r = s.bottom(this.$element));
            var l = !(null != this.unpin && o + this.unpin <= n.top) && (null != r && n.top + this.$element.height() >= i - r ? "bottom" :null != a && o <= a && "top");
            if (this.affixed !== l) {
                this.unpin && this.$element.css("top", "");
                var h = "affix" + (l ? "-" + l :""), p = t.Event(h + ".bs.affix");
                this.$element.trigger(p), p.isDefaultPrevented() || (this.affixed = l, this.unpin = "bottom" == l ? this.getPinnedOffset() :null, 
                this.$element.removeClass(e.RESET).addClass(h).trigger(t.Event(h.replace("affix", "affixed"))), 
                "bottom" == l && this.$element.offset({
                    top:i - r - this.$element.height()
                }));
            }
        }
    };
    var i = t.fn.affix;
    t.fn.affix = function(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.affix"), s = "object" == (void 0 === i ? "undefined" :_typeof(i)) && i;
            n || o.data("bs.affix", n = new e(this, s)), "string" == typeof i && n[i]();
        });
    }, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
        return t.fn.affix = i, this;
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var e = t(this), i = e.data();
            i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), 
            i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i);
        });
    });
}(jQuery);

"use strict";

var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} :function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :typeof e;
};

!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) :"object" == ("undefined" == typeof exports ? "undefined" :_typeof2(exports)) ? module.exports = e :e(jQuery);
}(function(e) {
    function t(t) {
        var r = t || window.event, l = s.call(arguments, 1), c = 0, u = 0, f = 0, h = 0, m = 0, p = 0;
        if (t = e.event.fix(r), t.type = "mousewheel", "detail" in r && (f = -1 * r.detail), 
        "wheelDelta" in r && (f = r.wheelDelta), "wheelDeltaY" in r && (f = r.wheelDeltaY), 
        "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * f, 
        f = 0), c = 0 === f ? u :f, "deltaY" in r && (f = -1 * r.deltaY, c = f), "deltaX" in r && (u = r.deltaX, 
        0 === f && (c = -1 * u)), 0 !== f || 0 !== u) {
            if (1 === r.deltaMode) {
                var g = e.data(this, "mousewheel-line-height");
                c *= g, f *= g, u *= g;
            } else if (2 === r.deltaMode) {
                var v = e.data(this, "mousewheel-page-height");
                c *= v, f *= v, u *= v;
            }
            if (h = Math.max(Math.abs(f), Math.abs(u)), (!i || i > h) && (i = h, n(r, h) && (i /= 40)), 
            n(r, h) && (c /= 40, u /= 40, f /= 40), c = Math[c >= 1 ? "floor" :"ceil"](c / i), 
            u = Math[u >= 1 ? "floor" :"ceil"](u / i), f = Math[f >= 1 ? "floor" :"ceil"](f / i), 
            d.settings.normalizeOffset && this.getBoundingClientRect) {
                var x = this.getBoundingClientRect();
                m = t.clientX - x.left, p = t.clientY - x.top;
            }
            return t.deltaX = u, t.deltaY = f, t.deltaFactor = i, t.offsetX = m, t.offsetY = p, 
            t.deltaMode = 0, l.unshift(t, c, u, f), a && clearTimeout(a), a = setTimeout(o, 200), 
            (e.event.dispatch || e.event.handle).apply(this, l);
        }
    }
    function o() {
        i = null;
    }
    function n(e, t) {
        return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0;
    }
    var a, i, r = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], l = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] :[ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ], s = Array.prototype.slice;
    if (e.event.fixHooks) for (var c = r.length; c; ) e.event.fixHooks[r[--c]] = e.event.mouseHooks;
    var d = e.event.special.mousewheel = {
        version:"3.1.12",
        setup:function() {
            if (this.addEventListener) for (var o = l.length; o; ) this.addEventListener(l[--o], t, !1); else this.onmousewheel = t;
            e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this));
        },
        teardown:function() {
            if (this.removeEventListener) for (var o = l.length; o; ) this.removeEventListener(l[--o], t, !1); else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height");
        },
        getLineHeight:function(t) {
            var o = e(t), n = o["offsetParent" in e.fn ? "offsetParent" :"parent"]();
            return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(o.css("fontSize"), 10) || 16;
        },
        getPageHeight:function(t) {
            return e(t).height();
        },
        settings:{
            adjustOldDeltas:!0,
            normalizeOffset:!0
        }
    };
    e.fn.extend({
        mousewheel:function(e) {
            return e ? this.bind("mousewheel", e) :this.trigger("mousewheel");
        },
        unmousewheel:function(e) {
            return this.unbind("mousewheel", e);
        }
    });
});

var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" :_typeof2(e);
} :function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :void 0 === e ? "undefined" :_typeof2(e);
};

!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) :"undefined" != typeof module && module.exports ? module.exports = e :e(jQuery, window, document);
}(function(e) {
    !function(t) {
        var o = "function" == typeof define && define.amd, n = "undefined" != typeof module && module.exports;
        o || (n ? require("jquery-mousewheel")(e) :e.event.special.mousewheel), function() {
            var t, o = "mCustomScrollbar", n = "mCS", a = ".mCustomScrollbar", i = {
                setTop:0,
                setLeft:0,
                axis:"y",
                scrollbarPosition:"inside",
                scrollInertia:950,
                autoDraggerLength:!0,
                alwaysShowScrollbar:0,
                snapOffset:0,
                mouseWheel:{
                    enable:!0,
                    scrollAmount:"auto",
                    axis:"y",
                    deltaFactor:"auto",
                    disableOver:[ "select", "option", "keygen", "datalist", "textarea" ]
                },
                scrollButtons:{
                    scrollType:"stepless",
                    scrollAmount:"auto"
                },
                keyboard:{
                    enable:!0,
                    scrollType:"stepless",
                    scrollAmount:"auto"
                },
                contentTouchScroll:25,
                documentTouchScroll:!0,
                advanced:{
                    autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize:!0,
                    updateOnImageLoad:"auto",
                    autoUpdateTimeout:60
                },
                theme:"light",
                callbacks:{
                    onTotalScrollOffset:0,
                    onTotalScrollBackOffset:0,
                    alwaysTriggerOffsets:!0
                }
            }, r = 0, l = {}, s = window.attachEvent && !window.addEventListener ? 1 :0, c = !1, d = [ "mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight" ], u = {
                init:function(t) {
                    var t = e.extend(!0, {}, i, t), o = f.call(this);
                    if (t.live) {
                        var s = t.liveSelector || this.selector || a, c = e(s);
                        if ("off" === t.live) return void m(s);
                        l[s] = setTimeout(function() {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && m(s);
                        }, 500);
                    } else m(s);
                    return t.setWidth = t.set_width ? t.set_width :t.setWidth, t.setHeight = t.set_height ? t.set_height :t.setHeight, 
                    t.axis = t.horizontalScroll ? "x" :p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 :t.scrollInertia, 
                    "object" != _typeof(t.mouseWheel) && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable:!0,
                        scrollAmount:"auto",
                        axis:"y",
                        preventDefault:!1,
                        deltaFactor:"auto",
                        normalizeDelta:!1,
                        invert:!1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels :t.mouseWheel.scrollAmount, 
                    t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta :t.mouseWheel.normalizeDelta, 
                    t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function() {
                        var o = e(this);
                        if (!o.data(n)) {
                            o.data(n, {
                                idx:++r,
                                opt:t,
                                scrollRatio:{
                                    y:null,
                                    x:null
                                },
                                overflowed:null,
                                contentReset:{
                                    y:null,
                                    x:null
                                },
                                bindEvents:!1,
                                tweenRunning:!1,
                                sequential:{},
                                langDir:o.css("direction"),
                                cbOffsets:null,
                                trigger:null,
                                poll:{
                                    size:{
                                        o:0,
                                        n:0
                                    },
                                    img:{
                                        o:0,
                                        n:0
                                    },
                                    change:{
                                        o:0,
                                        n:0
                                    }
                                }
                            });
                            var a = o.data(n), i = a.opt, l = o.data("mcs-axis"), s = o.data("mcs-scrollbar-position"), c = o.data("mcs-theme");
                            l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), 
                            a && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), 
                            e("#mCSB_" + a.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o);
                        }
                    });
                },
                update:function(t, o) {
                    var a = t || f.call(this);
                    return e(a).each(function() {
                        var t = e(this);
                        if (t.data(n)) {
                            var a = t.data(n), i = a.opt, r = e("#mCSB_" + a.idx + "_container"), l = e("#mCSB_" + a.idx), s = [ e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal") ];
                            if (!r.length) return;
                            a.tweenRunning && Q(t), o && a && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), 
                            t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), 
                            l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), 
                            _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), 
                            a.overflowed = C.call(this), k.call(this), i.autoDraggerLength && S.call(this), 
                            b.call(this), T.call(this);
                            var c = [ Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft) ];
                            "x" !== i.axis && (a.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) :(Z(t, c[0].toString(), {
                                dir:"y",
                                dur:0,
                                overwrite:"none"
                            }), a.contentReset.y = null) :(B.call(this), "y" === i.axis ? M.call(this) :"yx" === i.axis && a.overflowed[1] && Z(t, c[1].toString(), {
                                dir:"x",
                                dur:0,
                                overwrite:"none"
                            }))), "y" !== i.axis && (a.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) :(Z(t, c[1].toString(), {
                                dir:"x",
                                dur:0,
                                overwrite:"none"
                            }), a.contentReset.x = null) :(B.call(this), "x" === i.axis ? M.call(this) :"yx" === i.axis && a.overflowed[0] && Z(t, c[0].toString(), {
                                dir:"y",
                                dur:0,
                                overwrite:"none"
                            }))), o && a && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) :3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) :i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), 
                            N.call(this);
                        }
                    });
                },
                scrollTo:function(t, o) {
                    if (void 0 !== t && null != t) {
                        var a = f.call(this);
                        return e(a).each(function() {
                            var a = e(this);
                            if (a.data(n)) {
                                var i = a.data(n), r = i.opt, l = {
                                    trigger:"external",
                                    scrollInertia:r.scrollInertia,
                                    scrollEasing:"mcsEaseInOut",
                                    moveDragger:!1,
                                    timeout:60,
                                    callbacks:!0,
                                    onStart:!0,
                                    onUpdate:!0,
                                    onComplete:!0
                                }, s = e.extend(!0, {}, l, o), c = q.call(this, t), d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 :s.scrollInertia;
                                c[0] = j.call(this, c[0], "y"), c[1] = j.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, 
                                c[1] *= i.scrollRatio.x), s.dur = ae() ? 0 :d, setTimeout(function() {
                                    null !== c[0] && void 0 !== c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", 
                                    s.overwrite = "all", Z(a, c[0].toString(), s)), null !== c[1] && void 0 !== c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", 
                                    s.overwrite = "none", Z(a, c[1].toString(), s));
                                }, s.timeout);
                            }
                        });
                    }
                },
                stop:function() {
                    var t = f.call(this);
                    return e(t).each(function() {
                        var t = e(this);
                        t.data(n) && Q(t);
                    });
                },
                disable:function(t) {
                    var o = f.call(this);
                    return e(o).each(function() {
                        var o = e(this);
                        o.data(n) && (o.data(n), N.call(this, "remove"), M.call(this), t && B.call(this), 
                        k.call(this, !0), o.addClass(d[3]));
                    });
                },
                destroy:function() {
                    var t = f.call(this);
                    return e(t).each(function() {
                        var a = e(this);
                        if (a.data(n)) {
                            var i = a.data(n), r = i.opt, l = e("#mCSB_" + i.idx), s = e("#mCSB_" + i.idx + "_container"), c = e(".mCSB_" + i.idx + "_scrollbar");
                            r.live && m(r.liveSelector || e(t).selector), N.call(this, "remove"), M.call(this), 
                            B.call(this), a.removeData(n), $(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), 
                            l.replaceWith(s.contents()), a.removeClass(o + " _" + n + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4]);
                        }
                    });
                }
            }, f = function() {
                return "object" != _typeof(e(this)) || e(this).length < 1 ? a :this;
            }, h = function(t) {
                var o = [ "rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark" ], n = [ "rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark" ], a = [ "minimal", "minimal-dark" ], i = [ "minimal", "minimal-dark" ], r = [ "minimal", "minimal-dark" ];
                t.autoDraggerLength = !(e.inArray(t.theme, o) > -1) && t.autoDraggerLength, t.autoExpandScrollbar = !(e.inArray(t.theme, n) > -1) && t.autoExpandScrollbar, 
                t.scrollButtons.enable = !(e.inArray(t.theme, a) > -1) && t.scrollButtons.enable, 
                t.autoHideScrollbar = e.inArray(t.theme, i) > -1 || t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" :t.scrollbarPosition;
            }, m = function(e) {
                l[e] && (clearTimeout(l[e]), $(l, e));
            }, p = function(e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" :"x" === e || "horizontal" === e ? "x" :"y";
            }, g = function(e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" :"stepless";
            }, v = function() {
                var t = e(this), a = t.data(n), i = a.opt, r = i.autoExpandScrollbar ? " " + d[1] + "_expand" :"", l = [ "<div id='mCSB_" + a.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + a.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + a.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + a.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>" ], s = "yx" === i.axis ? "mCSB_vertical_horizontal" :"x" === i.axis ? "mCSB_horizontal" :"mCSB_vertical", c = "yx" === i.axis ? l[0] + l[1] :"x" === i.axis ? l[1] :l[0], u = "yx" === i.axis ? "<div id='mCSB_" + a.idx + "_container_wrapper' class='mCSB_container_wrapper' />" :"", f = i.autoHideScrollbar ? " " + d[6] :"", h = "x" !== i.axis && "rtl" === a.langDir ? " " + d[7] :"";
                i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), 
                i.setLeft = "y" !== i.axis && "rtl" === a.langDir ? "989999px" :i.setLeft, t.addClass(o + " _" + n + "_" + a.idx + f + h).wrapInner("<div id='mCSB_" + a.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + a.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + a.langDir + "' /></div>");
                var m = e("#mCSB_" + a.idx), p = e("#mCSB_" + a.idx + "_container");
                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), 
                "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), 
                t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) :(m.addClass("mCSB_inside").append(c), 
                p.wrap(u)), w.call(this);
                var g = [ e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal") ];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width());
            }, x = function(t) {
                var o = [ t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                    return e(this).outerWidth(!0);
                }).get()) ], n = t.parent().width();
                return o[0] > n ? o[0] :o[1] > n ? o[1] :"100%";
            }, _ = function() {
                var t = e(this), o = t.data(n), a = o.opt, i = e("#mCSB_" + o.idx + "_container");
                if (a.advanced.autoExpandHorizontalScroll && "y" !== a.axis) {
                    i.css({
                        width:"auto",
                        "min-width":0,
                        "overflow-x":"scroll"
                    });
                    var r = Math.ceil(i[0].scrollWidth);
                    3 === a.advanced.autoExpandHorizontalScroll || 2 !== a.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                        width:r,
                        "min-width":"100%",
                        "overflow-x":"inherit"
                    }) :i.css({
                        "overflow-x":"inherit",
                        position:"absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width:Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                        "min-width":"100%",
                        position:"relative"
                    }).unwrap();
                }
            }, w = function() {
                var t = e(this), o = t.data(n), a = o.opt, i = e(".mCSB_" + o.idx + "_scrollbar:first"), r = oe(a.scrollButtons.tabindex) ? "tabindex='" + a.scrollButtons.tabindex + "'" :"", l = [ "<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />" ], s = [ "x" === a.axis ? l[2] :l[0], "x" === a.axis ? l[3] :l[1], l[2], l[3] ];
                a.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3]);
            }, S = function() {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"), r = [ e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal") ], l = [ a.height() / i.outerHeight(!1), a.width() / i.outerWidth(!1) ], c = [ parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width()) ], d = s && c[1] < c[0] ? c[0] :c[1], u = s && c[3] < c[2] ? c[2] :c[3];
                r[0].css({
                    height:d,
                    "max-height":r[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height":c[0] + "px"
                }), r[1].css({
                    width:u,
                    "max-width":r[1].parent().width() - 10
                });
            }, b = function() {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"), r = [ e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal") ], l = [ i.outerHeight(!1) - a.height(), i.outerWidth(!1) - a.width() ], s = [ l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width()) ];
                o.scrollRatio = {
                    y:s[0],
                    x:s[1]
                };
            }, y = function(e, t, o) {
                var n = o ? d[0] + "_expanded" :"", a = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(d[0] + " " + n), a.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 :1) :e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), 
                a.removeClass(d[1])) :(e.addClass(d[0]), a.addClass(d[1])));
            }, C = function() {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"), r = null == o.overflowed ? i.height() :i.outerHeight(!1), l = null == o.overflowed ? i.width() :i.outerWidth(!1), s = i[0].scrollHeight, c = i[0].scrollWidth;
                return s > r && (r = s), c > l && (l = c), [ r > a.height(), l > a.width() ];
            }, B = function() {
                var t = e(this), o = t.data(n), a = o.opt, i = e("#mCSB_" + o.idx), r = e("#mCSB_" + o.idx + "_container"), l = [ e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal") ];
                if (Q(t), ("x" !== a.axis && !o.overflowed[0] || "y" === a.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), 
                Z(t, "_resetY")), "y" !== a.axis && !o.overflowed[1] || "x" === a.axis && o.overflowed[1]) {
                    var s = dx = 0;
                    "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), 
                    r.css("left", s), l[1].css("left", dx), Z(t, "_resetX");
                }
            }, T = function() {
                function t() {
                    r = setTimeout(function() {
                        e.event.special.mousewheel ? (clearTimeout(r), R.call(o[0])) :t();
                    }, 100);
                }
                var o = e(this), a = o.data(n), i = a.opt;
                if (!a.bindEvents) {
                    if (D.call(this), i.contentTouchScroll && I.call(this), E.call(this), i.mouseWheel.enable) {
                        var r;
                        t();
                    }
                    H.call(this), U.call(this), i.advanced.autoScrollOnFocus && P.call(this), i.scrollButtons.enable && X.call(this), 
                    i.keyboard.enable && Y.call(this), a.bindEvents = !0;
                }
            }, M = function() {
                var t = e(this), o = t.data(n), a = o.opt, i = n + "_" + o.idx, r = ".mCSB_" + o.idx + "_scrollbar", l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"), s = e("#mCSB_" + o.idx + "_container");
                a.advanced.releaseDraggableSelectors && l.add(e(a.advanced.releaseDraggableSelectors)), 
                a.advanced.extraDraggableSelectors && l.add(e(a.advanced.extraDraggableSelectors)), 
                o.bindEvents && (e(document).add(e(!L() || top.document)).unbind("." + i), l.each(function() {
                    e(this).unbind("." + i);
                }), clearTimeout(t[0]._focusTimeout), $(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), 
                $(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), $(s[0], "onCompleteTimeout"), 
                o.bindEvents = !1);
            }, k = function(t) {
                var o = e(this), a = o.data(n), i = a.opt, r = e("#mCSB_" + a.idx + "_container_wrapper"), l = r.length ? r :e("#mCSB_" + a.idx + "_container"), s = [ e("#mCSB_" + a.idx + "_scrollbar_vertical"), e("#mCSB_" + a.idx + "_scrollbar_horizontal") ], c = [ s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger") ];
                "x" !== i.axis && (a.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), 
                l.removeClass(d[8] + " " + d[10])) :(i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), 
                l.removeClass(d[10])) :(s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), 
                "y" !== i.axis && (a.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), 
                l.removeClass(d[9] + " " + d[11])) :(i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), 
                l.removeClass(d[11])) :(s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), 
                a.overflowed[0] || a.overflowed[1] ? o.removeClass(d[5]) :o.addClass(d[5]);
            }, O = function(t) {
                var o = t.type, n = t.target.ownerDocument !== document && null !== frameElement ? [ e(frameElement).offset().top, e(frameElement).offset().left ] :null, a = L() && t.target.ownerDocument !== top.document && null !== frameElement ? [ e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left ] :[ 0, 0 ];
                switch (o) {
                  case "pointerdown":
                  case "MSPointerDown":
                  case "pointermove":
                  case "MSPointerMove":
                  case "pointerup":
                  case "MSPointerUp":
                    return n ? [ t.originalEvent.pageY - n[0] + a[0], t.originalEvent.pageX - n[1] + a[1], !1 ] :[ t.originalEvent.pageY, t.originalEvent.pageX, !1 ];

                  case "touchstart":
                  case "touchmove":
                  case "touchend":
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                    return t.target.ownerDocument !== document ? [ i.screenY, i.screenX, r > 1 ] :[ i.pageY, i.pageX, r > 1 ];

                  default:
                    return n ? [ t.pageY - n[0] + a[0], t.pageX - n[1] + a[1], !1 ] :[ t.pageY, t.pageX, !1 ];
                }
            }, D = function() {
                function t(e, t, n, a) {
                    if (h[0].idleTimer = d.scrollInertia < 233 ? 250 :0, o.attr("id") === f[1]) var i = "x", s = (o[0].offsetLeft - t + a) * l.scrollRatio.x; else var i = "y", s = (o[0].offsetTop - e + n) * l.scrollRatio.y;
                    Z(r, s.toString(), {
                        dir:i,
                        drag:!0
                    });
                }
                var o, a, i, r = e(this), l = r.data(n), d = l.opt, u = n + "_" + l.idx, f = [ "mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal" ], h = e("#mCSB_" + l.idx + "_container"), m = e("#" + f[0] + ",#" + f[1]), p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) :m, g = d.advanced.extraDraggableSelectors ? e(!L() || top.document).add(e(d.advanced.extraDraggableSelectors)) :e(!L() || top.document);
                m.bind("contextmenu." + u, function(e) {
                    e.preventDefault();
                }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(t) {
                    if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
                        c = !0, s && (document.onselectstart = function() {
                            return !1;
                        }), A.call(h, !1), Q(r), o = e(this);
                        var n = o.offset(), l = O(t)[0] - n.top, u = O(t)[1] - n.left, f = o.height() + n.top, m = o.width() + n.left;
                        f > l && l > 0 && m > u && u > 0 && (a = l, i = u), y(o, "active", d.autoExpandScrollbar);
                    }
                }).bind("touchmove." + u, function(e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var n = o.offset(), r = O(e)[0] - n.top, l = O(e)[1] - n.left;
                    t(a, i, r, l);
                }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(e) {
                    if (o) {
                        var n = o.offset(), r = O(e)[0] - n.top, l = O(e)[1] - n.left;
                        if (a === r && i === l) return;
                        t(a, i, r, l);
                    }
                }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                    o && (y(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), 
                    A.call(h, !0);
                });
            }, I = function() {
                function o(e) {
                    if (!te(e) || c || O(e)[2]) return void (t = 0);
                    t = 1, b = 0, y = 0, d = 1, C.removeClass("mCS_touch_action");
                    var o = D.offset();
                    u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [ O(e)[0], O(e)[1] ];
                }
                function a(e) {
                    if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), 
                    (!y || b) && d)) {
                        g = J();
                        var t = k.offset(), o = O(e)[0] - t.top, n = O(e)[1] - t.left, a = "mcsLinearOut";
                        if (E.push(o), R.push(n), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), 
                        B.overflowed[0]) var i = I[0].parent().height() - I[0].height(), r = u - o > 0 && o - u > -i * B.scrollRatio.y && (2 * z[3] < z[2] || "yx" === T.axis);
                        if (B.overflowed[1]) var l = I[1].parent().width() - I[1].width(), h = f - n > 0 && n - f > -l * B.scrollRatio.x && (2 * z[2] < z[3] || "yx" === T.axis);
                        r || h ? (U || e.preventDefault(), b = 1) :(y = 1, C.addClass("mCS_touch_action")), 
                        U && e.preventDefault(), w = "yx" === T.axis ? [ u - o, f - n ] :"x" === T.axis ? [ null, f - n ] :[ u - o, null ], 
                        D[0].idleTimer = 250, B.overflowed[0] && s(w[0], W, a, "y", "all", !0), B.overflowed[1] && s(w[1], W, a, "x", A, !0);
                    }
                }
                function i(e) {
                    if (!te(e) || c || O(e)[2]) return void (t = 0);
                    t = 1, e.stopImmediatePropagation(), Q(C), p = J();
                    var o = k.offset();
                    h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], R = [];
                }
                function r(e) {
                    if (te(e) && !c && !O(e)[2]) {
                        d = 0, e.stopImmediatePropagation(), b = 0, y = 0, v = J();
                        var t = k.offset(), o = O(e)[0] - t.top, n = O(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            _ = 1e3 / (v - p);
                            var a = "mcsEaseOut", i = 2.5 > _, r = i ? [ E[E.length - 2], R[R.length - 2] ] :[ 0, 0 ];
                            x = i ? [ o - r[0], n - r[1] ] :[ o - h, n - m ];
                            var u = [ Math.abs(x[0]), Math.abs(x[1]) ];
                            _ = i ? [ Math.abs(x[0] / 4), Math.abs(x[1] / 4) ] :[ _, _ ];
                            var f = [ Math.abs(D[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(D[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1]) ];
                            w = "yx" === T.axis ? [ f[0], f[1] ] :"x" === T.axis ? [ null, f[1] ] :[ f[0], null ], 
                            S = [ 4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia ];
                            var C = parseInt(T.contentTouchScroll) || 0;
                            w[0] = u[0] > C ? w[0] :0, w[1] = u[1] > C ? w[1] :0, B.overflowed[0] && s(w[0], S[0], a, "y", A, !1), 
                            B.overflowed[1] && s(w[1], S[1], a, "x", A, !1);
                        }
                    }
                }
                function l(e, t) {
                    var o = [ 1.5 * t, 2 * t, t / 1.5, t / 2 ];
                    return e > 90 ? t > 4 ? o[0] :o[3] :e > 60 ? t > 3 ? o[3] :o[2] :e > 30 ? t > 8 ? o[1] :t > 6 ? o[0] :t > 4 ? t :o[2] :t > 8 ? t :o[3];
                }
                function s(e, t, o, n, a, i) {
                    e && Z(C, e.toString(), {
                        dur:t,
                        scrollEasing:o,
                        dir:n,
                        overwrite:a,
                        drag:i
                    });
                }
                var d, u, f, h, m, p, g, v, x, _, w, S, b, y, C = e(this), B = C.data(n), T = B.opt, M = n + "_" + B.idx, k = e("#mCSB_" + B.idx), D = e("#mCSB_" + B.idx + "_container"), I = [ e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal") ], E = [], R = [], W = 0, A = "yx" === T.axis ? "none" :"all", z = [], H = D.find("iframe"), P = [ "touchstart." + M + " pointerdown." + M + " MSPointerDown." + M, "touchmove." + M + " pointermove." + M + " MSPointerMove." + M, "touchend." + M + " pointerup." + M + " MSPointerUp." + M ], U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                D.bind(P[0], function(e) {
                    o(e);
                }).bind(P[1], function(e) {
                    a(e);
                }), k.bind(P[0], function(e) {
                    i(e);
                }).bind(P[2], function(e) {
                    r(e);
                }), H.length && H.each(function() {
                    e(this).bind("load", function() {
                        L(this) && e(this.contentDocument || this.contentWindow.document).bind(P[0], function(e) {
                            o(e), i(e);
                        }).bind(P[1], function(e) {
                            a(e);
                        }).bind(P[2], function(e) {
                            r(e);
                        });
                    });
                });
            }, E = function() {
                function o() {
                    return window.getSelection ? window.getSelection().toString() :document.selection && "Control" != document.selection.type ? document.selection.createRange().text :0;
                }
                function a(e, t, o) {
                    d.type = o && i ? "stepped" :"stepless", d.scrollAmount = 10, F(r, e, t, "mcsLinearOut", o ? 60 :null);
                }
                var i, r = e(this), l = r.data(n), s = l.opt, d = l.sequential, u = n + "_" + l.idx, f = e("#mCSB_" + l.idx + "_container"), h = f.parent();
                f.bind("mousedown." + u, function() {
                    t || i || (i = 1, c = !0);
                }).add(document).bind("mousemove." + u, function(e) {
                    if (!t && i && o()) {
                        var n = f.offset(), r = O(e)[0] - n.top + f[0].offsetTop, c = O(e)[1] - n.left + f[0].offsetLeft;
                        r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && a("off", null, "stepped") :("x" !== s.axis && l.overflowed[0] && (0 > r ? a("on", 38) :r > h.height() && a("on", 40)), 
                        "y" !== s.axis && l.overflowed[1] && (0 > c ? a("on", 37) :c > h.width() && a("on", 39)));
                    }
                }).bind("mouseup." + u + " dragend." + u, function() {
                    t || (i && (i = 0, a("off", null)), c = !1);
                });
            }, R = function() {
                function t(t, n) {
                    if (Q(o), !z(o, t.target)) {
                        var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) :s && t.deltaFactor < 100 ? 100 :t.deltaFactor || 100, d = i.scrollInertia;
                        if ("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x", f = [ Math.round(r * a.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount) ], h = "auto" !== i.mouseWheel.scrollAmount ? f[1] :f[0] >= l.width() ? .9 * l.width() :f[0], m = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetLeft), p = c[1][0].offsetLeft, g = c[1].parent().width() - c[1].width(), v = "y" === i.mouseWheel.axis ? t.deltaY || n :t.deltaX; else var u = "y", f = [ Math.round(r * a.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount) ], h = "auto" !== i.mouseWheel.scrollAmount ? f[1] :f[0] >= l.height() ? .9 * l.height() :f[0], m = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetTop), p = c[0][0].offsetTop, g = c[0].parent().height() - c[0].height(), v = t.deltaY || n;
                        "y" === u && !a.overflowed[0] || "x" === u && !a.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), 
                        i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 :1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), 
                        t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, 
                        d = 17), Z(o, (m - v * h).toString(), {
                            dir:u,
                            dur:d
                        }));
                    }
                }
                if (e(this).data(n)) {
                    var o = e(this), a = o.data(n), i = a.opt, r = n + "_" + a.idx, l = e("#mCSB_" + a.idx), c = [ e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal") ], d = e("#mCSB_" + a.idx + "_container").find("iframe");
                    d.length && d.each(function() {
                        e(this).bind("load", function() {
                            L(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function(e, o) {
                                t(e, o);
                            });
                        });
                    }), l.bind("mousewheel." + r, function(e, o) {
                        t(e, o);
                    });
                }
            }, W = new Object(), L = function(t) {
                var o = !1, n = !1, a = null;
                if (void 0 === t ? n = "#empty" :void 0 !== e(t).attr("id") && (n = e(t).attr("id")), 
                !1 !== n && void 0 !== W[n]) return W[n];
                if (t) {
                    try {
                        var i = t.contentDocument || t.contentWindow.document;
                        a = i.body.innerHTML;
                    } catch (e) {}
                    o = null !== a;
                } else {
                    try {
                        var i = top.document;
                        a = i.body.innerHTML;
                    } catch (e) {}
                    o = null !== a;
                }
                return !1 !== n && (W[n] = o), o;
            }, A = function(e) {
                var t = this.find("iframe");
                if (t.length) {
                    var o = e ? "auto" :"none";
                    t.css("pointer-events", o);
                }
            }, z = function(t, o) {
                var a = o.nodeName.toLowerCase(), i = t.data(n).opt.mouseWheel.disableOver, r = [ "select", "textarea" ];
                return e.inArray(a, i) > -1 && !(e.inArray(a, r) > -1 && !e(o).is(":focus"));
            }, H = function() {
                var t, o = e(this), a = o.data(n), i = n + "_" + a.idx, r = e("#mCSB_" + a.idx + "_container"), l = r.parent();
                e(".mCSB_" + a.idx + "_scrollbar ." + d[12]).bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function(o) {
                    c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1);
                }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function() {
                    c = !1;
                }).bind("click." + i, function(n) {
                    if (t && (t = 0, e(n.target).hasClass(d[12]) || e(n.target).hasClass("mCSB_draggerRail"))) {
                        Q(o);
                        var i = e(this), s = i.find(".mCSB_dragger");
                        if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!a.overflowed[1]) return;
                            var c = "x", u = n.pageX > s.offset().left ? -1 :1, f = Math.abs(r[0].offsetLeft) - u * .9 * l.width();
                        } else {
                            if (!a.overflowed[0]) return;
                            var c = "y", u = n.pageY > s.offset().top ? -1 :1, f = Math.abs(r[0].offsetTop) - u * .9 * l.height();
                        }
                        Z(o, f.toString(), {
                            dir:c,
                            scrollEasing:"mcsEaseInOut"
                        });
                    }
                });
            }, P = function() {
                var t = e(this), o = t.data(n), a = o.opt, i = n + "_" + o.idx, r = e("#mCSB_" + o.idx + "_container"), l = r.parent();
                r.bind("focusin." + i, function() {
                    var o = e(document.activeElement), n = r.find(".mCustomScrollBox").length;
                    o.is(a.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = n ? 17 * n :0, 
                    t[0]._focusTimeout = setTimeout(function() {
                        var e = [ ne(o)[0], ne(o)[1] ], n = [ r[0].offsetTop, r[0].offsetLeft ], i = [ n[0] + e[0] >= 0 && n[0] + e[0] < l.height() - o.outerHeight(!1), n[1] + e[1] >= 0 && n[0] + e[1] < l.width() - o.outerWidth(!1) ], s = "yx" !== a.axis || i[0] || i[1] ? "all" :"none";
                        "x" === a.axis || i[0] || Z(t, e[0].toString(), {
                            dir:"y",
                            scrollEasing:"mcsEaseInOut",
                            overwrite:s,
                            dur:0
                        }), "y" === a.axis || i[1] || Z(t, e[1].toString(), {
                            dir:"x",
                            scrollEasing:"mcsEaseInOut",
                            overwrite:s,
                            dur:0
                        });
                    }, t[0]._focusTimer));
                });
            }, U = function() {
                var t = e(this), o = t.data(n), a = n + "_" + o.idx, i = e("#mCSB_" + o.idx + "_container").parent();
                i.bind("scroll." + a, function() {
                    0 === i.scrollTop() && 0 === i.scrollLeft() || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden");
                });
            }, X = function() {
                var t = e(this), o = t.data(n), a = o.opt, i = o.sequential, r = n + "_" + o.idx, l = ".mCSB_" + o.idx + "_scrollbar";
                e(l + ">a").bind("contextmenu." + r, function(e) {
                    e.preventDefault();
                }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function(n) {
                    function r(e, o) {
                        i.scrollAmount = a.scrollButtons.scrollAmount, F(t, e, o);
                    }
                    if (n.preventDefault(), ee(n)) {
                        var l = e(this).attr("class");
                        switch (i.type = a.scrollButtons.scrollType, n.type) {
                          case "mousedown":
                          case "touchstart":
                          case "pointerdown":
                          case "MSPointerDown":
                            if ("stepped" === i.type) return;
                            c = !0, o.tweenRunning = !1, r("on", l);
                            break;

                          case "mouseup":
                          case "touchend":
                          case "pointerup":
                          case "MSPointerUp":
                          case "mouseout":
                          case "pointerout":
                          case "MSPointerOut":
                            if ("stepped" === i.type) return;
                            c = !1, i.dir && r("off", l);
                            break;

                          case "click":
                            if ("stepped" !== i.type || o.tweenRunning) return;
                            r("on", l);
                        }
                    }
                });
            }, Y = function() {
                function t(t) {
                    function n(e, t) {
                        r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && a.tweenRunning || F(o, e, t);
                    }
                    switch (t.type) {
                      case "blur":
                        a.tweenRunning && r.dir && n("off", null);
                        break;

                      case "keydown":
                      case "keyup":
                        var l = t.keyCode ? t.keyCode :t.which, s = "on";
                        if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                            if ((38 === l || 40 === l) && !a.overflowed[0] || (37 === l || 39 === l) && !a.overflowed[1]) return;
                            "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), 
                            t.stopImmediatePropagation(), n(s, l));
                        } else if (33 === l || 34 === l) {
                            if ((a.overflowed[0] || a.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 
                            "keyup" === t.type) {
                                Q(o);
                                var f = 34 === l ? -1 :1;
                                if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0]) var h = "x", m = Math.abs(c[0].offsetLeft) - f * .9 * d.width(); else var h = "y", m = Math.abs(c[0].offsetTop) - f * .9 * d.height();
                                Z(o, m.toString(), {
                                    dir:h,
                                    scrollEasing:"mcsEaseInOut"
                                });
                            }
                        } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((a.overflowed[0] || a.overflowed[1]) && (t.preventDefault(), 
                        t.stopImmediatePropagation()), "keyup" === t.type)) {
                            if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0]) var h = "x", m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) :0; else var h = "y", m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) :0;
                            Z(o, m.toString(), {
                                dir:h,
                                scrollEasing:"mcsEaseInOut"
                            });
                        }
                    }
                }
                var o = e(this), a = o.data(n), i = a.opt, r = a.sequential, l = n + "_" + a.idx, s = e("#mCSB_" + a.idx), c = e("#mCSB_" + a.idx + "_container"), d = c.parent(), u = "input,textarea,select,datalist,keygen,[contenteditable='true']", f = c.find("iframe"), h = [ "blur." + l + " keydown." + l + " keyup." + l ];
                f.length && f.each(function() {
                    e(this).bind("load", function() {
                        L(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function(e) {
                            t(e);
                        });
                    });
                }), s.attr("tabindex", "0").bind(h[0], function(e) {
                    t(e);
                });
            }, F = function(t, o, a, i, r) {
                function l(e) {
                    c.snapAmount && (u.scrollAmount = c.snapAmount instanceof Array ? "x" === u.dir[0] ? c.snapAmount[1] :c.snapAmount[0] :c.snapAmount);
                    var o = "stepped" !== u.type, n = r || (e ? o ? m / 1.5 :p :1e3 / 60), a = e ? o ? 7.5 :40 :2.5, d = [ Math.abs(f[0].offsetTop), Math.abs(f[0].offsetLeft) ], h = [ s.scrollRatio.y > 10 ? 10 :s.scrollRatio.y, s.scrollRatio.x > 10 ? 10 :s.scrollRatio.x ], g = "x" === u.dir[0] ? d[1] + u.dir[1] * h[1] * a :d[0] + u.dir[1] * h[0] * a, v = "x" === u.dir[0] ? d[1] + u.dir[1] * parseInt(u.scrollAmount) :d[0] + u.dir[1] * parseInt(u.scrollAmount), x = "auto" !== u.scrollAmount ? v :g, _ = i || (e ? o ? "mcsLinearOut" :"mcsEaseInOut" :"mcsLinear"), w = !!e;
                    return e && 17 > n && (x = "x" === u.dir[0] ? d[1] :d[0]), Z(t, x.toString(), {
                        dir:u.dir[0],
                        scrollEasing:_,
                        dur:n,
                        onComplete:w
                    }), e ? void (u.dir = !1) :(clearTimeout(u.step), void (u.step = setTimeout(function() {
                        l();
                    }, n)));
                }
                var s = t.data(n), c = s.opt, u = s.sequential, f = e("#mCSB_" + s.idx + "_container"), h = "stepped" === u.type, m = c.scrollInertia < 26 ? 26 :c.scrollInertia, p = c.scrollInertia < 1 ? 17 :c.scrollInertia;
                switch (o) {
                  case "on":
                    if (u.dir = [ a === d[16] || a === d[15] || 39 === a || 37 === a ? "x" :"y", a === d[13] || a === d[15] || 38 === a || 37 === a ? -1 :1 ], 
                    Q(t), oe(a) && "stepped" === u.type) return;
                    l(h);
                    break;

                  case "off":
                    (function() {
                        clearTimeout(u.step), $(u, "step"), Q(t);
                    })(), (h || s.tweenRunning && u.dir) && l(!0);
                }
            }, q = function(t) {
                var o = e(this).data(n).opt, a = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? a = t.length > 1 ? [ t[0], t[1] ] :"x" === o.axis ? [ null, t[0] ] :[ t[0], null ] :(a[0] = t.y ? t.y :t.x || "x" === o.axis ? null :t, 
                a[1] = t.x ? t.x :t.y || "y" === o.axis ? null :t), "function" == typeof a[0] && (a[0] = a[0]()), 
                "function" == typeof a[1] && (a[1] = a[1]()), a;
            }, j = function(t, o) {
                if (null != t && void 0 !== t) {
                    var a = e(this), i = a.data(n), r = i.opt, l = e("#mCSB_" + i.idx + "_container"), s = l.parent(), c = void 0 === t ? "undefined" :_typeof(t);
                    o || (o = "x" === r.axis ? "x" :"y");
                    var d = "x" === o ? l.outerWidth(!1) - s.width() :l.outerHeight(!1) - s.height(), f = "x" === o ? l[0].offsetLeft :l[0].offsetTop, h = "x" === o ? "left" :"top";
                    switch (c) {
                      case "function":
                        return t();

                      case "object":
                        var m = t.jquery ? t :e(t);
                        if (!m.length) return;
                        return "x" === o ? ne(m)[1] :ne(m)[0];

                      case "string":
                      case "number":
                        if (oe(t)) return Math.abs(t);
                        if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
                        if (-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));
                        if (-1 !== t.indexOf("+=")) {
                            var p = f + parseInt(t.split("+=")[1]);
                            return p >= 0 ? 0 :Math.abs(p);
                        }
                        if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                        if ("top" === t || "left" === t) return 0;
                        if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
                        if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
                        if ("first" === t || "last" === t) {
                            var m = l.find(":" + t);
                            return "x" === o ? ne(m)[1] :ne(m)[0];
                        }
                        return e(t).length ? "x" === o ? ne(e(t))[1] :ne(e(t))[0] :(l.css(h, t), void u.update.call(null, a[0]));
                    }
                }
            }, N = function(t) {
                function o() {
                    return clearTimeout(f[0].autoUpdate), 0 === l.parents("html").length ? void (l = null) :void (f[0].autoUpdate = setTimeout(function() {
                        return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, 
                        void r(3)) :c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, 
                        s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) :!c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length, 
                        s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) :(s.poll.img.o = s.poll.img.n, 
                        void f.find("img").each(function() {
                            a(this);
                        }));
                    }, c.advanced.autoUpdateTimeout));
                }
                function a(t) {
                    function o() {
                        this.onload = null, e(t).addClass(d[2]), r(2);
                    }
                    if (e(t).hasClass(d[2])) return void r();
                    var n = new Image();
                    n.onload = function(e, t) {
                        return function() {
                            return t.apply(e, arguments);
                        };
                    }(n, o), n.src = t.src;
                }
                function i() {
                    !0 === c.advanced.updateOnSelectorChange && (c.advanced.updateOnSelectorChange = "*");
                    var e = 0, t = f.find(c.advanced.updateOnSelectorChange);
                    return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                        e += this.offsetHeight + this.offsetWidth;
                    }), e;
                }
                function r(e) {
                    clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e);
                }
                var l = e(this), s = l.data(n), c = s.opt, f = e("#mCSB_" + s.idx + "_container");
                return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], "autoUpdate")) :void o();
            }, V = function(e, t, o) {
                return Math.round(e / t) * t - o;
            }, Q = function(t) {
                var o = t.data(n);
                e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal").each(function() {
                    K.call(this);
                });
            }, Z = function(t, o, a) {
                function i(e) {
                    return s && c.callbacks[e] && "function" == typeof c.callbacks[e];
                }
                function r() {
                    return [ c.callbacks.alwaysTriggerOffsets || w >= S[0] + C, c.callbacks.alwaysTriggerOffsets || -B >= w ];
                }
                function l() {
                    var e = [ h[0].offsetTop, h[0].offsetLeft ], o = [ x[0].offsetTop, x[0].offsetLeft ], n = [ h.outerHeight(!1), h.outerWidth(!1) ], i = [ f.height(), f.width() ];
                    t[0].mcs = {
                        content:h,
                        top:e[0],
                        left:e[1],
                        draggerTop:o[0],
                        draggerLeft:o[1],
                        topPct:Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - i[0])),
                        leftPct:Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - i[1])),
                        direction:a.dir
                    };
                }
                var s = t.data(n), c = s.opt, d = {
                    trigger:"internal",
                    dir:"y",
                    scrollEasing:"mcsEaseOut",
                    drag:!1,
                    dur:c.scrollInertia,
                    overwrite:"all",
                    callbacks:!0,
                    onStart:!0,
                    onUpdate:!0,
                    onComplete:!0
                }, a = e.extend(d, a), u = [ a.dur, a.drag ? 0 :a.dur ], f = e("#mCSB_" + s.idx), h = e("#mCSB_" + s.idx + "_container"), m = h.parent(), p = c.callbacks.onTotalScrollOffset ? q.call(t, c.callbacks.onTotalScrollOffset) :[ 0, 0 ], g = c.callbacks.onTotalScrollBackOffset ? q.call(t, c.callbacks.onTotalScrollBackOffset) :[ 0, 0 ];
                if (s.trigger = a.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), 
                m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), 
                s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), 
                s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                    if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), 
                    s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), 
                    s.contentReset.x = null), c.snapAmount) {
                        var v = c.snapAmount instanceof Array ? "x" === a.dir ? c.snapAmount[1] :c.snapAmount[0] :c.snapAmount;
                        o = V(o, v, c.snapOffset);
                    }
                    switch (a.dir) {
                      case "x":
                        var x = e("#mCSB_" + s.idx + "_dragger_horizontal"), _ = "left", w = h[0].offsetLeft, S = [ f.width() - h.outerWidth(!1), x.parent().width() - x.width() ], b = [ o, 0 === o ? 0 :o / s.scrollRatio.x ], C = p[1], B = g[1], T = C > 0 ? C / s.scrollRatio.x :0, M = B > 0 ? B / s.scrollRatio.x :0;
                        break;

                      case "y":
                        var x = e("#mCSB_" + s.idx + "_dragger_vertical"), _ = "top", w = h[0].offsetTop, S = [ f.height() - h.outerHeight(!1), x.parent().height() - x.height() ], b = [ o, 0 === o ? 0 :o / s.scrollRatio.y ], C = p[0], B = g[0], T = C > 0 ? C / s.scrollRatio.y :0, M = B > 0 ? B / s.scrollRatio.y :0;
                    }
                    b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [ 0, 0 ] :b[1] >= S[1] ? b = [ S[0], S[1] ] :b[0] = -b[0], 
                    t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), 
                    G(x[0], _, Math.round(b[1]), u[1], a.scrollEasing), !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || G(h[0], _, Math.round(b[0]), u[0], a.scrollEasing, a.overwrite, {
                        onStart:function() {
                            a.callbacks && a.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), 
                            s.tweenRunning = !0, y(x), s.cbOffsets = r());
                        },
                        onUpdate:function() {
                            a.callbacks && a.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]));
                        },
                        onComplete:function() {
                            if (a.callbacks && a.onComplete) {
                                "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                                var e = h[0].idleTimer || 0;
                                h[0].onCompleteTimeout = setTimeout(function() {
                                    i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), 
                                    c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= M && s.cbOffsets[1] && (l(), 
                                    c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, 
                                    y(x, "hide");
                                }, e);
                            }
                        }
                    });
                }
            }, G = function(e, t, o, n, a, i, r) {
                function l() {
                    _.stop || (g || f.call(), g = J() - p, s(), g >= _.time && (_.time = g > _.time ? g + d - (g - _.time) :g + d - 1, 
                    _.time < g + 1 && (_.time = g + 1)), _.time < n ? _.id = u(l) :m.call());
                }
                function s() {
                    n > 0 ? (_.currVal = c(_.time, v, w, n, a), x[t] = Math.round(_.currVal) + "px") :x[t] = o + "px", 
                    h.call();
                }
                function c(e, t, o, n, a) {
                    switch (a) {
                      case "linear":
                      case "mcsLinear":
                        return o * e / n + t;

                      case "mcsLinearOut":
                        return e /= n, e--, o * Math.sqrt(1 - e * e) + t;

                      case "easeInOutSmooth":
                        return e /= n / 2, 1 > e ? o / 2 * e * e + t :(e--, -o / 2 * (e * (e - 2) - 1) + t);

                      case "easeInOutStrong":
                        return e /= n / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t :(e--, o / 2 * (2 - Math.pow(2, -10 * e)) + t);

                      case "easeInOut":
                      case "mcsEaseInOut":
                        return e /= n / 2, 1 > e ? o / 2 * e * e * e + t :(e -= 2, o / 2 * (e * e * e + 2) + t);

                      case "easeOutSmooth":
                        return e /= n, e--, -o * (e * e * e * e - 1) + t;

                      case "easeOutStrong":
                        return o * (1 - Math.pow(2, -10 * e / n)) + t;

                      case "easeOut":
                      case "mcsEaseOut":
                      default:
                        var i = (e /= n) * e, r = i * e;
                        return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e);
                    }
                }
                e._mTween || (e._mTween = {
                    top:{},
                    left:{}
                });
                var d, u, r = r || {}, f = r.onStart || function() {}, h = r.onUpdate || function() {}, m = r.onComplete || function() {}, p = J(), g = 0, v = e.offsetTop, x = e.style, _ = e._mTween[t];
                "left" === t && (v = e.offsetLeft);
                var w = o - v;
                _.stop = 0, "none" !== i && function() {
                    null != _.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(_.id) :clearTimeout(_.id), 
                    _.id = null);
                }(), function() {
                    d = 1e3 / 60, _.time = g + d, u = window.requestAnimationFrame ? window.requestAnimationFrame :function(e) {
                        return s(), setTimeout(e, .01);
                    }, _.id = u(l);
                }();
            }, J = function() {
                return window.performance && window.performance.now ? window.performance.now() :window.performance && window.performance.webkitNow ? window.performance.webkitNow() :Date.now ? Date.now() :new Date().getTime();
            }, K = function() {
                var e = this;
                e._mTween || (e._mTween = {
                    top:{},
                    left:{}
                });
                for (var t = [ "top", "left" ], o = 0; o < t.length; o++) {
                    var n = t[o];
                    e._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[n].id) :clearTimeout(e._mTween[n].id), 
                    e._mTween[n].id = null, e._mTween[n].stop = 1);
                }
            }, $ = function(e, t) {
                try {
                    delete e[t];
                } catch (o) {
                    e[t] = null;
                }
            }, ee = function(e) {
                return !(e.which && 1 !== e.which);
            }, te = function(e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t);
            }, oe = function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e);
            }, ne = function(e) {
                var t = e.parents(".mCSB_container");
                return [ e.offset().top - t.offset().top, e.offset().left - t.offset().left ];
            }, ae = function() {
                var e = function() {
                    var e = [ "webkit", "moz", "ms", "o" ];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null;
                }();
                return !!e && document[e];
            };
            e.fn[o] = function(t) {
                return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != (void 0 === t ? "undefined" :_typeof(t)) && t ? void e.error("Method " + t + " does not exist") :u.init.apply(this, arguments);
            }, e[o] = function(t) {
                return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != (void 0 === t ? "undefined" :_typeof(t)) && t ? void e.error("Method " + t + " does not exist") :u.init.apply(this, arguments);
            }, e[o].defaults = i, window[o] = !0, e(window).bind("load", function() {
                e(a)[o](), e.extend(e.expr[":"], {
                    mcsInView:e.expr[":"].mcsInView || function(t) {
                        var o, n, a = e(t), i = a.parents(".mCSB_container");
                        if (i.length) return o = i.parent(), n = [ i[0].offsetTop, i[0].offsetLeft ], n[0] + ne(a)[0] >= 0 && n[0] + ne(a)[0] < o.height() - a.outerHeight(!1) && n[1] + ne(a)[1] >= 0 && n[1] + ne(a)[1] < o.width() - a.outerWidth(!1);
                    },
                    mcsInSight:e.expr[":"].mcsInSight || function(t, o, n) {
                        var a, i, r, l, s = e(t), c = s.parents(".mCSB_container"), d = "exact" === n[3] ? [ [ 1, 0 ], [ 1, 0 ] ] :[ [ .9, .1 ], [ .6, .4 ] ];
                        if (c.length) return a = [ s.outerHeight(!1), s.outerWidth(!1) ], r = [ c[0].offsetTop + ne(s)[0], c[0].offsetLeft + ne(s)[1] ], 
                        i = [ c.parent()[0].offsetHeight, c.parent()[0].offsetWidth ], l = [ a[0] < i[0] ? d[0] :d[1], a[1] < i[1] ? d[0] :d[1] ], 
                        r[0] - i[0] * l[0][0] < 0 && r[0] + a[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + a[1] - i[1] * l[1][1] >= 0;
                    },
                    mcsOverflow:e.expr[":"].mcsOverflow || function(t) {
                        var o = e(t).data(n);
                        if (o) return o.overflowed[0] || o.overflowed[1];
                    }
                });
            });
        }();
    }();
});
