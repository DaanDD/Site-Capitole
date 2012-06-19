<?php

$width = $_POST['width'];
$mail = $_POST['email'];
$naam = $_POST['naam'];
$bericht = $_POST['bericht'];
$bday = $_POST['bday'];
$subject = $_POST['ddl']." - Sent from www.themissingh.be/capitole/contact.html";
$sex = $_POST['sex'];
$to = "stef_christiaens@hotmail.com";

$message =" You received  a mail from ".$mail;
$message .=".\r";
$message .=" Text of the message : ".$bericht;
$message .=".\r";
$message .="Bday of " .$naam;
$message .=" : ".$bday;
$message .="\r Sex: ".$sex;

require_once("captcha.php");

if($check){
 	if(mail($to, $subject, $message)){
		echo "Mail successfully sent.";
	}
}
elseif($width < 479){
	if(mail($to, $subject, $message)){
		echo "Mail successfully sent.";
	}
	else{
		echo "There are some errors to send the mail, check your internet settings.";		
	}
}
else{
echo "There are some errors to send the mail, fill in the captcha.";
}