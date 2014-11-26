class DropColumnsItem < ActiveRecord::Migration
  def change
    remove_column(:job_items,:job_description)
    remove_column(:job_items,:location_city)
    remove_column(:job_items,:location_country)
    remove_column(:job_items,:location_district)
    remove_column(:job_items,:language)
  end
end
