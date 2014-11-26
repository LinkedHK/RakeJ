class AddItemsCounter < ActiveRecord::Migration
  def change
    add_column(:item_categories,:items_count, :integer,default: 0,null: false)
    ItemCategory.all.select(:id).each do |result|
      ItemCategory.reset_counters(result.id, :items)
    end
  end
end
