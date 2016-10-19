// Classes
function calib_point(){
// Variables
	this.x;
	this.y;
	this.z;
// Sets
	this.setx = function(dummy){this.x = dummy;}
	this.sety = function(dummy){this.y = dummy;}
	this.setz = function(dummy){this.z = dummy;}
	this.set_coor = function(dummy1, dummy2, dummy3){this.x = dummy1; this.y = dummy2; this.z = dummy3;}
// Gets
	this.getx = function(){return this.x;}
	this.gety = function(){return this.y;}
	this.getz = function(){return this.z;}
	this.getr = function(){return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)}
}
function access_point(){
// Variables
	this.x;
	this.y;
	this.z;
	this.name;
	this.color;
// Sets
	this.setx = function(dummy){this.x = dummy;}
	this.sety = function(dummy){this.y = dummy;}
	this.setz = function(dummy){this.z = dummy;}
	this.setd = function(dummy1, dummy2){
		this.d =
			Math.sqrt(
				+ Math.pow((dummy1 - this.x), 2)
				+ Math.pow((dummy2 - this.y), 2)
			);
	};
	this.set_name = function(dummy){this.name = dummy;}
	this.set_color = function(dummy){this.color = dummy;}
	this.set_coor = function(dummy1, dummy2, dummy3){this.x = dummy1; this.y = dummy2; this.z = dummy3;}
// Gets
	this.getx = function(){return this.x;}
	this.gety = function(){return this.y;}
	this.getz = function(){return this.z;}
	this.getd = function(){return this.d;}
	this.get_name = function(){return this.name;}
	this.get_color = function(){return this.color;}
}
function customer_position(){
// Variables
	this.x;
	this.y;
	this.z;
	this.d;
	this.e;
// Sets
	this.setx = function(dummy){this.x = dummy;}
	this.sety = function(dummy){this.y = dummy;}
	this.setz = function(dummy){this.z = dummy;}
	this.sete = function(dummy){this.e = dummy;}
	this.setd = function(dummy1, dummy2){
		this.d =
			Math.sqrt(
				+ Math.pow((dummy1 - this.x), 2)
				+ Math.pow((dummy2 - this.y), 2)
			);
	};
	this.set_coor = function(dummy1, dummy2, dummy3){this.x = dummy1; this.y = dummy2; this.z = dummy3;}
// Gets
	this.getx = function(){return this.x;}
	this.gety = function(){return this.y;}
	this.getz = function(){return this.z;}
	this.getd = function(){return this.d;}
	this.gete = function(){return this.e;}
}
function building(){
// Variables
	var width;
	var height;
	var depth;
	var customer_positions = [];
	var access_points = [];
	var calib_points = [];
	var ap_queue = [];
// Sets
	this.set_size = function(dummy1, dummy2, dummy3){width = dummy1; height = dummy2, depth = dummy3;}
// Gets
	this.get_access_point = function(dummy){return access_points[dummy];}
	this.get_calib_point = function(dummy){return calib_points[dummy];}
	this.get_customer_position = function(dummy){return customer_positions[dummy];}
// Adds
	this.add_access_point = function(){access_points[access_points.length] = new access_point();}
	this.add_calib_point = function(){calib_points[calib_points.length] = new calib_point();}
	this.add_customer_position = function(){customer_positions[customer_positions.length] = new customer_position();}
// Other methods
	this.resolve = function(){
		var i;
		var j;
		var temp = 0;
		// Sorting the access points according to their distances
		for (i = 0; i < access_points.length; i++){
			for (j = i; j < access_points.length; j++){
				if (access_points[i].getd() > access_points[j].getd()){
					temp = access_points[i];
					access_points[i] = access_points[j];
					access_points[j] = temp;
				}
			}
		}
		// Calculating the coordinates using the 2D trilateration formula
		for (i = 0; i < 3; i++){
			var a = (Math.pow(access_points[i + 1].getd(), 2) - Math.pow(access_points[i + 2].getd(), 2) - Math.pow(access_points[i + 1].getx(), 2) + Math.pow(access_points[i + 2].getx(), 2) - Math.pow(access_points[i + 1].gety(), 2) + Math.pow(access_points[i + 2].gety(), 2)) / 2;
			var b = (Math.pow(access_points[i + 1].getd(), 2) - Math.pow(access_points[i + 0].getd(), 2) - Math.pow(access_points[i + 1].getx(), 2) + Math.pow(access_points[i + 0].getx(), 2) - Math.pow(access_points[i + 1].gety(), 2) + Math.pow(access_points[i + 0].gety(), 2)) / 2;
			// y -> x
			var y = (b * (access_points[i + 2].getx() - access_points[i + 1].getx()) - a * (access_points[i + 0].getx() - access_points[i + 1].getx())) / ((access_points[i + 0].gety() - access_points[i + 1].gety()) * (access_points[i + 2].getx() - access_points[i + 1].getx()) - (access_points[i + 2].gety() - access_points[i + 1].gety()) * (access_points[i + 0].getx() - access_points[i + 1].getx()));
			var x = (a - y * (access_points[i + 2].gety() - access_points[i + 1].gety())) / (access_points[i + 2].getx() - access_points[i + 1].getx());
			customer_positions[i + 1].setx(x); customer_positions[i + 1].sety(y);
			customer_positions[i + 1].sete(Math.sqrt( Math.pow((customer_positions[i + 0].getx() - customer_positions[i + 1].getx()), 2) + Math.pow((customer_positions[i + 0].gety() - customer_positions[i + 1].gety()), 2)));
		}
		// x -> y
		/*var x = (a - y * (access_points[2].gety() - access_points[1].gety())) / (access_points[2].getx() - access_points[1].getx());
		var y = (b * (access_points[2].getx() - access_points[1].getx()) - a * (access_points[0].getx() - access_points[1].getx())) / ((access_points[0].gety() - access_points[1].gety()) * (access_points[2].getx() - access_points[1].getx()) - (access_points[2].gety() - access_points[1].gety()) * (access_points[0].getx() - access_points[1].getx()));
		customer_positions[2].setx(x); customer_positions[2].sety(y);
		customer_positions[2].sete(Math.sqrt( Math.pow((customer_positions[0].getx() - customer_positions[2].getx()), 2) + Math.pow((customer_positions[0].gety() - customer_positions[2].gety()), 2)));
	*/}
}
