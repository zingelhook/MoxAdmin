<div id="login_form">
	<h1>Login</h1>
	<?php
	echo('<form action="' .  base_url() . 'index.php/login/validate_credentials" method="post" accept-charset="utf-8">');
	?>
	<fieldset>
	<?php
	echo('<input type="hidden" id="source" value="login_form"/>');
	echo('<div class="form-row">');
	?>
	<label for="username2">Login</label>
	<input type="text" id="username2" class="username" name="username"/>	
	<?php
	//echo form_input('username','UserName');
	echo('</div>');
	echo('<div class="form-row">');
	?>
	<label for="password2">Password</label>
	<input type="password" class="password" id="password2" name="password"/>
	<?php
	//echo form_password('password', 'Password');
	echo('</div>');
	echo('<div class="form-row">');
	?>
	<a href="#" class="login_btn" id="login_btnTwo">Login</a>
	<?php
	//echo('<input type="button" id="login" value="Login"/>')
	//echo form_submit('submit','Login');
	echo('</div>');
	echo('<div class="form-row">');
	echo('<a href="' .base_url() . 'index.php/login/signup">Create an Account</a>');
	echo('</div></fieldset></form>');
	
	?>
	
</div>