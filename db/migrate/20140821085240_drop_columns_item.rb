class DropColumnsItem < ActiveRecord::Migration
  def change
    remove_column(:items,:job_description)
    remove_column(:items,:location_city)
    remove_column(:items,:location_country)
    remove_column(:items,:location_district)
    remove_column(:items,:language)
  end
end
