class ItemCategory < ActiveRecord::Base
  self.table_name = 'item_categories'
  belongs_to :items

  has_many :childs, class_name: "ItemCategory",
                    foreign_key: "parent_id"

  belongs_to :parent,class_name: "ItemCategory"



end