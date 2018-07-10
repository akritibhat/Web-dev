// IIFE
// Immediately Invoked Function Expression
(function () {

  var registerBtn = $('#registerBtn');
  var usernameFld = $('#username');
  var passwordFld = $('#password');
  var password2Fld = $('#password2');
  var firstnameFld = $('#firstname');
  var lastnameFld = $('#lastname');

  registerBtn.click(registerHandler);

  function registerHandler() {
    var usernameStr = usernameFld.val();
    var passwordStr = passwordFld.val();
    var password2Str = password2Fld.val();
    var firstnameStr = firstnameFld.val();
    var lastnameStr = lastnameFld.val();

    var userObj = {
      username: usernameStr,
      password: passwordStr,
      firstName: firstnameStr,
      lastName: lastnameStr
    };

    var userObjStr = JSON.stringify(userObj);

    fetch('/api/user', {
      method: 'post',
      body: userObjStr,
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
     
    }).then(registartionSuccessful,registrationFailed);
  }
  
  function registartionSuccessful(){
	 // alert('yay');
	  window.location.href='jquery/components/profile/profile.template.client.html';
  }
  
  function registrationFailed(){
	  alert('oops');
  }
  
})();