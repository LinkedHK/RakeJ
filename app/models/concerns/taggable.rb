require 'active_support/concern'
module Concerns
  module Taggable extend ActiveSupport::Concern
    included do
      has_many :item_tags , :dependent => :destroy
      accepts_nested_attributes_for :item_tags
      def item_tags_attributes=(tags)
        puts "Getting item Tags #{tags.inspect}".colorize(:red)
        if tags["0"]
          tag_set = tags["0"][:tag_text].split(",")
          if tag_set.length > 0
            tag_set.each_with_index do |tag,i|
              break if i == 4
              item_tags.build(tag_text: tag)
            end
          end
        end
      end
      def item_tags_list
        item_tags.map(&:tag_text).join(",")
      end
    end
  end
end
