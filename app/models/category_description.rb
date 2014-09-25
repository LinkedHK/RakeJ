class CategoryDescription < ActiveRecord::Base
  self.table_name = 'category_description'
  belongs_to :item_category,touch: true

  def self.get_all
    puts "Get All #{ self.first.inspect }" .colorize(:red)
    self.all.order(:name)

  end

=begin

Table: category_description
  Columns:
  id	int(11) AI PK
  item_category_id	int(11)
  name	varchar(100)
  locale	varchar(5)


=end




end