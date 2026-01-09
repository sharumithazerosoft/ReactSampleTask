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

// Include database connection
require_once "config.php";

// Read input JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email and password required']);
    exit();
}

$email = $conn->real_escape_string(trim($data['email']));
$password = $data['password'];

// Fetch user by email
$stmt = $conn->prepare("SELECT id, name, email, mobile, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit();
}

$user = $result->fetch_assoc();

// Verify hashed password
if (password_verify($password, $user['password'])) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'mobile' => $user['mobile']
        ]
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
}

$conn->close();
?>
