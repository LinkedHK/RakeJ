# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


categories = [
    [-1, 'Accounting'],
    [-1, 'HR'],
    [-1, 'Banking / Finance'],
    [-1, 'Marketing / Public Relations'],
    [-1, 'Design'],
    [-1, 'Sales, CS & Business Dev'],
    [-1, 'Engineering']
]
categories.each do |parent_id,description|
 cat = ItemCategory.create(parent_id: parent_id)
  CategoryDescription.create(item_category: cat,name: description )

end