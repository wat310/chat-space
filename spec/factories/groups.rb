FactoryBot.define do
  factory :group do
    name {Faker::Team.name} #チーム名
  end
end