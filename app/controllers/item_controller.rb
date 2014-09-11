class ItemController < ApplicationController

  def index

  end

  def new
    @item = Item.build
    # http://stackoverflow.com/questions/9498671/one-to-one-undefined-method-build

  end

  def create
    item = Item.new(create_params)


    if item.save
      render :json => {:result => 1, :info => "Successfully created!"}
    else

      puts " Errors #{item.errors.inspect}" .colorize(:red)
      render :json => {:result => 0, :info => t("form_input.validation.unknown_error")},:status => 422
    end
  end


  def show

  end

  def create_params

  params.require(:item).permit(:item_category_id, item_descriptions_attributes: [ :item_title,:description_text ] ,
                        item_location_attributes: [ :location_couzntry_id, :location_city_id, :location_district_id],
                        item_tags_attributes: :tag_text
                      )
  end


  def item_categories




  end



end