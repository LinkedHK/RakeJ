Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  root to: 'static#index', as: 'root_path'

  devise_for :user, controllers: { registrations: "user_auth/registration" }

  devise_scope :user do
    get "usr/sign_up" => "user_auth/registration#new", as: 'user_signup'
  end
  get "/new", to: 'static#new'
  post "/create", to: 'static#create', as: 'editor_create'
  get "/destroy/:id", to: 'static#destroy', as: 'editor_destroy'


  concern :paginatable do
    get '(page/:page)', :action => :index, :on => :collection, :as => '',constraints: { page: /\d+/ }
  end
    scope "/item" do
      get "/", to: "item#index", as: 'item_index'
      get "/:slug", to: "search#browse", as: 'item_browse',constraints: { slug: /[a-zA-Z0-9_-]+/ },:concerns => :paginatable
      get "/action/new", to: "item#new", as: 'item_new'
      post "/action/create", to: "item#create", as: 'item_create'
      get "/action/main_search", to: "search#main_search", as: 'item_main_search', :concerns => :paginatable
      post "/demo", to: "item#demo", as: 'item_demo'
      get "(/:slug)/:item_id", to: "item#show", as: 'item_show',constraints: { slug: /[a-zA-Z0-9_-]+/ ,item_id: /\d+/}
    #  get "/edit/:item_id", to: "item#edit", as: 'item_edit', constraints: { item_id: /\d+/ }
      post "/update/:item_id", to: "item#update_item", as: 'item_update', constraints: { item_id: /\d+/ }


   #get "/browse/:slug", to: "item#browse",constraints: { slug: /[a-zA-Z0-9_-]+/ }  #/(?=.{1,20}$)[a-zA-Z0-9_]+/ restricted length
  end
  scope "/location" do
    get "/district/:city_id", to: "location#district",constraints: { city_id: /\d+/ }
  end



# /[^A-Za-z0-9_]/

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
