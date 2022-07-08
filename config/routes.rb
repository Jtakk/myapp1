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
  resources :posts, only: [:create, :update, :destroy]
  get '/users/:id/posts', to: 'posts#index', as: 'user_posts'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
