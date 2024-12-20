/*!
 * pangu.js
 * --------
 * @version: 3.3.0
 * @homepage: https://github.com/vinta/pangu.js
 * @license: MIT
 * @author: Vinta Chen <vinta.chen@gmail.com> (https://github.com/vinta)
 */
!(function (e, u) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = u())
    : "function" == typeof define && define.amd
    ? define("pangu", [], u)
    : "object" == typeof exports
    ? (exports.pangu = u())
    : (e.pangu = u());
})(this, function () {
  return (function (e) {
    function u(a) {
      if (f[a]) return f[a].exports;
      var t = (f[a] = { exports: {}, id: a, loaded: !1 });
      return e[a].call(t.exports, t, t.exports, u), (t.loaded = !0), t.exports;
    }
    var f = {};
    return (u.m = e), (u.c = f), (u.p = ""), u(0);
  })([
    function (e, u, f) {
      "use strict";
      function a(e, u) {
        if (!(e instanceof u))
          throw new TypeError("Cannot call a class as a function");
      }
      function t(e, u) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !u || ("object" != typeof u && "function" != typeof u) ? e : u;
      }
      function n(e, u) {
        if ("function" != typeof u && null !== u)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof u
          );
        (e.prototype = Object.create(u && u.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          u &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, u)
              : (e.__proto__ = u));
      }
      var i = (function () {
          function e(e, u) {
            for (var f = 0; f < u.length; f++) {
              var a = u[f];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function (u, f, a) {
            return f && e(u.prototype, f), a && e(u, a), u;
          };
        })(),
        r = f(1).Pangu,
        o = 8,
        s = (function (e) {
          function u() {
            a(this, u);
            var e = t(this, Object.getPrototypeOf(u).call(this));
            return (
              (e.topTags = /^(html|head|body|#document)$/i),
              (e.ignoreTags = /^(script|code|pre|textarea)$/i),
              (e.spaceSensitiveTags = /^(a|del|pre|s|strike|u)$/i),
              (e.spaceLikeTags = /^(br|hr|i|img|pangu)$/i),
              (e.blockTags = /^(div|h1|h2|h3|h4|h5|h6|p)$/i),
              e
            );
          }
          return (
            n(u, e),
            i(u, [
              {
                key: "canIgnoreNode",
                value: function (e) {
                  for (
                    var u = e.parentNode;
                    u && u.nodeName && u.nodeName.search(this.topTags) === -1;

                  ) {
                    if (
                      u.nodeName.search(this.ignoreTags) >= 0 ||
                      u.isContentEditable ||
                      "true" === u.getAttribute("g_editable")
                    )
                      return !0;
                    u = u.parentNode;
                  }
                  return !1;
                },
              },
              {
                key: "isFirstTextChild",
                value: function (e, u) {
                  for (var f = e.childNodes, a = 0; a < f.length; a++) {
                    var t = f[a];
                    if (t.nodeType !== o && t.textContent) return t === u;
                  }
                  return !1;
                },
              },
              {
                key: "isLastTextChild",
                value: function (e, u) {
                  for (var f = e.childNodes, a = f.length - 1; a > -1; a--) {
                    var t = f[a];
                    if (t.nodeType !== o && t.textContent) return t === u;
                  }
                  return !1;
                },
              },
              {
                key: "spacingNodeByXPath",
                value: function (e, u) {
                  for (
                    var f = document.evaluate(
                        e,
                        u,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null
                      ),
                      a = void 0,
                      t = void 0,
                      n = f.snapshotLength - 1;
                    n > -1;
                    --n
                  )
                    if (((a = f.snapshotItem(n)), this.canIgnoreNode(a))) t = a;
                    else {
                      var i = this.spacing(a.data);
                      if ((a.data !== i && (a.data = i), t)) {
                        if (
                          a.nextSibling &&
                          a.nextSibling.nodeName.search(this.spaceLikeTags) >= 0
                        ) {
                          t = a;
                          continue;
                        }
                        var r =
                            a.data.toString().substr(-1) +
                            t.data.toString().substr(0, 1),
                          o = this.spacing(r);
                        if (o !== r) {
                          for (
                            var s = t;
                            s.parentNode &&
                            s.nodeName.search(this.spaceSensitiveTags) === -1 &&
                            this.isFirstTextChild(s.parentNode, s);

                          )
                            s = s.parentNode;
                          for (
                            var c = a;
                            c.parentNode &&
                            c.nodeName.search(this.spaceSensitiveTags) === -1 &&
                            this.isLastTextChild(c.parentNode, c);

                          )
                            c = c.parentNode;
                          if (
                            c.nextSibling &&
                            c.nextSibling.nodeName.search(this.spaceLikeTags) >=
                              0
                          ) {
                            t = a;
                            continue;
                          }
                          if (c.nodeName.search(this.blockTags) === -1)
                            if (
                              s.nodeName.search(this.spaceSensitiveTags) === -1
                            )
                              s.nodeName.search(this.ignoreTags) === -1 &&
                                s.nodeName.search(this.blockTags) === -1 &&
                                (t.previousSibling
                                  ? t.previousSibling.nodeName.search(
                                      this.spaceLikeTags
                                    ) === -1 && (t.data = " " + t.data)
                                  : this.canIgnoreNode(t) ||
                                    (t.data = " " + t.data));
                            else if (
                              c.nodeName.search(this.spaceSensitiveTags) === -1
                            )
                              a.data = a.data + " ";
                            else {
                              var d = document.createElement("pangu");
                              (d.innerHTML = " "),
                                s.previousSibling
                                  ? s.previousSibling.nodeName.search(
                                      this.spaceLikeTags
                                    ) === -1 && s.parentNode.insertBefore(d, s)
                                  : s.parentNode.insertBefore(d, s),
                                d.previousElementSibling ||
                                  (d.parentNode && d.parentNode.removeChild(d));
                            }
                        }
                      }
                      t = a;
                    }
                },
              },
              {
                key: "spacingNode",
                value: function (e) {
                  var u = ".//*/text()[normalize-space(.)]";
                  this.spacingNodeByXPath(u, e);
                },
              },
              {
                key: "spacingElementById",
                value: function (e) {
                  var u = 'id("' + e + '")//text()';
                  this.spacingNodeByXPath(u, document);
                },
              },
              {
                key: "spacingElementByClassName",
                value: function (e) {
                  var u =
                    '//*[contains(concat(" ", normalize-space(@class), " "), "' +
                    e +
                    '")]//text()';
                  this.spacingNodeByXPath(u, document);
                },
              },
              {
                key: "spacingElementByTagName",
                value: function (e) {
                  var u = "//" + e + "//text()";
                  this.spacingNodeByXPath(u, document);
                },
              },
              {
                key: "spacingPageTitle",
                value: function () {
                  var e = "/html/head/title/text()";
                  this.spacingNodeByXPath(e, document);
                },
              },
              {
                key: "spacingPageBody",
                value: function () {
                  for (
                    var e = "/html/body//*/text()[normalize-space(.)]",
                      u = ["script", "style", "textarea"],
                      f = 0;
                    f < u.length;
                    f++
                  ) {
                    var a = u[f];
                    e +=
                      '[translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="' +
                      a +
                      '"]';
                  }
                  this.spacingNodeByXPath(e, document);
                },
              },
              {
                key: "spacingPage",
                value: function () {
                  this.spacingPageTitle(), this.spacingPageBody();
                },
              },
            ]),
            u
          );
        })(r),
        c = new s();
      (u = e.exports = c), (u.Pangu = s);
    },
    function (e, u) {
      "use strict";
      function f(e, u) {
        if (!(e instanceof u))
          throw new TypeError("Cannot call a class as a function");
      }
      var a = (function () {
          function e(e, u) {
            for (var f = 0; f < u.length; f++) {
              var a = u[f];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function (u, f, a) {
            return f && e(u.prototype, f), a && e(u, a), u;
          };
        })(),
        t =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(["])/g,
        n =
          /(["])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        i = /(["']+)(\s*)(.+?)(\s*)(["']+)/g,
        r =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])( )(')([A-Za-z])/g,
        o =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#)([A-Za-z0-9\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        s =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#([^ ]))/g,
        c =
          /(([^ ])#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        d =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\+\-\*\/=&\\|<>])([A-Za-z0-9])/g,
        p =
          /([A-Za-z0-9])([\+\-\*\/=&\\|<>])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        l =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c]+(.*?)[\)\]\}>\u201d]+)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        g =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c>])/g,
        h =
          /([\)\]\}>\u201d<])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        v = /([\(\[\{<\u201c]+)(\s*)(.+?)(\s*)([\)\]\}>\u201d]+)/,
        b =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([~!;:,\.\?\u2026])([A-Za-z0-9])/g,
        y =
          /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([A-Za-z0-9`\$%\^&\*\-=\+\\\|\/@\u00a1-\u00ff\u2022\u2027\u2150-\u218f])/g,
        m =
          /([A-Za-z0-9`~\$%\^&\*\-=\+\\\|\/!;:,\.\?\u00a1-\u00ff\u2022\u2026\u2027\u2150-\u218f])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g,
        $ = (function () {
          function e() {
            f(this, e);
          }
          return (
            a(e, [
              {
                key: "spacing",
                value: function (e) {
                  var u = e;
                  (u = u.replace(t, "$1 $2")),
                    (u = u.replace(n, "$1 $2")),
                    (u = u.replace(i, "$1$3$5")),
                    (u = u.replace(r, "$1$3$4")),
                    (u = u.replace(o, "$1 $2$3$4 $5")),
                    (u = u.replace(s, "$1 $2")),
                    (u = u.replace(c, "$1 $3")),
                    (u = u.replace(d, "$1 $2 $3")),
                    (u = u.replace(p, "$1 $2 $3"));
                  var f = u,
                    a = u.replace(l, "$1 $2 $4");
                  return (
                    (u = a),
                    f === a &&
                      ((u = u.replace(g, "$1 $2")),
                      (u = u.replace(h, "$1 $2"))),
                    (u = u.replace(v, "$1$3$5")),
                    (u = u.replace(b, "$1$2 $3")),
                    (u = u.replace(y, "$1 $2")),
                    (u = u.replace(m, "$1 $2"))
                  );
                },
              },
              {
                key: "spacingText",
                value: function (e) {
                  var u =
                    arguments.length <= 1 || void 0 === arguments[1]
                      ? function () {}
                      : arguments[1];
                  try {
                    var f = this.spacing(e);
                    u(null, f);
                  } catch (a) {
                    u(a);
                  }
                },
              },
            ]),
            e
          );
        })(),
        N = new $();
      (u = e.exports = N), (u.Pangu = $);
    },
  ]);
});
//# sourceMappingURL=pangu.min.js.map
