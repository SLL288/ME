<?php
$config = parse_ini_file('cred.ini');
$conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);

$useremail = $_POST["email"];
// $useremail = "123123";

$userpassword = $_POST["password"];
// $number = $_POST['number'];
$number = strval($_POST['number1']);


// echo $_GET['number'];
$number2 = $_POST['number1'];


$tbl_name="comments"; 

$conn = new mysqli($host, $username, $password, $db_name);



if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Database Connection Connected successfully";
date_default_timezone_set("America/Vancouver");

$date = date("Y-m-d h:i:sa");
// echo $date;

$sql = "INSERT INTO comments (number, note, time) VALUES ('$number2', '$note2', '$date')";

// $sql = "SELECT * FROM `comments` WHERE name = '123123' ";



if (mysqli_query($conn, $sql)) {
    echo "Added Successfully";
    echo "<br>";
    echo $number2.": ".$note2." @".$date;
} else {
    echo "Error: " . $sql . "/n" . mysqli_error($conn);
    echo mysqli_error($conn);
}

$conn->close();


?>