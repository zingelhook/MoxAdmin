<?php

class predefineddata extends CI_Controller{
	
	function getallpredefineddata(){	
		try
		{
			$this->load->model("predefineddatamodel");
			$data["predefineddata"]=$this->predefineddatamodel->GetAllPredefinedDataList();
			echo json_encode($data);
		}
		catch (Exception $e) {
			 echo 'Caught exception: ',  $e->getMessage(), "\n";
		    log_message('error', $e->getMessage(), "\n");
			echo json_encode('Error');
		}
	}
}
?>