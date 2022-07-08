class ChangeColumnNullToPosts < ActiveRecord::Migration[6.1]
  def change
    change_column_null :posts, :user_id, false
    change_column_null :posts, :mountain_id, false
  end
end
