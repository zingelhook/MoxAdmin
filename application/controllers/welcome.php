<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {
	public function index()
	{
			$data['main_content']='welcome_message';
			$this->load->view('includes/template',$data);
	}
}

