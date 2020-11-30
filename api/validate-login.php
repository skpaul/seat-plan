<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$eiin = $_POST["eiin"];
$password = $_POST["password"];
http_response_code(200);
$data = array("eiin"=>$eiin, "password"=>$password);
$json = json_encode($data,true);
exit($json);

?>