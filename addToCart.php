<?php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "dbconnect.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product_id = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
    $quantity = filter_input(INPUT_POST, 'quantity', FILTER_VALIDATE_INT) ?? 1;

    if (!$product_id) {
        echo json_encode(["status" => "error", "message" => "Invalid Product ID"]);
        exit;
    }

    if (!isset($conn) || !$conn) {
        echo json_encode(["status" => "error", "message" => "Database connection lost"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO cart (product_id, quantity) VALUES (?, ?)");
    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Query preparation failed"]);
        exit;
    }

    $stmt->bind_param("ii", $product_id, $quantity);
    
    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success", 
            "message" => "Item added to cart",
            "cart_id" => $stmt->insert_id
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Database error: " . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
