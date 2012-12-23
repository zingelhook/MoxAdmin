<?php
class moxservicelog extends CI_Model{
	function GetAllServiceLogs(){
			$sql = "select sl.logDate,sl.userAgent, st.name as MoxName,userId,CONCAT(firstName , ' ' , lastName) as name, userName from Service_DataTemplates st join Users u on st.userId = u.id join Service_Log sl on st.id = sl.serviceId order by sl.logDate desc";
			return $this->db->query($sql)->result();
		}	
}
?>