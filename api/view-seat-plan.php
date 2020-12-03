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

$eiin = $_POST["eiin"];
$examId = $_POST["examId"];

try {
    $sql = "select r.*, b.name as building, f.name as floor from rooms r INNER JOIN buildings b on r.buildingId=b.id INNER JOIN floors f on r.floorId=f.id 
    WHERE r.eiin=$eiin and r.examId=$examId
    order by b.name, f.name, r.roomNo";

    $seatPlan = $db->select($sql)->fromSQL()->toList();

    http_response_code(200);
    $json = json_encode($seatPlan);
    exit($json);
} catch (\ZeroException $exp) {
    $logger->createLog($exp->getMessage());
    http_response_code(501);
    die();
}


?>