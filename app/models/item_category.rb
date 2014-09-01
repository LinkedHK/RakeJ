class ItemCategory < ActiveRecord::Base
  self.table_name = 'item_categories'
  has_many :items, :dependent => :destroy
  has_many :category_descriptions, :dependent => :destroy

  has_many :childs, class_name: "ItemCategory",
                    foreign_key: "parent_id", :dependent => :destroy

  belongs_to :parent,class_name: "ItemCategory"



end