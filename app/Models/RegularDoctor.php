<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegularDoctor extends Model
{
    protected $table = 'regular_doctor';

    protected $primaryKey = 'doc_no';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'doc_no',
        'date_joined',
        'salary'
    ];
}
