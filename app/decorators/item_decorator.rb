class ItemDecorator < DecoratorBase


  def self.dec_collection(col)
    col.map do |c|
      ItemDecorator.new(c)
    end

    col.each do |m|
      puts "City #{m.city}"
    end

  end

  def iterate_collection
    model.each do |m|
      puts "City #{m.city}"
    end
  end

  def title
    model.item_descriptions[0].item_title
  end

  def description
    model.item_descriptions[0].description_text
  end

  def city
    model.item_location.s_city
  end

  def district
    district = model.item_location.s_district
    if district.blank?
      district = t("form_input.item.item_location_default")
    end
    district
  end

end