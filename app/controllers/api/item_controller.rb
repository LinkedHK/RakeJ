module Api
  class ItemController < BaseController
    def index
      render :json => { :json => "It Works!"}
    end
  end
end
