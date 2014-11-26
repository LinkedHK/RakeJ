class RenameRateNumber < ActiveRecord::Migration
  def change
    rename_column(:field_rate,:rate_number,:rate_min)
    add_column(:field_rate,:rate_max,:integer,default: 0)
    change_column_default(:field_rate,:rate_min,0)
  end
end
