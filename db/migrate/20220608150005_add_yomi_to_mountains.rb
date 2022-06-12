class AddYomiToMountains < ActiveRecord::Migration[6.1]
  def change
    add_column :mountains, :yomi, :string
  end
end
