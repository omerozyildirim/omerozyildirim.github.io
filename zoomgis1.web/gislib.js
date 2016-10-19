function fsign(p1, p2, p3){
	return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}
function distance(p1, p2){
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
// Class definition for node
var node = function(x, y){
	this.x = x;
	this.y = y;
};
node.prototype.distance_from_point = function(p){
	return distance(this.x, this.y, p.x, p.y);
};
node.prototype.distance_from_line = function(p1, p2){
	return Math.abs((p2.y - p1.y) * this.x - (p2.x - p1.x) * this.y + p2.x * p1.y - p2.y * p1.x) / distance(p1, p2);
};
node.prototype.distance_from_spline = function(p1, p2, p3, p4){// Not implemented yet
};
node.prototype.triangle_test = function(v1, v2, v3){
	var b1, b2, b3;
	b1 = fsign(this, v1, v2) < 0.0;
	b2 = fsign(this, v2, v3) < 0.0;
	b3 = fsign(this, v3, v1) < 0.0;
	return ((b1 == b2) && (b2 == b3));
};
// Class definition for segment. Without a road the segment is pretty dumb. It has many properties which can not be calculated without a road affiliation.
var segment = function(snode){
	this.snode = snode;
	this.linear_length = NaN;
	this.spline_length = NaN;
	this.coefx = {a: NaN, b: NaN, c: NaN, d: NaN};
	this.coefy = {a: NaN, b: NaN, c: NaN, d: NaN};
};
segment.prototype.set_start_node = function(dummy){
	this.snode = dummy;
};
// Class definition for road. The main task is concentrated on this class.
var road = function(dummy){
	this.id = dummy;
	this.segments = []; // An empty array
};
road.prototype.calc_segment_linear_length = function(dummy){// dummy is the index of the segment
	this.segments[dummy].linear_length = distance(this.segments[dummy].snode, this.segments[dummy + 1].snode);
};
road.prototype.calc_segment_spline_coefs = function(dummy){// Not implemented yet
	this.segments[dummy].coefx = {a: NaN, b: NaN, c: NaN, d: NaN};
	this.segments[dummy].coefy = {a: NaN, b: NaN, c: NaN, d: NaN};
};
road.prototype.calc_segment_spline_length = function(dummy){// Not implemented yet
	this.calc_segment_spline_coefs(dummy);
	this.segments[dummy].spline_length = 0;
};
road.prototype.get_linear_length = function(){// These should be calculated on the fly.
	var i, result = 0;
	for (i = 0; i < this.segments.length - 1; i++)
		result += this.segments[i].linear_length;
	return result;
};
road.prototype.get_spline_length = function(){// These should be calculated on the fly.
	var i, result = 0;
	for (i = 0; i < this.segments.length - 1; i++)
		result += this.segments[i].spline_length;
	return result;
};
road.prototype.add_node = function(dummy){// dummy is a node, that is a coordinate pair.
	var result = new segment(dummy);// We'll make a segment out of this node
	this.add_segment(result);
};
road.prototype.add_nodes = function(dummy){// dummy is an array of nodes, that is coordinate pairs.
	var i, result;
	for (i = 0; i < dummy.length; i++){// We'll make segments out of these nodes
		result = new segment(dummy[i]);
		this.add_segment(result);
	}
};
road.prototype.add_segment = function(dummy){// dummy is the segment to be added.
	this.segments.push(dummy);
	if (this.segments.length > 1){
		this.calc_segment_linear_length(this.segments.length - 2);
		this.calc_segment_spline_length(this.segments.length - 2);
	}
};
road.prototype.merge_road = function(dummy){// dummy is considered to be a fully calculated road
	var point = this.segments.length - 1;
	this.segments = this.segments.concat(dummy.segments);
	this.calc_segment_linear_length(point);
	this.calc_segment_spline_length(point);
};
road.prototype.clear = function(){
	this.segments = [];
};
road.prototype.delete_segment = function(dummy){// dummy is the index of segment to be deleted
	this.segments.splice(dummy, 1);
	if (dummy > 0){
		this.calc_segment_linear_length(dummy - 1);
		this.calc_segment_spline_length(dummy - 1);
	}
};
road.prototype.change_node = function(dummy1, dummy2){// dummy1 is the index of the node to be moved dummy2 is the new node coordinates
	this.segments[dummy1].set_start_node(dummy2);
	this.calc_segment_linear_length(dummy1);
	this.calc_segment_spline_length(dummy1);
	if (dummy > 0){
		this.calc_segment_linear_length(dummy1 - 1);
		this.calc_segment_spline_length(dummy1 - 1);
	}
};
// Class definition for region.
var region = function(dummy){
	this.id = dummy;
	this.roads = []; // An empty array
};
// Class definition for region.
var route = function(dummy){
	this.id = dummy;
	this.roads = []; // An empty array
};
