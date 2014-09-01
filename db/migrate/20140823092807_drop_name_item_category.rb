class DropNameItemCategory < ActiveRecord::Migration
  def change
    remove_column(:item_categories,:name)
    add_column(:item_categories,:enabled,:boolean)
    add_index(:item_categories,:enabled)
    add_reference(:items,:item_categories)
  end
end
