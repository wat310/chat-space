$(document).on('turbolinks:load', function() {

  $(function() {
    var search_user = $("#user-search-result");
  
    function appendUser(user){
  
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}">追加</div>
                  </div>`
      search_user.append(html);
    }
  
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
  
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
  
      .done(function(users) { /*成功したら*/
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        
      })

      .fail(function(){
        alert('ユーザーの検索に失敗しました');
      })
    });
  });
});

