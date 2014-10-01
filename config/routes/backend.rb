Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'
  root to: 'static#index'

  get "/new", to: 'static#new'
  post "/create", to: 'static#create', as: 'editor_create'
  get "/destroy/:id", to: 'static#destroy', as: 'editor_destroy'

  scope "/item" do
    get "/", to: "item#index", as: 'item_index'
    get "/new", to: "item#new", as: 'item_new'
    post "/create", to: "item#create", as: 'item_create'
    post "/screate", to: "item#screate", as: 'item_screate'
    post "/demo", to: "item#demo", as: 'item_demo'
    get "/show/:item_id", to: "item#show", as: 'item_show', constraints: { item_id: /\d+/ }
    get "/edit/:item_id", to: "item#edit", as: 'item_edit', constraints: { item_id: /\d+/ }
    post "/update/:item_id", to: "item#update_item", as: 'item_update', constraints: { item_id: /\d+/ }
  end

  scope "/location" do
    get "/district/:city_id", to: "location#district",constraints: { city_id: /\d+/ }
  end
end
