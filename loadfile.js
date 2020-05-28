
//initial points lines list and x y xml documents.

var totalpoints = [], totallines= {}; 
var terrain = [];
var gnd = [];
var roadfeatures = [];
var svb = [];
var utilities = [];
var culvert = [];
var sign = [];
var mh = [];
var photo = [];



function getCol(matrix, col){
   var column = [];
   for(var i=0; i<matrix.length; i++){
      column.push(matrix[i][col]);
   }
   return column;
};


//load xml files function
function loadxml(filename){
    var xmlhttp, xmlDoc, points=[],lines={};
    var txt = "";
    var pointindex = [];
    var x,y;
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "./xmlfiles/"+filename+".xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    
    x = xmlDoc.getElementsByTagName('CgPoint');
    y = xmlDoc.getElementsByTagName('PlanFeature');
    // console.log(x.getElementsByTagName('CgPoint'));
    
    for (i = 0; i < x.length; i++) { 
        var name = x[i].getAttribute('name');
        var code = x[i].getAttribute('code');
        var lat = x[i].getAttribute('latitude');
        var lng = x[i].getAttribute('longitude');
        var ht = x[i].getAttribute('ellipsoidHeight');
        var time = x[i].getAttribute('timeStamp');

        var UTM = x[i].childNodes[0];
        // console.log(str);
        var templist = [name, code, lat, lng, ht, time, UTM];
        identify(String(code),templist);
        // console.log(templist);
        points.push(templist);
        // (templist);
        totalpoints.push(templist);

    };

    pointindex = getCol(points,0);
    
    for (i = 0; i < y.length; i++){
        var name = y[i].getAttribute('name');
        // console.log();
        // var linecode = name.substr(0,-4);
        
        while (name in totallines){
            var linecode = name.toString();
            name = linecode.slice(0,-1) + (parseInt(linecode.slice(-1)) + 1);
        };
        
        var start = y[i].getElementsByTagName('Start');
        var end = y[i].getElementsByTagName('End');
        // console.log(start,start[0],(start[0] == null),(start==null));
    
        
        if (end[0] != null){
            var linework = [];
            var startpoint = start[0].getAttribute('pntRef');
    
            var idx = pointindex.indexOf(startpoint);
            linework = [[points[idx][2],points[idx][3]]];
            // console.log(startpoint);
            var end = y[i].getElementsByTagName('End');
    
            for (j = 0; j < end.length; j++){
                var endpoint = end[j].getAttribute('pntRef');
                // linework.push(endpoint);
                idx = pointindex.indexOf(endpoint);
                linework.push([points[idx][2],points[idx][3]]);
                // console.log(endpoint);
            };
            totallines[name]= linework;
        };
    
    
    };
    delete x,y,txt,xmlhttp, xmlDoc;
};


files = [
        // "KLTP-DATA",
        "YOUR XML FILES",
        ];

for (x in files){
    try{
        loadxml(files[x]);
        // console.log(files[x] + "successfully loaded!")
    }catch{
        // console.log(files[x] + " cannot be loaded");
    };
};
