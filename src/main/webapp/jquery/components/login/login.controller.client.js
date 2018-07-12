(function() {
	
	
	var $username, $password, $loginBtn;
	var userService = new UserServiceClient();

	function init() {
		$username = $('#username');
		$password = $('#password');
		$loginBtn = $('#loginBtn');

		$loginBtn.click(login);
	}

	$(init);

	function login() {
		var user = {
			'username' : $username.val(),
			'password' : $password.val()
		};
		userService.findUserByUsernamePassword(user).then(navigateToProfile, loginFailure);
		
	}

	function navigateToProfile() {
		// alert('success');
		window.location.href = '/../jquery/components/profile/profile.template.client.html';
	}

	function loginFailure() {
		alert('Incorrect Credentials');
	}
})();