class AddCategoryType < ActiveRecord::Migration
  def change
    add_column(:category_description,:type,:string,limit: 15,:default => 'jobs',null: false)
  end
end
