  var var_map;
function init_map() {
  var var_location = new google.maps.LatLng(41.0275, 28.7813);

  var var_mapoptions = {
    center: var_location,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
 // [ { "featureType": "landscape", "stylers": [ { "lightness": 100 }, { "visibility": "on" } ] },{ "featureType": "poi", "stylers": [ { "saturation": -100 }, { "lightness": 50 } ] },{ "featureType": "road", "stylers": [ { "saturation": -100 }, { "lightness": 49 } ] },{ "featureType": "transit", "stylers": [ { "saturation": -100 }, { "lightness": 51 } ] } ]
};

  var_map = new google.maps.Map(document.getElementById("map-container"),
    var_mapoptions);
  //set_gmap_inputs();

}
function slide_map(dummy1, dummy2, dummy3){
	var_map.panTo(new google.maps.LatLng(dummy1, dummy2));
	var_map.setZoom(parseFloat(dummy3));
	//set_gmap_inputs();
}
/*function set_gmap_inputs(){
	var cent = var_map.getCenter();
	var clat = cent.lat();
	var clng = cent.lng();
	document.getElementById("in_lat" ).value = clat.toFixed(5);
	document.getElementById("in_lon" ).value = clng.toFixed(5);
	document.getElementById("in_zoom").value = var_map.getZoom();
	//console.log(cent.lat(), cent.lng(), var_map.getZoom());
}*/
google.maps.event.addDomListener(window, 'load', init_map);
