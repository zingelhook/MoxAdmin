<?php
ini_set('display_errors', 'On');

class mockssvc extends CI_Model{
	
	//get user's mocks
	function getUserServices($userid){
		$sql = "SELECT id,name,min,max FROM Service_DataTemplates WHERE userId = ?";
		return $this->db->query($sql, array($userid))->result();
	}
	
	
	//get all mocls. Used for admin.
	function getAllMocks(){
		$sql = "SELECT id,name,min,max FROM Service_DataTemplates";
		return $this->db->query($sql)->result();
	}
	
	
	function getMockFields($id, $userid){
			$sql = "select pd.name as predefefinedSampleDataType,dt.userid, sf.id as id, sf.name as name, sf.typeid as typeId, sf.options as fieldoptions, sf.predefinedSampleDataId as predefinedSampleDataId, sf.sampleData as sampleData from Service_DataTemplate_Fields sdt join Service_Fields sf on sdt.fieldid = sf.id join Service_DataTemplates dt on sdt.dataTemplateid=dt.id join Service_PredefinedSampleData pd on sf.predefinedSampleDataId = pd.id where sdt.datatemplateid=? and dt.userid=?";
			return $this->db->query($sql, array($id,$userid))->result();
	}
	
	function getMock($id,$userid){
			$sql = "SELECT id,name,min,max FROM Service_DataTemplates WHERE userId = ? and id=?";
			return $this->db->query($sql, array($userid,$id))->result();
	}
	
	//gets a single mock field based on id.
	
	function getMockField($id){
			$sql = "SELECT id,name,typeId,options, predefinedDataId, sampleData FROM Service_Fields WHERE id = ?";
			return $this->db->query($sql, array($id))->result();
	}
	
	
	function updateServiceDataTemplate($data){

		
		$Id = $data['sid'];
		
		$updateData = array(
			'name' => $data['name'],
			'langVar' => $data['langVar'],
			'min' => $data['min'],
			'max'=>$data['max']
			
		);
		$this->db->where('id',$Id);
		$this->db->update('Service_DataTemplates',$updateData);
		return $data;
	}
	
	function insertServiceDataTemplate($data){
		$this->db->insert('Service_DataTemplates', $data);
		$fieldId = $this->db->insert_id();
		return $fieldId;
	}
	
	function deleteServiceDataTemplate($data){
		$data['error']='';
		try
			{
			$id= $data['id'];
			$this->db->where('id',$id);
			$this->db->delete('Service_DataTemplates');
			return $data;
			}
		catch(Exception $ex){
			$data['error'] = $ex->getMessage();
			return $data;
		}

	}
	
	function updateServiceTemplateField($data){
		$Id = $data['sid'];
		$updateData = array(
			'name' => $data['name'],
			'typeId' => $data['typeId'],
			'options' => $data['options'],
			'predefinedSampleDataId'=>$data['predefinedSampleDataId'],
			'sampleData'=>$data['sampleData']

			);
			
		$this->db->where('id',$Id);
		$this->db->update('Service_Fields',$updateData);
		return $data;
		
	}
	
	function addServiceTemplateField($data){
		$Id = $data['mockId'];
		$insertData = array(
			'name' => $data['name'],
			'typeId' => $data['typeId'],
			'options' => $data['options'],
			'predefinedSampleDataId'=>$data['predefinedSampleDataId'],
			'sampleData'=>$data['sampleData']

			);
			
		//$this->db->where('id',$Id);
		$this->db->insert('Service_Fields',$insertData);
		$fieldId = $this->db->insert_id();
		
		$refData = array(
			'dataTemplateId' => $Id,
			'fieldId' => $fieldId 
			);
		$this->db->insert('Service_DataTemplate_Fields',$refData);		
				
		return $fieldId;
		
	}
	
	
	//deletes the field row.
	function deleteServiceTemplateField($data){
	
		$id= $data['fieldId'];
		$sql ="	delete sf, sdf from Service_Fields as sf left join Service_DataTemplate_Fields as sdf on sf.id = sdf.fieldId where sf.id=?";
	 	return $this->db->query($sql, array($id));

		
	}
	

}

?>