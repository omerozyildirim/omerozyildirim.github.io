function controller(){
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
// sets
	this.setkp       = function(dummy){this.kp       = dummy;}
	this.setki       = function(dummy){this.ki       = dummy;}
	this.setkd       = function(dummy){this.kd       = dummy;}
	this.setsetpoint = function(dummy){this.setpoint = dummy;}
	this.setinput    = function(dummy){this.input    = dummy;}
	this.setoutput   = function(dummy){this.output   = dummy;}
	this.setmode     = function(dummy1, dummy2, dummy3){
		this.pon = dummy1;
		this.ion = dummy2;
		this.don = dummy3;
	}
// gets
	this.getkp       = function(){return this.kp      ;}
	this.getki       = function(){return this.ki      ;}
	this.getkd       = function(){return this.kd      ;}
	this.getsetpoint = function(){return this.setpoint;}
	this.getinput    = function(){return this.input   ;}
	this.getoutput   = function(){return this.output  ;}
	this.getsi       = function(){return this.si      ;}
	this.geterror    = function(){return this.error   ;}
// utilities
	this.reset = function(){this.si = 0; this.olderror = 0;}
// iteration
	this.iterate = function(dummy){
		this.error      = this.setpoint - this.input;
		this.si        += this.error * dummy;
		this.derivative = (this.error - this.olderror) / dummy;
		this.output     = 0;
		if (this.pon) this.output += this.kp * this.error;
		if (this.ion) this.output += this.ki * this.si;
		if (this.don) this.output += this.kd * this.derivative;
		this.olderror = this.error;
	}
}
