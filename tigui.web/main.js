var list_random_luxlevel = [
	'0',
	'1',
	'2',
	'3',
	'4'
];
var list_random_number_generator = [
	'DX-1597-2-7',
	'KISS99',
	'MRG32k3a',
	'RANLUX'
];
var list_solvation_style = [
	'none',
	'internal',
	'external'
];
var list_runoutput = [
	'full',
	'updates',
	'none'
];
var list_controlstyle = [
	'equilibration',
	'production',
	'manual'
];
var list_stepstyle = [
	'cycles',
	'moves'
];
var list_ensemble = [
	'npt',
	'nvt',
	'uvt'
];
var list_initstyle = [
	'full cbmc',
	'template',
	'coords',
	'nanotube',
	'helix cbmc',
	'partial cbmc'
];
var list_initlattice = [
	'center',
	'none',
	'simple cubic'
];
var list_initboxtype = [
	'unit cell',
	'dimensions',
	'number density'
];
var list_helix_keytype = [
	'element',
	'nbname',
	'pdbname'
];
function fillSelectList(dummy1, dummy2){
	var i, option;
	for (i = 0; i < dummy2.length; i++){
		option = document.createElement("option");
		option.text  = dummy2[i];
		option.value = dummy2[i];
		document.getElementById(dummy1).add(option);
	}
/*	solvents.options[0].selected = true;
	solvents.options[0].disabled = true;*/
}
function cbselect(dummy1, dummy2){
enable(dummy1);
disable(dummy2);
}

function enable(dummy){
var i;
for (i = 0; i < dummy.length; i++)
dummy[i].disabled = false;
}
function disable(dummy){
var i;
for (i = 0; i < dummy.length; i++)
dummy[i].disabled = true;
}
function integerize(dummy){
	dummy.value = dummy.value.replace(/[^0-9-]/g,'');
}
