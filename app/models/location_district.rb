class LocationDistrict < ActiveRecord::Base
  self.table_name = "location_district"
  belongs_to :location_city





end

# == Schema Information

=begin

Table: location_district
  Columns:
  id	int(11) AI PK
  location_city_id	int(11)
  name	varchar(255)

=end


