class LocationCity < ActiveRecord::Base
  self.table_name = "location_city"
  belongs_to :location_country,touch: true
  has_many :location_districts
  def default
    self.where(:default => 1)
  end
end

# == Schema Information

=begin

Table: location_city
  Columns:
  id	int(11) AI PK
  location_country_id	int(11)
  name	varchar(255)


=end


