var text, roadlist, nodelist;
this.onmessage = function (dummy1){
	var input = dummy1.data;
	var reader = new FileReader();
	reader.onload = function(){
		text = reader.result;
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(text, "text/xml");
		roadlist = xmlDoc.getElementsByTagName("way");
		nodelist = xmlDoc.getElementsByTagName("node");
	};
	reader.readAsText(input.files[0]);
	this.postMessage({raw: text, roads: roadlist, nodes: nodelist});
};

