var totalWidth = 500;
var totalHeight = 600;

var margin = {
  top: 20,
  left: 50,
  bottom: 30,
  right: 30
};

var sourcesImg = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/768px-Facebook_logo_36x36.svg.png",
  "https://www.slowmedicine.com.br/wp-content/uploads/2016/10/twitter-logo-vector-png-free.png",
  "http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c521.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Youtube_icon.svg/1024px-Youtube_icon.svg.png",
  "https://images.vexels.com/media/users/3/137418/isolated/preview/f95d43a9a4f5e0cd4a0b6e79cc99d190-tumblr-icon-logo-by-vexels.png",
  "https://4vector.com/i/free-vector-blog-this-icon-clip-art_117022_Blog_This_Icon_clip_art_medium.png"
];

var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;

var formatDecimal = d3.format(",.0f");

// DATA STUFF

var theData = [];

for (var i = 0; i < 10; i++) {
  var item = {
    radius: Math.random() * 0.2,
    cx: Math.random() * 10,
    cy: Math.random() * 10
  };
  theData.push(item);
}

var realData = [];

for (var i = 0; i < 10; i++) {
  var item = {
    radius: Math.random() * 0.2,
    cx: Math.random() * 10,
    cy: Math.random() * 10
  };
  realData.push(item);
}

// SIZE SCALE
var sizeDomain = d3.extent(theData, function(d) {
  return d.radius;
});

var sizeRange = [10, 20];

var sizeScale = d3
  .scaleLinear()
  .domain(sizeDomain)
  .range(sizeRange);

// X SCALE
var xDomain = d3.extent(theData, function(d) {
  return d.cx;
});

var xRange = [0, width];
var xPadding = d3.mean(theData, function(d) {
  return d.cx;
});
var xScale = d3
  .scaleLinear()
  .domain(xDomain)
  .range(xRange)
  .nice(10);

// Y SCALE
var yDomain = d3.extent(theData, function(d) {
  return d.cy;
});
var yRange = [height, 0];
var yScale = d3
  .scaleLinear()
  .domain(yDomain)
  .range(yRange)
  .nice(5);

// COLOR SCALE
var colorDomain = d3.extent(theData, function(d) {
  return d.radius;
});

var colors = [
  "#fd3259",
  "#595bd4",
  "#167ffc",
  "#3cabdb",
  "#53d86a",
  "#ffcb2f",
  "#fe9526",
  "#fd3d39"
];

// Do not include a domain
var color = d3.scaleOrdinal().range(colors);

var xAxis = d3
  .axisBottom(xScale)
  //.ticks(10)
  .tickSize(6)
  .tickSizeInner(-height);

var yAxis = d3
  .axisLeft(yScale)
  .ticks(5)
  .tickSizeInner(-width);

// SVG GROUP HIERARCHY

var svg = d3
  .select(".scatterplot")
  .append("svg")
  .attr("id", "scatterplot")
  .attr("width", totalWidth)
  .attr("height", totalHeight);
//.style( "background-color", "hsl(0, 0%, 100%)" )
//.style( "border", "dashed 1px gray" );

var mainGroup = svg
  .append("g")
  .attr("id", "mainGroup")
  .attr("transform", "translate( " + margin.left + ", " + margin.top + ")");

var xAxisGroup = mainGroup
  .append("g")
  .attr("id", "xaxis")
  .attr("class", "axis")
  .attr("transform", "translate( 0," + height + ")")
  .call(function customXAxis(g) {
    g.call(xAxis);
    //g.select(".domain").remove();
    //g.selectAll(".tick:not(:first-of-type) line"). // selects all tick lines except first
    g
      .selectAll(".tick:not(:first-of-type) line")
      .attr("stroke", "#777")
      .attr("stroke-dasharray", "3,2");

    g.selectAll(".tick text").attr("y", 9);
  });

var yAxisGroup = mainGroup
  .append("g")
  .attr("id", "yaxis")
  .attr("class", "axis")
  .call(function customYAxis(g) {
    g.call(yAxis);
    //g.select(".domain").remove();
    g
      .selectAll(".tick:not(:first-of-type) line")
      .attr("stroke", "#777")
      .attr("stroke-dasharray", "3,2");
    g.selectAll(".tick text").attr("x", -9);
  });

var eventGroup = mainGroup.append("g").attr("id", "event-overlay");

var eventRect = eventGroup.append("rect");

var canvasGroup = eventGroup.append("g").attr("id", "circleGroup");

canvasGroup
  .selectAll("circle")
  .data(theData)
  .enter()

  .append("circle")
  .attr("cx", function(d) {
    return xScale(d.cx + 10);
  })
  .attr("cy", function(d) {
    return yScale(d.cy + 10);
  })
  .attr("r", function(d) {
    return sizeScale(sizeDomain[0]);
  })
  .style("fill", function(d) {
    return color(d.radius);
  })
  .style("opacity", .5)
 .attr("r", function(d) {
    return 5;
  })

  .transition()
  .duration(2000)
.attr("cy", function(d) {
    return yScale(d.cy );
  })
  .attr("cx", function(d) {
    return xScale(d.cx );
  })
.transition()
  .duration(800)


 .style("opacity", 1)
 .attr("r", function(d) {
    return sizeScale(d.radius + .2)
  })
.transition()
  .duration(500)
 .attr("r", function(d) {
    return sizeScale(d.radius)
  });

 var cg = $("#circleGroup").children();

setTimeout(function(){

  setTimeout(function(){ $(".scatterplot-info img").attr("src", `${sourcesImg[0]}`);
$(".scatterplot-info-metrics h2").html("Total Contribution");
$(".scatterplot-info-metrics h1").html(`50%`); }, 500);


d3
  .select(cg[0])
  .attr("class", "pulse")
  .style("-webkit-animation-delay", "1s");
  var pColor = $(cg[0]).css("fill");
  $(".pulse").css("stroke", pColor);
  $(".pulse").css("fill", pColor);
var i = 0;
var j = 1;
setInterval(function() {
  d3.select(cg[i]).classed("pulse", false);
  i++;

  d3
    .select(cg[i])
    .attr("class", "pulse")
    .style("-webkit-animation-delay", ".1s");
  var pColor = $(cg[i]).css("fill");
  $(".pulse").css("stroke", pColor);
  $(".pulse").css("fill", pColor);
  var percent = Math.floor(Math.random() * 50) + 10;

  $(".scatterplot-info img").attr("src", `${sourcesImg[j]}`);
  $(".scatterplot-info-metrics h1").html(`${percent}%`);

  if (i == theData.length) {
    i = 0;
  }
  j++;
  if (j == sourcesImg.length) {
    j = 0;
  }
  console.log(j);
}, 4000);


}, 4000);
