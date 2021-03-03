<?php
header('Access-Control-Allow-Origin: http://seatplan.teletalk.com.bd/');
// header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->Validable()->Json();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];

if($action === "details"){
    $floorId = $_POST["id"];
    try {
        $floor= $db->select("id,name")->from("floors")->where("id")->equalTo($floorId)->single();
        http_response_code(200);
        $json = json_encode($floor);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "list"){
    $buildingId = $_POST["buildingId"];
    try {
        $buildings= $db->select("floorId,name")->from("floors")->where("buildingId")->equalTo($buildingId)->toList();
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
    $buildingId = $_POST["buildingId"];
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
        $json = '{"issuccess":true, "message":"Could not save. Please try again."}';
        die($json);
    }
}

?>