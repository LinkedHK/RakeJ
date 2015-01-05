class AddDefaultCity < ActiveRecord::Migration
  def change
    add_column(:location_country, :default,:boolean, null: false,default: 0)
    add_column(:location_city, :default_city,:boolean, null: false,default: 0)
    add_index(:location_city,:default_city)
  end
end
