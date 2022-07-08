class AddMountainReferencesToPosts < ActiveRecord::Migration[6.1]
  def change
    add_reference :posts, :mountain, foreign_key: true
  end
end
