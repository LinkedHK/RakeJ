class ItemDescription < ActiveRecord::Base
  self.table_name = 'item_description'
  belongs_to :item
  validates_presence_of :item_title, :description_text

=begin
Table: item_description
  Columns:
  id	int(11) AI PK
  item_id	int(11)
  item_title	varchar(255)
  item_description	text
  locale	varchar(10)
=end



end