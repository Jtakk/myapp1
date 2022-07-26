class Prefecture < ApplicationRecord
  belongs_to :region
  has_many :locatings
  has_many :mountains, through: :locatings
end
