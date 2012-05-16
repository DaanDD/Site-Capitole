// User's location and location of the CAPITOLE 
// WRITTEN BY STEFAAN CHRISTIAENS
//LAST MODIFIED DATE 27/03/12
//*************************************************
var Googlemap;
var capitolMarker;
var currentMarker;

var locationCurrent;

var locationCapitole = new google.maps.LatLng(51.047974,3.732148);

var locationCenter;

var directionDisplay;
var directionsService = new google.maps.DirectionsService();

var routeDisplay = false;

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
			title:"De Capitole"
		});
		google.maps.event.addListener(capitolMarker, 'click', function() {
				displayRoute();
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
			title:"Uw Positie"
		});
		currentMarker.setAnimation(google.maps.Animation.DROP);
		google.maps.event.addListener(currentMarker, 'click', function() {
				Googlemap.panTo(locationCurrent);
			});
		
	}
	
//	$("#markers").append('<a onclick=showMarker("current")>' + currentMarker.getTitle() + '</a><br />');
//	$("#markers").append('<a onclick=showMarker("capitole")>' + capitolMarker.getTitle() + '</a><br />');
//	$("#markers").append('<a onclick=displayRoute()>Wegbeschrijving naar het Capitol</a>');
//	
	
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
	if(!routeDisplay)
	{
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(Googlemap);
    var request = {
      origin:locationCurrent, 
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

//DOCUMENT READY
$(document).ready(function(){
	display();
	getGeolocation();
	
	});
	