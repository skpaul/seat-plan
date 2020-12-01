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

if($action === "get"){
    $eiin = $_POST["eiin"];
    try {
        $details= $db->select()->from("institutions")->where("eiin")->equalTo($eiin)->singleOrNull();
        http_response_code(200);
        $json = json_encode($details);
        exit($json);
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        http_response_code(501);
        die();
    }
    
   
}

if($action === "save"){
    $eiin = trim($_POST["eiin"]);
    //first check whether this eiin exists or not. 
    //If exist, then update. Otherwise create new.
    try {
        $institute = $db->select("eiin")->from("institutions")->where("eiin")->equalTo($eiin)->singleOrNull();
        $isNew = false;
        if($institute === NULL){
            $isNew = true;
            $institute = $db->new("institutions");
            $institute->eiin = $eiin;
        }

        $form = new Validable();
        $institute->password= $form->label("Password")->httpPost("password")->required()->asString(true)->maxLength(10)->validate();
        $institute->district= $form->label("District")->httpPost("district")->required()->asString(true)->maxLength(5)->validate();
        $institute->thana= $form->label("Thana")->httpPost("thana")->required()->asString(true)->maxLength(19)->validate();
        $institute->type= $form->label("Type")->httpPost("type")->required()->asString(true)->maxLength(16)->validate();
        $institute->level= $form->label("Level")->httpPost("level")->required()->asString(true)->maxLength(17)->validate();
        $institute->name= $form->label("Name")->httpPost("name")->required()->asString(true)->maxLength(67)->validate();
        $institute->address= $form->label("Address")->httpPost("address")->required()->asString(true)->maxLength(50)->validate();
        $institute->post= $form->label("Post")->httpPost("post")->required()->asString(true)->maxLength(21)->validate();
        $institute->mobile= $form->label("Mobile")->httpPost("mobile")->required()->asString(true)->maxLength(25)->validate();
        $institute->email= $form->label("Email")->httpPost("email")->required()->asString(true)->maxLength(52)->default(NULL)->validate();

        if($isNew){
            $db->insert($institute)->into("institutions")->execute();
        }
        else{
            $db->update($institute)->into("institutions")->where("eiin")->equalTo($eiin)->execute();
        }
        
        http_response_code(200);

        $json = SwiftJSON::success("");
        exit($json);

    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $json = SwiftJSON::success("");
        die($json);
    }
    
   
}

?>