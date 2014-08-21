class LocationCity < ActiveRecord::Base
  has_many :locations
  belongs_to :location_country

end