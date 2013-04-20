<?php

class mock extends CI_Controller{

	//get the user's defined mocks
	function GetUserMocks(){
		//load the user's mocks.
		$uid = $this->session->userdata('userid');
		$this->load->model('Mockssvc');
		$query = $this->Mockssvc->getUserServices($uid);
		$data["UserMocks"] = $query;
		$data['userid']=$uid;
		echo json_encode($data);
	}
	
	//get the fields used to make up a mock
	function GetMocksFields(){
		//load the mocks' fields.
		$uid = $this->session->userdata('userid');
		$id = $this->input->get("id");
		$this->load->model('Mockssvc');
		$query = $this->Mockssvc->getMockFields($id,$uid);
		$data["MockFields"] = $query;
		echo json_encode($data);
	}

	//get the child mocks used to make up a mock
	function GetMockChildren(){
		$id = $this->input->get("id");
		$this->load->model('Mockssvc');
		$query = $this->Mockssvc->getMockChildren($id);
		$data["MockChildren"] = $query;
		echo json_encode($data);
	}

	
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
	

	function save(){
		$id = $this->input->post('id');
		$data = array(
			'name'=>$this->input->post('name'),
			'langVar'=>$this->input->post('langVar'),
			'min' => $this->input->post('min'),
			'max'=>$this->input->post('max'),
			'userid'=>$this->session->userdata('userid')	
		);
		$fieldId=0;
		
		if($id>0){
			$data['id']=$id;
			$fieldId=$id;
			$this->load->model('Mockssvc');	
			$data = $this->Mockssvc->updateServiceDataTemplate($data);
		}
		else{
			$this->load->model('Mockssvc');
			$fieldId = $this->Mockssvc->insertServiceDataTemplate($data);
			
		}
		echo json_encode($fieldId);
	}
		
	function update(){

			$data = array(
				'name'=>$this->input->post('name'),
				'langVar'=>$this->input->post('langVar'),
				'min' => $this->input->post('min'),
				'sid'=>$this->input->post('id'),
				'max'=>$this->input->post('max'),
				'userid'=>$this->session->userdata('userid')
				
			);
			$this->load->model('Mockssvc');
			$results = $this->Mockssvc->updateServiceDataTemplate($data);
			echo json_encode($results);
		
	}
	
	function delete(){
			$data = array(
				'id'=>$this->input->post('id'),
				'userid'=>$this->session->userdata('userid')
			);
			$this->load->model('Mockssvc');
			$newData = $this->Mockssvc->deleteServiceDataTemplate($data);
			echo json_encode($newData);
	}
	
	function updateServiceField(){
			$data = array(
				'name'=>$this->input->post('txtName'),
				'typeId'=>$this->input->post('typeId'),
				'options' => $this->input->post('txtoptions'),
				'sid'=>$this->input->post('sid'),
				'predefinedSampleDataId'=>$this->input->post('predefinedSampleDataId'),
				'sampleData'=>$this->input->post('txtSampleData'),
				'userid'=>$this->session->userdata('userid')
			);
			$this->load->model('Mockssvc');
			$this->Mockssvc->updateServiceTemplateField($data);
			
			echo json_encode($data);

	}
	
	
	function addServiceField(){
			$data = array(
				'id'=>$this->input->post('id'),
				'name'=>$this->input->post('name'),
				'typeId'=>$this->input->post('typeId'),
				'options' => $this->input->post('options'),
				'mockId'=>$this->input->post('mockId'),
				'predefinedSampleDataId'=>$this->input->post('predefinedSampleDataId'),
				'sampleData'=>$this->input->post('sampleData'),
				'userid'=>$this->session->userdata('userid')
			);
			$this->load->model('Mockssvc');
			$return = $this->Mockssvc->addServiceTemplateField($data);
			
			echo json_encode($return);
	}
	
	
	
	function deleteServiceField(){
			$data = array(
				'fieldId'=>$this->input->post('fieldId'),
				'userid'=>$this->session->userdata('userid')
			);
			$this->load->model('Mockssvc');
			$result = $this->Mockssvc->deleteServiceTemplateField($data);
			echo json_encode($result);
	}
	
	
	
	
		
}
?>