<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class account extends CI_Controller {
	public function index()
	{
			$data['main_content']='account';
			$this->load->view('includes/template',$data);
	}
}