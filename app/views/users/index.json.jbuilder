json.array! @users do |user|
  json.name user.name
  json.user_id user.id
end