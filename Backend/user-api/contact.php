<?php
require_once "config.php";

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['name']) ||
    empty($data['phone']) ||
    empty($data['email']) ||
    empty($data['message'])
) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}

$name    = trim($data['name']);
$phone   = trim($data['phone']);
$email   = trim($data['email']);
$message = trim($data['message']);

$stmt = $conn->prepare(
    "INSERT INTO contact (name, phone, email, message) VALUES (?, ?, ?, ?)"
);

$stmt->bind_param("ssss", $name, $phone, $email, $message);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Message stored successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database insert failed"
    ]);
}

$stmt->close();
$conn->close();
