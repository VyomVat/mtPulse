
<?php 
  
  //Get or Post parameters

  // Create connection
  $conn = new mysqli('localhost','id2176542_ganigan','Ganat.Bote', 'id2176542_plusdb');

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } 
  //echo "Connected successfully";

  if (isset($_GET['id'])) {
    $sql = "SELECT id, page FROM commonTrans where id=" . $_GET['id'];
  } 
  else {
    $sql = "SELECT id, page FROM commonTrans";
  }

  $sth = mysqli_query($conn, $sql);
  $rows = array();
  while($r = mysqli_fetch_assoc($sth)) {
      $rows[] = $r;
  }
  
  //header('Content-type: application/json');
  print json_encode($rows);
  
	mysqli_close($conn)
  
    
?>
