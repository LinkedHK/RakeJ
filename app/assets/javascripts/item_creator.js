$(function(window){
    function ItemCreation(option){
        this.$itemForm = option.itemForm || $("#new_item_form");
        this.$selectCity =  option.selectCity ||  $("#location_city");
        this.$selectDistrict = option.selectDistrict || $("#location_district");
        this.$tagsEditor = option.tagsEditor || $("#tags_editor");
        this.$formUrl = option.formUrl || "/item/create";
        this.$tagIndicator = option.tagIndicator  || $("#tag_number");
        this.$buttonSubmit = $("#button_submit");
        /*@Todo Dump Solution!*/
        this.default_text = "Please select";

        this.$formError = option.errorsList || $("#errors_list");


        this.initListeners();
    }

    ItemCreation.prototype.initListeners = function(){
        this.onCityChange();
        this.onDescChange();
        this.OnItemSubmit();
        this.OnTagEdit();


    };

    ItemCreation.prototype.sTemplate = function(data){
        var html = "";
        html +=  "<option value=''>" + this.default_text + "</option>";
        if(data.districts.length > 0){
            $.each(data.districts,function(i,item){
                html += "<option value='" + item.id +"'>"+ item.name +"</option>"
            });
        }
        return html;
    };

    ItemCreation.prototype.onCityChange = function(){
        var self = this;
        var districts = [];
        self.$selectCity.on('change',function(){
            var value = this.value;
            if(!value) return;
            if(districts[value]){
                self.$selectDistrict.html(districts[value]);
            }else{
                RjApp.getDistricts(value,function(data){
                    districts[value] = self.sTemplate(data);
                    self.$selectDistrict.html(districts[value]);
                });
            }
        });
    };
    ItemCreation.prototype.onDescChange = function(){
        $(".changeable").on('keyup',function(){
            var name = $(this).attr("data_name");
            $(".input_length_"+name).text(this.value.length);
        });
    };
    ItemCreation.prototype.disableButton = function(state){
        this.$buttonSubmit.toggleClass("disabled",state);
    };
    ItemCreation.prototype.OnItemSubmit = function(){
        var self = this;
        this.$itemForm.on('submit',function(e){
            e.preventDefault();
            self.disableButton(true);
            var content = $(this).serialize();
            $.ajax({
                url: self.$formUrl,
                data: content,
                dataType: "script",
                method: "POST"
            })
        });
        ItemCreation.prototype.OnTagEdit = function(){
            var self = this;
            var tagEditor = new TagEditor({inputTag:  self.$tagsEditor,maxTag: 4 });
            tagEditor.OnChangeTag(function(e){
                    self.$tagIndicator.text(e.tagNumber);
            });
        }
    };
    var item = new ItemCreation({
        itemForm: $("#new_item_form"),
        selectCity: $("#location_city"),
        selectDistrict: $("#location_district"),
        tagsEditor: $("#tags_editor"),
        tagIndicator: $("#tag_number"),
        formUrl: "/item/create",
        errorsList: $("#errors_list")
    });

    $("#demo_submit").on("click",function(){
        $.ajax({
            url: '/item/demo',
            dataType: "script",
            method: "POST"
        });
    })

});
