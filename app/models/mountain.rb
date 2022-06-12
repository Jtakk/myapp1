class Mountain < ApplicationRecord
  mount_uploader :image, ImageUploader
end
