class LocationCity < ActiveRecord::Base
  self.table_name = "location_city"
  belongs_to :location_country

end