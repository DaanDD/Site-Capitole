// User's location and location of the CAPITOLE 
// WRITTEN BY STEFAAN CHRISTIAENS
//LAST MODIFIED DATE 19/06/12
//*************************************************
var Googlemap;
var capitolMarker;
var currentMarker;

var locationCurrent;

var locationCapitole = new google.maps.LatLng(51.047974,3.732148);

var locationCenter;

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var routeDisplay = true;

var positionName = ["Huidige locatie","Current location","Localisation actuelle"];
var posName;
var capNameArray = ["Het Capitole","The Capitole","Le Capitole"];
var capName;

var parkArray = [new google.maps.LatLng(51.047551,3.730076),new google.maps.LatLng(51.050414,3.723558),new google.maps.LatLng(51.050945,3.722606),0,0,0];


function display(){
		 var myOptions = {
	    	zoom: 13,
	    	center: locationCapitole,
	   	 	mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			zoomControl: true,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	  	}
		Googlemap = new google.maps.Map(document.getElementById("map"), myOptions);	
		
		capitolMarker = new google.maps.Marker({
			position: locationCapitole, 
			map: Googlemap, 
			title:capName
		});
		
		google.maps.event.addListener(capitolMarker, 'click', function() {
				Googlemap.panTo(locationCapitole);
			});
	
}

//GET LOCATION OF USER THROUGH WIFI OR 3G
//FALLBACK FROM HTML5 GEOLOCATION GOOGLE AJAX API THROUGH MAXMIND'S GEOLOCATION API
function getGeolocation(){
		if(Modernizr.geolocation)
		{
			console.log('geolocation works');
			navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError);
		}
		else
		{
			
			var geocoder = new google.maps.Geocoder()
			if(google.loader.ClientLocation != null)
			{
				locationCurrent = new google.maps.LatLng(google.loader.ClientLocation.latitude,google.loader.ClientLocation.longitude);
				displayMap();	
			}
			else{
				locationCurrent = new google.maps.LatLng(geoip_latitude(),geoip_longitude());
				displayMap();
			}

		}
}

function geoLocationSuccess(position){
	locationCurrent = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	displayMap();
	displayRoute();
}

function geoLocationError(err){
	locationCurrent = locationCapitole;
	displayMap();
}

//DISPLAY GOOGLE MAP
function displayMap(){
	
	var distance = getDistanceToCapitole();
	var zoomin;
	if(distance < 40){
		if(distance < 20)
		{
			if(distance < 10)
			{
				if(distance < 5)
				{
					zoomin = 14;
				}
				else{
					zoomin = 13;
				}
			}
			else{
				zoomin = 12;
			}
		}
		else{
			zoomin = 11;
		}
	}
	else{
		zoomin = 8;
	}
	
	getCenter();
	console.log(locationCenter);
	Googlemap.panTo(locationCenter);
	Googlemap.setZoom(zoomin);
	
	

	if(locationCurrent != locationCapitole)
	{
		currentMarker = new google.maps.Marker({
			position: locationCurrent, 
			map: Googlemap, 
			title:posName
		});
		currentMarker.setAnimation(google.maps.Animation.DROP);
		google.maps.event.addListener(currentMarker, 'click', function() {
				Googlemap.panTo(locationCurrent);
			});
		
	}
		
}

//function showMarker(marker){
//			switch(marker){
//				case 'capitole': Googlemap.panTo(locationCapitole);
//								if(!routeDisplay)
//								{$("#markers").append("<br />Distance to Capitole is: "+ getDistanceToCapitole() + "km.");
//								displayRoute();
//								routeDisplay = true;}
//					break;
//				case 'current': Googlemap.panTo(locationCurrent);
//					break;
//			}
//}

function displayRoute(){
	if(routeDisplay)
	{
	
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(Googlemap);
	directionsDisplay.setOptions( { suppressMarkers: true } );
    var request = {
      origin: locationCurrent, 
      destination:locationCapitole,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var myRoute = response.routes[0];
        var htmlContent = '';
        for (var i=0; i<myRoute.legs[0].steps.length; i++) {
          htmlContent += myRoute.legs[0].steps[i].instructions+"<br />";
        }
        //document.getElementById('directions').innerHTML = htmlContent;
      }
    });
	}
}
//
//CALCULATE THE DISTANCE BETWEEN YOU AND AND THE CAPITOLE
function getDistanceToCapitole(){
	var R = 6371; // km
	var dLat = (locationCapitole.lat()-locationCurrent.lat())*(Math.PI/180);
	var dLon = (locationCapitole.lng()-locationCurrent.lng())*(Math.PI/180);
	var lat1 = locationCapitole.lat()*(Math.PI/180);
	var lat2 = locationCurrent.lat()*(Math.PI/180);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	d = Math.round(d*100)/100;
	return d;
}

//CALCULATE THE LOCATION OF THE CENTER BETWEEN THE CURRENT POSITION AND THE POSITION OF THE CAPITOLE
function getCenter()
{
	var center_lat = (locationCapitole.lat()+locationCurrent.lat())/2;
	var center_lng = (locationCapitole.lng()+locationCurrent.lng())/2;
	
	locationCenter = new google.maps.LatLng(center_lat,center_lng);
}

function checkLanguage(){
	var language = window.selectedLanguage;
	
		switch(language){
		case 'nl': 	posName = positionName[0];
					capName = capNameArray[0];
					break;
		case 'en': 	posName = positionName[1];
					capName = capNameArray[1];
					break;
		case 'fr': 	posName = positionName[2];
					capName = capNameArray[2];
					break;
	}
}



//DOCUMENT READY
$(document).ready(function(){
	checkLanguage();
	display();
	getGeolocation();
	
	$("#footer a").click(function()
	{
		checkLanguage();
		if(currentMarker)
		{
			currentMarker.setTitle(posName);
		}
		
		capitolMarker.setTitle(capName);
		
	});
	
		
});
function getLocation(parking) {	
	
	
	var parkLoc;
	var parking = $(parking).attr('class');
	parking = (parking.split(" "))[1];
	parking = capitaliseFirstLetter(parking); 
	switch(parking)
	{
		case "Woodrow":   parkLoc = parkArray[0];
						  break;
		case "Kouter":    parkLoc = parkArray[1];
						  break;
		case "Kortemeer": parkLoc = parkArray[2];
						  break;
	}
	
	
	
	/***** TODO  *****/
	//CHECK IF MARKER IS ALREADY ON MAP BY TITLE??
	//THEN IF OR NOT TOGGLE HIDE/SHOW
	/***** END TODO *****/
	
	
	var image = new google.maps.MarkerImage(
	  'content/images/markerInterparking.png',
	  new google.maps.Size(30,30),
	  new google.maps.Point(0,0),
	  new google.maps.Point(15,30)
	);
	
	var shape = {
	  coord: [18,3,20,4,21,5,22,6,23,7,24,8,24,9,25,10,25,11,25,12,26,13,26,14,26,15,26,16,25,17,25,18,25,19,24,20,24,21,23,22,22,23,22,24,22,25,22,26,17,27,16,28,16,29,13,29,12,28,11,27,7,26,7,25,7,24,6,23,5,22,4,21,4,20,3,19,3,18,3,17,3,16,3,15,3,14,3,13,3,12,3,11,3,10,4,9,4,8,5,7,6,6,7,5,9,4,11,3,18,3],
	  type: 'poly'
	};	
	
	var parkingMarker = new google.maps.Marker({
	  icon: image,
	  shape: shape,
	  map: Googlemap,
	  position: parkLoc,
	  title: parking
	});
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

	