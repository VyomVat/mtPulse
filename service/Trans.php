


<?php
$serverName = "den1.mssql1.gear.host"; //serverName\instanceName
$connectionInfo = array( "Database"=>"kavach", "UID"=>"kavach", "PWD"=>"Ganat.Bote");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
  

//   //Get or Post parameters

//   // Create connection
//   $conn = new mysqli('den1.mssql1.gear.host:1433','kavach','Ganat.Bote', 'kavach');
//   //$conn = new mysqli('localhost:1433','ganigan','Ganat.Bote', 'ganigan_kavach');

//   // Check connection
//   if ($conn->connect_error) {
//       die("Connection failed: " . $conn->connect_error);
//   } 
//   //echo "Connected successfully";

//   if (isset($_GET['id'])) {
//     $sql = "exec getTrans " . $_GET['id'];
//   } 
//   else {
//     $sql = "exec getTrans 0";
//   }

//   $sth = mysqli_query($conn, $sql);
//   $rows = array();
//   while($r = mysqli_fetch_assoc($sth)) {
//       $rows[] = $r;
//   }

//   //header('Content-type: application/json');
//   print json_encode($rows);
  
// 	mysqli_close($conn)
  
    
?>
