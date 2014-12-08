 class Api::V1::ItemsController < Api::V1::BaseController

    def browse_by
      #information-technology

      @item = ItemPresenter.new(Item.browse(params['category'],params['page'], 10))
      render :json => @item.to_hash_list.as_json
    end

    def list_cat
      # Todo move this crap to the presentation layer
      @cats = CategoryDescription.where(:locale => 'en_US').joins(:item_category)
                  .select('category_description.item_category_id as id,category_description.name, item_categories.items_count')
      render :json =>  @cats.as_json
    end

   def show_item
     @item = ItemPresenter.new(Item.where(id: show_params[:id]).first)
     render :json => @item.to_hash
   end
    def show_params
        params.permit(:id)
    end

   def browse_by_params
     params.permit(:id, :category, :page)
   end

  end