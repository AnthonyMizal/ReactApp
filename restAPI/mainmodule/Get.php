<?php

class Get{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    // customer function
        // get function for customer reservations
        public function get_reservation($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT reservation_appointments.*, cms_categories.name from reservation_appointments JOIN cms_categories ON reservation_appointments.room_id = cms_categories.id";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
            
            $res = $this->gm->executeQuery($sql);
            if($res['code']==200){
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Reservation Appointments", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Reservation Appointments", $res['code']);
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

        // get all bookings of the logged guest with status complete
        public function get_bookinghistory($table, $condition = null){
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

         // get reservation details
         public function get_details($table, $received_data){
            $id = $received_data->id;
            // 2-Confirm 1-Tentative 0-Cancel
            $sql = "SELECT reservation_appointments.*, cms_categories.name, cms_categories.description, cms_categories.price, cms_rooms.room_number, billing_invoice.total_amount from reservation_appointments 
            JOIN cms_categories ON reservation_appointments.room_id = cms_categories.id 
            JOIN cms_rooms ON reservation_appointments.room_id = cms_rooms.id
            JOIN billing_invoice ON reservation_appointments.invoice_id = billing_invoice.id
            WHERE reservation_appointments.id = $id";

            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved details", $res['code']);
            }

            return $this->gm->returnPayload(null, "failed", "failed to retrieve details", $res['code']);
        }

        // get remark
        public function addRemark($table, $received_data){
            $id = $received_data->reservation_appointments_id;
            $remarks = $received_data->remarks;
            
            // 2-Confirm 1-Tentative 0-Cancel
            $sql = "INSERT INTO $table (reservation_appointments_id,remarks) 
            values ($id,'$remarks')";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();  
            
            $sql2 = "UPDATE reservation_appointments SET status = 'Cancelled' WHERE id = $id";
            $stmt2 = $this->pdo->prepare($sql2);
            $stmt2->execute();   

            $code = 200;
                    $remarks = "success";
                    $message = "Reservation Cancelled!";
                    $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
            
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

    
        public function addFeedback($table, $received_data){
            $id = $received_data->reservation_appointments_id;
            $feedback = $received_data->feedback;
            
            // 2-Confirm 1-Tentative 0-Cancel
            $sql = "INSERT INTO $table (reservation_appointments_id,feedback) 
            values ($id,'$feedback')";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();  
            
            $sql2 = "UPDATE reservation_appointments SET booking_feedback_status = 'DONE' WHERE id = $id";
            $stmt2 = $this->pdo->prepare($sql2);
            $stmt2->execute();   

            $code = 200;
                    $remarks = "success";
                    $message = "Feedback Submitted!";
                    $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
            
        }

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

        public function get_cancelled($table){
            $sql = "SELECT * FROM $table WHERE status = 'Tentative'";
            if($condition!=null){
                $sql .= " WHERE {$condition}";
            }
          
            $res = $this->gm->executeQuery($sql);
            if($res['code']==200){
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
        }

        public function get_status($table, $condition = null){
            $sql = "SELECT status FROM $table";
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