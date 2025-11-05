<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "dbconnect.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product_id = $_POST['product_id'] ?? '';
    $quantity   = $_POST['quantity'] ?? 1;

    if (empty($product_id)) {
        echo json_encode(["status" => "error", "message" => "Product ID missing"]);
        exit;
    }

    $query = "INSERT INTO cart (product_id, quantity) VALUES ('$product_id', '$quantity')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Item added to cart"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
