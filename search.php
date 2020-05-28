<?php
$config = parse_ini_file('cred.ini');
$conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);

$useremail = $_POST["email"];
// $useremail = "123123";

$userpassword = $_POST["password"];
// $number = $_POST['number'];
$number = strval($_POST['number1']);


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