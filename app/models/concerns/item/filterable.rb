module Concerns
  module Item
    module Filterable extend ActiveSupport::Concern
    included do

    end
    module ClassMethods
      #http://stackoverflow.com/questions/4480088/rails-search-with-optional-parameters
      def main_search_filter(attributes)
        attributes.inject(self) do |scope,(key,value)|
          return scope if value.blank?
          case key.to_sym
            when :item_category_id
              scope.where(key => value).limit(@limit).offset(@offset)
            when :item_location_attributes
              unless value[:location_district_id].blank?
                scope.includes(:item_location).where('item_location.location_district_id' => value[:location_district_id]).limit(@limit).offset(@offset)
              end
            else
              scope
          end
        end
      end
    end
    end
  end
end

