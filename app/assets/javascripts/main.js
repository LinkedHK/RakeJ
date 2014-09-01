(function(){


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
        }
    };

    window.WQ = self;

})();

$(function(){

function ItemCreation(){
    this.$selectCity = $("#location_city");
    this.$selectDistrict = $("#location_district");
    /*@Todo Dump Solution!*/
    this.default_text = "Please select";
    this.initListeners();
}

ItemCreation.prototype.initListeners = function(){
    this.onCityChange();
    this.onDescChange();
    this.OnItemSubmit();

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
                WQ.getDistricts(value,function(data){
                    districts[value] = self.sTemplate(data);
                    self.$selectDistrict.html(districts[value]);
                });
            }
        });
 };

 ItemCreation.prototype.onDescChange = function(){
         $(".changeable").on('keyup',function(){
           var name = $(this).attr("data_name");
             $("#input_length_"+name).text(this.value.length);
        });
};

 ItemCreation.prototype.OnItemSubmit = function(){
     $("#new_item_form").on('submit',function(e){
         e.preventDefault();
         var content = $(this).serialize();
         $.ajax({
             url: "/item/create",
             data: content,
             dataType: "json",
             method: "POST",
             error: function(){
                 alert("Some error. Please try again.")
             }
         })
             .done(function(response){

                 console.log(response);
             })
     });




};





 var item = new ItemCreation();

});