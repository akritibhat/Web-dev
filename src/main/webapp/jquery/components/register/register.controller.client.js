// IIFE
// Immediately Invoked Function Expression
(function() {

	var userService = new UserServiceClient();
	var registerBtn = $('#registerBtn');
	var usernameFld = $('#username');
	var passwordFld = $('#password');
	var password2Fld = $('#password2');
	var firstnameFld = $('#firstname');
	var lastnameFld = $('#lastname');

	$(init);

	function init() {
		// registerHandler();
		registerBtn.click(registerHandler);
	}

	function registerHandler() {
		var usernameStr = usernameFld.val();
		var passwordStr = passwordFld.val();
		var password2Str = password2Fld.val();
		var firstnameStr = firstnameFld.val();
		var lastnameStr = lastnameFld.val();

		if (passwordStr != password2Str) {
			alert('Password mismatch');
		}

		else {

			var user = {
				username : usernameStr,
				password : passwordStr,
				firstName : firstnameStr,
				lastName : lastnameStr
			};

			userService.findUserByUsername(usernameStr).then(
					function(response) {
						if (response.length == 0)
							createUniqueUser(user);
						else
							alert('User already exists!');
					});

		}
	}

	function createUniqueUser(user) {
		userService.createUser(user).then(registartionSuccessful,
				registrationFailed);
	}

	function registartionSuccessful() {
		alert('Profile Created Successfully');
		window.location.href = '/../jquery/components/profile/profile.template.client.html';
	}

	function registrationFailed() {
		alert('Profile Creation Failed.');

	}

})();