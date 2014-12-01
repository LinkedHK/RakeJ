 class Api::V1::ItemsController < Api::V1::BaseController
    def show
    #information-technology
      @item =  Item.browse("information-technology",params['page'], 10)
      render :json =>  @item.as_json(include: 
      	{ item_descriptions:{ :only =>[:item_title]},
      	item_location:{ :except => 
      	[:id, :item_id,:location_district_id,:location_city_id,:d_coord_lat,:d_coord_long ] }
      	 })
    end

    def browse_by
      #information-technology
      @item =  Item.browse(params['category'],params['page'], 10)
      render :json =>  @item.as_json(include:
                                         { item_descriptions:{ :only =>[:item_title]},
                                           item_location:{ :except =>
                                                               [:id, :item_id,:location_district_id,:location_city_id,:d_coord_lat,:d_coord_long ] }
                                         })
    end

    def list_cat
      @cats = CategoryDescription.where(:locale => 'en_US').joins(:item_category)
                  .select('category_description.item_category_id as id,category_description.name, item_categories.items_count')
      render :json =>  @cats.as_json
    end



   def show_item
     @item = ItemPresenter.new(Item.where(id: show_params[:id]).first)
     render :json =>  {
                :id => @item.id,
                :title=> @item.title,
                        :description => @item.description,
                        :category =>  @item.category,
                        :published => @item.created,
                        :modified => @item.modified,
                        :location => @item.location,
                        :rate => @item.rate
            }
   end

    def show_params
        params.permit(:id)
    end

   def browse_by_params
     params.permit(:id, :category, :page)
   end

  end