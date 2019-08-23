FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length: 8) #パスワード
    name {Faker::Name.last_name} #下の名前
    email {Faker::Internet.free_email} #gmailやyahooメールなどのフリーメール
    password {password}
    password_confirmation {password}
  end
end