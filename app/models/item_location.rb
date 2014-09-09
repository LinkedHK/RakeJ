class ItemLocation < ActiveRecord::Base
  self.table_name = "item_location"
  belongs_to :item, inverse_of: :item_location
  belongs_to :location_country
  belongs_to :location_city
  belongs_to :location_district


=begin
Table: item_location
  Columns:
      id	int(11) AI PK
  location_country_id	int(11)
  s_country	varchar(255)
  location_city_id	int(11)
  s_city	varchar(255)
  location_district_id	int(11)
  s_district	varchar(255)
  d_coord_lat	decimal(10,6)
  d_coord_long	decimal(10,6)
  item_id	int(11)
=end
end