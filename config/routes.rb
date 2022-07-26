Rails.application.routes.draw do
  root 'static_pages#home'
  get '/help', to: 'static_pages#help'
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users, except: [:index]
  resources :password_resets, only: [:new, :create, :edit, :update]
  resources :mountains, only: [:index, :show]
  get '/mountains/prefectures/:id', to: 'mountains#show_prefecture', as: 'mountain_prefecture'
  get '/mountains/regions/:id', to: 'mountains#show_region', as: 'mountain_region'
  get '/mountains/tags/:id', to: 'mountains#show_tag', as: 'mountain_tag'
  get '/mountains/areas/:id', to: 'mountains#show_area', as: 'mountain_area'
  resources :posts, only: [:show, :create, :update, :destroy]
  get '/users/:id/posts', to: 'posts#index', as: 'user_posts'
  resources :likes, only: [:show, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
