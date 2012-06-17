// LOAD CONTENT IN USER'S SELECTED LANGUAGE 
// WRITTEN BY STEFAAN CHRISTIAENS
//LAST MODIFIED DATE 29/03/12
//*************************************************

//VARIABLE LANGUAGE ADAPTABLE TO USER
var selectedLanguage = "nl";
var cookiesEnabled = false;

function setLanguageFromLink(languageLink){
	/* GET LANGUAGE FROM REL */
	var language = $(languageLink).attr('class');
	/* SET LANGUAGE FROM REL --> LINK */
	if(Modernizr.localstorage)
	{
		setLanguage(language);
	}
	else{
		setLanguageCookies(language);
	}
}

/* SET LANGUAGE FOR THE WEBAPP
--> Update HTML
*/
function setLanguage(language){
	/* CALL METHOD  setLanguageToStorage
	first argument: the language*/
	setLanguageToStorage(language);
	/* LOAD SPECIFIED CONTENT IN LANGUAGE */
	//$("#language-indicator").html('<h1>' + language + '</h1>');
	/* REMOVE ACCENT FROM PREVIOUS LANGUAGE */	
	//$('a[class="' + selectedLanguage + '"]').css("color","#CCC");
	console.log(selectedLanguage);
	/* GIVE ACCENT TO LANGUAGE */
	//$('a[class="' + language + '"]').css("color","#777");
	console.log(language);
	/* SET THE NEW LANGUAGE TO THE GLOBAL VARIABLE */
	selectedLanguage = language;
	/* UPDATE PAGE */
	loadContent("content/documents/content.xml");
}

function getLanguageFromStorage(){
	var language = "nl";
	/* GET LANGUAGE FROM LOCALSTORAGE */
	if (Modernizr.localstorage) {		
		if(localStorage.getItem('stonesfromghent-language') == null){
			setLanguageToStorage('nl');
		}
		else{
			language = localStorage.getItem('stonesfromghent-language');
		}
	}
	else{
		if(checkCookiesEnabled()) {
			if($.cookie('stonesfromghent-language') == null){
				setLanguageToStorageCookies('nl');
			}
			else{
				language = $.cookie('stonesfromghent-language');
			}
		}
	}
	return language;	
}

function setLanguageToStorage(language){
	if (Modernizr.localstorage) {
		localStorage.setItem('stonesfromghent-language',language);
	}
	else {
		setLanguage('nl');
	}	
}

/* FALLBACK TO COOKIES */

function checkCookiesEnabled(){
	if(!cookiesEnabled){
		$.cookie('stonesfromghent-cookiesenabled', true);
		if($.cookie('stonesfromghent-cookiesenabled')){
			$.cookie('stonesfromghent-cookiesenabled',null);
			cookiesEnabled = true;
		}
	}
	return cookiesEnabled;
}

function setLanguageToStorageCookies(language){
	if(checkCookiesEnabled()) {
		$.cookie('stonesfromghent-language', language, {expires:7});
	}	
}


/* SET LANGUAGE FOR THE WEBAPP
--> Update HTML
*/
function setLanguageCookies(language){
	/* CALL METHOD  setLanguageToStorage
	first argument: the language*/
	setLanguageToStorageCookies(language);
	/* LOAD SPECIFIED CONTENT IN LANGUAGE */
	//$("#language-indicator").html('<h1>' + language + '</h1>');
	/* REMOVE ACCENT FROM PREVIOUS LANGUAGE */	
	//$('a[rel="' + selectedLanguage + '"]').css("color","#CCC");
	/* GIVE ACCENT TO LANGUAGE */
	//$('a[rel="' + language + '"]').css("color","#777");
	/* SET THE NEW LANGUAGE TO THE GLOBAL VARIABLE */
	selectedLanguage = language;
	/* UPDATE PAGE */
	loadContent("data/xml/content.xml");
}

//LOAD THE XML
function loadContent(url){
	console.log(url);
	$.ajax({
		url:url,
		method: "GET",
		datatype: "xml",
		encoding: "utf-8",
		cashing: false,
		beforeSend: beforeLoad,
		success: loadSuccess,
		error: loadError,
		complete: loadComplete
	});
}

//INITIALIZE THE PRElOADER
function beforeLoad(xhrInstance){
	/*switch(selectedLanguage){
		case 'nl' : $("#beschrijving").html("Inhoud aan het laden...");
			break;
		case 'fr' : $("#beschrijving").html("Charger le contenu..");
			break;
		case 'en' : $("#beschrijving").html("Loading the content..");
			break;
	}*/
	
}

//STOP THE PRELOADER
function loadComplete(jqXHR, textStatus){
	//$("#beschrijving").html("");
}

//DISPLAY ERROR WHEN LOADING FAILED
function loadError(xhr, message, optional){
	alert("loadError");
}

//PARSE THE XML IF SUCCESS -- CHECK THE BODY ID TO SEE WHAT CONTENT MUST BE LOADED
function loadSuccess(data,status){

	function returnDocument() {
        var file_name = document.location.href;
        var end = (file_name.indexOf("#") == -1) ? file_name.length : file_name.indexOf("#");
        return file_name.substring(file_name.lastIndexOf("/")+1, end);
    }
    
    
	parseNavigation(data);
	
	switch(returnDocument()){
		case 'index.html': parseHome(data);
					break;
		case 'media.html': parseFoto();
					break;
		case 'nieuws.html': parseNieuws(data);
					break;
		case 'praktisch.html': parsePraktisch(data);
					break;
		case 'gebouw.html': parseGebouw(data);
					break;
		case 'nieuws.html' : parseNieuws(data);
					break;
		case 'contact.html' : parseContact(data);
					break;
		case ''				: parseHome(data);
					break;
		
	}
}

//PARSE THE NAVIGATION
function parseNavigation(data){
	console.log('parsenav')
	var link_1;
	var link_2;
	var link_3;
	var link_4;
	var link_5;
		$(data).find('nav').find('link').each(function() {
            switch($(this).attr('id'))
			{
				case 'beschrijving':
				  switch(selectedLanguage)
				  {
					  case "nl": $(this).find("languages").find('language').each(function() {
											  if($(this).attr('id') == "nederlands")
											  {
												  link_1 = $(this).text();
											  }
										  });
										  break;
										  
					  case "fr": $(this).find("language").each(function() {
											  if($(this).attr('id') == "frans")
											  {
												  link_1 = $(this).text();
											  }
										  });
										  break;
										  
					  case "en": $(this).find("language").each(function() {
											  if($(this).attr('id') == "engels")
											  {
												  link_1 = $(this).text();
											  }
										  });
										  break;
				  }
				break;
				case 'foto':
				  switch(selectedLanguage)
				  {
					  case "nl": $(this).find("language").each(function() {
											  if($(this).attr('id') == "nederlands")
											  {
												  link_2 = $(this).text();
											  }
										  });
										  break;
										  
					  case "fr": $(this).find("language").each(function() {
											  if($(this).attr('id') == "frans")
											  {
												  link_2 = $(this).text();
											  }
										  });
										  break;
										  
					  case "en": $(this).find("language").each(function() {
											  if($(this).attr('id') == "engels")
											  {
												  link_2 = $(this).text();
											  }
										  });
										  break;
				  }
				break;
				case 'gebouw':
				  switch(selectedLanguage)
				  {
					  case "nl": $(this).find("language").each(function() {
											  if($(this).attr('id') == "nederlands")
											  {
												  link_3 = $(this).text();
											  }
										  });
										  break;
										  
					  case "fr": $(this).find("language").each(function() {
											  if($(this).attr('id') == "frans")
											  {
												  link_3 = $(this).text();
											  }
										  });
										  break;
										  
					  case "en": $(this).find("language").each(function() {
											  if($(this).attr('id') == "engels")
											  {
												  link_3 = $(this).text();
											  }
										  });
										  break;
				  }
				break;
				case 'nieuws':
				  switch(selectedLanguage)
				  {
					  case "nl": $(this).find("language").each(function() {
											  if($(this).attr('id') == "nederlands")
											  {
												  link_4 = $(this).text();
											  }
										  });
										  break;
										  
					  case "fr": $(this).find("language").each(function() {
											  if($(this).attr('id') == "frans")
											  {
												  link_4 = $(this).text();
											  }
										  });
										  break;
										  
					  case "en": $(this).find("language").each(function() {
											  if($(this).attr('id') == "engels")
											  {
												  link_4 = $(this).text();
											  }
										  });
										  break;
				  }
				break;
				case 'praktisch':
				  switch(selectedLanguage)
				  {
					  case "nl": $(this).find("language").each(function() {
											  if($(this).attr('id') == "nederlands")
											  {
												  link_5 = $(this).text();
											  }
										  });
										  break;
										  
					  case "fr": $(this).find("language").each(function() {
											  if($(this).attr('id') == "frans")
											  {
												  link_5 = $(this).text();
											  }
										  });
										  break;
										  
					  case "en": $(this).find("language").each(function() {
											  if($(this).attr('id') == "engels")
											  {
												  link_5 = $(this).text();
											  }
										  });
										  break;
				  }
				break;
			}
        });
		$(".link_home").each(function() { $(this).html(link_1);});
		$(".link_foto").each(function() { $(this).html(link_2);});
		$(".link_gebouw").each(function() { $(this).html(link_3);});
		$(".link_nieuws").each(function() { $(this).html(link_4);});
		$(".link_praktisch").each(function() { $(this).html(link_5);});
}

function parseHome(data){
		var taal;
		var news;
		var title_news;
		var title_media;
		var descr_title;
		var descr;
		var wat;
		var wat_title;
		var media;
		var media_title;
		var praktisch;
		var praktisch_title;
		$(data).find('pages').find('page').each(function() {
            if($(this).attr('id') == 'beschrijving')
			{
				switch(selectedLanguage)
				{
					case "nl": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "nederlands")
											{
												taal = $(this).find('taal').text();
												descr = $(this).find('description').text();
												news = $(this).find('news').text();
												descr_title = $(this).find('title').text();
												title_news = $(this).find('title2').text();
												title_media = $(this).find('title3').text();
												wat = $(this).find('intro').find('wat').find('content').text();
												wat_title = $(this).find('intro').find('wat').find('title').text();
												media = $(this).find('intro').find('inBeeld').find('content').text();
												media_title = $(this).find('intro').find('inBeeld').find('title').text();
												praktisch = $(this).find('intro').find('praktisch').find('content').text();
												praktisch_title = $(this).find('intro').find('praktisch').find('title').text();
											}
                    					});
										break;
										
					case "fr": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "frans")
											{
												taal = $(this).find('taal').text();
												descr = $(this).find('description').text();
												news = $(this).find('news').text();
												descr_title = $(this).find('title').text();
												title_news = $(this).find('title2').text();
												title_media = $(this).find('title3').text();
												wat = $(this).find('intro').find('wat').find('content').text();
												wat_title = $(this).find('intro').find('wat').find('title').text();
												media = $(this).find('intro').find('inBeeld').find('content').text();
												media_title = $(this).find('intro').find('inBeeld').find('title').text();
												praktisch = $(this).find('intro').find('praktisch').find('content').text();
												praktisch_title = $(this).find('intro').find('praktisch').find('title').text();
											}
                    					});
										break;
										
					case "en": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "engels")
											{
												taal = $(this).find('taal').text();
												descr = $(this).find('description').text();
												news = $(this).find('news').text();
												descr_title = $(this).find('title').text();
												title_news = $(this).find('title2').text();
												title_media = $(this).find('title3').text();
												wat = $(this).find('intro').find('wat').find('content').text();
												wat_title = $(this).find('intro').find('wat').find('title').text();
												media = $(this).find('intro').find('inBeeld').find('content').text();
												media_title = $(this).find('intro').find('inBeeld').find('title').text();
												praktisch = $(this).find('intro').find('praktisch').find('content').text();
												praktisch_title = $(this).find('intro').find('praktisch').find('title').text();
											}
                    					});
										break;
				}
			}
        });
        $("#lang").html(taal);
		$("#intro h1").html(descr_title);
		$("#col-text-intro").html(descr);
		$("#titleNews").html(title_news);
		$("#titleMedia").html(title_media);
		$("#news").html(news);
		$("#intro_wat_title").html(wat_title);
		$("#intro_wat_text").html(wat);
		$("#intro_beeld_title").html(media_title);
		$("#intro_beeld_text").html(media);
		$("#intro_praktisch_title").html(praktisch_title);
		$("#intro_praktisch_text").html(praktisch);
}

function parseFoto(){
	
	switch(selectedLanguage)
	{
		case "nl":		
					$("#titleMedia").html("Foto's");
					$("#movie").html("Interview");
							break;
							
		case "fr": 
					$("#titleMedia").html("Photos");
					$("#movie").html("Interview");
							break;
							
		case "en":
					$("#titleMedia").html("Pictures");
					$("#movie").html("Interview");	
							break;
	}
	
		
}

function parseNieuws(data){
	var content;
	var title;
	$(data).find('pages').find('page').each(function() {
	    if($(this).attr('id') == 'nieuws')
		{
			switch(selectedLanguage)
			{
				case "nl": $(this).find("language").each(function() {
	                					if($(this).attr('id') == "nederlands")
										{
											content = $(this).find('content').text();
											title = $(this).find('title').text();
										}
	            					});
									break;
									
				case "fr": $(this).find("language").each(function() {
	                					if($(this).attr('id') == "frans")
										{
											content = $(this).find('content').text();
											title = $(this).find('title').text();
										}
	            					});
									break;
									
				case "en": $(this).find("language").each(function() {
	                					if($(this).attr('id') == "engels")
										{
											content = $(this).find('content').text();
											title = $(this).find('title').text();
										}
	            					});
									break;
			}
		}
	});
	$("#title").html(title);
	$("#new-content").html(content);
	
		
}

function parseContact(data){
	var content;
	$(data).find('pages').find('page').each(function() {
	    if($(this).attr('id') == 'contact')
		{
			switch(selectedLanguage)
			{
				case "nl": $(this).find("language").each(function() {
	                					if($(this).attr('id') == "nederlands")
										{
											content = $(this).find('content').text();
										}
	            					});
									break;
									
				case "fr": $(this).find("language").each(function() {
	                					if($(this).attr('id') == "frans")
										{
											content = $(this).find('content').text();
										}
	            					});
									break;
									
				case "en": $(this).find("language").each(function() {
	                					if($(this).attr('id') == "engels")
										{
											content = $(this).find('content').text();
										}
	            					});
									break;
			}
		}
	});
	$("#formPlace").html(content);
	
	
		
}

//function parseHistoriek(data){
//		var descr;
//		var content;
//		var descr_title
//		var
//		$(data).find('pages').find('page').each(function() {
//            if($(this).attr('id') == 'historiek')
//			{
//				switch(selectedLanguage)
//				{
//					case "nl": $(this).find("language").each(function() {
//                        					if($(this).attr('id') == "nederlands")
//											{
//												descr = $(this).find('description').text();
//												content = $(this).find('content').text();
//												descr_title = $(this).find('title').text();
//											}
//                    					});
//										break;
//										
//					case "fr": $(this).find("language").each(function() {
//                        					if($(this).attr('id') == "frans")
//											{
//												descr = $(this).find('description').text();
//												content = $(this).find('content').text();
//												descr_title = $(this).find('title').text();
//											}
//                    					});
//										break;
//										
//					case "en": $(this).find("language").each(function() {
//                        					if($(this).attr('id') == "engels")
//											{
//												descr = $(this).find('description').text();
//												content = $(this).find('content').text();
//												descr_title = $(this).find('title').text();
//											}
//                    					});
//										break;
//				}
//			}
//        });
//		$("#beschrijving").html(descr);
//		$("#title").html(descr_title);
//		$("#content").html(content);
//		
//}

function parsePraktisch(data){
	var descr;
	var content;
	var title1;
	var title2;
	var title3;

		$(data).find('pages').find('page').each(function() {
            if($(this).attr('id') == 'praktisch')
			{
				switch(selectedLanguage)
				{
					case "nl": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "nederlands")
											{
												descr = $(this).find('description').text();
												content = $(this).find('content').text();
												title1 = $(this).find('title1').text();
												title2 = $(this).find('title2').text();
												title3 = $(this).find('title3').text();
											}
                    					});
										break;
										
					case "fr": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "frans")
											{
												descr = $(this).find('description').text();
												content = $(this).find('content').text();
												title1 = $(this).find('title1').text();
												title2 = $(this).find('title2').text();
												title3 = $(this).find('title3').text();
											}
                    					});
										break;
										
					case "en": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "engels")
											{
												descr = $(this).find('description').text();
												content = $(this).find('content').text();
												title1 = $(this).find('title1').text();
												title2 = $(this).find('title2').text();
												title3 = $(this).find('title3').text();
											}
                    					});
										break;
				}
			}
        });
		$("#beschrijving").html(descr);
		$("#title").html(title1);
		$("#title2").html(title2);
		$("#title3").html(title3);
		$("#content").html(content);
}

function parseGebouw(data){
	var descr;
	var content_gebouw;
	var content_1;
	var content_2;
	var content_3;
	var descr_title;
	var title;
		$(data).find('pages').find('page').each(function() {
            if($(this).attr('id') == 'gebouw')
			{
				switch(selectedLanguage)
				{
					case "nl": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "nederlands")
											{
												descr = $(this).find('description').text();
												parseContentGebouw($(this).find('content'));
												descr_title = $(this).find('title').text();
												title = $(this).find('titleHead').text();
											}
                    					});
										break;
										
					case "fr": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "frans")
											{
												descr = $(this).find('description').text();
												parseContentGebouw($(this).find('content'));
												descr_title = $(this).find('title').text();
												title = $(this).find('titleHead').text();
											}
                    					});
										break;
										
					case "en": $(this).find("language").each(function() {
                        					if($(this).attr('id') == "engels")
											{
												descr = $(this).find('description').text();
												parseContentGebouw($(this).find('content'));
												descr_title = $(this).find('title').text();
												title = $(this).find('titleHead').text();
											}
                    					});
										break;
				}
			}
        });
		$("#beschrijving").html(descr);
		$("#title").html(title);
}

function parseContentGebouw(data)
{
	var gebouw;
	var history1;
	var history2;
	var history3;
	var title_gebouw;
	var title_history1;
	var title_history2;
	var title_history3;
	
	
	gebouw = $(data).find('gebouw').text();
	$(data).find('historiek').each(function(){
		switch($(this).attr('id')){
			case '1': history1 = $(this).text();
			break;
			case '2': history2 = $(this).text();
			break;
			case '3': history3 = $(this).text();
			break;
		}
	})
	$(data).find('titel').each(function(){
		switch($(this).attr('id')){
			case 'gebouw': title_gebouw = $(this).text();
			break;
			case 'history1': title_history1 = $(this).text();
			break;
			case 'history2': title_history2 = $(this).text();
			break;
			case 'history3': title_history3 = $(this).text();
			break;
		}
	})
	
	$("#content").html(gebouw);
	$("#geschiedenis").html(history1);
	$("#geschiedenis2").html(history2);
	$("#geschiedenis3").html(history3);
	$("#titelGebouw").html(title_gebouw);
	$("#titelhis1").html(title_history1);
	$("#titelhis2").html(title_history2);
	$("#titelhis3").html(title_history3);
	
}

//DOCUMENT READY
$(document).ready(function(){

		$.support.cors = true;
		/* SET THE LANGUAGE AFTER PAGE LOAD OR REFRESH */
		if(Modernizr.localstorage)
		{
			setLanguage(getLanguageFromStorage());
		}
		else{
			setLanguageCookies(getLanguageFromStorage());	
		}
		
		
		$('a[rel="external"]').click(function(){
	        window.open($(this).attr('href'));
	        return false;
		});
});
	
	
	