var tank = function(dummy1, dummy2){
	this.volume      = dummy1;                    // [length]^3
	this.height      = dummy2;                    // [length]
	this.base        = this.volume / this.height; // [length]^2
	this.inlet       = 0;                         // [length]^3/[time]
	this.outlet      = 0;                         // [length]^3/[time]
	this.levelpc     = 0;                         // %
	this.inletpc     = 0;                         // %
	this.outletpc    = 0;                         // %
	this.amount      = 0;                         // [length]^3
	this.level       = 0;                         // [length]
	this.input       = 0;                         // [length]^3/[time]
	this.output      = 0;                         // [length]^3/[time]
	this.overloaded  = false;                     // boolean
	this.underloaded = false;                     // boolean
	this.name        = ''                         // string
	this.controller  = null;                      // controller
}
// sets
tank.prototype.setlevelpc = function(dummy){
	if (dummy > 1){this.levelpc = 1; this.overloaded = true; }
	else if (dummy < 0){this.levelpc = 0; this.underloaded = true;}
	else{this.levelpc = dummy;
		if (this.overloaded || this.underloaded) this.clearload();
	}
}
tank.prototype.setinletpc = function(dummy){
	if (dummy > 1) this.inletpc = 1;
	else if (dummy < 0) this.inletpc = 0;
	else this.inletpc = dummy;
}
tank.prototype.setoutletpc = function(dummy){
	if (dummy > 1) this.outletpc = 1;
	else if (dummy < 0) this.outletpc = 0;
	else this.outletpc = dummy;
}
// utilities
tank.prototype.clearload = function(){
	this.overloaded = false;
	this.underloaded = false;
}
tank.prototype.checkamount = function(){
	if (this.amount < 0) this.amount = 0;
	if (this.amount > this.volume){this.amount = this.volume; this.overloaded = true;}
}
tank.prototype.checklevel  = function(){
	if (this.level < 0) this.level = 0;
	if (this.level > this.height){this.level = this.height; this.overloaded = true;}
}
// iteration
tank.prototype.iterate = function(dummy){
	this.amount = this.volume * this.levelpc;
	this.level  = this.height * this.levelpc;
	this.input  = this.inlet  * this.inletpc;
	this.output = this.outlet * this.outletpc;
	this.levelpc = (this.amount + dummy * (this.input - this.output)) / this.volume;
}

