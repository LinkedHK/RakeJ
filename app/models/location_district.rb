class LocationDistrict < ActiveRecord::Base
  has_many :locations
  belongs_to :location_city

end