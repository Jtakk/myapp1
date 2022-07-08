class Mountain < ApplicationRecord
  mount_uploader :image, MountainUploader
  has_many :posts
end
