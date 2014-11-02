 class Api::V1::ItemsController < Api::V1::BaseController
    def show
      @item = Item.all.page(1)
      render :json => { :result => @item.as_json(include: { item_descriptions:{ :only =>[:item_title]},item_location:{} })}
    end
  end