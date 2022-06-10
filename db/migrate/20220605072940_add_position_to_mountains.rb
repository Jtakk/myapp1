class AddPositionToMountains < ActiveRecord::Migration[6.1]
  def change
    add_column :mountains, :latitude, :decimal, precision: 10, scale: 8
    add_column :mountains, :longitude, :decimal, precision: 11, scale: 8
  end
end
