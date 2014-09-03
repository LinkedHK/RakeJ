class Item < ActiveRecord::Base



  has_many :item_tags, :dependent => :destroy
  has_many :item_descriptions, :dependent => :destroy
  has_one :item_location, :dependent => :destroy, class_name: ItemLocation
  belongs_to :item_category, class_name: "ItemCategory"

  accepts_nested_attributes_for :item_descriptions
  accepts_nested_attributes_for :item_location
  accepts_nested_attributes_for :item_tags


# == Schema Information

=begin

  Table: items
  Columns:
    id	int(11) AI PK
    user_id	int(11)
    created_at	datetime
    updated_at	datetime


=end



end