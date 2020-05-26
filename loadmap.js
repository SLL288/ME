// console.log(pointrange.value);
// import * as mymodule from './config.js';

var map;
window.currentlat = "49.191523";
window.currentlng = "-122.739568";
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 49.191523, lng: -122.739568},
    // center: {lat: currentlat, lng: currentlng},
//   49.191523, -122.739568
// center: {lat: 49.19, lng: -122.8},
  zoom: 12,
  mapTypeId: 'hybrid',
    scaleControl: true,

//   'roadmap' //basic 2D map
//   TERRAIN //basic 2D map with terrain feature
//   google.maps.MapTypeId.HYBRID,//satellite with road names
//   'satellite', //satellite image only
  });
 



window.infowindow = new google.maps.InfoWindow({});

// function closeinfo(){
//     window.infowindow.close();
//     console.log("close function")
// }
window.close = new google.maps.event.addListener(map, 'click', function(){
    infowindow.close();    
});

window.marker = [];
window.gndmarker = [];
window.utilitiesmarker = [];
window.roadfeaturesmarker = [];
window.svbmarker = [];
window.terrainmarker = [];
window.culvertmarker = [];
window.mhmarker = [];
window.signmarker = [];
window.photomarker = [];



// setpointmarker(gnd,gndmarker,map);
// markersetmap(gnd,gndmarker,map);
// console.log(gndmarker);
// var setcurrentLocation();


var latlong = setcurrentLocation();
// console.log(setcurrentLocation());
// setcurrent(currentlat,currentlng);




// delete totalpoints

//lines display
var lineskey = Object.keys(totallines);
var polyline, j;

//layer list 9 IN TOTAL
window.layerBCE = [];
window.layerBCC = [];
window.layerBPST = [];
window.layerBPSA = [];
window.layerBPO = [];
window.layerBPW = [];
window.layerTOPO = [];
window.layerBCUNK = [];
window.layerBPGD = [];
window.keyBCE = [];
window.keyBCC = [];
window.keyBPST = [];
window.keyBPSA = [];
window.keyBPO = [];
window.keyBPW = [];
window.keyTOPO = [];
window.keyBCUNK = [];
window.keyBPGD = [];

for (j = 0; j< lineskey.length; j++){
    var key = lineskey[j];
    var value = totallines[key];
    // console.log(key);
    var linepath = [];
    for (k = 0; k<value.length; k++){
        linepath.push(new google.maps.LatLng(value[k][0],value[k][1]));
    }
    // console.log(linepath);
    
    //SET 9 LINES IN DIFFERETN COLOUR AND STORE THEM IN LAYER(LIST)
    var linecolor="#000000";
    if (key.substr(0,5)=="BCUNK"){
        linecolor = "#E339D1";
        addpolyline(layerBCUNK,linepath,linecolor,keyBCUNK,key);
    }else if (key.substr(0,4)=="BPSA" || key.substr(0,4)=="PBSA" ){
        linecolor = "#44AA0A";
        addpolyline(layerBPSA,linepath,linecolor,keyBPSA,key);
    }else if(key.substr(0,4)=="BPST" || key.substr(0,4)=="PBST"){
        linecolor =  "#5EFC03";
        addpolyline(layerBPST,linepath,linecolor,keyBPST,key);
    }else if(key.substr(0,4)=="BPGD"){
        linecolor =  "#F4F405";
        addpolyline(layerBPGD,linepath,linecolor,keyBPGD,key);
    }else if(key.substr(0,3)=="BPW"){
        linecolor =  "#0648F9";
        addpolyline(layerBPW,linepath,linecolor,keyBPW,key);
    }else if(key.substr(0,3)=="BCC"){
        linecolor =  "#F07C07";
        addpolyline(layerBCC,linepath,linecolor,keyBCC,key);
    }else if(key.substr(0,3)=="BCE"){
        linecolor =  "#FF0000";
        addpolyline(layerBCE,linepath,linecolor,keyBCE,key);
    }else if(key.substr(0,3)=="BPO"){
        linecolor =  "#FFFFFF";
        addpolyline(layerBPO,linepath,linecolor,keyBPO,key);
    }else if(key.substr(0,3)=="DTC"){
        linecolor =  "#AEACAC";
        addpolyline(layerTOPO,linepath,linecolor,keyTOPO,key);
    }else if(key.substr(0,2)=="SD"){
        linecolor =  "#AEACAC";
        addpolyline(layerTOPO,linepath,linecolor,keyTOPO,key);
    }else{
        addpolyline(layerTOPO,linepath,linecolor,keyTOPO,key);
    }
 
}

function addpolyline(layer,linepath,linecolor,layerkey,keyname){
    var id = layer.length;
    // console.log(id);
    layer.push( 
        id = new google.maps.Polyline({path: linepath,strokeColor: linecolor,strokeOpacity: 1.0,
        strokeWeigh: 3})
    );
    layerkey.push(keyname);
    
    // layer[layerid] = new google.maps.Polyline({path: linepath,strokeColor: linecolor,strokeOpacity: 1.0,
    //     strokeWeigh: 3})
    // id += 1;
}




var legend = document.getElementById('legend');

var linecode={
        "Electricity Cable": "#FF0000" ,
        "Communication Cable": "#F07C07",
        "Gas Distribution": "#F4F405",
        "Storm": "#5EFC03",   
        "Sanitary": "#44AA0A", 
        "Water Distribution": "#0648F9",
        "Ditch/Seasonal Drainage": "#AEACAC", 
        "Oil Line": "#FFFFFF",
        "Unknown": "#E339D1",
        "Road/Terrain feature":"#000000", 

        };
        


var div = document.createElement('div');
div.innerHTML = '<img src="/img/dot.png" width=10px height=10px>' + " Observation Point";
legend.appendChild(div);

var layerbutton = document.getElementById('layerbutton');
// map.controls[google.maps.ControlPosition.TOP_RIGHT].push(layerbutton);
var legendbutton = document.getElementById('legendbutton');
// map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legendbutton);
var buttons = document.getElementById('buttons');
buttons.appendChild(layerbutton);
buttons.appendChild(legendbutton);
map.controls[google.maps.ControlPosition.TOP_RIGHT].push(buttons);

// chat and setcurrent button add map position
var currentbutton = document.getElementById('currentbutton');
map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(currentbutton);
var chatdiv = document.getElementById('chat');
map.controls[google.maps.ControlPosition.LEFT_TOP].push(chatdiv);

var layerdiv = document.getElementById('layers');
map.controls[google.maps.ControlPosition.LEFT_TOP].push(layerdiv);

var ab = document.getElementById('ab');
ab.appendChild(layerdiv);
ab.appendChild(chatdiv);
ab.appendChild(legend);
map.controls[google.maps.ControlPosition.LEFT_TOP].push(ab);

for (var feature in linecode){
    var div1 = document.createElement('div');
    div1.innerHTML = '<span style="color:' + linecode[feature] + '">' + "-" +" " + feature + '</span>';
    // console.log('<span style="color:' + linecode[feature] + '">' + "-" +" " + feature + '</span>');
    legend.appendChild(div1);
    delete div1;
};


map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

delete linecode;


setpoints();
// setgnd(map);


//5 point features


setpointlayermarker(ckgnd,gnd,gndmarker);
setpointlayermarker(ckuti,utilities,utilitiesmarker);
setpointlayermarker(cksvb,svb,svbmarker);
setpointlayermarker(ckter,terrain,terrainmarker);
setpointlayermarker(ckroa,roadfeatures,roadfeaturesmarker);
setpointlayermarker(ckcul,culvert,culvertmarker);
setpointlayermarker(ckmh,mh,mhmarker);
setpointlayermarker(cksign,sign,signmarker);
setpointlayermarker(ckpht,photo,photomarker);

//9 line features
layerBCEdisplay();
layerBCCdisplay();
layerBPSTdisplay();
layerBPSAdisplay();
layerBPWdisplay();
layerBPGDdisplay();
layerBPOdisplay();
layerBCUNKdisplay();
layerTOPOdisplay();

// delete layerBCE,layerBCC,layerBPST,layerBPSA,layerBPO,layerBPW,layerTOPO,layerBCUNK,layerBPGD;
// delete keyBCE,keyBCUNK,keyBPSA,keyBPGD,keyBPW,keyBPST,keyBCC,keyBPO,keyTOPO;
// delete marker;
};//end of initMap()

function setcurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            window.currentlat = position.coords.latitude;
            window.currentlng = position.coords.longitude;
            console.log(currentlat,currentlng);
            setcurrent(currentlat,currentlng);
        });
    }else{
        window.currentlat = "49.191523";
        window.currentlng = "-122.739568";
    };
// return currentlat,currentlat;
};

function centercurrent() {
    // setcurrentLocation();
    var latlong = currentlat+","+currentlng;
    console.log("function " + latlong);
    map.setOptions({
        center:{lat:currentlat, lng:currentlng},
        zoom: 20
    });
    // var newmap = new google.maps.Map(document.getElementById('map'), {
    //     setCenter: currentlat+","+currentlng;
    //     map: map,
    //     zoom:15,
    // });
};


