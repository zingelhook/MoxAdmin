<?php

class Members extends CI_Controller{
	

	
	function index(){
		$hasAccess = $this->session->userdata('isLoggedIn');
		if(!isset($hasAccess) || $hasAccess!=true){
			$data['main_content']='nopermission';
			$this->load->view('includes/template',$data);
		}
		else
		{
			$data['main_content']='dashboard';
			
		
			$this->load->model('Mockssvc');
			
			$uid = $this->session->userdata('userid');
			
			$data['mymocks'] = $this->Mockssvc->getUserServices($uid);
			

			
			$this->load->view('includes/template',$data);
		}


	}

	/*
	function create_member()
	{
		
		$new_member_insert_data = array(
			'firstName' =>$this->input->post('firstname'),
			'lastName' =>$this->input->post('lastname'),
			//'email' =>$this->input->post('email'), //goes into extended table
			'userName' =>$this->input->post('username'),
			'passWord' => md5($this->input->post('password'))
			
		);
		
		$insert = $this->db->insert('Users',$new_member_insert_data);
		return $insert;
	}	
	*/
}
?>