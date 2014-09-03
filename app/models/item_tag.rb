class ItemTag < ActiveRecord::Base
  belongs_to :item

  before_create do

    self.tag_added = DateTime.now
  end


=begin
Table: item_tags
  Columns:
  id	int(11) AI PK
  item_id	int(11)
  tag_text	varchar(40)
  tag_added	datetime

=end



end