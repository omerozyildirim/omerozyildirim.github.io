	var input = dummy1;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		var display = dummy2;
		display.innerText = text;
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(text, "text/xml");
		var roads = xmlDoc.getElementsByTagName("way");
		var nodes = xmlDoc.getElementsByTagName("node");
		console.log(roads[0].getAttribute("id"));
		console.log(nodes[0]);
		for (i = 0; i < roads.length; i++) display.innerText += roads[i].getAttribute("id");
		for (i = 0; i < nodes.length; i++) display.innerText += nodes[i].getAttribute("id") + nodes[i].getAttribute("lat") + nodes[i].getAttribute("lon");
	};
	reader.readAsText(input.files[0]);
