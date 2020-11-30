## How to populate a dropdown options

```php
$secondaryExams = $db->select("select examination_name as Id, examination_name from examinations where level='secondary' order by serial_number")->fromSQL()->fetchArray()->toList();
if($applicant === NULL){
   echo DropDown::createOptions($secondaryExams);
}
else{
   echo DropDown::createOptions($secondaryExams, $applicant->sscExamName);
}
```



