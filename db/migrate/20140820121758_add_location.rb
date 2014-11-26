class AddLocation < ActiveRecord::Migration
  def change
    create_table :location_country do |t|
      t.string :name, null: false
    end
    create_table :location_city do |t|
      t.belongs_to :location_country
      t.string :name
    end

    create_table :location_district do |t|
      t.belongs_to :location_city
      t.string :name
    end

    add_index(:location_country,:name,:unique => true)

    add_index(:location_city,:name,unique: true)
    add_index(:location_city,:location_country_id)

    add_index(:location_district,:name,:unique => true )
    add_index(:location_district,:location_city_id )


  end
end
