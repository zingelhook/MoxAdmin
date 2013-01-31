<?php

class User extends CI_Controller{
	//send email to user to reset
	function forgotUserName(){
		
		$email = $this->input->post('email');
		$data = [];
		$data['email'] = $email;
		$this->load->model('Users');
		$this->load->model('Email');
		
		$user = $this->Users->getUserByEmail($data);
		$user['email']=$email;
		$email = $this->Email->send_email($user);
		
		echo json_encode($email);
	}

	//create a new account.
	function createMember(){
		$this->load->library('form_validation');
		
		$this->form_validation->set_rules('firstname', 'First Name', 'trim|required');
		$this->form_validation->set_rules('lastname', 'Last Name', 'trim|required');
		$this->form_validation->set_rules('email', 'Email', 'trim|required|validemail');
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


	
	//get the user's defined mocks
	function DeleteUser(){
		$data = array(
			'id'=>$this->input->post('id')
		);
		$this->load->model('Users');
		$newData = $this->Users->delete_member($data);
		echo json_encode($data);
	}
}
?>