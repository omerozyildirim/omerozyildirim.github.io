function cbmandt(){
	if (form1.mandt.checked) form1.timestep.disabled = false;
	else form1.timestep.disabled = true;
}
function findZeroCrossing(dummy1, dummy2, dummy3, dummy4){ // Array, lowerbound, upperbound, tolerance
	var i = 0;
	for (i = dummy2 + 1; i < dummy3; i++){
		signl = sgn(dummy1[i - 1][1]);
		sign0 = sgn(dummy1[i][1]);
		signr = sgn(dummy1[i + 1][1]);
		if (opposite(signl, signr) && (Math.abs(dummy1[i + 1][1] - dummy1[i - 1][1]) > dummy4)) return i;
	}
	return false;
}
function overshoot(dummy1, dummy2, dummy3, dummy4){ // error, d(P.V.), sp1, sp2
	var i = false, j = false;
	i = findZeroCrossing(dummy1, dummy3, dummy4, 0.1);
	if (i) j = findZeroCrossing(dummy2, i, dummy4, 0.1);
	if (i && j) return j;
	else return false;
}
function tracezero(dummy1, dummy2, dummy3){ // Array, tolerance, endpoint
	var endpoint = dummy1.length - 1;
	var i = 0;
	var difference = 0;
	var tolerance = dummy2;
	while ((Math.abs(d1(dummy1, i)) < tolerance) && (i < endpoint)){
		i++;
		//document.form1.stdout.value += i + " ";
	}
	// i and dummy3 are in steps dimension
	if (i > dummy3) return (endpoint - i);
	else return false;
}
/*
function steady(dummy1, dummy2){
	var endpoint = dummy1.length - 1;
	var i = 0;
	var difference = 0;
	var tolerance = 1e-2;
	do{
		difference = Math.abs(dummy1[endpoint - i][1] - dummy1[endpoint - i - 1][1]);
		i++;
		//document.form1.stdout.value += i + " " + difference + "\n";
	}while ((difference < tolerance) && (i < endpoint));
	if (i > dummy2) return (endpoint - i);
	else return false;
}
*/
function run(){
	document.form5.log.value = "";
	displayFormValues(document.form1, document.form5.log);
	displayFormValues(document.form2, document.form5.log);
	displayFormValues(document.form3, document.form5.log);
	displayFormValues(document.form4, document.form5.log);
	document.form1.tstd.value = "";
	document.form1.estd.value = "";
	document.form2.osho1.value = "";
	document.form2.osho2.value = "";
	document.form2.osho3.value = "";
	document.form2.osho4.value = "";
	document.form2.osho5.value = "";
	document.form3.stdout.value = "Initializing simulation... ";
	var
		ymin1, ymax1, charttitle1, xtitle1, ytitle1, chartseries1,
		ymin2, ymax2, charttitle2, xtitle2, ytitle2, chartseries2
	;
	var
		time = 0.0,
		tend = 0.0,
		dt = 0.0,
		sp = 0.0,
		dsp = 0.0,
		isSteady = false,
		isOvershot = false,
		i = 0
	;
	var series1 = [], series2 = [], series3 = [], series4 = [], series5 = [], series6 = [];
	var ctr1 = new controller();
	ctr1.setkp(parseFloat(document.form1.kp.value));
	ctr1.setki(parseFloat(document.form1.ki.value));
	ctr1.setkd(parseFloat(document.form1.kd.value));
	//ctr1.setsetpoint(document.form1.levelpc.value / 100.0); // %
	ctr1.setmode(document.form1.proportional.checked, document.form1.integral.checked, document.form1.derivative.checked);
	var tank1 = new tank(parseFloat(document.form1.volume.value), parseFloat(document.form1.height.value)); // metrics
	tank1.setinlet(    parseFloat(document.form1.inlet.value)           ); // m^3/s
	tank1.setoutlet(   parseFloat(document.form1.outlet.value)          ); // m^3/s
	tank1.setlevelpc(  parseFloat(document.form1.levelpc.value)  / 100.0); // %
	tank1.setinletpc(  parseFloat(document.form1.inletpc.value)  / 100.0); // %
	tank1.setoutletpc( parseFloat(document.form1.outletpc.value) / 100.0); // %
	tend = parseFloat(document.form1.runtime.value);
	if (form1.mandt.checked) dt = parseFloat(document.form1.timestep.value);
	else{
		dt = 0.01;
		document.form1.timestep.value = dt;
	}
	dsp = (document.form4.setpoint.value - document.form4.levelpc.value) / document.form1.delay.value * dt / 100.0;
	sp = document.form1.levelpc.value / 100.0;
	series1.length = 0; series2.length = 0; series3.length = 0; series4.length = 0; series5.length = 0; series6.length = 0;
	ctr1.reset();
	document.form1.stdout.value += "Done.\nRunning simulation... ";
	// Non-loop graph data
	if (document.form1.chart1.value == "pvp"){
		series2.push([0, document.form1.levelpc.value]);
		if (document.form1.spmode.value == "step") series2.push([document.form1.delay.value, document.form1.levelpc.value]);
		series2.push([document.form1.delay.value, document.form1.setpoint.value]);
		series2.push([document.form1.runtime.value, document.form1.setpoint.value]);
	}
	else if (document.form1.chart1.value == "pv"){
		series2.push([0, document.form1.levelpc.value * document.form1.height.value / 100.0]);
		if (document.form1.spmode.value == "step") series2.push([document.form1.delay.value, document.form1.levelpc.value * document.form1.height.value / 100.0]);
		series2.push([document.form1.delay.value, document.form1.setpoint.value * document.form1.height.value / 100.0]);
		series2.push([document.form1.runtime.value, document.form1.setpoint.value * document.form1.height.value / 100.0]);
	}
	if (document.form1.chart2.value == "inp_outp"){
		series6.push([0, document.form1.outletpc.value]);
		series6.push([document.form1.runtime.value, document.form1.outletpc.value]);
	}
	else if (document.form1.chart2.value == "in_out"){
		series6.push([0, document.form1.outletpc.value * document.form1.outlet.value / 100.0]);
		series6.push([document.form1.runtime.value, document.form1.outletpc.value * document.form1.outlet.value / 100.0]);
	}
	// Main loop for the simulation
	for (i = 0; time <= tend; i++){
		time = i * dt;
		if (time >= document.form1.delay.value) ctr1.setsetpoint(document.form1.setpoint.value / 100.0);
		else if (document.form1.spmode.value == "ramp"){
			ctr1.setsetpoint(sp);
			sp += dsp;
		}
		else ctr1.setsetpoint(document.form1.levelpc.value / 100.0);
		ctr1.setinput(tank1.getlevelpc());
		tank1.setinletpc(ctr1.getoutput());
		if (document.form1.chart1.value == "pvp"){
			series1.push([time, tank1.getlevel() / tank1.getheight() * 100.0]); // Process variable (%)
			//series2.push([time, ctr1.getsetpoint() * 100.0]); // Setpoint (%)
		}
		else if (document.form1.chart1.value == "pv"){
			series1.push([time, tank1.getlevel()]); // Process variable (m)
			//series2.push([time, ctr1.getsetpoint() * tank1.getheight()]); // Setpoint (m)
		}
		if (document.form1.chart2.value == "inp_outp"){
			series5.push([time, tank1.getinletpc() * 100.0]); // Inlet percent
			//series6.push([time, tank1.getoutletpc() * 100.0]); // Outlet percent
		}
		else if (document.form1.chart2.value == "in_out"){
			series5.push([time, tank1.getinput()]); // Input
			//series6.push([time, tank1.getoutput()]); // Output
		}
		else if (document.form1.chart2.value == "err") series5.push([time, ctr1.geterror()]); // Controller error
		tank1.iterate(dt);
		ctr1.iterate(dt);
	}
	document.form1.stdout.value += "Done.\nAnalysing results...\n  Checking steady-state... ";
	isSteady = tracezero(series1, 1e-2, (10.0 / dt));
	document.form1.stdout.value += "\n" + isSteady + "\n";
	/*
	if (isSteady){
		document.form1.tstd.value = isSteady * dt;
		document.form1.estd.value = (ctr1.getsetpoint() - tank1.getlevel() / tank1.getheight()) * 100.0;
		series3.push([isSteady * dt,   0.0]);
		series3.push([isSteady * dt, 100.0]);
	}
	else{
		document.form1.tstd.value = "Unsteady";
		document.form1.estd.value = "-";
	}
	*/
	document.form1.stdout.value += "Done.\n  Checking overshoot... ";
	isOvershot = overshoot(series1, (document.form1.delay.value / dt), i - 1);
	document.form1.stdout.value += "\n" + isOvershot + "\n";
	/*
	if (isOvershot){
		document.form1.tosho.value = isOvershot * dt;
		document.form1.osho.value = (series1[isOvershot][1] - series2[isOvershot][1]) / series2[isOvershot][1] * 100.0;
		series4.push([isOvershot * dt,   0.0]);
		series4.push([isOvershot * dt, 100.0]);
	}
	else{
		document.form1.tosho.value = "No overshoot";
		document.form1.osho.value = "-";
	}
	*/
	document.form1.stdout.value += "Done.\nPloting... ";
	if (document.form1.chart1.value == "pvp"){
		ymin1 = 0;
		ymax1 = 100;
		charttitle1 = "CSTR level";
		xtitle1 = "time (s)";
		ytitle1 = "Level (%)";
		chartseries1 = [
			{data: series4, label: "overshoot"},
			{data: series3, label: "steady time"},
			{data: series2, label: "setpoint"},
			{data: series1, label: "tank_level"}
		];
	}
	else
		if (document.form1.chart1.value == "pv"){
			ymin1 = 0;
			ymax1 = tank1.getheight();
			charttitle1 = "CSTR level";
			xtitle1 = "time (s)";
			ytitle1 = "Level (m)";
			chartseries1 = [
				{data: series4, label: "overshoot"},
				{data: series3, label: "steady time"},
				{data: series2, label: "setpoint"},
				{data: series1, label: "tank_level"}
			];
		}
	var f1 = Flotr.draw(
		$('graph1'),
		chartseries1,
		{
			shadowSize: 0,
			HtmlText: false,
			lines:{
				lineWidth: 1
			},
			xaxis:{
				noTicks: 10,
				title: xtitle1
			},
			yaxis:{
				min: ymin1,
				max: ymax1,
				title: ytitle1,
				titleAngle: 90
			},
			legend:{
				position: "se",
				backgroundColor: null,
				backgroundOpacity: 0.75
			},
			grid:{
				backgroundColor: "white",
				outlineWidth: 1
			},
			/*spreadsheet:{
				show: true,
				toolbarDownload: "Download"
			},*/
			title: charttitle1
		}
	);
	if(document.form1.chart2.value == "inp_outp"){
		ymin2 = 0;
		ymax2 = 100;
		charttitle2 = "CSTR input - output";
		xtitle2 = "time (s)";
		ytitle2 = "Opening (%)";
		chartseries2 = [
			{data: series5, label: "output"},
			{data: series6, label: "input"}
		];
	}
	else
		if(document.form1.chart2.value == "in_out"){
			ymin2 = 0;
			if (tank1.getinlet() > tank1.getoutlet())
				ymax2 = tank1.getinlet();
			else
				ymax2 = tank1.getoutlet();
			charttitle2 = "CSTR input - output";
			xtitle2 = "time (s)";
			ytitle2 = "Flowrate (m³/s)";
			chartseries2 = [
				{data: series5, label: "output"},
				{data: series6, label: "input"}
			];
		}
		else
			if(document.form1.chart2.value == "err"){
		ymin2 = null;
		ymax2 = null;
		charttitle2 = "Controller error";
		xtitle2 = "time (s)";
		ytitle2 = "Error (%)";
		chartseries2 = [
			{data: series5, label: "error"}
		];
			}
	var f2 = Flotr.draw(
		$('graph2'),
		chartseries2,
		{
			shadowSize: 0,
			HtmlText: false,
			lines:{
				lineWidth: 1
			},
			xaxis:{
				noTicks: 10,
				title: xtitle2
			},
			yaxis:{
				min: ymin2,
				max: ymax2,
				title: ytitle2,
				titleAngle: 90
			},
			legend:{
				position: "se",
				backgroundColor: null,
				backgroundOpacity: 0.75
			},
			grid:{
				backgroundColor: "white",
				outlineWidth: 1
			},
			/*spreadsheet:{
				show: true,
				toolbarDownload: "Download"
			},*/
			title: charttitle2
		}
	);
	document.form1.stdout.value += "Done.\n";
}
