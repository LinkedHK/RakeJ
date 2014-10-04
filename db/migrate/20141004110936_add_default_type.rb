class AddDefaultType < ActiveRecord::Migration
  def change
    add_column(:profile_types,:default,:boolean)
  end
end
