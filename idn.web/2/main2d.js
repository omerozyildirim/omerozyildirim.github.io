// ***** This is the initialization phase ...
// Set a new building
var width = 790;
var height = 560;
var depth = 0;
var clickfn = 0;
var myBld = new building;
myBld.set_size(width, height, depth);
// Add access points, calibration points and customer_points
var napcoords = [
	{x:  20, y: 280, z: 0},
	{x: 170, y:  20, z: 0},
	{x: 470, y:  20, z: 0},
	{x: 620, y: 280, z: 0},
	{x: 470, y: 540, z: 0},
	{x: 170, y: 540, z: 0},
	{x: 320, y: 280, z: 0},
	{x: 770, y: 540, z: 0},
	{x: 770, y:  20, z: 0}
];
var nap = napcoords.length;
var ncp = 4;
var nsp = 6;
var i;
for (i = 0; i < nap; i++){myBld.add_access_point();}
for (i = 0; i < ncp; i++){myBld.add_customer_position();}
//for (i = 0; i < nsp; i++){myBld.add_calib_point();}
// Set the initial customer positions
reset_cps();
// Set the initial positions of the access points and calculate the distances
reset_aps();
// Initial dumps
myBld.resolve();
calc_dists();
plot_area();
dump_cps();
dump_aps();
// ... Initialization phase ends here ****
function numberize(dummy){
	dummy.value = dummy.value.replace(/[^0-9.]/g,'');
}
function set_clickfn(dummy){
	clickfn = dummy;
}
function reset_cps(){
	myBld.get_customer_position(0).set_coor(width / 2, height / 2, 0);
	myBld.get_customer_position(1).set_coor(width / 2, height / 2, 0);
	myBld.get_customer_position(2).set_coor(width / 2, height / 2, 0);
	myBld.get_customer_position(3).set_coor(width / 2, height / 2, 0);
	dump_cps();
	plot_cps();
}
function reset_aps(){
	var i;
	for (i = 0; i < nap; i++)
		myBld.get_access_point(i).set_name("AP" + i); myBld.get_access_point(i).set_color("white"    ); myBld.get_access_point(i).set_coor( napcoords[i].x, napcoords[i].y, napcoords[i].z);
	dump_aps();
	plot_aps();
}
function calc_dists(){
	for (i = 0; i < nap; i++) calc_dist(i);
}
function calc_dist(dummy){
	myBld.get_access_point(dummy).setd(
		myBld.get_customer_position(0).getx(),
		myBld.get_customer_position(0).gety()
	);
	dump_apd(dummy);
}
function dump_apd(dummy){
	document.getElementById("apd" + dummy).value = myBld.get_access_point(dummy - 1).getd();
}
function dump_apds(){
	for (i = 0; i < nap; i++) dump_apd(i);
}
function dump_ap(dummy){
	document.getElementById("apc" + dummy).style.backgroundColor = myBld.get_access_point(dummy).get_color();
	document.getElementById("apn" + dummy).value = myBld.get_access_point(dummy).get_name();
	document.getElementById("apx" + dummy).value = myBld.get_access_point(dummy).getx();
	document.getElementById("apy" + dummy).value = myBld.get_access_point(dummy).gety();
	dump_apd(dummy);
}
function dump_aps(){
	for (i = 0; i < nap; i++) dump_ap(i);
}
function dump_cp(dummy){
	document.getElementById("ypx" + dummy).value = myBld.get_customer_position(dummy).getx();
	document.getElementById("ypy" + dummy).value = myBld.get_customer_position(dummy).gety();
	if (dummy > 1) document.getElementById("ype" + dummy).value = myBld.get_customer_position(dummy).gete();
}
function dump_cps(){
	for (i = 0; i < ncp; i++) dump_cp(i);
}
function plot_cp(dummy){
	var x = myBld.get_customer_position(dummy).getx();
	var y = myBld.get_customer_position(dummy).gety();
	if (isFinite(x) && isFinite(y)){
		document.getElementById("graph").getElementById("gcp" + dummy).setAttribute("cx", x);
		document.getElementById("graph").getElementById("gcp" + dummy).setAttribute("cy", y);
	}
	else{
		document.getElementById("graph").getElementById("gcp" + dummy).setAttribute("cx", 0);
		document.getElementById("graph").getElementById("gcp" + dummy).setAttribute("cy", 0);
	}
}
function plot_cps(){
	for (i = 0; i < ncp; i++) plot_cp(i);
}
function set_ap(dummy){
	/*myBld.get_access_point(dummy - 1).set_coor(document.getElementById("apx" + dummy).value, document.getElementById("apy" + dummy).value, document.getElementById("apz" + dummy).value);
	myBld.get_access_point(dummy - 1).setd(myBld.get_customer_position(0).getx(), myBld.get_customer_position(0).gety(), myBld.get_customer_position(0).getz());
	document.getElementById("apd" + dummy).value = myBld.get_access_point(dummy - 1).getd();
	plot_ap(dummy);*/
}
function get_ap(dummy){
	/*myBld.get_access_point(dummy - 1).set_coor(document.getElementById("apx" + dummy).value, document.getElementById("apy" + dummy).value, document.getElementById("apz" + dummy).value);
	myBld.get_access_point(dummy - 1).setd(myBld.get_customer_position(0).getx(), myBld.get_customer_position(0).gety(), myBld.get_customer_position(0).getz());
	document.getElementById("apd" + dummy).value = myBld.get_access_point(dummy - 1).getd();
	plot_ap(dummy);*/
}
function plot_ap(dummy){
	document.getElementById("graph").getElementById("gap" + dummy).setAttribute("x", myBld.get_access_point(dummy).getx() - 6);
	document.getElementById("graph").getElementById("gap" + dummy).setAttribute("y", myBld.get_access_point(dummy).gety() + 6);
}
function plot_aps(){
	for (i = 1; i <= nap; i++) plot_ap(i);
}
function plot_area(){
	document.getElementById("graph").getElementById("area1").setAttribute("points", myBld.get_access_point(0).getx() + "," + myBld.get_access_point(0).gety() + " " + myBld.get_access_point(1).getx() + "," + myBld.get_access_point(1).gety() + " " + myBld.get_access_point(2).getx() + "," + myBld.get_access_point(2).gety());
	document.getElementById("graph").getElementById("area2").setAttribute("points", myBld.get_access_point(1).getx() + "," + myBld.get_access_point(1).gety() + " " + myBld.get_access_point(2).getx() + "," + myBld.get_access_point(2).gety() + " " + myBld.get_access_point(3).getx() + "," + myBld.get_access_point(3).gety());
	document.getElementById("graph").getElementById("area3").setAttribute("points", myBld.get_access_point(2).getx() + "," + myBld.get_access_point(2).gety() + " " + myBld.get_access_point(3).getx() + "," + myBld.get_access_point(3).gety() + " " + myBld.get_access_point(4).getx() + "," + myBld.get_access_point(4).gety());
}
function set_cp(evt){
	var pt = document.getElementById("graph").createSVGPoint();
	pt.x = evt.clientX;
	pt.y = evt.clientY;
	var cursorpt =  pt.matrixTransform(document.getElementById("graph").getScreenCTM().inverse());
	if (clickfn == 0){
		myBld.get_customer_position(0).set_coor(cursorpt.x, cursorpt.y, 0);
		for (i = 0; i < nap; i++){
			myBld.get_access_point(i).setd(myBld.get_customer_position(0).getx(), myBld.get_customer_position(0).gety());
		}
	}
	else{
		myBld.get_access_point(clickfn - 1).set_coor(cursorpt.x, cursorpt.y);
		plot_ap(clickfn);
		clickfn = 0;
	}
	myBld.resolve();
	plot_area();
	dump_aps();
	dump_cps();
	plot_cps();
}
function rndwalk(){
	/*var i;
	dx = Math.floor(Math.random() * 20) - 10;
	dy = Math.floor(Math.random() * 20) - 10;
	dz = 0;
	myBld.get_customer_position(0).set_coor(myBld.get_customer_position(0).getx() + dx, myBld.get_customer_position(0).gety() + dy, myBld.get_customer_position(0).getz() + dz);
	for (i = 1; i <= nap; i++){
		myBld.get_access_point(i - 1).setd(myBld.get_customer_position(0).getx(), myBld.get_customer_position(0).gety(), myBld.get_customer_position(0).getz());
	}
	if ((myBld.get_customer_position(0).getx() < 0) || (myBld.get_customer_position(0).getx() > width )) dx = -dx;
	if ((myBld.get_customer_position(0).gety() < 0) || (myBld.get_customer_position(0).gety() > height)) dy = -dy;
	if ((myBld.get_customer_position(0).getz() < 0) || (myBld.get_customer_position(0).getz() > depth )) dz = -dz;
	myBld.resolve();
	dump_aps();
	dump_cps();
	plot_cps();*/
}
