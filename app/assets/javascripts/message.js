$(document).on('turbolinks:load', function() { /*turbolinksの影響で、グループ変更後１回目の投稿で非同期通信が働かない現象を解決*/
  $(function(){
    function buildHTML(message){
      var image = (message.image.url) ? `<img src="${message.image.url}">` : ""; /*画像の有無の条件分岐*/
        /*data-idが入るように*/
        var html = `<div class="chat-box" data-id="chat">
                      <div class="info-box">
                        <div class="info-box__name">
                          ${message.user_name}
                        </div>
                        <div class="info-box__date">
                          ${message.time}
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
      last_message_id = $(".chat-box").data('chat') /*カスタムデータを取得*/
      $.ajax({ /*リクエスト*/
        url: 'api/messages', /*リクエストのパス(動かしたいコントローラーのアクションのルーティング)*/
        type: 'get', /*/groups/:group_id/api/messagesのhttpメソッドはGET*/
        dataType: 'json', /*json形式で送る*/
        data: {id: last_message_id} /*リクエストで一緒に送るデータ*/
      })
      /*1*/
      .done(function(messages) {
        /*4*/
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message)
        });
        $('.main-chat').append(insertHTML);
      })
      .fail(function() {
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000) /*5000ミリ秒間隔で関数を呼び出す*/
  });
});
