importScripts('xmlsax.js');
importScripts('scripts.js');
var roadlist = [], nodelist = [];
this.onmessage = function (dummy1){
	//console.log("Enter onmessage");
	//console.log(dummy1.data);
	//var input = dummy1.data;
	//var reader = new FileReader();
	//var parser = new DOMParser();
	//var xmlDoc = dummy2.parseFromString(dummy1.data, "text/xml");
	var xmlDoc = startParser(dummy1.data);
	xmlDoc.next();
	do{
		console.log(xmlDoc.getName());
		console.log(xmlDoc.getContent());
		console.log(xmlDoc.getAttributeCount());
	}while (xmlDoc.next() != null);
	//roadlist = xmlDoc.getElementsByTagName("way");
	//nodelist = xmlDoc.getElementsByTagName("node");
	//reader.readAsText(input.files[0]);
	//this.postMessage({roads: roadlist, nodes: nodelist});
	this.postMessage(xmlDoc);
	//console.log("Exit onmessage");
	//this.postMessage("Hi there");
};
