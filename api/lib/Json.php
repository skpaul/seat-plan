<?php
    class Json{
        public function __construct() {
            $this->data=new stdClass();
        }

        public function __call($name, $arguments){
            $this->data->$name = $arguments[0];
            return $this;
        }

        public function success(){
            $this->data->issuccess = true;
            return $this;
        }

        public function fail(){
            $this->data->issuccess = false;
            return $this;
        }

        //this must be the final call.
        public function create($forceObject=true){
            // json_encode($array,JSON_FORCE_OBJECT);
            if($forceObject ) 
                $string = json_encode($this->data, JSON_FORCE_OBJECT);
            else
                $string = json_encode($this->data);

            $this->data=new stdClass(); //reset 
            return $string;
        }
    }
?>