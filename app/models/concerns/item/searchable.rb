module Concerns
  module Item
    module Searchable extend ActiveSupport::Concern
    included do
      attr_accessor :limit
      attr_accessor :offset
     attr_accessor :item_category_id
      attr_accessor :item_location_attributes
    end
    module ClassMethods
      include Concerns::Item::Filterable
      def main_search(query,limit = 15, offset = 0)
        @limit = limit
        @offset = offset
        main_search_filter(query)
      end
     # private
      #http://stackoverflow.com/questions/4480088/rails-search-with-optional-parameters
      def main_search_filter(attributes)
        attributes.inject(self) do |scope,(key,value)|
          #puts "Value (#{scope.inspect}" .colorize(:red)
          #return scope if value.blank?
          case key.to_sym
            when :item_category_id
              if value.present?
                scope.where(key => value).limit(@limit).offset(@offset)
              else
                scope.all.limit(@limit).offset(@offset)
              end
            when :item_location_attributes,:item_category_id
              if value[:location_district_id].present?
                scope.includes(:item_location).where('item_location.location_district_id' => value[:location_district_id]).limit(@limit).offset(@offset)
              else
                scope
              end
             # puts "item_category_id scope(#{attribute.inspect}" .colorize(:red)
            else
              scope
          end
        end
      end
    end
    end
  end
end
