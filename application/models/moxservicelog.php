<?php
class moxservicelog extends CI_Model{
	function GetAllServiceLogs(){
			$sql = "SELECT * FROM Service_Log order by logDate desc";
			return $this->db->query($sql)->result();
		}	
}
?>