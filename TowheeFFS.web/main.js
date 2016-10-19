var elemlist = [];
var namelist = [];
function add(dummy){
	dummy.disabled = true;
	elemlist.push(dummy.value);
	namelist = makelist(elemlist, fflist);
	document.getElementById("elements").value = elemlist.join(", ");
	document.getElementById("forcefields").value = namelist.join(", ");
}
function clear_elements(){
  var i;
	var arr = document.getElementsByTagName("input");
	for(i = 0; i < arr.length; i++)
		arr[i].disabled = false;
	elemlist = [];
	namelist = [];
	document.getElementById("elements").value = "";
	document.getElementById("forcefields").value = "";
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
    if (efflag)
      result.push(dummy2[j].ffname);
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
