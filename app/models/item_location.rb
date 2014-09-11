class ItemLocation < ActiveRecord::Base
  self.table_name = "item_location"
  belongs_to :item, inverse_of: :item_location
  belongs_to :location_country
  belongs_to :location_city
  belongs_to :location_district

  validate :check_location


  def check_location
    self.location_city = LocationCity.find_by(id: self.location_city_id) if  self.location_city_id
    self.location_country = LocationCountry.find_by(id: self.location_country_id) if self.location_country_id
    self.location_district = LocationDistrict.find_by(id: self.location_district_id) if self.location_district_id
   if !self.location_city || !self.location_district
     errors.add(:base,I18n.t("form_input.validation.location_invalid"))
   end
  end
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