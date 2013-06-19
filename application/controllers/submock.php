<?php
ini_set('display_errors', 'On');

class submock extends CI_Controller{
	function saveName(){
		$data = array(
			'objectName'=>$this->input->post('objectName'),
			'id'=>$this->input->post('id')
		);
		
		$this->load->model('SubMocksvc');
		$resp = $this->SubMocksvc->saveName($data);
			
		echo json_encode($data);
	}
}
?>