<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
require_once "config.php";

// Get JSON data from request body
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['id'], $data['name'], $data['email'], $data['mobile'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    exit;
}

$id = intval($data['id']);
$name = $conn->real_escape_string(trim($data['name']));
$email = $conn->real_escape_string(trim($data['email']));
$mobile = $conn->real_escape_string(trim($data['mobile']));

$sql = "UPDATE users SET name='$name', email='$email', mobile='$mobile' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>
