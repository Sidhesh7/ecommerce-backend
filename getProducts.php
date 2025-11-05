<?php
include "dbconnect.php";
header("Content-Type: application/json");

$query = "SELECT * FROM products";
$result = mysqli_query($conn, $query);

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode(["status" => "success", "data" => $products]);
?>
