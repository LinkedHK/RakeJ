class RenameDefCity < ActiveRecord::Migration
  def change
    rename_column(:location_city,:default,:default_city)
  end
end
