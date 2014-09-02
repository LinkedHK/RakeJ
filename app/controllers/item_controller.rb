class ItemController < ApplicationController

  def index

  end

  def new

    @item = Item.new
    description = @item.item_descriptions.build
    category = @item.build_item_category
    location = @item.build_item_location

    # http://stackoverflow.com/questions/9498671/one-to-one-undefined-method-build



  end

  def create

    puts "Create Params: #{create_params.inspect}"
  creator = Item.new(create_params)
  puts "params #{params.inspect}"

  d = params[:item][:description]
  creator.item_descriptions = [ItemDescription.new(item_title: d[:item_title],item_description: d[:item_description])]
  category = ItemCategory.find_by(id: params[:category][:item_category_id])
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


  params.require(:item).permit(:item_category_id,description_attributes:[:item_title,:item_description],
                               location_attributes: [:city,:district],
                                item_tags_attributes:[:name]
                              )






  end


  def item_categories




  end



end