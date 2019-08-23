FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence} #文章
    image {File.open("#{Rails.root}/public/images/1.jpg")}
    user
    group
  end
end