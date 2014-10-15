class SearchController < ApplicationController
  before_filter :check_for_mobile, only: [:browse,:main_search]
  def browse
    @result  = Item.browse(params['slug'],params['page'])
    render 'item/browse'
  end
  def main_search
    @result = Item.main_search(main_search_params, params['page'])
    @query = main_search_params
    render 'item/browse'
  end

  def main_search_params
    params.require(:item).permit(:item_category_id,
                                 item_location_attributes: [:location_district_id,:location_city_id,:location_country_id]
                             )
  end
end