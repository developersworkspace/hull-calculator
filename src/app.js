var co = require('co');
var co_prompt = require('co-prompt');


co(function* () {
//   var loa = yield co_prompt('Enter the LOA (Length overall): ');
//   var lwl = yield co_prompt('Enter the LWL (Length at the waterline): ');
//   var beam = yield co_prompt('Enter the Beam: ');
//   var depth = yield co_prompt('Enter the Depth: ');
//   var numberOfStruts = yield co_prompt('Enter the Number of Struts: ');


var loa = '11.43';
var lwl = '11.43';
var beam = '1.8';
var depth = '2.05';
var numberOfStruts = '3';


var topArcRadius = calculateRadiusOfAnArc(parseFloat(beam) / 2, parseFloat(loa));
var bottomArcRadius = calculateRadiusOfAnArc(parseFloat(beam) / 2 * 0.80, parseFloat(lwl));
var structs = [0, 0, 0];

var topStructsSpacing = parseFloat(loa) / (parseInt(numberOfStruts) + 2);
var bottomStructsSpacing = parseFloat(lwl) / (parseInt(numberOfStruts) + 2);

return {
    arcRadius: topArcRadius,
    topStructs: structs.map((x, i) => {
        return calculateHeightOfAnArcAtAnyPoint(parseFloat(beam) / 2, topArcRadius, (topStructsSpacing * i))
    }),
    bottomStructs: structs.map((x, i) => {
        return calculateHeightOfAnArcAtAnyPoint(parseFloat(beam) / 2 * 0.80, bottomArcRadius, (bottomStructsSpacing * i))
    })
};

}).then((result) => {
    console.log(result);
    process.exit(0);
});


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
