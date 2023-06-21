<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctors extends Model
{
    protected $table = 'doctors';

    protected $primaryKey = 'doc_no';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'doc_no',
        'doc_name',
        'ph_no',
        'qualification',
        'address'
    ];
}
