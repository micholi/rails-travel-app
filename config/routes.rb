Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'welcome#home'

  resources :users do
    resources :trips
  end

  resources :cities, only: [:index, :show, :new, :create]
  resources :countries, only: [:index, :show]

  get '/trips/five_star' => 'trips#five_star', as: '/fivestar'
  get '/cities/most_visited' => 'cities#most_visited', as: '/most_visited'
  get '/users/most_trips' => 'users#most_trips', as: '/most_trips'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get '/login' => 'sessions#new'
  get '/auth/facebook/callback' => 'sessions#facebookcreate'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

end
