<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
$response;
$_POST = json_decode(array_keys($_POST)[0], true);
$flpath=explode("_",$_POST);
$del=$flpath[0].".pdf";
$del=unlink($del);
if($del==true){
    $response="success";
}
else{
    $response="faliure";
}

echo json_encode($response);

?>