class ItemController < ApplicationController

  def index
    @items = Item.all.limit(10)

    respond_to do |format|
      format.json{ render json: @items.as_json(Item.show_as_json) }
      format.html
    end
  end

  def new
    @item = Item.build
    # http://stackoverflow.com/questions/9498671/one-to-one-undefined-method-build
  end
  def create
    puts " Create params #{create_params.inspect}".colorize(:red)

    @item = Item.new(create_params)
    @saved = @item.save

    respond_to do |format|
      if @saved
        format.json {render json:  { :result  => 1, :info => t("form_input.item.item_creation_successfull") }}
      else
        format.json { render json: { :result => 0, :info => t("form_input.validation.unknown_error"), validation_error: @item.errors}, status: 422 }
      end
      format.js { render 'item/shared/new_item/item_creation_result' }
    end
  end

  def show
    @item = Item.find_by(id: params[:item_id])
    render :json => @item.as_json(Item.show_as_json)
  end

  def edit


  end

  def create_params

  params.require(:item).permit(:item_category_id, item_descriptions_attributes: [ :item_title,:description_text ] ,
                        item_location_attributes: [:location_country_id, :location_city_id, :location_district_id],
                        item_tags_attributes: :tag_text,
                        field_rate_attributes: [:rate_number,:field_currency_id, :negotiable,:rate_min,:rate_max]
                      )
  end



  def item_categories




  end



end