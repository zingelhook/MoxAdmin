<?php

class errorlog extends CI_Model{
	

	
	//get all mocls. Used for admin.
	function GetAllErrorLogs(){
		$sql = "SELECT * FROM Error_Log";
		return $this->db->query($sql)->result();
	}
	

	
}

?>