class ItemCategory < ActiveRecord::Base
  self.table_name = 'item_categories'
  has_many :items
  has_many :category_descriptions, :dependent => :destroy
  has_many :childs, class_name: "ItemCategory",
                    foreign_key: "parent_id", :dependent => :destroy

  belongs_to :parent,class_name: "ItemCategory"




# == Schema Information

=begin

Table: item_categories
  Columns:
  id	int(11) AI PK
  parent_id	int(11)
  enabled	tinyint(1)

=end




end