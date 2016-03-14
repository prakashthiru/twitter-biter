tagCloud();

function tagCloud() {

  var div_id = 'tag-cloud';
  var scaleSet = {};

  var divWidth = $('#' + div_id).width();
  var divHeight = $('#' + div_id).height();

  assignData(plotWords);
  
  function assignData(callback) {
    d3.json("data/personal_word_cloud.json", function(error, data) {
      var dataset = d3.entries(data);

      dataset.sort(function(a,b){ return d3.descending(a.value, b.value); })

      var counts = dataset.map(function (d) { return d.value });
      scaleSet.sizeScale = d3.scale.linear().range([10, 50]).domain(d3.extent(counts));
      scaleSet.opacityScale = d3.scale.linear().range([0.5, 1]).domain(d3.extent(counts));

      d3.layout.cloud()
        .size([divWidth, divHeight])
        .words(dataset)
        .padding(5)
        .rotate(0)
        .fontSize(function(d) { return scaleSet.sizeScale(d.value); })
        .text(function (d) { return d.key})
        .padding(5)
        .on("end", callback)
        .start();
    });
  }

  function plotWords(words) {

    d3.select('#' + div_id + ' svg').remove();
    var svgContainer = d3.select('#' + div_id).append("svg")
        .attr("width", divWidth)
        .attr("height", divHeight)
        .append("g")
        .attr("transform", 'translate(' + divWidth*0.5 + ',' + divHeight*0.5 + ')')
        .attr('class', 'container-g')

    var cloudTags = svgContainer.selectAll("text")
        .data(words)
        .enter().append("text");

    cloudTags.style("font-size", function(d){ return d.size + "px"; })
        .style("fill", "#5A5A5A" )
        .style("opacity", function(d) { return scaleSet.opacityScale(d.value); })
        .attr("text-anchor", "middle")
        .transition().duration(500)
        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
        .text(function(d) { return d.text; });
  }
}