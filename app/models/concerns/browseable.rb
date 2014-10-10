require 'active_support/concern'
module Concerns
 module Browseable extend ActiveSupport::Concern
    included do
      attr_accessor :limit
    end
  protected

    module ClassMethods
      include Utils::Common
      def browse(slug, limit = 10)
        @limit = limit
        if is_int(slug)
          browse_by_id(slug)
        else
          browse_by_slug(slug)
        end
      end
      def browse_by_id(id)
        result = self.where(:id => id).first
        try_to_find_item(result)
      end
      def browse_by_slug(slug)
        result = self.where(:slug => slug).first
        try_to_find_item(result)
      end
      def try_to_find_item(result)
          result.items.limit(@limit) if result
        end
      end

    end
 end

