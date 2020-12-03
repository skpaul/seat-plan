<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->SwiftJSON();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();


try {
    $db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

    $eiin = $_POST["eiin"];
    $password = $_POST["password"];
    $institute= $db->select("eiin, password")->from("institutions")->where("eiin")->equalTo($eiin)->singleOrNull();
    //if eiin is not found, still allow a login as a new comer, who is likely to create a profile.
    if($institute != NULL){
        if($institute->password != $password){
            $json= SwiftJSON::failure("Institute not found");
            die($json);
        }
    }

    http_response_code(200);
   
    $data = new stdClass();
    $data->issuccess = true;
    $data->eiin = $eiin;
    $data->password = $password;

    $json= json_encode($data,JSON_FORCE_OBJECT);
    exit($json);

} catch (\ZeroException $exp) {
    $logger->createLog($exp->getMessage());
    $json= SwiftJSON::failure("Something goes wrong. Please try again later.");
    die($json);
} catch (\Exception $exp) {
    $logger->createLog($exp->getMessage());
    $json= SwiftJSON::failure("Something goes wrong. Please try again later.");
    die($json);
}

?>