
<h1>Service Log</h1>

<div id="serviceLog">
<?php

if (isset($servicelogs)) {
	echo "<table id='tblsvcLog' class='log'>";
	echo "<thead>";
	echo "<tr><th>Date</th><th>User</<th><th>Service</th><th>User-Agent</th>";
	echo "</thead>";
	echo "<tbody>";
	foreach ($servicelogs as $row)
	   {
		$id = $row->id;
		print "<tr><tr><td>" . $row->logDate . "</td>";
		echo "<td>";
		echo $row->user;
		echo "</td><td>";
		echo $row->serviceId;
		echo "</td><td>";
		echo $row->userAgent;
		echo "</td></tr>";
		

	   }
	echo "</tbody></table>";
}
else{
	echo "is NOT set";
}

?>
</div>


