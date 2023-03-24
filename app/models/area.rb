class Area < ApplicationRecord
  has_many :belongings
  has_many :mountains, through: :belongings
end
