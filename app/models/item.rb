class Item < ActiveRecord::Base
  include Concerns::Taggable
  include Concerns::Item::Browseable
  #include Concerns::Searchable
  has_many :item_descriptions,  :dependent => :destroy
  has_one :field_rate, :dependent => :destroy, inverse_of: :item
  has_one :item_location
  belongs_to :item_category,counter_cache: true
  accepts_nested_attributes_for :item_descriptions
  accepts_nested_attributes_for :item_location
  accepts_nested_attributes_for :field_rate
  validate :check_category
  attr_reader :slug

  searchkick settings: {number_of_shards: 1},
             text_start: [:title]

 # attr_accessor :item_category_id
  #attr_accessor :item_location

=begin
  searchable do
    text :title do
        item_descriptions.map{ |item_desc| item_desc.item_title }
    end
    text :category do
      item_category.category_descriptions.map{ |cat_descr| cat_descr.name }
    end
    time :created_at
    integer :item_category_id
  end
=end
  def self.build
   item = self.new
   item.item_descriptions.build
   item.build_item_location
   item.item_tags.build
   item.build_field_rate
  item
  end
  def slug
   category = self.item_category
   slug = category.slug
    if slug.blank?
      slug = category.id
    end
    slug
  end
  def check_category
    category_id =  ItemCategory.find_by(id: self.item_category_id )
    unless category_id
      errors.add(:item_category, I18n.t("form_input.validation.category_invalid"))
    end
  end

  def self.show_as_json
    {:include =>  [:item_tags,{ item_descriptions: { only: [:item_title, :description_text] } } ] }
  end

  def search_data
    {
        title: item_descriptions.map(&:item_title),
        category: item_category.category_descriptions.map(&:name),
        created_at: created_at
    }
  end



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