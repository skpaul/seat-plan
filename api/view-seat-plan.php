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
    $sql = "SELECT e.name as exam, b.name as building, f.name as floor, r.roomNo, r.startRoll, r.endRoll,r.capacity 
            from exams e INNER JOIN buildings b on e.id=b.examId INNER JOIN floors f on b.id=f.buildingId INNER JOIN rooms r on f.id=r.floorId 
            WHERE e.id=$examId and b.eiin=$eiin
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