async function initMap() {
	var points = await fetch('./points.json')
		.then(response => response.json())
		.then(json => json);

	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -25.817574, lng: 132.702789},
		zoom: 5
	});
	
	setMarkers(map, points);
}

var markersC = [];
function setMarkers(map, points) {
 var infowindow = new google.maps.InfoWindow();

	points.forEach((point, iPoint) => {
		var marker = new google.maps.Marker({
			position: {lat: parseFloat(point.latitude), lng: parseFloat(point.longitude)},
			map: map,
			title: point.state,
		});

		markersC.push(marker);
		var contentString = '<div class="marker-infowindow">' +
							'<h1>'+ point.state +'</h1>'+
							'<div><b>Type </b>'+ point.type +'</div>'+
							'<div><b>Status </b>'+ point.status +'</div>'+
							'<div><b>Address </b>'+ point.addr +'</div>'+
							'</div>'


		google.maps.event.addListener(marker, 'click', (function(marker, iPoint, contentString) {
			return function() {
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			}
		})(marker, iPoint, contentString));
	});
	
	var markerCluster = new MarkerClusterer(map, markersC,
	{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
