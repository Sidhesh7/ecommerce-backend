<?php
<?php
include "dbconnect.php";

if ($conn) {
    echo "Connection successful!<br>";
    echo "MySQL version: " . mysqli_get_server_info($conn);
} else {
    echo "Connection failed: " . mysqli_connect_error();
}
?>