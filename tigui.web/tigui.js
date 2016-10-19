select cbselect(thisenablelist, thisdisablelist);

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
