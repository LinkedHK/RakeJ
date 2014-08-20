class Location < ActiveRecord::Base
  belongs_to :job_item
  belongs_to :location_city
  belongs_to :location_district

  delegate :name, to: :location_city, prefix: true
  delegate :name, to: :location_district, prefix: true
end