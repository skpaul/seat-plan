
<?php 
   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json; charset=UTF-8");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Max-Age: 3600");
   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   

    function executeQuery($conn, $sql){
        $result = $conn->query($sql);
        if(!$result){
            trigger_error($conn->error);
        }
        else{
            return $result;
        }
    }

 

    function getCSV($conn, $sql = ""){

        // if(!empty($sql)){
        //     $this->sql = $sql;
        // }

      //  $select = $this->_prepare_select_sql("many");
     
        $query = mysqli_query($conn, $sql);
        $export =  $query;
       
        
        //$fields = mysql_num_fields ( $export );
        $fields = mysqli_num_fields($export);

        $header ='';
        $data = '';
        for ( $i = 0; $i < $fields; $i++ )
        {
            $colObj = mysqli_fetch_field_direct($export,$i);                            
            $col = $colObj->name;

            $header .= $col . "\t";
            while( $row = mysqli_fetch_row( $export ) )
            {
                $line = '';
                foreach( $row as $value )
                {                                            
                    if ( ( !isset( $value ) ) || ( $value == "" ) )
                    {
                        $value = "\t";
                    }
                    else
                    {
                        $value = str_replace( '"' , '""' , $value );
                        $value = '"' . $value . '"' . "\t";
                    }
                    $line .= $value;
                }
                $data .= trim( $line ) . "\n";
            }
        }
       
        $data = str_replace( "\r" , "" , $data );
        
        if ( $data == "" )
        {
            $data = "\n(0) Records Found!\n";                        
        }
        
        return "$header\n$data";
        
        //USAGE--------------------
        // header("Content-type: application/octet-stream");
        // header("Content-Disposition: attachment; filename=your_desired_name.xls");
        // header("Pragma: no-cache");
        // header("Expires: 0");
        // print "$header\n$data";
    }

    function getCSVNew($conn, $sql = ""){
     
        $query = mysqli_query($conn, $sql);
        $export =  $query;
       
        
        //$fields = mysql_num_fields ( $export );
        $fields = mysqli_num_fields($export);

        $header ='';
        $data = '';
        for ( $i = 0; $i < $fields; $i++ )
        {
            $colObj = mysqli_fetch_field_direct($export,$i);                            
            $col = $colObj->name;

            $header .= $col . "\t";
            while( $row = mysqli_fetch_row( $export ) )
            {
                $line = '';
                foreach( $row as $value )
                {                                            
                    if ( ( !isset( $value ) ) || ( $value == "" ) )
                    {
                        $value = "\t";
                    }
                    else
                    {
                        $value = str_replace( '"' , '""' , $value );
                        $value = '"' . $value . '"' . "\t";
                    }
                    $line .= $value;
                }
                $data .= trim( $line ) . "\n";
            }
        }
       
        $data = str_replace( "\r" , "" , $data );
        
        if ( $data == "" )
        {
            $data = "\n(0) Records Found!\n";                        
        }
        
        // return "$header\n$data";
        
        //USAGE--------------------
        header("Content-type: application/octet-stream");
        // header("Content-type: text/xml");
        header("Content-Disposition: attachment; filename=Data.csv");
        header("Pragma: no-cache");
        header("Expires: 0");
        // header("Content-Transfer-Encoding: binary");

      


        print "$header\n$data";
    }

    try {
        $eiin = $_POST["eiin"];
        $examId = $_POST["examId"];
        $con = mysqli_connect("localhost", "root", "", "seat_plan");
        $sql = "select r.*, b.name as building, f.name as floor from rooms r INNER JOIN buildings b on r.buildingId=b.id INNER JOIN floors f on r.floorId=f.id 
        WHERE r.eiin=$eiin and r.examId=$examId
        order by b.name, f.name, r.roomNo";
        getCSVNew($con, $sql);
    } catch (\Exception $exp) {
        $logger->createLog($exp->getMessage());
        echo "Problem while showing data. A log has been created.";
    }

?>
