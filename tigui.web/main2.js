function fillSelectList(dummy1){
	var dummy2 = eval('list.' + dummy1);// eval('list.' + dummy1.id);
	//console.log(dummy1);
	//console.log(list.ensemble[0].value);
	var i, option;
	for (i = 0; i < dummy2.length; i++){
		option = document.createElement("option");
		option.text  = dummy2[i].value;
		option.value = dummy2[i].value;
		document.getElementById(dummy1).add(option);
	}
	/*solvents.options[0].selected = true;
	solvents.options[0].disabled = true;*/
}
function fillLists(){
	//console.log("Fill lists");
	var i;
	var selectArray = document.getElementsByTagName("select");
	for (i = 0; i < selectArray.length; i++)
		fillSelectList(selectArray[i].id);
}
function evaluateAbilities(){
	//console.log("Abilities");
	var i;
	var selectArray = document.getElementsByTagName("select");//console.log(selectArray);
	for (i = 0; i < selectArray.length; i++){
		//console.log("selectArray[" + i + "]: " + selectArray[i].id);
		cbselect(selectArray[i]);}
}
function cbselect(dummy1){
	console.log("Selected: " + dummy1.id);
	var dummy2 = eval('list.' + dummy1.id);
	console.log("Index: " + dummy2[dummy1.selectedIndex].value);
	enable(dummy2[dummy1.selectedIndex].enablelist);
	disable(dummy2[dummy1.selectedIndex].disablelist);
}
function enable(dummy){
	//console.log("Enable length: " + dummy.length);
	var i;
	for (i = 0; i < dummy.length; i++){
		//console.log(i + " " + dummy[i]);
		document.getElementById(dummy[i]).disabled = false;
		cbselect(dummy[i]);
		//enable(getElementById(dummy[i]).enablelist);
		//dumpList(dummy[i].enablelist);
	}
}
function disable(dummy){
	//console.log("Disable length: " + dummy);
	var i;
/*	if (dummy)
		if (dummy.length > 0){*/
			console.log("Disable: " + dummy);
			for (i = 0; i < dummy.length; i++){
				//console.log(i + " " + dummy[i]);
				document.getElementById(dummy[i]).disabled = true;
				console.log("Disabled: " + dummy[i]);
				/*disableAll(dummy[i].disablelist);
				disable(dummy[i].enablelist);
				dumpList(dummy[i].disablelist);
				dumpList(dummy[i].enablelist);*/
			}
		//}
}
function disableAll(dummy1){
	console.log("DisableAll: " + dummy1);
	var i, j;
	if (dummy1)
		if (dummy1.length > 0){
			for (i = 0; i < dummy1.length; i++){
				//console.log(i + " " + dummy[i]);
				dummy2 = dummy1[i].disablelist;
				if (dummy2)
					if (dummy2.length > 0){
						for (j = 0; j < dummy2.length; j++){
							document.getElementById(dummy2[j]).disabled = true;
							console.log("DisableAlled: " + dummy2[j]);
						/*disableAll(dummy[i].disablelist);
						disableAll(dummy[i].enablelist);
						dumpList(dummy[i].disablelist);
						dumpList(dummy[i].enablelist);*/
						}
					}
			}
		}
}
function integerize(dummy){
	if (dummy.value.length == 1)
		dummy.value = dummy.value.replace(/[^0-9-]/g,'');
	else{
		var head = dummy.value.substring(0, 1);
		var tail = dummy.value.substring(1, dummy.value.length);
		tail = tail.replace(/[^0-9]/g,'');
		dummy.value = head + tail;
	}
}
function floatize(dummy){
	if (dummy.value.length == 1)
		dummy.value = dummy.value.replace(/[^0-9-]/g,'');
	else{
		var head = dummy.value.substring(0, 1);
		var tail = dummy.value.substring(1, dummy.value.length);
		tail = tail.replace(/[^0-9]/g,'');
		dummy.value = head + tail;
	}
}
function dumpList(dummy){
	for (i = 0; i < dummy.length; i++)
		console.log(dummy[i]);
}