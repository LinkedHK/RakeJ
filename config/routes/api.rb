Rails.application.routes.draw do
  namespace :api do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: :true) do
     resource :items
    get '/show_item',:to => "items#show_item" #,constraints: { id: /[a-zA-Z0-9_-]+/ }
    get '/browse_by',:to => "items#browse_by" #,constraints: { id: /[a-zA-Z0-9_-]+/ }
    get '/list_cat',:to => "items#list_cat" #,constraints: { id: /[a-zA-Z0-9_-]+/ }
    get '/live_search',:to => "items#live_search" #,constraints: { id: /[a-zA-Z0-9_-]+/ }
    end
  end
end
