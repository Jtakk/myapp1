class Post < ApplicationRecord
  belongs_to :user
  belongs_to :mountain
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :mountain_id, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
end
