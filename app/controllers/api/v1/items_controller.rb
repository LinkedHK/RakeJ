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
   def live_search
=begin
       text = live_search_params[:search]
       @item =  Item.search  do
         fulltext text do
           phrase_fields :title => 2.0
           phrase_slop 1
         end
         order_by(:created_at,:desc)
         paginate page: 1, per_page: 5
       end
       @res = ItemSearchPresenter.new(@item.results)
       # @item.results
=end

     text = live_search_params[:search]
      page = live_search_params[:page].present? ?  live_search_params[:page] : 1

     items = Item.search(text, limit: 10, page: page, fields: ["title^10", "category"], order:{created_at: :desc},
                        autocomdplete: true,analyzer: "searchkick_word_start_index")

    res = ItemPresenter.new(items)
    render :json => res.to_hash_list
   end
   def live_search_params
     params.permit(:search,:page)
   end


  end