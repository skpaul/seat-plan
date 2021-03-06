<?php


require_once("Required.php");
header('Access-Control-Allow-Origin: '. ALLOWORIGIN);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->Json();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$json = new Json();

try {
    $db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

    
    $eiin = $_POST["eiin"];

    if($eiin == ""){
        $response = $json->fail()->message("EIIN required.")->create();
        die($response);
    }

    $password = $_POST["password"];
    if($password == ""){
        $response = $json->fail()->message("Password required.")->create();
        die($response);
    }

    $institute= $db->select("eiin, password")->from("institutions")->where("eiin")->equalTo($eiin)->singleOrNull();
    //if eiin is not found, still allow a login as a new comer, who is likely to create a profile.
    if($institute != NULL){
        if($institute->password != $password){
            $response = $json->fail()->message("Password incorrect.")->create();
            die($response);
        }
    }

    http_response_code(200);
    $response = $json->success()->eiin($eiin)->password($password)->create();

    // $data = new stdClass();
    // $data->issuccess = true;
    // $data->eiin = $eiin;
    // $data->password = $password;

    // $json= json_encode($data,JSON_FORCE_OBJECT);
    exit($response);

} catch (\ZeroException $exp) {
    $logger->createLog($exp->getMessage());
    $response = $json->fail()->message("Something goes wrong. Please try again later.");
    die($response);
} catch (\Exception $exp) {
    $logger->createLog($exp->getMessage());
    $response = $json->fail()->message("Something goes wrong. Please try again later.");
    die($response);
}

?>