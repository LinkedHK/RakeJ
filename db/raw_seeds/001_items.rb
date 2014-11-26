# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'faker'
include Faker

categories = ItemCategory.all.select(:id)
countries= LocationCountry.all.select(:id)

300.times do
  country = countries.sample
  city = country.location_cities.sample
  district = city.location_districts.sample
  args = {
      :item_category_id =>categories.sample.id,
      :item_title => Lorem.sentence,
      :description_text => Lorem.paragraph(20,true),
      :location_country_id => country.id,
      :location_city_id => city.id,
      :location_district_id => district.id
  }


  data =
      {
          item_descriptions_attributes:   [{:item_title=>args[:item_title],
                                            :description_text=>args[:description_text]}],
          item_category_id: categories.sample.id,
          item_location_attributes: {:location_country_id=>args[:location_country_id],
                                     :location_city_id=>args[:location_city_id],
                                     :location_district_id=>args[:location_district_id]},
      }
 Item.create!(data)

end
