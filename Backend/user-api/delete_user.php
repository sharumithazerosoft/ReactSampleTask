<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database config
require_once "config.php";

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Check for valid input
if (!isset($data['id'])) {
    echo json_encode(["status" => "error", "message" => "Missing user ID"]);
    exit;
}

$id = intval($data['id']);

// Prepare delete query
$sql = "DELETE FROM users WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
