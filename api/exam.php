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

if($action === "details"){
    $roomId = $_POST["roomId"];
    try {
        $roomDetails = $db->select()->from("rooms")->where("id")->equalTo($roomId)->single();
        http_response_code(200);
        $json = json_encode($roomDetails);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "list"){
    
    try {
        $exams= $db->select("id, name, reference")->from("exams")->where("isActive")->equalTo(true)->orderBy("name")->toList();
        http_response_code(200);
        $json = json_encode($exams);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "save"){
    $floorId = $_POST["floorId"];
    $buildingId = trim($_POST["id"]);
    //first check whether this eiin exists or not. 
    //If exist, then update. Otherwise create new.
    try {
        $isNew = false;
        if(empty($buildingId)){
            $isNew = true;
            $building = $db->new("buildings");
            $building->eiin = $eiin;
        }
        else{
            $building = $db->select()->from("buildings")->where("id")->equalTo($buildingId)->singleOrNull();
        }

        $form = new Validable();
        $building->name = trim($_POST["name"]);

        if($isNew){
            $building->id = $db->insert($building)->into("buildings")->execute();
        }
        else{
            $db->update($building)->into("buildings")->where("id")->equalTo($building->id)->execute();
        }
        
        http_response_code(200);

        $json = '{"issuccess":true, "buildingId":'.$building->id.'}';
        exit($json);

    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $json = SwiftJSON::failure("Could not save this building name. Please try again.");
        die($json);
    }
    
   
}

?>