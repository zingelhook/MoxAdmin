<?php
ini_set('display_errors', 'On');

class submocksvc extends CI_Model{
		function saveName($data){
		$Id = $data['id'];
		
		$updateData = array(
			'id' => $data['id'],
			'objectName' => $data['objectName']
		);
		
		$this->db->where('id',$Id);
		$this->db->update('Service_DataTemplates_SubTemplates',$updateData);
		return $data;
	}
}
?>