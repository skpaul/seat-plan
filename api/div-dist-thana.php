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
$json = new Json();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];


if($action === "districtList"){
    try {
        $districts= $db->select("select distinct district_name as district from div_dist_thana order by district_name")->fromSQL()->toList();
        http_response_code(200);
        $response = new stdClass();
        $response->issuccess = true;
        $response->districts = $districts;
        $response = json_encode($response);
        exit($response);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "thanaList"){
    try {
        $district = $_POST["district"];
        $thanas= $db->select("select distinct thana_name as thana from div_dist_thana where district_name='$district'  order by thana_name")->fromSQL()->toList();
        http_response_code(200);
        $response = new stdClass();
        $response->issuccess = true;
        $response->thanas = $thanas;
        $response = json_encode($response);
        exit($response);
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

        $response = '{"issuccess":true, "floorId":'.$floor->id.'}';
        exit($response);

    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $response = '{"issuccess":false, "message":"Could not save. Please try again"}'; //SwiftJSON::failure("Could not save. Please try again.");
        die($json);
    }
    
   
}

?>