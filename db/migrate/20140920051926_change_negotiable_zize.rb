class ChangeNegotiableZize < ActiveRecord::Migration
  def change
    change_column(:field_rate,:negotiable,:integer,{:limit => 1})
  end
end
