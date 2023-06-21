<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table = 'patient';

    protected $primaryKey = 'pat_no';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'pat_no',
        'pat_name',
        'pat_age',
        'sex',
        'address',
        'ph_no'
    ];
}
