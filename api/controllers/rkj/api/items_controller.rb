module RKJ
  module API
    class ItemsController < RKJ::API::BaseController
      def index
        render :json => { :result => "It works!" }
      end
    end
  end
end