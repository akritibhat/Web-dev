( function(){
	var $username,
	$password,
	$loginBtn;
	
	function init(){
		$username = $('#username');
		$password = $('#password');
		$loginBtn = $('#loginBtn');
		
		$loginBtn.click(login);
	}
	
	init();
	
	function login(){
		var user={
				'username': $username.val(),
				'password': $password.val()
		};
		
		fetch('/login',{
			method: 'post',
			body: JSON.stringify(user),
			credentials: 'include',
			headers: {
				'content-type':'application/json'
			}
		}).then(navigateToProfile,loginFailure);
	}
	
	function navigateToProfile(){
		//alert('success');
		window.location.href='/../jquery/components/profile/profile.template.client.html';
	}
	
	function loginFailure(){
		alert('Incorrect Credentials');
	}
})();