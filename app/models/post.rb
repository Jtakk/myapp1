class Post < ApplicationRecord
  belongs_to :user
  belongs_to :mountain
  has_many :photos, dependent: :destroy
  scope :latest, -> { order(created_at: :desc) }
  validates :latitude, presence: true
  validates :longitude, presence: true
end
