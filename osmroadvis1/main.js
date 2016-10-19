var points = [], xcoefs = [], ycoefs = [], roadstruc = [], map, polyline = null;
var polylineOptions = {color: 'red', weight: 3, opacity: 1};
function add_point(dummy1, dummy2){
	points.push({x: dummy1, y: dummy2});
}
function calc_coefs(dummy){
	xcoefs = []; ycoefs = [];
	var dummy1 = {}, dummy2 = {}, i;
	for(i = 1; i < dummy.length - 2; ++i){
		dummy1 = calc_coef((i-1), dummy[i-1].x, i, dummy[i].x, (i+1), dummy[i+1].x, (i+2), dummy[i+2].x);
		dummy2 = calc_coef((i-1), dummy[i-1].y, i, dummy[i].y, (i+1), dummy[i+1].y, (i+2), dummy[i+2].y);
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
	return {x: dummy1, y: dummy2};
}
function clear_all(){
	points = [];
	xcoefs = [];
	ycoefs = [];
}
function importfile(dummy){
	var text, reader = new FileReader();
	reader.onload = function(){
		// Asyncronious(!)
		roadstruc = parsexml(reader.result); // Unfortunately I could not get rid of this global variable as we have no way of passing it as an argument while calling the function from the GUI i.e. HTML file.
		fillselect(document.getElementById("roadsel"), roadstruc);
	};
	reader.readAsText(dummy.files[0]);
}
function parsexml(dummy){
	var xmlnodes, tempnodes, temproad, i, j, k, result = [];
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(dummy, "text/xml");
	var roads = xmlDoc.getElementsByTagName("way");
	var nodes = xmlDoc.getElementsByTagName("node");
	for (i = 0; i < roads.length; i++){
		temproad = {}; tempnodes = [];
		temproad.id = roads[i].getAttribute("id");
		xmlnodes = roads[i].getElementsByTagName("nd");
		for (j = 0; j < xmlnodes.length; j++)
			for (k = 0; k < nodes.length; k++)
				if (xmlnodes[j].getAttribute("ref") == nodes[k].getAttribute("id"))
					tempnodes.push({lat: parseFloat(nodes[k].getAttribute("lat")), lon: parseFloat(nodes[k].getAttribute("lon"))});
				temproad.nodes = tempnodes;
			result.push(temproad);
	}
	return result;
}
function fillselect(dummy1, dummy2){
	var i, opt;
	for (i = 0; i < dummy2.length; i++){
		if (dummy2[i].nodes.length >= 4){
			opt =  document.createElement("option");
			opt.text = dummy2[i].id;
			dummy1.add(opt);
		}
	}
}
function displayroad(dummy1){
	clear_all();
	if (polyline != null) polyline.remove();
	var j, result = "", polylinePoints = [];
	for (j = 0; j < roadstruc[dummy1.selectedIndex].nodes.length; j++)
		add_point(roadstruc[dummy1.selectedIndex].nodes[j].lat, roadstruc[dummy1.selectedIndex].nodes[j].lon);
	polylinePoints = draw_curve(); // At this point xcoefs and ycoefs arrays are filled and valid.
	polyline = new L.Polyline(polylinePoints, polylineOptions);
	polyline.addTo(map);
	map.fitBounds(polyline.getBounds()); // zoom the map to the polyline
}
function draw_curve(){
	calc_coefs(points);
	var i, j, p, step = 1.0 / document.getElementById("precbox").value, result = [];
	result.push(new L.LatLng(points[0].x, points[0].y));
	if (document.getElementById("precbox").value == 1)
		for (i = 0; i < points.length - 1; i++)
			result.push(new L.LatLng(points[i].x, points[i].y));
	else
		for (i = 0; i < points.length - 1; i++)
			for (j = 0; j <= 1; j += step){
				p = evaluate(i + j);
				result.push(new L.LatLng(p.x, p.y));
			}
	result.push(new L.LatLng(points[points.length - 1].x, points[points.length - 1].y));
	return result;
}
function init(){
	var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
	map = L.map('map');
	var bingLayer = L.tileLayer.bing(BING_KEY).addTo(map);
}
/*function init(){
	map = new L.Map('map');
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18}).addTo(map);
		map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
}*/
/*function init(){
	map = new L.Map('map');
	L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
		//attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18}).addTo(map);
		map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
}*/
