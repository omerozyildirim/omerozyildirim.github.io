var x_coord = 0;
var y_coord = -500;
var width   = 20320;
var height  = 15037;
var steps = 10;
var duration = 400; // milliseconds
var timerFunction = null;
var i, x, y, w, h, dx, dy, dw, dh, x0, y0, xmin, ymin, xmax, ymax;

function trackcoords(dummy){
	var msg = "";
	var vbox = document.getElementById("svg_map").getAttribute("viewBox");
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

function set_svg_size(){
	document.getElementById("svg_map").setAttribute("width", document.getElementById("svg_layer").clientWidth);
	document.getElementById("svg_map").setAttribute("height", document.getElementById("svg_layer").clientHeight);
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
	document.getElementById("svg_map").setAttribute("viewBox", x_coord.toString() + " " + y_coord.toString() + " " + width.toString() + " " + height.toString());
}

function startAnimation() {
	set_svg_size();
	i = 0;
	if(timerFunction == null) timerFunction = setInterval(animate, duration / steps);
}

function stopAnimation() {
	if(timerFunction != null){
		clearInterval(timerFunction);
		timerFunction = null;
	}
}

function init_svg_map(){
	var pathlist = document.getElementById("svg_map").getElementsByTagName("path");
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
	document.getElementById("distname").innerHTML = "Küçükçekmece";
	document.getElementById("distcoords").innerHTML = "(TopLeft)(Center)(BottomRight) : (" + xmin.toString() + "," + ymin.toString() + ")(" + x0.toString() + "," + y0.toString() + ")(" + xmax.toString() + "," + ymax.toString() + ")";
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
	var dist_path = document.getElementById("svg_map").getElementById(dummy);
	var bbox = dist_path.getBBox();
	x = bbox.x;
	y = bbox.y;
	w = bbox.width;
	h = bbox.height;
	dx = (x - x_coord) / steps;
	dy = (y - y_coord) / steps;
	dw = (w - width) / steps;
	dh = (h - height) / steps;
	x0 = x + w / 2.0;
	y0 = y + h / 2.0;
	xmax = x + w;
	ymax = y + h;
	//google map coords: 41.0206842005289, 28.746063760156474, 12
	//our coords: 5362.5, 7173
	document.getElementById("distname").innerHTML = "Mahalle: " + get_district_name(dummy);
	document.getElementById("distcoords").innerHTML = "(TopLeft)(Center)(BottomRight) : (" + x.toString() + "," + y.toString() + ")(" + x0.toString() + "," + y0.toString() + ")(" + xmax.toString() + "," + ymax.toString() + ")";
	startAnimation();
}

function get_district_name(dummy){
	var result;
	if (dummy=='svg_atakent'       ) result = "Atakent";
	if (dummy=='svg_ataturk'       ) result = "Atatürk";
	if (dummy=='svg_besyol'        ) result = "Beþyol";
	if (dummy=='svg_cennet'        ) result = "Cennet";
	if (dummy=='svg_cumhuriyet'    ) result = "Cumhuriyet";
	if (dummy=='svg_fatih'         ) result = "Fatih";
	if (dummy=='svg_fevzi_cakmak'  ) result = "Fevzi Çakmak";
	if (dummy=='svg_gultepe'       ) result = "Gültepe";
	if (dummy=='svg_halkali_merkez') result = "Halkalý Merkez";
	if (dummy=='svg_inonu'         ) result = "Ýnönü";
	if (dummy=='svg_istasyon'      ) result = "Ýstasyon";
	if (dummy=='svg_kanarya'       ) result = "Kanarya";
	if (dummy=='svg_kartaltepe'    ) result = "Kartaltepe";
	if (dummy=='svg_kemalpasa'     ) result = "Kemalpaþa";
	if (dummy=='svg_mehmet_akif'   ) result = "Mehmet Akif";
	if (dummy=='svg_sogutlucesme'  ) result = "Söðütlüçeþme";
	if (dummy=='svg_sultanmurat'   ) result = "Sultanmurat";
	if (dummy=='svg_tevfikbey'     ) result = "Tevfikbey";
	if (dummy=='svg_yarimburgaz'   ) result = "Yarýmburgaz";
	if (dummy=='svg_yenimahalle'   ) result = "Yenimahalle";
	if (dummy=='svg_yesilova'      ) result = "Yeþilova";
	return result;
}

function animate(){
	x_coord += dx;
	y_coord += dy;
	width += dw;
	height += dh;
	i++;
	document.getElementById("svg_map").setAttribute("viewBox", x_coord.toString() + " " + y_coord.toString() + " " + width.toString() + " " + height.toString());
	if (i == steps){
		stopAnimation();
	}
}

function colorize(){
	var j;
	var red;
	var green;
	var blue;
	var colorstr;
	var pathlist = document.getElementById("svg_map").getElementsByTagName("path");
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
	document.getElementById("svg_map").getElementById("fill_svg_atakent"       ).setAttribute("fill", "rgb(128,255,255)");
	document.getElementById("svg_map").getElementById("fill_svg_ataturk"       ).setAttribute("fill", "rgb(128,000,128)");
	document.getElementById("svg_map").getElementById("fill_svg_besyol"        ).setAttribute("fill", "rgb(000,255,255)");
	document.getElementById("svg_map").getElementById("fill_svg_cennet"        ).setAttribute("fill", "rgb(128,255,128)");
	document.getElementById("svg_map").getElementById("fill_svg_cumhuriyet"    ).setAttribute("fill", "rgb(128,128,255)");
	document.getElementById("svg_map").getElementById("fill_svg_fatih"         ).setAttribute("fill", "rgb(000,255,000)");
	document.getElementById("svg_map").getElementById("fill_svg_fevzi_cakmak"  ).setAttribute("fill", "rgb(255,255,000)");
	document.getElementById("svg_map").getElementById("fill_svg_gultepe"       ).setAttribute("fill", "rgb(000,128,128)");
	document.getElementById("svg_map").getElementById("fill_svg_halkali_merkez").setAttribute("fill", "rgb(255,128,255)");
	document.getElementById("svg_map").getElementById("fill_svg_inonu"         ).setAttribute("fill", "rgb(255,255,128)");
	document.getElementById("svg_map").getElementById("fill_svg_istasyon"      ).setAttribute("fill", "rgb(000,000,255)");
	document.getElementById("svg_map").getElementById("fill_svg_kanarya"       ).setAttribute("fill", "rgb(192,192,192)");
	document.getElementById("svg_map").getElementById("fill_svg_kartaltepe"    ).setAttribute("fill", "rgb(255,000,255)");
	document.getElementById("svg_map").getElementById("fill_svg_kemalpasa"     ).setAttribute("fill", "rgb(128,000,000)");
	document.getElementById("svg_map").getElementById("fill_svg_mehmet_akif"   ).setAttribute("fill", "rgb(255,128,128)");
	document.getElementById("svg_map").getElementById("fill_svg_sogutlucesme"  ).setAttribute("fill", "rgb(000,128,000)");
	document.getElementById("svg_map").getElementById("fill_svg_sultanmurat"   ).setAttribute("fill", "rgb(255,000,000)");
	document.getElementById("svg_map").getElementById("fill_svg_tevfikbey"     ).setAttribute("fill", "rgb(000,000,128)");
	document.getElementById("svg_map").getElementById("fill_svg_yarimburgaz"   ).setAttribute("fill", "rgb(128,128,000)");
	document.getElementById("svg_map").getElementById("fill_svg_yenimahalle"   ).setAttribute("fill", "rgb(064,064,064)");
	document.getElementById("svg_map").getElementById("fill_svg_yesilova"      ).setAttribute("fill", "rgb(128,128,128)");
}
