var map;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer;
var infowindow;

function initialize() {
// Using callback function to get current location, because it is asynchronous programming.
    navigator.geolocation.getCurrentPosition(function(position){
	console.log('Your current position is: ');
	console.log('Lat: ' + position.coords.latitude);
	console.log('Long: ' + position.coords.longitude);
	console.log('More ore less: ' + position.coords.accuracy + 'meter');
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	if(latlng == null) {
	    latlng = new google.maps.LatLng(-33.8665433, 151.1956316);
	}
	var myOption = {
	    zoom: 15,
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map'), myOption);
	var marker = new google.maps.Marker({
	    position: latlng,
	    map: map,
	    title: 'Current location'
	});
	var request = {
	    location: latlng,
	    radius: 500,
	    types: ['store']
	};

	// Create an instance for direction service, and set map for it.
	directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);

	// Create an instance for info window, and create a new service with map.
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);

    }, function(error) {
	var message = "";
	switch(error.code){
	    case error.POSITION_UNAVAILABLE:
	    message = "Location unavailable!!!";
	    break;
	    case error.PERMISSION_DENIED:
	    message = "Not permitted to use location!!!";
	    break;
	    case error.PERMISSION_DENIED_TIMEOUT:
	    message = "Time out to get location!!!";
	    break;
	}
	window.alert(message);
    });
}
	
// Callback fuction to show bubbles on map in an iterative fashion.
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
	for(var i=0; i<results.length; i++) {
	    createMarker(results[i]);
	}
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
	map: map,
	position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function(){
	infowindow.setContent(place.name);
	infowindow.open(map, this);
    });
}

function calcRoute() {
// Using callback function to get current location, because it is asynchronous programming.
// To get current location, I use "getCurrentPosition" rather than "watchPosition".
    navigator.geolocation.getCurrentPosition(function(position) {
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	console.log('Your current position is: ');
	console.log('Lat: ' + position.coords.latitude);
	console.log('Long: ' + position.coords.longitude);
	console.log('More ore less: ' + position.coords.accuracy + 'meter');
	var end = document.getElementById('end').value;
	var request = {
	    origin: latlng,
	    destination: end, 
	    travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(result, status){
	    if(status == google.maps.DirectionsStatus.OK) {
		directionsRenderer.setDirections(result);
	    }
	});
    });
}

/*google.maps.event.addDomListener(window, 'load', initialize);*/

