  var var_map;
function init_map() {
  var var_location = new google.maps.LatLng(41.0275, 28.7813);

  var var_mapoptions = {
    center: var_location,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
};

var styleArray = [
	{
		"featureType": "landscape",
		"stylers": [
			{ "lightness": 100 },
			{ "visibility": "on" }
		]
	},
	{
		"featureType": "poi",
		"stylers": [
			{ "saturation": -100 },
			{ "lightness": 50 }
		]
	},
	{
		"featureType": "road",
		"stylers": [
			{ "saturation": -100 },
			{ "lightness": 50 }
		]
	},
	{
		"featureType": "transit",
		"stylers": [
			{ "saturation": -100 },
			{ "lightness": 50 }
		]
	}
];

  var_map = new google.maps.Map(document.getElementById("map-container"),
    var_mapoptions);
  var_map.setOptions({styles: styleArray});
  //set_gmap_inputs();

}
function slide_map(dummy1, dummy2, dummy3){
	var_map.panTo(new google.maps.LatLng(dummy1, dummy2));
	var_map.setZoom(parseFloat(dummy3));
}
google.maps.event.addDomListener(window, 'load', init_map);
