
    function TagEditor(option) {
        this.$inputTag = option.inputTag;
        this.maxTag = option.maxTag || 4; // Max Tag
        this.tagNumber = 0;
        this._initTags();
        this.$tagSet = $("#tagsSet");
        this.$fakeTag = $("#fakeTag");
        this.tagsCache = [];
        this.tagAddListeners = [];
        this.tagRemoveListeners = [];

        this.tagChangeListeners = [];
        this.initListeners();
    }
    TagEditor.prototype._initTags = function () {
        this.$inputTag.hide();
        this.$inputTag.parent().append("<ul class='tagsSet_wrapper form-control' id='tagsSet'>" +
            "" +"<li class='tagsSet_input'>" +
            "<input type='text' maxlength='29' autocomplete='off' class='tagBox_hiddeninput' id='fakeTag'/>" +
            "</li>"
            +
            "<ul>");
    };

    TagEditor.prototype.initListeners = function(){
        this.OnEditRag();
        this.OnCloseTag();
        this.OnTagSetClick();

    };
    TagEditor.prototype.OnTagAdd = function(callback){
        this.tagAddListeners.push(callback);
    };

    TagEditor.prototype.OnTagRemove  = function(callback){
        this.tagRemoveListeners.push(callback);
    };
    TagEditor.prototype._notifyAdd = function(e) {
        this.tagAddListeners.forEach(function(callback){
            callback(e);
        })
    };

    TagEditor.prototype.OnChangeTag = function(callback){
        this.tagAddListeners.push(callback);

    };
    TagEditor.prototype._notifyChangeTag = function(e) {
        this.tagAddListeners.forEach(function (callback) {
            callback(e);

        });
    };

    TagEditor.prototype._notifyAdd = function(e){
        this.tagRemoveListeners.forEach(function(callback){
            callback(e);

        });
    };

    TagEditor.prototype.OnEditRag = function () {
        var self = this;
        this.$fakeTag.on('keyup',function(e){
                 self._handleInput(this.value);
        });
      this.$fakeTag.on('keydown',function(e){
          if(self.isBackspace(e)){
              self._handleBackspace();
          }
      })
    };
    TagEditor.prototype.OnTagSetClick = function(){
        var self = this;
        this.$tagSet.on("click",function(){
            self.$fakeTag.focus();
        });
    };
    TagEditor.prototype._handleBackspace = function(){
        var i = this.$tagSet.children("li.tagsBox").last();
        if(i) this.deleteTag(i);
    };

    TagEditor.prototype.isBackspace = function(e){
        /*
            8 backspace  46 Delete
         */
        return ((e.keyCode == 8 || e.keyCode == 46) && this.$fakeTag.val()=== '');
    };
    TagEditor.prototype._handleInput = function(v){
        var self = this;
        if(v.match(/[,|\s]/)){
            this._handleNewTags();
        }
    };
    TagEditor.prototype._handleNewTags = function(){
        var self = this;
        var val = this.$fakeTag.val().split(/[,|\s]/);
        val.forEach(function(i){
            if(i.length > 0){
                self.addTag(i);

            }
        });
        this.$fakeTag.val("");
    };

    TagEditor.prototype.OnCloseTag = function(){
        var self = this;
        $(document.body).on('click', '#tagsSet li span', function(e){
            self.deleteTag($(this).parent());
        });
    };

    TagEditor.canAddTag = function(){
        return !this.exceedTagNumber();
    };

    TagEditor.prototype.deleteTag = function($element) {
        var i = $element.attr('val_data');
        i = window.RjApp.escapeHtml(i);
        delete this.tagsCache[i];
        $element.remove();
        this.updateInput();
        this.notifyListeners();
    };

    TagEditor.prototype.notifyListeners = function(){
        var e = { tagNumber: this.getCacheSize() };
        this._notifyChangeTag(e);
        this._notifyAdd(e)
    };
    TagEditor.prototype.addTag = function (i) {
        if(this.exceedTagNumber()) return;
        i = window.RjApp.escapeHtml(i);
        if(this.tagsCache[i]) return this._markAsDuplicate(i);
        var template = this.buildLiTemplate(i);
        this.addToCache(i);
        $(template).insertBefore(".tagsSet_input");
        this.updateInput();
        this.notifyListeners();
    };

    TagEditor.prototype.getCacheSize = function(){
            return window.RjApp.objSize(this.tagsCache);
    };

    TagEditor.prototype.buildLiTemplate = function(i){
        return "<li class='tagsBox' val_data=" + i + ">" + i
            +  "<span class='tagsBox_closetag'>×</span>"
            +
            "</li>";
    };
    TagEditor.prototype.exceedTagNumber = function(){
        return   this.getCacheSize()  == this.maxTag;
    };
    TagEditor.prototype.updateInput = function(){
        var result = "";
        this.iterateTagCache(function(tag){
            result  += tag + ",";
        });
     result = result.replace(/[,]$/,"");
        this.$inputTag.val(result);
    };

    TagEditor.prototype.iterateTagCache = function(callback){
        for(var i in this.tagsCache){
            if(this.tagsCache.hasOwnProperty(i)){
                callback(this.tagsCache[i]);
            }
        }
    };
    TagEditor.prototype._markAsDuplicate = function(i){
        var $elem = this.findTag(i);
        $elem.css("color","red");
             window.setTimeout(function(){
                $elem.css("color","inherit");
            },500);
    };

    TagEditor.prototype.findTag = function(i){
        return this.$tagSet.children("li[val_data='" + i + "']");
    };

    TagEditor.prototype.addToCache = function(i){
        this.tagsCache[i] = i;
    };





