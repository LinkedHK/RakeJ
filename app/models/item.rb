class Item < ActiveRecord::Base
  has_many :item_tags , :dependent => :destroy
  has_many :item_descriptions,  :dependent => :destroy
  has_one :field_rate, :dependent => :destroy, inverse_of: :item
  has_one :item_location,  inverse_of: :item,  :dependent => :destroy
  belongs_to :item_category,  inverse_of: :item,class_name: "ItemCategory"
  attr_accessor :item_tags_list

  accepts_nested_attributes_for :item_tags
  accepts_nested_attributes_for :item_descriptions
  accepts_nested_attributes_for :item_location

  validate :check_category

  def self.build
   item = self.new
   item.item_descriptions.build
   item.build_item_location
   item.item_tags.build
   item.build_field_rate
  item
  end
  def check_category
    category_id =  ItemCategory.find_by(id: self.item_category_id )
    unless category_id
      errors.add(:item_category, I18n.t("form_input.validation.category_invalid"))
    end
  end

  def item_tags_list
    self.item_tags.map(&:tag_text).join(", ")
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