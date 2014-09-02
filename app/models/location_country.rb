class LocationCountry < ActiveRecord::Base
  self.table_name = "location_country"
  has_many :location_cities
end