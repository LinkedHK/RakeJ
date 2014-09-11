class ItemCreator
  attr_accessor :errors

  def self.build
    @item = Item.new
    @item.item_descriptions.build
    @item.build_item_location
    @item.item_tags.build
  end

  def self.build_errors(errors)

    errors.each do |k, v|
      puts "Errors !!#{k} : #{v}" .colorize(:red)

    end
    "Error!"

  end

  def self.create(opts)
    self.new(opts).create
  end

  def initialize(opts)
    @opts = opts
    puts " Params #{opts.inspect}" .colorize(:red)
  end

  def create

  params = setup_item_params
  @item = Item.new(item_categories_id: params[:category])
  @item.save
  @item.item_descriptions([item_id: @item.id,
                           item_title: params[:title],
                           item_description: params[:description]])

  location = Location.new(item_id: @item.id,
                           location_city_id: params[:location_city].id,
                           s_city: params[:location_city].name,
                           location_district_id: params[:location_district].id,
                           s_district: params[:location_district].name
  )
  @item.location = location

  end

  def setup_item_params
    item_params = {
        title: @opts[:title],
        description: @opts[:description]
    }
    category = find_category
    country = find_country
    city = find_city
    district = find_district
    item_params[:category] = category if category.present?
    item_params[:location_country] = country if country.present?
    item_params[:location_city] = city if city.present?
    item_params[:location_district] = district if district.present?

=begin

 Params {"item_category_id"=>"3", "item_descriptions_attributes"=>[{"item_title"=>"Item Title", "description_text"=>"Item Description"}], "item_location_attributes"=>{"location_city_id"=>"3", "location_district_id"=>"3"}, "item_tags_attributes"=>{"0"=>{"tag_text"=>"tech,sales,marketing"}}}


=end

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
     cat =  ItemCategory.find_by(id: @opts[:category].to_i)
    else
     nil
    end
  end

 def find_country
   if @opts[:location_country]  =~ /^\d+$/
     LocationCountry.find_by(id: @opts[:location_country])
   else
     nil
   end
 end
  def find_city
    if @opts[:location_city]  =~ /^\d+$/
      LocationCity.find_by(id: @opts[:location_city])
    else
      nil
    end
  end

  def find_district
    if @opts[:location_district]  =~ /^\d+$/
      LocationDistrict.find_by(id: @opts[:location_district])
    else
      nil
    end
  end


end