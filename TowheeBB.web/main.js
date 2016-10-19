var numberAvogadro = 6.022E+23; // molecules / mol
var solventList = [
	{mw: 0 /* g/mol */, density: 0 /* g/ml */, name: "choose"         },
	{mw:  18.01528, density: 1.000 , name: "Water"                    },
	{mw:  72.15   , density: 0.626 , name: "Pentane"                  },
	{mw:  70.1    , density: 0.751 , name: "Cyclopentane"             },
	{mw:  86.18   , density: 0.655 , name: "Hexane"                   },
	{mw:  84.16   , density: 0.779 , name: "Cyclohexane"              },
	{mw:  78.11   , density: 0.879 , name: "Benzene"                  },
	{mw:  92.14   , density: 0.867 , name: "Toluene"                  },
	{mw:  88.11   , density: 1.033 , name: "1,4-Dioxane"              },
	{mw: 119.38   , density: 1.498 , name: "Chloroform"               },
	{mw:  74.12   , density: 0.713 , name: "Diethyl ether"            },
	{mw:  84.93   , density: 1.3266, name: "Dichloromethane (DCM)"    },
	{mw:  72.11   , density: 0.886 , name: "Tetrahydrofuran (THF)"    },
	{mw:  88.11   , density: 0.894 , name: "Ethyl acetate"            },
	{mw:  58.08   , density: 0.786 , name: "Acetone"                  },
	{mw:  73.09   , density: 0.944 , name: "Dimethylformamide (DMF)"  },
	{mw:  41.05   , density: 0.786 , name: "Acetonitrile (MeCN)"      },
	{mw:  78.13   , density: 1.092 , name: "Dimethyl sulfoxide (DMSO)"},
	{mw: 102.09   , density: 1.205 , name: "Propylene carbonate"      },
	{mw:  46.03   , density: 1.21  , name: "Formic acid"              },
	{mw:  74.12   , density: 0.810 , name: "n-Butanol"                },
	{mw:  60.10   , density: 0.785 , name: "Isopropanol (IPA)"        },
	{mw:  60.10   , density: 0.803 , name: "n-Propanol"               },
	{mw:  46.07   , density: 0.789 , name: "Ethanol"                  },
	{mw:  32.04   , density: 0.791 , name: "Methanol"                 },
	{mw:  60.05   , density: 1.049 , name: "Acetic acid"              },
	{mw:  61.04   , density: 1.1371, name: "Nitromethane"             },
	{mw:   0.0    , density: 0.0   , name: "Custom"                   },
];
function numberize(dummy){
	dummy.value = dummy.value.replace(/[^0-9.e-]/g,'');
}
/*function numberize(dummy){
	console.log(dummy.value.length);
	if (dummy.value.length > 0){
		var body = dummy.value.substr(0, dummy.value.length - 1);
		var tail = dummy.value[dummy.value.length - 1];
		console.log(tail);
		if (body.length == 0)
			tail = tail.replace(/[^0-9.-]/g,'');
		else if ((body.length > 1) && (tail == "-"))
			tail = tail.replace(/[^0-9.]/g,'');
		else if (body[body.length - 1] == "e")
			tail = tail.replace(/[^0-9-]/g,'');
		else if ((body[body.length - 2] == "e") && (body[body.length - 1] == "-"))
			tail = tail.replace(/[^0-9]/g,'');
		else if(index.Of(body, ".") > -1)
			tail = tail.replace(/[^0-9e]/g,'');
		else if(index.Of(body, "e") > -1)
			tail = tail.replace(/[^0-9]/g,'');
		dummy.value = body + tail;
		console.log(tail);
	}
	console.log();
}
function numberize(dummy){
	console.log(parseFloat(dummy.value));
	if (!((dummy.value.length == 1) && (dummy.value == "-")))
		dummy.value.length = dummy.value.length - 1;
	else if (parseFloat(dummy.value) == "")
		dummy.value[dummy.value.length - 1] = "";
}*/
function selectSolvent(){
	if (solvents.value == "Custom"){
		density.value = ""; density.readOnly = false;
		     mw.value = "";      mw.readOnly = false;
	}
	else{
		density.value = solventList[solvents.selectedIndex].density; density.readOnly = true;// Why does this work?
		     mw.value = solventList[solvents.selectedIndex].mw     ;      mw.readOnly = true;// Why does this work?
	}
}
function fillSolventList(){
	var i, option;
	for (i = 0; i < solventList.length; i++){
		option = document.createElement("option");
		option.text  = solventList[i].name;
		option.value = solventList[i].name;
		document.getElementById("solvents").add(option);
	}
	solvents.options[0].selected = true;
	solvents.options[0].disabled = true;
}
function setDensity(dummy){
	document.form1.density.value = dummy;
}
function makeInput(dummy){
	document.getElementById(dummy).style.backgroundColor = "Yellow";
	document.getElementById(dummy).disabled = false;
}
function makeResult(dummy){
	document.getElementById(dummy).style.backgroundColor = "LightGreen";
	document.getElementById(dummy).disabled = true;
}
function highlight(){
	clearAll();
	if (cubicVolume.checked){
		cubic.checked = true;
		makeInput("density");
		makeInput("mw");
		makeInput("solvents");
		makeInput("numsolvent");
		makeResult("width");
	}
	else if (solventNum.checked){
		makeInput("density");
		makeInput("mw");
		makeInput("solvents");
		makeInput("cubic");
		makeInput("width");
		makeInput("depth");
		makeInput("height");
		makeResult("numsolvent");
	}
	else if (soluteNum.checked){
		makeInput("concentration");
		makeInput("cubic");
		makeInput("width");
		makeInput("depth");
		makeInput("height");
		makeResult("numsolute");
	}
	else if (soluteConc.checked){
		makeInput("numsolute");
		makeInput("cubic");
		makeInput("width");
		makeInput("depth");
		makeInput("height");
		makeResult("concentration");
	}
	else if (boxHeight.checked){
		cubic.checked = false;
		makeInput("density");
		makeInput("mw");
		makeInput("solvents");
		makeInput("numsolvent");
		makeInput("width");
		makeInput("depth");
		makeResult("height");
	}
	setCubicBox();
}
function clearAll(){
	var i;
	var all = document.getElementsByTagName("input");
	for (i = 0; i < all.length; i++){
		if (all[i].type != "radio"){
			all[i].style.backgroundColor = "white";
			all[i].disabled = true;
		}
	}
	all = document.getElementsByTagName("select");
	for (i = 0; i < all.length; i++){
		all[i].style.backgroundColor = "white";
		all[i].disabled = true;
	}
}
function clearValues(){
	var all = document.getElementsByTagName("input");
	for (i = 0; i < all.length; i++)
		if (all[i].type == "text")
			all[i].value = "";
}
function setCubicBox(){
	if (document.getElementById("cubic").checked){
		document.getElementById("depth" ).disabled = true;
		document.getElementById("height").disabled = true;
	}
	else{
		document.getElementById("depth" ).disabled = false;
		document.getElementById("height").disabled = false;
	}
}
function cubicCopy(){
	if (document.getElementById("cubic").checked){
		document.getElementById("depth" ).value = document.getElementById("width").value;
		document.getElementById("height").value = document.getElementById("width").value;
	}
}
/*function spreadSides(){
	depth.value = width.value;
	height.value = width.value;
}*/
function calculate(){
	if (checkBoxes()){
		highlight();
		if (document.getElementById("cubicVolume").checked == true){
			width.value = calculateCubicVolume(parseFloat(density.value), parseFloat(mw.value), parseFloat(numsolvent.value));
			cubicCopy();
		}
		if (document.getElementById("solventNum").checked == true)
			numsolvent.value = calculateNumberSolvent(parseFloat(density.value), parseFloat(mw.value), parseFloat(width.value), parseFloat(depth.value), parseFloat(height.value));
		if (document.getElementById("soluteNum").checked == true)
			numsolute.value = calculateNumberSolute(parseFloat(concentration.value), parseFloat(width.value), parseFloat(depth.value), parseFloat(height.value));
		if (document.getElementById("soluteConc").checked == true)
			concentration.value = calculateSoluteConc(parseFloat(numsolute.value), parseFloat(width.value), parseFloat(depth.value), parseFloat(height.value));
		if (document.getElementById("boxHeight").checked == true)
			height.value = calculateHeight(parseFloat(density.value), parseFloat(mw.value), parseFloat(numsolvent.value), parseFloat(width.value), parseFloat(depth.value));
	}
}
function checkBoxes(){
	var result = true;
	var all = document.getElementsByTagName("input");
	for (i = 0; i < all.length; i++){
		if ((all[i].type == "text") && (all[i].disabled == false) && (isNaN(parseFloat(all[i].value)))){
			//console.log(all[i].id + " " + all[i].value + " " + parseFloat(all[i].value));
			all[i].style.backgroundColor = "red";
			result = false;
		}
	}
	return result;
}
function calculateCubicVolume(solventDensity, solventMW, solventNumber){
	return Math.pow((1e24 * solventNumber / (solventDensity * numberAvogadro / solventMW)), (1.0/3.0));
}
function calculateNumberSolvent(solventDensity, solventMW, width, depth, height){
	return 1e-24 * width * depth * height * solventDensity * numberAvogadro / solventMW;
}
function calculateNumberSolute(soluteConc, width, depth, height){
	return 1e-27 * numberAvogadro * soluteConc * width * depth * height;
}
function calculateSoluteConc(soluteNumber, width, depth, height){
	return 1e27 * soluteNumber / numberAvogadro / width / depth / height;
}
function calculateHeight(solventDensity, solventMW, solventNumber, width, depth){
	return (1e24 * solventNumber / (solventDensity * numberAvogadro / solventMW) / width / depth);
}
