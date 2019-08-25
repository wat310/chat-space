$(document).on('turbolinks:load', function() {

  $(function() {
    var search_user = $("#user-search-result");
    var member_result = $("#member-result");
  
    function appendUser(user){ /*メンバーの検索*/
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}">追加</div>
                  </div>`
      search_user.append(html);
    }

    function appendMember(name, user_id){ /*メンバーの追加*/
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      member_result.append(html);
    }
  
    $("#user-search-field").on("keyup", function() { /*キーが入力されるごとのインクリメンタルサーチ*/
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

    $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function () { /*後から追加した要素に対してのクリックイベント発火*/
      var name = $(this).attr('data-user-name');
      var user_id = $(this).attr('data-user-id');
      appendMember(name, user_id);
      $(this).parent().remove(); /*追加後に検索ユーザーの一覧から削除(parentがないと、「追加」ボタンのみが消えてしまうので親要素ごと消す)*/
    });

    $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function () { /*所属ユーザー削除*/
      $(this).parent().remove(); /*所属ユーザーの一覧から削除(parentがないと、「削除」ボタンのみが消えてしまうので親要素ごと消す)*/
    });
  });
});

