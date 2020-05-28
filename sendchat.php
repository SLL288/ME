<?php
$config = parse_ini_file('cred.ini');
$conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);

$useremail = $_POST["email"];

$userpassword = $_POST["password"];


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