<?php
// echo $_GET['number'];
// $note2 = $_POST['note1'];
$initial = $_POST['initial'];
$content = $_POST['content'];
$id = "XXX";

$host="localhost";      
$username="id12934641_allen"; 
$password="allen"; 
$db_name="id12934641_allenshare"; 
$tbl_name="chathistory"; 

// mysqli_connect("$host", "$username", "$password")or die(mysqli_error($conn)); 
$conn = new mysqli($host, $username, $password, $db_name);



if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Database Connection Connected successfully";
date_default_timezone_set("America/Vancouver");

$date = date("Y-m-d h:i:sa");
// echo $date;

// $sql = "INSERT INTO chathistory (initial,content,time,id) VALUES ('$initial','$content','$date','$id')";

$sql = "SELECT * FROM `comments` WHERE name = '123123' ";



if (mysqli_query($conn, $sql)) {
    // echo "Added Successfully";
    // echo "<br>";
    // echo $number2.": ".$note2." @".$date;
} else {
    echo "Error: " . $sql . "/n" . mysqli_error($conn);
    echo mysqli_error($conn);
}

$conn->close();


?>