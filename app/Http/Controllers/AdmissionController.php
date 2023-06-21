<?php

namespace App\Http\Controllers;
use App\Models\PatientAdmit;
use App\Models\RoomDetails;
use App\Models\Doctors;
use App\Models\WorksIn;
use App\Models\CheckUp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\PatientDischarged;

class AdmissionController extends Controller
{
    public function setDept(Request $request){
        $deptName = $request->input('deptName');
        $patNo = $request->input('patNo');
        $deptName = $request->input('deptName');
        PatientAdmit::where('pat_No', $patNo)->where('admtd_on', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(admtd_on)'))
                ->where('pat_no', $patNo);
        })->update([
            'dept_name' => $deptName,
        ]);
        return response()->json(['message'=>'deptUpdate']);

    }
    public function admit(Request $request){
        $patNo=$request->input('patNo');
        $roomType=$request->input('roomType');
        $roomPrice=$request->input('roomPrice');
        $advPayment=$request->input('advPayment');
        $modeOfPayment=$request->input('modeOfPayment');
        $dbEvent = $request->input('dbEvent');

        if($dbEvent==='update'){
           $department =  PatientAdmit::where('pat_No', $patNo)->where('admtd_on', function ($query) use ($patNo) {
                $query->select(DB::raw('MAX(admtd_on)'))->from('patient_admit')
                    ->where('pat_no', $patNo);
            })->first();
            $docNo = WorksIn::where('dept_name',$department->dept_name)->pluck('doc_no')->first();
            $roomNo = RoomDetails::where('chrge_per_day','<=',$roomPrice)->where('room_type',$roomType)->where('status','Y')->first();
            $admit = PatientAdmit::where('pat_No',$patNo)->where('admtd_on', function ($query) use ($patNo) {
                $query->select(DB::raw('MAX(admtd_on)'))
                    ->from('patient_admit')
                    ->where('pat_no', $patNo);
            })->update([
                'doc_no'=>$docNo,
                'room_no'=>$roomNo->room_no,
                'adv_pymt'=>$advPayment,
                'mode_pymt'=>$modeOfPayment
            ]);

        }
        elseif($dbEvent==='insert'){
            $admit = new PatientAdmit;
            $admit->pat_no = $patNo;
            $admit->admtd_on =  DB::raw('CURRENT_TIMESTAMP()');
            $docNo = Doctors::pluck('doc_no')->first();
            $department = WorksIn::where('doc_no',$docNo)->pluck('dept_name')->first();
            $roomNo = RoomDetails::where('chrge_per_day','<=',$roomPrice)->where('room_type',$roomType)->where('status','Y')->first();
            $admit->dept_name = $department;
            $admit->doc_no =$docNo;
            $admit->adv_pymt = $advPayment;
            $admit->mode_pymt = $modeOfPayment;
            $admit->room_no = $roomNo->room_no;
            $admit->save();
        }


            if ($roomNo->room_no===null){
               return response()->json(['message'=>'there are no more rooms available or such room with given preference does not exist','roomNo'=>$roomNo->room_no]);
            }
            else{
                return response()->json(['roomNo'=>$roomNo->room_no,'message'=>'','doc'=>$docNo,'dept'=>$department]);
        }
    }

    public function cancel(Request $request){
        $patNo=$request->input('patNo');
        $dbEvent = $request->input("dbEvent");
        $admitUse = PatientAdmit::where('pat_No',$patNo)->where('admtd_on', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(admtd_on)'))
                ->from('patient_admit')
                ->where('pat_no', $patNo);
        })->first();
        RoomDetails::where('room_no',$admitUse->room_no)->update(['status'=>'Y']);
        PatientDischarged::where('pat_no',$patNo)->where('dis_on',null)->delete();
        $admit = PatientAdmit::where('pat_No',$patNo)->where('admtd_on', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(admtd_on)'))
                ->from('patient_admit')
                ->where('pat_no', $patNo);
        })->delete();
        $checkUp=CheckUp::where('pat_No',$patNo)->where('checkup_date', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(checkup_date)'))
                ->from('check_up')
                ->where('pat_no', $patNo);
    })->first();
    if($dbEvent==='update'){
        CheckUp::where('pat_No',$patNo)->where('checkup_date', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(checkup_date)'))
                ->from('check_up')
                ->where('pat_no', $patNo);
    })->update([
        'status'=> $checkUp->status.', cancelled'
    ]);
    }


    return response()->json(['message'=>'','admit'=>$admit,'checkup'=>$checkUp]);
}

}
