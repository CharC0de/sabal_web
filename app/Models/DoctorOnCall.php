<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoctorOnCall extends Model
{
    protected $table = 'doctor_on_call';

    protected $primaryKey = null;

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'doc_no',
        'fs_pr_cl',
        'pymt_du'
    ];
}
