(function(){
//alert('Hello from Controller');
var registerBtn= jQuery('#registerBtn');
var usernameFld= $('#username');
var passwordFld= $('#password');
var password2Fld= $('#password2');

registerBtn.click(registerHandler);

function registerHandler(){
	var usernameStr=usernameFld.val();
	var passwordStr=passwordFld.val();
	var password2Str=password2Fld.val();
	
	var userObj={
			username: usernameStr,
			password: passwordStr
	};
	console.log(userObj);
}
})();