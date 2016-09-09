$(document).ready(function() {
	var createButton = $('#show_create');
	var createForm = $('#create_form');
	var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

	function loadUsers() {
		$('#users').empty();
		$.ajax({
			url: BASEURL + '/users',
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			data.forEach(function(user) {
				$('#users').append('<div class="card col s6">\n<div class="card-title"><li>' + user.first_name 
																	+ ' ' 
																	+ user.last_name 
																	+ '<hr>'
																	+ '<div class="card-action"> <button data-user-id="' 
																	+ user.id 
																	+ '" class="delete_user">Delete</button>'
																	+ ' '
																	+ '<button data-user-id="'
																	+ user.id
																	+ '" class="edit_user">Edit</button></div>\n</li>\n</div>\n</div>');
			});
		}).fail(function(data) {
			console.log(data);
		});
	}
	$('#load_users').click(function() {
		loadUsers();
	});
	$(document).on('click', '.delete_user', function() {
		var $userId = $(this).data('user-id');
		$.ajax({
			url: BASEURL + '/users/' + $userId,
			type: 'DELETE',
			dataType: 'JSON',
		}).done(function(data){
			loadUsers();
			alert('User Deleted!!');
		}).fail(function(data){
			console.log(data);
		});
	});
	$(document).on('click', '.edit_user', function() {

	});
	createButton.click(function() {
		createForm.slideToggle(400, function() {
			if(createForm.is(':hidden')) {
				createButton.text('Create User');
			} else {
				createButton.text('Hide Create User');
			}
			
		});
	});
	$('#new_user').submit(function(e) {
		e.preventDefault();
		var $firstName = $('#user_first_name');
		var $lastName = $('#user_last_name');
		var $phoneNum = $('#user_phone_number');
		$.ajax({
			url: BASEURL + $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'JSON',
			data: {user: {first_name: $firstName.val(),
										last_name: $lastName.val(),
										phone_number: $phoneNum.val()}}
		}).done(function(data) {
			alert('User created Successfully!');
			$firstName.val('');
			$lastName.val('');
			$phoneNum.val('');
			$firstName.focus();
			loadUsers();
		}).fail(function(data) {
			console.log(data);
		});
	});
});