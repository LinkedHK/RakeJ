class AddItemLocationTable < ActiveRecord::Migration
  def change
    create_table :item_location do |t|
      t.belongs_to :job_item
      t.belongs_to :location_country
      t.string :s_country
      t.belongs_to :location_city
      t.string :s_city
      t.belongs_to :location_district
      t.string :s_district
      t.decimal :d_coord_lat ,{:precision => 10 ,:scale => 6}
      t.decimal :d_coord_long ,{:precision => 10 ,:scale => 6}
    end

  end
end
