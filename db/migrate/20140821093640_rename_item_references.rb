class RenameItemReferences < ActiveRecord::Migration
  def change
    remove_reference(:item_tags,:job_item_id)
    add_reference(:item_tags,:item)
    add_reference(:item_categories,:parent)
  end
end
