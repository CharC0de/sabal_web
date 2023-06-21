<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorksIn extends Model
{
    protected $table = 'works_in';

    protected $primaryKey = null;

    public $incrementing = false;

    protected $fillable = [
        'dept_name',
        'doc_no'
    ];
}
