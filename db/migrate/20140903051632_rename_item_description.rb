class RenameItemDescription < ActiveRecord::Migration
  def change
    rename_column(:item_description,:item_description,:description_text)
  end
end
