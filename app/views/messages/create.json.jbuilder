json.(@message, :content, :image) #json.content @message.content、 json.image @message.image(※ image.urlではない!)と意味は同じ(このように省略できる)
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id