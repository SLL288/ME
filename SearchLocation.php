<?php


$config = parse_ini_file('RMcred.ini');

// $number = $_POST['number'];
$number = strval($_POST['number1']);
// echo $number;
// $number = 123123;
// echo $number;
// echo "agj niojf dskjf dofjao;g";
// echo "start sql requesting from database ... ...";

$conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    // echo "error";
    echo "Connection error";
} 
else{
    // echo "conn successful";
}

// $sql = "SELECT time,note
//         FROM comments
//         WHERE number =".$number;
        
$sqlrm = "SELECT * FROM RM";

$result = $conn->query($sqlrm);

if (!$result){
    echo "NO result!";
}else{
    
    $resultarray = array();
    $temparray = array();
    
    while($row = $result->fetch_array()){
    // echo $row['Name']."    @".$row['Address']."<br>";
    $temparray = $row;
    array_push($resultarray, $temparray);
    
}
// echo $resultarray
echo json_encode($resultarray);

}

$conn-> close();
?>