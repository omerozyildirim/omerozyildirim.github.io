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
	this.setd = function(dummy1, dummy2, dummy3){
		this.d =
			Math.sqrt(
				+ Math.pow((dummy1 - this.x), 2)
				+ Math.pow((dummy2 - this.y), 2)
				+ Math.pow((dummy3 - this.z), 2)
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
	this.setd = function(dummy1, dummy2, dummy3){
		this.d =
			Math.sqrt(
				+ Math.pow((dummy1 - this.x), 2)
				+ Math.pow((dummy2 - this.y), 2)
				+ Math.pow((dummy3 - this.z), 2)
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
		// Calculating the coordinates using the 4 points formula
		var a1 = Math.pow(access_points[2].getd(), 2) * Math.pow(access_points[3].getd(), 2) * Math.pow(access_points[4].getd(), 2);
		var a2 = Math.pow(access_points[1].getd(), 2) * Math.pow(access_points[3].getd(), 2) * Math.pow(access_points[4].getd(), 2);
		var a3 = Math.pow(access_points[1].getd(), 2) * Math.pow(access_points[2].getd(), 2) * Math.pow(access_points[4].getd(), 2);
		var a4 = Math.pow(access_points[1].getd(), 2) * Math.pow(access_points[2].getd(), 2) * Math.pow(access_points[3].getd(), 2);
		var d = a1 + a2 + a3 + a4;
		customer_positions[1].setx((a1 * access_points[0].getx() + a2 * access_points[1].getx() + a3 * access_points[2].getx() + a4 * access_points[3].getx()) / d);
		customer_positions[1].sety((a1 * access_points[0].gety() + a2 * access_points[1].gety() + a3 * access_points[2].gety() + a4 * access_points[3].gety()) / d);
		customer_positions[1].setz((a1 * access_points[0].getz() + a2 * access_points[1].getz() + a3 * access_points[2].getz() + a4 * access_points[3].getz()) / d);
		customer_positions[1].sete(
			Math.sqrt(
				+ Math.pow((access_points[0].getx() - access_points[1].getx()), 2)
				+ Math.pow((access_points[0].gety() - access_points[1].gety()), 2)
				+ Math.pow((access_points[0].getz() - access_points[1].getz()), 2)
			)
		);
		// Calculating the coordinates using all points
	}
}
