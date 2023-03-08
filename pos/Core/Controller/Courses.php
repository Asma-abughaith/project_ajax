<?php

namespace Core\Controller;
use Core\Base\Controller;
use Core\Helpers\Helper;
use Core\Model\Item;
use Core\Model\User;
use Core\Model\Course;




class Courses extends Controller
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
                
                // make instance of transaction model to call with db
               $courses = new Course;

               //we will fetch the data that belongs to user from table users_transactions(here we prapare the sql statment)
               $all_courses = $courses->get_all();
              
               // bind the parameter
               

                //assign variable to put inside the object that i need which is the transaction_id and user_id 
               

               //reassign the response_schema['body'] to the data i need
               $this->response_schema['body'] = $all_courses;
               

               //reassgin the response_schema['message_code'] with massage i need
               $this->response_schema['message_code'] = "transactions_collected_successfuly";
             
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
               
                $user = new User();
                $this->response_schema['body'] = $user->get_by_id($_POST['id']);
                
        }
        public function create()
        {
                $courses=new Course;
                // $conuter=count($courses->get_all());
                // $name= $_POST['course_name'];
                if (!empty($_FILES)) {
                        // to find the extention of image we need to divide  $_FILES['image']['type'] in the last /
                    $file_ext = substr(
                        $_FILES['image']['type'], 
                        strpos($_FILES['image']['type'], '/') + 1 
                    );

            
                    //now reassign the $file_name to new name to save it in folder image 
                    $file_name = `{$_POST['course_name']}.{$file_ext}`;
                    move_uploaded_file($_FILES['image']['tmp_name'], "./resources/image/$file_name");
                    }
            
                     //if $_FILES['image']['name'] empty i want to put defult image
                    if(empty($_FILES['image']['name'])){
                        $file_name="image-defult.png";
                    }
                    //now i want to reassign $_POST['image'] to new name of image
                    $_POST['image']=$file_name;
                
                $courses->create($_POST);
                $this->response_schema['body'] = $courses->get_by_id($courses->connection->insert_id);

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

}
