// JavaScript Document

var valid = false;
var errorMessageNaam = [" Geef je naam in aub."," Write your name please."," Ecrivez votre nom svp."];
var errorMessageEmail = [" Geen geldig e-mailadres."," Not a valid e-mailaddress."," Pas une adresse email valide."];
var errorMessageDate = [" Geen geldige datum."," Not a valid date."," Pas une date valide."];
var errorNaam;
var errorEmail;
var errorDate;


$(function(){
		/* SET THE LANGUAGE AFTER PAGE LOAD OR REFRESH */
		checkLanguage();
		
		
		$("form").validate({
		rules:{
			naam:{
				required: true,
				valideerNaam: true
				},
			email:{
				required: true,
				valideerEmail: true
				},
			bday:{
				valideerBday: true
				}
			},
		messages:{
			naam: errorNaam,
			email: errorEmail,
			bday: errorDate
		},
		errorPlacement:function(error, element)
		{
			if(element.attr('id') == "naam")
			{
				error.appendTo("#naamSpan");
			}
			if(element.attr('id') == "email")
			{
				error.appendTo("#emailSpan");
			}
			if(element.attr('id') == "bday")
			{
				error.appendTo("#bdaySpan");
			}
		},
		submitHandler:function(form)
		{
			$.post('mail.php', $(form).serialize(), function(data){
				$("#response").html(data);
			});
		}
		
	});
});


//Get language from storage
//VARIABLE LANGUAGE ADAPTABLE TO USER
function checkLanguage(){
	var language = window.selectedLanguage;
	
		switch(	language){
		case 'nl': 	errorNaam = errorMessageNaam[0];
					errorEmail = errorMessageEmail[0];
					errorDate = errorMessageDate[0];
					break;
		case 'en': 	errorNaam = errorMessageNaam[1];
					errorEmail = errorMessageEmail[1];
					errorDate = errorMessageDate[1];
					break;
		case 'fr': 	errorNaam = errorMessageNaam[2];
					errorEmail = errorMessageEmail[2];
					errorDate = errorMessageDate[2];
					break;
	}
}


$.validator.addMethod(
	"valideerNaam", 
	function(value, element) {
		return /^[a-z-,'\s]+$/i.test(value);
	}, 
	errorNaam);
$.validator.addMethod(
	"valideerEmail", 
	function(value, element) {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(value);
	}, 
	errorEmail);
$.validator.addMethod(
	"valideerBday", 
	function(value, element) {
		return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value) || /^$/.test(value);
	}, 
	errorDate);




