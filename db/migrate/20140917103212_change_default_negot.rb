class ChangeDefaultNegot < ActiveRecord::Migration
  def change
   remove_column(:field_rate,:negotiable)
   add_column(:field_rate,:negotiable,:integer,default: 0)
  end
end
