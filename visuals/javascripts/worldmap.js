var width = 960,
  height = 500;

var projection = d3.geo.mercator()
  .center([0, 0 ])
  .scale(200)
  .rotate([-180,0]);

var path = d3.geo.path()
  .projection(projection);

var svgContainer = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var chart = svgContainer.append("g");

// load and display the World
d3.json("data/world-110m.json", function(error, topology) {
  // load and display the cities
  d3.json("data/overall_trend.json", function(error, data) {
    var tags = chart.selectAll("text")
    data.forEach(function(element, id){
      tags.data(element.trend)
        .enter()
        .append("text")
        .attr("x", function(d) { return projection([d.longitude, d.latitude])[0]; })
        .attr("y", function(d) { return projection([d.longitude, d.latitude])[1]; })
        .text(element.tag)
        .style("fill", "blue")
    })
  });
  chart.selectAll("path")
    .data(topojson.feature(topology, topology.objects.countries)
        .features)
    .enter()
    .append("path")
    .attr("d", path)
});

// // zoom and pan
// var zoom = d3.behavior.zoom()
//   .on("zoom",function() {
//       g.attr("transform","translate("+ 
//           d3.event.translate.join(",")+")scale("+d3.event.scale+")");
//       g.selectAll("circle")
//           .attr("d", path.projection(projection));
//       g.selectAll("path")  
//           .attr("d", path.projection(projection)); 

//   });

// svgContainer.call(zoom);