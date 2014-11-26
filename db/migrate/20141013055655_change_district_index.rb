class ChangeDistrictIndex < ActiveRecord::Migration
  def change
    remove_index(:location_district,:name)
    add_index(:location_district,:name)
  end
end
