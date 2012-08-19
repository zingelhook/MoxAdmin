
		<h1>
			Sales Data Example
		</h1>
		<div>
		
			<div id="salestable"></div>
			<div id="holder"></div>
		</div>
		<div class="description">
			<h2>How it works</h2>
			<ul>
				<li><a herf="">Create the Schema for the Mock Service.</a></li>
			</ul>
		
		</div>
		<script type="text/javascript">
		
		//samle - used on tour
		CORE.create_module("sample-SalesData",
		function(sb) {
		    var base_url;
		    function buildTable(data) {

		        var legends = new Array();
		        var sales = new Array();
		        var length = data.length;
		        for (var i = 0; i < length; i++) {
		            sales.push(parseInt(data[i].sales, 10));
		            legends.push(data[i].product);
		        }

			    // Creates canvas 640 ◊ 480 at 10, 50
			    var r = new Raphael('holder');

			    r.g.txtattr.font = "12px 'Fontin Sans', Fontin-Sans, sans-serif";

			    //r.g.text(180, 100, "Sales Data").attr({ "font-size": 20 });

			    var pie = r.g.piechart(280, 120, 100, sales, { legend: legends, legendpos: "west", href: ["http://raphaeljs.com", "http://g.raphaeljs.com"] });
		        pie.hover(function() {
		            this.sector.stop();
		            this.sector.scale(1.1, 1.1, this.cx, this.cy);
		            if (this.label) {
		                this.label[0].stop();
		                this.label[0].scale(1.5);
		                this.label[1].attr({ "font-weight": 600 });
		            }
		        }, function() {
		            this.sector.animate({ scale: [1, 1, this.cx, this.cy] }, 500, "bounce");
		            if (this.label) {
		                this.label[0].animate({ scale: 1 }, 500, "bounce");
		                this.label[1].attr({ "font-weight": 200 });
		            }
		        });



		        var table = document.createElement("table");
		        $(table).attr('id', 'salesReport');
		        var tableHeader = document.createElement("thead");

		        var thDate = document.createElement("th");
		        $(thDate).html('Product');
		        tableHeader.appendChild(thDate);

		        var thBR = document.createElement("th");
		        $(thBR).html('Sales');
		        tableHeader.appendChild(thBR);

		        table.appendChild(tableHeader);

		        var tableBody = document.createElement("tbody");
		        var len = data.length;

		        for (var i = 0; i < len; i++) {
		            var row = document.createElement("tr");

		            var tdproduct = document.createElement("td");
		            $(tdproduct).html(data[i].product);
		            row.appendChild(tdproduct);

		            var tdsales = document.createElement("td");
		            $(tdsales).html(data[i].sales);
		            $(tdsales).addClass('qty');
		            row.appendChild(tdsales);

		            tableBody.appendChild(row);
		        }
		        table.appendChild(tableBody);
		        $('#salestable').html(table);

		    }


		    function loadSampleData() {
//http://24.171.26.35/
		        $.ajax({
		            type: 'GET',
		            dataType: 'jsonp',
		            jsonpCallback: "moxsvc",
		            url: "http://localhost:8000?id=1",
		            success: function(data) {
		                //console.dir(data);
		                buildTable(data);
		                //console.dir(data);
		            },
		            error: function(e) {
		                console.log('Error!');
		                console.dir(e);
		            }
		        });
		    }
		    return {
		        init: function() {
		            base_url = $('#base').val();

		            $('#reload').click(function() {

		                loadSampleData();
		            });

		            loadSampleData();

		        },
		        destroy: function() {

		        },
		        openLogin: function() {
		        }

		    };
		});

		</script>