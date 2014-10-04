class Rename < ActiveRecord::Migration
  def change
    drop_table(:user_types)
  end
end
