(function(window, document, undefined){


    var self = {
        getDistricts : function(id,callback){
            $.ajax({
                method: 'GET',
                dataType: "json",
                url: "/location/district/" + id
            })
                .done(function(data){
                    return callback(data);
                })
        },
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

        escapeHtml: function(val){
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            return String(val).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        },

        stripHtml : function(val){
            return String(val).replace(/[&<>"'\/]/g,"");
        },

        escapeRegExp : function(str){
            // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },

        is_mobile: function(){
           return $.browser.mobile || Modernizr.mq('(max-width: 767px)');

        },
        objSize : function(array){
            var size = 0, key;
            for (key in array) {
                if (array.hasOwnProperty(key)) size++;
            }
            return size;
        }
    };
    window.RjApp = self

})(window, document);