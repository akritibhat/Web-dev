(function() {

	$(init);

	var $username;
	var $password;
	var $firstName;
	var $lastName;
	var $email;
	var $role;
	var $dateOfBirth;
	var $phone;

	var $updateBtn;
	var userService = new UserServiceClient();

	function init() {
		$username = $("#username");
		$password = $("#password");
		$firstName = $("#firstName");
		$lastName = $("#lastName");
		$email = $('#email');
		$role = $('#role');
		$dateOfBirth = $('#dateOfBirth');
		$phone = $('#phone');

		$updateBtn = $("#updateBtn").click(updateUser);
		$logoutBtn = $("#logoutBtn").click(logoutUser);

		userService.findUser().then(renderUser);
	}

	function updateUser() {
		var user = {
			password : $password.val(),
			firstName : $firstName.val(),
			lastName : $lastName.val(),
			email : $email.val(),
			role : $role.val(),
			dateOfBirth : $dateOfBirth.val(),
			phone : $phone.val()
		};
		
		userService.updateUser(usermain, user).then(success, updateFailure);
	}

	function success(response) {
		 $("#successMsg").show();
		//alert('Profile Updated Successfully!');
		renderUser;
	}

	function updateFailure(response) {
		$("#failureMsg").show();
		//alert('Failed to update Profile. Please try later');
	}

	function logoutUser() {
		var user = {
			'username' : $username.val(),
			'password' : $password.val()
		};

		userService.logoutUser(user).then(navigateToLogin);
	}

	function navigateToLogin() {
		window.location.href = '/../jquery/components/login/login.template.client.html';
	}

	function renderUser(user) {
		console.log(user);
		$username.val(user.username);
		$password.val(user.password);
		$firstName.val(user.firstName);
		$lastName.val(user.lastName);
		$email.val(user.email);
		$role.val(user.role);
		if(user.dateOfBirth!=null)
		$dateOfBirth.val((user.dateOfBirth).substring(0, 10));
		$phone.val(user.phone);
		usermain = user.id;
	}
})();