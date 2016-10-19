function tank(dummy1, dummy2){
// Variables
	this.volume    = dummy1;                    // [length]^3
	this.height    = dummy2;                    // [length]
	this.base      = this.volume / this.height; // [length]^2
	this.inlet     = 0;                         // [length]^3/[time]
	this.outlet    = 0;                         // [length]^3/[time]
	this.levelpc   = 0;                         // %
	this.inletpc   = 0;                         // %
	this.outletpc  = 0;                         // %
	this.overload  = false;                     // boolean
	this.underload = false;                     // boolean
	this.name      = ''                         // string
// sets
	this.setname    = function(dummy){this.name   = dummy;};
	this.setvolume  = function(dummy){this.volume = dummy;};
	this.setheight  = function(dummy){this.height = dummy;};
	this.setinlet   = function(dummy){this.inlet  = dummy;};
	this.setoutlet  = function(dummy){this.outlet = dummy;};
	this.setlevelpc = function(dummy){
		if (dummy > 1){
			this.levelpc = 1;
			this.overload = true;
		}
		else if (dummy < 0){
			this.levelpc = 0;
			this.underload = true;
		}
		else{
			this.levelpc = dummy;
			if (this.isoverloaded()||this.isunderloaded())
				this.clearload();
		}
	}
	this.setinletpc  = function(dummy){
		if (dummy > 1) this.inletpc = 1;
		else if (dummy < 0) this.inletpc = 0;
		else this.inletpc = dummy;
	}
	this.setoutletpc = function(dummy){
		if (dummy > 1) this.outletpc = 1;
		else if (dummy < 0) this.outletpc = 0;
		else this.outletpc = dummy;
	}
// gets
	this.getname     = function(){return this.name    ;}
	this.getvolume   = function(){return this.volume  ;}
	this.getheight   = function(){return this.height  ;}
	this.getbase     = function(){return this.base    ;}
	this.getinlet    = function(){return this.inlet   ;}
	this.getoutlet   = function(){return this.outlet  ;}
	this.getlevelpc  = function(){return this.levelpc ;}
	this.getinletpc  = function(){return this.inletpc ;}
	this.getoutletpc = function(){return this.outletpc;}
	this.getamount   = function(){return (this.volume * this.levelpc) ;}
	this.getlevel    = function(){return (this.height * this.levelpc) ;}
	this.getinput    = function(){return (this.inlet  * this.inletpc) ;}
	this.getoutput   = function(){return (this.outlet * this.outletpc);}
// utilities
	this.isoverloaded  = function(){return this.overload ;}
	this.isunderloaded = function(){return this.underload;}
	this.clearload    = function(){this.overload = false; this.underload = false;}
// iteration
	this.iterate = function(dummy){this.setlevelpc((this.getamount() + dummy * (this.getinput() - this.getoutput())) / this.getvolume());}
/*	this.checkamount = function(){
		if (this.amount < 0) this.amount = 0;
		if (this.amount > this.volume){
			this.amount = this.volume;
			this.overload = true;
		}
	}
	this.checklevel = function(){
		if (this.level < 0) this.level = 0;
		if (this.level > this.height){
			this.level = this.height;
			this.overload = true;
		}
	}*/
}
