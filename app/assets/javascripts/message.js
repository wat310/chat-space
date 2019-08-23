$(function(){

  function buildHTML(message){
    var html = `<div class="chat-box">
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
                      ${message.image}
                  </div>
                </div>`
    return html;
  }

  function scroll() { /*最下部までスクロールするメソッド*/
    $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight});
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
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main-chat').append(html);
      $('#message_content').val('');
      $("input[ type='submit' ]").removeAttr('disabled'); /*連続でボタンを押せるように*/
      scroll() /*scrollメソッドの呼び出し*/
    })
    .fail(function(){
      alert('エラーです');
    })
  })
});