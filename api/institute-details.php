<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("Required.php");
Required::SwiftLogger()->ZeroSQL();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$eiin = $_POST["eiin"];

try {
    $details= $db->select()->from("institutions")->where("eiin")->equalTo($eiin)->singleOrNull();
} catch (\ZeroException $exp) {
    $logger->createLog($exp->getMessage());
}

http_response_code(200);
$json = json_encode($details);
exit($json);

?>