<html><head></head><body><h2>M��teri i� eklendi ekran�</h2>
<?php
echo('<p>' . $_POST['brand_id']);
echo('<p>' . $_POST['model']);
echo('<p>' . $_POST['serial']);
echo('<p>' . $_POST['battery']);
echo('<p>' . $_POST['complaint']);
echo('<p>' . $_POST['deliveryinfo']);
# ***** This is the connection to the server *****
$link = mysql_connect('localhost', 'root', 'bismillah'); if (!$link) die("Couldn't connect to MySQL: " . mysql_error());
# ***** This is the connection to the database *****
if (!mysql_select_db('ele')) die("Couldn't open database: " . mysql_error());
# ***** This is the connection to the table *****
/*$result=mysql_query("SELECT * FROM tblBrands"); if (!$result) die('<p>Error performing query: ' . mysql_error());
while ($row=mysql_fetch_array($result)) echo('<option value="' . $row['id'] . '">' . $row['brand'] . '</option>');
*/mysql_close($link);
?>
<p>Ana sayfaya d�nmek i�in <a href="login.php">t�klay�n�z.</a>
<p><b>AddJobRow page rendered succesfully!
</body></html>
