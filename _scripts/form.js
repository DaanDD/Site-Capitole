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
			console.log(element.attr('id'));
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
			
		}
		
	});
	function send(){
				
			var naam = $("#naam").val();
			var mail = $("#email").val();
			var bday = $("#bday").val();
			var bericht = $("#bericht").val();
			var ddl = document.getElementById("ddl");
			var strUser = ddl.options[ddl.selectedIndex].text;
			var sex;
			for (var i = 0; i < document.frm.sex.length; i++){
			      if (document.frm.sex[i].checked){
			         sex = document.frm.sex[i].value;
			         break;
					}
			}
			var datastr ='&naam=' + naam + '&subject=' + strUser + '&mail=' + mail + '&bericht=' + bericht + '&bday=' + bday + '&sex=' + sex ;
			$("#response").css("display", "block");
			$("#response").html("Sending message …. ");
			$("#response").fadeIn("slow");
			setTimeout(function(){
				if($("form").valid())
				{
					send(datastr);
				}
				else{
					$("#response").html("Not valid form …. ");
				}
			}, 2000);
			console.log("sent?");
			return false;
		
	}
	$("form").submit(function(){
			//send();
			return false;
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

function send(datastr){
	console.log("sending");
	$.ajax({
	type: "POST",
	dataType: 'html',
	url: "mail.php",
	data: datastr,
	cache: false,
	success: function(html){
		$("#response").html(html);
		}
	})
}



