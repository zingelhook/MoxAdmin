<h1>Documentation</h1>



<uL class="linkList">
	<li>
		<a href="http://www.flickr.com/photos/iluvrhinestones/5889370258/">Flowchart to help with your cross domain decisions</a>
	</li>
	<li>
		<a href="<?php echo base_url();?>index.php/tour">Examples</a>
	</li>
</ul>

<div id="fields" class="doc-h2">
	<h2>Fields</h2>
	<div id="options" class="doc-h3">
		<h3>Options</h3>
		<p>
		You can add options to the field to manipulate the data. 
		</p>
		<table class="doc-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Predefined Types</th>
					<th>Description</th>
					<th>Example</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>length</td>
					<td>number</td>
					<td>Constrains the field length, as string.</td>
					<td>{"length":"15"}</td>
				</tr>
				<tr>
					<td>prepend</td>
					<td>All</td>
					<td>Prepends the value to the random data.</td>
					<td>{"prepend":"To the front of the string-"}</td>
				</tr>
				<tr>
					<td>append</td>
					<td>All</td>
					<td>Appends the value to the random data.</td>
					<td>{"append":"-to the end of string"}</td>
				</tr>
				<tr>
					<td>format</td>
					<td>date</td>
					<td>formats the date string.</td>
					<td>{"format":"mm/dd/yyy"}</td>
				</tr>
			</tbody>
		</table>

	</div>
</div>