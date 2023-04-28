<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
}
else{
    $req = array("errorcatcher");
}

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){

// user-side functions  31/03/23

            // case 'fileupload':
            //     $data = [
            //         'file' => $_FILES,
            //         'product_id' => $_REQUEST['product_id']
            //     ];
            //     echo json_encode($auth->uploadimage($data));
            // break;

            case 'register':
                echo json_encode($auth->register($data));
                break;

            case 'login':
                echo json_encode($auth->login($data));
                break;
            
            case 'createrecipe':
                echo json_encode($global->insert("recipes",$data));
            break;
                
            case 'addfile':
                echo json_encode($global->file('cdm_guest', $data, NULL));
            break;

            case 'updateProfile':
                echo json_encode($global->update('cdm_guest', $data, NULL));
            break;

            case 'getAccount':
                // echo json_encode($get->get_common('cdm_guest', "id = 1"));
                echo json_encode($get->get_common('cdm_guest', "id = '$req[1]'"));
            break;
                
            case 'getCustomerAccount':
                // echo json_encode($get->get_account('reservation_appointments', $data, NULL));
            break;

            case 'getReservation':
                echo json_encode($get->get_reservation('reservation_appointments', "status = 'Tentative' AND guest_id = '$req[1]'"));
                // echo json_encode($get->get_reservation('reservation_appointments', "id = '$req[1]'"));
            break;

            case 'getBooking':
                echo json_encode($get->get_booking('reservation_appointments', "status = 'Complete' AND booking_feedback_status = 'NONE' AND guest_id = '$req[1]'"));
            break;

            case 'getBookinghistory':
                echo json_encode($get->get_bookinghistory('reservation_appointments', "status = 'Complete' AND guest_id = '$req[1]'"));
            break;

            case 'getDetails':
                echo json_encode($get->get_details('reservation_appointments', $data));
            break;

        // cancel reservation (change status to 0=Cancelled)
            case 'cancelReservation':
                // echo json_encode($global->update('reservation_appointments', $data, NULL));
            break;

            case 'getFeedback':
                echo json_encode($get->get_common('cdm_feedback', "id = '$req[1]'"));
            break;
        
            // insert Feedback
            case 'addFeedback':
                echo json_encode($get->addFeedback('cdm_feedback',$data));
            break;

            case 'getCancellation':
                echo json_encode($get->get_cancelled('reservation_appointments', "id = '$req[1]'"));
                // echo json_encode($get->get_cancelled('reservation_appointments', "id = '$req[1]'"));
            break;
        
            // insert Remarks
            case 'addRemark':
                echo json_encode($get->addRemark('cdm_cancellation',$data));
                // echo json_encode($global->updateCancellation('reservation_appointments',$data));
            break;


            case 'updateStatus':
                echo json_encode($global->update('reservation_appointments', $data, NULL));
            break;

            case 'getStatus':
                // echo json_encode($get->get_status('reservation_appointments', "id = '$req[1]'"));
                echo json_encode($get->get_status('reservation_appointments', "status = 'Tentative' AND guest_id = '$req[1]'"));
            break;


    // get common function
            case 'getCommon':
                echo json_encode($get->get_common('name_of_tbl'));
            break;

            case 'retrieve':
                if(count($req)>1){
                    echo json_encode($get->get_common('cdm_guest', "id = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_common('cdm_guest'));
                }   
            break;

            case 'username_check':
                // $data = [];
                echo json_encode($get->username_check($data));

                break;

            case 'updateUserPassword':
                echo json_encode($auth->updatePassword($data));
            break;


            default:
                echo "request not found";
            break;
        }
    break;
    
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            switch($req[0]){
                 // update customer profile request
                    

                    default:
                        echo "request not found";
                    break;
            }
        break;

    default:
        echo "failed request";
    break;

    
}