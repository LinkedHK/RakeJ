class ItemController < ApplicationController

  def index
    respond_to do |format|
     # format.json{ render json: Item.all.limit(10).as_json(Item.show_as_json) }
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

  def browse
    @result  = ItemCategory.browse(params['slug'])
  end

  def show
    @item = ItemPresenter.new(Item.where(id: params[:item_id]).first)
    respond_to do |format|
      if request.xhr?
        format.html{ render :partial => 'item/shared/ajax/show'}
      end
        format.html
        format.json { render json: @item.as_json(Item.show_as_json) }
    end
  end


  def main_search
    @result = Item.main_search(main_search_params)
    render 'item/browse'
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

  def main_search_params
    params.require(:item).permit(:item_category_id,
                                 item_location_attributes: [:location_district_id],
                             )
  end





end