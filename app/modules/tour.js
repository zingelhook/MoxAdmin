(function(Tour) {
    var shared = Suds.module("shared");
    Tour.Model = Backbone.Model.extend({});
    Tour.Collection = Backbone.Collection.extend({});
    Tour.Router = Backbone.Router.extend({});


    /*-------------MODELS-------------------*/

    Tour.Model.SalesDataItem = Backbone.Model.extend({
        defaults: {
            "pager_number": 1
        }
    });

    Tour.Model.SalesDataItems = Backbone.Collection.extend({
        model: Tour.Model.SalesDataItem,
        loadData: function(callback, failcallback) {
			var url = Suds.app.externalMoxURL + "?id=1";

            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: "moxsvc",
                url: Suds.app.externalMoxURL + "?id=1",
                success: function(data) {
                    if (callback) {
                        callback(data);
                    }
                },
                error: function(e) {
                    console.log('Error!');
                    console.dir(e);
                }
            });
        }
    });


    /*-------------VIEWS-------------------*/
    Tour.Views.Main = Backbone.View.extend({
        template: "app/templates/tour.html",

        render: function(done) {

            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
                view.loadSalesData();
            });
        },
        loadSalesData: function() {
            var sd = new Tour.Model.SalesDataItems();
            var callback = function(data) {
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

                    var pie = r.g.piechart(210, 120, 100, sales, {
                        legend: legends,
                        legendpos: "west",
                        href: ["http://raphaeljs.com", "http://g.raphaeljs.com"]
                    });
                    pie.hover(function() {
                        this.sector.stop();
                        this.sector.scale(1.1, 1.1, this.cx, this.cy);
                        if (this.label) {
                            this.label[0].stop();
                            this.label[0].scale(1.5);
                            this.label[1].attr({
                                "font-weight": 600
                            });
                        }
                    }, function() {
                        this.sector.animate({
                            scale: [1, 1, this.cx, this.cy]
                        }, 500, "bounce");
                        if (this.label) {
                            this.label[0].animate({
                                scale: 1
                            }, 500, "bounce");
                            this.label[1].attr({
                                "font-weight": 200
                            });
                        }
                    });


                    var table = document.createElement("table");
                    $(table).attr('id', 'salesReport');
                    $(table).addClass('table table-striped');
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
            sd.loadData(callback);
        }
    });

})(Suds.module("tour"));