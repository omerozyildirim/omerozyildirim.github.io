var x_coord = 0;
var y_coord = -500;
var width   = 20320;
var height  = 15037;
var i, x, y, w, h, dx, dy, dw, dh, x0, y0, xmin, ymin, xmax, ymax, distname, gx, gy, gz, newtarget, oldtarget;

function set_svg_size(){
	document.getElementById("vectormap").setAttribute("width", document.getElementById("svg_layer").clientWidth);
	document.getElementById("vectormap").setAttribute("height", document.getElementById("svg_layer").clientHeight);
}
function init(){
	set_svg_size();
	document.getElementById("svg_layer").style.visibility = "visible";
	add_districts();
	init_svg_map();
	x_coord = x;
	y_coord = y;
	width = w;
	height = h;
	oldtarget = x.toString() + "," + y.toString() + "," + w.toString() + "," + h.toString();
	document.getElementById("vectormap").setAttribute("viewBox", x_coord.toString() + " " + y_coord.toString() + " " + width.toString() + " " + height.toString());
	//set_svg_inputs();
}
function init_svg_map(){
	select_district("kucukcekmece");
}
function reset(){
	init_svg_map();
	dx = (x - x_coord) / steps;
	dy = (y - y_coord) / steps;
	dw = (w - width) / steps;
	dh = (h - height) / steps;
	startAnimation();
}
function select_district(dummy){
	for (i = 0; i < dists.length; i++){
		if (dummy == dists[i][0]){
			x = dists[i][3];
			y = dists[i][4];
			w = dists[i][5];
			h = dists[i][6];
			gx = dists[i][7];
			gy = dists[i][8];
			gz = dists[i][9];
			distname = dists[i][1];
			break;
		}
	}
	document.getElementById("distname").innerHTML = "Mahalle: " + distname;
	//document.getElementById("distcoords").innerHTML = "(TopLeft)(Center)(BottomRight) : (" + x.toString() + "," + y.toString() + ")(" + x0.toString() + "," + y0.toString() + ")(" + xmax.toString() + "," + ymax.toString() + ")";
	//slide_svg(x, y, w, h);
	//oldtarget = newtarget;
	//newtarget = x.toString() + "," + y.toString() + "," + w.toString() + "," + h.toString();
	slide_map(gx, gy, gz);
}
function colorize(){
	var j;
	var red;
	var green;
	var blue;
	var colorstr;
	var pathlist = document.getElementById("vectormap").getElementsByTagName("path");
	for(j = 0; j < pathlist.length; j++){
		red   = parseInt(Math.random() * 255);
		green = parseInt(Math.random() * 255);
		blue  = parseInt(Math.random() * 255);
		colorstr = "rgb(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ")"
		console.log(red, green, blue, colorstr);
		pathlist[j].setAttribute("fill", colorstr);
	}
}
function clear_colors(){
	for (i = 0; i < dists.length; i++){
		document.getElementById("vectormap").getElementById(dists[i][0]).setAttribute("fill", dists[i][2]);
	}
}
function svg2gmap(dummy1, dummy2){
	var lat, lon;
	lon = 0;
}
/*

function get_district_name(dummy){
	for (i = 0; i < dists.length; i++){
		if (dummy == dists[i][0]){
			distname = dists[i][1];
			break;
		}
	}
	return distname;
}
function hilite_dist(dummy){
document.getElementById("kucukcekmece").getElementById("outline").setAttribute("d", document.getElementById("kucukcekmece").getElementById(dummy).getAttribute("d"));
document.getElementById("kucukcekmece").getElementById("vboxslide").setAttribute("from", oldtarget);
document.getElementById("kucukcekmece").getElementById("vboxslide").setAttribute("to", newtarget);
}
function slide_svg(dummy1, dummy2, dummy3, dummy4){
	dx = (dummy1 - x_coord) / steps;
	dy = (dummy2 - y_coord) / steps;
	dw = (dummy3 - width) / steps;
	dh = (dummy4 - height) / steps;
	x0 = dummy1 + dummy3 / 2.0;
	y0 = dummy2 + dummy4 / 2.0;
	xmax = dummy1 + dummy3;
	ymax = dummy2 + dummy4;
	startAnimation();
}
function startAnimation(){
	set_svg_size();
	i = 0;
	if(timerFunction == null) timerFunction = setInterval(animate, duration / steps);
}
function stopAnimation(){
	if(timerFunction != null){
		clearInterval(timerFunction);
		timerFunction = null;
	}
}
function animate(){
	x_coord += dx;
	y_coord += dy;
	width += dw;
	height += dh;
	i++;
	document.getElementById("kucukcekmece").setAttribute("viewBox", x_coord.toString() + " " + y_coord.toString() + " " + width.toString() + " " + height.toString());
	//set_svg_inputs();
	if (i == steps){
		stopAnimation();
	}
}
function trackcoords(dummy){
	var msg = "";
	var vbox = document.getElementById("kucukcekmece").getAttribute("viewBox");
	var vboxarr = vbox.split(" ");
	var mousex = parseInt(dummy.offsetX * parseFloat(vboxarr[2]) / document.getElementById("svg_layer").clientWidth + parseFloat(vboxarr[0]));
	var mousey = parseInt(dummy.offsetY * parseFloat(vboxarr[3]) / document.getElementById("svg_layer").clientHeight + parseFloat(vboxarr[1]));
	msg += "Event: " + dummy + " | ";
	msg += "Page coordinates: (" + dummy.offsetX.toString() + "," + dummy.offsetY.toString() + ") | "
	msg += "SVG coordinates: (" + mousex.toString() + "," + mousey.toString() + ")";
	document.getElementById("statusmsg").innerHTML = msg;
}
function clrmsg(){
	document.getElementById("statusmsg").innerHTML = " ";
}
function select_district_old(dummy){
	var dist_path = document.getElementById("kucukcekmece").getElementById(dummy);
	//console.log("select_district", dummy);
	//var dist_path = document.getElementById(dummy);
	//console.log("selected", dist_path);
	var bbox = dist_path.getBBox();
	x = bbox.x;
	y = bbox.y;
	w = bbox.width;
	h = bbox.height;
	//google map coords: 41.0206842005289, 28.746063760156474, 12
	//our coords: 5362.5, 7173
	document.getElementById("distname").innerHTML = "Mahalle: " + get_district_name(dummy);
	document.getElementById("distcoords").innerHTML = "(TopLeft)(Center)(BottomRight) : (" + x.toString() + "," + y.toString() + ")(" + x0.toString() + "," + y0.toString() + ")(" + xmax.toString() + "," + ymax.toString() + ")";
	slide_svg(x, y, w, h);
}
function set_svg_inputs(){
	var vbox = document.getElementById("kucukcekmece").getAttribute("viewBox");
	var vboxarr = vbox.split(" ");
	document.getElementById("in_svgx").value = parseInt(vboxarr[0]);
	document.getElementById("in_svgy").value = parseInt(vboxarr[1]);
	document.getElementById("in_svgw").value = parseInt(vboxarr[2]);
	document.getElementById("in_svgh").value = parseInt(vboxarr[3]);
}
function log2con(){
	console.log(distname + "," + document.getElementById("in_svgx").value + "," + document.getElementById("in_svgy").value + "," + document.getElementById("in_svgw").value + "," + document.getElementById("in_svgh").value + "," + document.getElementById("in_lat").value + "," + document.getElementById("in_lon").value + "," + document.getElementById("in_zoom").value);
}
function init_svg_map_old(){
	var pathlist = document.getElementById("kucukcekmece").getElementsByTagName("path");
	var bbox = pathlist[0].getBBox();
	var j, temp;
	xmin = bbox.x;
	ymin = bbox.y;
	xmax = bbox.x + bbox.width;
	ymax = bbox.y + bbox.height;
	for(j = 1; j < pathlist.length; j++){
		bbox = pathlist[j].getBBox();
		temp = bbox.x; if (temp < xmin) xmin = temp;
		temp = bbox.y; if (temp < ymin) ymin = temp;
		temp = bbox.x + bbox.width; if (temp > xmax) xmax = temp;
		temp = bbox.y + bbox.height; if (temp > ymax) ymax = temp;
	}
	x = xmin;
	y = ymin;
	w = xmax - xmin;
	h = ymax - ymin;
	x0 = x + w / 2.0;
	y0 = y + h / 2.0;
	distname = "Küçükçekmece";
	document.getElementById("distname").innerHTML = distname;
	document.getElementById("distcoords").innerHTML = "(TopLeft)(Center)(BottomRight) : (" + xmin.toString() + "," + ymin.toString() + ")(" + x0.toString() + "," + y0.toString() + ")(" + xmax.toString() + "," + ymax.toString() + ")";
}
function lolite_dist(dummy){
	if (dummy != "kucukcekmece"){
		document.getElementById("kucukcekmece").getElementById("outline").setAttribute("d", "");
	}
}
*/
