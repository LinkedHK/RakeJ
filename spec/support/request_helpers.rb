# spec/support/request_helpers.rb
module Requests
  module CoreHelpers
    def parse_json(response)
      @json ||= JSON.parse(response.body)   rescue []
    end

    def query_log
      ActiveRecord::Base.logger = Logger.new(STDOUT) if defined?(ActiveRecord::Base)
    end

  end
end