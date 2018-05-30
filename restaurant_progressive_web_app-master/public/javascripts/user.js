/**
 * Page init styles.
 */
$('html').css('overflow','hidden');

$(document).ready(function(){
  /**
   * Redirect to the Register Page.
   */
  $('#to-register').click(function() {
    window.location.href='/user/register';
  });
  
  /**
   * Click the Login Button.
   * @param user
   * @param pswd
   */  
  $("#login-btn").click(function() {
    let user = $("#user").val();
    let pswd = $("#pswd").val();
    if(user === '' || pswd === '') {
      alert("sorry, password doesn't match to the username.")
      return;
    }
    let _data = { user, pswd };
    $.ajax({
      url: '/user/login',
      data: _data,
      dataType: 'json',
      type: 'POST',
      success: function(res) {
        res.exist?
        window.location.href="/":
        alert("sorry, password doesn't match to the username.");
      },
      error: function(res) {
        console.log("oops, f* words.");
      }
    })
  });

  /**
   * Click the Regiser Button.
   * @param user
   * @param pswd
   */  
  $("#register-btn").click(function() {
    let user = $("#user").val();
    let pswd = $("#pswd").val();
    if(user === '' || pswd === '') {
      alert("register failed :(")
      return;
    }
    let _data = { user, pswd };
    $.ajax({
      url: '/user/register',
      data: _data,
      dataType: 'json',
      type: 'POST',
      success: function(res) {
        if(res.success){
          alert("Success!");
          window.location.href="/"
        }else{
          alert("register failed :(")
        }
      },
      error: function(res) {
        console.log("oops, f* words.");
      }
    })
  });
});
