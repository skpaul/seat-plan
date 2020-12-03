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
    try {
        $buildings= $db->select()->from("buildings")->where("eiin")->equalTo($eiin)->toList();
        http_response_code(200);
        $json = json_encode($buildings);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "list"){
    $eiin = $_POST["eiin"];
    try {
        $buildings= $db->select()->from("buildings")->where("eiin")->equalTo($eiin)->toList();
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
    $eiin = $_POST["eiin"];
    try {

        $building = $db->new("buildings");
        $building->eiin = $eiin;
        $building->name = trim($_POST["name"]);
        $building->id = $db->insert($building)->into("buildings")->execute();
        
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