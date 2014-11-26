define("js/components/amdbase", function() {
    /**
     * @param {Function} obj
     * @return {?}
     */
    var createObject = function(obj) {
        var F;
        return Object.create ? Object.create(obj) : (F = function() {
        }, F.prototype = obj, new F);
    };
    var self = {};
    return self.jsonDecode = function(keepData) {
        return(new Function("return (" + keepData + ")"))();
    }, self.jsonEncode = function() {
        var frequency = {
            "\b" : "\\b",
            "\t" : "\\t",
            "\n" : "\\n",
            "\f" : "\\f",
            "\r" : "\\r",
            '"' : '\\"',
            "\\" : "\\\\"
        };
        /**
         * @param {string} value
         * @return {?}
         */
        var quote = function(value) {
            return/["\\\x00-\x1f]/.test(value) && (value = value.replace(/["\\\x00-\x1f]/g, function(a) {
                var i = frequency[a];
                return i ? i : (i = a.charCodeAt(), "\\u00" + Math.floor(i / 16).toString(16) + (i % 16).toString(16));
            })), '"' + value + '"';
        };
        /**
         * @param {Array} q
         * @return {?}
         */
        var register = function(q) {
            /** @type {Array} */
            var t = ["["];
            var l = q.length;
            var i;
            var k;
            var v;
            /** @type {number} */
            k = 0;
            for (;k < l;k++) {
                v = q[k];
                switch(typeof v) {
                    case "undefined":
                        ;
                    case "function":
                        ;
                    case "unknown":
                        break;
                    default:
                        if (i) {
                            t.push(",");
                        }
                        t.push(parse(v));
                        /** @type {number} */
                        i = 1;
                }
            }
            return t.push("]"), t.join("");
        };
        /**
         * @param {Object} value
         * @return {?}
         */
        var parse = function(value) {
            switch(typeof value) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                    return String(value);
                case "string":
                    return quote(value);
                default:
                    var type = $.type(value);
                    if (value === null) {
                        return "null";
                    }
                    if (type == "array") {
                        return register(value);
                    }
                    if (type == "data") {
                        return value.toString();
                    }
                    /** @type {Array} */
                    var tagNameArr = ["{"];
                    var o;
                    var val;
                    var key;
                    for (key in value) {
                        if (Object.prototype.hasOwnProperty.call(value, key)) {
                            val = value[key];
                            switch(typeof val) {
                                case "undefined":
                                    ;
                                case "unknown":
                                    ;
                                case "function":
                                    break;
                                default:
                                    if (o) {
                                        tagNameArr.push(",");
                                    }
                                    /** @type {number} */
                                    o = 1;
                                    tagNameArr.push(quote(key) + ":" + parse(val));
                            }
                        }
                    }
                    return tagNameArr.push("}"), tagNameArr.join("");
            }
        };
        return parse;
    }(), self.getDocFrag = function() {
        return document.createDocumentFragment();
    }, self.inherits = function(parent, protoProps, conf) {
        var child;
        return typeof protoProps == "function" ? (child = protoProps, protoProps = null) : protoProps && protoProps.hasOwnProperty("constructor") ? child = protoProps.constructor : child = function() {
            return parent.apply(this, arguments);
        }, $.extend(child, parent, conf || {}), child.__super__ = parent.prototype, child.prototype = createObject(parent.prototype), child.prototype._super = parent, protoProps && $.extend(true, child.prototype, protoProps), child;
    }, self.abstractFunc = function(dataAndEvents) {
        return function() {
            throw new Error('"' + dataAndEvents + '" is an abstract function');
        };
    }, self.getObjProp = function(opt_attributes, keepData, dataAndEvents) {
        if (!opt_attributes) {
            return dataAndEvents;
        }
        var codeSegments = keepData.split(".");
        var t = opt_attributes;
        /** @type {number} */
        var i = 0;
        var valuesLen = codeSegments.length;
        for (;i < valuesLen;i++) {
            var k = codeSegments[i];
            if (!(k in t)) {
                return dataAndEvents;
            }
            t = t[k];
        }
        return t;
    }, self.formatString = function(str, bind, opt_attributes) {
        /** @type {string} */
        str = String(str);
        /** @type {function (this:*): string} */
        var toString = Object.prototype.toString;
        return str.replace(/#\{(.+?)\}/g, function(dataAndEvents, key) {
            var that = self.getObjProp(opt_attributes, key) || self.getObjProp(bind, key);
            return "[object Function]" == toString.call(that) && (that = that.call(bind)), "undefined" == typeof that ? "" : that;
        });
    }, self.ajax = function(options, callback, done) {
        /** @type {string} */
        options.dataType = "text";
        if (options.type == "GET") {
            /** @type {number} */
            var data = Math.random();
            options.data = options.data || {};
            if (typeof options.data == "string") {
                options.data += "&_r=" + data;
            } else {
                /** @type {number} */
                options.data._r = data;
            }
        }
        var res = $.ajax(options).done(function(key) {
            /** @type {null} */
            var err = null;
            /** @type {boolean} */
            var o = false;
            try {
                err = self.jsonDecode(key);
            } catch (u) {
                /** @type {boolean} */
                o = true;
            }
            if (o) {
                if (done) {
                    done({
                        errno : -1,
                        errmsg : "\u6570\u636e\u89e3\u6790\u5931\u8d25\uff01"
                    });
                }
            } else {
                if (callback) {
                    callback(err, res);
                }
                if (err.errno == "2006") {
                    $.alert("\u767b\u5f55\u5df2\u5931\u6548\uff0c\u70b9\u51fb\u786e\u5b9a\u8df3\u8f6c\u5230\u767b\u5f55\u9875\u9762", {
                        type : "warning",
                        /**
                         * @return {undefined}
                         */
                        fn : function() {
                            /** @type {string} */
                            location.href = "/";
                        }
                    });
                }
            }
        }).fail(function() {
            if (done) {
                done.apply(null, arguments);
            }
        });
        return res;
    }, self.ajaxData = function(r, task, callback, options) {
        return this.ajax({
            url : r,
            data : task,
            type : "GET",
            timeout : 2E4
        }, callback, options);
    }, self.ajaxSubmit = function(url, task, callback, options) {
        return this.ajax({
            url : url,
            data : task,
            type : "POST",
            timeout : 2E4
        }, callback, options);
    }, self.getFileName = function(_url) {
        var horizontalOffset = _url.match(/([^\/]+)\.\w+$/);
        return horizontalOffset ? horizontalOffset[1] : "\u672a\u547d\u540d";
    }, self.getFolderName = function(fileName) {
        if (fileName == "/") {
            return "\u5168\u90e8\u6587\u4ef6";
        }
        var horizontalOffset = fileName.match(/([^\/]+)\/?$/);
        return horizontalOffset ? horizontalOffset[1] : "\u672a\u547d\u540d";
    }, self.getFolderPath = function(uri) {
        var hash = uri.lastIndexOf("/");
        return hash == -1 || hash == 0 ? "/" : uri.substr(0, hash + 1);
    }, self.getFolderPathStr = function(code) {
        return code = "\u5168\u90e8\u6587\u4ef6" + code, code.lastIndexOf("/") == code.length - 1 && (code = code.substr(0, code.length - 1)), code;
    }, self.getLocationSearch = function() {
        /** @type {string} */
        var baseName = location.search.replace("?", "");
        var obj = {};
        if (!baseName) {
            return obj;
        }
        /** @type {Array.<string>} */
        var codeSegments = baseName.split("&");
        obj = {};
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
            /** @type {Array.<string>} */
            var parts = codeSegments[i].split("=");
            /** @type {string} */
            obj[parts[0]] = decodeURIComponent(parts[1] || "");
        }
        return obj;
    }, self.maxString = function(string, length) {
        return string.length > length ? string.substr(0, length - 3) + "..." : string;
    }, self.wbr = function(baseName) {
        return baseName.split("").join("<wbr>");
    }, self.subStrKeepHeadAndTail = function(r, x, c) {
        var index = x + c;
        return r.length <= index ? r : r.substr(0, x) + "\u2026" + r.substr(r.length - c, c);
    }, self.getSwfVersion = function() {
        /** @type {boolean} */
        var mode = false;
        return function() {
            if (mode === false) {
                /** @type {(Navigator|null)} */
                var nav = navigator;
                if (nav.plugins && nav.mimeTypes.length) {
                    var err = nav.plugins["Shockwave Flash"];
                    if (err) {
                        if (err.description) {
                            /** @type {string} */
                            mode = err.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0";
                        }
                    }
                } else {
                    if (window.ActiveXObject && !window.opera) {
                        try {
                            var ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            if (ax) {
                                var lastLine = ax.GetVariable("$version");
                                mode = lastLine.replace(/WIN/g, "").replace(/,/g, ".");
                            }
                        } catch (s) {
                        }
                    }
                }
                return mode = parseInt(mode, 10), mode;
            }
            return mode;
        };
    }(), self.formatByte = function(a, c, sendImmediately) {
        /** @type {string} */
        var signature = "";
        if (Object.isString(a)) {
            /** @type {number} */
            a = parseInt(a);
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
            var b = codeSegments[i];
            if (a >= b) {
                signature = (a / b).toFixed(c) + newArray[i];
                break;
            }
        }
        if (!signature) {
            if (a > 0) {
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
    }, self.byteLen = function(str) {
        return str.replace(/[^\x00-\xff]/g, "--").length;
    }, self.subByte = function(arg, offset, start) {
        return self.byteLen(arg) <= offset ? arg : (start = start || "", offset -= self.byteLen(start), arg.substr(0, offset).replace(/([^\x00-\xff])/g, "$1 ").substr(0, offset).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + start);
    }, self.keyCode = function(e) {
        return e = e || window.event, e.which || (e.keyCode || e.charCode);
    }, self.replaceTailString = function(url, obj, keepData) {
        var index = url.lastIndexOf(obj);
        return[url.substring(0, index), keepData, url.substring(index + obj.length, url.length)].join("");
    }, self;
}), define("js/yunpn/lib/EventObject", function() {
    /**
     * @return {undefined}
     */
    var EventEmitter = function() {
        this._eventListeners = {};
    };
    return EventEmitter.prototype = {
        /**
         * @param {string} name
         * @param {?} opt_attributes
         * @return {undefined}
         */
        fire : function(name, opt_attributes) {
            if (this._eventListeners === null) {
                return;
            }
            opt_attributes = opt_attributes || {};
            if (this._eventListeners[name]) {
                opt_attributes.evtTarget = this;
                /** @type {string} */
                opt_attributes.evtName = name;
                /** @type {number} */
                var i = 0;
                var ca = this._eventListeners[name];
                var len = ca.length;
                for (;i < len;i++) {
                    var c = ca[i];
                    c.call(this, opt_attributes);
                }
            }
        },
        /**
         * @param {string} type
         * @param {Function} fn
         * @return {?}
         */
        on : function(type, fn) {
            return this._eventListeners[type] || (this._eventListeners[type] = []), this._eventListeners[type].push(fn), this;
        },
        /**
         * @param {?} type
         * @param {?} fn
         * @return {?}
         */
        un : function(type, fn) {
            if (this._eventListeners[type]) {
                var listeners = this._eventListeners[type];
                /** @type {Array} */
                var out = [];
                /** @type {number} */
                var j = 0;
                var jl = listeners.length;
                for (;j < jl;j++) {
                    var copies = listeners[j];
                    if (copies != fn) {
                        out.push(copies);
                    }
                }
                /** @type {Array} */
                this._eventListeners[type] = out;
            }
            return this;
        },
        /**
         * @return {undefined}
         */
        __destroyListeners : function() {
            /** @type {null} */
            this._eventListeners = null;
        }
    }, EventEmitter;
}), define("js/yunpn/lib/AjaxDataProvider", ["js/components/amdbase", "js/yunpn/lib/EventObject"], function(jQuery, c) {
    /**
     * @param {number} key
     * @param {number} value
     * @return {?}
     */
    var data = function(key, value) {
        return{
            start : key,
            count : value
        };
    };
    var pos = jQuery.inherits(c, {
        /**
         * @param {?} options
         * @return {undefined}
         */
        constructor : function(options) {
            c.call(this);
            this.dataConf = options;
            this._init(options);
        },
        /**
         * @param {Object} options
         * @return {undefined}
         */
        _init : function(options) {
            this.dataUrl = options.url;
            this.paramHandler = options.paramHandler || data;
            this.dataHandler = options.dataHandler;
            this.pageSize = options.pageSize || 300;
            this.paramData = options.paramData || {};
            /** @type {Array} */
            this.pageDatas = [];
            /** @type {number} */
            this.curPageIdx = -1;
            /** @type {number} */
            this.totalFileCount = -1;
            /** @type {number} */
            this.totalPageCount = -1;
            /** @type {number} */
            this.maybeMaxPageIdx = 0;
            /** @type {boolean} */
            this.empty = false;
            /** @type {boolean} */
            this.needPager = false;
        },
        /**
         * @param {Object} opts
         * @return {undefined}
         */
        reset : function(opts) {
            this._init($.extend(true, this.dataConf, opts || {}));
        },
        /**
         * @return {?}
         */
        isEmpty : function() {
            return this.empty;
        },
        /**
         * @return {?}
         */
        getTotalFileCount : function() {
            return this.totalFileCount;
        },
        /**
         * @return {?}
         */
        getTotalPageCount : function() {
            return this.totalPageCount;
        },
        /**
         * @return {?}
         */
        isHasNextPage : function() {
            return this.maybeMaxPageIdx > this.curPageIdx || this.totalPageCount > this.curPageIdx + 1;
        },
        /**
         * @return {?}
         */
        isNeedPager : function() {
            return this.empty ? false : this.needPager;
        },
        /**
         * @return {?}
         */
        getPageIdx : function() {
            return this.curPageIdx;
        },
        /**
         * @return {?}
         */
        getCurPageCount : function() {
            return this.pageDatas[this.curPageIdx].length;
        },
        /**
         * @return {?}
         */
        getPageSize : function() {
            return this.pageSize;
        },
        /**
         * @param {Array} assertions
         * @return {undefined}
         */
        delFiles : function(assertions) {
            if (this.totalFileCount !== -1) {
                this.setTotalFileCount(this.totalFileCount - assertions.length);
            }
            var num = this.pageDatas[this.curPageIdx].length;
            this.pageDatas.length = this.curPageIdx;
            if (assertions.length >= num) {
                if (this.isHasNextPage()) {
                    this.setPageIdx();
                } else {
                    this.maybeMaxPageIdx -= 1;
                    this.setPageIdx(this.curPageIdx - 1);
                }
            } else {
                this.setPageIdx();
            }
        },
        /**
         * @param {number} startIndex
         * @return {undefined}
         */
        setTotalFileCount : function(startIndex) {
            if (startIndex > this.pageSize) {
                /** @type {boolean} */
                this.needPager = true;
            }
            /** @type {number} */
            this.totalFileCount = startIndex;
            /** @type {number} */
            this.totalPageCount = Math.ceil(startIndex / this.pageSize);
        },
        /**
         * @param {number} idx
         * @return {undefined}
         */
        setPageIdx : function(idx) {
            if (idx === undefined) {
                idx = this.curPageIdx;
            } else {
                if (idx == this.curPageIdx) {
                    return;
                }
            }
            this.curPageIdx = idx < 0 ? 0 : idx;
            var data = this;
            /** @type {null} */
            var suiteView = null;
            if (suiteView = data.pageDatas[data.curPageIdx]) {
                data._fireDataPageSwitch(suiteView);
            } else {
                /** @type {number} */
                var last = data.curPageIdx * data.pageSize;
                var pdataOld = data.pageSize + 1;
                var restoreScript = $.extend({}, data.paramData, data.paramHandler(last, pdataOld));
                data.fire("dataloadstart");
                jQuery.ajaxSubmit(data.dataUrl, restoreScript, function(inplace) {
                    var newData = data.dataHandler(inplace);
                    if (newData.length == 0 && data.curPageIdx > 0) {
                        data.setPageIdx(data.curPageIdx - 1);
                        return;
                    }
                    if (newData.length == 0 && data.curPageIdx == 0) {
                        /** @type {boolean} */
                        data.empty = true;
                        data.fire("dataempty");
                        return;
                    }
                    if (newData.length > data.pageSize) {
                        newData.length = data.pageSize;
                        /** @type {boolean} */
                        data.needPager = true;
                        if (data.curPageIdx + 1 > data.maybeMaxPageIdx) {
                            data.maybeMaxPageIdx = data.curPageIdx + 1;
                        }
                    } else {
                        data.maybeMaxPageIdx = data.curPageIdx;
                        if (data.curPageIdx == 0) {
                            /** @type {boolean} */
                            data.needPager = false;
                        }
                    }
                    if (data.totalFileCount >= 0) {
                        if (data.totalFileCount > data.pageSize) {
                            /** @type {boolean} */
                            data.needPager = true;
                        }
                    }
                    data.pageDatas[data.curPageIdx] = newData;
                    data._fireDataPageSwitch(newData);
                }, function(e, statusCode) {
                    /** @type {boolean} */
                    data.empty = true;
                    data.fire("dataloaderror", {
                        e : e,
                        status : statusCode
                    });
                });
            }
        },
        /**
         * @return {undefined}
         */
        destroy : function() {
            /** @type {null} */
            this.pageDatas = null;
        },
        /**
         * @param {(Array|string)} obj
         * @return {undefined}
         */
        _fireDataPageSwitch : function(obj) {
            var notifier = this;
            notifier.fire("datapageswitch", {
                curPageIdx : notifier.curPageIdx,
                pageData : obj,
                totalFileCount : notifier.totalFileCount,
                totalPageCount : notifier.totalPageCount,
                isHasNextPage : notifier.isHasNextPage()
            });
        }
    });
    return pos;
}), define("js/yunpn/lib/amdfileType", function() {
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
        var hash = next(elem);
        return files[hash] ? hash : "file";
    }
    /**
     * @param {string} elem
     * @return {?}
     */
    function empty(elem) {
        var hash = next(elem);
        return files[hash] ? files[hash] : "file";
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
            default:
                return "\u672a\u77e5\u6587\u4ef6";
        }
    }
    var files = {
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
        fla : "swf",
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
}), define("js/yunpn/lib/viewobj/BaseViewObj", ["js/components/amdbase", "js/yunpn/lib/EventObject"], function(util, c) {
    /** @type {number} */
    var v_ = 0;
    var obj = {};
    var ctx = util.inherits(c, {
        /**
         * @return {undefined}
         */
        constructor : function() {
            c.call(this);
            /** @type {string} */
            this.id = "v_" + v_++;
            /** @type {null} */
            this.containerNode = null;
            /** @type {boolean} */
            this.destroied = false;
            obj[this.id] = this;
        },
        /**
         * @param {?} deepDataAndEvents
         * @return {undefined}
         */
        setContainerNode : function(deepDataAndEvents) {
            this.containerNode = $(deepDataAndEvents);
        },
        /**
         * @return {undefined}
         */
        destroy : function() {
            this.__destroy();
            this.__destroyListeners();
            /** @type {boolean} */
            this.destroied = true;
        },
        /**
         * @return {undefined}
         */
        __destroy : function() {
        },
        /**
         * @return {undefined}
         */
        delegate : function() {
            this.getContainerNode();
            this.containerNode.delegate.apply(this.containerNode, arguments);
        },
        /**
         * @param {string} type
         * @return {?}
         */
        find : function(type) {
            return this.getContainerNode(), this.containerNode.find(type);
        },
        /**
         * @return {?}
         */
        getContainerNode : function() {
            if (!this.containerNode) {
                /** @type {null} */
                var li = null;
                if (!(li = document.getElementById(this.id))) {
                    throw new Error("you muse set container node before.");
                }
                this.containerNode = $(li);
                /** @type {null} */
                li = null;
            }
            return this.containerNode;
        }
    });
    return ctx.instanceCall = function(implementation, name, args) {
        var cache = obj[implementation];
        if (cache && cache[name]) {
            /** @type {Array} */
            args = [];
            /** @type {number} */
            var i = 2;
            /** @type {number} */
            var argLength = arguments.length;
            for (;i < argLength;i++) {
                args.push(arguments[i]);
            }
            return cache[name].apply(cache, args);
        }
    }, window.g_viewInstCall = ctx.instanceCall, ctx;
}), define("js/yunpn/lib/viewobj/BaseThumb", ["js/components/amdbase", "js/yunpn/lib/viewobj/BaseViewObj"], function(dojo, c) {
    /** @type {string} */
    var str = ['<li class="mod-imgthumb #{config.customClass}" id="#{id}">', "#{__getContentHtml}", "#{__getExtraHtml}</li>"].join("");
    var pos = dojo.inherits(c, {
        /**
         * @param {?} config
         * @return {undefined}
         */
        constructor : function(config) {
            c.call(this);
            this.config = $.extend(true, {
                href : "#",
                onclick : "return false;"
            }, config);
        },
        /**
         * @param {?} d
         * @return {undefined}
         */
        display : function(d) {
            var input = dojo.formatString(str, this);
            $(d).append(input);
            var __afterDisplay = this;
            setTimeout(function() {
                __afterDisplay.__afterDisplay();
            }, 50);
        },
        /**
         * @return {undefined}
         */
        __destroy : function() {
            this.getContainerNode().remove();
            /** @type {null} */
            this.config = null;
            this.__destroyListeners();
        },
        __afterDisplay : $.noop,
        __getExtraHtml : $.noop,
        __getContentHtml : dojo.abstractFunc("__getContentHtml")
    });
    return pos;
}), define("js/yunpn/lib/viewobj/ImgThumb", ["js/components/amdbase", "js/yunpn/lib/viewobj/BaseThumb"], function(util, c) {
    /** @type {string} */
    var formatString = '<img class="imgthumb-img #{config.image.customClass}" #{lazyload}="#{config.image.src}" onerror="g_viewInstCall(\'#{id}\',\'imgOnerror\')"/>';
    /** @type {string} */
    var img = '<#{config.image.tagName} class="imgthumb-img #{config.image.customClass}"></#{config.image.tagName}>';
    /** @type {string} */
    var str = ['<div class="column column-checkbox imgthumb-checkbox">', "<label></label>", "</div>", '<div class="column column-name">', '<span class="imgthumb-imgwrap ico #{config.thumbCls}">', '<span class="imgthumb-vertical"></span>', "#{imgHtml}", "</span>", '<span class="text imgthumb-link name" title="#{config.name}">#{config.name}</span>', "</div>", "#{config.overlayHTML}"].join("");
    /** @type {string} */
    defaultImg = "http://p2.qhimg.com/t01b15ab2de587e624d.gif";
    /** @type {string} */
    blankImg = "http://p3.qhimg.com/t01016d991788e49c4a.gif";
    var pos = util.inherits(c, {
        /**
         * @param {Text} options
         * @param {?} data
         * @return {undefined}
         */
        constructor : function(options, data) {
            options = $.extend(true, {
                image : {
                    tagName : "img",
                    lazyload : true,
                    customClass : ""
                },
                showChechbox : false
            }, options);
            c.call(this, options);
            this.data = data;
            /** @type {boolean} */
            this.checked = false;
            /** @type {boolean} */
            this._imgOnerrCalled = false;
        },
        /**
         * @param {boolean} flag
         * @return {?}
         */
        setChecked : function(flag) {
            var elem = this;
            flag = flag === undefined ? !elem.checked : flag;
            return flag === elem.checked ? flag : (elem.getContainerNode()[flag ? "addClass" : "removeClass"]("active"), elem.checked = flag, flag);
        },
        /**
         * @return {undefined}
         */
        showRename : function() {
            var field = this;
            var rule = field.getContainerNode();
            var poster = rule.find(".imgthumb-link");
            var form = rule.find(".edit-name");
            var textEl = form.find("input");
            textEl.val(field.data.file_name);
            poster.hide();
            form.show();
            field.setChecked();
        },
        /**
         * @param {string} keepData
         * @return {undefined}
         */
        restoreFromRename : function(keepData) {
            var m = this;
            var rule = m.getContainerNode();
            var el = rule.find(".imgthumb-link");
            var form = rule.find(".edit-name");
            var matched = form.find("input");
            form.hide();
            el.show();
            if (keepData) {
                m.fire("nameChanged", {
                    newName : keepData
                });
                el.html(keepData.encode4Html());
                el.attr("title", keepData.encode4Html());
                el.parents(".column-name").attr("title", keepData.encode4Html());
            }
        },
        /**
         * @return {undefined}
         */
        changePath : function() {
            var m = this;
            var rule = m.getContainerNode();
            var context = rule.find(".column-path");
            context.html(util.getFolderName(m.data.file_location).encode4Html());
            context.attr("title", util.getFolderName(m.data.file_location).encode4Html());
        },
        /**
         * @return {undefined}
         */
        __afterDisplay : function() {
            var self = this;
            self.config.showChechbox;
            var element = self.getContainerNode();
            element.on("click", function(dataAndEvents) {
                self.setChecked();
                self.fire("checkboxclick", {
                    checked : self.checked
                });
            });
            element.on("dblclick", function(event) {
                event.preventDefault();
                event.stopPropagation();
                self.fire("nameclick");
            });
            element.on("mouseenter", function(dataAndEvents) {
                self.fire("mouseenter");
            });
            element.on("mouseleave", function(dataAndEvents) {
                self.fire("mouseleave");
            });
            self.delegate(".imgthumb-link", "click", function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.fire("nameclick");
            });
            self.delegate(".column-path", "click", function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.fire("pathclick");
            });
            self.delegate(".icon-play", "click", function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.fire("nameclick");
            });
            self.delegate(".edit-name", "click", function(event) {
                event.stopPropagation();
                event.preventDefault();
            });
            self.delegate(".edit-name", "mouseenter", function(event) {
                event.stopPropagation();
                event.preventDefault();
            });
            self.delegate(".edit-name input", "focus", function(event) {
                event.stopPropagation();
                event.preventDefault();
            });
            self.delegate(".edit-name .accept", "click", function(dataAndEvents) {
                self.fire("renameaccept", {
                    newName : element.find(".edit-name input").val()
                });
            });
            self.delegate(".edit-name .cancel", "click", function(dataAndEvents) {
                self.restoreFromRename();
            });
            self.delegate(".edit-name input", "keyup", function(event) {
                if (event.keyCode == 13) {
                    self.fire("renameaccept", {
                        newName : element.find(".edit-name input").val()
                    });
                }
            });
        },
        /**
         * @return {undefined}
         */
        imgOnerror : function() {
            var module = this;
            if (this._imgOnerrCalled) {
                return;
            }
            /** @type {boolean} */
            this._imgOnerrCalled = true;
            this.find("img.imgthumb-img").hide();
            this.find(".imgthumb-imgwrap").addClass("ico-" + module.config.fileType);
        },
        /**
         * @return {?}
         */
        __getContentHtml : function() {
            var data = this;
            return util.formatString(str, this, {
                imgHtml : util.formatString(data.config.image.tagName == "img" ? formatString : img, data, {
                    lazyload : data.config.image.lazyload ? "data-imgurl" : "src"
                }),
                /**
                 * @return {?}
                 */
                checkboxStyle : function() {
                    return data.config.showChechbox ? "" : 'style="display:none"';
                }
            });
        },
        /**
         * @return {?}
         */
        __getExtraHtml : function() {
            return this.config.extraHtml;
        }
    });
    return pos;
}), define("js/yunpn/lib/ThumbDataManager", ["js/components/amdbase", "js/yunpn/lib/EventObject"], function(util, c) {
    var pos = util.inherits(c, {
        /**
         * @return {undefined}
         */
        constructor : function() {
            c.call(this);
            this.thumbCaches = {};
            /** @type {null} */
            this._addThumbTimeout = null;
        },
        /**
         * @param {Object} item
         * @param {string} category
         * @return {undefined}
         */
        addThumb : function(item, category) {
            var Y = this;
            category = category || "default";
            if (!this.thumbCaches[category]) {
                /** @type {Array} */
                this.thumbCaches[category] = [];
            }
            this.thumbCaches[category].push(item);
            item.on("checkboxclick", function(attributes) {
                Y.fire("statuschange", attributes);
            });
        },
        /**
         * @param {Array} values
         * @param {string} deepDataAndEvents
         * @return {undefined}
         */
        delThumbByData : function(values, deepDataAndEvents) {
            var map = {};
            /** @type {number} */
            var i = 0;
            var valuesLen = values.length;
            for (;i < valuesLen;i++) {
                /** @type {boolean} */
                map[values[i].nid] = true;
            }
            this.eachThumb(function(e) {
                var objUid = e.data.nid;
                if (map[objUid]) {
                    e.destroy();
                }
            }, deepDataAndEvents);
        },
        /**
         * @param {string} deepDataAndEvents
         * @return {?}
         */
        getSelectData : function(deepDataAndEvents) {
            /** @type {Array} */
            var workersData = [];
            /** @type {Array} */
            var elementQueueSnapshot = [];
            var r = this;
            /** @type {number} */
            var countInfo = 0;
            return this.eachThumb(function(elm) {
                countInfo++;
                if (elm.checked) {
                    workersData.push(elm.data);
                    elementQueueSnapshot.push(elm);
                }
            }, deepDataAndEvents), {
                count : countInfo,
                data : workersData,
                thumbs : elementQueueSnapshot
            };
        },
        /**
         * @param {boolean} checked
         * @param {string} deepDataAndEvents
         * @return {undefined}
         */
        setSelectAll : function(checked, deepDataAndEvents) {
            if (this.thumbCaches == null) {
                return;
            }
            this.eachThumb(function(field) {
                field.setChecked(checked);
            }, deepDataAndEvents);
            this.fire("statuschange");
        },
        /**
         * @param {Function} fail
         * @param {string} deepDataAndEvents
         * @return {undefined}
         */
        eachThumb : function(fail, deepDataAndEvents) {
            var expected;
            for (expected in this.thumbCaches) {
                if (deepDataAndEvents && deepDataAndEvents != expected) {
                    continue;
                }
                var coverage = this.thumbCaches[expected];
                /** @type {number} */
                var line = 0;
                var length = coverage.length;
                for (;line < length;line++) {
                    var value = coverage[line];
                    if (!value) {
                        continue;
                    }
                    if (value.destroied) {
                        /** @type {null} */
                        coverage[line] = null;
                        continue;
                    }
                    fail(value, expected, line);
                }
            }
        },
        /**
         * @return {undefined}
         */
        reset : function() {
            this.thumbCaches = {};
        },
        /**
         * @return {undefined}
         */
        destroy : function() {
            /** @type {null} */
            this.thumbCaches = null;
        }
    });
    return pos;
}), define("js/yunpn/lib/viewobj/NextPager", ["js/components/amdbase", "js/yunpn/lib/viewobj/BaseViewObj"], function($, c) {
    /** @type {string} */
    var str = ['<div class="mod-nextpager page-nav" id="#{id}">', '<span class="nextpager-info"></span>', '<a href="#" class="nextpager-btn nextpager-btn-prev" onclick="g_viewInstCall(\'#{id}\',\'prevPage\');return false">&lt;\u4e0a\u4e00\u9875</a>', '<a href="#" class="nextpager-btn nextpager-btn-next" onclick="g_viewInstCall(\'#{id}\',\'nextPage\');return false">\u4e0b\u4e00\u9875&gt;</a>', "</div>"].join("");
    var pos = $.inherits(c, {
        /**
         * @param {?} config
         * @param {Object} chart
         * @return {undefined}
         */
        constructor : function(config, chart) {
            c.call(this);
            this.containerNode = $(config);
            /** @type {Object} */
            this.dataProvider = chart;
            /** @type {number} */
            this.curPageIdx = 0;
            /** @type {boolean} */
            this.prevEnable = false;
            /** @type {boolean} */
            this.nextEnable = false;
        },
        /**
         * @return {undefined}
         */
        display : function() {
            var t = this;
            this.containerNode.html($.formatString(str, this));
            this.update();
        },
        /**
         * @return {undefined}
         */
        update : function() {
            var dataProvider = this.dataProvider;
            if (this.dataProvider.isNeedPager()) {
                this.show();
                this.setPager(dataProvider.getPageIdx(), dataProvider.isHasNextPage(), dataProvider.getCurPageCount());
            } else {
                this.hide();
            }
        },
        /**
         * @param {number} value
         * @param {boolean} dataAndEvents
         * @param {string} tp
         * @return {undefined}
         */
        setPager : function(value, dataAndEvents, tp) {
            /** @type {number} */
            this.curPageIdx = value;
            /** @type {boolean} */
            this.prevEnable = value > 0;
            /** @type {boolean} */
            this.nextEnable = dataAndEvents;
            this.find(".nextpager-btn-prev")[this.prevEnable ? "addClass" : "removeClass"]("enable");
            this.find(".nextpager-btn-next")[this.nextEnable ? "addClass" : "removeClass"]("enable");
            this.find(".nextpager-info").html("\u5f53\u9875\u5df2\u52a0\u8f7d" + tp + "\u6761");
        },
        /**
         * @return {undefined}
         */
        nextPage : function() {
            this.curPageIdx++;
            if (this.nextEnable) {
                this.dataProvider.setPageIdx(this.curPageIdx);
            }
        },
        /**
         * @return {undefined}
         */
        prevPage : function() {
            this.curPageIdx--;
            if (this.prevEnable) {
                this.dataProvider.setPageIdx(this.curPageIdx);
            }
        },
        /**
         * @return {undefined}
         */
        hide : function() {
            this.containerNode.hide();
        },
        /**
         * @return {undefined}
         */
        show : function() {
            this.containerNode.show();
        },
        /**
         * @return {undefined}
         */
        __destroy : function() {
            this.containerNode.html("");
        }
    });
    return pos;
}), define("js/pub/components/lazyLoad", function() {
    /**
     * @param {?} opts
     * @return {undefined}
     */
    var init = function(opts) {
        /**
         * @return {undefined}
         */
        function resize() {
            var scrollTop = viewportElement.scrollTop;
            if (Math.abs(scrollTop - self.scrollTop) > async) {
                self.scrollTop = scrollTop;
                self.loadImg();
            }
        }
        var options = this.options = $.extend(true, {
            threshold : 0,
            container : window,
            selector : "img",
            lazyLength : 25,
            type : "src"
        }, opts);
        this.container = $(options.container);
        this.images = this.container.find(options.selector).toArray();
        this.scrollTop = this.container[0].scrollTop;
        var self = this;
        var viewportElement = self.container[0];
        var async = options.lazyLength;
        var tref;
        /**
         * @return {undefined}
         */
        this._onScroll = function() {
            if (tref) {
                clearTimeout(tref);
                /** @type {null} */
                tref = null;
            }
            /** @type {number} */
            tref = setTimeout(resize, options.checkInterval);
        };
        if (!options.checkInterval) {
            /** @type {function (): undefined} */
            this._onScroll = resize;
        }
    };
    return init.prototype = {
        /**
         * @return {undefined}
         */
        start : function() {
            this.container.on("scroll", this._onScroll);
            this.loadImg();
        },
        /**
         * @return {undefined}
         */
        stop : function() {
            this.container.off("scroll", this._onScroll);
        },
        /**
         * @return {undefined}
         */
        loadImg : function() {
            if (this.images.length <= 0) {
                this.container.off("scroll", this._onScroll);
                return;
            }
            var e = this;
            /** @type {boolean} */
            var src = this.options.type == "src";
            ctn = this.container;
            ctnRect = ctn.offset();
            ctnRectTop = ctnRect.top;
            w = ctn.width();
            h = ctn.height();
            ctnRectBottom = ctnRectTop + h;
            ctnRectLeft = ctnRect.left;
            ctnRectRight = ctnRectLeft + w;
            threshold = this.options.threshold;
            /** @type {Array} */
            images = [];
            var handler = this.options.onLoadFunc ? this.options.onLoadFunc : null;
            this.images.forEach(function(image, dataAndEvents) {
                image = $(image);
                var paddingBox = image.offset();
                if (paddingBox.bottom + threshold < ctnRectTop || (paddingBox.top - threshold > ctnRectBottom || (paddingBox.right + threshold < ctnRectLeft || paddingBox.left - threshold > ctnRectRight))) {
                    images.push(image);
                } else {
                    if (handler) {
                        image.on("load", handler);
                    }
                    if (src) {
                        image.attr("src", image.attr("data-imgurl"));
                    } else {
                        image.css("background-image", "url(" + image.attr("data-imgurl") + ")");
                    }
                }
            });
            /** @type {Array} */
            this.images = images;
        }
    }, init;
}), define("js/yunpn/lib/viewobj/ThumbPagerContainer", ["js/components/amdbase", "js/yunpn/lib/ThumbDataManager", "js/yunpn/lib/viewobj/BaseViewObj", "js/yunpn/lib/viewobj/NextPager", "js/pub/components/lazyLoad"], function(oo, VCFTabixDriver, _super, dataAndEvents, Client) {
    /** @type {string} */
    var key = '<div id="#{id}" class="thumbcontainer-before clearfix #{config.beforeCls}">#{config.beforeHTML}</div><div class="thumbcontainer-content"><ul class="thumbcontainer-list"></ul><div class="thumbcontainer-pager clear"></div></div>';
    var prototype = oo.inherits(_super, {
        /**
         * @param {?} deepDataAndEvents
         * @param {?} config
         * @return {undefined}
         */
        constructor : function(deepDataAndEvents, config) {
            _super.call(this);
            this.config = $.extend({
                padding : {
                    top : 0,
                    right : 0,
                    bottom : 0,
                    left : 0
                },
                totalCount : false
            }, config);
            this.setContainerNode(deepDataAndEvents);
            this.containerNode.html(oo.formatString(key, this));
            this.beforeNode = this.find(".thumbcontainer-before");
            this.listNode = this.find(".thumbcontainer-list");
            this.pagerNode = this.find(".thumbcontainer-pager");
            this.thumbDataManager = new VCFTabixDriver;
            /** @type {null} */
            this.dataProvider = null;
            /** @type {null} */
            this.thumbHandler = null;
            /** @type {null} */
            this.pager = null;
            /** @type {null} */
            this.lazyloader = null;
            /** @type {boolean} */
            this._pagerInited = false;
        },
        /**
         * @param {Object} dataProvider
         * @return {undefined}
         */
        setDataProvider : function(dataProvider) {
            var self = this;
            self.listNode.html("");
            self.pagerNode.html("");
            /** @type {Object} */
            this.dataProvider = dataProvider;
            this.pager = new dataAndEvents(this.find(".thumbcontainer-pager"), this.dataProvider);
            this.dataProvider.on("datapageswitch", function(opts) {
                self.containerNode.removeClass("category-list-empty");
                self.thumbDataManager.reset();
                if (self.lazyloader) {
                    self.lazyloader.stop();
                }
                var ids = opts.pageData;
                var timeout = opts.curPageIdx;
                var year = oo.getDocFrag();
                /** @type {number} */
                var i = 0;
                var len = ids.length;
                for (;i < len;i++) {
                    var result = self.thumbHandler(ids[i]);
                    result.display(year);
                    self.thumbDataManager.addThumb(result);
                }
                self.listNode.html("").append(year);
                if (self._pagerInited) {
                    self.pager.update();
                } else {
                    self.pager.display();
                    /** @type {boolean} */
                    self._pagerInited = true;
                }
                setTimeout(function() {
                    self.lazyloader = new Client({
                        threshold : 100,
                        container : self.find(".thumbcontainer-content"),
                        selector : "img"
                    });
                    self.lazyloader.start();
                }, 10);
            }).on("dataempty", function() {
                self.listNode.html("");
                self.containerNode.addClass("category-list-empty");
                self.pager.update();
            }).on("dataloaderror", function() {
                self.listNode.html("");
                self.containerNode.addClass("category-list-empty");
                self.pager.update();
            });
        },
        /**
         * @param {Function} dataAndEvents
         * @return {undefined}
         */
        setThumbHandler : function(dataAndEvents) {
            /** @type {Function} */
            this.thumbHandler = dataAndEvents;
        },
        /**
         * @param {string} part
         * @return {undefined}
         */
        setListMode : function(part) {
            this.getContainerNode().removeClass("mod-listmod-list list-list").removeClass("mod-listmod-thumb ico-list").addClass("mod-listmod-" + part + (part == "list" ? " list-list" : " ico-list"));
        },
        /**
         * @return {undefined}
         */
        display : function() {
            this.dataProvider.setPageIdx(0);
        },
        /**
         * @return {undefined}
         */
        hide : function() {
            this.getContainerNode().hide();
            this.lazyloader.stop();
            this.listNode.html("");
        },
        /**
         * @return {undefined}
         */
        show : function() {
            this.getContainerNode().show();
        },
        /**
         * @return {?}
         */
        getListContainerNode : function() {
            return this.find(".thumbcontainer-content");
        }
    });
    return prototype;
}), define("js/pub/components/store", function() {
    /**
     * @return {?}
     */
    function tryIt() {
        try {
            return localStorageName in win && win[localStorageName];
        } catch (e) {
            return false;
        }
    }
    /** @type {Window} */
    var win = window;
    var store = {};
    /** @type {Document} */
    var doc = win.document;
    /** @type {string} */
    var localStorageName = "localStorage";
    /** @type {string} */
    var scriptTag = "script";
    var storage;
    /** @type {boolean} */
    store.disabled = false;
    /**
     * @param {string} key
     * @param {Object} defaultVal
     * @param {Function} transactionFn
     * @return {undefined}
     */
    store.transact = function(key, defaultVal, transactionFn) {
        var camelKey = store.get(key);
        if (transactionFn == null) {
            /** @type {Object} */
            transactionFn = defaultVal;
            /** @type {null} */
            defaultVal = null;
        }
        if (typeof camelKey == "undefined") {
            camelKey = defaultVal || {};
        }
        transactionFn(camelKey);
        store.set(key, camelKey);
    };
    /**
     * @param {number} object
     * @return {?}
     */
    store.serialize = function(object) {
        return JSON ? JSON.stringify(object) : Object.stringify(object);
    };
    /**
     * @param {Function} data
     * @return {?}
     */
    store.deserialize = function(data) {
        if (typeof data != "string") {
            return undefined;
        }
        try {
            return JSON ? JSON.parse(data) : data.evalExp();
        } catch (t) {
            return data || undefined;
        }
    };
    if (tryIt()) {
        storage = win[localStorageName];
        /**
         * @param {string} key
         * @param {number} value
         * @return {?}
         */
        store.set = function(key, value) {
            return value === undefined ? store.remove(key) : (storage.setItem(key, store.serialize(value)), value);
        };
        /**
         * @param {string} key
         * @return {?}
         */
        store.get = function(key) {
            return store.deserialize(storage.getItem(key));
        };
        /**
         * @param {string} key
         * @return {undefined}
         */
        store.remove = function(key) {
            storage.removeItem(key);
        };
        /**
         * @return {undefined}
         */
        store.clear = function() {
            storage.clear();
        };
        /**
         * @return {?}
         */
        store.getAll = function() {
            var uidList = {};
            return store.forEach(function(uid, o) {
                uidList[uid] = o;
            }), uidList;
        };
        /**
         * @param {Function} callback
         * @return {undefined}
         */
        store.forEach = function(callback) {
            /** @type {number} */
            var i = 0;
            for (;i < storage.length;i++) {
                var key = storage.key(i);
                callback(key, store.get(key));
            }
        };
    } else {
        if (doc.documentElement.addBehavior) {
            var root;
            var storageContainer;
            try {
                storageContainer = new ActiveXObject("htmlfile");
                storageContainer.open();
                storageContainer.write("<" + scriptTag + ">document.w=window</" + scriptTag + '><iframe src="/favicon.ico"></iframe>');
                storageContainer.close();
                root = storageContainer.w.frames[0].document;
                storage = root.createElement("div");
            } catch (f) {
                /** @type {Element} */
                storage = doc.createElement("div");
                /** @type {(HTMLBodyElement|null)} */
                root = doc.body;
            }
            /**
             * @param {Function} storeFunction
             * @return {?}
             */
            var withIEStorage = function(storeFunction) {
                return function() {
                    /** @type {Array.<?>} */
                    var args = Array.prototype.slice.call(arguments, 0);
                    args.unshift(storage);
                    root.appendChild(storage);
                    storage.addBehavior("#default#userData");
                    storage.load(localStorageName);
                    var result = storeFunction.apply(store, args);
                    return root.removeChild(storage), result;
                };
            };
            /** @type {RegExp} */
            var escapeSequence = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
            /**
             * @param {string} out
             * @return {?}
             */
            var cleanConditionalComment = function(out) {
                return out.replace(/^d/, "___$&").replace(escapeSequence, "___");
            };
            store.set = withIEStorage(function(storage, b, val) {
                return b = cleanConditionalComment(b), val === undefined ? store.remove(b) : (storage.setAttribute(b, store.serialize(val)), storage.save(localStorageName), val);
            });
            store.get = withIEStorage(function(child, text) {
                return text = cleanConditionalComment(text), store.deserialize(child.getAttribute(text));
            });
            store.remove = withIEStorage(function(block, text) {
                text = cleanConditionalComment(text);
                block.removeAttribute(text);
                block.save(localStorageName);
            });
            store.clear = withIEStorage(function(storage) {
                var attrs = storage.XMLDocument.documentElement.attributes;
                storage.load(localStorageName);
                /** @type {number} */
                var i = 0;
                var attr;
                for (;attr = attrs[i];i++) {
                    storage.removeAttribute(attr.name);
                }
                storage.save(localStorageName);
            });
            /**
             * @param {?} context
             * @return {?}
             */
            store.getAll = function(context) {
                var myAt = {};
                return store.forEach(function(i, offsetPosition) {
                    myAt[i] = offsetPosition;
                }), myAt;
            };
            store.forEach = withIEStorage(function(storage, callback) {
                var attrs = storage.XMLDocument.documentElement.attributes;
                /** @type {number} */
                var i = 0;
                var attr;
                for (;attr = attrs[i];++i) {
                    callback(attr.name, store.deserialize(storage.getAttribute(attr.name)));
                }
            });
        } else {
            /** @type {boolean} */
            store.disabled = true;
        }
    }
    return store;
}), function() {
    if (typeof $ == "undefined") {
        $ = {};
    }
}(), function() {
    var assert = {
        /**
         * @param {string} string1
         * @return {?}
         */
        trim : function(string1) {
            return string1.replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "");
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
            var handlers = {};
            /** @type {string} */
            var startAngle = "sArrCMX";
            /** @type {string} */
            var angle = startAngle + '.push("';
            var queue = {
                "=" : {
                    tagG : "=",
                    isBgn : 1,
                    isEnd : 1,
                    sBgn : '",$.StringH.encode4HtmlValue(',
                    sEnd : '),"'
                },
                js : {
                    tagG : "js",
                    isBgn : 1,
                    isEnd : 1,
                    sBgn : '");',
                    sEnd : ";" + angle
                },
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
            return function(code, elmt) {
                var handler = handlers[code];
                if (!handler) {
                    /** @type {number} */
                    var j = -1;
                    /** @type {Array} */
                    var keys = [];
                    /** @type {Array} */
                    var codeSegments = [[/\{strip\}([\s\S]*?)\{\/strip\}/g, function(dataAndEvents, messageFormat) {
                        return messageFormat.replace(/[\r\n]\s*\}/g, " }").replace(/[\r\n]\s*/g, "");
                    }], [/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\{[\s\S]*?\S\}/g, function(url) {
                        url = url.substr(1, url.length - 2);
                        /** @type {number} */
                        var i = 0;
                        for (;i < resultItems.length;i++) {
                            url = url.replace(resultItems[i][0], resultItems[i][1]);
                        }
                        /** @type {string} */
                        var name = url;
                        if (/^(=|.\w+)/.test(name)) {
                            /** @type {string} */
                            name = RegExp.$1;
                        }
                        var node = queue[name];
                        if (node) {
                            if (node.isBgn) {
                                var key = keys[++j] = {
                                    tagG : node.tagG,
                                    rlt : node.rlt
                                }
                            }
                            if (node.isEnd) {
                                if (j < 0) {
                                    throw new Error("Unexpected Tag: " + url);
                                }
                                key = keys[j--];
                                if (key.tagG != node.tagG) {
                                    throw new Error("Unmatch Tags: " + key.tagG + "--" + name);
                                }
                            } else {
                                if (!node.isBgn) {
                                    if (j < 0) {
                                        throw new Error("Unexpected Tag:" + url);
                                    }
                                    key = keys[j];
                                    if (key.tagG != node.tagG) {
                                        throw new Error("Unmatch Tags: " + key.tagG + "--" + name);
                                    }
                                    if (node.cond && !(node.cond & key.rlt)) {
                                        throw new Error("Unexpected Tag: " + name);
                                    }
                                    key.rlt = node.rlt;
                                }
                            }
                            return(node.sBgn || "") + url.substr(name.length) + (node.sEnd || "");
                        }
                        return'",(' + url + '),"';
                    }]];
                    /** @type {Array} */
                    var resultItems = [[/\\n/g, "\n"], [/\\r/g, "\r"], [/\\"/g, '"'], [/\\\\/g, "\\"], [/\$(\w+)/g, 'opts["$1"]'], [/print\(/g, startAngle + ".push("]];
                    /** @type {number} */
                    var i = 0;
                    for (;i < codeSegments.length;i++) {
                        code = code.replace(codeSegments[i][0], codeSegments[i][1]);
                    }
                    if (j >= 0) {
                        throw new Error("Lose end Tag: " + keys[j].tagG);
                    }
                    code = code.replace(/##7b/g, "{").replace(/##7d/g, "}").replace(/##23/g, "#");
                    /** @type {string} */
                    code = "var " + startAngle + "=[];" + angle + code + '");return ' + startAngle + '.join("");';
                    /** @type {Function} */
                    handlers[code] = handler = new Function("opts", code);
                }
                return arguments.length > 1 ? handler(elmt) : handler;
            };
        }(),
        /**
         * @param {string} arr
         * @param {Object} item
         * @return {?}
         */
        contains : function(arr, item) {
            return arr.indexOf(item) > -1;
        },
        /**
         * @param {string} boundary
         * @return {?}
         */
        dbc2sbc : function(boundary) {
            return assert.mulReplace(boundary, [[/[\uff01-\uff5e]/g, function(a) {
                return String.fromCharCode(a.charCodeAt(0) - 65248);
            }], [/\u3000/g, " "], [/\u3002/g, "."]]);
        },
        /**
         * @param {string} str
         * @return {?}
         */
        byteLen : function(str) {
            return str.replace(/[^\x00-\xff]/g, "--").length;
        },
        /**
         * @param {string} self
         * @param {?} length
         * @param {string} pattern
         * @return {?}
         */
        subByte : function(self, length, pattern) {
            return assert.byteLen(self) <= length ? self : (pattern = pattern || "", length -= assert.byteLen(pattern), self.substr(0, length).replace(/([^\x00-\xff])/g, "$1 ").substr(0, length).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + pattern);
        },
        /**
         * @param {string} str
         * @return {?}
         */
        camelize : function(str) {
            return str.replace(/\-(\w)/ig, function(dataAndEvents, letter) {
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
         * @param {string} boundary
         * @return {?}
         */
        encode4Js : function(boundary) {
            return assert.mulReplace(boundary, [[/\\/g, "\\u005C"], [/"/g, "\\u0022"], [/'/g, "\\u0027"], [/\//g, "\\u002F"], [/\r/g, "\\u000A"], [/\n/g, "\\u000D"], [/\t/g, "\\u0009"]]);
        },
        /**
         * @param {Object} str
         * @return {?}
         */
        escapeChars : function(str) {
            return assert.mulReplace(str, [[/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\t/g, "\\t"]]);
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
         * @param {?} s
         * @return {?}
         */
        encode4Html : function(s) {
            /** @type {Element} */
            var e = document.createElement("pre");
            /** @type {Text} */
            var n = document.createTextNode(s);
            return e.appendChild(n), e.innerHTML;
        },
        /**
         * @param {?} buf
         * @return {?}
         */
        encode4HtmlValue : function(buf) {
            return assert.encode4Html(buf).replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        },
        /**
         * @param {string} text
         * @return {?}
         */
        decode4Html : function(text) {
            /** @type {Element} */
            var elem = document.createElement("div");
            return elem.innerHTML = assert.stripTags(text), elem.childNodes[0] ? elem.childNodes[0].nodeValue || "" : "";
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
         * @param {string} data
         * @param {?} name
         * @return {?}
         */
        queryUrl : function(data, name) {
            data = data.replace(/^[^?=]*\?/ig, "").split("#")[0];
            var obj = {};
            return data.replace(/(^|&)([^&=]+)=([^&]*)/g, function(dataAndEvents, deepDataAndEvents, key, val) {
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
         * @param {string} returnVal
         * @return {?}
         */
        decodeURIJson : function(returnVal) {
            return assert.queryUrl(returnVal);
        }
    };
    $.StringH = assert;
}(), function() {
    /**
     * @param {?} object
     * @return {?}
     */
    function toString(object) {
        return object != null && object.constructor != null ? Object.prototype.toString.call(object).slice(8, -1) : "";
    }
    var floor = $.StringH.escapeChars;
    var self = {
        /**
         * @param {number} str
         * @return {?}
         */
        isString : function(str) {
            return toString(str) == "String";
        },
        /**
         * @param {string} obj
         * @return {?}
         */
        isFunction : function(obj) {
            return toString(obj) == "Function";
        },
        /**
         * @param {string} obj
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
         * @param {(Date|string)} value
         * @return {?}
         */
        isObject : function(value) {
            return value !== null && typeof value == "object";
        },
        /**
         * @param {?} obj
         * @return {?}
         */
        isPlainObject : function(obj) {
            return toString(obj) == "Object";
        },
        /**
         * @param {Object} obj
         * @return {?}
         */
        isElement : function(obj) {
            return!!obj && obj.nodeType == 1;
        },
        /**
         * @param {string} name
         * @param {string} value
         * @param {Array} data
         * @return {?}
         */
        set : function(name, value, data) {
            if (self.isArray(value)) {
                /** @type {number} */
                var i = 0;
                for (;i < value.length;i++) {
                    self.set(name, value[i], data[i]);
                }
            } else {
                if (self.isPlainObject(value)) {
                    for (i in value) {
                        self.set(name, i, value[i]);
                    }
                } else {
                    if (self.isFunction(value)) {
                        /** @type {Array.<?>} */
                        var args = [].slice.call(arguments, 1);
                        /** @type {string} */
                        args[0] = name;
                        value.apply(null, args);
                    } else {
                        var codeSegments = value.split(".");
                        /** @type {number} */
                        i = 0;
                        /** @type {string} */
                        var tmp = name;
                        /** @type {number} */
                        var padLength = codeSegments.length - 1;
                        for (;i < padLength;i++) {
                            tmp = tmp[codeSegments[i]];
                        }
                        /** @type {Array} */
                        tmp[codeSegments[i]] = data;
                    }
                }
            }
            return name;
        },
        /**
         * @param {string} elem
         * @param {string} s
         * @param {?} callback
         * @return {?}
         */
        get : function(elem, s, callback) {
            if (self.isArray(s)) {
                /** @type {Array} */
                var ret = [];
                var i;
                /** @type {number} */
                i = 0;
                for (;i < s.length;i++) {
                    ret[i] = self.get(elem, s[i], callback);
                }
            } else {
                if (self.isFunction(s)) {
                    /** @type {Array.<?>} */
                    var input = [].slice.call(arguments, 1);
                    return input[0] = elem, s.apply(null, input);
                }
                var codeSegments = s.split(".");
                /** @type {string} */
                ret = elem;
                /** @type {number} */
                i = 0;
                for (;i < codeSegments.length;i++) {
                    if (!callback && ret == null) {
                        return;
                    }
                    ret = ret[codeSegments[i]];
                }
            }
            return ret;
        },
        /**
         * @param {Function} obj
         * @param {(Array|string)} source
         * @param {boolean} merge
         * @return {?}
         */
        mix : function(obj, source, merge) {
            if (self.isArray(source)) {
                /** @type {number} */
                var i = 0;
                var il = source.length;
                for (;i < il;i++) {
                    self.mix(obj, source[i], merge);
                }
                return obj;
            }
            if (typeof merge == "function") {
                for (i in source) {
                    obj[i] = merge(obj[i], source[i], i);
                }
            } else {
                for (i in source) {
                    if (merge || !(obj[i] || i in obj)) {
                        obj[i] = source[i];
                    }
                }
            }
            return obj;
        },
        /**
         * @param {Object} array
         * @param {Function} fn
         * @param {?} thisArg
         * @return {?}
         */
        map : function(array, fn, thisArg) {
            var result = {};
            var index;
            for (index in array) {
                result[index] = fn.call(thisArg, array[index], index, array);
            }
            return result;
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
         * @param {Object} value
         * @return {?}
         */
        stringify : function(value) {
            if (value == null) {
                return "null";
            }
            if (typeof value != "string" && value.toJSON) {
                return value.toJSON();
            }
            var type = toString(value).toLowerCase();
            switch(type) {
                case "string":
                    return'"' + floor(value) + '"';
                case "number":
                    var requestUrl = value.toString();
                    return/N/.test(requestUrl) ? "null" : requestUrl;
                case "boolean":
                    return value.toString();
                case "date":
                    return "new Date(" + value.getTime() + ")";
                case "array":
                    /** @type {Array} */
                    var normalized = [];
                    /** @type {number} */
                    var j = 0;
                    for (;j < value.length;j++) {
                        normalized[j] = self.stringify(value[j]);
                    }
                    return "[" + normalized.join(",") + "]";
                case "object":
                    if (self.isPlainObject(value)) {
                        /** @type {Array} */
                        normalized = [];
                        for (j in value) {
                            normalized.push('"' + floor(j) + '":' + self.stringify(value[j]));
                        }
                        return "{" + normalized.join(",") + "}";
                    }
                    ;
            }
            return "null";
        },
        /**
         * @param {Object} params
         * @return {?}
         */
        encodeURIJson : function(params) {
            /** @type {Array} */
            var tagNameArr = [];
            var key;
            for (key in params) {
                if (params[key] == null) {
                    continue;
                }
                if (params[key] instanceof Array) {
                    /** @type {number} */
                    var i = 0;
                    for (;i < params[key].length;i++) {
                        tagNameArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key][i]));
                    }
                } else {
                    tagNameArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
                }
            }
            return tagNameArr.join("&");
        }
    };
    $.ObjectH = self;
}(), function() {
    var text = $.ObjectH.isArray;
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
         * @param {Array} a
         * @param {Function} fn
         * @param {?} thisv
         * @return {undefined}
         */
        forEach : function(a, fn, thisv) {
            /** @type {number} */
            var i = 0;
            var aLength = a.length;
            for (;i < aLength;i++) {
                if (i in a) {
                    fn.call(thisv, a[i], i, a);
                }
            }
        },
        /**
         * @param {Array} array
         * @param {Function} fn
         * @param {?} bind
         * @return {?}
         */
        filter : function(array, fn, bind) {
            /** @type {Array} */
            var results = [];
            /** @type {number} */
            var i = 0;
            var array_length = array.length;
            for (;i < array_length;i++) {
                if (i in array) {
                    if (fn.call(bind, array[i], i, array)) {
                        results.push(array[i]);
                    }
                }
            }
            return results;
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
         * @param {Array} arr
         * @param {?} obj
         * @param {number} i
         * @return {?}
         */
        indexOf : function(arr, obj, i) {
            var ii = arr.length;
            i |= 0;
            if (i < 0) {
                i += ii;
            }
            if (i < 0) {
                /** @type {number} */
                i = 0;
            }
            for (;i < ii;i++) {
                if (i in arr && arr[i] === obj) {
                    return i;
                }
            }
            return-1;
        },
        /**
         * @param {Array} t
         * @param {?} searchElement
         * @param {number} k
         * @return {?}
         */
        lastIndexOf : function(t, searchElement, k) {
            var len = t.length;
            k |= 0;
            if (!k || k >= len) {
                /** @type {number} */
                k = len - 1;
            }
            if (k < 0) {
                k += len;
            }
            for (;k > -1;k--) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return-1;
        },
        /**
         * @param {Object} m
         * @param {?} obj
         * @return {?}
         */
        contains : function(m, obj) {
            return self.indexOf(m, obj) >= 0;
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
         * @param {Array} a
         * @param {?} keepData
         * @return {?}
         */
        remove : function(a, keepData) {
            /** @type {number} */
            var found = -1;
            /** @type {number} */
            var i = 1;
            for (;i < arguments.length;i++) {
                var t = arguments[i];
                /** @type {number} */
                var j = 0;
                for (;j < a.length;j++) {
                    if (t === a[j]) {
                        if (found < 0) {
                            /** @type {number} */
                            found = j;
                        }
                        a.splice(j--, 1);
                    }
                }
            }
            return found;
        },
        /**
         * @param {Array} array
         * @return {?}
         */
        unique : function(array) {
            /** @type {Array} */
            var results = [];
            /** @type {null} */
            var value = null;
            /** @type {function ((Array.<T>|null|{length: number}), T, number=): number} */
            var callback = Array.indexOf || self.indexOf;
            /** @type {number} */
            var i = 0;
            var array_length = array.length;
            for (;i < array_length;i++) {
                if (callback(results, value = array[i]) < 0) {
                    results.push(value);
                }
            }
            return results;
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
        }
    };
    $.ArrayH = self;
}(), function() {
    var content = {
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
    $.DateH = content;
}(), function() {
    var isA = {
        /**
         * @param {?} fn
         * @param {boolean} route
         * @return {?}
         */
        methodize : function(fn, route) {
            return route ? function() {
                return fn.apply(null, [this[route]].concat([].slice.call(arguments)));
            } : function() {
                return fn.apply(null, [this].concat([].slice.call(arguments)));
            };
        }
    };
    $.FunctionH = isA;
}(), function() {
    var jQuery = $.FunctionH;
    /**
     * @return {undefined}
     */
    var subject = function() {
    };
    var isA = {
        /**
         * @param {?} object
         * @param {boolean} fn
         * @param {?} dataAndEvents
         * @return {?}
         */
        methodize : function(object, fn, dataAndEvents) {
            var result = new subject;
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
    $.HelperH = isA;
}(), $.Browser = function() {
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
    if (!browser.msie) {
        if (browser.trident) {
            ret.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/ig, function(dataAndEvents, timeout) {
                browser.msie = timeout;
            });
        }
    }
    if (browser.msie) {
        browser.ie = browser.msie;
        /** @type {number} */
        var version = parseInt(browser.msie, 10);
        /** @type {boolean} */
        browser["ie" + version] = true;
    }
    return browser;
}(), function() {
    var requestAnimationFrame = $.HelperH.methodize;
    var extend = $.ObjectH.mix;
    extend(Object, $.ObjectH);
    extend(Array, $.ArrayH);
    extend(Array.prototype, requestAnimationFrame($.ArrayH));
    extend(Function, $.FunctionH);
    extend(Date, $.DateH);
    extend(Date.prototype, requestAnimationFrame($.DateH));
    extend(String, $.StringH);
    extend(String.prototype, requestAnimationFrame($.StringH));
}(), window.define && window.define("module/qwrap-core/1.1.5/qwrap.core", function() {
}), define("js/components/batchRequest", ["module/qwrap-core/1.1.5/qwrap.core"], function(dataAndEvents) {
    /**
     * @param {Object} opts
     * @return {?}
     */
    function request(opts) {
        if (a || !opts.url) {
            return false;
        }
        /** @type {boolean} */
        a = true;
        options = $.extend(true, {
            size : 50,
            method : "post"
        }, opts);
        load();
        if (!opts.withoutProgress) {
            setTimeout(open, 1E3);
        }
    }
    /**
     * @return {undefined}
     */
    function load() {
        if (l) {
            onComplete();
            return;
        }
        var params = {};
        var data;
        var url;
        if (options.method === "jsonp") {
            data = options.data.slice(offset, offset + options.size);
            data = data[0];
            /** @type {number} */
            params.t = +new Date;
            params = $.extend(true, params, data.params);
            url = data.url;
            url += "?";
            url += $.ObjectH.encodeURIJson(params);
            /**
             * @param {?} datum
             * @return {undefined}
             */
            yunpn.BatchRequest.jsonp_callback = function(datum) {
                if (data.batchSuccess) {
                    data.batchSuccess(datum);
                }
                offset += options.size;
                if (offset >= options.data.length) {
                    if (!l) {
                        if (options.success) {
                            options.success();
                        }
                    }
                    onComplete();
                } else {
                    load();
                }
            };
            $.getJson(url + "?cross_domain_callback=?callback?", null, function(datum) {
                if (data.batchSuccess) {
                    data.batchSuccess(datum);
                }
                offset += options.size;
                if (offset >= options.data.length) {
                    if (!l) {
                        if (options.success) {
                            options.success();
                        }
                    }
                    onComplete();
                } else {
                    load();
                }
            });
        } else {
            params[options.batchParam] = options.data.slice(offset, offset + options.size);
            /** @type {number} */
            params.t = Math.random();
            params = $.ObjectH.mix(params, options.params, true);
            handler = $.post(options.url, params, function(ele) {
                /** @type {number} */
                var ret = 0;
                if (options.data.length > offset + options.size) {
                    ret = offset + options.size;
                } else {
                    ret = options.data.length;
                }
                if (options.batchSuccess) {
                    options.batchSuccess(ele, ret);
                }
                offset += options.size;
                if (offset >= options.data.length) {
                    if (!l) {
                        if (options.success) {
                            options.success();
                        }
                    }
                    onComplete();
                } else {
                    load();
                }
            }, "json");
        }
        var total = options.data.length;
        /** @type {number} */
        right = offset + options.size >= total ? value : (offset + options.size) / total * value;
    }
    /**
     * @return {undefined}
     */
    function onComplete() {
        setTimeout(function() {
            share();
        }, 300);
        /** @type {boolean} */
        a = false;
        /** @type {null} */
        options = null;
        /** @type {boolean} */
        l = false;
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
        l = true;
        if (options.onTerminate) {
            options.terminate();
        }
    }
    /**
     * @return {undefined}
     */
    function share() {
        if (element) {
            element.dialog("close");
        }
    }
    /**
     * @return {undefined}
     */
    function open() {
        if (!a) {
            return;
        }
        if (!element) {
            /** @type {string} */
            var html = ['<div id="batchRequest">', '<div class="box">', '<span class="progress"><span class="progress-bar"></span></span>', "<p>\u64cd\u4f5c\u6b63\u5728\u8fdb\u884c\u4e2d\uff0c\u8bf7\u7a0d\u7b49...</p>", "</div>", "</div>"].join("");
            element = $(html);
            element.dialog({
                body : html,
                width : 450,
                title : "\u63d0\u793a"
            });
            elem = $("#batchRequest .progress-bar");
        }
        /** @type {number} */
        left = 0;
        elem.css("width", "0px");
        element.dialog("open");
        setTimeout(check, 100);
    }
    /**
     * @return {undefined}
     */
    function check() {
        if (a) {
            left += Math.floor((right - left) * 0.1);
            elem.css("width", left + "px");
            setTimeout(check, 100);
        } else {
            elem.css("width", value + "px");
        }
    }
    /** @type {boolean} */
    var a = false;
    var options;
    /** @type {boolean} */
    var l = false;
    var handler;
    /** @type {number} */
    var offset = 0;
    var element;
    var elem;
    /** @type {number} */
    var left = 0;
    /** @type {number} */
    var right = 0;
    /** @type {number} */
    var value = 376;
    return{
        /** @type {function (Object): ?} */
        create : request,
        /** @type {function (): undefined} */
        showProgress : open,
        /** @type {function (?): undefined} */
        terminate : report
    };
}), define("js/yunpn/nav/NavData", function() {
    /** @type {string} */
    var source = "";
    return{
        TAB_LIST : ["file", "image", "video", "music", "text", "other", "sFile", "link", "recycle", "recycleBin", "search"],
        MAIN_TABS : ["file", "sFile", "link", "recycle"],
        FILE_TYPES : {
            image : "\u56fe\u7247",
            video : "\u89c6\u9891",
            music : "\u97f3\u4e50",
            text : "\u6587\u6863",
            other : "\u6587\u4ef6",
            file : "\u6587\u4ef6"
        },
        TAB_NAV : {
            file : "file",
            image : "image",
            video : "video",
            music : "music",
            text : "text",
            sFile : "sFile",
            link : "link",
            recycle : "recycle",
            search : "file"
        },
        /**
         * @return {?}
         */
        getCurTab : function() {
            return source;
        },
        /**
         * @param {string} keepData
         * @return {undefined}
         */
        setCurTab : function(keepData) {
            /** @type {string} */
            source = keepData;
        },
        /**
         * @param {(Function|string)} text
         * @return {?}
         */
        getFileTypeStr : function(text) {
            return typeof text == "undefined" && (text = source), this.FILE_TYPES[text] || (text = "file"), this.FILE_TYPES[text];
        }
    };
}), define("js/yunpn/lib/fileoperations/fileoperations", ["js/components/amdbase", "js/components/batchRequest", "js/yunpn/nav/NavData", "js/yunpn/lib/amdfileType"], function(jQuery, data, cx, dataAndEvents) {
    /**
     * @param {number} year
     * @return {?}
     */
    function show(year) {
        year = year || +new Date;
        /** @type {Date} */
        var tempDate = new Date(year);
        /** @type {number} */
        var ret = tempDate.getFullYear();
        /** @type {number} */
        var g = tempDate.getMonth() + 1;
        /** @type {number} */
        var angle = tempDate.getDate();
        /** @type {number} */
        var e = parseInt(new Date / 1E3) % 86400;
        return g = g > 9 ? g : "0" + g, angle = angle > 9 ? angle : "0" + angle, [ret, g, angle, e].join("-");
    }
    /**
     * @param {Array} second
     * @param {string} id
     * @return {?}
     */
    function init(second, id) {
        var test = new $.Deferred;
        /** @type {string} */
        var current = node;
        /** @type {number} */
        var a = 0;
        /** @type {Array} */
        var eventPath = [];
        /** @type {string} */
        var postData = "";
        /** @type {number} */
        var j = 0;
        var l = second.length;
        for (;j < l;j++) {
            eventPath.push(second[j].file_path);
            postData += "path[]=" + encodeURIComponent(second[j].file_path) + "&";
            a += +second[j].count_size;
        }
        postData += "total_size=" + encodeURIComponent(a);
        if (l > i) {
            test.resolve(info.node_number);
        } else {
            if (a > b) {
                test.resolve(info.size);
            } else {
                var params = {
                    url : current,
                    type : "POST",
                    data : postData,
                    dataType : "json",
                    async : false
                };
                /**
                 * @param {MessageEvent} e
                 * @return {undefined}
                 */
                var set = function(e) {
                    test.resolve(e);
                    if (e.errno == 0) {
                        var self = $("#frmPackDownload")[0];
                        var intensity = SYS_CONF.qid;
                        self.packKey.value = e.data.download_pack_key;
                        self.packSign.value = e.data.download_pack_sign;
                        self.qid.value = intensity;
                        /** @type {string} */
                        self.zipFileName.value = id;
                        if (e.data.host) {
                            $(self).attr("action", "http://" + e.data.host + "/intf.php");
                        }
                        $(self).find(".method").attr("name", "method");
                        $(self).find(".method").attr("value", "Sync.downloadPack");
                        self.submit();
                    }
                };
                /**
                 * @return {undefined}
                 */
                var complete = function() {
                    test.resolve(info.network);
                };
                jQuery.ajax(params, set, complete);
            }
        }
        return test.promise();
    }
    /**
     * @param {string} el
     * @return {?}
     */
    function next(el) {
        /** @type {string} */
        var YYSTATE = YY_START;
        var response = new $.Deferred;
        /** @type {string} */
        var result = Object.prototype.toString.call(el);
        /** @type {string} */
        var match = "";
        if (result === "string") {
            /** @type {string} */
            match = el;
        } else {
            match += "nid=" + encodeURIComponent(el.nid);
        }
        var params = {
            url : YYSTATE,
            type : "POST",
            data : match,
            dataType : "json",
            async : false
        };
        /**
         * @param {Object} res
         * @return {undefined}
         */
        var success = function(res) {
            response.resolve(res);
            if (res && (res.data && res.errno == "0")) {
                var _tmp = res.data.download_url;
                $("#ifrDownload").attr("src", _tmp);
            }
        };
        /**
         * @return {undefined}
         */
        var callback = function() {
            response.resolve(info.network);
        };
        return jQuery.ajax(params, success, callback), response.promise();
    }
    /**
     * @param {(Array|string)} params
     * @return {?}
     */
    function get(params) {
        var item = new $.Deferred;
        if (!hook()) {
            item.reject();
        } else {
            if (typeof params == "undefined" || params.length == 0) {
                $.alert(info.param.errmsg, {
                    type : "error"
                });
                item.resolve(info.param);
            } else {
                /** @type {boolean} */
                var r = false;
                /** @type {Array} */
                var u = [];
                /** @type {Array} */
                var a = [];
                if (!(params instanceof Array)) {
                    /** @type {Array} */
                    params = [params];
                }
                if (params.length == 1 && params[0].is_dir || params.length > 1) {
                    /** @type {boolean} */
                    r = true;
                }
                if (r) {
                    /** @type {string} */
                    var id = "";
                    var text = cx.getCurTab();
                    var code = cx.getFileTypeStr(text);
                    /** @type {string} */
                    id = "360\u4e91\u76d8" + code + "-" + show() + ".zip";
                    init(params, id).then(function(data) {
                        item.resolve(data);
                        if (!data.errno) {
                            return;
                        }
                        if (data.errno == 8E3) {
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
                            if (data.errno == 22101) {
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
                                $.alert(data.errmsg, {
                                    type : "error"
                                });
                            }
                        }
                    });
                    monitor.tlog({
                        qid : SYS_CONF.qid || "",
                        m : "my",
                        a : "20130108-my-dl",
                        s : "packdl"
                    });
                } else {
                    next({
                        nid : params[0].nid
                    }).then(function(data) {
                        item.resolve(data);
                        if (data.errno != 0) {
                            $.alert(data.errmsg, {
                                type : "error"
                            });
                        }
                    });
                    monitor.tlog({
                        qid : SYS_CONF.qid || "",
                        m : "my",
                        a : "20130108-my-dl",
                        s : params[0].suffix
                    });
                }
            }
        }
        return monitor.btnLog("Download"), item.promise();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function defer(obj) {
        var defer = new $.Deferred;
        return data.create({
            url : appFrontendUrl,
            batchParam : obj.batchParamKey,
            data : obj.paramData,
            /**
             * @param {?} e
             * @return {undefined}
             */
            batchSuccess : function(e) {
                if (e.errno != 0) {
                    data.terminate();
                    defer.resolve(e);
                }
            },
            /**
             * @return {undefined}
             */
            success : function() {
                defer.resolve({
                    errno : 0
                });
            }
        }), defer.promise();
    }
    /**
     * @param {?} params
     * @return {?}
     */
    function load(params) {
        var item = new $.Deferred;
        /** @type {Array} */
        var nodeValues = [];
        var suiteView = {
            batchParamKey : "nids[]",
            paramData : []
        };
        return hook() ? typeof params == "undefined" || params.length == 0 ? ($.alert(info.param.errmsg, {
            type : "error"
        }), item.resolve(info.param)) : (params instanceof Array || (params = [params]), $.each(params, function(dataAndEvents, node) {
            nodeValues.push(node.nid);
        }), suiteView.paramData = nodeValues, defer(suiteView).then(function(data) {
            if (data.errno) {
                $.alert(data.errmsg, {
                    type : "error"
                });
            }
            item.resolve(data);
        })) : item.reject(), item.promise();
    }
    /**
     * @param {string} data
     * @return {?}
     */
    function send(data) {
        /** @type {string} */
        var d = el;
        var response = new $.Deferred;
        /** @type {string} */
        var result = Object.prototype.toString.call(data);
        /** @type {string} */
        var postData = "";
        if (result === "string") {
            /** @type {string} */
            postData = data;
        } else {
            postData += "path=" + encodeURIComponent(data.path) + "&nid=" + encodeURIComponent(data.nid) + "&newpath=" + encodeURIComponent(data.newpath);
        }
        var params = {
            url : d,
            type : "POST",
            data : postData,
            dataType : "json",
            async : false
        };
        /**
         * @param {string} res
         * @return {undefined}
         */
        var callback = function(res) {
            response.resolve(res);
            if (res && (res.data && res.errno == "0")) {
                var _tmp = res.data.download_url;
                $("#ifrDownload").attr("src", _tmp);
            }
        };
        /**
         * @return {undefined}
         */
        var done = function() {
            response.resolve(info.network);
        };
        return jQuery.ajax(params, callback, done), response.promise();
    }
    /**
     * @param {string} name
     * @return {?}
     */
    function post(name) {
        /** @type {number} */
        var errno = 0;
        return msg = "\u65b0\u540d\u79f0\u5408\u6cd5", /[\\\/\:\*\?\"<>|]+/.test(name) ? (msg = '\u4e0d\u80fd\u5305\u542b\\ / : * ? " < > |\u7b49\u5b57\u7b26\uff01', errno = 1) : /^\./.test(name) ? (msg = "\u65b0\u540d\u79f0\u4e0d\u80fd\u4ee5.\u5f00\u5934", errno = 1) : /^\s*$/.test(name) ? (msg = "\u65b0\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a\uff01", errno = 1) : yunpn.filelist.path === "/" && "\u4e91\u540c\u6b65" === name ? (msg = '"\u4e91\u540c\u6b65"\u662f\u7cfb\u7edf\u76ee\u5f55\uff0c\u8bf7\u4f7f\u7528\u5176\u4ed6\u540d\u5b57\u521b\u5efa\u76ee\u5f55\uff01',
            errno = 1) : name.length > 255 && (msg = "\u65b0\u540d\u79f0\u8fc7\u957f\uff0c\u8bf7\u91cd\u65b0\u4fee\u6539", errno = 1), {
            errno : errno,
            errmsg : msg
        };
    }
    /** @type {number} */
    var b = 1073741824;
    /** @type {number} */
    var i = 1E3;
    var info = {
        success : {
            errno : 0,
            errmsg : "\u64cd\u4f5c\u6210\u529f"
        },
        size : {
            errno : -1,
            errmsg : "\u6253\u5305\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u8d85\u8fc71G"
        },
        param : {
            errno : -2,
            errmsg : "\u53c2\u6570\u9519\u8bef"
        },
        network : {
            errno : -3,
            errmsg : "\u7f51\u7edc\u9519\u8bef"
        },
        node_number : {
            errno : -4,
            errmsg : "\u6253\u5305\u4e0b\u8f7d\u6587\u4ef6\u6570\u4e0d\u80fd\u8d85\u8fc71000"
        },
        logout : {
            errno : 2006,
            errmsg : "\u767b\u5f55\u5931\u6548"
        }
    };
    var hook = yunpn.isLogin;
    /** @type {string} */
    var YY_START = "/file/downloadByNid";
    /** @type {string} */
    var node = "/file/searchPack";
    /** @type {string} */
    var appFrontendUrl = "/file/deleteByNids";
    /** @type {string} */
    var el = "/file/rename";
    return{
        /** @type {function ((Array|string)): ?} */
        download : get,
        /** @type {function (?): ?} */
        deleteFiles : load,
        /** @type {function (string): ?} */
        renameAjax : send,
        /** @type {function (string): ?} */
        checkNewName : post
    };
}), define("js/yunpn/list/ToolbarView", ["js/components/amdbase", "js/yunpn/lib/viewobj/BaseViewObj", "js/pub/components/store", "js/yunpn/lib/fileoperations/fileoperations"], function(util, c, dataAndEvents, res) {
    /** @type {string} */
    var elem = "yunpn_LISTTYPE";
    var toId = $("#searchToolbarViewTpl").html().tmpl();
    /** @type {null} */
    var dest = null;
    var pos = util.inherits(c, {
        /**
         * @param {Object} options
         * @return {undefined}
         */
        constructor : function(options) {
            if (!options.container) {
                return;
            }
            this._super.call(this);
            this.options = $.extend({
                hasDisplayMode : true,
                hasBtnGroup : true,
                hasSelect : false,
                typeName : ""
            }, options);
            if (this.options.displayMode) {
                pos.setDisplayMode(this.options.displayMode);
            }
            this.init();
        },
        /**
         * @return {undefined}
         */
        init : function() {
            var that = this;
            var $tooltip = $(toId(this.options));
            var $container = this.options.container.append($tooltip);
            var elements = this.elements = {
                container : $container,
                chkall : that.options.chkall || $container.find(".chkall"),
                btnGroup : $container.find(".cat-btn-group"),
                disCtn : $container.find(".cat-display-mode"),
                selectCtn : $container.find(".cat-select-box"),
                text : $container.find(".text"),
                num : $container.find(".num"),
                typeName : $container.find(".type-name"),
                searchbar : $container.find(".search-bar")
            };
            this.setOption(this.options);
            var elem = elements.chkall;
            elem.click(function() {
                if (elem.hasClass("active")) {
                    elem.removeClass("active");
                    that.fire("unselectall");
                } else {
                    elem.addClass("active");
                    that.fire("selectall");
                }
            });
            elements.btnGroup.delegate(".y-btn", "click", function() {
                var adjustClip = $(this).data("cn");
                if ($(this).hasClass("y-btn-disable")) {
                    return;
                }
                switch(adjustClip) {
                    case "dl":
                        that.download();
                        break;
                    case "del":
                        that.del();
                        break;
                    case "share":
                        that.share();
                }
            });
            $container.find(".cat-display-mode").delegate("a", "click", function() {
                var camelKey = $(this).data("mode");
                if (camelKey != pos.getDisplayMode()) {
                    pos.setDisplayMode(camelKey);
                    that.fire("displaymodechange", {
                        displayMode : camelKey
                    });
                    that.update();
                }
            });
            this.initSearch($container);
            this.initBtnMore($container);
            this.update();
        },
        /**
         * @param {Object} $container
         * @return {undefined}
         */
        initSearch : function($container) {
            var instance = this;
            var component = $container.find(".search-bar");
            var r = component.find(".search-input-ctn");
            var element = component.find(".search-input");
            var cancel = component.find(".y-btn-submit");
            var ok = component.find(".icon-close");
            var closeEl = component.find(".search-placeholder");
            ok.on("click", function() {
                element.val("");
                component.addClass("search-none").removeClass("search-have-content");
                instance.fire("searchclose");
            });
            cancel.on("click", function() {
                var name = element.val().trim();
                instance.fire("searchsubmit", {
                    key : name
                });
            });
            element.on("keyup", function(event) {
                if (event.keyCode == 13) {
                    var name = element.val().trim();
                    instance.fire("searchsubmit", {
                        key : name
                    });
                }
                if (this.value == "") {
                    component.addClass("search-none").removeClass("search-have-content");
                } else {
                    component.removeClass("search-none").addClass("search-have-content");
                }
            });
            /** @type {boolean} */
            hasPlaceholder = "placeholder" in document.createElement("input");
            placeholder = hasPlaceholder ? "" : element.attr("data-placeholder");
            element.on("focus", function() {
                if (!hasPlaceholder) {
                    closeEl.hide();
                }
                component.addClass("search-focus");
            }).on("blur", function() {
                if (!hasPlaceholder) {
                    if (this.value == "") {
                        closeEl.show();
                    }
                }
                component.removeClass("search-focus");
            });
            if (hasPlaceholder) {
                closeEl.hide();
            } else {
                if (element.val() == "") {
                    closeEl.show();
                }
                closeEl.on("mousedown", function() {
                    closeEl.hide();
                    setTimeout(function() {
                        element.focus();
                    }, 10);
                });
            }
        },
        /**
         * @param {?} $container
         * @return {undefined}
         */
        initBtnMore : function($container) {
            var self = this;
            /** @type {Array} */
            var listStyleOptions = [{
                text : "\u91cd\u547d\u540d",
                cls : "rename",
                iconCls : "icon-rename",
                attrs : {
                    "data-cn" : "rename"
                },
                /**
                 * @return {undefined}
                 */
                handler : function() {
                    self.rename();
                }
            }, {
                text : "\u79fb\u52a8",
                cls : "move",
                iconCls : "icon-move",
                attrs : {
                    "data-cn" : "move"
                },
                /**
                 * @return {undefined}
                 */
                handler : function() {
                    self.move();
                }
            }];
            this.moreMenu = new yunpn.Menu({
                cls : "cmd-panel",
                target : self.options.container.find(".y-btn-more")[0],
                dock : "bottom",
                listeners : {
                    /**
                     * @return {undefined}
                     */
                    aftershow : function() {
                        if ($(this).hasClass("y-btn-disable")) {
                            self.moreMenu.hide();
                        }
                    }
                },
                items : listStyleOptions
            });
        },
        /**
         * @param {Object} options
         * @return {undefined}
         */
        setOption : function(options) {
            $.extend(this.options, options);
            options = this.options;
            var elements = this.elements;
            if (options.hasSelect) {
                elements.selectCtn.show();
            } else {
                elements.selectCtn.hide();
            }
            if (options.hasDisplayMode) {
                elements.disCtn.show();
            } else {
                elements.disCtn.hide();
            }
            elements.typeName.html(options.typeName);
        },
        /**
         * @param {?} data
         * @return {undefined}
         */
        download : function(data) {
            var options = this.options.getSelected();
            if (data) {
                options = {
                    data : [data]
                };
            }
            if (options.data.length <= 0) {
                return;
            }
            res.download(options.data);
        },
        /**
         * @param {?} item
         * @param {number} fn
         * @return {undefined}
         */
        del : function(item, fn) {
            var results = this.options.getSelected();
            if (item) {
                results = {
                    data : [item]
                };
            }
            if (results.data.length <= 0) {
                return;
            }
            var data = this;
            if (fn == 0) {
                res.deleteFiles(results.data).then(function() {
                    data.fire("filedelete", {
                        data : results.data
                    });
                });
            } else {
                /** @type {string} */
                var elem = "<p>\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8fd9<em>" + results.data.length + '</em>\u9879\uff1f<p><p class="info">\u5220\u9664\u540e\u53ef\u5728\u56de\u6536\u7ad9\u8fd8\u539f\u3002</p>';
                var element = $.confirm(elem, {
                    title : "\u5220\u9664",
                    type : "warning",
                    wrapId : "deleteDia",
                    textwidth : 161,
                    /**
                     * @param {string} input
                     * @return {undefined}
                     */
                    fn : function(input) {
                        if (input != "yes") {
                            return;
                        }
                        res.deleteFiles(results.data).then(function() {
                            data.fire("filedelete", {
                                data : results.data
                            });
                        });
                    }
                });
                element.dialog("open");
            }
        },
        /**
         * @return {undefined}
         */
        share : function() {
            var formData = this.options.getSelected();
            if (formData.data.length <= 0) {
                return;
            }
            var t = this;
            /** @type {Array} */
            var sorted = [];
            /** @type {number} */
            var i = 0;
            var values = formData.data;
            var valuesLen = values.length;
            for (;i < valuesLen;i++) {
                sorted.push({
                    path : values[i].file_path
                });
            }
            require([rPathConfig.share], function(OAuth) {
                OAuth.share(sorted);
            });
        },
        /**
         * @return {undefined}
         */
        rename : function() {
            var attachment = this.options.getSelected();
            if (attachment.data.length != 1) {
                return;
            }
            var t = this;
            this.fire("rename", {
                data : attachment.data,
                thumb : attachment.thumbs[0]
            });
        },
        /**
         * @param {string} newName
         * @return {?}
         */
        checkNewName : function(newName) {
            return res.checkNewName(newName);
        },
        /**
         * @param {?} data
         * @param {string} object
         * @return {?}
         */
        renameAjax : function(data, object) {
            return res.renameAjax({
                path : data.file_path,
                nid : data.nid,
                newpath : data.is_dir ? object + "/" : object
            });
        },
        /**
         * @return {undefined}
         */
        move : function() {
            var field = this.options.getSelected();
            if (field.data.length != 1) {
                return;
            }
            var t = this;
            require([rPathConfig.move], function(path) {
                var mat = path.move({
                    path : field.data[0].file_path,
                    nid : field.data[0].nid,
                    file_location : field.data[0].file_location,
                    thumb : field.thumbs[0]
                });
                if (!dest) {
                    dest = mat;
                    dest.on("movesuccess", function(data) {
                        var method = data.newpath;
                        var socket = data.thumb;
                        socket.fire("movesuccess", data);
                    });
                }
            });
        },
        /**
         * @return {undefined}
         */
        dirtyTree : function() {
            if (!Move) {
                return;
            }
            Move.dirtyTree();
        },
        /**
         * @param {Node} $animate
         * @return {undefined}
         */
        disableBtn : function($animate) {
            $animate.addClass("y-btn-disable");
        },
        /**
         * @param {HTMLElement} $animate
         * @return {undefined}
         */
        enableBtn : function($animate) {
            $animate.removeClass("y-btn-disable");
        },
        /**
         * @return {undefined}
         */
        update : function() {
            if (!this.options.getSelected) {
                return;
            }
            var dataAttr = this;
            var o = this.options;
            var data = this.elements;
            var a = this.options.getSelected();
            var head = data.chkall;
            var title = data.text;
            var m = data.btnGroup;
            if (a.data.length <= 0) {
                m.find(".y-btn").each(function(dataAndEvents, node) {
                    dataAttr.disableBtn($(node));
                });
                this.moreMenu.hideItem(".rename, .move");
                if (o.hasSelect) {
                    head.removeClass("active");
                    data.num.html("0");
                    title.hide();
                }
            } else {
                m.find(".y-btn").each(function(dataAndEvents, node) {
                    dataAttr.enableBtn($(node));
                });
                if (a.data.length == 1) {
                    dataAttr.enableBtn(m.find(".y-btn-more"));
                    this.moreMenu.showItem(".rename, .move");
                } else {
                    dataAttr.disableBtn(m.find(".y-btn-more"));
                    this.moreMenu.hideItem(".rename, .move");
                }
                if (o.hasSelect) {
                    if (a.count <= a.data.length) {
                        head.addClass("active");
                    } else {
                        head.removeClass("active");
                    }
                    data.num.html("" + a.data.length);
                    title.show();
                }
            }
            data.searchbar.find("input").val(o.key);
            if (o.key) {
                data.searchbar.removeClass("search-none").addClass("search-have-content");
            } else {
                data.searchbar.addClass("search-none").removeClass("search-have-content");
            }
            var index = pos.getDisplayMode();
            var target = data.container;
            target.find(".cat-display-mode a").removeClass("list-cur").removeClass("thumb-cur");
            target.find(".cat-display-mode ." + index).addClass(index + "-cur");
        }
    });
    return pos.getDisplayMode = function() {
        var cDigit = yunpn.Storage.get(elem) || 2;
        return cDigit = parseInt(cDigit) == 2 ? "thumb" : "list", cDigit;
    }, pos.setDisplayMode = function(key) {
        if (Object.isString(key)) {
            /** @type {number} */
            key = key == "thumb" ? 2 : 1;
        }
        yunpn.Storage.set(elem, key);
    }, pos;
}), define("js/yunpn/lib/tips/mask", function() {
    /**
     * @return {undefined}
     */
    function reposition() {
        /** @type {string} */
        var statsTemplate = '<div class="loading-mask"><div class="bg"></div><div class="content"><i class="icon-loading"></i><span class="text"></span></div></div>';
        $e = $(statsTemplate).appendTo("#mainPanel");
        /** @type {boolean} */
        r = true;
    }
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function show(e) {
        if (to) {
            clearTimeout(to);
        }
        /** @type {null} */
        to = null;
        if (tref) {
            clearTimeout(tref);
        }
        /** @type {null} */
        tref = null;
        if (!r) {
            reposition();
        }
        $e.find(".text").html(e.msg || element);
        $e.show();
        /** @type {number} */
        tref = setTimeout(function(dataAndEvents) {
            if ($e.is(":visible")) {
                hide();
            }
        }, 2E4);
    }
    /**
     * @return {undefined}
     */
    function hide() {
        /** @type {null} */
        to = null;
        if (tref) {
            clearTimeout(tref);
        }
        /** @type {null} */
        tref = null;
        $e.hide();
    }
    /** @type {boolean} */
    var r = false;
    /** @type {null} */
    var $e = null;
    /** @type {string} */
    var element = "\u52a0\u8f7d\u6587\u4ef6\u5217\u8868\u4e2d...";
    /** @type {null} */
    var to = null;
    /** @type {null} */
    var tref = null;
    return{
        /** @type {function (Object): undefined} */
        show : show,
        /** @type {function (): undefined} */
        hide : hide
    };
}), define("js/pub/components/util", function() {
    /** @type {boolean} */
    var mode = false;
    /** @type {number} */
    var x_yp_ = 0;
    return{
        /**
         * @return {?}
         */
        getSwfVersion : function() {
            if (mode === false) {
                /** @type {(Navigator|null)} */
                var nav = navigator;
                if (nav.plugins && nav.mimeTypes.length) {
                    var err = nav.plugins["Shockwave Flash"];
                    if (err) {
                        if (err.description) {
                            /** @type {string} */
                            mode = err.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0";
                        }
                    }
                } else {
                    if (window.ActiveXObject && !window.opera) {
                        try {
                            var ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            if (ax) {
                                var lastLine = ax.GetVariable("$version");
                                mode = lastLine.replace(/WIN/g, "").replace(/,/g, ".");
                            }
                        } catch (s) {
                        }
                    }
                }
                return mode = parseInt(mode, 10), mode;
            }
            return mode;
        },
        /**
         * @param {number} a
         * @param {number} c
         * @param {boolean} sendImmediately
         * @return {?}
         */
        formatByte : function(a, c, sendImmediately) {
            /** @type {string} */
            var signature = "";
            if (Object.isString(a)) {
                /** @type {number} */
                a = parseInt(a);
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
                var b = codeSegments[i];
                if (a >= b) {
                    signature = (a / b).toFixed(c) + newArray[i];
                    break;
                }
            }
            if (!signature) {
                if (a > 0) {
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
        },
        /**
         * @param {?} a
         * @return {?}
         */
        formatTime : function(a) {
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
        },
        /**
         * @return {?}
         */
        id : function() {
            return "x-yp-" + ++x_yp_;
        }
    };
}), define("js/yunpn/lib/videoplayer/video", ["js/yunpn/nav/NavData", "js/pub/components/util"], function(dataAndEvents, deepDataAndEvents) {
    var self = {
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
        FLASH_TYPE : {
            mp4 : 1,
            flv : 1,
            f4v : 1
        },
        VIDEO_TYPE : ["mov", "mp4", "rmvb", "wmv", "rm", "mpg", "avi", "flv", "mpeg", "mkv", "webm", "f4v", "3gp", "3g2", "3gp2", "3gpp"],
        PLAY_URL : "/videoPlayer/index"
    };
    /** @type {boolean} */
    var noaccum = false;
    /** @type {boolean} */
    var value = false;
    return{
        /**
         * @return {?}
         */
        detectPlugin : function() {
            if (noaccum) {
                return value;
            }
            if (/^win/i.test(navigator.platform)) {
                /** @type {Navigator} */
                var nav = navigator;
                if (nav.plugins && nav.mimeTypes.length) {
                    var QvodInsert = nav.plugins.QvodInsert;
                    if (QvodInsert) {
                        /** @type {boolean} */
                        value = true;
                    }
                } else {
                    if (window.ActiveXObject && !window.opera) {
                        try {
                            var obj = new ActiveXObject("QvodInsert.QvodCtrl.1");
                            if (obj) {
                                var l = obj.Version;
                                if (parseFloat(l) >= 4.2) {
                                    /** @type {boolean} */
                                    value = true;
                                }
                            }
                        } catch (o) {
                        }
                    }
                }
            }
            return noaccum = true, value;
        },
        /**
         * @param {Object} key
         * @return {?}
         */
        isVideo : function(key) {
            var recycle = dataAndEvents.getCurTab();
            if (recycle == "recycle") {
                return false;
            }
            if (/^win/i.test(navigator.platform)) {
                if (self.VIDEO_TYPE.indexOf(key) >= 0) {
                    return true;
                }
            } else {
                if (self.FLASH_TYPE[key]) {
                    return true;
                }
            }
        },
        /**
         * @param {?} dataAndEvents
         * @return {?}
         */
        isPlayBySe : function(dataAndEvents) {
            return false;
        },
        /**
         * @param {?} timeoutKey
         * @return {?}
         */
        isPlayByFlash : function(timeoutKey) {
            var value = deepDataAndEvents.getSwfVersion();
            var attrNames = value && value >= 9;
            if (attrNames && self.FLASH_TYPE[timeoutKey] >= 0) {
                return true;
            }
        },
        /**
         * @param {?} timeoutKey
         * @return {?}
         */
        isPlayByQvod : function(timeoutKey) {
            if (/^win/i.test(navigator.platform)) {
                var detectPlugin = this.detectPlugin();
                if (detectPlugin && self.PLUGIN_TYPE[timeoutKey] >= 0) {
                    return true;
                }
            }
        },
        /**
         * @param {Object} item
         * @return {undefined}
         */
        play : function(item) {
            /** @type {string} */
            var n = item.domain ? "http://" + item.domain : "";
            /** @type {string} */
            var dat = n + self.PLAY_URL + "?nid=" + encodeURIComponent(item.nid) + "&type=" + item.type;
            if (item.shorturl) {
                dat += "&shorturl=" + item.shorturl;
            }
            window.open(dat);
        }
    };
}), define("js/yunpn/lib/docviewer/viewer-check", function() {
    /**
     * @param {Object} obj
     * @return {?}
     */
    function stringifyObject(obj) {
        /** @type {Array} */
        var tagNameArr = [];
        var key;
        for (key in obj) {
            if (obj[key] == null) {
                continue;
            }
            if (obj[key] instanceof Array) {
                /** @type {number} */
                var k = 0;
                for (;k < obj[key].length;k++) {
                    tagNameArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key][k]));
                }
            } else {
                tagNameArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
            }
        }
        return tagNameArr.join("&");
    }
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
    /** @type {Array} */
    var resultItems = [{
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
    return{
        /**
         * @param {?} key
         * @param {?} m1
         * @return {?}
         */
        canPreview : function(key, m1) {
            return $cookies[key] && parseInt(m1) <= $cookies[key] ? true : false;
        },
        /**
         * @param {?} key
         * @param {?} m1
         * @return {?}
         */
        checkPreview : function(key, m1) {
            var child = {
                isDoc : false,
                isOversize : false
            };
            return $cookies[key] && (child.isDoc = true, parseInt(m1) > $cookies[key] && (child.isOversize = true)), child;
        },
        /**
         * @param {string} url
         * @param {string} dataAndEvents
         * @param {Array} object
         * @param {boolean} address
         * @param {Object} params
         * @param {string} appendReconnectUrl
         * @param {string} id
         * @return {?}
         */
        getUrl : function(url, dataAndEvents, object, address, params, appendReconnectUrl, id) {
            /** @type {string} */
            var loc = "";
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var valuesLen = resultItems.length;
            for (;i < valuesLen;i++) {
                var result = resultItems[i];
                if (result.suffix.indexOf(object) >= 0) {
                    loc += url == "share" ? "share" + result.type + "viewer" : result.type.toLowerCase() + "viewer";
                    break;
                }
            }
            return loc ? (loc = (address ? "http://" + address : "") + "/docviewer/" + loc, loc += "?nid=" + dataAndEvents + "&type=" + object + "&id=" + appendReconnectUrl + "&hisFile=" + id, params && (loc += "&" + $.ObjectH.encodeURIJson(params)), loc) : "";
        },
        /**
         * @param {Object} data
         * @return {undefined}
         */
        openDoc : function(data) {
            var href = data.suffix;
            var node = data.nid;
            var method = data.scid;
            var s = data.size;
            var url = this.getUrl("file", node, href, null, {
                scid : method,
                size : s
            });
            if (url) {
                window.open(url);
            }
        }
    };
}), define("js/yunpn/lib/tips/top-tip", function() {
    /** @type {Array} */
    var types = ["success", "warning", "loading", "danger", "unknow", "none"];
    /**
     * @param {?} options
     * @return {undefined}
     */
    var init = function(options) {
        /** @type {string} */
        this.preType = "success";
        this.options = {
            width : 298,
            type : "success",
            container : document.body,
            align : "center",
            delay : 2E3,
            close : false,
            withCloseIcon : false
        };
        $.extend(true, this.options, options);
        /** @type {null} */
        this.timeoutId = null;
        /** @type {null} */
        this.dom = null;
        this.init();
    };
    return init.prototype = {
        /**
         * @return {undefined}
         */
        init : function() {
            var self = this;
            var opts = this.options;
            if (this.dom) {
                this.hide(true);
            }
            if (this.dom) {
                if (opts.cls) {
                    this.dom.removeClass(opts.cls);
                }
                if (opts.style) {
                    this.dom.removeAttr("style");
                }
            } else {
                this.dom = $('<div class="x-quicktip"><div class="y-alert y-alert-success"><span class="close">\u00d7</span><p class="text"></p></div></div>');
            }
            this.dom.appendTo(opts.container);
            if (opts.cls) {
                this.dom.addClass(opts.cls);
            }
            if (opts.style) {
                this.dom.css(opts.style);
            }
            if (opts.close) {
                this.dom.find(".close").show().on("click", self._hide);
            } else {
                this.dom.find(".close").hide();
            }
            if (opts.withCloseIcon) {
                this.dom.find(".close").show();
            } else {
                this.dom.find(".close").hide();
            }
        },
        /**
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        hide : function(dataAndEvents) {
            var wrapper = this.dom;
            var to = this.timeoutId;
            if (wrapper == null) {
                return;
            }
            if (to) {
                clearTimeout(to);
            }
            if (dataAndEvents) {
                /** @type {null} */
                to = null;
                wrapper.css("left", "-10000px");
            } else {
                this._hide();
            }
        },
        /**
         * @return {undefined}
         */
        _hide : function() {
            var d = this.dom;
            var timeoutId = this.timeoutId;
            /** @type {null} */
            timeoutId = null;
            d.fadeOut(500, function() {
                d.css("left", "-10000px");
            });
        },
        /**
         * @param {?} options
         * @param {string} name
         * @param {number} v
         * @return {undefined}
         */
        show : function(options, name, v) {
            var $this = this;
            var parent = this.dom;
            var tref = this.timeoutId;
            var o = this.options;
            name = types.indexOf(name) >= 0 ? name : "success";
            parent.find(".y-alert").removeClass("y-alert-" + this.preType).addClass("y-alert-" + name);
            /** @type {string} */
            this.preType = name;
            var params = parent.find(".text");
            params.html(options);
            parent.show();
            var f = parent.offset();
            var l = params.offset();
            if (o.align == "left") {
                parent.css("left", "0px");
            } else {
                if (o.align == "right") {
                    parent.css("right", "0px");
                } else {
                    var a = $(o.container).width();
                    var b = parent.width();
                    parent.css("left", Math.max((a - b) / 2, 0) + "px");
                }
            }
            if (!o.close) {
                clearTimeout(tref);
                /** @type {number} */
                tref = setTimeout(function() {
                    $this._hide();
                }, v ? v : o.delay);
            }
        },
        /**
         * @return {undefined}
         */
        shine4Error : function() {
            /**
             * @return {undefined}
             */
            function callback() {
                p.fadeIn(clb, done);
            }
            /**
             * @return {undefined}
             */
            function done() {
                n--;
                if (n > 0) {
                    p.fadeOut(clb, callback);
                }
            }
            /** @type {number} */
            var n = 4;
            /** @type {number} */
            var clb = 150;
            var p = this.dom;
            done();
        },
        /**
         * @return {?}
         */
        getDom : function() {
            return this.dom;
        }
    }, init;
}), define("js/yunpn/lib/BaseListView", ["js/components/amdbase", "js/yunpn/lib/amdfileType", "js/yunpn/lib/AjaxDataProvider", "js/yunpn/lib/viewobj/BaseViewObj", "js/yunpn/lib/viewobj/ImgThumb", "js/yunpn/lib/viewobj/ThumbPagerContainer", "js/yunpn/list/ToolbarView", "js/yunpn/lib/tips/mask", "js/yunpn/lib/videoplayer/video", "js/yunpn/lib/docviewer/viewer-check", "js/yunpn/lib/tips/top-tip"], function(jQuery, result, dataAndEvents, c, Buffer, iScroll, Explosion, errors, player, self,
                                                                                                                                                                                                                                                                                                                                                                                                                                  WebSocket) {
    /** @type {string} */
    var segs = ['<div class="column column-checkbox">', '<label class="chkall"></label>', "</div>", '<div class="column column-name">', '<span data-field="name" >', "\u6587\u4ef6\u540d", "</span>", "</div>", '<div class="column column-size">', '<span data-field="fsize" >', "\u5927\u5c0f", "</span>", "</div>", '<div class="column column-time">', '<span data-field="mtime" >', "\u4fee\u6539\u65e5\u671f", "</span>", "</div>", '<div class="column column-path">', "<span>", "\u6240\u5728\u76ee\u5f55", "</span>",
        "</div>"].join("");
    /** @type {string} */
    var html = ['<div class="icon icon-play #{canplay}" title="\u70b9\u51fb\u64ad\u653e"></div>', '<div class="edit-name" style="display:none;">', '<input type="text" />', '<span class="y-btn y-btn-blue accept"><i class="icon icon-accept"></i></span>', '<span class="y-btn y-btn-gray cancel"><i class="icon icon-cancel"></i></span>', "</div>", "#{linkIcon}"].join("");
    /** @type {string} */
    var nodes = ['<div class="column column-size">#{size}</div>', '<div class="column column-time">#{mtime}</div>', '<div class="column column-path" title="#{file_location}">#{path}</div>'].join("");
    var pos = jQuery.inherits(c, {
        /**
         * @param {Object} options
         * @return {undefined}
         */
        constructor : function(options) {
            c.call(this);
            /** @type {Object} */
            this.config = options;
            this.containerNode = $(options.containerNode);
            /** @type {null} */
            this.listContainer = null;
            /** @type {null} */
            this.dataProvider = null;
            /** @type {null} */
            this.toolBar = null;
            /** @type {boolean} */
            this._isInited = false;
            /** @type {string} */
            this.listHeadTpl = segs;
            /** @type {string} */
            this.key = "";
            this.listSelector = options.listSelector;
        },
        /**
         * @return {undefined}
         */
        init : function() {
            var self = this;
            self.listContainer = new iScroll(self.find(self.listSelector), {
                beforeHTML : this.listHeadTpl,
                beforeCls : "file-list-head"
            });
            self.toolBar = new Explosion({
                container : self.find(".toolbar"),
                hasDisplayMode : true,
                key : this.key,
                chkall : self.find(".file-list-head .column-checkbox")
            });
            self.tip = new WebSocket({
                container : "#mainPanel",
                cls : "batchRequestTip",
                close : true
            });
            /**
             * @return {?}
             */
            var $ = function() {
                return self.listContainer.thumbDataManager;
            };
            $().on("statuschange", function() {
                self.toolBar.update();
            });
            /**
             * @return {?}
             */
            self.toolBar.on("displaymodechange", function($scope) {
                self.listContainer.setListMode($scope.displayMode);
                self.fire("displaymodechange", {
                    displayMode : $scope.displayMode
                });
            }).on("searchsubmit", function(attributes) {
                self.fire("searchsubmit", attributes);
            }).on("searchclose", function() {
                self.fire("crumbclick");
            }).on("filedelete", function(messageEvent) {
                self.dataProvider.delFiles(messageEvent.data);
            }).on("selectall", function() {
                $().setSelectAll(true);
            }).on("unselectall", function() {
                $().setSelectAll(false);
            }).on("rename", function(s) {
                s.thumb.showRename();
            }).options.getSelected = function() {
                return $().getSelectData();
            };
            self.listContainer.setThumbHandler(function(data) {
                data.file_name = data.file_name || data.name;
                data.file_location = data.file_location || data.fpath;
                data.file_path = data.file_path || data.file_location + data.file_name;
                var fileType = result.getType(data.file_name);
                if (data.is_dir) {
                    /** @type {string} */
                    fileType = "folder";
                }
                var str = $.extend({
                    href : "#",
                    name : data.file_name,
                    image : {
                        src : data.thumb,
                        tagName : data.thumb ? "img" : "span",
                        lazyload : true,
                        customClass : data.thumb ? "" : "ico-" + fileType
                    },
                    fileType : fileType,
                    showChechbox : true,
                    customClass : "row filelist-item clearfix",
                    overlayHTML : jQuery.formatString(html, data, {
                        canplay : self.showPlayIcon(data.file_name) ? "show-play-icon" : "",
                        linkIcon : data.is_link ? '<span class="link-logo"></span>' : ""
                    }),
                    extraHtml : jQuery.formatString(nodes, data, {
                        name : data.file_name,
                        size : data.is_dir ? "" : jQuery.formatByte(data.count_size),
                        path : jQuery.getFolderName(data.file_location).encode4Html(),
                        file_location : jQuery.getFolderPathStr(data.file_location).encode4Html()
                    })
                }, self.__overrideImgThumbConf(data) || {});
                var b = new Buffer(str, data);
                return self.__bindImgThumbEvent(b), b;
            });
            var pages = this.find(".crumb");
            pages.delegate(".back, .first-item", "click", function() {
                self.fire("crumbclick");
            });
            self.__beforeInit();
            self.dataProvider.on("datapageswitch", function(dataAndEvents) {
                setTimeout(function() {
                    self.toolBar.update();
                }, 10);
                errors.hide();
                self.fire("listloaded");
            });
            self.dataProvider.on("dataloadstart", function(dataAndEvents) {
                errors.show({
                    msg : "\u52a0\u8f7d\u6587\u4ef6\u5217\u8868\u4e2d..."
                });
            }).on("dataloaderror", function(err) {
                errors.hide();
                self.fire("listloaded");
                if (err.status == "timeout") {
                    $.alert("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5", {
                        type : "warning"
                    });
                }
            }).on("dataempty", function(dataAndEvents) {
                self.toolBar.setOption({
                    hasSelect : false,
                    key : this.key
                });
                self.toolBar.update();
                errors.hide();
                self.fire("listloaded");
            });
            self.toolBar.setOption({
                hasSelect : true,
                key : this.key
            });
            self.toolBar.update();
            self.listContainer.setDataProvider(self.dataProvider);
            /** @type {boolean} */
            self._isInited = true;
        },
        /**
         * @param {string} elem
         * @return {?}
         */
        showPlayIcon : function(elem) {
            var handle = result.getSuffix(elem);
            var type = yunpn.video.isVideo(handle);
            var text = yunpn.mc.isMusic(handle);
            if (type || text) {
                return true;
            }
        },
        /**
         * @param {?} data
         * @return {undefined}
         */
        show : function(data) {
            var newState = this.__beforeShow(data);
            if (newState === false) {
                return;
            }
            if (!this._isInited) {
                this.init();
            }
            this.containerNode.show();
            this.listContainer.setListMode(Explosion.getDisplayMode());
            this.listContainer.display();
        },
        /**
         * @return {undefined}
         */
        hide : function() {
            this.containerNode.hide();
            if (this.dataProvider) {
                this.dataProvider.reset();
            }
        },
        /**
         * @return {?}
         */
        getListContainerNode : function() {
            return this.listContainer.getListContainerNode();
        },
        /**
         * @param {Object} elm
         * @return {undefined}
         */
        __bindImgThumbEvent : function(elm) {
            var self = this;
            elm.on("nameclick", function(dataAndEvents) {
                var data = this.data;
                self.openItem(data);
            });
            elm.on("pathclick", function() {
                var data = this.data;
                self.fire("crumbclick", {
                    path : data.file_location
                });
            });
            elm.on("checkboxclick", function(dataAndEvents) {
                self.toolBar.update();
            });
            elm.on("mouseenter", function(dataAndEvents) {
                this.getContainerNode().addClass("hover");
            });
            elm.on("mouseleave", function(dataAndEvents) {
                this.getContainerNode().removeClass("hover");
            });
            elm.on("renameaccept", function(op) {
                var rparentsprev = this;
                var data = this.data;
                var name = op.newName.replace(/\r/g, "").replace(/\n/g, "");
                if (name == data.file_name) {
                    rparentsprev.restoreFromRename();
                    return;
                }
                var error = self.toolBar.checkNewName(name);
                if (error.errno) {
                    $.alert(error.errmsg);
                } else {
                    self.tip.show("\u6b63\u5728\u91cd\u547d\u540d", "loading");
                    self.toolBar.renameAjax(data, name).then(function(err) {
                        self.tip.hide();
                        if (err.errno) {
                            $.alert(err.errmsg);
                            rparentsprev.restoreFromRename();
                        } else {
                            rparentsprev.restoreFromRename(name);
                        }
                    });
                }
            });
            elm.on("nameChanged", function(data) {
                var self = this.data;
                var a = self.file_name;
                var name = data.newName;
                var all = self.file_path;
                self.file_name = a.replace(a, name);
                self.file_path = jQuery.replaceTailString(all, a, name);
            });
            elm.on("movesuccess", function(dataAndEvents) {
                self.dataProvider.reset();
                self.dataProvider.setPageIdx(0);
            });
        },
        /**
         * @param {Object} file
         * @return {undefined}
         */
        openItem : function(file) {
            var that = this;
            var a = result.getSuffix(file.file_name);
            var dest = file.is_dir;
            var ap = player.isVideo(a);
            var ka = yunpn.mc.isMusic(a);
            var num1 = self.canPreview(a, file.count_size);
            /** @type {boolean} */
            var c = file.preview ? true : false;
            if (dest) {
                this.fire("crumbclick", {
                    path : file.file_path
                });
            } else {
                if (ap) {
                    player.play({
                        type : 1,
                        nid : file.nid
                    });
                } else {
                    if (ka) {
                        if (yunpn.util.getSwfVersion() < 9 && $.Browser.ie) {
                            $.alert("\u62b1\u6b49!&nbsp;\u8bf7\u5347\u7ea7Flash\u5230\u6700\u65b0\u7248\u672c\uff0c\u624d\u80fd\u8fdb\u884c\u97f3\u4e50\u64ad\u653e", {
                                type : "warning"
                            });
                            return;
                        }
                        that.tip.show("\u6b63\u5728\u52a0\u8f7d\u4e2d\u2026", "loading");
                        jQuery.ajaxSubmit("/file/getAudioUrl", {
                            nid : file.nid
                        }, function(error) {
                            if (error.errno == 0) {
                                require([rPathConfig.appMusicPlayer], function(data) {
                                    that.tip.hide();
                                    data.addSong({
                                        id : file.nid,
                                        size : parseInt(error.data.filesize),
                                        name : error.data.filename,
                                        url : error.data.audio_url
                                    });
                                });
                            } else {
                                $.alert(error.errmsg, {
                                    type : "warning"
                                });
                            }
                        }, function() {
                            that.tip.show("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5", "warning");
                            setTimeout(function(dataAndEvents) {
                                that.tip.hide();
                            }, 3E3);
                        });
                    } else {
                        if (num1) {
                            self.openDoc({
                                suffix : result.getSuffix(file.file_name),
                                nid : file.nid,
                                size : file.count_size,
                                scid : file.scid
                            });
                        } else {
                            if (c) {
                                var data = {};
                                var fileName = file.nid;
                                var curFunc = yunpn.filelist.curFunc;
                                /** @type {boolean} */
                                data.noDel = true;
                                /** @type {string} */
                                data.pos = "link";
                                data = {
                                    index : 0,
                                    nid : [],
                                    name : [],
                                    pic : [],
                                    preview : [],
                                    data : []
                                };
                                /** @type {Array} */
                                var v = [];
                                var m;
                                /** @type {number} */
                                var i = 0;
                                that.listContainer.thumbDataManager.eachThumb(function(elem, dataAndEvents) {
                                    var options = elem.data;
                                    if (options.preview) {
                                        if (fileName == options.nid) {
                                            data.index = i;
                                        }
                                        data.nid.push(options.nid);
                                        data.name.push(options.file_name);
                                        data.pic.push(options.srcpic);
                                        data.preview.push(options.preview);
                                        data.data.push(options);
                                        if (options.count_size >= 20971520) {
                                            /** @type {string} */
                                            data.preview[i] = "/resource/img/gallary/gallary-20M.png";
                                            /** @type {string} */
                                            data.pic[i] = "/resource/img/gallary/gallary-20M.png";
                                        }
                                        i++;
                                    }
                                });
                                /**
                                 * @param {?} url
                                 * @return {undefined}
                                 */
                                data.downloadPhoto = function(url) {
                                    that.toolBar.download(url);
                                };
                                /**
                                 * @param {?} key
                                 * @return {undefined}
                                 */
                                data.deletePhoto = function(key) {
                                    that.toolBar.del(key, false);
                                };
                                yunpn.gallary.show(data);
                                monitor.clickLog("gallary\u6253\u5f00");
                            } else {
                                if (a == "torrent" && SYS_CONF.validBtUser) {
                                    var rreturn = file.file_path;
                                    require([rPathConfig.offdl], function(ret) {
                                        ret.showSeedInfo(rreturn);
                                    });
                                } else {
                                    that.toolBar.download(file);
                                }
                            }
                        }
                    }
                }
            }
        },
        /**
         * @return {?}
         */
        getContainerNode : function() {
            return this.containerNode;
        },
        __overrideImgThumbConf : $.noop,
        __onDestroy : $.noop,
        __beforeShow : $.noop,
        __beforeInit : $.noop
    });
    return pos;
}), define("js/yunpn/list/SearchView", ["js/components/amdbase", "js/yunpn/lib/AjaxDataProvider", "js/yunpn/lib/BaseListView"], function(_, Store, c) {
    /** @type {number} */
    var pageSize = 50;
    var pos = _.inherits(c, {
        /**
         * @return {undefined}
         */
        constructor : function() {
            c.call(this, {
                containerNode : "#searchArea",
                listSelector : ".category-list"
            });
            /** @type {string} */
            this.key = "";
        },
        /**
         * @param {string} key
         * @return {undefined}
         */
        setKey : function(key) {
            /** @type {string} */
            this.key = key;
        },
        /**
         * @param {?} dataAndEvents
         * @return {undefined}
         */
        updateCrumb : function(dataAndEvents) {
            /** @type {string} */
            var key = ['<div class="crumb-path">', '<span class="back" data-cn="back" data-index="-1">\u8fd4\u56de\u4e0a\u4e00\u7ea7</span>', '<span class="first-item path-item" data-index="-1" title="\u5168\u90e8\u6587\u4ef6">\u5168\u90e8\u6587\u4ef6</span>', '<span class="last-item path-item" data-index="0" title="\u641c\u7d22\uff1a#{key}">\u641c\u7d22\uff1a#{key}</span>', "</div>"].join("");
            var buffer = this.containerNode.find(".crumb");
            buffer.html(_.formatString(key, {
                key : dataAndEvents.encode4Html()
            }));
        },
        /**
         * @param {Array} chars
         * @return {?}
         */
        __beforeShow : function(chars) {
            var that = this;
            if (!chars.length) {
                return that.fire("searchclose"), false;
            }
            this.setKey(chars[1] || "");
            this.updateCrumb(chars[1] || "");
            if (this.toolBar) {
                that.toolBar.setOption({
                    hasSelect : true,
                    key : this.key
                });
                that.toolBar.update();
            }
            if (chars[0] == "search" && !chars[1]) {
                return that.fire("searchclose"), false;
            }
            if (this.dataProvider) {
                this.dataProvider.reset({
                    paramData : {
                        key : that.key,
                        is_fpath : 1
                    }
                });
            } else {
                this.dataProvider = new Store({
                    url : "/file/searchList",
                    pageSize : pageSize,
                    paramData : {
                        key : that.key,
                        is_fpath : 1
                    },
                    /**
                     * @param {number} index
                     * @param {?} value
                     * @return {?}
                     */
                    paramHandler : function(index, value) {
                        return{
                            page : Math.ceil(index / pageSize),
                            page_size : pageSize
                        };
                    },
                    /**
                     * @param {Event} data
                     * @return {?}
                     */
                    dataHandler : function(data) {
                        var cluster = (location.href.match(/(c[\d]+)\.yunpn.360.cn/) || ["", "def"])[1];
                        return window.monitor.tlog({
                            a : "searchdataload",
                            m : "cloud",
                            cluster : cluster
                        }), data.data && data.data.node_list ? (this.setTotalFileCount(data.data.total), data.data.node_list) : [];
                    }
                });
            }
        }
    });
    return pos;
}), define("js/yunpn/list/CategoryView", ["js/components/amdbase", "js/yunpn/lib/AjaxDataProvider", "js/yunpn/lib/BaseListView"], function(util, Store, c) {
    /** @type {number} */
    var n = 50;
    var pos = util.inherits(c, {
        /**
         * @param {?} args
         * @return {undefined}
         */
        constructor : function(args) {
            c.call(this, {
                containerNode : "#" + args.categoryKey + "Area",
                listSelector : ".category-list"
            });
            this.categoryId = args.categoryId;
            this.categoryName = args.categoryName;
            this.categoryKey = args.categoryKey;
        },
        /**
         * @param {Function} _xhr
         * @return {undefined}
         */
        __beforeInit : function(_xhr) {
            var $routeParams = this;
            this.dataProvider = new Store({
                url : "/file/getNodelistByCategory",
                pageSize : n,
                paramData : {
                    file_category : $routeParams.categoryId,
                    thumb : 1,
                    size : "100_85",
                    is_fpath : 1
                },
                /**
                 * @param {number} start
                 * @param {number} value
                 * @return {?}
                 */
                paramHandler : function(start, value) {
                    return{
                        start : start,
                        count : value
                    };
                },
                /**
                 * @param {Event} data
                 * @return {?}
                 */
                dataHandler : function(data) {
                    return data.data.node_list || [];
                }
            });
            this.find(".crumb-path .last-item").attr("title", this.categoryName).html(this.categoryName);
        }
    });
    return pos;
}), define("js/pub/header/topPanel", function() {
    /**
     * @return {undefined}
     */
    function init() {
        $(".user-info-wrap").on("click", function() {
            if (!$(".user-info-wrap").hasClass("user-info-on")) {
                $(".user-info-wrap").addClass("user-info-on");
            }
            clearTimeout(tref);
        }).on("mouseover, mouseenter", function() {
            clearTimeout(tref);
        }).on("mouseout, mouseleave", function() {
            /** @type {number} */
            tref = setTimeout(function() {
                if ($(".user-info-wrap").hasClass("user-info-on")) {
                    $(".user-info-wrap").removeClass("user-info-on");
                }
            }, 500);
        });
        $("#userInfo").on("click", function(event) {
            $(".user-info-wrap").removeClass("user-info-on");
            event.stopPropagation();
        });
    }
    /** @type {null} */
    var tref = null;
    return{
        /** @type {function (): undefined} */
        init : init
    };
}), require(["js/yunpn/list/SearchView", "js/yunpn/list/CategoryView", "js/yunpn/nav/NavData", "js/pub/header/topPanel"], function(Client, bridge, event, loginController) {
    /**
     * @return {undefined}
     */
    function animate() {
        if (tref) {
            clearTimeout(tref);
        }
        /** @type {number} */
        tref = setTimeout(resize, 100);
    }
    /**
     * @return {undefined}
     */
    function resize() {
        /** @type {null} */
        tref = null;
        var callbackSymbol = event.getCurTab();
        if (self[callbackSymbol] && self[callbackSymbol].getListContainerNode) {
            var parent = self[callbackSymbol].getListContainerNode();
            var $e = $(document.body);
            if (parent && parent.length) {
                var otherElementRect = parent.offset();
                var child = parent.children(".thumbcontainer-list");
                var $elem = parent.siblings(".thumbcontainer-before");
                var u = $elem.outerWidth();
                parent.css("height", Math.max($e.outerHeight() - otherElementRect.top, 0) + "px");
                if ($elem.is(":visible")) {
                    $elem.css("width", child.innerWidth() + "px");
                }
            }
        }
    }
    /**
     * @param {string} type
     * @param {Object} result
     * @param {string} params
     * @return {undefined}
     */
    function callback(type, result, params) {
        var key = event.getCurTab();
        var events = self[key];
        if (key && (key == type && ($.inArray(type, elems) < 0 && key != "search"))) {
            return;
        }
        if (events) {
            if (events.hide) {
                events.hide();
            }
        }
        $("#mainTabs").hide();
        yunpn.envSwitch.show("filelist");
        /** @type {string} */
        key = type;
        event.setCurTab(type);
        if (self[key]) {
            if (self[key].show) {
                self[key].show(result);
            }
        }
        $list.find("li").removeClass("current");
        $list.find("[data-tab=" + image[type] + "]").addClass("current");
        if ($.inArray(key, elems) >= 0) {
            loading.hide();
            /** @type {Array} */
            yunpn.filelist.nav = [];
            if (type == "file") {
                /** @type {number} */
                yunpn.filelist.page = 0;
                /** @type {string} */
                yunpn.filelist.curFunc = "file";
                var his_nid = location.search.substr("1").queryUrl();
                if (his_nid.his_nid) {
                    /** @type {string} */
                    location.href = "/my/index";
                }
                if (result && result[1]) {
                    yunpn.filelist.path = result[1] || "/";
                    yunpn.filelist.list(null, null, null, null, null, null, true);
                    HistoryManager.add(encodeURIComponent(result[1]));
                } else {
                    yunpn.cmdCenter.gotoPath("/", null, null, null, null, "file");
                }
                yunpn.filelist.resizeHolder();
            } else {
                if (type == "sFile") {
                    yunpn.cmdCenter.gotosFile();
                } else {
                    if (type == "link") {
                        /** @type {number} */
                        yunpn.filelist.page = 0;
                        yunpn.cmdCenter.gotoLink();
                    } else {
                        if (type == "recycle") {
                            yunpn.cmdCenter.gotoRecycleBin();
                            $.post("/authority/isRecycleBinLocked", {
                                qid : SYS_CONF.qid
                            }, function(err) {
                                if (err.errno != 0) {
                                    $("#tbOpenPassword").show();
                                    $("#tbOpenPasswordDone").hide();
                                } else {
                                    $("#tbOpenPasswordDone").show();
                                    $("#tbOpenPassword").hide();
                                }
                            }, "json");
                        }
                    }
                }
            }
            yunpn.cmdCenter.updateNav();
            $("#fileListHistory").hide();
            $("#mainTabs").show();
        } else {
            yunpn.filelist.cancelListAjax();
            yunpn.filelist.curFunc = key;
            HistoryManager.add(params || key);
            animate();
        }
    }
    /**
     * @param {string} url
     * @return {?}
     */
    function parse(url) {
        if (/^#/.test(url)) {
            url = url.substring(1);
        }
        if (url.length == 0) {
            return["file"];
        }
        if (/^sFile/.test(url)) {
            if (url != "sFile") {
                if (!/^sFile\|/.test(url)) {
                    url = url.replace("sFile", "");
                    /** @type {string} */
                    url = "sFile|" + url;
                }
            }
        }
        var filtered = url.split("|");
        return $.inArray(filtered[0], selection) < 0 && filtered.splice(0, 0, "file"), filtered[0] == "recycleBin" && (filtered[0] = "recycle"), filtered;
    }
    /**
     * @return {?}
     */
    function next() {
        var data = location.search.substr("1").queryUrl();
        var options = String.queryUrl(location.href);
        var players = {
            modifysafepassword : "/user/info?from=my&func=modifypassword",
            profile : "/user/info?from=my",
            task : "/task?from=my",
            invite : "/task/invitefriend?from=my",
            level : "/task/myLevel?from=my",
            notice : "/notice/index/?domain=" + location.host,
            records : "/user/volrecords?type=all",
            sign : "/user/volrecords?type=sign",
            level3 : "/user/volrecords?type=level3_activity",
            space : "http://yunpn.360.cn/pay/index/?domain=" + location.host,
            pay : "http://yunpn.360.cn/card?domain=" + location.host
        };
        var params = {};
        return options.func && (params.hash = options.func), data.p && ($.inArray(data.p, selection) >= 0 && (params.hash = data.p)), data.p && (players[data.p] && (window._pluginTipHide = true, $(document).ready(function() {
            yunpn.envSwitch.showIfrPage(players[data.p]);
        }), params.showIframe = true)), params.hash != "recycle" && (data.his_nid && ((data.init == "history" || data.init == "historysFile") && (yunpn.filehistory.queryUrl(data), params.showHistory = true))), params.hash == "sFile" && (data["forgetpass"] == "true" && (require([rPathConfig.authority], function(dataAndEvents) {
            dataAndEvents._forgetPassAction();
        }), params.showForgetPass = true)), params;
    }
    /**
     * @return {undefined}
     */
    function init() {
        var opts = next();
        var type = event.getCurTab();
        HistoryManager.init(function(url) {
            /** @type {string} */
            var parameters = url;
            /** @type {string} */
            var value = "/";
            /** @type {Array} */
            var result = [];
            url = url || "/";
            if (!T) {
                /** @type {boolean} */
                T = true;
                if (opts && opts.hash) {
                    url = opts.hash;
                } else {
                    if (opts && opts.showIframe) {
                        return;
                    }
                    if (opts && opts.showHistory) {
                        return;
                    }
                }
            }
            /** @type {string} */
            url = decodeURIComponent(url);
            result = parse(url);
            type = result[0];
            if (type == "file" || type == "sFile") {
                value = result[1] || "/";
            }
            if (type == "search") {
                if (result.length == 1) {
                    /** @type {string} */
                    type = "file";
                    /** @type {string} */
                    value = "/";
                    HistoryManager.add(encodeURIComponent(value));
                }
            }
            if (type == "file" && (result[1] == yunpn.filelist.path && yunpn.filelist.curFunc == "file")) {
                return false;
            }
            if (yunpn.filelist.curFunc == "recycle" && type == "recycle") {
                return false;
            }
            if (yunpn.filelist.curFunc == "link" && type == "link") {
                return false;
            }
            if (type == "sFile" && (yunpn.filelist.curFunc == "sFile" && result[1] == yunpn.filelist.path)) {
                return false;
            }
            yunpn.filelist.curFunc = type;
            yunpn.filelist.path = value;
            $("#fileList").removeClass($("#fileList").attr("data-tab")).addClass(yunpn.filelist.curFunc + "-tab").attr("data-tab", yunpn.filelist.curFunc + "-tab");
            var options = yunpn.filelist;
            options.order_recycle = yunpn.Storage.get("ORDER_RECYCLE") || "desc";
            options.order_field_recycle = yunpn.Storage.get("ORDER_FIELD_RECYCLE") || "mtime";
            options.order_link = yunpn.Storage.get("ORDER_LINK") || "desc";
            options.order_field_link = yunpn.Storage.get("ORDER_FIELD_LINK") || "mtime";
            options.order = yunpn.Storage.get("ORDER_NORMAL") || "asc";
            options.order_field = yunpn.Storage.get("ORDER_FIELD_NORMAL") || "name";
            if ($.inArray(type, elems) >= 0) {
                loading.hide();
                $("#mainTabs").show();
            }
            if (yunpn.filelist.curFunc == "recycle") {
                $.post("/authority/isRecycleBinLocked", {
                    qid : SYS_CONF.qid
                }, function(err) {
                    if (err.errno != 0) {
                        $("#tbOpenPassword").show();
                        $("#tbOpenPasswordDone").hide();
                    } else {
                        $("#tbOpenPasswordDone").show();
                        $("#tbOpenPassword").hide();
                    }
                    yunpn.filelist.list();
                    $list.find("li").removeClass("current");
                    $list.find("[data-tab=" + type + "]").addClass("current");
                }, "json");
            } else {
                if (yunpn.filelist.curFunc == "sFile") {
                    /** @type {Array} */
                    yunpn.filelist.nav = [];
                    if (yunpn.filelist.path == "/") {
                        /** @type {number} */
                        yunpn.filelist.nid = 0;
                        yunpn.filelist.list(null, null, null, null, null, null, true);
                        $list.find("li").removeClass("current");
                        $list.find("[data-tab=" + type + "]").addClass("current");
                    } else {
                        $.post("/sFile/getNodeByName/", {
                            path : yunpn.filelist.path
                        }, function(e) {
                            if (e.errno == 0) {
                                yunpn.filelist.nid = e.data.nid;
                                var match = yunpn.filelist.path.split("/");
                                /** @type {string} */
                                var baseURL = "/";
                                /** @type {number} */
                                var i = 1;
                                for (;i < match.length - 1;i++) {
                                    /** @type {string} */
                                    baseURL = baseURL + match[i] + "/";
                                    yunpn.filelist.nav.push({
                                        nid : 0,
                                        path : baseURL,
                                        title : match[i]
                                    });
                                }
                                yunpn.filelist.list(null, null, null, null, null, null, true);
                                $list.find("li").removeClass("current");
                                $list.find("[data-tab=" + type + "]").addClass("current");
                            }
                        }, "json");
                    }
                    return;
                }
                if (yunpn.filelist.curFunc == "file" || yunpn.filelist.curFunc == "link") {
                    yunpn.filelist.list(null, null, null, null, null, null, true);
                    $list.find("li").removeClass("current");
                    $list.find("[data-tab=" + type + "]").addClass("current");
                } else {
                    callback(type, result, parameters);
                }
            }
        });
    }
    /**
     * @return {undefined}
     */
    function start() {
        $.each(self, function(key_map_name, dataAndEvents) {
            self[key_map_name].on("displaymodechange", function(dataAndEvents) {
                animate();
            });
            self[key_map_name].on("listloaded", function(dataAndEvents) {
                setTimeout(animate, 200);
            });
        });
        $(window).on("resize", function() {
            animate();
        });
    }
    /**
     * @param {Object} rule
     * @param {Object} attr
     * @return {undefined}
     */
    function add(rule, attr) {
        var fileUploadButtonBar = rule.find(".search-bar");
        var inputsVariables = fileUploadButtonBar.find(".search-input");
        var s = fileUploadButtonBar.find(".y-btn-submit");
        var u = fileUploadButtonBar.find(".icon-close");
        var a = fileUploadButtonBar.find(".search-placeholder");
        var string = event.getCurTab();
        var key = attr.key;
        if (key.length) {
            if (string != "search") {
                inputsVariables.val("");
                fileUploadButtonBar.addClass("search-none").removeClass("search-have-content");
                callback("search", ["search", key], "search|" + encodeURIComponent(key));
            } else {
                self.search.show(["search", key]);
                HistoryManager.add("search|" + encodeURIComponent(key));
            }
        } else {
            if (string != "search") {
                return;
            }
            self.search.fire("searchclose");
        }
    }
    /**
     * @return {undefined}
     */
    function Class() {
        /**
         * @param {string} options
         * @return {undefined}
         */
        var init = function(options) {
            var type = event.getCurTab();
            if (type == "search" || (type == "music" || (type == "video" || type == "text"))) {
                if (options && options.path) {
                    callback("file", ["file", options.path], encodeURIComponent(options.path));
                } else {
                    callback("file");
                }
            } else {
                callback("file");
            }
        };
        self.search = new Client;
        self.search.on("searchsubmit", function(v) {
            add(self.search.getContainerNode(), v);
        });
        self.video = new bridge({
            categoryId : 4,
            categoryName : "\u89c6\u9891",
            categoryKey : "video"
        });
        self.video.on("searchsubmit", function(v) {
            add(self.video.getContainerNode(), v);
        });
        self.music = new bridge({
            categoryId : 3,
            categoryName : "\u97f3\u4e50",
            categoryKey : "music"
        });
        self.music.on("searchsubmit", function(v) {
            add(self.music.getContainerNode(), v);
        });
        self.text = new bridge({
            categoryId : 2,
            categoryName : "\u6587\u6863",
            categoryKey : "text"
        });
        self.text.on("searchsubmit", function(v) {
            add(self.text.getContainerNode(), v);
        });
        var i;
        for (i in self) {
            self[i].on("crumbclick", init);
        }
    }
    /**
     * @return {undefined}
     */
    function render() {
        $list = $(".nav");
        loading = $(".category-area");
        Class();
        init();
        $list.delegate("li", "click", function() {
            var $this = $(this);
            var tag = $this.data("tab");
            if (tag == "se" || tag == "img") {
                return;
            }
            /** @type {boolean} */
            yunpn.filelist.inSeTab = false;
            callback(tag);
        });
        start();
        update($("#mainTabs"));
    }
    /**
     * @param {Object} dt
     * @return {undefined}
     */
    function update(dt) {
        var component = dt.find(".real-search-bar");
        var element = component.find(".search-input");
        var cancel = component.find(".y-btn-submit");
        var ok = component.find(".icon-close");
        var closeEl = component.find(".search-placeholder");
        ok.on("click", function() {
            element.val("");
            component.addClass("search-none").removeClass("search-have-content");
        });
        cancel.on("click", function() {
            var encodedValue = element.val().trim();
            if (encodedValue.length) {
                element.val("");
                component.addClass("search-none").removeClass("search-have-content");
                callback("search", ["search", encodedValue], "search|" + encodeURIComponent(encodedValue));
            }
        });
        element.on("keyup", function(event) {
            if (event.keyCode == 13) {
                var encodedValue = element.val().trim();
                if (encodedValue.length) {
                    element.val("");
                    component.addClass("search-none").removeClass("search-have-content");
                    callback("search", ["search", encodedValue], "search|" + encodeURIComponent(encodedValue));
                }
            }
            if (this.value == "") {
                component.addClass("search-none").removeClass("search-have-content");
            } else {
                component.removeClass("search-none").addClass("search-have-content");
            }
        });
        /** @type {boolean} */
        hasPlaceholder = "placeholder" in document.createElement("input");
        placeholder = hasPlaceholder ? "" : element.attr("data-placeholder");
        element.on("focus", function() {
            if (!hasPlaceholder) {
                closeEl.hide();
            }
            component.addClass("search-focus");
        }).on("blur", function() {
            if (!hasPlaceholder) {
                if (this.value == "") {
                    closeEl.show();
                }
            }
            component.removeClass("search-focus");
        });
        if (hasPlaceholder) {
            closeEl.hide();
        } else {
            closeEl.show();
            closeEl.on("mousedown", function() {
                closeEl.hide();
                setTimeout(function() {
                    element.focus();
                }, 10);
            });
        }
    }
    var selection = event.TAB_LIST;
    var elems = event.MAIN_TABS;
    var image = event.TAB_NAV;
    var self = {};
    var $list;
    var loading;
    var E;
    var tref;
    /** @type {number} */
    var x = 56;
    /** @type {boolean} */
    var T = false;
    $(function() {
        loginController.init();
        render();
    });
});
