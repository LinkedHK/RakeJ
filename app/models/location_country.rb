class LocationCountry < ActiveRecord::Base
  self.table_name = "location_country"
  has_many :location_cities

end


# == Schema Information



=begin

Table: location_country
  Columns:
  id	int(11) AI PK
  name	varchar(255)


=end