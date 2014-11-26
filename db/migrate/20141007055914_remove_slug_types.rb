class RemoveSlugTypes < ActiveRecord::Migration
  def change

   # add_column(:category_description,:type,:string,limit: 15,:default => 'jobs',null: false)
    remove_column(:category_description,:type)
    remove_column(:category_description,:slug)
    add_column(:item_categories,:slug,:string, null: false,default: '')
  end
end
