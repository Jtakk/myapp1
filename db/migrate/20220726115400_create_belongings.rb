class CreateBelongings < ActiveRecord::Migration[6.1]
  def change
    create_table :belongings do |t|
      t.references :mountain, null: false, foreign_key: true
      t.references :area, null: false, foreign_key: true

      t.timestamps
    end
  end
end
