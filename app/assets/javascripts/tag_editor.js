
    function TagEditor(option) {
        this.$inputTag = option.inputTag;
        this.maxTag = option.maxTag || 4; // Max Tag
        this.tagNumber = 0;
        this._initTags();
        this.$tagSet = $("#tagsSet");
        this.$fakeTag = $("#fakeTag");
        this.tagsCache = [];
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
    TagEditor.prototype.OnEditRag = function () {
        var self = this;
        this.$fakeTag.on('keyup',function(e){
                 self.HandleInput(this.value);
        });
      this.$fakeTag.on('keydown',function(e){

          if(self.isBackspace(e)){
              self.handleBackspace();
          }
      })
    };
    TagEditor.prototype.OnTagSetClick = function(){
        var self = this;
        this.$tagSet.on("click",function(){
            self.$fakeTag.focus();
        });
    };
    TagEditor.prototype.handleBackspace = function(){
        var i = this.$tagSet.children("li.tagsBox").last();
        if(i) this.deleteTag(i);
    };

    TagEditor.prototype.isBackspace = function(e){
        /*
            8 backspace  46 Delete
         */
        return ((e.keyCode == 8 || e.keyCode == 46) && this.$fakeTag.val()=== '');
    };
    TagEditor.prototype.HandleInput = function(v){
        var self = this;
        if(v.match(/[,|\s]/)){
            this.handleNewTags();
        }
    };
    TagEditor.prototype.handleNewTags = function(){
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

    TagEditor.prototype.deleteTag = function($element) {
        var i = $element.attr('val_data');
        delete this.tagsCache[i];
        this.tagNumber--;
        $element.remove();
        this.updateInput();
    };



    TagEditor.prototype.addTag = function (i) {
        if(this.exceedTagNumber()) return;
        i = window.RjApp.escapeHtml(i);
        if(this.tagsCache[i]) return this._markAsDuplicate(i);
        var template = this.buildLiTemplate(i);
        this.addToCache(i);
        $(template).insertBefore(".tagsSet_input");
        this.tagNumber++;
        this.updateInput();
    };

    TagEditor.prototype.buildLiTemplate = function(i){
        return "<li class='tagsBox' val_data=" + i + ">" + i
            +  "<span class='tagsBox_closetag'>×</span>"
            +
            "</li>";
    };

    TagEditor.prototype.exceedTagNumber = function(){
        return  this.tagNumber == this.maxTag;
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





