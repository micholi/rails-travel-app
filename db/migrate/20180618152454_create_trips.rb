class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.integer :city_id
      t.integer :rating
      t.string :fave_attraction
      t.text :comment
    end
  end
end
