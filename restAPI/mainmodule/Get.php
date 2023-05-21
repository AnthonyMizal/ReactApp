<?php

class Get{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    public function addRecipe($table, $received_data)
    {
        $user_id = $received_data->user_id;
        $name = $received_data->name;
        $video_link = $received_data->video_link;
        $difficulty = $received_data->difficulty;
        $category = $received_data->category;
        $cooking_time = $received_data->cooking_time;
        $ingredients = $received_data->ingredients;
        $directions = $received_data->directions;


        $sql = "INSERT INTO $table (user_id, name, video_link, difficulty, category, cooking_time, ingredients, directions) VALUES ('$user_id', '$name', '$video_link ', '$difficulty', '$category', '$cooking_time', '$ingredients', '$directions')";

        $res = $this->gm->executeQuery($sql);

        // $sql = "SELECT MAX(id) AS id from $table";
        // $stmt = $this->pdo->prepare($sql);
        // $stmt->execute();
        // $res = $stmt->fetchAll()[0];
        // $order_id = $res['id'];

        // $profile = array(
        //     "id" => $order_id
        // );

        return $this->gm->returnPayload(null, 'success', 'successfully inserted data', 200);
    }
    public function addRecipeWithPic($table, $received_data)
    {
        $user_id = $received_data->user_id;
        $name = $received_data->name;
        $video_link = $received_data->video_link;
        $difficulty = $received_data->difficulty;
        $category = $received_data->category;
        $cooking_time = $received_data->cooking_time;
        $ingredients = $received_data->ingredients;
        $directions = $received_data->directions;


        $sql = "SELECT MAX(id) AS id from recipes";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll()[0];
        $id = $res['id'];


        $sql = "UPDATE $table SET user_id = '$user_id', name = '$name', video_link = '$video_link', difficulty = '$difficulty', category = '$category', cooking_time = '$cooking_time', ingredients = '$ingredients', directions = '$directions' WHERE id = $id";
        var_dump($sql);
        $res = $this->gm->executeQuery($sql);

        return $this->gm->returnPayload(null, 'success', 'successfully inserted data', 200);
    }


    public function file($table, $data, $condition_string = null)
    {

        try {

            if ($_FILES['file']['name'] != '') {
                $test = explode('.', $_FILES['file']['name']);
                $extension = end($test);
                $allowedExts = array("jpeg", "jpg", "png");
                if ((($_FILES["file"]["type"] == "image/jpeg")
                    || ($_FILES["file"]["type"] == "image/jpg")
                    || ($_FILES["file"]["type"] == "image/pjpeg")
                    || ($_FILES["file"]["type"] == "image/x-png")
                    || ($_FILES["file"]["type"] == "image/png")))
                    $name = date("Y-m-d") . rand(100, 999999999999) . '.' . $extension;
                // $location = '../uploads/'.$name;
                $location = '../assets/recipeimages/' . $name;
                $location2 = '/assets/recipeimages/' . $name;
                move_uploaded_file($_FILES['file']['tmp_name'], $location);

                $sql_str = "INSERT INTO recipes (`img_location`) VALUES ('$location2')";
                $sql = $this->pdo->prepare($sql_str);
                $sql->execute();
                return $this->gm->returnPayload(null, "success", "image saved", 200);
            }


            // // unlink($location);

            // // prepare sql stmts
            // // var_dump($sql);
            // // execute em..
        }
        // if not..
        catch (Exception $e) {
            $errmsg = $e->getMessage();
            $code = 403;
        }
    }

    public function editRecipePic($condition_string = null)
    {
        try {
            if ($_FILES['file']['name'] != '') {
                $test = explode('.', $_FILES['file']['name']);
                $extension = end($test);
                $allowedExts = array("jpeg", "jpg", "png");
                if ((($_FILES["file"]["type"] == "image/jpeg")
                    || ($_FILES["file"]["type"] == "image/jpg")
                    || ($_FILES["file"]["type"] == "image/pjpeg")
                    || ($_FILES["file"]["type"] == "image/x-png")
                    || ($_FILES["file"]["type"] == "image/png")))
                    $name = date("Y-m-d") . rand(100, 999999999999) . '.' . $extension;
                // $location = '../uploads/'.$name;
                $location = '../assets/recipeimages/' . $name;
                $location2 = '/assets/recipeimages/' . $name;
                move_uploaded_file($_FILES['file']['tmp_name'], $location);
                $sql_str = "UPDATE recipes set img_location='$location2' ";
                $sql_str .= $condition_string;
                $sql = $this->pdo->prepare($sql_str);
                $sql->execute();
                return $this->gm->returnPayload($sql_str, "success", "image saved", 200);
            }
        }
        catch (Exception $e) {
            $errmsg = $e->getMessage();
            $code = 403;
        }
    }

    // public function file($table, $data, $condition){

    //     try{
            
    //         if($_FILES['file']['name'] != ''){
    //             $test = explode('.', $_FILES['file']['name']);
    //             $extension = end($test);    
    //             $allowedExts = array("jpeg", "jpg", "png");
    //         if ((($_FILES["file"]["type"] == "image/jpeg")
    //             || ($_FILES["file"]["type"] == "image/jpg")
    //             || ($_FILES["file"]["type"] == "image/pjpeg")
    //             || ($_FILES["file"]["type"] == "image/x-png")
    //             || ($_FILES["file"]["type"] == "image/png"))

    //          )
    //             $name = date("Y-m-d").rand(100,999999999999).'.'.$extension;
    //             // $location = '../uploads/'.$name;
    //             $location = '../assets/recipeimages/'.$name;
    //             move_uploaded_file($_FILES['file']['tmp_name'], $location);
                
    //         }
      
    //     $sql_str = "UPDATE $table SET img_location = '$location'";
    //     // unlink($location);

    //             $sql_str .= " WHERE {$condition}";
        
    //     // prepare sql stmts
    //     $sql = $this->pdo->prepare($sql_str);
    //    // var_dump($sql);
    //     // execute em..
    //     $sql->execute();

    //     }
    //     // if not..
    //     catch(Exception $e){
    //         $errmsg = $e->getMessage();
    //         $code = 403;
    //     }
    // }


    

        // get booking function
        public function get_recipe($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT recipes.*, users.fullname FROM recipes
            JOIN users ON recipes.user_id = users.id";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
    
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }


        public function view_recipe_details($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT recipes.*, users.fullname FROM recipes
            JOIN users ON recipes.user_id = users.id";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
    
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        public function get_personal_recipe($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT recipes.*, users.fullname FROM recipes
            JOIN users ON recipes.user_id = users.id";

            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        public function get_favorites_recipe($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT recipes.*, users.fullname FROM recipes JOIN bookmark ON bookmark.recipe_id = recipes.id JOIN users ON recipes.user_id = users.id";

            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }


        // get customer accounts
        public function get_account($table, $condition = null){
            $sql = "SELECT * FROM $table";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
            
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
        }

        public function get_created_recipe($table, $condition = null){
            $sql = "SELECT MAX(id) as id FROM $table";
            
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
        }



    //     public function uploadimage($received_data)
    // {
    //     $file = $received_data['file'];
    //     $product_id = $received_data['product_id'];
    //     $location = fileuploadmodule($file);
    //     if ($location == "file exist") {
    //         $code = 403;
    //         return $this->gm->returnPayload(null, "Failed", "File already exist in the directory!", $code);
    //     } else {
    //         $data = array(
    //             "location" => $location
    //         );
    //         $result = $this->gm->update("products", $data, " WHERE id = '$product_id'");
    //         $code = 200;
    //         return $this->gm->returnPayload(null, "success", "Image Successfully uploaded!", $code);
    //     }
    // }



        // get_common for user accounts
        public function get_common($table, $condition = null){

            
            $sql = "SELECT * FROM $table";
            if($condition!=null){
                $sql .= " WHERE {$condition}";
            }
          
            $res = $this->gm->executeQuery($sql);
            if($res['code']==200){
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
        }




        public function username_check($received_data)
        {
            $username = $received_data->username;
    
            $sql = "SELECT username 
            FROM cdm_guest
            WHERE username = '$username'";
    
            $stmt = $this->pdo->prepare($sql);
            try {
                $stmt->execute();
                if ($stmt->rowCount() == 0) {
                    return $this->gm->returnPayload(null, 'success', 'Username available', 200);
                } else {
                    $code = 401;
                    $remarks = "failed";
                    $message = "Username unavailable";
                    $payload = null;
                    return $this->gm->returnPayload($payload, $remarks, $message, $code);
                }
            } catch (Exception $e) {
                $code = 401;
                $remarks = "failed";
                $message = "Invalid username or password.";
                $payload = null;
                return $this->gm->returnPayload($payload, $remarks, $message, $code);
            }
        }
}