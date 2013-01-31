<?php
class email extends CI_Model{
	function send_email($info){
		include_once 'inc/php/swift/swift_required.php';  
		//set the root
		//$root = $_SERVER['DOCUMENT_ROOT'].'/dev/tutorials/email_signup/source_revised';

		//grab the template content
		$template = "my {EMAIL}";//file_get_contents($root.'/signup_template.'.$format);
			
		//replace all the tags
		//$template = ereg_replace('{USERNAME}', $info['username'], $template);
		//$template = str_replace("{EMAIL}", $info["lastname"], $template);
		//$template = str_replace('{KEY}', $info['key'], $template);
		//$template = str_replace('{SITEPATH}','http://site-path.com', $template);
		
		//return the html of the template
		
		
		//setup the mailer
		$transport = Swift_MailTransport::newInstance();
		$mailer = Swift_Mailer::newInstance($transport);
		$message = Swift_Message::newInstance();
		$message ->setSubject('Welcome to Site Name');
		$message ->setFrom(array('sales@zingelhook.com' => 'Site Name'));
		$message ->setTo(array("kevin.gaddy@gmail.com" => "Kevin Gaddy"));
		$message ->setBody("body_plain_txt");
		//$message ->addPart($body, 'text/html');
		$result = $mailer->send($message);
		return $result;
		
		
		//return $template;

	}
	
	

	//cleanup the errors
	function show_errors($action){

		$error = false;

		if(!empty($action['result'])){
	
			$error = "<ul class=\"alert $action[result]\">"."\n";

			if(is_array($action['text'])){
	
				//loop out each error
				foreach($action['text'] as $text){
			
					$error .= "<li><p>$text</p></li>"."\n";
			
				}	
		
			}else{
		
				//single error
				$error .= "<li><p>$action[text]</p></li>";
		
			}
		
			$error .= "</ul>"."\n";
		
		}

		return $error;

	}
}
?>