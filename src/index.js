// https://en.wikipedia.org/wiki/Circular_segment
function calculateRadiusOfAnArc(h, c) {
    var r = (h / 2) + (Math.pow(c, 2) / (8 * h));

    return r;
}

// http://www.liutaiomottola.com/formulae/sag.htm
function calculateHeightOfAnArcAtAnyPoint(s, r, x) {
    var h = s + Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2)) - r;

    return {
        x: x,
        h: h
    };
}

function toPixels(n, f) {
    return parseInt(Math.round(n * 10000) / 10000 * f);
}



var loa = 11.43 * 0.53;
var lwl = 11.43 * 0.53;
var beam = 1.8 * 0.53;
var depth = 2.05 * 0.53;
var numberOfStruts = 5;

var topArcRadius = calculateRadiusOfAnArc(beam / 2, loa);
var bottomArcRadius = calculateRadiusOfAnArc(beam / 2 * 0.80, lwl);
var structs = [0, 0, 0, 0, 0];

var topStructsSpacing = loa / (numberOfStruts + 1);
var bottomStructsSpacing = lwl / (numberOfStruts + 1);

var topStructs = structs.map((x, i) => {
    let y = (topStructsSpacing * i) - (topStructsSpacing * ((numberOfStruts - 1) / 2));
    return calculateHeightOfAnArcAtAnyPoint(beam / 2, topArcRadius, y);
});

var bottomStructs = structs.map((x, i) => {
    let y = (bottomStructsSpacing * i) - (bottomStructsSpacing * ((numberOfStruts - 1) / 2));
    return calculateHeightOfAnArcAtAnyPoint(beam / 2 * 0.80, bottomArcRadius, y);
});


var height = 900;

var factor = parseInt(height / loa);

var width = parseInt(beam * factor);

var topSvg = d3.select("body")
    .append("svg")
    .attr("width", width + 20)
    .attr("height", height + 20)
    .append("g")
    .attr("transform", "translate(" + 10 + "," + 10 + ")");


topSvg.append("line")
    .style("stroke", "black")
    .attr("x1", toPixels(beam / 2, factor))
    .attr("y1", 0)
    .attr("x2", toPixels(beam / 2, factor))
    .attr("y2", toPixels(loa, factor));


for (let i = 0; i < topStructs.length; i++) {
    topSvg.append("line")
        .style("stroke", "black")
        .attr("x1", toPixels((beam / 2) - topStructs[i].h, factor))
        .attr("y1", toPixels(topStructs[i].x + (loa / 2), factor))
        .attr("x2", toPixels(topStructs[i].h + (beam / 2), factor))
        .attr("y2", toPixels(topStructs[i].x + (loa / 2), factor));
}



var bottomSvg = d3.select("body")
    .append("svg")
    .attr("width", width + 20)
    .attr("height", height + 20)
    .append("g")
    .attr("transform", "translate(" + 10 + "," + 10 + ")");


bottomSvg.append("line")
    .style("stroke", "black")
    .attr("x1", toPixels(beam / 2, factor))
    .attr("y1", 0)
    .attr("x2", toPixels(beam / 2, factor))
    .attr("y2", toPixels(lwl, factor));


for (let i = 0; i < bottomStructs.length; i++) {
    bottomSvg.append("line")
        .style("stroke", "black")
        .attr("x1", toPixels((beam / 2) - bottomStructs[i].h, factor))
        .attr("y1", toPixels(bottomStructs[i].x + (lwl / 2), factor))
        .attr("x2", toPixels(bottomStructs[i].h + (beam / 2), factor))
        .attr("y2", toPixels(bottomStructs[i].x + (lwl / 2), factor));
}


for (let i = 0; i < topStructs.length; i++) {
    var strutSvg = d3.select("body")
        .append("svg")
        .attr("width", width + 20)
        .attr("height", height + 20)
        .append("g")
        .attr("transform", "translate(" + 10 + "," + 10 + ")");

    strutSvg.append("line")
        .style("stroke", "black")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", toPixels(topStructs[i].h * 2, factor))
        .attr("y2", 0);

    strutSvg.append("line")
        .style("stroke", "black")
        .attr("x1", toPixels(topStructs[i].h - bottomStructs[i].h, factor))
        .attr("y1", toPixels(depth, factor))
        .attr("x2", toPixels((topStructs[i].h - bottomStructs[i].h) + (bottomStructs[i].h * 2), factor))
        .attr("y2", toPixels(depth, factor));


    strutSvg.append("line")
        .style("stroke", "black")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", toPixels(topStructs[i].h - bottomStructs[i].h, factor))
        .attr("y2", toPixels(depth, factor));


    strutSvg.append("line")
        .style("stroke", "black")
        .attr("x1", toPixels(topStructs[i].h * 2, factor))
        .attr("y1", 0)
        .attr("x2", toPixels((topStructs[i].h - bottomStructs[i].h) + (bottomStructs[i].h * 2), factor))
        .attr("y2", toPixels(depth, factor));


}



// var arc = d3.svg.arc()
//     .innerRadius(69)
//     .outerRadius(70)
//     .startAngle(0)
//     .endAngle(2 * Math.PI);

// svg.append("path")
//     .attr("class", "arc")
//     .attr("d", arc);;
