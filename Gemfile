source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.4'
# Use mysql as the database for Active Record
#gem 'pg'
gem 'mysql2'


gem 'activerecord-session_store', github: 'rails/activerecord-session_store'
gem 'omniauth'
#gem 'open_uri_redirections'
gem 'omniauth-facebook'
gem "paperclip", :git => "git://github.com/thoughtbot/paperclip.git"
#gem 'simple_captcha', :git => 'git://github.com/galetahub/simple-captcha.git'


group :test do
  gem 'rspec-rails', '~> 3.0.0'
  gem "factory_girl_rails", "~> 4.0"
  gem 'faker'
  gem 'codeclimate-test-reporter'
  #gem 'travis'
end


group :development do
  gem 'guard'
  gem 'guard-rspec'
  gem 'pry'
  gem 'colorize'

  #gem 'cf'
end
group :production,:development do
  #gem 'koala'
  # Use jquery as the JavaScript library
  gem 'jquery-rails'
  #gem 'mobylette'
  #gem 'koala'

  # Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
  gem 'turbolinks'
  # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
  gem 'jbuilder', '~> 2.0'
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', '~> 0.4.0',          group: :doc
  gem 'rspec_api_documentation'

  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]

  gem 'sass-rails', '~> 4.0.3'
  # Use Uglifier as compressor for JavaScript assets
  gem 'uglifier', '>= 1.3.0'
  # Use CoffeeScript for .js.coffee assets and views
  gem 'coffee-rails', '~> 4.0.0'
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer',  platforms: :ruby


end


# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem