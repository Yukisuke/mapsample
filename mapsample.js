var map;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();

function initialize() {
/*window.onload = function() {*/
    if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    var myOption = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById('map'), myOption);
	    var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: 'Current location'
	    });
	    
	    directionsRenderer.setMap(map);
	    document.getElementById('message').innerHTML ='You are at ' + position.coords.latitude + ', ' 
		+ position.coords.longitude + ' now';
	}, function(e) {
	    document.getElementById('message').innerHTML = typeof e == 'string' ? e : e.message;
	});
    } else {
	document.getElementById('message').innerHTML = 'Location API is not supported.';
    }
}

function calcRoute() {
    navigator.geolocation.watchPosition(function(position) {
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	/*var end = "San Francisco, CA";*/
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
