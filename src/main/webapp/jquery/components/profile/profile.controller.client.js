(function() {
	
    $(init);

    var $staticEmail;
    var $firstName;
    var $lastName;
    var $updateBtn;
    var userService = new UserServiceClient();

    function init() {
        $username = $("#username");
        $firstName = $("#firstName");
        $lastName = $("#lastName");
        $updateBtn = $("#updateBtn")
            .click(updateUser);

        findUser().then(renderUser);
    }

    function updateUser() {
        var user = {
            firstName: $firstName.val(),
            lastName: $lastName.val()
        };

        userService
            .updateUser(12, user)
            .then(success);
    }

    function success(response) {
        if(response === null) {
            alert('unable to update')
        } else {
            alert('success');
        }
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
        $firstName.val(user.firstName);
        $lastName.val(user.lastName);
    }
})();