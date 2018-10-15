
<?php 

//Get posted parameters
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Origin: *");


try {
    //Read template params   
    $req = json_decode($_POST["req"]);
    $tid = $req->request->templateid;    
    $outstring = file_get_contents("http://buzingle.web44.net/oktavity/js/templates/".$tid);
    echo $outstring;
    //echo json_encode($outstring);       
}

//catch exception
catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
  echo 'Line: ' .$e->getLine();
}

?>