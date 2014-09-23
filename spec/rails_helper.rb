# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require 'spec_helper'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
#require "codeclimate-test-reporter"
#CodeClimate::TestReporter.start
# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }


# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.

ActiveRecord::Migration.maintain_test_schema!

require 'paperclip/matchers'


RSpec.configure do |config|

  # To wrap the anonymous controller
  # http://stackoverflow.com/questions/22055889/how-to-test-a-controller-concern-in-rails-4



  config.infer_base_class_for_anonymous_controllers = true

  config.use_transactional_fixtures = false

  # Clean up and initialize database before
  # running test exmaples
  config.before(:suite) do
    # Truncate database to clean up garbage from
    # interrupted or badly written examples
    DatabaseCleaner.clean_with(:truncation)

    # Seed dataase. Use it only for essential
    # to run application data.
    load "#{Rails.root}/db/seeds.rb"
  end

  config.around(:each) do |example|
    # Use really fast transaction strategy for all
    # examples except `js: true` capybara specs
    DatabaseCleaner.strategy = example.metadata[:js] ? :truncation : :transaction

    # Start transaction
    DatabaseCleaner.start

    # Run example
    example.run

    # Rollback transaction
    DatabaseCleaner.clean

    # Clear session data
    Capybara.reset_sessions!
  end




  config.include Paperclip::Shoulda::Matchers
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"


  config.include Requests::CoreHelpers
  #config.include Users::UserAuthHelper

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!
end

