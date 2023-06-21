<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OperateOn extends Model
{
    protected $table = 'operate_on';

    protected $primaryKey = null;

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'doc_no',
        'pat_no',
        'ty_operation',
        'date_opr',
        'in_cond',
        'out_cond',
        'medicines',
        'treat_adv',
        'opr_room_no'
    ];
}
