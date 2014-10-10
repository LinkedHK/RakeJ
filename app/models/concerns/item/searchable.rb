module Concerns
  module Item
    module Searchable extend ActiveSupport::Concern
    module ClassMethods
      def main_search(query)

        # TODO: This ShitDoesn't work!
        item = nil
        item = self.where(:item_category_id => query["item_category_id"]) unless query["item_category_id"].blank?
        if item
          unless query["item_location_attributes"].blank?
            item.joins(:item_location)
            .where('item_location.location_district_id' =>
                       query["item_location_attributes"]["location_district_id"]) unless query["item_location_attributes"]["location_district_id"].blank?
          end
        end
        item
      end
    end
    end
  end
end