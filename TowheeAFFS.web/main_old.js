var elemlist = [];
var namelist = [];
var rulelist = [];
var catlist = [];
var catelem = {};
function add(dummy){
	dummy.disabled = true;
	rulelist = list_rules(fflist);
	elemlist.push(dummy.value);
	namelist = makelist(elemlist, fflist);
	//document.getElementById("forcefields").value = elemlist.toString();
	document.getElementById("elements").value = array2string(elemlist, ", ");
	document.getElementById("forcefields").value = array2string(namelist, ", ");
	document.getElementById("rules").value = array2string(rulelist, ", ");
	catlist = categorize(namelist, rulelist, fflist);
	document.getElementById("categorized").value = catlist;
}
function categorize(dummy1, dummy2, dummy3){
	var i, j, k, m, result = new Array(dummy2.length);
	for (i = 0; i < dummy1.length; i++){
		j = find_index(dummy1[i], dummy3);
		for (k = 0; k < dummy3[j].mrule.length; k++){
			for (m = 0; m < dummy2.length; m++){
				if (dummy3[j].mrule[k] == rulelist[m])
					result[m].push(dummy1[i]);
			}
		}
	}
	return result;
}
function find_index(dummy1, dummy2){
	var i;
	for (i = 0; i < dummy2.length; i++)
		if (dummy1 == dummy2[i].ffname)
			return i;
	return -1;
}
function array2string(dummy1, dummy2){
	var result = dummy1[0], i;
	for (i = 1; i < dummy1.length; i++)
		result += dummy2 + dummy1[i].toString();
	return result;
}
function clear_elements(){
  var i;
	var arr = document.getElementsByTagName("input");
	for(i = 0; i < arr.length; i++)
		arr[i].disabled = false;
	elemlist = [];
	namelist = [];
	rulelist = [];
	document.getElementById("elements").value = "";
	document.getElementById("forcefields").value = "";
	document.getElementById("rules").value = "";
}
function makelist(dummy1, dummy2){
	var i, j, result = [], efflag;
	for (j = 0; j < dummy2.length; j++){
		efflag = true;
		for (i = 0; i < dummy1.length; i++)
		if (!check_elem_in_ff(dummy1[i], dummy2[j])){
			efflag = false;
			break;
		}
		if (efflag) result.push(dummy2[j].ffname);
	}
	return result;
}
function check_elem_in_ff(dummy1, dummy2){
  var i;
	for (i = 0; i < dummy2.nblist.length; i++)
		if (dummy1 == dummy2.nblist[i])
			return true;
	return false;
}
function list_rules(dummy){
	var i, j, k, result = [], efflag;
	for (j = 0; j < dummy.length; j++){
		efflag = true;
		for (k = 0; k < dummy[j].mrule.length; k++){
			for (i = 0; i < result.length; i++){
				if (dummy[j].mrule[k] == result[i]) efflag = false;
			}
			if (efflag) result.push(dummy[j].mrule[k]);
		}
	}
	return result;
}
