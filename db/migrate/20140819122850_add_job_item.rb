class AddJobItem < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.belongs_to :user
      t.belongs_to :item_categories
      t.string :job_type #(Permanent, Temporary)
      t.integer :duration_day #(Day, Weeks, Month)
      t.integer :duration_weeks
      t.integer :duration_month
      t.string :job_status #(Closed, Cancelled, Open)
      t.string :location_country
      t.string :location_city
      t.string :location_district
      t.string :job_title, null:false
      t.text :job_description, limit: 2000
      t.datetime :planned_start_date
      t.integer :salary_min
      t.string :salary_max
      t.string :currency ,limit: 10
      t.string :language, limit: 10
      t.timestamps
    end

    add_index(:items,:user_id)


  end
end
