<?php
header('Access-Control-Allow-Origin: http://seatplan.teletalk.com.bd/');
// header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->Validable();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];

if($action === "details"){
    $examId = $_POST["examId"];
    try {
        $exam = $db->select()->from("exams")->where("examId")->equalTo($examId)->single();
        http_response_code(200);
        $json = json_encode($exam);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "list"){
     $departmentId = $_GET["departmentid"];
    try {
        $exams= $db->select("examId, name, reference")->from("exams")->where("isActive")->equalTo(true)->andWhere("departmentId")->equalTo($departmentId)->orderBy("name")->toList();
        // $exams= $db->select("examId, name, reference")->from("exams")->where("isActive")->equalTo(true)->orderBy("name")->toList();
        http_response_code(200);
        $json = json_encode($exams);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "save"){
    $floorId = $_POST["floorId"];
    $buildingId = trim($_POST["id"]);
    //first check whether this eiin exists or not. 
    //If exist, then update. Otherwise create new.
    try {
        $isNew = false;
        if(empty($buildingId)){
            $isNew = true;
            $building = $db->new("buildings");
            $building->eiin = $eiin;
        }
        else{
            $building = $db->select()->from("buildings")->where("id")->equalTo($buildingId)->singleOrNull();
        }

        $form = new Validable();
        $building->name = trim($_POST["name"]);

        if($isNew){
            $building->id = $db->insert($building)->into("buildings")->execute();
        }
        else{
            $db->update($building)->into("buildings")->where("id")->equalTo($building->id)->execute();
        }
        
        http_response_code(200);

        $json = '{"issuccess":true, "buildingId":'.$building->id.'}';
        exit($json);

    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $json = '{"issuccess":true, "message":"Could not save this building name. Please try again."}'; //SwiftJSON::failure("");
        die($json);
    }
    
   
}

?>