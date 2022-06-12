class CreateMountains < ActiveRecord::Migration[6.1]
  def change
    create_table :mountains do |t|
      t.string :name
      t.integer :elevation
      t.string :image
      t.text :introduction

      t.timestamps
    end
  end
end
