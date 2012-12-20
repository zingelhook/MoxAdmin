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
  		<link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap.min.css">
  		<link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap-responsive.min.css">
		<link rel="stylesheet" href="<?php echo base_url();?>assets/css/monokai.css">
		
  		<link rel="stylesheet" href="<?php echo base_url();?>assets/css/index.css">
  		<!-- Uncomment if you are specifically targeting less enabled mobile browsers
  		<link rel="stylesheet" media="handheld" href="css/handheld.css?v=2">  -->

  		<!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  		<script src="<?php echo base_url();?>assets/js/libs/modernizr-1.7.min.js"></script>
		<script src="<?php echo base_url();?>assets/js/libs/jquery-1.8.0.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>assets/js/libs/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>

		<script src="<?php echo base_url();?>assets/js/libs/underscore-min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>assets/js/libs/backbone-min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>assets/js/libs/highlight.pack.js" type="text/javascript" charset="utf-8"></script>


		<script src="<?php echo base_url();?>app/namespace.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/menu.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/mock.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/mockfield.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/dashboard.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/shared.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/home.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/login.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/tour.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/docs.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/signup.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/logout.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/codesamples.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/modules/servicelog.js" type="text/javascript" charset="utf-8"></script>
		<script src="<?php echo base_url();?>app/Home_index.js" type="text/javascript" charset="utf-8"></script>

		<script src="<?php echo base_url();?>assets/js/libs/raphael-min.js"></script>
	   	<script src="<?php echo base_url();?>assets/js/libs/g.raphael-min.js"></script>
	    <script src="<?php echo base_url();?>assets/js/libs/g.pie-min.js"></script>
		<script src="<?php echo base_url();?>assets/js/libs/jquery.growl.js"></script>
		 <script type="text/javascript">
	        var base = "<?php echo base_url();?>"
	    </script>
		
	</head>

	<body>
		<input type="hidden" id="base" value="<?php echo base_url();?>">
		<input type="hidden" id="isLoggedIn" value="<?php echo $this->session->userdata('isLoggedIn');?>">
		<input type="hidden" id="userId" value="<?php echo $this->session->userdata('userid');?>">
		<input type="hidden" id="roleId" value="<?php echo $this->session->userdata('roleId');?>">
		<input type="hidden" id="firstName" value="<?php echo $this->session->userdata('firstname');?>">
		<input type="hidden" id="lastName" value="<?php echo $this->session->userdata('lastname');?>">
		
	
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<button type="button" class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
					            <span class="icon-bar"></span>
					            <span class="icon-bar"></span>
					            <span class="icon-bar"></span>
					          </button>
					<a class="brand" href="./">Moxsvc</a>
					<div  class="nav-collapse collapse">
						<ul id="main-menu" class="nav"></ul>
					</div>
				</div>
		     </div>
		</div>
		
		<div id="main" class="container-fluid">
			<div class="row-fluid">



