<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class reports extends CI_Controller {
	public function index()
	{
		
		$roleId=$this->session->userdata('roleId');
		
		if($roleId!=1){//only admin can see this.
			$data['main_content']='nopermission';
			$this->load->view('includes/template',$data);
		}
		else
		{
			$data['main_content']='reports';
			$this->load->view('includes/template',$data);
		}
	}
}