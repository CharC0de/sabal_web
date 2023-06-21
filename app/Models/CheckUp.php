<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckUp extends Model
{
    protected $table = 'check_up';

    protected $primaryKey = null;

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'doc_no',
        'pat_no',
        'diagnosis',
        'status',
        'treatment',
        'checkup_date'
    ];
}

