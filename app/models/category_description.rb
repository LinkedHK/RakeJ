class CategoryDescription < ActiveRecord::Base
  self.table_name = 'category_description'
  belongs_to :item_category

=begin

Table: category_description
  Columns:
  id	int(11) AI PK
  item_category_id	int(11)
  name	varchar(100)
  locale	varchar(5)


=end




end