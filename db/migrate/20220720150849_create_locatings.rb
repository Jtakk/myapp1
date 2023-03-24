class CreateLocatings < ActiveRecord::Migration[6.1]
  def change
    create_table :locatings do |t|
      t.references :mountain, null: false, foreign_key: true
      t.references :prefecture, null: false, foreign_key: true

      t.timestamps
    end
  end
end
