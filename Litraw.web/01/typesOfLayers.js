var layer_sinirlar = null;
var layer_ofisi = null;
var layer_asfaltkaplama2012 = null;
var layer_sporalanlari2010 = null;

var sinirlar = function(){
	if(!layer_sinirlar) {
		layer_sinirlar = new ol.layer.Image({
		                			source : new ol.source.ImageWMS({
		                				url : 'http://maps.itu.edu.tr:8081/geoserver/maps.itu.edu.tr/wms',
		                				params : {'LAYERS': 'maps.itu.edu.tr:kc_boundary'},
		                				serverType: 'geoserver'
		                			})
		               });
		map.addLayer(layer_sinirlar);
		layer_sinirlar.setVisible(true);
	} else {
		map.removeLayer(layer_sinirlar);
		layer_sinirlar = null;
	}
};

var ofisi = function(){
	if(!layer_ofisi) {
		layer_ofisi = new ol.layer.Image({
		                			source : new ol.source.ImageWMS({
		                				url : 'http://maps.itu.edu.tr:8081/geoserver/maps.itu.edu.tr/wms',
		                				params : {'LAYERS': 'maps.itu.edu.tr:kc_belediye_building'},
		                				serverType: 'geoserver'
		                			})
		               });
		map.addLayer(layer_ofisi);
		layer_ofisi.setVisible(true);
	} else {
		map.removeLayer(layer_ofisi);
		layer_ofisi = null;
	}
};

var asfaltkaplama2012 = function(){
	if(!layer_asfaltkaplama2012) {
		layer_asfaltkaplama2012 = new ol.layer.Image({
		                			source : new ol.source.ImageWMS({
		                				url : 'http://maps.itu.edu.tr:8081/geoserver/maps.itu.edu.tr/wms',
		                				params : {'LAYERS': 'maps.itu.edu.tr:kc_asfaltkaplama2012'},
		                				serverType: 'geoserver'
		                			})
		               });
		map.addLayer(layer_asfaltkaplama2012);
		layer_asfaltkaplama2012.setVisible(true);
	} else {
		map.removeLayer(layer_asfaltkaplama2012);
		layer_asfaltkaplama2012 = null;
	}
};

var sporalanlari2010 = function(){
	if(!layer_sporalanlari2010) {
		layer_sporalanlari2010 = new ol.layer.Image({
		                			source : new ol.source.ImageWMS({
		                				url : 'http://maps.itu.edu.tr:8081/geoserver/maps.itu.edu.tr/wms',
		                				params : {'LAYERS': 'maps.itu.edu.tr:kc_sporalanlari2010'},
		                				serverType: 'geoserver'
		                			})
		               });
		map.addLayer(layer_sporalanlari2010);
		layer_sporalanlari2010.setVisible(true);
	} else {
		map.removeLayer(layer_sporalanlari2010);
		layer_sporalanlari2010 = null;
	}
};

