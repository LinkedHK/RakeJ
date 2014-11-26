class AddSlugToCategory < ActiveRecord::Migration
  def change
    add_column(:category_description,:slug,:string, null: false,default: '')
    change_column(:category_description,:name,:string,null: false,default: '')
    change_column(:category_description,:locale,:string,null: false,default: 'en_US')
  end
end
