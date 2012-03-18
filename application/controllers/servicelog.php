<?php

class servicelog extends CI_Controller{
	function index(){
		$roleId=$this->session->userdata('roleId');
		if($roleId!=1){//only admin can see this.
			$data['main_content']='nopermission';
			$this->load->view('includes/template',$data);
		}
		else{
			$this->load->model('moxservicelog');
			$data['servicelogs']=$this->moxservicelog->GetAllServiceLogs();
			$data['main_content']='servicelog';
			$this->load->view('includes/template',$data);
		}
	}	
}
?>