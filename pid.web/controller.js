var controller = function(){
// Variables. Almost everything in this section will be between 0 and 1
	this.kp         = 0;
	this.ki         = 0;
	this.kd         = 0;
	this.setpoint   = 0;
	this.input      = 0;
	this.output     = 0;
	this.error      = 0;
	this.si         = 0;
	this.olderror   = 0;
	this.derivative = 0;
	this.pon        = false;
	this.ion        = false;
	this.don        = false;
}
// sets
controller.prototype.setmode = function(dummy1, dummy2, dummy3){
	this.pon = dummy1;
	this.ion = dummy2;
	this.don = dummy3;
}
// utilities
controller.prototype.reset = function(){this.si = 0; this.olderror = 0;}
// iteration
controller.prototype.iterate = function(dummy){
	this.error      = this.setpoint - this.input;
	this.si        += this.error * dummy;
	this.derivative = (this.error - this.olderror) / dummy;
	this.output     = 0;
	if (this.pon) this.output += this.kp * this.error;
	if (this.ion) this.output += this.ki * this.si;
	if (this.don) this.output += this.kd * this.derivative;
	this.olderror = this.error;
}
/*
// I think we do not need these in JavaScript
controller.prototype.getkp       = function(){return this.kp      ;}
controller.prototype.getki       = function(){return this.ki      ;}
controller.prototype.getkd       = function(){return this.kd      ;}
controller.prototype.getsetpoint = function(){return this.setpoint;}
controller.prototype.getinput    = function(){return this.input   ;}
controller.prototype.getoutput   = function(){return this.output  ;}
controller.prototype.getsi       = function(){return this.si      ;}
controller.prototype.geterror    = function(){return this.error   ;}
controller.prototype.setkp       = function(dummy){this.kp       = dummy;}
controller.prototype.setki       = function(dummy){this.ki       = dummy;}
controller.prototype.setkd       = function(dummy){this.kd       = dummy;}
controller.prototype.setsetpoint = function(dummy){this.setpoint = dummy;}
controller.prototype.setinput    = function(dummy){this.input    = dummy;}
controller.prototype.setoutput   = function(dummy){this.output   = dummy;}
*/
