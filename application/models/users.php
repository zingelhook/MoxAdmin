<?php

class users extends CI_Model{
	
    function __construct()
    {
        parent::__construct();
    }
	
	function validate(){
		
		$this->db->where('userName', $this->input->post('username'));
		$this->db->where('passWord', md5($this->input->post('password')));
		$query = $this->db->get('Users');
		$userId=0;
		$roleId=0;
		$firstname="";
		$lastname="";
		$isLoggedIn=false;
		foreach ($query->result() as $row)
		{
		    $userId= $row->id;
			$firstname = $row->firstName;
			$lastname = $row->lastName;
		}
		
		if($query->num_rows==1){
			
			$result['firstname']=$firstname;
			$result['lastname']=$lastname;
			//lets get the users's role.
			$this->db->where('userid', $userId);		
			$queryRole = $this->db->get('Users_Roles');
				
			foreach ($queryRole->result() as $row)
			{
			    $roleId= $row->roleId;
			}
		
			$isLoggedIn=true;
		
		};	
		
		$result['isLoggedIn']=$isLoggedIn;
		$result['userid']=$userId;
		$result['roleId']=$roleId;
	
		return $result;
	}
	
	function create_member(){
		$new_member_insert_data = array(
			'firstName' =>$this->input->post('firstname'),
			'lastName' =>$this->input->post('lastname'),
			//'email' =>$this->input->post('email'), //goes into extended table
			'userName' =>$this->input->post('username'),
			'passWord' => md5($this->input->post('password')),
			'tier' => 0
			
		);
		
		$insert = $this->db->insert('Users',$new_member_insert_data);
		$userid = $this->db->insert_id();
		
			$roleData = array(
				'userid' =>$userid,
				'roleId' =>2
			);
		
		$this->db->insert('Users_Roles',$roleData);
		

		return $insert;
	}
	
	
	//get all mocls. Used for admin.
	function GetAllUsers(){
		$sql = "SELECT * FROM Users";
		return $this->db->query($sql)->result();
	}
	
	
	
}





?>