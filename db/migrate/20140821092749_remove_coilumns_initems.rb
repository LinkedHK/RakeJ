class RemoveCoilumnsInitems < ActiveRecord::Migration
  def change
    remove_column(:items,:item_categories_id)
    remove_column(:items,:job_type)
    remove_column(:items,:duration_day)
    remove_column(:items,:duration_weeks)
    remove_column(:items,:duration_month)
    remove_column(:items,:planned_start_date)
    remove_column(:items,:salary_min)
    remove_column(:items,:salary_max)
    remove_column(:items,:currency)
    remove_column(:items,:job_status)
  end
end
