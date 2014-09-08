class Item < ActiveRecord::Base
  has_many :item_tags, :dependent => :destroy
  has_many :item_descriptions, :dependent => :destroy
  has_one :item_location, :dependent => :destroy, class_name: ItemLocation
  belongs_to :item_category, class_name: "ItemCategory"

  accepts_nested_attributes_for :item_descriptions
  accepts_nested_attributes_for :item_location
  accepts_nested_attributes_for :item_tags

  def item_tags_attributes=(tags)
    tag_set = tags["0"][:tag_text].split(",")
    if tag_set.length > 0
      tag_set.each do |tag|
        item_tags.build(tag_text: tag)
      end
    end
  end

  #def item_tags_attributes
   # item_tags.map(&:tag_text).join(",")
  #end
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