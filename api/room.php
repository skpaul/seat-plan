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
    $floorId = $_POST["floorId"];
    try {
        $rooms= $db->select()->from("rooms")->where("floorId")->equalTo($floorId)->toList();
        http_response_code(200);
        $json = json_encode($rooms);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "create"){
    //first check whether this eiin exists or not. 
    //If exist, then update. Otherwise create new.
    try {
        $room = $db->new("rooms");
        $room->floorId = $_POST["floorId"];
        $room->buildingId = trim($_POST["buildingId"]);
        $room->examId = trim($_POST["examId"]);
        $room->roomNo = trim($_POST["roomNo"]);
        $room->startRoll = trim($_POST["startRoll"]);
        $room->endRoll = trim($_POST["endRoll"]);
        $room->capacity = trim($_POST["capacity"]);
        $room->eiin = trim($_POST["eiin"]);

        $room->id = $db->insert($room)->into("rooms")->execute();
        http_response_code(200);
        $json = '{"issuccess":true, "roomId":'.$room->id.'}';
        exit($json);

    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $json = SwiftJSON::failure("Could not save. Please try again.");
        die($json);
    }
    
   
}

?>