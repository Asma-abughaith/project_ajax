<?php

namespace Core\Controller;
use Core\Base\Controller;
use Core\Helpers\Helper;
use Core\Model\Item;
use Core\Model\User;
use Core\Model\Course;
use Core\Model\Subject;




class Subjects extends Controller
{  
        
        protected $request_body;
        protected $http_code = 200;

        protected $response_schema = array(
                "success" => true, 
                "message_code" => "", 
                "body" => []
        );
        /*
        *this method will directly make response from method to json object to send it to html page
        * return
        */
        public function render()
        {
                //we should change the content type as json type
                header("Content-Type: application/json"); 
                //control the http_response conde depend on response
                http_response_code($this->http_code); 
                //we should encode the response to be acceptable to see it in html page
                echo json_encode($this->response_schema);
                
                
        }
        /** 
        *this method will automatically make request body json_decode to make it php object to use it 
        * return
        */
        function __construct()
        {

                $this->request_body = json_decode(file_get_contents("php://input", true)); 
                
                   
        }
        
        /** 
        *fetch all transactions that meet the conditions
        * @return array
        */
        public function index()
        {   
              
           try {
                
                $users = new User;
 
                $all_users = $users->get_all();

                    if (empty($all_users)) {
                        $this->http_code = 422;
                        throw new \Exception("there is no users to show");
                    }
                    $this->response_schema['body']['student']= $all_users;
                    $this->response_schema['message_code'] = "the users collected successfully";
            } catch (\Exception $error) {
                $this->response_schema['success'] = false;
                $this->response_schema['message_code'] = $error->getMessage();
            }
             
        }
        public function substu()
        {
                try{
                 if (empty($_POST['subject_id'])||empty($_POST['student_id'])) {
                        $this->http_code = 422;
                         throw new \Exception("you should enter all values");
                }  
                $subjects = new Subject;
                $subject_id = $_POST['subject_id'];
                $student_id = $_POST['student_id'];
                $sql = "INSERT INTO students_subjects (subject_id, student_id) VALUES ($subject_id, $student_id)";
                $result = $subjects->connection->query($sql);
                }catch (\Exception $error) {
                        $this->response_schema['success'] = false;
                        $this->response_schema['message_code'] = $error->getMessage();
                }
                
        }

       

        /**
         * delete the transaction
         * 
         */
        public function delete()
        {

                $courses= new Course;
               
                $courses->delete($this->request_body->id);
                
        }
      
         /**
          * update the transaction quantity and the stock of item
          */
        

        public function update()
        {
               
                $user = new User();
                $user->update($_POST);
                $this->response_schema['body'] = $user->get_by_id($_POST['id']);
                   
        }
        public function single()
        {
               
                $subjects = new Subject();
                $student_id = $_POST['id'];
                $sql = "SELECT * FROM students_subjects WHERE student_id = $student_id";
                $result = $subjects->connection->query($sql);
                $data= array();
                if ($result->num_rows > 0) {

                        // we will make loop over all rows to fetch data 
                        while ($row = $result->fetch_object()) {
            
                            //put the data in the previous  array 
                            $data[] = $row;
                        }
                    }
                

                $student_subject= array();

                //now i have the id of transactions now i need to fetch all information of transactions in transactions table
                foreach($data as $relation){
 
                 //we make the sql statement with condition that created tody
                 $sql ="SELECT *FROM subjects WHERE id= {$relation->subject_id} ";
                 $result_subject=$subjects->connection->query($sql);
                 if($result_subject->num_rows>0){
                         while($row= $result_subject->fetch_object()){
                                 $student_subject[]=$row;    
                         }
                 }
                }
                $this->response_schema['body'] =  $student_subject;


                
        }
        public function create()
        {
                
                //error handling
                try {
                        //check if empty value
                        if (!isset($_POST['name']) || empty($_POST['name'])) {
                            $this->http_code = 422;
                            throw new \Exception("you should enter valid name ");
                        } 
                        if (!isset($_POST['mark'])|| empty($_POST['mark']) ) {
                                $this->http_code = 422;
                                throw new \Exception("you should enter  minimmum mark to pass");
                            } 
                        
                            $subjects = new Subject;
                            $all_subjects = $subjects->get_all();
                            $subject_names = array();
                            foreach ($all_subjects as $subject) {
                                $subject_names[] = $subject->name;
                            }
                            if (in_array($_POST['name'], $subject_names)) {
                                $this->http_code = 422;
                                throw new \Exception("The subject already exists");
                            }
                                $subjects->create($_POST);
                                $subject= $subjects->get_by_id($subjects->connection->insert_id);
            
                            $this->response_schema['body'] = $subject;
                            $this->response_schema['message_code'] = "subject created successfully";
                    } catch (\Exception $error) {
                        $this->response_schema['success'] = false;
                        $this->response_schema['message_code'] = $error->getMessage();
                    }
        }
        public function coursesingle()
        {
               
                $courses = new Course();
                $this->response_schema['body'] = $courses->get_by_id($_POST['id']);
                
        }
        public function courseupdate()
        {
               
                $courses = new Course();
                
                $courses->update($_POST);
                $this->response_schema['body'] = $courses->get_by_id($_POST['id']);
                   
                
        }
        public function mark()
        {
                try{
                        if (empty($_POST['subject_id'])||empty($_POST['student_id'])||empty($_POST['student_mark'])) {
                                $this->http_code = 422;
                                throw new \Exception("you should enter all values");
                        }
                        $subjects=new Subject;
                        $subject_id = $_POST['subject_id'];
                        $student_id = $_POST['student_id'];
                        $student_mark=$_POST['student_mark'];

                        $sql = "UPDATE students_subjects SET student_mark = $student_mark WHERE subject_id = $subject_id AND student_id = $student_id;
                        ";
                        $result = $subjects->connection->query($sql);
                }catch (\Exception $error) {
                        $this->response_schema['success'] = false;
                        $this->response_schema['message_code'] = $error->getMessage();
                    }
               
        }
        public function multi()
        {
               
                $subjects = new Subject();
                $all = $subjects->get_all();

                $student_id = $_POST['id'];
                $sql = "SELECT * FROM students_subjects WHERE student_id = $student_id";
                $result = $subjects->connection->query($sql);
                $data= array();
                if ($result->num_rows > 0) {

                        // we will make loop over all rows to fetch data 
                        while ($row = $result->fetch_object()) {
            
                            //put the data in the previous  array 
                            $data[] = $row;
                        }
                    }
                

                $student_subject= array();

                //now i have the id of transactions now i need to fetch all information of transactions in transactions table
                foreach($data as $relation){
 
                 //we make the sql statement with condition that created tody
                 $sql ="SELECT *FROM subjects WHERE id= {$relation->subject_id} ";
                 $result_subject=$subjects->connection->query($sql);
                 if($result_subject->num_rows>0){
                         while($row= $result_subject->fetch_object()){
                                 $student_subject[]=$row;    
                         }
                 }
                }
                $didnt_assign = array();

                foreach ($all as $sub) {
                    $found = false;
                
                    foreach ($student_subject as $single) {
                        if ($sub->name == $single->name) {
                            $found = true;
                            break;
                        }
                    }
                
                    if (!$found) {
                        $didnt_assign[] = $sub;
                    }
                }
                
                $this->response_schema['body'] = $didnt_assign;
                 

                
        }
        

}