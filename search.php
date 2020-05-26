<?php
// $number = $_POST['number'];
$number = strval($_POST['number1']);
// echo $number;
// $number = 123123;
// echo $number;
// echo "agj niojf dskjf dofjao;g";
// echo "start sql requesting from database ... ...";
$host="localhost";      
$username="id12934641_allen"; 
$password="allen"; 
$db_name="id12934641_allenshare"; 
$tbl_name="comments"; 
$conn = new mysqli('localhost', 'id12934641_allen', 'allen', 'id12934641_allenshare');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    // echo "error";
    echo "error";
} 
else{
    // echo "conn successful";
}

$sql = "SELECT time,note
        FROM comments
        WHERE number =".$number;
        
$sqlrm = "SELECT * FROM rm;

$result = $conn->query($sqlrm);
if (!$result){
    echo "N/a";
}else{
    while($row = $result->fetch_array()){
    echo $row['note']."    @".$row['time']."<br>";
}
}

$conn-> close();
?>