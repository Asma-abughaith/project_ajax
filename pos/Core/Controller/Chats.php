<?php

namespace Core\Controller;
use Core\Base\Controller;
use Core\Helpers\Helper;
use Core\Model\User;
use Core\Model\Subject;
use Core\Model\Chat;

class Chats extends Controller
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
        
        public function user(){

          $id=  $_SESSION['user']['user_id'];
          
          try {
                      
            $users = new User;
      
            $all_users = $users->get_all();
      
                if (empty($all_users)) {
                    $this->http_code = 422;
                    throw new \Exception("there is no users to show");
                }
                $sql = "SELECT u.*FROM users u
                JOIN students_subjects ss ON ss.student_id = u.id
                JOIN subjects s ON s.id = ss.subject_id
                WHERE ss.subject_id IN (
                    SELECT ss2.subject_id
                    FROM students_subjects ss2
                    WHERE ss2.student_id = {$_SESSION['user']['user_id']}
                )
                AND u.id != {$_SESSION['user']['user_id']}
                GROUP BY u.id, u.username
                HAVING COUNT(DISTINCT s.name) = (
                    SELECT COUNT(DISTINCT ss3.subject_id)
                    FROM students_subjects ss3
                    WHERE ss3.student_id = {$_SESSION['user']['user_id']}
                )";

                $result = $users->connection->query($sql);
                $data = array();
                if ($result->num_rows > 0) {

                    // we will make loop over all rows to fetch data 
                    while ($row = $result->fetch_object()) {

                        //put the data in the previous  array 
                        $data[] = $row;
                    }
                }
                
                

                $this->response_schema['body']['student']= $data;
                $this->response_schema['message_code'] = "the users collected successfully";
        } catch (\Exception $error) {
            $this->response_schema['success'] = false;
            $this->response_schema['message_code'] = $error->getMessage();
        }
      
      }

      public function create()
      {
        
        try{
          
          if(empty($_POST['message'])){
            $this->http_code = 422;
            throw new \Exception("you should enter massage");
          }
          $chat = new Chat;
          $user = new User;
          $_POST['sender_id']=$_SESSION['user']['user_id'];
          
          $chat->create($_POST);
          $this->response_schema['body']['chat']=$chat->get_by_id($chat->connection->insert_id);
          $this->response_schema['body']['sen']=$user->get_by_id($_POST['sender_id']);
          $this->response_schema['message_code'] = "the message send succesfully";
        }catch (\Exception $error) {
          $this->response_schema['success'] = false;
          $this->response_schema['message_code'] = $error->getMessage();
    }
      }
      public function index(){
        $chat = new Chat;
        $sql =  "SELECT * FROM chats WHERE receiver_id={$_SESSION['user']['user_id']}";

        $result = $chat->connection->query($sql);
        $data = array();
        if ($result->num_rows > 0) {

            // we will make loop over all rows to fetch data 
            while ($row = $result->fetch_object()) {

                //put the data in the previous  array 
                $data[] = $row;
            }
            
        }
       
        $user_sender=array();
        foreach($data as $single){
          $users= new User;
              $user_sender[] = $users->get_by_id($single->sender_id);
         
        }
        $this->response_schema['body']['sender']=$user_sender;
        $this->response_schema['body']['msg']=$data;

      }

      public function delete(){
        $chats = new Chat;
        $chats->delete($this->request_body->id);
      }
      public function search()
      {
            try{

           $users= new User;
             $searchTerm= $_POST['search'];
             

             $sql = "SELECT * FROM users WHERE LOWER(username) LIKE LOWER('{$searchTerm}%') OR LOWER(email) LIKE LOWER('{$searchTerm}%') ";


             $result = $users->connection->query($sql);
             $data = array();
             if ($result->num_rows > 0) {
                 while ($row = $result->fetch_object()) {
                     $data[] = $row;
                 }
                 
             }
            //  if(!empty($data)){
            //   $this->http_code = 422;
            //   throw new \Exception("there is no result to show");
            //  }
             $this->response_schema['body']= $data;
             $this->response_schema['message_code'] = "result of search";
              } catch (\Exception $error) {
                      $this->response_schema['success'] = false;
                      $this->response_schema['message_code'] = $error->getMessage();
              
              }
      }
        
      public function single(){
        try{
          $user = new User;
          $id= $_POST['id'];
          $data= $user->get_by_id($id);
          $this->response_schema['body']= $data;
          $this->response_schema['message_code'] = "the user information fetch susseccfully";

        } catch (\Exception $error) {
          $this->response_schema['success'] = false;
          $this->response_schema['message_code'] = $error->getMessage();
        }
      }

     
}