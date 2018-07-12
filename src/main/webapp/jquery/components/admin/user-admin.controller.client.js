//IIFE
(function() {

	jQuery(main);

	var tbody;
	var template;
	var userService = new UserServiceClient();
	var userMain;

	function main() {
		tbody = $('tbody');
		template = $('.template');
		$('#createUser').click(createUser);
		$('#updateUser').click(updateUser);

		findAllUsers();
	}

	function findAllUsers() {
		userService.findAllUsers().then(renderUsers);
	}

	function createUser() {
		console.log('createUser');

		var username = $('#usernameFld').val();
		var password = $('#passwordFld').val();
		var firstName = $('#firstNameFld').val();
		var lastName = $('#lastNameFld').val();
		var role = $('#roleFld').val();
		var email = $('#emailFld').val();
		var phone = $('#phoneFld').val();
		var dateOfBirth = $('#dateOfBirthFld').val();

		var user = new User(username, password, firstName, lastName, role, email,
		dateOfBirth, phone);
		/*{
			username : username,
			password : password,
			firstName : firstName,
			lastName : lastName,
			role : role,
			email: email,
			phone : phone,
			dateOfBirth : dateOfBirth
			
		};*/

		userService.createUser(user).then(findAllUsers);
	}

	function updateUser() {
		console.log('updateUser');
		var username = $('#usernameFld').val();
		var password = $('#passwordFld').val();
		var firstName = $('#firstNameFld').val();
		var lastName = $('#lastNameFld').val();
		var role = $('#roleFld').val();
		var email = $('#emailFld').val();
		var phone = $('#phoneFld').val();
		var dateOfBirth = $('#dateOfBirthFld').val();
		
		var user = new User(username, password, firstName, lastName, role, email,
				dateOfBirth, phone);
		userService.updateUserProfile(userMain, user).then(findAllUsers);
	}

	function renderUsers(users) {
		tbody.empty();
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			var clone = template.clone();
			clone.attr('id', user.id);
			clone.find('.delete').click(deleteUser);
			clone.find('.edit').click(findUserById);
			clone.find('.username').html(user.username);
			clone.find('.password').html(user.password);
			clone.find('.firstName').html(user.firstName);
			clone.find('.lastName').html(user.lastName);
			clone.find('.role').html(user.role);
			clone.find('.email').html(user.email);
			clone.find('.phone').html(user.phone);
			clone.find('.dateOfBirth').html((user.dateOfBirth));
			tbody.append(clone);
		}
	}

	function deleteUser(event) {
		var deleteBtn = $(event.currentTarget);
		var userId = deleteBtn.parent().parent().attr('id');

		userService.deleteUser(userId).then(findAllUsers);
	}

	function findUserById(event) {
		var editBtn = $(event.currentTarget);

		var userId = editBtn.parent().parent().attr('id');

		userMain = userId;
		userService.findUserById(userId).then(renderUser);

		console.log('editUser');
		console.log(event);
	}

	function renderUser(user) {
		console.log('editUser231');
		console.log(user.username);
		var username = user.username;
		var password = user.password;
		var firstName = user.firstName;
		var lastName = user.lastName;
		var role = user.role;
		var email = user.email;
		var phone = user.phone;
		var dateOfBirth = (user.dateOfBirth).substring(0, 10);
		
		$('#usernameFld').val(username);
		$('#passwordFld').val(password);
		$('#firstNameFld').val(firstName);
		$('#lastNameFld').val(lastName);
		$('#roleFld').val(role);
		$('#emailFld').val(email);
		$('#phoneFld').val(phone);
		$('#dateOfBirthFld').val(dateOfBirth);

	}

})();