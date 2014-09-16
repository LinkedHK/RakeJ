# RSpec
# spec/support/factory_girl.rb

# rspec
require 'database_cleaner'

RSpec.configure do |config|
  config.before(:suite) do |ex|
    #DatabaseCleaner[:active_record].strategy = :transaction
    DatabaseCleaner[:active_record].strategy = ex.metadata[:js] ? :truncation : :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |ex|
    DatabaseCleaner.cleaning do
      ex.run
    end
  end



end
