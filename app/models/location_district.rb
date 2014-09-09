class LocationDistrict < ActiveRecord::Base
  self.table_name = "location_district"
  belongs_to :location_city


end