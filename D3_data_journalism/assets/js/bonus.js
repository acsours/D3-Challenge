// @TODO: YOUR CODE HERE!
// healthcare(%) vs age(median)
// x -> age in state
// y -> lacks healthcare(%)
// create svg
// create scales
// create axes
// save the variables to an array each
// append a circle to the svg for each datapoint

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

// console.log(chartHeight);
// console.log(chartWidth);

// append an svg to the html 
var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth)
            .attr("class", "chart")

// create chart group for easy formatting all at once
var chartGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

//Initial Params
var chosenXAxis = "age";

var chosenYAxis = "obesity";


//function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) {
  //create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
      d3.max(censusData, d =>d[chosenXAxis]) * 1.2
    ])
    .range([0, chartWidth]);
  
  return xLinearScale;
}

//function for updating xAxis var when you click axis label
function renderXAxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  
  return xAxis;
}

//**************************** All New */
//function used for updating y-scale var upon click on axis label
function yScale(censusData, chosenYAxis) {
  //create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
      d3.max(censusData, d =>d[chosenYAxis]) * 1.2
    ])
    .range([chartHeight,0]);
  
  return yLinearScale;
}

function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);


  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
  
}

//*****************************/


//update circles group with a transition to new circles
function renderXCircles(circleGroup, newXScale, chosenXAxis) {

  circleGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    // .attr("cy", d => newYScale(d[chosenYAxis]));

  return circleGroup;
}
function renderYCircles(circleGroup, newYScale, chosenYAxis) {

  circleGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circleGroup;
}
// //update circle group with new tooltip
// function updateToolTip(chosenXAxis, chosenYAxis, circleGroup) {
//   var label;

//   if (chosenXAxis === "age") {
//     label = "Age:";
//   } else if (chosenXAxis === "poverty"){
//     label = "In Poverty (%):";
//   } else  {
//     label = "Household Income (Median): ";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circleGroup.call(toolTip);

//   circleGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     //onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//     return circleGroup;
//   }

// read csv
d3.csv("assets/data/data.csv").then(function(censusData, err) {
  if (err) throw err;
    // console.log(censusData);
    // map age to an array, parseint
    // var ageArray=censusData.map(one_element=>one_element.age=+one_element.age)
  censusData.forEach(function(data) {
      data.age = +data.age;
      data.poverty = +data.poverty;
      data.income = +data.income;
      data.healthcare = +data.healthcare;
      data.obesity = +data.obesity;
      data.smokes = +data.smokes;
  });

  //xLinearScale fucntion above csv import
  var xLinearScale = xScale(censusData, chosenXAxis);

  //create y scale 
  var yLinearScale = yScale(censusData, chosenYAxis);

  //create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //append x axis

  var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

  var yAxis = chartGroup.append("g")
                .call(leftAxis);
    
    // append a circle to the svg for each datapoint
  var circleGroup = chartGroup.selectAll("null")
                      .data(censusData)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xLinearScale(d[chosenXAxis]))
                      .attr("cy", d => yLinearScale(d[chosenYAxis]))
                      .attr("r", "15")
                      .attr("fill", "blue")      
                      .attr("class", "stateCircle");    


  //create group for two x-axis labels
  var xLabelsGroup = chartGroup.append('g')
                              .attr("transform", `translate(${chartWidth/2}, ${chartHeight + 20})`);
  
  var povertyLabel = xLabelsGroup.append("text")
                                  .attr("x", 0)
                                  .attr("y", 20)
                                  .attr("value", "poverty")
                                  .classed("active", true)
                                  .text("In Poverty (%)");

  var ageLabel = xLabelsGroup.append("text")
                              .attr("x", 0)
                              .attr("y", 40)
                              .attr("value", "age")
                              .classed("inactive", true)
                              .text("Age (Median)");

  var incomeLabel = xLabelsGroup.append("text")
                                .attr("x", 0)
                                .attr("y", 60)
                                .attr("value", "income")
                                .classed("inactive", true)
                                .text("Household Income (Median)");

  //append y labels
  var yLabelsGroup = chartGroup.append("g")
                    .attr("transform", "rotate(-90)")
                    // .attr("y", 0 - (margin.left)+40)
                    // .attr("x", 0 - (svgHeight / 2))
                    // .attr("dy", "1em")
                    // .attr("padding", 0.1)
                    // .attr("class", "axisText")
                              // .attr("transform", `translate(${0-(margin.left+10)},0`)
                              // .attr("y", 0-margin.left)
                              // .attr("x", 0-(chartHeight/2))
                              // .attr("dy", "1em")
                              // .classed("aText", true)


  var obesityLabel = yLabelsGroup.append("text")
                                  .attr("y", 0 - (margin.left)+40)
                                  .attr("x", 0 - (chartHeight / 2))
                                  .attr("value", "obesity")
                                  .classed("active", true)
                                  .text("Obese (%)");

  var smokerLabel = yLabelsGroup.append("text")
                            .attr("y", 0 - (margin.left)+20)
                            .attr("x", 0 - (chartHeight / 2))
                            .attr("value", "smokes")
                            .classed("inactive", true)
                            .text("Smokes (%)");

  var healthcareLabel = yLabelsGroup.append("text")
                              .attr("y", 0 - (margin.left)+60)
                              .attr("x", 0 - (chartHeight / 2))
                              .attr("value", "healthcare")
                              .classed("inactive", true)
                              .text("Lacks Healthcare (%)");

  //updateToolTip function above import
  // var circleGroup = updateToolTip(chosenXAxis, circleGroup);

  //x axis labels event listener
  xLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(censusData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxis(xLinearScale, xAxis);
        
        // updates circles with new x values
        circleGroup = renderXCircles(circleGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        // circleGroup = updateToolTip(chosenXAxis, circleGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "age") {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "age") {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", true)
            .classed("inactive", false);
        } 
      }
    })
      //x axis labels event listener
  yLabelsGroup.selectAll("text")
  .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

      // replaces chosenXAxis with value
      chosenYAxis = value;

      // console.log(chosenXAxis)

      // functions here found above csv import
      // updates x scale for new data
      yLinearScale = yScale(censusData, chosenYAxis);

      // updates x axis with transition
      yAxis = renderYAxis(yLinearScale, yAxis);
      
      // updates circles with new x values
      circleGroup = renderCircles(circleGroup, yLinearScale, chosenYAxis);

      // updates tooltips with new info
      // circleGroup = updateToolTip(chosenYAxis, circleGroup);
    }
  })  

});
