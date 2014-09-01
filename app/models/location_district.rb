class LocationDistrict < ActiveRecord::Base
  self.table_name = "location_district"
  has_many :locations
  belongs_to :location_city

end