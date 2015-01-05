class LocationController < ApplicationController


 # protect_from_forgery except: :district
  def district
    params.permit(:city_id)
    @districts = LocationDistrict.all.where(location_city_id: params[:city_id])
    render :json => {:districts => @districts}
  end

  def city



  end

end