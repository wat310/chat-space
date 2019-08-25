class UsersController < ApplicationController
  def index
    users_include_current_user = User.where('name LIKE(?)', "%#{params[:keyword]}%") #current_userも含んだ配列
    @users = []
    users_include_current_user.each do |user|
      if user.id != current_user.id
        @users << user #current_userを除いた配列の中で検索が行われるように
      end
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit

  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end