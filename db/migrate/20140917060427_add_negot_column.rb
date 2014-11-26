class AddNegotColumn < ActiveRecord::Migration
  def change
    add_column(:field_rate,:negotiable,:integer)
  end
end
