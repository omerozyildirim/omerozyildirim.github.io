function displayfile(){
	var input = document.getElementById("infile");
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		var node = document.getElementById('fileout');
		node.innerText = text;
	};
	reader.readAsText(input.files[0]);
}
function loadXMLDoc() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for older browsers
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("demo").innerHTML =
			xmlhttp.responseText;
		}
	};
	xmlhttp.open("GET", document.getElementById("httpadr").text, true);
	xmlhttp.send();
}
