<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->Validable()->SwiftJSON();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];
$buildingId = $_POST["buildingId"];

if($action === "list"){
    try {
        $buildings= $db->select("id,name")->from("floors")->where("buildingId")->equalTo($buildingId)->toList();
        http_response_code(200);
        $json = json_encode($buildings);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "create"){   
   
    try {
        // $form = new Validable();
        $floor = $db->new("floors");
        $floor->buildingId = $buildingId;
        $floor->name = trim($_POST["name"]);
        $floor->id = $db->insert($floor)->into("floors")->execute();
        http_response_code(200);

        $json = '{"issuccess":true, "floorId":'.$floor->id.'}';
        exit($json);

    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $json = SwiftJSON::failure("Could not save. Please try again.");
        die($json);
    }
    
   
}

?>