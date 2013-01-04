<?php

class servicelog extends CI_Controller{
	function AllLogs(){
		$roleId=$this->session->userdata('roleId');
		if($roleId!=1){//only admin can see this.
				
		}
		else{
			$this->load->model('moxservicelog');
			$data['servicelogs']=$this->moxservicelog->GetAllServiceLogs();
			echo json_encode($data);
		}
	}	
}
?>