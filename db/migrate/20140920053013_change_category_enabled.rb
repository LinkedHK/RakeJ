class ChangeCategoryEnabled < ActiveRecord::Migration
  def change
    change_column(:item_categories,:enabled,:integer,{:default => 0,:limit => 1})
  end
end
