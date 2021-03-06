<?php
require_once("Required.php");
header('Access-Control-Allow-Origin: '. ALLOWORIGIN);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->Validable()->Json();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];

if($action === "details"){
    $postId = $_POST["id"];
    try {
        $floor= $db->select("postId,postName")->from("posts")->where("postId")->equalTo($postId)->single();
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
    $examId = $_POST["examId"];
    try {
        $posts= $db->select("postId,postName")->from("posts")->where("examId")->equalTo($examId)->toList();
        http_response_code(200);
        $json = json_encode($posts);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}


?>