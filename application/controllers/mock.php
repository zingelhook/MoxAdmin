<?php

class mock extends CI_Controller{
	
	function index(){
		$hasAccess = $this->session->userdata('isLoggedIn');
		if(!isset($hasAccess) || $hasAccess!=true){
			$data['main_content']='nopermission';
			$this->load->view('includes/template',$data);
		}
		else{	
			$this->load->model('Mockssvc');	
			$uid = $this->session->userdata('userid');
			$mockId = $this->input->get("mockid");
			$data['mock']=$this->Mockssvc->getMock($mockId,$uid);
			$data['mockFields'] = $this->Mockssvc->getMockFields($mockId,$uid);
			$data['main_content']='mock';
			$this->load->view('includes/template',$data);
		}
	}
	

	function create(){
		$data = array(
			'name'=>$this->input->post('mockName'),
			'langVar'=>$this->input->post('langVar'),
			'min' => $this->input->post('mockMin'),
			'max'=>$this->input->post('mockMax'),
			'userid'=>$this->input->post('mockuserId')	
		);
		$this->load->model('Mockssvc');
		$fieldId = $this->Mockssvc->insertServiceDataTemplate($data);
		echo json_encode($fieldId);
		
	}
		
	function update(){

			$data = array(
				'name'=>$this->input->post('mockName'),
				'langVar'=>$this->input->post('langVar'),
				'min' => $this->input->post('mockMin'),
				'sid'=>$this->input->post('mockId'),
				'max'=>$this->input->post('mockMax')
				
			);
			$this->load->model('Mockssvc');
			$this->Mockssvc->updateServiceDataTemplate($data);
		
	}
	
	function delete(){
			$data = array(
				'id'=>$this->input->post('mockId')
			);
			$this->load->model('Mockssvc');
			$this->Mockssvc->deleteServiceDataTemplate($data);
		
	}
	
	function updateServiceField(){
			$data = array(
				'name'=>$this->input->post('txtName'),
				'typeId'=>$this->input->post('typeId'),
				'options' => $this->input->post('txtoptions'),
				'sid'=>$this->input->post('sid'),
				'predefinedSampleDataId'=>$this->input->post('predefinedSampleDataId'),
				'sampleData'=>$this->input->post('txtSampleData')	
			);
			$this->load->model('Mockssvc');
			$this->Mockssvc->updateServiceTemplateField($data);
			
			echo json_encode($data);

	}
	
	
	function addServiceField(){
			$data = array(
				'name'=>$this->input->post('txtName'),
				'typeId'=>$this->input->post('typeId'),
				'options' => $this->input->post('txtoptions'),
				'mockId'=>$this->input->post('mockId'),
				'predefinedSampleDataId'=>$this->input->post('predefinedSampleDataId'),
				'sampleData'=>$this->input->post('txtSampleData')
			);
			$this->load->model('Mockssvc');
			$fieldId = $this->Mockssvc->addServiceTemplateField($data);
			
			echo json_encode($fieldId);

	}
	
	
	
	function deleteServiceField(){
			$data = array(
				'fieldId'=>$this->input->post('fieldId')
			);
			$this->load->model('Mockssvc');
			$result = $this->Mockssvc->deleteServiceTemplateField($data);
			
			echo json_encode($result);

	}
	
	
	
	
		
}
?>