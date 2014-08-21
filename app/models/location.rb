class Location < ActiveRecord::Base
  belongs_to :item
  belongs_to :location_country
  belongs_to :location_city
  belongs_to :location_district

  delegate :name, to: :location_city, prefix: true
  delegate :name, to: :location_district, prefix: true


end