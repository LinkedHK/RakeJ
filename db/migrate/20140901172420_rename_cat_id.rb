class RenameCatId < ActiveRecord::Migration
  def change
    rename_column(:items,:item_categories_id,:item_category_id)
  end
end
