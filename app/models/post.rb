class Post < ApplicationRecord
  belongs_to :user
  belongs_to :mountain
  has_many :photos, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  scope :latest, -> { order(created_at: :desc) }
  validates :latitude, presence: true
  validates :longitude, presence: true
end
