<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
</head>
<body>
<h1>This is the login page</h1>
<?php
session_start();
if (!isset($_SESSION['uname'])) $_SESSION['uname']=$_POST['username'];
if (!isset($_SESSION['pword'])) $_SESSION['pword']=$_POST['password'];
$username=$_SESSION['uname'];
$password=$_SESSION['pword'];
$userid = -1;
$typeid = -1;
# ***** This is the connection to the server *****
$link = mysql_connect('localhost', 'root', 'bismillah'); if (!$link) die("Couldn't connect to MySQL: " . mysql_error());
//echo ('<p>MySQL authentication done');
# ***** This is the connection to the database *****
if (!mysql_select_db('ele')) die("Couldn't open database: " . mysql_error());
//echo ('<p>Connected to the database');
# ***** This is the connection to the table *****
$result = mysql_query("SELECT * FROM tblUsers WHERE username = '$username'"); if (!$result) die("<p>Error performing query: " . mysql_error());
//echo ('<p>Query submitted: ');
while ($row = mysql_fetch_array($result)){
	if($row['password']==$password){$userid=$row['id']; $typeid=$row['usertype'];}
}
//echo ('<p>Data fetched');
if ($userid==-1){
	echo('<p>' . $username . ' ' . $password);
	die("<p>Kullan�c� ad� veya �ifre yanl��");
}
$result = mysql_query("SELECT * FROM tblUsertype WHERE id = '$typeid'"); if (!$result) die("<p>Error performing query: " . mysql_error());
//echo ('<p>Query submitted: ');
$row = mysql_fetch_array($result);
//echo ('<p>Data fetched');
$usertype=$row['type'];
//echo('<p>Ho�geldin ' . $username);
// ********** USER TYPE DETERMINATION STARTS HERE **********
// ***** THIS IS THE ADMINISTRATOR *****
if ($typeid==0){
	echo('<p>Administrator giri�i yap�ld�.');
	$result=mysql_query("SELECT * FROM tblJobs"); if (!$result) die('<p>Error performing query: ' . mysql_error());
	while ($row = mysql_fetch_array($result)) echo($row);
}
// ***** THIS IS THE MANAGER *****
if ($typeid==1){
	http_redirect("manager.php");
}
// ***** THIS IS THE STAFF *****
if ($typeid==2){
	http_redirect("staff.php");
}
// ***** THIS IS THE CUSTOMER *****
if ($typeid==3){
	echo('<p>Ho�geldiniz say�n m��terimiz ' . $username);
	echo('<p><a href="addjob.php">Yeni i�</a>');
	echo('<table><TR><TD>�� no.</TD><TD>Durum</TD><TD>�cret (TL)</TD><TD>Onay</TD><TD>Detay</TD></TR>');
	$result=mysql_query("SELECT id, status, arrive_date, price, send_date FROM tblJobs WHERE cid='$userid'"); if (!$result) die('<p>Error performing query: ' . mysql_error());
	while ($row=mysql_fetch_array($result)){
		echo('<tr><td>' . $row['id'] . '</td><td>' . $row['status'] . '</td><td>' . $row['price'] . '</td>');
		if ($row['clearance']==0) echo('onay bekliyor');
//		echo('<a href="">Onayla</a>');
//		echo('<a href="">Reddet</a>');
		if ($row['clearance']==1) echo('onayland�');
		if ($row['clearance']==2) echo('reddedildi');
		echo('<td><a href="jobdetail.php?=jobid=' . $row['id'] . '">G�ster</a></td>');
		echo('<td>' . $row['send_date'] . '</td>');
		echo('</tr>');
	}
	echo('</table>');
}
mysql_close($link);
?>
<p><b>Login page rendered succesfully!
</body>
</html>
