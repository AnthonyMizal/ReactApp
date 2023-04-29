<?php

class Get{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }


        // get booking function
        public function get_booking($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT reservation_appointments.*, billing_invoice.total_amount FROM reservation_appointments 
            JOIN billing_invoice ON reservation_appointments.invoice_id = billing_invoice.id";
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