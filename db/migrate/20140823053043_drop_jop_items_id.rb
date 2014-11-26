class DropJopItemsId < ActiveRecord::Migration
  def change
    remove_column(:item_tags,:job_items_id)
    remove_column(:item_location,:job_item_id)
    add_reference(:item_location,:item)
  end
end
