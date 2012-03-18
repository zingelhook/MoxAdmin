

<?php



if (isset($mock)) {
	foreach ($mock as $row)
	{
		$name = $row->name;
		$min= $row->min;
		$max=$row->max;
		$id=$row->id;
	
	}

	echo '<h1>'. $name . '</h1>';
	echo '<div id="mock-operations"><span class="left-button"><a href="#" id="exposeMoxFrm">Edit</a></span><span class="right-button"><a href="#" id="addField">Add Field</a></span></div><div id="editMox" style="display:none"><fieldset><legend>Edit Mock</legend>';
	echo '<div class="form-row"><label for="mockName">Name:</label>';
	echo '<input type="text" id="mockName" name="mockName" value="'. $name .'" /></div>';
	echo '<input type="hidden" id="mockId" name="mockId" value="'. $id .'"/>';
	echo '<div class="form-row"><label for="mockMin">Min Rows:</label>';
	echo '<input type="text" id="mockMin" name="mockMin" value="'. $min .'" /></div>';
	
	
	echo '<div class="form-row"><label for="mockMax">Max Rows:</label>';
	echo '<input type="text" id="mockMax" name="mockMax" value="'. $max .'" /></div>';
	
	
	echo '<div class="form-row">';
	echo '<input type="button" id="submitMox"  value="Update" /></div>';

	echo '</fieldset></div>';
}
else{
	echo "mock is NOT set";
}



if (isset($mockFields)) {

	echo "<table id='tblMocks'>";
	echo "<thead>";
	echo "<tr><th></th><th>Name</th><th>Sample Data Type</th></tr>";
	echo "</thead>";
	echo "<tbody>";
	foreach ($mockFields as $row)
	   {
		//$fieldIdid = $row->id;
		$typeId = $row->typeId;
		
		print "<tr id='tr_" .$row->id. "'><td>";
		print "<input type='hidden' id='predefinedId_" .$row->id. "' value='" .$row->predefinedSampleDataId."'/>";
		print "<input type='hidden' id='name_" .$row->id. "' value='" .$row->name."'/>";
		print "<input type='hidden' id='options_" .$row->id. "' value='" .$row->fieldoptions."'/>";
		print "<input type='hidden' id='sample_" .$row->id. "' value='" .$row->sampleData."'/>";
		print "<a href='#' rel='" .$row->id. "' class='edit-field' title='Edit Field'>Edit</a><a href='#' rel='" .$row->id. "' class='delete-field' title='Delete Field'>Delete</a></td>";

		echo "<td>". $row->name ;
		echo "</td><td>";
		echo $row->predefefinedSampleDataType;

		echo "</td></tr>";
		
 
	   }
	echo "</tbody></table><div id='editform' style='display:none;'></div>";
}
else{
	echo "is NOT set";
}


?>

