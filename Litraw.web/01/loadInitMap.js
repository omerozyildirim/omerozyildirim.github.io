var map = new ol.Map({
    target: 'map-canvas', 
    randerer: 'canvas', 
    //layers: [ new ol.layer.Tile({
    //  source: new ol.source.OSM(),
   // })
  //],
    view: new ol.View({
    	projection: 'EPSG:4326',
	center : [ 28.7821, 41.0286 ], //3204420.4, 5017560.6 belediye building center
	//maxExtent: new ol.Extent[-20037508, -20037508, 20037508, 20037508.34],
	zoom : 13,
	minZoom: 3,
    maxZoom: 19
  }),
  controls: ol.control.defaults().extend([
                                          new ol.control.FullScreen()
                                        ])
});


var osmLayer = new ol.layer.Tile({source: new ol.source.OSM(),})
map.addLayer(osmLayer);



