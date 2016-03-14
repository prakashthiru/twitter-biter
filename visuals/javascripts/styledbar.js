var margin = {top: 20, right: 40, bottom: 20, left: 20},
    divWidth = 500
    divHeight = 300

var xScale = d3.scale.linear()
                .range([0, divWidth]);

var yScale = d3.scale.ordinal()
                .rangeRoundBands([0, divHeight], 0.8);

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
                  .tickSize(0);

d3.json("data/styledbar.json", function(error,data) {

  var dataset = d3.entries(data);

  var xMax = d3.max(dataset, function(d) { return d.value; });
  xScale.domain([0, xMax+xMax*0.2]);
  yScale.domain(dataset.map(function(d) { return d.key; }));

  var yRangebandHalf = yScale.rangeBand()/2;

  var svgContainer = d3.select('body')
              .append("svg")
                .attr("width", divWidth + margin.left + margin.right)
                .attr("height", divHeight + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("class", 'container-g');

  var yAxisLine = svgContainer.append("g")
                .attr("class", "active-user-y-axis")
                .call(yAxis);

  var yAxisText = yAxisLine.selectAll("text")
                .attr("y", -(yScale.rangeBand()*2));

  var bar = svgContainer.selectAll(".bar")
              .data(dataset)
              .enter().append("g")
                .attr("class", "active-user-bar")
                .attr("transform", function(d) { return "translate(0," + yScale(d.key) + ")"; });
              
  var backBar = bar.append("rect")
                .attr("class", "active-user-back-bar")
                .attr("width", divWidth)
                .attr("height", yScale.rangeBand()+yRangebandHalf)
                .attr("rx", yRangebandHalf)
                .attr("ry", yRangebandHalf);

  var frontBar = bar.append("rect")
                .attr("class", "active-user-front-bar")
                .attr("width", function(d) { return xScale(d.value); })
                .attr("height", yScale.rangeBand())
                .attr("transform", function(d) { return "translate(" + divWidth*0.01 + "," + yRangebandHalf/2 + ")"; })
                .attr("rx", yRangebandHalf)
                .attr("ry", yRangebandHalf)

  var barText = bar.append("text")
                .attr("class", "active-user-bar-text")
                .attr("text-anchor", "end")
                .attr("x", divWidth + divWidth*0.1)
                .attr("y", yScale.rangeBand())
                .attr("alignment-baseline", "middle")
                .text(function(d) { return d.value});
});