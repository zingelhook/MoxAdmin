<div id="dashboard">
	<h1>My Mocks</h1>
		<a href="<?php echo base_url();?>index.php/addservice" id="addService">Add Service</a>
	<?php

	if (isset($mymocks)) {
		echo "<table id='tblMocks'>";
		echo "<thead>";
		echo "<tr><th></th><th>Name</th><th>Min-Max</th></tr>";
		echo "</thead>";
		echo "<tbody>";
		foreach ($mymocks as $row)
		   {
			$id = $row->id;
			print "<tr><td><a href='" . base_url() . "index.php/mock?mockid=". $id . "' class='edit-field' title='Edit Service'>Edit</a><a href='#' rel='deleteMock_". $id. " class='delete-field deleteMock'>Delete</a></td>";
			echo "<td><a href='" . base_url() . "index.php/mock?mockid=". $id . "'  title='Edit Service'>" . $row->name . "</a>";
			echo "</td><td>";
			echo $row->min;
			echo "-";
			echo $row->max;
			echo " random rows</td></tr>";
			
		   }
		echo "</tbody></table>";
	}
	else{
		echo "is NOT set";
	}

	?>
</div>