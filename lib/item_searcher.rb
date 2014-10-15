class ItemSearcher
  attr_accessor :page
  attr_accessor :offset
  attr_accessor :page

  def main_search(query,page = 1, limit = 25)
    @page = page
    @limit = limit
    main_search_filter(query)
  end
  def browse(slug, page = 1, limit = 25)
    @page = page
    @limit = limit
    if is_int(slug)
      browse_by_id(slug)
    else
      browse_by_slug(slug)
    end
  end
  # private
  #http://stackoverflow.com/questions/4480088/rails-search-with-optional-parameters
  def main_search_filter(attributes)
    attributes.inject(self) do |scope,(key,value)|
      case key.to_sym
        when :item_category_id
          if value.present?
            scope.where(key => value).page(@page).limit(@limit)
          else
            scope.all.page(@page).limit(@limit)
          end
        when :item_location_attributes,:item_category_id
          if value[:location_district_id].present?
            scope.includes(:item_location).where('item_location.location_district_id' => value[:location_district_id]).page(@page).limit(@limit)
          else
            scope
          end
        # puts "item_category_id scope(#{attribute.inspect}" .colorize(:red)
        else
          scope
      end
    end
  end
  def browse_by_id(id)
    Item.joins(:item_category)
    .where("item_categories.id = ?",id).page(@page).limit(@limit)
  end
  def browse_by_slug(slug)
    Item.joins(:item_category)
    .where("item_categories.slug = ?",slug).page(@page).limit(@limit)
  end


end