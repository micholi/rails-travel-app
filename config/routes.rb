Rails.application.routes.draw do

  root 'welcome#home'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get '/login' => 'sessions#new'
  get '/auth/facebook/callback' => 'sessions#facebookcreate'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/users/most_trips' => 'users#most_trips', as: :most_trips
  get '/trips/five_star' => 'trips#five_star', as: :five_star
  get '/cities/most_visited' => 'cities#most_visited', as: :most_visited
  get '/cities/highly_rated' => 'cities#highly_rated', as: :highly_rated
  
  resources :users do
    resources :trips
  end

  resources :cities, only: [:index, :show, :new, :create]
  resources :countries, only: [:index, :show]

end
