class CategoryDescription < ActiveRecord::Base
  self.table_name = 'category_description'
  belongs_to :item_category


end