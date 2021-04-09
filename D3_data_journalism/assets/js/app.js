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
var svgHeight=680
var svgWidth=720

// create margin variable for easy reference
var margin = {
    top: 30, 
    right: 30,
    bottom: 30,
    left: 30
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

// create chart group for easy formatting all at once
var chartGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

// read csv
d3.csv("assets/data/data.csv").then(censusData=>{
    // console.log(censusData);
    // map age to an array, parseint
    // var ageArray=censusData.map(one_element=>one_element.age=+one_element.age)
    censusData.forEach(function(data) {
        data.age = +data.age;
        // data.ageMoe = +data.ageMoe;
        data.poverty = +data.poverty;
        // data.povertyMoe = +data.povertyMoe;
        // data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        // data.incomeMoe= +data.incomeMoe;
        data.healthcare = +data.healthcare;
        // data.healthcareMoe = + data.healthcareMoe;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    })
    console.log(censusData)
    // console.log("age array:")
    // console.log(ageArray);
    // var healthcareArray=censusData.map(one_element=>one_element.healthcare=+one_element.healthcare)
    // console.log('healthcare array')
    // console.log(healthcareArray)

    // console.log(censusData);
    var stateCodes=censusData.map(one_element=>one_element.abbr)
    console.log(stateCodes);
    // create scales
    var yScale=d3.scaleLinear()
                    .domain([0, d3.max(censusData, d => d.healthcare)])
                    .range([chartHeight, 0])

    var xScale=d3.scaleLinear()
                    .domain([20, d3.max(censusData, d=> d.age)]) //change to a greater min?
                    .range([0, chartWidth])

    // create axes using scales
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);
    
    // append a circle to the svg for each datapoint
    //circles have:
        //cx -> age
        //cy -> healthcare
        //r
        //data
        // how to put text in an element? this one does not show up
    chartGroup.selectAll("circle")
            .data(censusData)
            .enter()
            // .append('g')
            .append('circle')
            .classed('stateCircle', true)
            .attr('cx', d=>xScale(d.age))
            .attr('cy', d=>yScale(d.healthcare))
            .attr('r', 10)

    chartGroup.selectAll(".stateText")
        .data(censusData)
        .enter()
        // .append('g')
        .append('text')
        .text(d=>d.abbr)
        .classed('stateText', true)
        .attr('x', d=>xScale(d.age))
        .attr('y', d=>yScale(d.healthcare))

    // create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left +5))
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("padding", 0.1)
      .attr("class", "axisText")
      .text("% with no healthcare");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom})`)
      .attr("class", "axisText")
      .text("Age");
// trying out putting text in an eelemnt
    // var elem = svg.selectAll("g")
    //               .data(censusData)
    // var elemEnter = elem.enter()
    //                     .append("g")
    //                     .attr("transform", d=>"translate("+d.age+","+d.healthcare))
    // var circle = elemEnter.append("circle")
    //                       .classed('stateCircle', true)
    //                       .attr('cx', d=>xScale(d.age))
    //                       .attr('cy', d=>yScale(d.healthcare))
    //                       .attr('r', 10)
                        
});