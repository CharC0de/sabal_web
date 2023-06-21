<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'department';

    protected $primaryKey = 'dept_name';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'dept_name',
        'dept_location',
        'facilities'
    ];
}
