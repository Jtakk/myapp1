class Mountain < ApplicationRecord
  mount_uploader :image, MountainUploader
  has_many :posts
  has_many :locatings
  has_many :prefectures, through: :locatings
  has_many :taggings
  has_many :tags, through: :taggings
  has_many :belongings
  has_many :areas, through: :belongings
end
