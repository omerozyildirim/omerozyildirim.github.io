function init_map() {
  var var_location = new google.maps.LatLng(41.0275, 28.7813);

  var var_mapoptions = {
    center: var_location,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };

  var var_map = new google.maps.Map(document.getElementById("map-container"),
    var_mapoptions);

}

google.maps.event.addDomListener(window, 'load', init_map);
