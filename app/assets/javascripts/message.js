$(document).on('turbolinks:load', function() { /*turbolinksの影響で、グループ変更後１回目の投稿で非同期通信が働かない現象を解決*/
  $(function(){
    function buildHTML(message){
      var image = (message.image.url) ? `<img src="${message.image.url}">` : ""; /*画像の有無の条件分岐*/
        /*data-idが入るように*/
        var html = `<div class="chat-box" data-message-id="${message.id}">
                      <div class="info-box">
                        <div class="info-box__name">
                          ${message.user_name}
                        </div>
                        <div class="info-box__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="text-box">
                        <p class="text-box__content">
                          ${message.content}
                        </p>
                          ${image}
                      </div>
                    </div>`
      return html;
    };

    function scroll() { /*最下部までスクロールするメソッド*/
      $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight}, 'fast');
  }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action') /*action属性にurlの情報が入っている*/

      $.ajax({ /*ajaxでリクエストを送る*/
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false, /*type: POSTとセット*/
        contentType: false /*type: POSTとセット*/
      })

      .done(function(message){ /*成功したら*/
        var html = buildHTML(message);
        $('.main-chat').append(html);
        $('.new_message')[0].reset(); /*フォームの情報をリセット(フォームが画像を保持しないように)*/
        scroll() /*scrollメソッドの呼び出し*/
        $("input[ type='submit' ]").removeAttr('disabled'); /*連続でボタンを押せるように*/
      })

      .fail(function(){ /*失敗したら*/
        alert('エラーです');
        $("input[ type='submit' ]").removeAttr('disabled'); /*連続でボタンを押せるように*/
      })
    })

    var reloadMessages = function() { /*自動更新*/
      if (window.location.href.match(/\/groups\/\d+\/messages/)) { /*グループのメッセージ一覧ページの時のみ自動更新を実行*/
        // var last_message_id = $(".chat-box").last().data("message-id"); /*最後のカスタムデータを取得*/
        var last_message_id = $(".chat-box:last").data("message-id"); 
        $.ajax({ /*リクエスト*/
          url: 'api/messages', /*リクエストのパス(動かしたいコントローラーのアクションのルーティング)*/
          type: 'GET', /*/groups/:group_id/api/messagesのhttpメソッドはGET*/
          dataType: 'json', /*json形式で送る*/
          data: {id: last_message_id} /*リクエストで一緒に送るデータ*/
        })
        .done(function(messages) {
          console.log("OK"); /*あとで消す！！*/
          var insertHTML = '';
          messages.forEach(function(message){
            if (message.id > last_message_id) { /*前回から投稿が増えれば自動更新する*/
              insertHTML += buildHTML(message)
              scroll() /*scrollメソッドの呼び出し*/
            }
          });
          $('.main-chat').append(insertHTML);
        })
        .fail(function() {
          alert('非同期通信に失敗しました')
        });
      }

    };
    setInterval(reloadMessages, 5000) /*5000ミリ秒間隔で関数を呼び出す*/
  });
});
