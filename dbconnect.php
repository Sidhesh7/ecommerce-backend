<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username   = "root";
$password   = "Welcomenigga7!";
$dbname     = "ecommerce_db";

$conn = mysqli_connect($servername, $username, $password, $dbname,3306);

// ✅ Check connection
if (!$conn) {
    die("❌ Database connection failed: " . mysqli_connect_error());
} else {
    echo "✅ Database connected successfully!";
}

// ✅ (optional) Close connection
mysqli_close($conn);
?>
