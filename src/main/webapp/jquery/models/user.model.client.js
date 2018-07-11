function User(username, password, firstName, lastName, role, email,
		dateOfBirth, contact) {
	this.username = username;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.role = role;
	this.email = email;
	this.dateOfBirth = dateOfBirth;
	this.contact = contact;

	this.setUsername = setUsername;
	this.setPassword = setPassword;
	this.setFirstName = setFirstName;
	this.setLastName = setLastName;
	this.setRole = setRole;
	this.setEmail = setEmail;
	this.setDateOfBirth = setDateOfBirth;
	this.setContact = setContact;
	
	this.getUsername = getUsername;
	this.getPassword = getPassword;
	this.getFirstName = getFirstName;
	this.getLastName = getLastName;
	this.getRole = getRole;
	this.getEmail = getEmail;
	this.getDateOfBirth = getDateOfBirth;
	this.getContact = getContact;

	function setUsername(username) {
		this.username = username;
	}
	function getUsername() {
		return this.username;
	}

	function setPassword(password) {
		this.password = password;
	}
	function getPassword() {
		return this.password;
	}
	
	
	function setFirstName(firstName) {
		this.firstName = firstName;
	}
	function getFirstName() {
		return this.firstName;
	}
	
	function setLastName(lastName) {
		this.lastName = lastName;
	}
	function getLastName() {
		return this.lastName;
	}
	
	function setRole(role) {
		this.role = role;
	}
	function getRole() {
		return this.role;
	}
	
	function setEmail(email) {
		this.email = email;
	}
	function getEmail() {
		return this.email;
	}
	
	
	function setDateOfBirth(dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	function getDateOfBirth() {
		return this.dateOfBirth;
	}
	
	
	function setContact(contact) {
		this.contact = contact;
	}
	function getContact() {
		return this.contact;
	}

}
