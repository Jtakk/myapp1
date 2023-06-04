# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
require 'csv'

User.create!(
  id: 1,
  name: "Guest",
  email: "guest@example.com",
  password: "password",
  password_confirmation: "password",
  introduction: "ゲスト用アカウントです",
  avatar: File.open('./public/uploads/user/template/guest.png')
)

CSV.foreach('db/csv/mountains_table.csv', headers: true) do |row|
  Mountain.create(
    id: row['id'],
    name: row['name'],
    yomi: row['yomi'],
    elevation: row['elevation'],
    image: row['image'] ? File.open(row['image']) : nil ,
    introduction: row['introduction'],
    latitude: row['latitude'],
    longitude: row['longitude'],
    zoom: row['zoom']
  )
end

CSV.foreach('db/csv/regions_table.csv', headers: true) do |row|
  Region.create(
    id: row['id'],
    name: row['name']
  )
end

CSV.foreach('db/csv/prefectures_table.csv', headers: true) do |row|
  Prefecture.create(
    id: row['id'],
    name: row['name'],
    region_id: row['region_id']
  )
end

CSV.foreach('db/csv/locatings_table.csv', headers: true) do |row|
  Locating.create(
    id: row['id'],
    mountain_id: row['mountain_id'],
    prefecture_id: row['prefecture_id']
  )
end

CSV.foreach('db/csv/areas_table.csv', headers: true) do |row|
  Area.create(
    id: row['id'],
    name: row['name']
  )
end

CSV.foreach('db/csv/belongings_table.csv', headers: true) do |row|
  Belonging.create(
    id: row['id'],
    mountain_id: row['mountain_id'],
    area_id: row['area_id']
  )
end

CSV.foreach('db/csv/tags_table.csv', headers: true) do |row|
  Tag.create(
    id: row['id'],
    name: row['name']
  )
end

CSV.foreach('db/csv/taggings_table.csv', headers: true) do |row|
  Tagging.create(
    id: row['id'],
    mountain_id: row['mountain_id'],
    tag_id: row['tag_id']
  )
end
