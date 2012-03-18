<?php

class Tour extends CI_Controller{
	
	function index(){
			$data['main_content']='tour';
			$this->load->view('includes/template',$data);
	}	
}
?>