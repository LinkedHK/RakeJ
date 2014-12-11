class LocationDistrict < ActiveRecord::Base
  self.table_name = "location_district"
  belongs_to :location_city

  def self.default_list
    self.joins(:location_city).where('location_city.default_city = 1')
  end
end

# == Schema Information

=begin

Table: location_district
  Columns:
  id	int(11) AI PK
  location_city_id	int(11)
  name	varchar(255)

=end


