class AddZoomToMountains < ActiveRecord::Migration[6.1]
  def change
    add_column :mountains, :zoom, :integer
  end
end
