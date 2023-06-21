<?php
namespace App\Http\Controllers;
use App\Models\PatientAdmit;
use App\Models\RoomDetails;
use App\Models\Doctors;
use App\Models\WorksIn;
use App\Models\CheckUp;
use App\Models\PatientDischarged;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DischargeController extends Controller{
    public function getDetails(Request $request){

        $patNo = $request->input('patNo');
        $admitUse = PatientAdmit::where('pat_No',$patNo)->where('admtd_on', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(admtd_on)'))
                ->from('patient_admit')
                ->where('pat_no', $patNo);
        })->first();
        $doctor = Doctors::where('doc_no',$admitUse->doc_no)->first();
        $discharge =  PatientDischarged::where('pat_no',$patNo)->where('dis_on', null)->first();
        $docName = $doctor->doc_name;
        $meds=$discharge->medicine;
        $treatGive = $discharge->tr_gvn;
        $advice =$discharge->tr_advs;
        $bill=$discharge->pymt_gv;
        if($bill===null){
            return response()->json(['message'=>'there is no imposed bill as of the moment','reroute'=>true]);
        }
        else{
            return response()->json(['docName'=>$docName,'medicine'=>$meds, 'treatmentGiven'=>$treatGive,'advice'=>$advice,'bill'=>$bill]);
        }
    }



    public function discharge(Request $request){
        $patNo = $request->input('patNo');
        $modePay = $request-> input('modeOfPayment');
        PatientDischarged::where('pat_no',$patNo)->where('dis_on', null)->update([
            'dis_on'=>DB::raw('CURRENT_TIMESTAMP()'),
            'mode_of_pymt'=>$modePay
        ]);
        $date=DB::raw('CURRENT_TIMESTAMP()');
        return response()->json(['message'=>$date,'reroute'=>true]);

    }
}
