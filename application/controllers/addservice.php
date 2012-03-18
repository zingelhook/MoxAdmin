<?php

class addservice extends CI_Controller{
	
	function index(){
			$data['main_content']='addservice';
			$this->load->view('includes/template',$data);
	}	
}
?>