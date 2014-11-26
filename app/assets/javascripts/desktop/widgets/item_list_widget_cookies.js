
function WIDGET_item_list_cookies(item_list){
    this.item_list = item_list;

}

WIDGET_item_list_cookies.prototype.setItem = function(item_id){
    $.cookie("selected_item",item_id)
};
WIDGET_item_list_cookies.prototype.getItem = function(){
    return  $.cookie("selected_item");
};


