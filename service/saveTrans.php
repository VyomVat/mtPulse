<?php 
  
  //Get or Post parameters

  // Create connection
  $conn = new mysqli('localhost','id2176542_ganigan','Ganat.Bote', 'id2176542_plusdb');

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } 
  //echo "Connected successfully";

  if (isset($_POST['id'])) {
    echo $_POST['id'] . "<br>";    
  }  
  echo $_POST['page'] . "<br>";


  if (isset($_POST['id'])) {
    
    $sql = "update commonTrans set page='". $_POST['page'] . "' where ID=" . $_POST['id']  . "; select 'id'=".  $_POST['id'] . ";" ;
    echo $sql . "<br>";
  }
  else {
    $sql = "insert into commonTrans(date,page) values (NOW(),'". $_POST['page'] ."');";
    echo $sql . "<br>";
  }

   $sth = mysqli_query($conn, $sql);
//    $rows = array();
//    while($r = mysqli_fetch_assoc($sth)) {
//        $rows[] = $r;
//    }
  
//   //header('Content-type: application/json');
//   print json_encode($rows);
  
	mysqli_close($conn)
  
    
?>
