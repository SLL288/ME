<?php
// $number = $_POST['number'];
// $number = strval($_POST['number1']);


$config = parse_ini_file('cred.ini');
$conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);

$useremail = $_POST["email"];


$userpassword = $_POST["password"];

$tbl_name="chathistory"; 
$conn = new mysqli('localhost', 'id12934641_allen', 'allen', 'id12934641_allenshare');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    // echo "error";
    echo "error";
} 
else{
    // echo "conn successful";
}

$sql = "SELECT * FROM chathistory";

$result = $conn->query($sql);
if (!$result){
    echo "N/a";
}else{
    while($row = $result->fetch_array()){
    // echo $row['note']."    @".$row['time']."<br>";
    // echo $row['initial']."  ".$row['time']."<br><textarea id='msgTXT' style='width: 281px; height: 67px; margin-top:185px; position:fixed; resize: none;'>".$row['content']."</textarea><br><br>";
    echo $row['initial']."  ".$row['time'].":<br><div class='demobox' >".$row['content']."</div><br><br>";
}
}

$conn-> close();
?>