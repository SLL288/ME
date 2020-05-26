function showwindow(x){
    console.log(x);
}

function layersetmap(layer,keylayer,map){
    for (i = 0; i< layer.length; i ++){
        layer[i].setMap(map);
        new google.maps.event.addListener(layer[i], 'click', function(){
            console.log(keylayer[i])
        }(this));
    }
}

var usermarkerstatus = false;

function addmarker(){
    if (usermarkerstatus === false){
        usermarker(map);
        usermarkerstatus = true;
    }else{
        usermarker(null);
        usermarkerstatus = false;
    }
}

function usermarker(map){
    google.maps.event.addListener(map, 'click', function(event) {
    console.log(event.latLng.value);
    console.log(event.latLng[lat]); 
    placemarker(map,event.latLng);
    // placeMarker(event.latLng);
    });
}


function placemarker(map,location){
    var iconsize = 25;
    var clickicon = {url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    scaledSize: new google.maps.Size(iconsize,iconsize), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(iconsize/2, iconsize/2) // anchor
                    };
                    
    var marker = new google.maps.Marker({
        position: location, 
        map: map,
        icon:clickicon
    });
}

function sendchat(){
    var content = document.getElementById('message').value;
    var initial = document.getElementById('inital').value;
    console.log(initial,content);
    var dataString = "content=" + content +"&initial=" + initial;
    if (content === '') {
    alert("Please Fill in Message");
    }else{
        $.ajax({
        type: "POST",
        url: "sendchat.php",
        data: dataString,
        cache: false,
        success: function(data) {
            // alert(data);
            // console.log(data);
            // window.data1 = data;
            // chatshow(data);
            chatreceive();
            // return ("<hr class='solid'>" + data + "<br>");
        }
    
        });
    }    
}

function chatshow(message){
    document.getElementById('chatcontent').innerHTML = message;

}
function chatreceive(){
    $.ajax({
        type: "POST",
        url: "chatdisplay.php",
        // data: dataString,
        cache: false,
        success: function(data) {
            // alert(data);
            // console.log(data);
            // window.data1 = data;
            chatshow(data);
            // return ("<hr class='solid'>" + data + "<br>");
        }

    });

}

function showit(tempdata){
    // return("<hr class='solid'>" + tempdata + "<br>");
    document.getElementById('abc').innerHTML = "<hr class='solid'>Comments:<br>" + tempdata;
}

function displaydatabase(number){
    console.log("seraching for notes of Number: ", number)
    var dataString = "number1=" + number;
    // var data1="no comments for " + number;
    $.ajax({
        type: "POST",
        url: "search.php",
        data: dataString,
        cache: false,
        success: function(data) {
            // alert(data);
            // console.log(data);
            // window.data1 = data;
            showit(data);
            // return ("<hr class='solid'>" + data + "<br>");
        }

    });
    // return "<hr class='solid'>" + dataString + "<br>";
}

function submitform(x){
    var note = document.getElementById('note1').value;
    console.log(number);
    var dataString = 'note1=' + note + '&number1=' + number;
    if (note === '') {
        alert("Please Fill Note Field");
    }else{
        $.ajax({
            type: "POST",
            url: "test.php",
            data: dataString,
            cache: false,
            success: function(html) {
                // alert(html);
                displaydatabase(number);
                // showit("Submitted, Please refresh ... ...");
            }
        });
    }
    return false;
}

function infoContent(x){
    window.number = x[0];
    displaydatabase(x[0]);
    var info = (
    "<form method='post' name='noteform' id='noteform'>" +
    "<h2>Point Information<h2>" + 
    "<h3>Number: "+x[0]+"<br>"+
    utilityIdentify(x[1]) +"<br>" +
    "Date:  " + x[5].split('T')[0] + "<br>" +
    "Time:  " + x[5].split('T')[1] + "<br><hr class='solid'>" +
    "UTM Coordinates <br> " + 
    "Northing:  " + readcoords(x[6])[0] + " m<br>" +
    "Easting:   " + readcoords(x[6])[1]  + " m<br>" +
    "Height:    " + readcoords(x[6])[2] + " m<br>" +
    "<hr class='solid'> Geographic Coordinates" + "<br>" +
    "Latitude:  " + String(x[2]).substr(0,String(x[2]).indexOf('.') +7) + "<br>" + 
    "Longitude: " + String(x[3]).substr(0,String(x[3]).indexOf('.') +7) + "<br>" +
    "Ellipsoidal Height:  "+x[4] + " m<br></h3>" + "<p id='abc'></p>"+
    "<input type='text' id='note1' placeholder='add comments'> <input id='submit' type='button' value='submit' onclick='submitform(x)'> </form> "

    );
    // displaydatabase(x[0]);
    console.log(x[0]);
    // console.log(note);
    
    // $("#noteform").submit(function(){
    //     var number = $("#x[0]").val();
    //     console.log(x[1]);
        
    //     $.ajax({
    //         type:"POST",
    //         url:"test.php",
    //         data:'number=' + number,
    //         success:function(data){
    //             alert("successfull");
                
    //         }
    //     });
    // });
    return info;
}

function setpointlayermarker(ck,point,pointmarker){
    if(ck.checked){
        setpointmarker(point,pointmarker,map);
        markersetmap(point,pointmarker,map);
    }else{
        markersetmap(point,pointmarker,null);
    }     
}

function setpointmarker(point,pointmarker,map){
    var iconsize = pointrange.value*5;
    var localdot = {url: "./img/dot.png",
                    scaledSize: new google.maps.Size(iconsize,iconsize), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(iconsize/2, iconsize/2) // anchor
                    };
    for (i = 0; i < point.length; i++) {
    pointmarker[i] = new google.maps.Marker({
                                position: new google.maps.LatLng(point[i][2], point[i][3]),
                                // map: map,
                                icon: localdot,
                                });
    }
}


function markersetmap(points,layer,map){
    for (i = 0; i< layer.length; i ++){
        layer[i].setMap(map);
        
        // if (substr(layer,0,6) == "marker"){

        new google.maps.event.addListener(
        layer[i],
        'click',
        (function(markerex, i) {
            return function() {
            infowindow.setContent(infoContent(points[i]));
            infowindow.open(map, markerex);
            // console.log(markerex);
            }
        })(layer[i], i));  
        

    }
    // new google.maps.event.addListener(map,'onClick',function(){
    // closeinfo();
    // });
}// end of set points layer set


function identify(code,list){
    if (code.substr(0,5) == "BCUNK" || code.substr(0,4) == "BPSA" || code.substr(0,4) == "BPST" || 
    code.substr(0,3) =="BPW" || code.substr(0,4) == "BPGD" || code.substr(0,3) == "BCC" || 
    code.substr(0,3) == "BCE" || code.substr(0,3) == "BPO"){
        utilities.push(list);
    }else if(code.substr(0,3) == "SVB" || code.substr(0,3) == "VLW" || code.substr(0,2) == "VL" || code.substr(0,3) == "VLG"){
        svb.push(list);
    }else if (code.substr(0,3) == "SWK" || code.substr(0,3) == "LDN" || code.substr(0,2) == "PV" ||
    code.substr(0,3) == "SVB" || code.substr(0,3) == "GTL" || code.substr(0,2) == "GR"){
        roadfeatures.push(list);    
    }else if (code.substr(0,3) == "GND"){
        gnd.push(list);
    }else if (code.substr(0,3) == "CUL"){
        culvert.push(list);
    }else if (code.substr(0,3) == "SNP" || code.substr(0,2) == "SI" || code.substr(0,3) == "SSS" || 
    code.substr(0,2) == "SP" || code.substr(0,3) == "SBS"){
        sign.push(list);
    }else if (code.substr(0,3) == "MHD" || code.substr(0,3) == "MHS" || code.substr(0,2) == "MH"){
        mh.push(list);
    }else if (code.substr(0,3) == "PHT"){
        photo.push(list);
    }else{
        terrain.push(list);
    }
}

// <?php echo $_SERVER['PHP_SELF'];?>
// <?php 

//<?php
  //  $host="localhost";      
//    $username="id12934641_allen"; 
 //   $password="allen"; 
  //  $db_name="id12934641_allenshare"; 
//    $tbl_name="comments";
    
    // mysqli_connect("$host", "$username", "$password")or die(mysqli_error($conn)); 
  //  $conn = new mysqli($host, $username, $password, $db_name);
    
//    if ($conn->connect_error) {
 //       die("Connection failed: " . $conn->connect_error);
  //  } 
//    echo "Database Connection Connected successfully";
 //   date_default_timezone_set("America/Vancouver");
    
 //   $date = date("Y-m-d h:i:sa");
  //  echo $date;
    
//    $sql = "INSERT INTO comments (number, note, time) VALUES ('123123', 'this is new note odsinfafjaioefaoisneasdilfjoignar', '$date')";
//    if (mysqli_query($conn, $sql)) {
 //       echo "New record created successfully";
  //  } else {
//        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
 //       echo "<br>";
  //      echo mysqli_error($conn);
//    }
    
 
    
    
 //   $conn->close();

//?>

// addatabase();



// layersetmap(layerBCE,keyBCE,map);
// layersetmap(layerBCUNK,keyBCUNK,map);
// layersetmap(layerBPSA,keyBPSA,map);
// layersetmap(layerBPGD,keyBPGD,map);
// layersetmap(layerBPW,keyBPW,map);
// layersetmap(layerBPST,keyBPST,map);
// layersetmap(layerBCC,keyBCC,map);
// layersetmap(layerBPO,keyBPO,map);
// layersetmap(layerTOPO,keyTOPO,map);


function layerTOPOdisplay(){
    if (ck9.checked){
        layersetmap(layerTOPO,keyTOPO,map);

    }else{
        layersetmap(layerTOPO,keyTOPO,null);

    };
};
function layerBPOdisplay(){
    if (ck7.checked){
        layersetmap(layerBPO,keyBPO,map);

    }else{
        layersetmap(layerBPO,keyBPO,null);

    };
};
function layerBCCdisplay(){
    if (ck2.checked){
        layersetmap(layerBCC,keyBCC,map);

    }else{
        layersetmap(layerBCC,keyBCC,null);

    };
};
function layerBPSTdisplay(){
    if (ck3.checked){
        layersetmap(layerBPST,keyBPST,map);

    }else{
        layersetmap(layerBPST,keyBPST,null);

    };
};
function layerBPWdisplay(){
    if (ck5.checked){
        layersetmap(layerBPW,keyBPW,map);

    }else{
        layersetmap(layerBPW,keyBPW,null);

    };
};
function layerBPGDdisplay(){
    if (ck6.checked){
        layersetmap(layerBPGD,keyBPGD,map);

    }else{
        layersetmap(layerBPGD,keyBPGD,null);

    };
};
function layerBPSAdisplay(){
    if (ck4.checked){        layersetmap(layerBPSA,keyBPSA,map);

    }else{        layersetmap(layerBPSA,keyBPSA,null);

    };
};
function layerBCUNKdisplay(){
    if (ck8.checked){        layersetmap(layerBCUNK,keyBCUNK,map);

    }else{
        layersetmap(layerBCUNK,keyBCUNK,null);
        // delete linelistener;
    };
};

function layerBCEdisplay(){
    if (ck1.checked){
        // console.log('checked');  
        layersetmap(layerBCE,keyBCE,map);

    }else{
        layersetmap(layerBCE,keyBCE,null);
        // layerremoveListener(layerBCE);
        // listenerHandle.remove();
        // google.maps.event.clearListeners(layerBCE, 'listenerHandle');
    };
}

function setpoints(){
    if (ckpt.checked){
        setmarker();
        markersetmap(totalpoints,marker,map); 
    }else{
        markersetmap(totalpoints,marker,null); 
    }

}





function setcurrent(lat,lng){
    var iconsize = 30;
    var currentdot = {
        url: "./img/bluedot.png",
        scaledSize: new google.maps.Size(iconsize,iconsize), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(iconsize/2, iconsize/2) // anchor  
    }
    var current = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        icon:currentdot,
    });
    current.setMap(map);
}



function setmarker(){
    var iconsize = pointrange.value*5;
    var localdot = {url: "./img/dot.png",
                    scaledSize: new google.maps.Size(iconsize,iconsize), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(iconsize/2, iconsize/2) // anchor
                    };
    for (i = 0; i < totalpoints.length; i++) {
    
    marker[i] = new google.maps.Marker({
                                position: new google.maps.LatLng(totalpoints[i][2], totalpoints[i][3]),
                                // map: map,
                                icon: localdot,
                                });
    
    }
}




// console.log(infoContent(totalpoints[100]));


// console.log(totalpoints[100][2].substr(0,totalpoints[100][2].indexOf('.') + 7));
function readcoords(coords){
    var str = coords.textContent;

    str = str.split(' ');
    // console.log(str[0]);
    // var N = str.substr(0,index);
    // var E = str.substr(index,index+1);
    // var H = str.substr(index+1, index+2);
    return str;
}


function layerremoveListener(layer){
    for (i = 0; i < layer.length; i ++){
        google.maps.event.removeListener(listenerHandle);
    };
};


function utilityIdentify(key){
    if (key.substr(0,5)=="BCUNK"){
        return("Unknown Feature Line: \n\n" + key);
    }else if (key.substr(0,4)=="BPSA"){
        return("Buried Pipe Sanitary Line:\n\n" + key);
    }else if (key.substr(0,4)=="BPGD"){
        return("Buried Pipe Gas Distribution:\n\n " + key);
    }else if (key.substr(0,4)=='BPST' || key.substr(0,4)=='PBST'){
        return("Buried Pipe Sanitary Line: \n\n" + key);
    }else if (key.substr(0,3)=="BPO"){
        return("Buried Pipe Oil Line: \n\n" + key);
    }else if (key.substr(0,3)=="BPW"){
        return("Buried Pipe Water Line:\n\n " + key);
    }else if (key.substr(0,3)=="BCE"){
        return("Buried Power/Electricity Cable:\n\n " + key);
    }else if (key.substr(0,3)=="BCC"){
        return("Buried Communication Cable:\n\n " + key);
    }else if (key.substr(0,3)=="DTC"){
        return("Ditch: \n\n" + key);
    }else if (key.substr(0,3)=="GTL"){
        return("Gutter Line: \n\n" + key);
    }else if (key.substr(0,2)=="PV"){
        return("Pavement Edge: \n\n" + key);
    }else if (key.substr(0,2)=="SD"){
        return("Seasonal Drainage:\n\n " + key);
    }else if (key.substr(0,3)=="PLY"){
        return("Yellow Paint Line: \n\n" + key);
    }else if (key.substr(0,3)=="SVB"){
        return("Service Box: \n\n" + key);
    }else if (key.substr(0,2)=="TC"){
        return("Curb:\n\n " + key);
    }else if (key.substr(0,2)=="BK"){
        return("Terrain Break Line:\n\n " + key);
    }else if (key.substr(0,2)=="TB"){
        return("Top of Bank: \n\n" + key);
    }else if (key.substr(0,2)=="BB"){
        return("Bottom of Bank: \n\n" + key);
    }else if (key.substr(0,3)=="GND"){
        return("Ground Shot: \n\n" + key);
    }else if (key.substr(0,3)=="SSS"){
        return("Stop Sign: \n\n" + key);
    }else if (key.substr(0,3)=="SNP"){
        return("No Parking Sign: \n\n" + key);
    }else if (key.substr(0,3)=="SBS"){
        return("Bus Stop: \n\n" + key);
    }else if (key.substr(0,3)=="CUL"){
        return("Culvert: \n\n" + key);
    }else if (key.substr(0,3)=="SWK"){
        return("SideWalk: \n\n" + key);
    }else if (key.substr(0,2)=="GR"){
        return("Gravel Edge: \n\n" + key);
    }else if (key.substr(0,2)=="SI"){
        return("Speed Limit Sign: \n\n" + key);
    }else if (key.substr(0,3)=="POL"){
        return("Pole: \n\n" + key);
    }else if (key.substr(0,5)=="POLHY"){
        return("Power Post: \n\n" + key);
    }else if (key.substr(0,2)=="AP"){
        return("Air Pipe: \n\n" + key);
    }else if (key.substr(0,3)=="CUL"){
        return("Culvert: \n\n" + key);
    }else if (key.substr(0,2)=="MH"){
        return("Manhole: \n\n" + key);
    }else if (key.substr(0,3)=="MHD"){
        return("Storm Manhole: \n\n" + key);
    }else if (key.substr(0,3)=="MHS"){
        return("Sanitary Manhole: \n\n" + key);
    }else if (key.substr(0,3)=="LPS"){
        return("Standard Lamp Stand: \n\n" + key);
    }else if (key.substr(0,3)=="VLG"){
        return("Gas Valve: \n\n" + key);
    }else if (key.substr(0,3)=="VLW"){
        return("Water Valve: \n\n" + key);
    }else if (key.substr(0,3)=="MRG"){
        return("Gas Marker: \n\n" + key);
    }else if (key.substr(0,3)=="CBR"){
        return("Round Catch Basin: \n\n" + key);
    }else if (key.substr(0,3)=="CBT"){
        return("Catch Basin(from top): \n\n" + key);
    }else if (key.substr(0,3)=="CHK"){
        return("Check Point: \n\n" + key);
    }{return("Type: \n\n" + key)};
};


// export {infoContent()};