<?php

class User extends CI_Controller{
	
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