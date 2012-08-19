<!doctype html>
<html class="no-js" lang="en"> <!--<![endif]-->
	<head>
  		<meta charset="utf-8">

  		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
       	Remove this if you use the .htaccess -->
  		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  		<title></title>
  		<meta name="description" content="">
  		<meta name="author" content="">
  		<!-- Mobile viewport optimized: j.mp/bplateviewport -->
  		<meta name="viewport" content="width=device-width, initial-scale=1.0">

  		<!-- Place favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
  		<link rel="shortcut icon" href="<?php echo base_url();?>/favicon.ico">
  		<link rel="apple-touch-icon" href="/apple-touch-icon.png">


  		<!-- CSS: implied media="all" -->
  		<link rel="stylesheet" href="<?php echo base_url();?>CSS/style.css">

  		<!-- Uncomment if you are specifically targeting less enabled mobile browsers
  		<link rel="stylesheet" media="handheld" href="css/handheld.css?v=2">  -->

  		<!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  		<script src="<?php echo base_url();?>js/libs/modernizr-1.7.min.js"></script>
		<script src="<?php echo base_url();?>js/libs/jquery-1.6.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>js/mylibs/core-jquery.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>js/mylibs/sandbox.js" type="text/javascript" charset="utf-8"></script>

		<script src="<?php echo base_url();?>js/libs/underscore-min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>js/libs/backbone-min.js" type="text/javascript" charset="utf-8"></script>


		<script src="<?php echo base_url();?>js/script.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>js/raphael-min.js"></script>
	   	<script src="<?php echo base_url();?>js/g.raphael-min.js"></script>
	    <script src="<?php echo base_url();?>js/g.pie-min.js"></script>
		<script src="<?php echo base_url();?>js/libs/jquery.growl.js"></script>
	
	</head>

	<body>
		<input type="hidden" id="base" value="<?php echo base_url();?>">
		<input type="hidden" id="isLoggedIn" value="<?php echo $this->session->userdata('isLoggedIn');?>">
		<input type="hidden" id="userId" value="<?php echo $this->session->userdata('userid');?>">
		<input type="hidden" id="roleId" value="<?php echo $this->session->userdata('roleId');?>">
		<input type="hidden" id="firstName" value="<?php echo $this->session->userdata('firstname');?>">
		<input type="hidden" id="lastName" value="<?php echo $this->session->userdata('lastname');?>">
		<div id="wrapper">
			<div id="container">
	    		<header>
					<div id="header-cap">
						<a href="#" id="signInLink">Sign In</a>
						<a href="#" style='display:none;' id="logOutLink">Log Out</a>
						<span id="welcometext"></span>
					</div>
					<a id="logo" href="<?php echo base_url();?>index.php"><img src="<?php echo base_url();?>images/logo.png" alt="MoxSVC"/></a>
					
					<div id="top-nav-guest" class="topNav">
						<ul>
							<li><a href="<?php echo base_url();?>index.php/tour">Tour</a></li>
							<li><a href="<?php echo base_url();?>index.php/documentation">Documentation</a></li>	
							<li><a href="<?php echo base_url();?>index.php/pricing">Pricing</a></li>
							<li><a href="http://kgaddy.com">Blog</a></li>
						</ul>
					</div>
					<div id="top-nav-member" class="topNav" style="display:none">
						<ul>
							<li><a href="<?php echo base_url();?>index.php/members">My Mocks</a></li>
							<li><a href="<?php echo base_url();?>index.php/documentation">Documentation</a></li>	
							<li><a href="<?php echo base_url();?>index.php/account">Account</a></li>
							<li><a href="http://kgaddy.com">Blog</a></li>
						</ul>
					</div>
					<div id="top-nav-admin" class="topNav" style="display:none">
						<ul>
							<li><a href="<?php echo base_url();?>index.php/members">My Mocks</a></li>
							<li><a href="<?php echo base_url();?>index.php/documentation">Documentation</a></li>	
							<li><a href="<?php echo base_url();?>index.php/account">Account</a></li>
							<li><a href="<?php echo base_url();?>index.php/reports">Reports</a></li>
						</ul>
					</div>

	    		</header>
				<div id="signInForm" style="display:none">
				<fieldset>
					<legend>Login</legend>
					<ul>
						<li>
							<label for="username">User Name:</label>
							<input type="text" id="username" class="username" name="username"/>	
						</li>
						<li>
							<label for="password">Password:</label>
							<input type="password" id="password" class="password" name="password"/>
						</li>
						<li class="button-list">
							<div>
								<a href="#" class="login_btn" id="login_btn">Login</a>
								<a href="<?php echo base_url();?>index.php/login/signup" id="SignUp_btn">Sign Up</a>
							</div>
						</li>
					</ul>
				</fieldset>
			</div>
			<div id="main" role="main">


