class ItemLocation < ActiveRecord::Base
  self.table_name = "item_location"
  belongs_to :item, inverse_of: :item_location,touch: true
  belongs_to :location_country
  belongs_to :location_city
  belongs_to :location_district
  validate :check_location
  before_save :normalize_country, :normalize_city,:normalize_district

  def check_location
    self.location_city = LocationCity.find_by(id: self.location_city_id) if  self.location_city_id
    unless self.location_city
      errors.add(:base,I18n.t("form_input.validation.location_invalid"))
    end
  end

  def normalize_country
    self.location_country = LocationCountry.find_by(id: self.location_country_id) if self.location_country_id
    if self.location_country
      self.s_country = self.location_country.name
    end
  end

  def normalize_city
    # City Is a required field . and value is assigned on validation.
    self.s_city  = self.location_city.name
  end

  def normalize_district
    self.location_district = LocationDistrict.find_by(id: self.location_district_id) if self.location_district_id
    if self.location_district
      self.s_district = self.location_district.name

    end

  end

# == Schema Information

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