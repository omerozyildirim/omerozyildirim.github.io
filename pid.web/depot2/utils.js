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
function numberize(dummy){
	dummy.value = dummy.value.replace(/[^0-9.-]/g,'');
}
function sgn(dummy){
	if (dummy == 0.0)
		return 0;
	else
		if (dummy > 0)
			return 1;
		else
			if (dummy < 0)
				return -1;
}
function opposite(dummy1, dummy2){
	var sign1 = sgn(dummy1);
	var sign2 = sgn(dummy2);
	if (((sign1 == 1) && (sign2 == -1)) || ((sign1 == -1) && (sign2 == 1)))
		return true;
	else
		return false;
}
function d1(array, i){
	if (i == (array.length - 1))
		return (array[i][1] - array[i - 1][1]) / (array[i][0] - array[i - 1][0]);
	else
		return (array[i + 1][1] - array[i][1]) / (array[i + 1][0] - array[i][0]);
}
function d2(array, i){
	if (i == 0)
		return (array[i + 2][1] - 2 * array[i + 1][1] - array[i][1]) / ((array[i + 2][0] - array[i + 1][0]) * (array[i + 1][0] - array[i][0]));
	else
		if (i == (array.length - 1))
			return (array[i][1] - 2 * array[i + 1][1] - array[i - 2][1]) / ((array[i][0] - array[i - 1][0]) * (array[i - 1][0] - array[i - 2][0]));
		else
			return (array[i + 1][1] - 2 * array[i][1] - array[i - 1][1]) / ((array[i + 1][0] - array[i][0]) * (array[i][0] - array[i - 1][0]));
}
function findMax(array, lowb, upb, tol){
	var i, d1a, d2a, maxs = [];
	for (i = lowb; i < upb; i++){
		d1a = d1(array, i);
		if (Math.abs(da_dt) < tol){
			d2a = d2(array, i);
			if (d2a > 0)
				maxs.push(i);
		}
	}
	if (maxs.length == 0)
		return false;
	else
		return maxs;
}
function findMin(array, lowb, upb, tol){
	var i, d1a, d2a, mins = [];
	for (i = lowb; i < upb; i++){
		d1a = d1f(array, i);
		if (Math.abs(da_dt) < tol){
			d2a = d2f(array, i);
			if (d2a < 0)
				mins.push(i);
		}
	}
	if (mins.length == 0)
		return false;
	else
		return mins;
}
function findInf(array, lowb, upb, tol){
	var i, d1a, d2a, infs = [];
	for (i = lowb; i < upb; i++){
		d1a = d1f(array, i);
		if (Math.abs(da_dt) < tol){
			d2a = d2f(array, i);
			if (Math.abs(d2a) < tol)
				infs.push(i);
		}
	}
	if (infs.length == 0)
		return false;
	else
		return infs;
}
function findExt(array, lowb, upb, tol){
	var i, d1a, d2a, exts = [];
	for (i = lowb; i < upb; i++){
		d1a = d1f(array, i);
		if (Math.abs(da_dt) < tol){
			d2a = d2f(array, i);
			if (d2a < 0)
				exts.push(-i);
			else if (d2a > 0)
				exts.push(i);
		}
	}
	if (exts.length == 0)
		return false;
	else
		return exts;
}
