<?php
    // echo '<br>username-'.time(); // username-1445062025
    function generate_random_code($database_connection){
        
        $code ='';
        for ($i=1; $i <= 10; $i++){ 
            $random_number = rand(65,90); 
            $code .= chr($random_number);
        }

        $found_q = db_select_single("cinfo","invoiceCode","invoiceCode='$code'",$database_connection);
        $found = $found_q["row"];

        if($found["quantity"]>0){
            generate_random_code($database_connection);
        }
        // else{
        //     DB_Update("applicants", array('invoiceCode' => $code), "applicant_id=$applicant_id",$database_connection);
        // }

        return $code;
    }

?>