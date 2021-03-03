<?php
require_once("Required.php");
header('Access-Control-Allow-Origin: '. ALLOWORIGIN);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// require_once("Required.php");
Required::SwiftLogger()->ZeroSQL()->Validable();

$logger = new SwiftLogger(ROOT_DIRECTORY);
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];

if($action === "details"){
    $departmentId = $_GET["department-id"];
    try {
        $department = $db->select()->from("department_ministry")->where("departmentId")->equalTo($departmentId)->single();
        http_response_code(200);
        $json = json_encode($department);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
}

if($action === "list"){
    
    try {
        $sql = "select departmentId, fullNameOfDepartment as departmentName from department_ministry where isActive=1 ORDER BY  fullNameOfDepartment";
        $exams= $db->select($sql)->fromSQL()->toList();
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