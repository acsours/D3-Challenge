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
    var ageArray=censusData.map(one_element=>one_element.age=+one_element.age)
    // console.log("age array:")
    // console.log(ageArray);
    var healthcareArray=censusData.map(one_element=>one_element.healthcare=+one_element.healthcare)
    // console.log('healthcare array')
    // console.log(healthcareArray)

    // console.log(censusData);
    var stateCodes=censusData.map(one_element=>one_element.abbr)
    console.log(stateCodes);
    // create scales
    var yScale=d3.scaleLinear()
                    .domain([0, d3.max(healthcareArray)])
                    .range([chartHeight, 0])

    var xScale=d3.scaleLinear()
                    .domain([20, d3.max(ageArray)]) //change to a greater min?
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
        //data(?)
    chartGroup.selectAll("circle")
            .data(censusData)
            .enter()
            // .append('g')
            .append('circle')
            .classed('stateCircle', true)
            .attr('cx', d=>xScale(d.age))
            .attr('cy', d=>yScale(d.healthcare))
            .attr('r', 10)
            .append("text")
            .classed('stateText',true)
            .text(d=>d.abbr)
            .attr('x', d=>xScale(d.age))
            .attr('y', d=>yScale(d.healthcare))
            // .attr('fill', 'white')
            
});