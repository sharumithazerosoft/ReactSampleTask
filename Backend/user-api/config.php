<?php



header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    http_response_code(200);

    exit();

}

// $servername = "localhost";     

// $username   = "root"; 

// $password   = "";   

// $dbname     = "registration_form";  



$servername = "localhost";     

$username   = "uqdggrqf_registrationform";  

$password   = "registration_form";     

$dbname     = "uqdggrqf_registration_form"; 



// Create connection

$conn = new mysqli($servername, $username, $password, $dbname);



// Check connection

if ($conn->connect_error) {

    die(json_encode([

        "status" => "error",

        "message" => "Database connection failed: " . $conn->connect_error

    ]));

}



// Set charset to UTF-8 (important for special characters)

$conn->set_charset("utf8mb4");

?>

