$(function(){
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
      
    })
    .fail(function(){

    })
  })
});