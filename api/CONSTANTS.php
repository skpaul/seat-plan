<?php
    //Must add SLASH(/) after this constant i.e.  require_once(ROOT_DIRECTORY . '/db_connect.php');
    defined("ROOT_DIRECTORY")
    or define("ROOT_DIRECTORY", realpath(dirname(__FILE__)));
    //$example = ROOT_DIRECTORY . "/applicant_photo/" . "$gender" . "/" . $post_code . "/" . $userid. ".jpg";

    // defined("DATABASE_SERVER") or define("DATABASE_SERVER", "localhost"); 
    defined("DATABASE_SERVER") or define("DATABASE_SERVER", "192.168.61.178"); 
    
    // defined("DATABASE_USER_NAME") or define("DATABASE_USER_NAME", "root");
    defined("DATABASE_USER_NAME") or define("DATABASE_USER_NAME", "xdev"); 

    // defined("DATABASE_PASSWORD") or define("DATABASE_PASSWORD", "");
    defined("DATABASE_PASSWORD") or define("DATABASE_PASSWORD", "DevX#3^Le%Z");

    defined("DATABASE_NAME") or define("DATABASE_NAME", "seat_plan");  //bar_demo

    defined("ENVIRONMENT") or define("ENVIRONMENT", "DEVELOPMENT"); //DEVELOPMENT PRODUCTION
?>
