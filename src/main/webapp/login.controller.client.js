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
		
		fetch('/api/login',{
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'content-type':'application/json'
			}
		}).then(navigateToProfile);
	}
	
	function navigateToProfile(){
		// alert('success');
		window.location.href='jquery/components/profile/profile.template.client.html';
	}
})();