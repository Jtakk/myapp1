# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
User.create!(
  id: 1,
  name: "First User",
  email: "first@example.com",
  password: "password",
  password_confirmation: "password",
  introduction: "Hello, World!"
)

Mountain.create!(
  id: 1,
  name: "富士山",
  elevation: 3776,
  image: File.open("./public/uploads/mountain/template/fujisan.jpg"),
  introduction: "山梨県（富士吉田市、南都留郡鳴沢村）と、静岡県（富士宮市、富士市、裾野市、御殿場市、駿東郡小山町）に跨る活火山である。
                日本最高峰（剣ヶ峰）の独立峰で、その優美な風貌は日本国外でも日本の象徴として広く知られている。数多くの芸術作品の題材と
                され芸術面のみならず、気候や地層など地質学的にも社会に大きな影響を与えている。懸垂曲線の山容を有した玄武岩質成層火山で
                構成され、その山体は駿河湾の海岸まで及ぶ。",
  latitude: 35.360833,
  longitude: 138.733333,
  yomi: "ふじさん",
  zoom: 10,
)
