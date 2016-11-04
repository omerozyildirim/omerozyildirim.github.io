// Global variables
var points = [], xcoefs = [], ycoefs = [], roadstruc = [], map, polyline = null;
var polylineOptions = {color: 'red', weight: 3, opacity: 0.7};
// Curve related functions
function add_point(dummy1, dummy2){
	points.push({lat: dummy1, lng: dummy2});
}
function calc_coefs(dummy){
	xcoefs = []; ycoefs = [];
	var dummy1 = {}, dummy2 = {}, i;
	for(i = 1; i < dummy.length - 2; ++i){
		dummy1 = calc_coef((i - 1), dummy[i - 1].lat, i, dummy[i].lat, (i + 1), dummy[i + 1].lat, (i + 2), dummy[i + 2].lat);
		dummy2 = calc_coef((i - 1), dummy[i - 1].lng, i, dummy[i].lng, (i + 1), dummy[i + 1].lng, (i + 2), dummy[i + 2].lng);
		xcoefs.push(dummy1); ycoefs.push(dummy2);
		if (i == 1){// The same coefficients are valid on the first interval as well. So just add them once more.
			xcoefs.push(dummy1); ycoefs.push(dummy2);
		}
	}// The same coefficients are valid on the last two intervals as well. So just add them twice more.
	xcoefs.push(dummy1); ycoefs.push(dummy2);
	xcoefs.push(dummy1); ycoefs.push(dummy2);
}
function calc_coef(x_1,y_1,x0,y0,x1,y1,x2,y2){
	var dummy = {};
	dummy.d = (x_1*((Math.pow(x1,2)-Math.pow(x2,2))*y0+Math.pow(x2,2)*y1-Math.pow(x1,2)*y2+Math.pow(x0,2)*(y2-y1))+x0*(Math.pow(x1,2)*y2-Math.pow(x2,2)*y1)+Math.pow(x_1,2)*((x2-x1)*y0-x2*y1+x0*(y1-y2)+x1*y2)+Math.pow(x0,2)*(x2*y1-x1*y2)+(x1*Math.pow(x2,2)-Math.pow(x1,2)*x2)*y0+(Math.pow(x0,2)*(x1-x2)+Math.pow(x1,2)*x2-x1*Math.pow(x2,2)+x0*(Math.pow(x2,2)-Math.pow(x1,2)))*y_1)/(Math.pow(x0,3)*(x1*Math.pow(x2,2)-Math.pow(x1,2)*x2)+Math.pow(x_1,3)*(x0*(Math.pow(x2,2)-Math.pow(x1,2))-x1*Math.pow(x2,2)+Math.pow(x1,2)*x2+Math.pow(x0,2)*(x1-x2))+Math.pow(x0,2)*(Math.pow(x1,3)*x2-x1*Math.pow(x2,3))+Math.pow(x_1,2)*(x1*Math.pow(x2,3)+x0*(Math.pow(x1,3)-Math.pow(x2,3))+Math.pow(x0,3)*(x2-x1)-Math.pow(x1,3)*x2)+x0*(Math.pow(x1,2)*Math.pow(x2,3)-Math.pow(x1,3)*Math.pow(x2,2))+x_1*(Math.pow(x0,2)*(Math.pow(x2,3)-Math.pow(x1,3))-Math.pow(x1,2)*Math.pow(x2,3)+Math.pow(x1,3)*Math.pow(x2,2)+Math.pow(x0,3)*(Math.pow(x1,2)-Math.pow(x2,2))));
	dummy.c = -(x0*y1+x_1*(y0-y1)-x1*y0+(x1-x0)*y_1+dummy.d*(Math.pow(x_1,3)*(x0-x1)+Math.pow(x0,3)*x1-x0*Math.pow(x1,3)+x_1*(Math.pow(x1,3)-Math.pow(x0,3))))/(Math.pow(x_1,2)*(x0-x1)+Math.pow(x0,2)*x1-x0*Math.pow(x1,2)+x_1*(Math.pow(x1,2)-Math.pow(x0,2)));
	dummy.b = -(y0-y_1+dummy.d*(Math.pow(x_1,3)-Math.pow(x0,3))+dummy.c*(Math.pow(x_1,2)-Math.pow(x0,2)))/(x_1-x0);
	dummy.a = y_1-dummy.d*Math.pow(x_1,3)-dummy.c*Math.pow(x_1,2)-dummy.b*x_1;
	return dummy;
}
function evaluate(dummy){
	var dummy1, dummy2, i;
	if (dummy < 0) i = 0;
	else if (dummy > xcoefs.length) i = xcoefs.length - 1;
	else i = Math.floor(dummy);
	dummy1 = xcoefs[i].a + xcoefs[i].b * dummy + xcoefs[i].c * Math.pow(dummy, 2) + xcoefs[i].d * Math.pow(dummy, 3);
	dummy2 = ycoefs[i].a + ycoefs[i].b * dummy + ycoefs[i].c * Math.pow(dummy, 2) + ycoefs[i].d * Math.pow(dummy, 3);
	return {lat: dummy1, lng: dummy2};
}
function clear_all(){
	points = [];
	xcoefs = [];
	ycoefs = [];
}
function earth_radius(dummy){
	var f = 0.00335281066478; // 1.0 / 298.25722356
	return 6378137.0 * (1 - f * Math.pow(Math.sin(Math.atan(Math.pow(1 - f, 2) * Math.tan(dummy))), 2));
}
function calclinlen(dummy){
	var i, result = 0, a = 0.0174532925199;
	for (i = 0; i < dummy.length - 1; i++)
		result +=
			Math.sqrt(
				+ Math.pow(a * (dummy[i + 1].lat - dummy[i].lat), 2)
				+ Math.pow(a * (dummy[i + 1].lng - dummy[i].lng), 2)
				* Math.pow(Math.cos(a * (dummy[i + 1].lat + dummy[i].lat) / 2), 2)
			) * earth_radius((dummy[i + 1].lat + dummy[i].lat) / 2)
		;
	return result;
}
function calccurlen(dummy){ // Not implemented yet.
	var i, result = 0, a = 0.0174532925199, step = 1.0 / document.getElementById("precbox").value, p, p1;
	return result;
}
// File related functions
function importfile(dummy){
	var text, reader = new FileReader();
	reader.onload = function(){
		// Asyncronious(!)
		roadstruc = parsexml(reader.result); // Unfortunately I could not get rid of this global variable as we have no way of passing it as an argument while calling the function from the GUI i.e. HTML file.
		fillselect(document.getElementById("roadsel"), roadstruc);
			document.getElementById("status").value = "Waiting user interaction."
	};
	reader.readAsText(dummy.files[0]);
}
function acqosm(dummy2, dummy1){
	document.getElementById("zoomout").value = 14;
	setlatlng(
		document.getElementById("latout").value,
		document.getElementById("lngout").value,
		document.getElementById("zoomout").value
	);
	var dummy3 = dummy1 - 0.001, dummy4 = dummy2 - 0.001, dummy5 = dummy1 - 0 + 0.001, dummy6 = dummy2 - 0 + 0.001;
	var url = "http://overpass.osm.rambler.ru/cgi/xapi_meta?*[bbox=" + dummy3.toString() + "," + dummy4.toString() + "," + dummy5.toString() + "," + dummy6.toString() + "]";
	var x = new XMLHttpRequest();
	x.onreadystatechange = function (){
		if (x.readyState == 4 && x.status == 200){
			document.getElementById("infile").value = null;
			roadstruc = parsexml(x.responseText);
			fillselect(document.getElementById("roadsel"), roadstruc);
			document.getElementById("status").value = "Waiting user interaction."
		}
	};
	x.open("GET", url, true);
	document.getElementById("status").value = "Downloading data from server."
	x.send();
}
function parsexml(dummy){// This will return roadstruc
	document.getElementById("status").value = "Parsing XML data."
	var xmlnodes, tempnodes, temproad, i, j, k, result = [], tags, highway, name, gt4, outn, templat, templng, omitted = 0;
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(dummy, "text/xml");
	var roads = xmlDoc.getElementsByTagName("way");
	var nodes = xmlDoc.getElementsByTagName("node");
	for (i = 0; i < roads.length; i++){
		tags = roads[i].getElementsByTagName("tag");
		highway = false;
		name = "";
		for (j = 0; j < tags.length; j++){
			if (tags[j].getAttribute("k") == "highway")
				highway = true;
			if (tags[j].getAttribute("k") == "name")
				name = tags[j].getAttribute("v");
		}
		if (highway){
			temproad = {}; tempnodes = [];
			temproad.id = roads[i].getAttribute("id");
			temproad.name = name;
			xmlnodes = roads[i].getElementsByTagName("nd");
			outn = false;
			gt4 = false;
			if (xmlnodes.length >= 4){
				gt4 = true;
				for (j = 0; j < xmlnodes.length; j++)
					for (k = 0; k < nodes.length; k++)
						if (xmlnodes[j].getAttribute("ref") == nodes[k].getAttribute("id")){
							templat = parseFloat(nodes[k].getAttribute("lat"));
							templng = parseFloat(nodes[k].getAttribute("lon"));
							if ((templat == NaN) || (templng == NaN)) outn = true;
							else tempnodes.push({lat: templat, lon: templng});
							console.log(i, templat, templng, outn);
						}
			}
			else gt4 == false;
			if (gt4 && !outn){
				temproad.nodes = tempnodes;
				result.push(temproad);
			}
			else omitted++;
		}
	}
	document.getElementById("omitnum").value = omitted;
	return result;
}
function fillselect(dummy1, dummy2){ // roadstruc (dummy2) is feeded to the dropdown (dummy1) here
	document.getElementById("status").value = "Preparing the roads."
	document.getElementById("roadnum").value = dummy2.length;
	var i, opt;
	for (i = dummy1.length - 1; i > 0; i--) // First clearing the menu except the "Select"
	{console.log(i, dummy1[i].value);dummy1.remove(i);}
	for (i = 0; i < dummy2.length; i++){
		if (dummy2[i].nodes.length >= 4){
			opt = document.createElement("option");
			opt.text = dummy2[i].id + ", " + dummy2[i].name;
			dummy1.add(opt);
		}
	}
	document.getElementById("roadsel").disabled = false;
}
// Map related functions
function init(){
	document.getElementById("infile").value = null;
	var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
	map = L.map('map');
	var bingLayer = L.tileLayer.bing(BING_KEY).addTo(map);
	function onMapMove(){
		document.getElementById("acqbut").disabled = false;
		refcoords();
	}
	map.on('move', onMapMove);
	map.setView([0, 0], 1);
	//map.setMinZoom(3);
	//map.setMaxZoom(12);
	var southWest = L.latLng(-90, -180),
		northEast = L.latLng(90, 180),
		bounds = L.latLngBounds(southWest, northEast);
	map.setMaxBounds(bounds);
	refcoords();
}
function refcoords(){
	document.getElementById("latout").value = map.getCenter().lat;
	document.getElementById("lngout").value = map.getCenter().lng;
	document.getElementById("zoomout").value = map.getZoom();
}
function setlatlng(dummy1, dummy2, dummy3){
	map.setView([dummy1, dummy2], dummy3);
}
function displayroad(dummy1){
	clear_all();
	if (polyline != null) polyline.remove();
	var j, result = "", polylinePoints = [];
	for (j = 0; j < roadstruc[dummy1.selectedIndex - 1].nodes.length; j++)
		add_point(roadstruc[dummy1.selectedIndex - 1].nodes[j].lat, roadstruc[dummy1.selectedIndex - 1].nodes[j].lon);
	polylinePoints = draw_curve(); // At this point xcoefs and ycoefs arrays are filled and valid.
	polyline = new L.Polyline(polylinePoints, polylineOptions);
	polyline.addTo(map);
	map.fitBounds(polyline.getBounds()); // zoom the map to the polyline
	document.getElementById("linlen").value = calclinlen(points).toFixed(2);
	document.getElementById("curlen").value = calclinlen(polylinePoints).toFixed(2);
}
function draw_curve(){
	calc_coefs(points);
	document.getElementById("nodesnum").value = points.length;
	var i, j, p, step = 1.0 / document.getElementById("precbox").value, result = [];
	if (document.getElementById("precbox").value == 1)
		for (i = 0; i < points.length; i++)
			result.push(new L.LatLng(points[i].lat, points[i].lng));
	else{
		for (i = 0; i <= points.length - 1; i += step){
			p = evaluate(i);
			result.push(new L.LatLng(p.lat, p.lng));
		}
		result.push(new L.LatLng(points[points.length - 1].lat, points[points.length - 1].lng));
	}
	return result;
}
