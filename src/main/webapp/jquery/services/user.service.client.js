function UserServiceClient() {
	this.createUser = createUser;
	this.findAllUsers = findAllUsers;
	this.deleteUser = deleteUser;
	this.findUserById = findUserById;
	this.updateUser = updateUser;
	this.login = login;
	this.updateUserProfile = updateUserProfile;
	this.findUserByUsername = findUserByUsername;
	this.findUserByUsernamePassword = findUserByUsernamePassword;
	this.logoutUser = logoutUser;
	this.url = '/api/user';
	this.login = '/api/login';
	var self = this;

	function login(username, password) {
		return fetch(self.login, {
			method : 'post',
			body : JSON.stringify({
				username : username,
				password : password
			}),
			headers : {
				'content-type' : 'application/json'
			}
		});
	}

	function updateUser(userId, user) {
		return fetch(self.url + '/' + userId, {
			method : 'put',
			body : JSON.stringify(user),
			headers : {
				'content-type' : 'application/json'
			}
		}).then(function(response) {
			if (response.bodyUsed) {
				return response.json();
			} else {
				return null;
			}
		});
	}

	function updateUserProfile(userId, user) {
		return fetch(self.url + '/admin/' + userId, {
			method : 'put',
			body : JSON.stringify(user),
			headers : {
				'content-type' : 'application/json'
			}
		}).then(function(response) {
			if (response.bodyUsed) {
				return response.json();
			} else {
				return null;
			}
		});
	}
	function findUserById(userId) {
		return fetch(self.url + '/' + userId).then(function(response) {
			return response.json();
		});
	}

	function loadUser() {
		return fetch('/api/checkLogin').then(function(response) {
			return response.json();
		});
	}

	function deleteUser(userId) {
		return fetch(self.url + '/' + userId, {
			method : 'delete'
		})
	}

	function findAllUsers() {
		return fetch(self.url).then(function(response) {
			return response.json();
		});
	}

	function findUserByUsernamePassword(user) {
		return fetch('/api/username', {
			method : 'post',
			body : JSON.stringify(user),
			credentials : 'include',
			headers : {
				'content-type' : 'application/json'
			}
		}).then(function(response) {
			return response.json();
		});
	}

	function createUser(user) {
		return fetch(self.url, {
			method : 'post',
			credentials : 'include',
			body : JSON.stringify(user),
			headers : {
				'content-type' : 'application/json'
			}
		});
	}

	function logoutUser(user) {
		return fetch('/api/logout', {
			method : 'post',
			body : JSON.stringify(user),
			credentials : 'include',
			headers : {
				'content-type' : 'application/json'
			}
		});
	}

	function findUserByUsername(username) {
		return fetch('/api/username/' + username)
		.then(function (response){
			if(response!=null)
		return response.json();
			else
				return null;
		});
	}
}
