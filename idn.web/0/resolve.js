function resolve(){
	x=(math.pow(r1,2)-math.pow(r2,2)+math.pow(d,2))/(2*d);
	//y=(math.pow(r1,2)-math.pow(r3,2)-math.pow(x,2)+math.pow((x-i),2)+math.pow(j,2))/(2*j);
	y=(math.pow(r1,2)-math.pow(r3,2)+math.pow(i,2)+math.pow(j,2))/(2*j)-i*x/j;
	z=math.sqrt(math.pow(r1,2)-math.pow(x,2)-math.pow(y,2));
}
