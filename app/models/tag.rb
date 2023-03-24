class Tag < ApplicationRecord
  has_many :taggings
  has_many :mountains, through: :taggings
end
