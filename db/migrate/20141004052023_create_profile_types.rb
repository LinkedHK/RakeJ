class CreateProfileTypes < ActiveRecord::Migration
  def change
    create_table :profile_types do |t|
      t.string :profile_name, { :limit => 20,:null => false }
      t.string :profile_description
      t.integer :enabled, { :limit => 1,:default => 0 }
      t.timestamps
    end
  end
end
