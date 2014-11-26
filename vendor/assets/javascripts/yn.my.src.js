/**
 * @return {undefined}
 */
function baseTree() {
    /** @type {null} */
    this.tree = null;
    /** @type {null} */
    this.folderPre = null;
    /** @type {null} */
    this.folderNow = null;
    /** @type {null} */
    this.fileList = null;
    /** @type {boolean} */
    this.isFolderChanged = false;
    /**
     * @param {Array} tokens
     * @return {?}
     */
    this.getItemHtml = function(tokens) {
        return tokens[0].toLowerCase() == "folder" ? '<span class="folder-icon-closed">&nbsp;</span><span title="' + tokens[2] + '">' + tokens[2].subByte(30, "...") + "</span>" : "";
    };
}
/**
 * @return {undefined}
 */
function fileTree() {
    baseTree.call(this);
}
/**
 * @param {Object} walkers
 * @return {undefined}
 */
function jsonpcallbackFunc(walkers) {
    yunpn.ytree.tree_loading_handler(walkers, yunpn.ytree);
}
/**
 * @return {undefined}
 */
function sfileTofileTree() {
    baseTree.call(this);
}
/**
 * @return {undefined}
 */
function sfileTree() {
    baseTree.call(this);
}
(function() {
    /**
     * @param {?} i
     * @return {?}
     */
    function data(i) {
        return fn(this, i, 1), this.lazyRender || this.render(), this;
    }
    /**
     * @param {?} tx
     * @return {?}
     */
    function handler(tx) {
        return fn(this, tx, 1), this.lazyRender || this.render(), this;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    function template(text) {
        return fn(this, text, 1), this.lazyRender || this.render(), this;
    }
    var fn = QW.ObjectH.mix;
    var remove = QW.ArrayH.remove;
    var traverseNode = QW.StringH.format;
    var ie6 = QW.Browser.ie6;
    var doc = QW.DomU;
    var $ = doc.createElement;
    var text = doc.getDocRect;
    var el = QW.NodeH;
    var bind = QW.EventTargetH.addEventListener;
    var removeEvent = QW.EventTargetH.removeEventListener;
    var fireEvent = el.fire;
    var c = el.hide;
    var css = el.setStyle;
    var inspect = el.getXY;
    /**
     * @param {string} node
     * @param {?} x
     * @param {?} i
     * @param {number} y
     * @param {number} height
     * @return {undefined}
     */
    var onMove = function(node, x, i, y, height) {
        var options = doc.getDocRect();
        if (y == null) {
            y = (options.width - x) / 2 + options.scrollX;
        }
        /** @type {number} */
        y = Math.max(Math.min(y, options.scrollX + options.width - x), options.scrollX);
        if (height == null) {
            height = (options.height - i) / 2 + options.scrollY;
        }
        /** @type {number} */
        height = Math.max(Math.min(height, options.scrollY + options.height - i), options.scrollY);
        el.setXY(node, y, height);
    };
    var cb = el.contains;
    var parentElement = el.removeNode;
    var evt = QW.EventH;
    var element = evt.getTarget;
    var parent = evt.getKeyCode;
    var HOP = evt.preventDefault;
    var target = QW.CustEvent;
    var test = {
        VERSION : "0.0.1"
    };
    (function() {
        /**
         * @return {?}
         */
        function show() {
            var div2 = $("div", {
                className : "mask",
                tabIndex : -1,
                unselectable : "on"
            });
            return document.body.insertBefore(div2, document.body.firstChild), div2;
        }
        /**
         * @return {undefined}
         */
        function update() {
            var p = e.offsetParent;
            /** @type {Element} */
            var elem = document.documentElement;
            var c = e.style;
            if (parseInt(c.top) != p.scrollTop || parseInt(c.left) != p.scrollLeft) {
                c.top = p.scrollTop;
                c.left = p.scrollLeft;
            }
            if (elem.clientHeight != e.offsetHeight) {
                /** @type {number} */
                c.height = elem.clientHeight;
            }
            if (elem.clientWidth != e.offsetWidth) {
                /** @type {number} */
                c.width = elem.clientWidth;
            }
        }
        /**
         * @param {Element} socket
         * @return {undefined}
         */
        function destroy(socket) {
            if (socket.keyEsc) {
                removeEvent(document, "keydown", test.keydownHdl);
                bind(document, "keydown", test.keydownHdl);
            }
        }
        /** @type {number} */
        var zIndex = 100;
        /** @type {Array} */
        var current = [];
        var e;
        /** @type {number} */
        var _interval = 0;
        fn(test, {
            /**
             * @param {Element} self
             * @param {number} x
             * @param {number} height
             * @param {number} opt_isDefault
             * @param {number} val
             * @param {?} _relatedTarget
             * @return {undefined}
             */
            showPanel : function(self, x, height, opt_isDefault, val, _relatedTarget) {
                if (self._rendered) {
                    self.render();
                }
                remove(current, self);
                current.push(self);
                var s = self.oWrap.style;
                if (self.isVisible) {
                    if (s.zIndex != zIndex) {
                        s.zIndex = zIndex += 2;
                    }
                } else {
                    s.zIndex = zIndex += 2;
                }
                if (self.withMask) {
                    e = e || show();
                    css(e, {
                        zIndex : zIndex - 1,
                        display : "block"
                    });
                    if (ie6) {
                        update(e);
                        clearInterval(_interval);
                        /** @type {number} */
                        _interval = setInterval(update, 1E3);
                    }
                }
                if (opt_isDefault != null) {
                    /** @type {string} */
                    s.width = opt_isDefault + "px";
                }
                if (val != null) {
                    /** @type {string} */
                    s.height = val + "px";
                }
                if (self.posCenter) {
                    var user = test.getWrapSize(self);
                    onMove(self.oWrap, user[0], user[1], x, height);
                } else {
                    x = x || 0;
                    height = height || 0;
                    if (_relatedTarget) {
                        var str = inspect(_relatedTarget);
                        x += str[0];
                        height += str[1];
                    }
                    if (self.posAdjust) {
                        user = test.getWrapSize(self);
                        var options = text();
                        /** @type {number} */
                        x = Math.min(x, options.scrollX + options.width - user[0]);
                        /** @type {number} */
                        x = Math.max(x, options.scrollX);
                        /** @type {number} */
                        height = Math.min(height, options.scrollY + options.height - user[1]);
                        /** @type {number} */
                        height = Math.max(height, options.scrollY);
                    }
                    /** @type {string} */
                    s.left = x + "px";
                    /** @type {string} */
                    s.top = height + "px";
                }
                /** @type {string} */
                s.display = "block";
                /** @type {boolean} */
                self.isVisible = true;
                destroy(self);
            },
            /**
             * @param {Element} item
             * @return {undefined}
             */
            hidePanel : function(item) {
                c(item.oWrap);
                /** @type {boolean} */
                item.isVisible = false;
                remove(current, item);
                /** @type {boolean} */
                var t = false;
                /** @type {number} */
                var p = current.length - 1;
                for (;p > -1;p--) {
                    var curr = current[p];
                    if (curr.withMask) {
                        /** @type {number} */
                        e.style.zIndex = curr.oWrap.style.zIndex - 1;
                        /** @type {boolean} */
                        t = true;
                        break;
                    }
                }
                if (!t) {
                    if (e) {
                        c(e);
                        clearInterval(_interval);
                    }
                }
            },
            /**
             * @param {Object} map
             * @return {undefined}
             */
            disposePanel : function(map) {
                parentElement(map.oWrap);
                var letter;
                for (letter in map) {
                    /** @type {null} */
                    map[letter] = null;
                }
            },
            /**
             * @param {Element} obj
             * @return {undefined}
             */
            risePanel : function(obj) {
                if (!obj.isVisible) {
                    throw alert("\u7a0b\u5e8f\u9519\u8bef."), "\u9519\u8bef\uff1a\u8fd8\u6ca1\u6709\u6253\u5f00panel\u5462.";
                }
                var divStyle = obj.oWrap.style;
                if (divStyle.zIndex != zIndex) {
                    divStyle.zIndex = zIndex += 2;
                    remove(current, obj);
                    current.push(obj);
                    if (obj.withMask) {
                        var s = e.style;
                        /** @type {number} */
                        s.zIndex = zIndex - 1;
                    }
                }
            },
            /**
             * @param {?} walkers
             * @return {undefined}
             */
            keydownHdl : function(walkers) {
                if (current.length && parent(walkers) == 27) {
                    var z = current[current.length - 1];
                    if (z.keyEsc) {
                        z.hide();
                        HOP(walkers);
                    }
                }
                if (!current.length) {
                    removeEvent(document, "keydown", test.keydownHdl);
                }
            },
            /**
             * @param {Element} container
             * @param {Object} aValue
             * @param {?} parentHeight
             * @return {?}
             */
            getWrapSize : function(container, aValue, parentHeight) {
                var div = container.oWrap;
                var divStyle = div.style;
                /** @type {Array} */
                var args = [divStyle.display, divStyle.width, divStyle.height];
                /** @type {string} */
                divStyle.display = "block";
                if (aValue) {
                    /** @type {Object} */
                    divStyle.width = aValue;
                }
                if (parentHeight) {
                    divStyle.height = parentHeight;
                }
                /** @type {Array} */
                var o = [div.offsetWidth, div.offsetHeight];
                return divStyle.display = args[0], args[1] && (divStyle.width = args[1]), args[2] && (divStyle.height = args[2]), o;
            }
        });
    })();
    (function() {
        /**
         * @param {Element} div
         * @param {string} input
         * @return {undefined}
         */
        function fn(div, input) {
            input = input || "";
            if (input.tagName) {
                /** @type {string} */
                div.innerHTML = "";
                div.appendChild(input);
            } else {
                /** @type {string} */
                div.innerHTML = input;
            }
        }
        /** @type {Array} */
        data.EVENTS = ["beforeshow", "aftershow", "beforehide", "afterhide"];
        data._elHtml = {
            content : '<div class="panel-content" remark="oContent"><div class="hd"></div><div class="bd"></div><div class="ft"></div></div>',
            closeHdl : '<span class="close"></span>',
            resizeHdl : '<span class="resize"><span></span></span>',
            corner1 : '<span class="co1"><span></span></span>',
            corner2 : '<span class="co2"><span></span></span>',
            cue : '<span class="cue"></span>',
            shadow : '<span class="sd"></span>'
        };
        data.prototype = {
            defaultClassName : "panel",
            wrapId : "",
            className : "",
            title : "",
            header : "",
            body : "Panel Body",
            footer : "",
            withCorner : 0,
            withCue : 0,
            withShadow : 0,
            withClose : 0,
            withMask : 0,
            dragable : 0,
            resizable : 0,
            keyEsc : 0,
            posCenter : 0,
            posAdjust : 0,
            isVisible : false,
            oWrap : null,
            oContent : null,
            oHeader : null,
            oBody : null,
            oFooter : null,
            oCloseHdl : null,
            oResizeHdl : null,
            oShadow : null,
            oCue : null,
            oCorner1 : null,
            oCorner2 : null,
            /**
             * @return {undefined}
             */
            render : function() {
                var self = this;
                if (self._rendered) {
                    return;
                }
                var elem = $("div", {
                    className : self.defaultClassName + " " + (self.className || "")
                });
                /** @type {string} */
                elem.style.display = "none";
                self.oWrap = elem;
                if (self.wrapId) {
                    elem.id = self.wrapId;
                }
                c(elem);
                var opts = data._elHtml;
                /** @type {Array} */
                var UNICODE_SPACES = [opts.content, self.withClose ? opts.closeHdl : "", self.resizable ? opts.resizeHdl : "", self.withCorner ? opts.corner1 + opts.corner2 : "", self.withCue ? opts.cue : "", self.withShadow ? opts.shadow : ""];
                /** @type {string} */
                elem.innerHTML = UNICODE_SPACES.join("");
                var childNodes = elem.childNodes;
                self.oContent = childNodes[0];
                /** @type {number} */
                var i = 1;
                if (self.withClose) {
                    self.oCloseHdl = childNodes[i++];
                }
                if (self.resizable) {
                    self.oResizeHdl = childNodes[i++];
                }
                if (self.withCorner) {
                    self.oCorner1 = childNodes[i++];
                    self.oCorner2 = childNodes[i++];
                }
                if (self.withCue) {
                    self.oCue = childNodes[i++];
                }
                if (self.withShadow) {
                    self.oShadow = childNodes[i++];
                }
                childNodes = self.oContent.childNodes;
                self.oHeader = childNodes[0];
                self.oBody = childNodes[1];
                self.oFooter = childNodes[2];
                /** @type {boolean} */
                self.isVisible = false;
                var format = self.title && "<h3>" + self.title + "</h3>" || self.header;
                if (format) {
                    fn(self.oHeader, format);
                }
                if (self.body) {
                    fn(self.oBody, self.body);
                }
                if (self.footer) {
                    fn(self.oFooter, self.footer);
                }
                if (self.withClose) {
                    bind(self.oCloseHdl, "click", function() {
                        self.hide();
                    });
                }
                if (self.dragable) {
                    self.initDrag();
                }
                if (self.resizable) {
                    self.initResize();
                }
                document.body.insertBefore(elem, document.body.firstChild);
                target.createEvents(self, data.EVENTS);
                /** @type {boolean} */
                self._rendered = true;
            },
            /**
             * @param {string} name
             * @param {Object} value
             * @param {number} opt_isDefault
             * @param {number} act
             * @param {?} _relatedTarget
             * @return {?}
             */
            show : function(name, value, opt_isDefault, act, _relatedTarget) {
                return this._rendered && this.render(), this.fire("beforeshow") == 0 ? false : (test.showPanel(this, name, value, opt_isDefault, act, _relatedTarget), this.fire("aftershow"), true);
            },
            /**
             * @return {?}
             */
            hide : function() {
                return this.fire("beforehide") == 0 ? false : (test.hidePanel(this), this.fire("afterhide"), true);
            },
            /**
             * @return {?}
             */
            dispose : function() {
                if (this.isVisible) {
                    return false;
                }
                test.disposePanel(this);
            },
            /**
             * @return {undefined}
             */
            rise : function() {
                test.risePanel(this);
            },
            /**
             * @return {undefined}
             */
            initDrag : function() {
                var curtain = this;
                var elm = new QW.SimpleDrag({
                    oSrc : this.oWrap,
                    oHdl : this.oHeader,
                    minXAttr : 1,
                    minYAttr : 1,
                    maxXAttr : this.maxXAttr,
                    maxYAttr : this.maxYAttr,
                    withProxy : true
                });
                elm.on("dragstart", function() {
                    curtain.rise();
                });
            },
            /**
             * @return {undefined}
             */
            initResize : function() {
                var curtain = this;
                var elm = new QW.SimpleResize({
                    oSrc : this.oWrap,
                    oHdl : this.oResizeHdl,
                    minXAttr : 150,
                    yFixed : true,
                    withProxy : true
                });
                elm.on("dragstart", function() {
                    curtain.rise();
                });
            }
        };
    })();
    (function() {
        /** @type {function (?): ?} */
        handler.MENTOR_CLASS = data;
        handler.prototype = {
            posAdjust : 1,
            defaultClassName : "panel panel-popup",
            relatedEls : null,
            /**
             * @param {boolean} recurring
             * @return {undefined}
             */
            _refreshBlurHdl : function(recurring) {
                if (this._fnBlur) {
                    removeEvent(document, "keydown", this._fnBlur);
                    removeEvent(document, "keyup", this._fnBlur);
                    removeEvent(document, "mousedown", this._fnBlur);
                    if (recurring) {
                        bind(document, "keydown", this._fnBlur);
                        bind(document, "keyup", this._fnBlur);
                        bind(document, "mousedown", this._fnBlur);
                    }
                }
            },
            /**
             * @param {string} name
             * @param {Object} value
             * @param {number} opt_isDefault
             * @param {number} act
             * @param {?} _relatedTarget
             * @return {?}
             */
            show : function(name, value, opt_isDefault, act, _relatedTarget) {
                var self = this;
                return self._rendered && self.render(), self._fnBlur = self._fnBlur || function(parentElement) {
                    var cl = element(parentElement) || document.body;
                    if (!self.oWrap) {
                        return;
                    }
                    var codeSegments = self.relatedEls || [];
                    codeSegments.push(self.oWrap);
                    /** @type {number} */
                    var i = 0;
                    for (;i < codeSegments.length;i++) {
                        var i1 = codeSegments[i];
                        if (i1 == cl || cb(i1, cl)) {
                            return;
                        }
                    }
                    self.hide();
                }, self.fire("beforeshow") == 0 ? false : (test.showPanel(self, name, value, opt_isDefault, act, _relatedTarget), self._refreshBlurHdl(true), self.fire("aftershow"), true);
            },
            /**
             * @return {?}
             */
            hide : function() {
                return this.fire("beforehide") == 0 ? false : (test.hidePanel(this), this._refreshBlurHdl(false), this.fire("afterhide"), true);
            }
        };
        fn(handler.prototype, data.prototype);
    })();
    (function() {
        /** @type {function (?): ?} */
        template.MENTOR_CLASS = data;
        template.prototype = {
            defaultClassName : "panel panel-dialog",
            withMask : 1,
            withClose : 1,
            dragable : !!QW.SimpleDrag
        };
        fn(template.prototype, data.prototype);
    })();
    var Panel = function() {
        var data = {
            alert : '<div class="panel-dialog-sys panel-alert cls"><div class="msg">{0}</div><div class="btn-ctn"><button>\u786e\u5b9a</button></div></div>',
            confirm : '<div class="panel-dialog-sys panel-confirm cls"><div class="msg">{0}</div><div class="btn-ctn"><button>\u786e\u5b9a</button><button>\u53d6\u6d88</button></div></div>',
            prompt : '<div class="panel-dialog-sys panel-prompt cls"><div class="msg">{0}</div><div class="ipt-ctn"><input type="text-input"></div><div class="btn-ctn"><button>\u786e\u5b9a</button><button>\u53d6\u6d88</button></div></div>',
            msgbox : '<div class="panel-dialog-sys panel-msgbox cls"><div class="msg">{0}</div><div class="btn-ctn"><button>\u662f(Yes)</button><button>\u5426(No)</button><button>\u53d6\u6d88</button></div></div>'
        };
        var prompt = {
            /**
             * @param {string} type
             * @param {string} fun
             * @param {?} $sanitize
             * @param {Object} params
             * @return {?}
             */
            getSysDialog : function(type, fun, $sanitize, params) {
                params = params || {};
                fn(params, {
                    posCenter : 1,
                    keyEsc : 1,
                    title : "\u7cfb\u7edf\u63d0\u793a",
                    dragable : !!QW.SimpleDrag,
                    body : traverseNode(data[type] || "error", fun)
                });
                var options = new template(params);
                var tags = options.oWrap.getElementsByTagName("button");
                options.dialogButtons = tags;
                switch(type) {
                    case "alert":
                        bind(tags[0], "click", function(dataAndEvents) {
                            options.hide();
                        });
                        break;
                    case "confirm":
                        bind(tags[0], "click", function(dataAndEvents) {
                            /** @type {boolean} */
                            options.returnValue = true;
                            options.hide();
                        });
                        bind(tags[1], "click", function(dataAndEvents) {
                            options.hide();
                        });
                        /** @type {boolean} */
                        options.returnValue = false;
                        break;
                    case "prompt":
                        var self = options.oWrap.getElementsByTagName("input")[0];
                        options.dialogInput = self;
                        bind(self, "keydown", function(fullPath) {
                            if (parent(fullPath) == evt.KEY_ENTER) {
                                setTimeout(function() {
                                    fireEvent(tags[0], "click");
                                }, 10);
                            }
                        });
                        bind(tags[0], "click", function(dataAndEvents) {
                            options.returnValue = self.value;
                            options.hide();
                        });
                        bind(tags[1], "click", function(dataAndEvents) {
                            options.hide();
                        });
                        break;
                    case "msgbox":
                        bind(tags[0], "click", function(dataAndEvents) {
                            /** @type {boolean} */
                            options.returnValue = true;
                            options.hide();
                        });
                        bind(tags[1], "click", function(dataAndEvents) {
                            /** @type {boolean} */
                            options.returnValue = false;
                            options.hide();
                        });
                        bind(tags[2], "click", function(dataAndEvents) {
                            options.hide();
                        });
                }
                return options.on("aftershow", function() {
                    var chart = self || tags[0];
                    try {
                        chart.focus();
                        chart.select();
                    } catch (t) {
                    }
                }), options.on("afterhide", function() {
                    try {
                        if ($sanitize) {
                            $sanitize(this.returnValue);
                        }
                    } finally {
                    }
                }), options;
            },
            /**
             * @param {string} type
             * @param {string} obj
             * @param {string} recurring
             * @param {?} opt_attributes
             * @param {Object} args
             * @return {undefined}
             */
            _sysDialog : function(type, obj, recurring, opt_attributes, args) {
                args = args || {};
                var node = QW.Panel.getSysDialog(type, obj, opt_attributes, args);
                if (type == "prompt") {
                    node.dialogInput.value = recurring || "";
                }
                node.show(null, null, args.width || 300, args.height);
            },
            /**
             * @param {string} completeCallback
             * @param {?} opt_attributes
             * @param {Object} args
             * @return {undefined}
             */
            alert : function(completeCallback, opt_attributes, args) {
                QW.Panel._sysDialog("alert", completeCallback, null, opt_attributes, args);
            },
            /**
             * @param {string} str
             * @param {?} opt_attributes
             * @param {Object} message
             * @return {undefined}
             */
            confirm : function(str, opt_attributes, message) {
                QW.Panel._sysDialog("confirm", str, null, opt_attributes, message);
            },
            /**
             * @param {string} walkers
             * @param {string} recurring
             * @param {?} opt_attributes
             * @param {Object} message
             * @return {undefined}
             */
            prompt : function(walkers, recurring, opt_attributes, message) {
                QW.Panel._sysDialog("prompt", walkers, recurring, opt_attributes, message);
            },
            /**
             * @param {string} walkers
             * @param {?} opt_attributes
             * @param {Object} details
             * @return {undefined}
             */
            msgbox : function(walkers, opt_attributes, details) {
                QW.Panel._sysDialog("msgbox", walkers, null, opt_attributes, details);
            }
        };
        return prompt;
    }();
    QW.provide({
        PanelManager : test,
        /** @type {function (?): ?} */
        BasePanel : data,
        /** @type {function (?): ?} */
        LayerPopup : handler,
        /** @type {function (?): ?} */
        LayerDialog : template,
        Panel : Panel
    });
})(), function() {
    /**
     * @param {?} id
     * @return {undefined}
     */
    function View(id) {
        hasOwnProperty(this, id, 1);
        if (!this.lazyRender) {
            this.render();
        }
    }
    /**
     * @param {?} error
     * @return {undefined}
     */
    function item(error) {
        View.call(this, error);
    }
    /**
     * @param {?} k
     * @return {undefined}
     */
    function loop(k) {
        hasOwnProperty(this, k, 1);
        if (!this.lazyRender) {
            this.render();
        }
    }
    /**
     * @param {?} error
     * @return {undefined}
     */
    function Triple(error) {
        View.call(this, error);
    }
    var hasOwnProperty = QW.ObjectH.mix;
    var dropCueOffsetTop = QW.FunctionH.lazyApply;
    var Highcharts = QW.DomU;
    var createElement = Highcharts.createElement;
    var frame = QW.NodeH;
    var self = QW.EventTargetH;
    var bind = self.addEventListener;
    var unbind = self.removeEventListener;
    var fn = self.delegate;
    var back = frame.ancestorNode;
    var len = frame.getCurrentStyle;
    var setStyle = frame.setStyle;
    var $ = frame.getRect;
    var renderRect = frame.setRect;
    var scrollTop = frame.addClass;
    var time = frame.removeClass;
    var parseNode = frame.marginWidth;
    var e = QW.EventH;
    var next = e.getTarget;
    var prevent = e.preventDefault;
    var cb = e.getPageX;
    var callback = e.getPageY;
    var old = QW.CustEvent;
    var that = {
        isDragging : false,
        oDrag : null,
        startDate : null,
        startX : 0,
        startY : 0,
        pageX : 0,
        pageY : 0,
        deltaX : 0,
        deltaY : 0,
        deltaDeltaX : 0,
        deltaDeltaY : 0,
        mouseDownTarget : null,
        /**
         * @param {string} e
         * @param {?} event
         * @return {undefined}
         */
        startDrag : function(e, event) {
        }
    };
    (function() {
        /**
         * @param {?} e
         * @return {undefined}
         */
        var handler = function(e) {
            /** @type {null} */
            var drag = that.oDrag;
            if (drag.fire("beforedragstart") === false) {
                return;
            }
            if (that.isDragging || !drag) {
                return;
            }
            /** @type {boolean} */
            that.isDragging = true;
            bind(document, "mousemove", mouseMove);
            bind(document, "mouseup", mouseup);
            /** @type {Date} */
            that.startDate = new Date;
            /** @type {number} */
            that.deltaX = that.deltaY = that.deltaDeltaX = that.deltaDeltaY = 0;
            that.startX = that.pageX = cb(e);
            that.startY = that.pageY = callback(e);
            that.mouseDownTarget = next(e);
            prevent(e);
            drag.dragstart(e);
        };
        /**
         * @param {?} datum
         * @return {undefined}
         */
        var mouseup = function(datum) {
            /** @type {null} */
            var context = that.oDrag;
            if (!that.isDragging || !context) {
                return;
            }
            context.dragend(datum);
            /** @type {boolean} */
            that.isDragging = false;
            /** @type {null} */
            that.oDrag = null;
            unbind(document, "mousemove", mouseMove);
            unbind(document, "mouseup", mouseup);
        };
        /**
         * @param {Object} e
         * @return {undefined}
         */
        var mouseMove = function(e) {
            /** @type {null} */
            var s = that.oDrag;
            if (!that.isDragging || !s) {
                return;
            }
            var x = cb(e);
            var y = callback(e);
            /** @type {number} */
            that.deltaDeltaX = x - that.pageX;
            /** @type {number} */
            that.deltaDeltaY = y - that.pageY;
            that.pageX = x;
            that.pageY = y;
            /** @type {number} */
            that.deltaX = x - that.startX;
            /** @type {number} */
            that.deltaY = y - that.startY;
            s.drag(e);
        };
        /**
         * @param {string} e
         * @param {Function} event
         * @return {undefined}
         */
        that.startDrag = function(e, event) {
            if (that.isDragging) {
                return;
            }
            /** @type {Function} */
            that.oDrag = event;
            handler(e);
        };
    })();
    (function() {
        /** @type {Array} */
        View.EVENTS = ["dragstart", "drag", "dragend"];
        /**
         * @param {?} h
         * @return {?}
         */
        var hue = function(h) {
            return parseFloat(h) || 0;
        };
        View.prototype = {
            oSrc : null,
            oHdl : null,
            oProxy : null,
            xAttr : "left",
            yAttr : "top",
            maxXAttr : null,
            minXAttr : null,
            maxYAttr : null,
            minYAttr : null,
            xFixed : false,
            yFixed : false,
            className : "proxy-dd",
            withProxy : false,
            showProxy : true,
            getProxy : function() {
                /** @type {null} */
                var files = null;
                return function() {
                    var f = this.oProxy || files;
                    return f || (f = createElement("div", {
                        className : this.className
                    }), document.body.appendChild(f), f.style.display = "none"), this.oProxy = f;
                };
            }(),
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragstart : function(e) {
                var self = this;
                if (self.oHdl.setCapture) {
                    self.oHdl.setCapture();
                }
                self.startXAttr = hue(len(self.oSrc, self.xAttr.replace(/^-/, "")));
                self.startYAttr = hue(len(self.oSrc, self.yAttr.replace(/^-/, "")));
                if (self.withProxy) {
                    var plugin = self.getProxy();
                    var backgroundBounds = $(self.oSrc);
                    renderRect(plugin, backgroundBounds.left, backgroundBounds.top, backgroundBounds.width, backgroundBounds.height, false);
                    self.startXAttrProxy = hue(plugin.style[self.xAttr.replace(/^-/, "")]);
                    self.startYAttrProxy = hue(plugin.style[self.yAttr.replace(/^-/, "")]);
                    /** @type {number} */
                    plugin.__deltaX = plugin.__deltaY = 0;
                    dropCueOffsetTop(function() {
                        if (self.showProxy) {
                            /** @type {string} */
                            plugin.style.display = "block";
                        }
                    }, null, [], 20, function() {
                        return self != that.oDrag || plugin.style.display != "none" ? -1 : that.deltaX * that.deltaX + that.deltaY * that.deltaY > 4 || new Date - that.startDate > 500 ? 1 : 0;
                    });
                }
                self.fire("dragstart");
            },
            /**
             * @param {Object} event
             * @return {undefined}
             */
            drag : function(event) {
                var el = this;
                var AXIS_INDEX = {
                    X : 1,
                    Y : 1
                };
                var offset;
                for (offset in AXIS_INDEX) {
                    /** @type {string} */
                    var on = offset.toLowerCase();
                    if (!el[on + "Fixed"]) {
                        /** @type {number} */
                        var scrollHeight = (el[on + "Attr"].indexOf("-") == 0 ? -1 : 1) * that["delta" + offset];
                        if (el["max" + offset + "Attr"] != null) {
                            /** @type {number} */
                            scrollHeight = Math.min(scrollHeight, el["max" + offset + "Attr"] - el["start" + offset + "Attr"]);
                        }
                        if (el["min" + offset + "Attr"] != null) {
                            /** @type {number} */
                            scrollHeight = Math.max(scrollHeight, el["min" + offset + "Attr"] - el["start" + offset + "Attr"]);
                        }
                        if (el.withProxy) {
                            try {
                                setStyle(el.oProxy, el[on + "Attr"], el["start" + offset + "AttrProxy"] + scrollHeight + "px");
                            } catch (o) {
                            }
                            /** @type {number} */
                            el.oProxy["__delta" + offset] = scrollHeight;
                        } else {
                            setStyle(el.oSrc, el[on + "Attr"].replace(/^-/, ""), el["start" + offset + "Attr"] + scrollHeight + "px");
                        }
                    }
                }
                el.fire("drag");
            },
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragend : function(e) {
                var object = this;
                if (object.oHdl.releaseCapture) {
                    object.oHdl.releaseCapture();
                }
                if (object.withProxy) {
                    var n = object.oProxy;
                    /** @type {string} */
                    n.style.display = "none";
                    if (!object.xFixed) {
                        setStyle(object.oSrc, object.xAttr.replace(/^-/, ""), object.startXAttr + n.__deltaX + "px");
                    }
                    if (!object.yFixed) {
                        setStyle(object.oSrc, object.yAttr.replace(/^-/, ""), object.startYAttr + n.__deltaY + "px");
                    }
                }
                object.fire("dragend");
            },
            /**
             * @return {undefined}
             */
            render : function() {
                var self = this;
                if (self._rendered) {
                    return;
                }
                old.createEvents(self, View.EVENTS);
                if (self.delegateContainer) {
                    fn(self.delegateContainer, self.oHdlSelector, "mousedown", function(e) {
                        self.oHdl = this;
                        if (self.oSrcSelector) {
                            self.oSrc = back(this, self.oSrcSelector);
                        } else {
                            self.oSrc = self.oHdl;
                        }
                        that.startDrag(e && e.core || e, self);
                    });
                } else {
                    self.oHdl = self.oHdl || self.oSrc;
                    bind(self.oHdl, "mousedown", function(datum) {
                        that.startDrag(datum, self);
                    });
                }
                /** @type {boolean} */
                self._rendered = true;
            }
        };
    })();
    (function() {
        /** @type {function (?): undefined} */
        item.MENTOR_CLASS = View;
        item.prototype = {
            xAttr : "width",
            yAttr : "height",
            minXAttr : 0,
            minYAttr : 0
        };
        hasOwnProperty(item.prototype, View.prototype);
    })();
    (function() {
        /** @type {Array} */
        loop.EVENTS = ["dragstart", "drag", "dragend"];
        loop.prototype = {
            oProxy : null,
            oHdl : null,
            getProxy : function() {
                /** @type {null} */
                var files = null;
                return function() {
                    var f = this.oProxy || files;
                    return f || (f = createElement("div", {
                        className : "proxy-rectselector"
                    }), document.body.appendChild(f), f.style.display = "none"), this.oProxy = f;
                };
            }(),
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragstart : function(e) {
                this.oProxy = this.getProxy();
                var x = this;
                dropCueOffsetTop(function() {
                    /** @type {string} */
                    x.oProxy.style.display = "block";
                }, null, [], 10, function() {
                    return x != that.oDrag || x.oProxy.style.display != "none" ? -1 : that.deltaX * that.deltaX + that.deltaY * that.deltaY > 2 ? 1 : 0;
                });
                if (this.oHdl.setCapture) {
                    this.oHdl.setCapture();
                }
                renderRect(this.oProxy, that.startX, that.startY, 1, 1);
                this.fire("dragstart");
            },
            /**
             * @param {Object} event
             * @return {undefined}
             */
            drag : function(event) {
                renderRect(this.oProxy, Math.min(that.startX, that.pageX), Math.min(that.startY, that.pageY), Math.abs(that.deltaX), Math.abs(that.deltaY));
                this.fire("drag");
            },
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragend : function(e) {
                if (this.oHdl.releaseCapture) {
                    this.oHdl.releaseCapture();
                }
                /** @type {string} */
                this.oProxy.style.display = "none";
                this.fire("dragend");
            },
            /**
             * @return {undefined}
             */
            render : function() {
                var self = this;
                if (self._rendered) {
                    return;
                }
                old.createEvents(self, loop.EVENTS);
                bind(self.oHdl, "mousedown", function(name) {
                    if (self.ignoreLeftButtonDrag && (e.getEvent(name) || {}).button & 2) {
                        return;
                    }
                    if (self.blackSelectors4Start) {
                        var p = next(name);
                        /** @type {Array} */
                        var players = [];
                        for (;p;) {
                            if (p.tagName) {
                                players.push(p);
                            }
                            p = p.parentNode;
                        }
                        if (QW.Selector.filter(players, self.blackSelectors4Start).length) {
                            return;
                        }
                        that.startDrag(name, self);
                    } else {
                        if (next(name) == self.oHdl) {
                            that.startDrag(name, self);
                        }
                    }
                });
                /** @type {boolean} */
                self._rendered = true;
            }
        };
    })();
    (function() {
        /** @type {function (?): undefined} */
        Triple.MENTOR_CLASS = View;
        Triple.prototype = {
            withProxy : true,
            isInline : false,
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragstart : function(e) {
                scrollTop(this.oSrc, "dragingModule");
                View.prototype.dragstart.call(this, e);
            },
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragend : function(e) {
                time(this.oSrc, "dragingModule");
                View.prototype.dragend.call(this, e);
            },
            /**
             * @param {Event} e
             * @return {undefined}
             */
            adjustLayout : function(e) {
                var node = this;
                var startX = that.pageX;
                var y = that.pageY;
                var codeSegments = node.siblings;
                var resultItems = node.containers;
                /** @type {string} */
                var mixinClass = node.isInline ? "deltaDeltaX" : "deltaDeltaY";
                var s;
                if (e.type == "dragstart") {
                    if (node.__elAnim) {
                        node.__elAnim.pause();
                    }
                } else {
                    if (e.type == "drag") {
                        if (resultItems || codeSegments) {
                            /** @type {boolean} */
                            var a = false;
                            s = $(node.oSrc);
                            var offsets = parseNode(node.oSrc);
                            if (startX >= s.left - offsets[3] && (startX <= s.right + offsets[1] && (y >= s.top - offsets[0] && y <= s.bottom + offsets[2]))) {
                                return;
                            }
                            /** @type {number} */
                            var i = 0;
                            for (;codeSegments != null && i < codeSegments.length;i++) {
                                var div = codeSegments[i];
                                if (div == node.oSrc) {
                                    continue;
                                }
                                s = $(div);
                                offsets = parseNode(div);
                                if (startX >= s.left - offsets[3] && (startX <= s.right + offsets[1] && (y >= s.top - offsets[0] && y <= s.bottom + offsets[2]))) {
                                    if (that[mixinClass] > 0) {
                                        div.parentNode.insertBefore(node.oSrc, div.nextSibling);
                                    } else {
                                        if (that[mixinClass] < 0) {
                                            div.parentNode.insertBefore(node.oSrc, div);
                                        }
                                    }
                                    /** @type {boolean} */
                                    a = true;
                                    break;
                                }
                            }
                            /** @type {number} */
                            i = 0;
                            for (;!a && (resultItems != null && i < resultItems.length);i++) {
                                div = resultItems[i];
                                s = $(div);
                                if (startX > s.left + 1 && (startX < s.right - 1 && (y > s.top + 1 && y < s.bottom - 1))) {
                                    if (div.lastChild != node.oSrc) {
                                        div.appendChild(node.oSrc);
                                        /** @type {boolean} */
                                        a = true;
                                    }
                                    break;
                                }
                            }
                            if (a) {
                                if (node.oHdl.setCapture) {
                                    node.oHdl.setCapture();
                                }
                            }
                        }
                    }
                }
                if (e.type == "dragend" && (node.needAnim && QW.ElAnim)) {
                    s = $(node.oSrc);
                    /** @type {string} */
                    node.oProxy.style.display = "block";
                    var anim = new QW.ElAnim(node.oProxy, {
                        width : {
                            to : s.width
                        },
                        height : {
                            to : s.height
                        },
                        left : {
                            to : s.left
                        },
                        top : {
                            to : s.top
                        }
                    }, 300);
                    anim.on("end", function() {
                        /** @type {string} */
                        node.oProxy.style.display = "none";
                    });
                    anim.play();
                    node.oProxy.__elAnim = anim;
                }
            },
            /**
             * @return {undefined}
             */
            render : function() {
                var _this = this;
                View.prototype.render.call(_this);
            }
        };
        hasOwnProperty(Triple.prototype, View.prototype);
    })();
    QW.provide({
        DragManager : that,
        /** @type {function (?): undefined} */
        SimpleDrag : View,
        /** @type {function (?): undefined} */
        SimpleResize : item,
        /** @type {function (?): undefined} */
        LayoutDrag : Triple,
        /** @type {function (?): undefined} */
        RectSelector : loop
    });
}(), function() {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function cookie(options) {
        options = options || {};
        this.path = options.path || "/";
        this.domain = options.domain || "";
        this.expires = options.expires || 31536E6;
        this.secure = options.secure || "";
    }
    cookie.prototype = {
        /**
         * @param {string} key
         * @param {string} value
         * @return {undefined}
         */
        set : function(key, value) {
            /** @type {Date} */
            var time = new Date;
            if (typeof this.expires == "number") {
                time.setTime(time.getTime() + this.expires);
            }
            /** @type {string} */
            document.cookie = key + "=" + escape(value) + ";expires=" + time.toGMTString() + ";path=" + this.path + (this.domain == "" ? "" : "; domain=" + this.domain) + (this.secure ? "; secure" : "");
        },
        /**
         * @param {(number|string)} recurring
         * @return {?}
         */
        get : function(recurring) {
            var the_cookie;
            /** @type {RegExp} */
            var pr_chunkPattern = new RegExp("(^| )" + recurring + "=([^;]*)(;|$)");
            return(the_cookie = document.cookie.match(pr_chunkPattern)) ? unescape(the_cookie[2]) : "";
        },
        /**
         * @param {string} key
         * @return {undefined}
         */
        remove : function(key) {
            var expires = this.expires;
            /** @type {number} */
            this.expires = -31536E6;
            this.set(key, "");
            this.expires = expires;
        }
    };
    /**
     * @param {string} props
     * @param {string} value
     * @param {?} buf
     * @return {undefined}
     */
    cookie.set = function(props, value, buf) {
        (new cookie(buf)).set(props, value);
    };
    /**
     * @param {(number|string)} recurring
     * @param {string} property
     * @return {?}
     */
    cookie.get = function(recurring, property) {
        return(new cookie(property)).get(recurring);
    };
    /**
     * @param {string} token
     * @param {Element} arr
     * @return {undefined}
     */
    cookie.remove = function(token, arr) {
        (new cookie(arr)).remove(token);
    };
    QW.provide("Cookie", cookie);
}(), function() {
    /**
     * @param {?} options
     * @return {undefined}
     */
    function Store(options) {
        QW.ObjectH.mix(this, options, true);
        if (!this.lazyRender) {
            this.render();
        }
    }
    /** @type {boolean} */
    var t = /msie/i.test(navigator.userAgent);
    var extractElementNode = QW.EventH.getTarget;
    var createElement = QW.DomU.createElement;
    var bind = QW.EventTargetH.addEventListener;
    var options = QW.NodeH;
    var remove = options.hasClass;
    var $ = options.addClass;
    var on = options.removeClass;
    var callback = options.replaceClass;
    var inverse = options.show;
    var effect = options.hide;
    var traverseNode = options.ancestorNode;
    var require = options.g;
    /** @type {number} */
    var d = 0;
    Store.prototype = {
        rootItemData : ["folderRoot", "0", "Root\u793a\u4f8b"],
        /**
         * @param {number} i
         * @return {undefined}
         */
        loadItemsData : function(i) {
            this.setItemsData(i, this.dataSource[i], true);
        },
        /**
         * @param {?} tokens
         * @return {?}
         */
        getItemHtml : function(tokens) {
            return "\u9700\u8981\u91cd\u5199";
        },
        /**
         * @param {number} _xhr
         * @return {?}
         */
        getNoDataHtml : function(_xhr) {
            return "\u6ca1\u6709\u6570\u636e";
        },
        /**
         * @param {number} data
         * @param {Array} errors
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        setItemsData : function(data, errors, dataAndEvents) {
            var Block = require(this._idPre + data);
            if (!Block) {
                alert("\u7a0b\u5e8f\u9519\u8bef\uff1a\u8282\u70b9\u8fd8\u6ca1\u751f\u6210\uff1a" + data);
                return;
            }
            Block.itemsData = errors || [];
            /** @type {boolean} */
            Block.dataIsLoading = false;
            if (dataAndEvents) {
                this._renderItems(data);
            }
        },
        /**
         * @param {number} classNames
         * @return {undefined}
         */
        openFolder : function(classNames) {
            var me = require(this._idPre + classNames);
            if (!me) {
                alert("\u7a0b\u5e8f\u9519\u8bef\uff1a\u8282\u70b9\u8fd8\u6ca1\u751f\u6210\uff1a" + classNames);
                return;
            }
            var optgroup = me.childNodes[2];
            if (!optgroup.innerHTML) {
                if (!me.itemsData) {
                    if (!me.dataIsLoading) {
                        $(me.firstChild, "folder-img-loading");
                        this.loadItemsData(classNames);
                    }
                }
                this._renderItems(classNames, true);
            }
            callback(me, "folder-closed", "folder-open");
            callback(me.firstChild, "folder-img-closed", "folder-img-open");
            inverse(optgroup);
        },
        /**
         * @param {string} i
         * @return {undefined}
         */
        closeFolder : function(i) {
            var content = require(this._idPre + i);
            if (!content) {
                alert("\u7a0b\u5e8f\u9519\u8bef\uff1a\u8282\u70b9\u8fd8\u6ca1\u751f\u6210\uff1a" + i);
                return;
            }
            callback(content, "folder-open", "folder-closed");
            callback(content.firstChild, "folder-img-open", "folder-img-closed");
            effect(content.childNodes[2]);
        },
        /**
         * @param {Array} codeSegments
         * @return {undefined}
         */
        openFolders : function(codeSegments) {
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
                this.openFolder(codeSegments[i]);
            }
        },
        /**
         * @param {number} classNames
         * @return {undefined}
         */
        refreshFolder : function(classNames) {
            var dom = require(this._idPre + classNames);
            if (!dom) {
                alert("\u7a0b\u5e8f\u9519\u8bef\uff1a\u8282\u70b9\u8fd8\u6ca1\u751f\u6210\uff1a" + classNames);
                return;
            }
            $(dom.firstChild, "folder-img-loading");
            /** @type {string} */
            dom.childNodes[2].innerHTML = "";
            this.loadItemsData(classNames);
        },
        /**
         * @param {string} path
         * @return {undefined}
         */
        focusItem : function(path) {
            var o = require(this._idPre + path);
            if (!o) {
                alert("\u7a0b\u5e8f\u9519\u8bef\uff1a\u8282\u70b9\u8fd8\u6ca1\u751f\u6210\uff1a" + path);
                return;
            }
            var a = o.getElementsByTagName("a");
            try {
                if (a.length) {
                    if (this._highlightEl) {
                        try {
                            on(this._highlightEl, "highlight");
                        } catch (r) {
                        }
                    }
                    var next = a[0];
                    next.focus();
                    $(next, "highlight");
                    this._highlightEl = next;
                } else {
                    o.scrollIntoView();
                }
            } catch (s) {
            }
        },
        _highlightEl : null,
        _idPre : "",
        /**
         * @param {number} data
         * @param {boolean} dataAndEvents
         * @return {?}
         */
        _renderItems : function(data, dataAndEvents) {
            var dom = require(this._idPre + data);
            var codeSegments = dom.itemsData;
            if (!codeSegments) {
                return dataAndEvents || alert("\u8fd8\u6ca1\u6709load\u51fa\u6570\u636e\u6765\u5462!"), false;
            }
            var elem = dom.childNodes[2];
            if (codeSegments.length) {
                /** @type {Array} */
                var tmp_arr = [];
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    var tokens = codeSegments[i];
                    var ast = this.getItemHtml(tokens);
                    if (tokens[0].toLowerCase().indexOf("folder") > -1) {
                        /** @type {string} */
                        tmp_arr[i] = '<li id="' + this._idPre + tokens[1] + '" class="folder-closed ' + tokens[0] + '"><span class="folder-img-closed ' + tokens[0] + '">&nbsp;</span><div class="node-ctn">' + ast + '</div><ul style="display:none"></ul></li>';
                    } else {
                        /** @type {string} */
                        tmp_arr[i] = '<li id="' + this._idPre + tokens[1] + '" class="folder-closed ' + tokens[0] + '"><div class="node-ctn">' + ast + "</div></li>";
                    }
                }
                /** @type {string} */
                elem.innerHTML = tmp_arr.join("");
            } else {
                /** @type {string} */
                elem.innerHTML = "<li>" + this.getNoDataHtml(data) + "</li>";
            }
            on(dom.firstChild, "folder-img-loading");
        },
        /**
         * @param {?} event
         * @return {undefined}
         */
        _mouseover : function(event) {
            var node = extractElementNode(event);
            if (node.tagName == "UL") {
                return;
            }
            if (node.tagName != "LI") {
                node = traverseNode(node, "LI");
            }
            var statsTemplate = node.getElementsByTagName("div")[0];
            if (statsTemplate) {
                $(statsTemplate, "ms-over");
            }
        },
        /**
         * @param {?} e
         * @return {undefined}
         */
        _mouseout : function(e) {
            var node = extractElementNode(e);
            if (node.tagName == "UL") {
                return;
            }
            if (node.tagName != "LI") {
                node = traverseNode(node, "LI");
            }
            var failuresLink = node.getElementsByTagName("div")[0];
            if (failuresLink) {
                on(failuresLink, "ms-over");
            }
        },
        /**
         * @param {?} element
         * @return {undefined}
         */
        _click : function(element) {
            var node = extractElementNode(element);
            if (remove(node, "folder-img-closed")) {
                this.openFolder(node.parentNode.id.substr(this._idPre.length));
            } else {
                if (remove(node, "folder-img-open")) {
                    this.closeFolder(node.parentNode.id.substr(this._idPre.length));
                }
            }
        },
        /**
         * @return {undefined}
         */
        render : function() {
            var self = this;
            if (self._rendered) {
                return;
            }
            /** @type {boolean} */
            self._rendered = true;
            /** @type {string} */
            this._idPre = "tree" + (self.treeId == undefined ? ++d : self.treeId) + "_";
            var r = self.rootItemData;
            /** @type {string} */
            self.treeCtn.innerHTML = '<ul class="tree-wrap"><li id="' + this._idPre + r[1] + '"><span class="folder-img-root ' + r[0] + '">&nbsp;</span><div class="node-ctn">' + r[2] + '</div><ul style="display:none" class="tree-wrap-inner"></ul></li></ul>';
            var li = this.treeCtn.firstChild;
            bind(li, "mouseover", function(event) {
                self._mouseover(event);
            });
            bind(li, "mouseout", function(e) {
                self._mouseout(e);
            });
            bind(li, "click", function(e) {
                self._click(e);
            });
            self.openFolder(r[1]);
        }
    };
    QW.provide("Tree", Store);
}(), function() {
    /**
     * @param {Object} r
     * @return {undefined}
     */
    function $(r) {
        callback(this, r);
        this.render();
    }
    /**
     * @param {?} opt_id
     * @return {?}
     */
    function Worker(opt_id) {
        return document.getElementById(opt_id);
    }
    /**
     * @param {string} url
     * @return {undefined}
     */
    var loadScript = function(url) {
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        /** @type {Element} */
        var script = document.createElement("script");
        /** @type {boolean} */
        var r = false;
        /** @type {string} */
        script.src = url;
        /** @type {string} */
        script.charset = "utf-8";
        /** @type {function (): undefined} */
        script.onerror = script.onload = script.onreadystatechange = function() {
            if (!r) {
                if (!this.readyState || (this.readyState == "loaded" || this.readyState == "complete")) {
                    /** @type {boolean} */
                    r = true;
                    head.removeChild(script);
                }
            }
        };
        head.insertBefore(script, head.firstChild);
    };
    /**
     * @param {Element} d
     * @param {Object} c
     * @return {?}
     */
    var callback = function(d, c) {
        var p;
        for (p in c) {
            d[p] = c[p];
        }
        return d;
    };
    /**
     * @param {string} el
     * @param {Object} r
     * @return {?}
     */
    var create = function(el, r) {
        return callback(document.createElement(el), r);
    };
    /**
     * @param {Event} e
     * @return {?}
     */
    var fn = function(e) {
        return e = e || window.event, e.target || e.srcElement;
    };
    /**
     * @param {Event} e
     * @return {?}
     */
    var handleEvent = function(e) {
        return e = e || window.event, e.which || (e.keyCode || e.charCode);
    };
    /**
     * @param {Event} e
     * @return {undefined}
     */
    var preventDefault = function(e) {
        e = e || window.event;
        if (!(e.preventDefault && e.preventDefault())) {
            /** @type {boolean} */
            e.returnValue = false;
        }
    };
    /**
     * @param {Element} el
     * @param {string} selector
     * @return {?}
     */
    var hasClass = function(el, selector) {
        return(new RegExp("(?:^|\\s)" + selector + "(?:\\s|$)", "i")).test(el.className);
    };
    /**
     * @param {Element} el
     * @param {string} className
     * @return {undefined}
     */
    var addClass = function(el, className) {
        if (!hasClass(el, className)) {
            /** @type {string} */
            el.className = (el.className + " " + className).replace(/^\s+|\s+$/g, "");
        }
    };
    /**
     * @param {Element} el
     * @param {string} className
     * @return {undefined}
     */
    var removeClass = function(el, className) {
        if (hasClass(el, className)) {
            el.className = el.className.replace(new RegExp("(?:\\s|^)" + className + "(?:\\s|$)", "i"), " ").replace(/^\s+|\s+$/g, "");
        }
    };
    /**
     * @param {HTMLElement} el
     * @param {string} name
     * @param {HTMLElement} fn
     * @return {?}
     */
    var click = function(el, name, fn) {
        do {
            if (el.tagName == name) {
                return el;
            }
        } while (el != fn && (el = el.parentNode));
        return null;
    };
    /**
     * @param {HTMLElement} elem
     * @param {string} type
     * @param {Function} cb
     * @return {undefined}
     */
    var addEvent = function(elem, type, cb) {
        if (elem.addEventListener) {
            elem.addEventListener(type, cb, false);
        } else {
            elem.attachEvent("on" + type, cb);
        }
    };
    /** @type {boolean} */
    var p = /msie/i.test(navigator.userAgent);
    $.prototype = {
        width : 0,
        oText : null,
        itemsData : null,
        oMenu : null,
        oWrap : null,
        selectedIndex : -1,
        filteredValue : "",
        filteringValue : "",
        acValue : "",
        closed : false,
        /**
         * @return {undefined}
         */
        show : function() {
            if (this.oText.value) {
                if (this.oMenu.childNodes.length) {
                    /** @type {string} */
                    this.oWrap.style.display = "";
                }
            }
        },
        /**
         * @return {undefined}
         */
        hide : function() {
            /** @type {string} */
            this.oWrap.style.display = "none";
        },
        /**
         * @return {undefined}
         */
        refreshItems : function() {
            var me = this;
            var codeSegments = me.itemsData;
            if (codeSegments && !codeSegments.__isItemsDataRendered) {
                /** @type {Array} */
                var tagNameArr = [];
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    tagNameArr.push('<li acValue="' + codeSegments[i].encode4Html().replace(/"/g, "&quot;") + '">' + codeSegments[i].encode4Html() + "</li>");
                }
                /** @type {string} */
                me.oMenu.innerHTML = tagNameArr.join("").replace(/(<\w+)/g, '$1 unselectable="on"');
                if (codeSegments.length) {
                    me.show();
                } else {
                    me.hide();
                }
                me.filteredValue = me.filteringValue;
                /** @type {string} */
                me.acValue = "";
                /** @type {number} */
                me.selectedIndex = -1;
                /** @type {boolean} */
                codeSegments.__isItemsDataRendered = true;
            }
        },
        /**
         * @param {number} index
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        setSelectedIndex : function(index, dataAndEvents) {
            var e = this;
            var children = e.oMenu.childNodes;
            if (children.length) {
                if (e.selectedIndex > -1) {
                    removeClass(children[e.selectedIndex], "selected");
                }
                /** @type {number} */
                index = (index + children.length + 1) % (children.length + 1);
                if (index == children.length) {
                    e.acValue = e.oText.value = e.filteringValue;
                    /** @type {number} */
                    index = -1;
                } else {
                    e.acValue = e.oText.value = children[index].getAttribute("acValue");
                    addClass(children[index], "selected");
                }
            } else {
                /** @type {number} */
                index = -1;
            }
            /** @type {number} */
            e.selectedIndex = index;
        },
        /**
         * @return {undefined}
         */
        render : function() {
            var self = this;
            if (self._rendered) {
                return;
            }
            /** @type {boolean} */
            self._rendered = true;
            var div = create("div", {
                className : "ac_wrap",
                innerHTML : "<div class=ac_wrap_inner><div class=ac_menu_ctn><ul class=ac_menu></ul></div></div>".replace(/(<\w+)/g, '$1 unselectable="on"')
            });
            var el = self.oText;
            W(div).insertTo("afterend", W(el).parentNode());
            var that = self.oMenu = div.getElementsByTagName("ul")[0];
            el.setAttribute("autoComplete", "off");
            self.oWrap = div;
            self.hide();
            addEvent(self.oText, "dblclick", function(dataAndEvents) {
                self.show();
            });
            addEvent(self.oText, "keydown", function(e) {
                var item = handleEvent(e);
                /** @type {number} */
                var val = 0;
                switch(item) {
                    case 40:
                        /** @type {number} */
                        val = 1;
                        break;
                    case 38:
                        /** @type {number} */
                        val = -1;
                        break;
                    case 27:
                        if (!self.closed) {
                            self.hide();
                            /** @type {boolean} */
                            self.closed = true;
                            preventDefault(e);
                        }
                        break;
                    case 13:
                        self.hide();
                        if (self.onenter) {
                            self.onenter();
                        }
                        preventDefault(e);
                }
                if (val) {
                    if (el.value) {
                        preventDefault(e);
                        if (div.style.display == "none") {
                            self.show();
                            /** @type {boolean} */
                            self.closed = false;
                        } else {
                            self.setSelectedIndex(self.selectedIndex + val);
                        }
                    }
                }
            });
            addEvent(self.oText, "focus", function(dataAndEvents) {
                if (!self.closed) {
                    self.show();
                }
                clearInterval(self._refreshTimer);
                /** @type {number} */
                self._refreshTimer = setInterval(function() {
                    var width = el.value;
                    if (width) {
                        if (!self.closed) {
                            if (width != self.filteredValue) {
                                if (width != self.filteringValue) {
                                    if (width != self.acValue) {
                                        self.filteringValue = width;
                                        self.refreshData();
                                    }
                                }
                            }
                            if (self.itemsData) {
                                self.refreshItems();
                            }
                        }
                    } else {
                        /** @type {string} */
                        self.acValue = self.filteringValue = self.filteredValue = "";
                        self.hide();
                        /** @type {boolean} */
                        self.closed = false;
                    }
                }, 100);
            });
            addEvent(self.oText, "blur", function(dataAndEvents) {
                self.hide();
                clearInterval(self._refreshTimer);
            });
            /**
             * @param {Event} evt
             * @return {undefined}
             */
            div.onmousedown = function(evt) {
                if (p) {
                    el.setCapture();
                    setTimeout(function() {
                        el.releaseCapture();
                    }, 10);
                }
                preventDefault(evt);
            };
            /**
             * @param {Event} e
             * @return {undefined}
             */
            that.onclick = function(e) {
                var button = fn(e);
                var element = click(button, "LI", that);
                if (element) {
                    el.blur();
                    setTimeout(function() {
                        el.focus();
                    }, 10);
                    /** @type {number} */
                    var ind = 0;
                    var p = element;
                    for (;p = p.previousSibling;) {
                        ind++;
                    }
                    self.setSelectedIndex(ind, true);
                    self.hide();
                    if (self.onselectitem) {
                        self.onselectitem();
                    }
                }
            };
            /**
             * @param {Event} e
             * @return {undefined}
             */
            that.onmouseover = function(e) {
                var button = fn(e);
                var btn = click(button, "LI", that);
                if (btn) {
                    addClass(btn, "hover");
                }
            };
            /**
             * @param {Event} e
             * @return {undefined}
             */
            that.onmouseout = function(e) {
                var button = fn(e);
                var btn = click(button, "LI", that);
                if (btn) {
                    removeClass(btn, "hover");
                }
            };
        }
    };
    /** @type {function (Object): undefined} */
    window.ComboBox = $;
}();
var TypeHelpers = new function() {
    var hasSmoothing = this;
    /**
     * @return {?}
     */
    hasSmoothing.hasSmoothing = function() {
        if (typeof screen.fontSmoothingEnabled != "undefined") {
            return screen.fontSmoothingEnabled;
        }
        try {
            /** @type {Element} */
            var canvas = document.createElement("canvas");
            /** @type {string} */
            canvas.width = "35";
            /** @type {string} */
            canvas.height = "35";
            /** @type {string} */
            canvas.style.display = "none";
            document.body.appendChild(canvas);
            var ctx = canvas.getContext("2d");
            /** @type {string} */
            ctx.textBaseline = "top";
            /** @type {string} */
            ctx.font = "32px Arial";
            /** @type {string} */
            ctx.fillStyle = "black";
            /** @type {string} */
            ctx.strokeStyle = "black";
            ctx.fillText("E", 0, 0);
            /** @type {number} */
            var y_offset = 8;
            for (;y_offset <= 32;y_offset++) {
                /** @type {number} */
                var x_offset = 1;
                for (;x_offset <= 32;x_offset++) {
                    var params = ctx.getImageData(x_offset, y_offset, 1, 1).data;
                    var param = params[3];
                    if (param != 255 && param != 0) {
                        return document.body.removeChild(canvas), true;
                    }
                }
            }
            return document.body.removeChild(canvas), false;
        } catch (o) {
            return null;
        }
    };
    /**
     * @return {undefined}
     */
    hasSmoothing.insertClasses = function() {
        /** @type {boolean} */
        var showMessage = navigator.userAgent.indexOf("Windows NT 5") > -1;
        var body = showMessage ? hasSmoothing.hasSmoothing() : true;
        var elem = document.getElementsByTagName("html")[0];
        if (body != 1) {
            elem.className += " hasFontSmoothing-false";
        }
    };
};
Dom.ready(function() {
    TypeHelpers.insertClasses();
}), namespace("yunpn.util"), yunpn.util.imgSize = function() {
    /**
     * @return {undefined}
     */
    function reset() {
        /** @type {number} */
        var i = 0;
        for (;i < tokens.length;i++) {
            if (tokens[i].end) {
                tokens.splice(i--, 1);
            } else {
                tokens[i]();
            }
        }
        if (tokens.length) {
            setTimeout(reset, 40);
        } else {
            clearTimeout(timeoutId);
            /** @type {null} */
            timeoutId = null;
        }
    }
    /** @type {Array} */
    var tokens = [];
    /** @type {null} */
    var timeoutId = null;
    return function(path, handler, callback, next_callback) {
        var parse;
        var exitIconWidth;
        var exitIconHeight;
        var iW;
        var iH;
        /** @type {Image} */
        var image = new Image;
        /** @type {string} */
        image.src = path;
        if (image.complete && !Browser.ie11) {
            handler.call(image);
            if (callback) {
                callback.call(image);
            }
            return;
        }
        exitIconWidth = image.width;
        exitIconHeight = image.height;
        /**
         * @return {undefined}
         */
        parse = function() {
            iW = image.width;
            iH = image.height;
            if (iW !== exitIconWidth || (iH !== exitIconHeight || iW * iH > 1024)) {
                handler.call(image);
                /** @type {boolean} */
                parse.end = true;
            }
        };
        parse();
        /**
         * @return {undefined}
         */
        image.onerror = function() {
            if (next_callback) {
                next_callback.call(image);
            }
            /** @type {boolean} */
            parse.end = true;
            /** @type {null} */
            image = image.onload = image.onerror = null;
        };
        /**
         * @return {undefined}
         */
        image.onload = function() {
            if (!parse.end) {
                parse();
            }
            if (callback) {
                callback.call(image);
            }
            /** @type {null} */
            image = image.onload = image.onerror = null;
        };
        if (!parse.end) {
            tokens.push(parse);
            if (timeoutId === null) {
                /** @type {number} */
                timeoutId = setTimeout(reset, 40);
            }
        }
    };
}(), function() {
    var Event = function() {
        return{
            on : EventTargetH.on,
            toJSONString : ObjectH.stringify,
            encode : StringH.encode4Js
        };
    }();
    var self = window.HistoryManager = function() {
        /**
         * @return {undefined}
         */
        function load() {
            document.write('<input id="' + e + '" style="display:none">');
            Event.on(window, "load", t);
        }
        /**
         * @return {undefined}
         */
        function start() {
            if (Browser.ie < 8) {
                /** @type {string} */
                var t = "/resource/html/bridge_frame.html";
                document.write('<iframe id="' + attribute + '" src="' + t + '" style="display:none"></iframe>');
            } else {
                Event.on(window, "hashchange", function() {
                    reset(on());
                });
            }
            reset(on());
        }
        /**
         * @return {undefined}
         */
        function forEach() {
            document.write('<img src="javascript:location.href=\'javascript:HistoryManager._checkStateChange();\'" style="width:0;height:0;position:absolute;left:-30000px;">');
        }
        /**
         * @return {undefined}
         */
        function t() {
            if (!Browser.safari) {
                if (!Browser.opera) {
                    HistoryManager.isFirstLoaded(function(dataAndEvents) {
                        if (!dataAndEvents) {
                            setTimeout(function() {
                                HistoryManager._onStateChange(on());
                            }, 10);
                        }
                    });
                }
            }
        }
        /**
         * @return {?}
         */
        function on() {
            /** @type {string} */
            var href = window.location.href;
            /** @type {number} */
            var lastSlash = href.indexOf("#");
            return lastSlash >= 0 ? href.substr(lastSlash + 1) : "";
        }
        /**
         * @param {string} target
         * @return {?}
         */
        function create(target) {
            if (target == "") {
                return false;
            }
            /** @type {string} */
            location.hash = target;
        }
        /**
         * @return {undefined}
         */
        function sub() {
            var ended = on();
            if (state != ended) {
                HistoryManager._onStateChange(ended);
                state = ended;
            }
            setTimeout(arguments.callee, 20);
        }
        /**
         * @param {?} evt
         * @return {undefined}
         */
        function reset(evt) {
            if (HistoryManager.listener) {
                HistoryManager.listener.apply(this, [evt]);
            }
            if (Browser.ie) {
                create(evt);
            }
        }
        /**
         * @param {string} value
         * @param {?} ev
         * @return {undefined}
         */
        function _fn(value, ev) {
            /** @type {boolean} */
            this._iframeFirstLoaded = true;
            var node = g(attribute);
            var r = node.src.indexOf("?");
            if (r < 0) {
                node.src += "?" + value;
            } else {
                node.src = node.src.replace(/\?.*$/, "?" + value);
            }
        }
        /** @type {string} */
        var state = "-1";
        /** @type {string} */
        var e = "first_loaded_detect_input";
        /** @type {string} */
        var attribute = "ie_bridge_frame";
        return{
            listener : null,
            /**
             * @return {undefined}
             */
            _init : function() {
                load();
                if (Browser.ie) {
                    start();
                }
                if (Browser.opera) {
                    forEach();
                }
                /** @type {null} */
                this._pageFirstLoaded = null;
            },
            /**
             * @param {Function} project
             * @param {Function} attrs
             * @return {undefined}
             */
            init : function(project, attrs) {
                /** @type {Function} */
                this.listener = project;
                if (attrs) {
                    var attr;
                    for (attr in attrs) {
                        this[attr] = attrs[attr];
                    }
                }
                sub();
            },
            /**
             * @param {Function} drag
             * @return {undefined}
             */
            isFirstLoaded : function(drag) {
                if (!drag) {
                    return;
                }
                var instance = this;
                setTimeout(function() {
                    var input = g(e);
                    if (!input || input.value == "") {
                        /** @type {string} */
                        input.value = "loaded";
                        /** @type {boolean} */
                        instance._pageFirstLoaded = true;
                    } else {
                        /** @type {boolean} */
                        instance._pageFirstLoaded = false;
                    }
                    drag.call(instance, instance._pageFirstLoaded);
                }, 0);
            },
            /**
             * @return {?}
             */
            getCurrentState : function() {
                return state;
            },
            /**
             * @param {string} name
             * @param {string} option
             * @return {undefined}
             */
            add : function(name, option) {
                if (Browser.ie) {
                    if (Browser.ie < 8) {
                        _fn.apply(this, arguments);
                    }
                }
                create(name);
                /** @type {string} */
                state = name;
            },
            _iframeFirstLoaded : true,
            _pageFirstLoaded : null,
            /** @type {function (?): undefined} */
            _onStateChange : reset,
            /** @type {function (): undefined} */
            _checkStateChange : sub
        };
    }();
    self._init();
}(), namespace("yunpn"), yunpn.dialog = function() {
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    function draw(opt_attributes) {
        var defaults = {
            wrapId : "BasePanel" + ++BasePanel,
            className : "panel-t1",
            title : "",
            header : "",
            body : "",
            footer : "",
            withClose : true,
            withCorner : false,
            withCue : false,
            withShadow : false,
            withBgIframe : true,
            keyEsc : true,
            withMask : true,
            dragable : !!QW.SimpleDrag,
            resizable : false,
            posCenter : true,
            posAdjust : false,
            aftershowcallback : null
        };
        Object.mix(defaults, opt_attributes, true);
        var form = new QW.BasePanel(defaults);
        if (defaults.withClose) {
            W(form.oWrap).query(".close").appendChild(W('<a class="close-link" href="###" onclick="return false;"><span>\u5173\u95ed</span></a>'));
        }
        if (opt_attributes.buttons) {
            /** @type {number} */
            var i = 0;
            var valuesLen = opt_attributes.buttons.length;
            for (;i < valuesLen;i++) {
                var item = opt_attributes.buttons[i];
                /** @type {string} */
                var inner = item.cls ? " " + item.cls : "";
                /** @type {string} */
                var s = item.type ? item.type == "blue" ? "blue" : "gray" : item.text == "\u786e\u5b9a" ? "blue" : "gray";
                /** @type {string} */
                var g = item.style ? ' style="' + item.style + '"' : "";
                /** @type {string} */
                var b = item.id ? " id=" + item.id : "";
                /** @type {string} */
                btnHtml = ['<span class="y-btn y-btn-' + s + inner + '"' + g + b + ">", item.withIcon ? '<i class="icon"></i>' : "", item.text, "</span>"].join("");
                var node = W(btnHtml).insertTo("beforeend", form.oFooter);
                if (item.handler) {
                    node.on("click", item.handler);
                }
            }
            W(form.oFooter).css("display", "");
        } else {
            W(form.oFooter).addClass("ft-none");
        }
        return form.on("aftershow", function() {
            var sender = W(form.oContent);
            var viewportSize = sender.getRect();
            W(form.oHeader).css("width", viewportSize.width + "px");
            W(form.oFooter).css("width", viewportSize.width + "px");
            if (opt_attributes.aftershowcallback) {
                opt_attributes.aftershowcallback();
            }
        }), form;
    }
    /** @type {number} */
    var BasePanel = 0;
    return{
        /** @type {function (?): ?} */
        create : draw
    };
}(), namespace("yunpn.util"), yunpn.util.getSwfVersion = function() {
    /** @type {boolean} */
    var e = false;
    return function() {
        if (e === false) {
            /** @type {(Navigator|null)} */
            var nav = navigator;
            if (nav.plugins && nav.mimeTypes.length) {
                var err = nav.plugins["Shockwave Flash"];
                if (err) {
                    if (err.description) {
                        /** @type {string} */
                        e = err.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0";
                    }
                }
            } else {
                if (window.ActiveXObject && !window.opera) {
                    /** @type {number} */
                    var i = 12;
                    for (;i >= 2;i--) {
                        try {
                            var ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                            if (ax) {
                                var lastLine = ax.GetVariable("$version");
                                e = lastLine.replace(/WIN/g, "").replace(/,/g, ".");
                            }
                        } catch (o) {
                        }
                    }
                }
            }
        }
        return e;
    };
}(), yunpn.util.formatByte = function(value, c, sendImmediately) {
    /** @type {string} */
    var signature = "";
    if (Object.isString(value)) {
        /** @type {number} */
        value = parseInt(value);
    }
    if (Object.isString(c)) {
        /** @type {number} */
        c = parseInt(c);
    }
    /** @type {Array} */
    var codeSegments = [1099511627776, 1073741824, 1048576, 1024];
    /** @type {Array} */
    var newArray = ["T", "G", "M", "K"];
    if (c == undefined) {
        /** @type {number} */
        c = 1;
    }
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
        var min = codeSegments[i];
        if (value >= min) {
            signature = (value / min).toFixed(c) + newArray[i];
            break;
        }
    }
    if (!signature) {
        if (value > 0) {
            /** @type {string} */
            signature = "1K";
        } else {
            /** @type {string} */
            signature = "0K";
        }
    }
    if (sendImmediately || typeof sendImmediately == "undefined") {
        signature += "B";
    }
    return signature;
}, yunpn.util.formatTime = function(a) {
    /** @type {Array} */
    var codeSegments = [86400, 3600, 60, 1];
    /** @type {Array} */
    var segs = ["\u5929", "\u5c0f\u65f6", "\u5206", "\u79d2"];
    /** @type {boolean} */
    var didOverShoot = false;
    /** @type {string} */
    var buf = "";
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
        var b = codeSegments[i];
        var seg = segs[i];
        var code;
        if (didOverShoot || a >= b) {
            /** @type {number} */
            code = parseInt(a / b);
            buf += code + seg;
            a %= b;
            /** @type {boolean} */
            didOverShoot = true;
        }
    }
    return buf || "0\u79d2";
}, yunpn.id = yunpn.util.id = function() {
    /** @type {number} */
    var x_yp_ = 0;
    return function() {
        return "x-yp-" + ++x_yp_;
    };
}(), function() {
    /**
     * @param {CSSStyleSheet} sheet
     * @return {undefined}
     */
    function insertRule(sheet) {
        if (!first) {
            first = {};
        }
        try {
            var second = sheet.cssRules || sheet.rules;
            var props;
            /** @type {number} */
            var j = second.length - 1;
            var idx;
            var _len2;
            for (;j >= 0;--j) {
                props = second[j].selectorText;
                if (props) {
                    props = props.split(",");
                    _len2 = props.length;
                    /** @type {number} */
                    idx = 0;
                    for (;idx < _len2;idx++) {
                        first[props[idx].trim().toLowerCase()] = second[j];
                    }
                }
            }
        } catch (u) {
        }
    }
    /**
     * @param {boolean} actual
     * @return {?}
     */
    function expect(actual) {
        if (first === null || actual) {
            first = {};
            /** @type {(StyleSheetList|null)} */
            var sheets = doc.styleSheets;
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var sl = sheets.length;
            for (;i < sl;i++) {
                try {
                    if (!sheets[i].disabled) {
                        insertRule(sheets[i]);
                    }
                } catch (u) {
                }
            }
        }
        return first;
    }
    /**
     * @param {Object} b
     * @param {boolean} str
     * @return {?}
     */
    function isEmpty(b, str) {
        var ret = expect(str);
        var j;
        if (!Object.isArray(b)) {
            return ret[b.toLowerCase()];
        }
        /** @type {number} */
        j = 0;
        for (;j < b.length;j++) {
            if (ret[b[j]]) {
                return ret[b[j].toLowerCase()];
            }
        }
        return null;
    }
    /** @type {null} */
    var first = null;
    /** @type {HTMLDocument} */
    var doc = document;
    /** @type {RegExp} */
    var r20 = /(-[a-z])/gi;
    /**
     * @param {?} dataAndEvents
     * @param {string} match
     * @return {?}
     */
    var upCaseChar = function(dataAndEvents, match) {
        return match.charAt(1).toUpperCase();
    };
    /**
     * @param {string} cssText
     * @param {?} style
     * @return {?}
     */
    yunpn.util.createStyleSheet = function(cssText, style) {
        var sheet;
        var css = doc.getElementsByTagName("head")[0];
        /** @type {Element} */
        var styleSheet = doc.createElement("style");
        styleSheet.setAttribute("type", "text/css");
        if (style) {
            styleSheet.setAttribute("id", style);
        }
        if (Browser.ie) {
            css.appendChild(styleSheet);
            sheet = styleSheet.styleSheet;
            /** @type {string} */
            sheet.cssText = cssText;
        } else {
            try {
                styleSheet.appendChild(doc.createTextNode(cssText));
            } catch (u) {
                /** @type {string} */
                styleSheet.cssText = cssText;
            }
            css.appendChild(styleSheet);
            sheet = styleSheet.styleSheet ? styleSheet.styleSheet : styleSheet.sheet || doc.styleSheets[doc.styleSheets.length - 1];
        }
        return insertRule(sheet), sheet;
    };
    /**
     * @param {Object} value
     * @param {string} deepDataAndEvents
     * @param {string} shallow
     * @return {?}
     */
    yunpn.util.updateRule = function(value, deepDataAndEvents, shallow) {
        var temp;
        var j;
        if (!Object.isArray(value)) {
            temp = isEmpty(value);
            if (temp) {
                return temp.style[deepDataAndEvents.replace(r20, upCaseChar)] = shallow, true;
            }
        } else {
            /** @type {number} */
            j = 0;
            for (;j < value.length;j++) {
                if (yunpn.util.updateRule(value[j], deepDataAndEvents, shallow)) {
                    return true;
                }
            }
        }
        return false;
    };
}(), namespace("yunpn.util"), yunpn.util.Lazyload = function(defaults) {
    /**
     * @return {undefined}
     */
    function move() {
        var scrollTop;
        if (self._isForBody) {
            /** @type {number} */
            scrollTop = document.body.scrollTop || (document.documentElement.scrollTop || 0);
        } else {
            scrollTop = html.scrollTop;
        }
        if (Math.abs(scrollTop - self.scrollTop) > async) {
            self.scrollTop = scrollTop;
            self.loadImg();
        }
    }
    var options = this.options = ObjectH.mix({
        threshold : 0,
        selector : "img",
        lazyLength : 25,
        type : "src"
    }, defaults, true);
    if (!options.container) {
        return;
    }
    this.container = W(options.container);
    if (this.container[0] == document.body) {
        /** @type {boolean} */
        this._isForBody = true;
    }
    this.images = this.container.query(options.selector).toArray();
    if (this._isForBody) {
        /** @type {number} */
        this.scrollTop = document.body.scrollTop || (document.documentElement.scrollTop || 0);
    } else {
        this.scrollTop = this.container[0].scrollTop;
    }
    var self = this;
    var html = self.container[0];
    var async = options.lazyLength;
    var timer;
    /**
     * @return {undefined}
     */
    this._onScroll = function() {
        if (timer) {
            clearTimeout(timer);
            /** @type {null} */
            timer = null;
        }
        /** @type {number} */
        timer = setTimeout(move, options.checkInterval);
    };
    if (!options.checkInterval) {
        /** @type {function (): undefined} */
        this._onScroll = move;
    }
}, yunpn.util.Lazyload.prototype = {
    /**
     * @return {undefined}
     */
    start : function() {
        if (this._isForBody) {
            W(window).on("scroll", this._onScroll);
        } else {
            this.container.on("scroll", this._onScroll);
        }
        this.loadImg();
    },
    /**
     * @return {undefined}
     */
    stop : function() {
        if (this._isForBody) {
            W(window).un("scroll", this._onScroll);
        } else {
            this.container.un("scroll", this._onScroll);
        }
    },
    /**
     * @return {undefined}
     */
    loadImg : function() {
        if (this.images.length <= 0) {
            this.stop();
            return;
        }
        var e = this;
        /** @type {boolean} */
        var src = this.options.type == "src";
        var padding = this.options.threshold;
        /** @type {Array} */
        var images = [];
        var h = this.options.onLoadFunc ? this.options.onLoadFunc : null;
        if (this._isForBody) {
            var w = Dom.getDocRect();
            var walk = w.scrollX;
            var d = w.scrollY;
            var originalWidth_ = w.width;
            var height = w.height;
            this.images.forEach(function(image, dataAndEvents) {
                try {
                    image = W(image);
                    var pos = image.getRect();
                    if (pos.bottom + padding - d < 0 || (pos.top - padding - d > height || (pos.right + padding - walk < 0 || pos.left - padding - walk > originalWidth_))) {
                        images.push(image);
                    } else {
                        if (src) {
                            image.attr("src", image.attr("data-imgurl"));
                        } else {
                            image.setStyle("background-image", "url(" + image.attr("data-imgurl") + ")");
                        }
                    }
                } catch (l) {
                }
            });
        } else {
            var box = this.container.getRect();
            var absolute = box.top;
            var bottom = box.bottom;
            var left = box.left;
            var right = box.right;
            this.images.forEach(function(image, dataAndEvents) {
                try {
                    image = W(image);
                    var pos = image.getRect();
                    if (pos.bottom + padding < absolute || (pos.top - padding > bottom || (pos.right + padding < left || pos.left - padding > right))) {
                        images.push(image);
                    } else {
                        if (src) {
                            if (h) {
                                image.on("load", h);
                            }
                            image.attr("src", image.attr("data-imgurl"));
                        } else {
                            image.setStyle("background-image", "url(" + image.attr("data-imgurl") + ")");
                        }
                    }
                } catch (u) {
                }
            });
        }
        /** @type {Array} */
        this.images = images;
    }
};
if (!Function.prototype.bind) {
    var methodize = QW.HelperH.methodize;
    var mix = QW.ObjectH.mix;
    mix(Function.prototype, methodize({
        bind : QW.FunctionH.bind
    }));
}
namespace("yunpn"), yunpn.Storage = function() {
    /**
     * @param {string} obj
     * @return {?}
     */
    function _(obj) {
        return obj.replace(/[_\s]/g, function(m0) {
            return m0 == "_" ? "__" : "_s";
        });
    }
    /**
     * @return {?}
     */
    function init() {
        var v;
        try {
            if (window.localStorage) {
                v = Storage();
            } else {
                if (window.ActiveXObject) {
                    v = cookie();
                } else {
                    v = Lru();
                }
            }
        } catch (t) {
            if (window.ActiveXObject) {
                v = cookie();
            } else {
                v = Lru();
            }
        }
        return v;
    }
    /**
     * @return {?}
     */
    function cookie() {
        W('<div id="ypStorage" style="display:none;"></div>').insertTo("beforeend", document.body);
        var el = g("ypStorage");
        el.addBehavior("#default#userData");
        /** @type {Date} */
        var exdate = new Date;
        return exdate.setDate(exdate.getDate() + 365), el.expires = exdate.toUTCString(), {
            /**
             * @param {string} obj
             * @param {string} value
             * @return {undefined}
             */
            set : function(obj, value) {
                var attr = _(obj);
                try {
                    el.load("yunpnuserdata");
                    el.setAttribute(attr, value);
                    el.save("yunpnuserdata");
                } catch (s) {
                }
            },
            /**
             * @param {(number|string)} recurring
             * @return {?}
             */
            get : function(recurring) {
                var name = _(recurring);
                /** @type {null} */
                var twipsy = null;
                try {
                    el.load("yunpnuserdata");
                    twipsy = el.getAttribute(name);
                } catch (s) {
                }
                return twipsy;
            },
            /**
             * @param {string} obj
             * @return {undefined}
             */
            del : function(obj) {
                var attr = _(obj);
                try {
                    el.load("yunpnuserdata");
                    el.removeAttribute(attr);
                    el.save("yunpnuserdata");
                } catch (i) {
                }
            }
        };
    }
    /**
     * @return {?}
     */
    function Storage() {
        return{
            /**
             * @param {string} key
             * @param {string} value
             * @param {?} mL
             * @return {undefined}
             */
            set : function(key, value, mL) {
                /** @type {(Storage|null)} */
                var ls = window.localStorage;
                var camelKey = _(key);
                try {
                    ls.setItem(camelKey, value);
                } catch (o) {
                }
            },
            /**
             * @param {(number|string)} recurring
             * @return {?}
             */
            get : function(recurring) {
                /** @type {(Storage|null)} */
                var storage = window.localStorage;
                var storageKey = _(recurring);
                /** @type {null} */
                var id = null;
                var s;
                var o;
                try {
                    /** @type {(null|string)} */
                    id = storage.getItem(storageKey);
                } catch (u) {
                }
                return id;
            },
            /**
             * @param {string} keys
             * @return {undefined}
             */
            del : function(keys) {
                /** @type {(Storage|null)} */
                var storage = window.localStorage;
                var key = _(keys);
                /** @type {null} */
                var camel = null;
                try {
                    /** @type {(null|string)} */
                    camel = storage.getItem(key);
                } catch (s) {
                }
                if (camel) {
                    storage.removeItem(key);
                }
            }
        };
    }
    /**
     * @return {?}
     */
    function Lru() {
        return{
            /**
             * @param {string} key
             * @param {string} value
             * @return {undefined}
             */
            set : function(key, value) {
                Cookie.set(_(key), value);
            },
            /**
             * @param {(number|string)} recurring
             * @return {?}
             */
            get : function(recurring) {
                return Cookie.get(_(recurring));
            },
            /**
             * @param {string} item
             * @return {undefined}
             */
            del : function(item) {
                Cookie.remove(_(item));
            }
        };
    }
    return{
        /**
         * @param {string} props
         * @param {string} value
         * @return {undefined}
         */
        set : function(props, value) {
            var self = this;
            if (!self._storage) {
                self._storage = init();
            }
            self._storage.set(props, value);
        },
        /**
         * @param {(number|string)} recurring
         * @return {?}
         */
        get : function(recurring) {
            var self = this;
            return!self._storage && (self._storage = init()), self._storage.get(recurring);
        },
        /**
         * @param {string} item
         * @return {undefined}
         */
        remove : function(item) {
            var self = this;
            if (!self._storage) {
                self._storage = init();
            }
            self._storage.del(item);
        },
        /**
         * @param {Object} context
         * @return {undefined}
         */
        proxy : function(context) {
            /** @type {string} */
            var t = "http://yunpn.360.cn/resource/html/storage.html#";
            /** @type {Array} */
            var tagNameArr = [];
            var match;
            for (match in context) {
                tagNameArr.push(encodeURIComponent(match) + "=" + encodeURIComponent(context[match]));
            }
            t += tagNameArr.join("&");
            W('<iframe style="display:none;width:0;height:0;border:none" src="' + t + '"></iframe>').insertTo("beforeend", document.body);
        }
    };
}(), Ajax.prototype._execComplete = function() {
    var item = this;
    var elem = item.requester;
    /** @type {Function} */
    elem.onreadystatechange = new Function;
    /** @type {number} */
    item.isLocked = 0;
    clearTimeout(this._timer);
    if (item.state != Ajax.STATE_CANCEL && item.state != Ajax.STATE_TIMEOUT) {
        if (item.isSuccess()) {
            item.state = Ajax.STATE_SUCCESS;
            /** @type {RegExp} */
            var rchecked = /(['"]?)errno\1\s*:\s*(['"]?)\s*(9999|2006|1002)\s*(\2)/i;
            if (rchecked.test(elem.responseText)) {
                if (RegExp.$3 == 2006) {
                    Cookie.remove("Q", {
                        domain : ".360.cn"
                    });
                    Cookie.remove("token", {
                        domain : ".yunpn.360.cn"
                    });
                    /** @type {string} */
                    top.location.href = "/";
                    return;
                }
                if (RegExp.$3 == 9999) {
                    yunpn.Msg.forceAlert(elem.responseText.evalExp().errmsg, {
                        type : "error"
                    });
                    return;
                }
                if (RegExp.$3 == 1002) {
                    if (top.location.hash != "#recycleBin") {
                        /** @type {string} */
                        top.location.href = "/my/index/#sFile/";
                    } else {
                        /** @type {string} */
                        top.location.href = "/my/index/?p=recycleBin";
                    }
                    return;
                }
            }
            item.fire("succeed");
        } else {
            item.state = Ajax.STATE_ERROR;
            item.fire("error");
        }
    }
    item.fire("complete");
}, Ajax.post = function(url, opt_attributes) {
    /** @type {Array.<?>} */
    var results = [].slice.call(arguments, 0);
    return results.push("post"), ObjectH.isObject(results[1]) ? results[1].ajax = 1 : results.splice(1, 0, {
        ajax : 1
    }), Ajax.request.apply(null, results);
}, Ajax.get = function(recurring, property) {
    /** @type {Array.<?>} */
    var args = [].slice.call(arguments, 0);
    return args.push("get"), ObjectH.isObject(args[1]) ? args[1].ajax = 1 : args.splice(1, 0, {
        ajax : 1
    }), Ajax.request.apply(null, args);
}, namespace("yunpn.tip"), yunpn.tip.TipManager = function() {
    /** @type {Array} */
    var configList = [];
    return{
        /**
         * @return {undefined}
         */
        hideAll : function() {
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var valuesLen = configList.length;
            for (;i < valuesLen;i++) {
                configList[i].hide();
            }
        },
        /**
         * @param {?} opt_attributes
         * @return {?}
         */
        create : function(opt_attributes) {
            this.hideAll();
            var name = new yunpn.tip.Tip(opt_attributes);
            return configList.push(name), name;
        }
    };
}(), yunpn.tip.Tip = function() {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function init(options) {
        this.options = options = Object.mix({
            borderRadius : 5,
            borderWidth : 1,
            borderColor : "#000",
            borderOpacity : "1",
            backgroundColor : "#fff",
            backgroundOpactiy : 1,
            width : 200,
            height : 50,
            left : 0,
            top : 0,
            triangleWidth : 11,
            triangleHeight : 6,
            contentCls : "",
            html : "",
            hideType : "delay"
        }, options, true);
        /** @type {number} */
        options.width = parseInt(options.width);
        /** @type {number} */
        options.height = parseInt(options.height);
        /** @type {number} */
        options.borderRadius = parseInt(options.borderRadius);
        /** @type {number} */
        options.borderWidth = parseInt(options.borderWidth);
        /** @type {number} */
        options.triangleHeight = parseInt(options.triangleHeight);
        /** @type {number} */
        options.triangleWidth = parseInt(options.triangleWidth);
        /** @type {number} */
        var max = options.width * 10;
        /** @type {number} */
        var queueHooks = options.height * 10;
        /** @type {number} */
        var _ = options.borderWidth * 10;
        /** @type {number} */
        var type = (options.borderWidth + options.triangleHeight) * 10;
        /** @type {number} */
        var to = _ + max;
        /** @type {number} */
        var key = type + queueHooks;
        /** @type {number} */
        var name = options.borderRadius * 10;
        /** @type {number} */
        var from = name / 2;
        /** @type {number} */
        var min = options.triangleWidth * 10;
        /** @type {number} */
        var s = options.triangleHeight * 10;
        /** @type {Array} */
        var codeSegments = [[_, type + name], [_, type + from], [_ + from, type], [_ + name, type], [_ + (max - min) / 2, type], [_ + max / 2, type - s], [_ + (max + min) / 2, type], [to - name, type], [to - from, type], [to, type + from], [to, type + name], [to, key - name], [to, key - from], [to - from, key], [to - name, key], [_ + name, key], [_ + from, key], [_, key - from], [_, key - name]];
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var valuesLen = codeSegments.length;
        for (;i < valuesLen;i++) {
            codeSegments[i] = codeSegments[i].join(",");
        }
        /** @type {string} */
        var idx = "";
        /** @type {number} */
        var udataCur = 2 * options.borderWidth + options.width;
        /** @type {number} */
        var style = 2 * options.borderWidth + options.height + options.triangleHeight;
        if (t) {
            /** @type {string} */
            idx = "m " + codeSegments[0] + " c " + [codeSegments[1], codeSegments[2], codeSegments[3]].join(",") + " l " + [codeSegments[4], codeSegments[5], codeSegments[6], codeSegments[7]].join(",") + " c " + [codeSegments[8], codeSegments[9], codeSegments[10]].join(",") + " l " + codeSegments[11] + " c " + [codeSegments[12], codeSegments[13], codeSegments[14]].join(",") + " l " + codeSegments[15] + " c " + [codeSegments[16], codeSegments[17], codeSegments[18]].join(",") + " x e";
            /** @type {string} */
            var scheme = ['<v:shape style="position:absolute;z-index:-2;width:' + udataCur + "px;height:" + style + 'px;" ' + 'coordsize="' + udataCur * 10 + "," + style * 10 + '" ' + 'strokecolor="' + options.borderColor + '" ' + 'strokeweight="' + options.borderWidth * 2 + 'px">', '<v:path v="' + idx + '"/>', '<v:stroke opacity="' + options.borderOpacity + '" joinstyle="miter"/>', "</v:shape>", '<v:shape style="position:absolute;z-index:-1;width:' + udataCur + "px;height:" + style + 'px;" ' + 'coordsize="' +
                udataCur * 10 + "," + style * 10 + '" ' + 'fillcolor="' + options.backgroundColor + '">', '<v:path v="' + idx + '"/>', '<v:stroke opacity="0" joinstyle="miter"/>', "</v:shape>"].join("\n");
            document.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML");
            var b = options.id || yunpn.id();
            /** @type {string} */
            var tile = '<div id="' + b + '" style="display:none;position:absolute;width:' + udataCur + "px;height:" + style + 'px;"></div>';
            var a = W(tile).insertTo("beforeend", document.body);
            a.css(options.style, true);
            a[0].insertAdjacentHTML("beforeEnd", scheme + '<div style="z-index:1" class="' + options.contentCls + '">' + options.html + "</div>");
            this.oDom = a;
        } else {
            /** @type {string} */
            idx = "M " + codeSegments[0] + " C " + [codeSegments[1], codeSegments[2], codeSegments[3]].join(" ") + " L " + [codeSegments[4], codeSegments[5], codeSegments[6], codeSegments[7]].join(" ") + " C " + [codeSegments[8], codeSegments[9], codeSegments[10]].join(" ") + " L " + codeSegments[11] + " C " + [codeSegments[12], codeSegments[13], codeSegments[14]].join(" ") + " L " + codeSegments[15] + " C " + [codeSegments[16], codeSegments[17], codeSegments[18]].join(" ") + " Z";
            b = options.id || yunpn.id();
            /** @type {string} */
            tile = '<div id="' + b + '" style="display:none;position:absolute;width:' + udataCur + "px;height:" + style + 'px;"></div>';
            a = W(tile).insertTo("beforeend", document.body);
            a.css(options.style, true);
            /** @type {string} */
            var svgns = "http://www.w3.org/2000/svg";
            /** @type {Element} */
            var svg = document.createElementNS(svgns, "svg");
            /** @type {Element} */
            var line = document.createElementNS(svgns, "path");
            svg.setAttribute("width", udataCur);
            svg.setAttribute("height", style);
            svg.setAttribute("viewBox", "0 0 " + udataCur * 10 + " " + style * 10);
            line.setAttribute("d", idx);
            line.style.fill = options.backgroundColor;
            line.style.stroke = options.borderColor;
            /** @type {number} */
            line.style.strokeWidth = options.borderWidth * 2 * 10;
            line.style.strokeOpacity = options.borderOpacity;
            /** @type {string} */
            line.style.strokeLinejoin = "miter";
            svg.appendChild(line);
            a[0].appendChild(svg);
            W('<div style="z-index:1" class="' + options.contentCls + '">' + options.html + "</div>").insertTo("beforeend", a[0]);
            this.oDom = a;
        }
        this._bindEvent();
    }
    /** @type {boolean} */
    var t = Browser.ie && parseFloat(Browser.ie) < 9 ? true : false;
    return init.prototype = {
        /**
         * @return {undefined}
         */
        _bindEvent : function() {
            var container = this.options.target;
            var loading = this;
            if (Object.isString(container)) {
                container = W("#" + container);
            } else {
                container = W(container);
            }
            if (container.length > 0) {
                container.on("mouseover", function() {
                    loading.show();
                });
                W(document.body).on("click", function() {
                    loading.hide();
                });
            }
        },
        /**
         * @return {undefined}
         */
        show : function() {
            if (this.options.getPosition) {
                var pos = this.options.getPosition();
                this.oDom.css({
                    left : pos.left + "px",
                    top : pos.top + "px"
                });
            }
            yunpn.tip.TipManager.hideAll();
            var len = this.options.hideType;
            var $this = this;
            setTimeout(function() {
                $this.oDom.fadeIn();
            }, 0);
            if (len == "leave" || len == "delay&leave") {
                this.oDom.on("mouseleave", function() {
                    $this.oDom.fadeOut();
                });
            }
            if (len == "delay" || len == "delay&leave") {
                if (this._delayId) {
                    clearTimeout(this._delayId);
                    /** @type {null} */
                    this._delayId = null;
                }
                /** @type {number} */
                this._delayId = setTimeout(function() {
                    $this.oDom.fadeOut();
                }, 2E3);
            }
            if (len == "delay&leave") {
                this.oDom.on("mouseenter", function() {
                    if ($this._delayId) {
                        clearTimeout($this._delayId);
                        /** @type {null} */
                        $this._delayId = null;
                    }
                });
            }
        },
        /**
         * @return {undefined}
         */
        hide : function() {
            this.oDom.fadeOut();
        }
    }, init;
}(), yunpn.tip.QuickTip = function() {
    /**
     * @param {Object} config
     * @return {undefined}
     */
    function init(config) {
        if (element) {
            success(true);
        }
        that = config = Object.mix({
            width : 298,
            type : "success",
            container : document.body,
            align : "center",
            delay : 2E3,
            close : false,
            closeIcon : false
        }, config, true);
        if (element) {
            if (config.cls) {
                element.removeClass(config.cls);
            }
            if (config.style) {
                element.removeAttr("style");
            }
        } else {
            element = W('<div class="x-quicktip"><div class="y-alert y-alert-success"><span class="close">\u00d7</span><p class="text"></p></div></div>');
        }
        element.insertTo("beforeend", W(config.container)[0]);
        if (config.cls) {
            element.addClass(config.cls);
        }
        if (config.style) {
            element.css(config.style);
        }
        if (config.close) {
            element.query(".close").show().on("click", done);
        } else {
            element.query(".close").hide();
        }
        if (config.closeIcon) {
            element.query(".close").hide();
        }
    }
    /**
     * @param {string} type
     * @param {string} opt
     * @param {number} recurring
     * @return {undefined}
     */
    function show(type, opt, recurring) {
        opt = types.indexOf(opt) >= 0 ? opt : "success";
        element.query(".y-alert").replaceClass("y-alert-" + callback, "y-alert-" + opt);
        /** @type {string} */
        callback = opt;
        var self = element.query(".text");
        self.html(type);
        element.show();
        var innerSize = element.getRect();
        var c = self.getRect();
        if (that.align == "left") {
            element.css("left", "0px");
        } else {
            if (that.align == "right") {
                element.css("right", "0px");
            } else {
                var parentSize = W(that.container).getRect();
                innerSize = element.getRect();
                element.css("left", Math.max((parentSize.width - innerSize.width) / 2, 0) + "px");
            }
        }
        if (!that.close) {
            /** @type {number} */
            timer = setTimeout(done, recurring ? recurring : that.delay);
        }
    }
    /**
     * @return {undefined}
     */
    function done() {
        /** @type {null} */
        timer = null;
        element.fadeOut(500, function() {
            element.css("left", "-10000px");
        });
    }
    /**
     * @param {?} head
     * @return {undefined}
     */
    function success(head) {
        if (element == null) {
            return;
        }
        if (timer) {
            clearTimeout(timer);
        }
        if (head) {
            /** @type {null} */
            timer = null;
            element.css("left", "-10000px");
        } else {
            done();
        }
    }
    var that;
    /** @type {null} */
    var element = null;
    var timer;
    /** @type {string} */
    var callback = "success";
    /** @type {Array} */
    var types = ["success", "warning", "loading", "danger", "unknow", "none"];
    return{
        /** @type {function (Object): undefined} */
        init : init,
        /** @type {function (string, string, number): undefined} */
        show : show,
        /** @type {function (?): undefined} */
        hide : success
    };
}();
var requirejs;
var require;
var define;
(function(context) {
    /**
     * @param {Object} it
     * @return {?}
     */
    function isFunction(it) {
        return ostring.call(it) === "[object Function]";
    }
    /**
     * @param {Object} it
     * @return {?}
     */
    function isArray(it) {
        return ostring.call(it) === "[object Array]";
    }
    /**
     * @param {Array} ary
     * @param {Function} func
     * @return {undefined}
     */
    function each(ary, func) {
        if (ary) {
            var i;
            /** @type {number} */
            i = 0;
            for (;i < ary.length;i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }
    /**
     * @param {Array} ary
     * @param {Function} func
     * @return {undefined}
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            /** @type {number} */
            i = ary.length - 1;
            for (;i > -1;i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }
    /**
     * @param {Object} obj
     * @param {?} prop
     * @return {?}
     */
    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }
    /**
     * @param {Object} obj
     * @param {string} prop
     * @return {?}
     */
    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }
    /**
     * @param {Object} obj
     * @param {Function} func
     * @return {undefined}
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop) && func(obj[prop], prop)) {
                break;
            }
        }
    }
    /**
     * @param {Object} target
     * @param {Object} source
     * @param {boolean} force
     * @param {boolean} deepStringMixin
     * @return {?}
     */
    function mixin(target, source, force, deepStringMixin) {
        return source && eachProp(source, function(value, prop) {
            if (force || !hasProp(target, prop)) {
                if (deepStringMixin && typeof value != "string") {
                    if (!target[prop]) {
                        target[prop] = {};
                    }
                    mixin(target[prop], value, force, deepStringMixin);
                } else {
                    /** @type {Object} */
                    target[prop] = value;
                }
            }
        }), target;
    }
    /**
     * @param {?} scope
     * @param {Function} fn
     * @return {?}
     */
    function bind(scope, fn) {
        return function() {
            return fn.apply(scope, arguments);
        };
    }
    /**
     * @return {?}
     */
    function scripts() {
        return document.getElementsByTagName("script");
    }
    /**
     * @param {string} err
     * @return {?}
     */
    function defaultOnError(err) {
        throw err;
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        /** @type {global this} */
        var cur = context;
        return each(value.split("."), function(dir) {
            cur = cur[dir];
        }), cur;
    }
    /**
     * @param {string} id
     * @param {string} msg
     * @param {Error} err
     * @param {?} requireModules
     * @return {?}
     */
    function makeError(id, msg, err, requireModules) {
        /** @type {Error} */
        var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
        return e.requireType = id, e.requireModules = requireModules, err && (e.originalError = err), e;
    }
    /**
     * @param {string} contextName
     * @return {?}
     */
    function newContext(contextName) {
        /**
         * @param {Array} ary
         * @return {undefined}
         */
        function trimDots(ary) {
            var i;
            var part;
            /** @type {number} */
            i = 0;
            for (;ary[i];i += 1) {
                part = ary[i];
                if (part === ".") {
                    ary.splice(i, 1);
                    i -= 1;
                } else {
                    if (part === "..") {
                        if (i === 1 && (ary[2] === ".." || ary[0] === "..")) {
                            break;
                        }
                        if (i > 0) {
                            ary.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
            }
        }
        /**
         * @param {string} name
         * @param {string} baseName
         * @param {boolean} applyMap
         * @return {?}
         */
        function normalize(name, baseName, applyMap) {
            var pkgName;
            var pkgConfig;
            var mapValue;
            var words;
            var n;
            var j;
            var nameSegment;
            var foundMap;
            var i;
            var foundStarMap;
            var c;
            var baseParts = baseName && baseName.split("/");
            var normalizedBaseParts = baseParts;
            var map = config.map;
            var starMap = map && map["*"];
            if (name) {
                if (name.charAt(0) === ".") {
                    if (baseName) {
                        if (getOwn(config.pkgs, baseName)) {
                            /** @type {Array} */
                            normalizedBaseParts = baseParts = [baseName];
                        } else {
                            normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                        }
                        name = normalizedBaseParts.concat(name.split("/"));
                        trimDots(name);
                        pkgConfig = getOwn(config.pkgs, pkgName = name[0]);
                        name = name.join("/");
                        if (pkgConfig) {
                            if (name === pkgName + "/" + pkgConfig.main) {
                                name = pkgName;
                            }
                        }
                    } else {
                        if (name.indexOf("./") === 0) {
                            name = name.substring(2);
                        }
                    }
                }
            }
            if (applyMap && (map && (baseParts || starMap))) {
                words = name.split("/");
                n = words.length;
                for (;n > 0;n -= 1) {
                    nameSegment = words.slice(0, n).join("/");
                    if (baseParts) {
                        j = baseParts.length;
                        for (;j > 0;j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join("/"));
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    foundMap = mapValue;
                                    i = n;
                                    break;
                                }
                            }
                        }
                    }
                    if (foundMap) {
                        break;
                    }
                    if (!foundStarMap) {
                        if (starMap) {
                            if (getOwn(starMap, nameSegment)) {
                                foundStarMap = getOwn(starMap, nameSegment);
                                c = n;
                            }
                        }
                    }
                }
                if (!foundMap) {
                    if (foundStarMap) {
                        foundMap = foundStarMap;
                        i = c;
                    }
                }
                if (foundMap) {
                    words.splice(0, i, foundMap);
                    name = words.join("/");
                }
            }
            return name;
        }
        /**
         * @param {string} name
         * @return {undefined}
         */
        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function(scriptNode) {
                    if (scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName) {
                        return scriptNode.parentNode.removeChild(scriptNode), true;
                    }
                });
            }
        }
        /**
         * @param {string} id
         * @return {?}
         */
        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && (isArray(pathConfig) && pathConfig.length > 1)) {
                return pathConfig.shift(), context.require.undef(id), context.require([id]), true;
            }
        }
        /**
         * @param {string} name
         * @return {?}
         */
        function splitPrefix(name) {
            var prefix;
            var index = name ? name.indexOf("!") : -1;
            return index > -1 && (prefix = name.substring(0, index), name = name.substring(index + 1, name.length)), [prefix, name];
        }
        /**
         * @param {string} name
         * @param {string} parentModuleMap
         * @param {boolean} isNormalized
         * @param {boolean} applyMap
         * @return {?}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url;
            var pluginModule;
            var suffix;
            var nameParts;
            /** @type {null} */
            var prefix = null;
            var parentName = parentModuleMap ? parentModuleMap.name : null;
            /** @type {string} */
            var originalName = name;
            /** @type {boolean} */
            var isDefine = true;
            /** @type {string} */
            var normalizedName = "";
            return name || (isDefine = false, name = "_@r" + (O += 1)), nameParts = splitPrefix(name), prefix = nameParts[0], name = nameParts[1], prefix && (prefix = normalize(prefix, parentName, applyMap), pluginModule = getOwn(defined, prefix)), name && (prefix ? pluginModule && pluginModule.normalize ? normalizedName = pluginModule.normalize(name, function(name) {
                return normalize(name, parentName, applyMap);
            }) : normalizedName = normalize(name, parentName, applyMap) : (normalizedName = normalize(name, parentName, applyMap), nameParts = splitPrefix(normalizedName), prefix = nameParts[0], normalizedName = nameParts[1], isNormalized = true, url = context.nameToUrl(normalizedName))), suffix = prefix && (!pluginModule && !isNormalized) ? "_unnormalized" + (unnormalizedCounter += 1) : "", {
                prefix : prefix,
                name : normalizedName,
                parentMap : parentModuleMap,
                unnormalized : !!suffix,
                url : url,
                originalName : originalName,
                isDefine : isDefine,
                id : (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
            };
        }
        /**
         * @param {Object} depMap
         * @return {?}
         */
        function getModule(depMap) {
            var id = depMap.id;
            var mod = getOwn(registry, id);
            return mod || (mod = registry[id] = new context.Module(depMap)), mod;
        }
        /**
         * @param {Object} depMap
         * @param {string} name
         * @param {?} fn
         * @return {undefined}
         */
        function on(depMap, name, fn) {
            var id = depMap.id;
            var mod = getOwn(registry, id);
            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                if (name === "defined") {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === "error") {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }
        /**
         * @param {string} err
         * @param {Function} errback
         * @return {undefined}
         */
        function onError(err, errback) {
            var ids = err.requireModules;
            /** @type {boolean} */
            var r = false;
            if (errback) {
                errback(err);
            } else {
                each(ids, function(id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        /** @type {string} */
                        mod.error = err;
                        if (mod.events.error) {
                            /** @type {boolean} */
                            r = true;
                            mod.emit("error", err);
                        }
                    }
                });
                if (!r) {
                    req.onError(err);
                }
            }
        }
        /**
         * @return {undefined}
         */
        function takeGlobalQueue() {
            if (globalDefQueue.length) {
                apsp.apply(defQueue, [defQueue.length - 1, 0].concat(globalDefQueue));
                /** @type {Array} */
                globalDefQueue = [];
            }
        }
        /**
         * @param {string} id
         * @return {undefined}
         */
        function cleanRegistry(id) {
            delete registry[id];
            delete enabledRegistry[id];
        }
        /**
         * @param {Object} mod
         * @param {Object} traced
         * @param {undefined} processed
         * @return {undefined}
         */
        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;
            if (mod.error) {
                mod.emit("error", mod.error);
            } else {
                /** @type {boolean} */
                traced[id] = true;
                each(mod.depMaps, function(depMap, i) {
                    var depId = depMap.id;
                    var dep = getOwn(registry, depId);
                    if (dep) {
                        if (!mod.depMatched[i]) {
                            if (!processed[depId]) {
                                if (getOwn(traced, depId)) {
                                    mod.defineDep(i, defined[depId]);
                                    mod.check();
                                } else {
                                    breakCycle(dep, traced, processed);
                                }
                            }
                        }
                    }
                });
                /** @type {boolean} */
                processed[id] = true;
            }
        }
        /**
         * @return {?}
         */
        function checkLoaded() {
            var map;
            var modId;
            var err;
            var usingPathFallback;
            /** @type {number} */
            var waitInterval = config.waitSeconds * 1E3;
            /** @type {(boolean|number)} */
            var expired = waitInterval && context.startTime + waitInterval < (new Date).getTime();
            /** @type {Array} */
            var noLoads = [];
            /** @type {Array} */
            var reqCalls = [];
            /** @type {boolean} */
            var c = false;
            /** @type {boolean} */
            var d = true;
            if (y) {
                return;
            }
            /** @type {boolean} */
            y = true;
            eachProp(enabledRegistry, function(mod) {
                map = mod.map;
                modId = map.id;
                if (!mod.enabled) {
                    return;
                }
                if (!map.isDefine) {
                    reqCalls.push(mod);
                }
                if (!mod.error) {
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            /** @type {boolean} */
                            usingPathFallback = true;
                            /** @type {boolean} */
                            c = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else {
                        if (!mod.inited && (mod.fetched && map.isDefine)) {
                            /** @type {boolean} */
                            c = true;
                            if (!map.prefix) {
                                return d = false;
                            }
                        }
                    }
                }
            });
            if (expired && noLoads.length) {
                return err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads), err.contextName = context.contextName, onError(err);
            }
            if (d) {
                each(reqCalls, function(mod) {
                    breakCycle(mod, {}, {});
                });
            }
            if (!expired || usingPathFallback) {
                if (c) {
                    if (isBrowser || isWebWorker) {
                        if (!abortTimeout) {
                            /** @type {number} */
                            abortTimeout = setTimeout(function() {
                                /** @type {number} */
                                abortTimeout = 0;
                                checkLoaded();
                            }, 50);
                        }
                    }
                }
            }
            /** @type {boolean} */
            y = false;
        }
        /**
         * @param {Array} args
         * @return {undefined}
         */
        function callGetModule(args) {
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }
        /**
         * @param {HTMLDocument} node
         * @param {?} func
         * @param {string} name
         * @param {string} ieName
         * @return {undefined}
         */
        function removeListener(node, func, name, ieName) {
            if (node.detachEvent && !isOpera) {
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }
        /**
         * @param {Event} evt
         * @return {?}
         */
        function getScriptData(evt) {
            var node = evt.currentTarget || evt.srcElement;
            return removeListener(node, context.onScriptLoad, "load", "onreadystatechange"), removeListener(node, context.onScriptError, "error"), {
                node : node,
                id : node && node.getAttribute("data-requiremodule")
            };
        }
        /**
         * @return {?}
         */
        function intakeDefines() {
            var args;
            takeGlobalQueue();
            for (;defQueue.length;) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]));
                }
                callGetModule(args);
            }
        }
        var y;
        var Module;
        var context;
        var handlers;
        var abortTimeout;
        var config = {
            waitSeconds : 7,
            baseUrl : "./",
            paths : {},
            pkgs : {},
            shim : {},
            config : {}
        };
        var registry = {};
        var enabledRegistry = {};
        var undefEvents = {};
        /** @type {Array} */
        var defQueue = [];
        var defined = {};
        var urlFetched = {};
        /** @type {number} */
        var O = 1;
        /** @type {number} */
        var unnormalizedCounter = 1;
        return handlers = {
            /**
             * @param {Object} mod
             * @return {?}
             */
            require : function(mod) {
                return mod.require ? mod.require : mod.require = context.makeRequire(mod.map);
            },
            /**
             * @param {Object} mod
             * @return {?}
             */
            exports : function(mod) {
                /** @type {boolean} */
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    return mod.exports ? mod.exports : mod.exports = defined[mod.map.id] = {};
                }
            },
            /**
             * @param {Object} mod
             * @return {?}
             */
            module : function(mod) {
                return mod.module ? mod.module : mod.module = {
                    id : mod.map.id,
                    uri : mod.map.url,
                    /**
                     * @return {?}
                     */
                    config : function() {
                        var c;
                        var pkg = getOwn(config.pkgs, mod.map.id);
                        return c = pkg ? getOwn(config.config, mod.map.id + "/" + pkg.main) : getOwn(config.config, mod.map.id), c || {};
                    },
                    exports : defined[mod.map.id]
                };
            }
        }, Module = function(map) {
            this.events = getOwn(undefEvents, map.id) || {};
            /** @type {string} */
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            /** @type {Array} */
            this.depExports = [];
            /** @type {Array} */
            this.depMaps = [];
            /** @type {Array} */
            this.depMatched = [];
            this.pluginMaps = {};
            /** @type {number} */
            this.depCount = 0;
        }, Module.prototype = {
            /**
             * @param {Object} project
             * @param {Function} factory
             * @param {Function} errback
             * @param {Object} options
             * @return {undefined}
             */
            init : function(project, factory, errback, options) {
                options = options || {};
                if (this.inited) {
                    return;
                }
                /** @type {Function} */
                this.factory = factory;
                if (errback) {
                    this.on("error", errback);
                } else {
                    if (this.events.error) {
                        errback = bind(this, function(err) {
                            this.emit("error", err);
                        });
                    }
                }
                this.depMaps = project && project.slice(0);
                /** @type {Function} */
                this.errback = errback;
                /** @type {boolean} */
                this.inited = true;
                this.ignore = options.ignore;
                if (options.enabled || this.enabled) {
                    this.enable();
                } else {
                    this.check();
                }
            },
            /**
             * @param {?} i
             * @param {?} depExports
             * @return {undefined}
             */
            defineDep : function(i, depExports) {
                if (!this.depMatched[i]) {
                    /** @type {boolean} */
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },
            /**
             * @return {?}
             */
            fetch : function() {
                if (this.fetched) {
                    return;
                }
                /** @type {boolean} */
                this.fetched = true;
                /** @type {number} */
                context.startTime = (new Date).getTime();
                var map = this.map;
                if (!this.shim) {
                    return map.prefix ? this.callPlugin() : this.load();
                }
                context.makeRequire(this.map, {
                    enableBuildCallback : true
                })(this.shim.deps || [], bind(this, function() {
                    return map.prefix ? this.callPlugin() : this.load();
                }));
            },
            /**
             * @return {undefined}
             */
            load : function() {
                var url = this.map.url;
                if (!urlFetched[url]) {
                    /** @type {boolean} */
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },
            /**
             * @return {?}
             */
            check : function() {
                if (!this.enabled || this.enabling) {
                    return;
                }
                var err;
                var cjsModule;
                var id = this.map.id;
                var depExports = this.depExports;
                var exports = this.exports;
                var factory = this.factory;
                if (!this.inited) {
                    this.fetch();
                } else {
                    if (this.error) {
                        this.emit("error", this.error);
                    } else {
                        if (!this.defining) {
                            /** @type {boolean} */
                            this.defining = true;
                            if (this.depCount < 1 && !this.defined) {
                                if (isFunction(factory)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                                        try {
                                            exports = context.execCb(id, factory, depExports, exports);
                                        } catch (backtrace) {
                                            err = backtrace;
                                        }
                                    } else {
                                        exports = context.execCb(id, factory, depExports, exports);
                                    }
                                    if (this.map.isDefine) {
                                        cjsModule = this.module;
                                        if (cjsModule && (cjsModule.exports !== undefined && cjsModule.exports !== this.exports)) {
                                            exports = cjsModule.exports;
                                        } else {
                                            if (exports === undefined) {
                                                if (this.usingExports) {
                                                    exports = this.exports;
                                                }
                                            }
                                        }
                                    }
                                    if (err) {
                                        return err.requireMap = this.map, err.requireModules = this.map.isDefine ? [this.map.id] : null, err.requireType = this.map.isDefine ? "define" : "require", onError(this.error = err);
                                    }
                                } else {
                                    exports = factory;
                                }
                                this.exports = exports;
                                if (this.map.isDefine) {
                                    if (!this.ignore) {
                                        defined[id] = exports;
                                        if (req.onResourceLoad) {
                                            req.onResourceLoad(context, this.map, this.depMaps);
                                        }
                                    }
                                }
                                cleanRegistry(id);
                                /** @type {boolean} */
                                this.defined = true;
                            }
                            /** @type {boolean} */
                            this.defining = false;
                            if (this.defined) {
                                if (!this.defineEmitted) {
                                    /** @type {boolean} */
                                    this.defineEmitted = true;
                                    this.emit("defined", this.exports);
                                    /** @type {boolean} */
                                    this.defineEmitComplete = true;
                                }
                            }
                        }
                    }
                }
            },
            /**
             * @return {undefined}
             */
            callPlugin : function() {
                var map = this.map;
                var id = map.id;
                var pluginMap = makeModuleMap(map.prefix);
                this.depMaps.push(pluginMap);
                on(pluginMap, "defined", bind(this, function(plugin) {
                    var load;
                    var normalizedMap;
                    var normalizedMod;
                    var name = this.map.name;
                    var parentName = this.map.parentMap ? this.map.parentMap.name : null;
                    var localRequire = context.makeRequire(map.parentMap, {
                        enableBuildCallback : true
                    });
                    if (this.map.unnormalized) {
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function(name) {
                                return normalize(name, parentName, true);
                            }) || "";
                        }
                        normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap);
                        on(normalizedMap, "defined", bind(this, function(dataAndEvents) {
                            this.init([], function() {
                                return dataAndEvents;
                            }, null, {
                                enabled : true,
                                ignore : true
                            });
                        }));
                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            this.depMaps.push(normalizedMap);
                            if (this.events.error) {
                                normalizedMod.on("error", bind(this, function(err) {
                                    this.emit("error", err);
                                }));
                            }
                            normalizedMod.enable();
                        }
                        return;
                    }
                    load = bind(this, function(dataAndEvents) {
                        this.init([], function() {
                            return dataAndEvents;
                        }, null, {
                            enabled : true
                        });
                    });
                    load.error = bind(this, function(err) {
                        /** @type {boolean} */
                        this.inited = true;
                        /** @type {string} */
                        this.error = err;
                        /** @type {Array} */
                        err.requireModules = [id];
                        eachProp(registry, function(mod) {
                            if (mod.map.id.indexOf(id + "_unnormalized") === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });
                        onError(err);
                    });
                    load.fromText = bind(this, function(text, textAlt) {
                        var moduleName = map.name;
                        var moduleMap = makeModuleMap(moduleName);
                        var YYSTATE = YY_START;
                        if (textAlt) {
                            /** @type {(number|string)} */
                            text = textAlt;
                        }
                        if (YYSTATE) {
                            /** @type {boolean} */
                            YY_START = false;
                        }
                        getModule(moduleMap);
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }
                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [id]));
                        }
                        if (YYSTATE) {
                            /** @type {boolean} */
                            YY_START = true;
                        }
                        this.depMaps.push(moduleMap);
                        context.completeLoad(moduleName);
                        localRequire([moduleName], load);
                    });
                    plugin.load(map.name, localRequire, load, config);
                }));
                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },
            /**
             * @return {undefined}
             */
            enable : function() {
                enabledRegistry[this.map.id] = this;
                /** @type {boolean} */
                this.enabled = true;
                /** @type {boolean} */
                this.enabling = true;
                each(this.depMaps, bind(this, function(depMap, i) {
                    var id;
                    var mod;
                    var handler;
                    if (typeof depMap == "string") {
                        depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                        /** @type {Object} */
                        this.depMaps[i] = depMap;
                        handler = getOwn(handlers, depMap.id);
                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }
                        this.depCount += 1;
                        on(depMap, "defined", bind(this, function(depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));
                        if (this.errback) {
                            on(depMap, "error", bind(this, this.errback));
                        }
                    }
                    id = depMap.id;
                    mod = registry[id];
                    if (!hasProp(handlers, id)) {
                        if (mod) {
                            if (!mod.enabled) {
                                context.enable(depMap, this);
                            }
                        }
                    }
                }));
                eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod) {
                        if (!mod.enabled) {
                            context.enable(pluginMap, this);
                        }
                    }
                }));
                /** @type {boolean} */
                this.enabling = false;
                this.check();
            },
            /**
             * @param {string} type
             * @param {Function} listener
             * @return {undefined}
             */
            on : function(type, listener) {
                var listeners = this.events[type];
                if (!listeners) {
                    /** @type {Array} */
                    listeners = this.events[type] = [];
                }
                listeners.push(listener);
            },
            /**
             * @param {?} name
             * @param {?} evt
             * @return {undefined}
             */
            emit : function(name, evt) {
                each(this.events[name], function(cb) {
                    cb(evt);
                });
                if (name === "error") {
                    delete this.events[name];
                }
            }
        }, context = {
            config : config,
            contextName : contextName,
            registry : registry,
            defined : defined,
            urlFetched : urlFetched,
            defQueue : defQueue,
            /** @type {function (string): undefined} */
            Module : Module,
            /** @type {function (string, string, boolean, boolean): ?} */
            makeModuleMap : makeModuleMap,
            nextTick : req.nextTick,
            /** @type {function (string, Function): undefined} */
            onError : onError,
            /**
             * @param {Object} cfg
             * @return {undefined}
             */
            configure : function(cfg) {
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== "/") {
                        cfg.baseUrl += "/";
                    }
                }
                var pkgs = config.pkgs;
                var shim = config.shim;
                var objs = {
                    paths : true,
                    config : true,
                    map : true
                };
                eachProp(cfg, function(value, prop) {
                    if (objs[prop]) {
                        if (prop === "map") {
                            if (!config.map) {
                                config.map = {};
                            }
                            mixin(config[prop], value, true, true);
                        } else {
                            mixin(config[prop], value, true);
                        }
                    } else {
                        /** @type {Object} */
                        config[prop] = value;
                    }
                });
                if (cfg.shim) {
                    eachProp(cfg.shim, function(value, id) {
                        if (isArray(value)) {
                            value = {
                                deps : value
                            };
                        }
                        if (value.exports || value.init) {
                            if (!value.exportsFn) {
                                value.exportsFn = context.makeShimExports(value);
                            }
                        }
                        /** @type {Object} */
                        shim[id] = value;
                    });
                    config.shim = shim;
                }
                if (cfg.packages) {
                    each(cfg.packages, function(pkgObj) {
                        var location;
                        pkgObj = typeof pkgObj == "string" ? {
                            name : pkgObj
                        } : pkgObj;
                        location = pkgObj.location;
                        pkgs[pkgObj.name] = {
                            name : pkgObj.name,
                            location : location || pkgObj.name,
                            main : (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                        };
                    });
                    config.pkgs = pkgs;
                }
                eachProp(registry, function(mod, id) {
                    if (!mod.inited) {
                        if (!mod.map.unnormalized) {
                            mod.map = makeModuleMap(id);
                        }
                    }
                });
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },
            /**
             * @param {Object} value
             * @return {?}
             */
            makeShimExports : function(value) {
                /**
                 * @return {?}
                 */
                function fn() {
                    var memo;
                    return value.init && (memo = value.init.apply(context, arguments)), memo || value.exports && getGlobal(value.exports);
                }
                return fn;
            },
            /**
             * @param {boolean} relMap
             * @param {Object} options
             * @return {?}
             */
            makeRequire : function(relMap, options) {
                /**
                 * @param {?} name
                 * @param {Function} callback
                 * @param {Function} errback
                 * @return {?}
                 */
                function localRequire(name, callback, errback) {
                    var id;
                    var map;
                    var requireMod;
                    return options.enableBuildCallback && (callback && (isFunction(callback) && (callback.__requireJsBuild = true))), typeof name == "string" ? isFunction(callback) ? onError(makeError("requireargs", "Invalid require call"), errback) : relMap && hasProp(handlers, name) ? handlers[name](registry[relMap.id]) : req.get ? req.get(context, name, relMap, localRequire) : (map = makeModuleMap(name, relMap, false, true), id = map.id, hasProp(defined, id) ? defined[id] : onError(makeError("notloaded",
                            'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])")))) : (intakeDefines(), context.nextTick(function() {
                        intakeDefines();
                        requireMod = getModule(makeModuleMap(null, relMap));
                        requireMod.skipMap = options.skipMap;
                        requireMod.init(name, callback, errback, {
                            enabled : true
                        });
                        checkLoaded();
                    }), localRequire);
                }
                return options = options || {}, mixin(localRequire, {
                    isBrowser : isBrowser,
                    /**
                     * @param {string} moduleNamePlusExt
                     * @return {?}
                     */
                    toUrl : function(moduleNamePlusExt) {
                        var ext;
                        var index = moduleNamePlusExt.lastIndexOf(".");
                        var value1 = moduleNamePlusExt.split("/")[0];
                        /** @type {boolean} */
                        var isRelative = value1 === "." || value1 === "..";
                        return index !== -1 && ((!isRelative || index > 1) && (ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length), moduleNamePlusExt = moduleNamePlusExt.substring(0, index))), context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                    },
                    /**
                     * @param {string} id
                     * @return {?}
                     */
                    defined : function(id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },
                    /**
                     * @param {(Function|string)} id
                     * @return {?}
                     */
                    specified : function(id) {
                        return id = makeModuleMap(id, relMap, false, true).id, hasProp(defined, id) || hasProp(registry, id);
                    }
                }), relMap || (localRequire.undef = function(id) {
                    takeGlobalQueue();
                    var map = makeModuleMap(id, relMap, true);
                    var mod = getOwn(registry, id);
                    removeScript(id);
                    delete defined[id];
                    delete urlFetched[map.url];
                    delete undefEvents[id];
                    if (mod) {
                        if (mod.events.defined) {
                            undefEvents[id] = mod.events;
                        }
                        cleanRegistry(id);
                    }
                }), localRequire;
            },
            /**
             * @param {Object} depMap
             * @return {undefined}
             */
            enable : function(depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },
            /**
             * @param {string} moduleName
             * @return {?}
             */
            completeLoad : function(moduleName) {
                var t;
                var args;
                var mod;
                var shim = getOwn(config.shim, moduleName) || {};
                var shExports = shim.exports;
                takeGlobalQueue();
                for (;defQueue.length;) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        /** @type {string} */
                        args[0] = moduleName;
                        if (t) {
                            break;
                        }
                        /** @type {boolean} */
                        t = true;
                    } else {
                        if (args[0] === moduleName) {
                            /** @type {boolean} */
                            t = true;
                        }
                    }
                    callGetModule(args);
                }
                mod = getOwn(registry, moduleName);
                if (!t && (!hasProp(defined, moduleName) && (mod && !mod.inited))) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        }
                        return onError(makeError("nodefine", "No define call for " + moduleName, null, [moduleName]));
                    }
                    callGetModule([moduleName, shim.deps || [], shim.exportsFn]);
                }
                checkLoaded();
            },
            /**
             * @param {Object} moduleName
             * @param {string} ext
             * @param {boolean} skipExt
             * @return {?}
             */
            nameToUrl : function(moduleName, ext, skipExt) {
                var paths;
                var pkgs;
                var pkg;
                var pkgPath;
                var syms;
                var i;
                var parentModule;
                var url;
                var parentPath;
                if (req.jsExtRegExp.test(moduleName)) {
                    url = moduleName + (ext || "");
                } else {
                    paths = config.paths;
                    pkgs = config.pkgs;
                    syms = moduleName.split("/");
                    i = syms.length;
                    for (;i > 0;i -= 1) {
                        parentModule = syms.slice(0, i).join("/");
                        pkg = getOwn(pkgs, parentModule);
                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                        if (pkg) {
                            if (moduleName === pkg.name) {
                                /** @type {string} */
                                pkgPath = pkg.location + "/" + pkg.main;
                            } else {
                                pkgPath = pkg.location;
                            }
                            syms.splice(0, i, pkgPath);
                            break;
                        }
                    }
                    url = syms.join("/");
                    url += ext || (/^data\:|\?/.test(url) || skipExt ? "" : ".js");
                    /** @type {string} */
                    url = (url.charAt(0) === "/" || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url;
                }
                return config.urlArgs ? url + ((url.indexOf("?") === -1 ? "?" : "&") + config.urlArgs) : url;
            },
            /**
             * @param {string} id
             * @param {string} url
             * @return {undefined}
             */
            load : function(id, url) {
                req.load(context, id, url);
            },
            /**
             * @param {?} name
             * @param {Function} callback
             * @param {?} args
             * @param {?} exports
             * @return {?}
             */
            execCb : function(name, callback, args, exports) {
                return callback.apply(exports, args);
            },
            /**
             * @param {Event} evt
             * @return {undefined}
             */
            onScriptLoad : function(evt) {
                if (evt.type === "load" || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    /** @type {null} */
                    node = null;
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },
            /**
             * @param {string} evt
             * @return {?}
             */
            onScriptError : function(evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError("scripterror", "Script error for: " + data.id, evt, [data.id]));
                }
            }
        }, context.require = context.makeRequire(), context;
    }
    /**
     * @return {?}
     */
    function getInteractiveScript() {
        return node && node.readyState === "interactive" ? node : (eachReverse(scripts(), function(script) {
            if (script.readyState === "interactive") {
                return node = script;
            }
        }), node);
    }
    var req;
    var s;
    var head;
    var baseElement;
    var dataMain;
    var src;
    var node;
    var currentlyAddingScript;
    var mainScript;
    var subPath;
    /** @type {string} */
    var version = "2.1.9";
    /** @type {RegExp} */
    var rclass = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
    /** @type {RegExp} */
    var r20 = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
    /** @type {RegExp} */
    var jsSuffixRegExp = /\.js$/;
    /** @type {RegExp} */
    var currDirRegExp = /^\.\//;
    var op = Object.prototype;
    /** @type {function (this:*): string} */
    var ostring = op.toString;
    /** @type {function (this:Object, *): boolean} */
    var hasOwn = op.hasOwnProperty;
    var ap = Array.prototype;
    /** @type {function (this:(Array.<T>|{length: number}), *=, *=, ...[T]): Array.<T>} */
    var apsp = ap.splice;
    /** @type {boolean} */
    var isBrowser = typeof window != "undefined" && (typeof navigator != "undefined" && !!window.document);
    /** @type {boolean} */
    var isWebWorker = !isBrowser && typeof importScripts != "undefined";
    /** @type {RegExp} */
    var readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/;
    /** @type {string} */
    var defContextName = "_";
    /** @type {boolean} */
    var isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]";
    var contexts = {};
    var cfg = {};
    /** @type {Array} */
    var globalDefQueue = [];
    /** @type {boolean} */
    var YY_START = false;
    if (typeof define != "undefined") {
        return;
    }
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs)) {
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }
    if (typeof require != "undefined") {
        if (!isFunction(require)) {
            cfg = require;
            require = undefined;
        }
    }
    /** @type {function ((Function|string), Function, Function, Function): ?} */
    req = requirejs = function(deps, callback, errback, optional) {
        var context;
        var config;
        /** @type {string} */
        var contextName = defContextName;
        return!isArray(deps) && (typeof deps != "string" && (config = deps, isArray(callback) ? (deps = callback, callback = errback, errback = optional) : deps = [])), config && (config.context && (contextName = config.context)), context = getOwn(contexts, contextName), context || (context = contexts[contextName] = req.s.newContext(contextName)), config && context.configure(config), context.require(deps, callback, errback);
    };
    /**
     * @param {(Function|string)} config
     * @return {?}
     */
    req.config = function(config) {
        return req(config);
    };
    /** @type {function (Function): undefined} */
    req.nextTick = typeof setTimeout != "undefined" ? function(fnc) {
        setTimeout(fnc, 4);
    } : function($sanitize) {
        $sanitize();
    };
    if (!require) {
        /** @type {function ((Function|string), Function, Function, Function): ?} */
        require = req;
    }
    /** @type {string} */
    req.version = version;
    /** @type {RegExp} */
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    /** @type {boolean} */
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts : contexts,
        /** @type {function (string): ?} */
        newContext : newContext
    };
    req({});
    each(["toUrl", "undef", "defined", "specified"], function(prop) {
        /**
         * @return {?}
         */
        req[prop] = function() {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });
    if (isBrowser) {
        head = s.head = document.getElementsByTagName("head")[0];
        baseElement = document.getElementsByTagName("base")[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }
    /** @type {function (string): ?} */
    req.onError = defaultOnError;
    /**
     * @param {?} config
     * @param {string} moduleName
     * @param {string} url
     * @return {?}
     */
    req.createNode = function(config, moduleName, url) {
        /** @type {Element} */
        var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return node.type = config.scriptType || "text/javascript", node.charset = "utf-8", node.async = true, node;
    };
    /**
     * @param {Object} context
     * @param {string} moduleName
     * @param {string} url
     * @return {?}
     */
    req.load = function(context, moduleName, url) {
        var config = context && context.config || {};
        var node;
        if (isBrowser) {
            return node = req.createNode(config, moduleName, url), node.setAttribute("data-requirecontext", context.contextName), node.setAttribute("data-requiremodule", moduleName), node.attachEvent && (!(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0) && !isOpera) ? (YY_START = true, node.attachEvent("onreadystatechange", context.onScriptLoad)) : (node.addEventListener("load", context.onScriptLoad, false), node.addEventListener("error", context.onScriptError, false)),
                node.src = url, currentlyAddingScript = node, baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node), currentlyAddingScript = null, node;
        }
        if (isWebWorker) {
            try {
                importScripts(url);
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [moduleName]));
            }
        }
    };
    if (isBrowser) {
        if (!cfg.skipDataMain) {
            eachReverse(scripts(), function(script) {
                if (!head) {
                    head = script.parentNode;
                }
                dataMain = script.getAttribute("data-main");
                if (dataMain) {
                    return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], true;
                }
            });
        }
    }
    /**
     * @param {Object} name
     * @param {Object} deps
     * @param {Function} callback
     * @return {undefined}
     */
    define = function(name, deps, callback) {
        var node;
        var context;
        if (typeof name != "string") {
            /** @type {Object} */
            callback = deps;
            /** @type {Object} */
            deps = name;
            /** @type {null} */
            name = null;
        }
        if (!isArray(deps)) {
            /** @type {Object} */
            callback = deps;
            /** @type {null} */
            deps = null;
        }
        if (!deps) {
            if (isFunction(callback)) {
                /** @type {Array} */
                deps = [];
                if (callback.length) {
                    callback.toString().replace(rclass, "").replace(r20, function(dataAndEvents, dep) {
                        deps.push(dep);
                    });
                    /** @type {Array} */
                    deps = (callback.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(deps);
                }
            }
        }
        if (YY_START) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute("data-requiremodule");
                }
                context = contexts[node.getAttribute("data-requirecontext")];
            }
        }
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };
    define.amd = {
        jQuery : true
    };
    /**
     * @param {string} text
     * @return {?}
     */
    req.exec = function(text) {
        return eval(text);
    };
    req(cfg);
})(this), namespace("yunpn"), yunpn.gotoTop = function() {
    /**
     * @return {undefined}
     */
    function init() {
        if (r) {
            return;
        }
        var e;
        var t;
        var n;
        var tref;
        var scrollTop = Dom.getDocRect().scrollY;
        if (self.yId) {
            /** @type {number} */
            scrollTop = document.getElementById(self.yId).scrollTop;
        }
        if (scrollTop > self.headH) {
            if (QW.Browser.ie6) {
                self.el.setStyle("visibility", "hidden");
                if (tref) {
                    clearTimeout(tref);
                    /** @type {null} */
                    tref = null;
                }
                /** @type {number} */
                tref = setTimeout(function() {
                    self.el.setStyle("visibility", "visible");
                }, 500);
                self.el.on("click", function() {
                    window.scrollTo(0, 0);
                });
            } else {
                self.el.setStyle("visibility", "visible");
            }
        }
        if (scrollTop == 0) {
            self.el.setStyle("visibility", "hidden");
        }
    }
    /**
     * @return {?}
     */
    function create() {
        var form = createElement("div", {
            className : "returnToTop"
        });
        return form.innerHTML = '<div id="rtt" style="visibility:hidden"></div>', document.body.insertBefore(form, document.body.firstChild), form;
    }
    /**
     * @param {?} name
     * @return {undefined}
     */
    function load(name) {
        var el = create();
        var settings = self;
        settings.el = W(el).firstChild("div");
        settings.mw = settings.el.getRect().width;
        settings.mh = settings.el.getRect().height;
        QW.ObjectH.mix(self, name, true);
        self.el.css({
            bottom : self.bottom + "px",
            right : self.right + "px"
        });
        if (self.left) {
            /** @type {number} */
            var f = (Dom.getDocRect().width + 950) / 2;
            self.el.css("left", f + "px");
        }
        self.dom.on("scroll", init);
        self.dom.on("resize", init);
        self.el.on("click", self.toTop);
    }
    /** @type {boolean} */
    var r = false;
    var Element = QW.ElAnim;
    var createElement = DomU.createElement;
    var self = {
        ch : Dom.getDocRect().height,
        cw : Dom.getDocRect().width,
        mw : 0,
        mh : 0,
        headH : 10,
        right : 0,
        bottom : 0,
        el : 0,
        dom : W(window),
        doc : QW.Browser.webkit ? document.body : document.documentElement,
        y : Dom.getDocRect().scrollY,
        /**
         * @return {undefined}
         */
        toTop : function() {
            /** @type {boolean} */
            r = true;
            var p = new Element(self.doc, {
                scrollTop : {
                    to : 0
                }
            }, 500, QW.Easing.easeBothStrong);
            p.on("beforeplay", function() {
                self.el.setStyle("visibility", "hidden");
            });
            p.play();
            p.on("end", function() {
                /** @type {boolean} */
                r = false;
            });
        }
    };
    return{
        /** @type {function (?): undefined} */
        init : load,
        /** @type {function (): undefined} */
        rTop : init
    };
}(), window.rPathConfig = {
    offdl : "http://s8.qhimg.com/static/9f2e4d8e28cac34e/yunpn/file/offline-download.js",
    tooltip : "http://s6.qhimg.com/static/4fac193898b0af22/yunpn/lib/tips/tooltip.js",
    Copy2Clipboard : "http://s8.qhimg.com/static/de039d8e7a6d72be/pub/Copy2Clipboard/Copy2Clipboard.js",
    cssMove : "http://s6.qhimg.com/static/d3ea68904ca87794/file/movePanel.css",
    cssShare : "http://s6.qhimg.com/static/d2700f04b548ff4a/file/sharePanel.css",
    cssMusic : "http://s6.qhimg.com/static/e642a43fb65b54b8/file/musicplay.css",
    move : "http://s8.qhimg.com/static/1def527dcceab6d1/yunpn/lib/move/move.js",
    share : "js/yunpn/lib/share/share",
    authority : "js/yunpn/file/r/filepassword",
    appMusicPlayer : "js/yunpn/lib/musicplayer/appMusicPlayer",
    passApi : "http://s1.qhimg.com/i360/;js;pass_api_/seed,md5,reg/v3202.js"
}, require.config({
    baseUrl : "/resource",
    shim : {
        "js/yunpn/lib/share/share" : "http://s6.qhimg.com/static/9af1f6b6f6965d43/yunpn/lib/share/share.js",
        "js/yunpn/file/r/filepassword" : "http://s6.qhimg.com/static/50b7a1fcaf9196e2/yunpn/file/r/filepassword.js",
        "js/yunpn/lib/musicplayer/appMusicPlayer" : "http://s8.qhimg.com/static/03fb3bc5f633e9d5/yunpn/lib/musicplayer/appMusicPlayer.js"
    }
}), yunpn.mc = {
    /**
     * @param {?} keepData
     * @return {?}
     */
    isMusic : function(keepData) {
        if (yunpn.filelist && (yunpn.filelist.curFunc && yunpn.filelist.curFunc == "recycle")) {
            return false;
        }
        /** @type {Array} */
        var formats = ["mp3", "ogg", "wav", "m4a"];
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = formats.length;
        for (;i < l;i++) {
            if (formats[i] == keepData) {
                return true;
            }
        }
        return false;
    }
}, namespace("yunpn.video"), yunpn.video.config = {
    CLASSID_PLUGIN : "F3D0D36F-23F8-4682-A195-74C92B03D4AF",
    VIDEO_FAKEURL : "http://yunpn.360.cn/videoplayer",
    PLUGIN_TYPE : {
        mov : 1,
        mp4 : 1,
        rmvb : 1,
        wmv : 1,
        rm : 1,
        mpg : 1,
        avi : 1,
        flv : 1,
        mpeg : 1,
        mkv : 1,
        webm : 1,
        "3gp" : 1,
        "3g2" : 1,
        "3gp2" : 1,
        "3gpp" : 1,
        f4v : 1
    },
    SE_TYPE : {
        rmvb : 1,
        rm : 1,
        flv : 1,
        f4v : 1,
        mkv : 1,
        mp4 : 1,
        mov : 1,
        m4v : 1,
        "3gp" : 1,
        avi : 1
    },
    FLASH_TYPE : {
        mp4 : 1,
        flv : 1,
        f4v : 1
    },
    VIDEO_TYPE : ["mov", "mp4", "rmvb", "wmv", "rm", "mpg", "avi", "flv", "mpeg", "mkv", "webm", "f4v", "3gp", "3g2", "3gp2", "3gpp"],
    PLAY_URL : "/videoPlayer/index"
}, Object.mix(yunpn.video, {
    idGen : function() {
        /** @type {number} */
        var YPVideo_ = 0;
        return function() {
            return "YPVideo_" + ++YPVideo_;
        };
    }(),
    /**
     * @return {undefined}
     */
    detectQvodHttp : function() {
        if (/^win/i.test(Browser.platform)) {
            try {
                if (external) {
                    if (external.GetSID) {
                        external.AppCmd(external.GetSID(window), "ExtVideoAssis", "CanPlayQvodHttp", "", "", function(dataAndEvents) {
                            if (dataAndEvents) {
                                /** @type {boolean} */
                                window.vCanPlayQvodHttp = true;
                            }
                        });
                    }
                }
            } catch (e) {
            }
        }
    },
    /**
     * @return {?}
     */
    detectFlash : function() {
        var cDigit = yunpn.util.getSwfVersion();
        if (cDigit && parseFloat(cDigit) >= 9) {
            return true;
        }
    },
    /**
     * @return {?}
     */
    detectPlugin : function() {
        if (/^win/i.test(Browser.platform)) {
            try {
                var that;
                var cDigit;
                var element = W('<div style="width:0;height:0;overflow:hidden;"></div>').insertTo("beforeend", document.body);
                /** @type {string} */
                var callbackId = "Qvod";
                if (Browser.ie && Browser.ie >= 6) {
                    that = W('<OBJECT ID="' + callbackId + '" CLASSID="clsid:' + yunpn.video.config.CLASSID_PLUGIN + '" HEIGHT="0" WIDTH="0"></OBJECT>');
                } else {
                    that = W("<object></object>");
                    that.attr({
                        type : "application/qvod-plugin",
                        id : callbackId
                    });
                }
                that.insertTo("beforeend", element);
                var callback = window[callbackId];
                cDigit = callback.Version;
                if (parseFloat(cDigit) >= 4.2) {
                    return element.removeNode(), true;
                }
                element.removeNode();
            } catch (s) {
                element.removeNode();
            }
        }
    },
    /**
     * @param {?} src
     * @return {?}
     */
    isVideo : function(src) {
        if (yunpn.filelist && (yunpn.filelist.curFunc && yunpn.filelist.curFunc == "recycle")) {
            return false;
        }
        if (/^win/i.test(Browser.platform)) {
            if (yunpn.video.config.VIDEO_TYPE.indexOf(src) >= 0) {
                return true;
            }
        } else {
            if (yunpn.video.config.FLASH_TYPE[src]) {
                return true;
            }
        }
    },
    /**
     * @param {?} keepData
     * @return {?}
     */
    isPlayBySe : function(keepData) {
        return false;
    },
    /**
     * @param {?} $conditional
     * @return {?}
     */
    isPlayByFlash : function($conditional) {
        var t = yunpn.video.detectFlash();
        if (t && yunpn.video.config.FLASH_TYPE[$conditional] >= 0) {
            return true;
        }
    },
    /**
     * @param {?} timeoutKey
     * @return {?}
     */
    isPlayByQvod : function(timeoutKey) {
        if (/^win/i.test(Browser.platform)) {
            var t = yunpn.video.detectPlugin();
            if (t && yunpn.video.config.PLUGIN_TYPE[timeoutKey] >= 0) {
                return true;
            }
        }
    },
    /**
     * @param {string} args
     * @return {undefined}
     */
    play : function(args) {
        new yunpn.video.Player(args);
    }
}), yunpn.video.Player = function(options) {
    this.player = options.player;
    this.nid = options.nid;
    /** @type {string} */
    this.domain = options.domain ? "http://" + options.domain : "";
    this.play(options);
}, yunpn.video.Player.prototype = {
    /**
     * @param {Object} item
     * @return {undefined}
     */
    play : function(item) {
        if (this.player == "se") {
            this.initSe(item);
        } else {
            /** @type {string} */
            var url = this.domain + yunpn.video.config.PLAY_URL + "?nid=" + encodeURIComponent(this.nid) + "&type=" + item.type;
            if (item.shorturl) {
                url += "&shorturl=" + item.shorturl;
            }
            window.open(url);
        }
    }
}, Dom.ready(function() {
    yunpn.video.detectQvodHttp();
}), Object.mix(yunpn.video.Player.prototype, {
    /**
     * @param {Object} data
     * @return {undefined}
     */
    getUrl : function(data) {
        var deltas = this;
        Ajax.post("/videoPlayer/ajaxGetVideoUrl", {
            nid : data.nid,
            type : data.type
        }, function(e) {
            try {
                e = e.evalExp();
                if (!e.errno) {
                    deltas.sePlayVideo(e.data);
                }
            } catch (ex) {
                throw new Error("YP:se getUrl, '/videoPlayer/ajaxGetVideoUrl' " + ex.message);
            }
        });
    },
    /**
     * @param {Object} data
     * @return {undefined}
     */
    initSe : function(data) {
        try {
            if (!window.vCanPlayQvodHttp) {
                var dataModel = this;
                external.AppCmd(external.GetSID(window), "ExtVideoAssis", "CanPlayQvodHttp", "", "", function(dataAndEvents) {
                    /** @type {boolean} */
                    window.vCanPlayQvodHttp = true;
                    dataModel.getUrl(data);
                });
            } else {
                this.getUrl(data);
            }
        } catch (n) {
        }
    },
    /**
     * @param {?} entry
     * @return {undefined}
     */
    sePlayVideo : function(entry) {
        if (window.vCanPlayQvodHttp) {
            /** @type {string} */
            var r20 = "gqv=" + encodeURIComponent(entry.video_url) + "&qvt=" + encodeURIComponent(entry.file_name) + "&fakeurl=" + encodeURIComponent("http://yunpn.360.cn/videoPlayer") + "&ref=yunpn.360.cn";
            external.AppCmd(external.GetSID(window), "ExtVideoAssis", "OpenVideoPage", r20, "", function(dataAndEvents) {
            });
        }
    }
}), yunpn.config = function() {
    var appFrontendUrl;
    return{
        /**
         * @param {string} project
         * @return {undefined}
         */
        init : function(project) {
            /** @type {function (): ?} */
            var url = project != "sFile" ? function() {
                return{
                    rename : "/file/rename/",
                    move : "/file/move/",
                    preview : "/file/preview",
                    previewOri : "/file/getoriginalphotourl",
                    packDown : "/file/pack/",
                    f_down : "/file/download",
                    delToRecyle : "/file/recycle/",
                    recover : "/file/recover",
                    delInRecyle : "/file/deletefilesinrecycle",
                    clean : "/file/cleanrecycle",
                    mkdir : "/file/mkdir/",
                    getList : "/file/list",
                    getNodeList : "/file/listAjax",
                    getRecoverList : "/file/getRecoverList",
                    uploadNameCheck : "/file/detectFileExists",
                    uploadAddress : "/upload/getuploadaddress/",
                    uploadFile : "/upload/addfile/",
                    docviewerInfo : "/docviewer/getInfo",
                    share : "/share/create",
                    cancelShareNode : "/share/cancelLinkNode",
                    cancelShare : "/share/cancelLink",
                    getMusicUrl : "/file/getAudioUrl"
                };
            } : function() {
                return{
                    rename : "/sFile/rename/",
                    move : "/sFile/move/",
                    preview : "/sFile/preview",
                    previewOri : "/sFile/getoriginalphotourl",
                    packDown : "/sFile/pack/",
                    f_down : "/sFile/download",
                    delToRecyle : "/sFile/recycle/",
                    recover : "/sFile/recover",
                    mkdir : "/sFile/mkdir/",
                    getList : "/sFile/list",
                    docviewerInfo : "/sDocviewer/getInfo",
                    getNodeList : "/sFile/listAjax",
                    uploadNameCheck : "/sFile/detectFileExists",
                    uploadAddress : "/upload/getuploadaddress/",
                    uploadFile : "/sUpload/addfile/",
                    getMusicUrl : "/sFile/getAudioUrl"
                };
            };
            yunpn.config.url = url();
        },
        url : appFrontendUrl
    };
}(), namespace("yunpn"), yunpn.title = document.title, yunpn.id = function() {
    /** @type {number} */
    var x_yp_ = 0;
    return function() {
        return "x-yp-" + ++x_yp_;
    };
}(), function() {
    /**
     * @return {undefined}
     */
    function init() {
        /** @type {null} */
        tref = null;
        var region = Dom.getDocRect();
        /** @type {number} */
        var left = region.height - height;
        container.css("height", left + "px");
        container.query(".clients-download").show();
        container.query(".space-box").show();
        if (left < 600) {
            container.query(".nav").css("height", container.query(".space-box").getRect().top - height - 10 + "px");
        } else {
            container.query(".nav").css("height", "auto");
        }
        cell.css("height", region.height - cell.getRect().top + "px");
        if (region.width > 1170) {
            W(document.body).removeClass("narrow-mode");
        } else {
            W(document.body).addClass("narrow-mode");
        }
        yunpn.filelist.resizeHolder();
        yunpn.envSwitch.resizeIframe();
        yunpn.cmdCenter.resizeCrumb();
    }
    /**
     * @return {undefined}
     */
    function focus() {
        if (tref) {
            clearTimeout(tref);
        }
        /** @type {number} */
        tref = setTimeout(init, 100);
    }
    var tref;
    var container = W("#leftPanel");
    var cell = W("#fileListMain");
    /** @type {number} */
    var height = 56;
    Dom.ready(init);
    W(window).on("resize", focus);
}(), Dom.ready(function() {
    var loading = W(".more-clients-down");
    W("#leftPanel .icon-more").on("mouseenter", function(dataAndEvents) {
        if (!loading.isVisible()) {
            loading.show();
        }
    });
    W("#leftPanel .clients-down").on("mouseleave", function(dataAndEvents) {
        if (loading.isVisible()) {
            loading.hide();
        }
    });
    W("#leftPanel .more-clients-down").on("mouseenter", function(dataAndEvents) {
        loading.show();
    });
    W("#leftPanel .more-clients-down").on("mouseleave", function(dataAndEvents) {
        loading.hide();
    });
    var data = String.queryUrl(location.href);
    if (data.init) {
        if (data.init == "offline") {
            yunpn.cmdCenter.showOfflineDia();
        }
    }
    try {
        if (external && (external.GetSID && external.AppCmd)) {
            var params = {
                qid : SYS_CONF.qid,
                q : Cookie.get("Q"),
                username : SYS_CONF.userName,
                headurl : SYS_CONF.headUrl
            };
            external.AppCmd(external.GetSID(window), "", "yunpn", "SetQid", Object.stringify(params), function(dataAndEvents, deepDataAndEvents) {
            });
        }
    } catch (r) {
    }
}), yunpn.BatchRequest = function() {
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    function create(opt_attributes) {
        if (f || !opt_attributes.url) {
            return false;
        }
        /** @type {boolean} */
        f = true;
        options = ObjectH.mix({
            size : 50,
            method : "post",
            showProTipReset : false
        }, opt_attributes, true);
        request();
        if (!opt_attributes.withoutProgress) {
            setTimeout(success, 1E3);
        }
        if (opt_attributes.withProgressTip) {
            setTimeout(next, 1);
        }
    }
    /**
     * @return {undefined}
     */
    function request() {
        if (c) {
            write();
            return;
        }
        var params = {};
        var current;
        var url;
        if (options.method === "jsonp") {
            current = options.data.slice(offset, offset + options.size);
            current = current[0];
            /** @type {number} */
            params.t = +new Date;
            /** @type {string} */
            params.cross_domain_callback = "yunpn.BatchRequest.jsonp_callback";
            if (!params.callback) {
                /** @type {string} */
                params.callback = params.cross_domain_callback;
            }
            params = ObjectH.mix(params, current.params, true);
            url = current.url;
            url += "?";
            url += ObjectH.encodeURIJson(params);
            /**
             * @param {string} data
             * @return {undefined}
             */
            yunpn.BatchRequest.jsonp_callback = function(data) {
                if (current.batchSuccess) {
                    current.batchSuccess(data);
                }
                offset += options.size;
                if (offset >= options.data.length) {
                    if (!c) {
                        if (options.success) {
                            options.success();
                        }
                    }
                    write();
                } else {
                    request();
                }
            };
            loadJs(url);
        } else {
            params[options.batchParam] = options.data.slice(offset, offset + options.size);
            /** @type {number} */
            params.t = Math.random();
            params = ObjectH.mix(params, options.params, true);
            handler = Ajax.request(options.url, params, function(data) {
                if (options.batchSuccess) {
                    options.batchSuccess(data);
                }
                offset += options.size;
                if (offset >= options.data.length) {
                    if (!c) {
                        if (options.success) {
                            options.success();
                        }
                    }
                    write();
                } else {
                    request();
                }
            }, options.method);
        }
        var total = options.data.length;
        /** @type {number} */
        right = offset + options.size >= total ? value : (offset + options.size) / total * value;
    }
    /**
     * @return {undefined}
     */
    function write() {
        /** @type {boolean} */
        var e = false;
        setTimeout(function() {
            cb();
            if (e) {
                yunpn.tip.QuickTip.hide();
            }
        }, 300);
        if (!options.showProTipReset) {
            /** @type {boolean} */
            e = true;
        }
        /** @type {boolean} */
        f = false;
        /** @type {null} */
        options = null;
        /** @type {boolean} */
        c = false;
        /** @type {number} */
        offset = 0;
    }
    /**
     * @param {?} failing_message
     * @return {undefined}
     */
    function report(failing_message) {
        if (failing_message) {
            if (handler) {
                handler.cancel();
            }
        }
        /** @type {boolean} */
        c = true;
        if (options.onTerminate) {
            options.terminate();
        }
    }
    /**
     * @return {undefined}
     */
    function cb() {
        if (loading) {
            loading.hide();
        }
    }
    /**
     * @return {undefined}
     */
    function success() {
        if (!f) {
            return;
        }
        if (!loading) {
            /** @type {string} */
            var text = ['<div id="batchRequest">', '<div class="box">', '<span class="progress"><span class="progress-bar"></span></span>', "<p>" + (options.msg || "\u64cd\u4f5c\u6b63\u5728\u8fdb\u884c\u4e2d\uff0c\u8bf7\u7a0d\u7b49...") + "</p>", "</div>", "</div>"].join("");
            loading = yunpn.dialog.create({
                body : text,
                title : "\u63d0\u793a",
                withClose : false
            });
            elem = W("#batchRequest .progress-bar");
        }
        /** @type {number} */
        left = 0;
        elem.css("width", "0px");
        loading.show();
        setTimeout(check, 100);
    }
    /**
     * @return {undefined}
     */
    function next() {
        if (!f) {
            return;
        }
        /** @type {number} */
        left = 0;
        yunpn.tip.QuickTip.init({
            container : options.showProTipcontainer,
            cls : "batchRequestTip",
            close : true,
            closeIcon : true
        });
        yunpn.tip.QuickTip.show(options.showProTipTitle, options.showProTipType, 0);
        yearCont = W(".x-quicktip em.batch-title");
        setTimeout(tick, 100);
    }
    /**
     * @return {undefined}
     */
    function tick() {
        if (f) {
            left += Math.floor((right - left) * 0.1);
            yearCont.html(parseInt(left / value * 100, 10) + "%");
            setTimeout(tick, 100);
        } else {
            yearCont.html(parseInt(value / value * 100, 10) + "%");
        }
    }
    /**
     * @return {undefined}
     */
    function check() {
        if (f) {
            left += Math.floor((right - left) * 0.1);
            elem.css("width", left + "px");
            setTimeout(check, 100);
        } else {
            elem.css("width", value + "px");
        }
    }
    /** @type {boolean} */
    var f = false;
    var options;
    /** @type {boolean} */
    var c = false;
    var handler;
    /** @type {number} */
    var offset = 0;
    var loading;
    var elem;
    var yearCont;
    /** @type {number} */
    var left = 0;
    /** @type {number} */
    var y = 0;
    /** @type {number} */
    var right = 0;
    /** @type {number} */
    var value = 376;
    return{
        /** @type {function (?): ?} */
        create : create,
        /** @type {function (): undefined} */
        showProgress : success,
        /** @type {function (?): undefined} */
        terminate : report,
        /** @type {function (): undefined} */
        showProgressTip : next
    };
}();
/** @type {string} */
var gTitle = document.title;
yunpn.id = function() {
    /** @type {number} */
    var x_yp_ = 0;
    return function() {
        return "x-yp-" + ++x_yp_;
    };
}(), yunpn.isLogin = function() {
    return Cookie.get("token", "") == "" || Cookie.get("Q", "") == "" ? ($.alert("\u767b\u5f55\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01", {
        type : "error",
        /**
         * @return {undefined}
         */
        fn : function() {
            /** @type {string} */
            location.href = "/";
        }
    }), false) : SYS_CONF.token != Cookie.get("token", "") ? (location.reload(), false) : true;
}, yunpn.login = function() {
    /**
     * @return {undefined}
     */
    function onSuccess() {
        loading = new QW.BasePanel({
            withClose : false,
            withCorner : false,
            withCue : false,
            withShadow : false,
            keyEsc : true,
            withMask : true,
            posCenter : true,
            body : W("#tpl-panel-msg").html()
        });
        msgBox = W(".popbox .bd");
        W(".popbox .close a").on("click", function() {
            loading.hide();
        });
    }
    var loading;
    return function() {
        if (!loading) {
            onSuccess();
        }
        msgBox.html('<iframe src="/index/minilogin" scrolling="no" frameborder="0" style="width:470px;height:290px;overflow:hidden"></iframe>');
        loading.show(null, null, 500, 326);
    };
}(), yunpn.Msg = function() {
    /**
     * @return {undefined}
     */
    function e() {
    }
    /** @type {string} */
    var data = ['<div class="msg-panel {$type}" style="{$style}">', '<div class="msg-text-box"><div class="msg-text {$type}-tip" style="{$textstyle}">{$text}</div></div>', "</div>"].join("");
    /** @type {string} */
    var response = ['<div class="msg-panel msg-prompt">', '<div class="msg-text-box">', '<div class="msg-text">{$text}\uff1a<input id="{$promptIpt}" value="{$defaultText}"></div>', "</div>", "</div>"].join("");
    /** @type {string} */
    var tmp = '        <div class="msg-panel msg-prompt">            <div class="msg-text-box">                <div class="msg-text">                <label for="{$promptIpt}">{$text}\uff1a</label>                <textarea id="{$promptIpt}">{$defaultText}</textarea>                </div>            </div>        </div>';
    return{
        /**
         * @param {?} buf
         * @param {Element} cfg
         * @return {?}
         */
        forceAlert : function(buf, cfg) {
            cfg = ObjectH.mix({
                title : "\u63d0\u793a",
                type : "ok"
            }, cfg, true);
            var activeItem = yunpn.dialog.create({
                body : data.tmpl({
                    type : "msg-" + cfg.type,
                    text : buf
                }),
                className : "panel-t1 y-msg-dia y-msg-alert-dia",
                title : cfg.title,
                withClose : false
            });
            return activeItem.show(), activeItem;
        },
        /**
         * @param {string} completeCallback
         * @param {?} opt_attributes
         * @return {?}
         */
        alert : function(completeCallback, opt_attributes) {
            opt_attributes = ObjectH.mix({
                title : "\u64cd\u4f5c\u63d0\u793a",
                type : "ok"
            }, opt_attributes, true);
            var activeItem = opt_attributes.dialog_after || null;
            /** @type {Array} */
            var cssText = [];
            /** @type {Array} */
            var style = [];
            if (opt_attributes.width) {
                cssText.push("width:" + opt_attributes.width + "px");
            }
            if (opt_attributes.height) {
                cssText.push("height:" + opt_attributes.height + "px");
            }
            /** @type {string} */
            cssText = cssText.join(";");
            if (opt_attributes.textwidth) {
                style.push("width:" + opt_attributes.textwidth + "px;");
            }
            if (opt_attributes.textheight) {
                style.push("height:" + opt_attributes.textheight + "px");
            }
            /** @type {string} */
            style = style.join(";");
            var child = yunpn.dialog.create({
                body : data.tmpl({
                    type : "msg-" + opt_attributes.type,
                    text : completeCallback,
                    style : cssText,
                    textstyle : style
                }),
                title : opt_attributes.title,
                className : "panel-t1 y-msg-dia y-msg-alert-dia",
                withMask : opt_attributes.with_Mask === false ? false : true,
                withClose : opt_attributes.with_close === false ? false : true,
                maxXAttr : opt_attributes.maxXAttr,
                maxYAttr : opt_attributes.maxYAttr,
                buttons : [{
                    text : opt_attributes.btnOkText || "\u786e\u5b9a",
                    type : opt_attributes.btnOKType || "blue",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        child.hide();
                        child.dispose();
                        /** @type {null} */
                        child = null;
                        if (opt_attributes.fn) {
                            opt_attributes.fn("yes");
                        }
                        if (activeItem) {
                            activeItem.show();
                            /** @type {null} */
                            activeItem = null;
                        }
                    }
                }]
            });
            return child.show(), W(child.oFooter).query(".y-btn").item(0).focus(), child;
        },
        /**
         * @param {string} message
         * @param {Object} conf
         * @return {?}
         */
        confirm : function(message, conf) {
            conf = ObjectH.mix({
                title : "\u64cd\u4f5c\u63d0\u793a",
                type : "ok"
            }, conf, true);
            /** @type {Array} */
            var style = [];
            /** @type {Array} */
            var translate = [];
            if (conf.width) {
                style.push("width:" + conf.width + "px");
            }
            if (conf.height) {
                style.push("height:" + conf.height + "px");
            }
            /** @type {string} */
            style = style.join(";");
            if (conf.textwidth) {
                translate.push("width:" + conf.textwidth + "px");
            }
            if (conf.textheight) {
                translate.push("height:" + conf.textheight + "px");
            }
            /** @type {string} */
            translate = translate.join(";");
            var child = yunpn.dialog.create({
                body : data.tmpl({
                    type : "msg-" + conf.type,
                    text : message,
                    style : style,
                    textstyle : translate
                }),
                className : "panel-t1 y-msg-dia y-msg-confirm-dia",
                title : conf.title,
                withClose : conf.with_close === false ? false : true,
                maxXAttr : conf.maxXAttr,
                maxYAttr : conf.maxYAttr,
                withMask : conf.with_Mask === false ? false : true,
                buttons : [{
                    text : conf.btnOkText || "\u786e\u5b9a",
                    type : conf.btnOKType || "blue",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        child.hide();
                        child.dispose();
                        /** @type {null} */
                        child = null;
                        if (conf.fn) {
                            conf.fn("yes");
                        }
                    }
                }, {
                    text : conf.btnCancelText || "\u53d6\u6d88",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        child.hide();
                        child.dispose();
                        /** @type {null} */
                        child = null;
                        if (conf.fn) {
                            conf.fn("no");
                        }
                    }
                }]
            });
            return child.show(), W(child.oFooter).query(".y-btn").item(0).focus(), child;
        },
        /**
         * @param {?} title
         * @param {Element} options
         * @return {?}
         */
        prompt : function(title, options) {
            options = ObjectH.mix({
                title : "\u64cd\u4f5c\u63d0\u793a",
                type : "ok",
                defaultText : "",
                inputId : yunpn.id()
            }, options, true);
            /** @type {string} */
            var data = response;
            if (options.enable_textarea) {
                /** @type {string} */
                data = tmp;
            }
            var child = yunpn.dialog.create({
                body : data.tmpl({
                    type : "msg-prompt",
                    text : title,
                    promptIpt : options.inputId,
                    defaultText : options.defaultText
                }),
                className : "panel-t1 y-msg-dia y-msg-prompt-dia",
                title : options.title,
                withClose : true,
                withMask : options.with_Mask === false ? false : true,
                maxXAttr : options.maxXAttr,
                maxYAttr : options.maxYAttr,
                buttons : [{
                    text : "\u786e\u5b9a",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        if (options.fn) {
                            options.fn("yes", g(options.inputId).value);
                        }
                        child.hide();
                    }
                }, {
                    text : "\u53d6\u6d88",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        if (options.fn) {
                            options.fn("no", g(options.inputId).value);
                        }
                        child.hide();
                        child.dispose();
                        /** @type {null} */
                        child = null;
                    }
                }]
            });
            return child.show(), setTimeout(function() {
                g(options.inputId).focus();
            }, 1), W("#" + options.inputId).on("keydown", function(event) {
                if (13 == event.keyCode) {
                    W(child.oFooter).query(".x-button").item(0).fire("click");
                }
            }), child;
        }
    };
}(), yunpn.tips = function() {
    var item;
    var res;
    /** @type {null} */
    var tref = null;
    return{
        /**
         * @param {string} type
         * @param {boolean} value
         * @param {number} val
         * @return {undefined}
         */
        show : function(type, value, val) {
            if (!item) {
                item = W('<div id="topTips"><span class="msg"></span><a class="close"></a></div>').insertTo("beforeend", document.body);
                res = item.query("span");
            }
            var arr = value != undefined ? value : true;
            var iterator = val != undefined ? val : false;
            var loading = item.query(".close");
            if (iterator) {
                loading.show();
            } else {
                loading.hide();
            }
            type = type || "\u63d0\u4ea4\u4e2d...";
            if (tref) {
                clearTimeout(tref);
                /** @type {null} */
                tref = null;
            }
            res.html(type);
            item.css("height", "28px").fadeIn(100);
            if (arr) {
                /** @type {number} */
                tref = setTimeout(function() {
                    item.fadeOut(300);
                }, 3E3);
            }
        },
        /**
         * @return {undefined}
         */
        hide : function() {
            if (tref) {
                clearTimeout(tref);
                /** @type {null} */
                tref = null;
            }
            if (item) {
                item.fadeOut(100);
            }
        },
        /**
         * @return {?}
         */
        delayHide : function() {
            if (tref) {
                clearTimeout(tref);
                /** @type {null} */
                tref = null;
            }
            if (!item.isVisible()) {
                return false;
            }
            /** @type {number} */
            tref = setTimeout(function() {
                item.fadeOut(300);
            }, 500);
        }
    };
}(), yunpn.envSwitch = function() {
    /**
     * @param {?} id
     * @return {undefined}
     */
    function init(id) {
        show("iframe");
        W("#mainFrame").attr("src", id).show();
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function show(name) {
        if (name == "iframe") {
            /** @type {boolean} */
            r = true;
            W("#leftPanel .folders li").removeClass("current");
            W("#crumb").hide();
            W("#toolbar").hide();
            W("#fileList").hide();
            W("#fileListHistory").hide();
            W("#search,.real-search-bar").hide();
            W("#mainFrame").attr("src", "/task").show();
            if (QW.Browser.ie) {
                W("#music-container").css({
                    position : "absolute",
                    bottom : "0px",
                    left : "0px",
                    right : "auto"
                });
            }
            scroll();
        } else {
            /** @type {boolean} */
            r = false;
            W("#mainFrame").hide();
            if (QW.Browser.ie) {
                W("#music-container").css({
                    position : "static",
                    bottom : "0px",
                    left : "0px",
                    right : "auto"
                });
            }
            W("#crumb").show();
            W("#toolbar").show();
            W("#fileList").show();
            W("#search").show();
            if (yunpn.filelist.curFunc == "file") {
                try {
                    W(".real-search-bar").show();
                } catch (t) {
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function scroll() {
        if (r) {
            var self = W("#mainFrame");
            var position = self.getRect();
            var to = Dom.getDocRect();
            self.setStyle({
                height : to.height - position.top + "px"
            });
            if (QW.Browser.ie == 6) {
                self.setStyle({
                    width : to.scrollWidth - position.left + "px"
                });
            }
        }
    }
    /** @type {boolean} */
    var r = false;
    return{
        /** @type {function (?): undefined} */
        showIfrPage : init,
        /** @type {function (string): undefined} */
        show : show,
        /** @type {function (): undefined} */
        resizeIframe : scroll
    };
}(), yunpn.userInfo = function() {
    /**
     * @return {undefined}
     */
    function init() {
        h = W("#userInfo").css("height");
        userInfo = W("#userInfo");
        var mixin = location.search.substr("1").queryUrl();
        if (mixin["from"] == "firstreg" && !yunpn.Storage.get("REG_DIA")) {
            /** @type {boolean} */
            f = true;
            /** @type {string} */
            var text = ['<h2>2\u6b65\u63d0\u5347\u4f60\u7684\u4e91\u76d8\u7a7a\u95f4\u81f3\u8d85\u5927<span style="color:#f86d00">36T</span></h2>', '<div class="get-10T block">', "<h3>1\u5b89\u88c5\u4f7f\u7528\u4e91\u76d8PC\u5ba2\u6237\u7aef</h3>", "<p>\u8f7b\u677e\u7ba1\u7406\u6587\u6863\uff0c\u540c\u6b65\u5907\u4efd\u603b\u76f8\u5b9c\uff0c\u8fd8\u80fd\u770b\u89c6\u9891\u3002</p>", '<div class="btns">', '<a onclick="try{monitor.btnLog(mypcdownload)}catch(e){}" href="http://down.360safe.com/yunpn/360wangpan_setup.exe" target="_blank"><i class="icon icon-window"></i>\u4e0b\u8f7d\u81f3\u7535\u8111</a>',
                "</div>", "</div>", '<div class="get-26T block">', "<h3>2\u5b89\u88c5\u4f7f\u7528\u4e91\u76d8\u624b\u673a\u7248</h3>", "<p>\u968f\u65f6\u968f\u5730\u624b\u673a\u770b\u89c6\u9891\uff0c\u8fd8\u80fd\u73a9\u7fa4\u7ec4\u54e6\u3002</p>", '<div class="btns">', '<a onclick="try{monitor.btnLog(myandroiddownload)}catch(e){}" href="http://down.360safe.com/yunpn/360yunpn_android.apk" target="_blank" class="first"><i class="icon icon-android"></i>\u5b89\u5353\u4e0b\u8f7d</a>', '<a onclick="try{monitor.btnLog(myiphonedownload)}catch(e){}" href="http://itunes.apple.com/cn/app/360yun-pan/id508401605?mt=8" target="_blank"><i class="icon icon-iPhone"></i>iPhone\u4e0b\u8f7d</a>',
                '<a onclick="try{monitor.btnLog(myipaddownload)}catch(e){}" href="https://itunes.apple.com/cn/app/360yun-pan-hd/id566504735?mt=8" target="_blank"><i class="icon icon-iPad"></i>iPad\u4e0b\u8f7d</a>', '<img data-type="android" class="qr" width="29" src="/resource/img/my/qrcode-mini.gif">', "</div>", "</div>", '<div class="qrcode"><img width="99" src="/resource/img/my/qrcode.gif"></div>'].join("");
            var col = yunpn.dialog.create({
                body : text,
                wrapId : "get-36T-reg-panel",
                withMask : true
            });
            col.show();
            col.on("afterhide", function() {
                yunpn.Storage.set("REG_DIA", "1");
            });
            W("#get-36T-reg-panel .btns img").on("mouseenter", function() {
                W("#get-36T-reg-panel .qrcode").show();
            });
            W("#get-36T-reg-panel .btns img").on("mouseleave", function() {
                W("#get-36T-reg-panel .qrcode").hide();
            });
        }
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function run(options) {
        if (l) {
            return;
        }
        var codeSegments = W("#recommendGroupPanel input");
        /** @type {Array} */
        var arr2 = ["1290193", "1200441", "12164557", "12184444", "10002976"];
        /** @type {Array} */
        var arr1 = [];
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
            if (codeSegments[i].checked) {
                arr1.push(arr2[i]);
            }
        }
        if (arr1.length) {
            /** @type {boolean} */
            l = true;
            /** @type {string} */
            var r20 = ypDomain.qun + "/group/applyjoingroups";
            r20 += "?" + ObjectH.encodeURIJson({
                qid : SYS_CONF.qid,
                "gid[]" : arr1
            }) + "&cross_domain_callback=%callbackfun%&t=" + Math.random();
            loadJsonp(r20, function(err) {
                /** @type {boolean} */
                l = false;
                if (!!err.errno) {
                    options.hide();
                    $.alert(err.errmsg, {
                        type : "warning"
                    });
                    return;
                }
                trigger();
            });
        } else {
            options.hide();
        }
    }
    /**
     * @param {?} extra
     * @return {undefined}
     */
    function trigger(extra) {
        /** @type {string} */
        var namePrefix = "";
        if (window.groupListUrl) {
            /** @type {string} */
            namePrefix = window.groupListUrl + "#groupPanel";
        } else {
            /** @type {string} */
            namePrefix = ypDomain.qun + "/group/index#groupPanel";
        }
        var transport = W("#recommendGroupPanel");
        transport.query(".before-join").hide();
        transport.query(".after-join").show();
        transport.query(".recom-iphone").hide();
        transport.query(".view-group").attr("href", namePrefix);
    }
    /**
     * @return {undefined}
     */
    function update() {
        Ajax.get("/user/getsize/", {
            t : +new Date
        }, function(dataAndEvents) {
            try {
                var browserEvent = dataAndEvents.evalExp();
                var b = browserEvent.data.total_size || 1;
                var a = browserEvent.data.used_size;
                /** @type {number} */
                var pos = parseInt(a / b * 100, 10);
            } catch (s) {
            }
            a = yunpn.util.formatByte(a, 2);
            b = yunpn.util.formatByte(b, 2);
            W("#leftPanel .space-box .space-desc").html(a + "/" + b);
            /** @type {number} */
            pos = pos > 100 ? 100 : pos < 2.5 ? 2.5 : pos;
            W("#leftPanel .space-box .progress-used").css("width", pos + "%");
        });
    }
    /**
     * @return {undefined}
     */
    function login() {
        Ajax.post("/notice/getNoticeCount", {}, function(dataAndEvents) {
            var browserEvent = dataAndEvents.evalExp();
            if (!browserEvent || !browserEvent.data) {
                return;
            }
            if (browserEvent.data.new_notice_time != 0) {
                yunpn.userInfo.showMessageTime = browserEvent.data.new_notice_time;
                var r = yunpn.Storage.get("readMessageTime") + "";
                /** @type {string} */
                var text = yunpn.userInfo.showMessageTime + "";
                if (r !== text && browserEvent.data.unread_num != 0) {
                    if (browserEvent.data.unread_num > 99) {
                        /** @type {string} */
                        var fix = "99+"
                    } else {
                        /** @type {string} */
                        fix = browserEvent.data.unread_num + "";
                    }
                    W("#topPanel .user-info .badge-count em").html(fix + "\u6d88\u606f");
                    W("#topPanel .user-info .badge-count").show();
                    W("#userInfo .message em").html(fix).show();
                }
            }
        });
    }
    var s;
    var h;
    var userInfo;
    var showMessageTime;
    /** @type {boolean} */
    var f = false;
    /** @type {boolean} */
    var l = false;
    return{
        /** @type {function (): undefined} */
        init : init,
        /** @type {function (): undefined} */
        updateDiskInfo : update,
        /** @type {function (): undefined} */
        updateMessageInfo : login,
        showMessageTime : showMessageTime
    };
}(), yunpn.userInfo.updateDiskInfo(), yunpn.userInfo.updateMessageInfo(), Dom.ready(function() {
    yunpn.userInfo.init();
}), yunpn.lottery = function() {
    /** @type {Array} */
    var errorJSON = ["\u4eba\u54c1\u5927\u7206\u53d1\uff01\u6211\u4eca\u5929\u5728#360\u4e91\u76d8\u62bd\u5956#\u83b7\u5f97\u4e86{$reward}\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\uff0c\u5e78\u8fd0\u6307\u6570\u2605\u2605\u2605\u2605\u2605\uff0c\u4f60\u4e5f\u6765\u8bd5\u8bd5\u624b\u6c14\u5427~@{$nickname}\uff0c\u514d\u8d39\u5927\u5bb9\u91cf\u5b58\u50a8\u7a7a\u95f4\uff0c\u5b89\u5168\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\uff0c\u6c38\u4e0d\u4e22\u5931\uff0c\u8fd8\u80fd\u8f7b\u677e\u5206\u4eab\u7ed9\u597d\u53cb\uff0c\u4f60\u4e5f\u8d76\u7d27\u6765\u8bd5\u8bd5\u5427\u3002{$inviteUrl}",
        "\u624b\u6c14\u5f88\u4e0d\u9519\u54e6\uff01\u6211\u4eca\u5929\u5728#360\u4e91\u76d8\u62bd\u5956#\u83b7\u5f97\u4e86{$reward}\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\uff0c\u5e78\u8fd0\u6307\u6570\u2605\u2605\u2605\u2605\uff0c\u4f60\u4e5f\u6765\u8bd5\u8bd5\u624b\u6c14\u5427~@{$nickname}\uff0c\u514d\u8d39\u5927\u5bb9\u91cf\u5b58\u50a8\u7a7a\u95f4\uff0c\u5b89\u5168\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\uff0c\u6c38\u4e0d\u4e22\u5931\uff0c\u8fd8\u80fd\u8f7b\u677e\u5206\u4eab\u7ed9\u597d\u53cb\uff0c\u4f60\u4e5f\u8d76\u7d27\u6765\u8bd5\u8bd5\u5427\u3002{$inviteUrl}",
        "\u518d\u63a5\u518d\u5389\uff0c\u4e89\u53d6\u66f4\u5927\u80dc\u5229\uff01\u6211\u4eca\u5929\u5728#360\u4e91\u76d8\u62bd\u5956#\u83b7\u5f97\u4e86{$reward}\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\uff0c\u5e78\u8fd0\u6307\u6570\u2605\u2605\u2605\uff0c\u4f60\u4e5f\u6765\u8bd5\u8bd5\u624b\u6c14\u5427~@{$nickname}\uff0c\u514d\u8d39\u5927\u5bb9\u91cf\u5b58\u50a8\u7a7a\u95f4\uff0c\u5b89\u5168\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\uff0c\u6c38\u4e0d\u4e22\u5931\uff0c\u8fd8\u80fd\u8f7b\u677e\u5206\u4eab\u7ed9\u597d\u53cb\uff0c\u4f60\u4e5f\u8d76\u7d27\u6765\u8bd5\u8bd5\u5427\u3002{$inviteUrl}",
        "\u4e00\u822c\u4e00\u822c\uff0c\u4e16\u754c\u7b2c\u4e09\uff01\u6211\u4eca\u5929\u5728#360\u4e91\u76d8\u62bd\u5956#\u83b7\u5f97\u4e86{$reward}\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\uff0c\u5e78\u8fd0\u6307\u6570\u2605\u2605\uff0c\u4f60\u4e5f\u6765\u8bd5\u8bd5\u624b\u6c14\u5427~@{$nickname}\uff0c\u514d\u8d39\u5927\u5bb9\u91cf\u5b58\u50a8\u7a7a\u95f4\uff0c\u5b89\u5168\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\uff0c\u6c38\u4e0d\u4e22\u5931\uff0c\u8fd8\u80fd\u8f7b\u677e\u5206\u4eab\u7ed9\u597d\u53cb\uff0c\u4f60\u4e5f\u8d76\u7d27\u6765\u8bd5\u8bd5\u5427\u3002{$inviteUrl}",
        "\u6562\u518d\u5c11\u70b9\uff1f\u6211\u8ddf\u4f60\u6025\uff01\u6211\u4eca\u5929\u5728#360\u4e91\u76d8\u62bd\u5956#\u83b7\u5f97\u4e86{$reward}\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\uff0c\u5e78\u8fd0\u6307\u6570\u2605\uff0c\u4f60\u4e5f\u6765\u8bd5\u8bd5\u624b\u6c14\u5427~@{$nickname}\uff0c\u514d\u8d39\u5927\u5bb9\u91cf\u5b58\u50a8\u7a7a\u95f4\uff0c\u5b89\u5168\u5907\u4efd\u7167\u7247\u3001\u6587\u6863\uff0c\u6c38\u4e0d\u4e22\u5931\uff0c\u8fd8\u80fd\u8f7b\u677e\u5206\u4eab\u7ed9\u597d\u53cb\uff0c\u4f60\u4e5f\u8d76\u7d27\u6765\u8bd5\u8bd5\u5427\u3002{$inviteUrl}"];
    /** @type {string} */
    var data = '    <div class="content0">        <h2>{$reward}</h2>        <p>\u606d\u559c\u60a8\uff0c\u672c\u6b21\u62bd\u5956\u83b7\u5f97\u4e86<b>{$total}</b>\u6c38\u4e45\u514d\u8d39\u7a7a\u95f4\u3002</p>        <p>\u5e78\u8fd0\u6307\u6570\uff1a<span class="stars" style="width:{$width}">stars</span></p>        <a href="{$sina}" onclick="monitor.yplog(208)" target="_blank" class="sina">\u8f6c\u53d1\u5230\u65b0\u6d6a\u5fae\u535a</a>        <a href="{$tencent}" onclick="monitor.yplog(209)" target="_blank" class="tencent">\u8f6c\u53d1\u5230\u817e\u8baf\u5fae\u535a</a>        <a href="/my?p=sign" id="lotteryRecords" style="position:absolute;left: 210px;top: 117px;">\u67e5\u770b\u62bd\u5956\u8bb0\u5f55</a>    </div>    <div class="message content1">        <p>\u62b1\u6b49\uff0c\u62bd\u5956\u5931\u8d25\uff01</p>        <p>\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002</p>    </div>    <div class="message content2">        <p>\u4eca\u65e5\u5df2\u62bd\u5956\uff01</p>        <p>\u8bf7\u660e\u65e5\u518d\u6765\u3002</p>    </div>';
    /** @type {string} */
    var redirect_uri = encodeURIComponent("http://p5.qhimg.com/d/inn/15501442/lottery.jpg");
    /** @type {string} */
    var newItem = "http://service.t.sina.com.cn/share/share.php?title={$title}&appkey=4060160539&content=utf8&pic=" + redirect_uri;
    /** @type {string} */
    var $ = "http://v.t.qq.com/share/share.php?title={$title}&url={$url}&pic=" + redirect_uri;
    /** @type {number} */
    var STATUS_DONE = 0;
    /** @type {number} */
    var STATUS_UNDONE = 1;
    /** @type {boolean} */
    var isRequesting = false;
    return{
        /**
         * @param {number} recurring
         * @param {?} value
         * @return {undefined}
         */
        interface_update : function(recurring, value) {
            var row = this.node_interface.parentNode("div");
            switch(recurring) {
                case STATUS_DONE:
                    row.replaceClass("lottery-ing", "lottery-already");
                    break;
                case STATUS_UNDONE:
                    row.replaceClass("lottery-already", "lottery-ing");
                    break;
                default:
                    ;
            }
        },
        /**
         * @param {number} recurring
         * @param {Object} content
         * @return {undefined}
         */
        dialog_show : function(recurring, content) {
            var attributes = {};
            switch(recurring) {
                case 0:
                    /** @type {Object} */
                    attributes.body = content;
                    /** @type {string} */
                    attributes.className = "lottery-dialog0";
                    if (content) {
                        break;
                    }
                    ;
                case 1:
                    /** @type {string} */
                    attributes.body = data;
                    /** @type {string} */
                    attributes.className = "lottery-dialog1";
                    break;
                case 2:
                    /** @type {string} */
                    attributes.body = data;
                    /** @type {string} */
                    attributes.className = "lottery-dialog2";
                    break;
                default:
                    /** @type {null} */
                    attributes = null;
            }
            if (!attributes) {
                return;
            }
            this.dialog = yunpn.dialog.create(attributes);
            this.dialog.show();
            this.dialog.on("afterhide", function() {
                yunpn.lottery.dialog.dispose();
                /** @type {null} */
                yunpn.lottery.dialog = null;
                if (yunpn.lottery.from_browser) {
                    /** @type {string} */
                    document.location.href = "/my/index";
                }
            });
            if (QW.Browser.ie6) {
                W(".mask").css("z-index", "20");
            }
        },
        /**
         * @return {undefined}
         */
        signin_communicate : function() {
            if (isRequesting) {
                return;
            }
            /** @type {boolean} */
            isRequesting = true;
            Ajax.post("/user/signin/", {
                qid : SYS_CONF.qid,
                method : "signin",
                t : +new Date
            }, function(options) {
                /** @type {boolean} */
                isRequesting = false;
                /** @type {*} */
                options = eval("(" + options + ")");
                var j;
                var udataCur;
                var startIndex;
                var params;
                var w;
                /** @type {Array} */
                var codeSegments = [400, 800, 1228.8, 1638.4];
                if (!options.errno) {
                    /** @type {number} */
                    j = Math.round(options.data.reward / 1048576);
                    /** @type {number} */
                    udataCur = Math.round(options.data.total / 1048576);
                    /** @type {number} */
                    startIndex = 0;
                    /** @type {number} */
                    var i = 0;
                    for (;i < codeSegments.length;i++) {
                        if (j < codeSegments[i]) {
                            /** @type {number} */
                            startIndex = i + 1;
                            break;
                        }
                    }
                    if (!startIndex) {
                        /** @type {number} */
                        startIndex = 5;
                    }
                    params = errorJSON[5 - startIndex];
                    /** @type {Array} */
                    params = [params.tmpl({
                        reward : j + "MB",
                        nickname : "360\u4e91\u76d8",
                        inviteUrl : "http://yunpn.360.cn/invite/" + SYS_CONF.inviteCode + "?sid=208"
                    }), params.tmpl({
                        reward : j + "MB",
                        nickname : "i360yunpn",
                        inviteUrl : ""
                    })];
                    /** @type {string} */
                    j = "+" + j + "MB";
                    udataCur += "MB";
                    /** @type {number} */
                    w = 1 + startIndex * 22;
                    w += "px";
                    yunpn.lottery.dialog_show(0, data.tmpl({
                        reward : j,
                        total : udataCur,
                        width : w,
                        sina : newItem.tmpl({
                            title : encodeURIComponent(params[0])
                        }),
                        tencent : $.tmpl({
                            title : encodeURIComponent(params[1]),
                            url : "http://yunpn.360.cn/invite/" + SYS_CONF.inviteCode + "?sid=209"
                        })
                    }));
                    monitor.yplog("316");
                    yunpn.lottery.interface_update(0, udataCur);
                    yunpn.userInfo.updateDiskInfo();
                } else {
                    if (options.errno === 27002) {
                        yunpn.lottery.dialog_show(2);
                        yunpn.lottery.interface_update(0);
                    } else {
                        yunpn.lottery.dialog_show(1);
                    }
                }
            });
        },
        /**
         * @return {undefined}
         */
        check_communicate : function() {
            Ajax.post("/user/signin/", {
                qid : SYS_CONF.qid,
                method : "check",
                t : +new Date
            }, function(data) {
                /** @type {*} */
                data = eval("(" + data + ")");
                var udataCur;
                if (data.errno === 27002) {
                    /** @type {number} */
                    udataCur = Math.round(data.data.total / 1048576);
                    udataCur += "MB";
                    yunpn.lottery.interface_update(0, udataCur);
                } else {
                    yunpn.lottery.interface_update(1);
                }
            });
        }
    };
}(), Dom.ready(function() {
    var point = location.search.substr("1").queryUrl();
    yunpn.lottery.node_interface = W("#lottery-everyday");
    if (point.p === "signin") {
        /** @type {boolean} */
        yunpn.lottery.from_browser = true;
        yunpn.lottery.signin_communicate();
    } else {
        yunpn.lottery.check_communicate();
    }
}), namespace("yunpn.docviewer"), function() {
    var $cookies = {
        doc : 5242880,
        docx : 5242880,
        xls : 5242880,
        xlsx : 5242880,
        ppt : 5242880,
        pptx : 5242880,
        pdf : 20971520,
        txt : 10485760,
        url : 4096,
        sh : 2097152,
        js : 2097152,
        css : 2097152,
        php : 2097152,
        python : 2097152,
        py : 2097152,
        c : 2097152,
        cpp : 2097152,
        cs : 2097152,
        java : 2097152,
        xml : 2097152,
        html : 2097152,
        htm : 2097152,
        markdown : 2097152,
        mdown : 2097152,
        mkdn : 2097152,
        md : 2097152
    };
    /**
     * @param {?} key
     * @param {?} m1
     * @return {?}
     */
    yunpn.docviewer.canPreview = function(key, m1) {
        return $cookies[key] && parseInt(m1) <= $cookies[key] ? true : false;
    };
    /**
     * @param {?} key
     * @param {?} m1
     * @return {?}
     */
    yunpn.docviewer.checkPreview = function(key, m1) {
        var child = {
            isDoc : false,
            isOversize : false
        };
        return $cookies[key] && (child.isDoc = true, parseInt(m1) > $cookies[key] && (child.isOversize = true)), child;
    };
}(), yunpn.docviewer.getUrl = function() {
    /** @type {Array} */
    var values = [{
        type : "Source",
        suffix : ["txt", "url", "sh", "js", "css", "php", "python", "py", "c", "cpp", "cs", "java", "xml", "html", "htm", "markdown", "mdown", "mkdn", "md"]
    }, {
        type : "Word",
        suffix : ["doc", "docx"]
    }, {
        type : "Excel",
        suffix : ["xls", "xlsx", "csv"]
    }, {
        type : "Ppt",
        suffix : ["ppt", "pptx"]
    }, {
        type : "Pdf",
        suffix : ["pdf"]
    }];
    return function(a, dataAndEvents, existingFn, charset, owner, deepDataAndEvents, ignoreMethodDoesntExist) {
        /** @type {string} */
        var b = "";
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var valuesLen = values.length;
        for (;i < valuesLen;i++) {
            var v = values[i];
            if (v.suffix.indexOf(existingFn) >= 0) {
                b += a == "share" ? "share" + v.type + "viewer" : v.type.toLowerCase() + "viewer";
                break;
            }
        }
        return b ? (a == "sFile" ? b = (charset ? "http://" + charset : "") + "/sDocviewer/" + b : b = (charset ? "http://" + charset : "") + "/docviewer/" + b, b += "?nid=" + dataAndEvents + "&type=" + existingFn + "&id=" + deepDataAndEvents + "&hisFile=" + ignoreMethodDoesntExist, owner && (b += "&" + Object.encodeURIJson(owner)), b) : "";
    };
}(), yunpn.cmdCenter = function() {
    /**
     * @return {?}
     */
    function parse() {
        var params = attr();
        if (!params) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        var param = params[0];
        var reconnecting = param.attr("data-file-suffix");
        var svcId = param.attr("data-nid");
        var scid = param.attr("data-scid");
        var size = param.attr("data-ori-size");
        var url = yunpn.docviewer.getUrl(yunpn.filelist.curFunc == "sFile" ? "sFile" : "file", svcId, reconnecting, null, {
            scid : scid,
            size : size
        });
        if (url) {
            window.open(url);
        }
    }
    /**
     * @param {Array} container
     * @return {?}
     */
    function draw(container) {
        var params = Object.isString(container) && container.length > 0 ? yunpn.fo.getAllFile().filter(function($slide) {
            return $slide.attr("data-nid") == container;
        }) : attr();
        if (!params) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        var param = params[0];
        if (yunpn.filelist.curFunc == "link") {
            yunpn.cmdCenter.viewLinkItem(param.attr("data-url"));
            return;
        }
        var fname = param.attr("data-path");
        Ajax.post(yunpn.config.url.f_down, {
            nid : param.attr("data-nid"),
            fname : fname
        }, function(dataAndEvents) {
            var err = dataAndEvents.evalExp();
            if (err.errno) {
                $.alert(err.errmsg, {
                    type : "error"
                });
            } else {
                W("#ifrDownload").attr("src", err.data.download_url);
            }
        });
        monitor.btnLog("Download");
        monitor.tlog({
            qid : SYS_CONF.qid || "",
            m : "my",
            a : "20130108-my-dl",
            s : param.attr("data-file-suffix")
        });
    }
    /**
     * @return {?}
     */
    function next() {
        var list = attr();
        if (!list) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        /** @type {string} */
        var mask = "";
        /** @type {Array} */
        var include = [];
        /** @type {Array} */
        var tagNameArr = [];
        /** @type {number} */
        var id = 0;
        var path = yunpn.filelist.path;
        /** @type {number} */
        var i = 0;
        var listLength = list.length;
        for (;i < listLength;i++) {
            var item = list[i];
            var p;
            var paths = list[i].attr("data-path").split("/");
            if (item.attr("data-type") == "folder") {
                p = paths[paths.length - 2] + "/";
            } else {
                p = paths[paths.length - 1];
            }
            tagNameArr.push(item.attr("data-nid"));
            include.push(p);
        }
        /** @type {number} */
        i = 0;
        for (;i < yunpn.filelist.nav.length;i++) {
            if (yunpn.filelist.nav[i].path == path) {
                id = yunpn.filelist.nav[i].nid;
                break;
            }
        }
        if (list.length == 1 && list[0].attr("data-type") == "folder") {
            paths = list[0].attr("data-path").split("/");
            mask = paths[paths.length - 2] + ".zip";
        } else {
            /** @type {string} */
            mask = "360\u4e91\u76d8\u6253\u5305\u4e0b\u8f7d\u7684\u6587\u4ef6.zip";
        }
        var task;
        if (yunpn.filelist.curFunc == "file") {
            task = {
                fatherPath : path,
                "path[]" : include
            };
        } else {
            task = {
                pid : id,
                "nids[]" : tagNameArr
            };
        }
        var ajax = new Ajax({
            url : yunpn.config.url.packDown,
            method : "post",
            data : task,
            async : false,
            /**
             * @return {undefined}
             */
            onsucceed : function() {
                var e = this.requester.responseText.evalExp();
                if (e.errno == 0) {
                    var data = g("frmPackDownload");
                    data.packKey.value = e.data.download_pack_key;
                    data.packSign.value = e.data.download_pack_sign;
                    data.fatherPath.value = path;
                    /** @type {string} */
                    data.fileNames.value = include.join("|");
                    /** @type {string} */
                    data.nids.value = tagNameArr.join("|");
                    data.pid.value = id;
                    data.zipFileName.value = mask;
                    /** @type {string} */
                    data.dt.value = (ypDomain.clusterid || "") + "." + (SYS_CONF.qid || "");
                    if (e.data.host) {
                        W(data).attr("action", "http://" + e.data.host + "/intf.php");
                    }
                    W(data).query(".method").attr("name", "method");
                    if (yunpn.filelist.curFunc == "sFile") {
                        W(data).query(".method").attr("value", "SSync.downloadPack");
                    } else {
                        W(data).query(".method").attr("value", "Sync.downloadPack");
                    }
                    data.submit();
                } else {
                    if (e.errno == 8E3) {
                        $.alert('\u6253\u5305\u4e0b\u8f7d\u6587\u4ef6\u6570\u8d85\u8fc71000\u9650\u5236<br><span style="font-size:12px;color:#666">\u5efa\u8bae\u4f7f\u7528\u5ba2\u6237\u7aef\u4e0b\u8f7d\uff0c\u5feb\u901f\u3001\u7a33\u5b9a\u3001\u652f\u6301\u65ad\u70b9\u7eed\u4f20</span>', {
                            type : "warning",
                            btnText : "\u4e0b\u8f7d\u4e91\u76d8PC\u5ba2\u6237\u7aef",
                            /**
                             * @return {undefined}
                             */
                            fn : function() {
                                window.open("http://down.360safe.com/yunpn/360wangpan_setup.exe");
                            }
                        });
                    } else {
                        if (e.errno == 22101) {
                            $.alert('\u6253\u5305\u4e0b\u8f7d\u8d85\u8fc71G\u5927\u5c0f\u9650\u5236<br><span style="font-size:12px;color:#666">\u5efa\u8bae\u4f7f\u7528\u5ba2\u6237\u7aef\u4e0b\u8f7d\uff0c\u5feb\u901f\u3001\u7a33\u5b9a\u3001\u652f\u6301\u65ad\u70b9\u7eed\u4f20</span>', {
                                type : "warning",
                                btnText : "\u4e0b\u8f7d\u4e91\u76d8PC\u5ba2\u6237\u7aef",
                                /**
                                 * @return {undefined}
                                 */
                                fn : function() {
                                    window.open("http://down.360safe.com/yunpn/360wangpan_setup.exe");
                                }
                            });
                        } else {
                            $.alert(e.errmsg, {
                                type : "error"
                            });
                        }
                    }
                }
            }
        });
        ajax.send();
        monitor.btnLog("Download");
        monitor.tlog({
            qid : SYS_CONF.qid || "",
            m : "my",
            a : "20130108-my-dl",
            s : "packdl"
        });
    }
    /**
     * @param {Array} callback
     * @return {undefined}
     */
    function load(callback) {
        /** @type {Array} */
        var assigns = [];
        /** @type {Array} */
        var eventPath = [];
        callback.forEach(function(image) {
            var vvar = image.attr("data-path");
            assigns.push(vvar);
            eventPath.push(image.attr("data-nid"));
        });
        if (yunpn.filelist.curFunc == "file") {
            /** @type {string} */
            batchParamData = "path[]";
            /** @type {Array} */
            dataData = assigns;
        } else {
            /** @type {string} */
            batchParamData = "nids[]";
            /** @type {Array} */
            dataData = eventPath;
        }
        yunpn.tips.show();
        yunpn.BatchRequest.create({
            url : yunpn.config.url.delToRecyle,
            batchParam : batchParamData,
            data : dataData,
            /**
             * @param {string} _xhr
             * @return {undefined}
             */
            batchSuccess : function(_xhr) {
                /** @type {*} */
                var err = eval("(" + _xhr + ")");
                if (err.errno != 0) {
                    yunpn.tips.hide();
                    $.alert(err.errmsg, {
                        type : "error"
                    });
                    yunpn.filelist.list();
                    yunpn.BatchRequest.terminate();
                }
                /** @type {boolean} */
                yunpn.ytree.isFolderChanged = true;
                /** @type {boolean} */
                yunpn.ytreeSfile.isFolderChanged = true;
                /** @type {boolean} */
                yunpn.ytreeSfileTofile.isFolderChanged = true;
            },
            /**
             * @return {undefined}
             */
            success : function() {
                yunpn.tips.show("\u5220\u9664\u6210\u529f");
                try {
                    callback.forEach(function(element) {
                        element.removeNode();
                    });
                } catch (e) {
                }
                yunpn.fo.initFileIndex();
                yunpn.userInfo.updateDiskInfo();
                if (yunpn.fo.getFileNum() < 1) {
                    if (yunpn.filelist.page > 0) {
                        /** @type {number} */
                        yunpn.filelist.page = yunpn.filelist.page - 1;
                    }
                }
                yunpn.filelist.list();
                yunpn.cmdCenter.updateStatus();
            }
        });
    }
    /**
     * @return {?}
     */
    function handler() {
        var song = attr();
        if (!song) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        monitor.btnLog("Delete");
        var t;
        var n;
        var str;
        if (yunpn.filelist.curFunc == "file") {
            /** @type {string} */
            str = "<p>\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8fd9<em>" + song.length + '</em>\u9879\uff1f<p><p class="info">\u5220\u9664\u540e\u53ef\u5728\u56de\u6536\u7ad9\u8fd8\u539f\u3002</p>';
            var self = $.confirm(str, {
                title : "\u5220\u9664",
                type : "warning",
                wrapId : "deleteDia",
                textwidth : 161,
                /**
                 * @param {string} button
                 * @return {undefined}
                 */
                fn : function(button) {
                    if (button != "yes") {
                        return;
                    }
                    load(song);
                }
            });
            self.dialog("open");
            /** @type {number} */
            var s = 1;
        } else {
            /** @type {string} */
            str = "<p>\u60a8\u786e\u5b9a\u8981\u6c38\u4e45\u5220\u9664\u8fd9<em>" + song.length + '</em>\u9879\uff1f</p><p class="info info-warning">\u5220\u9664\u540e\u5c06\u65e0\u6cd5\u6062\u590d\uff01</p>';
            $.confirm(str, {
                title : "\u5220\u9664",
                type : "warning",
                wrapId : "deleteDia",
                width : 300,
                textwidth : 161,
                btnOkText : "\u6682\u4e0d\u5220\u9664",
                btnCancelText : "\u786e\u5b9a\u5220\u9664",
                /**
                 * @param {string} button
                 * @return {undefined}
                 */
                fn : function(button) {
                    if (button == "yes") {
                        return;
                    }
                    load(song);
                }
            });
        }
    }
    /**
     * @return {undefined}
     */
    function refresh() {
        yunpn.filelist.list();
    }
    /**
     * @return {?}
     */
    function select() {
        /**
         * @param {?} allBindingsAccessor
         * @return {undefined}
         */
        function update(allBindingsAccessor) {
            var context = W("textarea#rename-text");
            if (context.length <= 0) {
                return;
            }
            var isFunction = context.get("value");
            var part = W("body .folder-name-ruler");
            var w;
            var s;
            var h;
            part = part.length > 0 ? part : W('<div class="folder-name-ruler"></div>').insertTo("beforeend", document.body);
            part.html(isFunction.encode4Html().replace(/ /g, "&nbsp;"));
            w = part.getSize();
            h = w.height;
            h = h > 32 ? h + 16 : 32;
            context.setStyle("height", h + "px");
        }
        /**
         * @param {?} ev
         * @return {undefined}
         */
        function callback(ev) {
            ev.stopPropagation();
        }
        var $el = attr();
        if (!$el || $el.length > 1) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        monitor.btnLog("Rename");
        var el = $el[0];
        var ps = el.attr("data-path");
        var nid = el.attr("data-nid");
        var themeType = el.attr("data-type");
        var plugin = el.attr("data-title");
        var listtype = yunpn.filelist.listtype;
        var f;
        if (el.hasClass("renaming")) {
            return;
        }
        yunpn.fo.unSelectFile(el);
        yunpn.cmdCenter.updateStatus();
        el.addClass("renaming").query(".text").hide();
        if (listtype === 1) {
            el.query(".column-name").appendChild('<input id="rename-text" type="text" value="' + plugin + '" />');
        } else {
            el.query(".column-name").appendChild('<textarea id="rename-text">' + plugin + "</textarea>");
        }
        var textarea = g("rename-text");
        var val = textarea.value;
        var endComma = themeType != "folder" ? val.lastIndexOf(".") : val.length;
        /** @type {number} */
        var start = 0;
        var pos = endComma < 0 ? val.length : endComma;
        if (textarea.setSelectionRange) {
            textarea.focus();
            textarea.setSelectionRange(start, pos);
        } else {
            if (textarea.createTextRange) {
                var range = textarea.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", start);
                range.select();
            }
        }
        var element = W("#rename-text");
        /** @type {boolean} */
        var y = false;
        element.on("blur", function(dataAndEvents) {
            if (y) {
                return;
            }
            var element = W(this);
            var type = element.attr("value");
            /** @type {null} */
            var resultCallback = null;
            if (type === plugin) {
                return element.removeNode(), el.query(".text").show(), el.removeClass("renaming"), window.setTimeout(function() {
                    yunpn.fo.selectFile(el);
                    yunpn.cmdCenter.updateStatus();
                }, 10), false;
            }
            if (/[\\\/\:\*\?\"<>|]+/.test(type)) {
                /** @type {string} */
                resultCallback = '\u4e0d\u80fd\u5305\u542b\\ / : * ? " < > |\u7b49\u5b57\u7b26\uff01';
                /** @type {number} */
                msgwith = 224;
            } else {
                if (/^\./.test(type)) {
                    /** @type {string} */
                    resultCallback = "\u65b0\u540d\u79f0\u4e0d\u80fd\u4ee5.\u5f00\u5934";
                    /** @type {number} */
                    msgwith = 128;
                } else {
                    if (/^\s*$/.test(type)) {
                        /** @type {string} */
                        resultCallback = "\u65b0\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a\uff01";
                        /** @type {number} */
                        msgwith = 128;
                    } else {
                        if (yunpn.filelist.path === "/") {
                            if ("\u4e91\u540c\u6b65" === type) {
                                /** @type {string} */
                                resultCallback = '"\u4e91\u540c\u6b65"\u662f\u7cfb\u7edf\u76ee\u5f55\uff0c\u8bf7\u4f7f\u7528\u5176\u4ed6\u540d\u5b57\u521b\u5efa\u76ee\u5f55\uff01';
                                /** @type {number} */
                                msgwith = 191;
                            }
                        }
                    }
                }
            }
            if (resultCallback) {
                return y = true, window.setTimeout(function() {
                    $.alert(resultCallback, {
                        type : "error",
                        /**
                         * @return {undefined}
                         */
                        fn : function() {
                            /** @type {boolean} */
                            y = false;
                            if (Browser.firefox) {
                                return;
                            }
                            W("#rename-text").focus().select();
                        }
                    });
                }, 10), false;
            }
            yunpn.tips.show();
            type = type.replace(/\r/g, "").replace(/\n/g, "");
            /** @type {boolean} */
            y = true;
            Ajax.post(yunpn.config.url.rename, {
                path : ps,
                nid : nid,
                newpath : themeType === "folder" ? type + "/" : type
            }, function(err) {
                err = err.evalExp();
                if (err.errno) {
                    yunpn.tips.hide();
                    if (err.errno === 3005) {
                        /** @type {string} */
                        err.errmsg = "\u5df2\u5b58\u5728\u76f8\u540c\u6587\u4ef6\u540d\uff01";
                    }
                    $.alert(err.errmsg, {
                        type : "warning",
                        /**
                         * @return {undefined}
                         */
                        fn : function() {
                            if (Browser.firefox) {
                                return;
                            }
                            W("#rename-text").focus().select();
                            /** @type {boolean} */
                            y = false;
                        }
                    });
                } else {
                    yunpn.tips.show("\u91cd\u547d\u540d\u6210\u529f\uff01");
                    yunpn.fo.selectFile(el);
                    yunpn.cmdCenter.updateStatus();
                    W("#rename-text").removeNode();
                    el.query(".text").html(type).show();
                    el.removeClass("renaming");
                    el.attr("data-title", type);
                    var idx = el.attr("data-path");
                    var parts = idx.split("/");
                    /** @type {number} */
                    var key = parts.length - 1;
                    for (;key >= 0;key -= 1) {
                        if (parts[key] === plugin) {
                            parts[key] = type;
                        }
                    }
                    idx = parts.join("/");
                    el.attr("data-path", idx);
                    yunpn.filelist.list(null, null, null, type);
                    /** @type {boolean} */
                    y = false;
                    if (yunpn.filelist.curFunc == "file") {
                        /** @type {boolean} */
                        yunpn.ytreeSfileTofile.isFolderChanged = true;
                        /** @type {boolean} */
                        yunpn.ytree.isFolderChanged = true;
                    } else {
                        /** @type {boolean} */
                        yunpn.ytreeSfile.isFolderChanged = true;
                    }
                }
            });
        }).on("keydown", function(event) {
            update();
            if (event.keyCode === 13) {
                this.blur();
                event.stopPropagation();
            }
        });
        /** @type {function (?): undefined} */
        element[0].oninput = update;
        /** @type {function (?): undefined} */
        element[0].onpropertychange = update;
        element.on("contextmenu", callback).on("dblclick", callback);
    }
    /**
     * @return {?}
     */
    function run() {
        monitor.btnLog("Move");
        if (!addClass()) {
            return false;
        }
        var curFunc = yunpn.filelist.curFunc;
        /**
         * @return {?}
         */
        var render = function() {
            var path = yunpn.ytree.getFolder();
            var newNid = yunpn.ytree.getNid();
            if (!path) {
                $.alert("\u8bf7\u9009\u62e9\u4e00\u4e2a\u6587\u4ef6\u5939\uff01", {
                    type : "warning"
                });
            } else {
                /** @type {Array} */
                var out = [];
                /** @type {Array} */
                var assigns = [];
                var asserterNames = attr();
                if (!asserterNames) {
                    return loading.hide(), false;
                }
                if (path == yunpn.filelist.path) {
                    return loading.hide(), false;
                }
                asserterNames.forEach(function(image) {
                    var copies = image.attr("data-path");
                    out.push(copies);
                    var vvar = image.attr("data-nid");
                    assigns.push(vvar);
                });
                yunpn.tips.show();
                yunpn.BatchRequest.create({
                    url : "/file/move/",
                    batchParam : "path[]",
                    data : out,
                    params : {
                        newpath : path
                    },
                    /**
                     * @param {string} _xhr
                     * @return {undefined}
                     */
                    batchSuccess : function(_xhr) {
                        /** @type {*} */
                        var err = eval("(" + _xhr + ")");
                        if (err.errno != 0) {
                            yunpn.BatchRequest.terminate();
                            yunpn.tips.hide();
                            $.alert(err.errmsg, {
                                type : "error"
                            });
                            loading.hide();
                        }
                    },
                    /**
                     * @return {undefined}
                     */
                    success : function() {
                        yunpn.tips.show("\u79fb\u52a8\u6210\u529f\uff01");
                        /** @type {boolean} */
                        yunpn.ytree.isFolderChanged = true;
                        try {
                            asserterNames.forEach(function(element) {
                                element.removeNode();
                            });
                        } catch (e) {
                        }
                        yunpn.fo.initFileIndex();
                        if (yunpn.fo.getFileNum() < 1) {
                            if (yunpn.filelist.page > 0) {
                                /** @type {number} */
                                yunpn.filelist.page = yunpn.filelist.page - 1;
                            }
                        }
                        yunpn.filelist.list();
                        loading.hide();
                    }
                });
            }
        };
        if (!loading) {
            /** @type {string} */
            var text = ['<div class="fileBox">', '<h3 class="msg">\u9009\u62e9\u79fb\u52a8\u5230\u7684\u4f4d\u7f6e</h3>', '<div class="fileBd">', '<ul class="fileBdUl">', '<li id="yunpnTree"></li>', "</ul>", "</div>", "</div>"].join("");
            loading = yunpn.dialog.create({
                body : text,
                title : "\u79fb\u52a8\u6587\u4ef6\uff08\u5939\uff09",
                withClose : true,
                buttons : [{
                    cls : "move",
                    text : "\u786e\u5b9a\u79fb\u52a8",
                    type : "blue",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        render();
                    }
                }, {
                    text : "\u53d6\u6d88",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        loading.hide();
                    }
                }]
            });
        }
        yunpn.ytree.show();
        loading.show();
    }
    /**
     * @return {?}
     */
    function open() {
        if (!addClass()) {
            return false;
        }
        /**
         * @return {?}
         */
        var start = function() {
            var e = yunpn.ytreeSfileTofile.getFolder();
            var new_pid = yunpn.ytreeSfileTofile.getNid();
            if (!e) {
                $.alert("\u8bf7\u9009\u62e9\u4e00\u4e2a\u6587\u4ef6\u5939\uff01", {
                    type : "warning"
                });
            } else {
                /** @type {Array} */
                var vvar = [];
                /** @type {Array} */
                var copies = [];
                var asserterNames = attr();
                /** @type {Array} */
                var out = [];
                /** @type {Array} */
                var assigns = [];
                /** @type {Array} */
                var data = [];
                if (!asserterNames) {
                    return loading.hide(), false;
                }
                asserterNames.forEach(function(parentEl) {
                    var segment = parentEl.attr("data-nid");
                    var type = parentEl.attr("data-type");
                    if (type == "file") {
                        copies.push(segment);
                    } else {
                        out.push(segment);
                    }
                });
                if (copies.length > 0) {
                    out.push(copies);
                    assigns.push(vvar);
                }
                timefloat.hide();
                yunpn.tip.QuickTip.init({
                    container : W("#mainPanel"),
                    cls : "batchRequestTip",
                    close : true,
                    closeIcon : true
                });
                yunpn.tip.QuickTip.show('\u6b63\u5728\u8f6c\u51fa...<em class="batch-title">0%</em>', "loading", 0);
                var yearCont = W(".x-quicktip em.batch-title");
                /** @type {number} */
                var sum = 367;
                /** @type {boolean} */
                var l = true;
                /** @type {number} */
                var value = 0;
                /** @type {number} */
                var len = out.length;
                /** @type {null} */
                var timer = null;
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var y = 0;
                for (;y < len;y++) {
                    if (y == 0) {
                        /** @type {number} */
                        data[y] = parseInt(sum / len);
                    } else {
                        if (y == len - 1) {
                            /** @type {number} */
                            data[y] = sum;
                        } else {
                            data[y] = data[y - 1] + parseInt(sum / len);
                        }
                    }
                }
                /**
                 * @return {undefined}
                 */
                var fn = function() {
                    if (l) {
                        value += Math.floor((data[i] - value) * 0.1);
                        yearCont.html(parseInt(value / sum * 100, 10) + "%");
                        /** @type {number} */
                        timer = setTimeout(fn, 100);
                    } else {
                        yearCont.html(parseInt(data[i] / sum * 100, 10) + "%");
                        clearTimeout(timer);
                    }
                };
                /**
                 * @return {undefined}
                 */
                var run = function() {
                    /** @type {boolean} */
                    l = true;
                    fn(data[i]);
                    Ajax.post("/sFile/transportFromSafeBox/", {
                        "nids[]" : out[i],
                        new_pid : new_pid
                    }, function(dataAndEvents) {
                        var e = dataAndEvents.evalExp();
                        if (e.errno == 0) {
                            /** @type {boolean} */
                            l = false;
                            fn(data[i]);
                            i += 1;
                            if (i < len) {
                                run();
                            } else {
                                setTimeout(function() {
                                    yunpn.tip.QuickTip.hide();
                                }, 300);
                                /** @type {number} */
                                i = 0;
                                /** @type {boolean} */
                                yunpn.ytree.isFolderChanged = true;
                                /** @type {boolean} */
                                yunpn.ytreeSfile.isFolderChanged = true;
                                /** @type {boolean} */
                                yunpn.ytreeSfileTofile.isFolderChanged = true;
                                try {
                                    asserterNames.forEach(function(element) {
                                        element.removeNode();
                                    });
                                } catch (n) {
                                }
                                yunpn.fo.initFileIndex();
                                if (yunpn.fo.getFileNum() < 1) {
                                    if (yunpn.filelist.page > 0) {
                                        /** @type {number} */
                                        yunpn.filelist.page = yunpn.filelist.page - 1;
                                    }
                                }
                                yunpn.filelist.list();
                            }
                        } else {
                            setTimeout(function() {
                                yunpn.tip.QuickTip.hide();
                            }, 300);
                            $.alert(ret.errmsg, {
                                type : "error"
                            });
                        }
                    });
                };
                run();
            }
        };
        if (!timefloat) {
            /** @type {string} */
            var text = "";
            /** @type {string} */
            text = ['<div class="fileBox">', '<h3 class="msg">\u9009\u62e9\u79fb\u52a8\u5230\u5168\u90e8\u6587\u4ef6\u7684\u4f4d\u7f6e</h3>', '<div class="fileBd">', '<ul class="fileBdUl">', '<li id="yunpnTreeSfiletofile"></li>', "</ul>", "</div>", "</div>"].join("");
            timefloat = yunpn.dialog.create({
                body : text,
                title : "\u79fb\u52a8\u6587\u4ef6\uff08\u5939\uff09",
                withClose : true,
                buttons : [{
                    cls : "move",
                    text : "\u786e\u5b9a\u79fb\u52a8",
                    type : "blue",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        start();
                    }
                }, {
                    text : "\u53d6\u6d88",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        timefloat.hide();
                    }
                }]
            });
        }
        yunpn.ytreeSfileTofile.show();
        timefloat.show();
    }
    /**
     * @return {?}
     */
    function func() {
        if (!addClass()) {
            return false;
        }
        if (!visible_image) {
            /** @type {string} */
            var text = ['<div class="fileBox">', '<h3 class="msg">\u9009\u62e9\u79fb\u52a8\u5230\u7684\u4f4d\u7f6e</h3>', '<div class="fileBd">', '<ul class="fileBdUl">', '<li id="yunpnTreeSfile"></li>', "</ul>", "</div>", "</div>"].join("");
            visible_image = yunpn.dialog.create({
                body : text,
                title : "\u79fb\u52a8\u6587\u4ef6\uff08\u5939\uff09",
                withClose : true,
                buttons : [{
                    cls : "move",
                    text : "\u786e\u5b9a\u79fb\u52a8",
                    type : "blue",
                    /**
                     * @return {?}
                     */
                    handler : function() {
                        var path = yunpn.ytreeSfile.getFolder();
                        var dst_nid = yunpn.ytreeSfile.getNid();
                        if (!path) {
                            $.alert("\u8bf7\u9009\u62e9\u4e00\u4e2a\u6587\u4ef6\u5939\uff01", {
                                type : "warning"
                            });
                        } else {
                            /** @type {Array} */
                            var assigns = [];
                            /** @type {Array} */
                            var values = [];
                            var asserterNames = attr();
                            if (!asserterNames) {
                                return visible_image.hide(), false;
                            }
                            if (path == yunpn.filelist.path) {
                                return visible_image.hide(), false;
                            }
                            asserterNames.forEach(function(image) {
                                var vvar = image.attr("data-path");
                                var templatePromise = image.attr("data-nid");
                                assigns.push(vvar);
                                values.push(templatePromise);
                            });
                            yunpn.tips.show();
                            yunpn.BatchRequest.create({
                                url : "/sFile/move/",
                                batchParam : "nids[]",
                                data : values,
                                params : {
                                    dst_nid : dst_nid
                                },
                                /**
                                 * @param {string} _xhr
                                 * @return {undefined}
                                 */
                                batchSuccess : function(_xhr) {
                                    /** @type {*} */
                                    var err = eval("(" + _xhr + ")");
                                    if (err.errno != 0) {
                                        yunpn.BatchRequest.terminate();
                                        yunpn.tips.hide();
                                        $.alert(err.errmsg, {
                                            type : "error"
                                        });
                                        visible_image.hide();
                                    }
                                },
                                /**
                                 * @return {undefined}
                                 */
                                success : function() {
                                    yunpn.tips.show("\u79fb\u52a8\u6210\u529f\uff01");
                                    /** @type {boolean} */
                                    yunpn.ytreeSfile.isFolderChanged = true;
                                    try {
                                        asserterNames.forEach(function(element) {
                                            element.removeNode();
                                        });
                                    } catch (e) {
                                    }
                                    yunpn.fo.initFileIndex();
                                    if (yunpn.fo.getFileNum() < 1) {
                                        if (yunpn.filelist.page > 0) {
                                            /** @type {number} */
                                            yunpn.filelist.page = yunpn.filelist.page - 1;
                                        }
                                    }
                                    yunpn.filelist.list();
                                    visible_image.hide();
                                }
                            });
                        }
                    }
                }, {
                    text : "\u53d6\u6d88",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        visible_image.hide();
                    }
                }]
            });
        }
        yunpn.ytreeSfile.show();
        visible_image.show();
    }
    /**
     * @return {undefined}
     */
    function access() {
        $.confirm("\u786e\u5b9a\u8f6c\u5165\u6587\u4ef6\u4fdd\u9669\u7bb1\uff1f", {
            title : "\u8f6c\u5165\u4fdd\u9669\u7bb1",
            type : "question",
            /**
             * @param {string} button
             * @return {undefined}
             */
            fn : function(button) {
                if (button == "yes") {
                    initialize();
                }
            }
        });
    }
    /**
     * @return {?}
     */
    function initialize() {
        /** @type {Array} */
        var copies = [];
        var asserterNames = attr();
        /** @type {Array} */
        var out = [];
        /** @type {Array} */
        var a = [];
        if (!asserterNames) {
            return false;
        }
        asserterNames.forEach(function(parentEl) {
            var segment = parentEl.attr("data-nid");
            var type = parentEl.attr("data-type");
            if (type == "file") {
                copies.push(segment);
            } else {
                out.push(segment);
            }
        });
        if (copies.length > 0) {
            out.push(copies);
        }
        yunpn.tip.QuickTip.init({
            container : W("#mainPanel"),
            cls : "batchRequestTip",
            close : true,
            closeIcon : true
        });
        yunpn.tip.QuickTip.show('\u6b63\u5728\u8f6c\u5165...<em class="batch-title">0%</em>', "loading", 0);
        var yearCont = W(".x-quicktip em.batch-title");
        /** @type {number} */
        var n = 367;
        /** @type {boolean} */
        var o = true;
        /** @type {number} */
        var m = 0;
        /** @type {number} */
        var len = out.length;
        /** @type {null} */
        var timer = null;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var j = 0;
        for (;j < len;j++) {
            if (j == 0) {
                /** @type {number} */
                a[j] = parseInt(n / len);
            } else {
                if (j == len - 1) {
                    /** @type {number} */
                    a[j] = n;
                } else {
                    a[j] = a[j - 1] + parseInt(n / len);
                }
            }
        }
        /**
         * @return {undefined}
         */
        var fn = function() {
            if (o) {
                m += Math.floor((a[i] - m) * 0.1);
                yearCont.html(parseInt(m / n * 100, 10) + "%");
                /** @type {number} */
                timer = setTimeout(fn, 100);
            } else {
                yearCont.html(parseInt(a[i] / n * 100, 10) + "%");
                clearTimeout(timer);
            }
        };
        /**
         * @return {undefined}
         */
        var run = function() {
            /** @type {boolean} */
            o = true;
            fn(a[i]);
            Ajax.post("/sFile/transportToSafeBox", {
                "nids[]" : out[i]
            }, function(dataAndEvents) {
                var err = dataAndEvents.evalExp();
                if (err.errno == 0) {
                    /** @type {boolean} */
                    o = false;
                    fn(a[i]);
                    i += 1;
                    if (i < len) {
                        run();
                    } else {
                        setTimeout(function() {
                            yunpn.tip.QuickTip.hide();
                        }, 300);
                        yunpn.filelist.list();
                        /** @type {boolean} */
                        yunpn.ytree.isFolderChanged = true;
                        /** @type {boolean} */
                        yunpn.ytreeSfile.isFolderChanged = true;
                        /** @type {boolean} */
                        yunpn.ytreeSfileTofile.isFolderChanged = true;
                        /** @type {number} */
                        i = 0;
                    }
                } else {
                    if (err.errno == 31203) {
                        $.alert("\u60a8\u8fd8\u6ca1\u6709\u5f00\u542f\u6587\u4ef6\u4fdd\u9669\u7bb1\uff0c\u8bf7\u79fb\u6b65\u5f00\u542f", {
                            /**
                             * @return {undefined}
                             */
                            fn : function() {
                                /** @type {string} */
                                yunpn.filelist.curFunc = "sFile";
                                yunpn.cmdCenter.updateNav();
                                yunpn.filelist.list();
                            }
                        });
                    } else {
                        $.alert(err.errmsg, {
                            type : "error"
                        });
                    }
                    setTimeout(function() {
                        yunpn.tip.QuickTip.hide();
                    }, 300);
                }
            });
        };
        run();
    }
    /**
     * @return {?}
     */
    function postLink() {
        monitor.btnLog("Upload");
        if (!addClass()) {
            return false;
        }
        var supportPlugin = yunpn.upload.detectCapability();
        if (!supportPlugin.supportPlugin && (!supportPlugin.supportAjax && !supportPlugin.supportFlash)) {
            $.alert('\u60a8\u8fd8\u6ca1\u6709\u5b89\u88c5flash\u64ad\u653e\u5668\uff0c\u8bf7\u70b9\u51fb<a href="http://www.adobe.com/go/getflash" target="_blank">\u8fd9\u91cc</a>\u5b89\u88c5', {
                type : "warning"
            });
            return;
        }
        /** @type {string} */
        var x = ['<p><i class="icon icon-warning"></i>\u4e25\u7981\u5229\u7528360\u4e91\u76d8\u5b58\u50a8\u3001\u4e0b\u8f7d\u3001\u4f20\u64ad\u66b4\u529b\u6050\u6016\u97f3\u89c6\u9891\uff0c\u4ee5\u53ca\u5176\u4ed6\u4efb\u4f55\u975e\u6cd5\u3001\u6709\u5bb3\u4fe1\u606f\uff0c\u4e00\u7ecf\u53d1\u73b0\u5c06\u4e25\u683c\u6309\u7167\u76f8\u5173\u6cd5\u5f8b\u6cd5\u89c4\u5904\u7406\u3002</p>', '<p style="direction:rtl;">360 \u062a\u0648\u0631 \u062f\u0649\u0633\u0643\u0649\u0633\u0649\u062f\u0627 \u0632\u0648\u0631\u0627\u06cb\u0627\u0646\u0644\u0649\u0642\u060c\u062a\u06d0\u0631\u0631\u0648\u0631\u0644\u06c7\u0642\u0642\u0627 \u0626\u0627\u0626\u0649\u062a \u0626\u06c8\u0646-\u0633\u0649\u0646 \u067e\u0631\u0648\u06af\u0631\u0627\u0645\u0645\u0649\u0633\u0649\u0646\u0649 \u06cb\u06d5 \u0628\u0627\u0634\u0642\u0627 \u0642\u0627\u0646\u06c7\u0646\u0633\u0649\u0632\u060c\u0632\u0649\u064a\u0627\u0646\u0644\u0649\u0642  \u062e\u06d5\u06cb\u06d5\u0631\u0644\u06d5\u0631\u0646\u0649 \u0633\u0627\u0642\u0644\u0649\u062a\u0649\u0634\u0646\u0649\u060c\u0686\u06c8\u0634\u06c8\u0631\u06c8\u0633\u0646\u0649\u060c\u062a\u0627\u0631\u0642\u0649\u062a\u0649\u0634\u0646\u0649 \u0642\u06d5\u062a\u0626\u0649\u064a \u0645\u06d5\u0646\u0626\u0649 \u0642\u0649\u0644\u0649\u0646\u0649\u062f\u06c7\u060c\u0626\u06d5\u06af\u06d5\u0631 \u0628\u0627\u0634\u0642\u06c7\u0631\u063a\u06c7\u0686\u0649\u0644\u0627\u0631 \u0628\u0627\u064a\u0642\u0627\u0644\u0633\u0627 \u0645\u06c7\u0646\u0627\u0633\u0649\u06cb\u06d5\u062a\u0644\u0649\u0643 \u0642\u0627\u0646\u06c7\u0646 \u0628\u0648\u064a\u0649\u0686\u06d5 \u0642\u0627\u062a\u062a\u0649\u0642 \u0628\u0649\u0631 \u062a\u06d5\u0631\u06d5\u067e \u0642\u0649\u0644\u0649\u062f\u06c7.</p>',
            '<p style="direction:rtl;">\u0645\u0646 \u0627\u0644\u0645\u0645\u0646\u0648\u0639 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0642\u0631\u0635 \u0633\u062d\u0627\u0628\u0629 360 \u0644\u062a\u062e\u0632\u064a\u0646 \u0623\u0648 \u062a\u0646\u0632\u064a\u0644 \u0623\u0648 \u0646\u0634\u0631 \u0641\u064a\u062f\u064a\u0648 \u0648\u0635\u0648\u062a \u0627\u0644\u0625\u0631\u0647\u0627\u0628\u064a\u0629 \u0648\u063a\u064a\u0631\u0647\u0645\u0627 \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0636\u0627\u0631\u0629 \u0648\u063a\u064a\u0631 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0629\u060c \u0625\u0630\u0627 \u0627\u0646\u0643\u0634\u0641\u062a \u0627\u0644\u0633\u0644\u0648\u0643 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u0639\u0644\u0627\u0647\u0627\u060c \u0633\u0646\u062a\u0639\u0627\u0645\u0644 \u0645\u0639\u0647\u0627 \u0648\u0641\u0642\u0627 \u0644\u0644\u0642\u0627\u0646\u0648\u0646 \u0628\u0634\u0643\u0644 \u062c\u062f\u064a.</p>',
            "<p>Storing, downloading and sharing violate, horrific and illegal media contents on 360 Cloud is strictly prohibited.  Once discovered, necessary actions, under the supervision of related laws and regulations, will be taken accordingly.</p>"].join("");
        require([rPathConfig.tooltip], function(UndoRedoMenuItem) {
            yunpn.cmdCenter.showUpload();
            (new UndoRedoMenuItem({
                cssSkin : "H_tooltipyellow upload-warning-tooltip",
                elNode : $("#uploadPanel .warning-note a"),
                container : "#uploadPanel .warning-note",
                adjustPos : {
                    top : 10,
                    left : 0,
                    triangle : "triangle_lt"
                },
                title : x
            })).hover();
        });
    }
    /**
     * @return {?}
     */
    function toggleClass() {
        if (!addClass()) {
            return false;
        }
        try {
            monitor.btnLog("Newfolder");
            yunpn.fo.createFolder();
        } catch (e) {
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function start(obj) {
        var $el;
        if (obj) {
            /** @type {Array} */
            $el = [obj];
        } else {
            $el = attr();
        }
        if (!$el || $el.length > 1) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        var el = $el[0];
        var type = el.attr("data-type");
        var title = el.attr("data-title");
        var recurring = el.attr("data-nid");
        var rvar = el.attr("data-path");
        var substring = el.attr("data-preview");
        if (type == "folder") {
            yunpn.filelist.nav.push({
                title : title,
                nid : recurring,
                path : rvar
            });
            yunpn.cmdCenter.gotoPath(rvar, recurring, null, null, true, yunpn.filelist.curFunc);
        } else {
            var key = el.attr("data-file-suffix");
            var child = yunpn.docviewer.checkPreview(key, el.attr("data-ori-size"));
            /** @type {boolean} */
            var isPercent = substring != "" ? true : false;
            var camelKey = yunpn.video.isVideo(key);
            var encodedKey = yunpn.video.isPlayBySe(key);
            var top = yunpn.mc.isMusic(key);
            /** @type {boolean} */
            var value = yunpn.filelist.curFunc == "file" || yunpn.filelist.curFunc == "sFile";
            if (value && isPercent) {
                var elem = {};
                var xmlNode;
                var data_fhash;
                var data_scid;
                var codeSegments;
                var attrName = yunpn.filelist.curFunc;
                if (attrName === "link") {
                    /** @type {boolean} */
                    elem.noDel = true;
                    /** @type {string} */
                    elem.pos = "link";
                } else {
                    /** @type {boolean} */
                    elem.noDel = false;
                    /** @type {string} */
                    elem.pos = "my";
                }
                xmlNode = W("#list .preview");
                data_fhash = xmlNode.getAttrAll("data-fhash");
                data_scid = xmlNode.getAttrAll("data-scid");
                codeSegments = xmlNode.getAttrAll("data-ori-size");
                elem.nid = xmlNode.getAttrAll("data-nid");
                elem.name = xmlNode.getAttrAll("data-title");
                elem.pic = xmlNode.getAttrAll("data-pic");
                elem.preview = xmlNode.getAttrAll("data-preview");
                /** @type {Array} */
                var configList = [];
                var ln;
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    if (codeSegments[i] >= 20971520) {
                        configList.push(i);
                    }
                }
                /** @type {number} */
                ln = configList.length;
                var container = el.getAttr("data-nid");
                /** @type {number} */
                var fix = 0;
                for (;fix < xmlNode.length;fix++) {
                    var transform = xmlNode.item(fix);
                    var element = transform.getAttr("data-nid");
                    if (element === container) {
                        /** @type {number} */
                        elem.index = fix;
                        break;
                    }
                }
                if (ln > 0) {
                    /** @type {number} */
                    i = 0;
                    for (;i < ln;i++) {
                        /** @type {string} */
                        elem.preview[configList[i]] = "/resource/img/gallary/gallary-20M.png";
                        /** @type {string} */
                        elem.pic[configList[i]] = "/resource/img/gallary/gallary-20M.png";
                    }
                }
                yunpn.gallary.show(elem);
                monitor.clickLog("gallary\u6253\u5f00");
            } else {
                if (value && child.isDoc) {
                    if (child.isOversize) {
                        monitor.yplog(902, {
                            qid : SYS_CONF.qid
                        });
                        $.alert("\u8fd9\u4e2a\u6587\u6863\u592a\u5927\uff0c\u6682\u4e0d\u652f\u6301\u9884\u89c8\uff01");
                    } else {
                        parse();
                    }
                } else {
                    if (value && camelKey) {
                        if (!/^win/i.test(Browser.platform) && !yunpn.video.isPlayByFlash(key)) {
                            yunpn.cmdCenter.downloadItem();
                            return;
                        }
                        /** @type {number} */
                        type = 1;
                        if (yunpn.filelist.curFunc == "sFile") {
                            /** @type {number} */
                            type = 2;
                        }
                        if (encodedKey) {
                            yunpn.video.play({
                                player : "se",
                                nid : recurring,
                                type : type
                            });
                        } else {
                            yunpn.video.play({
                                play : "none_se",
                                nid : recurring,
                                type : type
                            });
                        }
                    } else {
                        if (value && top) {
                            if (yunpn.util.getSwfVersion() < 9 && $.Browser.ie) {
                                $.alert("\u62b1\u6b49!&nbsp;\u8bf7\u5347\u7ea7Flash\u5230\u6700\u65b0\u7248\u672c\uff0c\u624d\u80fd\u8fdb\u884c\u97f3\u4e50\u64ad\u653e", {
                                    type : "warning"
                                });
                                return;
                            }
                            if (!musicQuickTip) {
                                yunpn.tip.QuickTip.init({
                                    container : W("#mainPanel"),
                                    cls : "batchRequestTip",
                                    close : true,
                                    closeIcon : false
                                });
                                /** @type {boolean} */
                                musicQuickTip = true;
                            }
                            yunpn.tip.QuickTip.show("\u6b63\u5728\u52a0\u8f7d\u4e2d\u2026", "loading");
                            require([rPathConfig.appMusicPlayer], function($) {
                                Ajax.post(yunpn.config.url.getMusicUrl, {
                                    nid : recurring
                                }, function(dataAndEvents) {
                                    yunpn.tip.QuickTip.hide();
                                    var options = dataAndEvents.evalExp();
                                    if (options.errno == 0) {
                                        $.addSong({
                                            id : recurring,
                                            suffix : key,
                                            size : options.data.filesize,
                                            name : options.data.filename,
                                            url : options.data.audio_url
                                        });
                                    }
                                });
                            });
                        } else {
                            if (yunpn.filelist.curFunc == "file" && (key == "torrent" && SYS_CONF.validBtUser)) {
                                var rreturn = el.attr("data-path");
                                require([rPathConfig.offdl], function(ret) {
                                    ret.showSeedInfo(rreturn);
                                });
                            } else {
                                yunpn.cmdCenter.downloadItem();
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function Waterfall() {
        var e = yunpn.fo.getSelectFile();
        var nodes = W(e[0]);
        yunpn.filehistory.fileHistoryList(nodes.attr("data-nid"));
    }
    /**
     * @param {string} opt
     * @return {undefined}
     */
    function buildUrl(opt) {
        if (opt && opt.length > 0) {
            var codeSegments = yunpn.fo.getAllFile();
            /** @type {number} */
            var i = 0;
            var valuesLen = codeSegments.length;
            for (;i < valuesLen;i++) {
                if (codeSegments[i].attr("data-type") == "folder") {
                    var items = codeSegments[i].attr("data-path").split("/");
                    items = items[items.length - 2];
                    if (items == opt) {
                        yunpn.fo.selectFile(codeSegments[i]);
                        codeSegments[i][0].scrollIntoView(false);
                        break;
                    }
                }
            }
        }
    }
    /**
     * @param {Object} name
     * @param {?} recurring
     * @param {Object} opt
     * @param {string} mayParseLabeledStatementInstead
     * @param {boolean} v33
     * @param {string} event
     * @return {undefined}
     */
    function onData(name, recurring, opt, mayParseLabeledStatementInstead, v33, event) {
        if ("recycle-bin" == name) {
            this.gotoRecycleBin();
        } else {
            if (event) {
                if (event != "sFile") {
                    /** @type {string} */
                    yunpn.filelist.curFunc = "file";
                }
            }
            var p = yunpn.filelist.path;
            if (name && (p == "recycle-bin" || p != name)) {
                /** @type {Object} */
                yunpn.filelist.path = name;
                if (yunpn.filelist.curFunc == "sFile") {
                    /** @type {string} */
                    var path = "sFile" + name
                } else {
                    /** @type {Object} */
                    path = name;
                }
                HistoryManager.add(encodeURIComponent(path));
            }
            if (name && yunpn.filelist.curFunc == "sFile") {
                /** @type {string} */
                path = "sFile" + name;
                HistoryManager.add(encodeURIComponent(path));
            }
            if (event == "file") {
                /** @type {Object} */
                path = name;
                HistoryManager.add(encodeURIComponent(path));
            }
            /** @type {null} */
            var restoreScript = null;
            /** @type {null} */
            var udataCur = null;
            if (opt || mayParseLabeledStatementInstead) {
                /** @type {number} */
                udataCur = 0;
            }
            if (opt) {
                /**
                 * @return {undefined}
                 */
                restoreScript = function() {
                    if (mayParseLabeledStatementInstead == "back") {
                        yunpn.filelist.nav.pop();
                    }
                    buildUrl(opt);
                    yunpn.cmdCenter.updateStatus();
                };
            }
            yunpn.filelist.nid = recurring;
            yunpn.filelist.list(null, recurring, udataCur, restoreScript);
        }
    }
    /**
     * @param {Object} win
     * @return {undefined}
     */
    function show(win) {
        yunpn.fo.changeListType();
        var _link = yunpn.filelist;
        /** @type {number} */
        var pdataOld = win.hasClass("text") ? 1 : 2;
        if (pdataOld == 2) {
            monitor.btnLog("Iconview");
        } else {
            monitor.btnLog("Listview");
        }
        var list = W("#list");
        var loading = W("#fileListHead");
        var fileListMain = W("#fileListMain");
        var listHolder = W("#listHolder");
        var cnl = list.query("li").length;
        if (cnl > 0) {
            if (cnl > 300 && pdataOld == 1) {
                yunpn.filelist.list();
            } else {
                if (pdataOld == 1) {
                    list.addClass("list-list");
                    list.removeClass("ico-list");
                    loading.show();
                    if (yunpn.filelist.curFunc == "link") {
                        list.query(".p-columnHit").show();
                        list.query(".p-columnCode").css("visibility", "visible");
                    }
                } else {
                    list.addClass("ico-list");
                    list.removeClass("list-list");
                    loading.hide();
                    if (yunpn.filelist.curFunc == "link") {
                        list.query(".p-columnHit").hide();
                        list.query(".p-columnCode").css("visibility", "hidden");
                    }
                }
            }
        } else {
            loading.hide();
        }
        yunpn.filelist.resizeHolder();
        if (_link.curFunc == "link") {
            /** @type {number} */
            _link.shareListtype = pdataOld;
        } else {
            yunpn.Storage.set("yunpn_LISTTYPE", pdataOld);
            /** @type {number} */
            _link.listtype = pdataOld;
        }
        yunpn.cmdCenter.updateStatus();
        yunpn.fo.setDisplayType(pdataOld);
    }
    /**
     * @param {(Object|string)} pdataOld
     * @param {string} callback
     * @return {undefined}
     */
    function request(pdataOld, callback) {
        var item = yunpn.filelist;
        var element = item.order_field;
        var value = item.order;
        /** @type {string} */
        var udataCur = "asc";
        var options;
        if (item.curFunc == "recycle") {
            value = item.order_recycle;
            element = item.order_field_recycle;
        }
        if (item.curFunc == "link") {
            value = item.order_link;
            element = item.order_field_link;
        }
        if (item.specialFolder[item.path.toLowerCase()]) {
            options = item.specialFolder[item.path.toLowerCase()];
            element = options.field;
            value = options.order || "desc";
        }
        if (callback) {
            /** @type {string} */
            udataCur = callback;
        } else {
            if (element == pdataOld) {
                /** @type {string} */
                udataCur = value == "asc" ? "desc" : "asc";
            } else {
                if (pdataOld == "mtime") {
                    /** @type {string} */
                    udataCur = "desc";
                }
            }
        }
        if (item.curFunc == "recycle") {
            /** @type {string} */
            item.order_recycle = udataCur;
            /** @type {(Object|string)} */
            item.order_field_recycle = pdataOld;
            yunpn.Storage.set("ORDER_RECYCLE", udataCur);
            yunpn.Storage.set("ORDER_FIELD_RECYCLE", pdataOld);
        } else {
            if (item.curFunc == "link") {
                /** @type {string} */
                item.order_link = udataCur;
                /** @type {(Object|string)} */
                item.order_field_link = pdataOld;
                yunpn.Storage.set("ORDER_LINK", udataCur);
                yunpn.Storage.set("ORDER_FIELD_LINK", pdataOld);
            } else {
                if (options) {
                    /** @type {(Object|string)} */
                    options.field = pdataOld;
                    /** @type {string} */
                    options.order = udataCur;
                } else {
                    /** @type {string} */
                    item.order = udataCur;
                    /** @type {(Object|string)} */
                    item.order_field = pdataOld;
                    yunpn.Storage.set("ORDER_NORMAL", udataCur);
                    yunpn.Storage.set("ORDER_FIELD_NORMAL", pdataOld);
                }
            }
        }
        item.list();
    }
    /**
     * @return {undefined}
     */
    function callback() {
        /** @type {string} */
        yunpn.filelist.path = "recycle-bin";
        /** @type {string} */
        yunpn.filelist.curFunc = "recycle";
        var his_nid = location.search.substr("1").queryUrl();
        if (his_nid.his_nid) {
            /** @type {string} */
            location.href = "/my/index#recycleBin";
        } else {
            HistoryManager.add("recycleBin");
        }
        yunpn.filelist.list();
    }
    /**
     * @return {undefined}
     */
    function fn() {
        /** @type {string} */
        yunpn.filelist.path = "link";
        /** @type {string} */
        yunpn.filelist.curFunc = "link";
        var his_nid = location.search.substr("1").queryUrl();
        if (his_nid.his_nid) {
            /** @type {string} */
            location.href = "/my/index#link";
        } else {
            HistoryManager.add("link");
        }
        yunpn.filelist.list();
    }
    /**
     * @return {undefined}
     */
    function urlParse() {
        /** @type {string} */
        yunpn.filelist.path = "/";
        /** @type {number} */
        yunpn.filelist.nid = 0;
        /** @type {number} */
        yunpn.filelist.page = 0;
        /** @type {string} */
        yunpn.filelist.curFunc = "sFile";
        var his_nid = location.search.substr("1").queryUrl();
        if (his_nid.his_nid) {
            /** @type {string} */
            location.href = "/my/index#sFile";
        } else {
            HistoryManager.add("sFile");
        }
        yunpn.filelist.list();
    }
    /**
     * @return {undefined}
     */
    function parseUri() {
        /** @type {string} */
        yunpn.filelist.path = "/";
        /** @type {string} */
        yunpn.filelist.curFunc = "file";
        yunpn.filelist.list();
    }
    /**
     * @return {?}
     */
    function activate() {
        if (yunpn.filelist.curFunc != "recycle") {
            return;
        }
        var assertions = attr();
        if (!assertions) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        $.confirm("\u786e\u5b9a\u8981\u8fd8\u539f\u8fd9<em>" + assertions.length + "</em>\u9879\uff08\u540c\u540d\u6587\u4ef6\u5c06\u81ea\u52a8\u91cd\u547d\u540d\uff09\uff1f", {
            title : "\u8fd8\u539f",
            type : "warning",
            width : 300,
            textwidth : 165,
            /**
             * @param {string} button
             * @return {undefined}
             */
            fn : function(button) {
                if (button != "yes") {
                    return;
                }
                /** @type {Array} */
                var products = [];
                assertions.forEach(function($slide) {
                    products.push($slide.attr("data-nid"));
                });
                yunpn.BatchRequest.create({
                    url : "/file/recover",
                    batchParam : "nid[]",
                    data : products,
                    /**
                     * @param {string} _xhr
                     * @return {undefined}
                     */
                    batchSuccess : function(_xhr) {
                        /** @type {*} */
                        var err = eval("(" + _xhr + ")");
                        if (err.errno != 0) {
                            yunpn.BatchRequest.terminate();
                            yunpn.tips.hide();
                            $.alert(err.errmsg, {
                                type : "error"
                            });
                            yunpn.userInfo.updateDiskInfo();
                            yunpn.filelist.list();
                        }
                    },
                    /**
                     * @return {undefined}
                     */
                    success : function() {
                        yunpn.tips.show("\u8fd8\u539f\u6587\u4ef6\u6210\u529f\uff01");
                        var octalLiteral = yunpn.filelist.data_page;
                        try {
                            assertions.forEach(function(element) {
                                element.removeNode();
                            });
                        } catch (t) {
                        }
                        yunpn.fo.initFileIndex();
                        yunpn.userInfo.updateDiskInfo();
                        if (octalLiteral) {
                            /** @type {number} */
                            var num2 = parseInt(octalLiteral[1], 10);
                            if (yunpn.fo.getFileNum() > 0) {
                                yunpn.filelist.list();
                            } else {
                                if (!isNaN(num2) && num2 >= 0) {
                                    yunpn.filelist.list();
                                } else {
                                    yunpn.filelist.list("recycleBin", 0);
                                }
                            }
                        } else {
                            if (yunpn.fo.getFileNum() <= 0) {
                                yunpn.filelist.list();
                            }
                        }
                        yunpn.cmdCenter.updateStatus();
                    }
                });
            }
        });
    }
    /**
     * @return {?}
     */
    function move() {
        if (yunpn.filelist.curFunc != "recycle") {
            return;
        }
        var asserterNames = attr();
        if (!asserterNames) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        $.confirm('<span style="color:red;">\u5728\u56de\u6536\u7ad9\u4e2d\u88ab\u5220\u9664\u7684\u6587\u4ef6\u5c06\u65e0\u6cd5\u518d\u6062\u590d\uff0c\u8bf7\u614e\u91cd\u8003\u8651\uff01</span><br /><br />\u786e\u8ba4\u8981\u5220\u9664\u8fd9\u4e9b\u6587\u4ef6\u5417\uff1f', {
            title : "\u786e\u8ba4\u6c38\u4e45\u5220\u9664",
            type : "warning",
            textwidth : 300,
            textheight : 90,
            btnOkText : "\u5220\u9664",
            /**
             * @param {string} button
             * @return {undefined}
             */
            fn : function(button) {
                if (button != "yes") {
                    return;
                }
                /** @type {Array} */
                var products = [];
                asserterNames.forEach(function($slide) {
                    products.push($slide.attr("data-nid"));
                });
                yunpn.BatchRequest.create({
                    url : "/file/deletefilesinrecycle",
                    batchParam : "nid[]",
                    data : products,
                    /**
                     * @param {string} _xhr
                     * @return {undefined}
                     */
                    batchSuccess : function(_xhr) {
                        /** @type {*} */
                        var err = eval("(" + _xhr + ")");
                        if (err.errno != 0) {
                            yunpn.tips.hide();
                            $.alert(err.errmsg, {
                                type : "error"
                            });
                        }
                    },
                    /**
                     * @return {undefined}
                     */
                    success : function() {
                        yunpn.tips.show("\u5220\u9664\u6210\u529f");
                        var octalLiteral = yunpn.filelist.data_page;
                        yunpn.tips.show("\u5220\u9664\u6210\u529f");
                        try {
                            asserterNames.forEach(function(element) {
                                element.removeNode();
                            });
                        } catch (t) {
                        }
                        yunpn.fo.initFileIndex();
                        yunpn.userInfo.updateDiskInfo();
                        if (octalLiteral) {
                            /** @type {number} */
                            var num2 = parseInt(octalLiteral[1], 10);
                            if (yunpn.fo.getFileNum() > 0) {
                                yunpn.filelist.list();
                            } else {
                                if (!isNaN(num2) && num2 >= 0) {
                                    yunpn.filelist.list();
                                } else {
                                    yunpn.filelist.list("recycleBin", 0);
                                }
                            }
                        } else {
                            if (yunpn.fo.getFileNum() <= 0) {
                                yunpn.filelist.list();
                            }
                        }
                        yunpn.cmdCenter.updateStatus();
                    }
                });
            }
        });
    }
    /**
     * @return {?}
     */
    function click() {
        if (yunpn.filelist.curFunc != "recycle") {
            return;
        }
        var clear = operation();
        if (!clear) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        $.confirm('\u6e05\u7a7a\u56de\u6536\u7ad9\u540e\uff0c<span style="color:red;">\u6240\u6709\u5df2\u5220\u9664\u7684\u6587\u4ef6\u65e0\u6cd5\u518d\u6062\u590d\uff0c\u8bf7\u614e\u91cd\u8003\u8651\uff01</span><br /><br />\u786e\u8ba4\u8981\u6e05\u7a7a\u56de\u6536\u7ad9\uff1f', {
            title : "\u786e\u8ba4\u6e05\u7a7a",
            type : "warning",
            textwidth : 300,
            textheight : 90,
            btnOkText : "\u6e05\u7a7a\u56de\u6536\u7ad9",
            /**
             * @param {string} button
             * @return {undefined}
             */
            fn : function(button) {
                if (button != "yes") {
                    return;
                }
                Ajax.post("/file/cleanrecycle", function(dataAndEvents) {
                    /** @type {*} */
                    var err = eval("(" + dataAndEvents + ")");
                    if (err.errno == 0) {
                        yunpn.tips.show("\u6e05\u7a7a\u56de\u6536\u7ad9\u6210\u529f\uff01");
                        yunpn.userInfo.updateDiskInfo();
                        yunpn.filelist.list();
                    } else {
                        yunpn.tips.hide();
                        $.alert(err.errmsg, {
                            type : "error"
                        });
                    }
                });
            }
        });
    }
    /**
     * @return {?}
     */
    function save() {
        var head = attr();
        /** @type {Array} */
        var sorted = [];
        if (!head) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        monitor.btnLog("Share");
        head.forEach(function(image) {
            sorted.push({
                path : image.attr("data-path")
            });
        });
        require([rPathConfig.share], function(OAuth) {
            OAuth.share(sorted, function(err) {
                if (err.errno) {
                    return;
                }
                head.map(function(cfg) {
                    if (cfg.query(".link-logo").length <= 0) {
                        W('<span class="link-logo"></span>').insertTo("beforeend", cfg.query(".ico"));
                        cfg.attr("data-link", "true");
                    }
                });
            });
        });
    }
    /**
     * @param {string} r
     * @param {number} x
     * @param {number} c
     * @return {?}
     */
    function template(r, x, c) {
        var index = x + c;
        return r.length <= index ? r : r.substr(0, x) + "\u2026" + r.substr(r.length - c, c);
    }
    /**
     * @param {?} rows
     * @param {Object} opts
     * @return {undefined}
     */
    function render(rows, opts) {
        /** @type {string} */
        var w = "\u5206\u4eab";
        /** @type {string} */
        var utils = "\u6211\u7528{$at} {$word}\u4e86 {$file} \uff0c{$password}\uff0c \u70b9\u51fb\u67e5\u770b\u3002{$link}";
        var viewItems = {
            kaixin : "http://www.jiathis.com/send/",
            douban : "http://www.douban.com/share/service",
            renren : "http://widget.renren.com/dialog/share",
            qzone : "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
            tencent : "http://v.t.qq.com/share/share.php",
            sina : "http://service.t.sina.com.cn/share/share.php"
        };
        var tokenized = {
            kaixin : 314,
            douban : 312,
            renren : 310,
            qzone : 308,
            tencent : 306,
            sina : 304
        };
        var file = template(opts.basename, 10, 30);
        var url = opts.url;
        /** @type {string} */
        var hash = opts.password ? " \u63d0\u53d6\u7801\uff1a" + opts.password : "";
        var options = {
            kaixin : {
                webid : "kaixin001",
                url : encodeURIComponent(url + "?sid=314"),
                title : encodeURIComponent(utils.tmpl({
                    at : "360\u4e91\u76d8",
                    word : w,
                    file : file,
                    password : hash
                }))
            },
            douban : {
                text : encodeURIComponent(utils.tmpl({
                    at : "360\u4e91\u76d8",
                    word : w,
                    file : file,
                    password : hash
                })),
                title : encodeURIComponent(url + "?sid=312"),
                href : encodeURIComponent(url + "?sid=312")
            },
            renren : {
                resourceUrl : encodeURIComponent(url + "?sid=310"),
                srcUrl : encodeURIComponent(url + "?sid=310"),
                title : encodeURIComponent(utils.tmpl({
                    at : "360\u4e91\u76d8",
                    word : w,
                    file : file,
                    password : hash
                })),
                description : " ",
                pic : " "
            },
            qzone : {
                url : encodeURIComponent(url + "?sid=308"),
                summary : encodeURIComponent(utils.tmpl({
                    at : "360\u4e91\u76d8",
                    word : w,
                    file : file,
                    password : hash
                })),
                title : "\u4e91\u76d8\u5206\u4eab"
            },
            tencent : {
                title : encodeURIComponent(utils.tmpl({
                    at : "@i360yunpn ",
                    word : w,
                    file : file,
                    password : hash
                })),
                url : url + "?sid=306"
            },
            sina : {
                title : encodeURIComponent(("#\u7231\u4e91\u76d8\u7231\u5206\u4eab#" + utils).tmpl({
                    at : "@360\u4e91\u76d8 ",
                    word : w,
                    file : file,
                    link : "\n" + url + "?sid=304",
                    password : hash
                })),
                appkey : "4060160539",
                content : "utf8"
            }
        };
        if (opts.preview) {
            /** @type {string} */
            var pic = encodeURIComponent(opts.preview);
            /** @type {string} */
            options.sina.pic = pic;
            /** @type {string} */
            options.tencent.pic = pic;
        }
        W("#newLinkDia .share_to_sns a").forEach(function($rootScope) {
            var element = W($rootScope);
            var index = element.attr("className");
            if (!viewItems[index]) {
                return;
            }
            var item = viewItems[index];
            var query = options[index];
            /** @type {Array} */
            var tagNameArr = [];
            var part;
            for (part in query) {
                tagNameArr.push(part + "=" + query[part]);
            }
            item += "?";
            item += tagNameArr.join("&");
            if (index == "sina") {
                element.attr("data-content", options.sina.title);
            } else {
                element.attr("href", item);
            }
            element.click(function() {
                monitor.yplog(tokenized[index], {
                    surl : opts.shorturl
                });
            });
        });
    }
    /**
     * @return {?}
     */
    function update() {
        if (yunpn.filelist.curFunc == "recycle") {
            return;
        }
        var values = attr();
        if (!values) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        var restoreScript = values.map(function($slide) {
            return parseInt($slide.attr("f-index"));
        });
        var protocol = yunpn.filelist.curFunc;
        var r;
        var url;
        /** @type {Array} */
        var params = [];
        if (yunpn.filelist.curFunc == "link") {
            params = values.map(function($slide) {
                return $slide.attr("data-shorturl");
            });
        } else {
            /** @type {number} */
            var i = 0;
            var valuesLen = values.length;
            for (;i < valuesLen;i++) {
                if (values[i].attr("data-link") == "true") {
                    params.push(values[i].attr("data-path"));
                }
            }
        }
        if (params.length <= 0) {
            return;
        }
        if (protocol === "file") {
            /** @type {string} */
            content = '<p class="msg">' + (params.length == 1 && values.length == 1 ? "\u60a8\u5c06\u53d6\u6d88\u8be5\u6587\u4ef6\u7684\u6240\u6709\u5916\u94fe\u5206\u4eab" : "\u60a8\u5c06\u53d6\u6d88\u6240\u9009\u6587\u4ef6\u7684\u6240\u6709\u5916\u94fe\u5206\u4eab") + '</p><p class="info">\u82e5\u9700\u53d6\u6d88\u5355\u6b21\u5206\u4eab\uff0c\u8bf7\u5230<a href="###" onclick="return yunpn.cmdCenter.gotoLinkFromFile()">\u5206\u4eab\u7684\u6587\u4ef6\u5939</a>\u4e2d\u64cd\u4f5c</p>';
            /** @type {string} */
            url = "/share/cancelLinkNode";
            /** @type {number} */
            var a = 300;
        } else {
            /** @type {string} */
            content = params.length > 1 ? "\u786e\u5b9a\u8981\u53d6\u6d88\u8fd9\u4e9b\u5206\u4eab\u5417\uff1f" : "\u786e\u5b9a\u8981\u53d6\u6d88\u6b64\u5206\u4eab\u5417\uff1f";
            /** @type {string} */
            url = "/share/cancelLink";
            /** @type {number} */
            a = 165;
        }
        yunpn.cmdCenter.msgInstance = $.confirm(content, {
            title : "\u786e\u8ba4\u53d6\u6d88\u5206\u4eab",
            type : "warning",
            /**
             * @param {string} button
             * @return {undefined}
             */
            fn : function(button) {
                if (button != "yes") {
                    return;
                }
                if (params.length === 1) {
                    Ajax.post(url, {
                        name : params[0],
                        shorturl : params[0]
                    }, function(dataAndEvents) {
                        var err = dataAndEvents.evalExp();
                        if (err.errno == 0) {
                            yunpn.tips.show("\u53d6\u6d88\u5206\u4eab\u6210\u529f");
                        } else {
                            yunpn.tips.hide();
                            $.alert(err.errmsg, {
                                type : "error"
                            });
                        }
                        if (protocol == "file") {
                            yunpn.filelist.list(null, null, null, restoreScript);
                        } else {
                            yunpn.filelist.list();
                        }
                    });
                } else {
                    yunpn.BatchRequest.create({
                        url : url,
                        batchParam : yunpn.filelist.curFunc == "link" ? "shorturl" : "name",
                        data : params,
                        size : 1,
                        /**
                         * @param {string} _xhr
                         * @return {undefined}
                         */
                        batchSuccess : function(_xhr) {
                            var err = _xhr.evalExp();
                            if (err.errno) {
                                /** @type {boolean} */
                                dumping_time = false;
                                yunpn.BatchRequest.terminate();
                                $.alert(err.errmsg, {
                                    type : "warning"
                                });
                            }
                        },
                        /**
                         * @return {undefined}
                         */
                        success : function() {
                            yunpn.tips.show("\u53d6\u6d88\u5206\u4eab\u6210\u529f");
                            if (protocol == "file") {
                                yunpn.filelist.list(null, null, null, restoreScript);
                            } else {
                                yunpn.filelist.list();
                            }
                        }
                    });
                }
            }
        });
    }
    /**
     * @return {?}
     */
    function done() {
        return yunpn.cmdCenter.msgInstance && (yunpn.cmdCenter.msgInstance.dialog("close"), yunpn.cmdCenter.msgInstance = null), W("#leftPanel .folders li").removeClass("current"), yunpn.cmdCenter.gotoLink(), yunpn.cmdCenter.updateNav(), false;
    }
    /**
     * @param {Text} url
     * @return {?}
     */
    function createNode(url) {
        if (yunpn.filelist.curFunc === "file") {
            return window.open("/my/index#link"), true;
        }
        if (!url || typeof url != "string") {
            var resultItems = attr();
            if (!resultItems || resultItems.length > 1) {
                return;
            }
            var result = resultItems[0];
            url = result.attr("data-url");
        }
        window.open(url);
        monitor.yplog(303);
    }
    /**
     * @param {(Object|string)} name
     * @param {?} idx
     * @param {Array} params
     * @param {?} obj
     * @return {undefined}
     */
    function _init(name, idx, params, obj) {
        try {
            if (name == "menu" && updateAll) {
                return;
            }
            if (name == "button" && sep) {
                return;
            }
            require([rPathConfig.Copy2Clipboard], function(encodeURIComponent) {
                encodeURIComponent(params[0], "/resource/module/pub/Copy2Clipboard/ZeroClipboard.swf", {
                    listeners : {
                        /**
                         * @return {?}
                         */
                        dataRequested : function() {
                            var resultItems = attr();
                            if (!resultItems || resultItems.length > 1) {
                                return;
                            }
                            var result = resultItems[0];
                            var dataUrl = result.attr("data-url");
                            return dataUrl;
                        },
                        /**
                         * @param {?} dataAndEvents
                         * @return {undefined}
                         */
                        aftercopy : function(dataAndEvents) {
                            if (dataAndEvents) {
                                yunpn.tips.show("\u94fe\u63a5\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f");
                            } else {
                                $.alert("\u62b1\u6b49\uff0c\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u91cc\u4e0d\u80fd\u81ea\u52a8\u590d\u5236\u5230\u526a\u8d34\u677f\uff0c\u8bf7\u5148\u5b89\u88c5flash\u3002", {
                                    type : "warning"
                                });
                            }
                        }
                    }
                });
            });
            if (name == "menu") {
                /** @type {boolean} */
                updateAll = true;
            }
            if (name == "button") {
                /** @type {boolean} */
                sep = true;
            }
        } catch (ex) {
            throw new Error("YP:zerocopy, init zerocopy. " + ex.message);
        }
    }
    /**
     * @param {?} selector
     * @param {?} self
     * @param {Object} obj
     * @return {?}
     */
    function bind(selector, self, obj) {
        var size = Dom.getDocRect();
        var styles = selector.getRect();
        var border = styles.width;
        var height = styles.height;
        var off = self.getRect();
        var width;
        var top;
        return obj ? (width = parseInt(obj.left), top = parseInt(obj.top), self.hasClass("row") ? (width + border > size.width && (width -= 105), top + obj.height + 1 >= size.height && (top += 30)) : (width = off.left - 20, top = off.top, top + height >= size.height && (top -= top + height - size.height))) : (width = 650, top = 60), [width, top];
    }
    /**
     * @param {?} clicked
     * @param {?} var_args
     * @param {Object} data
     * @return {?}
     */
    function create(clicked, var_args, data) {
        if (yunpn.filelist.curFunc == "recycle") {
            return;
        }
        var dependencies = attr();
        if (!dependencies) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        var self = dependencies[0];
        var dataUrl = self.attr("data-url");
        yunpn.cmdCenter.createPassword(1, dataUrl, function(fix) {
            self.attr("data-extract-status", "1");
            self.query(".pwd-off").addClass("pwd-on").removeClass("pwd-off");
            self.query(".code").html(self.attr("data-password"));
            yunpn.filelist.list(null, null, null, [self.attr("f-index")], true);
            if (fix && fix.length) {
                if (!list) {
                    list = yunpn.dialog.create({
                        body : '<div class="msg-panel"><div class="msg-text-box" id="enablePwd"><div class="msg-text msg-warning-tip">\u5df2\u542f\u7528\u63d0\u53d6\u7801\uff1a<span class="password"></span></div></div></div>',
                        withClose : true,
                        className : "panel-t2",
                        withMask : false,
                        buttons : [{
                            type : "blue",
                            text : "\u590d\u5236\u63d0\u53d6\u7801\u5e76\u5173\u95ed\u7a97\u53e3",
                            id : "copyBtn"
                        }]
                    });
                    target = W("#enablePwd").parentNode(".panel");
                    list.on("beforehide", function() {
                        bar.hide();
                    });
                    if (!bar) {
                        bar = W('<div class="transparent-mask"></div>').insertTo("afterbegin", document.body);
                        bar.on("click", function() {
                            try {
                                bar.hide();
                                list.hide();
                                _self.hide();
                            } catch (e) {
                            }
                        });
                    }
                    list.on("aftershow", function() {
                        bar.css("z-index", target.css("z-index") - 1).show();
                        var context = target.query("#copyBtn");
                        var t = context.parentNode(".panel-content");
                        var yearCont = target.query(".password");
                        if (!context.hasClass("clip-on")) {
                            require([rPathConfig.Copy2Clipboard], function(fn) {
                                fn(context[0], "/resource/module/pub/Copy2Clipboard/ZeroClipboard.swf", {
                                    listeners : {
                                        /**
                                         * @return {?}
                                         */
                                        dataRequested : function() {
                                            return yearCont.html();
                                        },
                                        /**
                                         * @param {?} dataAndEvents
                                         * @return {undefined}
                                         */
                                        aftercopy : function(dataAndEvents) {
                                            /** @type {boolean} */
                                            doShare = true;
                                            if (dataAndEvents) {
                                                yunpn.tips.show("\u63d0\u53d6\u7801\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f");
                                            } else {
                                                yunpn.tips.show("\u62b1\u6b49\uff0c\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u91cc\u4e0d\u80fd\u81ea\u52a8\u590d\u5236\u5230\u526a\u8d34\u677f\u3002\u8bf7\u4f7f\u7528CTRL+C\u6216\u9f20\u6807\u53f3\u952e\u83dc\u5355\u590d\u5236\u63d0\u53d6\u7801");
                                            }
                                            target.css("left", "-10000px");
                                            bar.hide();
                                        }
                                    }
                                });
                            });
                            context.addClass("clip-on");
                        }
                    });
                }
                target.query(".password").html(fix);
                var result = bind(target, self, data);
                list.show(result[0], result[1]);
            }
        });
    }
    /**
     * @param {?} clicked
     * @param {?} position
     * @param {Object} data
     * @return {?}
     */
    function Init(clicked, position, data) {
        if (yunpn.filelist.curFunc == "recycle") {
            return;
        }
        var dependencies = attr();
        if (!dependencies) {
            return;
        }
        if (!addClass()) {
            return false;
        }
        var self = dependencies[0];
        obj = self;
        var target = self.attr("data-url");
        deep = target;
        if (!_self) {
            _self = yunpn.dialog.create({
                className : "panel-t2",
                body : '<div class="msg-panel"><div class="msg-text-box" id="disablePwd"><div class="msg-text msg-warning-tip">\u53d6\u6d88\u8be5\u6587\u4ef6\u63d0\u53d6\u7801\uff1f</div></div></div>',
                withClose : false,
                buttons : [{
                    type : "blue",
                    text : "\u53d6\u6d88\u63d0\u53d6\u7801",
                    id : "disablePwdBtn"
                }, {
                    text : "\u6682\u4e0d\u53d6\u6d88",
                    /**
                     * @return {undefined}
                     */
                    handler : function() {
                        _self.hide();
                        bar.hide();
                    }
                }],
                withMask : false
            });
            el = W("#disablePwd").parentNode(".panel");
            el.query("#disablePwdBtn").on("click", function() {
                yunpn.cmdCenter.createPassword(0, deep, function() {
                    _self.hide();
                    bar.hide();
                    obj.attr("data-extract-status", "0");
                    obj.query(".pwd-on").addClass("pwd-off").removeClass("pwd-on");
                    obj.query(".code").html("-");
                    yunpn.filelist.list(null, null, null, [obj.attr("f-index")], true);
                    yunpn.tips.show("\u5df2\u53d6\u6d88\u63d0\u53d6\u7801");
                });
            });
            if (!bar) {
                bar = W('<div class="transparent-mask"></div>').insertTo("afterbegin", document.body);
                bar.on("click", function() {
                    try {
                        bar.hide();
                        _self.hide();
                        list.hide();
                    } catch (e) {
                    }
                });
            }
            _self.on("aftershow", function() {
                bar.css("z-index", el.css("z-index") - 1).show();
            });
        }
        var result = bind(el, self, data);
        _self.show(result[0], result[1]);
    }
    /**
     * @return {undefined}
     */
    function setup() {
        require([rPathConfig.authority], function(dataAndEvents) {
            Ajax.post("/authority/isSetPass", {}, function(dataAndEvents) {
                var e = dataAndEvents.evalExp();
                if (e.errno) {
                    Ajax.post("/authority/isAuthentication", {
                        qid : SYS_CONF.qid
                    }, function(deepDataAndEvents) {
                        var e = deepDataAndEvents.evalExp();
                        if (e.errno) {
                            dataAndEvents.createBindDia();
                        } else {
                            dataAndEvents.createOpenPassDia(true, "\u4e91\u76d8\u5b89\u5168\u5bc6\u7801\u8fd8\u672a\u8bbe\u7f6e\uff0c\u8bf7\u5148\u8bbe\u7f6e\u5b89\u5168\u5bc6\u7801\u624d\u80fd\u542f\u7528\u56de\u6536\u7ad9\u52a0\u5bc6\uff0c\u662f\u5426\u7acb\u5373\u8bbe\u7f6e\uff1f");
                        }
                    });
                } else {
                    Ajax.post("/authority/lockRecycleBin", {}, function(deepDataAndEvents) {
                        var err = deepDataAndEvents.evalExp();
                        if (err.errno) {
                            $.alert(err.errmsg, {
                                type : "error"
                            });
                        } else {
                            W("#tbOpenPassword").hide();
                            W("#tbOpenPasswordDone").show();
                            dataAndEvents.createRecycleOpenPassDia();
                            /** @type {number} */
                            yunpn.filelist.recycleState = 1;
                            yunpn.cmdCenter.updateNav();
                        }
                    });
                }
            });
        });
    }
    /**
     * @return {undefined}
     */
    function rethrow() {
        require([rPathConfig.authority], function(dataAndEvents) {
            dataAndEvents.createRecycleCloseDia();
        });
    }
    /**
     * @return {undefined}
     */
    function send() {
        Ajax.post("/authority/lockSafeBox", {}, function(dataAndEvents) {
            var err = dataAndEvents.evalExp();
            if (err.errno) {
                $.alert(err.errmsg, {
                    type : "error"
                });
            } else {
                yunpn.filelist.list();
            }
        });
    }
    /**
     * @return {undefined}
     */
    function module() {
        require([rPathConfig.offdl], function(dataAndEvents) {
            dataAndEvents.showManageDia();
        });
    }
    /**
     * @param {?} task
     * @return {undefined}
     */
    function build(task) {
        var tab = W(this);
        /** @type {number} */
        var i = parseInt(tab.attr("data-index"), 10);
        /** @type {string} */
        var path = "";
        /** @type {string} */
        var recurring = "";
        /** @type {string} */
        var opt = "";
        var numBytes = yunpn.filelist.nav.length;
        if (tab.hasClass("last-item")) {
            return;
        }
        /** @type {number} */
        yunpn.filelist.page = 0;
        if (i < numBytes - 1) {
            opt = yunpn.filelist.nav[i + 1].title;
        }
        yunpn.filelist.nav.splice(i + 1, numBytes - i - 1);
        if (i == -1) {
            /** @type {string} */
            path = "/";
            /** @type {string} */
            recurring = "0";
        } else {
            path = yunpn.filelist.nav[i].path;
            recurring = yunpn.filelist.nav[i].nid;
        }
        yunpn.cmdCenter.updateStatus();
        yunpn.cmdCenter.gotoPath(path, recurring, opt, false, false, yunpn.filelist.curFunc);
    }
    /**
     * @return {undefined}
     */
    function init() {
        yunpn.cmdCenter.initUpdate();
        dojo.delegate(".y-btn, .cmd", "click", function(config) {
            var win = W(this);
            var str = win.attr("data-cn");
            var that = yunpn.cmdCenter;
            if (!str || (win.hasClass("y-btn-disable") || win.hasClass("y-btn-back-disable"))) {
                return;
            }
            switch(str) {
                case "more":
                    break;
                case "upload":
                    that.uploadItem();
                    break;
                case "new":
                    that.newItem();
                    break;
                case "dl":
                    that.downloadItem();
                    break;
                case "pack-dl":
                    that.packDownloadItem();
                    break;
                case "del":
                    that.delItem();
                    break;
                case "link":
                    ;
                case "link-batch":
                    that.linkItem();
                    break;
                case "link-view":
                    that.viewLinkItem();
                    break;
                case "link-del":
                    that.delLinkItem();
                    break;
                case "text":
                    ;
                case "pic":
                    that.changeListType(win);
                    break;
                case "back":
                    build.call(this, config);
                    break;
                case "re":
                    if (yunpn.filelist.curFunc == "recycle") {
                        that.gotoRecycleBin();
                    } else {
                        that.gotoPath();
                    }
                    break;
                case "restore":
                    that.restoreItem();
                    break;
                case "diskdel":
                    that.diskdelItem();
                    break;
                case "clearall":
                    that.clearall();
                    break;
                case "delfav":
                    that.delFavItem();
                    break;
                case "refresh":
                    that.refresh();
                    break;
                case "extract-on":
                    that.enableExtractItem();
                    break;
                case "extract-off":
                    that.disableExtractItem();
                    break;
                case "openpass":
                    that.openpassInRecyclye();
                    break;
                case "openpassdone":
                    that.closepassInRecyle();
                    break;
                case "moveoutsfile":
                    that.moveOutSfile();
                    break;
                case "locksfile":
                    that.locksfile();
                    break;
                case "offline":
                    module();
            }
            config.preventDefault();
        });
        W("#crumb").delegate(".path-item, .back", "click", build);
        var tref;
        dojo.query(".sort h2").delegate("a", "mouseenter", function(dataAndEvents) {
            var tapElement = W(this);
            /** @type {number} */
            tref = setTimeout(function() {
                tapElement.parentNode(".sort").query("ul").show();
            }, 200);
        }).delegate("a", "mouseleave", function(dataAndEvents) {
            clearTimeout(tref);
        });
        dojo.query(".sort ul").on("mouseleave", function(dataAndEvents) {
            W(this).hide();
        });
        dojo.query(".sort ul a").on("click", function(types) {
            types.preventDefault();
            var field = W(this).attr("data-field");
            var restoreScript;
            if (field == W("#toolbar .sort h2 a").attr("data-field")) {
                if (W(this).hasClass("asc")) {
                    /** @type {string} */
                    restoreScript = "desc";
                } else {
                    /** @type {string} */
                    restoreScript = "asc";
                }
            } else {
                if (W(this).hasClass("asc")) {
                    /** @type {string} */
                    restoreScript = "asc";
                } else {
                    /** @type {string} */
                    restoreScript = "desc";
                }
            }
            yunpn.cmdCenter.changeListSort(W(this).attr("data-field"), restoreScript);
            W(this).parentNode("ul").hide();
        });
    }
    var dojo = W("#toolbar");
    var result = W("#list");
    /** @type {string} */
    var optsData = "";
    /**
     * @return {?}
     */
    var attr = function() {
        var errors = yunpn.fo.getSelectFile();
        return errors.length ? errors : false;
    };
    /**
     * @return {?}
     */
    var operation = function() {
        var errors = yunpn.fo.getAllFile();
        return errors.length ? errors : false;
    };
    /** @type {function (): ?} */
    var addClass = yunpn.isLogin;
    var loading;
    var visible_image;
    var timefloat;
    var musicQuickTip;
    /** @type {boolean} */
    var shareing = false;
    var updateAll;
    var sep;
    var extractWarningDia;
    var extractUrl;
    var extractType;
    var extractItem;
    var extractDiaBg;
    var list;
    var target;
    var bar;
    var _self;
    var el;
    var obj;
    var deep;
    return{
        /** @type {function (): undefined} */
        init : init,
        /** @type {function (): ?} */
        openDoc : parse,
        /** @type {function (): ?} */
        getSelItems : attr,
        /** @type {function (): ?} */
        getAllItems : operation,
        /** @type {function (Array): ?} */
        downloadItem : draw,
        /** @type {function (): ?} */
        packDownloadItem : next,
        /** @type {function (): ?} */
        delItem : handler,
        /** @type {function (): ?} */
        renameItem : select,
        /** @type {function (): ?} */
        moveItem : run,
        /** @type {function (): ?} */
        moveSfileItem : func,
        /** @type {function (): ?} */
        uploadItem : postLink,
        /** @type {function (): ?} */
        newItem : toggleClass,
        /** @type {function (?): ?} */
        openItem : start,
        /** @type {function (Object, ?, Object, string, boolean, string): undefined} */
        gotoPath : onData,
        /** @type {function (Object): undefined} */
        changeListType : show,
        /** @type {function ((Object|string), string): undefined} */
        changeListSort : request,
        /** @type {function (): undefined} */
        gotoLink : fn,
        /** @type {function (): undefined} */
        gotosFile : urlParse,
        /** @type {function (): undefined} */
        gotoFile : parseUri,
        /** @type {function (): undefined} */
        gotoRecycleBin : callback,
        /** @type {function (): ?} */
        restoreItem : activate,
        /** @type {function (): ?} */
        diskdelItem : move,
        /** @type {function (): ?} */
        clearall : click,
        /** @type {function (): ?} */
        linkItem : save,
        /** @type {function (): ?} */
        delLinkItem : update,
        /** @type {function (Text): ?} */
        viewLinkItem : createNode,
        /** @type {function ((Object|string), ?, Array, ?): undefined} */
        copyLinkInit : _init,
        /** @type {function (): undefined} */
        refresh : refresh,
        /** @type {function (): ?} */
        gotoLinkFromFile : done,
        /** @type {function (?, ?, Object): ?} */
        disableExtractItem : Init,
        /** @type {function (?, ?, Object): ?} */
        enableExtractItem : create,
        /** @type {function (?, Object): undefined} */
        init_share_href : render,
        /** @type {function (): undefined} */
        moveInSfile : access,
        /** @type {function (): ?} */
        moveOutSfile : open,
        /** @type {function (): undefined} */
        fileHistory : Waterfall,
        /** @type {function (): undefined} */
        openpassInRecyclye : setup,
        /** @type {function (): undefined} */
        closepassInRecyle : rethrow,
        /** @type {function (): undefined} */
        locksfile : send,
        /** @type {function (): undefined} */
        showOfflineDia : module
    };
}(), yunpn.cmdCenter = ObjectH.mix(yunpn.cmdCenter || {}, function() {
    /**
     * @return {undefined}
     */
    function init() {
        if (!css) {
            /** @type {(Function|null)} */
            var rand = arguments.callee;
            setTimeout(function() {
                rand();
            }, 100);
            return;
        }
        loading.hide();
        var link = yunpn.filelist;
        var conn = node.query(".display-mode");
        var o = link.curFunc == "link" ? link.shareListtype : link.listtype;
        conn.query("a").removeClass("text-cur").removeClass("pic-cur");
        if (o == 1) {
            conn.query(".text").addClass("text-cur");
        } else {
            conn.query(".pic").addClass("pic-cur");
        }
        switch(link.curFunc) {
            case "file":
                toggle();
                break;
            case "link":
                parse();
                break;
            case "recycle":
                fn();
                break;
            case "sFile":
                hide();
                break;
            default:
                ;
        }
    }
    /**
     * @param {string} data
     * @return {undefined}
     */
    function handle(data) {
        /** @type {string} */
        var s = "";
        if (yunpn.filelist.curFunc == "file") {
            /** @type {string} */
            s = "\u5168\u90e8\u6587\u4ef6";
        } else {
            /** @type {string} */
            s = "\u6587\u4ef6\u4fdd\u9669\u7bb1";
        }
        /** @type {string} */
        var inner = ' > "' + data + '"\u7684\u6587\u4ef6\u65f6\u5149\u673a<span>\uff08\u53ef\u6062\u590d90\u5929\u5185\u4efb\u610f\u5386\u53f2\u7248\u672c\uff09</span>';
        W("#crumb").html('<div class="his-crumb">' + s + inner + "</div>");
        overlay.hide();
        msg.hide();
        cfg.hide();
        activity.hide();
        btnsHistoryFileGroup.show();
        hisFilelist.show();
        timefloat.hide();
        sortGroup.hide();
        searchGroup.hide();
        show(".his-restore");
        show(".his-view");
        show(".his-dl");
    }
    /**
     * @return {undefined}
     */
    function hide() {
        build();
        content.removeClass("show");
        $next.removeClass("show");
        timefloat.show();
        overlay.hide();
        msg.hide();
        cfg.hide();
        btnsHistoryFileGroup.hide();
        activity.show();
        btnsUpLoad.replaceClass("icon-plugin-upload", "icon-upload");
        show(".refresh");
        show(".new");
        show(".upload");
        show(".locksfile");
        remove(".upload");
        remove(".new");
        var selects = jQuery();
        if (selects) {
            if (selects.length == 1) {
                show(".rename");
                var el = selects[0];
                var filename = el.attr("data-type");
                var data_files = el.attr("data-path");
                if (filename == "folder") {
                    show(".pack-dl");
                } else {
                    show(".dl");
                    show(".filehistory");
                    if (unbind(el.attr("data-file-suffix"), el.attr("data-ori-size"))) {
                        show(".opendoc");
                    }
                }
            } else {
                if (selects.length > 1) {
                    show(".pack-dl");
                }
            }
            show(".del");
            show(".more");
            show(".sfilemove");
            show(".moveoutsfile");
        } else {
            yunpn.menuManager.hideAll();
        }
    }
    /**
     * @return {undefined}
     */
    function parse() {
        content.removeClass("show");
        $next.removeClass("show");
        timefloat.hide();
        cfg.hide();
        activity.hide();
        msg.hide();
        btnsHistoryFileGroup.hide();
        overlay.show();
        modal.removeClass("show");
        W("#crumb").html('<div class="crumb-path"><a title="\u6211\u5206\u4eab\u7684\u6587\u4ef6" href="#" onclick="return false;" class="cmd gopath gohome">\u6211\u5206\u4eab\u7684\u6587\u4ef6</a></div>');
        content.removeClass("show");
        iElement.removeClass("show");
        show(".refresh");
        show(".link-view");
        start(".link-view");
        show(".link-del");
        start(".link-del");
        show(".link-copy");
        start(".link-copy");
        /** @type {boolean} */
        var noaccum = false;
        require([rPathConfig.Copy2Clipboard], function(cb) {
            cb(overlay.query(".link-copy")[0], "/resource/module/pub/Copy2Clipboard/ZeroClipboard.swf", {
                listeners : {
                    /**
                     * @return {?}
                     */
                    dataRequested : function() {
                        if (W("#tbLinkCopy").hasClass("y-btn-disable")) {
                            /** @type {boolean} */
                            noaccum = false;
                            return;
                        }
                        var targets = jQuery();
                        if (!targets || targets.length > 1) {
                            /** @type {boolean} */
                            noaccum = false;
                            return;
                        }
                        var target = targets[0];
                        var value = target.attr("data-url");
                        return noaccum = true, value;
                    },
                    /**
                     * @param {?} dataAndEvents
                     * @return {undefined}
                     */
                    aftercopy : function(dataAndEvents) {
                        if (!noaccum) {
                            return;
                        }
                        if (dataAndEvents) {
                            yunpn.tips.show("\u94fe\u63a5\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f");
                        } else {
                            $.alert("\u62b1\u6b49\uff0c\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u91cc\u4e0d\u80fd\u81ea\u52a8\u590d\u5236\u5230\u526a\u8d34\u677f\uff0c\u8bf7\u5148\u5b89\u88c5flash\u3002", {
                                type : "warning"
                            });
                        }
                    }
                }
            });
        });
        var nodes = jQuery();
        if (nodes) {
            remove(".link-del");
            next(".link-view", request);
            next(".link-copy", request);
            if (nodes.length == 1) {
                if (!nodes[0].hasClass("link-invalid")) {
                    remove(".link-view");
                    remove(".link-copy");
                    show(".link-view");
                    show(".link-copy");
                    if (unbind(nodes[0].attr("data-file-suffix"), nodes[0].attr("data-ori-size"))) {
                        show(".opendoc");
                    }
                    if (nodes[0].attr("data-extract-status") == "0") {
                        show(".extract-on");
                    }
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function fn() {
        timefloat.show();
        cfg.hide();
        btnsHistoryFileGroup.hide();
        activity.hide();
        overlay.hide();
        msg.show();
        content.removeClass("show");
        show(".refresh");
        if (yunpn.filelist.recyclePass) {
            start(".clearall");
            start(".diskdel");
            start(".restore");
        } else {
            var targets = jQuery();
            if (targets) {
                show(".diskdel");
                remove(".diskdel");
                show(".restore");
                remove(".restore");
            } else {
                start(".diskdel");
                start(".restore");
            }
            if (yunpn.fo.getFileNum() > 0) {
                show(".clearall");
                remove(".clearall");
            } else {
                start(".clearall");
            }
        }
        W("#crumb").html('<div class="crumb-path"><a title="\u56de\u6536\u7ad9" href="#" onclick="return false;" class="cmd gopath gohome">\u56de\u6536\u7ad9</a>            <span class="recycle-prompt">\uff08\u6e29\u99a8\u63d0\u793a\uff1a\u56de\u6536\u7ad9\u6587\u4ef6\u4e0d\u5360\u7528\u60a8\u4e91\u76d8\u7a7a\u95f4\uff0c\u4fdd\u755990\u5929\u540e\u5c06\u81ea\u52a8\u5220\u9664\u3002\uff09</span></div>');
    }
    /**
     * @param {string} object
     * @param {number} idx
     * @param {string} __
     * @return {?}
     */
    function callback(object, idx, __) {
        /** @type {string} */
        var iteratee = object;
        if (key) {
            iteratee = object.subByte(20, "...");
        }
        return'<span class="' + __ + '" data-index="' + idx + '" title="' + object.encode4Html() + '">' + iteratee.encode4Html() + "</span>";
    }
    /**
     * @return {undefined}
     */
    function onResize() {
        if (!xmlNode || values.length < 1) {
            return;
        }
        /** @type {number} */
        var m = 26;
        /** @type {number} */
        var offset = 35;
        /** @type {number} */
        var width = 200;
        /** @type {number} */
        var sz = 80;
        var browser = W("#crumb");
        var obj = browser.query(".crumb-path");
        if (obj.length <= 0) {
            return;
        }
        /** @type {number} */
        var n = browser.getSize().width - width - offset;
        var valuesLen = values.length;
        obj.css("width", n + "px");
        n -= sz;
        /** @type {number} */
        var intercept = (n - m * valuesLen) / n;
        /** @type {number} */
        var fix = 0;
        for (;fix < valuesLen;fix++) {
            xmlNode.item(fix).css("max-width", Math.floor(intercept * values[fix] / sum * 100) + "%");
        }
    }
    /**
     * @return {undefined}
     */
    function build() {
        /** @type {string} */
        var html = "";
        var groups = yunpn.filelist.nav;
        var ln = groups.length;
        /** @type {Array} */
        values = [];
        /** @type {number} */
        sum = 0;
        /** @type {string} */
        var events = "";
        if (yunpn.filelist.curFunc == "file") {
            /** @type {string} */
            events = "\u5168\u90e8\u6587\u4ef6";
        } else {
            /** @type {string} */
            events = "\u6587\u4ef6\u4fdd\u9669\u7bb1";
        }
        values.push(events.byteLen());
        if (!ln) {
            html = callback(events, -1, "first-item last-item path-item");
        } else {
            html = callback(events, -1, "first-item path-item");
            if (ln <= 4) {
                /** @type {number} */
                var i = 0;
                for (;i < ln;i++) {
                    values.push(groups[i].title.byteLen());
                    html += callback(groups[i].title, i, i == ln - 1 ? "last-item path-item" : "path-item");
                }
            } else {
                values.push(groups[0].title.byteLen());
                html += callback(groups[0].title, 0, "path-item");
                values.push(3);
                html += callback("...", "1", "path-item");
                /** @type {number} */
                i = ln - 2;
                for (;i < ln;i++) {
                    values.push(groups[i].title.byteLen());
                    html += callback(groups[i].title, i, i == ln - 1 ? "last-item path-item" : "path-item");
                }
            }
            /** @type {string} */
            html = '<span class="back" data-cn="back" data-index="' + (ln - 2) + '">\u8fd4\u56de\u4e0a\u4e00\u7ea7</span>' + html;
        }
        W("#crumb").html('<div class="crumb-path">' + html + "</div>");
        /** @type {number} */
        i = 0;
        /** @type {number} */
        var vlen = values.length;
        for (;i < vlen;i++) {
            sum += values[i];
        }
        /** @type {Array} */
        var assigns = [];
        /** @type {number} */
        var first = 0;
        /** @type {number} */
        var mean = sum / values.length;
        /** @type {number} */
        i = 0;
        /** @type {number} */
        vlen = values.length;
        for (;i < vlen;i++) {
            /** @type {number} */
            var vvar = (values[i] - mean) / 2 + mean;
            assigns.push(vvar);
            first += vvar;
        }
        /** @type {Array} */
        values = assigns;
        /** @type {number} */
        sum = first;
        xmlNode = W("#crumb").query(".path-item");
        onResize();
    }
    /**
     * @return {undefined}
     */
    function toggle() {
        build();
        content.removeClass("show");
        iElement.removeClass("show");
        timefloat.show();
        overlay.hide();
        msg.hide();
        activity.hide();
        btnsHistoryFileGroup.hide();
        cfg.show();
        loading.show();
        if (yunpn.upload.detectCapability().supportPlugin) {
            btnsUpLoad.replaceClass("icon-upload", "icon-plugin-upload");
        }
        show(".refresh");
        show(".new");
        show(".upload");
        show(".offline");
        show(".new-offline-task");
        show(".task-mng");
        remove(".upload");
        remove(".new");
        var nodes = jQuery();
        if (nodes) {
            if (nodes.length == 1) {
                show(".rename");
                var el = nodes[0];
                var filename = el.attr("data-type");
                var data_files = el.attr("data-path");
                if (filename == "folder") {
                    show(".pack-dl");
                    if (el.attr("data-link") == "true") {
                        show(".link-del");
                    }
                } else {
                    show(".dl");
                    show(".filehistory");
                    if (el.attr("data-link") == "true") {
                        show(".link-del");
                    }
                    if (unbind(el.attr("data-file-suffix"), el.attr("data-ori-size"))) {
                        show(".opendoc");
                    }
                }
                show(".link");
            } else {
                if (nodes.length > 1) {
                    show(".pack-dl");
                    show(".link-batch");
                    /** @type {number} */
                    var i = 0;
                    var len = nodes.length;
                    for (;i < len;i++) {
                        if (nodes[i].attr("data-link") == "true") {
                            show(".link-del");
                            break;
                        }
                    }
                }
            }
            show(".del");
            show(".more");
            show(".move");
            show(".moveinsfile");
        } else {
            yunpn.menuManager.hideAll();
        }
    }
    /**
     * @param {(Object|string)} params
     * @return {undefined}
     */
    function updateNav(params) {
        params = params || yunpn.filelist.curFunc;
        W("#leftPanel .nav li").removeClass("current");
        W("#leftPanel .nav .tab-" + params).addClass("current");
    }
    /**
     * @return {undefined}
     */
    function update() {
        var d = yunpn.filelist;
        var type = yunpn.filelist.curFunc;
        var n;
        var hover;
        W("#toolbar .sort li").hide();
        if (type == "file" || type == "sFile") {
            W("#toolbar .sort .name").parentNode("li").show();
            W("#toolbar .sort .fsize").parentNode("li").show();
            W("#toolbar .sort .new-upload").parentNode("li").show();
            W("#toolbar .sort .fmtime").parentNode("li").show();
        }
        if (type == "link") {
            W("#toolbar .sort .name").parentNode("li").show();
            W("#toolbar .sort .fsize").parentNode("li").show();
            W("#toolbar .sort .share-date").parentNode("li").show();
        }
        if (type == "recycle") {
            W("#toolbar .sort .name").parentNode("li").show();
            W("#toolbar .sort .fsize").parentNode("li").show();
            W("#toolbar .sort .del-date").parentNode("li").show();
        }
        /** @type {string} */
        var field = "";
        if (type == "recycle") {
            hover = d.order_recycle;
            field = d.order_field_recycle;
            if (field == "mtime") {
                /** @type {string} */
                field = "del-date";
            }
        } else {
            if (d.specialFolder[d.path.toLowerCase()]) {
                var filter = d.specialFolder[d.path.toLowerCase()];
                field = filter.field;
                hover = filter.order;
                if (field == "mtime") {
                    /** @type {string} */
                    field = "new-upload";
                }
            } else {
                if (type == "link") {
                    field = d.order_field_link;
                    hover = d.order_link;
                    if (field == "mtime") {
                        /** @type {string} */
                        field = "share-date";
                    }
                } else {
                    field = d.order_field;
                    hover = d.order;
                    if (field == "mtime") {
                        /** @type {string} */
                        field = "new-upload";
                    }
                }
            }
        }
        var node = W("#toolbar .sort ul ." + field).parentNode("li");
        node.query("a").removeClass("asc").removeClass("desc").addClass(hover);
        node.insertTo("afterbegin", W("#toolbar .sort ul")[0]);
        W("#toolbar .sort h2").html('<span class="text">\u6392\u5e8f\uff1a</span>' + node.html());
    }
    /**
     * @return {undefined}
     */
    function search() {
        jQuery = yunpn.cmdCenter.getSelItems;
        getAllItems = yunpn.cmdCenter.getAllItems;
        css = W("#crumb, #toolbar");
        rquickExpr = W(".menu-sys");
        content = rquickExpr.query(".item");
        timefloat = W("#toolbar .display-mode");
        sortGroup = W("#toolbar .sort");
        searchGroup = W("#search");
        loading = W(".real-search-bar");
        cfg = node.query(".btns-filelist");
        activity = node.query(".btns-sfilelist");
        btnsHistoryFileGroup = node.query(".btns-hisfile");
        overlay = node.query(".btns-link");
        msg = node.query(".btns-recycle");
        btnsUpLoad = node.query(".upload .icon");
        iElement = cfg.query(".y-btn");
        $next = activity.query(".y-btn");
        modal = overlay.query(".y-btn");
        T = msg.query(".y-btn");
        hisFilelist = W("#fileListHistory");
    }
    var node = W("#toolbar");
    var css;
    var rquickExpr;
    var content;
    var timefloat;
    var cfg;
    var activity;
    var overlay;
    var msg;
    var iElement;
    var $next;
    var modal;
    var T;
    var jQuery;
    var getAllItems;
    var key = Browser.ie6;
    /** @type {Array} */
    var values = [];
    var sum;
    var xmlNode;
    var loading;
    /** @type {number} */
    var _ = 0;
    /** @type {number} */
    var error = 1;
    /** @type {number} */
    var request = 2;
    /**
     * @param {string} selector
     * @param {number} event
     * @return {undefined}
     */
    var show = function(selector, event) {
        try {
            if (event != request) {
                css.query(selector).addClass("show");
            }
            if (event != error) {
                rquickExpr.query(selector).addClass("show");
            }
        } catch (e) {
            throw new Error("YP:updateStatus, show. -" + selector + "-" + e.message);
        }
    };
    /**
     * @param {string} selector
     * @param {number} event
     * @return {undefined}
     */
    var next = function(selector, event) {
        try {
            if (event != request) {
                css.query(selector).removeClass("show");
            }
            if (event != error) {
                rquickExpr.query(selector).removeClass("show");
            }
        } catch (e) {
            throw new Error("YP:updateStatus, hide. -" + selector + "-" + e.message);
        }
    };
    /**
     * @param {string} selector
     * @return {undefined}
     */
    var remove = function(selector) {
        try {
            css.query(selector).removeClass("y-btn-disable");
        } catch (e) {
            throw new Error("YP:updateStatus, enable. -" + selector + "-" + e.message);
        }
    };
    /**
     * @param {string} index
     * @return {undefined}
     */
    var start = function(index) {
        try {
            css.query(index).addClass("y-btn-disable");
        } catch (e) {
            throw new Error("YP:updateStatus, disable. -" + index + "-" + e.message);
        }
    };
    var unbind = yunpn.docviewer.canPreview;
    return{
        /** @type {function (): undefined} */
        initUpdate : search,
        /** @type {function (): undefined} */
        updateSortStatus : update,
        /** @type {function (): undefined} */
        updateStatus : init,
        /** @type {function (): undefined} */
        updateRBStatus : fn,
        /** @type {function ((Object|string)): undefined} */
        updateNav : updateNav,
        recycleState : 0,
        /** @type {function (string): undefined} */
        updateStatusFromMenu : handle,
        /** @type {function (): undefined} */
        resizeCrumb : onResize
    };
}()), Dom.ready(function() {
    /** @type {Array} */
    var arrayOfItems = [{
        text : "\u91cd\u547d\u540d",
        cls : "rename",
        iconCls : "icon-rename",
        attrs : {
            "data-cn" : "rename"
        },
        handler : yunpn.cmdCenter.renameItem
    }, {
        text : "\u79fb\u52a8",
        cls : "move",
        iconCls : "icon-move",
        attrs : {
            "data-cn" : "move"
        },
        handler : yunpn.cmdCenter.moveItem
    }, {
        text : "\u8f6c\u5165\u6587\u4ef6\u4fdd\u9669\u7bb1",
        cls : "moveinsfile",
        iconCls : "icon-moveinsfile",
        attrs : {
            "data-cn" : "moveinsfile"
        },
        handler : yunpn.cmdCenter.moveInSfile
    }, {
        text : "\u79bb\u7ebf\u4e0b\u8f7d",
        cls : "offline-menu",
        iconCls : "icon-offline",
        attrs : {
            "data-cn" : "offline"
        },
        handler : yunpn.cmdCenter.showOfflineDia
    }, {
        text : "\u6587\u4ef6\u65f6\u5149\u673a",
        cls : "filehistory",
        iconCls : "icon-filehistory",
        attrs : {
            "data-cn" : "filehistory"
        },
        handler : yunpn.cmdCenter.fileHistory
    }];
    /** @type {Array} */
    var toolbarItems = [{
        text : "\u91cd\u547d\u540d",
        cls : "rename",
        iconCls : "icon-rename",
        attrs : {
            "data-cn" : "rename"
        },
        handler : yunpn.cmdCenter.renameItem
    }, {
        text : "\u79fb\u52a8",
        cls : "sfilemove",
        iconCls : "icon-sfilemove",
        attrs : {
            "data-cn" : "sfilemove"
        },
        handler : yunpn.cmdCenter.moveSfileItem
    }, {
        text : "\u8f6c\u51fa\u6587\u4ef6\u4fdd\u9669\u7bb1",
        cls : "moveoutsfile-menu",
        iconCls : "icon-moveoutsfile",
        attrs : {
            "data-cn" : "moveoutsfile"
        },
        handler : yunpn.cmdCenter.moveOutSfile
    }, {
        text : "\u6587\u4ef6\u65f6\u5149\u673a",
        cls : "filehistory",
        iconCls : "icon-filehistory",
        attrs : {
            "data-cn" : "filehistory"
        },
        handler : yunpn.cmdCenter.fileHistory
    }];
    var poster = new yunpn.Menu({
        cls : "cmd-panel",
        target : "#toolbar .btns-sfilelist .more",
        dock : "bottom",
        listeners : {
            /**
             * @return {undefined}
             */
            aftershow : function() {
                if (W(this).hasClass("more-disable")) {
                    poster.hide();
                }
            }
        },
        items : toolbarItems
    });
    var loading = new yunpn.Menu({
        cls : "cmd-panel",
        target : "#toolbar .btns-filelist .more",
        dock : "bottom",
        listeners : {
            /**
             * @return {undefined}
             */
            aftershow : function() {
                if (W(this).hasClass("more-disable")) {
                    loading.hide();
                }
            }
        },
        items : arrayOfItems
    });
    /** @type {Array} */
    var listStyleOptions = [{
        text : "\u5728\u7ebf\u67e5\u770b",
        cls : "opendoc",
        iconCls : "icon-opendoc",
        attrs : {
            "data-cn" : "opendoc"
        },
        handler : yunpn.cmdCenter.openDoc
    }, {
        text : "\u4e0b\u8f7d",
        cls : "dl",
        iconCls : "icon-dl",
        attrs : {
            "data-cn" : "dl"
        },
        handler : yunpn.cmdCenter.downloadItem
    }, {
        text : "\u4e0b\u8f7d",
        cls : "pack-dl",
        iconCls : "icon-pack-dl",
        attrs : {
            "data-cn" : "pack-dl"
        },
        handler : yunpn.cmdCenter.packDownloadItem
    }, {
        text : "\u5220\u9664",
        cls : "del",
        iconCls : "icon-del",
        attrs : {
            "data-cn" : "del"
        },
        handler : yunpn.cmdCenter.delItem
    }, {
        text : "\u91cd\u547d\u540d",
        cls : "rename",
        iconCls : "icon-rename",
        attrs : {
            "data-cn" : "rename"
        },
        handler : yunpn.cmdCenter.renameItem
    }, {
        text : "\u79fb\u52a8",
        cls : "move",
        iconCls : "icon-move",
        attrs : {
            "data-cn" : "move"
        },
        handler : yunpn.cmdCenter.moveItem
    }, {
        text : "\u79fb\u52a8",
        cls : "sfilemove",
        iconCls : "icon-sfilemove",
        attrs : {
            "data-cn" : "sfilemove"
        },
        handler : yunpn.cmdCenter.moveSfileItem
    }, {
        text : "\u8fd8\u539f",
        cls : "restore",
        iconCls : "icon-restore",
        attrs : {
            "data-cn" : "restore"
        },
        handler : yunpn.cmdCenter.restoreItem
    }, {
        text : "\u5220\u9664",
        cls : "diskdel",
        iconCls : "icon-diskdel",
        attrs : {
            "data-cn" : "diskdel"
        },
        handler : yunpn.cmdCenter.diskdelItem
    }, {
        text : "\u8f6c\u5165\u6587\u4ef6\u4fdd\u9669\u7bb1",
        cls : "moveinsfile",
        iconCls : "icon-moveinsfile",
        attrs : {
            "data-cn" : "moveinfile"
        },
        handler : yunpn.cmdCenter.moveInSfile
    }, {
        text : "\u8f6c\u51fa\u6587\u4ef6\u4fdd\u9669\u7bb1",
        cls : "moveoutsfile",
        iconCls : "icon-moveoutsfile",
        attrs : {
            "data-cn" : "moveoutsfile"
        },
        handler : yunpn.cmdCenter.moveOutSfile
    }, {
        text : "\u6587\u4ef6\u65f6\u5149\u673a",
        cls : "filehistory",
        iconCls : "icon-filehistory",
        attrs : {
            "data-cn" : "filehistory"
        },
        handler : yunpn.cmdCenter.fileHistory
    }];
    /** @type {Array} */
    listStyleOptions = listStyleOptions.concat([{
        text : "\u5206\u4eab",
        cls : "link",
        iconCls : "icon-link",
        attrs : {
            "data-cn" : "link"
        },
        /**
         * @return {undefined}
         */
        handler : function() {
            yunpn.cmdCenter.linkItem();
        }
    }, {
        text : "\u5206\u4eab",
        cls : "link-batch",
        iconCls : "icon-link-batch",
        linkCls : "clearfix",
        attrs : {
            "data-cn" : "link-batch"
        },
        /**
         * @return {undefined}
         */
        handler : function() {
            yunpn.cmdCenter.linkItem();
        }
    }, {
        text : "\u53d6\u6d88\u5206\u4eab",
        cls : "dellink",
        iconCls : "icon-dellink",
        attrs : {
            "data-cn" : "link-del"
        },
        handler : yunpn.cmdCenter.delLinkItem
    }, {
        text : "\u67e5\u770b\u5206\u4eab\u94fe\u63a5",
        cls : "link-view",
        iconCls : "icon-link-view",
        attrs : {
            "data-cn" : "link-view"
        },
        handler : yunpn.cmdCenter.viewLinkItem
    }, {
        text : "\u53d6\u6d88\u5206\u4eab",
        cls : "link-del",
        iconCls : "icon-link-del",
        attrs : {
            "data-cn" : "link-del"
        },
        handler : yunpn.cmdCenter.delLinkItem
    }, {
        text : "\u590d\u5236\u5206\u4eab\u94fe\u63a5",
        cls : "link-copy",
        iconCls : "icon-link-copy",
        attrs : {
            "data-cn" : "link-copy"
        },
        handler : yunpn.cmdCenter.copyLinkItem
    }, {
        text : "\u542f\u7528\u63d0\u53d6\u7801",
        cls : "extract-on",
        iconCls : "icon-extract-on",
        attrs : {
            "data-cn" : "extract-on"
        },
        handler : yunpn.cmdCenter.enableExtractItem
    }, {
        text : "\u53d6\u6d88\u63d0\u53d6\u7801",
        cls : "extract-off",
        iconCls : "icon-extract-off",
        attrs : {
            "data-cn" : "extract-off"
        },
        handler : yunpn.cmdCenter.disableExtractItem
    }]);
    var _this = new yunpn.Menu({
        cls : "cmd-panel",
        delegates : [{
            selector : "#listHolder",
            query : "li"
        }],
        listeners : {
            /**
             * @return {undefined}
             */
            beforeshow : function() {
                var e = yunpn.fo.getSelectFile();
                var done = yunpn.fo.getSelArr();
                var suiteView = W(this);
                /** @type {number} */
                var id = parseInt(suiteView.getAttr("f-index"), 10);
                if (!done[id]) {
                    yunpn.fo.unSelectAllFile();
                    yunpn.fo.selectFile(suiteView);
                }
                yunpn.cmdCenter.updateStatus();
            },
            /**
             * @return {undefined}
             */
            aftershow : function() {
                try {
                    /** @type {boolean} */
                    var e = true;
                    if (!_this.copyLinkItem) {
                        _this.copyLinkItem = _this.oWrap.query(".link-copy");
                    }
                    if (_this.copyLinkItem.hasClass("show")) {
                        yunpn.cmdCenter.copyLinkInit("menu", _this.copyLinkItem, _this.copyLinkItem.query("a"), _this);
                        /** @type {boolean} */
                        e = false;
                    } else {
                        _this.oWrap.query("li").forEach(function($modal) {
                            $modal = W($modal);
                            if ($modal.hasClass("show")) {
                                /** @type {boolean} */
                                e = false;
                            }
                        });
                    }
                    if (e) {
                        _this.hide();
                    }
                } catch (ex) {
                    throw new Error("YP:menu, after show menu. " + ex.message);
                }
            }
        },
        items : listStyleOptions
    });
    /** @type {Array} */
    var itemList = [{
        text : "\u4e0a\u4f20\u6587\u4ef6",
        cls : "upload",
        iconCls : "icon-upload",
        attrs : {
            "data-cn" : "upload"
        },
        /**
         * @return {undefined}
         */
        handler : function() {
            monitor.clickLog("\u53f3\u952e\u4e0a\u4f20");
            yunpn.cmdCenter.uploadItem();
        }
    }, {
        text : "\u65b0\u5efa\u6587\u4ef6\u5939",
        cls : "new",
        iconCls : "icon-new",
        attrs : {
            "data-cn" : "new"
        },
        /**
         * @return {undefined}
         */
        handler : function() {
            monitor.clickLog("\u53f3\u952e\u65b0\u5efa\u6587\u4ef6\u5939");
            yunpn.cmdCenter.newItem();
        }
    }, {
        text : "\u5237\u65b0",
        cls : "refresh show",
        iconCls : "icon-refresh",
        attrs : {
            "data-cn" : "refresh"
        },
        /**
         * @return {undefined}
         */
        handler : function() {
            monitor.clickLog("\u53f3\u952e\u5237\u65b0");
            yunpn.cmdCenter.refresh();
        }
    }];
    var u = new yunpn.Menu({
        cls : "cmd-panel",
        delegates : [{
            selector : "#listHolder"
        }, {
            selector : "#listHolder",
            query : "ul"
        }],
        /**
         * @param {Object} d
         * @return {?}
         */
        conditionCheck : function(d) {
            var target = d.target.id;
            return target != "list" && target != "listHolder" ? false : true;
        },
        listeners : {
            /**
             * @return {undefined}
             */
            beforeshow : function() {
                yunpn.fo.unSelectAllFile();
                yunpn.cmdCenter.updateStatus();
            }
        },
        items : itemList
    });
    yunpn.cmdCenter.init();
}), yunpn.filehistory = function() {
    /**
     * @return {undefined}
     */
    function bindEvents() {
        W("#fileListHistory").delegate("li.item", "click", clickHandler).delegate("li.item", "mouseenter", function(dataAndEvents) {
            if (!W(this).hasClass("active")) {
                W(this).addClass("hover");
            }
        }).delegate("li.item", "mouseleave", function(dataAndEvents) {
            W(this).removeClass("hover");
        }).delegate("li.eventItem", "click", callback);
        W("#tbHisView").on("click", handler);
        W("#tbHisDl").on("click", init);
        W("#tbHisReFile").on("click", fn);
        W(window).on("resize", yunpn.filehistory.resizeHolder);
    }
    /**
     * @return {undefined}
     */
    function closeLightbox() {
        W("#fileListHistory").undelegate("li.item", "click", clickHandler).undelegate("li.eventItem", "click", callback);
        W("#tbHisView").un("click", handler);
        W("#tbHisDl").un("click", init);
        W("#tbHisReFile").un("click", fn);
        W(window).un("resize", yunpn.filehistory.resizeHolder);
    }
    /**
     * @return {undefined}
     */
    function resize() {
        var elem = W("#fileListHistory");
        var self = W("#fileListHistory .main");
        var child = W("#fileListHistory .main .content");
        /** @type {number} */
        var indent = Dom.getDocRect().height - self.getRect().top;
        var surface = W("#fileListHistory .main .content .list");
        self.css("height", indent + "px");
        if (surface.length > 0) {
            var size = surface.getRect().height;
            if (indent < size) {
                indent = size;
            }
            child.css("height", indent + "px");
        }
        var body = W("#fileListHistory .head");
        var tmp = body.getRect();
        if (tmp.width > 0) {
            /** @type {number} */
            var bodyHeight = tmp.width + parseInt(body.css("margin-right")) - child.getRect().width;
            body.css("margin-right", bodyHeight + "px");
        }
        if (QW.Browser.ie == 6) {
            /** @type {number} */
            var value = Dom.getDocRect().height - W("#fileListHistory .listholder").getRect().top;
            elem.css("height", value + "px");
        }
    }
    /**
     * @param {?} self
     * @param {Function} fn
     * @return {undefined}
     */
    function run(self, fn) {
        if (val) {
            val.cancel();
        }
        val = Ajax.post("/fHistory/getFileHistory/", self, function(dataAndEvents) {
            var err = dataAndEvents.evalExp();
            if (!err.errno) {
                var msg = err.data;
                if (msg.fhistory_list.length >= 1) {
                    data.curNid = msg.fhistory_list[0].nid;
                }
                data.curNums += msg.retnum;
                if (fn) {
                    fn(msg);
                }
            } else {
                $.alert(err.errmsg, {
                    type : "error"
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function _start() {
        W("#listHolder").html("");
        W("#fileList").hide();
        target.html("");
        /** @type {number} */
        data.curNums = 0;
        /** @type {number} */
        data.nid = 0;
        /** @type {number} */
        data.curNid = 0;
        /** @type {null} */
        obj = null;
        closeLightbox();
    }
    /**
     * @param {Object} params
     * @return {undefined}
     */
    function update(params) {
        var opts = params.current;
        var key = yunpn.fileType.getSuffix(opts.fname);
        var child = yunpn.docviewer.checkPreview(key, opts.fsize);
        var pdataCur = opts.fname;
        if (opts.fname.length >= 30) {
            pdataCur = opts.fname.subByte("30", "...");
        }
        yunpn.cmdCenter.updateStatusFromMenu(pdataCur);
        if (opts.pic && opts.pic != "") {
            W("#tbHisViewPic").show().attr("href", opts.pic);
            W("#tbHisView").hide();
        } else {
            if (child.isDoc) {
                W("#tbHisView").show();
                W("#tbHisViewPic").hide();
            } else {
                W("#tbHisView").hide();
                W("#tbHisViewPic").hide();
            }
        }
        data.suffix = key;
        data.path = opts.fpath;
    }
    /**
     * @param {?} attrs
     * @return {undefined}
     */
    function start(attrs) {
        var self = {};
        _start();
        data.nid = attrs;
        data.curNid = attrs;
        self.nid = data.nid;
        self.his_nid = data.curNid;
        /** @type {number} */
        self.start = 0;
        /** @type {number} */
        self.num = data.Nums;
        /** @type {string} */
        self.source = "";
        if (yunpn.filelist.curFunc == "sFile") {
            /** @type {string} */
            self.source = "safebox";
        }
        /**
         * @param {Object} element
         * @return {undefined}
         */
        var init = function(element) {
            update(element);
            var classes = yunpn.filelist.curHisFileHtml(element);
            target.html(classes.join(""));
            obj = target.query("li")[0];
            W(obj).addClass("active");
            W(obj).query(".column-radio span").addClass("selected");
            W("#tbHisReFile").replaceClass("y-btn-blue", "y-btn-disable");
            var styles = yunpn.filelist.hisFileHtml(element);
            if (styles.length >= 1) {
                W(styles.join("")).insertTo("beforeend", target[0]);
            }
            yunpn.filehistory.resizeHolder();
            bindEvents();
        };
        run(self, init);
    }
    /**
     * @return {undefined}
     */
    function onSuccess() {
        var self = {};
        self.nid = data.nid;
        self.his_nid = data.curNid;
        /** @type {number} */
        self.num = data.Nums;
        self.start = data.curNums;
        /** @type {string} */
        self.source = "";
        if (yunpn.filelist.curFunc == "sFile") {
            /** @type {string} */
            self.source = "safebox";
        }
        /**
         * @param {Object} element
         * @return {undefined}
         */
        var show = function(element) {
            target.query(".eventItem").hide();
            var classes = yunpn.filelist.hisFileHtml(element);
            if (classes.length >= 1) {
                W(classes.join("")).insertTo("beforeend", target[0]).css("display", "none").fadeIn();
            }
        };
        run(self, show);
    }
    /**
     * @param {string} mixin
     * @return {undefined}
     */
    function next(mixin) {
        /** @type {string} */
        var optsData = "";
        if (mixin.init == "history") {
            /** @type {string} */
            yunpn.filelist.curFunc = "file";
            /** @type {string} */
            optsData = "\u5168\u90e8\u6587\u4ef6";
        } else {
            /** @type {string} */
            yunpn.filelist.curFunc = "sFile";
            /** @type {string} */
            optsData = "\u6587\u4ef6\u4fdd\u9669\u7bb1";
        }
        yunpn.cmdCenter.updateNav();
        yunpn.config.init(yunpn.filelist.curFunc);
        yunpn.filehistory.fileHistoryList(mixin.his_nid);
        W("#fileListHistory").show();
    }
    var data = {
        nid : 0,
        curNid : 0,
        curNums : 0,
        Nums : 300
    };
    /** @type {null} */
    var val = null;
    var target = W("#fileListHistory .content .list");
    /** @type {null} */
    var obj = null;
    /**
     * @param {?} e
     * @return {undefined}
     */
    var clickHandler = function(e) {
        var tmp = obj;
        if (W(tmp).attr("data-vid") == W(this).attr("data-vid")) {
            return;
        }
        if (W(this).hasClass("cur")) {
            W("#tbHisReFile").replaceClass("y-btn-gray", "y-btn-disable");
        } else {
            W("#tbHisReFile").replaceClass("y-btn-disable", "y-btn-gray");
        }
        W(this).addClass("active");
        W(this).query(".column-radio span").addClass("selected");
        W("#tbHisViewPic").attr("href", W(this).attr("data-pic"));
        W(tmp).removeClass("active");
        W(tmp).query(".column-radio span").removeClass("selected");
        obj = W(this);
    };
    /**
     * @param {?} __
     * @return {undefined}
     */
    var callback = function(__) {
        W(this).addClass("loading");
        W(this).query(".column-histitle span").html("\u6b63\u5728\u52aa\u529b\u52a0\u8f7d\u4e2d...");
        var key = W(this).attr("data-nid");
        if (key) {
            data.curNid = key;
        }
        if (W(this).attr("data-type") == "move") {
            /** @type {number} */
            data.curNums = 0;
        }
        onSuccess();
    };
    /**
     * @param {?} range
     * @return {undefined}
     */
    var fn = function(range) {
        if (!obj) {
            return;
        }
        if (W(this).hasClass("y-btn-disable")) {
            return;
        }
        $.confirm("\u786e\u5b9a\u8981\u7a7f\u8d8a\u5230\u6b64\u65f6\u5149\u53f7\uff08\u8fd8\u539f\u5230\u9009\u4e2d\u7248\u672c\uff09", {
            type : "question",
            /**
             * @param {string} button
             * @return {undefined}
             */
            fn : function(button) {
                if (button == "yes") {
                    var el = W(obj);
                    var id = el.attr("data-id");
                    var nid = data.nid;
                    Ajax.post("/fHistory/restore", {
                        id : id,
                        nid : nid,
                        source : yunpn.filelist.curFunc == "file" ? "" : "safebox"
                    }, function(dataAndEvents) {
                        var e = dataAndEvents.evalExp();
                        if (!e.errno) {
                            yunpn.tips.show("\u6210\u529f\u7a7f\u8d8a\u5230\u5386\u53f2\u7248\u672c!");
                            var self = {};
                            self.nid = data.nid;
                            self.his_nid = data.nid;
                            /** @type {number} */
                            self.num = 1;
                            /** @type {number} */
                            self.start = 0;
                            /** @type {string} */
                            self.source = "";
                            if (yunpn.filelist.curFunc == "sFile") {
                                /** @type {string} */
                                self.source = "safebox";
                            }
                            /**
                             * @param {Object} element
                             * @return {undefined}
                             */
                            var show = function(element) {
                                var classes = yunpn.filelist.curHisFileHtml(element);
                                var styles = yunpn.filelist.hisFileHtml(element);
                                var tile = styles.join("") + classes.join("");
                                target.query("li.cur").removeNode();
                                W(tile).insertTo("afterbegin", target).css("display", "none").fadeIn();
                                W("li.cur").click();
                            };
                            run(self, show);
                        }
                    });
                }
            }
        });
    };
    /**
     * @param {?} token
     * @return {undefined}
     */
    var handler = function(token) {
        if (!obj) {
            return;
        }
        var handle = W(obj);
        var suffix = data.suffix;
        var end = data.nid;
        var dataID = handle.attr("data-id");
        var size = handle.attr("data-ori-size");
        /** @type {number} */
        var r20 = 0;
        var child = yunpn.docviewer.checkPreview(data.suffix, handle.attr("data-ori-size"));
        if (child.isDoc && child.isOversize) {
            $.alert("\u8fd9\u4e2a\u6587\u6863\u592a\u5927\uff0c\u6682\u4e0d\u652f\u6301\u9884\u89c8\uff01");
            return;
        }
        if (handle.hasClass("cur")) {
            /** @type {number} */
            r20 = 0;
        } else {
            /** @type {number} */
            r20 = 1;
        }
        var source = yunpn.docviewer.getUrl(yunpn.filelist.curFunc == "sFile" ? "sFile" : "file", end, suffix, null, {
            size : size
        }, dataID, r20);
        if (source) {
            window.open(source);
        }
    };
    /**
     * @return {undefined}
     */
    var init = function() {
        if (!obj) {
            return;
        }
        var el = W(obj);
        var rowId = el.attr("data-id");
        var nid = data.nid;
        if (W(obj).hasClass("cur")) {
            Ajax.post(yunpn.config.url.f_down, {
                nid : nid,
                fname : data.path
            }, function(dataAndEvents) {
                var e = dataAndEvents.evalExp();
                if (e.errno) {
                    $.alert(re.errmsg, {
                        type : "error"
                    });
                } else {
                    W("#ifrDownload").attr("src", e.data.download_url);
                }
            });
        } else {
            W("#frmDownload").attr("action", "/fHistory/downladHistory");
            W("#hidDLPath").val(data.path);
            W("#hidDLId").val(rowId);
        }
        W("#frmDownload").submit();
    };
    return{
        /** @type {function (?): undefined} */
        fileHistoryList : start,
        /** @type {function (): undefined} */
        resizeHolder : resize,
        /** @type {function (): undefined} */
        moreFileHistoryList : onSuccess,
        /** @type {function (string): undefined} */
        queryUrl : next
    };
}(), yunpn.fo = ObjectH.mix(yunpn.fo || {}, function() {
    /**
     * @return {undefined}
     */
    function hide() {
        var el = W("#toolbar .qrcode-content");
        var imgHeight = W("#toolbar .qrcode-content").css("height");
        el.slideUp(200, function() {
            el.setStyle({
                height : imgHeight,
                display : "none"
            });
        });
    }
    /**
     * @param {?} obj
     * @param {?} total
     * @return {undefined}
     */
    function done(obj, total) {
        /** @type {number} */
        var n = parseInt(obj.getAttr("f-index"));
        if (queue[n] == 1) {
            return;
        }
        obj.addClass("active");
        /** @type {number} */
        r = n;
        /** @type {boolean} */
        queue[n] = true;
        if (yunpn.filelist.curFunc == "file") {
            hook();
        }
        if (yunpn.filelist.curFunc == "share") {
            hide();
        }
    }
    /**
     * @param {?} li
     * @return {undefined}
     */
    function add(li) {
        if (li.length <= 0) {
            return;
        }
        /** @type {number} */
        var r = parseInt(li.getAttr("f-index"));
        if (!queue[r]) {
            return;
        }
        /** @type {boolean} */
        queue[r] = false;
        li.removeClass("active");
        W("#fileListHead").removeClass("active");
        if (yunpn.filelist.curFunc == "share") {
            hide();
        }
    }
    /**
     * @return {undefined}
     */
    function leave() {
        /** @type {number} */
        var fix = 0;
        for (;fix < i;fix++) {
            done(types.item(fix));
        }
        yunpn.cmdCenter.updateStatus();
        if (yunpn.filelist.curFunc == "share") {
            hide();
        }
    }
    /**
     * @return {undefined}
     */
    function fn() {
        /** @type {number} */
        var fix = 0;
        for (;fix < i;fix++) {
            add(types.item(fix));
        }
        yunpn.cmdCenter.updateStatus();
        if (yunpn.filelist.curFunc == "share") {
            hide();
        }
    }
    /**
     * @param {Object} e
     * @param {?} src
     * @return {undefined}
     */
    function render(e, src) {
        if (e.button == 2) {
            return;
        }
        var r = this;
        if (yunpn.filelist.curFunc == "recycle") {
            return;
        }
        if (e && (e.target && e.target.tagName.toLowerCase() == "label")) {
            return;
        }
        if (e.target.tagName.toLowerCase() == "span" && W(e.target).hasClass("text")) {
            fn();
            done(src);
            yunpn.cmdCenter.updateStatus();
            yunpn.cmdCenter.openItem(src);
        } else {
            yunpn.cmdCenter.openItem();
        }
    }
    /**
     * @return {undefined}
     */
    function bind() {
        W("#list").delegate("li", "click", show).delegate("li", "mouseenter", function(dataAndEvents) {
            W(this).addClass("hover");
        }).delegate("li", "mouseleave", function(dataAndEvents) {
            W(this).removeClass("hover");
        }).delegate("li", "dblclick", delegate).delegate("li.row .column-checkbox", "click", handler).delegate("li span.text", "click", cb).delegate("li span.video-play-ico", "click", esp).delegate("li span.music-play-ico", "click", stop).delegate("li span.op-dl", "click", callback).delegate("li span.op-del", "click", ok).delegate("li.active", "mousedown", function(e) {
            /** @type {number} */
            pos.X = e.clientX - a.X;
            /** @type {number} */
            pos.Y = e.clientY - a.Y;
        });
        W("#fileListHead").delegate(".file-sort", "click", clickHandler).delegate(".column-checkbox", "click", mouseDown);
    }
    /**
     * @return {undefined}
     */
    function Widget() {
        W("#list").undelegate("li", "click", show).undelegate("li", "dblclick", render).undelegate("li span.text", "click", cb).undelegate("li span.video-play-ico", "click", esp).undelegate("li span.music-play-ico", "click", stop).undelegate("li span.op-dl", "click", callback).undelegate("li span.op-del", "click", ok).undelegate("li.row .column-checkbox", "click", handler);
        W("#fileListHead").undelegate(".file-sort", "click", clickHandler).undelegate(".column-checkbox", "click", mouseDown);
    }
    /**
     * @return {undefined}
     */
    function append() {
        /** @type {null} */
        types = null;
        /** @type {Array} */
        queue = [];
        /** @type {Array} */
        T = [];
        /** @type {Array} */
        k = [];
        /** @type {null} */
        el = null;
        /** @type {number} */
        i = 0;
        Widget();
        yunpn.cmdCenter.updateStatus();
    }
    /**
     * @return {undefined}
     */
    function initialize() {
        if (self) {
            self.stop();
            /** @type {null} */
            self = null;
        }
        self = new yunpn.util.Lazyload({
            container : start,
            selector : "span.ico img",
            type : "src",
            threshold : 100,
            /**
             * @param {?} tileSetItem
             * @return {undefined}
             */
            onLoadFunc : function(tileSetItem) {
                var tapElement = W(this);
                var divSpan = tapElement.parentNode(".ico");
                if (!divSpan.hasClass("show-thumb")) {
                    divSpan.addClass("show-thumb");
                }
            }
        });
        self.start();
        types = W("#list li");
        i = types.length;
        /** @type {null} */
        queue = null;
        /** @type {Array} */
        queue = new Array(i);
        types.forEach(function(me, attributeName) {
            me = W(me);
            me.setAttr("f-index", attributeName);
        });
        yunpn.cmdCenter.updateStatus();
    }
    /**
     * @return {undefined}
     */
    function hook() {
        return;
    }
    /**
     * @param {?} name
     * @return {undefined}
     */
    function Init(name) {
        if (name) {
            if (name.lazyLoaderCtn) {
                start = name.lazyLoaderCtn;
            }
        }
        append();
        if (!target) {
            target = new QW.RectSelector({
                oHdl : W("#listHolder")[0],
                blackSelectors4Start : "a,input,textarea,object,embed",
                ignoreLeftButtonDrag : true,
                /**
                 * @param {?} dataAndEvents
                 * @return {?}
                 */
                onbeforedragstart : function(dataAndEvents) {
                    return!W(EventH.getTarget()).hasClass("text");
                }
            });
            target.on("drag", listener);
            target.on("dragstart", function(dataAndEvents) {
                /** @type {null} */
                user = null;
                try {
                    if (window.getSelection) {
                        window.getSelection().removeAllRanges();
                    }
                    if (Browser.ie) {
                        if (document.selection) {
                            document.selection.empty();
                        }
                    }
                } catch (t) {
                }
                if (!W(EventH.getTarget()).parentNode(".filelist-item").length) {
                    fn();
                }
                W("#list input[type=text], #list textarea").blur();
            });
            target.on("dragend", function() {
                yunpn.cmdCenter.updateStatus();
                dest = yunpn.filelist.listtype;
                if (yunpn.filelist.curFunc == "file" || yunpn.filelist.curFunc == "sFile") {
                    hook();
                }
                W("#list li.hover").removeClass("hover");
            });
        }
        bind();
        initialize();
    }
    /**
     * @param {?} value
     * @return {undefined}
     */
    function isA_(value) {
        mode = value;
        self.loadImg();
    }
    /**
     * @param {(Object|boolean|number|string)} failing_message
     * @return {?}
     */
    function report(failing_message) {
        /** @type {Array} */
        var assigns = [];
        /** @type {number} */
        var fix = 0;
        var ln = queue.length;
        for (;fix < ln;fix++) {
            if (queue[fix]) {
                var vvar = types.item(fix);
                if (failing_message || vvar.isVisible()) {
                    assigns.push(vvar);
                }
            }
        }
        return assigns;
    }
    /**
     * @return {?}
     */
    function makeArray() {
        /** @type {Array} */
        var ret = [];
        /** @type {number} */
        var fix = 0;
        var ln = queue.length;
        for (;fix < ln;fix++) {
            var rreturn = types.item(fix);
            ret.push(rreturn);
        }
        return ret;
    }
    var types;
    /** @type {number} */
    var i = 0;
    /** @type {Array} */
    var queue = [];
    var mode;
    /** @type {number} */
    var b = 1;
    /** @type {number} */
    var w = 2;
    /** @type {null} */
    var target = null;
    /** @type {number} */
    var r = 0;
    var user;
    /** @type {Array} */
    var T = [];
    /** @type {null} */
    var N = null;
    /** @type {null} */
    var C = null;
    /** @type {Array} */
    var k = [];
    var pos = {};
    var a = {};
    /** @type {null} */
    var O = null;
    var dest;
    var el;
    var self;
    /** @type {string} */
    var start = "#fileListMain";
    var max;
    var min;
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    var show = function(ev) {
        ev.stopPropagation();
        if (W(ev.target).hasClass("music-play-ico")) {
            return;
        }
        var ul = this;
        var asserterNames = queue;
        var li = W(ul);
        var target = ev.target;
        /** @type {number} */
        var w = parseInt(li.getAttr("f-index"));
        if (yunpn.menuManager) {
            yunpn.menuManager.hideAll();
        }
        if (!W(target).hasClass("column-checkbox") && (target.tagName != "LABEL" && (target.tagName != "INPUT" && target.tagName != "TEXTAREA"))) {
            if (ev.shiftKey) {
                /** @type {number} */
                var origword = w;
                /** @type {number} */
                var all = Math.min(r, w);
                /** @type {number} */
                var right = Math.max(r, w);
                /** @type {number} */
                var fix = 0;
                for (;fix < all;fix++) {
                    add(types.item(fix));
                }
                /** @type {number} */
                fix = all;
                for (;fix <= right;fix++) {
                    done(types.item(fix));
                }
                /** @type {number} */
                fix = right + 1;
                for (;fix < i;fix++) {
                    add(types.item(fix));
                }
            } else {
                if (ev.ctrlKey) {
                    if (queue[w]) {
                        add(li);
                    } else {
                        done(li);
                    }
                } else {
                    var codeSegments = yunpn.fo.getSelectFile();
                    if (yunpn.filelist.listtype == 1 && (W(li).hasClass("active") && codeSegments.length == 1)) {
                        add(li);
                        yunpn.cmdCenter.updateStatus();
                        done(li);
                        W(li).removeClass("active");
                        /** @type {string} */
                        queue[w] = "falsesel";
                        return;
                    }
                    asserterNames.forEach(function(dataAndEvents, fix) {
                        if (dataAndEvents) {
                            add(types.item(fix));
                        }
                    });
                    done(li);
                }
            }
            var $next = W("#fileListHead");
            if ($next.hasClass("active")) {
                $next.removeClass("active");
            }
            yunpn.cmdCenter.updateStatus();
            ev.stopPropagation();
        }
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var handler = function(event) {
        var parent = W(this).parentNode("li");
        if (W(parent).hasClass("active")) {
            add(parent);
            W("#fileListHead").removeClass("active");
        } else {
            done(parent);
        }
        yunpn.cmdCenter.updateStatus();
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var mouseDown = function(event) {
        var $next = W("#fileListHead");
        if ($next.hasClass("active")) {
            fn();
            $next.removeClass("active");
        } else {
            leave();
            $next.addClass("active");
        }
        event.stopPropagation();
    };
    /**
     * @param {?} data
     * @return {undefined}
     */
    var listener = function(data) {
        if (!this.oProxy.offsetWidth) {
            return;
        }
        var r20 = QW.NodeH.getRect(this.oProxy);
        if (!user) {
            /** @type {Array} */
            user = [];
            /** @type {number} */
            var type = 0;
            for (;type < i;type++) {
                var url = types[type];
                if (!url) {
                    continue;
                }
                user[type] = QW.NodeH.getRect(url);
            }
        }
        /** @type {number} */
        type = 0;
        for (;type < i;type++) {
            url = types.item(type);
            var gen = user[type];
            if (!url || !gen) {
                continue;
            }
            if (QW.DomU.rectIntersect(gen, r20)) {
                done(url);
            } else {
                add(url);
            }
        }
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var clickHandler = function(event) {
        event.preventDefault();
        yunpn.cmdCenter.changeListSort(W(this).attr("data-field"));
    };
    /**
     * @return {undefined}
     */
    var _init = function() {
        try {
            if (!QW.Browser.ie6) {
                /** @type {function (): ?} */
                var addAll = Date.now ? function() {
                    return Date.now();
                } : function() {
                    return+new Date;
                };
                max = addAll();
                if (max - min < 100) {
                    return;
                }
            }
        } catch (ex) {
            throw new Error("DragMove: fDragMove time2 time1 " + ex.message);
        }
        try {
            var gui = this;
            var path = W(gui.oProxy).query("p");
            /** @type {string} */
            gui.oProxy.style.display = "block";
            path.hide();
            var bounds = QW.NodeH.getRect(gui.oProxy);
            W(gui.oProxy).css({
                left : bounds.left + pos.X + 5 + "px",
                top : bounds.top + pos.Y + 10 + "px",
                width : "64px",
                height : "64px"
            });
            bounds.left = bounds.left + pos.X;
            bounds.top = bounds.top + pos.Y;
            var quat = yunpn.filelist.listtype;
            if (!user || dest != quat) {
                dest = quat;
                /** @type {Array} */
                user = [];
                /** @type {number} */
                var type = 0;
                for (;type < i;type++) {
                    var node = types[type];
                    if (!node) {
                        continue;
                    }
                    user[type] = QW.NodeH.getRect(node);
                }
            }
            /** @type {number} */
            type = 0;
            for (;type < i;type++) {
                node = types.item(type);
                var self = user[type];
                var divSpan = node.query("span.ico");
                var l = !node.hasClass("active") && (divSpan.hasClass("ico-folder") || (divSpan.hasClass("ico-picturefolder") || (divSpan.hasClass("ico-musicfolder") || (divSpan.hasClass("ico-documentfolder") || (divSpan.hasClass("ico-videofolder") || (divSpan.hasClass("ico-bookfolder") || (divSpan.hasClass("ico-fromchromefolder") || divSpan.hasClass("ico-fromphonefolder"))))))));
                if (!node || !self) {
                    continue;
                }
                /** @type {function (): undefined} */
                var requestAnimationFrame = yunpn.filelist.listtype == "2" ? function() {
                    if (self.left <= bounds.left && (self.top <= bounds.top && (bounds.left + 32 <= self.right && bounds.top + 32 <= self.bottom))) {
                        if (l) {
                            node.addClass("move");
                            path.html("\u79fb\u52a8\u5230\u201c" + node.attr("data-title").subByte("7", "...") + "\u201d").show();
                            el = node;
                        }
                    } else {
                        node.removeClass("move");
                    }
                } : function() {
                    if (self.left <= bounds.left && (self.top + 3 <= bounds.top && (bounds.left <= self.right && bounds.top + 3 <= self.bottom))) {
                        if (l) {
                            node.addClass("move");
                            path.html("\u79fb\u52a8\u5230 \u201c" + node.attr("data-title").subByte("7", "...") + "\u201d ").show();
                            el = node;
                        }
                    } else {
                        node.removeClass("move");
                    }
                };
                requestAnimationFrame();
            }
        } catch (er) {
            throw new Error("DragMove: fDragMove" + er.message);
        }
    };
    /**
     * @param {?} allBindingsAccessor
     * @return {undefined}
     */
    var init = function(allBindingsAccessor) {
        try {
            /** @type {string} */
            this.oProxy.style.display = "none";
            if (!el) {
                return;
            }
            if (el.hasClass("active") || !el.hasClass("move")) {
                return;
            }
            var data_files = el.attr("data-path");
            var dst_nid = el.attr("data-nid");
            /** @type {Array} */
            var out = [];
            /** @type {Array} */
            var ret = [];
            var asserterNames = yunpn.fo.getSelectFile();
            asserterNames.forEach(function(image) {
                var copies = image.attr("data-path");
                out.push(copies);
                ret.push(image.attr("data-nid"));
            });
            /** @type {string} */
            var show = '"' + el.attr("data-title").subByte("20", "...") + '"';
            yunpn.tips.show();
            var batchParam;
            var css;
            if (yunpn.filelist.curFunc == "file") {
                /** @type {string} */
                batchParam = "path[]";
                /** @type {Array} */
                css = out;
                paramsPost = {
                    newpath : data_files
                };
            } else {
                /** @type {string} */
                batchParam = "nids[]";
                /** @type {Array} */
                css = ret;
                paramsPost = {
                    dst_nid : dst_nid
                };
            }
            yunpn.BatchRequest.create({
                url : yunpn.config.url.move,
                batchParam : batchParam,
                data : css,
                params : paramsPost,
                /**
                 * @param {string} _xhr
                 * @return {undefined}
                 */
                batchSuccess : function(_xhr) {
                    var err = _xhr.evalExp();
                    if (err.errno != 0) {
                        yunpn.BatchRequest.terminate();
                        yunpn.tips.hide();
                        $.alert(err.errmsg, {
                            type : "error"
                        });
                        el.removeClass("move");
                    } else {
                        yunpn.tips.show("\u6210\u529f\u79fb\u52a8\u5230" + show, false, true);
                        W("#topTips .close").on("click", function() {
                            W("#topTips").fadeOut(300);
                        });
                    }
                },
                /**
                 * @return {undefined}
                 */
                success : function() {
                    yunpn.tips.show("\u6210\u529f\u79fb\u52a8\u5230" + show, false, true);
                    W("#topTips .close").on("click", function() {
                        W("#topTips").fadeOut(300);
                    });
                    if (yunpn.filelist.curFunc == "file") {
                        /** @type {boolean} */
                        yunpn.ytree.isFolderChanged = true;
                    } else {
                        /** @type {boolean} */
                        yunpn.ytreeSfile.isFolderChanged = true;
                    }
                    try {
                        asserterNames.forEach(function(element) {
                            element.removeNode();
                        });
                    } catch (e) {
                    }
                    yunpn.fo.initFileIndex();
                    if (yunpn.fo.getFileNum() < 1) {
                        if (yunpn.filelist.page > 0) {
                            /** @type {number} */
                            yunpn.filelist.page = yunpn.filelist.page - 1;
                        }
                    }
                    yunpn.filelist.list();
                    /** @type {null} */
                    el = null;
                }
            });
        } catch (ex) {
            throw new Error("DragMove: fDragEnd" + ex.message);
        }
    };
    /**
     * @param {?} e
     * @return {undefined}
     */
    var esp = function(e) {
        e.stopPropagation();
        var suiteView = W(this).parentNode("li");
        fn();
        done(suiteView);
        yunpn.cmdCenter.updateStatus();
        yunpn.cmdCenter.openItem(suiteView);
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var stop = function(event) {
        event.stopPropagation();
        var suiteView = W(this).parentNode("li");
        fn();
        done(suiteView);
        yunpn.cmdCenter.updateStatus();
        yunpn.cmdCenter.openItem(suiteView);
    };
    /**
     * @param {?} __
     * @return {undefined}
     */
    var callback = function(__) {
        var el = W(this).parentNode("li");
        fn();
        done(el);
        yunpn.cmdCenter.updateStatus();
        if (el.attr("data-type") == "folder") {
            yunpn.cmdCenter.packDownloadItem();
        } else {
            yunpn.cmdCenter.downloadItem(el);
        }
    };
    /**
     * @param {?} a
     * @return {undefined}
     */
    var ok = function(a) {
        var titles = W(this).parentNode("li");
        fn();
        done(titles);
        yunpn.cmdCenter.updateStatus();
        yunpn.cmdCenter.delItem();
    };
    /**
     * @param {?} stats
     * @return {undefined}
     */
    var cb = function(stats) {
        var suiteView = W(this).parentNode("li");
        fn();
        done(suiteView);
        yunpn.cmdCenter.updateStatus();
        if (yunpn.filelist.curFunc != "recycle") {
            yunpn.cmdCenter.openItem(suiteView);
        }
    };
    /**
     * @param {Object} data
     * @return {undefined}
     */
    var delegate = function(data) {
        render(data, W(this));
    };
    return{
        /** @type {function (?): undefined} */
        init : Init,
        /** @type {function (?): undefined} */
        setDisplayType : isA_,
        /** @type {function (): undefined} */
        initFileIndex : initialize,
        /**
         * @return {?}
         */
        getSelArr : function() {
            return queue;
        },
        /** @type {function ((Object|boolean|number|string)): ?} */
        getSelectFile : report,
        /** @type {function (): ?} */
        getAllFile : makeArray,
        /** @type {function (?): undefined} */
        unSelectFile : add,
        /** @type {function (): undefined} */
        selectAllFile : leave,
        /** @type {function (): undefined} */
        unSelectAllFile : fn,
        /** @type {function (?, ?): undefined} */
        selectFile : done,
        /**
         * @return {?}
         */
        getFileNum : function() {
            return i;
        }
    };
}()), yunpn.fo = ObjectH.mix(yunpn.fo || {}, function() {
    /**
     * @param {string} path
     * @return {?}
     */
    function load(path) {
        /** @type {null} */
        var resultCallback = null;
        path = path.trim();
        if (path == "") {
            /** @type {string} */
            resultCallback = "\u6587\u4ef6\u5939\u7684\u540d\u5b57\u4e0d\u80fd\u4e3a\u7a7a\uff01";
        } else {
            if (/[\\\/\:\*\?\"<>|]+/.test(path)) {
                /** @type {string} */
                resultCallback = '\u4e0d\u80fd\u5305\u542b\\ / : * ? " < > |';
            } else {
                if (/^\./.test(path)) {
                    /** @type {string} */
                    resultCallback = "\u4e0d\u80fd\u521b\u5efa.\u5f00\u5934\u7684\u6587\u4ef6\u5939";
                } else {
                    if (yunpn.filelist.path === "/") {
                        if ("\u4e91\u540c\u6b65" === path) {
                            /** @type {string} */
                            resultCallback = '"\u4e91\u540c\u6b65"\u662f\u7cfb\u7edf\u76ee\u5f55\uff0c\u8bf7\u4f7f\u7528\u5176\u4ed6\u540d\u5b57\u521b\u5efa\u76ee\u5f55\uff01';
                        }
                    }
                }
            }
        }
        if (resultCallback) {
            if (c) {
                return;
            }
            return window.setTimeout(function() {
                /** @type {boolean} */
                c = true;
                var e = $.alert(resultCallback, {
                    type : "error",
                    /**
                     * @return {undefined}
                     */
                    close : function() {
                        /** @type {boolean} */
                        c = false;
                        if (yunpn.filelist.listtype == last) {
                            setTimeout(function() {
                                W("#list .new-folder input").focus()[0].select();
                            }, 100);
                        } else {
                            setTimeout(function() {
                                W("#list .new-folder textarea").focus()[0].select();
                            }, 100);
                        }
                    }
                });
            }, 10), true;
        }
        /** @type {string} */
        var m = yunpn.filelist.path + path + "/";
        yunpn.tips.show();
        Ajax.post(yunpn.config.url.mkdir, {
            path : m
        }, function(err) {
            err = err.evalExp();
            if (err.errno) {
                yunpn.tips.hide();
                if (err["errno"] == 3005) {
                    /** @type {string} */
                    err.errmsg = "\u5df2\u5b58\u5728\u76f8\u540c\u6587\u4ef6\u540d\uff01";
                } else {
                    /** @type {boolean} */
                    isloading = false;
                }
                $.alert(err.errmsg, {
                    type : "warning"
                });
            } else {
                W("#list .new-folder input,#list .new-folder textarea").un("blur", callback).un("keydown", handler);
                W("#list .new-folder").removeNode();
                /** @type {boolean} */
                isloading = false;
                yunpn.tips.show("\u6587\u4ef6\u5939\u521b\u5efa\u6210\u529f\uff01");
                /** @type {string} */
                yunpn.filelist.lastdir = m;
                yunpn.filelist.list();
                /** @type {boolean} */
                yunpn.ytree.isFolderChanged = true;
                /** @type {boolean} */
                yunpn.ytreeSfile.isFolderChanged = true;
                /** @type {boolean} */
                yunpn.ytreeSfileTofile.isFolderChanged = true;
            }
        });
    }
    /**
     * @param {(Function|string)} value
     * @return {undefined}
     */
    function callback(value) {
        value = this.value;
        load(value);
    }
    /**
     * @return {?}
     */
    function init() {
        if (yunpn.filelist.isloading || isloading) {
            return false;
        }
        yunpn.fo.unSelectAllFile();
        /** @type {boolean} */
        isloading = true;
        i = yunpn.filelist.listtype;
        W("#emptyTips").hide();
        W("#list").removeClass("none-user-select");
        var asserterNames = yunpn.fo.getAllFile();
        /** @type {Array} */
        var adown = [];
        /** @type {number} */
        var s = 1;
        /** @type {string} */
        var bup = "\u65b0\u5efa\u6587\u4ef6\u5939";
        asserterNames.forEach(function(button) {
            adown.push(button.attr("data-title"));
        });
        for (;adown.contains(bup);) {
            /** @type {string} */
            bup = "\u65b0\u5efa\u6587\u4ef6\u5939(" + s++ + ")";
        }
        var tile;
        var h;
        /** @type {string} */
        tile = ['<li data-type="folder" class="row filelist-item new-folder clearfix">', '<div class="column column-checkbox">', "<label></label>", "</div>", '<div class="column column-name">', '<span class="ico ico-folder"></span>', '<input maxlength="188" type="text" value="' + bup + '" />', "<textarea>" + bup + "</textarea>", "</div>", '<div class="column column-size">&nbsp;</div>', '<div class="column column-time">&nbsp;</div>', "</li>"].join("");
        if (W("#list li").length <= 0) {
            /** @type {string} */
            W("#list")[0].innerHTML = '<li style="display:none;">throw away my television!</li>';
            W("#list li").removeNode();
        }
        afterbegin = W(tile).insertTo("afterbegin", W("#list")[0]);
        W("#list .new-folder input,#list .new-folder textarea").on("blur", callback).on("keydown", handler);
        setTimeout(function() {
            var submenu;
            if (i == last) {
                submenu = W("#list .new-folder input");
            } else {
                submenu = W("#list .new-folder textarea");
            }
            submenu.focus()[0].select();
        }, 100);
        var chart = W("#list textarea");
        /** @type {function (?): undefined} */
        chart[0].oninput = update;
        /** @type {function (?): undefined} */
        chart[0].onpropertychange = update;
        chart.on("contextmenu", function(event) {
            event.stopPropagation();
        });
    }
    /**
     * @param {?} allBindingsAccessor
     * @return {undefined}
     */
    function update(allBindingsAccessor) {
        var context = W("#list textarea");
        if (context.length <= 0) {
            return;
        }
        var isFunction = context.get("value");
        var part = W("body .folder-name-ruler");
        var w;
        var s;
        var h;
        part = part.length > 0 ? part : W('<div class="folder-name-ruler"></div>').insertTo("beforeend", document.body);
        part.html(isFunction.encode4Html().replace(/ /g, "&nbsp;"));
        w = part.getSize();
        h = w.height;
        h = h > 32 ? h + 16 : 32;
        context.setStyle("height", h + "px");
    }
    /**
     * @param {Event} event
     * @return {undefined}
     */
    function handler(event) {
        var code = event.keyCode;
        var shiftPressed = event.shiftKey;
        update();
        if (code == 191 || (code == 220 || shiftPressed && (code == 56 || (code == 59 || (code == 188 || (code == 190 || code == 222)))))) {
            event.preventDefault();
        }
        if (code == 13) {
            this.blur();
            event.stopPropagation();
        }
    }
    /**
     * @return {undefined}
     */
    function focus() {
        if (yunpn.filelist.listtype == last) {
            W("#list .new-folder textarea").val(W("#list .new-folder input").val());
            setTimeout(function() {
                var submenu = W("#list .new-folder textarea");
                if (submenu.length > 0) {
                    submenu.focus()[0].select();
                }
            }, 100);
        } else {
            W("#list .new-folder input").val(W("#list .new-folder textarea").val());
            setTimeout(function() {
                var submenu = W("#list .new-folder input");
                if (submenu.length > 0) {
                    submenu.focus()[0].select();
                }
            }, 100);
        }
    }
    var i;
    /** @type {number} */
    var last = 1;
    /** @type {number} */
    var a = 2;
    var afterbegin;
    /** @type {boolean} */
    var isloading = false;
    /** @type {boolean} */
    var c = false;
    return{
        /** @type {function (): ?} */
        createFolder : init,
        /** @type {function (): undefined} */
        changeListType : focus
    };
}()), namespace("yunpn.fileType"), yunpn.fileType = ObjectH.mix(yunpn.fileType, function() {
    /**
     * @param {string} pattern
     * @return {?}
     */
    function next(pattern) {
        var last_index = pattern.lastIndexOf(".");
        if (last_index < 0) {
            return "file";
        }
        var headBuffer = pattern.substr(last_index);
        return headBuffer.length < 2 ? "file" : (ext = headBuffer.substr(1).toLowerCase(), ext);
    }
    /**
     * @param {string} elem
     * @return {?}
     */
    function first(elem) {
        var $next = next(elem);
        return HEAP[$next] ? HEAP[$next] : "file";
    }
    /**
     * @param {string} elem
     * @return {?}
     */
    function empty(elem) {
        var $next = next(elem);
        return HEAP[$next] ? HEAP[$next] : "file";
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function getType(str) {
        /** @type {string} */
        var newFile = "file";
        var p = str.lastIndexOf(".");
        if (p < 0) {
            /** @type {string} */
            newFile = "file";
        }
        var basename = str.substr(p);
        if (basename.length < 2) {
            /** @type {string} */
            newFile = "file";
        }
        newFile = basename.substr(1).toLowerCase();
        switch(newFile) {
            case "doc":
                ;
            case "docx":
                ;
            case "docm":
                ;
            case "dotx":
                ;
            case "dotm":
                ;
            case "dot":
                ;
            case "rtf":
                return "Word\u6587\u6863";
            case "xlsx":
                ;
            case "xls":
                ;
            case "csv":
                ;
            case "xlsm":
                ;
            case "xlsb":
                return "Excel\u8868\u683c";
            case "ppt":
                ;
            case "pptx":
                ;
            case "pptm":
                ;
            case "potx":
                ;
            case "pot":
                ;
            case "potm":
                return "PPT\u6f14\u793a\u7a3f";
            case "pdf":
                ;
            case "fdf":
                return "PDF\u6587\u4ef6";
            case "markdown":
                ;
            case "mdown":
                ;
            case "mkdn":
                ;
            case "md":
                ;
            case "txt":
                return "\u6587\u672c\u6587\u4ef6";
            case "bmp":
                ;
            case "gif":
                ;
            case "jpg":
                ;
            case "jpeg":
                ;
            case "png":
                ;
            case "psd":
                ;
            case "cdr":
                ;
            case "ico":
                ;
            case "tif":
                ;
            case "tiff":
                ;
            case "tga":
                ;
            case "raw":
                return "\u56fe\u7247";
            case "mp3":
                ;
            case "wma":
                ;
            case "wav":
                ;
            case "aac":
                ;
            case "ape":
                ;
            case "mid":
                ;
            case "mod":
                ;
            case "cd":
                ;
            case "asf":
                ;
            case "arm":
                ;
            case "ram":
                ;
            case "m4a":
                ;
            case "ogg":
                ;
            case "aif":
                ;
            case "aifc":
                ;
            case "amr":
                return "\u97f3\u4e50";
            case "avi":
                ;
            case "rm":
                ;
            case "rmvb":
                ;
            case "wmv":
                ;
            case "mpg":
                ;
            case "mpeg":
                ;
            case "mkv":
                ;
            case "flv":
                ;
            case "dat":
                ;
            case "scm":
                ;
            case "mov":
                ;
            case "3g2":
                ;
            case "3gp":
                ;
            case "3gp2":
                ;
            case "3gpp":
                ;
            case "mp4":
                ;
            case "amv":
                ;
            case "csf":
                ;
            case "ivf":
                ;
            case "mts":
                ;
            case "swf":
                ;
            case "webm":
                return "\u89c6\u9891";
            case "exe":
                ;
            case "msi":
                ;
            case "bat":
                return "\u5e94\u7528\u7a0b\u5e8f";
            case "apk":
                ;
            case "ipa":
                return "\u624b\u673a\u5e94\u7528";
            case "rar":
                ;
            case "zip":
                ;
            case "jar":
                ;
            case "iso":
                ;
            case "cab":
                ;
            case "lha":
                ;
            case "bh":
                ;
            case "tar":
                ;
            case "lzh":
                ;
            case "7z":
                ;
            case "gz":
                ;
            case "gzip":
                ;
            case "bar":
                ;
            case "zipx":
                ;
            case "bz2":
                return "\u538b\u7f29\u6587\u4ef6";
            case "url":
                return "Internet \u5feb\u6377\u65b9\u5f0f";
            case "xml":
                ;
            case "html":
                ;
            case "htm":
                ;
            case "php":
                ;
            case "c":
                ;
            case "cs":
                ;
            case "cpp":
                ;
            case "java":
                return "\u4ee3\u7801\u6587\u4ef6";
            default:
                return "\u672a\u77e5\u6587\u4ef6";
        }
    }
    var HEAP = {
        bmp : "bmp",
        gif : "gif",
        jpg : "jpg",
        jpeg : "jpg",
        png : "png",
        psd : "psd",
        cdr : "cdr",
        ico : "ico",
        ai : "ai",
        txt : "txt",
        log : "log",
        pdf : "pdf",
        fdf : "pdf",
        mp3 : "mp3",
        wma : "wma",
        wav : "wav",
        ape : "ape",
        mov : "mov",
        mp4 : "mp4",
        rmvb : "rmvb",
        wmv : "wmv",
        rm : "rm",
        mpg : "mpg",
        avi : "avi",
        flv : "flv",
        mpeg : "mpeg",
        mkv : "mkv",
        webm : "webm",
        swf : "swf",
        fla : "fla",
        html : "html",
        htm : "htm",
        mht : "mht",
        xml : "xml",
        doc : "doc",
        docx : "doc",
        docm : "doc",
        dotx : "doc",
        dotm : "doc",
        dot : "doc",
        rtf : "doc",
        ppt : "ppt",
        pptx : "ppt",
        pptm : "ppt",
        potx : "ppt",
        pot : "ppt",
        potm : "ppt",
        xls : "xls",
        xlsx : "xls",
        csv : "xls",
        xlsm : "xls",
        xlsb : "xls",
        mdb : "access",
        rar : "rar",
        zip : "zip",
        iso : "iso",
        cab : "cab",
        "7z" : "7z",
        c : "c",
        cs : "cs",
        cpp : "cpp",
        java : "java",
        php : "php",
        url : "url",
        apk : "apk",
        torrent : "bt",
        ququ : "ququ"
    };
    return{
        /** @type {function (string): ?} */
        getSuffix : next,
        /** @type {function (string): ?} */
        getType : first,
        /** @type {function (string): ?} */
        getTypeDesc : getType,
        /** @type {function (string): ?} */
        getTypeIcon : empty
    };
}()), window.yunpn.filelist = function() {
    var pdataCur = W("#listHolder");
    /** @type {null} */
    var results = null;
    /** @type {null} */
    var anim = null;
    /** @type {number} */
    var type = 300;
    return{
        specialFolder : {
            "/\u624b\u673a\u76f8\u518c/" : {
                field : "mtime",
                order : "desc"
            },
            "/camera/" : {
                field : "mtime",
                order : "desc"
            },
            "/100media/" : {
                field : "mtime",
                order : "desc"
            },
            "/100andro/" : {
                field : "mtime",
                order : "desc"
            },
            "/\u56fe\u7247/\u624b\u673a\u76f8\u518c/" : {
                field : "mtime",
                order : "desc"
            },
            "/\u56fe\u7247/\u62cd\u7167\u76f8\u518c/" : {
                field : "mtime",
                order : "desc"
            },
            "/\u56fe\u7247/camera/" : {
                field : "mtime",
                order : "desc"
            },
            "/\u6765\u81ea-\u7f51\u9875\u5feb\u5b58/" : {
                field : "mtime",
                order : "desc"
            }
        },
        listtype : yunpn.Storage.get("yunpn_LISTTYPE") == "1" ? 1 : 2,
        shareListtype : 1,
        path : "",
        nid : 0,
        page : 0,
        nav : [],
        order : "asc",
        order_field : "name",
        isloading : false,
        curFunc : "file",
        order_recycle : "desc",
        order_field_recycle : "mtime",
        order_link : "desc",
        order_field_link : "mtime",
        sFileState : 0,
        recyclePass : false,
        /**
         * @return {undefined}
         */
        initLoadingMask : function() {
            /** @type {string} */
            var tile = ['<div id="loadingMask">', "<div></div>", "<span>\u52a0\u8f7d\u6587\u4ef6\u5217\u8868\u4e2d...</span>", "</div>"].join("");
            this.loadingMask = W(tile).insertTo("beforeend", W("#mainPanel"));
        },
        /**
         * @return {undefined}
         */
        resizeHolder : function() {
            var elem = W("#fileListMain");
            var svg = W("#listHolder");
            var surface = W("#listHolder .page-nav");
            /** @type {number} */
            var height = Dom.getDocRect().height - elem.getRect().top;
            var sorted = W("#list");
            elem.css("height", height + "px");
            if (sorted.length > 0) {
                var maxHeight = sorted.getRect().height;
                if (surface.length > 0) {
                    if (height - surface.getRect().height > maxHeight) {
                        height -= surface.getRect().height;
                    }
                }
                if (height < maxHeight) {
                    height = maxHeight;
                }
                svg.css("height", height + "px");
            }
            var body = W("#fileListHead");
            var tmp = body.getRect();
            if (tmp.width > 0) {
                /** @type {number} */
                var bodyHeight = tmp.width + parseInt(body.css("margin-right")) - svg.getRect().width;
                body.css("margin-right", bodyHeight + "px");
            }
        },
        /**
         * @return {undefined}
         */
        showLoadingMask : function() {
            setTimeout(function() {
                if (yunpn.filelist.isloading) {
                    if (!yunpn.filelist.loadingMask) {
                        yunpn.filelist.initLoadingMask();
                    }
                    var el = yunpn.filelist.loadingMask;
                    if (el.css("display") != "none") {
                        return;
                    }
                    el.setStyle({
                        display : "block"
                    });
                    if (Browser.ie && Browser.ie == 6) {
                        var borderBox = W("#mainPanel").getRect();
                        var borderBoxSize = Dom.getDocRect();
                        /** @type {number} */
                        var sf_width = borderBoxSize.width - borderBox.left;
                        /** @type {number} */
                        var imageHeight = borderBoxSize.height - borderBox.top;
                        el.setStyle({
                            width : sf_width + "px",
                            height : imageHeight + "px"
                        });
                    }
                    anim = new ElAnim("loadingMask", {
                        opacity : {
                            to : 1,
                            from : 0
                        }
                    }, 300, QW.Easing.easeBothStrong);
                    anim.play();
                }
            }, 500);
        },
        /**
         * @return {undefined}
         */
        hideLoadingMask : function() {
            if (!this.loadingMask) {
                this.initLoadingMask();
            }
            if (anim) {
                anim.end();
            }
            anim = new ElAnim("loadingMask", {
                opacity : {
                    to : 0,
                    from : 1
                }
            }, 300, QW.Easing.easeBothStrong);
            /**
             * @return {undefined}
             */
            anim.onend = function() {
                W("#loadingMask").setStyle("display", "none");
                /** @type {null} */
                anim = null;
            };
            anim.play();
        },
        /**
         * @return {undefined}
         */
        cancelListAjax : function() {
            if (results) {
                results.cancel();
            }
            /** @type {boolean} */
            yunpn.filelist.isloading = false;
            yunpn.filelist.hideLoadingMask();
        },
        /**
         * @param {string} mayParseLabeledStatementInstead
         * @param {number} recurring
         * @param {number} value
         * @param {Array} callback
         * @param {Object} deepDataAndEvents
         * @param {?} req
         * @param {boolean} target
         * @return {?}
         */
        list : function(mayParseLabeledStatementInstead, recurring, value, callback, deepDataAndEvents, req, target) {
            W("#listHolder").html("");
            W("#fileListHistory").hide();
            if (results) {
                results.cancel();
            }
            if (SYS_CONF.token != Cookie.get("token", "")) {
                return location.reload(), false;
            }
            if (mayParseLabeledStatementInstead) {
                /** @type {string} */
                this.path = mayParseLabeledStatementInstead;
            }
            if (recurring || recurring == 0) {
                /** @type {number} */
                this.nid = recurring;
            }
            if (typeof value == "undefined") {
                value = this.page;
            } else {
                /** @type {number} */
                value = parseInt(value || 0);
            }
            if (this.curFunc == "file" || (this.curFunc == "sFile" || this.curFunc == "link")) {
                /** @type {number} */
                this.page = value;
            }
            try {
                yunpn.envSwitch.show("filelist");
            } catch (l) {
            }
            /** @type {string} */
            var options = "";
            var data = {
                type : this.curFunc == "link" ? this.shareListtype : this.listtype,
                t : Math.random()
            };
            var order = this.order;
            var key = this.order_field;
            if (this.specialFolder[this.path.toLowerCase()]) {
                var params = this.specialFolder[this.path.toLowerCase()];
                key = params.field || "mtime";
                order = params.order || "desc";
            }
            var args = {
                recycle : {
                    name : "file_name",
                    fsize : "file_size",
                    mtime : "mtime"
                },
                file : {
                    name : "file_name",
                    fsize : "file_size",
                    mtime : "server_time",
                    fmtime : "fmtime"
                },
                link : {
                    name : "name",
                    fsize : "fsize",
                    mtime : "mtime"
                },
                sFile : {
                    name : "file_name",
                    fsize : "file_size",
                    mtime : "server_time",
                    fmtime : "fmtime"
                }
            };
            if (this.curFunc == "link") {
                data.skey = args.link[this.order_field_link];
                if (this.order_link == "desc") {
                    /** @type {string} */
                    data.isdesc = "1";
                } else {
                    /** @type {string} */
                    data.isdesc = "0";
                }
            } else {
                if (this.curFunc == "recycle") {
                    data.order = this.order_recycle;
                    data.field = args.recycle[this.order_field_recycle];
                } else {
                    data.order = order;
                    data.field = args[this.curFunc][key];
                }
            }
            if (this.curFunc != "recycle") {
                /** @type {string} */
                this.order_recycle = "desc";
                /** @type {string} */
                this.order_field_recycle = "mtime";
            }
            var nodes = target == undefined ? false : target;
            if (nodes && this.curFunc == "file") {
                /** @type {Array} */
                yunpn.filelist.nav = [];
                var parts = this.path.substring(1, this.path.length - 1).split("/");
                /** @type {string} */
                var filename = "";
                if (parts[0] != "") {
                    /** @type {number} */
                    var i = 0;
                    for (;i < parts.length;i++) {
                        filename += parts[i] + "/";
                        yunpn.filelist.nav.push({
                            title : parts[i],
                            nid : 0,
                            path : "/" + filename
                        });
                    }
                }
            }
            switch(this.curFunc) {
                case "recycle":
                    /** @type {string} */
                    options = "/file/getrecoverlist";
                    /** @type {number} */
                    data.start = typeof value != "number" ? 0 : value;
                    break;
                case "link":
                    /** @type {string} */
                    options = "/share/listLink";
                    data.page = this.page;
                    /** @type {number} */
                    data.page_size = type;
                    break;
                case "sFile":
                    /** @type {string} */
                    options = "/sFile/list";
                    data.path = this.path;
                    data.nid = this.nid;
                    data.page = this.page;
                    /** @type {number} */
                    data.page_size = type;
                    if (this.lastdir) {
                        data.lastdir = this.lastdir;
                        /** @type {null} */
                        this.lastdir = null;
                    }
                    break;
                default:
                    /** @type {string} */
                    options = "/file/list";
                    data.path = this.path;
                    data.page = this.page;
                    /** @type {number} */
                    data.page_size = type;
                    if (this.lastdir) {
                        data.lastdir = this.lastdir;
                        /** @type {null} */
                        this.lastdir = null;
                    }
                    ;
            }
            if (!req) {
                /** @type {number} */
                document.getElementById("fileListMain").scrollTop = 0;
            }
            yunpn.cmdCenter.updateSortStatus();
            /** @type {boolean} */
            this.isloading = true;
            this.showLoadingMask();
            /** @type {Date} */
            var b = new Date;
            yunpn.config.init(this.curFunc);
            results = Ajax.post(options, data, function(whitespace) {
                /** @type {Date} */
                var a = new Date;
                /** @type {boolean} */
                yunpn.filelist.isloading = false;
                yunpn.filelist.hideLoadingMask();
                /** @type {null} */
                results = null;
                if (!whitespace) {
                    return;
                }
                if (whitespace.indexOf("LOGIN_FLAG") > -1 || yunpn.filelist.curFunc == "link") {
                    var fix = whitespace.evalExp();
                    if (fix.errno == "3022" || fix.errno == "3008") {
                        $.alert("\u6587\u4ef6\u5939\u8def\u5f84\u4e0d\u5b58\u5728\uff01", {
                            type : "warning"
                        });
                        return;
                    }
                    if (fix.errno == "3021") {
                        $.alert("\u6587\u4ef6\u5939\u8def\u5f84\u592a\u957f\u4e86\uff0c\u8bf7\u4fee\u6539\uff01", {
                            type : "warning"
                        });
                        return;
                    }
                    if (yunpn.filelist.curFunc == "sFile") {
                        W(".real-search-bar").hide();
                        if (fix.errno == "31203") {
                            /** @type {number} */
                            yunpn.filelist.sFileState = 0;
                            W("#leftPanel .sFile").addClass("current").removeClass("current-lock");
                            W("#toolbar").hide();
                            W("#crumb").hide();
                            W("#fileListHead").hide();
                            W("#fileListMain").css("height", Dom.getDocRect().height - W("#fileListMain").getXY()[1] + "px");
                            W("#listHolder").css("height", "auto");
                            W("#search").hide();
                            require([rPathConfig.authority], function(dataAndEvents) {
                                dataAndEvents.openSfile();
                            });
                            return;
                        }
                        if (fix.errno == "1003") {
                            /** @type {number} */
                            yunpn.filelist.sFileState = 0;
                            W("#leftPanel .sFile").addClass("current").removeClass("current-lock");
                            W("#toolbar").hide();
                            W("#crumb").hide();
                            W("#fileListHead").hide();
                            W("#fileListMain").css("height", Dom.getDocRect().height - W("#fileListMain").getXY()[1] + "px");
                            W("#listHolder").css("height", "auto");
                            W("#search").hide();
                            require([rPathConfig.authority], function(dataAndEvents) {
                                dataAndEvents.enterSfile();
                            });
                            return;
                        }
                        /** @type {number} */
                        yunpn.filelist.sFileState = 1;
                        W("#leftPanel .sFile").addClass("current-lock").removeClass("current");
                    }
                    if (yunpn.filelist.curFunc == "recycle") {
                        W(".real-search-bar").hide();
                        if (fix.errno == "1003") {
                            /** @type {boolean} */
                            yunpn.filelist.recyclePass = true;
                            yunpn.cmdCenter.updateRBStatus();
                            W("#toolbar").hide();
                            W("#crumb").hide();
                            W("#fileListHead").hide();
                            W("#fileListMain").css("height", Dom.getDocRect().height - W("#mainPanel").getXY()[1] + "px");
                            W("#listHolder").css("height", "auto");
                            W("#search").hide();
                            require([rPathConfig.authority], function(dataAndEvents) {
                                dataAndEvents.enterRecycle();
                            });
                            return;
                        }
                        /** @type {boolean} */
                        yunpn.filelist.recyclePass = false;
                    }
                    var fontSize;
                    var _tmp;
                    if (yunpn.filelist.curFunc == "link") {
                        fontSize = fix.data.quotas.used.toString();
                        _tmp = fix.data.quotas.remain.toString();
                        var e = {};
                        e.data = fix.data.linklist;
                        e.hasNextPage = fix.data.pageinfo.has_next_page;
                        e.page = fix.data.pageinfo.page;
                        fix = e;
                        fix.data = fix.data || [];
                        fix.data.push({});
                    }
                    /** @type {Date} */
                    var min = new Date;
                    yunpn.filelist.html(fix, pdataCur);
                    var result = W("#list");
                    var fileListMain = W("#fileListMain");
                    W("#fileListHead").removeClass("active");
                    var d = W("#fileList");
                    if (!d.hasClass(yunpn.filelist.curFunc + "-tab")) {
                        d.removeClass(d.attr("data-tab")).addClass(yunpn.filelist.curFunc + "-tab").attr("data-tab", yunpn.filelist.curFunc + "-tab");
                    }
                    if (yunpn.filelist.curFunc == "link") {
                        var shareListtype = yunpn.filelist.shareListtype
                    } else {
                        shareListtype = yunpn.filelist.listtype;
                    }
                    if (shareListtype === 1) {
                        result.addClass("list-list");
                        result.removeClass("ico-list");
                        if (fix.data.length >= 1) {
                            W("#fileListHead").show();
                        } else {
                            W("#fileListHead").hide();
                        }
                    } else {
                        result.addClass("ico-list");
                        result.removeClass("list-list");
                        if (fix.data.length >= 1) {
                            W("#fileListHead").hide();
                            result.query(".p-columnCheck").hide();
                            result.query(".p-columnSize").hide();
                            result.query(".p-columnTime").hide();
                            if (yunpn.filelist.curFunc == "link") {
                                result.query(".p-columnHit").hide();
                                result.query(".p-columnCode").css("visibility", "hidden");
                            }
                        } else {
                            W("#fileListHead").hide();
                        }
                    }
                    yunpn.filelist.resizeHolder();
                    /** @type {Date} */
                    var max = new Date;
                    try {
                        monitor.tlog({
                            m : "wpo",
                            a : "20121224-fl-load",
                            n : a - b
                        });
                        monitor.tlog({
                            m : "wpo",
                            a : "20121224-fl-paint",
                            n : max - min,
                            n1 : fix.data.length
                        });
                    } catch (m) {
                    }
                    if (yunpn.filelist.curFunc == "link") {
                        W("#crumb").attr("data-used", fontSize).attr("data-remain", _tmp);
                        W("#list li.row").forEach(function(obj) {
                            var transport = W(obj).query(".pwd-on .copy-box");
                            var context = transport.query(".copy-pwd");
                            var r = W(obj).query(".code");
                            if (W(obj).attr("data-extract-status") == "1") {
                                if (!context.hasClass("clip-on")) {
                                    require([rPathConfig.Copy2Clipboard], function(fn) {
                                        fn(context[0], "/resource/module/pub/Copy2Clipboard/ZeroClipboard.swf", {
                                            listeners : {
                                                /**
                                                 * @param {?} dataAndEvents
                                                 * @return {undefined}
                                                 */
                                                aftercopy : function(dataAndEvents) {
                                                    monitor.clickLog("\u590d\u5236\u5206\u4eab\u5730\u5740");
                                                    if (dataAndEvents) {
                                                        yunpn.tips.show("\u63d0\u53d6\u7801\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f");
                                                    } else {
                                                        $.alert("\u62b1\u6b49\uff0c\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u91cc\u4e0d\u80fd\u81ea\u52a8\u590d\u5236\u5230\u526a\u8d34\u677f\uff0c\u8bf7\u5148\u5b89\u88c5flash\u3002", {
                                                            type : "warning"
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                    });
                                    context.addClass("clip-on");
                                }
                            }
                        });
                    }
                    yunpn.fo.init();
                    if (fix.data[0]) {
                        if (fix.data[0].lastdir) {
                            yunpn.fo.selectFile(W("#list >li:nth-of-type(1)"));
                            yunpn.cmdCenter.updateStatus();
                        }
                    }
                    try {
                        yunpn.Search.research();
                    } catch (m) {
                    }
                    yunpn.filelist.pageNav();
                    if (callback) {
                        if (typeof callback == "function") {
                            callback(fix);
                        }
                    }
                    yunpn.filelist.findItemByIndexAndName(deepDataAndEvents);
                } else {
                    pdataCur.html("");
                    $.alert("\u767b\u5f55\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01", {
                        type : "error",
                        /**
                         * @return {undefined}
                         */
                        fn : function() {
                            /** @type {string} */
                            location.href = "/";
                        }
                    });
                }
            });
        },
        /**
         * @param {Array} js
         * @return {undefined}
         */
        findItemByIndexAndName : function(js) {
            if (js) {
                if (typeof js == "string") {
                    var scriptNames = yunpn.fo.getAllFile();
                    /** @type {Array} */
                    var data = [];
                    /** @type {number} */
                    var j = 0;
                    var jl = scriptNames.length;
                    for (;j < jl;j++) {
                        if (scriptNames[j].attr("data-title") == js) {
                            data.push(parseInt(scriptNames[j].attr("f-index")));
                        }
                    }
                    /** @type {Array} */
                    js = data;
                }
                if (Object.isArray(js)) {
                    var onnm = W("#list .filelist-item");
                    /** @type {number} */
                    j = 0;
                    jl = js.length;
                    for (;j < jl;j++) {
                        var suiteView = onnm.item(js[j]);
                        yunpn.fo.selectFile(suiteView);
                    }
                    yunpn.cmdCenter.updateStatus();
                }
            }
        },
        /**
         * @return {undefined}
         */
        pageNav : function() {
            var $p = W("#fileList .page-nav");
            /** @type {string} */
            var disabled = "disabled";
            /** @type {string} */
            var NORMAL = "normal";
            /** @type {null} */
            yunpn.filelist.data_page = null;
            if (!$p.length) {
                return;
            }
            yunpn.filelist.data_page = $p.attr("data-page").split(",");
            $p.delegate("a", "click", function(dataAndEvents) {
                var viewElem = W(this);
                if (viewElem.hasClass(disabled)) {
                    return;
                }
                /** @type {number} */
                var state = parseInt(viewElem.attr("data-start"), 10);
                /** @type {string} */
                var path = "";
                /** @type {number} */
                var recurring = 0;
                var type = yunpn.filelist.curFunc;
                if (type == "file" || type == "sFile") {
                    path = yunpn.filelist.path;
                    recurring = yunpn.filelist.nid;
                }
                if (type == "recycle") {
                    /** @type {string} */
                    path = "recycleBin";
                }
                yunpn.filelist.list(path, recurring, isNaN(state) ? 0 : state);
            });
        },
        /**
         * @return {?}
         */
        showNotice : function() {
            return true;
        }
    };
}(), yunpn.filelist = ObjectH.mix(yunpn.filelist || {}, function() {
    /**
     * @param {?} data
     * @param {Object} value
     * @return {undefined}
     */
    function init(data, value) {
        /** @type {Array} */
        var fix = [];
        var selector;
        var done;
        var rgbToHex;
        var message = data.data;
        var type = yunpn.filelist.curFunc;
        var v = type == "link" ? yunpn.filelist.shareListtype : yunpn.filelist.listtype;
        var options;
        var setSize = yunpn.fileType.getTypeDesc;
        var extractFormat = yunpn.fileType.getType;
        var parseFloat = yunpn.fileType.getSuffix;
        /** @type {function (number, number, boolean): ?} */
        var appendQuery = yunpn.util.formatByte;
        /** @type {number} */
        message.length = message.length - 1;
        if (type == "file" || (type == "link" || type == "sFile")) {
            selector = (type == "file" || type == "sFile" ? expr : f).tmpl();
            done = view.tmpl();
        } else {
            selector = paths.tmpl();
            done = head.tmpl();
        }
        if (type == "link") {
            rgbToHex = utils.tmpl();
        } else {
            rgbToHex = context.tmpl();
        }
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var valuesLen = message.length;
        for (;i < valuesLen;i++) {
            options = message[i];
            if (options.name == "\u4e91\u540c\u6b65") {
                continue;
            }
            if (type == "file" || type == "sFile") {
                options.path = options.path.encode4HtmlValue();
            }
            if (type == "link") {
                options.date = options.create_time;
                options.oriName = options.name;
                options.oriSize = options.file_size;
                options.size = appendQuery(options.oriSize);
                options.path = options.fullpath;
                options.linkUrl = options.url;
                /** @type {boolean} */
                options.hasThumb = !!options.thumb;
                /** @type {string} */
                options.pwdCls = options.is_use_password ? "pwd-on" : "pwd-off";
                options.password1 = options.is_use_password ? options.password : "-";
                if (options.status != 0) {
                    /** @type {string} */
                    options.itemCls = "link-invalid";
                }
            }
            options.name = options.oriName.encode4Html();
            if (type == "link" && options.status != 0) {
                var str = options.oriName;
                if (key) {
                    str = options.oriName.subByte(40, "\u2026");
                }
                if (options.status == 10) {
                    /** @type {string} */
                    options.shortName = '<span class="audit-tag">\uff08\u5ba1\u6838\u4e2d\uff09</span>' + str.encode4Html();
                } else {
                    /** @type {string} */
                    options.shortName = '<span class="invalid-tag">\uff08\u5df2\u5931\u6548\uff09</span>' + str.encode4Html();
                }
            } else {
                if (type == "link") {
                    /** @type {RegExp} */
                    var rCurrLoc = /\u7b49\d*\u9879\u5206\u4eab$/;
                    var requestUrl = options.oriName;
                    /** @type {boolean} */
                    var isHTTPS = rCurrLoc.test(requestUrl);
                    if (isHTTPS) {
                        var pagerNum = requestUrl.replace(rCurrLoc, "");
                        var last = requestUrl.match(rCurrLoc);
                        str = pagerNum.subByte("30", "\u2026") + last;
                    } else {
                        str = requestUrl.subByte("50", "\u2026");
                    }
                } else {
                    str = options.oriName;
                    if (key) {
                        str = options.oriName.subByte(50, "\u2026");
                    }
                }
                options.shortName = str.encode4Html();
            }
            options.fileType = extractFormat(options.oriName);
            options.suffix = parseFloat(options.oriName);
            if (type === "link") {
                if (!options.fhash) {
                    if (parseInt(options.node_count, 10) > 1) {
                        /** @type {string} */
                        options.fileType = "mix";
                    } else {
                        /** @type {string} */
                        options.fileType = "folder";
                    }
                }
            }
            /** @type {string} */
            options.title = options.name + "&#10";
            if (options.isLink) {
                /** @type {string} */
                options.linkHtml = '<span class="link-logo"></span>';
            }
            var M = yunpn.video.isVideo(options.suffix);
            if (M) {
                /** @type {string} */
                options.videoPlayHtml = '<span class="video-play-ico"></span>';
            }
            var _ = yunpn.mc.isMusic(options.suffix);
            if (_) {
                /** @type {string} */
                options.musicPlayHtml = '<span class="music-play-ico"></span>';
            }
            if (type == "recycle") {
                options.time = options.mtime;
            } else {
                options.time = options.date;
            }
            if (options.isDir) {
                options.title += "\u521b\u5efa\u65f6\u95f4: " + options.date;
                /** @type {RegExp} */
                rCurrLoc = /^\/\u6765\u81ea-(\u624b\u673a[^\/]*|iPhone|iPod)\/?$/;
                if (rCurrLoc.test(options.path)) {
                    /** @type {string} */
                    options.foldertype = "fromphone";
                }
                switch(options.path) {
                    case "/\u89c6\u9891/":
                        /** @type {string} */
                        options.foldertype = "video";
                        break;
                    case "/\u97f3\u4e50/":
                        /** @type {string} */
                        options.foldertype = "music";
                        break;
                    case "/\u4e66\u7c4d/":
                        /** @type {string} */
                        options.foldertype = "book";
                        break;
                    case "/\u56fe\u7247/":
                        /** @type {string} */
                        options.foldertype = "picture";
                        break;
                    case "/\u6587\u6863/":
                        /** @type {string} */
                        options.foldertype = "document";
                        break;
                    case "/\u6765\u81ea-\u7f51\u9875\u5feb\u5b58/":
                        /** @type {string} */
                        options.foldertype = "fromchrome";
                        break;
                    case "/\u6765\u81ea-\u6d4f\u89c8\u5668/":
                        /** @type {string} */
                        options.foldertype = "se";
                        break;
                    default:
                        ;
                }
                fix.push(done(options));
            } else {
                options.title += "\u7c7b\u578b: " + setSize(options.oriName) + "&#10" + "\u5927\u5c0f: " + options.size + "&#10" + (type == "link" ? "\u4e0b\u8f7d\u6b21\u6570: " + options.total_hits + "\u6b21&#10" : "");
                if (type == "link") {
                    options.title += "\u521b\u5efa\u65f6\u95f4: " + options.date;
                } else {
                    if (type == "recycle") {
                        options.title += "\u5220\u9664\u65f6\u95f4: " + options.mtime;
                    } else {
                        options.title += "\u4fee\u6539\u65f6\u95f4: " + options.fmtime;
                    }
                }
                if (type === "link") {
                    if (!options.fhash) {
                        /** @type {string} */
                        options.title = options.name + "&#10;" + "\u521b\u5efa\u65f6\u95f4: " + options.date;
                        /** @type {string} */
                        options.total_hits = "-";
                        /** @type {string} */
                        options.size = "-";
                    }
                }
                options.thumbCls = options.fileType;
                if (options.thumb) {
                    if (options.fileType != "mix") {
                        /** @type {string} */
                        options.imgHtml = '<span class="img-sibling"></span><img src="" data-imgurl="' + options.thumb + '" />';
                    }
                }
                options.mtime = options.mtime;
                if (options.preview) {
                    /** @type {string} */
                    options.isPictures = "preview";
                }
                fix.push(selector(options));
            }
        }
        /** @type {string} */
        var optsData = "";
        /** @type {string} */
        var urlConfigHtml = "";
        /** @type {string} */
        var later = "";
        /** @type {string} */
        var dateName = "\u65e5\u671f";
        /** @type {string} */
        var timeField = "mtime";
        var order = yunpn.filelist.order;
        var order_field = yunpn.filelist.order_field;
        if (this.specialFolder[this.path.toLowerCase()]) {
            var params = this.specialFolder[this.path.toLowerCase()];
            order_field = params.field || "mtime";
            order = params.order || "desc";
        } else {
            if (this.curFunc == "recycle") {
                order = this.order_recycle;
                order_field = this.order_field_recycle;
            } else {
                if (this.curFunc == "link") {
                    order = this.order_link;
                    order_field = this.order_field_link;
                }
            }
        }
        if (order_field == "name") {
            if (order == "asc") {
                /** @type {string} */
                optsData = "arrow_u";
            } else {
                /** @type {string} */
                optsData = "arrow_d";
            }
        }
        if (order_field == "fsize") {
            if (order == "asc") {
                /** @type {string} */
                urlConfigHtml = "arrow_u";
            } else {
                /** @type {string} */
                urlConfigHtml = "arrow_d";
            }
        }
        if (type == "file" || type == "sFile") {
            /** @type {string} */
            dateName = "\u4fee\u6539\u65e5\u671f";
            /** @type {string} */
            timeField = "fmtime";
            if (order_field == "fmtime") {
                if (order == "asc") {
                    /** @type {string} */
                    later = "arrow_u";
                } else {
                    /** @type {string} */
                    later = "arrow_d";
                }
            }
        }
        if (type == "recycle") {
            /** @type {string} */
            dateName = "\u5220\u9664\u65e5\u671f";
        }
        if (type == "recycle" || type == "link") {
            if (order_field == "mtime") {
                if (order == "asc") {
                    /** @type {string} */
                    later = "arrow_u";
                } else {
                    /** @type {string} */
                    later = "arrow_d";
                }
            }
        }
        /** @type {string} */
        var fileSort = "file-sort";
        /** @type {string} */
        fix = '<ul id="list" class="file-list clearfix">' + fix.join("") + "</ul>";
        var U;
        if (message.length < 1) {
            if (type == "recycle") {
                /** @type {string} */
                U = "\u56de\u6536\u7ad9\u91cc\u6ca1\u6709\u8d44\u6599\uff0c\u5f88\u5e72\u51c0\u54e6~";
            } else {
                if (type == "sFile") {
                    /** @type {string} */
                    U = '<img src="/resource/img/my_empty_folder.gif" alt="empty folder" /><h1>\u6587\u4ef6\u4fdd\u9669\u7bb1\u6b64\u6587\u4ef6\u5939\u8fd8\u662f\u7a7a\u7684\u54e6~</h1>';
                } else {
                    if (type == "link") {
                        /** @type {string} */
                        U = "\u60a8\u8fd8\u6ca1\u6709\u5206\u4eab\u8fc7\u6587\u4ef6\u54e6~";
                    } else {
                        /** @type {string} */
                        U = '                    <img src="/resource/img/my_empty_folder.gif" alt="empty folder" />                    <h1>\u60a8\u7684\u8fd9\u4e2a\u6587\u4ef6\u5939\u8fd8\u662f\u7a7a\u7684\u54e6~</h1>                    <p class="upload">\u7acb\u523b\u70b9\u51fb\u4e0a\u4f20\u6309\u94ae\u6216\u8005<a href="http://down.360safe.com/yunpn/360wangpan_setup.exe">\u4e0b\u8f7dPC\u5ba2\u6237\u7aef</a>\u6765\u6dfb\u52a0\u6587\u4ef6\u5427\uff01</p>';
                        if (yunpn.upload.upload_type === "AJAX2") {
                            U += '                <p class="prompt">\u63d0\u793a\uff1a\u60a8\u7684\u6d4f\u89c8\u5668\u652f\u6301\u6587\u4ef6\u62d6\u62fd\u4e0a\u4f20\u81f3\u4e91\u76d8\uff0c\u62d6\u8fdb\u6765\u8bd5\u8bd5</p>';
                        }
                    }
                }
            }
            /** @type {string} */
            fix = '<ul id="list" class="clearfix"></ul><div id="emptyTips">' + U + "</div>";
        }
        if (type == "file" || (type == "sFile" || type == "link")) {
            if (data.hasNextPage) {
                data.next = data.page + 1;
            } else {
                /** @type {number} */
                data.next = -1;
            }
            /** @type {number} */
            data.previous = data.page - 1;
            data.current = data.page;
        }
        if (W("#fileList .page-nav").length) {
            W("#rtt").css("visibility", "hidden");
        }
        if (data.next >= 0 || data.previous >= 0) {
            /** @type {string} */
            var orient = "";
            /** @type {string} */
            var variant = "";
            if (data.previous < 0) {
                /** @type {string} */
                orient = "disabled";
            } else {
                /** @type {string} */
                orient = "normal";
            }
            if (data.next < 0) {
                /** @type {string} */
                variant = "disabled";
            } else {
                /** @type {string} */
                variant = "normal";
            }
            fix += self.tmpl({
                data : data.data.length,
                current : data.current,
                previous : data.previous,
                next : data.next,
                prevCls : orient,
                nextCls : variant
            });
        }
        value.html(fix);
        if (message.length >= 1) {
            /** @type {string} */
            var cycle = "" + rgbToHex({
                fileSort : fileSort,
                timeField : timeField,
                nameCls : optsData,
                sizeCls : urlConfigHtml,
                timeCls : later,
                dateName : dateName
            }) + "";
            W("#fileListHead").html(cycle);
        }
        if (type == "link") {
            yunpn.filelist.showNotice();
        }
        if (!W(".returnToTop").length) {
            var $ = {
                bottom : 70,
                ch : W("#fileListMain").getRect().height,
                cw : W("#fileListMain").getRect().width,
                doc : document.getElementById("fileListMain"),
                dom : W("#fileListMain"),
                headH : 1E3,
                left : false,
                right : 30,
                yId : "fileListMain"
            };
            yunpn.gotoTop.init($);
        }
    }
    /**
     * @param {Object} event
     * @return {?}
     */
    function render(event) {
        /** @type {Array} */
        var _results = [];
        var data = {};
        var o = {};
        /** @type {string} */
        var optsData = "";
        var copy = engine.tmpl();
        var e = event.event;
        var results = event.fhistory_list;
        /** @type {number} */
        var i = 0;
        var l = results.length;
        for (;i < l;i++) {
            data.size = yunpn.util.formatByte(results[i].fsize, 2);
            data.oriSize = results[i].fsize;
            data.nid = results[i].nid;
            data.time = results[i].mtime;
            data.vid = results[i].version;
            data.id = results[i].id;
            data.pic = results[i].pic;
            /** @type {string} */
            data.item = "item";
            _results.push(copy(data));
        }
        return e ? (o.nid = e.former, o.title = "\u52a0\u8f7d\u79fb\u52a8\u524d\u7684\u6587\u4ef6\u65f6\u5149\u53f7", o.type = "move", _results.push(arr.tmpl(o))) : results.length >= 300 && (o.title = "\u52a0\u8f7d\u66f4\u591a", o.type = "", _results.push(arr.tmpl(o))), _results;
    }
    /**
     * @param {Object} control
     * @return {?}
     */
    function add(control) {
        /** @type {Array} */
        var script = [];
        var data = {};
        var item = control.current;
        return data.nid = item.nid, data.size = yunpn.util.formatByte(item.fsize, 2), data.oriSize = item.fsize, data.time = item.mtime, data.pic = item.pic, data.vid = "\u5f53\u524d", data.item = "", script.push(template.tmpl(data)), script;
    }
    /** @type {string} */
    var url = ['<li class="row filelist-item clearfix {$itemCls}"', ' data-nid="{$nid}"', ' data-type="folder"', ' data-title="{$name}"', ' data-link="{$isLink}"', ' data-url="{$linkUrl}"', ' data-shorturl="{$shorturl}"', ' data-date="{$date}"', ' data-password="{$password}"', ' data-path="{$path}">', '<div class="column column-checkbox">', "<label></label>", "</div>", '<div class="column column-name" title="{$title}">', "{$inHtml}", "</div>", '<div class="column column-size">&nbsp;</div>', '<div class="column column-time">{$time}</div>',
        "</li>"].join("");
    /** @type {string} */
    var i = '<span class="ico ico-{$foldertype}folder">{$linkHtml}</span><span class="text">{$shortName}</span>';
    /** @type {string} */
    var view = url.replace(/\{\$inHtml\}/, "" + i + "");
    /** @type {string} */
    var head = url.replace(/\{\$inHtml\}/, i);
    /** @type {string} */
    var html = ['<li class="row filelist-item clearfix {$itemCls} {$isPictures}"', ' data-nid="{$nid}"', ' data-type="file"', ' data-ori-size="{$oriSize}"', ' data-size="{$size}"', ' data-title="{$name}"', ' data-date="{$date}"', ' data-nid="{$nid}"', ' data-fhash="{$fhash}"', ' data-preview = "{$preview}"', ' data-pic="{$pic}"', ' data-link="{$isLink}"', ' data-url="{$linkUrl}"', ' data-shorturl="{$shorturl}"', ' data-scid="{$scid}"', ' data-mtime="{$mtime}"', ' data-file-suffix="{$suffix}"', ' data-extract-status="{$is_use_password}"',
        ' data-password="{$password}"', ' data-path="{$path}">', '<div class="column column-checkbox">', "<label></label>", "</div>", '<div class="column column-name" title="{$title}">', "{$inHtml}", "</div>", "{$extractCode}", "{$hit}", '<div class="column column-size">{$size}</div>', '<div class="column column-time">{$time}</div>', "</li>"].join("");
    /** @type {string} */
    i = ['<span class="ico {$thumbCls} ico-{$fileType}"', ' data-imgurl="{$thumb}">', "{$imgHtml}", "{$linkHtml}", "{$videoPlayHtml}", "{$musicPlayHtml}", "</span>", '<span class="text">{$shortName}</span>'].join("");
    /** @type {string} */
    var expr = html.replace(/\{\$inHtml\}/, "" + i + "");
    /** @type {string} */
    var f = expr.replace(/\{\$hit\}/, '<div class="column column-hit">{$total_hits}</div>').replace(/\{\$extractCode\}/, '<div class="{$pwdCls} column column-code"><div class="code">{$password1}</div><span class="copy-box"><a class="copy-pwd" data-clipboard-text="{$password1}" href="javascript:;">\u590d\u5236</a></span></div>');
    /** @type {string} */
    expr = expr.replace(/\{\$hit\}/, "").replace(/\{\$extractCode\}/, "");
    /** @type {string} */
    var paths = html.replace(/\{\$inHtml\}/, i).replace(/\{\$hit\}/, "").replace(/\{\$extractCode\}/, "");
    /** @type {string} */
    var requestUrl = ['<div class="column column-checkbox">', '<label class="chkall"></label>', "</div>", '<div class="column column-name">', '<span class="{$fileSort}" data-field="name" >', "\u6587\u4ef6\u540d", '<span class="{$nameCls}"></span>', "</span>", "</div>", "{$extractCode}", "{$hit}", '<div class="column column-size">', '<span class="{$fileSort}" data-field="fsize" >', "\u5927\u5c0f", '<span class="{$sizeCls}"></span>', "</span>", "</div>", '<div class="column column-time">', '<span class="{$fileSort}" data-field="{$timeField}" >',
        "{$dateName}", '<span class="{$timeCls}"></span>', "</span>", "</div>"].join("");
    /** @type {string} */
    var utils = requestUrl.replace(/\{\$hit\}/, '<div class="column column-hit">\u4e0b\u8f7d\u6b21\u6570</div>').replace(/\{\$extractCode\}/, '<div class="column column-code">\u63d0\u53d6\u7801</div>');
    /** @type {string} */
    var context = requestUrl.replace(/\{\$hit\}/, "");
    /** @type {string} */
    var source = ['<li class="row item {$cur} clearfix"', ' data-nid="{$nid}"', ' data-size="{$size}"', ' data-ori-size="{$oriSize}"', ' data-file-suffix="{$suffix}"', ' data-scid="{$scid}"', ' data-title="{$name}"', ' data-vid="{$vid}"', ' data-pic="{$pic}"', ' data-id = "{$id}">', '<div class="column column-radio"><span class="{$selected}"></span></div>', '<div class="column column-hisversionid">{$vid}</div>', '<div class="column column-hissize">{$size}</div>', '<div class="column column-histime">{$time}</div>',
        "</li>"].join("");
    /** @type {string} */
    var template = source.replace(/\{\$cur\}/, "cur").replace(/\{\$operation\}/, '<span class=""></span><span title="\u67e5\u770b" class="view"></span><span title="\u4e0b\u8f7d" class="dl"></span>');
    /** @type {string} */
    var engine = source.replace(/\{\$cur\}/, "").replace(/\{\$operation\}/, '<span class="restore" title="\u8fd8\u539f"></span><span title="\u67e5\u770b" class="view"></span><span title="\u4e0b\u8f7d" class="dl"></span>');
    /** @type {string} */
    var arr = ['<li class="row eventItem clearfix"', ' data-nid="{$nid}"', ' data-title="{$name}"', ' data-type="{$type}"', ' data-id = "{$id}">', '<div class="column column-histitle"><span>{$title}</span></div>', "</li>"].join("");
    /** @type {string} */
    var self = ['<div class="page-nav" data-page="{$current},{$next}">', "<p>\u5f53\u9875\u5df2\u52a0\u8f7d{$data}\u6761</p>", "<div>", '<a href="###" onclick="monitor.clickLog(\'prev-page\');return false;" data-start="{$previous}" class="{$prevCls}">&lt;\u4e0a\u4e00\u9875</a>', '<a href="###" onclick="monitor.clickLog(\'next-page\');return false;" data-start="{$next}" class="{$nextCls}">\u4e0b\u4e00\u9875&gt;</a>', "</div>", "</div>"].join("");
    var key = Browser.ie6;
    return{
        /** @type {function (?, Object): undefined} */
        html : init,
        /** @type {function (Object): ?} */
        hisFileHtml : render,
        /** @type {function (Object): ?} */
        curHisFileHtml : add
    };
}()), baseTree.prototype.tree_loading_handler = function(obj, self) {
    self.icon.removeClass("folder-icon-loading");
    /** @type {*} */
    var o = Object.isString(obj) ? eval("(" + obj + ")") : obj;
    var id = o.id;
    var values = o.data;
    /** @type {Array} */
    var errors = [];
    if (o.errno) {
        if (o["errno"] == 3008) {
            yunpn.Msg.alert("\u60a8\u9009\u62e9\u7684\u6587\u4ef6\u5939\u5df2\u4e0d\u5b58\u5728", {
                type : "warning",
                with_close : false,
                /**
                 * @return {undefined}
                 */
                fn : function() {
                    location.reload();
                }
            });
        } else {
            if (o["errno"] == 3021) {
                yunpn.Msg.alert("\u60a8\u9009\u62e9\u7684\u6587\u4ef6\u8def\u5f84\u592a\u957f\u4e86", {
                    type : "warning"
                });
            } else {
                yunpn.Msg.alert("\u60a8\u53ef\u80fd\u5df2\u5728\u5176\u5b83\u9875\u9762\u9000\u51fa\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55!", {
                    type : "warning",
                    with_close : false,
                    /**
                     * @return {undefined}
                     */
                    fn : function() {
                        location.reload();
                    }
                });
            }
        }
        return;
    }
    /** @type {number} */
    var i = 0;
    var valuesLen = values.length;
    for (;i < valuesLen;i++) {
        var path = values[i].file_path;
        var nid = values[i].nid;
        var name = values[i].file_name.encode4Html();
        var asserterNames = yunpn.fo ? yunpn.fo.getSelectFile() : [];
        /** @type {Array} */
        var ignore = [];
        if (path.toLowerCase() == "/.360syslib/") {
            continue;
        }
        asserterNames.forEach(function(el) {
            if (el.attr("data-type") == "folder") {
                ignore.push(el.attr("data-path"));
            }
        });
        if (ignore.indexOf(path) == -1) {
            errors.push(["folder", id + "-" + i, name, path, nid]);
            self.fileList[id + "-" + i] = {
                name : name,
                path : path,
                nid : nid
            };
        }
    }
    self.me.setItemsData(id, errors, true);
}, baseTree.prototype.tree_current_folder = function(tile, dataAndEvents) {
    this.folderNow = W(tile);
    /** @type {boolean} */
    var folderPre = this.folderPre ? this.folderPre.getAttr("id") == this.folderNow.getAttr("id") : false;
    var classNames = this.folderNow.getAttr("id").split("_")[1];
    var $menu = W(">div", this.folderNow);
    if (!folderPre) {
        W(">div", this.folderPre).removeClass("over");
    }
    if (this.folderNow.hasClass("folder-closed")) {
        $menu.addClass("over");
        W(">span:nth-of-type(1)", $menu).addClass("folder-icon-open");
        dataAndEvents.openFolder(classNames);
    } else {
        if (folderPre) {
            dataAndEvents.closeFolder(classNames);
            W(">span:nth-of-type(1)", $menu).removeClass("folder-icon-open");
        } else {
            $menu.addClass("over");
        }
    }
    this.folderPre = this.folderNow;
}, baseTree.prototype.init = function(project) {
    var self = this;
    self.fileList = {
        0 : {
            name : "root",
            path : "/",
            nid : 0
        }
    };
    self.tree = new Tree({
        treeCtn : QW.NodeH.g("yunpnTree"),
        rootItemData : ["folderRoot", "0", '<span class="folder-root">&nbsp;</span><strong>\u5168\u90e8\u6587\u4ef6</strong>'],
        getItemHtml : self.getItemHtml,
        treeId : "file",
        /**
         * @param {number} _xhr
         * @param {?} dataAndEvents
         * @return {?}
         */
        getNoDataHtml : function(_xhr, dataAndEvents) {
            return W("#treefile_" + _xhr + " ul").addClass("no-data").setStyle({
                height : "0",
                overflow : "hidden"
            }), "";
        },
        /**
         * @param {number} i
         * @return {undefined}
         */
        loadItemsData : function(i) {
            self.me = this;
            self.icon = W("#tree_" + i + ">div span:nth-of-type(1)");
            W("#treefile_" + i + " ul").removeClass("no-data").setStyle({
                height : "auto"
            });
            self.icon.addClass("folder-icon-loading");
            var params = {
                path : self.fileList[i].path,
                id : i,
                nid : self.fileList[i].nid,
                t : +new Date
            };
            if (project) {
                params.token = SYS_CONF.token;
                /** @type {number} */
                params.ajax = 1;
                loadJs(project + "/file/listAjax?" + Object.encodeURIJson(params) + "&cross_domain_callback=jsonpcallbackFunc");
            } else {
                Ajax.post("/file/listAjax", params, jsonpcallbackFunc);
            }
        }
    });
    W("#treefile_0").addClass("tree-root");
    W("#treefile_0>div:nth-of-type(1)").addClass("root-node");
    W("#treefile_0>div>span:nth-of-type(1)").addClass("folder-icon-root");
    W("#yunpnTree").delegate("li>div", "click", function() {
        self.tree_current_folder(this.parentNode, self.tree);
    });
}, baseTree.prototype.show = function(name, recurring) {
    if (this.tree) {
        if (this.isFolderChanged) {
            if (this.folderNow) {
                if (this.folderNow[0].id != "treefile_0") {
                    /** @type {null} */
                    this.folderNow = null;
                }
            }
            this.tree.loadItemsData(0);
            /** @type {boolean} */
            this.isFolderChanged = false;
        }
    } else {
        this.init(name);
    }
    if (recurring != "link" && this.folderPre) {
        var oldtitle = yunpn.fo.getSelectFile();
        var md = W(oldtitle).attr("data-path") + "";
        var i = this.folderPre[0].id.replace("treefile_", "");
        /** @type {string} */
        tree_path = this.fileList[i].path + "";
        if (tree_path.indexOf(md) !== -1 || md.indexOf(tree_path) !== -1) {
            this.tree.loadItemsData(0);
            /** @type {boolean} */
            this.isFolderChanged = true;
        }
    }
}, baseTree.prototype.getFolder = function() {
    /** @type {string} */
    var path = "";
    if (this.folderNow) {
        var i = this.folderNow.attr("id").split("_")[1];
        if (this.fileList[i]) {
            path = this.fileList[i].path;
        }
    }
    return path;
}, baseTree.prototype.getNid = function() {
    /** @type {string} */
    var optsData = "";
    if (this.folderNow) {
        var i = this.folderNow.attr("id").split("_")[1];
        if (this.fileList[i]) {
            optsData = this.fileList[i].nid;
        }
    }
    return optsData;
}, baseTree.prototype.setFolder = function(tile) {
    var i = tile.attr("id").split("_")[1];
    path = this.fileList[i].path;
    this.tree_current_folder(tile);
}, baseTree.prototype.getFolderID = function() {
    /** @type {null} */
    var e = null;
    return this.folderNow && (e = this.folderNow.attr("id").split("_")[1]), e;
}, fileTree.prototype = new baseTree, yunpn.ytree = new fileTree, sfileTofileTree.prototype = new baseTree, sfileTofileTree.prototype.init = function(project) {
    var self = this;
    /**
     * @param {Object} html
     * @return {undefined}
     */
    var success = function(html) {
        self.tree_loading_handler(html, self);
    };
    self.fileList = {
        0 : {
            name : "root",
            path : "/",
            nid : 0
        }
    };
    self.tree = new Tree({
        treeCtn : QW.NodeH.g("yunpnTreeSfiletofile"),
        rootItemData : ["folderRoot", "0", '<span class="folder-root">&nbsp;</span><strong>\u5168\u90e8\u6587\u4ef6</strong>'],
        getItemHtml : self.getItemHtml,
        treeId : "sfiletofile",
        /**
         * @param {number} _xhr
         * @param {?} dataAndEvents
         * @return {?}
         */
        getNoDataHtml : function(_xhr, dataAndEvents) {
            return W("#treesfiletofile_" + _xhr + " ul").addClass("no-data").setStyle({
                height : "0",
                overflow : "hidden"
            }), "";
        },
        /**
         * @param {number} i
         * @return {undefined}
         */
        loadItemsData : function(i) {
            self.me = this;
            self.icon = W("#treesfiletofile_" + i + ">div span:nth-of-type(1)");
            W("#treesfiletofile_" + i + " ul").removeClass("no-data").setStyle({
                height : "auto"
            });
            self.icon.addClass("folder-icon-loading");
            var ret = {
                path : self.fileList[i].path,
                id : i,
                nid : self.fileList[i].nid,
                t : +new Date
            };
            Ajax.post("/file/listAjax", ret, success);
        }
    });
    W("#treesfiletofile_0").addClass("tree-root");
    W("#treesfiletofile_0>div:nth-of-type(1)").addClass("root-node");
    W("#treesfiletofile_0>div>span:nth-of-type(1)").addClass("folder-icon-root");
    W("#yunpnTreeSfiletofile").delegate("li>div", "click", function() {
        self.tree_current_folder(this.parentNode, self.tree);
    });
}, sfileTofileTree.prototype.show = function(name) {
    if (this.tree) {
        if (this.isFolderChanged) {
            if (this.folderNow) {
                if (this.folderNow[0].id != "treesfiletofile_0") {
                    /** @type {null} */
                    this.folderNow = null;
                }
            }
            this.tree.loadItemsData(0);
            /** @type {boolean} */
            this.isFolderChanged = false;
        }
    } else {
        this.init(name);
    }
}, yunpn.ytreeSfileTofile = new sfileTofileTree, sfileTree.prototype = new baseTree, sfileTree.prototype.init = function(project) {
    var self = this;
    /**
     * @param {Object} html
     * @return {undefined}
     */
    var success = function(html) {
        self.tree_loading_handler(html, self);
    };
    self.fileList = {
        0 : {
            name : "root",
            path : "/",
            nid : 0
        }
    };
    self.tree = new Tree({
        treeCtn : QW.NodeH.g("yunpnTreeSfile"),
        rootItemData : ["folderRoot", "0", '<span class="folder-root">&nbsp;</span><strong>\u6587\u4ef6\u4fdd\u9669\u7bb1</strong>'],
        getItemHtml : self.getItemHtml,
        treeId : "sfile",
        /**
         * @param {number} _xhr
         * @param {?} dataAndEvents
         * @return {?}
         */
        getNoDataHtml : function(_xhr, dataAndEvents) {
            return W("#treesfile_" + _xhr + " ul").addClass("no-data").setStyle({
                height : "0",
                overflow : "hidden"
            }), "";
        },
        /**
         * @param {number} i
         * @return {undefined}
         */
        loadItemsData : function(i) {
            self.me = this;
            self.icon = W("#treesfile_" + i + ">div span:nth-of-type(1)");
            W("#treesfile_" + i + " ul").removeClass("no-data").setStyle({
                height : "auto"
            });
            self.icon.addClass("folder-icon-loading");
            var ret = {
                path : self.fileList[i].path,
                id : i,
                nid : self.fileList[i].nid,
                t : +new Date
            };
            Ajax.post("/sFile/listAjax", ret, success);
        }
    });
    W("#treesfile_0").addClass("tree-root");
    W("#treesfile_0>div:nth-of-type(1)").addClass("root-node");
    W("#treesfile_0>div>span:nth-of-type(1)").addClass("folder-icon-root");
    W("#yunpnTreeSfile").delegate("li>div", "click", function() {
        self.tree_current_folder(this.parentNode, self.tree);
    });
}, sfileTree.prototype.show = function(name) {
    if (this.tree) {
        if (this.isFolderChanged) {
            if (this.folderNow) {
                if (this.folderNow[0].id != "treesfile_0") {
                    /** @type {null} */
                    this.folderNow = null;
                }
            }
            this.tree.loadItemsData(0);
            /** @type {boolean} */
            this.isFolderChanged = false;
        }
    } else {
        this.init(name);
    }
    if (this.folderPre) {
        var oldtitle = yunpn.fo.getSelectFile();
        var md = W(oldtitle).attr("data-path") + "";
        var i = this.folderPre[0].id.replace("treesfile_", "");
        /** @type {string} */
        tree_path = this.fileList[i].path + "";
        if (tree_path.indexOf(md) !== -1 || md.indexOf(tree_path) !== -1) {
            this.tree.loadItemsData(0);
            /** @type {boolean} */
            this.isFolderChanged = true;
        }
    }
}, yunpn.ytreeSfile = new sfileTree;
var SWFUpload;
SWFUpload == undefined && (SWFUpload = function(settings) {
    this.initSWFUpload(settings);
}), SWFUpload.prototype.initSWFUpload = function(settings) {
    try {
        this.customSettings = {};
        /** @type {Object} */
        this.settings = settings;
        /** @type {Array} */
        this.eventQueue = [];
        /** @type {string} */
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        /** @type {null} */
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings();
        this.loadFlash();
        this.displayDebugInfo();
    } catch (t) {
        throw delete SWFUpload.instances[this.movieName], t;
    }
}, SWFUpload.instances = {}, SWFUpload.movieCount = 0, SWFUpload.version = "2.2.0 2009-03-25", SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED : -100,
    FILE_EXCEEDS_SIZE_LIMIT : -110,
    ZERO_BYTE_FILE : -120,
    INVALID_FILETYPE : -130
}, SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR : -200,
    MISSING_UPLOAD_URL : -210,
    IO_ERROR : -220,
    SECURITY_ERROR : -230,
    UPLOAD_LIMIT_EXCEEDED : -240,
    UPLOAD_FAILED : -250,
    SPECIFIED_FILE_ID_NOT_FOUND : -260,
    FILE_VALIDATION_FAILED : -270,
    FILE_CANCELLED : -280,
    UPLOAD_STOPPED : -290
}, SWFUpload.FILE_STATUS = {
    QUEUED : -1,
    IN_PROGRESS : -2,
    ERROR : -3,
    COMPLETE : -4,
    CANCELLED : -5
}, SWFUpload.BUTTON_ACTION = {
    SELECT_FILE : -100,
    SELECT_FILES : -110,
    START_UPLOAD : -120
}, SWFUpload.CURSOR = {
    ARROW : -1,
    HAND : -2
}, SWFUpload.WINDOW_MODE = {
    WINDOW : "window",
    TRANSPARENT : "transparent",
    OPAQUE : "opaque"
}, SWFUpload.completeURL = function(url) {
    if (typeof url != "string" || (url.match(/^https?:\/\//i) || url.match(/^\//))) {
        return url;
    }
    /** @type {string} */
    var t = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    /** @type {number} */
    var pos = window.location.pathname.lastIndexOf("/");
    return pos <= 0 ? path = "/" : path = window.location.pathname.substr(0, pos) + "/", path + url;
}, SWFUpload.prototype.initSettings = function() {
    /**
     * @param {string} settingName
     * @param {Object} recurring
     * @return {undefined}
     */
    this.ensureDefault = function(settingName, recurring) {
        this.settings[settingName] = this.settings[settingName] == undefined ? recurring : this.settings[settingName];
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", false);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if (!!this.settings.prevent_swf_caching) {
        /** @type {string} */
        this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime();
    }
    if (!this.settings.preserve_relative_urls) {
        this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
        this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
    }
    delete this.ensureDefault;
}, SWFUpload.prototype.loadFlash = function() {
    var input;
    var tempParent;
    if (document.getElementById(this.movieName) !== null) {
        throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
    }
    input = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
    if (input == undefined) {
        throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
    }
    /** @type {Element} */
    tempParent = document.createElement("div");
    tempParent.innerHTML = this.getFlashHTML();
    input.parentNode.replaceChild(tempParent.firstChild, input);
    if (window[this.movieName] == undefined) {
        window[this.movieName] = this.getMovieElement();
    }
}, SWFUpload.prototype.getFlashHTML = function() {
    return['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' +
        this.getFlashVars() + '" />', "</object>"].join("");
}, SWFUpload.prototype.getFlashVars = function() {
    var encodedValue = this.buildParamString();
    var unmd = this.settings.http_success.join(",");
    return["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(unmd), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(encodedValue), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name),
        "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url),
        "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action),
        "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("");
}, SWFUpload.prototype.getMovieElement = function() {
    if (this.movieElement == undefined) {
        /** @type {(HTMLElement|null)} */
        this.movieElement = document.getElementById(this.movieName);
    }
    if (this.movieElement === null) {
        throw "Could not find Flash element";
    }
    return this.movieElement;
}, SWFUpload.prototype.buildParamString = function() {
    var postParams = this.settings.post_params;
    /** @type {Array} */
    var tagNameArr = [];
    if (typeof postParams == "object") {
        var name;
        for (name in postParams) {
            if (postParams.hasOwnProperty(name)) {
                tagNameArr.push(encodeURIComponent(name.toString()) + "=" + encodeURIComponent(postParams[name].toString()));
            }
        }
    }
    return tagNameArr.join("&amp;");
}, SWFUpload.prototype.destroy = function() {
    try {
        this.cancelUpload(null, false);
        /** @type {null} */
        var movieElement = null;
        movieElement = this.getMovieElement();
        if (movieElement && typeof movieElement.CallFunction == "unknown") {
            var key;
            for (key in movieElement) {
                try {
                    if (typeof movieElement[key] == "function") {
                        /** @type {null} */
                        movieElement[key] = null;
                    }
                } catch (n) {
                }
            }
            try {
                movieElement.parentNode.removeChild(movieElement);
            } catch (r) {
            }
        }
        return window[this.movieName] = null, SWFUpload.instances[this.movieName] = null, delete SWFUpload.instances[this.movieName], this.movieElement = null, this.settings = null, this.customSettings = null, this.eventQueue = null, this.movieName = null, true;
    } catch (i) {
        return false;
    }
}, SWFUpload.prototype.displayDebugInfo = function() {
    this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "),
        "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit,
        "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(),
        "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(),
        "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler == "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler ==
            "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler == "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler == "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler == "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler == "function").toString(),
        "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler == "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler == "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler == "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler == "function").toString(), "\n"].join(""));
}, SWFUpload.prototype.addSetting = function(name, val, default_value) {
    return val == undefined ? this.settings[name] = default_value : this.settings[name] = val;
}, SWFUpload.prototype.getSetting = function(name) {
    return this.settings[name] != undefined ? this.settings[name] : "";
}, SWFUpload.prototype.callFlash = function(functionName, argumentArray) {
    argumentArray = argumentArray || [];
    var movieElement = this.getMovieElement();
    var returnValue;
    var returnString;
    try {
        returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>");
        /** @type {*} */
        returnValue = eval(returnString);
    } catch (ex) {
        throw "Call to " + functionName + " failed";
    }
    return returnValue != undefined && (typeof returnValue.post == "object" && (returnValue = this.unescapeFilePostParams(returnValue))), returnValue;
}, SWFUpload.prototype.selectFile = function() {
    this.callFlash("SelectFile");
}, SWFUpload.prototype.selectFiles = function() {
    this.callFlash("SelectFiles");
}, SWFUpload.prototype.startUpload = function(fileID) {
    this.callFlash("StartUpload", [fileID]);
}, SWFUpload.prototype.cancelUpload = function(fileID, triggerErrorEvent) {
    if (triggerErrorEvent !== false) {
        /** @type {boolean} */
        triggerErrorEvent = true;
    }
    this.callFlash("CancelUpload", [fileID, triggerErrorEvent]);
}, SWFUpload.prototype.stopUpload = function() {
    this.callFlash("StopUpload");
}, SWFUpload.prototype.getStats = function() {
    return this.callFlash("GetStats");
}, SWFUpload.prototype.setStats = function(statsObject) {
    this.callFlash("SetStats", [statsObject]);
}, SWFUpload.prototype.getFile = function(url) {
    return typeof url == "number" ? this.callFlash("GetFileByIndex", [url]) : this.callFlash("GetFile", [url]);
}, SWFUpload.prototype.addFileParam = function(fileID, name, value) {
    return this.callFlash("AddFileParam", [fileID, name, value]);
}, SWFUpload.prototype.removeFileParam = function(fileID, name) {
    this.callFlash("RemoveFileParam", [fileID, name]);
}, SWFUpload.prototype.setUploadURL = function(url) {
    this.settings.upload_url = url.toString();
    this.callFlash("SetUploadURL", [url]);
}, SWFUpload.prototype.setPostParams = function(paramsObject) {
    /** @type {Object} */
    this.settings.post_params = paramsObject;
    this.callFlash("SetPostParams", [paramsObject]);
}, SWFUpload.prototype.addPostParam = function(name, value) {
    this.settings.post_params[name] = value;
    this.callFlash("SetPostParams", [this.settings.post_params]);
}, SWFUpload.prototype.removePostParam = function(name) {
    delete this.settings.post_params[name];
    this.callFlash("SetPostParams", [this.settings.post_params]);
}, SWFUpload.prototype.setFileTypes = function(types, description) {
    /** @type {(number|string)} */
    this.settings.file_types = types;
    /** @type {(number|string)} */
    this.settings.file_types_description = description;
    this.callFlash("SetFileTypes", [types, description]);
}, SWFUpload.prototype.setFileSizeLimit = function(fileSizeLimit) {
    this.settings.file_size_limit = fileSizeLimit;
    this.callFlash("SetFileSizeLimit", [fileSizeLimit]);
}, SWFUpload.prototype.setFileUploadLimit = function(fileUploadLimit) {
    this.settings.file_upload_limit = fileUploadLimit;
    this.callFlash("SetFileUploadLimit", [fileUploadLimit]);
}, SWFUpload.prototype.setFileQueueLimit = function(fileQueueLimit) {
    this.settings.file_queue_limit = fileQueueLimit;
    this.callFlash("SetFileQueueLimit", [fileQueueLimit]);
}, SWFUpload.prototype.setFilePostName = function(filePostName) {
    this.settings.file_post_name = filePostName;
    this.callFlash("SetFilePostName", [filePostName]);
}, SWFUpload.prototype.setUseQueryString = function(useQueryString) {
    this.settings.use_query_string = useQueryString;
    this.callFlash("SetUseQueryString", [useQueryString]);
}, SWFUpload.prototype.setRequeueOnError = function(requeueOnError) {
    this.settings.requeue_on_error = requeueOnError;
    this.callFlash("SetRequeueOnError", [requeueOnError]);
}, SWFUpload.prototype.setHTTPSuccess = function(http_status_codes) {
    if (typeof http_status_codes == "string") {
        /** @type {Array.<string>} */
        http_status_codes = http_status_codes.replace(" ", "").split(",");
    }
    /** @type {string} */
    this.settings.http_success = http_status_codes;
    this.callFlash("SetHTTPSuccess", [http_status_codes]);
}, SWFUpload.prototype.setAssumeSuccessTimeout = function(timeout_seconds) {
    this.settings.assume_success_timeout = timeout_seconds;
    this.callFlash("SetAssumeSuccessTimeout", [timeout_seconds]);
}, SWFUpload.prototype.setDebugEnabled = function(debugEnabled) {
    /** @type {Function} */
    this.settings.debug_enabled = debugEnabled;
    this.callFlash("SetDebugEnabled", [debugEnabled]);
}, SWFUpload.prototype.setButtonImageURL = function(buttonImageURL) {
    if (buttonImageURL == undefined) {
        /** @type {string} */
        buttonImageURL = "";
    }
    /** @type {(Function|string)} */
    this.settings.button_image_url = buttonImageURL;
    this.callFlash("SetButtonImageURL", [buttonImageURL]);
}, SWFUpload.prototype.setButtonDimensions = function(width, height) {
    /** @type {number} */
    this.settings.button_width = width;
    /** @type {number} */
    this.settings.button_height = height;
    var movie = this.getMovieElement();
    if (movie != undefined) {
        /** @type {string} */
        movie.style.width = width + "px";
        /** @type {string} */
        movie.style.height = height + "px";
    }
    this.callFlash("SetButtonDimensions", [width, height]);
}, SWFUpload.prototype.setButtonText = function(html) {
    this.settings.button_text = html;
    this.callFlash("SetButtonText", [html]);
}, SWFUpload.prototype.setButtonTextPadding = function(left, top) {
    this.settings.button_text_top_padding = top;
    this.settings.button_text_left_padding = left;
    this.callFlash("SetButtonTextPadding", [left, top]);
}, SWFUpload.prototype.setButtonTextStyle = function(css) {
    this.settings.button_text_style = css;
    this.callFlash("SetButtonTextStyle", [css]);
}, SWFUpload.prototype.setButtonDisabled = function(isDisabled) {
    this.settings.button_disabled = isDisabled;
    this.callFlash("SetButtonDisabled", [isDisabled]);
}, SWFUpload.prototype.setButtonAction = function(buttonAction) {
    this.settings.button_action = buttonAction;
    this.callFlash("SetButtonAction", [buttonAction]);
}, SWFUpload.prototype.setButtonCursor = function(cursor) {
    this.settings.button_cursor = cursor;
    this.callFlash("SetButtonCursor", [cursor]);
}, SWFUpload.prototype.queueEvent = function(handlerName, argumentArray) {
    if (argumentArray == undefined) {
        /** @type {Array} */
        argumentArray = [];
    } else {
        if (!(argumentArray instanceof Array)) {
            /** @type {Array} */
            argumentArray = [argumentArray];
        }
    }
    var self = this;
    if (typeof this.settings[handlerName] == "function") {
        this.eventQueue.push(function() {
            this.settings[handlerName].apply(this, argumentArray);
        });
        setTimeout(function() {
            self.executeNextEvent();
        }, 0);
    } else {
        if (this.settings[handlerName] !== null) {
            throw "Event handler " + handlerName + " is unknown or is not a function";
        }
    }
}, SWFUpload.prototype.executeNextEvent = function() {
    var f = this.eventQueue ? this.eventQueue.shift() : null;
    if (typeof f == "function") {
        f.apply(this);
    }
}, SWFUpload.prototype.unescapeFilePostParams = function(file) {
    /** @type {RegExp} */
    var exclude = /[$]([0-9a-f]{4})/i;
    var result = {};
    var prop;
    if (file != undefined) {
        var k;
        for (k in file.post) {
            if (file.post.hasOwnProperty(k)) {
                /** @type {string} */
                prop = k;
                var v;
                for (;(v = exclude.exec(prop)) !== null;) {
                    /** @type {string} */
                    prop = prop.replace(v[0], String.fromCharCode(parseInt("0x" + v[1], 16)));
                }
                result[prop] = file.post[k];
            }
        }
        file.post = result;
    }
    return file;
}, SWFUpload.prototype.testExternalInterface = function() {
    try {
        return this.callFlash("TestExternalInterface");
    } catch (e) {
        return false;
    }
}, SWFUpload.prototype.flashReady = function() {
    var movieElement = this.getMovieElement();
    if (!movieElement) {
        this.debug("Flash called back ready but the flash movie can't be found.");
        return;
    }
    this.cleanUp(movieElement);
    this.queueEvent("swfupload_loaded_handler");
}, SWFUpload.prototype.cleanUp = function(movieElement) {
    try {
        if (this.movieElement && typeof movieElement.CallFunction == "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            var i;
            for (i in movieElement) {
                try {
                    if (typeof movieElement[i] == "function") {
                        /** @type {null} */
                        movieElement[i] = null;
                    }
                } catch (n) {
                }
            }
        }
    } catch (r) {
    }
    /**
     * @param {Array} old
     * @param {number} name
     * @return {undefined}
     */
    window.__flash__removeCallback = function(old, name) {
        try {
            if (old) {
                /** @type {null} */
                old[name] = null;
            }
        } catch (n) {
        }
    };
}, SWFUpload.prototype.fileDialogStart = function() {
    this.queueEvent("file_dialog_start_handler");
}, SWFUpload.prototype.fileQueued = function(file) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("file_queued_handler", file);
}, SWFUpload.prototype.fileQueueError = function(file, errorCode, message) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("file_queue_error_handler", [file, errorCode, message]);
}, SWFUpload.prototype.fileDialogComplete = function(numFilesSelected, numFilesQueued, numFilesInQueue) {
    this.queueEvent("file_dialog_complete_handler", [numFilesSelected, numFilesQueued, numFilesInQueue]);
}, SWFUpload.prototype.uploadStart = function(file) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("return_upload_start_handler", file);
}, SWFUpload.prototype.returnUploadStart = function(file) {
    var returnValue;
    if (typeof this.settings.upload_start_handler == "function") {
        file = this.unescapeFilePostParams(file);
        returnValue = this.settings.upload_start_handler.call(this, file);
    } else {
        if (this.settings.upload_start_handler != undefined) {
            throw "upload_start_handler must be a function";
        }
    }
    if (returnValue === undefined) {
        /** @type {boolean} */
        returnValue = true;
    }
    /** @type {boolean} */
    returnValue = !!returnValue;
    this.callFlash("ReturnUploadStart", [returnValue]);
}, SWFUpload.prototype.uploadProgress = function(file, isXML, total) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_progress_handler", [file, isXML, total]);
}, SWFUpload.prototype.uploadError = function(file, message, error) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_error_handler", [file, message, error]);
}, SWFUpload.prototype.uploadSuccess = function(file, result, recurring) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_success_handler", [file, result, recurring]);
}, SWFUpload.prototype.uploadComplete = function(file) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_complete_handler", file);
}, SWFUpload.prototype.debug = function(message) {
    this.queueEvent("debug_handler", message);
}, SWFUpload.prototype.debugMessage = function(query) {
    if (this.settings.debug) {
        var message;
        /** @type {Array} */
        var tagNameArr = [];
        if (typeof query == "object" && (typeof query.name == "string" && typeof query.message == "string")) {
            var part;
            for (part in query) {
                if (query.hasOwnProperty(part)) {
                    tagNameArr.push(part + ": " + query[part]);
                }
            }
            /** @type {string} */
            message = tagNameArr.join("\n") || "";
            /** @type {Array.<string>} */
            tagNameArr = message.split("\n");
            /** @type {string} */
            message = "EXCEPTION: " + tagNameArr.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(message);
        } else {
            SWFUpload.Console.writeLine(query);
        }
    }
}, SWFUpload.Console = {}, SWFUpload.Console.writeLine = function(message) {
    var console;
    var documentForm;
    try {
        /** @type {(HTMLElement|null)} */
        console = document.getElementById("SWFUpload_Console");
        if (!console) {
            /** @type {Element} */
            documentForm = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(documentForm);
            /** @type {Element} */
            console = document.createElement("textarea");
            /** @type {string} */
            console.id = "SWFUpload_Console";
            /** @type {string} */
            console.style.fontFamily = "monospace";
            console.setAttribute("wrap", "off");
            /** @type {string} */
            console.wrap = "off";
            /** @type {string} */
            console.style.overflow = "auto";
            /** @type {string} */
            console.style.width = "700px";
            /** @type {string} */
            console.style.height = "350px";
            /** @type {string} */
            console.style.margin = "5px";
            documentForm.appendChild(console);
        }
        console.value += message + "\n";
        /** @type {number} */
        console.scrollTop = console.scrollHeight - console.clientHeight;
    } catch (exception) {
        alert("Exception: " + exception.name + " Message: " + exception.message);
    }
}, namespace("yunpn.upload"), yunpn.upload.config = {
    DIRECTORY_LAYER_NUMBER_LIMIT : 10,
    FILE_QUEUE_LIMIT : 3E3,
    MAX_FILE_SIZE : 377487360,
    MIN_PLUGIN_VERSION : 1003,
    LAST_PLUGIN_VERSION : 1005,
    CLASSID_FOR_IE : "11E1EFE1-B856-53CD-BD1F-1E2F8424203B",
    PLUGIN_PREFIX : "YPPlugin-",
    FORBIDDEN_SUFFIX : ["au", "vqf", "midi", "realaudio", "mp3", "wma", "wav", "aac", "ape", "mid", "mod", "cd", "asf", "arm", "ram", "m4a", "ogg", "aif", "aifc", "aiff", "amr", "flac", "avi", "rm", "rmvb", "wmv", "mpg", "mpeg", "mkv", "flv", "f4v", "scm", "mov", "3g2", "3gp", "3gp2", "3gpp", "mp4", "amv", "csf", "ivf", "mts", "swf", "webm", "vob"],
    FORBIDDEN_ERRNO : 700001,
    FORBIDDEN_MSG : "\u56e0\u7cfb\u7edf\u5347\u7ea7\u7ef4\u62a4\uff0c\u6682\u505c\u89c6\u97f3\u9891\u4f20\u8f93\u670d\u52a1\uff0c\u8bf7\u89c1\u8c05\u3002"
}, Object.mix(yunpn.upload, {
    UPLOAD_TYPE_FLASH : "up_type_flash",
    UPLOAD_TYPE_AJAX : "up_type_ajax",
    UPLOAD_TYPE_PLUGIN : "up_type_plugin",
    UPLOAD_TYPE_NONE : "up_type_none",
    STATUS_QUEUED : "file_status_queued",
    STATUS_ERROR : "file_status_error",
    STATUS_CANCELLED : "file_status_cancelled",
    STATUS_COMPLETE : "file_status_complete",
    STATUS_PROGRESS : "file_status_progress",
    /**
     * @param {string} keepData
     * @return {?}
     */
    checkForbidden : function(keepData) {
        return false;
    },
    /**
     * @param {string} url
     * @return {?}
     */
    getFileName : function(url) {
        url = url.replace(/\\/g, "/");
        var hashIndex = url.lastIndexOf("/");
        return hashIndex < 0 ? url : url.substring(hashIndex + 1);
    },
    /**
     * @param {string} uri
     * @return {?}
     */
    getRootName : function(uri) {
        var hashIndex = uri.indexOf("/");
        return hashIndex < 0 ? uri : uri.substring(0, hashIndex);
    },
    idGen : function() {
        /** @type {number} */
        var YPUpload_ = 0;
        return function() {
            return "YPUpload-" + ++YPUpload_;
        };
    }(),
    detectCapability : function() {
        var supportAjaxFolder;
        return function() {
            if (!supportAjaxFolder) {
                try {
                    supportAjaxFolder = {
                        supportPlugin : false,
                        supportPluginFolder : false,
                        supportAjax : false,
                        supportFlash : false,
                        supportDD : false,
                        supportAjaxFolder : false
                    };
                    if (/^win/i.test(Browser.platform)) {
                        try {
                            var that;
                            var moduleNamePlusExt;
                            var element = W('<div style="width:0;height:0;overflow:hidden;"></div>').insertTo("beforeend", document.body);
                            var methodName = yunpn.upload.idGen();
                            if (Browser.ie && Browser.ie >= 6) {
                                that = W('<OBJECT ID="' + methodName + '" CLASSID="clsid:' + yunpn.upload.config.CLASSID_FOR_IE + '" HEIGHT="0" WIDTH="0"></OBJECT>');
                            } else {
                                that = W("<object></object>");
                                that.attr({
                                    type : "application/x-uploadplugin",
                                    id : methodName
                                });
                            }
                            that.insertTo("beforeend", element);
                            var func = window[methodName];
                            if (func && func.GetVersion) {
                                moduleNamePlusExt = func.GetVersion().trim();
                                /** @type {number} */
                                var charCodeToReplace = parseInt(moduleNamePlusExt.substring(moduleNamePlusExt.lastIndexOf(".") + 1));
                                if (charCodeToReplace) {
                                    if (charCodeToReplace >= yunpn.upload.config.MIN_PLUGIN_VERSION) {
                                        /** @type {boolean} */
                                        supportAjaxFolder.supportPlugin = true;
                                        if (charCodeToReplace >= yunpn.upload.config.LAST_PLUGIN_VERSION) {
                                            /** @type {boolean} */
                                            supportAjaxFolder.supportPluginFolder = true;
                                        }
                                    }
                                }
                            }
                            element.removeNode();
                        } catch (u) {
                            element.removeNode();
                        }
                    }
                    if (Browser.webkit && (parseFloat(Browser.webkit) >= 534.13 && !/se 2.x metasr/i.test(navigator.userAgent)) || Browser.firefox && parseFloat(Browser.firefox) >= 5) {
                        /** @type {boolean} */
                        supportAjaxFolder.supportAjax = true;
                        /** @type {boolean} */
                        supportAjaxFolder.supportDD = true;
                    }
                    if (W("<input webkitdirectory>").attr("webkitdirectory")) {
                        /** @type {boolean} */
                        supportAjaxFolder.supportAjaxFolder = true;
                    }
                    var cDigit = yunpn.util.getSwfVersion();
                    if (cDigit) {
                        if (parseFloat(cDigit) >= 9) {
                            /** @type {boolean} */
                            supportAjaxFolder.supportFlash = true;
                        }
                    }
                } catch (ex) {
                    throw new Error("YP:upload, detectCapability. " + ex.message);
                }
            }
            return supportAjaxFolder;
        };
    }()
}), yunpn.upload.File = function(file, properties) {
    this.id = file.id;
    this.name = file.name;
    if (typeof file.fid != "undefined") {
        this.fid = file.fid;
    }
    this.status = file.status || yunpn.upload.STATUS_QUEUED;
    this.uploadType = file.uploadType;
    this.path = file.path || "";
    this.relativePath = file.relativePath || "";
    this.uploader = properties;
    this.isFolder = file.isFolder || false;
    if (file.file) {
        this.file = file.file;
    }
}, yunpn.upload.File.prototype = {
    /**
     * @return {undefined}
     */
    cancel : function() {
        try {
            var uploadType = this.uploadType;
            if (uploadType == yunpn.upload.UPLOAD_TYPE_PLUGIN) {
                this.uploader.plugin.CancelUpload(this.fid);
            } else {
                if (uploadType == yunpn.upload.UPLOAD_TYPE_FLASH) {
                    this.uploader.swf.cancelUpload(this.id);
                }
            }
            this.status = yunpn.upload.STATUS_CANCELLED;
        } catch (ex) {
            throw new Error("YP:upload, file cancel. " + ex.message);
        }
    }
}, yunpn.upload.Uploader = function(options) {
    /**
     * @return {undefined}
     */
    function copy() {
    }
    options = Object.mix({
        isMultiple : true,
        useDDUpload : true,
        dropContainer : document.body,
        retryTime : 60,
        limitSize : 377487360,
        pluginLimitSize : 0,
        suspendAfterSelect : false
    }, options, true);
    var target = {};
    /** @type {Array} */
    var tokens = ["afterinit", "beforeselect", "queuederror", "afterselect", "filequeue", "folderqueue", "progress", "uploadsuccess", "uploaderror", "networkabnormal", "hashprogress", "dragstart", "dragend", "dragenter", "dragover", "drop", "dragleave", "ddmouseup"];
    /** @type {number} */
    var ti = 0;
    /** @type {number} */
    var nTokens = tokens.length;
    for (;ti < nTokens;ti++) {
        /** @type {function (): undefined} */
        target[tokens[ti]] = copy;
    }
    this.listeners = Object.mix(target, options.listeners, true);
    /** @type {Array} */
    this.filesInWait = [];
    /** @type {string} */
    this.uploadType = "";
    /**
     * @param {string} url
     * @return {?}
     */
    this.getConfig = function(url) {
        return options[url];
    };
    /** @type {Array} */
    this.plWaitList = [];
    /** @type {boolean} */
    this.plIsWaiting = false;
    try {
        this.init();
    } catch (ex) {
        throw new Error("YP:upload, init the uploader. " + ex.message);
    }
}, yunpn.upload.Uploader.prototype = {
    /**
     * @return {undefined}
     */
    reset : function() {
        this.info = {
            totalNum : 0,
            sucNum : 0,
            failNum : 0,
            queue : [],
            elapsedTime : 0,
            folderMap : {},
            fileMap : {}
        };
    },
    /**
     * @return {undefined}
     */
    resume : function() {
        try {
            /** @type {boolean} */
            this.isAddingFile = false;
            if (!this.filesInWait) {
                return;
            }
            var data = this.filesInWait;
            var map = data.list;
            var status = yunpn.upload.STATUS_CANCELLED;
            var EVAPORATING = yunpn.upload.STATUS_QUEUED;
            if (data.status && data.status == yunpn.upload.STATUS_CANCELLED) {
                /** @type {number} */
                var i = 0;
                var len = map.length;
                for (;i < len;i++) {
                    map[i].cancel();
                }
            } else {
                if (!data.isFolder) {
                    /** @type {number} */
                    i = 0;
                    len = map.length;
                    for (;i < len;i++) {
                        var val = map[i];
                        if (val.status == status) {
                            val.cancel();
                        }
                    }
                }
                var needle = this.info.totalNum;
                var q = this.info.queue;
                var loaded = this.info.fileMap;
                if (data.isFolder) {
                    var message = {
                        name : data.folderName,
                        id : yunpn.upload.idGen(),
                        totalNum : map.length,
                        sucNum : 0,
                        failNum : 0,
                        startTime : 0,
                        saveTime : 0,
                        curFunc : data.curFunc,
                        totalSize : data.totalSize,
                        uploadedSize : 0,
                        path : data.path
                    };
                    needle += 1;
                    var cache = this.info.folderMap;
                    cache[message.id] = message;
                    this.listeners.folderqueue(message, data.queuedErrorList);
                    /** @type {number} */
                    i = 0;
                    len = map.length;
                    for (;i < len;i++) {
                        val = map[i];
                        if (val.status != EVAPORATING) {
                            continue;
                        }
                        q.push(val);
                        loaded[val.id] = val;
                        cache[val.id] = message;
                        this.listeners.filequeue(true, val);
                    }
                    if (message.totalNum <= 0) {
                        this.listeners.uploadsuccess(message);
                    }
                } else {
                    /** @type {number} */
                    i = 0;
                    len = map.length;
                    for (;i < len;i++) {
                        val = map[i];
                        if (val.status == EVAPORATING) {
                            q.push(val);
                            loaded[val.id] = val;
                            needle++;
                            this.listeners.filequeue(false, val);
                        }
                    }
                }
                this.info.totalNum = needle;
                data.uploadType == yunpn.upload.UPLOAD_TYPE_FLASH;
            }
        } catch (ex) {
            throw new Error("YP:upload, upload resume. " + ex.message);
        }
        /** @type {null} */
        this.filesInWait = null;
        this.startUpload();
    },
    /**
     * @return {undefined}
     */
    startUpload : function() {
        try {
            if (this.info.queue.length <= 0) {
                this.uploadCompleteAll();
                return;
            }
            if (this.isUploading) {
                return;
            }
            var params = this.info.queue[0];
            if (params.status == yunpn.upload.STATUS_CANCELLED) {
                this.info.queue.shift();
                this.startUpload();
                return;
            }
            /** @type {boolean} */
            this.isUploading = true;
            /** @type {Date} */
            params.startTime = new Date;
            params.status = yunpn.upload.STATUS_PROGRESS;
            var record = this.info.folderMap[params.id];
            if (record) {
                if (!record.startTime) {
                    /** @type {Date} */
                    record.startTime = new Date;
                }
            }
            if (params.uploadType == yunpn.upload.UPLOAD_TYPE_PLUGIN) {
                this.plDoUpload();
            } else {
                if (params.uploadType == yunpn.upload.UPLOAD_TYPE_AJAX) {
                    this.jxStartUpload();
                } else {
                    if (params.uploadType == yunpn.upload.UPLOAD_TYPE_FLASH) {
                        this.swf.startUpload();
                    }
                }
            }
            this.listeners.startupload(params.id);
        } catch (ex) {
            throw new Error("YP:upload, upload start. " + ex.message);
        }
    },
    /**
     * @param {(Function|string)} id
     * @return {undefined}
     */
    cancel : function(id) {
        try {
            var t = this;
            var results = this.info.fileMap;
            var e = this.info.queue[0];
            var isUploading = this.isUploading;
            var resize = yunpn.upload.UPLOAD_TYPE_AJAX;
            if (this.info.folderMap[id]) {
                var old = this.info.folderMap;
                var value = old[id];
                if (results[id]) {
                    var res = results[id];
                    if (res.isRoot) {
                        id = value.id;
                    }
                }
                if (value.id == id) {
                    var name;
                    for (name in results) {
                        if (old[name]) {
                            if (old[name].id == id) {
                                results[name].cancel();
                                if (isUploading) {
                                    if (e) {
                                        if (e.id == name) {
                                            if (results[name].uploadType == resize) {
                                                this.xhr.abort();
                                            }
                                            /** @type {boolean} */
                                            this.isUploading = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.info.totalNum--;
                } else {
                    results[id].cancel();
                    if (isUploading) {
                        if (e) {
                            if (e.id == id) {
                                if (e.uploadType == resize) {
                                    this.xhr.abort();
                                }
                                /** @type {boolean} */
                                this.isUploading = false;
                            }
                        }
                    }
                }
            } else {
                results[id].cancel();
                if (isUploading) {
                    if (e) {
                        if (e.id == id) {
                            if (results[id].uploadType == resize) {
                                this.xhr.abort();
                            }
                            /** @type {boolean} */
                            this.isUploading = false;
                        }
                    }
                }
                this.info.totalNum--;
            }
        } catch (ex) {
            throw new Error("YP:upload, upload start. " + ex.message);
        }
    },
    /**
     * @param {(Function|string)} i
     * @param {number} isXML
     * @param {number} total
     * @param {number} data
     * @param {number} position
     * @return {undefined}
     */
    uploadProgress : function(i, isXML, total, data, position) {
        try {
            if (this.info.totalNum <= this.info.sucNum + this.info.failNum) {
                return;
            }
            var pathEnv;
            if (this.info.folderMap[i]) {
                var item = this.info.folderMap[i];
                if (item.totalSize <= 0) {
                    return;
                }
                /** @type {number} */
                var progress = (isXML + item.uploadedSize) / item.totalSize;
                if (progress > 1) {
                    /** @type {number} */
                    progress = 1;
                }
                /** @type {number} */
                progress = parseInt(progress * 100);
                /** @type {number} */
                var r20 = new Date - item.startTime;
                if (r20 <= 0) {
                    return;
                }
                /** @type {number} */
                position = (isXML + item.uploadedSize) * 1E3 / r20;
                if (position <= 0) {
                    return;
                }
                /** @type {number} */
                pathEnv = (item.totalSize - isXML - item.uploadedSize) / position;
                if (pathEnv < 0) {
                    /** @type {number} */
                    pathEnv = 1;
                }
                if (pathEnv < 1) {
                    if (progress < 100) {
                        /** @type {number} */
                        pathEnv = 1;
                    }
                }
                i = item.id;
                isXML = item.uploadedSize + isXML;
            } else {
                var req = this.info.fileMap[i];
                if (data != undefined) {
                    /** @type {number} */
                    progress = data;
                } else {
                    /** @type {number} */
                    progress = parseInt(isXML / total * 100);
                    if (total < 1 || isXML >= total) {
                        /** @type {number} */
                        progress = 100;
                    }
                }
                if (position != undefined) {
                    position *= 1024;
                    if (position == 0) {
                        /** @type {number} */
                        position = 1;
                    }
                } else {
                    /** @type {number} */
                    position = isXML * 1E3 / (new Date - req.startTime);
                }
                if (position <= 0) {
                    return;
                }
                /** @type {number} */
                pathEnv = (total - isXML) / position;
            }
            this.listeners.progress(i, progress, isXML, position, pathEnv, r20);
        } catch (ex) {
            throw new Error("YP:upload, upload progress. " + ex.message);
        }
    },
    /**
     * @param {Object} file
     * @param {?} result
     * @param {boolean} mayParseLabeledStatementInstead
     * @param {number} recurring
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    uploadSuccess : function(file, result, mayParseLabeledStatementInstead, recurring, deepDataAndEvents) {
        try {
            /** @type {boolean} */
            this.isUploading = false;
            if (this.info.fileMap[file]) {
                this.info.fileMap[file].status = yunpn.upload.STATUS_COMPLETE;
            }
            if (this.info.folderMap[file]) {
                var match = this.info.folderMap[file];
                match.uploadedSize += deepDataAndEvents;
                match.sucNum++;
                match.saveTime += recurring;
                this.info.queue.shift();
                this.uploadProgress(file, 0);
                this.listeners.uploadsuccess(this.info.fileMap[file], true);
                if (match.sucNum + match.failNum >= match.totalNum) {
                    this.info.sucNum++;
                    this.listeners.uploadsuccess(match);
                }
            } else {
                var fn = this.info.queue.shift();
                this.info.sucNum++;
                this.listeners.uploadsuccess(fn, false);
            }
        } catch (ex) {
            throw new Error("YP:upload, upload success. " + ex.message);
        }
    },
    /**
     * @param {number} index
     * @return {?}
     */
    uploadErrmsg : function(index) {
        switch(index) {
            case 2004:
                ;
            case 2006:
                /** @type {string} */
                msg = "\u7528\u6237\u8ba4\u8bc1\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01";
                break;
            case 2007:
                /** @type {string} */
                msg = "\u60a8\u7684\u4e91\u76d8\u7a7a\u95f4\u4e0d\u8db3\uff0c\u4e0a\u4f20\u5931\u8d25\uff01";
                break;
            case 3009:
                ;
            case 3004:
                ;
            case 3011:
                /** @type {string} */
                msg = "\u8fd9\u4e2a\u6587\u4ef6\u5939\u4e0d\u5b58\u5728\uff0c\u88ab\u5220\u4e86\uff1f";
                break;
            case 3021:
                /** @type {string} */
                msg = "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u6587\u4ef6\u5939\u8def\u5f84\u8fc7\u957f\uff01";
                break;
            case 3109:
                /** @type {string} */
                msg = "\u4e0a\u4f20\u6587\u4ef6\u6570\u8d85\u8fc7\u6700\u5927\u9650\u5236!";
                break;
            default:
                /** @type {string} */
                msg = "\u5bf9\u4e0d\u8d77\uff0c\u4e0a\u4f20\u5931\u8d25\uff01";
        }
        return msg;
    },
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    autoCommit : function(deepDataAndEvents) {
        try {
            var e = deepDataAndEvents.evalExp();
            var self = this;
            var item = this.info.queue[0];
            /** @type {number} */
            var state = parseInt(e.errno, 10);
            if (state === 0) {
                if (e.data.autoCommit) {
                    self.uploadSuccess(item.id, item.name, false, 0, item.file.size);
                } else {
                    Ajax.post(item.curFunc == "file" ? "/upload/addfile/" : "/sUpload/addfile/", {
                        tk : e.data.tk,
                        etk : e.data.etk
                    }, function(data) {
                        try {
                            /** @type {*} */
                            data = eval("(" + data + ")");
                            /** @type {number} */
                            var next = parseInt(data.errno, 10);
                            if (next === 0) {
                                self.uploadSuccess(item.id, item.name, false, 0, item.file.size);
                            } else {
                                var timeout = self.uploadErrmsg(next);
                                self.uploadError(item, timeout);
                            }
                        } catch (ex) {
                            throw new Error("YP:upload, autoCommit error 2. " + ex.message);
                        }
                    });
                }
            } else {
                var msg = self.uploadErrmsg(state);
                self.uploadError(item, msg);
            }
        } catch (ex) {
            throw self.uploadError(item, "\u5bf9\u4e0d\u8d77\uff0c\u4e0a\u4f20\u5931\u8d25\uff01"), new Error("YP:upload, autoCommit error 1. " + ex.message);
        }
    },
    /**
     * @param {Object} message
     * @param {string} msg
     * @return {undefined}
     */
    uploadError : function(message, msg) {
        try {
            /** @type {boolean} */
            this.isUploading = false;
            message.status = yunpn.upload.STATUS_ERROR;
            if (this.info.folderMap[message.id]) {
                var self = this.info.folderMap[message.id];
                if (message.uploadType == yunpn.upload.UPLOAD_TYPE_AJAX || message.uploadType == yunpn.upload.UPLOAD_TYPE_AJAX) {
                    self.uploadedSize += message.file.size;
                }
                self.failNum++;
                this.listeners.uploaderror(message, true, msg, self);
                if (self.sucNum + self.failNum >= self.totalNum) {
                    this.listeners.uploadsuccess(self);
                } else {
                    if (message.isRoot) {
                        if (message.uploadType == yunpn.upload.UPLOAD_TYPE_PLUGIN) {
                            this.listeners.uploadsuccess(self);
                        }
                    }
                }
            } else {
                this.listeners.uploaderror(message, false, msg);
            }
            this.cancel(message.id);
        } catch (ex) {
            throw new Error("YP:upload, upload error ocur. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    uploadCompleteAll : function() {
        this.listeners.uploadall();
    },
    /**
     * @return {undefined}
     */
    initEvent : function() {
        try {
            var supportPlugin = yunpn.upload.detectCapability();
            if (supportPlugin.supportPlugin) {
                this.initPlugin();
            }
            if (supportPlugin.supportAjax) {
                this.initAjax();
            }
            if (supportPlugin.supportFlash) {
                this.initFlash();
                if (QW.Browser.ie) {
                    try {
                        /** @type {(null|string)} */
                        var text = window.document.title;
                        if (text.indexOf("#") != -1) {
                            /** @type {string} */
                            text = text.substring(0, text.indexOf("#"));
                        }
                        /** @type {string} */
                        window.document.title = text;
                    } catch (n) {
                    }
                }
            }
        } catch (ex) {
            throw new Error("YP:upload, upload initevent. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    init : function() {
        this.reset();
        this.initEvent();
        var emitter = this;
        setTimeout(function() {
            if (emitter.listeners.afterinit) {
                emitter.listeners.afterinit();
            }
        }, 1);
    }
}, Object.mix(yunpn.upload.Uploader.prototype, {
    /**
     * @return {undefined}
     */
    swfDialogStart : function() {
        try {
            this.filesInWait = {
                isFolder : false,
                list : [],
                path : this.getConfig("getUploadPath")(),
                uploadType : yunpn.upload.UPLOAD_TYPE_FLASH
            };
            this.listeners.beforeselect();
        } catch (ex) {
            throw new Error("YP:upload, flash swfDialogStart. " + ex.message);
        }
    },
    /**
     * @param {Object} file
     * @return {undefined}
     */
    swfQueued : function(file) {
        file = this.swf.getFile(file.id);
        var t = yunpn.upload.checkForbidden(file.name);
        if (t) {
            this.swf.cancelUpload(file.id);
            this.swfQueueError(file, yunpn.upload.config.FORBIDDEN_ERRNO);
            return;
        }
        try {
            this.filesInWait.list.push(new yunpn.upload.File({
                id : file.id,
                name : file.name,
                file : file,
                size : file.size,
                path : this.getConfig("getUploadPath")(),
                uploadType : yunpn.upload.UPLOAD_TYPE_FLASH
            }, this));
        } catch (ex) {
            throw new Error("YP:upload, flash swfQueued. " + ex.message);
        }
    },
    /**
     * @param {Object} obj
     * @param {?} deepDataAndEvents
     * @param {number} t
     * @return {undefined}
     */
    swfQueueError : function(obj, deepDataAndEvents, t) {
        try {
            /** @type {string} */
            var later = "";
            switch(deepDataAndEvents) {
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    /** @type {string} */
                    later = "\u4e0a\u4f20\u6587\u4ef6\u6570\u91cf\u8d85\u8fc7\u603b\u9650\u5b9a\u4e2a\u6570\uff01\n" + (t === 0 ? "" : "\u8fd8\u53ef\u4ee5\u9009\u62e9 " + (t > 1 ? t + " \u4e2a\u6587\u4ef6." : "1\u4e2a\u6587\u4ef6."));
                    break;
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    monitor.yplog(901, {
                        qid : SYS_CONF.qid
                    });
                    /** @type {string} */
                    var i = "http://down.360safe.com/yunpn/360wangpan_setup.exe";
                    if (Browser.platform == "MacIntel") {
                        /** @type {string} */
                        i = "http://down.360safe.com/yunpn/360yunpn_mac.pkg";
                    }
                    /** @type {string} */
                    later = '\u4e0a\u4f20360MB\u4ee5\u4e0a\u6587\u4ef6\uff0c\u5efa\u8bae\u4f7f\u7528<a target="_blank" href="' + i + '">\u5ba2\u6237\u7aef</a>\uff0c\u9ad8\u901f\u3001\u7a33\u5b9a\u3002';
                    break;
                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                    /** @type {string} */
                    later = "\u4e0d\u652f\u6301\u4e0a\u4f20\u7a7a\u6587\u4ef6\uff01";
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    /** @type {string} */
                    later = "\u60a8\u9009\u62e9\u7684\u6587\u4ef6\u7c7b\u578b\u6709\u8bef\uff01";
                    break;
                case yunpn.upload.config.FORBIDDEN_ERRNO:
                    this.swf.cancelUpload(obj.id);
                    later = yunpn.upload.config.FORBIDDEN_MSG;
                    break;
                default:
                    if (obj !== null) {
                        /** @type {string} */
                        later = "\u53d1\u751f\u672a\u77e5\u9519\u8bef\uff01";
                    }
                    ;
            }
            if (obj) {
                if (later) {
                    this.listeners.queuederror(later, obj.name);
                }
            }
        } catch (ex) {
            throw new Error("YP:upload, flash swfQueueError. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    swfDialogComplete : function() {
        try {
            this.listeners.afterselect(false);
        } catch (ex) {
            throw new Error("YP:upload, flash swfDialogComplete. " + ex.message);
        }
    },
    /**
     * @param {Object} arg
     * @return {undefined}
     */
    swfUploadStart : function(arg) {
        try {
            arg = this.info.fileMap[arg.id];
            var type = this.getConfig("getPostParam")(arg);
            type.path = type.path || arg.path;
            this.swf.setPostParams(type);
            this.swf.setUploadURL(this.getConfig("getUploadUrl")(arg));
        } catch (ex) {
            throw new Error("YP:upload, flash swfUploadStart. " + ex.message);
        }
    },
    /**
     * @param {Element} deepDataAndEvents
     * @param {?} v00
     * @return {undefined}
     */
    swfUploadError : function(deepDataAndEvents, v00) {
        try {
            var errorMessage;
            switch(v00) {
                case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                    /** @type {string} */
                    errorMessage = "\u5df2\u53d6\u6d88\u6587\u4ef6\u4e0a\u4f20";
                    return;
                case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                    /** @type {string} */
                    errorMessage = "\u7f51\u7edc\u6709\u95ee\u9898\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u4e0a\u4f20";
                    break;
                case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                    /** @type {string} */
                    errorMessage = "\u6587\u4ef6\u8bfb\u53d6\u6709\u95ee\u9898";
                    break;
                case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
                    /** @type {string} */
                    errorMessage = "\u6b64\u6587\u4ef6\u4e0d\u5728\u4e0a\u4f20\u961f\u5217\uff0c\u8bf7\u91cd\u65b0\u4e0a\u4f20";
                    break;
                case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                    /** @type {string} */
                    errorMessage = "\u4e0a\u4f20\u4e2d\u6b62";
                    break;
                default:
                    /** @type {string} */
                    errorMessage = "\u5bf9\u4e0d\u8d77\uff0c\u4e0a\u4f20\u5931\u8d25\uff01";
            }
            this.uploadError(this.info.fileMap[deepDataAndEvents.id], errorMessage);
        } catch (ex) {
            throw new Error("YP:upload, flash swfUploadError. " + ex.message);
        }
    },
    /**
     * @param {?} keepData
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    swfUploadSuccess : function(keepData, deepDataAndEvents) {
        this.autoCommit(deepDataAndEvents);
    },
    /**
     * @return {undefined}
     */
    swfUploadComplete : function() {
    },
    /**
     * @return {undefined}
     */
    initFlash : function() {
        try {
            var tile = this.getConfig("flSelectFileBtn");
            if (!tile) {
                return;
            }
            tile = W(tile);
            if (tile.length <= 0) {
                return;
            }
            var options = this;
            var file_types = this.getConfig("fileType") ? this.getConfig("fileType") : "*.*";
            var file_types_description = this.getConfig("fileTypeDescription") ? this.getConfig("fileTypeDescription") : "All Files(\u5355\u4e2a\u6587\u4ef6360M\u4ee5\u5185)";
            this.swf = new SWFUpload({
                upload_url : this.getConfig("uploadUrl"),
                flash_url : this.getConfig("flashUrl"),
                assume_success_timeout : 0,
                file_types : file_types,
                file_types_description : file_types_description,
                file_size_limit : this.getConfig("limitSize") + "B",
                file_upload_limit : 0,
                file_queue_limit : 0,
                file_post_name : "file",
                moving_average_history_size : 40,
                debug : false,
                prevent_swf_caching : false,
                preserve_relative_urls : false,
                button_placeholder : tile[0],
                button_image_url : this.getConfig("swfBtnImgUrl"),
                button_width : this.getConfig("btnWidth"),
                button_height : this.getConfig("btnHeight"),
                button_text : "",
                button_action : this.getConfig("btnAction") || SWFUpload.BUTTON_ACTION.SELECT_FILES,
                button_disabled : false,
                button_cursor : SWFUpload.CURSOR.HAND,
                button_window_mode : this.getConfig("windowMode") || SWFUpload.WINDOW_MODE.WINDOW,
                /**
                 * @return {undefined}
                 */
                file_dialog_start_handler : function() {
                    options.swfDialogStart();
                },
                /**
                 * @param {Object} f
                 * @return {undefined}
                 */
                file_queued_handler : function(f) {
                    options.swfQueued(f);
                },
                /**
                 * @param {Object} walkers
                 * @param {?} deepDataAndEvents
                 * @param {?} dataAndEvents
                 * @return {undefined}
                 */
                file_queue_error_handler : function(walkers, deepDataAndEvents, dataAndEvents) {
                    options.swfQueueError(walkers, deepDataAndEvents);
                },
                /**
                 * @param {?} dataAndEvents
                 * @param {?} deepDataAndEvents
                 * @return {undefined}
                 */
                file_dialog_complete_handler : function(dataAndEvents, deepDataAndEvents) {
                    options.swfDialogComplete();
                },
                /**
                 * @param {Object} until
                 * @return {undefined}
                 */
                upload_start_handler : function(until) {
                    options.swfUploadStart(until);
                },
                /**
                 * @param {Element} module
                 * @param {number} isXML
                 * @param {number} total
                 * @return {undefined}
                 */
                upload_progress_handler : function(module, isXML, total) {
                    options.uploadProgress(module.id, isXML, total);
                },
                /**
                 * @param {Element} deepDataAndEvents
                 * @param {?} x
                 * @return {undefined}
                 */
                upload_error_handler : function(deepDataAndEvents, x) {
                    options.swfUploadError(deepDataAndEvents, x);
                },
                /**
                 * @param {?} key
                 * @param {?} deepDataAndEvents
                 * @return {undefined}
                 */
                upload_success_handler : function(key, deepDataAndEvents) {
                    options.swfUploadSuccess(key, deepDataAndEvents);
                },
                /**
                 * @return {undefined}
                 */
                upload_complete_handler : function() {
                }
            });
        } catch (ex) {
            throw new Error("YP:upload, flash initFlash. " + ex.message);
        }
    }
}), Object.mix(yunpn.upload.Uploader.prototype, {
    /**
     * @param {Array} obj
     * @param {boolean} recurring
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    jxAddWaitFile : function(obj, recurring, deepDataAndEvents) {
        try {
            /** @type {number} */
            var i = 0;
            var length = obj.length;
            var UPLOAD_TYPE_AJAX = yunpn.upload.UPLOAD_TYPE_AJAX;
            var self = this;
            var max_file_size = this.getConfig("limitSize");
            this.filesInWait = {
                isFolder : false,
                list : [],
                queuedErrorList : [],
                path : this.getConfig("getUploadPath")(),
                uploadType : UPLOAD_TYPE_AJAX
            };
            /**
             * @param {Object} file
             * @return {undefined}
             */
            var load = function(file) {
                try {
                    /** @type {FileReader} */
                    var reader = new FileReader;
                    /**
                     * @param {?} er
                     * @return {undefined}
                     */
                    reader.onerror = function(er) {
                        self.jxQueueError("NOT_SUPPORT", file.name, false);
                        finish();
                    };
                    /**
                     * @param {?} e
                     * @return {undefined}
                     */
                    reader.onload = function(e) {
                        self.filesInWait.list.push(new yunpn.upload.File({
                            id : yunpn.upload.idGen(),
                            name : file.name,
                            file : file,
                            path : self.getConfig("getUploadPath")(),
                            uploadType : yunpn.upload.UPLOAD_TYPE_AJAX
                        }, "ajax"));
                        finish();
                    };
                    reader.readAsText(file);
                } catch (n) {
                    self.jxQueueError("NOT_SUPPORT", file.name, false);
                    finish();
                }
            };
            /**
             * @return {undefined}
             */
            var finish = function() {
                if (i < length) {
                    var data = obj[i];
                    var c = yunpn.upload.checkForbidden(data.name);
                    if (c) {
                        i++;
                        self.jxQueueError(yunpn.upload.config.FORBIDDEN_ERRNO, data.name);
                        finish();
                        return;
                    }
                    if (data.size <= 0) {
                        i++;
                        if (recurring && data.type == "") {
                            self.jxQueueError("NOT_SUPPORT", data.name, false);
                        } else {
                            self.jxQueueError("ZERO_BYTE_FILE", data.name, false);
                        }
                        finish();
                        return;
                    }
                    if (data.size > max_file_size) {
                        i++;
                        self.jxQueueError("FILE_EXCEEDS_SIZE_LIMIT", data.name, false);
                        finish();
                        return;
                    }
                    var name = yunpn.fileType.getType(data.name);
                    if (name == "bt" && QW.Browser.safari) {
                        i++;
                        self.filesInWait.list.push(new yunpn.upload.File({
                            id : yunpn.upload.idGen(),
                            name : data.name,
                            file : data,
                            uploadType : UPLOAD_TYPE_AJAX,
                            relativePath : "",
                            path : self.getConfig("getUploadPath")()
                        }, self));
                        finish();
                        return;
                    }
                    if (data.type == "" && data.size <= 524288) {
                        i++;
                        load(data);
                    } else {
                        i++;
                        self.filesInWait.list.push(new yunpn.upload.File({
                            id : yunpn.upload.idGen(),
                            name : data.name,
                            file : data,
                            uploadType : UPLOAD_TYPE_AJAX,
                            relativePath : "",
                            path : self.getConfig("getUploadPath")()
                        }, self));
                        finish();
                    }
                } else {
                    if (i >= length) {
                        self.listeners.afterselect(false);
                    } else {
                        /** @type {boolean} */
                        self.isAddingFile = false;
                    }
                    if (deepDataAndEvents) {
                        W(deepDataAndEvents).val("");
                    }
                }
            };
            finish();
        } catch (ex) {
            throw new Error("YP:upload, ajax jxAddWaitFile. " + ex.message);
        }
    },
    /**
     * @param {string} dataAndEvents
     * @param {?} key
     * @param {boolean} recurring
     * @return {undefined}
     */
    jxQueueError : function(dataAndEvents, key, recurring) {
        try {
            /** @type {string} */
            var errStr = "";
            switch(dataAndEvents) {
                case "NOT_SUPPORT":
                    /** @type {string} */
                    errStr = "\u4e0d\u652f\u6301\u4e0a\u4f20\u8be5\u6587\u4ef6\uff01";
                    break;
                case "ZERO_BYTE_FILE":
                    /** @type {string} */
                    errStr = "\u4e0d\u652f\u6301\u4e0a\u4f20\u7a7a\u6587\u4ef6\uff01";
                    break;
                case "FILE_EXCEEDS_SIZE_LIMIT":
                    /** @type {string} */
                    var i = "http://down.360safe.com/yunpn/360wangpan_setup.exe";
                    if (Browser.platform == "MacIntel") {
                        /** @type {string} */
                        i = "http://down.360safe.com/yunpn/360yunpn_mac.pkg";
                    }
                    /** @type {string} */
                    errStr = '\u4e0a\u4f20360MB\u4ee5\u4e0a\u6587\u4ef6\uff0c\u5efa\u8bae\u4f7f\u7528<a target="_blank" href="' + i + '">\u5ba2\u6237\u7aef</a>\uff0c\u9ad8\u901f\u3001\u7a33\u5b9a\u3002';
                    break;
                case "FILE_QUEUE_LIMIT":
                    /** @type {string} */
                    errStr = "\u6587\u4ef6\u5939\u4e2d\u6587\u4ef6\u603b\u6570\u8d85\u8fc73000\u4e2a\u4e0a\u4f20\u9650\u5236\uff0c\u5efa\u8bae\u60a8\u5206\u6279\u4e0a\u4f20";
                    break;
                case "DIRECTORY_LAYER_NUMBER_LIMIT":
                    /** @type {string} */
                    errStr = "\u6587\u4ef6\u5939\u4e2d\u7684\u76ee\u5f55\u5c42\u6570\u8d85\u8fc710\u5c42\uff0c\u5efa\u8bae\u60a8\u6574\u7406\u540e\u4e0a\u4f20";
                    break;
                case yunpn.upload.config.FORBIDDEN_ERRNO:
                    errStr = yunpn.upload.config.FORBIDDEN_MSG;
                    break;
                default:
                    /** @type {string} */
                    errStr = "\u53d1\u751f\u672a\u77e5\u9519\u8bef\uff01";
            }
            if (errStr) {
                if (key) {
                    this.listeners.queuederror(errStr, key, recurring);
                    this.filesInWait.queuedErrorList.push({
                        name : key,
                        msg : errStr
                    });
                }
            }
        } catch (ex) {
            throw new Error("YP:upload, ajax jxQueueError. " + ex.message);
        }
    },
    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    jxFileSelected : function(dataAndEvents, deepDataAndEvents) {
        try {
            if (this.isAddingFile) {
                return;
            }
            /** @type {boolean} */
            this.isAddingFile = true;
            this.jxAddWaitFile(deepDataAndEvents.files, false, deepDataAndEvents);
        } catch (ex) {
            throw new Error("YP:upload, ajax jxFileSelected. " + ex.message);
        }
    },
    /**
     * @param {?} deepDataAndEvents
     * @param {(Event|HTMLInputElement)} el
     * @return {undefined}
     */
    jxFolderSelected : function(deepDataAndEvents, el) {
        try {
            if (this.isAddingFile) {
                return;
            }
            if (el.files.length <= 0) {
                /** @type {boolean} */
                this.isAddingFile = false;
                W(el).val("");
                return;
            }
            var files = el.files;
            var camelKey = yunpn.upload.getRootName(files[0].webkitRelativePath);
            var ps = this.getConfig("getUploadPath")();
            var UPLOAD_TYPE_AJAX = yunpn.upload.UPLOAD_TYPE_AJAX;
            if (files.length > yunpn.upload.config.FILE_QUEUE_LIMIT) {
                /** @type {boolean} */
                this.isAddingFile = false;
                W(el).val("");
                this.jxQueueError("FILE_QUEUE_LIMIT", camelKey, false);
                return;
            }
            /** @type {boolean} */
            this.isAddingFile = true;
            this.filesInWait = {
                isFolder : true,
                folderName : camelKey,
                list : [],
                queuedErrorList : [],
                path : ps,
                uploadType : UPLOAD_TYPE_AJAX
            };
            /** @type {number} */
            var totalSize = 0;
            var b = yunpn.upload.config.DIRECTORY_LAYER_NUMBER_LIMIT;
            /** @type {number} */
            var i = 0;
            var valuesLen = files.length;
            for (;i < valuesLen;i++) {
                var file = files[i];
                var filename = file.name;
                /** @type {boolean} */
                var isFolder = false;
                var MAX_UNKNOWN_IMAGE_FILE_SIZE = this.getConfig("limitSize");
                var a = file.webkitRelativePath.split("/").length;
                if (a > b) {
                    /** @type {boolean} */
                    this.isAddingFile = false;
                    this.jxQueueError("DIRECTORY_LAYER_NUMBER_LIMIT", camelKey, false);
                    W(el).val("");
                    return;
                }
                if (filename == ".") {
                    /** @type {boolean} */
                    isFolder = true;
                    filename = file.webkitRelativePath.replace(/(^|.*?\/)([^\/]+)\/\.$/, "$2");
                } else {
                    var v = yunpn.upload.checkForbidden(file.name);
                    if (v) {
                        this.jxQueueError(yunpn.upload.config.FORBIDDEN_ERRNO, file.name, true);
                        continue;
                    }
                    if (file.size <= 0) {
                        this.jxQueueError("ZERO_BYTE_FILE", file.name, true);
                        continue;
                    }
                    if (file.size > MAX_UNKNOWN_IMAGE_FILE_SIZE) {
                        monitor.yplog(901, {
                            qid : SYS_CONF.qid
                        });
                        this.jxQueueError("FILE_EXCEEDS_SIZE_LIMIT", file.name, true);
                        continue;
                    }
                }
                totalSize += file.size;
                var relativePath = file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf("/") + 1);
                this.filesInWait.list.push(new yunpn.upload.File({
                    id : yunpn.upload.idGen(),
                    name : filename,
                    isFolder : isFolder,
                    file : file,
                    path : ps,
                    relativePath : relativePath,
                    uploadType : UPLOAD_TYPE_AJAX
                }, this));
            }
            this.filesInWait.totalSize = totalSize;
            W(el).val("");
            this.listeners.afterselect(true);
        } catch (ex) {
            throw new Error("YP:upload, ajax jxFolderSelected. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    jxStartUpload : function() {
        try {
            var options = this;
            var file = this.info.queue[0];
            var obj = this.getConfig("getPostParam")(file);
            /** @type {FormData} */
            var f = new FormData;
            obj.Filename = obj.Filename || file.name;
            obj.path = obj.path || file.path + file.relativePath;
            obj.file = obj.file || file.file;
            var key;
            for (key in obj) {
                f.append(key, obj[key]);
            }
            /** @type {XMLHttpRequest} */
            var xhr = new XMLHttpRequest;
            xhr.upload.addEventListener("progress", function(e) {
                if (e.lengthComputable) {
                    var item = options.info.queue[0];
                    var ret = e.loaded;
                    if (ret > item.file.size) {
                        ret = item.file.size;
                    }
                    options.uploadProgress(item.id, ret, e.total);
                }
            }, false);
            xhr.addEventListener("load", function(e, dataAndEvents) {
                if (!dataAndEvents) {
                    var core_rnotwhite = e.target.responseText;
                    options.autoCommit(core_rnotwhite);
                } else {
                    options.uploadError(options.info.queue[0], "\u5bf9\u4e0d\u8d77\uff0c\u4e0a\u4f20\u5931\u8d25\uff01");
                }
                /** @type {null} */
                xhr = null;
            }, false);
            xhr.addEventListener("error", function(dataAndEvents) {
                options.uploadError(options.info.queue[0], "\u5bf9\u4e0d\u8d77\uff0c\u4e0a\u4f20\u5931\u8d25\uff01");
                /** @type {null} */
                xhr = null;
            }, false);
            var uri = this.getConfig("getUploadUrl")(file);
            xhr.open("POST", uri);
            xhr.send(f);
            this.xhr = xhr;
        } catch (ex) {
            throw new Error("YP:upload, ajax jxStartUpload. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    initDD : function() {
        var Events = this.getConfig("dropZone");
        var to = this;
        W(Events).on("dragstart", function(datum) {
            to.listeners.dragstart(datum);
        }).on("dragend", function(datum) {
            to.listeners.dragend(datum);
        }).on("dragenter", function(deepDataAndEvents) {
            to.listeners.dragenter(deepDataAndEvents);
        }).on("dragover", function(types) {
            types.preventDefault();
            to.listeners.dragover(types);
        }).on("drop", function(e) {
            try {
                if (to.isAddingFile) {
                    return;
                }
                var coord = to.listeners.drop(e);
                if (!coord) {
                    return;
                }
                to.listeners.beforeselect(false, yunpn.upload.UPLOAD_TYPE_AJAX);
                if (e.dataTransfer && (e.dataTransfer.files && e.dataTransfer.files.length > 0)) {
                    e.preventDefault();
                    var suiteView = e.dataTransfer.files;
                    /** @type {boolean} */
                    to.isAddingFile = true;
                    to.jxAddWaitFile(suiteView, true);
                }
            } catch (ex) {
                throw new Error("YP:upload, ajax dd drop. " + ex.message);
            }
        }).on("dragleave", function(deepDataAndEvents) {
            to.listeners.dragleave(deepDataAndEvents);
        }).on("mouseup", function(deepDataAndEvents) {
            to.listeners.ddmouseup(deepDataAndEvents);
        });
    },
    /**
     * @return {undefined}
     */
    initAjax : function() {
        try {
            var qs = this.getConfig("jxSelectFileHolder");
            var emitter = this;
            if (qs) {
                qs = W(qs);
                /** @type {number} */
                var i = 0;
                var len = qs.length;
                for (;i < len;i++) {
                    /** @type {string} */
                    var tile = '<input title="\u8bf7\u9009\u62e9\u8981\u4e0a\u4f20\u7684\u6587\u4ef6" id="' + yunpn.upload.idGen() + '" class="file-select-proxy" type="file"';
                    if (this.getConfig("isMultiple")) {
                        tile += " multiple/>";
                    } else {
                        tile += ">";
                    }
                    var emcees = W(tile).insertTo("beforeend", qs[i]);
                    emcees.on("change", function(dataAndEvents) {
                        emitter.listeners.beforeselect(false, yunpn.upload.UPLOAD_TYPE_AJAX);
                        emitter.jxFileSelected(dataAndEvents, W(this)[0]);
                    });
                }
            }
            var supportAjaxFolder = yunpn.upload.detectCapability();
            if (supportAjaxFolder.supportAjaxFolder && this.getConfig("jxSelectFolderHolder")) {
                var rawParams = W(this.getConfig("jxSelectFolderHolder"));
                /** @type {number} */
                i = 0;
                len = rawParams.length;
                for (;i < len;i++) {
                    /** @type {string} */
                    tile = '<input title="\u8bf7\u9009\u62e9\u8981\u4e0a\u4f20\u7684\u6587\u4ef6\u5939" id="' + yunpn.upload.idGen() + '" class="folder-select-proxy" type="file" webkitdirectory';
                    if (this.getConfig("isMultiple")) {
                        tile += " multiple/>";
                    } else {
                        tile += ">";
                    }
                    emcees = W(tile).insertTo("beforeend", rawParams[i]);
                    emcees.on("change", function(deepDataAndEvents) {
                        emitter.listeners.beforeselect(true, yunpn.upload.UPLOAD_TYPE_AJAX);
                        emitter.jxFolderSelected(deepDataAndEvents, W(this)[0]);
                    });
                }
            }
            if (this.getConfig("dropZone")) {
                this.initDD();
            }
        } catch (ex) {
            throw new Error("YP:upload, ajax initAjax. " + ex.message);
        }
    }
}), Object.mix(yunpn.upload.Uploader.prototype, {
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    plNetworkAbnormal : function(deepDataAndEvents) {
        this.listeners.networkabnormal();
    },
    /**
     * @param {?} dataAndEvents
     * @param {string} deepDataAndEvents
     * @return {undefined}
     */
    plHashProgress : function(dataAndEvents, deepDataAndEvents) {
        this.listeners.hashprogress(yunpn.upload.config.PLUGIN_PREFIX + dataAndEvents, deepDataAndEvents);
    },
    /**
     * @return {undefined}
     */
    plDoUpload : function() {
        try {
            if (this.plWaitList.length > 0) {
                var failuresLink = this.plWaitList.shift();
                var i = yunpn.upload.config.PLUGIN_PREFIX + failuresLink;
                if (this.info.fileMap[i]) {
                    if (this.info.fileMap[i].status == yunpn.upload.STATUS_COMPLETE) {
                        this.plDoUpload();
                    } else {
                        this.plUploadStart(failuresLink);
                    }
                } else {
                    this.plDoUpload();
                }
            } else {
                /** @type {boolean} */
                this.plIsWaiting = true;
                this.plugin.DoUpload();
            }
        } catch (ex) {
            throw new Error("YP:upload, plugin plDoUpload. " + ex.message);
        }
    },
    /**
     * @param {?} el
     * @return {undefined}
     */
    plUploadStart : function(el) {
        try {
            var i = yunpn.upload.config.PLUGIN_PREFIX + el;
            var item;
            if (this.info.folderMap[i]) {
                item = this.info.folderMap[i];
                i = item.id;
            } else {
                if (!this.info.fileMap[i]) {
                    this.plugin.CancelUpload(el);
                    this.startUpload();
                    return;
                }
                item = this.info.fileMap[i];
            }
            this.listeners.startupload(i);
            if (!item.startTime) {
                /** @type {Date} */
                item.startTime = new Date;
            }
            this.plugin.StartUpload(el);
        } catch (ex) {
            throw new Error("YP:upload, plugin plUploadStart. " + ex.message);
        }
    },
    /**
     * @param {?} data
     * @param {string} key
     * @param {number} millis
     * @param {number} deepDataAndEvents
     * @return {undefined}
     */
    plFileQueuedError : function(data, key, millis, deepDataAndEvents) {
        try {
            /** @type {string} */
            var errStr = "";
            switch(millis) {
                case 1002:
                    /** @type {string} */
                    errStr = "\u6587\u4ef6\u5939\u4e2d\u6587\u4ef6\u603b\u6570\u8d85\u8fc73000\u4e2a\u4e0a\u4f20\u9650\u5236\uff0c\u5efa\u8bae\u60a8\u5206\u6279\u4e0a\u4f20";
                    break;
                case 1006:
                    /** @type {string} */
                    errStr = "\u6587\u4ef6\u5939\u4e2d\u7684\u76ee\u5f55\u5c42\u6570\u8d85\u8fc710\u5c42\uff0c\u5efa\u8bae\u60a8\u6574\u7406\u540e\u4e0a\u4f20";
                    break;
                case 1001:
                    /** @type {string} */
                    errStr = "\u4e0a\u4f20\u6587\u4ef6\u8d85\u8fc7\u9650\u5236\u5927\u5c0f" + yunpn.util.formatByte(this.getConfig("pluginUploadLimit"));
                    break;
                case 1003:
                    /** @type {string} */
                    errStr = "\u6587\u4ef6\u88ab\u5360\u7528\uff0c\u65e0\u6cd5\u8bfb\u53d6";
                    break;
                case 1007:
                    /** @type {string} */
                    errStr = "\u4e0d\u80fd\u4e0a\u4f20\u6839\u76ee\u5f55\uff01";
                    break;
                case yunpn.upload.config.FORBIDDEN_ERRNO:
                    errStr = yunpn.upload.config.FORBIDDEN_MSG;
                    break;
                default:
                    if (file !== null) {
                        /** @type {string} */
                        errStr = "\u53d1\u751f\u672a\u77e5\u9519\u8bef\uff01";
                    }
                    ;
            }
            if (errStr) {
                var obj = {
                    name : key,
                    msg : errStr,
                    errno : millis,
                    size : deepDataAndEvents,
                    type : yunpn.upload.UPLOAD_TYPE_PLUGIN
                };
                this.listeners.queuederror(errStr, key, !!this.filesInWait.folderName);
                if (this.filesInWait.folderName) {
                    this.filesInWait.queuedErrorList.push(obj);
                } else {
                    /** @type {boolean} */
                    this.isAddingFile = false;
                }
            }
        } catch (ex) {
            throw new Error("YP:upload, plugin plFileQueuedError. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    plBindEvent : function() {
        /**
         * @param {Object} element
         * @param {string} name
         * @param {Function} handler
         * @return {undefined}
         */
        var createListener = function(element, name, handler) {
            if (element.attachEvent) {
                /** @type {Function} */
                element["on" + name] = handler;
            } else {
                if (element.addEventListener) {
                    element.addEventListener(name, handler, false);
                } else {
                    /** @type {Function} */
                    element["on" + name] = handler;
                }
            }
        };
        var self = this;
        var activeClassName = this.plugin;
        var UPLOAD_TYPE_PLUGIN = yunpn.upload.UPLOAD_TYPE_PLUGIN;
        var i = yunpn.upload.config.PLUGIN_PREFIX;
        createListener(activeClassName, "FileQueued", function(k, key) {
            try {
                var camelKey = yunpn.upload.checkForbidden(key);
                if (camelKey) {
                    self.plugin.CancelUpload(k);
                    self.plFileQueuedError(k, key, yunpn.upload.config.FORBIDDEN_ERRNO, 1);
                    return;
                }
                self.filesInWait.list.push(new yunpn.upload.File({
                    id : i + k,
                    fid : k,
                    name : key,
                    uploadType : UPLOAD_TYPE_PLUGIN,
                    path : self.getConfig("getUploadPath")()
                }, self));
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, FileQueued. " + ex.message);
            }
        });
        createListener(activeClassName, "DirFileQueued", function(k, key) {
            try {
                var errorName = key.substring(0, key.length - 1);
                if (key.indexOf("/") == key.length - 1) {
                    var copies = new yunpn.upload.File({
                        isRoot : true,
                        id : i + k,
                        fid : k,
                        name : errorName,
                        uploadType : UPLOAD_TYPE_PLUGIN,
                        path : self.getConfig("getUploadPath")()
                    }, self);
                    self.filesInWait.list.push(copies);
                    self.filesInWait.folderName = errorName;
                } else {
                    var camelKey = yunpn.upload.checkForbidden(key);
                    if (camelKey) {
                        self.plugin.CancelUpload(k);
                        self.plFileQueuedError(k, key, yunpn.upload.config.FORBIDDEN_ERRNO, 1);
                        return;
                    }
                    self.filesInWait.list.push(new yunpn.upload.File({
                        id : i + k,
                        fid : k,
                        name : key,
                        uploadType : UPLOAD_TYPE_PLUGIN,
                        path : self.getConfig("getUploadPath")()
                    }, self));
                }
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, DirFileQueued. " + ex.message);
            }
        });
        createListener(activeClassName, "FileQueuedError", function(buffer_from_socket, length, millis, deepDataAndEvents) {
            try {
                self.plFileQueuedError(buffer_from_socket, length, millis, deepDataAndEvents);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, FileQueuedError. " + ex.message);
            }
        });
        createListener(activeClassName, "FileDialogComplete", function(dataAndEvents) {
            try {
                self.listeners.afterselect(false);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, FileDialogComplete. " + ex.message);
            }
        });
        createListener(activeClassName, "DirDialogComplete", function(deepDataAndEvents, ignoreMethodDoesntExist, dataAndEvents, textAlt) {
            try {
                if (!deepDataAndEvents) {
                    /** @type {boolean} */
                    self.isAddingFile = false;
                    return;
                }
                self.filesInWait.totalSize = dataAndEvents;
                self.listeners.afterselect(true);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, DirDialogComplete. " + ex.message);
            }
        });
        createListener(activeClassName, "UploadStart", function(onComplete) {
            try {
                if (self.plIsWaiting) {
                    /** @type {boolean} */
                    self.plIsWaiting = false;
                    self.plUploadStart(onComplete);
                } else {
                    self.plWaitList.push(onComplete);
                }
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, UploadStart. " + ex.message);
            }
        });
        createListener(activeClassName, "UploadComplete", function(dataAndEvents) {
        });
        createListener(activeClassName, "HashProgress", function(dataAndEvents, deepDataAndEvents) {
            try {
                self.plHashProgress(dataAndEvents, deepDataAndEvents);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, HashProgress. " + ex.message);
            }
        });
        createListener(activeClassName, "UploadProgress", function(offset, k, isXML, total, pos) {
            try {
                self.uploadProgress(i + offset, isXML, total, k, pos);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, uploadProgress. " + ex.message);
            }
        });
        createListener(activeClassName, "UploadSuccess", function(offset, ok, recurring, a3, deepDataAndEvents) {
            try {
                self.uploadSuccess(i + offset, ok, recurring, a3, deepDataAndEvents);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, uploadSuccess. " + ex.message);
            }
        });
        createListener(activeClassName, "UploadError", function(dataAndEvents, deepDataAndEvents, err) {
            try {
                self.uploadError(self.info.fileMap[yunpn.upload.config.PLUGIN_PREFIX + dataAndEvents], err);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, uploadError. " + ex.message);
            }
        });
        createListener(activeClassName, "NetworkAbnormal", function(deepDataAndEvents) {
            try {
                self.plNetworkAbnormal(deepDataAndEvents);
            } catch (ex) {
                throw new Error("YP:upload, plugin addHandler, networkabnormal. " + ex.message);
            }
        });
    },
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    plOpenFileDia : function(dataAndEvents) {
        try {
            if (this.isAddingFile) {
                return;
            }
            /** @type {boolean} */
            this.isAddingFile = true;
            var ps = this.getConfig("getUploadPath")();
            if (dataAndEvents) {
                this.filesInWait = {
                    isFolder : true,
                    uploadType : yunpn.upload.UPLOAD_TYPE_PLUGIN,
                    path : ps,
                    list : [],
                    queuedErrorList : []
                };
                this.listeners.beforeselect(false, yunpn.upload.UPLOAD_TYPE_PLUGIN);
                this.plugin.DirDialogStart(ps);
            } else {
                this.filesInWait = {
                    isFolder : false,
                    uploadType : yunpn.upload.UPLOAD_TYPE_PLUGIN,
                    list : [],
                    queuedErrorList : []
                };
                this.listeners.beforeselect(true, yunpn.upload.UPLOAD_TYPE_PLUGIN);
                this.plugin.FileDialogStart(ps);
            }
        } catch (ex) {
            throw new Error("YP:upload, plugin plOpenFileDia. " + ex.message);
        }
    },
    /**
     * @return {undefined}
     */
    initPlugin : function() {
        try {
            var Events = this.getConfig("plSelectFileBtn");
            var hashLink = this.getConfig("plSelectFolderBtn");
            var supportPluginFolder = yunpn.upload.detectCapability();
            var plOpenFileDia = this;
            if (!Events && (!supportPluginFolder.supportPluginFolder || !hashLink)) {
                return;
            }
            try {
                var that;
                var moduleNamePlusExt;
                var element = W('<div style="width:0;height:0;overflow:hidden;"></div>').insertTo("beforeend", document.body);
                var callbackId = yunpn.upload.idGen();
                if (Browser.ie && Browser.ie >= 6) {
                    that = W('<OBJECT ID="' + callbackId + '" CLASSID="clsid:' + yunpn.upload.config.CLASSID_FOR_IE + '" HEIGHT="0" WIDTH="0"></OBJECT>');
                } else {
                    that = W("<object></object>");
                    that.attr({
                        type : "application/x-uploadplugin",
                        id : callbackId
                    });
                }
                that.insertTo("beforeend", element);
                var callback = window[callbackId];
                if (callback) {
                    if (callback.GetVersion) {
                        moduleNamePlusExt = callback.GetVersion().trim();
                        /** @type {number} */
                        this.pluginVersion = parseInt(moduleNamePlusExt.substring(moduleNamePlusExt.lastIndexOf(".") + 1));
                    }
                }
            } catch (f) {
                that.removeNode();
                element.removeNode();
            }
            if (this.pluginVersion) {
                if (this.pluginVersion >= yunpn.upload.config.MIN_PLUGIN_VERSION) {
                    this.uploadType = yunpn.upload.UPLOAD_TYPE_PLUGIN;
                    this.plugin = callback;
                }
            }
            if (Events) {
                W(Events).on("click", function() {
                    plOpenFileDia.plOpenFileDia();
                });
            }
            if (supportPluginFolder.supportPluginFolder) {
                if (hashLink) {
                    W(hashLink).on("click", function() {
                        plOpenFileDia.plOpenFileDia(true);
                    });
                }
            }
            this.plBindEvent();
        } catch (ex) {
            throw new Error("YP:upload, plugin initPlugin. " + ex.message);
        }
    }
}), yunpn.cmdCenter.showUpload = function() {
    /**
     * @return {undefined}
     */
    function handle() {
        try {
            /** @type {string} */
            var hex = (yunpn.filelist.curFunc == "file" ? "\u5168\u90e8\u6587\u4ef6" : "\u6587\u4ef6\u4fdd\u9669\u7bb1") + yunpn.filelist.path;
            /** @type {string} */
            hex = hex.substr(0, hex.length - 1);
            W("#curUploadPath").attr("title", hex.encode4Html());
            if (hex.byteLen() > 35) {
                W("#curUploadPath").attr("title", hex);
                hex = hex.split("").reverse().join("");
                hex = hex.subByte(35, "\u2026");
                hex = hex.split("").reverse().join("");
            }
            W("#curUploadPath").html(hex.encode4Html());
        } catch (ex) {
            throw new Error("YP:upload, app-upload setCurPath. " + ex.message);
        }
    }
    /**
     * @return {undefined}
     */
    function show() {
        try {
            if (yunpn.filelist.curFunc == "file" || yunpn.filelist.curFunc == "sFile") {
                if (W("#uploadItemList").query("li").length <= 0) {
                    if (supportPlugin.supportAjax) {
                        W(".drag-tip").show();
                    }
                }
                filter();
                W(".uploadPath").show();
                W(".uploadDeny").hide();
            } else {
                W(".drag-tip").hide();
                filter();
                W(".uploadDeny").show();
                W(".uploadPath").hide();
            }
            var anim = new ElAnim("miniProxy", {
                opacity : {
                    from : 0,
                    to : 0.2
                },
                top : {
                    from : s.top,
                    to : options.top
                },
                left : {
                    from : s.left,
                    to : options.left
                },
                width : {
                    from : s.width,
                    to : options.width
                },
                height : {
                    from : s.height,
                    to : options.height
                }
            }, 300, QW.Easing.easeBothStrong);
            anim.on("beforeplay", function() {
                elem.css("display", "block");
            });
            /**
             * @return {undefined}
             */
            anim.onend = function() {
                handle();
                /** @type {boolean} */
                el.withMask = true;
                el.show(options.left, options.top);
                elem.css("display", "none");
            };
            that.setStyle("visibility", "hidden");
            anim.play();
            /** @type {boolean} */
            l = false;
        } catch (ex) {
            throw new Error("YP:upload, app-upload maximize. " + ex.message);
        }
    }
    /**
     * @param {?} token
     * @return {undefined}
     */
    function handler(token) {
        try {
            if (self.info.totalNum < 1) {
                that.query(".per").html("\u9009\u62e9\u8981\u4e0a\u4f20\u7684\u6587\u4ef6");
            }
            options = W(el.oWrap).getRect();
            s = that.getRect();
            elem.setStyle({
                display : "block"
            });
            var anim = new ElAnim("miniProxy", {
                opacity : {
                    to : 0,
                    from : 0.2
                },
                top : {
                    from : options.top,
                    to : s.top
                },
                left : {
                    from : options.left,
                    to : s.left
                },
                width : {
                    from : options.width,
                    to : s.width
                },
                height : {
                    from : options.height,
                    to : s.height
                }
            }, 300, QW.Easing.easeBothStrong);
            that.setStyle("visibility", "visible");
            anim.on("end", function() {
                elem.css("display", "none");
            });
            anim.play();
            W(el.oWrap).setStyle("left", "-10000px");
            W(".mask").setStyle("display", "none");
            /** @type {boolean} */
            el.withMask = false;
            /** @type {boolean} */
            l = true;
        } catch (ex) {
            throw new Error("YP:upload, app-upload minimize. " + ex.message);
        }
    }
    /**
     * @param {(Function|string)} storedFileId
     * @param {Object} element
     * @param {boolean} success
     * @return {undefined}
     */
    function callback(storedFileId, element, success) {
        try {
            var dot = element.hasClass("normal");
            /** @type {boolean} */
            var fail = false;
            if (dot) {
                if (!success) {
                    fail = confirm("\u60a8\u786e\u5b9a\u8981\u505c\u6b62\u5f53\u524d\u7684\u4e0a\u4f20\u4efb\u52a1\uff1f");
                }
                if (success || fail) {
                    self.cancel(storedFileId);
                    element.removeNode();
                }
            } else {
                element.removeNode();
            }
        } catch (ex) {
            throw new Error("YP:upload, app-upload cancelUpload. " + ex.message);
        }
    }
    /**
     * @return {undefined}
     */
    function render() {
        try {
            var assertions = W("#uploadItemList").query("li.normal");
            if (assertions.length) {
                if (!confirm("\u786e\u5b9a\u8981\u505c\u6b62\u6240\u6709\u672a\u5b8c\u6210\u7684\u4efb\u52a1\u4e48\uff1f")) {
                    return;
                }
                assertions.forEach(function(cursor) {
                    callback(cursor.id, W(cursor), true);
                });
                /** @type {null} */
                window.onbeforeunload = null;
            }
            self.reset();
            el.hide();
            W("#uploadItemList").html("");
            var supportAjax = yunpn.upload.detectCapability();
            if (supportAjax.supportAjax) {
                W("#uploadPanel .drag-tip").show();
            }
            document.title = yunpn.title;
        } catch (ex) {
            throw new Error("YP:upload, app-upload cancel. " + ex.message);
        }
    }
    /**
     * @return {undefined}
     */
    function init() {
        /** @type {Array.<string>} */
        var tags = '<div id="uploadPanel"> <div class="plugin-tip"style="display:none;">\u5f53\u524d\u6d4f\u89c8\u5668\u53ef\u5347\u7ea7\u4e3a\u201c\u4e91\u52a0\u901f\u4e0a\u4f20\u201d\uff0c\u652f\u6301\u6587\u4ef6\u79d2\u4f20\u3001\u65ad\u70b9\u7eed\u4f20\u3001\u5927\u6587\u4ef6\u4e0a\u4f20 <a href="http://down.360safe.com/yunpn/360yunpnupload_setup.exe"target="_blank">\u5b89\u88c5\u5347\u7ea7\u63a7\u4ef6</a></div> <div class="upload-toolbar clearfix"> <div class="upload-btns"> <div class="pl-select-file"> <span class="pl-select-file-btn"></span></div> <div class="pl-select-menu select-menu"> <a class="file-select"href="###"onclick="return false">\u6dfb\u52a0\u6587\u4ef6</a> <a class="folder-select"href="###"onclick="return false">\u6dfb\u52a0\u6587\u4ef6\u5939</a></div> <div class="jx-select-file"> <span class="jx-select-file-btn"></span></div> <div class="jx-select-menu select-menu"> <a class="file-select"href="javascript:;">\u6dfb\u52a0\u6587\u4ef6</a> <a class="folder-select"href="javascript:;">\u6dfb\u52a0\u6587\u4ef6\u5939</a></div> <div class="fl-select-file-box"> <button class="fl-select-file"></button></div></div> <div class="uploadDeny"style="display:none">\u4e0d\u53ef\u4e0a\u4f20\u81f3\u5f53\u524d\u76ee\u5f55\uff0c\u53ef\u4e0a\u4f20\u81f3\u201c<span>\u5168\u90e8\u6587\u4ef6</span>\u201d\u4e2d\u53ca\u5176\u5b50\u6587\u4ef6</div> <div class="uploadPath">\u5230\uff1a<span id="curUploadPath"></span></div> <div class="warning-note"><a data-placement="bottom right"href="###"onclick="return false">\u4e0a\u4f20\u987b\u77e5</a></div></div> <div class="network-abnormal-tip"style="display:none;">\u7f51\u7edc\u5f02\u5e38\uff0c\u4e0a\u4f20\u6682\u505c\u3002\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc</div> <div class="upload-list-box"> <div class="drag-tip"style="display:none"><h1>\u8bd5\u8bd5\u5c06\u7535\u8111\u91cc\u7684\u6587\u4ef6\u62d6\u62fd\u5230\u6b64\u4e0a\u4f20</h1><p>\uff08\u60a8\u7684\u6d4f\u89c8\u5668\u652f\u6301\u6b64\u62d6\u62fd\u529f\u80fd\uff09</p></div> <ul id="uploadItemList"class="upload-list"> </ul></div> </div> <split> <li class="{$status} {$sfile}"id="{$id}"data-name="{$fname}"> <div class="title"> <span class="name">{$fname}</span> <em title="\u53d6\u6d88"data-id="{$id}">\u53d6\u6d88</em></div> <div class="progress"> <span class="progress-box"> <span class="progress-bar"></span></span> <span class="progress-value"></span></div> <div class="uploadPathLi"style="display:none;">\u5df2\u4e0a\u4f20\u5230\uff1a<span class="fileUploadPath"></span></div> <div class="info">\u7b49\u5f85\u4e0a\u4f20\u4e2d...</div> <split> <li class="folder {$status} {$sfile}"id="{$id}"data-name="{$fname}"> <div class="title clearfix"> <span class="folder-pic"></span> <span class="name">{$fname}</span> <em title="\u53d6\u6d88">\u53d6\u6d88</em></div> <div class="progress"> <span class="progress-box"> <span class="progress-bar"></span></span> <span class="progress-value"></span></div> <div class="uploadPathLi"style="display:none;">\u5df2\u4e0a\u4f20\u5230\uff1a<span class="fileUploadPath"></span></div> <div class="info"> <span class="fail-loaded"style="display:none">\u5931\u8d25\uff1a<span class="fail-num">0</span><span class="arrow"></span></span> <span class="status">\u7b49\u5f85\u4e0a\u4f20\u4e2d...</span> <span class="err-msg"style="display:none;">{$errMsg}</span></div> <div class="file-box"style="display:none;"></div> <split> <div class="err-file"> <span class="name">{$name}</span> <span class="err-msg">{$errmsg}</span> </div>'.split("<split>");
        /** @type {string} */
        var reqData = tags[0].trim();
        status = tags[1].trim().tmpl();
        urlHelper = tags[2].trim().tmpl();
        registerSuite = tags[3].trim().tmpl();
        el = new yunpn.dialog.create({
            body : reqData,
            title : "\u4e0a\u4f20\u6587\u4ef6\u5230360\u4e91\u76d8",
            withClose : false,
            buttons : [{
                text : "\u5b8c\u6210",
                id : "uploadStatusBtn",
                /** @type {function (): undefined} */
                handler : render
            }]
        });
        el.on("aftershow", function() {
            if (!el.bindMinimize) {
                W(".mask").on("click", function() {
                    if (el.isVisible) {
                        if (el.withMask) {
                            handler();
                        }
                    }
                });
                /** @type {boolean} */
                el.bindMinimize = true;
            }
        });
        supportPlugin = yunpn.upload.detectCapability();
        if (!supportPlugin.supportPlugin) {
            if (/^win/i.test(Browser.platform)) {
                W("#uploadPanel .plugin-tip").show();
                W('<div class="upload-tips"><p>\u7f51\u9875\u7248\u5355\u6587\u4ef6\u6700\u5927\u652f\u6301360M\uff0c</p><p><a target="_blank" href="http://down.360safe.com/yunpn/360wangpan_setup.exe">\u5b89\u88c5PC\u5ba2\u6237\u7aef</a>\uff0c\u4e0a\u4f2010G\u8d85\u5927\u6587\u4ef6</p></div>').insertTo("afterbegin", el.oFooter);
            }
        }
        row = W("#uploadPanel .upload-btns");
        if (!elem) {
            W("#uploadItemList").delegate(".title em", "click", function() {
                var parent = W(this).parentNode("li");
                if (parent.hasClass("normal")) {
                    callback(parent[0].id, parent, false);
                } else {
                    parent.removeNode();
                }
                self.startUpload();
            });
            W('<span class="minimize"><a href="#" onclick="return false;" class="minimize-link"><span>\u5173\u95ed</span></a></span>').insertTo("beforeend", el.oWrap).on("click", handler);
            W('<span class="close"><a href="#" onclick="return false;" class="close-link"><span>\u5173\u95ed</span></a></span>').insertTo("beforeend", el.oWrap).on("click", render);
            elem = W('<div id="miniProxy" class="miniProxy"></div>').insertTo("beforeend", document.body);
            that = W("#toolbar .mini-upload").on("click", function(types) {
                show();
                types.preventDefault();
            });
            W("#uploadPanel").delegate(".fail-loaded", "click", function() {
                try {
                    var elem = W(this);
                    var input = elem.parentNode("li");
                    if (elem.hasClass("unfolded")) {
                        input.query(".file-box").hide();
                        input.css("height", "83px");
                        elem.removeClass("unfolded");
                    } else {
                        var testNode = input.query(".file-box").show().getRect();
                        input.css("height", 85 + testNode.height + "px");
                        elem.addClass("unfolded");
                    }
                } catch (ex) {
                    throw new Error("YP:upload, app-upload fail-loaded. " + ex.message);
                }
            });
        }
        var options = {
            dropZone : document.body,
            limitSize : 377487360,
            pluginUploadLimit : SYS_CONF.uploadLimit,
            /**
             * @return {?}
             */
            getUploadPath : function() {
                return yunpn.filelist.path;
            },
            /**
             * @param {?} dataAndEvents
             * @return {?}
             */
            getPostParam : function(dataAndEvents) {
                if (dataAndEvents.uploadType == yunpn.upload.UPLOAD_TYPE_AJAX) {
                    return{
                        qid : SYS_CONF.qid,
                        ofmt : "json",
                        method : "Upload.web",
                        token : Cookie.get("token", ""),
                        v : "1.0.1",
                        tk : ypDomain.tk,
                        Upload : "Submit Query",
                        devtype : "web",
                        pid : "ajax"
                    };
                }
                if (dataAndEvents.uploadType == yunpn.upload.UPLOAD_TYPE_FLASH) {
                    return{
                        v : "1.0.1",
                        qid : SYS_CONF.qid,
                        ofmt : "json",
                        method : "Upload.web",
                        token : Cookie.get("token", ""),
                        tk : ypDomain.tk,
                        devtype : "web",
                        pid : "flash"
                    };
                }
            },
            /**
             * @return {?}
             */
            getUploadUrl : function() {
                return "http://" + ypDomain.up + "/webupload?devtype=web";
            }
        };
        if (supportPlugin.supportAjax) {
            /** @type {string} */
            options.jxSelectFileHolder = "#uploadPanel .jx-select-file-btn";
            /** @type {string} */
            data.file = "act-ajax";
            /** @type {string} */
            data.sFile = "act-ajax";
            W("#uploadPanel .drag-tip").show();
            if (supportPlugin.supportAjaxFolder) {
                options.jxSelectFileHolder += ",#uploadPanel .jx-select-menu .file-select";
                /** @type {string} */
                options.jxSelectFolderHolder = "#uploadPanel .jx-select-menu .folder-select";
                /** @type {string} */
                data.file = "act-ajax-folder";
                /** @type {string} */
                data.sFile = "act-ajax-folder";
                W("#uploadPanel .upload-btns").hover(function() {
                    if (W(this).hasClass("act-ajax-folder")) {
                        W("#uploadPanel .jx-select-menu").show();
                        W(this).addClass("act-ajax-folder-hover");
                    }
                }, function() {
                    if (W(this).hasClass("act-ajax-folder")) {
                        W("#uploadPanel .jx-select-menu").hide();
                        W(this).removeClass("act-ajax-folder-hover");
                    }
                });
            }
        } else {
            if (supportPlugin.supportFlash) {
                /** @type {string} */
                data.file = "act-flash";
                /** @type {string} */
                data.sFile = "act-flash";
                /** @type {string} */
                options.flSelectFileBtn = "#uploadPanel .fl-select-file";
                /** @type {string} */
                options.flashUrl = {
                    stc : "/resource/swf/swfupload.swf?vyp=" + +new Date
                }.stc;
                /** @type {number} */
                options.btnWidth = 85;
                /** @type {number} */
                options.btnHeight = 30;
                /** @type {string} */
                options.swfBtnImgUrl = "/resource/img/upload/dialog-flash-upload.png";
            }
        }
        if (supportPlugin.supportPlugin) {
            /** @type {string} */
            options.plSelectFileBtn = "#uploadPanel .pl-select-file-btn";
            /** @type {string} */
            data.file = "act-plugin";
            if (supportPlugin.supportPluginFolder) {
                options.plSelectFileBtn += ", #uploadPanel .pl-select-menu .file-select";
                /** @type {string} */
                options.plSelectFolderBtn = "#uploadPanel .pl-select-menu .folder-select";
                /** @type {string} */
                data.file = "act-plugin-folder";
                W("#uploadPanel .upload-btns").hover(function() {
                    if (W(this).hasClass("act-plugin-folder")) {
                        W("#uploadPanel .pl-select-menu").show();
                    }
                }, function() {
                    if (W(this).hasClass("act-plugin-folder")) {
                        W("#uploadPanel .pl-select-menu").hide();
                    }
                });
            }
        }
        options.listeners = {
            /**
             * @return {undefined}
             */
            afterinit : function() {
                if (yunpn.upload.detectCapability().supportPlugin) {
                    var connection = self.plugin;
                    connection.SetParam("fileSizeLimit", SYS_CONF.uploadLimit + "");
                    connection.SetParam("timeout", 60);
                    connection.SetParam("devtype", "web_upload");
                }
            },
            /**
             * @param {boolean} recurring
             * @param {(Object|string)} dataAndEvents
             * @return {undefined}
             */
            beforeselect : function(recurring, dataAndEvents) {
                W("#uploadPanel .drag-tip").css("display", "none");
                if (dataAndEvents == yunpn.upload.UPLOAD_TYPE_PLUGIN) {
                    W("#uploadPanel .pl-select-menu").hide();
                    var a = self.plugin;
                    var s = ypDomain.api;
                    s = s.substring(s.indexOf("a"), s.length);
                    a.SetPostParam("qid", SYS_CONF.qid);
                    a.SetPostParam("token", Cookie.get("token", ""));
                    a.SetPostParam("host", s);
                }
            },
            /**
             * @param {boolean} recurring
             * @return {undefined}
             */
            afterselect : function(recurring) {
                try {
                    var params = self.filesInWait;
                    var list = params.list;
                    var GET = yunpn.filelist.curFunc;
                    params.curFunc = GET;
                    if (list.length <= 0) {
                        self.resume();
                        return;
                    }
                    if (params.uploadType == yunpn.upload.UPLOAD_TYPE_AJAX) {
                        var thingy = W("#uploadPanel .upload-btns");
                        if (thingy.hasClass("act-ajax-folder")) {
                            W("#uploadPanel .jx-select-menu").hide();
                            thingy.removeClass("act-ajax-folder-hover");
                        }
                    } else {
                        if (params.uploadType == yunpn.upload.UPLOAD_TYPE_FLASH) {
                            document.title = yunpn.title;
                        }
                    }
                    var p = yunpn.filelist.path;
                    params.path = p;
                    /** @type {number} */
                    var i = 0;
                    var listLength = list.length;
                    for (;i < listLength;i++) {
                        list[i].curFunc = GET;
                        list[i].path = p;
                    }
                    yunpn.cmdCenter.checkFile(recurring, self);
                } catch (ex) {
                    throw new Error("YP:upload, app-upload afterselect. " + ex.message);
                }
            },
            /**
             * @param {boolean} recurring
             * @param {Object} item
             * @return {undefined}
             */
            filequeue : function(recurring, item) {
                if (!recurring) {
                    W(status({
                        id : item.id,
                        fname : item.name.encode4Html(),
                        status : "normal",
                        sfile : item.curFunc == "sFile" ? "sfile" : ""
                    })).insertTo("beforeend", g("uploadItemList"));
                    W("#uploadStatusBtn").addClass("cancel").html("\u53d6\u6d88");
                }
            },
            /**
             * @param {Object} user
             * @param {number} msgs
             * @return {undefined}
             */
            folderqueue : function(user, msgs) {
                try {
                    W(urlHelper({
                        id : user.id,
                        fname : user.name.encode4Html(),
                        status : "normal",
                        sfile : user.curFunc == "sFile" ? "sfile" : ""
                    })).insertTo("beforeend", g("uploadItemList"));
                    if (msgs && msgs.length) {
                        /** @type {number} */
                        var i = 0;
                        var l = msgs.length;
                        for (;i < l;i++) {
                            var m = msgs[i];
                            W(registerSuite({
                                name : m.name,
                                errmsg : m.msg
                            })).insertTo("beforeend", W("#" + user.id + " .file-box"));
                            W("#" + user.id + " .fail-num").html(parseInt(W("#" + user.id + " .fail-num").html()) + 1);
                        }
                        W("#" + user.id + " .fail-loaded").show();
                    }
                } catch (ex) {
                    throw new Error("YP:upload, app-upload folderqueue. " + ex.message);
                }
            },
            /**
             * @param {?} fix
             * @param {string} keepData
             * @param {boolean} recurring
             * @return {undefined}
             */
            queuederror : function(fix, keepData, recurring) {
                if (!recurring) {
                    W(status({
                        fname : yunpn.upload.getFileName(keepData),
                        status : "err"
                    })).insertTo("beforeend", g("uploadItemList")).query(".info").html(fix);
                }
            },
            /**
             * @param {string} lhs
             * @return {undefined}
             */
            startupload : function(lhs) {
                var surface = W("#" + lhs);
                if (surface.length > 0) {
                    /** @type {number} */
                    W(".upload-list-box")[0].scrollTop = surface.getRect().top - W(".upload-list").getRect().top;
                }
            },
            /**
             * @param {(Function|string)} count
             * @param {number} progress
             * @param {number} isXML
             * @param {number} object
             * @param {number} p
             * @return {undefined}
             */
            progress : function(count, progress, isXML, object, p) {
                try {
                    W("#uploadPanel .network-abnormal-tip").hide();
                    var msg = W("#" + count);
                    msg.query(".progress-bar").css("width", progress + "%");
                    msg.query(".progress-value").html(progress + "%");
                    var fix = handleProgress({
                        upload : Q(isXML, 2),
                        speed : Q(object, 2) + "/\u79d2",
                        remain : p ? setProgress(p) : "00:00:00"
                    });
                    if (msg.hasClass("folder")) {
                        msg.query(".info .status").html(fix);
                    } else {
                        msg.query(".info").html(fix);
                        if (progress >= 99) {
                            /** @type {string} */
                            fix = "\u6587\u4ef6\u5b58\u50a8\u4e2d\u2026";
                            msg.query(".info").html(fix);
                        }
                    }
                    that.query(".per").html("\u4e0a\u4f20\u8fdb\u5ea6\uff1a" + (self.info.sucNum + self.info.failNum + 1) + "/" + self.info.totalNum);
                    that.query(".mini-bg").css("width", progress + "%");
                } catch (ex) {
                    throw new Error("YP:upload, app-upload progress. " + ex.message);
                }
            },
            /**
             * @param {Object} item
             * @param {boolean} recurring
             * @param {?} dataAndEvents
             * @return {undefined}
             */
            uploadsuccess : function(item, recurring, dataAndEvents) {
                try {
                    W("#uploadPanel .network-abnormal-tip").hide();
                    var node = W("#" + item.id);
                    if (!recurring && node.length > 0) {
                        initialize(node, "\u606d\u559c\u60a8\uff0c\u4e0a\u4f20\u6210\u529f\uff01", "pass", item);
                        var $link = node.query(".uploadPathLi");
                        /** @type {string} */
                        var text = (item.curFunc == "file" ? "\u5168\u90e8\u6587\u4ef6" : "\u6587\u4ef6\u4fdd\u9669\u7bb1") + item.path;
                        /** @type {string} */
                        text = text.substr(0, text.length - 1);
                        if (text == "\u5168\u90e8\u6587\u4ef6" || text == "\u6587\u4ef6\u4fdd\u9669\u7bb1") {
                            $link.html($link.html().replace("\u5df2\u4e0a\u4f20\u5230", "\u5df2\u4e0a\u4f20\u5230\u6839\u76ee\u5f55"));
                        }
                        var el = node.query(".fileUploadPath");
                        if (text.byteLen() > 35) {
                            el.attr("title", text);
                            text = text.split("").reverse().join("");
                            text = text.subByte(35, "\u2026");
                            text = text.split("").reverse().join("");
                        }
                        el.setAttr("data-path", item.path.encode4Html());
                        el.html(text);
                        if (item.curFunc == "file") {
                            el.addClass("open");
                            el.on("click", function(dataAndEvents) {
                                handler();
                                /** @type {string} */
                                yunpn.filelist.curFunc = "file";
                                yunpn.cmdCenter.updateNav();
                                var which = W(this).attr("data-path");
                                yunpn.cmdCenter.gotoPath(which);
                                /** @type {Array} */
                                yunpn.filelist.nav = [];
                                var parts = which.substring(1, which.length - 1).split("/");
                                /** @type {string} */
                                var args = "";
                                if (parts[0] != "") {
                                    /** @type {number} */
                                    var i = 0;
                                    for (;i < parts.length;i++) {
                                        args += parts[i] + "/";
                                        yunpn.filelist.nav.push({
                                            title : parts[i],
                                            nid : 0,
                                            path : "/" + args
                                        });
                                    }
                                }
                                yunpn.cmdCenter.updateStatus();
                            });
                        }
                        $link.show();
                    }
                    self.startUpload();
                } catch (ex) {
                    throw new Error("YP:upload, app-upload uploadsuccess. " + ex.message);
                }
            },
            /**
             * @param {Object} item
             * @param {boolean} recurring
             * @param {?} fix
             * @param {Element} thisArg
             * @return {undefined}
             */
            uploaderror : function(item, recurring, fix, thisArg) {
                try {
                    var loader = W("#" + item.id);
                    if (recurring) {
                        W(registerSuite({
                            name : item.name,
                            errmsg : fix
                        })).insertTo("beforeend", W("#" + thisArg.id + " .file-box"));
                        W("#" + thisArg.id + " .fail-loaded").show();
                        var yearCont = W("#" + thisArg.id + " .fail-num");
                        /** @type {number} */
                        var cycle = parseInt(yearCont.html()) + 1;
                        W("#" + thisArg.id + " .fail-num").html(cycle);
                        var div = W("#" + thisArg.id + " .fail-loaded");
                        var input = div.parentNode("li");
                        if (div.hasClass("unfolded")) {
                            var testNode = input.query(".file-box").show().getRect();
                            input.css("height", 83 + testNode.height + "px");
                        }
                    } else {
                        if (loader.length > 0) {
                            loader.removeClass("normal").addClass("err").query(".info").html(fix);
                        }
                    }
                    self.startUpload();
                } catch (ex) {
                    throw new Error("YP:upload, app-upload uploaderror. " + ex.message);
                }
            },
            /**
             * @return {undefined}
             */
            uploadall : function() {
                that.query(".per").html("\u5df2\u4e0a\u4f20" + self.info.totalNum + "\u4e2a\uff0c\u7ee7\u7eed\u6dfb\u52a0");
                that.query(".mini-bg").css("width", "100%");
                W("#uploadStatusBtn").removeClass("cancel").html("\u5b8c\u6210");
                yunpn.filelist.list();
            },
            /**
             * @return {undefined}
             */
            networkabnormal : function() {
                W("#uploadPanel .network-abnormal-tip").show();
            },
            /**
             * @param {string} lhs
             * @param {string} deepDataAndEvents
             * @return {undefined}
             */
            hashprogress : function(lhs, deepDataAndEvents) {
                var parts = W("#" + lhs);
                if (parts.length > 0) {
                    parts.query(".info").html("\u4e91\u52a0\u901f\u51c6\u5907\u4e2d:" + deepDataAndEvents + "%");
                }
            }
        };
        /** @type {string} */
        var tile = ['<div id="dropOverlay">', "<h1>", "\u5c06\u6587\u4ef6\u62d6\u653e\u81f3\u6b64\u53ef\u4ee5\u4e0a\u4f20", "</h1>", "</div>"].join("");
        var content = W(tile).insertTo("beforeend", document.body);
        var u;
        Object.mix(options.listeners, {
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragstart : function(e) {
                content.css("width", "0");
            },
            /**
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            dragenter : function(deepDataAndEvents) {
                if (yunpn.filelist.curFunc != "file" && yunpn.filelist.curFunc != "sFile") {
                    return;
                }
                content.css("display", "block");
            },
            /**
             * @param {Object} keepData
             * @return {undefined}
             */
            dragover : function(keepData) {
                if (yunpn.filelist.curFunc != "file" && yunpn.filelist.curFunc != "sFile") {
                    return;
                }
                content.css("opacity", "0.8");
            },
            /**
             * @param {?} e
             * @return {undefined}
             */
            dragend : function(e) {
                setTimeout(function() {
                    content.css("width", "100%");
                }, 600);
            },
            /**
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            dragleave : function(deepDataAndEvents) {
                content.css("opacity", "0");
            },
            /**
             * @param {Object} e
             * @return {?}
             */
            drop : function(e) {
                try {
                    if (yunpn.filelist.curFunc != "file" && yunpn.filelist.curFunc != "sFile") {
                        return;
                    }
                    return content.css("opacity", "0"), u && (clearTimeout(u), u = null), u = setTimeout(function() {
                        content.css("display", "none");
                    }, 500), filter(), handle(), e.dataTransfer && (e.dataTransfer.files && (e.dataTransfer.files.length > 0 && el.show())), true;
                } catch (ex) {
                    throw new Error("YP:upload, app-upload dd drop. " + ex.message);
                }
            },
            /**
             * @param {?} deepDataAndEvents
             * @return {undefined}
             */
            ddmouseup : function(deepDataAndEvents) {
                if (yunpn.filelist.curFunc != "file" && yunpn.filelist.curFunc != "sFile") {
                    return;
                }
                content.css("opacity", "0");
                content.css("display", "none");
            }
        });
        self = new yunpn.upload.Uploader(options);
    }
    /**
     * @return {undefined}
     */
    function filter() {
        var i = yunpn.filelist.curFunc;
        if (row.attr("data-act-btn") != data[i]) {
            row.replaceClass(row.attr("data-act-btn"), data[i]);
            row.attr("data-act-btn", data[i]);
        }
    }
    var self;
    var el;
    var row;
    /** @type {boolean} */
    var l = false;
    var elem;
    var that;
    var options;
    var s;
    var supportPlugin;
    var data = {};
    var status;
    var urlHelper;
    var registerSuite;
    var handleProgress = ['\u5df2\u4e0a\u4f20\uff1a<span class="upload-upload">{$upload}</span>', '\u901f\u5ea6\uff1a<span class="upload-speed">{$speed}</span>', '\u5269\u4f59\u65f6\u95f4\uff1a<span class="upload-remain">{$remain}</span>'].join("").tmpl();
    /** @type {function (number, number, boolean): ?} */
    var Q = yunpn.util.formatByte;
    /**
     * @param {number} p
     * @return {?}
     */
    var setProgress = function(p) {
        /** @type {number} */
        var name = Math.floor(p / 3600);
        /** @type {number} */
        var value = Math.floor(p % 3600 / 60);
        /** @type {number} */
        var regexString = Math.floor(p % 60);
        return name < 10 && (name = "0" + name), value < 10 && (value = "0" + value), regexString < 10 && (regexString = "0" + regexString), name + ":" + value + ":" + regexString;
    };
    /**
     * @param {Object} node
     * @param {?} fix
     * @param {string} val
     * @param {Object} expression
     * @return {undefined}
     */
    var initialize = function(node, fix, val, expression) {
        try {
            node.replaceClass("normal", val);
            if (node.hasClass("folder")) {
                node.query(".info .status").html(fix);
            } else {
                node.query(".info").html(fix);
            }
            node.query("em").set("title", "").replaceClass("prohibit", val);
            node.query(".progress").hide();
            node.query(".title em").hide();
        } catch (ex) {
            throw new Error("YP:upload, app-upload setItemStatus. " + ex.message);
        }
    };
    return Dom.ready(function() {
        setTimeout(function() {
            if (!el) {
                init();
            }
        }, 2E3);
    }), function() {
        if (!el) {
            init();
        }
        filter();
        handle();
        if (l) {
            show();
        } else {
            el.show();
        }
    };
}(), Dom.ready(function() {
    /**
     * @return {undefined}
     */
    function draw() {
        Ajax.post("/upload/getuploadaddress/", function(body) {
            /** @type {*} */
            body = eval("(" + body + ")");
            ypDomain.up = body.data.up;
            ypDomain.tk = body.data.tk;
        });
    }
    var supportPlugin = yunpn.upload.detectCapability();
    if (supportPlugin.supportPlugin) {
        if (yunpn.filelist.curFunc == "file") {
            W("#toolbar .upload .icon").replaceClass("icon-upload", "icon-plugin-upload");
        }
    }
    draw();
    /** @type {number} */
    var id = setInterval(draw, 6E5);
}), yunpn.cmdCenter.checkFile = function() {
    /**
     * @return {undefined}
     */
    function onerror() {
        /** @type {number} */
        var i = 0;
        var messages = self.filesInWait;
        var l = messages.length;
        for (;i < l;i++) {
            messages[i].status = UPDATE;
        }
    }
    /**
     * @return {undefined}
     */
    function onError() {
        var data = self.filesInWait.list;
        /** @type {number} */
        var i = content.length - 1;
        for (;i >= 0;i--) {
            var tagName = content[i];
            /** @type {number} */
            var idx = 0;
            var len = data.length;
            for (;idx < len;idx++) {
                if (tagName == data[idx].name) {
                    data[idx].status = UPDATE;
                    break;
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function handler() {
        if (container.query("input")[0].checked) {
            onError();
            end();
        } else {
            var e = content.shift().toLowerCase();
            /** @type {number} */
            var i = 0;
            var data = self.filesInWait.list;
            var iLen = data.length;
            for (;i < iLen;i++) {
                if (e == data[i].name.toLowerCase()) {
                    data[i].status = UPDATE;
                    break;
                }
            }
            if (content.length == 0) {
                end();
            } else {
                render();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function update() {
        if (container.query("input")[0].checked) {
            /** @type {Array} */
            content = [];
            end();
        } else {
            content.shift();
            if (content.length == 0) {
                end();
            } else {
                render();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function render() {
        if (content.length > 0) {
            if (!overlay) {
                overlay = yunpn.dialog.create({
                    body : '<div id="duplicate"></div>',
                    title : "\u4e91\u76d8\u5df2\u5305\u542b\u540c\u540d\u6587\u4ef6",
                    withClose : true,
                    className : "panel-t1 y-msg-dia y-msg-confirm-dia",
                    buttons : [{
                        text : "\u786e\u5b9a",
                        /** @type {function (): undefined} */
                        handler : update
                    }, {
                        text : "\u53d6\u6d88",
                        /** @type {function (): undefined} */
                        handler : handler
                    }]
                });
                overlay.on("afterhide", function() {
                    return;
                });
                container = W("#duplicate");
            }
            var template = {
                name : content[0].subByte(30, "\u2026").split("").join("<wbr />"),
                defaultNum : content.length - 1
            };
            container.html(parts.tmpl(template));
            if (content.length <= 1) {
                container.css("height", "100px");
                container.query(".default-all").css("display", "none");
            } else {
                container.css("height", "120px");
                container.query(".default-all").css("display", "block");
            }
            overlay.show();
        }
    }
    /**
     * @return {undefined}
     */
    function end() {
        overlay.hide();
        self.resume();
    }
    /**
     * @return {undefined}
     */
    function init() {
        if (params.length > 0) {
            var ps = self.filesInWait.path + params.shift();
            Ajax.post(self.filesInWait.curFunc == "file" ? "/file/mkdir/" : "/sFile/mkdir/", {
                path : ps
            }, function(err) {
                err = err.evalExp();
                if (err.errno == 0 || err.errno == 3005) {
                    init();
                    return;
                }
                if (err.errno) {
                    self.filesInWait.status = UPDATE;
                    self.resume();
                    $.alert("\u521b\u5efa\u76ee\u5f55\u5931\u8d25");
                    return;
                }
            });
        } else {
            var data = self.filesInWait.list;
            /** @type {number} */
            var idx = data.length - 1;
            for (;idx >= 0;idx--) {
                if (data[idx].isFolder) {
                    data.splice(idx, 1);
                }
            }
            self.resume();
        }
    }
    /**
     * @return {undefined}
     */
    function next() {
        var worlds = self.filesInWait.list;
        /** @type {Array} */
        params = [];
        /** @type {Array} */
        var arr = [];
        /** @type {number} */
        var i = 0;
        var max = worlds.length;
        for (;i < max;i++) {
            var item = worlds[i];
            var tmp = item.relativePath;
            tmp = tmp.substring(0, tmp.lastIndexOf("/"));
            if (arr.indexOf(tmp) < 0) {
                arr.push(tmp);
            }
            if (item.isFolder) {
                item.status = UPDATE;
            }
        }
        /** @type {number} */
        i = 0;
        /** @type {number} */
        max = arr.length;
        for (;i < max;i++) {
            var paths = arr[i].split("/");
            var param = paths[0] + "/";
            if (params.indexOf(param) < 0) {
                params.push(param);
            }
            /** @type {number} */
            var j = 1;
            var pl = paths.length;
            for (;j < pl;j++) {
                param += paths[j] + "/";
                if (params.indexOf(param) < 0) {
                    params.push(param);
                }
            }
        }
        if (params.length < 0) {
            self.filesInWait.status = UPDATE;
            self.resume();
        } else {
            init();
        }
    }
    /**
     * @param {Array} d
     * @param {?} name
     * @param {Object} v
     * @param {?} value
     * @return {?}
     */
    function def(d, name, v, value) {
        v = v.toLowerCase();
        /** @type {number} */
        var i = 0;
        var l = d.length;
        for (;i < l;i++) {
            if (name == value && d[i].toLowerCase() == v) {
                return i;
            }
        }
        return-1;
    }
    var self;
    var overlay;
    var container;
    var content;
    var UPDATE = yunpn.upload.STATUS_CANCELLED;
    var UPLOAD_TYPE_PLUGIN = yunpn.upload.UPLOAD_TYPE_PLUGIN;
    /** @type {string} */
    var parts = ['<div class="msg-panel msg-warning-tip">', '<div class="msg-text-box">', '<div class="msg-text" style="width:210px;">\u60a8\u4e0a\u4f20\u7684\u201c{$name}\u201d\u5df2\u5b58\u5728\uff0c\u662f\u5426\u786e\u8ba4\u8986\u76d6\uff1f</div>', '<div class="default-all"><input id="defaultAll" type="checkbox"/><label for="defaultAll">\u540e\u7eed{$defaultNum}\u9879\u540c\u6837\u5904\u7406</label></div>', "</div>", "</div>"].join("");
    var params;
    return function(dataAndEvents, js) {
        /** @type {string} */
        self = js;
        var item = self.filesInWait;
        if (dataAndEvents) {
            var data = {};
            var value = item.curFunc;
            if (value == "sFile") {
                data.nid = yunpn.filelist.nid;
            } else {
                data.dir = yunpn.filelist.path;
            }
            data["fname[]"] = item.folderName;
            Ajax.post(item.curFunc == "file" ? "/file/detectFileExists" : "/sFile/detectFileExists", data, function(dataAndEvents) {
                var res = dataAndEvents.evalExp();
                if (res.errno != 0) {
                    if (res.errno === 3007) {
                        $.alert("\u8981\u4e0a\u4f20\u5230\u7684\u76ee\u5f55\u4e0d\u5b58\u5728!");
                    } else {
                        $.alert("\u6587\u4ef6\u540c\u540d\u68c0\u67e5\u5931\u8d25\uff01");
                    }
                    item.status = yunpn.upload.STATUS_CANCELLED;
                    self.resume();
                    return;
                }
                if (res.data.exists.length > 0) {
                    $.alert("\u4e0a\u4f20\u7684\u6587\u4ef6\u5939\u4e0e\u5df2\u5b58\u5728\u7684\u6587\u4ef6(\u5939)\u91cd\u540d\uff0c\u8bf7\u4fee\u6539\u6587\u4ef6\u5939\u540d\u79f0\u540e\u518d\u4e0a\u4f20");
                    item.status = yunpn.upload.STATUS_CANCELLED;
                    self.resume();
                    return;
                }
                if (item.uploadType == yunpn.upload.UPLOAD_TYPE_PLUGIN) {
                    self.resume();
                } else {
                    next();
                }
            });
        } else {
            if (item.list.length <= 0) {
                self.resume();
            }
            var items = item.list;
            var helpers = self.info.fileMap;
            var p = items[0].path;
            /** @type {Array} */
            var g = [];
            value = item.curFunc;
            /** @type {number} */
            var i = 0;
            var valuesLen = items.length;
            for (;i < valuesLen;i++) {
                g.push(items[i].name);
            }
            data = {};
            if (value == "sFile") {
                data.nid = yunpn.filelist.nid;
            } else {
                data.dir = yunpn.filelist.path;
            }
            /** @type {Array} */
            data["fname[]"] = g;
            Ajax.post(item.curFunc == "file" ? "/file/detectFileExists" : "/sFile/detectFileExists", data, function(dataAndEvents) {
                var res = dataAndEvents.evalExp();
                if (res.errno != 0) {
                    if (res.errno === 3007) {
                        $.alert("\u6587\u4ef6\u6216\u76ee\u5f55\u4e0d\u5b58\u5728!");
                    } else {
                        $.alert("\u6587\u4ef6\u540c\u540d\u68c0\u67e5\u5931\u8d25\uff01");
                    }
                    self.resume();
                    return;
                }
                var val = res.data.exists;
                W("#uploadItemList").query("li.normal, li.pass").forEach(function($rootScope) {
                    var element = W($rootScope);
                    var cx = element.attr("data-name");
                    if (!element.attr("id") || !helpers[element.attr("id")]) {
                        return;
                    }
                    var udataCur = helpers[element.attr("id")].path || "";
                    if (element.hasClass("sfile") && value == "sFile" || !element.hasClass("sfile") && value != "sFile") {
                        if (def(g, p, cx, udataCur) >= 0) {
                            if (def(val, p, cx, udataCur) < 0) {
                                val.push(cx);
                            }
                        }
                    }
                });
                if (val.length > 0) {
                    content = val;
                    render();
                } else {
                    self.resume();
                }
            });
        }
    };
}(), yunpn.menuManager = function() {
    /**
     * @return {undefined}
     */
    function toggle() {
        values.forEach(function(poster) {
            poster.hide();
        });
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function addClass(name) {
        values.push(name);
    }
    /**
     * @param {Array} view
     * @return {undefined}
     */
    function f(view) {
        var action = Object.isString(view) ? view : view.config.id;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var valuesLen = values.length;
        for (;i < valuesLen;i++) {
            if (values[i].config.id == action) {
                values.remove(values[i]);
                break;
            }
            continue;
        }
    }
    /**
     * @param {Array} obj
     * @return {undefined}
     */
    function trigger(obj) {
        var id = Object.isString(obj) ? obj : obj.config.id;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var valuesLen = values.length;
        for (;i < valuesLen;i++) {
            if (values[i].config.id == id) {
                values[i].hide();
                break;
            }
            continue;
        }
    }
    /**
     * @return {undefined}
     */
    function updateSize() {
        var $cont = Dom.getDocRect();
        element.css({
            width : $cont.width - 1 + "px",
            height : $cont.height - 1 + "px"
        });
        element.css("display", "block");
    }
    /**
     * @return {undefined}
     */
    function setup() {
        if (element) {
            if (element.css) {
                element.css("display", "none");
            }
        }
    }
    /** @type {Array} */
    var values = [];
    var element;
    return Dom.ready(function() {
        element = W('<div style="zoom:1;z-index:99;position:absolute;left:0;top:0;background-color:#fff;opacity:0;filter:alpha(opacity=0);display: none;"></div>').insertTo("beforeend", document.body);
        element.on("mousedown", toggle);
    }), {
        /** @type {function (string): undefined} */
        add : addClass,
        /** @type {function (Array): undefined} */
        remove : f,
        /** @type {function (Array): undefined} */
        hide : trigger,
        /** @type {function (): undefined} */
        hideAll : toggle,
        /** @type {function (): undefined} */
        showBg : updateSize,
        /** @type {function (): undefined} */
        hideBg : setup
    };
}(), yunpn.Menu = function(options) {
    this.config = ObjectH.mix({
        id : yunpn.id(),
        listeners : {},
        dock : "bottom",
        marginLeft : 0,
        marginTop : 0
    }, options, true);
    /** @type {null} */
    this.oWrap = null;
    /** @type {null} */
    this.oTarget = null;
    /** @type {null} */
    this.currentTarget = null;
    this.init();
    yunpn.menuManager.add(this);
}, yunpn.Menu.prototype = {
    /**
     * @return {undefined}
     */
    init : function() {
        var config = this.config;
        var fixHook = this;
        /** @type {Array} */
        html = [];
        itemTpl = '<li {$_attrs} class="item {$cls}"><a class="{$linkCls}" href="#" onclick="return false;"><i class="icon {$iconCls}"></i><span class="text {$textCls}">{$text}</span></a></li>'.tmpl();
        if (config.items) {
            html.push('<div id="' + config.id + '" style="' + (config.width ? "width:" + config.width + "px" : "") + '" class="menu menu-sys' + (config.cls ? " " + config.cls : "") + '">');
            html.push("<ul>");
            config.items.forEach(function(data) {
                /** @type {string} */
                var attrs = "";
                if (data.attrs) {
                    var k;
                    for (k in data.attrs) {
                        attrs += k + '="' + data.attrs[k] + '" ';
                    }
                }
                /** @type {string} */
                data._attrs = attrs;
                if (!data.iconCls) {
                    /** @type {string} */
                    data.cls = (data.cls || "") + " icon-none";
                }
                html.push(itemTpl(data));
            });
            html.push("</ul>");
            html.push("</div>");
            this.oWrap = W(html.join("")).insertTo("beforeend", document.body);
            this.oWrap.on("contextmenu", function(types) {
                types.preventDefault();
            });
            if (config.delegates) {
                config.delegates.forEach(function(opts) {
                    if (opts.query) {
                        W(opts.selector).delegate(opts.query, "contextmenu", function(event) {
                            if (config.conditionCheck && !config.conditionCheck(event)) {
                                return;
                            }
                            fixHook.show(event, this);
                            event.stopPropagation();
                        }).on("contextmenu", function(types) {
                            types.preventDefault();
                        });
                    } else {
                        W(opts.selector).on("contextmenu", function(event) {
                            if (config.conditionCheck && !config.conditionCheck(event)) {
                                return;
                            }
                            if (event.target == this) {
                                fixHook.show(event, this);
                                event.preventDefault();
                            }
                        });
                    }
                });
            } else {
                if (config.target) {
                    this.oTarget = W(config.target);
                    this.oTarget.on("contextmenu", function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        fixHook.show(event, this);
                    }).on("click", function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        fixHook.show(event, this);
                    });
                }
            }
            var self = this;
            this.oWrap.query("li").forEach(function($window, item) {
                if (config.items[item].handler) {
                    var eventType = this;
                    W($window).on("click", function(dd) {
                        var trigger = config.items[item].handler.bind(eventType);
                        var e = self.oWrap.getRect();
                        trigger(self.currentTarget, dd, e);
                        self.hide();
                    }).on("mousedown", function(event) {
                        event.stopPropagation();
                    });
                }
            });
        }
    },
    /**
     * @param {string} e
     * @param {Object} value
     * @return {undefined}
     */
    show : function(e, value) {
        /** @type {Object} */
        this.currentTarget = value;
        if (ObjectH.isFunction(this.config.listeners.beforeshow)) {
            var isFunction = this.config.listeners.beforeshow.bind(value);
            var func = isFunction();
            if (func === false) {
                return;
            }
        }
        /** @type {number} */
        var x = 0;
        /** @type {number} */
        var height = 0;
        var w = Dom.getDocRect();
        var i = this.config.marginLeft;
        var h = this.config.marginTop;
        if (this.oTarget) {
            var bounds = this.oTarget.getRect();
            var origin = this.oWrap.getRect();
            switch(this.config.dock) {
                case "top":
                    x = bounds.left + i;
                    height = bounds.top - origin.height + h;
                    break;
                case "right":
                    x = bounds.left + bounds.width + i;
                    height = bounds.top + h;
                    break;
                case "left":
                    x = bounds.left - origin.width + i;
                    height = bounds.top + h;
                    break;
                default:
                    x = bounds.left + i;
                    height = bounds.top + bounds.height + h;
            }
            x -= w.scrollX;
            height -= w.scrollY;
        } else {
            x = e.clientX + i;
            height = e.clientY + h;
            bounds = this.oWrap.getRect();
            w = Dom.getDocRect();
            if (bounds.height + height > w.height) {
                /** @type {number} */
                height = w.height - bounds.height;
            }
            if (bounds.width + x > w.width) {
                /** @type {number} */
                x = w.width - bounds.width;
            }
            if (height < 0) {
                /** @type {number} */
                height = 0;
            }
            if (x < 0) {
                /** @type {number} */
                x = 0;
            }
        }
        this.oWrap.css({
            left : x + "px",
            top : height + "px"
        });
        yunpn.menuManager.showBg();
        if (ObjectH.isFunction(this.config.listeners.aftershow)) {
            isFunction = this.config.listeners.aftershow.bind(value);
            isFunction();
        }
    },
    /**
     * @return {undefined}
     */
    hide : function() {
        this.oWrap.css({
            left : "-10000px",
            top : "-10000px"
        });
        yunpn.menuManager.hideBg();
    },
    /**
     * @param {?} el
     * @return {undefined}
     */
    hideItem : function(el) {
        this.oWrap.query(el).hide();
    },
    /**
     * @param {?} id
     * @return {undefined}
     */
    showItem : function(id) {
        this.oWrap.query(id).show();
    }
}, yunpn.Search = function() {
    /**
     * @return {undefined}
     */
    function nextTick() {
        if (type != IMAGE) {
            return;
        }
        load();
        setTimeout(nextTick, backoff);
    }
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    function load(dataAndEvents) {
        if (!d) {
            var c = element.val().toLowerCase();
            if (c == token && !dataAndEvents) {
                return;
            }
            /** @type {boolean} */
            d = true;
            if (c) {
                token = c;
                failures.forEach(function(self, dataAndEvents) {
                    var index = self.oriName.indexOf(token);
                    self.node.query(".text").html(self.name);
                    if (index < 0) {
                        self.node.hide();
                    } else {
                        var text = self.name;
                        var i = text.indexOf("</span>");
                        /** @type {string} */
                        var protocol = "";
                        /** @type {string} */
                        var fix = "";
                        if (i >= 0) {
                            protocol = text.substring(0, i + 6 + 1);
                            text = text.substring(i + 6 + 1);
                        }
                        if (self.sName.indexOf(token) >= 0) {
                            fix = protocol + text.substring(0, index) + '<span class="hl">' + text.substr(index, token.length) + "</span>" + text.substr(index + token.length);
                        } else {
                            var pos = text.lastIndexOf("...");
                            var header = text.substring(0, pos);
                            /** @type {string} */
                            fix = protocol + text.substring(0, index) + '<span class="hl">' + header.substr(index) + "</span>" + "...";
                        }
                        self.node.query(".text").html(fix);
                        self.node.show();
                    }
                });
            } else {
                /** @type {string} */
                token = "";
                start();
            }
            yunpn.filelist.resizeHolder();
            /** @type {boolean} */
            d = false;
        }
    }
    /**
     * @return {undefined}
     */
    function reset() {
        if (type == remove) {
            render();
        }
        path = yunpn.filelist.path;
        overlay.show();
        loading.hide();
        setTimeout(nextTick, backoff);
        /** @type {number} */
        type = IMAGE;
        W("#search").removeClass("search-none").removeClass("search-have-content").addClass("search-focus");
        monitor.clickLog("\u641c\u7d22");
    }
    /**
     * @return {undefined}
     */
    function render() {
        /** @type {boolean} */
        h = yunpn.filelist.listtype == 2;
        /** @type {boolean} */
        recycle = yunpn.filelist.curFunc == "recycle";
        /** @type {number} */
        failures.length = 0;
        var asserterNames;
        asserterNames = W("#list li");
        asserterNames.forEach(function(node) {
            node = W(node);
            var key = node.query(".text").html();
            failures.push({
                name : key,
                sName : key.toLowerCase(),
                oriName : node.attr("data-title").toLowerCase(),
                node : node
            });
        });
    }
    /**
     * @return {undefined}
     */
    function thumbSource() {
        /** @type {number} */
        type = fx;
    }
    /**
     * @return {undefined}
     */
    function start() {
        failures.forEach(function(self, dataAndEvents) {
            self.node.query(".text").html(self.name);
            self.node.show();
        });
    }
    /**
     * @return {undefined}
     */
    function done() {
        try {
            start();
        } catch (e) {
        }
        W("#listHolder .page-nav").show();
        /** @type {number} */
        type = remove;
        /** @type {string} */
        token = "";
        /** @type {number} */
        failures.length = 0;
        yunpn.filelist.resizeHolder();
        overlay.hide();
        loading.show();
    }
    /**
     * @return {undefined}
     */
    function finish() {
        if (path == yunpn.filelist.path) {
            if (type == fx) {
                render();
                load(true);
            }
        } else {
            if (type != remove) {
                element.val("");
                W("#searchInput").blur();
                done();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function init() {
        element = W("#search .search-text");
        loading = W("#search .ss-search");
        overlay = W("#search .ss-close");
        sPlaceholder = W("#searchPlaceholder");
        overlay.on("click", function() {
            element.val("");
            done();
            yunpn.cmdCenter.updateStatus();
        });
        /** @type {boolean} */
        isSym = "placeholder" in document.createElement("input");
        html = isSym ? "" : element.attr("data-placeholder");
        element.on("focus", function() {
            if (!isSym) {
                sPlaceholder.hide();
            }
            reset();
            W("#listHolder .page-nav").hide();
        }).on("blur", function() {
            if (!isSym) {
                if (this.value == "") {
                    sPlaceholder.show();
                }
            }
            if (this.value) {
                thumbSource();
                W("#search").removeClass("search-none").removeClass("search-focus").addClass("search-have-content");
            } else {
                done();
                W("#search").removeClass("search-have-content").removeClass("search-focus").addClass("search-none");
            }
        });
        if (isSym) {
            sPlaceholder.hide();
        } else {
            sPlaceholder.show();
            sPlaceholder.on("mousedown", function() {
                sPlaceholder.hide();
                setTimeout(function() {
                    element.focus();
                }, 10);
            });
        }
    }
    var element;
    /** @type {Array} */
    var failures = [];
    /** @type {number} */
    var backoff = 100;
    /** @type {boolean} */
    var h = true;
    var recycle;
    /** @type {boolean} */
    var d = false;
    /** @type {string} */
    var token = "";
    var overlay;
    var loading;
    /** @type {string} */
    var path = "";
    var isSym;
    var html;
    /** @type {number} */
    var remove = 0;
    /** @type {number} */
    var fx = 1;
    /** @type {number} */
    var IMAGE = 2;
    /** @type {number} */
    var type = remove;
    return{
        /** @type {function (): undefined} */
        init : init,
        /** @type {function (): undefined} */
        research : finish
    };
}(), Dom.ready(function() {
    yunpn.Search.init();
}), yunpn.gallary = function() {
    /**
     * @return {?}
     */
    function stop() {
        var form = createElement("div", {
            className : "imagePreviewmask",
            tabIndex : -1,
            unselectable : "on"
        });
        return self && (form.innerHTML = '<div unselectable="on"></div><iframe src="' + L + '"></iframe>'), document.body.insertBefore(form, document.body.firstChild), form;
    }
    /**
     * @return {undefined}
     */
    function move() {
        var p = el.offsetParent;
        /** @type {Element} */
        var elem = document.documentElement;
        var c = el.style;
        if (parseInt(c.top, 10) != p.scrollTop || parseInt(c.left, 10) != p.scrollLeft) {
            c.top = p.scrollTop;
            c.left = p.scrollLeft;
        }
        if (elem.clientHeight != el.offsetHeight) {
            /** @type {number} */
            c.height = elem.clientHeight;
        }
        if (elem.clientWidth != el.offsetWidth) {
            /** @type {number} */
            c.width = elem.clientWidth;
        }
    }
    /**
     * @param {?} ui
     * @return {undefined}
     */
    function start(ui) {
        /** @type {string} */
        var top = "my";
        switch(ui) {
            case "link":
                /** @type {string} */
                top = "imgList-link";
                break;
            case "my":
                /** @type {string} */
                top = "imgList-my";
                break;
            case "group":
                /** @type {string} */
                top = "imgList-group";
                break;
            default:
                ;
        }
        var div = createElement("div", {
            id : "imageScreen"
        });
        /** @type {string} */
        var s = ['<div class="hd">', '<div class="imgInfo">', '<span class="info"></span>', '<span class="num">(<span class="currentNum"></span>/<span class="totalNums"></span>)</span>', "</div>", '<div class="toolbar"></div>', "</div>"].join("");
        /** @type {string} */
        var i = ['<div class="bd">', '<div id="imgList" class="' + top + '"></div>', '<div class="preBtnContainer"><a class="preBtn" title="\u4e0a\u4e00\u5f20" href="###" onclick="return false;"></a></div>', '<div class="nextBtnContainer"><a class="nextBtn" title="\u4e0b\u4e00\u5f20" href="###" onclick="return false;"></a></div>', "</div>", '<div class="viewMask" style="display:none"></div>', '<div class="viewToolbarBack"><div class="viemask"></div>', '<div class="viewToolbar"><p class="viewBack">\u5173\u95ed\u539f\u56fe</p></div></div>',
            '<div class="view"><img src="/resource/img/blank.gif" /></div>'].join("");
        /** @type {string} */
        div.innerHTML = s + i;
        document.body.insertBefore(div, document.body.firstChild);
        el = el || stop();
        css(el, {
            zIndex : 1E4,
            display : "block"
        });
        if (self) {
            /** @type {string} */
            div.style.height = Highcharts.getDocRect().height + "px";
            move(el);
            clearInterval(interval);
            /** @type {number} */
            interval = setInterval(move, 1E3);
        }
    }
    /**
     * @param {?} index
     * @return {undefined}
     */
    function activate(index) {
        /** @type {number} */
        var i = parseInt(index, 10);
        header.setHtml(i + 1);
        rtn.setHtml(a[i]);
        _.attr("href", results[i]);
    }
    /**
     * @param {number} index
     * @return {undefined}
     */
    function close(index) {
        if (scount == 1) {
            thingy.hide();
            p.hide();
            $contentContainer.css("cursor", "default");
            $close.css("cursor", "default");
            return;
        }
        if (index == 0 || index == scount - 1) {
            if (index == 0) {
                thingy.hide();
                p.show();
                $contentContainer.css("cursor", "default");
                $close.css("cursor", "pointer");
            } else {
                p.hide();
                thingy.show();
                $contentContainer.css("cursor", "pointer");
                $close.css("cursor", "default");
            }
        } else {
            thingy.show();
            p.show();
            $contentContainer.css("cursor", "pointer");
            $close.css("cursor", "pointer");
        }
    }
    /**
     * @return {undefined}
     */
    function setFillAndStroke() {
        var child = Highcharts.getDocRect();
        var m = child.width;
        var oldHeight = child.height;
        /** @type {number} */
        scroll.W = arg2 * m;
        /** @type {number} */
        scroll.H = r * (oldHeight - 120);
        /** @type {number} */
        scroll.L = (1 - arg2) * m / 2;
        /** @type {number} */
        scroll.T = F * (oldHeight - 120) + 57;
        /** @type {number} */
        scroll.lW = scroll.rW = n * m;
        /** @type {number} */
        scroll.lH = scroll.rH = rH * (oldHeight - 120);
        /** @type {number} */
        scroll.lL = scroll.rR = rR * m;
        /** @type {number} */
        scroll.lT = scroll.rT = (scroll.H - scroll.lH) / 2 + 57;
        /** @type {number} */
        scroll.rL = (1 - rR) * m - scroll.lW;
        /** @type {number} */
        scroll.llW = scroll.rrW = rrW * m;
        /** @type {number} */
        scroll.llH = scroll.rrH = rrH * (oldHeight - 120);
        /** @type {number} */
        scroll.llL = scroll.rrR = rrR * m;
        /** @type {number} */
        scroll.llT = scroll.rrT = (scroll.H - scroll.llH) / 2 + 57;
        /** @type {number} */
        scroll.rrL = (1 - rrR) * m - scroll.llW;
        arr[4] = {
            w : scroll.llW,
            h : scroll.llH,
            l : scroll.llL,
            t : scroll.llT
        };
        arr[3] = {
            w : scroll.lW,
            h : scroll.lH,
            l : scroll.lL,
            t : scroll.lT
        };
        arr[2] = {
            w : scroll.W,
            h : scroll.H,
            l : scroll.L,
            t : scroll.T
        };
        arr[1] = {
            w : scroll.rW,
            h : scroll.rH,
            l : scroll.rL,
            t : scroll.rT
        };
        arr[0] = {
            w : scroll.rrW,
            h : scroll.rrH,
            l : scroll.rrL,
            t : scroll.rrT
        };
    }
    /**
     * @param {?} string
     * @param {Object} e
     * @return {?}
     */
    function fn(string, e) {
        var div = W(string).query("img");
        /** @type {number} */
        var m = div.attr("data-width") | 0;
        /** @type {number} */
        var ms = div.attr("data-height") | 0;
        var w = e.w;
        var h = e.h;
        /** @type {number} */
        var width = 0;
        /** @type {number} */
        var height = 0;
        /** @type {number} */
        var y = ms / m;
        if (w < 10 || h < 10) {
            /** @type {number} */
            width = 10;
            /** @type {number} */
            height = 10;
        } else {
            /** @type {number} */
            var p = m / w;
            /** @type {number} */
            var pl = ms / h;
            if (p > 1 || pl > 1) {
                if (p < pl) {
                    height = h;
                    /** @type {number} */
                    width = height / y;
                } else {
                    width = w;
                    /** @type {number} */
                    height = y * width;
                }
            } else {
                /** @type {number} */
                width = m;
                /** @type {number} */
                height = ms;
            }
        }
        var b = {
            width : width,
            height : height,
            left : (e.w - width) / 2 + e.l,
            top : (e.h - height) / 2 + e.t
        };
        return b;
    }
    /**
     * @param {?} cb
     * @return {undefined}
     */
    function render(cb) {
        var $item = W(cb).query("img");
        if ($item.attr("data-width") | 0) {
            init(cb);
        } else {
            yunpn.util.imgSize($item.attr("data-url"), function() {
                $item.attr({
                    "data-width" : this.width,
                    "data-height" : this.height,
                    src : $item.attr("data-url")
                });
                init(cb);
            });
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    function init(error) {
        if (!error && (anim && anim.isPlaying())) {
            return false;
        }
        if (!arr.length) {
            setFillAndStroke();
        }
        /** @type {Array} */
        var errors = [];
        if (error) {
            errors.push(error);
        } else {
            /** @type {number} */
            var type = Math.max(0, index - 2);
            for (;type <= index + 2 && type < data.length;type++) {
                if (data.item(type).attr("data-width") | 0) {
                    errors.push(items[type]);
                }
            }
        }
        /** @type {number} */
        type = 0;
        for (;type < errors.length;type++) {
            var item = errors[type];
            /** @type {boolean} */
            var show = false;
            /** @type {number} */
            var i = Math.max(0, index - 2);
            for (;i <= index + 2 && type < items.length;i++) {
                if (item === items[i]) {
                    var properties = fn(item, arr[index - i + 2]);
                    var key;
                    for (key in properties) {
                        /** @type {string} */
                        properties[key] = (properties[key] | 0) + "px";
                    }
                    W(item).css(properties).css("zIndex", 3 - Math.abs(index - i));
                    if (i == index) {
                        W(item).addClass("cur");
                    }
                    /** @type {boolean} */
                    show = true;
                    break;
                }
            }
            W(item).css("display", show ? "block" : "none");
        }
        /** @type {number} */
        var ud = (arr[1].h - 43) / 2;
        /** @type {Array} */
        var colors = [thingy, p];
        /** @type {number} */
        type = 0;
        for (;type < 2;type++) {
            colors[type].css({
                top : arr[1].t - 56 + ud + "px"
            });
        }
        close(index);
    }
    /**
     * @param {Array} input
     * @param {Function} event
     * @return {undefined}
     */
    function resize(input, event) {
        /** @type {Array} */
        var matches = [];
        /** @type {Array} */
        fromRects = [];
        /** @type {Array} */
        toRects = [];
        /** @type {number} */
        var pos = 0;
        for (;pos < input.length;pos++) {
            var elem = input[pos];
            if (elem) {
                matches.push(elem);
                fromRects.push({
                    width : parseInt(elem.style.width),
                    height : parseInt(elem.style.height),
                    left : parseInt(elem.style.left),
                    top : parseInt(elem.style.top)
                });
                toRects.push(fn(elem, arr[pos]));
            }
        }
        anim = new Anim(function(existingFn) {
            var pos = QW.Easing.easeBothStrong(existingFn);
            /** @type {number} */
            var i = 0;
            for (;i < matches.length;i++) {
                /** @type {string} */
                matches[i].style.cssText = ["z-index:" + matches[i].style.zIndex, "width:" + Math.round(fromRects[i].width + (toRects[i].width - fromRects[i].width) * pos) + "px", "height:" + Math.round(fromRects[i].height + (toRects[i].height - fromRects[i].height) * pos) + "px", "left:" + Math.round(fromRects[i].left + (toRects[i].left - fromRects[i].left) * pos) + "px", "top:" + Math.round(fromRects[i].top + (toRects[i].top - fromRects[i].top) * pos) + "px"].join(";");
            }
        }, 500, {
            frameTime : 16,
            /** @type {Function} */
            onend : event
        });
        anim.play();
    }
    /**
     * @param {number} start
     * @return {undefined}
     */
    function remove(start) {
        list.splice(start, 1);
        a.splice(start, 1);
        results.splice(start, 1);
        start = index;
        for (;start < scount;start++) {
            /** @type {number} */
            var cp = parseInt(W(data[start]).attr("data-index"), 10);
            W(data[start]).attr("data-index", cp - 1);
        }
        if (scount == 1) {
            initialize();
            return;
        }
        items.item(index).removeNode();
        if (index == scount - 1) {
            index--;
        }
        items = W("#imgList .bimg");
        data = W("#imgList img");
        if (index + 2 < items.length) {
            render(items[index + 2]);
        }
        if (index - 2 > 0) {
            render(items[index - 2]);
        }
        init();
        scount--;
        W("#imageScreen .totalNums").setHtml(scount);
        activate(index);
        close(index);
    }
    /**
     * @return {undefined}
     */
    function destroy() {
        /** @type {Array} */
        var tagNameArr = [];
        /** @type {Array} */
        var t = [];
        var container = W("#imgList");
        var thumList = W("#thumList");
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
            tagNameArr.push('<div class="bimg" style="display:none"><img data-index=' + (i + 1) + ' data-url="' + codeSegments[i] + '" data-width="0" data-height="0" src="/resource/img/blank.gif"/></div>');
        }
        tagNameArr.push('<div id="imgMask"></div>');
        container.html(tagNameArr.join(""));
        items = container.query(".bimg");
        data = container.query("img");
        /** @type {Array} */
        var methods = [index, index - 1, index + 1, index - 2, index + 2];
        /** @type {number} */
        i = 0;
        for (;i < 5;i++) {
            if (methods[i] >= 0) {
                if (methods[i] < items.length) {
                    render(items[methods[i]]);
                }
            }
        }
    }
    /**
     * @param {number} recurring
     * @return {undefined}
     */
    function show(recurring) {
        if (anim && anim.isPlaying()) {
            return;
        }
        W("#delete-confirm").hide();
        if (recurring == 0) {
            if (index == 0 || (data.item(index - 1).attr("data-width") | 0) == 0) {
                return;
            }
            index--;
        } else {
            if (index == data.length - 1 || (data.item(index + 1).attr("data-width") | 0) == 0) {
                return;
            }
            index++;
        }
        /** @type {Array} */
        var result = new Array(5);
        /** @type {number} */
        var a = Math.max(0, index - 3);
        for (;a < data.length && a <= index + 3;a++) {
            /** @type {number} */
            var i = Math.abs(a - index);
            var el = items.item(a);
            var element = data.item(a);
            el.css({
                display : i > 2 || !(element.attr("data-width") | 0) ? "none" : "block",
                zIndex : 3 - i
            });
            if (i == 2) {
                render(items[a]);
            } else {
                if (i < 2) {
                    if (element.attr("data-width") | 0) {
                        result[index - a + 2] = items[a];
                    } else {
                        render(items[a]);
                    }
                    if (i == 1) {
                        el.removeClass("cur");
                    }
                    if (i == 0) {
                        el.addClass("cur");
                    }
                }
            }
        }
        resize(result, function() {
            monitor.clickLog("gallary\u7ffb\u9875");
            if (Mt) {
                setTimeout(function() {
                    show(recurring);
                }, 10);
            }
        });
        activate(index);
        close(index);
    }
    /**
     * @return {undefined}
     */
    function unbind() {
        W("#imageScreen .close").on("click", initialize);
        W("#imageScreen .dow").on("click", cb);
        W("#imageScreen .sharedow").on("click", firstChange);
        W("#imageScreen .del").on("click", callback);
        W("#delete-confirm .yes").on("click", handler);
        W("#delete-confirm .no").on("click", mousemove);
        W("#imageScreen .nextBtnContainer,#imageScreen .preBtnContainer").on("mouseenter", change);
        W("#imageScreen .nextBtnContainer,#imageScreen .preBtnContainer").on("mouseleave", toggle);
        W("#imageScreen .nextBtnContainer,#imageScreen .preBtnContainer").on("mousedown", f);
        W(document).on("keydown", onKeyDown);
        W(document).on("mousewheel", scrollHandler);
        W(window).on("resize,scroll", draw);
        element.on("dblclick", done);
        W("#imageScreen .viewMask").on("dblclick", done);
        W("#imageScreen .viewBack").on("click", done);
    }
    /**
     * @return {undefined}
     */
    function bind() {
        W("#imageScreen .close").un("click", initialize);
        W("#imageScreen .dow").un("click", cb);
        W("#imageScreen .sharedow").un("click", firstChange);
        W("#imageScreen .del").un("click", callback);
        W("#delete-confirm .yes").un("click", handler);
        W("#delete-confirm .no").un("click", mousemove);
        W("#imageScreen .nextBtnContainer,#imageScreen .preBtnContainer").un("mouseenter", change);
        W("#imageScreen .nextBtnContainer,#imageScreen .preBtnContainer").un("mouseleave", toggle);
        W("#imageScreen .nextBtnContainer,#imageScreen .preBtnContainer").un("mousedown", f);
        element.un("dblclick", done);
        W("#imageScreen .viewMask").un("dblclick", done);
        W("#imageScreen .viewBack").un("click", done);
        W(document).un("keydown", onKeyDown);
        W(document).un("mousewheel", scrollHandler);
        W(window).un("resize,scroll", draw);
    }
    /**
     * @param {?} dt
     * @return {undefined}
     */
    function tick(dt) {
        var fix;
        if (dt) {
            /** @type {string} */
            fix = ['<p class="close"></p><ul><li class="sharevie"><a href="###" target="_blank">\u67e5\u770b\u539f\u56fe</a>', '<div id="delete-confirm" class="delete-confirm" style="display:none;">', "<p>\u786e\u5b9a\u5220\u9664\u6b64\u56fe\u7247\uff1f</p>", '<a class="yes" href="javascript:void(0)">\u786e\u5b9a</a>', '<a class="no" href="javascript:void(0)">\u53d6\u6d88</a>', "</div></li>", '<li class="sharedow"><a href="###" onclick="return false;">\u4e0b\u8f7d\u539f\u56fe</a></li>', "</ul>"].join("")
            ;
        } else {
            /** @type {string} */
            fix = ['<p class="close"></p><ul>', '<li class="vie"><a href="###" target="_blank">\u67e5\u770b\u539f\u56fe</a></li>', '<li class="dow"><a href="###" onclick="return false;">\u4e0b\u8f7d\u539f\u56fe</a></li>', '<li class="del"><a href="###" onclick="return false;">\u5220\u9664</a>', '<div id="delete-confirm" class="delete-confirm" style="display:none;">', "<p>\u786e\u5b9a\u5220\u9664\u6b64\u56fe\u7247\uff1f</p>", '<a class="yes" href="javascript:void(0)">\u786e\u5b9a</a>', '<a class="no" href="javascript:void(0)">\u53d6\u6d88</a>',
                "</div></li>", "</ul>"].join("");
        }
        W("#imageScreen .toolbar").html(fix);
    }
    /**
     * @param {Object} data
     * @return {undefined}
     */
    function update(data) {
        if (!D) {
            /** @type {boolean} */
            D = true;
            start(data.pos);
            thingy = W("#imageScreen a.preBtn");
            p = W("#imageScreen a.nextBtn");
            header = W("#imageScreen .currentNum");
            rtn = W("#imageScreen .info");
            $contentContainer = W("#imageScreen .preBtnContainer");
            $close = W("#imageScreen .nextBtnContainer");
            element = W("#imageScreen .view");
            ht = new QW.SimpleDrag({
                oSrc : element[0]
            });
        }
        tick(data.noDel);
        list = data.nid;
        a = data.name;
        codeSegments = data.preview;
        results = data.pic;
        imgData = data.data;
        downloadFunc = data.downloadPhoto;
        deleteFunc = data.deletePhoto;
        scount = codeSegments.length;
        index = data.index;
        W("#imageScreen .totalNums").setHtml(scount);
        if (data.noDel) {
            _ = W("#imageScreen .sharevie a");
        } else {
            _ = W("#imageScreen .vie a");
        }
        activate(index);
        destroy();
        unbind(data);
        if (self) {
            W("#imageScreen").css("display", "block");
            W(".imagePreviewmask").css("display", "block");
        } else {
            W("#imageScreen").show();
            W(".imagePreviewmask").show();
        }
        var originalWidth_ = Highcharts.getDocRect().width;
        if (originalWidth_ <= 900) {
            W("#imageScreen .hd .imgInfo").css("margin-left", "0");
        } else {
            W("#imageScreen .hd .imgInfo").css("margin-left", "30%");
        }
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function removeNode(name) {
        if (P) {
            return;
        }
        /** @type {boolean} */
        P = true;
        update(name);
    }
    var mix = QW.ObjectH.mix;
    var self = QW.Browser.ie6;
    var Highcharts = QW.DomU;
    var createElement = Highcharts.createElement;
    var css = NodeH.setStyle;
    var fpAddEventListener = QW.EventTargetH.addEventListener;
    var removeEventListener = QW.EventTargetH.removeEventListener;
    var getTarget = EventH.getTarget;
    var s = Highcharts.getDocRect();
    var prevent = EventH.preventDefault;
    /** @type {string} */
    var L = "about:blank";
    var ElAnim = QW.ElAnim;
    /** @type {string} */
    var optsData = "";
    /** @type {number} */
    var el = 0;
    /** @type {number} */
    var interval = 0;
    /** @type {boolean} */
    var D = false;
    /** @type {boolean} */
    var P = false;
    /** @type {null} */
    var H = null;
    /** @type {number} */
    var arg2 = 1100 / 1440;
    /** @type {number} */
    var r = 560 / 590;
    /** @type {number} */
    var F = 30 / 590;
    /** @type {number} */
    var n = 250 / 1440;
    /** @type {number} */
    var rH = 130 / 590;
    /** @type {number} */
    var rR = RRStep = 55 / 1440;
    /** @type {number} */
    var rrW = 208 / 1440;
    /** @type {number} */
    var rrH = 94 / 590;
    /** @type {number} */
    var rrR = RRRStep = 40 / 1440;
    var scroll = {};
    /** @type {Array} */
    var arr = [];
    var keys = {
        ESC : 27,
        RIGHT : 39,
        LEFT : 37,
        UP : 38,
        DOWN : 40,
        FULL : 70
    };
    /** @type {Array} */
    var codeSegments = [];
    var list;
    var a;
    var results;
    var _;
    var scount;
    var items;
    var data;
    var index;
    var thingy;
    var p;
    var originalWidth = s.width;
    var header;
    var rtn;
    var $close;
    var $contentContainer;
    var element;
    /** @type {null} */
    var ht = null;
    /** @type {null} */
    var anim = null;
    var tref;
    /**
     * @return {undefined}
     */
    var initialize = function() {
        /** @type {boolean} */
        P = false;
        if (self) {
            W("#imageScreen").css("display", "none");
            W(".imagePreviewmask").css("display", "none");
        } else {
            W("#imageScreen").hide();
            W(".imagePreviewmask").hide();
        }
        W("#imgList").html("");
        W("#imageScreen .delete-confirm").hide();
        W("#thumList").html("");
        W("#thumList").css("left", "0");
        thingy.hide();
        p.hide();
        bind();
        /** @type {null} */
        ht = null;
        element.css("display", "none");
        W("#imageScreen .viewMask").css("display", "none");
        W("#imageScreen .view img").attr("src", "/resource/img/blank.gif");
    };
    /**
     * @return {undefined}
     */
    var cb = function() {
        monitor.clickLog("gallary\u4e0b\u8f7d");
        W("#imageScreen .delete-confirm").hide();
        if (imgData && downloadFunc) {
            downloadFunc(imgData[index]);
        } else {
            var el = list[index];
            yunpn.cmdCenter.downloadItem(el);
        }
    };
    /**
     * @return {undefined}
     */
    var firstChange = function() {
        monitor.clickLog("gallary\u5206\u4eab\u4e0b\u8f7d");
        var file = list[index];
        yunpn.cmdCenter.downloadByNid(file, true);
    };
    /**
     * @return {undefined}
     */
    var initEvents = function() {
        monitor.clickLog("gallary\u67e5\u770b\u539f\u56fe");
        W(document).un("keydown", onKeyDown);
        W(document).un("mousewheel", scrollHandler);
    };
    /**
     * @return {undefined}
     */
    var buildDeck = function() {
        monitor.clickLog("gallary\u5206\u4eab\u67e5\u770b\u539f\u56fe");
        W(document).un("keydown", onKeyDown);
        W(document).un("mousewheel", scrollHandler);
        var file = list[index];
        yunpn.cmdCenter.viewByNid(file);
    };
    /**
     * @return {undefined}
     */
    var done = function() {
        element.css("display", "none");
        W("#imageScreen .viewMask").css("display", "none");
        W("#imageScreen .view img").css("display", "none");
        W("#imageScreen .viewToolbarBack").hide();
        W(document).on("keydown", onKeyDown);
        W(document).on("mousewheel", scrollHandler);
    };
    /**
     * @return {undefined}
     */
    var callback = function() {
        var thingy = W("#imageScreen .delete-confirm");
        thingy.removeClass("view-tip");
        thingy.show();
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var handler = function(event) {
        monitor.clickLog("gallary\u5220\u9664");
        event.stopPropagation();
        var file = list[index];
        var poster = W("#imageScreen .delete-confirm");
        if (imgData && deleteFunc) {
            deleteFunc(imgData[index]);
            poster.hide();
        } else {
            var element = yunpn.fo.getAllFile().filter(function($slide) {
                return $slide.attr("data-nid") == file;
            })[0];
            /** @type {Array} */
            var i = [element.attr("data-path")];
            var data_nid = element.attr("data-nid");
            Ajax.post(yunpn.config.url.delToRecyle, {
                "path[]" : i,
                "nids[]" : data_nid
            }, function(err) {
                err = err.evalExp();
                if (err.errno) {
                    poster.hide();
                    yunpn.filelist.list();
                } else {
                    poster.hide();
                    try {
                        element.removeNode();
                    } catch (t) {
                    }
                    yunpn.fo.initFileIndex();
                    if (yunpn.userInfo) {
                        yunpn.userInfo.updateDiskInfo();
                    }
                    if (yunpn.fo.getFileNum() < 1) {
                        if (yunpn.filelist.page > 0) {
                            /** @type {number} */
                            yunpn.filelist.page = yunpn.filelist.page - 1;
                        }
                    }
                    yunpn.filelist.list();
                    yunpn.cmdCenter.updateStatus();
                }
            });
        }
        remove(index);
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var mousemove = function(event) {
        event.stopPropagation();
        W("#imageScreen .delete-confirm").hide();
    };
    /**
     * @param {?} n
     * @return {undefined}
     */
    var f = function(n) {
        if (W(this).hasClass("preBtnContainer")) {
            show(0);
        } else {
            show(1);
        }
    };
    /**
     * @return {undefined}
     */
    var createElements = function() {
        /** @type {Element} */
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else {
            if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else {
                if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
            }
        }
    };
    /**
     * @param {Object} e
     * @return {undefined}
     */
    var onKeyDown = function(e) {
        switch(e.keyCode) {
            case keys.ESC:
                initialize();
                break;
            case keys.LEFT:
                ;
            case keys.UP:
                e.preventDefault();
                show(0);
                break;
            case keys.RIGHT:
                ;
            case keys.DOWN:
                e.preventDefault();
                show(1);
                break;
            case keys.FULL:
                createElements();
                break;
            default:
                ;
        }
    };
    /**
     * @param {Event} event
     * @return {undefined}
     */
    var scrollHandler = function(event) {
        event.preventDefault();
        /** @type {number} */
        var t = event.wheelDelta ? event.wheelDelta / 120 : -event.detail / 3;
        if (t > 0) {
            show(0);
        } else {
            show(1);
        }
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    var change = function(event) {
        event.preventDefault();
        if (W(this).hasClass("preBtnContainer")) {
            thingy.addClass("preBtnHover");
        } else {
            p.addClass("nextBtnHover");
        }
    };
    /**
     * @param {?} e
     * @return {undefined}
     */
    var toggle = function(e) {
        e.preventDefault();
        if (W(this).hasClass("preBtnContainer")) {
            thingy.removeClass("preBtnHover");
        } else {
            p.removeClass("nextBtnHover");
        }
    };
    /**
     * @return {undefined}
     */
    var draw = function() {
        clearTimeout(tref);
        /** @type {number} */
        tref = setTimeout(function() {
            setFillAndStroke();
            init();
            originalWidth = Highcharts.getDocRect().width;
            windowHeight = Highcharts.getDocRect().height;
            W("#imageScreen").css("height", windowHeight + "px");
            if (originalWidth <= 900) {
                W("#imageScreen .hd .imgInfo").css("margin-left", "0");
            } else {
                W("#imageScreen .hd .imgInfo").css("margin-left", "30%");
            }
        }, 10);
    };
    /** @type {boolean} */
    var Mt = false;
    return{
        /** @type {function (string): undefined} */
        show : removeNode
    };
}(), function($, dataAndEvents) {
    /**
     * @param {Element} element
     * @param {boolean} isTabIndexNotNaN
     * @return {?}
     */
    function focusable(element, isTabIndexNotNaN) {
        var map;
        var mapName;
        var img;
        var nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (map = element.parentNode, mapName = map.name, !element.href || (!mapName || map.nodeName.toLowerCase() !== "map") ? false : (img = $("img[usemap=#" + mapName + "]")[0], !!img && visible(img))) : (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }
    /**
     * @param {Element} element
     * @return {?}
     */
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }
    /** @type {number} */
    var uuid = 0;
    /** @type {RegExp} */
    var runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    $.extend($.ui, {
        version : "1.10.4",
        keyCode : {
            BACKSPACE : 8,
            COMMA : 188,
            DELETE : 46,
            DOWN : 40,
            END : 35,
            ENTER : 13,
            ESCAPE : 27,
            HOME : 36,
            LEFT : 37,
            NUMPAD_ADD : 107,
            NUMPAD_DECIMAL : 110,
            NUMPAD_DIVIDE : 111,
            NUMPAD_ENTER : 108,
            NUMPAD_MULTIPLY : 106,
            NUMPAD_SUBTRACT : 109,
            PAGE_DOWN : 34,
            PAGE_UP : 33,
            PERIOD : 190,
            RIGHT : 39,
            SPACE : 32,
            TAB : 9,
            UP : 38
        }
    });
    $.fn.extend({
        focus : function(matcherFunction) {
            return function(threshold, matches) {
                return typeof threshold == "number" ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus();
                        if (matches) {
                            matches.call(elem);
                        }
                    }, threshold);
                }) : matcherFunction.apply(this, arguments);
            };
        }($.fn.focus),
        /**
         * @return {?}
         */
        scrollParent : function() {
            var codeSegments;
            return $.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? codeSegments = this.parents().filter(function() {
                return/(relative|absolute|fixed)/.test($.css(this, "position")) && /(auto|scroll)/.test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
            }).eq(0) : codeSegments = this.parents().filter(function() {
                return/(auto|scroll)/.test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
            }).eq(0), /fixed/.test(this.css("position")) || !codeSegments.length ? $(document) : codeSegments;
        },
        /**
         * @param {?} zIndex
         * @return {?}
         */
        zIndex : function(zIndex) {
            if (zIndex !== dataAndEvents) {
                return this.css("zIndex", zIndex);
            }
            if (this.length) {
                var elem = $(this[0]);
                var position;
                var chr2;
                for (;elem.length && elem[0] !== document;) {
                    position = elem.css("position");
                    if (position === "absolute" || (position === "relative" || position === "fixed")) {
                        /** @type {number} */
                        chr2 = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(chr2) && chr2 !== 0) {
                            return chr2;
                        }
                    }
                    elem = elem.parent();
                }
            }
            return 0;
        },
        /**
         * @return {?}
         */
        uniqueId : function() {
            return this.each(function() {
                if (!this.id) {
                    /** @type {string} */
                    this.id = "ui-id-" + ++uuid;
                }
            });
        },
        /**
         * @return {?}
         */
        removeUniqueId : function() {
            return this.each(function() {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });
    $.extend($.expr[":"], {
        data : $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return!!$.data(elem, dataName);
            };
        }) : function(elem, i, dataAndEvents) {
            return!!$.data(elem, dataAndEvents[3]);
        },
        /**
         * @param {Element} element
         * @return {?}
         */
        focusable : function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        /**
         * @param {Element} element
         * @return {?}
         */
        tabbable : function(element) {
            var tabIndex = $.attr(element, "tabindex");
            /** @type {boolean} */
            var isTabIndexNaN = isNaN(tabIndex);
            return(isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
    /** @type {boolean} */
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    /** @type {boolean} */
    $.support.selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        /**
         * @return {?}
         */
        disableSelection : function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(types) {
                types.preventDefault();
            });
        },
        /**
         * @return {?}
         */
        enableSelection : function() {
            return this.unbind(".ui-disableSelection");
        }
    });
    $.extend($.ui, {
        plugin : {
            /**
             * @param {string} name
             * @param {string} option
             * @param {?} opt_attributes
             * @return {undefined}
             */
            add : function(name, option, opt_attributes) {
                var i;
                var proto = $.ui[name].prototype;
                for (i in opt_attributes) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, opt_attributes[i]]);
                }
            },
            /**
             * @param {Object} instance
             * @param {?} name
             * @param {?} args
             * @return {undefined}
             */
            call : function(instance, name, args) {
                var i;
                var codeSegments = instance.plugins[name];
                if (!codeSegments || (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
                    return;
                }
                /** @type {number} */
                i = 0;
                for (;i < codeSegments.length;i++) {
                    if (instance.options[codeSegments[i][0]]) {
                        codeSegments[i][1].apply(instance.element, args);
                    }
                }
            }
        },
        /**
         * @param {Object} el
         * @param {string} a
         * @return {?}
         */
        hasScroll : function(el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false;
            }
            /** @type {string} */
            var scroll = a && a === "left" ? "scrollLeft" : "scrollTop";
            /** @type {boolean} */
            var i = false;
            return el[scroll] > 0 ? true : (el[scroll] = 1, i = el[scroll] > 0, el[scroll] = 0, i);
        }
    });
}(jQuery), function($, value) {
    /** @type {number} */
    var uuid = 0;
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var __slice = Array.prototype.slice;
    /** @type {function (Array): undefined} */
    var _cleanData = $.cleanData;
    /**
     * @param {Array} elems
     * @return {undefined}
     */
    $.cleanData = function(elems) {
        /** @type {number} */
        var i = 0;
        var elem;
        for (;(elem = elems[i]) != null;i++) {
            try {
                $(elem).triggerHandler("remove");
            } catch (s) {
            }
        }
        _cleanData(elems);
    };
    /**
     * @param {string} name
     * @param {Function} base
     * @param {Function} prototype
     * @return {undefined}
     */
    $.widget = function(name, base, prototype) {
        var fullName;
        var existingConstructor;
        var constructor;
        var basePrototype;
        var proxiedPrototype = {};
        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        /** @type {string} */
        fullName = namespace + "-" + name;
        if (!prototype) {
            /** @type {Function} */
            prototype = base;
            /** @type {function (): undefined} */
            base = $.Widget;
        }
        /**
         * @param {string} elem
         * @return {?}
         */
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return!!$.data(elem, fullName);
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        /** @type {function (Function, Object): ?} */
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) {
                return new constructor(options, element);
            }
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        $.extend(constructor, existingConstructor, {
            version : prototype.version,
            _proto : $.extend({}, prototype),
            _childConstructors : []
        });
        basePrototype = new base;
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function(prop, value) {
            if (!$.isFunction(value)) {
                /** @type {Function} */
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = function() {
                /**
                 * @return {?}
                 */
                var _super = function() {
                    return base.prototype[prop].apply(this, arguments);
                };
                /**
                 * @param {?} args
                 * @return {?}
                 */
                var _superApply = function(args) {
                    return base.prototype[prop].apply(this, args);
                };
                return function() {
                    var tmp = this._super;
                    var __superApply = this._superApply;
                    var returnValue;
                    return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), this._super = tmp, this._superApply = __superApply, returnValue;
                };
            }();
        });
        constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix : existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            /** @type {function (Function, Object): ?} */
            constructor : constructor,
            namespace : namespace,
            widgetName : name,
            widgetFullName : fullName
        });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(dataAndEvents, child) {
                var childPrototype = child.prototype;
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            delete existingConstructor._childConstructors;
        } else {
            base._childConstructors.push(constructor);
        }
        $.widget.bridge(name, constructor);
    };
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    $.widget.extend = function(opt_attributes) {
        /** @type {Array.<?>} */
        var input = __slice.call(arguments, 1);
        /** @type {number} */
        var inputIndex = 0;
        /** @type {number} */
        var inputLength = input.length;
        var key;
        var copy;
        for (;inputIndex < inputLength;inputIndex++) {
            for (key in input[inputIndex]) {
                copy = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key)) {
                    if (copy !== value) {
                        if ($.isPlainObject(copy)) {
                            opt_attributes[key] = $.isPlainObject(opt_attributes[key]) ? $.widget.extend({}, opt_attributes[key], copy) : $.widget.extend({}, copy);
                        } else {
                            opt_attributes[key] = copy;
                        }
                    }
                }
            }
        }
        return opt_attributes;
    };
    /**
     * @param {string} name
     * @param {Function} object
     * @return {undefined}
     */
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        /**
         * @param {?} options
         * @return {?}
         */
        $.fn[name] = function(options) {
            /** @type {boolean} */
            var isMethodCall = typeof options == "string";
            /** @type {Array.<?>} */
            var args = __slice.call(arguments, 1);
            var returnValue = this;
            return options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options, isMethodCall ? this.each(function() {
                var methodValue;
                var instance = $.data(this, fullName);
                if (!instance) {
                    return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    return $.error("no such method '" + options + "' for " + name + " widget instance");
                }
                methodValue = instance[options].apply(instance, args);
                if (methodValue !== instance && methodValue !== value) {
                    return returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, false;
                }
            }) : this.each(function() {
                var instance = $.data(this, fullName);
                if (instance) {
                    instance.option(options || {})._init();
                } else {
                    $.data(this, fullName, new object(options, this));
                }
            }), returnValue;
        };
    };
    /**
     * @return {undefined}
     */
    $.Widget = function() {
    };
    /** @type {Array} */
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName : "widget",
        widgetEventPrefix : "",
        defaultElement : "<div>",
        options : {
            disabled : false,
            create : null
        },
        /**
         * @param {Function} options
         * @param {Object} element
         * @return {undefined}
         */
        _createWidget : function(options, element) {
            element = $(element || (this.defaultElement || this))[0];
            this.element = $(element);
            /** @type {number} */
            this.uuid = uuid++;
            /** @type {string} */
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    /**
                     * @param {(Object|string)} item
                     * @return {undefined}
                     */
                    remove : function(item) {
                        if (item.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument : element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions : $.noop,
        _getCreateEventData : $.noop,
        _create : $.noop,
        _init : $.noop,
        /**
         * @return {undefined}
         */
        destroy : function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy : $.noop,
        /**
         * @return {?}
         */
        widget : function() {
            return this.element;
        },
        /**
         * @param {string} key
         * @param {?} val
         * @return {?}
         */
        option : function(key, val) {
            /** @type {string} */
            var options = key;
            var methods;
            var object;
            var length;
            if (arguments.length === 0) {
                return $.widget.extend({}, this.options);
            }
            if (typeof key == "string") {
                options = {};
                /** @type {Array.<string>} */
                methods = key.split(".");
                /** @type {string} */
                key = methods.shift();
                if (methods.length) {
                    object = options[key] = $.widget.extend({}, this.options[key]);
                    /** @type {number} */
                    length = 0;
                    for (;length < methods.length - 1;length++) {
                        object[methods[length]] = object[methods[length]] || {};
                        object = object[methods[length]];
                    }
                    /** @type {string} */
                    key = methods.pop();
                    if (arguments.length === 1) {
                        return object[key] === value ? null : object[key];
                    }
                    object[key] = val;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === value ? null : this.options[key];
                    }
                    options[key] = val;
                }
            }
            return this._setOptions(options), this;
        },
        /**
         * @param {Object} options
         * @return {?}
         */
        _setOptions : function(options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }
            return this;
        },
        /**
         * @param {?} key
         * @param {Object} value
         * @return {?}
         */
        _setOption : function(key, value) {
            return this.options[key] = value, key === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this;
        },
        /**
         * @return {?}
         */
        enable : function() {
            return this._setOption("disabled", false);
        },
        /**
         * @return {?}
         */
        disable : function() {
            return this._setOption("disabled", true);
        },
        /**
         * @param {(Function|string)} value
         * @param {(Function|string)} element
         * @param {(Function|string)} handlers
         * @return {undefined}
         */
        _on : function(value, element, handlers) {
            var delegateElement;
            var instance = this;
            if (typeof value != "boolean") {
                /** @type {(Function|string)} */
                handlers = element;
                /** @type {(Function|string)} */
                element = value;
                /** @type {boolean} */
                value = false;
            }
            if (handlers) {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            } else {
                /** @type {(Function|string)} */
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            }
            $.each(handlers, function(optionsString, fn) {
                /**
                 * @return {?}
                 */
                function handlerProxy() {
                    if (!value && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return(typeof fn == "string" ? instance[fn] : fn).apply(instance, arguments);
                }
                if (typeof fn != "string") {
                    handlerProxy.guid = fn.guid = fn.guid || (handlerProxy.guid || $.guid++);
                }
                var match = optionsString.match(/^(\w+)\s*(.*)$/);
                var eventName = match[1] + instance.eventNamespace;
                var selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy);
                } else {
                    element.bind(eventName, handlerProxy);
                }
            });
        },
        /**
         * @param {(Object|string)} element
         * @param {string} eventName
         * @return {undefined}
         */
        _off : function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);
        },
        /**
         * @param {string} setter
         * @param {number} delay
         * @return {?}
         */
        _delay : function(setter, delay) {
            /**
             * @return {?}
             */
            function handlerProxy() {
                return(typeof setter == "string" ? thisObject[setter] : setter).apply(thisObject, arguments);
            }
            var thisObject = this;
            return setTimeout(handlerProxy, delay || 0);
        },
        /**
         * @param {string} label
         * @return {undefined}
         */
        _hoverable : function(label) {
            this.hoverable = this.hoverable.add(label);
            this._on(label, {
                /**
                 * @param {Object} e
                 * @return {undefined}
                 */
                mouseenter : function(e) {
                    $(e.currentTarget).addClass("ui-state-hover");
                },
                /**
                 * @param {Object} e
                 * @return {undefined}
                 */
                mouseleave : function(e) {
                    $(e.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        /**
         * @param {string} label
         * @return {undefined}
         */
        _focusable : function(label) {
            this.focusable = this.focusable.add(label);
            this._on(label, {
                /**
                 * @param {Event} event
                 * @return {undefined}
                 */
                focusin : function(event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                },
                /**
                 * @param {Event} event
                 * @return {undefined}
                 */
                focusout : function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        /**
         * @param {string} type
         * @param {Object} event
         * @param {?} data
         * @return {?}
         */
        _trigger : function(type, event, data) {
            var prop;
            var orig;
            var callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        }
    };
    $.each({
        show : "fadeIn",
        hide : "fadeOut"
    }, function(method, defaultEffect) {
        /**
         * @param {Object} element
         * @param {Object} options
         * @param {Function} callback
         * @return {undefined}
         */
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options == "string") {
                options = {
                    effect : options
                };
            }
            var o;
            var effectName = options ? options === true || typeof options == "number" ? defaultEffect : options.effect || defaultEffect : method;
            options = options || {};
            if (typeof options == "number") {
                options = {
                    duration : options
                };
            }
            /** @type {boolean} */
            o = !$.isEmptyObject(options);
            /** @type {Function} */
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay);
            }
            if (o && ($.effects && $.effects.effect[effectName])) {
                element[method](options);
            } else {
                if (effectName !== method && element[effectName]) {
                    element[effectName](options.duration, options.easing, callback);
                } else {
                    element.queue(function($sanitize) {
                        $(this)[method]();
                        if (callback) {
                            callback.call(element[0]);
                        }
                        $sanitize();
                    });
                }
            }
        };
    });
}(jQuery), function($, dataAndEvents) {
    /** @type {boolean} */
    var n = false;
    $(document).mouseup(function() {
        /** @type {boolean} */
        n = false;
    });
    $.widget("ui.mouse", {
        version : "1.10.4",
        options : {
            cancel : "input,textarea,button,select,option",
            distance : 1,
            delay : 0
        },
        /**
         * @return {undefined}
         */
        _mouseInit : function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return that._mouseDown(event);
            }).bind("click." + this.widgetName, function(event) {
                if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                    return $.removeData(event.target, that.widgetName + ".preventClickEvent"), event.stopImmediatePropagation(), false;
                }
            });
            /** @type {boolean} */
            this.started = false;
        },
        /**
         * @return {undefined}
         */
        _mouseDestroy : function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            }
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _mouseDown : function(event) {
            if (n) {
                return;
            }
            if (this._mouseStarted) {
                this._mouseUp(event);
            }
            /** @type {Event} */
            this._mouseDownEvent = event;
            var that = this;
            /** @type {boolean} */
            var btnIsLeft = event.which === 1;
            var elIsCancel = typeof this.options.cancel == "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;
            if (!btnIsLeft || (elIsCancel || !this._mouseCapture(event))) {
                return true;
            }
            /** @type {boolean} */
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                /** @type {number} */
                this._mouseDelayTimer = setTimeout(function() {
                    /** @type {boolean} */
                    that.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                /** @type {boolean} */
                this._mouseStarted = this._mouseStart(event) !== false;
                if (!this._mouseStarted) {
                    return event.preventDefault(), true;
                }
            }
            return true === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(event) {
                return that._mouseMove(event);
            }, this._mouseUpDelegate = function(event) {
                return that._mouseUp(event);
            }, $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), event.preventDefault(), n = true, true;
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _mouseMove : function(event) {
            return $.ui.ie && ((!document.documentMode || document.documentMode < 9) && !event.button) ? this._mouseUp(event) : this._mouseStarted ? (this._mouseDrag(event), event.preventDefault()) : (this._mouseDistanceMet(event) && (this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false, this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event))), !this._mouseStarted);
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _mouseUp : function(event) {
            return $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = false, event.target === this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", true), this._mouseStop(event)), false;
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _mouseDistanceMet : function(event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
        },
        /**
         * @return {?}
         */
        _mouseDelayMet : function() {
            return this.mouseDelayMet;
        },
        /**
         * @return {undefined}
         */
        _mouseStart : function() {
        },
        /**
         * @return {undefined}
         */
        _mouseDrag : function() {
        },
        /**
         * @return {undefined}
         */
        _mouseStop : function() {
        },
        /**
         * @return {?}
         */
        _mouseCapture : function() {
            return true;
        }
    });
}(jQuery), function($, dataAndEvents) {
    /**
     * @param {Array} prop
     * @param {number} width
     * @param {number} height
     * @return {?}
     */
    function getOffsets(prop, width, height) {
        return[parseFloat(prop[0]) * (fnTest.test(prop[0]) ? width / 100 : 1), parseFloat(prop[1]) * (fnTest.test(prop[1]) ? height / 100 : 1)];
    }
    /**
     * @param {?} element
     * @param {string} property
     * @return {?}
     */
    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0;
    }
    /**
     * @param {Object} parent
     * @return {?}
     */
    function getDimensions(parent) {
        var el = parent[0];
        return el.nodeType === 9 ? {
            width : parent.width(),
            height : parent.height(),
            offset : {
                top : 0,
                left : 0
            }
        } : $.isWindow(el) ? {
            width : parent.width(),
            height : parent.height(),
            offset : {
                top : parent.scrollTop(),
                left : parent.scrollLeft()
            }
        } : el.preventDefault ? {
            width : 0,
            height : 0,
            offset : {
                top : el.pageY,
                left : el.pageX
            }
        } : {
            width : parent.outerWidth(),
            height : parent.outerHeight(),
            offset : parent.offset()
        };
    }
    $.ui = $.ui || {};
    var cachedScrollbarWidth;
    /** @type {function (...[*]): number} */
    var max = Math.max;
    /** @type {function (*): number} */
    var abs = Math.abs;
    /** @type {function (*): number} */
    var round = Math.round;
    /** @type {RegExp} */
    var rvertical = /left|center|right/;
    /** @type {RegExp} */
    var rhorizontal = /top|center|bottom/;
    /** @type {RegExp} */
    var roffset = /[\+\-]\d+(\.[\d]+)?%?/;
    /** @type {RegExp} */
    var rposition = /^\w+/;
    /** @type {RegExp} */
    var fnTest = /%$/;
    /** @type {function (Object): ?} */
    var matcherFunction = $.fn.position;
    $.position = {
        /**
         * @return {?}
         */
        scrollbarWidth : function() {
            if (cachedScrollbarWidth !== dataAndEvents) {
                return cachedScrollbarWidth;
            }
            var w1;
            var w2;
            var div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>");
            var innerDiv = div.children()[0];
            return $("body").append(div), w1 = innerDiv.offsetWidth, div.css("overflow", "scroll"), w2 = innerDiv.offsetWidth, w1 === w2 && (w2 = div[0].clientWidth), div.remove(), cachedScrollbarWidth = w1 - w2;
        },
        /**
         * @param {Object} within
         * @return {?}
         */
        getScrollInfo : function(within) {
            var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x");
            var overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y");
            /** @type {boolean} */
            var hasOverflowX = overflowX === "scroll" || overflowX === "auto" && within.width < within.element[0].scrollWidth;
            /** @type {boolean} */
            var hasOverflowY = overflowY === "scroll" || overflowY === "auto" && within.height < within.element[0].scrollHeight;
            return{
                width : hasOverflowY ? $.position.scrollbarWidth() : 0,
                height : hasOverflowX ? $.position.scrollbarWidth() : 0
            };
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        getWithinInfo : function(element) {
            var withinElement = $(element || window);
            var isWindow = $.isWindow(withinElement[0]);
            /** @type {boolean} */
            var isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
            return{
                element : withinElement,
                isWindow : isWindow,
                isDocument : isDocument,
                offset : withinElement.offset() || {
                    left : 0,
                    top : 0
                },
                scrollLeft : withinElement.scrollLeft(),
                scrollTop : withinElement.scrollTop(),
                width : isWindow ? withinElement.width() : withinElement.outerWidth(),
                height : isWindow ? withinElement.height() : withinElement.outerHeight()
            };
        }
    };
    /**
     * @param {Object} options
     * @return {?}
     */
    $.fn.position = function(options) {
        if (!options || !options.of) {
            return matcherFunction.apply(this, arguments);
        }
        options = $.extend({}, options);
        var atOffset;
        var targetWidth;
        var targetHeight;
        var targetOffset;
        var basePosition;
        var dimensions;
        var target = $(options.of);
        var within = $.position.getWithinInfo(options.within);
        var scrollInfo = $.position.getScrollInfo(within);
        var myAt = (options.collision || "flip").split(" ");
        var offsets = {};
        return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, basePosition = $.extend({}, targetOffset), $.each(["my", "at"], function() {
            var pos = (options[this] || "").split(" ");
            var iconCls;
            var horizontalOffset;
            if (pos.length === 1) {
                pos = rvertical.test(pos[0]) ? pos.concat(["center"]) : rhorizontal.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
            }
            pos[0] = rvertical.test(pos[0]) ? pos[0] : "center";
            pos[1] = rhorizontal.test(pos[1]) ? pos[1] : "center";
            /** @type {(Array.<string>|null)} */
            iconCls = roffset.exec(pos[0]);
            /** @type {(Array.<string>|null)} */
            horizontalOffset = roffset.exec(pos[1]);
            /** @type {Array} */
            offsets[this] = [iconCls ? iconCls[0] : 0, horizontalOffset ? horizontalOffset[0] : 0];
            /** @type {Array} */
            options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
        }), myAt.length === 1 && (myAt[1] = myAt[0]), options.at[0] === "right" ? basePosition.left += targetWidth : options.at[0] === "center" && (basePosition.left += targetWidth / 2), options.at[1] === "bottom" ? basePosition.top += targetHeight : options.at[1] === "center" && (basePosition.top += targetHeight / 2), atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], basePosition.top += atOffset[1], this.each(function() {
            var collisionPosition;
            var using;
            var elem = $(this);
            var elemWidth = elem.outerWidth();
            var elemHeight = elem.outerHeight();
            var marginLeft = parseCss(this, "marginLeft");
            var marginTop = parseCss(this, "marginTop");
            var collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width;
            var collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height;
            var position = $.extend({}, basePosition);
            var myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
            if (options.my[0] === "right") {
                position.left -= elemWidth;
            } else {
                if (options.my[0] === "center") {
                    position.left -= elemWidth / 2;
                }
            }
            if (options.my[1] === "bottom") {
                position.top -= elemHeight;
            } else {
                if (options.my[1] === "center") {
                    position.top -= elemHeight / 2;
                }
            }
            position.left += myOffset[0];
            position.top += myOffset[1];
            if (!$.support.offsetFractions) {
                /** @type {number} */
                position.left = round(position.left);
                /** @type {number} */
                position.top = round(position.top);
            }
            collisionPosition = {
                marginLeft : marginLeft,
                marginTop : marginTop
            };
            $.each(["left", "top"], function(i, dir) {
                if ($.ui.position[myAt[i]]) {
                    $.ui.position[myAt[i]][dir](position, {
                        targetWidth : targetWidth,
                        targetHeight : targetHeight,
                        elemWidth : elemWidth,
                        elemHeight : elemHeight,
                        collisionPosition : collisionPosition,
                        collisionWidth : collisionWidth,
                        collisionHeight : collisionHeight,
                        offset : [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my : options.my,
                        at : options.at,
                        within : within,
                        elem : elem
                    });
                }
            });
            if (options.using) {
                /**
                 * @param {?} props
                 * @return {undefined}
                 */
                using = function(props) {
                    /** @type {number} */
                    var left = targetOffset.left - position.left;
                    /** @type {number} */
                    var right = left + targetWidth - elemWidth;
                    /** @type {number} */
                    var top = targetOffset.top - position.top;
                    /** @type {number} */
                    var bottom = top + targetHeight - elemHeight;
                    var feedback = {
                        target : {
                            element : target,
                            left : targetOffset.left,
                            top : targetOffset.top,
                            width : targetWidth,
                            height : targetHeight
                        },
                        element : {
                            element : elem,
                            left : position.left,
                            top : position.top,
                            width : elemWidth,
                            height : elemHeight
                        },
                        horizontal : right < 0 ? "left" : left > 0 ? "right" : "center",
                        vertical : bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                    };
                    if (targetWidth < elemWidth) {
                        if (abs(left + right) < targetWidth) {
                            /** @type {string} */
                            feedback.horizontal = "center";
                        }
                    }
                    if (targetHeight < elemHeight) {
                        if (abs(top + bottom) < targetHeight) {
                            /** @type {string} */
                            feedback.vertical = "middle";
                        }
                    }
                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                        /** @type {string} */
                        feedback.important = "horizontal";
                    } else {
                        /** @type {string} */
                        feedback.important = "vertical";
                    }
                    options.using.call(this, props, feedback);
                };
            }
            elem.offset($.extend(position, {
                using : using
            }));
        });
    };
    $.ui.position = {
        fit : {
            /**
             * @param {?} type
             * @param {number} data
             * @return {undefined}
             */
            left : function(type, data) {
                var within = data.within;
                var withinOffset = within.isWindow ? within.scrollLeft : within.offset.left;
                var outerWidth = within.width;
                /** @type {number} */
                var collisionPosLeft = type.left - data.collisionPosition.marginLeft;
                /** @type {number} */
                var overLeft = withinOffset - collisionPosLeft;
                /** @type {number} */
                var overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                var newOverRight;
                if (data.collisionWidth > outerWidth) {
                    if (overLeft > 0 && overRight <= 0) {
                        /** @type {number} */
                        newOverRight = type.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        type.left += overLeft - newOverRight;
                    } else {
                        if (overRight > 0 && overLeft <= 0) {
                            type.left = withinOffset;
                        } else {
                            if (overLeft > overRight) {
                                /** @type {number} */
                                type.left = withinOffset + outerWidth - data.collisionWidth;
                            } else {
                                type.left = withinOffset;
                            }
                        }
                    }
                } else {
                    if (overLeft > 0) {
                        type.left += overLeft;
                    } else {
                        if (overRight > 0) {
                            type.left -= overRight;
                        } else {
                            /** @type {number} */
                            type.left = max(type.left - collisionPosLeft, type.left);
                        }
                    }
                }
            },
            /**
             * @param {?} type
             * @param {number} data
             * @return {undefined}
             */
            top : function(type, data) {
                var within = data.within;
                var withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
                var outerHeight = data.within.height;
                /** @type {number} */
                var collisionPosTop = type.top - data.collisionPosition.marginTop;
                /** @type {number} */
                var overTop = withinOffset - collisionPosTop;
                /** @type {number} */
                var overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                var newOverBottom;
                if (data.collisionHeight > outerHeight) {
                    if (overTop > 0 && overBottom <= 0) {
                        /** @type {number} */
                        newOverBottom = type.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        type.top += overTop - newOverBottom;
                    } else {
                        if (overBottom > 0 && overTop <= 0) {
                            type.top = withinOffset;
                        } else {
                            if (overTop > overBottom) {
                                /** @type {number} */
                                type.top = withinOffset + outerHeight - data.collisionHeight;
                            } else {
                                type.top = withinOffset;
                            }
                        }
                    }
                } else {
                    if (overTop > 0) {
                        type.top += overTop;
                    } else {
                        if (overBottom > 0) {
                            type.top -= overBottom;
                        } else {
                            /** @type {number} */
                            type.top = max(type.top - collisionPosTop, type.top);
                        }
                    }
                }
            }
        },
        flip : {
            /**
             * @param {?} type
             * @param {Object} data
             * @return {undefined}
             */
            left : function(type, data) {
                var within = data.within;
                var withinOffset = within.offset.left + within.scrollLeft;
                var outerWidth = within.width;
                var offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
                /** @type {number} */
                var collisionPosLeft = type.left - data.collisionPosition.marginLeft;
                /** @type {number} */
                var overLeft = collisionPosLeft - offsetLeft;
                /** @type {number} */
                var overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
                var myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0;
                var atOffset = data.at[0] === "left" ? data.targetWidth : data.at[0] === "right" ? -data.targetWidth : 0;
                /** @type {number} */
                var offset = -2 * data.offset[0];
                var newOverRight;
                var newOverLeft;
                if (overLeft < 0) {
                    /** @type {number} */
                    newOverRight = type.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        type.left += myOffset + atOffset + offset;
                    }
                } else {
                    if (overRight > 0) {
                        /** @type {number} */
                        newOverLeft = type.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                        if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                            type.left += myOffset + atOffset + offset;
                        }
                    }
                }
            },
            /**
             * @param {?} type
             * @param {Object} data
             * @return {undefined}
             */
            top : function(type, data) {
                var within = data.within;
                var withinOffset = within.offset.top + within.scrollTop;
                var outerHeight = within.height;
                var offsetTop = within.isWindow ? within.scrollTop : within.offset.top;
                /** @type {number} */
                var collisionPosTop = type.top - data.collisionPosition.marginTop;
                /** @type {number} */
                var overTop = collisionPosTop - offsetTop;
                /** @type {number} */
                var overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
                /** @type {boolean} */
                var top = data.my[1] === "top";
                var a = top ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0;
                var b = data.at[1] === "top" ? data.targetHeight : data.at[1] === "bottom" ? -data.targetHeight : 0;
                /** @type {number} */
                var offset = -2 * data.offset[1];
                var newOverTop;
                var newOverBottom;
                if (overTop < 0) {
                    /** @type {number} */
                    newOverBottom = type.top + a + b + offset + data.collisionHeight - outerHeight - withinOffset;
                    if (type.top + a + b + offset > overTop) {
                        if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                            type.top += a + b + offset;
                        }
                    }
                } else {
                    if (overBottom > 0) {
                        /** @type {number} */
                        newOverTop = type.top - data.collisionPosition.marginTop + a + b + offset - offsetTop;
                        if (type.top + a + b + offset > overBottom) {
                            if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                                type.top += a + b + offset;
                            }
                        }
                    }
                }
            }
        },
        flipfit : {
            /**
             * @return {undefined}
             */
            left : function() {
                $.ui.position.flip.left.apply(this, arguments);
                $.ui.position.fit.left.apply(this, arguments);
            },
            /**
             * @return {undefined}
             */
            top : function() {
                $.ui.position.flip.top.apply(this, arguments);
                $.ui.position.fit.top.apply(this, arguments);
            }
        }
    };
    (function() {
        var testElement;
        var testElementParent;
        var testElementStyle;
        var offsetLeft;
        var i;
        var body = document.getElementsByTagName("body")[0];
        /** @type {Element} */
        var div = document.createElement("div");
        /** @type {Element} */
        testElement = document.createElement(body ? "div" : "body");
        testElementStyle = {
            visibility : "hidden",
            width : 0,
            height : 0,
            border : 0,
            margin : 0,
            background : "none"
        };
        if (body) {
            $.extend(testElementStyle, {
                position : "absolute",
                left : "-1000px",
                top : "-1000px"
            });
        }
        for (i in testElementStyle) {
            testElement.style[i] = testElementStyle[i];
        }
        testElement.appendChild(div);
        testElementParent = body || document.documentElement;
        testElementParent.insertBefore(testElement, testElementParent.firstChild);
        /** @type {string} */
        div.style.cssText = "position: absolute; left: 10.7432222px;";
        offsetLeft = $(div).offset().left;
        /** @type {boolean} */
        $.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;
        /** @type {string} */
        testElement.innerHTML = "";
        testElementParent.removeChild(testElement);
    })();
}(jQuery), function($, dataAndEvents) {
    $.widget("ui.draggable", $.ui.mouse, {
        version : "1.10.4",
        widgetEventPrefix : "drag",
        options : {
            addClasses : true,
            appendTo : "parent",
            axis : false,
            connectToSortable : false,
            containment : false,
            cursor : "auto",
            cursorAt : false,
            grid : false,
            handle : false,
            helper : "original",
            iframeFix : false,
            opacity : false,
            refreshPositions : false,
            revert : false,
            revertDuration : 500,
            scope : "default",
            scroll : true,
            scrollSensitivity : 20,
            scrollSpeed : 20,
            snap : false,
            snapMode : "both",
            snapTolerance : 20,
            stack : false,
            zIndex : false,
            drag : null,
            start : null,
            stop : null
        },
        /**
         * @return {undefined}
         */
        _create : function() {
            if (this.options.helper === "original") {
                if (!/^(?:r|a|f)/.test(this.element.css("position"))) {
                    /** @type {string} */
                    this.element[0].style.position = "relative";
                }
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable");
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled");
            }
            this._mouseInit();
        },
        /**
         * @return {undefined}
         */
        _destroy : function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseCapture : function(event) {
            var o = this.options;
            return this.helper || (o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) ? false : (this.handle = this._getHandle(event), this.handle ? ($(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
                $("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width : this.offsetWidth + "px",
                    height : this.offsetHeight + "px",
                    position : "absolute",
                    opacity : "0.001",
                    zIndex : 1E3
                }).css($(this).offset()).appendTo("body");
            }), true) : false);
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseStart : function(event) {
            var o = this.options;
            return this.helper = this._createHelper(event), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top : this.offset.top - this.margins.top,
                left : this.offset.left - this.margins.left
            }, this.offset.scroll = false, $.extend(this.offset, {
                click : {
                    left : event.pageX - this.offset.left,
                    top : event.pageY - this.offset.top
                },
                parent : this._getParentOffset(),
                relative : this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(event), this.originalPageX = event.pageX, this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this._setContainment(), this._trigger("start", event) === false ? (this._clear(), false) : (this._cacheHelperProportions(), $.ui.ddmanager && (!o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event)), this._mouseDrag(event, true), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), true);
        },
        /**
         * @param {Object} event
         * @param {boolean} dataAndEvents
         * @return {?}
         */
        _mouseDrag : function(event, dataAndEvents) {
            if (this.offsetParentCssPosition === "fixed") {
                this.offset.parent = this._getParentOffset();
            }
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!dataAndEvents) {
                var ui = this._uiHash();
                if (this._trigger("drag", event, ui) === false) {
                    return this._mouseUp({}), false;
                }
                this.position = ui.position;
            }
            if (!this.options.axis || this.options.axis !== "y") {
                /** @type {string} */
                this.helper[0].style.left = this.position.left + "px";
            }
            if (!this.options.axis || this.options.axis !== "x") {
                /** @type {string} */
                this.helper[0].style.top = this.position.top + "px";
            }
            return $.ui.ddmanager && $.ui.ddmanager.drag(this, event), false;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseStop : function(event) {
            var that = this;
            /** @type {boolean} */
            var dropped = false;
            return $.ui.ddmanager && (!this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event))), this.dropped && (dropped = this.dropped, this.dropped = false), this.options.helper === "original" && !$.contains(this.element[0].ownerDocument, this.element[0]) ? false : (this.options.revert === "invalid" && !dropped || (this.options.revert === "valid" && dropped || (this.options.revert === true || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) ?
                $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    if (that._trigger("stop", event) !== false) {
                        that._clear();
                    }
                }) : this._trigger("stop", event) !== false && this._clear(), false);
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _mouseUp : function(event) {
            return $("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this);
            }), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), $.ui.mouse.prototype._mouseUp.call(this, event);
        },
        /**
         * @return {?}
         */
        cancel : function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _getHandle : function(event) {
            return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _createHelper : function(event) {
            var o = this.options;
            var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;
            return helper.parents("body").length || helper.appendTo(o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo), helper[0] !== this.element[0] && (!/(fixed|absolute)/.test(helper.css("position")) && helper.css("position", "absolute")), helper;
        },
        /**
         * @param {Object} obj
         * @return {undefined}
         */
        _adjustOffsetFromHelper : function(obj) {
            if (typeof obj == "string") {
                /** @type {Array.<string>} */
                obj = obj.split(" ");
            }
            if ($.isArray(obj)) {
                obj = {
                    left : +obj[0],
                    top : +obj[1] || 0
                };
            }
            if ("left" in obj) {
                this.offset.click.left = obj.left + this.margins.left;
            }
            if ("right" in obj) {
                this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
            }
            if ("top" in obj) {
                this.offset.click.top = obj.top + this.margins.top;
            }
            if ("bottom" in obj) {
                this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
            }
        },
        /**
         * @return {?}
         */
        _getParentOffset : function() {
            var tp = this.offsetParent.offset();
            if (this.cssPosition === "absolute") {
                if (this.scrollParent[0] !== document) {
                    if ($.contains(this.scrollParent[0], this.offsetParent[0])) {
                        tp.left += this.scrollParent.scrollLeft();
                        tp.top += this.scrollParent.scrollTop();
                    }
                }
            }
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && (this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
                tp = {
                    top : 0,
                    left : 0
                };
            }
            return{
                top : tp.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left : tp.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        /**
         * @return {?}
         */
        _getRelativeOffset : function() {
            if (this.cssPosition === "relative") {
                var otherElementRect = this.element.position();
                return{
                    top : otherElementRect.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left : otherElementRect.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            }
            return{
                top : 0,
                left : 0
            };
        },
        /**
         * @return {undefined}
         */
        _cacheMargins : function() {
            this.margins = {
                left : parseInt(this.element.css("marginLeft"), 10) || 0,
                top : parseInt(this.element.css("marginTop"), 10) || 0,
                right : parseInt(this.element.css("marginRight"), 10) || 0,
                bottom : parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        /**
         * @return {undefined}
         */
        _cacheHelperProportions : function() {
            this.helperProportions = {
                width : this.helper.outerWidth(),
                height : this.helper.outerHeight()
            };
        },
        /**
         * @return {undefined}
         */
        _setContainment : function() {
            var over;
            var c;
            var ce;
            var o = this.options;
            if (!o.containment) {
                /** @type {null} */
                this.containment = null;
                return;
            }
            if (o.containment === "window") {
                /** @type {Array} */
                this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return;
            }
            if (o.containment === "document") {
                /** @type {Array} */
                this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return;
            }
            if (o.containment.constructor === Array) {
                this.containment = o.containment;
                return;
            }
            if (o.containment === "parent") {
                o.containment = this.helper[0].parentNode;
            }
            c = $(o.containment);
            ce = c[0];
            if (!ce) {
                return;
            }
            /** @type {boolean} */
            over = c.css("overflow") !== "hidden";
            /** @type {Array} */
            this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) -
                (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relative_container = c;
        },
        /**
         * @param {string} d
         * @param {Function} opt_attributes
         * @return {?}
         */
        _convertPositionTo : function(d, opt_attributes) {
            if (!opt_attributes) {
                opt_attributes = this.position;
            }
            /** @type {number} */
            var mod = d === "absolute" ? 1 : -1;
            var offsetParent = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !!$.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top : offsetParent.scrollTop(),
                left : offsetParent.scrollLeft()
            }), {
                top : opt_attributes.top + this.offset.relative.top * mod + this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * mod,
                left : opt_attributes.left + this.offset.relative.left * mod + this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * mod
            };
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _generatePosition : function(event) {
            var containment;
            var co;
            var top;
            var left;
            var o = this.options;
            var offsetParent = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !!$.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            var pageX = event.pageX;
            var pageY = event.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top : offsetParent.scrollTop(),
                left : offsetParent.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (co = this.relative_container.offset(), containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top]) : containment = this.containment, event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top),
                event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)), o.grid && (top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >=
                containment[1] ? top - o.grid[1] : top + o.grid[1] : top, left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left)), {
                top : pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left : pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            };
        },
        /**
         * @return {undefined}
         */
        _clear : function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0]) {
                if (!this.cancelHelperRemoval) {
                    this.helper.remove();
                }
            }
            /** @type {null} */
            this.helper = null;
            /** @type {boolean} */
            this.cancelHelperRemoval = false;
        },
        /**
         * @param {string} type
         * @param {Object} types
         * @param {?} ui
         * @return {?}
         */
        _trigger : function(type, types, ui) {
            return ui = ui || this._uiHash(), $.ui.plugin.call(this, type, [types, ui]), type === "drag" && (this.positionAbs = this._convertPositionTo("absolute")), $.Widget.prototype._trigger.call(this, type, types, ui);
        },
        plugins : {},
        /**
         * @return {?}
         */
        _uiHash : function() {
            return{
                helper : this.helper,
                position : this.position,
                originalPosition : this.originalPosition,
                offset : this.positionAbs
            };
        }
    });
    $.ui.plugin.add("draggable", "connectToSortable", {
        /**
         * @param {?} type
         * @param {number} data
         * @return {undefined}
         */
        start : function(type, data) {
            var inst = $(this).data("ui-draggable");
            var o = inst.options;
            var uiSortable = $.extend({}, data, {
                item : inst.element
            });
            /** @type {Array} */
            inst.sortables = [];
            $(o.connectToSortable).each(function() {
                var sortable = $.data(this, "ui-sortable");
                if (sortable) {
                    if (!sortable.options.disabled) {
                        inst.sortables.push({
                            instance : sortable,
                            shouldRevert : sortable.options.revert
                        });
                        sortable.refreshPositions();
                        sortable._trigger("activate", type, uiSortable);
                    }
                }
            });
        },
        /**
         * @param {Object} event
         * @param {boolean} ui
         * @return {undefined}
         */
        stop : function(event, ui) {
            var inst = $(this).data("ui-draggable");
            var uiSortable = $.extend({}, ui, {
                item : inst.element
            });
            $.each(inst.sortables, function() {
                if (this.instance.isOver) {
                    /** @type {number} */
                    this.instance.isOver = 0;
                    /** @type {boolean} */
                    inst.cancelHelperRemoval = true;
                    /** @type {boolean} */
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = this.shouldRevert;
                    }
                    this.instance._mouseStop(event);
                    this.instance.options.helper = this.instance.options._helper;
                    if (inst.options.helper === "original") {
                        this.instance.currentItem.css({
                            top : "auto",
                            left : "auto"
                        });
                    }
                } else {
                    /** @type {boolean} */
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", event, uiSortable);
                }
            });
        },
        /**
         * @param {Object} event
         * @param {Object} ui
         * @return {undefined}
         */
        drag : function(event, ui) {
            var inst = $(this).data("ui-draggable");
            var conversationBuffer = this;
            $.each(inst.sortables, function() {
                /** @type {boolean} */
                var s = false;
                var options = this;
                this.instance.positionAbs = inst.positionAbs;
                this.instance.helperProportions = inst.helperProportions;
                this.instance.offset.click = inst.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    /** @type {boolean} */
                    s = true;
                    $.each(inst.sortables, function() {
                        return this.instance.positionAbs = inst.positionAbs, this.instance.helperProportions = inst.helperProportions, this.instance.offset.click = inst.offset.click, this !== options && (this.instance._intersectsWith(this.instance.containerCache) && ($.contains(options.instance.element[0], this.instance.element[0]) && (s = false))), s;
                    });
                }
                if (s) {
                    if (!this.instance.isOver) {
                        /** @type {number} */
                        this.instance.isOver = 1;
                        this.instance.currentItem = $(conversationBuffer).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        /**
                         * @return {?}
                         */
                        this.instance.options.helper = function() {
                            return ui.helper[0];
                        };
                        event.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(event, true);
                        this.instance._mouseStart(event, true, true);
                        this.instance.offset.click.top = inst.offset.click.top;
                        this.instance.offset.click.left = inst.offset.click.left;
                        this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
                        inst._trigger("toSortable", event);
                        inst.dropped = this.instance.element;
                        inst.currentItem = inst.element;
                        this.instance.fromOutside = inst;
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(event);
                    }
                } else {
                    if (this.instance.isOver) {
                        /** @type {number} */
                        this.instance.isOver = 0;
                        /** @type {boolean} */
                        this.instance.cancelHelperRemoval = true;
                        /** @type {boolean} */
                        this.instance.options.revert = false;
                        this.instance._trigger("out", event, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(event, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove();
                        }
                        inst._trigger("fromSortable", event);
                        /** @type {boolean} */
                        inst.dropped = false;
                    }
                }
            });
        }
    });
    $.ui.plugin.add("draggable", "cursor", {
        /**
         * @return {undefined}
         */
        start : function() {
            var t = $("body");
            var o = $(this).data("ui-draggable").options;
            if (t.css("cursor")) {
                o._cursor = t.css("cursor");
            }
            t.css("cursor", o.cursor);
        },
        /**
         * @return {undefined}
         */
        stop : function() {
            var o = $(this).data("ui-draggable").options;
            if (o._cursor) {
                $("body").css("cursor", o._cursor);
            }
        }
    });
    $.ui.plugin.add("draggable", "opacity", {
        /**
         * @param {?} type
         * @param {number} data
         * @return {undefined}
         */
        start : function(type, data) {
            var t = $(data.helper);
            var o = $(this).data("ui-draggable").options;
            if (t.css("opacity")) {
                o._opacity = t.css("opacity");
            }
            t.css("opacity", o.opacity);
        },
        /**
         * @param {boolean} gotoEnd
         * @param {boolean} ui
         * @return {undefined}
         */
        stop : function(gotoEnd, ui) {
            var o = $(this).data("ui-draggable").options;
            if (o._opacity) {
                $(ui.helper).css("opacity", o._opacity);
            }
        }
    });
    $.ui.plugin.add("draggable", "scroll", {
        /**
         * @return {undefined}
         */
        start : function() {
            var i = $(this).data("ui-draggable");
            if (i.scrollParent[0] !== document) {
                if (i.scrollParent[0].tagName !== "HTML") {
                    i.overflowOffset = i.scrollParent.offset();
                }
            }
        },
        /**
         * @param {Object} event
         * @return {undefined}
         */
        drag : function(event) {
            var i = $(this).data("ui-draggable");
            var o = i.options;
            /** @type {boolean} */
            var scrolled = false;
            if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {
                if (!o.axis || o.axis !== "x") {
                    if (i.overflowOffset.top + i.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
                    } else {
                        if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
                            /** @type {number} */
                            i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
                        }
                    }
                }
                if (!o.axis || o.axis !== "y") {
                    if (i.overflowOffset.left + i.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
                    } else {
                        if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
                            /** @type {number} */
                            i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
                        }
                    }
                }
            } else {
                if (!o.axis || o.axis !== "x") {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
                    } else {
                        if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
                        }
                    }
                }
                if (!o.axis || o.axis !== "y") {
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
                    } else {
                        if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
                        }
                    }
                }
            }
            if (scrolled !== false) {
                if ($.ui.ddmanager) {
                    if (!o.dropBehaviour) {
                        $.ui.ddmanager.prepareOffsets(i, event);
                    }
                }
            }
        }
    });
    $.ui.plugin.add("draggable", "snap", {
        /**
         * @return {undefined}
         */
        start : function() {
            var i = $(this).data("ui-draggable");
            var o = i.options;
            /** @type {Array} */
            i.snapElements = [];
            $(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var iframe = $(this);
                var iniPos = iframe.offset();
                if (this !== i.element[0]) {
                    i.snapElements.push({
                        item : this,
                        width : iframe.outerWidth(),
                        height : iframe.outerHeight(),
                        top : iniPos.top,
                        left : iniPos.left
                    });
                }
            });
        },
        /**
         * @param {?} event
         * @param {Object} ui
         * @return {undefined}
         */
        drag : function(event, ui) {
            var ts;
            var bs;
            var ls;
            var rs;
            var l;
            var r;
            var t;
            var b;
            var i;
            var first;
            var inst = $(this).data("ui-draggable");
            var o = inst.options;
            var d = o.snapTolerance;
            var x1 = ui.offset.left;
            var x2 = x1 + inst.helperProportions.width;
            var y1 = ui.offset.top;
            var y2 = y1 + inst.helperProportions.height;
            /** @type {number} */
            i = inst.snapElements.length - 1;
            for (;i >= 0;i--) {
                l = inst.snapElements[i].left;
                r = l + inst.snapElements[i].width;
                t = inst.snapElements[i].top;
                b = t + inst.snapElements[i].height;
                if (x2 < l - d || (x1 > r + d || (y2 < t - d || (y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item))))) {
                    if (inst.snapElements[i].snapping) {
                        if (inst.options.snap.release) {
                            inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                                snapItem : inst.snapElements[i].item
                            }));
                        }
                    }
                    /** @type {boolean} */
                    inst.snapElements[i].snapping = false;
                    continue;
                }
                if (o.snapMode !== "inner") {
                    /** @type {boolean} */
                    ts = Math.abs(t - y2) <= d;
                    /** @type {boolean} */
                    bs = Math.abs(b - y1) <= d;
                    /** @type {boolean} */
                    ls = Math.abs(l - x2) <= d;
                    /** @type {boolean} */
                    rs = Math.abs(r - x1) <= d;
                    if (ts) {
                        /** @type {number} */
                        ui.position.top = inst._convertPositionTo("relative", {
                            top : t - inst.helperProportions.height,
                            left : 0
                        }).top - inst.margins.top;
                    }
                    if (bs) {
                        /** @type {number} */
                        ui.position.top = inst._convertPositionTo("relative", {
                            top : b,
                            left : 0
                        }).top - inst.margins.top;
                    }
                    if (ls) {
                        /** @type {number} */
                        ui.position.left = inst._convertPositionTo("relative", {
                            top : 0,
                            left : l - inst.helperProportions.width
                        }).left - inst.margins.left;
                    }
                    if (rs) {
                        /** @type {number} */
                        ui.position.left = inst._convertPositionTo("relative", {
                            top : 0,
                            left : r
                        }).left - inst.margins.left;
                    }
                }
                /** @type {(boolean|undefined)} */
                first = ts || (bs || (ls || rs));
                if (o.snapMode !== "outer") {
                    /** @type {boolean} */
                    ts = Math.abs(t - y1) <= d;
                    /** @type {boolean} */
                    bs = Math.abs(b - y2) <= d;
                    /** @type {boolean} */
                    ls = Math.abs(l - x1) <= d;
                    /** @type {boolean} */
                    rs = Math.abs(r - x2) <= d;
                    if (ts) {
                        /** @type {number} */
                        ui.position.top = inst._convertPositionTo("relative", {
                            top : t,
                            left : 0
                        }).top - inst.margins.top;
                    }
                    if (bs) {
                        /** @type {number} */
                        ui.position.top = inst._convertPositionTo("relative", {
                            top : b - inst.helperProportions.height,
                            left : 0
                        }).top - inst.margins.top;
                    }
                    if (ls) {
                        /** @type {number} */
                        ui.position.left = inst._convertPositionTo("relative", {
                            top : 0,
                            left : l
                        }).left - inst.margins.left;
                    }
                    if (rs) {
                        /** @type {number} */
                        ui.position.left = inst._convertPositionTo("relative", {
                            top : 0,
                            left : r - inst.helperProportions.width
                        }).left - inst.margins.left;
                    }
                }
                if (!inst.snapElements[i].snapping) {
                    if (ts || (bs || (ls || (rs || first)))) {
                        if (inst.options.snap.snap) {
                            inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                                snapItem : inst.snapElements[i].item
                            }));
                        }
                    }
                }
                /** @type {(boolean|undefined)} */
                inst.snapElements[i].snapping = ts || (bs || (ls || (rs || first)));
            }
        }
    });
    $.ui.plugin.add("draggable", "stack", {
        /**
         * @return {undefined}
         */
        start : function() {
            var min;
            var o = this.data("ui-draggable").options;
            var group = $.makeArray($(o.stack)).sort(function(curr, ctx) {
                return(parseInt($(curr).css("zIndex"), 10) || 0) - (parseInt($(ctx).css("zIndex"), 10) || 0);
            });
            if (!group.length) {
                return;
            }
            /** @type {number} */
            min = parseInt($(group[0]).css("zIndex"), 10) || 0;
            $(group).each(function(i) {
                $(this).css("zIndex", min + i);
            });
            this.css("zIndex", min + group.length);
        }
    });
    $.ui.plugin.add("draggable", "zIndex", {
        /**
         * @param {?} type
         * @param {number} data
         * @return {undefined}
         */
        start : function(type, data) {
            var t = $(data.helper);
            var o = $(this).data("ui-draggable").options;
            if (t.css("zIndex")) {
                o._zIndex = t.css("zIndex");
            }
            t.css("zIndex", o.zIndex);
        },
        /**
         * @param {boolean} gotoEnd
         * @param {boolean} ui
         * @return {undefined}
         */
        stop : function(gotoEnd, ui) {
            var o = $(this).data("ui-draggable").options;
            if (o._zIndex) {
                $(ui.helper).css("zIndex", o._zIndex);
            }
        }
    });
}(jQuery), function($, dataAndEvents) {
    /**
     * @param {?} text
     * @return {?}
     */
    function num(text) {
        return parseInt(text, 10) || 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function isNumber(value) {
        return!isNaN(parseInt(value, 10));
    }
    $.widget("ui.resizable", $.ui.mouse, {
        version : "1.10.4",
        widgetEventPrefix : "resize",
        options : {
            alsoResize : false,
            animate : false,
            animateDuration : "slow",
            animateEasing : "swing",
            aspectRatio : false,
            autoHide : false,
            containment : false,
            ghost : false,
            grid : false,
            handles : "e,s,se",
            helper : false,
            maxHeight : null,
            maxWidth : null,
            minHeight : 10,
            minWidth : 10,
            zIndex : 90,
            resize : null,
            start : null,
            stop : null
        },
        /**
         * @return {undefined}
         */
        _create : function() {
            var codeSegments;
            var i;
            var handle;
            var axis;
            var hname;
            var self = this;
            var o = this.options;
            this.element.addClass("ui-resizable");
            $.extend(this, {
                _aspectRatio : !!o.aspectRatio,
                aspectRatio : o.aspectRatio,
                originalElement : this.element,
                _proportionallyResizeElements : [],
                _helper : o.helper || (o.ghost || o.animate) ? o.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position : this.element.css("position"),
                    width : this.element.outerWidth(),
                    height : this.element.outerHeight(),
                    top : this.element.css("top"),
                    left : this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable"));
                /** @type {boolean} */
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft : this.originalElement.css("marginLeft"),
                    marginTop : this.originalElement.css("marginTop"),
                    marginRight : this.originalElement.css("marginRight"),
                    marginBottom : this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft : 0,
                    marginTop : 0,
                    marginRight : 0,
                    marginBottom : 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position : "static",
                    zoom : 1,
                    display : "block"
                }));
                this.originalElement.css({
                    margin : this.originalElement.css("margin")
                });
                this._proportionallyResize();
            }
            this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
                n : ".ui-resizable-n",
                e : ".ui-resizable-e",
                s : ".ui-resizable-s",
                w : ".ui-resizable-w",
                se : ".ui-resizable-se",
                sw : ".ui-resizable-sw",
                ne : ".ui-resizable-ne",
                nw : ".ui-resizable-nw"
            } : "e,s,se");
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    /** @type {string} */
                    this.handles = "n,e,s,w,se,sw,ne,nw";
                }
                codeSegments = this.handles.split(",");
                this.handles = {};
                /** @type {number} */
                i = 0;
                for (;i < codeSegments.length;i++) {
                    handle = $.trim(codeSegments[i]);
                    /** @type {string} */
                    hname = "ui-resizable-" + handle;
                    axis = $("<div class='ui-resizable-handle " + hname + "'></div>");
                    axis.css({
                        zIndex : o.zIndex
                    });
                    if ("se" === handle) {
                        axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    }
                    /** @type {string} */
                    this.handles[handle] = ".ui-resizable-" + handle;
                    this.element.append(axis);
                }
            }
            /**
             * @param {(Object|string)} target
             * @return {undefined}
             */
            this._renderAxis = function(target) {
                var i;
                var axis;
                var padPos;
                var padWrapper;
                target = target || this.element;
                for (i in this.handles) {
                    if (this.handles[i].constructor === String) {
                        this.handles[i] = $(this.handles[i], this.element).show();
                    }
                    if (this.elementIsWrapper) {
                        if (this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                            axis = $(this.handles[i], this.element);
                            padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
                            /** @type {string} */
                            padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                            target.css(padPos, padWrapper);
                            this._proportionallyResize();
                        }
                    }
                    if (!$(this.handles[i]).length) {
                        continue;
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = $(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!self.resizing) {
                    if (this.className) {
                        axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    }
                    self.axis = axis && axis[1] ? axis[1] : "se";
                }
            });
            if (o.autoHide) {
                this._handles.hide();
                $(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (o.disabled) {
                        return;
                    }
                    $(this).removeClass("ui-resizable-autohide");
                    self._handles.show();
                }).mouseleave(function() {
                    if (o.disabled) {
                        return;
                    }
                    if (!self.resizing) {
                        $(this).addClass("ui-resizable-autohide");
                        self._handles.hide();
                    }
                });
            }
            this._mouseInit();
        },
        /**
         * @return {?}
         */
        _destroy : function() {
            this._mouseDestroy();
            var wrapper;
            /**
             * @param {?} exp
             * @return {undefined}
             */
            var _destroy = function(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
            };
            return this.elementIsWrapper && (_destroy(this.element), wrapper = this.element, this.originalElement.css({
                position : wrapper.css("position"),
                width : wrapper.outerWidth(),
                height : wrapper.outerHeight(),
                top : wrapper.css("top"),
                left : wrapper.css("left")
            }).insertAfter(wrapper), wrapper.remove()), this.originalElement.css("resize", this.originalResizeStyle), _destroy(this.originalElement), this;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseCapture : function(event) {
            var index;
            var handle;
            /** @type {boolean} */
            var i = false;
            for (index in this.handles) {
                handle = $(this.handles[index])[0];
                if (handle === event.target || $.contains(handle, event.target)) {
                    /** @type {boolean} */
                    i = true;
                }
            }
            return!this.options.disabled && i;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseStart : function(event) {
            var curleft;
            var curtop;
            var cursor;
            var o = this.options;
            var iniPos = this.element.position();
            var wrapper = this.element;
            return this.resizing = true, /absolute/.test(wrapper.css("position")) ? wrapper.css({
                position : "absolute",
                top : wrapper.css("top"),
                left : wrapper.css("left")
            }) : wrapper.is(".ui-draggable") && wrapper.css({
                position : "absolute",
                top : iniPos.top,
                left : iniPos.left
            }), this._renderProxy(), curleft = num(this.helper.css("left")), curtop = num(this.helper.css("top")), o.containment && (curleft += $(o.containment).scrollLeft() || 0, curtop += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left : curleft,
                top : curtop
            }, this.size = this._helper ? {
                width : this.helper.width(),
                height : this.helper.height()
            } : {
                width : wrapper.width(),
                height : wrapper.height()
            }, this.originalSize = this._helper ? {
                width : wrapper.outerWidth(),
                height : wrapper.outerHeight()
            } : {
                width : wrapper.width(),
                height : wrapper.height()
            }, this.originalPosition = {
                left : curleft,
                top : curtop
            }, this.sizeDiff = {
                width : wrapper.outerWidth() - wrapper.width(),
                height : wrapper.outerHeight() - wrapper.height()
            }, this.originalMousePosition = {
                left : event.pageX,
                top : event.pageY
            }, this.aspectRatio = typeof o.aspectRatio == "number" ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, cursor = $(".ui-resizable-" + this.axis).css("cursor"), $("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor), wrapper.addClass("ui-resizable-resizing"), this._propagate("start", event), true;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseDrag : function(event) {
            var data;
            var el = this.helper;
            var props = {};
            var smp = this.originalMousePosition;
            var a = this.axis;
            var prevTop = this.position.top;
            var prevLeft = this.position.left;
            var prevWidth = this.size.width;
            var prevHeight = this.size.height;
            /** @type {number} */
            var dx = event.pageX - smp.left || 0;
            /** @type {number} */
            var dy = event.pageY - smp.top || 0;
            var trigger = this._change[a];
            if (!trigger) {
                return false;
            }
            data = trigger.apply(this, [event, dx, dy]);
            this._updateVirtualBoundaries(event.shiftKey);
            if (this._aspectRatio || event.shiftKey) {
                data = this._updateRatio(data, event);
            }
            return data = this._respectSize(data, event), this._updateCache(data), this._propagate("resize", event), this.position.top !== prevTop && (props.top = this.position.top + "px"), this.position.left !== prevLeft && (props.left = this.position.left + "px"), this.size.width !== prevWidth && (props.width = this.size.width + "px"), this.size.height !== prevHeight && (props.height = this.size.height + "px"), el.css(props), !this._helper && (this._proportionallyResizeElements.length && this._proportionallyResize()),
                $.isEmptyObject(props) || this._trigger("resize", event, this.ui()), false;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _mouseStop : function(event) {
            /** @type {boolean} */
            this.resizing = false;
            var pr;
            var ista;
            var soffseth;
            var soffsetw;
            var s;
            var pickWinLeft;
            var pickWinTop;
            var o = this.options;
            var that = this;
            return this._helper && (pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, s = {
                width : that.helper.width() - soffsetw,
                height : that.helper.height() - soffseth
            }, pickWinLeft = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null, pickWinTop = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null, o.animate || this.element.css($.extend(s, {
                top : pickWinTop,
                left : pickWinLeft
            })), that.helper.height(that.size.height), that.helper.width(that.size.width), this._helper && (!o.animate && this._proportionallyResize())), $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", event), this._helper && this.helper.remove(), false;
        },
        /**
         * @param {Element} forceAspectRatio
         * @return {undefined}
         */
        _updateVirtualBoundaries : function(forceAspectRatio) {
            var pMinWidth;
            var pMaxWidth;
            var pMinHeight;
            var pMaxHeight;
            var b;
            var o = this.options;
            b = {
                minWidth : isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth : isNumber(o.maxWidth) ? o.maxWidth : Infinity,
                minHeight : isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight : isNumber(o.maxHeight) ? o.maxHeight : Infinity
            };
            if (this._aspectRatio || forceAspectRatio) {
                /** @type {number} */
                pMinWidth = b.minHeight * this.aspectRatio;
                /** @type {number} */
                pMinHeight = b.minWidth / this.aspectRatio;
                /** @type {number} */
                pMaxWidth = b.maxHeight * this.aspectRatio;
                /** @type {number} */
                pMaxHeight = b.maxWidth / this.aspectRatio;
                if (pMinWidth > b.minWidth) {
                    /** @type {number} */
                    b.minWidth = pMinWidth;
                }
                if (pMinHeight > b.minHeight) {
                    /** @type {number} */
                    b.minHeight = pMinHeight;
                }
                if (pMaxWidth < b.maxWidth) {
                    /** @type {number} */
                    b.maxWidth = pMaxWidth;
                }
                if (pMaxHeight < b.maxHeight) {
                    /** @type {number} */
                    b.maxHeight = pMaxHeight;
                }
            }
            this._vBoundaries = b;
        },
        /**
         * @param {Object} data
         * @return {undefined}
         */
        _updateCache : function(data) {
            this.offset = this.helper.offset();
            if (isNumber(data.left)) {
                this.position.left = data.left;
            }
            if (isNumber(data.top)) {
                this.position.top = data.top;
            }
            if (isNumber(data.height)) {
                this.size.height = data.height;
            }
            if (isNumber(data.width)) {
                this.size.width = data.width;
            }
        },
        /**
         * @param {Object} data
         * @return {?}
         */
        _updateRatio : function(data) {
            var cpos = this.position;
            var csize = this.size;
            var a = this.axis;
            return isNumber(data.height) ? data.width = data.height * this.aspectRatio : isNumber(data.width) && (data.height = data.width / this.aspectRatio), a === "sw" && (data.left = cpos.left + (csize.width - data.width), data.top = null), a === "nw" && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), data;
        },
        /**
         * @param {Object} data
         * @return {?}
         */
        _respectSize : function(data) {
            var p = this._vBoundaries;
            var a = this.axis;
            var id = isNumber(data.width) && (p.maxWidth && p.maxWidth < data.width);
            var b = isNumber(data.height) && (p.maxHeight && p.maxHeight < data.height);
            var deep = isNumber(data.width) && (p.minWidth && p.minWidth > data.width);
            var o = isNumber(data.height) && (p.minHeight && p.minHeight > data.height);
            var dw = this.originalPosition.left + this.originalSize.width;
            var dh = this.position.top + this.size.height;
            /** @type {boolean} */
            var src = /sw|nw|w/.test(a);
            /** @type {boolean} */
            var c = /nw|ne|n/.test(a);
            return deep && (data.width = p.minWidth), o && (data.height = p.minHeight), id && (data.width = p.maxWidth), b && (data.height = p.maxHeight), deep && (src && (data.left = dw - p.minWidth)), id && (src && (data.left = dw - p.maxWidth)), o && (c && (data.top = dh - p.minHeight)), b && (c && (data.top = dh - p.maxHeight)), !data.width && (!data.height && (!data.left && data.top)) ? data.top = null : !data.width && (!data.height && (!data.top && (data.left && (data.left = null)))), data;
        },
        /**
         * @return {undefined}
         */
        _proportionallyResize : function() {
            if (!this._proportionallyResizeElements.length) {
                return;
            }
            var i;
            var j;
            var splits;
            var captures;
            var prel;
            var element = this.helper || this.element;
            /** @type {number} */
            i = 0;
            for (;i < this._proportionallyResizeElements.length;i++) {
                prel = this._proportionallyResizeElements[i];
                if (!this.borderDif) {
                    /** @type {Array} */
                    this.borderDif = [];
                    /** @type {Array} */
                    splits = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")];
                    /** @type {Array} */
                    captures = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")];
                    /** @type {number} */
                    j = 0;
                    for (;j < splits.length;j++) {
                        /** @type {number} */
                        this.borderDif[j] = (parseInt(splits[j], 10) || 0) + (parseInt(captures[j], 10) || 0);
                    }
                }
                prel.css({
                    height : element.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width : element.width() - this.borderDif[1] - this.borderDif[3] || 0
                });
            }
        },
        /**
         * @return {undefined}
         */
        _renderProxy : function() {
            var $el = this.element;
            var o = this.options;
            this.elementOffset = $el.offset();
            if (this._helper) {
                this.helper = this.helper || $("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width : this.element.outerWidth() - 1,
                    height : this.element.outerHeight() - 1,
                    position : "absolute",
                    left : this.elementOffset.left + "px",
                    top : this.elementOffset.top + "px",
                    zIndex : ++o.zIndex
                });
                this.helper.appendTo("body").disableSelection();
            } else {
                this.helper = this.element;
            }
        },
        _change : {
            /**
             * @param {?} n
             * @param {?} dx
             * @return {?}
             */
            e : function(n, dx) {
                return{
                    width : this.originalSize.width + dx
                };
            },
            /**
             * @param {?} type
             * @param {?} dx
             * @return {?}
             */
            w : function(type, dx) {
                var cs = this.originalSize;
                var sp = this.originalPosition;
                return{
                    left : sp.left + dx,
                    width : cs.width - dx
                };
            },
            /**
             * @param {?} event
             * @param {?} dx
             * @param {?} dy
             * @return {?}
             */
            n : function(event, dx, dy) {
                var cs = this.originalSize;
                var sp = this.originalPosition;
                return{
                    top : sp.top + dy,
                    height : cs.height - dy
                };
            },
            /**
             * @param {?} dx
             * @param {?} u
             * @param {?} dy
             * @return {?}
             */
            s : function(dx, u, dy) {
                return{
                    height : this.originalSize.height + dy
                };
            },
            /**
             * @param {?} event
             * @param {?} dx
             * @param {?} dy
             * @return {?}
             */
            se : function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
            },
            /**
             * @param {?} event
             * @param {?} dx
             * @param {?} dy
             * @return {?}
             */
            sw : function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
            },
            /**
             * @param {?} event
             * @param {?} dx
             * @param {?} dy
             * @return {?}
             */
            ne : function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
            },
            /**
             * @param {?} event
             * @param {?} dx
             * @param {?} dy
             * @return {?}
             */
            nw : function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
            }
        },
        /**
         * @param {string} n
         * @param {Object} event
         * @return {undefined}
         */
        _propagate : function(n, event) {
            $.ui.plugin.call(this, n, [event, this.ui()]);
            if (n !== "resize") {
                this._trigger(n, event, this.ui());
            }
        },
        plugins : {},
        /**
         * @return {?}
         */
        ui : function() {
            return{
                originalElement : this.originalElement,
                element : this.element,
                helper : this.helper,
                position : this.position,
                size : this.size,
                originalSize : this.originalSize,
                originalPosition : this.originalPosition
            };
        }
    });
    $.ui.plugin.add("resizable", "animate", {
        /**
         * @param {boolean} event
         * @return {undefined}
         */
        stop : function(event) {
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var pr = that._proportionallyResizeElements;
            var ista = pr.length && /textarea/i.test(pr[0].nodeName);
            var soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
            var soffsetw = ista ? 0 : that.sizeDiff.width;
            var attributes = {
                width : that.size.width - soffsetw,
                height : that.size.height - soffseth
            };
            /** @type {(null|number)} */
            var left = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null;
            /** @type {(null|number)} */
            var top = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null;
            that.element.animate($.extend(attributes, top && left ? {
                top : top,
                left : left
            } : {}), {
                duration : o.animateDuration,
                easing : o.animateEasing,
                /**
                 * @return {undefined}
                 */
                step : function() {
                    var data = {
                        width : parseInt(that.element.css("width"), 10),
                        height : parseInt(that.element.css("height"), 10),
                        top : parseInt(that.element.css("top"), 10),
                        left : parseInt(that.element.css("left"), 10)
                    };
                    if (pr) {
                        if (pr.length) {
                            $(pr[0]).css({
                                width : data.width,
                                height : data.height
                            });
                        }
                    }
                    that._updateCache(data);
                    that._propagate("resize", event);
                }
            });
        }
    });
    $.ui.plugin.add("resizable", "containment", {
        /**
         * @return {undefined}
         */
        start : function() {
            var element;
            var p;
            var co;
            var ch;
            var cw;
            var width;
            var height;
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var el = that.element;
            var oc = o.containment;
            var ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
            if (!ce) {
                return;
            }
            that.containerElement = $(ce);
            if (/document/.test(oc) || oc === document) {
                that.containerOffset = {
                    left : 0,
                    top : 0
                };
                that.containerPosition = {
                    left : 0,
                    top : 0
                };
                that.parentData = {
                    element : $(document),
                    left : 0,
                    top : 0,
                    width : $(document).width(),
                    height : $(document).height() || document.body.parentNode.scrollHeight
                };
            } else {
                element = $(ce);
                /** @type {Array} */
                p = [];
                $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
                    p[i] = num(element.css("padding" + name));
                });
                that.containerOffset = element.offset();
                that.containerPosition = element.position();
                that.containerSize = {
                    height : element.innerHeight() - p[3],
                    width : element.innerWidth() - p[1]
                };
                co = that.containerOffset;
                /** @type {number} */
                ch = that.containerSize.height;
                /** @type {number} */
                cw = that.containerSize.width;
                width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw;
                height = $.ui.hasScroll(ce) ? ce.scrollHeight : ch;
                that.parentData = {
                    element : ce,
                    left : co.left,
                    top : co.top,
                    width : width,
                    height : height
                };
            }
        },
        /**
         * @param {Event} event
         * @return {undefined}
         */
        resize : function(event) {
            var woset;
            var hoset;
            var i;
            var s;
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var co = that.containerOffset;
            var cp = that.position;
            var l = that._aspectRatio || event.shiftKey;
            var cop = {
                top : 0,
                left : 0
            };
            var ce = that.containerElement;
            if (ce[0] !== document) {
                if (/static/.test(ce.css("position"))) {
                    cop = co;
                }
            }
            if (cp.left < (that._helper ? co.left : 0)) {
                that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left);
                if (l) {
                    /** @type {number} */
                    that.size.height = that.size.width / that.aspectRatio;
                }
                that.position.left = o.helper ? co.left : 0;
            }
            if (cp.top < (that._helper ? co.top : 0)) {
                that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top);
                if (l) {
                    /** @type {number} */
                    that.size.width = that.size.height * that.aspectRatio;
                }
                that.position.top = that._helper ? co.top : 0;
            }
            that.offset.left = that.parentData.left + that.position.left;
            that.offset.top = that.parentData.top + that.position.top;
            /** @type {number} */
            woset = Math.abs((that._helper ? that.offset.left - cop.left : that.offset.left - cop.left) + that.sizeDiff.width);
            /** @type {number} */
            hoset = Math.abs((that._helper ? that.offset.top - cop.top : that.offset.top - co.top) + that.sizeDiff.height);
            /** @type {boolean} */
            i = that.containerElement.get(0) === that.element.parent().get(0);
            /** @type {boolean} */
            s = /relative|absolute/.test(that.containerElement.css("position"));
            if (i) {
                if (s) {
                    woset -= Math.abs(that.parentData.left);
                }
            }
            if (woset + that.size.width >= that.parentData.width) {
                /** @type {number} */
                that.size.width = that.parentData.width - woset;
                if (l) {
                    /** @type {number} */
                    that.size.height = that.size.width / that.aspectRatio;
                }
            }
            if (hoset + that.size.height >= that.parentData.height) {
                /** @type {number} */
                that.size.height = that.parentData.height - hoset;
                if (l) {
                    /** @type {number} */
                    that.size.width = that.size.height * that.aspectRatio;
                }
            }
        },
        /**
         * @return {undefined}
         */
        stop : function() {
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var co = that.containerOffset;
            var cop = that.containerPosition;
            var ce = that.containerElement;
            var iframe = $(that.helper);
            var ho = iframe.offset();
            /** @type {number} */
            var w = iframe.outerWidth() - that.sizeDiff.width;
            /** @type {number} */
            var dialogHeight = iframe.outerHeight() - that.sizeDiff.height;
            if (that._helper) {
                if (!o.animate) {
                    if (/relative/.test(ce.css("position"))) {
                        $(this).css({
                            left : ho.left - cop.left - co.left,
                            width : w,
                            height : dialogHeight
                        });
                    }
                }
            }
            if (that._helper) {
                if (!o.animate) {
                    if (/static/.test(ce.css("position"))) {
                        $(this).css({
                            left : ho.left - cop.left - co.left,
                            width : w,
                            height : dialogHeight
                        });
                    }
                }
            }
        }
    });
    $.ui.plugin.add("resizable", "alsoResize", {
        /**
         * @return {undefined}
         */
        start : function() {
            var that = $(this).data("ui-resizable");
            var o = that.options;
            /**
             * @param {?} exp
             * @return {undefined}
             */
            var _store = function(exp) {
                $(exp).each(function() {
                    var el = $(this);
                    el.data("ui-resizable-alsoresize", {
                        width : parseInt(el.width(), 10),
                        height : parseInt(el.height(), 10),
                        left : parseInt(el.css("left"), 10),
                        top : parseInt(el.css("top"), 10)
                    });
                });
            };
            if (typeof o.alsoResize == "object" && !o.alsoResize.parentNode) {
                if (o.alsoResize.length) {
                    o.alsoResize = o.alsoResize[0];
                    _store(o.alsoResize);
                } else {
                    $.each(o.alsoResize, function(exp) {
                        _store(exp);
                    });
                }
            } else {
                _store(o.alsoResize);
            }
        },
        /**
         * @param {?} event
         * @param {?} ui
         * @return {undefined}
         */
        resize : function(event, ui) {
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var os = that.originalSize;
            var op = that.originalPosition;
            var delta = {
                height : that.size.height - os.height || 0,
                width : that.size.width - os.width || 0,
                top : that.position.top - op.top || 0,
                left : that.position.left - op.left || 0
            };
            /**
             * @param {?} exp
             * @param {number} c
             * @return {undefined}
             */
            var _alsoResize = function(exp, c) {
                $(exp).each(function() {
                    var $target = $(this);
                    var start = $(this).data("ui-resizable-alsoresize");
                    var style = {};
                    var which = c && c.length ? c : $target.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    $.each(which, function(dataAndEvents, prop) {
                        var sum = (start[prop] || 0) + (delta[prop] || 0);
                        if (sum) {
                            if (sum >= 0) {
                                style[prop] = sum || null;
                            }
                        }
                    });
                    $target.css(style);
                });
            };
            if (typeof o.alsoResize == "object" && !o.alsoResize.nodeType) {
                $.each(o.alsoResize, function(exp, c) {
                    _alsoResize(exp, c);
                });
            } else {
                _alsoResize(o.alsoResize);
            }
        },
        /**
         * @return {undefined}
         */
        stop : function() {
            $(this).removeData("resizable-alsoresize");
        }
    });
    $.ui.plugin.add("resizable", "ghost", {
        /**
         * @return {undefined}
         */
        start : function() {
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var cs = that.size;
            that.ghost = that.originalElement.clone();
            that.ghost.css({
                opacity : 0.25,
                display : "block",
                position : "relative",
                height : cs.height,
                width : cs.width,
                margin : 0,
                left : 0,
                top : 0
            }).addClass("ui-resizable-ghost").addClass(typeof o.ghost == "string" ? o.ghost : "");
            that.ghost.appendTo(that.helper);
        },
        /**
         * @return {undefined}
         */
        resize : function() {
            var that = $(this).data("ui-resizable");
            if (that.ghost) {
                that.ghost.css({
                    position : "relative",
                    height : that.size.height,
                    width : that.size.width
                });
            }
        },
        /**
         * @return {undefined}
         */
        stop : function() {
            var that = $(this).data("ui-resizable");
            if (that.ghost) {
                if (that.helper) {
                    that.helper.get(0).removeChild(that.ghost.get(0));
                }
            }
        }
    });
    $.ui.plugin.add("resizable", "grid", {
        /**
         * @return {undefined}
         */
        resize : function() {
            var that = $(this).data("ui-resizable");
            var o = that.options;
            var cs = that.size;
            var position = that.originalSize;
            var offset = that.originalPosition;
            var a = that.axis;
            var grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
            var w = grid[0] || 1;
            var h = grid[1] || 1;
            /** @type {number} */
            var width = Math.round((cs.width - position.width) / w) * w;
            /** @type {number} */
            var height = Math.round((cs.height - position.height) / h) * h;
            var newWidth = position.width + width;
            var newHeight = position.height + height;
            var d = o.maxWidth && o.maxWidth < newWidth;
            var v = o.maxHeight && o.maxHeight < newHeight;
            var m = o.minWidth && o.minWidth > newWidth;
            var g = o.minHeight && o.minHeight > newHeight;
            o.grid = grid;
            if (m) {
                newWidth += w;
            }
            if (g) {
                newHeight += h;
            }
            if (d) {
                newWidth -= w;
            }
            if (v) {
                newHeight -= h;
            }
            if (/^(se|s|e)$/.test(a)) {
                that.size.width = newWidth;
                that.size.height = newHeight;
            } else {
                if (/^(ne)$/.test(a)) {
                    that.size.width = newWidth;
                    that.size.height = newHeight;
                    /** @type {number} */
                    that.position.top = offset.top - height;
                } else {
                    if (/^(sw)$/.test(a)) {
                        that.size.width = newWidth;
                        that.size.height = newHeight;
                        /** @type {number} */
                        that.position.left = offset.left - width;
                    } else {
                        if (newHeight - h > 0) {
                            that.size.height = newHeight;
                            /** @type {number} */
                            that.position.top = offset.top - height;
                        } else {
                            that.size.height = h;
                            /** @type {number} */
                            that.position.top = offset.top + position.height - h;
                        }
                        if (newWidth - w > 0) {
                            that.size.width = newWidth;
                            /** @type {number} */
                            that.position.left = offset.left - width;
                        } else {
                            that.size.width = w;
                            /** @type {number} */
                            that.position.left = offset.left + position.width - w;
                        }
                    }
                }
            }
        }
    });
}(jQuery), function($, dataAndEvents) {
    var n;
    /** @type {string} */
    var baseClasses = "ui-button ui-widget ui-state-default ui-corner-all";
    /** @type {string} */
    var typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only";
    /**
     * @return {undefined}
     */
    var formResetHandler = function() {
        var $e = $(this);
        setTimeout(function() {
            $e.find(":ui-button").button("refresh");
        }, 1);
    };
    /**
     * @param {Object} radio
     * @return {?}
     */
    var radioGroup = function(radio) {
        var name = radio.name;
        var form = radio.form;
        var emptyJ = $([]);
        return name && (name = name.replace(/'/g, "\\'"), form ? emptyJ = $(form).find("[name='" + name + "']") : emptyJ = $("[name='" + name + "']", radio.ownerDocument).filter(function() {
            return!this.form;
        })), emptyJ;
    };
    $.widget("ui.button", {
        version : "1.10.4",
        defaultElement : "<button>",
        options : {
            disabled : null,
            text : true,
            label : null,
            icons : {
                primary : null,
                secondary : null
            }
        },
        /**
         * @return {undefined}
         */
        _create : function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler);
            if (typeof this.options.disabled != "boolean") {
                /** @type {boolean} */
                this.options.disabled = !!this.element.prop("disabled");
            } else {
                this.element.prop("disabled", this.options.disabled);
            }
            this._determineButtonType();
            /** @type {boolean} */
            this.hasTitle = !!this.buttonElement.attr("title");
            var that = this;
            var options = this.options;
            /** @type {boolean} */
            var isSym = this.type === "checkbox" || this.type === "radio";
            /** @type {string} */
            var className = isSym ? "" : "ui-state-active";
            if (options.label === null) {
                options.label = this.type === "input" ? this.buttonElement.val() : this.buttonElement.html();
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                if (options.disabled) {
                    return;
                }
                if (this === n) {
                    $(this).addClass("ui-state-active");
                }
            }).bind("mouseleave" + this.eventNamespace, function() {
                if (options.disabled) {
                    return;
                }
                $(this).removeClass(className);
            }).bind("click" + this.eventNamespace, function(event) {
                if (options.disabled) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
            this._on({
                /**
                 * @return {undefined}
                 */
                focus : function() {
                    this.buttonElement.addClass("ui-state-focus");
                },
                /**
                 * @return {undefined}
                 */
                blur : function() {
                    this.buttonElement.removeClass("ui-state-focus");
                }
            });
            if (isSym) {
                this.element.bind("change" + this.eventNamespace, function() {
                    that.refresh();
                });
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (options.disabled) {
                        return false;
                    }
                });
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function() {
                        if (options.disabled) {
                            return false;
                        }
                        $(this).addClass("ui-state-active");
                        that.buttonElement.attr("aria-pressed", "true");
                        var radio = that.element[0];
                        radioGroup(radio).not(radio).map(function() {
                            return $(this).button("widget")[0];
                        }).removeClass("ui-state-active").attr("aria-pressed", "false");
                    });
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                        if (options.disabled) {
                            return false;
                        }
                        $(this).addClass("ui-state-active");
                        n = this;
                        that.document.one("mouseup", function() {
                            /** @type {null} */
                            n = null;
                        });
                    }).bind("mouseup" + this.eventNamespace, function() {
                        if (options.disabled) {
                            return false;
                        }
                        $(this).removeClass("ui-state-active");
                    }).bind("keydown" + this.eventNamespace, function(event) {
                        if (options.disabled) {
                            return false;
                        }
                        if (event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER) {
                            $(this).addClass("ui-state-active");
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                        $(this).removeClass("ui-state-active");
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function(event) {
                            if (event.keyCode === $.ui.keyCode.SPACE) {
                                $(this).click();
                            }
                        });
                    }
                }
            }
            this._setOption("disabled", options.disabled);
            this._resetButton();
        },
        /**
         * @return {undefined}
         */
        _determineButtonType : function() {
            var ancestor;
            var labelSelector;
            var checked;
            if (this.element.is("[type=checkbox]")) {
                /** @type {string} */
                this.type = "checkbox";
            } else {
                if (this.element.is("[type=radio]")) {
                    /** @type {string} */
                    this.type = "radio";
                } else {
                    if (this.element.is("input")) {
                        /** @type {string} */
                        this.type = "input";
                    } else {
                        /** @type {string} */
                        this.type = "button";
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                ancestor = this.element.parents().last();
                /** @type {string} */
                labelSelector = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = ancestor.find(labelSelector);
                if (!this.buttonElement.length) {
                    ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
                    this.buttonElement = ancestor.filter(labelSelector);
                    if (!this.buttonElement.length) {
                        this.buttonElement = ancestor.find(labelSelector);
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                checked = this.element.is(":checked");
                if (checked) {
                    this.buttonElement.addClass("ui-state-active");
                }
                this.buttonElement.prop("aria-pressed", checked);
            } else {
                this.buttonElement = this.element;
            }
        },
        /**
         * @return {?}
         */
        widget : function() {
            return this.buttonElement;
        },
        /**
         * @return {undefined}
         */
        _destroy : function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title");
            }
        },
        /**
         * @param {?} key
         * @param {boolean} value
         * @return {undefined}
         */
        _setOption : function(key, value) {
            this._super(key, value);
            if (key === "disabled") {
                this.element.prop("disabled", !!value);
                if (value) {
                    this.buttonElement.removeClass("ui-state-focus");
                }
                return;
            }
            this._resetButton();
        },
        /**
         * @return {undefined}
         */
        refresh : function() {
            var pdataOld = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (pdataOld !== this.options.disabled) {
                this._setOption("disabled", pdataOld);
            }
            if (this.type === "radio") {
                radioGroup(this.element[0]).each(function() {
                    if ($(this).is(":checked")) {
                        $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true");
                    } else {
                        $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
                    }
                });
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true");
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false");
                    }
                }
            }
        },
        /**
         * @return {undefined}
         */
        _resetButton : function() {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label);
                }
                return;
            }
            var buttonElement = this.buttonElement.removeClass(typeClasses);
            var buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text();
            var icons = this.options.icons;
            var multipleIcons = icons.primary && icons.secondary;
            /** @type {Array} */
            var buttonClasses = [];
            if (icons.primary || icons.secondary) {
                if (this.options.text) {
                    buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary"));
                }
                if (icons.primary) {
                    buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>");
                }
                if (icons.secondary) {
                    buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>");
                }
                if (!this.options.text) {
                    buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        buttonElement.attr("title", $.trim(buttonText));
                    }
                }
            } else {
                buttonClasses.push("ui-button-text-only");
            }
            buttonElement.addClass(buttonClasses.join(" "));
        }
    });
    $.widget("ui.buttonset", {
        version : "1.10.4",
        options : {
            items : "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        /**
         * @return {undefined}
         */
        _create : function() {
            this.element.addClass("ui-buttonset");
        },
        /**
         * @return {undefined}
         */
        _init : function() {
            this.refresh();
        },
        /**
         * @param {?} key
         * @param {boolean} value
         * @return {undefined}
         */
        _setOption : function(key, value) {
            if (key === "disabled") {
                this.buttons.button("option", key, value);
            }
            this._super(key, value);
        },
        /**
         * @return {undefined}
         */
        refresh : function() {
            /** @type {boolean} */
            var rtl = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return $(this).button("widget")[0];
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end();
        },
        /**
         * @return {undefined}
         */
        _destroy : function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return $(this).button("widget")[0];
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
        }
    });
}(jQuery), function($, dataAndEvents) {
    var sizeRelatedOptions = {
        buttons : true,
        height : true,
        maxHeight : true,
        maxWidth : true,
        minHeight : true,
        minWidth : true,
        width : true
    };
    var resizableRelatedOptions = {
        maxHeight : true,
        maxWidth : true,
        minHeight : true,
        minWidth : true
    };
    $.widget("ui.dialog", {
        version : "1.10.4",
        options : {
            appendTo : "body",
            autoOpen : true,
            buttons : [],
            closable : true,
            closeOnEscape : true,
            closeText : "\u5173\u95ed",
            minimizable : null,
            minimizeText : "\u6700\u5c0f\u5316",
            maximizable : null,
            maximizeText : "\u6700\u5927\u5316",
            dialogClass : "",
            draggable : true,
            hide : null,
            height : "auto",
            maxHeight : null,
            maxWidth : null,
            minHeight : 150,
            minWidth : 150,
            modal : false,
            position : {
                my : "center",
                at : "center",
                of : window,
                collision : "fit",
                /**
                 * @param {?} pos
                 * @return {undefined}
                 */
                using : function(pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css("top", pos.top - topOffset);
                    }
                }
            },
            resizable : true,
            show : null,
            title : null,
            width : 300,
            beforeClose : null,
            close : null,
            drag : null,
            dragStart : null,
            dragStop : null,
            focus : null,
            open : null,
            resize : null,
            resizeStart : null,
            resizeStop : null
        },
        /**
         * @return {undefined}
         */
        _create : function() {
            this.originalCss = {
                display : this.element[0].style.display,
                width : this.element[0].style.width,
                minHeight : this.element[0].style.minHeight,
                maxHeight : this.element[0].style.maxHeight,
                height : this.element[0].style.height
            };
            this.originalPosition = {
                parent : this.element.parent(),
                index : this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            if (this.options.draggable) {
                if ($.fn.draggable) {
                    this._makeDraggable();
                }
            }
            if (this.options.resizable) {
                if ($.fn.resizable) {
                    this._makeResizable();
                }
            }
            /** @type {boolean} */
            this._isOpen = false;
        },
        /**
         * @return {undefined}
         */
        _init : function() {
            if (this.options.autoOpen) {
                this.open();
            }
        },
        /**
         * @return {?}
         */
        _appendTo : function() {
            var element = this.options.appendTo;
            return element && (element.jquery || element.nodeType) ? $(element) : this.document.find(element || "body").eq(0);
        },
        /**
         * @return {undefined}
         */
        _destroy : function() {
            var next;
            var originalPosition = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(true, true).remove();
            if (this.originalTitle) {
                this.element.attr("title", this.originalTitle);
            }
            next = originalPosition.parent.children().eq(originalPosition.index);
            if (next.length && next[0] !== this.element[0]) {
                next.before(this.element);
            } else {
                originalPosition.parent.append(this.element);
            }
        },
        /**
         * @return {?}
         */
        widget : function() {
            return this.uiDialog;
        },
        disable : $.noop,
        enable : $.noop,
        minimize : $.noop,
        maximize : $.noop,
        /**
         * @param {Object} event
         * @return {undefined}
         */
        close : function(event) {
            var activeElement;
            var that = this;
            if (!this._isOpen || this._trigger("beforeClose", event) === false) {
                return;
            }
            /** @type {boolean} */
            this._isOpen = false;
            this._destroyOverlay();
            if (!this.opener.filter(":focusable").focus().length) {
                try {
                    activeElement = this.document[0].activeElement;
                    if (activeElement) {
                        if (activeElement.nodeName.toLowerCase() !== "body") {
                            $(activeElement).blur();
                        }
                    }
                } catch (i) {
                }
            }
            this._hide(this.uiDialog, this.options.hide, function() {
                that._trigger("close", event);
            });
        },
        /**
         * @return {?}
         */
        isOpen : function() {
            return this._isOpen;
        },
        /**
         * @return {undefined}
         */
        moveToTop : function() {
            this._moveToTop();
        },
        /**
         * @param {?} event
         * @param {boolean} dataAndEvents
         * @return {?}
         */
        _moveToTop : function(event, dataAndEvents) {
            var closest = this.uiDialog.parent();
            var i = closest.children();
            var which = this.uiDialog.prevAll(".ui-dialog:visible, .ui-widget-overlay:visible");
            var corners = this.uiDialog.nextAll(".ui-dialog:visible, .ui-widget-overlay:visible");
            /** @type {number} */
            var left = 0;
            /** @type {number} */
            var last = 0;
            /** @type {number} */
            var pos = 0;
            $.each(which, function(dataAndEvents, curr) {
                var cDigit = $(curr).css("z-index");
                if (cDigit) {
                    /** @type {number} */
                    var originalPos = parseInt(cDigit) || 0;
                    if (originalPos > pos) {
                        /** @type {number} */
                        pos = originalPos;
                    }
                }
            });
            $.each(corners, function(dataAndEvents, curr) {
                var cDigit = $(curr).css("z-index");
                if (cDigit) {
                    /** @type {number} */
                    var next = parseInt(cDigit) || 0;
                    if (next > last) {
                        /** @type {number} */
                        last = next;
                    }
                }
            });
            var x = this.uiDialog.css("z-index");
            var c;
            return x >= pos && x > last ? c = false : (left = Math.max(pos, last), this.uiDialog.css("z-index", left + 1), c = true), c && (!dataAndEvents && this._trigger("focus", event)), c;
        },
        /**
         * @return {undefined}
         */
        open : function() {
            var that = this;
            if (this._trigger("beforeopen") === false) {
                return;
            }
            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable();
                }
                return;
            }
            /** @type {boolean} */
            this._isOpen = true;
            this.opener = $(this.document[0].activeElement);
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, true);
            this._show(this.uiDialog, this.options.show, function() {
                that._focusTabbable();
                that._trigger("focus");
            });
            this._trigger("open");
        },
        /**
         * @return {undefined}
         */
        _focusTabbable : function() {
            var hasFocus = this.element.find("[autofocus]");
            if (!hasFocus.length) {
                hasFocus = this.element.find(":tabbable");
            }
            if (!hasFocus.length) {
                hasFocus = this.uiDialogButtonPane.find(":tabbable");
            }
            if (!hasFocus.length) {
                hasFocus = this.uiDialogTitlebarClose.filter(":tabbable");
            }
            if (!hasFocus.length) {
                hasFocus = this.uiDialog;
            }
            hasFocus.eq(0).focus();
        },
        /**
         * @param {?} event
         * @return {undefined}
         */
        _keepFocus : function(event) {
            /**
             * @return {undefined}
             */
            function checkFocus() {
                var activeElement = this.document[0].activeElement;
                var n = this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement);
                if (!n) {
                    this._focusTabbable();
                }
            }
            event.preventDefault();
            checkFocus.call(this);
            this._delay(checkFocus);
        },
        /**
         * @return {undefined}
         */
        _createWrapper : function() {
            this.uiDialog = $("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex : -1,
                role : "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                /**
                 * @param {Object} event
                 * @return {undefined}
                 */
                keydown : function(event) {
                    if (this.options.closeOnEscape && (!event.isDefaultPrevented() && (event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE))) {
                        event.preventDefault();
                        this.close(event);
                        return;
                    }
                    if (event.keyCode !== $.ui.keyCode.TAB) {
                        return;
                    }
                    var contextElem = this.uiDialog.find(":tabbable");
                    var last = contextElem.filter(":first");
                    var element = contextElem.filter(":last");
                    if (event.target !== element[0] && event.target !== this.uiDialog[0] || !!event.shiftKey) {
                        if (event.target === last[0] || event.target === this.uiDialog[0]) {
                            if (event.shiftKey) {
                                element.focus(1);
                                event.preventDefault();
                            }
                        }
                    } else {
                        last.focus(1);
                        event.preventDefault();
                    }
                },
                /**
                 * @param {?} event
                 * @return {undefined}
                 */
                mousedown : function(event) {
                    if (this._moveToTop(event)) {
                        this._focusTabbable();
                    }
                }
            });
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby" : this.element.uniqueId().attr("id")
                });
            }
        },
        /**
         * @return {undefined}
         */
        _createTitlebar : function() {
            var uiDialogTitle;
            this.uiDialogTitlebar = $("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                /**
                 * @param {Event} e
                 * @return {undefined}
                 */
                mousedown : function(e) {
                    if (!$(e.target).closest(".ui-dialog-titlebar-close")) {
                        this.uiDialog.focus();
                    }
                }
            });
            if (this.options.closable) {
                this.uiDialogTitlebarClose = $("<button type='button'></button>").button({
                    label : this.options.closeText,
                    icons : {
                        primary : "ui-icon-closethick"
                    },
                    text : false
                }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
                this._on(this.uiDialogTitlebarClose, {
                    /**
                     * @param {Object} event
                     * @return {undefined}
                     */
                    click : function(event) {
                        event.preventDefault();
                        this.close(event);
                    }
                });
            }
            if (this.options.minimizable) {
                this.uiDialogTitlebarMinimize = $("<button type='button'></button>").button({
                    label : this.options.minimizeText,
                    icons : {
                        primary : "ui-icon-minimizethick"
                    },
                    text : false
                }).addClass("ui-dialog-titlebar-minimize").appendTo(this.uiDialogTitlebar);
                this._on(this.uiDialogTitlebarMinimize, {
                    /**
                     * @param {Object} event
                     * @return {undefined}
                     */
                    click : function(event) {
                        event.preventDefault();
                        this._trigger("minimize", event);
                    }
                });
            }
            if (this.options.maximizable) {
                this.uiDialogTitlebarMaximize = $("<button type='button'></button>").button({
                    label : this.options.maximizeText,
                    icons : {
                        primary : "ui-icon-maximizethick"
                    },
                    text : false
                }).addClass("ui-dialog-titlebar-maximize").appendTo(this.uiDialogTitlebar);
                this._on(this.uiDialogTitlebarMaximize, {
                    /**
                     * @param {Object} event
                     * @return {undefined}
                     */
                    click : function(event) {
                        event.preventDefault();
                        this._trigger("maximize", event);
                    }
                });
            }
            uiDialogTitle = $("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(uiDialogTitle);
            this.uiDialog.attr({
                "aria-labelledby" : uiDialogTitle.attr("id")
            });
        },
        /**
         * @param {Object} title
         * @return {undefined}
         */
        _title : function(title) {
            if (!this.options.title) {
                title.html("&#160;");
            }
            title.text(this.options.title);
        },
        /**
         * @return {undefined}
         */
        _createButtonPane : function() {
            /** @type {string} */
            var icon = this.options.bottomClass ? " " + this.options.bottomClass : "";
            this.uiDialogButtonPane = $("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" + icon);
            this.uiButtonSet = $("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons();
        },
        /**
         * @return {undefined}
         */
        _createButtons : function() {
            var that = this;
            var buttons = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            if ($.isEmptyObject(buttons) || $.isArray(buttons) && !buttons.length) {
                this.uiDialog.removeClass("ui-dialog-buttons");
                return;
            }
            $.each(buttons, function(buf, props) {
                var click;
                var buttonOptions;
                props = $.isFunction(props) ? {
                    /** @type {Function} */
                    click : props,
                    text : buf
                } : props;
                props = $.extend({
                    type : "button"
                }, props);
                click = props.click;
                /**
                 * @return {undefined}
                 */
                props.click = function() {
                    click.apply(that.element[0], arguments);
                };
                buttonOptions = {
                    icons : props.icons,
                    text : props.showText
                };
                delete props.icons;
                delete props.showText;
                $("<button></button>", props).button(buttonOptions).addClass(props.buttonClass).appendTo(that.uiButtonSet);
            });
            this.uiDialog.addClass("ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog);
        },
        /**
         * @return {undefined}
         */
        _makeDraggable : function() {
            /**
             * @param {Object} ui
             * @return {?}
             */
            function filteredUi(ui) {
                return{
                    position : ui.position,
                    offset : ui.offset
                };
            }
            var that = this;
            var options = this.options;
            this.uiDialog.draggable({
                cancel : ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle : ".ui-dialog-titlebar",
                containment : "document",
                /**
                 * @param {?} type
                 * @param {number} ui
                 * @return {undefined}
                 */
                start : function(type, ui) {
                    $(this).addClass("ui-dialog-dragging");
                    that._blockFrames();
                    that._trigger("dragStart", type, filteredUi(ui));
                },
                /**
                 * @param {Object} event
                 * @param {Object} ui
                 * @return {undefined}
                 */
                drag : function(event, ui) {
                    that._trigger("drag", event, filteredUi(ui));
                },
                /**
                 * @param {Object} event
                 * @param {Object} ui
                 * @return {undefined}
                 */
                stop : function(event, ui) {
                    /** @type {Array} */
                    options.position = [ui.position.left - that.document.scrollLeft(), ui.position.top - that.document.scrollTop()];
                    $(this).removeClass("ui-dialog-dragging");
                    that._unblockFrames();
                    that._trigger("dragStop", event, filteredUi(ui));
                }
            });
        },
        /**
         * @return {undefined}
         */
        _makeResizable : function() {
            /**
             * @param {Object} ui
             * @return {?}
             */
            function filteredUi(ui) {
                return{
                    originalPosition : ui.originalPosition,
                    originalSize : ui.originalSize,
                    position : ui.position,
                    size : ui.size
                };
            }
            var that = this;
            var options = this.options;
            var handles = options.resizable;
            var oldPosition = this.uiDialog.css("position");
            /** @type {string} */
            var resizeHandles = typeof handles == "string" ? handles : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel : ".ui-dialog-content",
                containment : "document",
                alsoResize : this.element,
                maxWidth : options.maxWidth,
                maxHeight : options.maxHeight,
                minWidth : options.minWidth,
                minHeight : this._minHeight(),
                handles : resizeHandles,
                /**
                 * @param {?} type
                 * @param {number} ui
                 * @return {undefined}
                 */
                start : function(type, ui) {
                    $(this).addClass("ui-dialog-resizing");
                    that._blockFrames();
                    that._trigger("resizeStart", type, filteredUi(ui));
                },
                /**
                 * @param {Object} event
                 * @param {Object} ui
                 * @return {undefined}
                 */
                resize : function(event, ui) {
                    that._trigger("resize", event, filteredUi(ui));
                },
                /**
                 * @param {Object} event
                 * @param {boolean} ui
                 * @return {undefined}
                 */
                stop : function(event, ui) {
                    options.height = $(this).height();
                    options.width = $(this).width();
                    $(this).removeClass("ui-dialog-resizing");
                    that._unblockFrames();
                    that._trigger("resizeStop", event, filteredUi(ui));
                }
            }).css("position", oldPosition);
        },
        /**
         * @return {?}
         */
        _minHeight : function() {
            var options = this.options;
            return options.height === "auto" ? options.minHeight : Math.min(options.minHeight, options.height);
        },
        /**
         * @return {undefined}
         */
        _position : function() {
            var e = this.uiDialog.is(":visible");
            if (!e) {
                this.uiDialog.show();
            }
            this.uiDialog.position(this.options.position);
            if (!e) {
                this.uiDialog.hide();
            }
        },
        /**
         * @param {?} options
         * @return {undefined}
         */
        _setOptions : function(options) {
            var self = this;
            /** @type {boolean} */
            var s = false;
            var resizableOptions = {};
            $.each(options, function(key, value) {
                self._setOption(key, value);
                if (key in sizeRelatedOptions) {
                    /** @type {boolean} */
                    s = true;
                }
                if (key in resizableRelatedOptions) {
                    /** @type {Object} */
                    resizableOptions[key] = value;
                }
            });
            if (s) {
                this._size();
                this._position();
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", resizableOptions);
            }
        },
        /**
         * @param {string} key
         * @param {?} value
         * @return {undefined}
         */
        _setOption : function(key, value) {
            var n;
            var r;
            var uiDialog = this.uiDialog;
            if (key === "dialogClass") {
                uiDialog.removeClass(this.options.dialogClass).addClass(value);
            }
            if (key === "disabled") {
                return;
            }
            this._super(key, value);
            if (key === "appendTo") {
                this.uiDialog.appendTo(this._appendTo());
            }
            if (key === "buttons") {
                this._createButtons();
            }
            if (key === "closeText") {
                this.uiDialogTitlebarClose.button({
                    label : "" + value
                });
            }
            if (key === "draggable") {
                n = uiDialog.is(":data(ui-draggable)");
                if (n) {
                    if (!value) {
                        uiDialog.draggable("destroy");
                    }
                }
                if (!n) {
                    if (value) {
                        this._makeDraggable();
                    }
                }
            }
            if (key === "position") {
                this._position();
            }
            if (key === "resizable") {
                r = uiDialog.is(":data(ui-resizable)");
                if (r) {
                    if (!value) {
                        uiDialog.resizable("destroy");
                    }
                }
                if (r) {
                    if (typeof value == "string") {
                        uiDialog.resizable("option", "handles", value);
                    }
                }
                if (!r) {
                    if (value !== false) {
                        this._makeResizable();
                    }
                }
            }
            if (key === "title") {
                this._title(this.uiDialogTitlebar.find(".ui-dialog-title"));
            }
        },
        /**
         * @return {undefined}
         */
        _size : function() {
            var nonContentHeight;
            var minContentHeight;
            var maxContentHeight;
            var options = this.options;
            this.element.show().css({
                width : "auto",
                minHeight : 0,
                maxHeight : "none",
                height : 0
            });
            if (options.minWidth > options.width) {
                options.width = options.minWidth;
            }
            nonContentHeight = this.uiDialog.css({
                height : "auto",
                width : options.width
            }).outerHeight();
            /** @type {number} */
            minContentHeight = Math.max(0, options.minHeight - nonContentHeight);
            /** @type {(number|string)} */
            maxContentHeight = typeof options.maxHeight == "number" ? Math.max(0, options.maxHeight - nonContentHeight) : "none";
            if (options.height === "auto") {
                this.element.css({
                    minHeight : minContentHeight,
                    maxHeight : maxContentHeight,
                    height : "auto"
                });
            } else {
                this.element.height(Math.max(0, options.height - nonContentHeight));
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight());
            }
        },
        /**
         * @return {undefined}
         */
        _blockFrames : function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var iframe = $(this);
                return $("<div>").css({
                    position : "absolute",
                    width : iframe.outerWidth(),
                    height : iframe.outerHeight()
                }).appendTo(iframe.parent()).offset(iframe.offset())[0];
            });
        },
        /**
         * @return {undefined}
         */
        _unblockFrames : function() {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks;
            }
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _allowInteraction : function(event) {
            return $(event.target).closest(".ui-dialog").length ? true : !!$(event.target).closest(".ui-datepicker").length;
        },
        /**
         * @return {undefined}
         */
        _createOverlay : function() {
            if (!this.options.modal) {
                return;
            }
            var t = this;
            var widgetFullName = this.widgetFullName;
            this.overlay = $("<div>").addClass("ui-widget-overlay ui-front").insertBefore(this.uiDialog);
            this._on(this.overlay, {
                mousedown : "_keepFocus"
            });
            $.ui.dialog.overlayInstances++;
        },
        /**
         * @return {undefined}
         */
        _destroyOverlay : function() {
            if (!this.options.modal) {
                return;
            }
            if (this.overlay) {
                $.ui.dialog.overlayInstances--;
                if (!$.ui.dialog.overlayInstances) {
                    this.document.unbind("focusin.dialog");
                }
                this.overlay.remove();
                /** @type {null} */
                this.overlay = null;
            }
        }
    });
    /** @type {number} */
    $.ui.dialog.overlayInstances = 0;
    if ($.uiBackCompat !== false) {
        $.widget("ui.dialog", $.ui.dialog, {
            /**
             * @return {undefined}
             */
            _position : function() {
                var position = this.options.position;
                /** @type {Array} */
                var myAt = [];
                /** @type {Array} */
                var offset = [0, 0];
                var i;
                if (position) {
                    if (typeof position == "string" || typeof position == "object" && "0" in position) {
                        myAt = position.split ? position.split(" ") : [position[0], position[1]];
                        if (myAt.length === 1) {
                            myAt[1] = myAt[0];
                        }
                        $.each(["left", "top"], function(i, offsetPosition) {
                            if (+myAt[i] === myAt[i]) {
                                offset[i] = myAt[i];
                                myAt[i] = offsetPosition;
                            }
                        });
                        position = {
                            my : myAt[0] + (offset[0] < 0 ? offset[0] : "+" + offset[0]) + " " + myAt[1] + (offset[1] < 0 ? offset[1] : "+" + offset[1]),
                            at : myAt.join(" ")
                        };
                    }
                    position = $.extend({}, $.ui.dialog.prototype.options.position, position);
                } else {
                    position = $.ui.dialog.prototype.options.position;
                }
                i = this.uiDialog.is(":visible");
                if (!i) {
                    this.uiDialog.show();
                }
                this.uiDialog.position(position);
                if (!i) {
                    this.uiDialog.hide();
                }
            }
        });
    }
}(jQuery), function() {
    /**
     * @param {?} customOptions
     * @return {undefined}
     */
    var Dialog = function(customOptions) {
        this.options = {
            title : "\u63d0\u793a",
            contentEl : "<div></div>",
            appendTo : "body",
            closable : true,
            minimizable : false,
            maximizable : false,
            draggable : true,
            width : 300,
            height : "auto",
            autoOpen : true,
            buttons : []
        };
        var elem = this;
        $.extend(elem.options, customOptions, true);
        var options = elem.options;
        this.element = $(options.contentEl);
        this.element.dialog(options);
    };
    Dialog.prototype = {
        /**
         * @param {string} obj
         * @return {undefined}
         */
        open : function(obj) {
            if (obj) {
                var data;
                for (data in obj) {
                    this.element.dialog("option", data, obj[data]);
                }
            }
            this.element.dialog("open");
        },
        /**
         * @param {Object} context
         * @return {undefined}
         */
        close : function(context) {
            this.element.dialog("close");
        },
        /**
         * @param {?} removeResizeFix
         * @return {undefined}
         */
        destroy : function(removeResizeFix) {
            this.element.dialog("destroy");
        },
        /**
         * @return {?}
         */
        getWrap : function() {
            return this.element.dialog("widget");
        }
    };
    /** @type {function (?): undefined} */
    $.Dialog = Dialog;
    /**
     * @param {string} completeCallback
     * @param {?} opt_attributes
     * @param {Object} options
     * @return {?}
     */
    $.alert = function(completeCallback, opt_attributes, options) {
        if (opt_attributes) {
            if (typeof opt_attributes != "string") {
                options = opt_attributes;
                /** @type {null} */
                opt_attributes = null;
            }
        }
        options = $.extend({
            title : "\u63d0\u793a",
            type : "info",
            modal : true,
            width : 350,
            buttons : [{
                "class" : "ui-button-blue",
                text : options && options.btnText || "\u786e \u5b9a",
                /**
                 * @return {undefined}
                 */
                click : function() {
                    $(this).dialog("close");
                    if (options.fn) {
                        options.fn();
                    }
                }
            }]
        }, options || {});
        if ($.inArray(options.type, ["warning", "info", "error", "ok", "question"]) < 0) {
            /** @type {string} */
            options.type = "info";
        }
        var el = $('<div class="ui-dia-msg ui-dia-msg-' + options.type + '">').append('<i class="icon"></i><div class="ui-dia-msg-text">' + completeCallback + "</div>");
        return opt_attributes && el.append('<div class="ui-dia-extra-text">' + opt_attributes + "</div>"), el = $('<div class="ui-dia-msg-outbox">').append($('<div class="ui-dia-msg-box">').append(el)), el.dialog(options), el;
    };
    /**
     * @param {string} resultCallback
     * @param {(Function|string)} opt_attributes
     * @param {Object} options
     * @return {?}
     */
    $.confirm = function(resultCallback, opt_attributes, options) {
        return opt_attributes && (typeof opt_attributes != "string" && (options = opt_attributes, opt_attributes = null)), options = $.extend({
            buttons : [{
                "class" : "ui-button-blue",
                text : options && options.btnOkText || "\u786e \u5b9a",
                /**
                 * @return {undefined}
                 */
                click : function() {
                    $(this).dialog("close");
                    if (options.fn) {
                        options.fn("yes");
                    }
                }
            }, {
                "class" : "ui-button-gray",
                text : options && options.btnCancelText || "\u53d6 \u6d88",
                /**
                 * @return {undefined}
                 */
                click : function() {
                    $(this).dialog("close");
                    if (options.fn) {
                        options.fn("no");
                    }
                }
            }]
        }, options || {}), $.alert(resultCallback, opt_attributes, options);
    };
}();

