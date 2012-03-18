<?php

class Documentation extends CI_Controller{
	
	function index(){
			$data['main_content']='documentation';
			$this->load->view('includes/template',$data);
	}
	
	
	
	
}




?>