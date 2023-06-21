<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientAdmit extends Model
{
    protected $table = 'patient_admit';

    protected $primaryKey = null;

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'pat_no',
        'admtd_on',
        'cond_on',
        'adv_pymt',
        'mode_pymt',
        'room_no',
        'doc_no',
        'dept_name'
    ];
}
