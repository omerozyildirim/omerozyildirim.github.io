var graphpoint = function(){
	this.x         = 0;
	this.y         = 0;
	this.timebox   = null;
	this.levelbox  = null;
	this.delbutton = null;
}
function add_point(dummy1, dummy2){
	var dummy3 = new graphpoint;
	dummy3.x = dummy2.x;
	dummy3.y = dummy2.y;
	// We have to keep these form elements as they are to keep their values intact upon deletion of array elements.
	dummy3.timebox   = document.createElement('input'); dummy3.timebox.type   = "number";
	dummy3.levelbox  = document.createElement('input'); dummy3.levelbox.type  = "number";
	dummy3.delbutton = document.createElement('input'); dummy3.delbutton.type = "button";
	dummy1.push(dummy3);
}
function draw_vertical_grid(dummy1, dummy2){
	var i, y, line;
	for (i = 1; i < dummy2; i++){
		y = dummy1.getAttribute("height") * i / dummy2;
		line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		line.setAttribute("x1", 0);
		line.setAttribute("y1", y);
		line.setAttribute("x2", dummy1.getAttribute("width"));
		line.setAttribute("y2", y);
		line.setAttribute("stroke", "#CCCCCC");
		line.setAttribute("stroke-width", "0.5");
		dummy1.appendChild(line);
	}
}
function draw_horizontal_grid(dummy1, dummy2){
	var i, x, line;
	for (i = 1; i < dummy2; i++){
		x = dummy1.getAttribute("width") * i / dummy2;
		line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		line.setAttribute("x1", x);
		line.setAttribute("y1", 0);
		line.setAttribute("x2", x);
		line.setAttribute("y2", dummy1.getAttribute("height"));
		line.setAttribute("stroke", "#CCCCCC");
		line.setAttribute("stroke-width", "0.5");
		dummy1.appendChild(line);
	}
}
