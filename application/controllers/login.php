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
	
	
	//user signup for account.
	function signup(){
	
		$data['main_content']='signup';
		$this->load->view('includes/template',$data);	
	}
	
	
	//create a new account.
	function createMember(){
		
		$this->load->library('form_validation');
		
		$this->form_validation->set_rules('firstname', 'First Name', 'trim|required');
		$this->form_validation->set_rules('lastname', 'Last Name', 'trim|required');
		$this->form_validation->set_rules('email', 'Email', 'trim|required|validemail');
		$this->form_validation->set_rules('username', 'User name', 'trim|required|min_length[4]');
		
		$this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[4]|max_length[32]');
		$this->form_validation->set_rules('password2', 'Password Confirmation', 'trim|required|min_length[4]|max_length[32]|matches[password]');
		
		if($this->form_validation->run()==FALSE)
		{
			$data['hasError']=true;
			$data['errors']=$this->form_validation->getErrorsArray();
		}
		
		else
		{
			
			$this->load->model('users');
			$query = $this->users->create_member();

			
			if (is_numeric($query)) 
			{
				$data['hasError']=false;	
			}
			else
			{
				$data['hasError']=true;
				$moreerrors = array($query);
				//$data['errors'] = $errors;
				$data['moreerrors'] = $moreerrors;

			}
			
		}
		
		echo json_encode($data);
	}
	
}

?>