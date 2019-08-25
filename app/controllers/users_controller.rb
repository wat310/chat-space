class UsersController < ApplicationController
  def index
    @users = User.where.not(id: current_user.id).where('name LIKE(?)', "%#{params[:keyword]}%") #current_userを除いた配列(current_userが検索されないため)
    # end
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