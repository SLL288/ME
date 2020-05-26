
//initial points lines list and x y xml documents.
let api = "AIzaSyDO5rRUBi-Z0xTIog8BNnnDVrSeYI1oKH4";

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
        // var coords = x[i].getElementsByTagName('CgPoint');
        // var North = (x[i].childNodes[0]).substr(0,str.indexOf(' '));
        // var East = x[i].childNodes[0].substr(str.indexOf(' ')+1);
        // var Ht = ""
        var UTM = x[i].childNodes[0];
        // console.log(str);
        var templist = [name, code, lat, lng, ht, time, UTM];
        identify(String(code),templist);
        // console.log(templist);
        points.push(templist);
        // (templist);
        totalpoints.push(templist);
        // txt += x[i].getAttribute('name') + " " + x[i].getAttribute('code')+ " " 
        // + x[i].getAttribute('latitude')+ " " + x[i].getAttribute('longitude')+ " " 
        // + x[i].getAttribute('ellipsoidHeight')+"<br>";
    };
    // console.log(points);
    // console.log(pointindex);
    pointindex = getCol(points,0);
    
    for (i = 0; i < y.length; i++){
        var name = y[i].getAttribute('name');
        // console.log();
        // var linecode = name.substr(0,-4);
        
        while (name in totallines){
            var linecode = name.toString();
            // console.log(linecode.slice(0,-1) + (parseInt(linecode.slice(-1)) + 1));
            name = linecode.slice(0,-1) + (parseInt(linecode.slice(-1)) + 1);
            // console.log(parseInt(linecode.slice(-1)) + 1);
           // console.log(name[-1]);
            //name = name.substr(0,-1) + (parseInt(name[-1]) + 1).toString();
            //console.log(name);
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

// document.getElementById("demo").innerHTML = points; 
// document.getElementById("new points").innerHTML = points; 
// console.log(points);
// console.log(pointindex.indexOf("41607"));
files = [
        // "KLTP-DATA",
        "200406 AL L14",
        "200407 AL L14",
        "200408 AL L13",
        "200409 AL L12",
        "200331 AL L18",
        "200401 AL",
        "200402 AL L16",
        "200330ALL212019",
        "200327 AL S6",
        "200326 AL S7",
        "200325 AL C87B8",
        "200324 AL C8 C13",
        "200323 AL S4 S3",
        "200320 AL S4",
        "200319 AL S4",
        "200318 AL S4",
        "200317 AL S4",
        "200316 AL S3",
        "200313 AL S3",
        "200312 AL S3",
        "200311 AL S3",
        "200309 AL S3",
        "200306 AL S3",
        "200305 AL S3",
        "200304 AL L9 L6",
        "200303 AL L7",
        "200302 AL L7",
        "200228 AL L3458",
        "200227 AL L2",
        "200226 AL C3",
        "200225 AL C3",
        "200224 AL C3",
        "200221 AL C3",
        "200220 AL C3",
        ];

for (x in files){
    try{
        loadxml(files[x]);
        // console.log(files[x] + "successfully loaded!")
    }catch{
        // console.log(files[x] + " cannot be loaded");
    };
};
// loadxml("200317 AL S4",x,y);
// loadxml("200316 AL S3",x,y);
// loadxml("200313 AL S3",x,y);
// loadxml("200312 AL S3",x,y);
// loadxml("200311 AL S3",x,y);
// // loadxml("200310 AL S3 ",x,y);
// loadxml("200309 AL S3",x,y);

// loadxml("200306 AL S3",x,y);
// loadxml("200305 AL S3",x,y);
// loadxml("200304 AL L9 L6",x,y);
// loadxml("200303 AL L7",x,y);
// loadxml("200302 AL L7",x,y);

// loadxml("200228 AL L3458",x,y);
// loadxml("200227 AL L2",x,y);
// loadxml("200226 AL C3",x,y);
// loadxml("200225 AL C3",x,y);
// loadxml("200224 AL C3",x,y);

// loadxml("200221 AL C3",x,y);
// loadxml("200220 AL C3",x,y);



//loop or read all files in ./xmlfiles/ folder
// const testFolder = './xmlfiles/';
// const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file); // use those file and return it as a REST API
//     loadxml(file,x,y);
//   });
// })

// console.log(Object.keys(lines));
// console.log(Object.keys(lines).length);
// console.log(totalpoints,totallines);


