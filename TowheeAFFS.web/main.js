var moleclist = [];
var numofmolecules = 1;
var globalelemlist = [];
var mixrulelist = [];

function addmolec(){
	var dummy = {};
	dummy.elemlist = [];
	dummy.fflist = [];
	dummy.fileinput = document.createElement('input'); // We have to keep the form element as it is due to the security restrictions of the browser design
	dummy.fileinput.type = 'file';
	moleclist.push(dummy);
	rendergui(moleclist);
}
function displaymolec(dummy){
}
function deletemolec(dummy){
	moleclist.splice(dummy, 1); // This pops out the dummieth element without leaving a gap
	rendergui(moleclist);
}
function exportinput(){
}
function rendergui(dummy){// call with moleclist as an argument. Draws the main table contents.
	var i, guibody = "<tr><th>#</th><th>Molecule definition file <button onclick='addmolec()'>Add</button></th><th>Atom types</th><th>Forcefields</th><th colspan='2'>Operations</th></tr>";
	for (i = 0; i < moleclist.length; i++){
		guibody += "<tr>";
		guibody += "<td><output id='outmolnum" + i.toString() + "'>" + i.toString() + "</output></td>";
		guibody += "<td id='fincell" + i.toString() + "'></td>";
		guibody += "<td><output id='outelemlist" + i.toString() + "'></output></td>";
		guibody += "<td><select id='selfflist" + i.toString() + "' name='forcefields'><option value='Select forcefield'>Select forcefield</option></select></td>";
		guibody += "<td><button onclick='displaymolec(" + i.toString() + ")'>Display</button></td>";
		guibody += "<td><button onclick='deletemolec(" + i.toString() + ")'>Delete</button></td>";
		guibody += "</tr>";
	}
	guibody += "<tr>";
	guibody += "<td><output id='numofmols'>" + moleclist.length + "</output></td>";
	guibody += "<td>molecules in your system</td>";
	guibody += "<td><output id='elements'></output></td>";
	guibody += "<td><select id='selmr' name='mixingrules'><option value='Select mixing rule'>Select mixing rule</option></select></td>";
	guibody += "<td colspan='2'><button onclick='exportinput()'>Export</button></td>";
	guibody += "</tr>";
	document.getElementById("maingui").innerHTML = guibody;
	for (i = 0; i < moleclist.length; i++){
		moleclist[i].fileinput.id = "infile" + i.toString();
		moleclist[i].fileinput.setAttribute("onchange", "importmolfile('" + i.toString() + "')");
		document.getElementById("fincell" + i.toString()).appendChild(moleclist[i].fileinput);
	}
}
function importmolfile(dummy){// dummy is the index of moleclist
	var input = document.getElementById("infile" + dummy.toString());
	var reader = new FileReader();
	reader.onload = function(){
		var fileContent = reader.result;
		moleclist[i].elemlist = parsetoelems(filecontent, fileext);
		console.log(fileContent);
	};
	reader.readAsText(input.files[0]);
}
function parsetoelems(dummy1, dummy2){
	if (dummy2 == "cml") return parsecml(dummy1);
	if (dummy2 == "xyz") return parsexyz(dummy1);
	if (dummy2 == "mol") return parsemol(dummy1);
}
