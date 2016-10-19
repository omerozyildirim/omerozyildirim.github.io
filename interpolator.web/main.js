var points = [], coefs = [];
function add_point(dummy1, dummy2){
	var dummy = {x: dummy1, y: dummy2};
	points.push(dummy);
}
function calc_coefs(){
	if (points.length < 4)
		alert("You should define\nat least 4 points.");
	else{
		sort_for_x();
		var dummy = {}, i;
		for(i = 1; i < points.length - 2; ++i){
			dummy = {};// It should be cleared each and every time!
			dummy.d = (points[i-1].x*((Math.pow(points[i+1].x,2)-Math.pow(points[i+2].x,2))*points[i].y+Math.pow(points[i+2].x,2)*points[i+1].y-Math.pow(points[i+1].x,2)*points[i+2].y+Math.pow(points[i].x,2)*(points[i+2].y-points[i+1].y))+points[i].x*(Math.pow(points[i+1].x,2)*points[i+2].y-Math.pow(points[i+2].x,2)*points[i+1].y)+Math.pow(points[i-1].x,2)*((points[i+2].x-points[i+1].x)*points[i].y-points[i+2].x*points[i+1].y+points[i].x*(points[i+1].y-points[i+2].y)+points[i+1].x*points[i+2].y)+Math.pow(points[i].x,2)*(points[i+2].x*points[i+1].y-points[i+1].x*points[i+2].y)+(points[i+1].x*Math.pow(points[i+2].x,2)-Math.pow(points[i+1].x,2)*points[i+2].x)*points[i].y+(Math.pow(points[i].x,2)*(points[i+1].x-points[i+2].x)+Math.pow(points[i+1].x,2)*points[i+2].x-points[i+1].x*Math.pow(points[i+2].x,2)+points[i].x*(Math.pow(points[i+2].x,2)-Math.pow(points[i+1].x,2)))*points[i-1].y)/(Math.pow(points[i].x,3)*(points[i+1].x*Math.pow(points[i+2].x,2)-Math.pow(points[i+1].x,2)*points[i+2].x)+Math.pow(points[i-1].x,3)*(points[i].x*(Math.pow(points[i+2].x,2)-Math.pow(points[i+1].x,2))-points[i+1].x*Math.pow(points[i+2].x,2)+Math.pow(points[i+1].x,2)*points[i+2].x+Math.pow(points[i].x,2)*(points[i+1].x-points[i+2].x))+Math.pow(points[i].x,2)*(Math.pow(points[i+1].x,3)*points[i+2].x-points[i+1].x*Math.pow(points[i+2].x,3))+Math.pow(points[i-1].x,2)*(points[i+1].x*Math.pow(points[i+2].x,3)+points[i].x*(Math.pow(points[i+1].x,3)-Math.pow(points[i+2].x,3))+Math.pow(points[i].x,3)*(points[i+2].x-points[i+1].x)-Math.pow(points[i+1].x,3)*points[i+2].x)+points[i].x*(Math.pow(points[i+1].x,2)*Math.pow(points[i+2].x,3)-Math.pow(points[i+1].x,3)*Math.pow(points[i+2].x,2))+points[i-1].x*(Math.pow(points[i].x,2)*(Math.pow(points[i+2].x,3)-Math.pow(points[i+1].x,3))-Math.pow(points[i+1].x,2)*Math.pow(points[i+2].x,3)+Math.pow(points[i+1].x,3)*Math.pow(points[i+2].x,2)+Math.pow(points[i].x,3)*(Math.pow(points[i+1].x,2)-Math.pow(points[i+2].x,2))));
			dummy.c = -(points[i].x*points[i+1].y+points[i-1].x*(points[i].y-points[i+1].y)-points[i+1].x*points[i].y+(points[i+1].x-points[i].x)*points[i-1].y+dummy.d*(Math.pow(points[i-1].x,3)*(points[i].x-points[i+1].x)+Math.pow(points[i].x,3)*points[i+1].x-points[i].x*Math.pow(points[i+1].x,3)+points[i-1].x*(Math.pow(points[i+1].x,3)-Math.pow(points[i].x,3))))/(Math.pow(points[i-1].x,2)*(points[i].x-points[i+1].x)+Math.pow(points[i].x,2)*points[i+1].x-points[i].x*Math.pow(points[i+1].x,2)+points[i-1].x*(Math.pow(points[i+1].x,2)-Math.pow(points[i].x,2)));
			dummy.b = -(points[i].y-points[i-1].y+dummy.d*(Math.pow(points[i-1].x,3)-Math.pow(points[i].x,3))+dummy.c*(Math.pow(points[i-1].x,2)-Math.pow(points[i].x,2)))/(points[i-1].x-points[i].x);
			dummy.a = points[i-1].y-dummy.d*Math.pow(points[i-1].x,3)-dummy.c*Math.pow(points[i-1].x,2)-dummy.b*points[i-1].x;
			coefs.push(dummy);
			if (i == 1) coefs.push(dummy);// The same coefficients are valid on the first interval as well. So just add them once more.
		}
		coefs.push(dummy); // The same coefficients are valid on the last two intervals as well. So just add them twice more.
		coefs.push(dummy);
	}
}
function evaluate(dummy){
	var result, i = find_interval(dummy);
	result = coefs[i].a + coefs[i].b * dummy + coefs[i].c * Math.pow(dummy, 2) + coefs[i].d * Math.pow(dummy, 3);
	return result;
}
function find_interval_old(dummy){
	var i;
	if (dummy < points[0].x) return 0;
	for(i = 0; i < points.length - 1; ++i)
		if ((dummy >= points[i].x) && (dummy < points[i + 1].x))
			return i;
	return points.length - 1;
}
function find_interval(dummy){
	var i, result = -1;
	if (dummy < points[0].x) result = 0;
	else{
		for(i = 0; i < points.length - 1; ++i)
			if ((dummy >= points[i].x) && (dummy < points[i + 1].x))
				result = i;
	}
	if (result == -1)
		result = points.length - 1;
	return result;
}
function sort_for_x(){
	var i, j, dummy;
	for (j = 0; j < points.length; j++)
		for (i = j; i < points.length; i++)
			if (points[i].x < points[j].x){
				dummy = points[i];
				points[i] = points[j];
				points[j] = dummy;
			}
}
function plot_on_canvas(dummy1, dummy2){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(dummy1 - 3, dummy2 - 3, 5, 5);
}
function draw_all(){
	if (points.length < 4)
		alert("You should define\nat least 4 points.");
	else{
		calc_coefs();
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var x, y;
		for (x = 0; x < canvas.width; x++){
			y = evaluate(x);
			ctx.lineTo(x, y);
		}
		ctx.stroke();
	}
}
function dump_coefs(){
	var i;
	for (i = 0; i < coefs.length; i++)
		console.log(i, coefs[i]);
}