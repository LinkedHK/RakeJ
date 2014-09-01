(function() {
    var self = {
        VERSION : "1.1.4",
        RELEASE : "2012-10-11",
        PATH : function() {
            /** @type {NodeList} */
            var scriptTags = document.getElementsByTagName("script");
            return scriptTags[scriptTags.length - 1].src.replace(/(^|\/)[^\/]+\/[^\/]+$/, "$1");
        }(),
        /**
         * @param {string} path
         * @param {Object} target
         * @return {?}
         */
        namespace : function(path, target) {
            var elem = path.split(".");
            /** @type {number} */
            var i = 0;
            var key;
            if (path.indexOf(".") == 0) {
                /** @type {number} */
                i = 1;
                target = target || self;
            }
            target = target || window;
            for (;key = elem[i++];) {
                if (!target[key]) {
                    target[key] = {};
                }
                target = target[key];
            }
            return target;
        },
        noConflict : function() {
            var _jQuery = window.QW;
            return function() {
                return window.QW = _jQuery, self;
            };
        }(),
        /**
         * @param {string} url
         * @param {Function} callback
         * @param {Object} options
         * @return {undefined}
         */
        loadJs : function(url, callback, options) {
            options = options || {};
            var element = document.getElementsByTagName("head")[0] || document.documentElement;
            /** @type {Element} */
            var activeClassName = document.createElement("script");
            /** @type {boolean} */
            var s = false;
            /** @type {string} */
            activeClassName.src = url;
            if (options.charset) {
                activeClassName.charset = options.charset;
            }
            if ("async" in options) {
                activeClassName.async = options.async || "";
            }
            /** @type {function (): undefined} */
            activeClassName.onerror = activeClassName.onload = activeClassName.onreadystatechange = function() {
                if (!s) {
                    if (!this.readyState || (this.readyState == "loaded" || this.readyState == "complete")) {
                        /** @type {boolean} */
                        s = true;
                        if (callback) {
                            callback();
                        }
                        /** @type {null} */
                        activeClassName.onerror = activeClassName.onload = activeClassName.onreadystatechange = null;
                        element.removeChild(activeClassName);
                    }
                }
            };
            element.insertBefore(activeClassName, element.firstChild);
        },
        loadJsonp : function() {
            /** @type {number} */
            var QWJsonp = new Date * 1;
            return function(text, cb, opts) {
                opts = opts || {};
                /** @type {string} */
                var v = "QWJsonp" + QWJsonp++;
                var cx = opts.callbackReplacer || /%callbackfun%/ig;
                /**
                 * @param {?} outErr
                 * @return {undefined}
                 */
                window[v] = function(outErr) {
                    if (cb) {
                        cb(outErr);
                    }
                    /** @type {null} */
                    window[v] = null;
                };
                if (cx.test(text)) {
                    text = text.replace(cx, v);
                } else {
                    text += (/\?/.test(text) ? "&" : "?") + "callback=" + v;
                }
                self.loadJs(text, opts.oncomplete, opts);
            };
        }(),
        /**
         * @param {string} url
         * @return {undefined}
         */
        loadCss : function(url) {
            var element = document.getElementsByTagName("head")[0] || document.documentElement;
            /** @type {Element} */
            var activeClassName = document.createElement("link");
            /** @type {string} */
            activeClassName.rel = "stylesheet";
            /** @type {string} */
            activeClassName.type = "text/css";
            /** @type {string} */
            activeClassName.href = url;
            element.insertBefore(activeClassName, element.firstChild);
        },
        /**
         * @param {?} textStatus
         * @param {Function} msg
         * @return {?}
         */
        error : function(textStatus, msg) {
            throw msg = msg || Error, new msg(textStatus);
        }
    };
    window.QW = self;
})(), function() {
    /**
     * @param {Object} response
     * @param {Object} events
     * @param {boolean} textStatus
     * @return {?}
     */
    function success(response, events, textStatus) {
        var key;
        for (key in events) {
            if (textStatus || !(key in response)) {
                response[key] = events[key];
            }
        }
        return response;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function inspect(obj) {
        return!!obj && obj.constructor == Object;
    }
    /**
     * @return {undefined}
     */
    function draw() {
        /** @type {number} */
        var i = 0;
        for (;i < list.length;i++) {
            var callback = list[i].callback;
            var keys = list[i].moduleNames.split(/\s*,\s*/g);
            /** @type {boolean} */
            var r = true;
            /** @type {number} */
            var c = 0;
            for (;c < keys.length;c++) {
                var hc = options[keys[c]];
                if (hc.loadStatus != 2 && (hc.loadedChecker ? !hc.loadedChecker() : !QW[keys[c]])) {
                    /** @type {boolean} */
                    r = false;
                    break;
                }
            }
            if (r) {
                callback();
                list.splice(i, 1);
                i--;
            }
        }
    }
    /**
     * @return {undefined}
     */
    function callback() {
        /**
         * @return {undefined}
         */
        function test() {
            /** @type {number} */
            token.loadStatus = 2;
            draw();
            /** @type {boolean} */
            isLoading = false;
            callback();
        }
        var token = tokens[0];
        if (!isLoading && token) {
            /** @type {boolean} */
            isLoading = true;
            tokens.splice(0, 1);
            var oncomplete = token.loadedChecker;
            if (oncomplete && oncomplete()) {
                test();
            } else {
                valueOf(token.url.replace(/^\/\//, QW.PATH), test);
            }
        }
    }
    var options = {};
    var valueOf = QW.loadJs;
    /** @type {Array} */
    var tokens = [];
    /** @type {Array} */
    var list = [];
    /** @type {boolean} */
    isLoading = false;
    var self = {
        provideDomains : [QW],
        /**
         * @param {?} j
         * @param {Function} obj
         * @return {undefined}
         */
        provide : function(j, obj) {
            if (typeof j == "string") {
                /** @type {Array} */
                var codeSegments = self.provideDomains;
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    if (!codeSegments[i][j]) {
                        /** @type {Function} */
                        codeSegments[i][j] = obj;
                    }
                }
            } else {
                if (inspect(j)) {
                    for (i in j) {
                        self.provide(i, j[i]);
                    }
                }
            }
        },
        /**
         * @param {string} name
         * @param {Object} resp
         * @return {undefined}
         */
        addConfig : function(name, resp) {
            if (typeof name == "string") {
                var opt = success({}, resp);
                /** @type {string} */
                opt.moduleName = name;
                options[name] = opt;
            } else {
                if (inspect(name)) {
                    var k;
                    for (k in name) {
                        self.addConfig(k, name[k]);
                    }
                }
            }
        },
        /**
         * @param {string} p
         * @param {Function} fn
         * @return {undefined}
         */
        use : function(p, fn) {
            var old = {};
            /** @type {Array} */
            var handlers = [];
            var keys = p.split(/\s*,\s*/g);
            var i;
            var j;
            var conditionIndex;
            var l;
            var item;
            for (;keys.length;) {
                var mak = {};
                /** @type {number} */
                i = 0;
                for (;i < keys.length;i++) {
                    var name = keys[i];
                    if (!name || QW[name]) {
                        continue;
                    }
                    if (!old[name]) {
                        if (!options[name]) {
                            throw "Unknown module: " + name;
                        }
                        if (options[name].loadStatus != 2) {
                            var plugin = options[name].loadedChecker;
                            if (plugin && plugin()) {
                                continue;
                            }
                            old[name] = options[name];
                        }
                        /** @type {Array} */
                        var idsToCancel = ["requires", "use"];
                        /** @type {number} */
                        j = 0;
                        for (;j < idsToCancel.length;j++) {
                            var uHostName = options[name][idsToCancel[j]];
                            if (uHostName) {
                                var branchDataJSON = uHostName.split(",");
                                /** @type {number} */
                                conditionIndex = 0;
                                for (;conditionIndex < branchDataJSON.length;conditionIndex++) {
                                    /** @type {number} */
                                    mak[branchDataJSON[conditionIndex]] = 0;
                                }
                            }
                        }
                    }
                }
                /** @type {Array} */
                keys = [];
                for (i in mak) {
                    keys.push(i);
                }
            }
            for (i in old) {
                handlers.push(old[i]);
            }
            /** @type {number} */
            i = 0;
            /** @type {number} */
            l = handlers.length;
            for (;i < l;i++) {
                if (!handlers[i].requires) {
                    continue;
                }
                /** @type {number} */
                j = i + 1;
                for (;j < l;j++) {
                    if ((new RegExp("(^|,)" + handlers[j].moduleName + "(,|$)")).test(handlers[i].requires)) {
                        var handler = handlers[j];
                        handlers.splice(j, 1);
                        handlers.splice(i, 0, handler);
                        i--;
                        break;
                    }
                }
            }
            /** @type {number} */
            var next = -1;
            /** @type {number} */
            var last = -1;
            /** @type {number} */
            i = 0;
            for (;i < handlers.length;i++) {
                item = handlers[i];
                if (!item.loadStatus) {
                    if ((new RegExp("(^|,)" + item.moduleName + "(,|$)")).test(p)) {
                        /** @type {number} */
                        next = i;
                    }
                }
                if (item.loadStatus == 1) {
                    if ((new RegExp("(^|,)" + item.moduleName + "(,|$)")).test(p)) {
                        /** @type {number} */
                        last = i;
                    }
                }
            }
            if (next == -1 && last == -1) {
                fn();
                return;
            }
            list.push({
                /** @type {Function} */
                callback : fn,
                moduleNames : p
            });
            /** @type {number} */
            i = 0;
            for (;i < handlers.length;i++) {
                item = handlers[i];
                if (!item.loadStatus) {
                    /** @type {number} */
                    item.loadStatus = 1;
                    tokens.push(item);
                }
            }
            callback();
        }
    };
    QW.ModuleH = self;
    /** @type {function (string, Function): undefined} */
    QW.use = self.use;
    /** @type {function (?, Function): undefined} */
    QW.provide = self.provide;
}(), QW.Browser = function() {
    /** @type {(Navigator|null)} */
    var nav = window.navigator;
    /** @type {string} */
    var ret = nav.userAgent.toLowerCase();
    /** @type {RegExp} */
    var rreturn = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/ig;
    var browser = {
        platform : nav.platform
    };
    ret.replace(rreturn, function(dataAndEvents, name, region) {
        if (!browser[name]) {
            browser[name] = region;
        }
    });
    if (browser.opera) {
        ret.replace(/opera.*version\/([\d.]+)/, function(dataAndEvents, timeout) {
            browser.opera = timeout;
        });
    }
    if (browser.msie) {
        browser.ie = browser.msie;
        /** @type {number} */
        var version = parseInt(browser.msie, 10);
        /** @type {boolean} */
        browser["ie" + version] = true;
    } else {
        if (browser.trident) {
            ret.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/ig, function(dataAndEvents, timeout) {
                browser.msie = timeout;
                browser.ie = browser.msie;
                /** @type {number} */
                var version = parseInt(browser.msie, 10);
                /** @type {boolean} */
                browser["ie" + version] = true;
            });
        }
    }
    return browser;
}();
if (QW.Browser.ie) {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch (e$$29) {
    }
}
(function() {
    var console = {
        /**
         * @param {string} string
         * @return {?}
         */
        trim : function(string) {
            return string.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
        },
        /**
         * @param {string} str
         * @param {Array} codeSegments
         * @return {?}
         */
        mulReplace : function(str, codeSegments) {
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
                str = str.replace(codeSegments[i][0], codeSegments[i][1]);
            }
            return str;
        },
        /**
         * @param {string} html
         * @param {?} formatString
         * @return {?}
         */
        format : function(html, formatString) {
            /** @type {Arguments} */
            var vals = arguments;
            return html.replace(/\{(\d+)\}/ig, function(dataAndEvents, deepDataAndEvents) {
                var val = vals[(deepDataAndEvents | 0) + 1];
                return val == null ? "" : val;
            });
        },
        tmpl : function() {
            /** @type {string} */
            var startAngle = "sArrCMX";
            /** @type {string} */
            var angle = startAngle + '.push("';
            var queue = {
                js : {
                    tagG : "js",
                    isBgn : 1,
                    isEnd : 1,
                    sBgn : '");',
                    sEnd : ";" + angle
                },
                "if" : {
                    tagG : "if",
                    isBgn : 1,
                    rlt : 1,
                    sBgn : '");if',
                    sEnd : "{" + angle
                },
                elseif : {
                    tagG : "if",
                    cond : 1,
                    rlt : 1,
                    sBgn : '");} else if',
                    sEnd : "{" + angle
                },
                "else" : {
                    tagG : "if",
                    cond : 1,
                    rlt : 2,
                    sEnd : '");}else{' + angle
                },
                "/if" : {
                    tagG : "if",
                    isEnd : 1,
                    sEnd : '");}' + angle
                },
                "for" : {
                    tagG : "for",
                    isBgn : 1,
                    rlt : 1,
                    sBgn : '");for',
                    sEnd : "{" + angle
                },
                "/for" : {
                    tagG : "for",
                    isEnd : 1,
                    sEnd : '");}' + angle
                },
                "while" : {
                    tagG : "while",
                    isBgn : 1,
                    rlt : 1,
                    sBgn : '");while',
                    sEnd : "{" + angle
                },
                "/while" : {
                    tagG : "while",
                    isEnd : 1,
                    sEnd : '");}' + angle
                }
            };
            return function(code, er) {
                /** @type {number} */
                var i = -1;
                /** @type {Array} */
                var groups = [];
                /** @type {Array} */
                var b = [[/\{strip\}([\s\S]*?)\{\/strip\}/g, function(dataAndEvents, messageFormat) {
                    return messageFormat.replace(/[\r\n]\s*\}/g, " }").replace(/[\r\n]\s*/g, "");
                }], [/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\{[\s\S]*?\S\}/g, function(url) {
                    url = url.substr(1, url.length - 2);
                    /** @type {number} */
                    var conditionIndex = 0;
                    for (;conditionIndex < branchDataJSON.length;conditionIndex++) {
                        url = url.replace(branchDataJSON[conditionIndex][0], branchDataJSON[conditionIndex][1]);
                    }
                    /** @type {string} */
                    var name = url;
                    if (/^(.\w+)\W/.test(name)) {
                        /** @type {string} */
                        name = RegExp.$1;
                    }
                    var node = queue[name];
                    if (node) {
                        if (node.isBgn) {
                            var group = groups[++i] = {
                                tagG : node.tagG,
                                rlt : node.rlt
                            }
                        }
                        if (node.isEnd) {
                            if (i < 0) {
                                throw new Error("Unexpected Tag: " + url);
                            }
                            group = groups[i--];
                            if (group.tagG != node.tagG) {
                                throw new Error("Unmatch Tags: " + group.tagG + "--" + name);
                            }
                        } else {
                            if (!node.isBgn) {
                                if (i < 0) {
                                    throw new Error("Unexpected Tag:" + url);
                                }
                                group = groups[i];
                                if (group.tagG != node.tagG) {
                                    throw new Error("Unmatch Tags: " + group.tagG + "--" + name);
                                }
                                if (node.cond && !(node.cond & group.rlt)) {
                                    throw new Error("Unexpected Tag: " + name);
                                }
                                group.rlt = node.rlt;
                            }
                        }
                        return(node.sBgn || "") + url.substr(name.length) + (node.sEnd || "");
                    }
                    return'",(' + url + '),"';
                }]];
                /** @type {Array} */
                var branchDataJSON = [[/\\n/g, "\n"], [/\\r/g, "\r"], [/\\"/g, '"'], [/\\\\/g, "\\"], [/\$(\w+)/g, 'opts["$1"]'], [/print\(/g, startAngle + ".push("]];
                /** @type {number} */
                var bi = 0;
                for (;bi < b.length;bi++) {
                    code = code.replace(b[bi][0], b[bi][1]);
                }
                if (i >= 0) {
                    throw new Error("Lose end Tag: " + groups[i].tagG);
                }
                code = code.replace(/##7b/g, "{").replace(/##7d/g, "}").replace(/##23/g, "#");
                /** @type {string} */
                code = "var " + startAngle + "=[];" + angle + code + '");return ' + startAngle + '.join("");';
                /** @type {Function} */
                var c = new Function("opts", code);
                return arguments.length > 1 ? c(er) : c;
            };
        }(),
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        contains : function(element, value) {
            return element.indexOf(value) > -1;
        },
        /**
         * @param {string} errorMessage
         * @return {?}
         */
        dbc2sbc : function(errorMessage) {
            return console.mulReplace(errorMessage, [[/[\uff01-\uff5e]/g, function(a) {
                return String.fromCharCode(a.charCodeAt(0) - 65248);
            }], [/\u3000/g, " "], [/\u3002/g, "."]]);
        },
        /**
         * @param {string} i
         * @return {?}
         */
        byteLen : function(i) {
            return i.replace(/[^\x00-\xff]/g, "--").length;
        },
        /**
         * @param {string} row
         * @param {?} length
         * @param {string} classNames
         * @return {?}
         */
        subByte : function(row, length, classNames) {
            return console.byteLen(row) <= length ? row : (classNames = classNames || "", length -= console.byteLen(classNames), row.substr(0, length).replace(/([^\x00-\xff])/g, "$1 ").substr(0, length).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + classNames);
        },
        /**
         * @param {Object} str
         * @return {?}
         */
        capitalize : function(str) {
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        },
        /**
         * @param {string} string
         * @return {?}
         */
        camelize : function(string) {
            return string.replace(/\-(\w)/ig, function(dataAndEvents, letter) {
                return letter.toUpperCase();
            });
        },
        /**
         * @param {string} s
         * @return {?}
         */
        decamelize : function(s) {
            return s.replace(/[A-Z]/g, function(m3) {
                return "-" + m3.toLowerCase();
            });
        },
        /**
         * @param {string} errorMessage
         * @return {?}
         */
        encode4Js : function(errorMessage) {
            return console.mulReplace(errorMessage, [[/\\/g, "\\u005C"], [/"/g, "\\u0022"], [/'/g, "\\u0027"], [/\//g, "\\u002F"], [/\r/g, "\\u000A"], [/\n/g, "\\u000D"], [/\t/g, "\\u0009"]]);
        },
        /**
         * @param {Object} str
         * @return {?}
         */
        escapeChars : function(str) {
            return console.mulReplace(str, [[/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\t/g, "\\t"]]);
        },
        /**
         * @param {string} messageFormat
         * @return {?}
         */
        encode4Http : function(messageFormat) {
            return messageFormat.replace(/[\u0000-\u0020\u0080-\u00ff\s"'#\/\|\\%<>\[\]\{\}\^~;\?\:@=&]/g, function(sectionName) {
                return encodeURIComponent(sectionName);
            });
        },
        /**
         * @param {?} i
         * @return {?}
         */
        encode4Html : function(i) {
            /** @type {Element} */
            var escapeElement = document.createElement("pre");
            /** @type {Text} */
            var activeClassName = document.createTextNode(i);
            return escapeElement.appendChild(activeClassName), escapeElement.innerHTML;
        },
        /**
         * @param {?} classNames
         * @return {?}
         */
        encode4HtmlValue : function(classNames) {
            return console.encode4Html(classNames).replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        },
        /**
         * @param {string} text
         * @return {?}
         */
        decode4Html : function(text) {
            /** @type {Element} */
            var elem = document.createElement("div");
            return elem.innerHTML = console.stripTags(text), elem.childNodes[0] ? elem.childNodes[0].nodeValue || "" : "";
        },
        /**
         * @param {string} content
         * @return {?}
         */
        stripTags : function(content) {
            return content.replace(/<[^>]*>/gi, "");
        },
        /**
         * @param {Function} code
         * @param {?} stdin
         * @return {?}
         */
        evalJs : function(code, stdin) {
            return(new Function("opts", code))(stdin);
        },
        /**
         * @param {string} dataAndEvents
         * @param {?} $element
         * @return {?}
         */
        evalExp : function(dataAndEvents, $element) {
            return(new Function("opts", "return (" + dataAndEvents + ");"))($element);
        },
        /**
         * @param {string} ins
         * @param {?} name
         * @return {?}
         */
        queryUrl : function(ins, name) {
            ins = ins.replace(/^[^?=]*\?/ig, "").split("#")[0];
            var obj = {};
            return ins.replace(/(^|&)([^&=]+)=([^&]*)/g, function(dataAndEvents, deepDataAndEvents, key, val) {
                try {
                    /** @type {string} */
                    key = decodeURIComponent(key);
                } catch (s) {
                }
                try {
                    /** @type {string} */
                    val = decodeURIComponent(val);
                } catch (s) {
                }
                if (key in obj) {
                    if (obj[key] instanceof Array) {
                        obj[key].push(val);
                    } else {
                        /** @type {Array} */
                        obj[key] = [obj[key], val];
                    }
                } else {
                    /** @type {(Array|string)} */
                    obj[key] = /\[\]$/.test(key) ? [val] : val;
                }
            }), name ? obj[name] : obj;
        },
        /**
         * @param {string} ins
         * @return {?}
         */
        decodeURIJson : function(ins) {
            return console.queryUrl(ins);
        }
    };
    QW.StringH = console;
})(), function() {
    /**
     * @param {?} object
     * @return {?}
     */
    function toString(object) {
        return object != null && object.constructor != null ? Object.prototype.toString.call(object).slice(8, -1) : "";
    }
    var isUndefinedOrNull = QW.StringH.escapeChars;
    var jQuery = {
        /**
         * @param {?} obj
         * @return {?}
         */
        isString : function(obj) {
            return toString(obj) == "String";
        },
        /**
         * @param {?} obj
         * @return {?}
         */
        isFunction : function(obj) {
            return toString(obj) == "Function";
        },
        /**
         * @param {Object} obj
         * @return {?}
         */
        isArray : function(obj) {
            return toString(obj) == "Array";
        },
        /**
         * @param {?} it
         * @return {?}
         */
        isArrayLike : function(it) {
            return!!it && (typeof it == "object" && (it.nodeType != 1 && typeof it.length == "number"));
        },
        /**
         * @param {(Object|string)} value
         * @return {?}
         */
        isObject : function(value) {
            return value !== null && typeof value == "object";
        },
        /**
         * @param {Object} obj
         * @return {?}
         */
        isPlainObject : function(obj) {
            return toString(obj) == "Object";
        },
        /**
         * @param {Object} subPrefix
         * @param {string} dataAndEvents
         * @return {?}
         */
        isWrap : function(subPrefix, dataAndEvents) {
            return!!subPrefix && !!subPrefix[dataAndEvents || "core"];
        },
        /**
         * @param {Object} obj
         * @return {?}
         */
        isElement : function(obj) {
            return!!obj && obj.nodeType == 1;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} val
         * @return {?}
         */
        set : function(element, value, val) {
            if (jQuery.isArray(value)) {
                /** @type {number} */
                var pdataOld = 0;
                for (;pdataOld < value.length;pdataOld++) {
                    jQuery.set(element, value[pdataOld], val[pdataOld]);
                }
            } else {
                if (jQuery.isPlainObject(value)) {
                    for (pdataOld in value) {
                        jQuery.set(element, pdataOld, value[pdataOld]);
                    }
                } else {
                    if (jQuery.isFunction(value)) {
                        /** @type {Array.<?>} */
                        var args = [].slice.call(arguments, 1);
                        /** @type {Object} */
                        args[0] = element;
                        value.apply(null, args);
                    } else {
                        var parts = value.split(".");
                        /** @type {number} */
                        pdataOld = 0;
                        /** @type {Object} */
                        var current = element;
                        /** @type {number} */
                        var a = parts.length - 1;
                        for (;pdataOld < a;pdataOld++) {
                            current = current[parts[pdataOld]];
                        }
                        /** @type {Object} */
                        current[parts[pdataOld]] = val;
                    }
                }
            }
            return element;
        },
        /**
         * @param {Object} element
         * @param {string} value
         * @param {number} options
         * @return {?}
         */
        get : function(element, value, options) {
            if (jQuery.isArray(value)) {
                /** @type {Array} */
                var hash = [];
                var i;
                /** @type {number} */
                i = 0;
                for (;i < value.length;i++) {
                    hash[i] = jQuery.get(element, value[i], options);
                }
            } else {
                if (jQuery.isFunction(value)) {
                    /** @type {Array.<?>} */
                    var args = [].slice.call(arguments, 1);
                    return args[0] = element, value.apply(null, args);
                }
                var codeSegments = value.split(".");
                /** @type {Object} */
                hash = element;
                /** @type {number} */
                i = 0;
                for (;i < codeSegments.length;i++) {
                    if (!options && hash == null) {
                        return;
                    }
                    hash = hash[codeSegments[i]];
                }
            }
            return hash;
        },
        /**
         * @param {Object} obj
         * @param {?} target
         * @param {boolean} deepDataAndEvents
         * @return {?}
         */
        mix : function(obj, target, deepDataAndEvents) {
            if (jQuery.isArray(target)) {
                /** @type {number} */
                var key = 0;
                var queue = target.length;
                for (;key < queue;key++) {
                    jQuery.mix(obj, target[key], deepDataAndEvents);
                }
                return obj;
            }
            if (typeof deepDataAndEvents == "function") {
                for (key in target) {
                    obj[key] = deepDataAndEvents(obj[key], target[key], key);
                }
            } else {
                for (key in target) {
                    if (deepDataAndEvents || !(obj[key] || key in obj)) {
                        obj[key] = target[key];
                    }
                }
            }
            return obj;
        },
        /**
         * @param {?} data
         * @param {Array} array
         * @return {?}
         */
        dump : function(data, array) {
            var cache = {};
            /** @type {number} */
            var i = 0;
            var array_length = array.length;
            for (;i < array_length;i++) {
                if (i in array) {
                    var prop = array[i];
                    if (prop in data) {
                        cache[prop] = data[prop];
                    }
                }
            }
            return cache;
        },
        /**
         * @param {Object} obj
         * @param {Function} f
         * @param {?} opt_obj
         * @return {?}
         */
        map : function(obj, f, opt_obj) {
            var res = {};
            var key;
            for (key in obj) {
                res[key] = f.call(opt_obj, obj[key], key, obj);
            }
            return res;
        },
        /**
         * @param {?} object
         * @return {?}
         */
        keys : function(object) {
            /** @type {Array} */
            var results = [];
            var property;
            for (property in object) {
                if (object.hasOwnProperty(property)) {
                    results.push(property);
                }
            }
            return results;
        },
        /**
         * @param {Object} object
         * @return {?}
         */
        values : function(object) {
            /** @type {Array} */
            var values = [];
            var property;
            for (property in object) {
                if (object.hasOwnProperty(property)) {
                    values.push(object[property]);
                }
            }
            return values;
        },
        /**
         * @param {Object} obj
         * @param {boolean} recurring
         * @return {?}
         */
        create : function(obj, recurring) {
            /**
             * @param {?} name
             * @return {undefined}
             */
            var F = function(name) {
                if (name) {
                    jQuery.mix(this, name, true);
                }
            };
            return F.prototype = obj, new F(recurring);
        },
        /**
         * @param {Object} a
         * @return {?}
         */
        stringify : function(a) {
            if (a == null) {
                return "null";
            }
            if (a.toJSON) {
                a = a.toJSON();
            }
            var type = toString(a).toLowerCase();
            switch(type) {
                case "string":
                    return'"' + isUndefinedOrNull(a) + '"';
                case "number":
                    var value = a.toString();
                    return/N/.test(value) ? "null" : value;
                case "boolean":
                    return a.toString();
                case "date":
                    return "new Date(" + a.getTime() + ")";
                case "array":
                    /** @type {Array} */
                    var qs = [];
                    /** @type {number} */
                    var i = 0;
                    for (;i < a.length;i++) {
                        qs[i] = jQuery.stringify(a[i]);
                    }
                    return "[" + qs.join(",") + "]";
                case "object":
                    if (jQuery.isPlainObject(a)) {
                        /** @type {Array} */
                        qs = [];
                        for (i in a) {
                            qs.push('"' + isUndefinedOrNull(i) + '":' + jQuery.stringify(a[i]));
                        }
                        return "{" + qs.join(",") + "}";
                    }
                    ;
            }
            return "null";
        },
        /**
         * @param {Object} parent
         * @return {?}
         */
        encodeURIJson : function(parent) {
            /** @type {Array} */
            var tagNameArr = [];
            var key;
            for (key in parent) {
                if (parent[key] == null) {
                    continue;
                }
                if (parent[key] instanceof Array) {
                    /** @type {number} */
                    var i = 0;
                    for (;i < parent[key].length;i++) {
                        tagNameArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(parent[key][i]));
                    }
                } else {
                    tagNameArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(parent[key]));
                }
            }
            return tagNameArr.join("&");
        }
    };
    QW.ObjectH = jQuery;
}(), function() {
    var text = QW.ObjectH.isArray;
    var self = {
        /**
         * @param {Array} array
         * @param {Function} fn
         * @param {?} thisArg
         * @return {?}
         */
        map : function(array, fn, thisArg) {
            var length = array.length;
            /** @type {Array} */
            var result = new Array(length);
            /** @type {number} */
            var index = 0;
            for (;index < length;index++) {
                if (index in array) {
                    result[index] = fn.call(thisArg, array[index], index, array);
                }
            }
            return result;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {undefined}
         */
        forEach : function(element, value, object) {
            /** @type {number} */
            var i = 0;
            var length = element.length;
            for (;i < length;i++) {
                if (i in element) {
                    value.call(object, element[i], i, element);
                }
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {?}
         */
        filter : function(element, value, object) {
            /** @type {Array} */
            var values = [];
            /** @type {number} */
            var property = 0;
            var length = element.length;
            for (;property < length;property++) {
                if (property in element) {
                    if (value.call(object, element[property], property, element)) {
                        values.push(element[property]);
                    }
                }
            }
            return values;
        },
        /**
         * @param {Array} arr
         * @param {Function} fn
         * @param {?} bind
         * @return {?}
         */
        some : function(arr, fn, bind) {
            /** @type {number} */
            var i = 0;
            var e = arr.length;
            for (;i < e;i++) {
                if (i in arr && fn.call(bind, arr[i], i, arr)) {
                    return true;
                }
            }
            return false;
        },
        /**
         * @param {Array} arr
         * @param {Function} fn
         * @param {?} bind
         * @return {?}
         */
        every : function(arr, fn, bind) {
            /** @type {number} */
            var i = 0;
            var e = arr.length;
            for (;i < e;i++) {
                if (i in arr && !fn.call(bind, arr[i], i, arr)) {
                    return false;
                }
            }
            return true;
        },
        /**
         * @param {?} array
         * @param {Function} item
         * @param {number} i
         * @return {?}
         */
        indexOf : function(array, item, i) {
            var length = array.length;
            i |= 0;
            if (i < 0) {
                i += length;
            }
            if (i < 0) {
                /** @type {number} */
                i = 0;
            }
            for (;i < length;i++) {
                if (i in array && array[i] === item) {
                    return i;
                }
            }
            return-1;
        },
        /**
         * @param {Array} array
         * @param {?} item
         * @param {number} i
         * @return {?}
         */
        lastIndexOf : function(array, item, i) {
            var length = array.length;
            i |= 0;
            if (!i || i >= length) {
                /** @type {number} */
                i = length - 1;
            }
            if (i < 0) {
                i += length;
            }
            for (;i > -1;i--) {
                if (i in array && array[i] === item) {
                    return i;
                }
            }
            return-1;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        contains : function(element, value) {
            return self.indexOf(element, value) >= 0;
        },
        /**
         * @param {Array} arr
         * @return {undefined}
         */
        clear : function(arr) {
            /** @type {number} */
            arr.length = 0;
        },
        /**
         * @param {Array} list
         * @param {string} keepData
         * @return {?}
         */
        remove : function(list, keepData) {
            /** @type {number} */
            var out = -1;
            /** @type {number} */
            var i = 1;
            for (;i < arguments.length;i++) {
                var node = arguments[i];
                /** @type {number} */
                var idx = 0;
                for (;idx < list.length;idx++) {
                    if (node === list[idx]) {
                        if (out < 0) {
                            /** @type {number} */
                            out = idx;
                        }
                        list.splice(idx--, 1);
                    }
                }
            }
            return out;
        },
        /**
         * @param {Array} array
         * @return {?}
         */
        unique : function(array) {
            /** @type {Array} */
            var clone = [];
            /** @type {null} */
            var item = null;
            /** @type {function ((Array.<T>|null|{length: number}), T, number=): number} */
            var getAll = Array.indexOf || self.indexOf;
            /** @type {number} */
            var i = 0;
            var array_length = array.length;
            for (;i < array_length;i++) {
                if (getAll(clone, item = array[i]) < 0) {
                    clone.push(item);
                }
            }
            return clone;
        },
        /**
         * @param {Array} arr
         * @param {?} fn
         * @param {Text} result
         * @return {?}
         */
        reduce : function(arr, fn, result) {
            var e = arr.length;
            /** @type {number} */
            var i = 0;
            if (arguments.length < 3) {
                /** @type {number} */
                var s = 0;
                for (;i < e;i++) {
                    if (i in arr) {
                        result = arr[i++];
                        /** @type {number} */
                        s = 1;
                        break;
                    }
                }
                if (!s) {
                    throw new Error("No component to reduce");
                }
            }
            for (;i < e;i++) {
                if (i in arr) {
                    result = fn(result, arr[i], i, arr);
                }
            }
            return result;
        },
        /**
         * @param {Array} arr
         * @param {?} fn
         * @param {Text} result
         * @return {?}
         */
        reduceRight : function(arr, fn, result) {
            var l = arr.length;
            /** @type {number} */
            var i = l - 1;
            if (arguments.length < 3) {
                /** @type {number} */
                var s = 0;
                for (;i > -1;i--) {
                    if (i in arr) {
                        result = arr[i--];
                        /** @type {number} */
                        s = 1;
                        break;
                    }
                }
                if (!s) {
                    throw new Error("No component to reduceRight");
                }
            }
            for (;i > -1;i--) {
                if (i in arr) {
                    result = fn(result, arr[i], i, arr);
                }
            }
            return result;
        },
        /**
         * @param {Array} list
         * @param {?} shallow
         * @return {?}
         */
        expand : function(list, shallow) {
            /** @type {Array} */
            var memo = [];
            /** @type {number} */
            var i = 0;
            var listLength = list.length;
            for (;i < listLength;i++) {
                if (text(list[i])) {
                    /** @type {Array} */
                    memo = memo.concat(shallow ? list[i] : self.expand(list[i]));
                } else {
                    memo.push(list[i]);
                }
            }
            return memo;
        },
        /**
         * @param {Array} ar
         * @return {?}
         */
        toArray : function(ar) {
            /** @type {Array} */
            var a = [];
            /** @type {number} */
            var i = 0;
            for (;i < ar.length;i++) {
                a[i] = ar[i];
            }
            return a;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        wrap : function(element, value) {
            return new value(element);
        }
    };
    QW.ArrayH = self;
}(), function() {
    var indexOf = QW.ArrayH.contains;
    var jQuery = {
        /**
         * @param {Object} activeClassName
         * @param {Array} array
         * @return {?}
         */
        union : function(activeClassName, array) {
            /** @type {Array} */
            var results = [];
            /** @type {number} */
            var index = 0;
            var length = array.length;
            for (;index < length;index++) {
                if (!indexOf(activeClassName, array[index])) {
                    results.push(array[index]);
                }
            }
            return activeClassName.concat(results);
        },
        /**
         * @param {Object} activeClassName
         * @param {Array} array
         * @return {?}
         */
        intersect : function(activeClassName, array) {
            /** @type {Array} */
            var result = [];
            /** @type {number} */
            var index = 0;
            var length = array.length;
            for (;index < length;index++) {
                if (indexOf(activeClassName, array[index])) {
                    result.push(array[index]);
                }
            }
            return result;
        },
        /**
         * @param {Object} token
         * @param {Object} array
         * @return {?}
         */
        minus : function(token, array) {
            /** @type {Array} */
            var result = [];
            /** @type {number} */
            var i = 0;
            var len = token.length;
            for (;i < len;i++) {
                if (!indexOf(token, array[i])) {
                    result.push(token[i]);
                }
            }
            return result;
        },
        /**
         * @param {Object} data
         * @param {Object} fn
         * @return {?}
         */
        complement : function(data, fn) {
            return jQuery.minus(data, fn).concat(jQuery.minus(fn, data));
        }
    };
    QW.HashsetH = jQuery;
}(), function() {
    var mockFormat = {
        /**
         * @param {Date} date
         * @param {string} format
         * @return {?}
         */
        format : function(date, format) {
            format = format || "yyyy-MM-dd";
            var selector = date.getFullYear().toString();
            var map = {
                M : date.getMonth() + 1,
                d : date.getDate(),
                h : date.getHours(),
                m : date.getMinutes(),
                s : date.getSeconds()
            };
            format = format.replace(/(y+)/ig, function(dataAndEvents, xs) {
                return selector.substr(4 - Math.min(4, xs.length));
            });
            var letter;
            for (letter in map) {
                format = format.replace(new RegExp("(" + letter + "+)", "g"), function(dataAndEvents, newlines) {
                    return map[letter] < 10 && newlines.length > 1 ? "0" + map[letter] : map[letter];
                });
            }
            return format;
        }
    };
    QW.DateH = mockFormat;
}(), function() {
    var bind = {
        /**
         * @param {?} fn
         * @param {?} str
         * @return {?}
         */
        methodize : function(fn, str) {
            return str ? function() {
                return fn.apply(null, [this[str]].concat([].slice.call(arguments)));
            } : function() {
                return fn.apply(null, [this].concat([].slice.call(arguments)));
            };
        },
        /**
         * @param {Function} s
         * @param {number} key
         * @return {?}
         */
        mul : function(s, key) {
            /** @type {boolean} */
            var isBackspace = key == 1;
            /** @type {boolean} */
            var bulk = key == 2;
            /** @type {boolean} */
            var isXML = key == 3;
            return isBackspace ? function() {
                var items = arguments[0];
                if (!(items instanceof Array)) {
                    return s.apply(this, arguments);
                }
                if (items.length) {
                    /** @type {Array.<?>} */
                    var args = [].slice.call(arguments);
                    return args[0] = items[0], s.apply(this, args);
                }
            } : function() {
                var values = arguments[0];
                if (values instanceof Array) {
                    /** @type {Array.<?>} */
                    var args = [].slice.call(arguments);
                    /** @type {Array} */
                    var r = [];
                    /** @type {number} */
                    var i = 0;
                    /** @type {number} */
                    var valuesLen = values.length;
                    var p;
                    for (;i < valuesLen;i++) {
                        args[0] = values[i];
                        p = s.apply(this, args);
                        if (bulk) {
                            if (p != null) {
                                /** @type {Array} */
                                r = r.concat(p);
                            }
                        } else {
                            if (isXML) {
                                if (p !== undefined) {
                                    return p;
                                }
                            } else {
                                r.push(p);
                            }
                        }
                    }
                    return isXML ? undefined : r;
                }
                return s.apply(this, arguments);
            };
        },
        /**
         * @param {Function} fn
         * @param {Function} name
         * @param {?} value
         * @param {boolean} dataAndEvents
         * @return {?}
         */
        rwrap : function(fn, name, value, dataAndEvents) {
            return value == null && (value = 0), function() {
                var data = fn.apply(this, arguments);
                if (dataAndEvents && data !== undefined) {
                    return data;
                }
                if (value >= 0) {
                    data = arguments[value];
                } else {
                    if (value == "this" || value == "context") {
                        data = this;
                    }
                }
                return name ? new name(data) : data;
            };
        },
        /**
         * @param {Function} fn
         * @param {string} p
         * @param {Function} callback
         * @return {?}
         */
        hook : function(fn, p, callback) {
            if (p == "before") {
                return function() {
                    /** @type {Array.<?>} */
                    var args = [].slice.call(arguments);
                    if (false !== callback.call(this, args, fn, p)) {
                        return fn.apply(this, args);
                    }
                };
            }
            if (p == "after") {
                return function() {
                    /** @type {Array.<?>} */
                    var newArgs = [].slice.call(arguments);
                    var result = fn.apply(this, newArgs);
                    return callback.call(this, result, fn, p);
                };
            }
            throw new Error("unknow hooker:" + p);
        },
        /**
         * @param {Function} fn
         * @param {Object} obj
         * @return {?}
         */
        bind : function(fn, obj) {
            /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
            var __slice = [].slice;
            /** @type {Array.<?>} */
            var args = __slice.call(arguments, 2);
            /**
             * @return {undefined}
             */
            var FNOP = function() {
            };
            /**
             * @return {?}
             */
            var fBound = function() {
                return fn.apply(this instanceof FNOP ? this : obj || {}, args.concat(__slice.call(arguments)));
            };
            return FNOP.prototype = fn.prototype, fBound.prototype = new FNOP, fBound;
        },
        /**
         * @param {Function} callback
         * @param {?} socket
         * @param {Array} args
         * @param {?} frequency
         * @param {Function} iterator
         * @return {?}
         */
        lazyApply : function(callback, socket, args, frequency, iterator) {
            iterator = iterator || function() {
                return true;
            };
            /**
             * @return {undefined}
             */
            var loop = function() {
                var key = iterator();
                if (key == 1) {
                    callback.apply(socket, args || []);
                }
                if (key == 1 || key == -1) {
                    clearInterval(id);
                }
            };
            /** @type {number} */
            var id = setInterval(loop, frequency);
            return id;
        }
    };
    QW.FunctionH = bind;
}(), function() {
    var mix = QW.ObjectH.mix;
    var create = QW.ObjectH.create;
    var util = {
        /**
         * @param {Function} ctor
         * @return {?}
         */
        createInstance : function(ctor) {
            var instance = create(ctor.prototype);
            return ctor.apply(instance, [].slice.call(arguments, 1)), instance;
        },
        /**
         * @param {Function} self
         * @param {Function} b
         * @return {?}
         */
        extend : function(self, b) {
            /**
             * @param {Array} args
             * @return {?}
             */
            function create(args) {
                /**
                 * @return {undefined}
                 */
                var F = function() {
                };
                F.prototype = args[0].prototype;
                /** @type {number} */
                var i = 1;
                for (;i < args.length;i++) {
                    var t = args[i];
                    mix(F.prototype, t.prototype);
                }
                return new F;
            }
            var a = self.prototype;
            return self.prototype = create([].slice.call(arguments, 1)), self.$super = b, mix(self.prototype, a, true), self;
        }
    };
    QW.ClassH = util;
}(), function() {
    var jQuery = QW.FunctionH;
    var parseFloat = QW.ObjectH.create;
    var deepClone = QW.ObjectH.isPlainObject;
    /**
     * @return {undefined}
     */
    var ctor = function() {
    };
    var methodize = {
        /**
         * @param {Object} obj
         * @param {Function} data
         * @param {(Object|string)} value
         * @return {?}
         */
        rwrap : function(obj, data, value) {
            var ret = parseFloat(obj);
            value = value || "operator";
            var key;
            for (key in obj) {
                /** @type {(Object|string)} */
                var color = value;
                var val = obj[key];
                if (val instanceof Function) {
                    if (typeof color != "string") {
                        color = value[key] || "";
                    }
                    if ("queryer" == color) {
                        ret[key] = jQuery.rwrap(val, data, "returnValue");
                    } else {
                        if ("operator" == color) {
                            if (obj instanceof ctor) {
                                ret[key] = jQuery.rwrap(val, data, "this");
                            } else {
                                ret[key] = jQuery.rwrap(val, data, 0);
                            }
                        } else {
                            if ("gsetter" == color) {
                                if (obj instanceof ctor) {
                                    ret[key] = jQuery.rwrap(val, data, "this", true);
                                } else {
                                    ret[key] = jQuery.rwrap(val, data, 0, true);
                                }
                            }
                        }
                    }
                }
            }
            return ret;
        },
        /**
         * @param {?} obj
         * @param {Object} types
         * @return {?}
         */
        gsetter : function(obj, types) {
            var h = parseFloat(obj);
            types = types || {};
            var type;
            for (type in types) {
                h[type] = function(colNames, i) {
                    return function() {
                        /** @type {number} */
                        var argsLength = arguments.length;
                        return argsLength -= i, deepClone(arguments[i]) && argsLength++, h[colNames[Math.min(argsLength, colNames.length - 1)]].apply(this, arguments);
                    };
                }(types[type], obj instanceof ctor ? 0 : 1);
            }
            return h;
        },
        /**
         * @param {Object} input
         * @param {Object} b
         * @return {?}
         */
        mul : function(input, b) {
            var result = parseFloat(input);
            b = b || {};
            /** @type {number} */
            var fn = 0;
            /** @type {number} */
            var related = 1;
            /** @type {number} */
            var type = 2;
            /** @type {number} */
            var index = 3;
            var key;
            for (key in input) {
                var value = input[key];
                if (value instanceof Function) {
                    /** @type {Object} */
                    var name = b;
                    if (typeof name != "string") {
                        name = b[key] || "";
                    }
                    if ("getter" == name || ("getter_first" == name || "getter_first_all" == name)) {
                        result[key] = jQuery.mul(value, related);
                    } else {
                        if ("getter_all" == name) {
                            result[key] = jQuery.mul(value, fn);
                        } else {
                            if ("gsetter" == name) {
                                result[key] = jQuery.mul(value, index);
                            } else {
                                result[key] = jQuery.mul(value, type);
                            }
                        }
                    }
                    if ("getter" == name || "getter_first_all" == name) {
                        result[key + "All"] = jQuery.mul(value, fn);
                    }
                }
            }
            return result;
        },
        /**
         * @param {?} object
         * @param {(Error|string)} fn
         * @param {?} dataAndEvents
         * @return {?}
         */
        methodize : function(object, fn, dataAndEvents) {
            var result = new ctor;
            var key;
            for (key in object) {
                var value = object[key];
                if (value instanceof Function) {
                    result[key] = jQuery.methodize(value, fn);
                } else {
                    if (dataAndEvents) {
                        result[key] = value;
                    }
                }
            }
            return result;
        }
    };
    QW.HelperH = methodize;
}(), function() {
    QW.JSON = {
        /**
         * @param {string} str
         * @return {?}
         */
        parse : function(str) {
            if (/^[[\],:{}\s0]*$/.test(str.replace(/\\\\|\\"|\\'|\w+\s*\:|null|true|false|[+\-eE.]|new Date(\d*)/g, "0").replace(/"[^"]*"|'[^']*'|\d+/g, "0"))) {
                return(new Function("return (" + str + ");"))();
            }
            throw "Invalid JSON format in executing JSON.parse";
        },
        /**
         * @param {Object} obj
         * @return {?}
         */
        stringify : function(obj) {
            return QW.ObjectH.stringify(obj);
        }
    };
}(), function() {
    var createEvent = QW.ObjectH.mix;
    var indexOf = QW.ArrayH.indexOf;
    /**
     * @param {Object} el
     * @param {string} type
     * @param {Object} silent
     * @return {undefined}
     */
    var CustomEvent = function(el, type, silent) {
        /** @type {Object} */
        this.target = el;
        /** @type {string} */
        this.type = type;
        createEvent(this, silent || {});
    };
    createEvent(CustomEvent.prototype, {
        target : null,
        currentTarget : null,
        type : null,
        returnValue : undefined,
        /**
         * @return {undefined}
         */
        preventDefault : function() {
            /** @type {boolean} */
            this.returnValue = false;
        }
    });
    var self = {
        /**
         * @param {Object} event
         * @param {string} type
         * @param {Function} fn
         * @return {?}
         */
        on : function(event, type, fn) {
            var xs = event.__custListeners && event.__custListeners[type];
            return xs || (self.createEvents(event, type), xs = event.__custListeners && event.__custListeners[type]), indexOf(xs, fn) > -1 ? false : (xs.push(fn), true);
        },
        /**
         * @param {Object} element
         * @param {(number|string)} type
         * @param {Function} fn
         * @return {?}
         */
        un : function(element, type, fn) {
            var arr = element.__custListeners && element.__custListeners[type];
            if (!arr) {
                return false;
            }
            if (fn) {
                var i = indexOf(arr, fn);
                if (i < 0) {
                    return false;
                }
                arr.splice(i, 1);
            } else {
                /** @type {number} */
                arr.length = 0;
            }
            return true;
        },
        /**
         * @param {string} eventName
         * @param {string} type
         * @param {string} data
         * @return {?}
         */
        fire : function(eventName, type, data) {
            if (type instanceof CustomEvent) {
                var event = createEvent(type, data);
                type = type.type;
            } else {
                event = new CustomEvent(eventName, type, data);
            }
            var codeSegments = eventName.__custListeners && eventName.__custListeners[type];
            if (!codeSegments) {
                self.createEvents(eventName, type);
                codeSegments = eventName.__custListeners && eventName.__custListeners[type];
            }
            if (type != "*") {
                codeSegments = codeSegments.concat(eventName.__custListeners["*"] || []);
            }
            event.returnValue = undefined;
            /** @type {string} */
            event.currentTarget = eventName;
            var el = event.currentTarget;
            if (el && el["on" + event.type]) {
                var e = el["on" + event.type].call(el, event)
            }
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
                codeSegments[i].call(el, event);
            }
            return event.returnValue !== false && (e !== false || event.returnValue !== undefined);
        },
        /**
         * @param {string} event
         * @param {(Array|string)} types
         * @return {?}
         */
        createEvents : function(event, types) {
            types = types || [];
            if (typeof types == "string") {
                /** @type {Array.<string>} */
                types = types.split(",");
            }
            var cur = event.__custListeners;
            if (!cur) {
                cur = event.__custListeners = {};
            }
            /** @type {number} */
            var i = 0;
            for (;i < types.length;i++) {
                cur[types[i]] = cur[types[i]] || [];
            }
            return cur["*"] = cur["*"] || [], event;
        }
    };
    /**
     * @return {undefined}
     */
    var Type = function() {
        this.__custListeners = {};
    };
    var data = QW.HelperH.methodize(self);
    createEvent(Type.prototype, data);
    /**
     * @param {string} event
     * @param {(Array|string)} types
     * @return {?}
     */
    CustomEvent.createEvents = function(event, types) {
        return self.createEvents(event, types), createEvent(event, data);
    };
    /** @type {function (Object, string, Object): undefined} */
    QW.CustEvent = CustomEvent;
    QW.CustEventTargetH = self;
    /** @type {function (): undefined} */
    QW.CustEventTarget = Type;
}(), function() {
    /**
     * @return {?}
     */
    function val() {
        return true;
    }
    /**
     * @param {Object} object
     * @param {Function} fn
     * @return {?}
     */
    function ondata(object, fn) {
        /** @type {Array} */
        var acc = [];
        var length = object.length;
        /** @type {number} */
        var i = 0;
        var x;
        if (fn == val) {
            if (object instanceof Array) {
                return object.slice(0);
            }
            for (;i < length;i++) {
                acc[i] = object[i];
            }
        } else {
            for (;i < length;) {
                x = object[i++];
                if (fn(x)) {
                    acc.push(x);
                }
            }
        }
        return acc;
    }
    /**
     * @param {Element} root
     * @return {?}
     */
    function walk(root) {
        var tail = root.children || root.childNodes;
        var valuesLen = tail.length;
        /** @type {Array} */
        var context = [];
        /** @type {number} */
        var i = 0;
        for (;i < valuesLen;i++) {
            if (tail[i].nodeType == 1) {
                context.push(tail[i]);
            }
        }
        return context;
    }
    /**
     * @param {string} name
     * @return {?}
     */
    function match(name) {
        /** @type {(HTMLElement|null)} */
        var ret = document.getElementById(name);
        var codeSegments;
        if (ret && ret.id != name) {
            /** @type {NodeList} */
            codeSegments = document.getElementsByName(name);
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
                if (codeSegments[i].id == name) {
                    return codeSegments[i];
                }
            }
            return null;
        }
        return ret;
    }
    /**
     * @param {number} el
     * @param {string} i
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function nth(el, i, dataAndEvents) {
        if (i == "n") {
            return true;
        }
        if (typeof el == "number") {
            /** @type {number} */
            var next = el
        } else {
            var e = el.parentNode;
            if (e.__queryStamp != source) {
                var n = {
                    nextSibling : e.firstChild
                };
                /** @type {number} */
                var ni = 1;
                for (;n = n.nextSibling;) {
                    if (n.nodeType == 1) {
                        /** @type {number} */
                        n.__siblingIdx = ni++;
                    }
                }
                e.__queryStamp = source;
                /** @type {number} */
                e.__childrenNum = ni - 1;
            }
            if (dataAndEvents) {
                /** @type {number} */
                next = e.__childrenNum - el.__siblingIdx + 1;
            } else {
                next = el.__siblingIdx;
            }
        }
        switch(i) {
            case "even":
                ;
            case "2n":
                return next % 2 == 0;
            case "odd":
                ;
            case "2n+1":
                return next % 2 == 1;
            default:
                if (!/n/.test(i)) {
                    return next == i;
                }
                var c = i.replace(/(^|\D+)n/g, "$11n").split("n");
                /** @type {number} */
                var a = c[0] | 0;
                /** @type {number} */
                var b = next - c[1] | 0;
                return a * b >= 0 && b % a == 0;
        }
    }
    /**
     * @param {string} key
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function test(key, dataAndEvents) {
        if (!dataAndEvents && obj[key]) {
            return obj[key];
        }
        /** @type {Array} */
        var eventPath = [];
        var value = trim(key);
        /** @type {RegExp} */
        var r20 = /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/g;
        /** @type {Array} */
        var leaks = [];
        value = value.replace(/\:([\w\-]+)(\(([^)]+)\))?/g, function(dataAndEvents, cur, deepDataAndEvents, file, ignoreMethodDoesntExist) {
            return eventPath.push([cur, file]), "";
        }).replace(/^\*/g, function(dataAndEvents) {
            return leaks.push("el.nodeType==1"), "";
        }).replace(/^([\w\-]+)/g, function(letter) {
            return leaks.push('(el.tagName||"").toUpperCase()=="' + letter.toUpperCase() + '"'), "";
        }).replace(/([\[(].*)|#([\w\-]+)|\.([\w\-]+)/g, function(ignoreMethodDoesntExist, textAlt, dataAndEvents, deepDataAndEvents) {
            return textAlt || (dataAndEvents && '[id="' + dataAndEvents + '"]' || deepDataAndEvents && '[className~="' + deepDataAndEvents + '"]');
        }).replace(r20, function(dataAndEvents, timeoutKey, classNames, deepDataAndEvents, substitution) {
            var guess = self._attrGetters[timeoutKey] || 'el.getAttribute("' + timeoutKey + '")';
            return leaks.push(self._operators[classNames || ""].replace(/aa/g, guess).replace(/vv/g, substitution || "")), "";
        });
        if (!/^\s*$/.test(value)) {
            throw "Unsupported Selector:\n" + key + "\n-" + value;
        }
        /** @type {number} */
        var eventPathIndex = 0;
        var cur;
        for (;cur = eventPath[eventPathIndex];eventPathIndex++) {
            if (!self._pseudos[cur[0]]) {
                throw "Unsupported Selector:\n" + cur[0] + "\n" + value;
            }
            leaks.push('__SltPsds["' + cur[0] + '"](el,"' + (cur[1] != null ? cdata(cur[1]) : "") + '",i,els)');
        }
        return leaks.length ? dataAndEvents ? new Function("els", "var els2=[];for(var i=0,el;el=els[i];i++){if(" + leaks.join("&&") + ") els2.push(el);} return els2;") : obj[key] = new Function("el, i, els", "return " + leaks.join("&&") + ";") : dataAndEvents ? function(name) {
            return ondata(name, val);
        } : obj[key] = val;
    }
    /**
     * @param {Object} element
     * @param {string} selector
     * @return {?}
     */
    function parse(element, selector) {
        if (BUGGY_QUIRKS_QSAPI && /^((^|,)\s*[.\w-][.\w\s\->+~]*)+$/.test(selector)) {
            var originalID = element.id;
            var res;
            /** @type {Array} */
            var ret = [];
            var elems;
            if (!originalID && element.parentNode) {
                /** @type {string} */
                res = element.id = "__QW_slt_" + __QW_slt_++;
                try {
                    elems = element.querySelectorAll("#" + res + " " + selector);
                } finally {
                    element.removeAttribute("id");
                }
            } else {
                elems = element.querySelectorAll(selector);
            }
            /** @type {number} */
            var i = 0;
            var length = elems.length;
            for (;i < length;i++) {
                ret.push(elems[i]);
            }
            return ret;
        }
        return null;
    }
    /**
     * @param {Object} state
     * @param {string} key
     * @return {?}
     */
    function next(state, key) {
        y++;
        var ret = parse(state, key);
        if (ret) {
            return ret;
        }
        var parts = f(key);
        /** @type {Array} */
        var nodes = [state];
        var i;
        var node;
        var elem;
        var user;
        var func;
        for (;user = parts[0];) {
            if (!nodes.length) {
                return[];
            }
            var gen = user[0];
            /** @type {Array} */
            ret = [];
            if (gen == "+") {
                func = test(user[1]);
                /** @type {number} */
                i = 0;
                for (;node = nodes[i++];) {
                    for (;node = node.nextSibling;) {
                        if (node.tagName) {
                            if (func(node)) {
                                ret.push(node);
                            }
                            break;
                        }
                    }
                }
                /** @type {Array} */
                nodes = ret;
                parts.splice(0, 1);
            } else {
                if (gen != "~") {
                    break;
                }
                func = test(user[1]);
                /** @type {number} */
                i = 0;
                for (;node = nodes[i++];) {
                    if (i > 1 && node.parentNode == nodes[i - 2].parentNode) {
                        continue;
                    }
                    for (;node = node.nextSibling;) {
                        if (node.tagName) {
                            if (func(node)) {
                                ret.push(node);
                            }
                        }
                    }
                }
                /** @type {Array} */
                nodes = ret;
                parts.splice(0, 1);
            }
        }
        var pLen = parts.length;
        if (!pLen || !nodes.length) {
            return nodes;
        }
        /** @type {number} */
        var x = 0;
        var name;
        var stack;
        for (;stack = parts[x];x++) {
            if (/^[.\w-]*#([\w-]+)/i.test(stack[1])) {
                /** @type {string} */
                name = RegExp.$1;
                stack[1] = stack[1].replace("#" + name, "");
                break;
            }
        }
        if (x < pLen) {
            var n = match(name);
            if (!n) {
                return[];
            }
            /** @type {number} */
            i = 0;
            elem;
            for (;elem = nodes[i++];) {
                if (!elem.parentNode || fn(elem, n)) {
                    return ret = filter(elem, [n], parts.slice(0, x + 1)), !ret.length || x == pLen - 1 ? ret : next(n, parts.slice(x + 1).join(",").replace(/,/g, " "));
                }
            }
            return[];
        }
        /**
         * @param {Element} context
         * @return {?}
         */
        var find = function(context) {
            return context.getElementsByTagName(type);
        };
        /** @type {string} */
        var type = "*";
        /** @type {string} */
        var text = "";
        key = parts[pLen - 1][1];
        key = key.replace(/^[\w\-]+/, function(fx) {
            return type = fx, "";
        });
        if (BUGGY_QUIRKS_QSAPI) {
            key = key.replace(/^[\w\*]*\.([\w\-]+)/, function(dataAndEvents, textAlt) {
                return text = textAlt, "";
            });
        }
        if (text) {
            /**
             * @param {Element} context
             * @return {?}
             */
            find = function(context) {
                return context.querySelectorAll(type + "." + text);
            };
        }
        if (pLen == 1) {
            if (parts[0][0] == ">") {
                /** @type {function (Element): ?} */
                find = walk;
                func = test(parts[0][1], true);
            } else {
                func = test(key, true);
            }
            /** @type {Array} */
            ret = [];
            /** @type {number} */
            i = 0;
            for (;elem = nodes[i++];) {
                /** @type {Array} */
                ret = ret.concat(func(find(elem)));
            }
            return ret;
        }
        /** @type {string} */
        parts[parts.length - 1][1] = key;
        /** @type {Array} */
        ret = [];
        /** @type {number} */
        i = 0;
        for (;elem = nodes[i++];) {
            /** @type {Array} */
            ret = ret.concat(filter(elem, find(elem), parts));
        }
        return ret;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function f(str) {
        /** @type {Array} */
        var result = [];
        /** @type {RegExp} */
        var r20 = /(^|\s*[>+~ ]\s*)(([\w\-\:.#*]+|\([^\)]*\)|\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\6|)\s*\])+)(?=($|\s*[>+~ ]\s*))/g;
        var token = trim(str).replace(r20, function(dataAndEvents, source, value, deepDataAndEvents) {
            return result.push([trim(source), value]), "";
        });
        if (!/^\s*$/.test(token)) {
            throw "Unsupported Selector:\n" + str + "\n--" + token;
        }
        return result;
    }
    /**
     * @param {?} parent
     * @param {?} values
     * @param {Array} parts
     * @return {?}
     */
    function filter(parent, values, parts) {
        var part = parts[0];
        var length = parts.length;
        /** @type {boolean} */
        var u = !part[0];
        /** @type {Array} */
        var points = [];
        /** @type {Array} */
        var buff = [];
        /** @type {Array} */
        var allEls = [];
        /** @type {string} */
        var token = "";
        /** @type {number} */
        var j = 0;
        for (;j < length;j++) {
            part = parts[j];
            points[j] = test(part[1], j == length - 1);
            buff[j] = self._relations[part[0]];
            if (part[0] == "" || part[0] == "~") {
                /** @type {boolean} */
                allEls[j] = true;
            }
            token += part[0] || " ";
        }
        values = points[length - 1](values);
        if (token == " ") {
            return values;
        }
        if (/[+>~] |[+]~/.test(token)) {
            return ondata(values, function(n) {
                /** @type {Array} */
                var ret = [];
                /** @type {number} */
                var j = length - 1;
                var node = ret[j] = n;
                for (;j > -1;j--) {
                    if (j > 0) {
                        node = buff[j](node, points[j - 1], parent);
                    } else {
                        if (u || node.parentNode == parent) {
                            return true;
                        }
                        /** @type {null} */
                        node = null;
                    }
                    for (;!node;) {
                        if (++j == length) {
                            return false;
                        }
                        if (allEls[j]) {
                            node = ret[j - 1];
                            j++;
                        }
                    }
                    ret[j - 1] = node;
                }
            });
        }
        /** @type {Array} */
        var out = [];
        var jlen = values.length;
        /** @type {number} */
        j = 0;
        var node;
        var copies;
        for (;j < jlen;) {
            node = copies = values[j++];
            /** @type {number} */
            var i = length - 1;
            for (;i > 0;i--) {
                if (!(node = buff[i](node, points[i - 1], parent))) {
                    break;
                }
            }
            if (node) {
                if (u || node.parentNode == parent) {
                    out.push(copies);
                }
            }
        }
        return out;
    }
    var trim = QW.StringH.trim;
    var cdata = QW.StringH.encode4Js;
    var self = {
        queryStamp : 0,
        _operators : {
            "" : "aa",
            "=" : 'aa=="vv"',
            "!=" : 'aa!="vv"',
            "~=" : 'aa&&(" "+aa+" ").indexOf(" vv ")>-1',
            "|=" : 'aa&&(aa+"-").indexOf("vv-")==0',
            "^=" : 'aa&&aa.indexOf("vv")==0',
            "$=" : 'aa&&aa.lastIndexOf("vv")==aa.length-"vv".length',
            "*=" : 'aa&&aa.indexOf("vv")>-1'
        },
        _pseudos : {
            /**
             * @param {(Function|string)} child
             * @return {?}
             */
            "first-child" : function(child) {
                return!(child = child.previousSibling) || !child.tagName && !child.previousSibling;
            },
            /**
             * @param {(Function|string)} child
             * @return {?}
             */
            "last-child" : function(child) {
                return!(child = child.nextSibling) || !child.tagName && !child.nextSibling;
            },
            /**
             * @param {Node} el
             * @return {?}
             */
            "only-child" : function(el) {
                var node;
                return!((node = el.previousSibling) && (node.tagName || node.previousSibling) || (node = el.nextSibling) && (node.tagName || node.nextSibling));
            },
            /**
             * @param {number} el
             * @param {string} name
             * @return {?}
             */
            "nth-child" : function(el, name) {
                return nth(el, name);
            },
            /**
             * @param {number} el
             * @param {string} dataName
             * @return {?}
             */
            "nth-last-child" : function(el, dataName) {
                return nth(el, dataName, true);
            },
            /**
             * @param {Node} m
             * @return {?}
             */
            "first-of-type" : function(m) {
                var name = m.tagName;
                /** @type {Node} */
                var x = m;
                for (;x = x.previousSlibling;) {
                    if (x.tagName == name) {
                        return false;
                    }
                }
                return true;
            },
            /**
             * @param {Node} node
             * @return {?}
             */
            "last-of-type" : function(node) {
                var nodeName = node.tagName;
                /** @type {Node} */
                var next = node;
                for (;next = next.nextSibling;) {
                    if (next.tagName == nodeName) {
                        return false;
                    }
                }
                return true;
            },
            /**
             * @param {Node} node
             * @return {?}
             */
            "only-of-type" : function(node) {
                var nodes = node.parentNode.childNodes;
                /** @type {number} */
                var i = nodes.length - 1;
                for (;i > -1;i--) {
                    if (nodes[i].tagName == node.tagName && nodes[i] != node) {
                        return false;
                    }
                }
                return true;
            },
            /**
             * @param {Object} node
             * @param {string} dataName
             * @return {?}
             */
            "nth-of-type" : function(node, dataName) {
                /** @type {number} */
                var failuresLink = 1;
                /** @type {Object} */
                var sibling = node;
                for (;sibling = sibling.previousSibling;) {
                    if (sibling.tagName == node.tagName) {
                        failuresLink++;
                    }
                }
                return nth(failuresLink, dataName);
            },
            /**
             * @param {Node} node
             * @param {string} dataName
             * @return {?}
             */
            "nth-last-of-type" : function(node, dataName) {
                /** @type {number} */
                var failuresLink = 1;
                /** @type {Node} */
                var sibling = node;
                for (;sibling = sibling.nextSibling;) {
                    if (sibling.tagName == node.tagName) {
                        failuresLink++;
                    }
                }
                return nth(failuresLink, dataName);
            },
            /**
             * @param {Object} element
             * @return {?}
             */
            empty : function(element) {
                return!element.firstChild;
            },
            /**
             * @param {Element} elem
             * @return {?}
             */
            parent : function(elem) {
                return!!elem.firstChild;
            },
            /**
             * @param {?} x
             * @param {string} f
             * @return {?}
             */
            not : function(x, f) {
                return!test(f)(x);
            },
            /**
             * @param {EventTarget} a
             * @return {?}
             */
            enabled : function(a) {
                return!a.disabled;
            },
            /**
             * @param {EventTarget} elem
             * @return {?}
             */
            disabled : function(elem) {
                return elem.disabled;
            },
            /**
             * @param {Element} elem
             * @return {?}
             */
            checked : function(elem) {
                return elem.checked;
            },
            /**
             * @param {Node} el
             * @return {?}
             */
            focus : function(el) {
                return el == el.ownerDocument.activeElement;
            },
            /**
             * @param {?} node
             * @return {?}
             */
            indeterminate : function(node) {
                return node.indeterminate;
            },
            /**
             * @param {Node} elem
             * @return {?}
             */
            input : function(elem) {
                return/input|select|textarea|button/i.test(elem.nodeName);
            },
            /**
             * @param {Object} element
             * @param {Object} value
             * @return {?}
             */
            contains : function(element, value) {
                return(element.textContent || (element.innerText || "")).indexOf(value) >= 0;
            }
        },
        _attrGetters : function() {
            var result = {
                "class" : "el.className",
                "for" : "el.htmlFor",
                href : 'el.getAttribute("href",2)'
            };
            /** @type {Array.<string>} */
            var iteratee = "name,id,className,value,selected,checked,disabled,type,tagName,readOnly,offsetWidth,offsetHeight,innerHTML".split(",");
            /** @type {number} */
            var index = 0;
            var value;
            for (;value = iteratee[index];index++) {
                /** @type {string} */
                result[value] = "el." + value;
            }
            return result;
        }(),
        _relations : {
            /**
             * @param {(Function|string)} elm
             * @param {?} process
             * @param {(Function|string)} ancestor
             * @return {?}
             */
            "" : function(elm, process, ancestor) {
                for (;(elm = elm.parentNode) && elm != ancestor;) {
                    if (process(elm)) {
                        return elm;
                    }
                }
                return null;
            },
            /**
             * @param {string} start
             * @param {?} lerp
             * @param {string} end
             * @return {?}
             */
            ">" : function(start, lerp, end) {
                return start = start.parentNode, start != end && lerp(start) ? start : null;
            },
            /**
             * @param {(Function|string)} el
             * @param {?} test
             * @param {?} dataAndEvents
             * @return {?}
             */
            "+" : function(el, test, dataAndEvents) {
                for (;el = el.previousSibling;) {
                    if (el.tagName) {
                        return test(el) && el;
                    }
                }
                return null;
            },
            /**
             * @param {(Function|string)} el
             * @param {?} hasClass
             * @param {?} dataAndEvents
             * @return {?}
             */
            "~" : function(el, hasClass, dataAndEvents) {
                for (;el = el.previousSibling;) {
                    if (el.tagName && hasClass(el)) {
                        return el;
                    }
                }
                return null;
            }
        },
        /**
         * @param {?} done
         * @return {?}
         */
        selector2Filter : function(done) {
            return test(done);
        },
        /**
         * @param {string} element
         * @param {string} name
         * @return {?}
         */
        test : function(element, name) {
            return test(name)(element);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} callback
         * @return {?}
         */
        filter : function(element, value, callback) {
            callback = callback || document;
            var codeSegments = trim(value).split(",");
            if (codeSegments.length < 2) {
                return filter(callback || document, element, f(value));
            }
            var result = filter(callback || document, element, f(codeSegments[0]));
            if (result.length == element.length) {
                return result;
            }
            /** @type {number} */
            var key = 0;
            var length = element.length;
            for (;key < length;key++) {
                /** @type {number} */
                element[key].__QWSltFlted = 0;
            }
            /** @type {number} */
            key = 0;
            length = result.length;
            for (;key < length;key++) {
                /** @type {number} */
                result[key].__QWSltFlted = 1;
            }
            /** @type {Object} */
            var args = element;
            var tmp_args;
            /** @type {number} */
            var i = 1;
            for (;i < codeSegments.length;i++) {
                /** @type {Array} */
                tmp_args = [];
                /** @type {number} */
                key = 0;
                length = args.length;
                for (;key < length;key++) {
                    if (!args[key].__QWSltFlted) {
                        tmp_args.push(args[key]);
                    }
                }
                /** @type {Array} */
                args = tmp_args;
                result = filter(callback || document, args, f(codeSegments[i]));
                /** @type {number} */
                key = 0;
                length = result.length;
                for (;key < length;key++) {
                    /** @type {number} */
                    result[key].__QWSltFlted = 1;
                }
            }
            /** @type {Array} */
            var res = [];
            /** @type {number} */
            key = 0;
            length = element.length;
            for (;key < length;key++) {
                if (element[key].__QWSltFlted) {
                    res.push(element[key]);
                }
            }
            return res;
        },
        /**
         * @param {Object} allow
         * @param {string} element
         * @return {?}
         */
        query : function(allow, element) {
            /** @type {number} */
            self.queryStamp = source++;
            allow = allow || document;
            var ret = parse(allow, element);
            if (ret) {
                return ret;
            }
            var iteratee = trim(element).split(",");
            ret = next(allow, iteratee[0]);
            /** @type {number} */
            var index = 1;
            var value;
            for (;value = iteratee[index];index++) {
                var elems = next(allow, value);
                ret = ret.concat(elems);
            }
            return ret;
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        one : function(element, callback) {
            var id = self.query(element, callback);
            return id[0];
        }
    };
    window.__SltPsds = self._pseudos;
    var fn;
    var BUGGY_QUIRKS_QSAPI;
    (function() {
        /** @type {Element} */
        var div = document.createElement("div");
        /** @type {string} */
        div.innerHTML = '<div class="aaa"></div>';
        /** @type {boolean} */
        BUGGY_QUIRKS_QSAPI = div.querySelectorAll && div.querySelectorAll(".aaa").length == 1;
        /** @type {function (Object, Object): ?} */
        fn = div.contains ? function(element, activeClassName) {
            return element != activeClassName && element.contains(activeClassName);
        } : function(b, element) {
            return b.compareDocumentPosition(element) & 16;
        };
    })();
    var obj = {};
    /** @type {number} */
    var source = 0;
    /** @type {number} */
    var __QW_slt_ = 0;
    /** @type {number} */
    var y = 0;
    QW.Selector = self;
}(), function() {
    var Selector = QW.Selector;
    var Browser = QW.Browser;
    var buster = {
        /**
         * @param {Object} allow
         * @param {Element} element
         * @return {?}
         */
        query : function(allow, element) {
            return Selector.query(element || document.documentElement, allow);
        },
        /**
         * @param {Object} doc
         * @return {?}
         */
        getDocRect : function(doc) {
            doc = doc || document;
            var $window = doc.defaultView || doc.parentWindow;
            var mode = doc.compatMode;
            var root = doc.documentElement;
            var h = $window.innerHeight || 0;
            var w = $window.innerWidth || 0;
            var closingAnimationTime = $window.pageXOffset || 0;
            var maxRows = $window.pageYOffset || 0;
            var scrollWidth = root.scrollWidth;
            var scrollHeight = root.scrollHeight;
            return mode != "CSS1Compat" && (root = doc.body, scrollWidth = root.scrollWidth, scrollHeight = root.scrollHeight), mode && (!Browser.opera && (w = root.clientWidth, h = root.clientHeight)), scrollWidth = Math.max(scrollWidth, w), scrollHeight = Math.max(scrollHeight, h), closingAnimationTime = Math.max(closingAnimationTime, doc.documentElement.scrollLeft, doc.body.scrollLeft), maxRows = Math.max(maxRows, doc.documentElement.scrollTop, doc.body.scrollTop), {
                width : w,
                height : h,
                scrollWidth : scrollWidth,
                scrollHeight : scrollHeight,
                scrollX : closingAnimationTime,
                scrollY : maxRows
            };
        },
        create : function() {
            /** @type {Element} */
            var child4 = document.createElement("div");
            var map = {
                option : [1, '<select multiple="multiple">', "</select>"],
                optgroup : [1, '<select multiple="multiple">', "</select>"],
                legend : [1, "<fieldset>", "</fieldset>"],
                thead : [1, "<table>", "</table>"],
                tbody : [1, "<table>", "</table>"],
                tfoot : [1, "<table>", "</table>"],
                tr : [2, "<table><tbody>", "</tbody></table>"],
                td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                th : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                _default : [0, "", ""]
            };
            /** @type {RegExp} */
            var rtagName = /<(\w+)/i;
            return function(elem, dataAndEvents, doc) {
                var first = doc && doc.createElement("div") || child4;
                var result = first;
                var tag = (rtagName.exec(elem) || ["", ""])[1];
                var wrap = map[tag] || map._default;
                var depth = wrap[0];
                first.innerHTML = wrap[1] + elem + wrap[2];
                for (;depth--;) {
                    first = first.firstChild;
                }
                var activeClassName = first.firstChild;
                if (!activeClassName || !dataAndEvents) {
                    for (;result.firstChild;) {
                        result.removeChild(result.firstChild);
                    }
                    return activeClassName;
                }
                doc = doc || document;
                var element = doc.createDocumentFragment();
                for (;activeClassName = first.firstChild;) {
                    element.appendChild(activeClassName);
                }
                return element;
            };
        }(),
        /**
         * @param {Array} arr
         * @return {?}
         */
        pluckWhiteNode : function(arr) {
            /** @type {Array} */
            var value = [];
            /** @type {number} */
            var i = 0;
            var e = arr.length;
            for (;i < e;i++) {
                if (buster.isElement(arr[i])) {
                    value.push(arr[i]);
                }
            }
            return value;
        },
        /**
         * @param {Object} obj
         * @return {?}
         */
        isElement : function(obj) {
            return!!obj && obj.nodeType == 1;
        },
        /**
         * @param {?} func
         * @param {Object} target
         * @return {undefined}
         */
        ready : function(func, target) {
            /**
             * @return {undefined}
             */
            function handler() {
                clearTimeout(target.__QWDomReadyTimer);
                if (spec.length) {
                    var fix = spec.shift();
                    if (spec.length) {
                        /** @type {number} */
                        target.__QWDomReadyTimer = setTimeout(handler, 0);
                    }
                    fix();
                }
            }
            target = target || document;
            var p = target.defaultView || target.parentWindow;
            var spec = target.__QWDomReadyCbs = target.__QWDomReadyCbs || [];
            spec.push(func);
            setTimeout(function() {
                if ("complete" == target.readyState) {
                    handler();
                } else {
                    if (target.addEventListener) {
                        target.addEventListener("DOMContentLoaded", handler, false);
                        p.addEventListener("load", handler, false);
                    } else {
                        (function() {
                            try {
                                target.body.doScroll("left");
                            } catch (e) {
                                return setTimeout(arguments.callee, 1);
                            }
                            handler();
                        })();
                        target.attachEvent("onreadystatechange", function() {
                            if ("complete" == target.readyState) {
                                handler();
                            }
                        });
                    }
                }
            }, 1);
        },
        /**
         * @param {?} rect1
         * @param {?} rect2
         * @return {?}
         */
        rectContains : function(rect1, rect2) {
            return rect1.left <= rect2.left && (rect1.right >= rect2.right && (rect1.top <= rect2.top && rect1.bottom >= rect2.bottom));
        },
        /**
         * @param {?} rect
         * @param {?} bounds
         * @return {?}
         */
        rectIntersect : function(rect, bounds) {
            /** @type {number} */
            var t = Math.max(rect.top, bounds.top);
            /** @type {number} */
            var r = Math.min(rect.right, bounds.right);
            /** @type {number} */
            var b = Math.min(rect.bottom, bounds.bottom);
            /** @type {number} */
            var l = Math.max(rect.left, bounds.left);
            return b >= t && r >= l ? {
                top : t,
                right : r,
                bottom : b,
                left : l
            } : null;
        },
        /**
         * @param {string} tag
         * @param {Object} pdataOld
         * @param {Object} context
         * @return {?}
         */
        createElement : function(tag, pdataOld, context) {
            context = context || document;
            var activeClassName = context.createElement(tag);
            return pdataOld && QW.NodeH.setAttr(activeClassName, pdataOld), activeClassName;
        },
        /**
         * @param {string} cssText
         * @return {?}
         */
        insertCssText : function(cssText) {
            /** @type {Element} */
            var activeClassName = document.createElement("style");
            return activeClassName.type = "text/css", activeClassName.styleSheet ? activeClassName.styleSheet.cssText = cssText : activeClassName.appendChild(document.createTextNode(cssText)), (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(activeClassName);
        }
    };
    QW.DomU = buster;
}(), function() {
    /**
     * @param {Object} allow
     * @param {Object} element
     * @return {?}
     */
    function $(allow, element) {
        if ("string" == typeof allow) {
            if (allow.indexOf("<") == 0) {
                return console.create(allow, false, element);
            }
            var ret = (element || document).getElementById(allow);
            var codeSegments;
            if (ret && ret.id != allow) {
                codeSegments = (element || document).getElementsByName(allow);
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    if (codeSegments[i].id == allow) {
                        return codeSegments[i];
                    }
                }
                return null;
            }
            return ret;
        }
        return namespace.isWrap(allow) ? arguments.callee(allow[0]) : allow;
    }
    /**
     * @param {Object} str
     * @return {?}
     */
    function trim(str) {
        return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
    }
    /**
     * @param {Node} node
     * @param {?} n
     * @return {?}
     */
    function f(node, n) {
        if (/px$/.test(n) || !n) {
            return parseInt(n, 10) || 0;
        }
        var right = node.style.right;
        var styleRight = node.runtimeStyle.right;
        var i;
        return node.runtimeStyle.right = node.currentStyle.right, node.style.right = n, i = node.style.pixelRight || 0, node.style.right = right, node.runtimeStyle.right = styleRight, i;
    }
    var namespace = QW.ObjectH;
    var jQuery = QW.StringH;
    var console = QW.DomU;
    var o = QW.Browser;
    var container = QW.Selector;
    var unlock = container.selector2Filter;
    var self = {
        outerHTML : function() {
            /** @type {Element} */
            var trash = document.createElement("div");
            return function(element, doc) {
                element = $(element);
                if ("outerHTML" in element) {
                    return element.outerHTML;
                }
                /** @type {string} */
                trash.innerHTML = "";
                var escapeElement = doc && doc.createElement("div") || trash;
                return escapeElement.appendChild(element.cloneNode(true)), escapeElement.innerHTML;
            };
        }(),
        /**
         * @param {Object} element
         * @param {Object} putativeSpy
         * @return {?}
         */
        hasClass : function(element, putativeSpy) {
            return element = $(element), (" " + element.className + " ").indexOf(" " + putativeSpy + " ") > -1;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        addClass : function(element, value) {
            element = $(element);
            if (!self.hasClass(element, value)) {
                element.className = element.className ? element.className + " " + value : value;
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        removeClass : function(element, value) {
            element = $(element);
            if (self.hasClass(element, value)) {
                element.className = element.className.replace(new RegExp("(?:^|\\s)" + trim(value) + "(?=\\s|$)", "ig"), "");
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} pdataOld
         * @return {undefined}
         */
        replaceClass : function(element, value, pdataOld) {
            element = $(element);
            if (self.hasClass(element, value)) {
                element.className = element.className.replace(new RegExp("(^|\\s)" + trim(value) + "(?=\\s|$)", "ig"), "$1" + pdataOld);
            } else {
                self.addClass(element, pdataOld);
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} header
         * @return {undefined}
         */
        toggleClass : function(element, value, header) {
            header = header || "";
            if (self.hasClass(element, value)) {
                self.replaceClass(element, value, header);
            } else {
                self.replaceClass(element, header, value);
            }
        },
        show : function() {
            /**
             * @param {string} tag
             * @return {?}
             */
            function default_display(tag) {
                if (!objectValue[tag]) {
                    /** @type {Element} */
                    var pdataOld = document.createElement(tag);
                    /** @type {(HTMLElement|null)} */
                    var activeClassName = document.body;
                    self.insertSiblingBefore(activeClassName.firstChild, pdataOld);
                    display = self.getCurrentStyle(pdataOld, "display");
                    self.removeChild(activeClassName, pdataOld);
                    /** @type {null} */
                    activeClassName = pdataOld = null;
                    if (display === "none" || display === "") {
                        /** @type {string} */
                        display = "block";
                    }
                    objectValue[tag] = display;
                }
                return objectValue[tag];
            }
            var objectValue = {};
            return function(element, hide_tag) {
                element = $(element);
                if (!hide_tag) {
                    var display = element.style.display;
                    if (display === "none") {
                        /** @type {string} */
                        display = element.style.display = "";
                    }
                    if (display === "") {
                        if (self.getCurrentStyle(element, "display") === "none") {
                            display = default_display(element.nodeName);
                        }
                    }
                }
                element.style.display = hide_tag || display;
            };
        }(),
        /**
         * @param {Object} element
         * @return {undefined}
         */
        hide : function(element) {
            element = $(element);
            /** @type {string} */
            element.style.display = "none";
        },
        /**
         * @param {Object} element
         * @param {Object} activeClassName
         * @return {undefined}
         */
        wrap : function(element, activeClassName) {
            element = $(element);
            activeClassName = $(activeClassName, element.ownerDocument);
            element.parentNode.insertBefore(activeClassName, element);
            activeClassName.appendChild(element);
        },
        /**
         * @param {Object} element
         * @return {undefined}
         */
        unwrap : function(element) {
            element = $(element);
            var method = element.parentNode;
            if (method && method.tagName != "BODY") {
                var node = method.parentNode;
                for (;method.firstChild;) {
                    node.insertBefore(method.firstChild, method);
                }
                node.removeChild(method);
            }
        },
        /**
         * @param {Object} element
         * @return {undefined}
         */
        empty : function(element) {
            element = $(element);
            for (;element.firstChild;) {
                element.removeChild(element.firstChild);
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        toggle : function(element, value) {
            if (self.isVisible(element)) {
                self.hide(element);
            } else {
                self.show(element, value);
            }
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        isVisible : function(element) {
            return element = $(element), !!(element.offsetHeight + element.offsetWidth && self.getStyle(element, "display") != "none");
        },
        getXY : function() {
            /**
             * @param {Object} element
             * @param {Array} pos
             * @return {?}
             */
            var getPosition = function(element, pos) {
                /** @type {number} */
                var trunkLen = parseInt(self.getCurrentStyle(element, "borderTopWidth"), 10) || 0;
                /** @type {number} */
                var bestMatchLength = parseInt(self.getCurrentStyle(element, "borderLeftWidth"), 10) || 0;
                return o.gecko && (/^t(?:able|d|h)$/i.test(element.tagName) && (trunkLen = bestMatchLength = 0)), pos[0] += bestMatchLength, pos[1] += trunkLen, pos;
            };
            return document.documentElement.getBoundingClientRect ? function(elem) {
                var doc = elem.ownerDocument;
                var el = console.getDocRect(doc);
                var scrollLeft = el.scrollX;
                var scrollTop = el.scrollY;
                var otherElementRect = elem.getBoundingClientRect();
                /** @type {Array} */
                var xy = [otherElementRect.left, otherElementRect.top];
                var list;
                var offX;
                var offY;
                if (o.ie) {
                    offX = doc.documentElement.clientLeft;
                    offY = doc.documentElement.clientTop;
                    list = doc.compatMode;
                    if (list == "BackCompat") {
                        offX = doc.body.clientLeft;
                        offY = doc.body.clientTop;
                    }
                    xy[0] -= offX;
                    xy[1] -= offY;
                }
                if (scrollTop || scrollLeft) {
                    xy[0] += scrollLeft;
                    xy[1] += scrollTop;
                }
                return xy;
            } : function(element) {
                /** @type {Array} */
                var pos = [element.offsetLeft, element.offsetTop];
                var parent = element.parentNode;
                var doc = element.ownerDocument;
                var win = console.getDocRect(doc);
                /** @type {boolean} */
                var a = !!(o.gecko || parseFloat(o.webkit) > 519);
                /** @type {number} */
                var T = 0;
                /** @type {number} */
                var left = 0;
                for (;parent = parent.offsetParent;) {
                    pos[0] += parent.offsetLeft;
                    pos[1] += parent.offsetTop;
                    if (a) {
                        pos = getPosition(parent, pos);
                    }
                }
                if (self.getCurrentStyle(element, "position") != "fixed") {
                    /** @type {Object} */
                    parent = element;
                    for (;parent = parent.parentNode;) {
                        T = parent.scrollTop;
                        left = parent.scrollLeft;
                        if (o.gecko) {
                            if (self.getCurrentStyle(parent, "overflow") !== "visible") {
                                pos = getPosition(parent, pos);
                            }
                        }
                        if (T || left) {
                            pos[0] -= left;
                            pos[1] -= T;
                        }
                    }
                }
                return pos[0] += win.scrollX, pos[1] += win.scrollY, pos;
            };
        }(),
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {string} val
         * @return {undefined}
         */
        setXY : function(element, value, val) {
            element = $(element);
            /** @type {number} */
            value = parseInt(value, 10);
            /** @type {number} */
            val = parseInt(val, 10);
            if (!isNaN(value)) {
                self.setStyle(element, "left", value + "px");
            }
            if (!isNaN(val)) {
                self.setStyle(element, "top", val + "px");
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {?} val
         * @return {undefined}
         */
        setSize : function(element, value, val) {
            element = $(element);
            /** @type {number} */
            value = parseFloat(value, 10);
            /** @type {number} */
            val = parseFloat(val, 10);
            if (isNaN(value) && isNaN(val)) {
                return;
            }
            var elementRect = self.borderWidth(element);
            var classes = self.paddingWidth(element);
            if (!isNaN(value)) {
                self.setStyle(element, "width", Math.max(+value - elementRect[1] - elementRect[3] - classes[1] - classes[3], 0) + "px");
            }
            if (!isNaN(val)) {
                self.setStyle(element, "height", Math.max(+val - elementRect[0] - elementRect[2] - classes[0] - classes[2], 0) + "px");
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {string} val
         * @return {undefined}
         */
        setInnerSize : function(element, value, val) {
            element = $(element);
            /** @type {number} */
            value = parseFloat(value, 10);
            /** @type {number} */
            val = parseFloat(val, 10);
            if (!isNaN(value)) {
                self.setStyle(element, "width", value + "px");
            }
            if (!isNaN(val)) {
                self.setStyle(element, "height", val + "px");
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} now
         * @param {Object} pdataOld
         * @param {Object} reqUrl
         * @return {undefined}
         */
        setRect : function(element, value, now, pdataOld, reqUrl) {
            self.setXY(element, value, now);
            self.setSize(element, pdataOld, reqUrl);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} now
         * @param {Object} pdataOld
         * @param {Object} reqUrl
         * @return {undefined}
         */
        setInnerRect : function(element, value, now, pdataOld, reqUrl) {
            self.setXY(element, value, now);
            self.setInnerSize(element, pdataOld, reqUrl);
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        getSize : function(element) {
            return element = $(element), {
                width : element.offsetWidth,
                height : element.offsetHeight
            };
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        getRect : function(element) {
            element = $(element);
            var position = self.getXY(element);
            var x = position[0];
            var y = position[1];
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            return{
                width : width,
                height : height,
                left : x,
                top : y,
                bottom : y + height,
                right : x + width
            };
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        nextSibling : function(element, callback) {
            var toLowerCase = unlock(callback || "");
            element = $(element);
            do {
                element = element.nextSibling;
            } while (element && !toLowerCase(element));
            return element;
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        previousSibling : function(element, callback) {
            var proceed = unlock(callback || "");
            element = $(element);
            do {
                element = element.previousSibling;
            } while (element && !proceed(element));
            return element;
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        previousSiblings : function(element, callback) {
            var proceed = unlock(callback || "");
            /** @type {Array} */
            var matched = [];
            element = $(element);
            for (;element = element.previousSibling;) {
                if (proceed(element)) {
                    matched.push(element);
                }
            }
            return matched.reverse();
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        nextSiblings : function(element, callback) {
            var proceed = unlock(callback || "");
            /** @type {Array} */
            var elements = [];
            element = $(element);
            for (;element = element.nextSibling;) {
                if (proceed(element)) {
                    elements.push(element);
                }
            }
            return elements;
        },
        /**
         * @param {Object} allow
         * @param {string} element
         * @return {?}
         */
        siblings : function(allow, element) {
            var removeChild = unlock(element || "");
            var child = allow.parentNode.firstChild;
            /** @type {Array} */
            var elements = [];
            for (;child;) {
                if (allow != child) {
                    if (removeChild(child)) {
                        elements.push(child);
                    }
                }
                child = child.nextSibling;
            }
            return elements;
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        ancestorNode : function(element, callback) {
            var proceed = unlock(callback || "");
            element = $(element);
            do {
                element = element.parentNode;
            } while (element && !proceed(element));
            return element;
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        parentNode : function(element, callback) {
            return self.ancestorNode(element, callback);
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        ancestorNodes : function(element, callback) {
            var proceed = unlock(callback || "");
            /** @type {Array} */
            var matched = [];
            element = $(element);
            for (;element = element.parentNode;) {
                if (proceed(element)) {
                    matched.push(element);
                }
            }
            return matched.reverse();
        },
        /**
         * @param {Object} allow
         * @param {string} element
         * @return {?}
         */
        firstChild : function(allow, element) {
            var firstChild = unlock(element || "");
            allow = $(allow).firstChild;
            for (;allow && !firstChild(allow);) {
                allow = allow.nextSibling;
            }
            return allow;
        },
        /**
         * @param {Object} allow
         * @param {string} element
         * @return {?}
         */
        lastChild : function(allow, element) {
            var throttledUpdate = unlock(element || "");
            allow = $(allow).lastChild;
            for (;allow && !throttledUpdate(allow);) {
                allow = allow.previousSibling;
            }
            return allow;
        },
        /**
         * @param {Object} element
         * @param {Object} activeClassName
         * @return {?}
         */
        contains : function(element, activeClassName) {
            return element = $(element), activeClassName = $(activeClassName), element.contains ? element != activeClassName && element.contains(activeClassName) : !!(element.compareDocumentPosition(activeClassName) & 16);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} pdataOld
         * @return {undefined}
         */
        insertAdjacentHTML : function(element, value, pdataOld) {
            element = $(element);
            if (element.insertAdjacentHTML) {
                element.insertAdjacentHTML(value, pdataOld);
            } else {
                var range = element.ownerDocument.createRange();
                var header;
                range.setStartBefore(element);
                header = range.createContextualFragment(pdataOld);
                self.insertAdjacentElement(element, value, header);
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {?}
         */
        insertAdjacentElement : function(element, value, object) {
            element = $(element);
            object = $(object);
            if (element.insertAdjacentElement) {
                element.insertAdjacentElement(value, object);
            } else {
                switch(String(value).toLowerCase()) {
                    case "beforebegin":
                        element.parentNode.insertBefore(object, element);
                        break;
                    case "afterbegin":
                        element.insertBefore(object, element.firstChild);
                        break;
                    case "beforeend":
                        element.appendChild(object);
                        break;
                    case "afterend":
                        element.parentNode.insertBefore(object, element.nextSibling || null);
                }
            }
            return object;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {undefined}
         */
        insert : function(element, value, object) {
            self.insertAdjacentElement(element, value, object);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} activeClassName
         * @return {undefined}
         */
        insertTo : function(element, value, activeClassName) {
            self.insertAdjacentElement(activeClassName, value, element);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        appendChild : function(element, value) {
            return $(element).appendChild($(value));
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        appendTo : function(element, value) {
            return $(value).appendChild($(element));
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        prepend : function(element, value) {
            return element = $(element), element.insertBefore($(value), element.firstChild);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        prependTo : function(element, value) {
            return self.prepend(value, element);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        insertSiblingBefore : function(element, value) {
            return element = $(element), element.parentNode.insertBefore($(value), element);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        insertSiblingAfter : function(element, value) {
            element = $(element);
            element.parentNode.insertBefore($(value), element.nextSibling || null);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {?}
         */
        insertBefore : function(element, value, object) {
            return $(element).insertBefore($(value), object && $(object) || null);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {?}
         */
        insertAfter : function(element, value, object) {
            return $(element).insertBefore($(value), object && $(object).nextSibling || null);
        },
        /**
         * @param {Object} method
         * @param {Object} className
         * @return {?}
         */
        insertParent : function(method, className) {
            return self.insertSiblingBefore(method, className), self.appendChild(className, method);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        replaceNode : function(element, value) {
            return element = $(element), element.parentNode.replaceChild($(value), element);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {?}
         */
        replaceChild : function(element, value, object) {
            return $(element).replaceChild($(value), $(object));
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        removeNode : function(element) {
            return element = $(element), element.parentNode.removeChild(element);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        removeChild : function(element, value) {
            return $(element).removeChild($(value));
        },
        /**
         * @param {Object} element
         * @param {string} value
         * @return {?}
         */
        get : function(element, value) {
            return element = $(element), namespace.get.apply(null, arguments);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} callback
         * @return {undefined}
         */
        set : function(element, value, callback) {
            element = $(element);
            namespace.set.apply(null, arguments);
        },
        /**
         * @param {Object} element
         * @param {string} name
         * @param {number} optionsString
         * @return {?}
         */
        getAttr : function(element, name, optionsString) {
            return element = $(element), name = self.attrMap[name] || name, name in element && "href" != name ? element[name] : element.getAttribute(name, optionsString || (element.nodeName == "A" && (name.toLowerCase() == "href" && 2) || null));
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} val
         * @param {string} el
         * @return {undefined}
         */
        setAttr : function(element, value, val, el) {
            element = $(element);
            if ("object" != typeof value) {
                value = self.attrMap[value] || value;
                if (value in element) {
                    /** @type {Object} */
                    element[value] = val;
                } else {
                    element.setAttribute(value, val, el || null);
                }
            } else {
                var pdataOld;
                for (pdataOld in value) {
                    self.setAttr(element, pdataOld, value[pdataOld]);
                }
            }
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {?} callback
         * @return {?}
         */
        removeAttr : function(element, value, callback) {
            return element = $(element), element.removeAttribute(value, callback || 0);
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        query : function(element, callback) {
            return element = $(element), container.query(element, callback || "");
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        one : function(element, callback) {
            return element = $(element), container.one(element, callback || "");
        },
        /**
         * @param {Object} element
         * @param {string} callback
         * @return {?}
         */
        getElementsByClass : function(element, callback) {
            return element = $(element), container.query(element, "." + callback);
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        getValue : function(element) {
            return element = $(element), element.value;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        setValue : function(element, value) {
            /** @type {Object} */
            $(element).value = value;
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        getHtml : function(element) {
            return element = $(element), element.innerHTML;
        },
        setHtml : function() {
            /** @type {RegExp} */
            var rchecked = /<(?:object|embed|option|style)/i;
            /**
             * @param {Object} activeClassName
             * @param {string} html
             * @return {undefined}
             */
            var callback = function(activeClassName, html) {
                self.empty(activeClassName);
                self.appendChild(activeClassName, console.create(html, true));
            };
            return function(element, value) {
                element = $(element);
                if (!rchecked.test(value)) {
                    try {
                        /** @type {string} */
                        element.innerHTML = value;
                    } catch (s) {
                        callback(element, value);
                    }
                } else {
                    callback(element, value);
                }
            };
        }(),
        /**
         * @param {Object} element
         * @param {Function} iterator
         * @return {?}
         */
        encodeURIForm : function(element, iterator) {
            element = $(element);
            iterator = iterator || function(checkElement) {
                return false;
            };
            /** @type {Array} */
            var tagNameArr = [];
            var values = element.elements;
            var valuesLen = values.length;
            /** @type {number} */
            var i = 0;
            /**
             * @param {?} value
             * @param {?} v
             * @return {undefined}
             */
            var set = function(value, v) {
                tagNameArr.push(encodeURIComponent(value) + "=" + encodeURIComponent(v));
            };
            for (;i < valuesLen;++i) {
                element = values[i];
                var tag = element.name;
                if (element.disabled || (!tag || iterator(element))) {
                    continue;
                }
                switch(element.type) {
                    case "text":
                        ;
                    case "hidden":
                        ;
                    case "password":
                        ;
                    case "textarea":
                        set(tag, element.value);
                        break;
                    case "radio":
                        ;
                    case "checkbox":
                        if (element.checked) {
                            set(tag, element.value);
                        }
                        break;
                    case "select-one":
                        if (element.selectedIndex > -1) {
                            set(tag, element.value);
                        }
                        break;
                    case "select-multiple":
                        var o = element.options;
                        /** @type {number} */
                        var j = 0;
                        for (;j < o.length;++j) {
                            if (o[j].selected) {
                                set(tag, o[j].value);
                            }
                        }
                        ;
                }
            }
            return tagNameArr.join("&");
        },
        /**
         * @param {Object} element
         * @param {Function} iterator
         * @return {?}
         */
        isFormChanged : function(element, iterator) {
            element = $(element);
            iterator = iterator || function(checkElement) {
                return false;
            };
            var values = element.elements;
            var valuesLen = values.length;
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var j = 0;
            var options;
            for (;i < valuesLen;++i, j = 0) {
                element = values[i];
                if (iterator(element)) {
                    continue;
                }
                switch(element.type) {
                    case "text":
                        ;
                    case "hidden":
                        ;
                    case "password":
                        ;
                    case "textarea":
                        if (element.defaultValue != element.value) {
                            return true;
                        }
                        break;
                    case "radio":
                        ;
                    case "checkbox":
                        if (element.defaultChecked != element.checked) {
                            return true;
                        }
                        break;
                    case "select-one":
                        /** @type {number} */
                        j = 1;
                    case "select-multiple":
                        options = element.options;
                        for (;j < options.length;++j) {
                            if (options[j].defaultSelected != options[j].selected) {
                                return true;
                            }
                        }
                        ;
                }
            }
            return false;
        },
        /**
         * @param {Object} element
         * @param {boolean} callback
         * @return {?}
         */
        cloneNode : function(element, callback) {
            return $(element).cloneNode(callback || false);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        removeStyle : function(element, value) {
            element = $(element);
            var tag = jQuery.camelize(value);
            var group = self.cssHooks[tag];
            if (group) {
                group.remove(element);
            } else {
                if (element.style.removeProperty) {
                    element.style.removeProperty(jQuery.decamelize(value));
                } else {
                    element.style.removeAttribute(tag);
                }
            }
        },
        /**
         * @param {Object} element
         * @param {string} property
         * @return {?}
         */
        getStyle : function(element, property) {
            element = $(element);
            property = jQuery.camelize(property);
            var fn = self.cssHooks[property];
            var value;
            return fn ? value = fn.get(element) : value = element.style[property], !value || value == "auto" ? null : value;
        },
        /**
         * @param {Object} element
         * @param {string} value
         * @param {number} options
         * @return {?}
         */
        getCurrentStyle : function(element, value, options) {
            element = $(element);
            var key = jQuery.camelize(value);
            var view = self.cssHooks[key];
            var val;
            if (view) {
                val = view.get(element, true, options);
            } else {
                if (o.ie) {
                    val = element.currentStyle[key];
                } else {
                    var style = element.ownerDocument.defaultView.getComputedStyle(element, options || null);
                    val = style ? style.getPropertyValue(jQuery.decamelize(value)) : null;
                }
            }
            return!val || val == "auto" ? null : val;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} pdataOld
         * @return {undefined}
         */
        setStyle : function(element, value, pdataOld) {
            element = $(element);
            if ("object" != typeof value) {
                var name = jQuery.camelize(value);
                var listener = self.cssHooks[name];
                if (listener) {
                    listener.set(element, pdataOld);
                } else {
                    /** @type {Object} */
                    element.style[name] = pdataOld;
                }
            } else {
                var bytenew;
                for (bytenew in value) {
                    self.setStyle(element, bytenew, value[bytenew]);
                }
            }
        },
        borderWidth : function() {
            var size = {
                thin : 2,
                medium : 4,
                thick : 6
            };
            /**
             * @param {Object} element
             * @param {string} prop
             * @return {?}
             */
            var getPixelValue = function(element, prop) {
                var width = self.getCurrentStyle(element, prop);
                return width = size[width] || parseFloat(width), width || 0;
            };
            return function(element) {
                return element = $(element), [getPixelValue(element, "borderTopWidth"), getPixelValue(element, "borderRightWidth"), getPixelValue(element, "borderBottomWidth"), getPixelValue(element, "borderLeftWidth")];
            };
        }(),
        /**
         * @param {Object} element
         * @return {?}
         */
        paddingWidth : function(element) {
            return element = $(element), [f(element, self.getCurrentStyle(element, "paddingTop")), f(element, self.getCurrentStyle(element, "paddingRight")), f(element, self.getCurrentStyle(element, "paddingBottom")), f(element, self.getCurrentStyle(element, "paddingLeft"))];
        },
        /**
         * @param {Object} element
         * @return {?}
         */
        marginWidth : function(element) {
            return element = $(element), [f(element, self.getCurrentStyle(element, "marginTop")), f(element, self.getCurrentStyle(element, "marginRight")), f(element, self.getCurrentStyle(element, "marginBottom")), f(element, self.getCurrentStyle(element, "marginLeft"))];
        },
        /**
         * @param {Object} element
         * @param {string} prop
         * @return {?}
         */
        tmpl : function(element, prop) {
            return element = $(element), jQuery.tmpl(element.innerHTML, prop);
        },
        attrMap : {
            "class" : "className",
            "for" : "htmlFor",
            tabindex : "tabIndex",
            readonly : "readOnly",
            maxlength : "maxLength",
            cellspacing : "cellSpacing",
            cellpadding : "cellPadding",
            rowspan : "rowSpan",
            colspan : "colSpan",
            usemap : "useMap",
            frameborder : "frameBorder",
            contenteditable : "contentEditable"
        },
        cssHooks : function() {
            var cssHooks = {
                "float" : {
                    /**
                     * @param {Object} element
                     * @param {string} value
                     * @param {number} namespace
                     * @return {?}
                     */
                    get : function(element, value, namespace) {
                        if (value) {
                            var styles = element.ownerDocument.defaultView.getComputedStyle(element, namespace || null);
                            return styles ? styles.getPropertyValue("cssFloat") : null;
                        }
                        return element.style.cssFloat;
                    },
                    /**
                     * @param {Object} element
                     * @param {Object} value
                     * @return {undefined}
                     */
                    set : function(element, value) {
                        /** @type {Object} */
                        element.style.cssFloat = value;
                    },
                    /**
                     * @param {Object} element
                     * @return {undefined}
                     */
                    remove : function(element) {
                        element.style.removeProperty("float");
                    }
                }
            };
            if (o.ie) {
                cssHooks["float"] = {
                    /**
                     * @param {Object} allow
                     * @param {string} value
                     * @return {?}
                     */
                    get : function(allow, value) {
                        return allow[value ? "currentStyle" : "style"].styleFloat;
                    },
                    /**
                     * @param {Object} element
                     * @param {Object} value
                     * @return {undefined}
                     */
                    set : function(element, value) {
                        /** @type {Object} */
                        element.style.styleFloat = value;
                    },
                    /**
                     * @param {Object} element
                     * @return {undefined}
                     */
                    remove : function(element) {
                        element.style.removeAttribute("styleFloat");
                    }
                };
                /** @type {Element} */
                var d = document.createElement("div");
                var elt;
                /** @type {string} */
                d.innerHTML = "<a href='#' style='opacity:.55;'>a</a>";
                elt = d.getElementsByTagName("a")[0];
                if (elt && !/^0.55$/.test(elt.style.opacity)) {
                    /** @type {RegExp} */
                    var reAlpha = /alpha\([^)]*\)/i;
                    /** @type {RegExp} */
                    var stopParent = /opacity=([^)]*)/;
                    cssHooks.opacity = {
                        /**
                         * @param {Object} allow
                         * @param {string} value
                         * @return {?}
                         */
                        get : function(allow, value) {
                            return stopParent.test((value && allow.currentStyle ? allow.currentStyle.filter : allow.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : value ? "1" : "";
                        },
                        /**
                         * @param {Object} element
                         * @param {Object} value
                         * @return {undefined}
                         */
                        set : function(element, value) {
                            var style = element.style;
                            var currentStyle = element.currentStyle;
                            /** @type {number} */
                            style.zoom = 1;
                            /** @type {string} */
                            var matrixVal = "alpha(opacity=" + value * 100 + ")";
                            var filter = currentStyle && currentStyle.filter || (style.filter || "");
                            style.filter = reAlpha.test(filter) ? filter.replace(reAlpha, matrixVal) : filter + " " + matrixVal;
                        },
                        /**
                         * @param {Object} element
                         * @return {undefined}
                         */
                        remove : function(element) {
                            var style = element.style;
                            var currentStyle = element.currentStyle;
                            var filter = currentStyle && currentStyle.filter || (style.filter || "");
                            if (reAlpha.test(filter)) {
                                style.filter = filter.replace(reAlpha, "");
                            }
                            style.removeAttribute("opacity");
                        }
                    };
                }
            }
            return cssHooks;
        }()
    };
    /** @type {function (Object, Object): ?} */
    self.g = $;
    QW.NodeH = self;
}(), function() {
    var S = QW.ObjectH;
    var mix = S.mix;
    var bind = S.isString;
    var proceed = S.isArray;
    /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
    var push = Array.prototype.push;
    var args = QW.NodeH;
    var getEl = args.g;
    var query = args.query;
    var callback = args.one;
    var create = QW.DomU.create;
    /**
     * @param {Object} element
     * @return {?}
     */
    var $ = function(element) {
        if (!element) {
            return null;
        }
        if (element instanceof $) {
            return element;
        }
        var activeClassName = arguments[1];
        if (bind(element)) {
            if (/^</.test(element)) {
                var c = create(element, true, activeClassName).childNodes;
                /** @type {Array} */
                var cache = [];
                /** @type {number} */
                var k = 0;
                var v;
                for (;v = c[k];k++) {
                    cache[k] = v;
                }
                return new $(cache);
            }
            return new $(query(activeClassName, element));
        }
        element = getEl(element, activeClassName);
        if (!(this instanceof $)) {
            return new $(element);
        }
        /** @type {Object} */
        this.core = element;
        if (proceed(element)) {
            /** @type {number} */
            this.length = 0;
            push.apply(this, element);
        } else {
            /** @type {number} */
            this.length = 1;
            /** @type {Object} */
            this[0] = element;
        }
    };
    /**
     * @param {Object} element
     * @return {?}
     */
    $.one = function(element) {
        if (!element) {
            return null;
        }
        var activeClassName = arguments[1];
        return bind(element) ? /^</.test(element) ? new $(create(element, false, activeClassName)) : new $(callback(activeClassName, element)) : (element = getEl(element, activeClassName), proceed(element) ? new $(element[0]) : new $(element));
    };
    /**
     * @param {Object} source
     * @param {(Object|string)} value
     * @param {Object} key
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    $.pluginHelper = function(source, value, key, deepDataAndEvents) {
        var path = QW.HelperH;
        source = path.mul(source, value);
        var input = path.rwrap(source, $, value);
        if (key) {
            input = path.gsetter(input, key);
        }
        mix($, input, deepDataAndEvents);
        var obj = path.methodize(source, "core");
        obj = path.rwrap(obj, $, value);
        if (key) {
            obj = path.gsetter(obj, key);
        }
        mix($.prototype, obj, deepDataAndEvents);
    };
    mix($.prototype, {
        /**
         * @return {?}
         */
        first : function() {
            return $(this[0]);
        },
        /**
         * @return {?}
         */
        last : function() {
            return $(this[this.length - 1]);
        },
        /**
         * @param {?} index
         * @return {?}
         */
        item : function(index) {
            return $(this[index]);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        filter : function(element, value) {
            return element === true ? $(this.core) : element === false ? $([]) : (typeof element == "string" && (element = QW.Selector.selector2Filter(element)), $(ArrayH.filter(this, element, value)));
        }
    });
    /** @type {function (Object): ?} */
    QW.NodeW = $;
}(), function() {
    /**
     * @param {Object} target
     * @return {?}
     */
    function clone(target) {
        var context = api.getTarget(target);
        /** @type {HTMLDocument} */
        var p = document;
        return context && (p = context.ownerDocument || (context.document || ((context.defaultView || context.window) && context || document))), p;
    }
    var api = {
        /**
         * @param {Object} event
         * @return {?}
         */
        getPageX : function(event) {
            event = event || api.getEvent.apply(api, arguments);
            var data = clone(event);
            return "pageX" in event ? event.pageX : event.clientX + (data.documentElement.scrollLeft || data.body.scrollLeft) - 2;
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        getPageY : function(event) {
            event = event || api.getEvent.apply(api, arguments);
            var c = clone(event);
            return "pageY" in event ? event.pageY : event.clientY + (c.documentElement.scrollTop || c.body.scrollTop) - 2;
        },
        /**
         * @param {Object} e
         * @return {?}
         */
        getDetail : function(e) {
            return e = e || api.getEvent.apply(api, arguments), e.detail || -(e.wheelDelta || 0);
        },
        /**
         * @param {Object} e
         * @return {?}
         */
        getKeyCode : function(e) {
            return e = e || api.getEvent.apply(api, arguments), "keyCode" in e ? e.keyCode : e.charCode || (e.which || 0);
        },
        /**
         * @param {UIEvent} e
         * @return {undefined}
         */
        stopPropagation : function(e) {
            e = e || api.getEvent.apply(api, arguments);
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                /** @type {boolean} */
                e.cancelBubble = true;
            }
        },
        /**
         * @param {Event} e
         * @return {undefined}
         */
        preventDefault : function(e) {
            e = e || api.getEvent.apply(api, arguments);
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                /** @type {boolean} */
                e.returnValue = false;
            }
        },
        /**
         * @param {Event} oEvent
         * @return {?}
         */
        getCtrlKey : function(oEvent) {
            return oEvent = oEvent || api.getEvent.apply(api, arguments), oEvent.ctrlKey;
        },
        /**
         * @param {UIEvent} e
         * @return {?}
         */
        getShiftKey : function(e) {
            return e = e || api.getEvent.apply(api, arguments), e.shiftKey;
        },
        /**
         * @param {Object} args
         * @return {?}
         */
        getAltKey : function(args) {
            return args = args || api.getEvent.apply(api, arguments), args.altKey;
        },
        /**
         * @param {Object} e
         * @return {?}
         */
        getTarget : function(e) {
            e = e || api.getEvent.apply(api, arguments);
            var tapElement = e.srcElement || e.target;
            return tapElement && (tapElement.nodeType == 3 && (tapElement = tapElement.parentNode)), tapElement;
        },
        /**
         * @param {Object} e
         * @return {?}
         */
        getRelatedTarget : function(e) {
            e = e || api.getEvent.apply(api, arguments);
            if ("relatedTarget" in e) {
                return e.relatedTarget;
            }
            if (e.type == "mouseover") {
                return e.fromElement;
            }
            if (e.type == "mouseout") {
                return e.toElement;
            }
        },
        /**
         * @param {?} e
         * @param {Object} req
         * @return {?}
         */
        getEvent : function(e, req) {
            if (e) {
                return e;
            }
            if (req) {
                if (req.document) {
                    return req.document.parentWindow.event;
                }
                if (req.parentWindow) {
                    return req.parentWindow.event;
                }
            }
            if (window.event) {
                return window.event;
            }
            /** @type {(Function|null)} */
            var f = arguments.callee;
            do {
                if (/Event/.test(f.arguments[0])) {
                    return f.arguments[0];
                }
            } while (f = f.caller);
        },
        _EventPro : {
            /**
             * @return {undefined}
             */
            stopPropagation : function() {
                /** @type {boolean} */
                this.cancelBubble = true;
            },
            /**
             * @return {undefined}
             */
            preventDefault : function() {
                /** @type {boolean} */
                this.returnValue = false;
            }
        },
        /**
         * @param {Object} e
         * @return {?}
         */
        standardize : function(e) {
            e = e || api.getEvent.apply(api, arguments);
            if (!("target" in e)) {
                e.target = api.getTarget(e);
            }
            if (!("relatedTarget" in e)) {
                e.relatedTarget = api.getRelatedTarget(e);
            }
            if (!("pageX" in e)) {
                e.pageX = api.getPageX(e);
                e.pageY = api.getPageY(e);
            }
            if (!("detail" in e)) {
                e.detail = api.getDetail(e);
            }
            if (!("keyCode" in e)) {
                e.keyCode = api.getKeyCode(e);
            }
            var i;
            for (i in api._EventPro) {
                if (e[i] == null) {
                    e[i] = api._EventPro[i];
                }
            }
            return e;
        }
    };
    QW.EventH = api;
}(), function() {
    /**
     * @param {Object} element
     * @param {string} type
     * @param {number} options
     * @param {boolean} key
     * @return {?}
     */
    function removeListener(element, type, options, key) {
        return console.get(element, type + (key ? "." + key : ""), options) || function(prop) {
            if (!key || key && self._EventHooks[key][type](element, prop, options)) {
                return get(element, prop, options, type);
            }
        };
    }
    /**
     * @param {Object} element
     * @param {Object} pdataOld
     * @param {string} type
     * @param {number} options
     * @param {boolean} key
     * @return {?}
     */
    function bind(element, pdataOld, type, options, key) {
        return console.get(element, type + (key ? "." + key : ""), options, pdataOld) || function(e) {
            /** @type {Array} */
            var activeClassName = [];
            var parent = e.srcElement || e.target;
            if (!parent) {
                return;
            }
            if (parent.nodeType == 3) {
                parent = parent.parentNode;
            }
            for (;parent && parent != element;) {
                activeClassName.push(parent);
                parent = parent.parentNode;
            }
            activeClassName = QW.Selector.filter(activeClassName, pdataOld, element);
            /** @type {number} */
            var i = 0;
            var valuesLen = activeClassName.length;
            for (;i < valuesLen;++i) {
                if (!key || key && self._DelegateHooks[key][type](activeClassName[i], e || window.event, options)) {
                    get(activeClassName[i], e, options, type);
                }
                if (activeClassName[i].parentNode && activeClassName[i].parentNode.nodeType == 11) {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        /** @type {boolean} */
                        e.cancelBubble = true;
                    }
                    break;
                }
            }
        };
    }
    /**
     * @param {Object} req
     * @param {Event} obj
     * @param {number} namespace
     * @param {string} keepData
     * @return {?}
     */
    function get(req, obj, namespace, keepData) {
        return self.fireHandler.apply(null, arguments);
    }
    var $ = QW.NodeH.g;
    var fn = QW.ObjectH.mix;
    var MAP = QW.EventH.standardize;
    var console = function() {
        /** @type {number} */
        var CSS_ID = 1;
        /** @type {string} */
        var method = "__QWETH_id";
        return{
            /**
             * @param {Object} allow
             * @param {string} name
             * @param {number} extended
             * @param {string} format
             * @return {?}
             */
            get : function(allow, name, extended, format) {
                var object = allow[method] && this[allow[method]];
                if (object && extended[method]) {
                    return object[name + extended[method] + (format || "")];
                }
            },
            /**
             * @param {?} key
             * @param {Object} element
             * @param {string} tests
             * @param {Object} node
             * @param {string} query
             * @return {undefined}
             */
            add : function(key, element, tests, node, query) {
                if (!element[method]) {
                    /** @type {number} */
                    element[method] = CSS_ID++;
                }
                if (!node[method]) {
                    /** @type {number} */
                    node[method] = CSS_ID++;
                }
                var res = this[element[method]] || (this[element[method]] = {});
                res[tests + node[method] + (query || "")] = key;
            },
            /**
             * @param {Object} element
             * @param {string} keepData
             * @param {Object} array
             * @param {string} query
             * @return {undefined}
             */
            remove : function(element, keepData, array, query) {
                var s = element[method] && this[element[method]];
                if (s) {
                    if (array[method]) {
                        delete s[keepData + array[method] + (query || "")];
                    }
                }
            },
            /**
             * @param {Object} el
             * @param {string} events
             * @return {undefined}
             */
            removeEvents : function(el, events) {
                var testSource = el[method] && this[el[method]];
                if (testSource) {
                    /** @type {RegExp} */
                    var rparentsprev = new RegExp("^[a-zA-Z.]*" + (events || "") + "\\d+$");
                    var name;
                    for (name in testSource) {
                        if (rparentsprev.test(name)) {
                            self.removeEventListener(el, name.split(/[^a-zA-Z]/)[0], testSource[name]);
                            delete testSource[name];
                        }
                    }
                }
            },
            /**
             * @param {Object} source
             * @param {string} keepData
             * @param {string} value
             * @return {undefined}
             */
            removeDelegates : function(source, keepData, value) {
                var grammar = source[method] && this[source[method]];
                if (grammar) {
                    /** @type {RegExp} */
                    var exp = new RegExp("^([a-zA-Z]+\\.)?" + (keepData || "\\w+") + "\\d+.+");
                    var token;
                    for (token in grammar) {
                        if (exp.test(token) && (!value || token.substr(token.length - value.length) == value)) {
                            /** @type {Array.<string>} */
                            var extract = token.split(/\d+/)[0].split(".");
                            /** @type {boolean} */
                            var parameter = self._DelegateCpatureEvents.indexOf(extract[1] || extract[0]) > -1;
                            self.removeEventListener(source, token.split(/[^a-zA-Z]/)[0], grammar[token], parameter);
                            delete grammar[token];
                        }
                    }
                }
            }
        };
    }();
    var self = {
        _EventHooks : {},
        _DelegateHooks : {},
        _DelegateCpatureEvents : "change,focus,blur",
        /**
         * @param {?} next_scope
         * @param {Error} args
         * @param {Function} next_callback
         * @param {?} preventDefault
         * @return {?}
         */
        fireHandler : function(next_scope, args, next_callback, preventDefault) {
            return args = MAP(args), args.userType = preventDefault, next_callback.call(next_scope, args);
        },
        addEventListener : function() {
            return document.addEventListener ? function(o, evtName, evtHandler, bCapture) {
                o.addEventListener(evtName, evtHandler, bCapture || false);
            } : function(object, sEvent, fpNotify) {
                object.attachEvent("on" + sEvent, fpNotify);
            };
        }(),
        removeEventListener : function() {
            return document.removeEventListener ? function(el, eventName, f, capture) {
                el.removeEventListener(eventName, f, capture || false);
            } : function(object, sEvent, fpNotify) {
                object.detachEvent("on" + sEvent, fpNotify);
            };
        }(),
        /**
         * @param {Object} element
         * @param {string} type
         * @param {Function} fn
         * @return {undefined}
         */
        on : function(element, type, fn) {
            if (type && type.indexOf(",") > -1) {
                var codeSegments = type.split(/\s*,\s*/);
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    self.on(element, codeSegments[i], fn);
                }
                return;
            }
            element = $(element);
            var set = self._EventHooks[type];
            if (set) {
                for (i in set) {
                    var data = removeListener(element, i, fn, type);
                    console.add(data, element, i + "." + type, fn);
                    if (i == type) {
                        self.addEventListener(element, i, data);
                    } else {
                        self.on(element, i, data);
                    }
                }
            } else {
                data = removeListener(element, type, fn);
                self.addEventListener(element, type, data);
                console.add(data, element, type, fn);
            }
        },
        /**
         * @param {Object} element
         * @param {string} type
         * @param {Object} fn
         * @return {?}
         */
        un : function(element, type, fn) {
            if (type && type.indexOf(",") > -1) {
                var codeSegments = type.split(/\s*,\s*/);
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    self.un(element, codeSegments[i], fn);
                }
                return;
            }
            element = $(element);
            if (!fn) {
                return console.removeEvents(element, type);
            }
            var set = self._EventHooks[type];
            if (set) {
                for (i in set) {
                    var val = removeListener(element, i, fn, type);
                    if (i == type) {
                        self.removeEventListener(element, i, val);
                    } else {
                        self.un(element, i, val);
                    }
                    console.remove(element, i + "." + type, fn);
                }
            } else {
                val = removeListener(element, type, fn);
                self.removeEventListener(element, type, val);
                console.remove(element, type, fn);
            }
        },
        /**
         * @param {Object} element
         * @param {string} fn
         * @param {Function} matcherFunction
         * @return {undefined}
         */
        once : function(element, fn, matcherFunction) {
            element = $(element);
            /**
             * @return {undefined}
             */
            var scope = function() {
                matcherFunction.apply(this, arguments);
                self.un(element, fn, scope);
            };
            self.on(element, fn, scope);
        },
        /**
         * @param {Object} element
         * @param {string} selector
         * @param {string} method
         * @param {number} data
         * @return {undefined}
         */
        delegate : function(element, selector, method, data) {
            if (method && method.indexOf(",") > -1) {
                var codeSegments = method.split(/\s*,\s*/);
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    self.delegate(element, selector, codeSegments[i], data);
                }
                return;
            }
            element = $(element);
            var original = self._DelegateHooks[method];
            /** @type {boolean} */
            var o = self._DelegateCpatureEvents.indexOf(method) > -1;
            if (original) {
                for (i in original) {
                    var result = bind(element, selector, i, data, method);
                    console.add(result, element, i + "." + method, data, selector);
                    if (i == method) {
                        self.addEventListener(element, i, result, o);
                    } else {
                        self.delegate(element, selector, i, result);
                    }
                }
            } else {
                result = bind(element, selector, method, data);
                self.addEventListener(element, method, result, o);
                console.add(result, element, method, data, selector);
            }
        },
        /**
         * @param {Object} element
         * @param {string} selector
         * @param {string} name
         * @param {number} callback
         * @return {?}
         */
        undelegate : function(element, selector, name, callback) {
            if (name && name.indexOf(",") > -1) {
                var codeSegments = name.split(/\s*,\s*/);
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    self.undelegate(element, selector, codeSegments[i], callback);
                }
                return;
            }
            element = $(element);
            if (!callback) {
                return console.removeDelegates(element, name, selector);
            }
            var set = self._DelegateHooks[name];
            /** @type {boolean} */
            var parameter = self._DelegateCpatureEvents.indexOf(name) > -1;
            if (set) {
                for (i in set) {
                    var result = bind(element, selector, i, callback, name);
                    if (i == name) {
                        self.removeEventListener(element, i, result, parameter);
                    } else {
                        self.undelegate(element, selector, i, result);
                    }
                    console.remove(element, i + "." + name, callback, selector);
                }
            } else {
                result = bind(element, selector, name, callback);
                self.removeEventListener(element, name, result, parameter);
                console.remove(element, name, callback, selector);
            }
        },
        fire : function() {
            return document.dispatchEvent ? function(elem, type) {
                /** @type {null} */
                var event = null;
                var doc = elem.ownerDocument || elem;
                return/mouse|click/i.test(type) ? (event = doc.createEvent("MouseEvents"), event.initMouseEvent(type, true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null)) : (event = doc.createEvent("Events"), event.initEvent(type, true, true, doc.defaultView)), elem.dispatchEvent(event);
            } : function(o, evtName) {
                return o.fireEvent("on" + evtName);
            };
        }()
    };
    /**
     * @return {undefined}
     */
    self._defaultExtend = function() {
        /**
         * @param {Array} elems
         * @return {undefined}
         */
        var access = function(elems) {
            /**
             * @param {string} type
             * @return {undefined}
             */
            function fn(type) {
                /**
                 * @param {Object} container
                 * @param {Function} scope
                 * @return {undefined}
                 */
                self[type] = function(container, scope) {
                    if (scope) {
                        self.on(container, type, scope);
                    } else {
                        if (container[type]) {
                            container[type]();
                        } else {
                            self.fire(container, type);
                        }
                    }
                };
            }
            /** @type {number} */
            var i = 0;
            var length = elems.length;
            for (;i < length;++i) {
                fn(elems[i]);
            }
        };
        access("submit,reset,click,focus,blur,change,select".split(","));
        /**
         * @param {Object} element
         * @param {Function} fn
         * @param {string} context
         * @return {undefined}
         */
        self.hover = function(element, fn, context) {
            element = $(element);
            self.on(element, "mouseenter", fn);
            self.on(element, "mouseleave", context || fn);
        };
        /** @type {string} */
        var user_agent = navigator.userAgent;
        if (/firefox/i.test(user_agent)) {
            self._EventHooks.mousewheel = self._DelegateHooks.mousewheel = {
                /**
                 * @param {?} evt
                 * @param {?} dataAndEvents
                 * @return {?}
                 */
                DOMMouseScroll : function(evt, dataAndEvents) {
                    return true;
                }
            };
        }
        fn(self._EventHooks, {
            mouseenter : {
                /**
                 * @param {Object} a
                 * @param {Object} e
                 * @return {?}
                 */
                mouseover : function(a, e) {
                    var activeClassName = e.relatedTarget || e.fromElement;
                    if (!activeClassName || !(a.contains ? a.contains(activeClassName) : a == activeClassName || a.compareDocumentPosition(activeClassName) & 16)) {
                        return true;
                    }
                }
            },
            mouseleave : {
                /**
                 * @param {Object} a
                 * @param {Object} e
                 * @return {?}
                 */
                mouseout : function(a, e) {
                    var activeClassName = e.relatedTarget || e.toElement;
                    if (!activeClassName || !(a.contains ? a.contains(activeClassName) : a == activeClassName || a.compareDocumentPosition(activeClassName) & 16)) {
                        return true;
                    }
                }
            }
        });
        fn(self._DelegateHooks, self._EventHooks);
        if (!document.addEventListener) {
            /**
             * @param {Element} elem
             * @return {?}
             */
            var get = function(elem) {
                switch(elem.type) {
                    case "checkbox":
                        ;
                    case "radio":
                        return elem.checked;
                    case "select-multiple":
                        /** @type {Array} */
                        var matched = [];
                        var options = elem.options;
                        /** @type {number} */
                        var j = 0;
                        for (;j < options.length;++j) {
                            if (options[j].selected) {
                                matched.push(options[j].value);
                            }
                        }
                        return matched.join(",");
                    default:
                        return elem.value;
                }
            };
            /**
             * @param {Element} value
             * @param {Event} event
             * @return {?}
             */
            var handler = function(value, event) {
                var later = event.target || event.srcElement;
                if (get(later) != later.__QWETH_pre_val) {
                    return fix(value, event), true;
                }
            };
            /**
             * @param {Element} obj
             * @param {Event} event
             * @return {undefined}
             */
            var fix = function(obj, event) {
                var self = event.target || event.srcElement;
                self.__QWETH_pre_val = get(self);
            };
            fn(self._DelegateHooks, {
                change : {
                    /** @type {function (Element, Event): undefined} */
                    beforeactivete : fix,
                    /** @type {function (Element, Event): ?} */
                    deactivate : handler,
                    /** @type {function (Element, Event): ?} */
                    focusout : handler,
                    /** @type {function (Element, Event): ?} */
                    click : handler,
                    /**
                     * @param {Element} key
                     * @param {Event} e
                     * @return {?}
                     */
                    keyup : function(key, e) {
                        if (e.srcElement && e.srcElement.tagName == "SELECT") {
                            return handler(key, e);
                        }
                    }
                },
                focus : {
                    /**
                     * @param {?} event
                     * @param {?} dataAndEvents
                     * @return {?}
                     */
                    focusin : function(event, dataAndEvents) {
                        return true;
                    }
                },
                blur : {
                    /**
                     * @param {Element} event
                     * @param {Event} evt
                     * @return {?}
                     */
                    focusout : function(event, evt) {
                        return true;
                    }
                }
            });
        }
    };
    self._defaultExtend();
    QW.EventTargetH = self;
}(), function() {
    /**
     * @param {Object} element
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function f(element, dataAndEvents) {
        var e = element.__jssData;
        if (!e) {
            var pattern = element.getAttribute("data-jss");
            if (pattern) {
                if (!/^\s*{/.test(pattern)) {
                    /** @type {string} */
                    pattern = "{" + pattern + "}";
                }
                e = element.__jssData = createElement(pattern);
            } else {
                if (dataAndEvents) {
                    e = element.__jssData = {};
                }
            }
        }
        return e;
    }
    var mix = QW.ObjectH.mix;
    var createElement = QW.JSON.parse;
    var self = {};
    mix(self, {
        rules : {},
        /**
         * @param {?} key
         * @param {?} obj
         * @return {undefined}
         */
        addRule : function(key, obj) {
            var suiteView = self.rules[key] || (self.rules[key] = {});
            mix(suiteView, obj, true);
        },
        /**
         * @param {Object} rules
         * @return {undefined}
         */
        addRules : function(rules) {
            var property;
            for (property in rules) {
                self.addRule(property, rules[property]);
            }
        },
        /**
         * @param {?} name
         * @return {?}
         */
        removeRule : function(name) {
            var existingNode = self.rules[name];
            return existingNode ? (delete self.rules[name], true) : false;
        },
        /**
         * @param {string} key
         * @return {?}
         */
        getRuleData : function(key) {
            return self.rules[key];
        },
        /**
         * @param {?} property
         * @param {?} key
         * @param {?} value
         * @return {undefined}
         */
        setRuleAttribute : function(property, key, value) {
            var flags = {};
            flags[key] = value;
            self.addRule(property, flags);
        },
        /**
         * @param {?} i
         * @param {?} dataAndEvents
         * @return {?}
         */
        removeRuleAttribute : function(i, dataAndEvents) {
            var attrs = self.rules[i];
            return attrs && attributeName in attrs ? (delete attrs[attributeName], true) : false;
        },
        /**
         * @param {?} timeoutKey
         * @param {?} off
         * @return {?}
         */
        getRuleAttribute : function(timeoutKey, off) {
            var buf = self.rules[timeoutKey] || {};
            return buf[off];
        }
    });
    var removeJss = {
        /**
         * @param {Object} allow
         * @param {string} value
         * @return {?}
         */
        getOwnJss : function(allow, value) {
            var result = f(allow);
            return result && value in result ? result[value] : undefined;
        },
        /**
         * @param {Object} element
         * @param {string} value
         * @return {?}
         */
        getJss : function(element, value) {
            var o = f(element);
            if (o && value in o) {
                return o[value];
            }
            var $ = self.getRuleData;
            var parent = element.id;
            if (parent && ((o = $("#" + parent)) && value in o)) {
                return o[value];
            }
            var className = element.name;
            if (className && ((o = $("@" + className)) && value in o)) {
                return o[value];
            }
            var names = element.className;
            if (names) {
                var codeSegments = names.split(" ");
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    if ((o = $("." + codeSegments[i])) && value in o) {
                        return o[value];
                    }
                }
            }
            var n = element.tagName;
            return n && ((o = $(n)) && value in o) ? o[value] : undefined;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @param {Object} object
         * @return {undefined}
         */
        setJss : function(element, value, object) {
            var result = f(element, true);
            /** @type {Object} */
            result[value] = object;
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {?}
         */
        removeJss : function(element, value) {
            var o = f(element);
            return o && value in o ? (delete o[value], true) : false;
        }
    };
    QW.Jss = self;
    QW.JssTargetH = removeJss;
}(), function() {
    /** @type {string} */
    var a = "queryer";
    /** @type {string} */
    var nullFunction = "operator";
    /** @type {string} */
    var getter_all = "getter_all";
    /** @type {string} */
    var hasClass = "getter_first";
    /** @type {string} */
    var getValue = "getter_first_all";
    QW.NodeC = {
        getterType : hasClass,
        arrayMethods : "map,forEach,toArray".split(","),
        wrapMethods : {
            g : a,
            one : a,
            query : a,
            getElementsByClass : a,
            outerHTML : hasClass,
            hasClass : hasClass,
            addClass : nullFunction,
            removeClass : nullFunction,
            replaceClass : nullFunction,
            toggleClass : nullFunction,
            show : nullFunction,
            hide : nullFunction,
            toggle : nullFunction,
            isVisible : hasClass,
            getXY : getValue,
            setXY : nullFunction,
            setSize : nullFunction,
            setInnerSize : nullFunction,
            setRect : nullFunction,
            setInnerRect : nullFunction,
            getSize : getValue,
            getRect : getValue,
            nextSibling : a,
            previousSibling : a,
            nextSiblings : a,
            previousSiblings : a,
            siblings : a,
            ancestorNode : a,
            ancestorNodes : a,
            parentNode : a,
            firstChild : a,
            lastChild : a,
            contains : hasClass,
            insertAdjacentHTML : nullFunction,
            insertAdjacentElement : nullFunction,
            insert : nullFunction,
            insertTo : nullFunction,
            appendChild : nullFunction,
            appendTo : nullFunction,
            insertSiblingBefore : nullFunction,
            insertSiblingAfter : nullFunction,
            insertBefore : nullFunction,
            insertAfter : nullFunction,
            replaceNode : nullFunction,
            replaceChild : nullFunction,
            removeNode : nullFunction,
            empty : nullFunction,
            removeChild : nullFunction,
            get : getValue,
            set : nullFunction,
            getAttr : getValue,
            setAttr : nullFunction,
            removeAttr : nullFunction,
            getValue : getValue,
            setValue : nullFunction,
            getHtml : getValue,
            setHtml : nullFunction,
            encodeURIForm : hasClass,
            isFormChanged : hasClass,
            cloneNode : a,
            getStyle : getValue,
            getCurrentStyle : getValue,
            setStyle : nullFunction,
            removeStyle : nullFunction,
            borderWidth : hasClass,
            paddingWidth : hasClass,
            marginWidth : hasClass,
            tmpl : getValue,
            wrap : nullFunction,
            unwrap : nullFunction,
            prepend : nullFunction,
            prependTo : nullFunction,
            getOwnJss : getValue,
            getJss : getValue,
            setJss : nullFunction,
            removeJss : nullFunction,
            forEach : nullFunction
        },
        gsetterMethods : {
            val : ["getValue", "setValue"],
            html : ["getHtml", "setHtml"],
            attr : ["", "getAttr", "setAttr"],
            css : ["", "getCurrentStyle", "setStyle"],
            size : ["getSize", "setInnerSize"],
            xy : ["getXY", "setXY"]
        }
    };
}(), function() {
    var extractParams = QW.HelperH.methodize;
    var extend = QW.ObjectH.mix;
    extend(Object, QW.ObjectH);
    extend(QW.ArrayH, QW.HashsetH);
    extend(Array, QW.ArrayH);
    extend(Array.prototype, extractParams(QW.ArrayH));
    extend(QW.FunctionH, QW.ClassH);
    extend(Function, QW.FunctionH);
    extend(Date, QW.DateH);
    extend(Date.prototype, extractParams(QW.DateH));
    extend(String, QW.StringH);
    extend(String.prototype, extractParams(QW.StringH));
}(), function() {
    var mix = QW.ObjectH.mix;
    var query = QW.HelperH.methodize;
    var sortNodes = QW.HelperH.rwrap;
    var allsettings = QW.NodeC;
    var member = QW.NodeH;
    var protoProps = QW.EventTargetH;
    var serialized = QW.JssTargetH;
    var DomU = QW.DomU;
    var _ = QW.NodeW;
    _.pluginHelper(member, allsettings.wrapMethods, allsettings.gsetterMethods);
    _.pluginHelper(protoProps, "operator");
    _.pluginHelper(serialized, allsettings.wrapMethods, {
        jss : ["", "getJss", "setJss"]
    });
    var nodes = QW.ObjectH.dump(QW.ArrayH, allsettings.arrayMethods);
    nodes = query(nodes);
    nodes = sortNodes(nodes, _, allsettings.wrapMethods);
    mix(_.prototype, nodes);
    var suiteView = QW.Dom = {};
    mix(suiteView, [DomU, member, protoProps, serialized]);
}(), function() {
    /**
     * @param {Element} node
     * @param {Event} e
     * @return {?}
     */
    var click = function(node, e) {
        /** @type {number} */
        var n = (node.getAttribute && node.getAttribute("data--ban")) | 0;
        if (n) {
            if (!node.__BAN_preTime || new Date - node.__BAN_preTime > n) {
                return node.__BAN_preTime = new Date * 1, true;
            }
            return;
        }
        return true;
    };
    QW.EventTargetH._DelegateHooks.click = QW.EventTargetH._EventHooks.click = {
        /** @type {function (Element, Event): ?} */
        click : click
    };
    QW.EventTargetH._EventHooks.submit = {
        /** @type {function (Element, Event): ?} */
        submit : click
    };
}(), QW.g = QW.NodeH.g, QW.W = QW.NodeW, QW.ObjectH.mix(window, QW), QW.ModuleH.provideDomains.push(window), function() {
    /**
     * @param {Object} target
     * @param {string} path
     * @return {?}
     */
    function get(target, path) {
        target = target || window;
        path = path || "_default";
        var scripts = target.__QWASYNCH_sequences || (target.__QWASYNCH_sequences = {});
        return scripts[path] = scripts[path] || [], scripts[path];
    }
    var calc = QW.ObjectH.isString;
    var jQuery = {
        /**
         * @param {Function} value
         * @param {string} target
         * @param {Function} handler
         * @return {undefined}
         */
        wait : function(value, target, handler) {
            if (!calc(target)) {
                /** @type {string} */
                handler = target;
                /** @type {string} */
                target = "_default";
            }
            handler = handler || function() {
            };
            var options = get(value, target);
            options.push(handler);
            if (options.length <= 1) {
                if (!/^_/.test(target)) {
                    /**
                     * @return {undefined}
                     */
                    handler = function() {
                    };
                    options.unshift(handler);
                }
                handler.call(value);
            }
        },
        /**
         * @param {Object} value
         * @param {string} data
         * @param {?} deepDataAndEvents
         * @return {?}
         */
        signal : function(value, data, deepDataAndEvents) {
            data = data || "_default";
            var values = get(value, data);
            var o = values.shift();
            return values[0] && (function(toString) {
                toString.call(value);
            }(values[0]), deepDataAndEvents && jQuery.signal(value, data, deepDataAndEvents)), !!o;
        },
        /**
         * @param {Object} value
         * @param {string} selector
         * @return {?}
         */
        clearSignals : function(value, selector) {
            var values = get(value, selector);
            var valuesLen = values.length;
            return values.length = 0, !!valuesLen;
        }
    };
    QW.provide("AsyncH", jQuery);
}(), function() {
    var collection = QW.NodeW;
    var arg = QW.AsyncH;
    var array = QW.HelperH.methodize;
    collection.pluginHelper(arg, "operator");
    var nodes = array(arg);
    QW.provide("Async", nodes);
}(), function() {
    /**
     * @param {Array} key
     * @return {undefined}
     */
    function self(key) {
        /** @type {Array} */
        this.options = key;
        this._initialize();
    }
    var fn = QW.ObjectH.mix;
    var toString = QW.ObjectH.encodeURIJson;
    var unCamelCase = QW.NodeH.encodeURIForm;
    var arr = QW.CustEvent;
    fn(self, {
        STATE_INIT : 0,
        STATE_REQUEST : 1,
        STATE_SUCCESS : 2,
        STATE_ERROR : 3,
        STATE_TIMEOUT : 4,
        STATE_CANCEL : 5,
        defaultHeaders : {
            "Content-type" : "application/x-www-form-urlencoded UTF-8",
            "X-Requested-With" : "XMLHttpRequest"
        },
        EVENTS : ["succeed", "error", "cancel", "complete"],
        XHRVersions : ["Microsoft.XMLHTTP"],
        /**
         * @return {?}
         */
        getXHR : function() {
            var timeouts = self.XHRVersions;
            if (window.ActiveXObject) {
                for (;timeouts.length > 0;) {
                    try {
                        return new ActiveXObject(timeouts[0]);
                    } catch (n) {
                        timeouts.shift();
                    }
                }
            }
            return window.XMLHttpRequest ? new XMLHttpRequest : null;
        },
        /**
         * @param {Object} el
         * @param {Object} c
         * @param {Object} callback
         * @param {Object} method
         * @return {?}
         */
        request : function(el, c, callback, method) {
            if (el.constructor == Object) {
                var res = new self(el)
            } else {
                if (typeof c == "function") {
                    /** @type {Object} */
                    method = callback;
                    /** @type {Object} */
                    callback = c;
                    if (el && el.tagName == "FORM") {
                        method = method || el.method;
                        /** @type {Object} */
                        c = el;
                        el = el.action;
                    } else {
                        /** @type {string} */
                        c = "";
                    }
                }
                res = new self({
                    url : el,
                    method : method,
                    data : c,
                    /**
                     * @return {undefined}
                     */
                    onsucceed : function() {
                        callback.call(this, this.requester.responseText);
                    }
                });
            }
            return res.send(), res;
        },
        /**
         * @param {Object} allow
         * @param {string} value
         * @param {number} namespace
         * @return {?}
         */
        get : function(allow, value, namespace) {
            /** @type {Array.<?>} */
            var args = [].slice.call(arguments, 0);
            return args.push("get"), self.request.apply(null, args);
        },
        /**
         * @param {?} isAsync
         * @param {?} url
         * @param {?} node
         * @return {?}
         */
        post : function(isAsync, url, node) {
            /** @type {Array.<?>} */
            var messages = [].slice.call(arguments, 0);
            return messages.push("post"), self.request.apply(null, messages);
        }
    });
    fn(self.prototype, {
        url : "",
        method : "get",
        async : true,
        user : "",
        pwd : "",
        requestHeaders : null,
        data : "",
        useLock : 0,
        timeout : 3E4,
        isLocked : 0,
        state : self.STATE_INIT,
        /**
         * @param {string} url
         * @param {string} method
         * @param {(Object|string)} str
         * @return {?}
         */
        send : function(url, method, str) {
            var config = this;
            if (config.isLocked) {
                throw new Error("Locked.");
            }
            if (config.isProcessing()) {
                config.cancel();
            }
            var request = config.requester;
            if (!request) {
                request = config.requester = self.getXHR();
                if (!request) {
                    throw new Error("Fail to get HTTPRequester.");
                }
            }
            url = url || config.url;
            url = url.split("#")[0];
            method = (method || (config.method || "")).toLowerCase();
            if (method != "post") {
                /** @type {string} */
                method = "get";
            }
            str = str || config.data;
            if (typeof str == "object") {
                if (str.tagName == "FORM") {
                    str = unCamelCase(str);
                } else {
                    str = toString(str);
                }
            }
            if (str) {
                if (method != "post") {
                    url += (url.indexOf("?") != -1 ? "&" : "?") + str;
                }
            }
            if (config.user) {
                request.open(method, url, config.async, config.user, config.pwd);
            } else {
                request.open(method, url, config.async);
            }
            var header;
            for (header in config.requestHeaders) {
                request.setRequestHeader(header, config.requestHeaders[header]);
            }
            /** @type {number} */
            config.isLocked = 0;
            config.state = self.STATE_INIT;
            if (config.async) {
                /** @type {Date} */
                config._sendTime = new Date;
                if (config.useLock) {
                    /** @type {number} */
                    config.isLocked = 1;
                }
                /**
                 * @return {undefined}
                 */
                this.requester.onreadystatechange = function() {
                    var state = config.requester.readyState;
                    if (state == 4) {
                        config._execComplete();
                    }
                };
                config._checkTimeout();
            }
            if (method == "post") {
                if (!str) {
                    /** @type {string} */
                    str = " ";
                }
                request.send(str);
            } else {
                request.send(null);
            }
            if (!config.async) {
                return config._execComplete(), config.requester.responseText;
            }
        },
        /**
         * @return {?}
         */
        isSuccess : function() {
            var status = this.requester.status;
            return!status || (status >= 200 && status < 300 || status == 304);
        },
        /**
         * @return {?}
         */
        isProcessing : function() {
            var cc = this.requester ? this.requester.readyState : 0;
            return cc > 0 && cc < 4;
        },
        /**
         * @param {Object} allow
         * @param {string} value
         * @return {undefined}
         */
        get : function(allow, value) {
            this.send(allow, "get", value);
        },
        /**
         * @param {string} body
         * @param {(Object|string)} type
         * @return {undefined}
         */
        post : function(body, type) {
            this.send(body, "post", type);
        },
        /**
         * @return {?}
         */
        cancel : function() {
            var data = this;
            return data.requester && data.isProcessing() ? (data.state = self.STATE_CANCEL, data.requester.abort(), data._execComplete(), data.fire("cancel"), true) : false;
        },
        /**
         * @return {undefined}
         */
        _initialize : function() {
            var obj = this;
            arr.createEvents(obj, self.EVENTS);
            fn(obj, obj.options, 1);
            obj.requestHeaders = fn(obj.requestHeaders || {}, self.defaultHeaders);
        },
        /**
         * @return {undefined}
         */
        _checkTimeout : function() {
            var options = this;
            if (options.async) {
                clearTimeout(options._timer);
                /** @type {number} */
                this._timer = setTimeout(function() {
                    if (options.requester) {
                        if (!options.isProcessing()) {
                            options.state = self.STATE_TIMEOUT;
                            options.requester.abort();
                            options._execComplete("timeout");
                        }
                    }
                }, options.timeout);
            }
        },
        /**
         * @return {undefined}
         */
        _execComplete : function() {
            var data = this;
            var o = data.requester;
            /** @type {Function} */
            o.onreadystatechange = new Function;
            /** @type {number} */
            data.isLocked = 0;
            clearTimeout(this._timer);
            if (data.state != self.STATE_CANCEL) {
                if (data.state != self.STATE_TIMEOUT) {
                    if (data.isSuccess()) {
                        data.state = self.STATE_SUCCESS;
                        data.fire("succeed", data.requester.responseText);
                    } else {
                        data.state = self.STATE_ERROR;
                        data.fire("error", data.requester.responseText);
                    }
                }
            }
            data.fire("complete", data.requester.responseText);
        }
    });
    QW.provide("Ajax", self);
}(), function() {
    var Child = QW.Ajax;
    var _ = QW.NodeW;
    /** @type {number} */
    Child.Delay = 1E3;
    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    Child.prototype.opResults = function(dataAndEvents) {
        var data = this;
        if (!data.isSuccess()) {
            return alert("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"), {
                isop : true,
                err : "inter"
            };
        }
        var responseText = data.requester.responseText;
        try {
            var error = (new Function("return (" + responseText + ");"))();
        } catch (i) {
            return alert("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"), {
                isop : true,
                err : "inter"
            };
        }
        /** @type {boolean} */
        error.isop = true;
        switch(error.err) {
            default:
                /** @type {boolean} */
                error.isop = false;
        }
        return error;
    };
    /**
     * @return {undefined}
     */
    Child.prototype.execJs = function() {
        QW.StringH.execJs(this.requester.responseText);
    };
    var member = {
        /**
         * @param {Object} request
         * @param {Object} callback
         * @return {undefined}
         */
        ajaxForm : function(request, callback) {
            var options = {
                data : request,
                url : request.action,
                method : request.method
            };
            if (typeof callback == "function") {
                /**
                 * @return {undefined}
                 */
                options.onsucceed = function() {
                    callback.call(this, this.requester.responseText);
                };
            } else {
                options.onsucceed = Child.opResults;
                QW.ObjectH.mix(options, callback || {}, true);
            }
            (new Child(options)).send();
        }
    };
    _.pluginHelper(member, "operator");
}(), function() {
    /**
     * @param {?} self
     * @return {undefined}
     */
    function run(self) {
        self.step();
        if (self.isPlaying()) {
            /** @type {number} */
            self._interval = window.setInterval(function() {
                self.step();
            }, self.frameTime);
        }
    }
    /**
     * @param {?} self
     * @return {undefined}
     */
    function pause(self) {
        window.clearInterval(self._interval);
    }
    /**
     * @param {?} anim
     * @param {number} keepData
     * @return {undefined}
     */
    function remove(anim, keepData) {
        /** @type {number} */
        anim.per = keepData;
        /** @type {number} */
        anim._startDate = new Date * 1 - keepData * anim.dur;
        if (anim.byStep) {
            /** @type {number} */
            anim._totalStep = anim.dur / anim.frameTime;
            /** @type {number} */
            anim._currentStep = keepData * anim._totalStep;
        }
    }
    var me = QW.CustEvent;
    var mix = QW.ObjectH.mix;
    /**
     * @param {?} options
     * @param {number} base
     * @param {?} o
     * @return {undefined}
     */
    var construct = function(options, base, o) {
        mix(this, o);
        mix(this, {
            animFun : options,
            dur : base,
            byStep : false,
            per : 0,
            frameTime : 28,
            _status : 0
        });
        remove(this, this.per);
        me.createEvents(this, construct.EVENTS);
    };
    /** @type {Array.<string>} */
    construct.EVENTS = "beforeplay,play,step,pause,resume,end,reset".split(",");
    mix(construct.prototype, {
        /**
         * @return {?}
         */
        isPlaying : function() {
            return this._status == 1;
        },
        /**
         * @return {?}
         */
        play : function() {
            var self = this;
            return self.isPlaying() && self.pause(), remove(self, 0), self.fire("beforeplay") ? (self._status = 1, self.fire("play"), run(self), true) : false;
        },
        /**
         * @param {number} name
         * @return {undefined}
         */
        step : function(name) {
            var self = this;
            if (name != null) {
                remove(self, name);
            } else {
                if (self.byStep) {
                    /** @type {number} */
                    name = self._currentStep++ / self._totalStep;
                } else {
                    /** @type {number} */
                    name = (new Date - self._startDate) / self.dur;
                }
                /** @type {number} */
                this.per = name;
            }
            if (this.per > 1) {
                /** @type {number} */
                this.per = 1;
            }
            self.animFun(this.per);
            self.fire("step");
            if (this.per >= 1) {
                this.end();
                return;
            }
        },
        /**
         * @return {undefined}
         */
        end : function() {
            remove(this, 1);
            this.animFun(1);
            /** @type {number} */
            this._status = 2;
            pause(this);
            this.fire("end");
        },
        /**
         * @return {undefined}
         */
        pause : function() {
            /** @type {number} */
            this._status = 4;
            pause(this);
            this.fire("pause");
        },
        /**
         * @return {undefined}
         */
        resume : function() {
            remove(this, this.per);
            /** @type {number} */
            this._status = 1;
            this.fire("resume");
            run(this);
        },
        /**
         * @return {undefined}
         */
        reset : function() {
            remove(this, 0);
            this.animFun(0);
            this.fire("reset");
        }
    });
    QW.provide("Anim", construct);
}(), function() {
    /**
     * @param {Object} map
     * @param {string} name
     * @return {?}
     */
    function load(map, name) {
        var letter;
        for (letter in map) {
            /** @type {RegExp} */
            var regexp = new RegExp(letter, "i");
            if (regexp.test(name)) {
                return map[letter];
            }
        }
        return null;
    }
    var item = QW.NodeH;
    var mix = QW.ObjectH.mix;
    var getActual = QW.ObjectH.isObject;
    var cb = mix;
    var renderElement = item.g;
    var attr = item.getCurrentStyle;
    var removeClass = item.setStyle;
    var value = item.getSize;
    var cleanup = QW.DomU.isElement;
    var fn = QW.ArrayH.forEach;
    var f = QW.ArrayH.map;
    var Model = QW.Anim;
    var proxy = item.show;
    var hide = item.hide;
    var callback = item.isVisible;
    /** @type {Array} */
    var adown = ["zIndex", "fontWeight", "opacity", "lineHeight"];
    /**
     * @param {?} el
     * @param {(Object|string)} obj
     * @param {string} attr
     * @return {undefined}
     */
    var Node = function(el, obj, attr) {
        this.el = el;
        /** @type {string} */
        this.attr = attr;
        if (!getActual(obj)) {
            obj = {
                to : obj
            };
        }
        mix(this, obj);
    };
    mix(Node.prototype, {
        /**
         * @return {?}
         */
        getValue : function() {
            return attr(this.el, this.attr);
        },
        /**
         * @param {Object} element
         * @param {Object} value
         * @return {undefined}
         */
        setValue : function(element, value) {
            removeClass(this.el, this.attr, element + value);
        },
        /**
         * @return {?}
         */
        getUnit : function() {
            if (this.unit) {
                return this.unit;
            }
            var old = this.getValue();
            if (old) {
                var expr = old.toString().replace(/^[+-]?[\d\.]+/g, "");
                if (expr && expr != old) {
                    return expr;
                }
            }
            return adown.contains(this.attr.camelize()) ? "" : "px";
        },
        /**
         * @return {undefined}
         */
        init : function() {
            var from;
            var to;
            var by;
            if (null != this.from) {
                /** @type {number} */
                from = parseFloat(this.from);
            } else {
                /** @type {number} */
                from = parseFloat(this.getValue()) || 0;
            }
            /** @type {number} */
            to = parseFloat(this.to);
            /** @type {number} */
            by = this.by != null ? parseFloat(this.by) : to - from;
            this.from = from;
            /** @type {number} */
            this.by = by;
            this.unit = this.getUnit();
        },
        /**
         * @param {Object} element
         * @return {undefined}
         */
        action : function(element) {
            var pdataOld = this.unit;
            var activeClassName;
            if (typeof this.end != "undefined" && element >= 1) {
                activeClassName = this.end;
            } else {
                activeClassName = this.from + this.by * this.easing(element);
                activeClassName = activeClassName.toFixed(6);
            }
            this.setValue(activeClassName, pdataOld);
        }
    });
    /**
     * @param {string} length
     * @param {string} scope
     * @param {string} doc
     * @return {undefined}
     */
    var create = function(length, scope, doc) {
        var results = new Node(length, scope, doc);
        cb(this, results);
    };
    /** @type {function (?, (Object|string), string): undefined} */
    create.MENTOR_CLASS = Node;
    mix(create.prototype, {
        /**
         * @return {?}
         */
        getValue : function() {
            return this.el[this.attr] | 0;
        },
        /**
         * @param {Object} element
         * @return {undefined}
         */
        setValue : function(element) {
            /** @type {number} */
            this.el[this.attr] = Math.round(element);
        }
    }, true);
    /**
     * @param {string} name
     * @param {string} value
     * @param {string} options
     * @return {undefined}
     */
    var configure = function(name, value, options) {
        var node = new Node(name, value, options);
        cb(this, node);
    };
    /** @type {function (?, (Object|string), string): undefined} */
    configure.MENTOR_CLASS = Node;
    mix(configure.prototype, {
        /**
         * @param {string} s
         * @return {?}
         */
        parseColor : function(s) {
            var patterns = {
                rgb : /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
                hex : /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
                hex3 : /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i
            };
            if (s.length == 3) {
                return s;
            }
            /** @type {(Array.<string>|null)} */
            var parts = patterns.hex.exec(s);
            return parts && parts.length == 4 ? [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)] : (parts = patterns.rgb.exec(s), parts && parts.length == 4 ? [parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)] : (parts = patterns.hex3.exec(s), parts && parts.length == 4 ? [parseInt(parts[1] + parts[1], 16), parseInt(parts[2] + parts[2], 16), parseInt(parts[3] + parts[3], 16)] : [0, 0, 0]));
        },
        /**
         * @return {undefined}
         */
        init : function() {
            var val;
            var source;
            var by;
            var trim = this.parseColor;
            if (null != this.from) {
                val = this.from;
            } else {
                val = this.getValue();
            }
            val = trim(val);
            source = this.to || [0, 0, 0];
            source = trim(source);
            by = this.by ? trim(this.by) : f(source, function(dataAndEvents, part) {
                return dataAndEvents - val[part];
            });
            this.from = val;
            this.to = source;
            this.by = by;
            /** @type {string} */
            this.unit = "";
        },
        /**
         * @return {?}
         */
        getValue : function() {
            var width = attr(this.el, this.attr);
            return this.parseColor(width);
        },
        /**
         * @param {Object} element
         * @return {undefined}
         */
        setValue : function(element) {
            if (typeof element == "string") {
                removeClass(this.el, this.attr, element);
            } else {
                removeClass(this.el, this.attr, "rgb(" + element.join(",") + ")");
            }
        },
        /**
         * @param {Object} element
         * @return {undefined}
         */
        action : function(element) {
            var self = this;
            var activeClassName;
            if (typeof this.end != "undefined" && element >= 1) {
                activeClassName = this.end;
            } else {
                activeClassName = this.from.map(function(top2, timeoutKey) {
                    return Math.max(Math.floor(top2 + self.by[timeoutKey] * self.easing(element)), 0);
                });
            }
            this.setValue(activeClassName);
        }
    }, true);
    var map = {
        /** @type {function (string, string, string): undefined} */
        color$ : configure,
        /** @type {function (string, string, string): undefined} */
        "^scroll" : create,
        /** @type {function (?, (Object|string), string): undefined} */
        ".*" : Node
    };
    /**
     * @param {Object} element
     * @param {Object} blocks
     * @param {Function} options
     * @param {Function} easing
     * @return {undefined}
     */
    var init = function(element, blocks, options, easing) {
        element = renderElement(element);
        if (!cleanup(element)) {
            throw new Error(["Animation", "Initialize Error", "Element Not Found!"]);
        }
        options = options || init.DefaultEasing;
        /** @type {Function} */
        easing = typeof easing == "function" ? easing : init.DefaultEasing;
        /** @type {Array} */
        var ctxt = [];
        /** @type {Array} */
        var activeClassName = [];
        var name;
        for (name in blocks) {
            if (typeof blocks[name] == "string" && init.agentHooks[blocks[name]]) {
                var node = init.agentHooks[blocks[name]](name, element);
                if (node.callback) {
                    activeClassName.push(node.callback);
                    delete node.callback;
                }
                blocks[name] = node;
            }
            var Fx = load(map, name);
            var fx = new Fx(element, blocks[name], name);
            if (!fx) {
                continue;
            }
            fx.init();
            fx.easing = fx.easing || easing;
            ctxt.push(fx);
        }
        var model = new Model(function(activeClassName) {
            fn(ctxt, function(element) {
                element.action(activeClassName);
            });
        }, options);
        fn(activeClassName, function(ready) {
            model.on("end", ready);
        });
        cb(this, model);
    };
    init.MENTOR_CLASS = Model;
    /**
     * @param {Object} allow
     * @return {?}
     */
    init.DefaultEasing = function(allow) {
        return allow;
    };
    /** @type {number} */
    init.DefaultDur = 500;
    /** @type {boolean} */
    init.Sequence = false;
    init.agentHooks = function() {
        /**
         * @param {Object} element
         * @param {string} name
         * @return {?}
         */
        var get = function(element, name) {
            return/^(height|width)$/ig.test(name) ? value(element)[name] || 0 : attr(element, name) || 0;
        };
        return{
            /**
             * @param {Object} element
             * @param {Object} activeClassName
             * @return {?}
             */
            show : function(element, activeClassName) {
                /** @type {number} */
                var begin = 0;
                var end = activeClassName["__anim" + element];
                return callback(activeClassName) ? (begin = get(activeClassName, element), end = typeof end == "undefined" ? get(activeClassName, element) : end) : (proxy(activeClassName), end = typeof end == "undefined" ? get(activeClassName, element) : end, removeClass(activeClassName, element, 0)), {
                    from : begin,
                    to : end
                };
            },
            /**
             * @param {Object} className
             * @param {Object} element
             * @return {?}
             */
            hide : function(className, element) {
                var index = get(element, className);
                /** @type {string} */
                var key = "__anim" + className;
                var val = element[key];
                if (typeof val == "undefined") {
                    if (callback(element)) {
                        val = index;
                    } else {
                        proxy(element);
                        val = get(element, className);
                        hide(element);
                    }
                    element[key] = val;
                }
                /**
                 * @return {undefined}
                 */
                var fn = function() {
                    hide(element);
                    var header = element[key];
                    if (typeof header == "number") {
                        if (!adown.contains(className.camelize())) {
                            header += "px";
                        }
                    }
                    removeClass(element, className, header);
                };
                return{
                    from : index,
                    to : 0,
                    /** @type {function (): undefined} */
                    callback : fn
                };
            },
            /**
             * @param {Object} element
             * @param {Object} value
             * @return {?}
             */
            toggle : function(element, value) {
                return callback(value) ? init.agentHooks.hide.apply(this, arguments) : init.agentHooks.show.apply(this, arguments);
            }
        };
    }();
    QW.provide({
        /** @type {function (Object, Object, Function, Function): undefined} */
        ElAnim : init,
        /** @type {function (Object, Object, Function, Function): undefined} */
        ScrollAnim : init,
        /** @type {function (Object, Object, Function, Function): undefined} */
        ColorAnim : init
    });
}(), function() {
    var Easing = {
        /**
         * @param {?} t
         * @return {?}
         */
        easeNone : function(t) {
            return t;
        },
        /**
         * @param {number} dz
         * @return {?}
         */
        easeIn : function(dz) {
            return dz * dz;
        },
        /**
         * @param {number} ratio
         * @return {?}
         */
        easeOut : function(ratio) {
            return ratio * (2 - ratio);
        },
        /**
         * @param {number} t
         * @return {?}
         */
        easeBoth : function(t) {
            return(t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
        },
        /**
         * @param {number} t
         * @return {?}
         */
        easeInStrong : function(t) {
            return t * t * t * t;
        },
        /**
         * @param {number} t
         * @return {?}
         */
        easeOutStrong : function(t) {
            return-((t -= 1) * t * t * t - 1);
        },
        /**
         * @param {number} t
         * @return {?}
         */
        easeBothStrong : function(t) {
            return(t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
        },
        /**
         * @param {number} b
         * @return {?}
         */
        elasticIn : function(b) {
            if (b == 0) {
                return 0;
            }
            if (b == 1) {
                return 1;
            }
            /** @type {number} */
            var radius = 0.3;
            /** @type {number} */
            var r = radius / 4;
            return-(Math.pow(2, 10 * (b -= 1)) * Math.sin((b - r) * 2 * Math.PI / radius));
        },
        /**
         * @param {number} time
         * @return {?}
         */
        elasticOut : function(time) {
            if (time == 0) {
                return 0;
            }
            if (time == 1) {
                return 1;
            }
            /** @type {number} */
            var p = 0.3;
            /** @type {number} */
            var s = p / 4;
            return Math.pow(2, -10 * time) * Math.sin((time - s) * 2 * Math.PI / p) + 1;
        },
        /**
         * @param {number} b
         * @return {?}
         */
        elasticBoth : function(b) {
            if (b == 0) {
                return 0;
            }
            if ((b /= 0.5) == 2) {
                return 1;
            }
            /** @type {number} */
            var radius = 0.3 * 1.5;
            /** @type {number} */
            var r = radius / 4;
            return b < 1 ? -0.5 * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - r) * 2 * Math.PI / radius) : Math.pow(2, -10 * (b -= 1)) * Math.sin((b - r) * 2 * Math.PI / radius) * 0.5 + 1;
        },
        /**
         * @param {number} t
         * @return {?}
         */
        backIn : function(t) {
            /** @type {number} */
            var s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
        /**
         * @param {number} t
         * @return {?}
         */
        backOut : function(t) {
            /** @type {number} */
            var s = 1.70158;
            return(t -= 1) * t * ((s + 1) * t + s) + 1;
        },
        /**
         * @param {number} t
         * @return {?}
         */
        backBoth : function(t) {
            /** @type {number} */
            var s = 1.70158;
            return(t /= 0.5) < 1 ? 0.5 * t * t * (((s *= 1.525) + 1) * t - s) : 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        /**
         * @param {number} t
         * @return {?}
         */
        bounceIn : function(t) {
            return 1 - Easing.bounceOut(1 - t);
        },
        /**
         * @param {number} t
         * @return {?}
         */
        bounceOut : function(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        /**
         * @param {number} t
         * @return {?}
         */
        bounceBoth : function(t) {
            return t < 0.5 ? Easing.bounceIn(t * 2) * 0.5 : Easing.bounceOut(t * 2 - 1) * 0.5 + 0.5;
        }
    };
    QW.provide("Easing", Easing);
}(), function() {
    /**
     * @param {Object} element
     * @param {string} value
     * @param {Function} input
     * @param {number} keepData
     * @param {boolean} args
     * @return {?}
     */
    function go(element, value, input, keepData, args) {
        element = f(element);
        var current = element.__preAnim;
        if (current) {
            if (current.isPlaying()) {
                current.pause();
            }
        }
        var node = new QW.ElAnim(element, value, keepData || 400, args);
        return input && node.on("end", function() {
            input.call(element, null);
        }), setTimeout(function() {
            node.play();
        }), element.__preAnim = node, node;
    }
    var me = QW.NodeH;
    var f = me.g;
    var modified = me.isVisible;
    var target = {
        /**
         * @param {Object} element
         * @param {?} object
         * @param {number} type
         * @param {Function} easing
         * @param {boolean} item
         * @param {?} attr
         * @return {?}
         */
        animate : function(element, object, type, easing, item, attr) {
            /** @type {number} */
            var argsIndex = arguments.length - 1;
            for (;argsIndex > 0;argsIndex--) {
                if (arguments[argsIndex] === !!arguments[argsIndex]) {
                    var iterable = arguments[argsIndex];
                    /** @type {null} */
                    arguments[argsIndex] = null;
                    attr = iterable;
                    break;
                }
            }
            if (!QW.Async || !attr && !QW.ElAnim.Sequence) {
                return go(element, object, easing, type, item);
            }
            W(element).wait(function() {
                var obj = go(element, object, easing, type, item);
                return obj.on("end", function() {
                    W(element).signal();
                }), obj;
            });
        },
        /**
         * @param {Object} elem
         * @param {number} complete
         * @param {Function} callback
         * @param {boolean} duration
         * @param {?} delay
         * @return {?}
         */
        fadeIn : function(elem, complete, callback, duration, delay) {
            var config = {
                opacity : "show"
            };
            return target.animate(elem, config, complete, callback, duration, delay);
        },
        /**
         * @param {Object} elem
         * @param {number} complete
         * @param {Function} callback
         * @param {boolean} duration
         * @param {?} color
         * @return {?}
         */
        fadeOut : function(elem, complete, callback, duration, color) {
            var config = {
                opacity : "hide"
            };
            return target.animate(elem, config, complete, callback, duration, color);
        },
        /**
         * @param {Object} activeClassName
         * @param {?} speed
         * @param {?} $elem
         * @param {?} callback
         * @param {?} deepDataAndEvents
         * @return {?}
         */
        fadeToggle : function(activeClassName, speed, $elem, callback, deepDataAndEvents) {
            return target[modified(activeClassName) ? "fadeOut" : "fadeIn"](activeClassName, speed, $elem, callback, deepDataAndEvents);
        },
        /**
         * @param {Object} element
         * @param {number} options
         * @param {Function} callback
         * @param {boolean} duration
         * @param {?} protoProps
         * @return {?}
         */
        slideUp : function(element, options, callback, duration, protoProps) {
            var config = {
                height : "hide"
            };
            return target.animate(element, config, options, callback, duration, protoProps);
        },
        /**
         * @param {Object} element
         * @param {number} complete
         * @param {Function} callback
         * @param {boolean} duration
         * @param {?} protoProps
         * @return {?}
         */
        slideDown : function(element, complete, callback, duration, protoProps) {
            var config = {
                height : "show"
            };
            return target.animate(element, config, complete, callback, duration, protoProps);
        },
        /**
         * @param {Object} activeClassName
         * @param {?} callback
         * @param {?} speed
         * @param {?} $elem
         * @param {?} opt_fn
         * @return {?}
         */
        slideToggle : function(activeClassName, callback, speed, $elem, opt_fn) {
            return target[modified(activeClassName) ? "slideUp" : "slideDown"](activeClassName, callback, speed, $elem, opt_fn);
        },
        /**
         * @param {Object} container
         * @param {number} complete
         * @param {Function} callback
         * @param {boolean} relativeToItem
         * @param {?} protoProps
         * @return {?}
         */
        shine4Error : function(container, complete, callback, relativeToItem, protoProps) {
            var config = {
                backgroundColor : {
                    from : "#f33",
                    to : "#fff",
                    end : ""
                }
            };
            return target.animate(container, config, complete, callback, relativeToItem, protoProps);
        }
    };
    QW.NodeW.pluginHelper(target, "operator");
    if (QW.Dom) {
        QW.ObjectH.mix(QW.Dom, target);
    }
}();
