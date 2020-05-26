    <?php
    $host="localhost";      
    $username="id12934641_allen"; 
    $password="allen"; 
    $db_name="id12934641_allenshare"; 
    $tbl_name="comments"; 
    
    // mysqli_connect("$host", "$username", "$password")or die(mysqli_error($conn)); 
    $conn = new mysqli($host, $username, $password, $db_name);
    
    echo $variable = "<script>document.write(totalpoints)</script>"
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    echo "Database Connection Connected successfully";
    date_default_timezone_set("America/Vancouver");
    
    $date = date("Y-m-d h:i:sa");
    echo $date;
    
    // $sql = "INSERT INTO comments (number, note, time) VALUES ('123123', 'this is new note odsinfafjaioefaoisneasdilfjoignar', '$date')";
    
    // $sql = "SELECT * FROM `comments` WHERE name = '123123' ";
    
    
    echo "<br>";
    
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        echo "<br>";
        echo mysqli_error($conn);
    }
    
    $conn->close();
    
    
    ?>