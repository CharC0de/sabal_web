<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Doctors;
use App\Models\WorksIn;
use App\Models\CheckUp;
use App\Models\RegularPatient;

class CheckupController extends Controller
{
    public function initcheckup(Request $request)
    {
        // Retrieve the necessary input values from the request
        $deptName = $request->input('deptName');
        $patNo = $request->input('patNo');
        // Retrieve doc_no
        $docNo = WorksIn::where('dept_name', $deptName)
            ->inRandomOrder()
            ->pluck('doc_no')
            ->first();
        $docName = Doctors::where('doc_no', $docNo)
            ->value('doc_name');
        DB::statement("
            INSERT INTO check_up (doc_no, pat_no, diagnosis, status, treatment, checkup_date)
            VALUES (
                ?,
                ?,
                NULL,
                NULL,
                NULL,
                CURRENT_TIMESTAMP()
            )
        ", [$docNo, $patNo]);
        return response()->json(['docName' => $docName,'docNo'=> $docNo]);
    }
    public function getStatus(Request $request)
    {
        $docNo = $request->input('docNo');
        $patNo = $request->input('patNo');
        $status = CheckUp::select('status')->where('doc_no',$docNo)->where('pat_no',$patNo)->where('checkup_date', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(checkup_date)'))
                ->from('check_up')
                ->where('pat_no', $patNo);
        })
        ->first();
        return response()->json(['status'=>$status]);
    }
    public function isPaid(Request $request){
        $patNo = $request->input('patNo');
        $payment = RegularPatient::select('payment')->where('pat_no',$patNo)->where('date_visit', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(date_visit)'))
                ->from('regular_patient')
                ->where('pat_no', $patNo);
        })->first();
        return response()->json(['payment' => $payment]);
    }

    public function getDetails(Request $request)
{
    $docNo = $request->input('docNo');
    $patNo = $request->input('patNo');

    $checkUpDet = CheckUp::
        where('doc_no', $docNo)
        ->where('pat_no', $patNo)->where('checkup_date', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(checkup_date)'))
                ->from('check_up')
                ->where('pat_no', $patNo);
        })
        ->first(); // Add 'first()' to retrieve the result

    $regularDet = RegularPatient::
        where('pat_no', $patNo)
        ->where('date_visit', function ($query) use ($patNo) {
            $query->select(DB::raw('MAX(date_visit)'))
                ->from('regular_patient')
                ->where('pat_no', $patNo);
        })
        ->first(); // Add 'first()' to retrieve the result

    $docName = Doctors::where('doc_no', $docNo)->first(); // Add 'first()' to retrieve the result

    return response()->json([
        'docName' => $docName ? $docName->doc_name : null,
        'date' => $checkUpDet ? $checkUpDet->checkup_date : null,
        'diagnosis' => $checkUpDet ? $checkUpDet->diagnosis : null,
        'treatment' => $checkUpDet ? $checkUpDet->treatment : null,
        'medicines' => $regularDet ? $regularDet->medicines : null,
        'payment' => $regularDet ? $regularDet->payment : null,
    ]);
}
}
