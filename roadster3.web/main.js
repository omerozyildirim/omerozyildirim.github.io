var points = [], xcoefs = [], ycoefs = [];
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
function plot_on_canvas(dummy1, dummy2){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(dummy1 - 3, dummy2 - 3, 5, 5);
}
function replot(){
	if (points.length < 4) alert("You should define\nat least 4 points.");
	else{
		clear_canvas();
		plot_points();
		draw_curve();
	}
}
function plot_points(dummy){
	var i;
	for (i = 0; i < dummy.length; i++) plot_on_canvas(dummy[i].x, dummy[i].y);
}
function draw_curve(){
	calc_coefs(points);
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var i, j, p, step = 1.0 / document.getElementById("precbox").value;
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (i = 0; i < points.length - 1; i++)
		for (j = 0; j <= 1; j += step){
			p = evaluate(i + j);
			ctx.lineTo(p.x, p.y);
		}
	ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
	ctx.stroke();
}
function clear_all(){
	points = [];
	xcoefs = [];
	ycoefs = [];
}
function clear_canvas(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/*function displayfile(dummy1, dummy2){
	var input = dummy1;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		var display = dummy2;
		display.innerText = text;
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(text, "text/xml");
		var roads = xmlDoc.getElementsByTagName("way");
		var nodes = xmlDoc.getElementsByTagName("node");
		console.log(roads[0].getAttribute("id"));
		console.log(nodes[0]);
		for (i = 0; i < roads.length; i++) display.innerText += roads[i].getAttribute("id");
		for (i = 0; i < nodes.length; i++) display.innerText += nodes[i].getAttribute("id") + nodes[i].getAttribute("lat") + nodes[i].getAttribute("lon");
	};
	reader.readAsText(input.files[0]);
}*/
function start_importer(dummy1){
	//console.log("Enter start_importer");
	var parsedxml, text, importer, reader = new FileReader();
	if (typeof(importer) == "undefined") importer = new Worker("importxml.js");
	importer.onmessage = function(event){
		/*console.log("message received");
		console.log(event.data);*/
		parsedxml = event.data;
		/*do{
			console.log(parsedxml.getName());
			console.log(parsedxml.getContent());
			console.log(parsedxml.getAttributeCount());
		}while (parsedxml.next() != null);*/
		//console.log(parsedxml.cdata);
		//console.log(parsedxml.attr);
	};
	reader.onload = function(){
		//text = reader.result;
		//var parser = new DOMParser();
		importer.postMessage(reader.result);
		//importer.postMessage("Hello there");
		//importer.terminate();
		//importer = undefined;
		//console.log(text);
	};
	//console.log(importer);
	reader.readAsText(dummy1.files[0]);
}
