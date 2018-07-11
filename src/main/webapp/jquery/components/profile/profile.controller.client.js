(function() {

	$(init);

	var $username;
	var $password;
	var $firstName;
	var $lastName;
	var $email;
	var $role;
	var $dateOfBirth;
	var $contact;

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
		$contact = $('#contact');

		$updateBtn = $("#updateBtn").click(updateUser);
		$logoutBtn = $("#logoutBtn").click(logoutUser);

		findUser().then(renderUser);
	}

	function updateUser() {
		var user = {
			password : $password.val(),
			firstName : $firstName.val(),
			lastName : $lastName.val(),
			email : $email.val(),
			role : $role.val(),
			dateOfBirth : $dateOfBirth.val(),
			contact : $contact.val()
		};

		return fetch('/api/profile', {
			method : 'put',
			body : JSON.stringify(user),
			'credentials' : 'include',
			headers : {
				'content-type' : 'application/json'
			}
		}).then(success, updateFailure);

		
	//	userService.updateUser(usermain, user).then(success, updateFailure);
	}

	function success(response) {
		alert('Profile Updated Successfully!');
		renderUser;
	}

	function updateFailure(response) {
		alert('Failed to update Profile. Please try later');
	}

	function findUser() {
		return fetch('/checkLogin', {
			'credentials' : 'include'
		}).then(function(response) {
			return response.json();
		});
	}
	
	function logoutUser() {
		var user = {
			'username' : $username.val(),
			'password' : $password.val()
		};

		fetch('/api/logout', {
			method : 'post',
			body : JSON.stringify(user),
			credentials : 'include',
			headers : {
				'content-type' : 'application/json'
			}
		}).then(navigateToLogin);
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
		$dateOfBirth.val((user.dateOfBirth).substring(0, 10));
		$contact.val(user.contact);
		usermain = user.id;
	}
})();