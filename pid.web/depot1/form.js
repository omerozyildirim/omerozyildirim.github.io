function displayFormValues(dummy1, dummy2){
	var str = '';
	var elem = dummy1.elements;
			for (var i = 0; i < elem.length; i++){
				str += "Type: " + elem[i].type
					+ "\nName: " + elem[i].name
					+ "\nValue: " + elem[i].value
					+ "\n\n"
				;
			}
	dummy2.value += str;
}
