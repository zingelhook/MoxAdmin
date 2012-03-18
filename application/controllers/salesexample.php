<?php

class SalesExample extends CI_Controller{
	
	function index(){
			$data['main_content']='salesexample';
			$this->load->view('includes/template',$data);
	}	
}
?>