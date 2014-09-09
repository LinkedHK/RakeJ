class ItemController < ApplicationController

  def index

  end

  def new

    @item = Item.new
    @item.item_descriptions.build
    @item.build_item_location
    @item.item_tags.build
    # http://stackoverflow.com/questions/9498671/one-to-one-undefined-method-build

  end

  def create
    item = Item.new(create_params)
    item.save
    if item.errors
      render :json => {:result => 0, :info => item.errors}
    else
      render :json => {:result => 1, :info => item}
    end
  end


  def show

  end

  def create_params



=begin
"item"=>{"item_descriptions_attributes"=>{"0"=>{"item_title"=>"Item Title",
"description_text"=>"Item Descr"}},
"item_category_id"=>"3",
"item_location_attributes"=>{"location_city_id"=>"1",
"location_district_id"=>"1"},
"item_tags_attributes"=>{"0"=>{"tag_text"=>"Test, Best"}}}}
=end


  params.require(:item).permit(:item_category_id, item_descriptions_attributes: [ :item_title,:description_text ] ,
                        item_location_attributes: [ :location_couzntry_id, :location_city_id, :location_district_id],
                        item_tags_attributes: :tag_text
                      )
  end


  def item_categories




  end



end