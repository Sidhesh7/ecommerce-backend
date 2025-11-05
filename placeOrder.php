<?php
include "dbconnect.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $address = $_POST['address'];
    $payment = $_POST['payment_option'];

    $query = "INSERT INTO orders (user_id, address, payment_option) VALUES ('$user_id', '$address', '$payment')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Order placed successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Order failed: " . mysqli_error($conn)]);
    }
}
?>

