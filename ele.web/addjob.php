<html><head></head><body><h2>Müþteri iþ ekleme ekraný</h2>
<p><?php session_start(); echo ($_SESSION['uname']); ?> isimli müþterimizin yeni iþ giriþi
<form action="addjobrow.php" method="POST"><table border="1"><tbody>
<tr><td align="right">Marka:</td><td><select name="brand_id">
<?php
# ***** This is the connection to the server *****
$link = mysql_connect('localhost', 'root', 'bismillah'); if (!$link) die("Couldn't connect to MySQL: " . mysql_error());
# ***** This is the connection to the database *****
if (!mysql_select_db('ele')) die("Couldn't open database: " . mysql_error());
# ***** This is the connection to the table *****
$result=mysql_query("SELECT * FROM tblBrands"); if (!$result) die('<p>Error performing query: ' . mysql_error());
while ($row=mysql_fetch_array($result)) echo('<option value="' . $row['id'] . '">' . $row['brand'] . '</option>');
mysql_close($link);
?>
</select></td></tr>
<tr><td align="right">Model:</td><td><INPUT type="text" name="model" size="32"></td></tr>
<tr><td align="right">Seri No:</td><td><INPUT type="text" name="serial" size="32"></td></tr>
<tr><td align="right">Batarya:</td><td><INPUT type="text" name="battery" size="32"></td></tr>
<tr><td align="right" valign="top">Þikayet:</td><td><textarea name="complaint" cols="32" rows="4"></textarea></td></tr>
<tr><td align="right" valign="top">Kargo bilgisi:</td><td><textarea name="deliveryinfo" cols="32" rows="4"></textarea></td></tr>
<tr><td></td><td align="right"><INPUT type="reset" name="resetjob" value="Temizle">&nbsp;<INPUT type="submit" name="submitjob" value="Onayla"></td></tr>
</tbody></table></form>
<p><b>AddJob page rendered succesfully!
</body></html>
