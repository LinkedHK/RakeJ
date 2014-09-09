class Item < ActiveRecord::Base
  has_many :item_tags , :dependent => :destroy
  has_many :item_descriptions,  :dependent => :destroy
  has_one :item_location,  inverse_of: :item,  :dependent => :destroy
  belongs_to :item_category,  inverse_of: :item,class_name: "ItemCategory"

  accepts_nested_attributes_for :item_tags
  accepts_nested_attributes_for :item_descriptions
  accepts_nested_attributes_for :item_location

  def description_empty(attribute)
    (attribute[:item_title].blank? ||
    attribute[:description_text].blank?)
  end
  def item_tags_attributes=(tags)
    if tags["0"]
      tag_set = tags["0"][:tag_text].split(",")
      if tag_set.length > 0
          tag_set.each_with_index do |tag,i|
            break if i == 4
          item_tags.build(tag_text: tag)
        end
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