<?php

class predefineddatamodel extends CI_Model{
	

	
	//get all options for predefined data.
	function GetAllPredefinedDataList(){
		$sql = "SELECT * FROM Service_PredefinedSampleData";
		return $this->db->query($sql)->result();
	}
	

	
}

?>