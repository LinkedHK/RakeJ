class ItemController < ApplicationController

  def index

  end

  def new

    @item = Item.new

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


  def sreate

  puts "Create Params: #{create_params.inspect}"
  creator = Item.new(create_params)
  puts "params #{params.inspect}"

  d = params[:item][:description]
  creator.item_descriptions = [ItemDescription.new(item_title: d[:item_title],item_description: d[:item_description])]
  category = ItemCategory.find_by(id: params[:category][:item_coategory_id])
  city = LocationCity.find_by(id: params[:location][:city])
  district = LocationDistrict.find_by(id: params[:location][:district])

  creator.item_location = ItemLocation.new(location_city: city,location_district: district)
  creator.item_category = category

  puts "ItemDescription #{params[:item][:description].inspect}"
#  creator.item_descriptions = ItemDescription.new(params[:item][:description])


  creator.save
  puts "Creator Item Category: #{ creator.inspect }"
    if creator.errors
      render :json => {:result => 0, :info => creator.errors}
    else
      render :json => {:result => 1, :info => creator}
    end
  end


  def show

  end

  def create_params



=begin
"item"=>{"item_description"=>{"item_title"=>"Test Title", "item_description"=>"Test description"}}, "item_category"=>{"item_category_id"=>"1"}, "item_location"=>{"location_city"=>"1", "location_district"=>"1"}, "item_tags"=>{"tag_text"=>"Test, Central"}}

=end

  params.require(:item).permit(:item_category,item_tag_attributes:[:tag_text],item_description_attributes:[:item_title,:item_description],

                               item_location_attributes: [:location_country,:location_city,:location_district])
  end


  def item_categories




  end



end