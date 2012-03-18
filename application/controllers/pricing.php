<?php

class Pricing extends CI_Controller{
	
	function index(){
			$data['main_content']='pricing';
			$this->load->view('includes/template',$data);
	}
	
	
	
	
}




?>