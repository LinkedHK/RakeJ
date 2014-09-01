class AddCategoryDescription < ActiveRecord::Migration
  def change

    drop_table(:category_description)

    create_table :category_description do |f|
      f.belongs_to :item_category
      f.string :name, limit: 100
      f.string :locale, limit: 5
    end
    add_index(:category_description,:item_category_id)
    add_index(:category_description,:locale)
  end
end
