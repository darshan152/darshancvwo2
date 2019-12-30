class AddDoneToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :done, :boolean
  end
end
