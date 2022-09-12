Rails.application.routes.draw do
  root 'root_pages#home'
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users, except: [:index] do
    get :posts, on: :member
    get :favorites, on: :member
  end
  resources :password_resets, only: [:new, :create, :edit, :update]
  get '/mountains/search', to: 'mountains#search', as: 'mountain_search'
  get '/mountains/prefectures/:id', to: 'mountains#show_prefecture', as: 'mountain_prefecture'
  get '/mountains/regions/:id', to: 'mountains#show_region', as: 'mountain_region'
  get '/mountains/tags/:id', to: 'mountains#show_tag', as: 'mountain_tag'
  get '/mountains/areas/:id', to: 'mountains#show_area', as: 'mountain_area'
  resources :mountains, only: [:index, :show]
  resources :posts, only: [:show, :create, :update, :destroy]
  resources :likes, only: [:show, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
