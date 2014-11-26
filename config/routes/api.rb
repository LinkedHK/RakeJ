Rails.application.routes.draw do
  namespace :api do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: :true) do
     resource :items
    get '/show_item',:to => "items#show_item" #,constraints: { id: /[a-zA-Z0-9_-]+/ }
    end
  end
end
