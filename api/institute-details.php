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
$json = new Json();
$db = new ZeroSQL();
$db->database(DATABASE_NAME)->user(DATABASE_USER_NAME)->server(DATABASE_SERVER)->password(DATABASE_PASSWORD)->connect();

$action = $_GET["action"];

if($action === "get"){
    $eiin = $_POST["eiin"];
    try {
        $details= $db->select()->from("institutions")->where("eiin")->equalTo($eiin)->singleOrNull();
        http_response_code(200);
        $response = json_encode($details);
        exit($response);
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
        $institute->password= $form->label("Password")->httpPost("password")->required()->asString(true)->maxLength(20)->validate();
        $institute->district= $form->label("District")->httpPost("district")->required()->asString(true)->maxLength(50)->validate();
        $institute->thana= $form->label("Thana")->httpPost("thana")->required()->asString(true)->maxLength(50)->validate();
        $institute->type= $form->label("Type")->httpPost("type")->required()->asString(true)->maxLength(50)->validate();
        $institute->level= "";
        $institute->name= $form->label("Name")->httpPost("name")->required()->asString(true)->maxLength(200)->validate();
        $institute->address= $form->label("Address")->httpPost("address")->required()->asString(true)->maxLength(200)->validate();
        $institute->post= $form->label("Post")->httpPost("post")->required()->asString(true)->maxLength(50)->validate();
        $institute->headMobile= $form->label("Mobile No. of the Head of the Institute")->httpPost("headMobile")->required()->asString(true)->maxLength(15)->validate();
        $institute->asstHeadMobile= $form->label("Mobile No. of the Asst. Head/Vice Principal/Equivalent Others")->httpPost("asstHeadMobile")->required()->asString(true)->maxLength(15)->validate();
        $institute->clerkMobile= $form->label("Mobile No. of the Head Assistant (Clerk)")->httpPost("clerkMobile")->asString(true)->maxLength(15)->default("")->validate();
        $institute->email= $form->label("Email")->httpPost("email")->required()->asString(true)->maxLength(52)->default(NULL)->validate();

        if($isNew){
            $db->insert($institute)->into("institutions")->execute();
        }
        else{
            $db->update($institute)->into("institutions")->where("eiin")->equalTo($eiin)->execute();
        }
        
        http_response_code(200);

        $response = $json->success()->create();
        exit($response);
       
    } catch (\ZeroException $exp) {
        $logger->createLog($exp->getMessage());
        $response = $json->fail()->create();
        die($response);
    }
    catch (\ValidableException $exp) {
        $response = $json->fail()->message($exp->getMessage())->create();
        die($response);
    }
}

?>