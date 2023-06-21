<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientDischarged extends Model
{
    protected $table = 'patient_discharged';

    protected $primaryKey = null;

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'pat_no',
        'dis_on',
        'pymt_gv',
        'mode_of_pymt',
        'tr_gvn',
        'tr_advs',
        'medicine'
    ];
}
