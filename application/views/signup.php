<h1>Sign Up</h1>
<div id="signup">
	<fieldset>
		<legend>Personal Info</legend>
		<?php
		echo('<form action="' .  base_url() . 'index.php/login/create_member" method="post" accept-charset="utf-8">');
		echo("<div class='form-row'><label for='firstname'>First Name:</label>");
		echo form_input('firstname', set_value('firstname'));
		echo("</div><div class='form-row'><label for='lastname'>Last Name:</label>");
		echo form_input('lastname', set_value('lastname'));
		echo("</div><div class='form-row'><label for='email'>Email:</label>");
		echo form_input('email', set_value('email'));
		echo("</div><div class='form-row'><label for='username'>User Name:</label>");
		echo form_input('username',set_value('username'));
		echo("</div><div class='form-row'><label for='password'>Password:</label>");
		echo form_password('password');
		echo("</div><div class='form-row'><label for='password2'>Confirm Password:</label>");
		echo form_password('password2');
		echo("</div><div class='form-row'>");
		echo form_submit('submit','Submit');
		echo("</div></form>");
		
		?>	
		<?php echo validation_errors('<p class="error">'); ?>
	</fieldset>
</div>