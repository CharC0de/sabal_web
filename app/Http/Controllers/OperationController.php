<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\OperateOn;
use App\Models\WorksIn;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OperationController extends Controller
{
    public function checkNull(Request $request)
    {
        $patNo = $request->input('patNo');
        $isOperated = OperateOn::where('pat_no', $patNo)
            ->where('date_opr', function ($query) use ($patNo) {
                $query->select(DB::raw('MAX(date_opr)'))
                    ->from('operate_on')
                    ->where('pat_no', $patNo);
            })
            ->whereNull('ty_operation')
            ->orWhereNull('in_cond')
            ->orWhereNull('out_cond')
            ->orWhereNull('medicines')
            ->orWhereNull('treat_adv')
            ->orWhereNull('opr_room_no')
            ->get();

        if ($isOperated->isEmpty()) {
            return response()->json(['toDashboard' => true]);
        } else {
            return response()->json(['toDashboard' => false]);
        }

    }
     public function setDoc (Request $request)
    {

        $patNo = $request->input('patNo');
        $docNo = $request->input('docNo');
        $dept = WorksIn::where('doc_no',$docNo)->first();
        $docs = WorksIn::where('dept_name', $dept->dept_name)->pluck('doc_no');
        $doc = $docs->first();

OperateOn::where('pat_no', $patNo)->where('date_opr', function ($query) use ($patNo) {
    $query->select(DB::raw('MAX(date_opr)'))
        ->from('operate_on')
        ->where('pat_no', $patNo);
})->update(['doc_no' => $doc]);

return response()->json(['message' => '']);
    }
}
