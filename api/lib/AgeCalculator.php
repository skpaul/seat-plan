<?php

//LAST MODIFIED: 2020-08-23 07:08 PM.

//The prefix "Swift" is used to avoid conflict with other namespaces.
class AgeCalculator{

    /**
     * calculate()
     * 
     * Calculate age between two dates.
     * 
     * NOTE: parameters must be valid php datetime objects.
     * 
     * @param DateTime $from 
     * @param DateTime $to 
     * @return Class Age
     */
    public static function calculate($from, $to){
        try {
            $to->modify("+1 day"); 
            if($from > $to){
                throw new Exception("From date (date 1) must be earlier than to date (date 2).");
            }

            $interval = $from->diff($to);
            $age = new Age($interval->y, $interval->m,$interval->d,$interval->days);
            return $age;
        } catch (\Throwable $th) {
            throw $th;
        }
       
    }
    /**
     * validateAge()
     * 
     * Checks whether an age is between minimum and maximum years.
     * 
     * @param Class Age $age contains years, months and days.
     * @param Int $minimumAge 
     * @param Int $maximumAge 
     * @param DateTime $ageCalulcateDate
     * 
     * @return true
     * 
     * @throws Exception if age is not between $minimumAge and $maximumAge.
     */
    public static function validateAge($age, $minimumAge, $maximumAge, $ageCalulcateDate){
        $age_calculation_date = $ageCalulcateDate->format("d-m-Y");
        if($age->years < $minimumAge){
            throw new Exception("Age must be equal or greater than $minimumAge years.<br> As of $age_calculation_date, your age is ". $age->years ." years ". $age->months ." months ". $age->days ." days.");
        }

        if($age->years > $maximumAge){
            throw new Exception("Age must be equal or less than $maximumAge years.<br> As of $age_calculation_date, your age is ". $age->years ." years ". $age->months ." months ". $age->days ." days.");
        }
        else{
            if($age->years == $maximumAge){
                if($age->months > 0){
                    throw new Exception("Age must be equal or less than $maximumAge years.<br> As of $age_calculation_date, your age is ". $age->years ." years ". $age->months ." months ". $age->days ." days.");
                }
                else{
                    if($age->days > 0){
                        throw new Exception("Age must be equal or less than $maximumAge years.<br> As of $age_calculation_date, your age is ". $age->years ." years ". $age->months ." months ". $age->days ." days.");
                    }
                }
            }
        }

        return true;
    }   
}

//This class is required for AgeCalculator class
class Age{
    public function __construct($years=null, $months=null, $days=null, $totalNumberInDays = null) {
        $this->years = $years;
        $this->months = $months;
        $this->days = $days;
        $this->totalNumberInDays = $totalNumberInDays;
    }

    public $years;
    public $months;
    public $days;

    // Shows the total amount of days (not divided into years, months and days like above)
    public $totalNumberInDays;
}
?>