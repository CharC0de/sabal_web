<?php
namespace App\Http\Controllers;

use App\Models\RegularPatient;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\CheckUp;
use App\Models\OperateOn;
use App\Models\PatientAdmit;
use App\Models\PatientDischarged;
use Illuminate\Support\Facades\DB;
class LoginController{


    public function login(Request $request)
    {
        $userName = $request->input('userName');
        $phoneNumber = $request->input('phoneNumber');
        // Perform authentication checks (e.g., verify credentials against the database)
        $authenticated = $this->authenticateUser($userName, $phoneNumber);
        if ($authenticated) {
            // Retrieve the user based on the provided credentials
            $user = Patient::where('pat_name', $userName)
                        ->where('ph_no', $phoneNumber)
                        ->first();
                // Return the 'pat_no' of the user as the response
            return response()->json(['message' => 'Login successful', 'pat_no' => $user->pat_no]);
        } else {
            return response()->json(['message' => 'Invalid credentials']);
        }
    }
private function authenticateUser($username, $phoneNumber)
{
    // Retrieve the user from the database based on the provided credentials
    $user = Patient::where('pat_name', $username)
                ->where('ph_no', $phoneNumber)
                ->first();
    // Check if a user with the given credentials exists
    if ($user) {
        // Authentication passes
        return true;
    }
    // Authentication fails
    return false;
}

public function getSession(Request $request){
    $patNo = $request->input('patNo');
    $status = CheckUp::where('pat_no',$patNo)->where('checkup_date', function ($query) use ($patNo) {
        $query->select(DB::raw('MAX(checkup_date)'))
            ->from('check_up')
            ->where('pat_no', $patNo);
    })->value('status');
    $checkUpDate = CheckUp::where('pat_no',$patNo)->where('checkup_date', function ($query) use ($patNo) {
        $query->select(DB::raw('MAX(checkup_date)'))
            ->from('check_up')
            ->where('pat_no', $patNo);
    })->value('checkup_date');
    if($status===null && $checkUpDate!==null){
         return response()->json([ 'isCheckUp' => true,'status'=>'','isAdmit'=>false,'date'=>$checkUpDate]);
    }
    elseif($status==='for admission'){
            $room = PatientAdmit::where('pat_no',$patNo)->where('admtd_on', function ($query) use ($patNo) {
                $query->select(DB::raw('MAX(admtd_on)'))
                    ->from('patient_admit')
                    ->where('pat_no', $patNo);
            })->value('room_no');
            if($room===null){
                return response()->json([ 'isCheckUp' => true, 'status'=>$status,'isAdmit'=>false]);
            }
            else{
                $discharge = PatientDischarged::where('pat_no',$patNo)->where('dis_on',null)->count();
                if ($discharge === 0){
                    return response()->json([ 'isCheckUp' => false, 'status'=>'','isAdmit'=>false]);
            }
            else{
                return response()->json([ 'isCheckUp' => true, 'status'=>$status,'isAdmit'=>true]);
                }
            }
        }
    elseif($status==='regular'){
        $payment = RegularPatient::where('pat_no', $patNo)
        ->where('date_visit', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(date_visit)'))
                ->from('check_up')
                ->where('pat_no', $patNo);
        })->value('payment');
        if ($payment===null){
            return response()->json([ 'isCheckUp' => true, 'status'=>$status,'isAdmit'=>false]);
        }
        else{
            return response()->json([ 'isCheckUp' => false,'status'=>'','isAdmit'=>false,'date'=>$checkUpDate]);
        }
    }
    elseif($status==='to be operated'){
        $doctor = OperateOn::where('pat_no', $patNo)
        ->where('date_opr', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(date_opr)'))
                ->from('operate_on')
                ->where('pat_no', $patNo);
        })->value('doc_no');
        if ($doctor===null){
            return response()->json([ 'isCheckUp' => true, 'status'=>$status,'isAdmit'=>false]);
        }
        else{
            return response()->json([ 'isCheckUp' => false,'status'=>'','isAdmit'=>false,'date'=>$checkUpDate]);
        }
    }
    else{
        return response()->json([ 'isCheckUp' => false,'status'=>'','isAdmit'=>false,'date'=>$checkUpDate]);
    }

}
}
