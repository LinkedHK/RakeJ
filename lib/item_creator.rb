class ItemCreator

  attr_accessor :errors


  def self.create(opts)
    self.new(opts).create
  end


  def initialize(opts)
    @opts = opts

  end

  def create
    @item = Item.new(setup_item_params)
  end

  def setup_item_params
    item_params = {
        title: @opts[:title],
        description: @opt[:item_description]
    }
    category = find_category
    country = find_country
    city = find_city
    district = find_district

    item_params[:category_id] = category[:id] if category.present?
    item_params[:location_country] = country[:country] if country.present?
    item_params[:location_city] = city[:city] if city.present?
    item_params[:location_district] = district[:district] if district.present?

    item_params
  end
  def save_item
    unless @item.save
      
      @errors = @item.errors
      raise ActiveRecord::Rollback.new
    end

  end

  def find_category
    if @opts[:category_id]  =~ /^\d+$/
      ItemCategory.find_by(id: @opts[:category])
    else
     nil
    end
  end

 def find_country
   if @opts[:location_country]  =~ /^\d+$/
     ItemCategory.find_by(id: @opts[:location_country])
   else
     nil
   end
 end
  def find_city
    if @opts[:location_city]  =~ /^\d+$/
      ItemCategory.find_by(id: @opts[:location_city])
    else
      nil
    end
  end

  def find_district
    if @opts[:location_district]  =~ /^\d+$/
      ItemCategory.find_by(id: @opts[:location_district])
    else
      nil
    end
  end


end