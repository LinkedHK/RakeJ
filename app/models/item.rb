class Item < ActiveRecord::Base
  has_many :item_tags
  has_one :location

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