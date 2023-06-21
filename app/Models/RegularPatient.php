<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegularPatient extends Model
{
    protected $table = 'regular_patient';

    protected $primaryKey = 'pat_no';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'pat_no',
        'date_visit',
        'medicines',
        'payment'
    ];
}

