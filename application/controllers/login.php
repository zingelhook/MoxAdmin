<?php

class Login extends CI_Controller{
	
	
	function index(){
		$data['main_content']='login_form';
		$this->load->view('includes/template',$data);
	}
	
	//used to valodate the login.
	function validate_credentials(){

		//load the user's model
		$this->load->model('Users');
		//use the model's validate function
		$query = $this->Users->validate();
		$this->session->set_userdata($query);
		$data["UserInfo"] = $query;
		$this->session->set_userdata($data);

		echo json_encode($data);
	}
	
	
	//remove all session info.
	function logout(){
		$this->session->sess_destroy();
		echo json_encode('Success');
	}
	

?>