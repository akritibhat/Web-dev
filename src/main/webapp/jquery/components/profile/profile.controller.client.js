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
        $role= $('#role');
        $dateOfBirth= $('#dateOfBirth');
        $contact = $('#contact');
        
        $updateBtn = $("#updateBtn")
            .click(updateUser);

        findUser().then(renderUser);
    }

    function updateUser() {
        var user = {
        	password: $password.val(),
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            email: $email.val(),
            role: $role.val(),
            dateOfBirth: $dateOfBirth.val(),
            contact: $contact.val()
        };

        userService
            .updateUser(usermain, user)
            .then(success,updateFailure);
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
    		   'credentials': 'include'
    	    })
    	    .then(function (response) {
    	    	    return response.json();
    	    	    });
    }
    
    function renderUser(user) {
        console.log(user);
        $username.val(user.username);
        $password.val(user.password);
        $firstName.val(user.firstName);
        $lastName.val(user.lastName);
        $email.val(user.email);
        $role.val(user.role);
        $dateOfBirth.val(user.dateOfBirth);
        $contact.val(user.contact);
        usermain=user.id;
    }
})();