<!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<title>Listing 3.2 A PHP Script Including HTML</title>
</head>
<body>
<div><b>
<?php
$counter=1;
while ( $counter <= 12 ) {
   print "$counter times 2 is ".($counter*2)."<br />";
   $counter++;
 }
?>
</b></div>
</body>
</html>
