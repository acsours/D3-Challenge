
//create variables for SVG chart dimensions for easy use
var svgHeight=600 //500
var svgWidth= 1000//720 //1000
//could 

// create margin variable for easy reference
var margin = {
    top: 20, 
    right: 40,
    bottom: 80,
    left: 100
};

// find chartsize using above ref
var chartHeight=svgHeight-margin.top-margin.bottom;
var chartWidth=svgWidth-margin.left-margin.right;


// append an svg to the html 
var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth)
            .attr("class", "chart")

// create chart group for easy formatting all at once
var chartGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

// read csv
d3.csv("assets/data/data.csv").then(censusData=>{
    censusData.forEach(function(data) {
        //parse age and healthcare as integers
        data.age = +data.age;
        data.healthcare = +data.healthcare;

    })
    console.log(censusData)

    // create scales
    var yScale=d3.scaleLinear()
                    .domain([3, d3.max(censusData, d => d.healthcare)])
                    .range([chartHeight, 0])

    var xScale=d3.scaleLinear()
                    .domain([28, d3.max(censusData, d=> d.age)]) //change to a greater min?
                    .range([0, chartWidth])

    // create axes using scales
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    //append axes and call. 
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);
    
    // append a circle to the svg for each datapoint
    var circleGroup = chartGroup.selectAll("null")
                        .data(censusData)
                        .enter()
                        .append("circle")
                        .attr("cx", d => xScale(d.age))
                        .attr("cy", d => yScale(d.healthcare))
                        .attr("r", "20")
                        .attr("fill", "blue")      
                        .attr("class", "stateCircle");    

    //append text to the svg (not circles)
    var stateAbbr = chartGroup.selectAll(null)
        .data(censusData)
        .enter()
        .append("text");

    stateAbbr
        .attr("x", function (d) {
        return xScale(d.age);
        })
        .attr("y", function (d) {
        return yScale(d.healthcare) + 4
        })
        .text(function (d) {
        return d.abbr;
        })
        .attr("class", "stateText")
        .attr("font-size", "9px");


    // create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left)+40)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("padding", 0.1)
      .attr("class", "aText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom-30})`)
      .attr("class", "aText")
      .text("Age");

    // create tool cip
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([50, 70])
      .html(function (data) {
        var theState = "<div>" + data.state + "</div>";
        var theX = "<div>Age: " + data.age + "%</div>";
        var theY = "<div>Healthcare: " + data.healthcare + "%</div>";
        //return (`${tp.state}`);
        return theState + theX + theY;
      });
  
    chartGroup.call(toolTip);
  
    //apply mouseover event and mouseout event to data for tooltip.
    circleGroup.on("mouseover", function (data) {
      toolTip.show(data, this);
    })
      //mouseout
      .on("mouseout", function (data) {
        toolTip.hide(data);
      });
                        
}).catch(function (error) {
    console.log(error);
  });